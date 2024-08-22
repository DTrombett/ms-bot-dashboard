import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Discord],
	callbacks: {
		async session({ session, token }) {
			if (token.picture?.includes("discord") && token.sub)
				session.user.id = token.sub;
			return session;
		},
	},
});
