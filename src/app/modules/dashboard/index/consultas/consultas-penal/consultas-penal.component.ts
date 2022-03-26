import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Highcharts from 'highcharts';
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-consultas-penal',
    templateUrl: './consultas-penal.component.html',
})
export class ConsultasPenalComponent {
    public graficoDataSource: any[] = [];
    public total: number = 0;

    public chartHeight: number = 0;

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        this.total = 0;
        this.chartHeight = 0;
        if (event.anio && event.distritoJudicial && event.sede && event.materia) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'consultasMesDiario' : 'consultasMesCerrado']({
                "anio": event.anio,
                "idDistrito": event.distritoJudicial,
                "idMateria": event.materia,
                "idSede": event.sede
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos.length > 0) {
                        this.graficoDataSource = data.datos;

                        this.total = this.graficoDataSource.reduce((t, o) => o.cantidad + t, 0);

                        let options: any = {
                            title: {
                                text: `Consulta en materia penal ${event.anio} - ${event.tipo}`
                            },

                            yAxis: {
                                title: {
                                    text: 'Cantidad de consultas'
                                }
                            },

                            xAxis: {
                                categories: this.graficoDataSource.map(o => o.mes)
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
                                name: 'Consultas',
                                color: '#4A935E',
                                data: this.graficoDataSource.map(o => o.cantidad)
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
