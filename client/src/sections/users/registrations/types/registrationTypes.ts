

export interface RegistrationEvent {
    id: string;
    slug: string;

    titleEn: string;
    titleMn: string;

    descriptionEn: string;
    descriptionMn: string;

    startsAt: string;
    endsAt: string | null;

    location: string;

    published: boolean;
    registerable: boolean;

    registrationCost: number | null;

    coverImage: string | null;
    coverImageAltEn: string | null;
    coverImageAltMn: string | null;

    contactEmail: string | null;
    contactPhone: string | null;
}

export type EventRegistrationStatus =
    | "REGISTERED"
    | "CANCELLED";

export interface UserEventRegistration {
    id: string;

    userId: number | null;

    firstName: string;
    lastName: string;
    email: string;

    status: EventRegistrationStatus;

    createdAt: string;

    event: RegistrationEvent;
}