import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all published content
export const getPublishedContent = query({
  args: {
    category: v.optional(v.string()),
    language: v.optional(v.union(v.literal("he"), v.literal("en"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("content").withIndex("by_status", (q) => q.eq("status", "published"));

    let results = await q.collect();

    // Filter by category if provided
    if (args.category) {
      results = results.filter((item) => item.metadata.category === args.category);
    }

    // Filter by language if provided
    if (args.language) {
      results = results.filter((item) => item.metadata.language === args.language);
    }

    // Sort by creation date (newest first)
    results.sort((a, b) => b.createdAt - a.createdAt);

    // Limit results if specified
    if (args.limit) {
      results = results.slice(0, args.limit);
    }

    return results;
  },
});

// Get content by slug
export const getContentBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("content")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Get parashah content
export const getParashotContent = query({
  args: {
    language: v.optional(v.union(v.literal("he"), v.literal("en"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db
      .query("content")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    // Filter by parasha category
    results = results.filter((item) => 
      item.metadata.category === "parasha" || 
      item.metadata.category === "parashah"
    );

    // Filter by language if provided
    if (args.language) {
      results = results.filter((item) => item.metadata.language === args.language);
    }

    // Sort by creation date
    results.sort((a, b) => b.createdAt - a.createdAt);

    // Limit
    if (args.limit) {
      results = results.slice(0, args.limit);
    }

    return results;
  },
});

// Get stories content
export const getStoriesContent = query({
  args: {
    language: v.optional(v.union(v.literal("he"), v.literal("en"))),
    tags: v.optional(v.array(v.string())),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db
      .query("content")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    // Filter by story-related categories
    results = results.filter((item) => 
      ["story", "history", "facts", "did-you-know"].includes(item.metadata.category)
    );

    // Filter by language
    if (args.language) {
      results = results.filter((item) => item.metadata.language === args.language);
    }

    // Filter by tags
    if (args.tags && args.tags.length > 0) {
      results = results.filter((item) => 
        args.tags!.some((tag) => item.metadata.tags.includes(tag))
      );
    }

    // Sort
    results.sort((a, b) => b.createdAt - a.createdAt);

    // Limit
    if (args.limit) {
      results = results.slice(0, args.limit);
    }

    return results;
  },
});

// Search content
export const searchContent = query({
  args: {
    searchTerm: v.string(),
    language: v.optional(v.union(v.literal("he"), v.literal("en"))),
  },
  handler: async (ctx, args) => {
    const allContent = await ctx.db
      .query("content")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    const searchLower = args.searchTerm.toLowerCase();

    let results = allContent.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchLower);
      const bodyMatch = item.body.toLowerCase().includes(searchLower);
      const tagsMatch = item.metadata.tags.some((tag) => 
        tag.toLowerCase().includes(searchLower)
      );
      return titleMatch || bodyMatch || tagsMatch;
    });

    // Filter by language
    if (args.language) {
      results = results.filter((item) => item.metadata.language === args.language);
    }

    return results;
  },
});

// Get content by category
export const getContentByCategory = query({
  args: {
    category: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db
      .query("content")
      .withIndex("by_category", (q) => q.eq("metadata.category", args.category))
      .filter((q) => q.eq(q.field("status"), "published"))
      .collect();

    results.sort((a, b) => b.createdAt - a.createdAt);

    if (args.limit) {
      results = results.slice(0, args.limit);
    }

    return results;
  },
});
