import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    // check if user already exists in the database
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    // if no user found, add a new user
    if (user?.length == 0) {
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 5000,
      };
      const result = await ctx.db.insert("users", data);
      return data;
    }
    return user[0]; // user is a list of users, so we return the first one
  },
});

export const GetUser = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // check if user already exists in the database
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
    return user[0]; // user is a list of users, so we return the first one
  },
}); // Get user by email to check if user exists in the database and fetches data from the database
