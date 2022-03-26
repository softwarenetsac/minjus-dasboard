import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Highcharts from 'highcharts';
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-patrocinio-penal-periodo',
    templateUrl: './patrocinio-penal-periodo.component.html',
})
export class PatrocinioPenalPeriodoComponent {
    public graficoDataSource: any[] = [];
    public total: number = 0;

    public chartHeight: number = 0;

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        this.total = 0;
        this.chartHeight = 0;
        if (event.anio && event.distritoJudicial && event.sede && event.grupoServicio) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'patrocinioNuevoPeriodoDiario' : 'patrocinioNuevoPeriodoCerrado']({
                "idDistrito": event.distritoJudicial,
                "idGrupoServicio": event.grupoServicio,
                "idSede": event.sede
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos != null && data.datos.length > 0) {
                        this.graficoDataSource = data.datos;

                        this.total = this.graficoDataSource.reduce((t, o) => o.Total + t, 0);

                        let options: any = {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Patrocinios nuevos en materia penal por período - ' + event.tipo
                            },

                            yAxis: {
                                title: {
                                    text: 'Cantidad de patrocinios'
                                }
                            },

                            xAxis: {
                                categories: this.graficoDataSource.map(o => Object.keys(o)[0])
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
                                color: '#4A935E',
                                data: this.graficoDataSource.map(o => o.Total)
                            }],

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

                        this.chartHeight = 305;
                        setTimeout(() => {
                            Highcharts.chart('chartdiv', options);
                        },0);
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