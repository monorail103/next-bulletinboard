import type { Tag } from '@/app/_types/Tag';

export type Thread = {
    id: number;
    title: string;
    createdAt: Date;
    ipaddress: string;
    isActive: boolean;
    good: number;
    tags: Tag[];
}