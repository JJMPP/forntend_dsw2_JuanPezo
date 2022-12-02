import { User } from "./user";

export class Owner {
    cod_propietario: number;
    nom_propietario: string;
    dni_propietario: string;
    edad_propietario: number;
    correo_propietario: string;
    fecha_incio_contrato: Date;
    fecha_fin_contrato: Date;
    usuario: User;
}
