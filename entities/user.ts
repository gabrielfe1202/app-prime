import { Address } from "@/objectValues/address";
import { Phone } from "@/objectValues/phone";

export class User {
    id!: number;
    name!: string;
    email!: string | null;
    phone!: Phone;
    cellPhone!: Phone;
    address!: Address | null;
    imageUser!: string | null

    public getFirstName() {
        if(this.name == null || this.name == ""){
            return ""
        }
        return this.name.trim().split(" ")[0]
    }
}