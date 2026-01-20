import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  // תוכן (פרשות, סיפורים, גלריה)
  content: defineTable({
    title: v.string(),
    slug: v.string(),
    body: v.string(),
    author: v.string(),
    status: v.union(v.literal("draft"), v.literal("published"), v.literal("archived")),
    metadata: v.object({
      tags: v.array(v.string()),
      category: v.string(),
      language: v.union(v.literal("he"), v.literal("en")),
      difficulty: v.optional(v.union(v.literal("1"), v.literal("2"), v.literal("3")))
    }),
    createdAt: v.number(),
    updatedAt: v.number()
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["metadata.category"]),

  // משתמשים
  users: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("contributor"), v.literal("viewer")),
    preferences: v.object({
      language: v.union(v.literal("he"), v.literal("en")),
      theme: v.union(v.literal("light"), v.literal("dark")),
      notifications: v.boolean()
    }),
    createdAt: v.number()
  }).index("by_email", ["email"]),

  // סנכרון GitHub - content auto-push
  github_sync: defineTable({
    repo: v.string(),
    branch: v.string(),
    filePath: v.string(),
    content: v.string(),
    hash: v.string(),
    lastSync: v.number(),
    status: v.union(v.literal("success"), v.literal("error"), v.literal("pending"))
  }).index("by_repo", ["repo"]),

  // מנויים (Stripe)
  subscriptions: defineTable({
    userId: v.id("users"),
    tier: v.union(
      v.literal("free"),
      v.literal("premium"),
      v.literal("pro"),
      v.literal("organization")
    ),
    stripeId: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("canceled"),
      v.literal("expired"),
      v.literal("trial")
    ),
    expiresAt: v.number(),
    createdAt: v.number()
  }).index("by_user", ["userId"]),

  // מסלולי למידה
  learningPaths: defineTable({
    title: v.string(),
    level: v.union(v.literal(1), v.literal(2), v.literal(3)),
    description: v.string(),
    duration: v.string(),
    lessons: v.array(
      v.object({
        id: v.string(),
        title: v.string(),
        content: v.string(),
        type: v.union(
          v.literal("video"),
          v.literal("text"),
          v.literal("interactive"),
          v.literal("quiz")
        ),
        estimatedTime: v.number(),
        resources: v.array(v.string())
      })
    ),
    createdAt: v.number()
  }),

  // התקדמות משתמש
  userProgress: defineTable({
    userId: v.id("users"),
    pathId: v.id("learningPaths"),
    currentLesson: v.number(),
    completedLessons: v.array(v.number()),
    score: v.number(),
    startedAt: v.number(),
    completedAt: v.optional(v.number())
  }).index("by_user_path", ["userId", "pathId"]),

  // העלויות / קהילה
  communityPosts: defineTable({
    userId: v.id("users"),
    title: v.string(),
    content: v.string(),
    category: v.union(
      v.literal("question"),
      v.literal("insight"),
      v.literal("translation"),
      v.literal("resource")
    ),
    upvotes: v.number(),
    replies: v.array(
      v.object({
        id: v.string(),
        userId: v.id("users"),
        content: v.string(),
        upvotes: v.number(),
        createdAt: v.number()
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number()
  }).index("by_category", ["category"])
});
