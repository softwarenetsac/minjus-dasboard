import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-consultas-defensa-penal',
    templateUrl: './consultas-defensa-penal.component.html',
})
export class ConsultasDefensaPenalComponent {
    public tablasDataSource: any[] = [];

    public primeraTablaDataSource: any[] = [];
    public segundaTablaDataSource: any[] = [];

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerReporte(event: any) {
        this.tablasDataSource = [];
        if (event.anio && event.materia) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'consultasDistritoJudicialDiario' : 'consultasDistritoJudicialCerrado']({
                "anio": event.anio,
                "idMateria": event.materia
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos.length > 0) {
                        this.tablasDataSource = data.datos;

                        this.primeraTablaDataSource = this.tablasDataSource.slice(0, 17);
                        this.segundaTablaDataSource = this.tablasDataSource.slice(17, this.tablasDataSource.length);
                    } else {
                        this.toastr.warning('No se encontraron datos', 'Mensaje del sistema');
                    }
                } else {
                    this.toastr.error('Ocurrió un error en el servicio', 'Mensaje del sistema');
                }
            }, (error: any) => console.log(error));
        }
    }

    sumatoria(t: string, e: string): number {
        return this[t].reduce((t, o) => o[e] + t, 0);
    }
}
