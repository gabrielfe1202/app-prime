export class User {
    id!: number;
    name!: string;
    email!: string | null;
    imageUser!: string | null

    public getFirstName() {
        return this.name.trim().split(" ")[0]
    }
}