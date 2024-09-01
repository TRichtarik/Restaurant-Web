export interface Restaurant {
    id: number;
    name: string;
    photo: string | null;
    description: string;
    openingHours: OpeningHours[];
}

export interface OpeningHours {
    id: number;
    dayOfWeek: number;
    openingTime: Date;
    closingTime: Date;
}[]

export interface EditRestaurantData {
    name: string;
    description: string;
    photo?: string;
    address: Address
}

export interface Address {
    address: string;
    city: string;
    zipCode: string;
}

export interface RestaurantExtended extends Restaurant {
    address: Address
}