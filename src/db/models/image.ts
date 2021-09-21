export class Image {
  constructor(
    public link: string,
    public user_id: string,
    public key: string,
    public id?: string,
    public created_date?: number,
  ) { }
}