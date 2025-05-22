function formatDateTime(mongoDate: string | Date): string {
    const date = new Date(mongoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    return `${day}-${month}-${year}, ${formattedTime}`;
}
function formatDate(mongoDate: string | Date): string {
    const date = new Date(mongoDate);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export { formatDateTime, formatDate };
