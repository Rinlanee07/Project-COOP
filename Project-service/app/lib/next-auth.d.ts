// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: string;
      phone?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
    phone?: string | null;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    name?: string;
    phone?: string | null;
    accessToken?: string;
  }
}