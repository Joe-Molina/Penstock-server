import "express-session";

// interface User {
//   id: number
//   username: string
//   email: string
//   role: string
// }

declare module 'express-session' {
  interface SessionData {
    user?: string;
  }
}