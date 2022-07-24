import { TRPCError } from "@trpc/server";
import { resolveSoa } from "dns";
import { createRouter } from "./context";

enum Roles {
  Teacher = 'teacher',
  Student = 'student'
}

export const authRouter = createRouter()
  // .query("getSession", {
  //   resolve({ ctx }) {
  //     return ctx.session;
  //   },
  // })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .mutation("setRoleAsTeacher", {
    async resolve({ ctx }) {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user?.id
        },
        data: {
          role: Roles.Teacher
        }
      })
      return "role updated";
    },
  });
