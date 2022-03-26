import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import * as Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
import { FacadeService } from 'src/app/core/patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-consultas-diarias',
    templateUrl: './consultas-diarias.component.html',
})
export class ConsultasDiariasComponent {
    public graficoDataSource: any[] = [];
    public total: number = 0;

    public chartHeight: number = 0;

    constructor(private fs: FacadeService, private toastr: ToastrService) { }

    async obtenerGrafico(event: any) {
        this.graficoDataSource = [];
        this.total = 0;
        this.chartHeight = 0;
        if (event.anio && event.distritoJudicial && event.sede) {
            this.fs.graficosService[event.tipo === 'DIARIO' ? 'consultasAnualDiario' : 'consultasAnualCerrado']({
                "anio": event.anio,
                "idDistrito": event.distritoJudicial,
                "idSede": event.sede
            }).subscribe((data: any) => {
                if (data.codigo === '0000') {
                    if (data.datos.length > 0) {
                        this.graficoDataSource = data.datos;

                        this.total = this.sumatoriaGeneral();

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
                                text: `Consulta anuales ${event.anio} - ${event.tipo}`
                            },
                            plotOptions: {
                                series: {
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.name}: {point.y:.1f}%'
                                    }
                                }
                            },
                        
                            tooltip: {
                                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
                            },
                            series: [{
                                name: 'Consultas',
                                colorByPoint: true,
                                data: this.graficoDataSource.map((g, i) => {
                                    if (i === 0) return {
                                        name: g.materia,
                                        y: (this.sumatoriaTotal(g.materia) / this.total) * 100,
                                        sliced: true,
                                        selected: true,
                                        drilldown: g.materia
                                    };
                                    return {
                                        name: g.materia,
                                        y: (this.sumatoriaTotal(g.materia) / this.total) * 100,
                                        drilldown: g.materia
                                    };
                                })
                            }],
                            drilldown: {
                                series: this.graficoDataSource.map((g, i) => {
                                    let st = this.sumatoriaTotal(g.materia);
                                    return {
                                        name: g.materia,
                                        id: g.materia,
                                        data: [
                                            ['Enero', (g.Enero / st) * 100],
                                            ['Febrero', (g.Febrero / st) * 100],
                                            ['Marzo', (g.Marzo / st) * 100],
                                            ['Abril', (g.Abril / st) * 100],
                                            ['Mayo', (g.Mayo / st) * 100],
                                            ['Junio', (g.Junio / st) * 100],
                                            ['Julio', (g.Julio / st) * 100],
                                            ['Agosto', (g.Agosto / st) * 100],
                                            ['Septiembre', (g.Setiembre / st) * 100],
                                            ['Octubre', (g.Octubre / st) * 100],
                                            ['Noviembre', (g.Noviembre / st) * 100],
                                            ['Diciembre', (g.Diciembre / st) * 100]
                                        ]
                                    };
                                })
                            }
                        };

                        this.chartHeight = 405;
                        setTimeout(() => {
                            Highcharts.chart('chartdiv2', options);
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

    sumatoria(e: string): number {
        return this.graficoDataSource.reduce((t, o) => o[e] + t, 0);
    }

    sumatoriaTotal(f: string): number {
        let s = 0;
        this.graficoDataSource.forEach(g => {
            if (g.materia === f) {
                s = s + (g.Enero + g.Febrero + g.Marzo + g.Abril + g.Mayo + g.Junio + g.Julio + g.Agosto + g.Setiembre + g.Octubre + g.Noviembre + g.Diciembre);
                return;
            }
        });

        return s;
    }

    sumatoriaGeneral(): number {
        let s = 0;
        this.graficoDataSource.forEach(g => {
            s = s + this.sumatoriaTotal(g.materia);
        });

        return s;
    }
}
