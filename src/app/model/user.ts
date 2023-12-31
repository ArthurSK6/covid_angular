import { VaccinationCenter } from './vaccination-center';

export interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: string;
    centre: VaccinationCenter;
}
