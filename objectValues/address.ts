export class Address {
    street!: string | null;
    number!: string | null;
    complement!: string | null;
    neighborhood!: string | null;
    city!: string | null;
    state!: string | null;
    postalCode!: string | null;
    country!: string | null;

    constructor() { }

    setAddress(
        street: string | null,
        number: string | null,
        complement: string | null,
        neighborhood: string | null,
        city: string | null,
        state: string | null,
        postalCode: string | null,
    ): void {
        this.street = street;
        this.number = number;
        this.complement = complement;
        this.neighborhood = neighborhood;
        this.city = city;
        this.state = state;
        this.postalCode = postalCode;
    }

    validateAddress(): boolean {
        return !!(
            this.street && this.street.trim() ||
            this.postalCode && this.postalCode.trim()
        );
    }

    formatAddress(): string {
        const parts: string[] = [];

        if (this.street) parts.push(this.street.trim());
        if (this.number) parts.push(this.number.trim());
        if (this.complement) parts.push(this.complement.trim());
        if (this.neighborhood) parts.push(this.neighborhood.trim());

        const cityState = [];
        if (this.city) cityState.push(this.city.trim());
        if (this.state) cityState.push(this.state.trim());

        if (cityState.length > 0) {
            parts.push(cityState.join(' - '));
        }

        if (this.postalCode) parts.push(this.postalCode.trim());

        return parts.join(', ');
    }
}