import { VaccinationCenter } from './vaccination-center.model';

export interface User {
    id: number | undefined;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    role: string | undefined;
    vaccinationCenter: VaccinationCenter | undefined | null;
}
