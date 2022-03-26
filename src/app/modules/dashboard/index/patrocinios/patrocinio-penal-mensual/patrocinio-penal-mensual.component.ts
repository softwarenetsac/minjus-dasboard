import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Highcharts from 'highcharts';
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-patrocinio-penal-mensual',
    templateUrl: './patrocinio-penal-mensual.component.html',
})
export class PatrocinioPenalMensualComponent {
    public graficoDataSource: any[] = [];
    public total: number = 0;

    public chartHeight: number = 0;

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        this.total = 0;
        this.chartHeight = 0;
        if (event.anio && event.distritoJudicial && event.sede && event.grupoServicio) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'patrocinioNuevoMensualDiario' : 'patrocinioNuevoMensualCerrado']({
                "anio": event.anio,
                "idDistrito": event.distritoJudicial,
                "idGrupoServicio": event.grupoServicio,
                "idSede": event.sede
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos != null && data.datos.length > 0) {
                        this.graficoDataSource = data.datos;

                        this.total = this.graficoDataSource.reduce((t, o) => o.Total + t, 0);

                        let options: any = {
                            title: {
                                text: `Patrocinios nuevos en materia penal por mes ${event.anio} - ${event.tipo}`
                            },

                            yAxis: {
                                title: {
                                    text: 'Cantidad de patrocinios'
                                }
                            },

                            xAxis: {
                                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic']
                            },

                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },

                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                },
                                series: {
                                    label: {
                                        connectorAllowed: false
                                    },
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                name: 'Patrocinios',
                                color: '#4A935E',
                                data: this.graficoDataSource.map(o => {
                                    let data = [
                                        o['Enero'] == undefined ? 0 : o['Enero'],
                                        o['Febrero'] == undefined ? 0 : o['Febrero'],
                                        o['Marzo'] == undefined ? 0 : o['Marzo'],
                                        o['Abril'] == undefined ? 0 : o['Abril'],
                                        o['Mayo'] == undefined ? 0 : o['Mayo'],
                                        o['Junio'] == undefined ? 0 : o['Junio'],
                                        o['Julio'] == undefined ? 0 : o['Julio'],
                                        o['Agosto'] == undefined ? 0 : o['Agosto'],
                                        o['Setiembre'] == undefined ? 0 : o['Setiembre'],
                                        o['Octubre'] == undefined ? 0 : o['Octubre'],
                                        o['Noviembre'] == undefined ? 0 : o['Noviembre'],
                                        o['Diciembre'] == undefined ? 0 : o['Diciembre']
                                    ];

                                    return data;
                                })[0]
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
                            Highcharts.chart('chartdiv2', options);
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