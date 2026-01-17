import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Sync file from GitHub to Convex
export const syncFile = internalMutation({
  args: {
    filePath: v.string(),
    repo: v.string(),
    branch: v.string(),
    hash: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Fetch file from GitHub
      const url = `https://api.github.com/repos/rafia22110/${args.repo}/contents/${args.filePath}?ref=${args.branch}`;
      
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3.raw",
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch ${args.filePath}: ${response.statusText}`);
        return { success: false, error: response.statusText };
      }

      const content = await response.text();

      // Parse markdown frontmatter
      const parsed = parseMarkdown(content);

      // Check if already synced
      const existing = await ctx.db
        .query("github_sync")
        .withIndex("by_repo", (q) => q.eq("repo", args.repo))
        .filter((q) => 
          q.and(
            q.eq(q.field("filePath"), args.filePath),
            q.eq(q.field("hash"), args.hash)
          )
        )
        .first();

      if (existing) {
        return { success: true, message: "Already synced" };
      }

      // Insert into github_sync
      await ctx.db.insert("github_sync", {
        repo: args.repo,
        branch: args.branch,
        filePath: args.filePath,
        content,
        hash: args.hash,
        lastSync: Date.now(),
        status: "success",
      });

      // Insert/update content table
      const existingContent = await ctx.db
        .query("content")
        .withIndex("by_slug", (q) => q.eq("slug", parsed.slug))
        .first();

      if (existingContent) {
        await ctx.db.patch(existingContent._id, {
          title: parsed.title,
          body: parsed.body,
          author: parsed.author,
          status: parsed.status,
          metadata: parsed.metadata,
          updatedAt: Date.now(),
        });
      } else {
        await ctx.db.insert("content", {
          title: parsed.title,
          slug: parsed.slug,
          body: parsed.body,
          author: parsed.author,
          status: parsed.status,
          metadata: parsed.metadata,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      }

      return { success: true, message: "Synced successfully" };
    } catch (error) {
      console.error("Sync error:", error);
      return { success: false, error: String(error) };
    }
  },
});

// Parse markdown with frontmatter
function parseMarkdown(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      title: "Untitled",
      slug: "untitled-" + Date.now(),
      body: content,
      author: "system",
      status: "draft" as const,
      metadata: {
        tags: [],
        category: "general",
        language: "he" as const,
      },
    };
  }

  const [, frontmatter, body] = match;
  const lines = frontmatter.split("\n");
  const meta: Record<string, string> = {};

  lines.forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      meta[key.trim()] = rest.join(":").trim();
    }
  });

  const title = meta.title || "Untitled";
  const slug = meta.slug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
  const tags = meta.tags ? meta.tags.replace(/[\[\]]/g, "").split(",").map((t) => t.trim()) : [];

  return {
    title,
    slug,
    body: body.trim(),
    author: meta.author || "system",
    status: (meta.status || "published") as "draft" | "published" | "archived",
    metadata: {
      tags,
      category: meta.category || "general",
      language: (meta.language || "he") as "he" | "en",
      difficulty: meta.difficulty as "1" | "2" | "3" | undefined,
    },
  };
}
