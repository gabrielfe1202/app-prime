
export function isNullOrEmpty(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
}

export const validEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
};