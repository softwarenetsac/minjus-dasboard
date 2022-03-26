import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GraficosService {
    constructor(private http: HttpClient) { }

    consultasMesDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getMesDiario`, formulario);
    }

    consultasMesCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getMesCerrado`, formulario);
    }

    consultasAnualDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getAnualDiario`, formulario);
    }

    consultasAnualCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getAnualCerrado`, formulario);
    }

    consultasDistritoJudicialDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getDistritoJudicialDiario`, formulario);
    }

    consultasDistritoJudicialCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getDistritoJudicialCerrado`, formulario);
    }

    patrocinioNuevoPeriodoDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoAnioDiario`, formulario);
    }

    patrocinioNuevoPeriodoCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoAnioCerrado`, formulario);
    }

    patrocinioNuevoMensualDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoMesDiario`, formulario);
    }

    patrocinioNuevoMensualCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoMesCerrado`, formulario);
    }

    patrocinioNuevoEdadDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoRangoEdadDiario`, formulario);
    }

    patrocinioNuevoEdadCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoRangoEdadCerrado`, formulario);
    }

    patrocinioNuevoGeneroDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoGeneroDiario`, formulario);
    }

    patrocinioNuevoGeneroCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoGeneroCerrado`, formulario);
    }

    patrocinioNuevoDistritoDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoDistritoDiario`, formulario);
    }

    patrocinioNuevoDistritoCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getPatrocinioNuevoDistritoCerrado`, formulario);
    }

    eventosTemarioDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getEventoTemarioDiario`, formulario);
    }

    eventosTemarioCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getEventoTemarioCerrado`, formulario);
    }

    eventosDistritoDiario(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getEventoDistritoDiario`, formulario);
    }

    eventosDistritoCerrado(formulario: any) {
        return this.http.post(`${environment.apiUrl}/getEventoDistritoCerrado`, formulario);
    }
}