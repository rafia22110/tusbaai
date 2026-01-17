import { httpRouter } from "convex/server";
import { internal } from "./_generated/api";
import crypto from "crypto";

const http = httpRouter();

// GitHub Webhook - סנכרון תוכן אוטומטי
http.route({
  path: "/github-webhook",
  method: "POST",
  handler: async (ctx, request) => {
    try {
      // וידוא חתימה GitHub
      const signature = request.headers.get("x-hub-signature-256");
      const body = await request.text();
      
      if (!signature) {
        return new Response("No signature", { status: 401 });
      }
      
      // Parse payload
      const payload = JSON.parse(body);
      const event = request.headers.get("x-github-event");
      
      // Handle push events
      if (event === "push") {
        const ref = payload.ref;
        const commits = payload.commits || [];
        const repo = payload.repository?.name;
        
        // Process each commit
        for (const commit of commits) {
          // Get modified files
          const files = [
            ...commit.added,
            ...commit.modified,
            ...commit.removed
          ];
          
          for (const filePath of files) {
            // Only sync .md files from content/ directory
            if (!filePath.startsWith("content/") || !filePath.endsWith(".md")) {
              continue;
            }
            
            // Trigger sync function
            await ctx.runMutation(internal.github.syncFile, {
              filePath,
              repo: repo || "tusbaai",
              branch: ref?.replace("refs/heads/", "") || "main",
              hash: commit.id
            });
          }
        }
      }
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
});

export default http;
