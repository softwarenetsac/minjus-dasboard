import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-eventos-distrito',
    templateUrl: './eventos-distrito.component.html',
})
export class EventosDistritoComponent {
    public graficoDataSource: any[] = [];

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        if (event.anio && event.distritoJudicial) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'eventosDistritoDiario' : 'eventosDistritoCerrado']({
                "anio": event.anio,
                "idDistrito": event.distritoJudicial
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos != null && data.datos.length > 0) {
                        this.graficoDataSource = data.datos;
                    } else {
                        this.toastr.warning('No se encontraron datos', 'Mensaje del sistema');
                    }
                } else {
                    this.toastr.error('Ocurrió un error en el servicio', 'Mensaje del sistema');
                }
            }, (error: any) => console.log(error));
        }
    }

    sumatoria(e: string): number {
        return this.graficoDataSource.reduce((t, o) => o[e] + t, 0);
    }
}