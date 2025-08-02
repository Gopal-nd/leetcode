import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./src/lib/db";
import { customSession } from "better-auth/plugins";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
     socialProviders: {
        google: {
            clientId: process.env.  GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            mapProfileToUser: (profile) => {
        return {
          email: profile.email,
          name: profile.name,
          role: profile.email === process.env.ADMIN_EMAIL! ? "admin" : "user",
        };
      },
        }
    },
    trustedOrigins: [process.env.FRONTEND_URL!],
    databaseHooks:{
        user:{
           create:{
            before: async (user, ctx) => {
               
                
            },
            after: async (user,ctx) => {
                const roles = user.email === process.env.ADMIN_EMAIL! ? "ADMIN" : "USER";

                if (roles === "ADMIN") {
                  const update = await prisma.user.update({
                      where: {
                          email: user.email
                      },
                      data: {
                          role: "ADMIN"
                      }
                  })
            }
            }
           },
           update: {
           }
        }
    },
    plugins:[
         customSession(async ({ user, session }) => {
            const role = await prisma.user.findUnique({ where: { email: user.email }, select: { role: true } }).then((res) => res?.role);
            return {
                user: {
                    role: role,
                    ...user,
                },
                session
            };
        }),
    ]

});


