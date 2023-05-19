

export function formatDatetimeToDateString(datetime: string): string {
    const date = new Date(datetime);
    return date.toLocaleString();
}