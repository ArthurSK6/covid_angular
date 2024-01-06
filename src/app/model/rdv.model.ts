import { VaccinationCenter } from "./vaccination-center.model";

export interface Rdv {
    id: number | undefined;
    date: Date;
    email: string;
    telephone: string;
    nom: string;
    prenom: string;
    vaccinated: boolean | undefined;
    vaccinationCenter: VaccinationCenter | undefined;
}
