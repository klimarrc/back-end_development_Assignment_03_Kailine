export type EventStatus = "active" | "cancelled" | "completed";
export type EventCategory = "general" | "conference" | "workshop" | "meetup";

export interface EventPost {
    id: string;
    name: string;
    date: string;
    capacity?: number;
    registrationCount: number;
    status: EventStatus;
    category: EventCategory;
    createdAt: string;
    updatedAt: string;
}
