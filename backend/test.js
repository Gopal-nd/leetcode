export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      mapProfileToUser: (profile) => ({
        email: profile.email,
        name: profile.name,
        role: profile.email === process.env.ADMIN_EMAIL! ? "admin" : "user",
      }),
    },
  },
  trustedOrigins: [process.env.FRONTEND_URL!],

  // ✅ Add cookie config
  cookies: {
    secure: true,
    sameSite: "lax",
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          // optional
        },
        after: async (user, ctx) => {
          if (user.email === process.env.ADMIN_EMAIL) {
            await prisma.user.update({
              where: { email: user.email },
              data: { role: "ADMIN" },
            });
          }
        },
      },
    },
  },

  plugins: [
    customSession(async ({ user, session }) => {
      const role = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true },
      }).then((res) => res?.role);

      return {
        user: {
          role,
          ...user,
        },
        session,
      };
    }),
  ],
});
