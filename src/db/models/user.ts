export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public readonly hashed_password: string,
    public description: string,
    public last_login_date?: string,
    public readonly created_date?: string,
  ) { }
}