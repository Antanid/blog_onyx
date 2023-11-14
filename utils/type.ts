export type sessionType = {
    expires: string,
    user: {
      email: string,
      name: string,
      image?: string,
      role: string
    }
}