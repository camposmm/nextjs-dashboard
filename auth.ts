import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';

// Mock user data for testing
async function getUser(email: string): Promise<User | undefined> {
  try {
    // For testing purposes, return a mock user
    if (email === 'user@nextmail.com') {
      return {
        id: '1',
        name: 'Test User',
        email: 'user@nextmail.com',
        password: '123456', // Plain text for testing - in production, use bcrypt
      };
    }
    return undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6) 
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          
          if (!user) return null;
          
          // Simple password comparison for testing
          // In production, use: await bcrypt.compare(password, user.password);
          if (password === user.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});