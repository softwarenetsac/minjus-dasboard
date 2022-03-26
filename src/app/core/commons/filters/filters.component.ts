import { Component, Input, OnInit, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';

import { FacadeService } from '../../patterns/facade.service';

@Component({
    selector: 'minjus-indicadores-dashboard-filtros',
    templateUrl: './filters.component.html',
})
export class FiltrosComponent implements OnInit {
    @Input() tipoCombo: boolean = true;
    @Input() tipoInformacionCombo: boolean = false;
    @Input() anioCombo: boolean = false;
    @Input() materiaCombo: boolean = false;
    @Input() grupoServicioCombo: boolean = false;
    @Input() distritoJudicialCombo: boolean = false;
    @Input() sedeCombo: boolean = false;
    @Input() edadesRango: boolean = false;
    @Input() fechasRango: boolean = false;
    @Input() buscarBoton: string = 'Buscar';

    @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

    public anioDataSource: any[] = [];
    public distritoJudicialDataSource: any[] = [];
    public sedeDataSource: any[] = [];
    public materiaDataSource: any[] = [];
    public grupoServicioDataSource: any[] = [];

    public tipo: string = 'DIARIO';
    public informacion: string = 'CONSULTAS';
    public anio: any;
    public distritoJudicial: any = '0';
    public sede: any = '0';
    public materia: any = '0';
    public grupoServicio: any;
    public edadDesde: number = 0;
    public edadHasta: number = 0;
    public fechaDesde: string;
    public fechaHasta: string;

    constructor(@Inject(LOCALE_ID) private locale: string, private fs: FacadeService) { }

    async ngOnInit(): Promise<void> {
        let hoy = new Date();

        this.fechaDesde = formatDate(new Date(hoy.getFullYear(), hoy.getMonth(), 1), 'yyyy-MM-dd', this.locale);
        this.fechaHasta = formatDate(new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0), 'yyyy-MM-dd', this.locale);

        this.obtenerAnios();
        this.obtenerDistritosJudiciales();
        this.obtenerMaterias();
        this.obtenerGruposServicios();
    }

    async obtenerAnios() {
        this.anioDataSource = [];
        this.fs.maestrosService.listarAnios().subscribe(
            (data: any) => {
                if (data.codigo === '0000') {
                    this.anioDataSource = data.datos as any[];
                    if (this.anioDataSource.length > 0) this.anio = this.anioDataSource[0].codigo;
                }
            }
        );
    }

    async obtenerDistritosJudiciales() {
        this.distritoJudicialDataSource = [];
        this.fs.maestrosService.listaDistritoJudicial().subscribe(
            (data: any) => {
                if (data.codigo === '0000') {
                    this.distritoJudicialDataSource = data.datos as any[];
                    if (this.distritoJudicialDataSource.length > 0) {
                        this.distritoJudicial = '0';
                        this.obtenerSedes();
                    }
                }
            }
        );
    }

    async obtenerMaterias() {
        this.materiaDataSource = [];
        this.fs.maestrosService.listaMateria().subscribe(
            (data: any) => {
                if (data.codigo === '0000') {
                    this.materiaDataSource = data.datos as any[];
                    if (this.materiaDataSource.length > 0) this.materia = '0';
                }
            }
        );
    }

    async obtenerGruposServicios() {
        this.grupoServicioDataSource = [];
        this.fs.maestrosService.listaGrupoServicio().subscribe(
            (data: any) => {
                if (data.codigo === '0000') {
                    this.grupoServicioDataSource = data.datos as any[];
                    if (this.grupoServicioDataSource.length > 0) this.grupoServicio = this.grupoServicioDataSource[0].codigo;
                }
            }
        );
    }

    async obtenerSedes() {
        if (this.distritoJudicial) {
            this.sedeDataSource = [];
            this.fs.maestrosService.listaSede(this.distritoJudicial).subscribe(
                (data: any) => {
                    if (data.codigo === '0000') {
                        this.sedeDataSource = data.datos as any[];
                        if (this.sedeDataSource.length > 0) this.sede = '0';
                    }
                }
            );
        }
    }

    onSend() {
        this.onSubmit.emit({
            tipo: this.tipo,
            informacion: this.informacion,
            anio: this.anio,
            distritoJudicial: this.distritoJudicial,
            sede: this.sede,
            materia: this.materia,
            grupoServicio: this.grupoServicio,
            edadDesde: this.edadDesde,
            edadHasta: this.edadHasta,
            fechaDesde: this.fechaDesde,
            fechaHasta: this.fechaHasta
        });
    }

}