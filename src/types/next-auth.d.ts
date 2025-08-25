import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: 'USER' | 'ADMIN'
      isPremium: boolean
    }
  }

  interface User {
    role: 'USER' | 'ADMIN'
    isPremium: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'USER' | 'ADMIN'
    isPremium: boolean
  }
}