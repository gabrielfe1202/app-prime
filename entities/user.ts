import { Address } from "@/objectValues/address";
import { Phone } from "@/objectValues/phone";

export class User {
    id!: number;
    name!: string;
    email!: string | null;
    phone!: Phone;
    cellPhone!: Phone;
    address!: Address | null;
    imageUser!: string | null;

    public getFirstName() {
        if (this.name == null || this.name === "") {
            return ""
        }
        return this.name.trim().split(" ")[0]
    }

    public getLastName() {
        if (this.name == null || this.name.trim() === "") {
            return "";
        }
        const parts = this.name.trim().split(" ");
        return parts.length > 1 ? parts[parts.length - 1] : "";
    }

    public getFirstAndLastName() {
        const first = this.getFirstName();
        const last = this.getLastName();
        return [first, last].filter(Boolean).join(" ");
    }
}