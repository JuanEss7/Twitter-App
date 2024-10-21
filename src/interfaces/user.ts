export interface User {
    uid: string,
    email: string | null,
    nick?: string,
    name?: string,
    photoURL?: string,
    following: string[],
}