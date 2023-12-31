import { User } from './user';

export interface VaccinationCenter{
    id: number;
    name: string;
    postalCode: string;
    address: string;
    city: string;
    users: User[];
}


/*
export interface Observable{
    id: number;
    name: string;
    address: string;
    postalCode: string;
    city: string;
    openinDate: Date;
}
*/