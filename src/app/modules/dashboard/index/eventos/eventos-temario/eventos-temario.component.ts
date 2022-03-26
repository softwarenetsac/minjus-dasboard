import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-eventos-temario',
    templateUrl: './eventos-temario.component.html',
})
export class EventosTemarioComponent {
    public graficoDataSource: any[] = [];

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        if (event.anio && event.distritoJudicial && event.sede) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'eventosTemarioDiario' : 'eventosTemarioCerrado']({
                "anio": event.anio,
                "idDistrito": event.distritoJudicial,
                "idSede": event.sede
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