import { Address } from "@/objectValues/address";

export class User {
    id!: number;
    name!: string;
    email!: string | null;
    phone!: string | null;
    address!: Address | null;
    imageUser!: string | null

    public getFirstName() {
        if(this.name == null || this.name == ""){
            return ""
        }
        return this.name.trim().split(" ")[0]
    }
}