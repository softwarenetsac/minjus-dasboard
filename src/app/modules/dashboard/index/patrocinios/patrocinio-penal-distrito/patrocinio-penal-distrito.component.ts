import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Highcharts from 'highcharts';
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-patrocinio-penal-distrito',
    templateUrl: './patrocinio-penal-distrito.component.html',
})
export class PatrocinioPenalDistritoComponent {
    public graficoDataSource: any[] = [];
    public total: number = 0;

    public chartHeight: number = 0;

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        this.total = 0;
        this.chartHeight = 0;
        if (event.anio && event.grupoServicio) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'patrocinioNuevoDistritoDiario' : 'patrocinioNuevoDistritoCerrado']({
                "anio": event.anio,
                "idGrupoServicio": event.grupoServicio
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos != null && data.datos.length > 0) {
                        this.graficoDataSource = data.datos;

                        this.total = this.graficoDataSource.reduce((t, o) => o.total + t, 0);

                        let options: any = {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: `Patrocinios nuevos en materia penal por distrito judicial ${event.anio} - ${event.tipo}`
                            },

                            yAxis: {
                                title: {
                                    text: 'Cantidad de patrocinios'
                                }
                            },
                            xAxis: {
                                type: 'category'
                            },

                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },
                            plotOptions: {
                                series: {
                                    borderWidth: 0,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.y}'
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> del total<br/>'
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                name: 'Patrocinios',
                                //colorByPoint: true,
                                color: '#4A935E',
                                data: this.graficoDataSource.map(o => {
                                    return {
                                        name: o.CAS_DISTRITOJUDICIAL,
                                        y: o.total,
                                        drilldown: o.CAS_DISTRITOJUDICIAL
                                    };
                                })
                            }],
                            drilldown: {
                                series: this.graficoDataSource.map(o => {
                                    return {
                                        name: o.CAS_DISTRITOJUDICIAL,
                                        id: o.CAS_DISTRITOJUDICIAL,
                                        data: [
                                            ['Femenino', o.total_femenino],
                                            ['Masculino', o.total_masculino]
                                        ]
                                    };
                                })
                            },
                            responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                            layout: 'horizontal',
                                            align: 'center',
                                            verticalAlign: 'bottom'
                                        }
                                    }
                                }]
                            }

                        };

                        this.chartHeight = 505;
                        setTimeout(() => {
                            Highcharts.chart('chartdiv5', options);
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

    sumatoria(e: string): number {
        return this.graficoDataSource.reduce((t, o) => o[e] + t, 0);
    }
}