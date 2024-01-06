import { Rdv } from './rdv.model';
import { User } from './user.model';

export interface VaccinationCenter{
    id: number | undefined;
    name: string;
    postalCode: string;
    address: string;
    city: string;
    users: User[] | undefined;
    rdv: Rdv[] | undefined;
}