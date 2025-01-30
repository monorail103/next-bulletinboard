export const generateId = (ip: string, date: string) => {
    if (!ip || !date) {
        ip = "127.0.0.1";
        date = new Date().toISOString().split('T')[0];
    }
    return `user_${Buffer.from(ip + date).toString('hex')}`;
}