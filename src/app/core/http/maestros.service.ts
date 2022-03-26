import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class MaestrosService {
    constructor(private http: HttpClient) { }

    private formatErrors(error: any) {
        return throwError(error.error);
    }

    listarAnios() {
        return this.http.get(`${environment.apiUrl}/listaAnio`);
    }

    listaDistritoJudicial() {
        return this.http.get(`${environment.apiUrl}/listaDistritoJudicial`);
    }

    listaMateria() {
        return this.http.get(`${environment.apiUrl}/listaMateria`);
    }

    listaMes() {
        return this.http.get(`${environment.apiUrl}/listaMes`); 
    }

    listaGrupoServicio() {
        return this.http.get(`${environment.apiUrl}/listaGrupoServicio`); 
    }

    listaSede(idDistrito: string) {
        return this.http.get(`${environment.apiUrl}/listaSede?idDistrito=${idDistrito}`); 
    }
}