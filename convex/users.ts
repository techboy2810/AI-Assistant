import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .collect();

    // If user doesn't exist, insert new record
    if (user.length === 0) {
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 5000,
      };
      await ctx.db.insert("users", data);
      return data;
    }
    
    return user[0]; // Return existing user
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Fetch user by email
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first(); // Use `.first()` instead of `.collect()` to get a single object

    return user; // Returns `null` if user is not found
  },
});
