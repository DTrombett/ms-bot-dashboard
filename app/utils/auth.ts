import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Discord],
	callbacks: {
		async jwt({ account, token }) {
			if (account?.providerAccountId) token.userId = account.providerAccountId;
			return token;
		},
		async session({ session, token }) {
			if (typeof token.userId === "string") session.user.id = token.userId;
			return session;
		},
	},
});
