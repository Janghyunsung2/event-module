export class CreateEventDto {
    _id: string;
    title: string;
    type: string;
    creatorId: string;
    description: string;
    endAt: Date;
    status: 'ACTIVE' | 'COMPLETED' | 'EXPIRED' | 'FAILED' | 'CANCELLED';
    conditions: { type: string; value: number }[];
    rewards: { type: string; amount: number; unit: string }[];
}