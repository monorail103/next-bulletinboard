export const generateId = (ip: string) => {
    if (!ip) {
        ip = "127.0.0.1";
    }
    const date = new Date().toLocaleDateString('ja-JP');
    return `user_${Buffer.from(ip + date).toString('hex')}`;
}