// auth.ts
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import { authConfig } from './auth.config';

// Simple mock user for testing.
// In the PDF they use user@nextmail.com / 123456
async function getUser(email: string): Promise<User | undefined> {
  if (email === 'user@nextmail.com') {
    return {
      id: '1',
      name: 'Test User',
      email: 'user@nextmail.com',
      password: '123456', // in real code this would be a hashed password
    };
  }

  return undefined;
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate credentials with zod
        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          console.log('Invalid credential shape');
          return null;
        }

        const { email, password } = parsed.data;
        const user = await getUser(email);

        if (!user) {
          console.log('User not found');
          return null;
        }

        // For now plain compare; in real app use bcrypt.compare(...)
        if (password === user.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});