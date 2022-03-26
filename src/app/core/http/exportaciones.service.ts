import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ExportacionesService {
    constructor(private http: HttpClient) { }

    exportar(tipo: string, frecuencia: string, tipoInformacion: string, fechaDesde: string, fechaHasta: string): any {
        this.http
            .get(`${environment.apiUrl}/${tipoInformacion}?fechaInicio=${fechaDesde}&fechaFin=${fechaHasta}`, {
                responseType: "blob" as "json",
            })
            .subscribe((response: any) => {
                let dataType = response.type;
                let binaryData: any = [];
                binaryData.push(response);
                let downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(
                    new Blob(binaryData, { type: dataType })
                );
                downloadLink.setAttribute("download", `${tipo}_${frecuencia}_${this.makeid(25)}.xls`);
                document.body.appendChild(downloadLink);
                downloadLink.click();
            });
    }

    makeid(length: number) {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}