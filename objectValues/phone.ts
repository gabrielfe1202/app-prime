export class Phone{    
    constructor(public number: string | null){
        this.number = number
    }

    formatNumber(): string {
        if (!this.number) return '';

        // Remove tudo que não é número
        const digits = this.number.replace(/\D/g, '');

        // Verifica se começa com código do país (55)
        const hasCountryCode = digits.length === 13 && digits.startsWith('55');
        const dddStart = hasCountryCode ? 2 : 0;

        const countryCode = hasCountryCode ? '+55 ' : '';
        const ddd = digits.slice(dddStart, dddStart + 2);
        const phoneNumber = digits.slice(dddStart + 2);

        let formattedNumber;

        if (phoneNumber.length === 8) {
            // Telefone fixo
            formattedNumber = `${phoneNumber.slice(0, 4)}-${phoneNumber.slice(4)}`;
        } else if (phoneNumber.length === 9) {
            // Celular
            formattedNumber = `${phoneNumber.slice(0, 5)}-${phoneNumber.slice(5)}`;
        } else {
            return this.number; // Retorna como está se não seguir os padrões
        }

        return `${countryCode}(${ddd}) ${formattedNumber}`;
    }
}