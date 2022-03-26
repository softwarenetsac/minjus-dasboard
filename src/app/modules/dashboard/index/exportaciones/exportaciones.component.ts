import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-exportaciones',
    templateUrl: './exportaciones.component.html',
})
export class ExportacionesComponent {
    constructor(private fs: FacadeService) { }

    obtenerReporte(event: any): void {
        let tipoInformacion: string = '';
        switch (event.informacion) {
            case 'CONSULTAS':
                tipoInformacion = event.tipo == 'DIARIO' ? 'getDiarioExcel' : 'getCerradoExcel';
                break;
            case 'PATROCINIOS':
                tipoInformacion = event.tipo == 'DIARIO' ? 'getPatrocinioDiarioExcel' : 'getPatrocinioCerradoExcel';
                break;
            case 'EVENTOS':
                tipoInformacion = event.tipo == 'DIARIO' ? 'getEventoDiarioExcel' : 'getEventoCerradoExcel';
                break;
            case 'PATROCINIO_DELITO':
                tipoInformacion = event.tipo == 'DIARIO' ? 'getPatrocinioDelitoDiarioExcel' : 'getPatrocinioDelitoCerradoExcel';
                break;
            case 'DILIGENCIA_LIBRE':
                tipoInformacion = event.tipo == 'DIARIO' ? 'getDiligenciaLibreDiarioExcel' : 'getDiligenciaLibreCerradoExcel';
                break;
            default:
                break;
        }

        this.fs.exportacionesService.exportar(event.informacion, event.tipo, tipoInformacion, event.fechaDesde.split('-').join(''), event.fechaHasta.split('-').join(''));
    }
}