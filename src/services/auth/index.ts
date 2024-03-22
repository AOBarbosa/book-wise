import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'

import { prisma } from '@/lib/prisma'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/signIn',
    signOut: '/signIn',
    error: '/signIn',
    verifyRequest: '/signIn',
    newUser: '/home',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
})
