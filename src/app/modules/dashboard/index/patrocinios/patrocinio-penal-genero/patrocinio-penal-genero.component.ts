import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Highcharts from 'highcharts';
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-patrocinio-penal-genero',
    templateUrl: './patrocinio-penal-genero.component.html',
})
export class PatrocinioPenalGeneroComponent {
    public graficoDataSource: any[] = [];
    public total: number = 0;

    public chartHeight: number = 0;

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        this.total = 0;
        this.chartHeight = 0;
        if (event.anio && event.distritoJudicial && event.sede && event.grupoServicio) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'patrocinioNuevoGeneroDiario' : 'patrocinioNuevoGeneroCerrado']({
                "anio": event.anio,
                "idDistrito": event.distritoJudicial,
                "idGrupoServicio": event.grupoServicio,
                "idSede": event.sede
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos != null && data.datos.length > 0) {
                        this.graficoDataSource = data.datos;

                        this.total = this.graficoDataSource.reduce((t, o) => o.total + t, 0);

                        let options: any = {
                            chart: {
                                type: 'pie'
                            },
                            accessibility: {
                                announceNewData: {
                                    enabled: true
                                },
                                point: {
                                    valueSuffix: '%'
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: `Patrocinios nuevos en materia penal ${event.anio} - ${event.tipo}`
                            },
                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}: {point.y:.1f}% ({point.quantity})'
                                    }
                                }
                            },

                            tooltip: {
                                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}% ({point.quantity})</b> del total<br/>'
                            },
                            series: [{
                                name: 'Patrocinios',
                                colorByPoint: true,
                                data: this.graficoDataSource.map((g, i) => {
                                    if (i === 0) return {
                                        name: g.PNI_PATROCINADO_SEXO,
                                        y: (g.total / this.total) * 100,
                                        sliced: true,
                                        selected: true,
                                        quantity: g.total
                                    };
                                    return {
                                        name: g.PNI_PATROCINADO_SEXO,
                                        y: (g.total / this.total) * 100,
                                        quantity: g.total
                                    };
                                })
                            }]
                        };

                        this.chartHeight = 405;
                        setTimeout(() => {
                            Highcharts.chart('chartdiv4', options);
                        }, 0);
                    } else {
                        this.toastr.warning('No se encontraron datos', 'Mensaje del sistema');
                    }
                } else {
                    this.toastr.error('Ocurrió un error en el servicio', 'Mensaje del sistema');
                }
            }, (error: any) => console.log(error));
        }
    }
}