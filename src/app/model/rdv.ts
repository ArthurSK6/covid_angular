import { VaccinationCenter } from './vaccination-center';

export interface Rdv {
    id: number;
    date: Date;
    mail: string;
    phone: string;
    nom: string;
    prenom: string;
    vaccinationCenter: VaccinationCenter;
}
