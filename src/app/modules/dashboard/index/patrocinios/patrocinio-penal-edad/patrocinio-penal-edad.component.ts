import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Highcharts from 'highcharts';
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-patrocinio-penal-edad',
    templateUrl: './patrocinio-penal-edad.component.html',
})
export class PatrocinioPenalEdadComponent {
    public graficoDataSource: any[] = [];
    public total: number = 0;

    public chartHeight: number = 0;

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        this.total = 0;
        this.chartHeight = 0;
        if (event.anio && event.distritoJudicial && event.sede && event.grupoServicio) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'patrocinioNuevoEdadDiario' : 'patrocinioNuevoEdadCerrado']({
                "anio": event.anio,
                "edadDesde": event.edadDesde,
                "edadHasta": event.edadHasta,
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
                                text: 'Patrocinios nuevos en materia penal - ' + event.tipo
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
                                //color: '#4A935E',
                                colorByPoint: true,
                                data: this.graficoDataSource.map(o => {
                                    delete o['PNI_GRUPOSERVICIO'];
                                    delete o['Total'];

                                    let x = Object.keys(o);
                                    return x.map(m => {
                                        return {
                                            name: m,
                                            y: o[m]
                                        };
                                    });
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
                            Highcharts.chart('chartdiv3', options);
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