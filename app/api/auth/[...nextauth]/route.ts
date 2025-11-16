// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth';

// This connects NextAuth to /api/auth/* (including /callback/credentials)
export const { GET, POST } = handlers;