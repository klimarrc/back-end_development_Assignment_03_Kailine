export type EventStatus = "active" | "cancelled" | "completed";

export type EventCategory = "conference" | "workshop" | "seminar" | "webinar";

export interface Event {
    id: string;
    name: string;
    date: Date;
    capacity?: number;
    registrationCount: number;
    status: EventStatus;
    category: EventCategory;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateEventBody {
    name: string;
    date: Date;
    capacity?: number;
    registrationCount: number;
    status: EventStatus;
    category: EventCategory;
}