import { Injectable, Injector } from '@angular/core';
import { ExportacionesService } from '../http/exportaciones.service';
import { GraficosService } from '../http/graficos.service';
import { MaestrosService } from '../http/maestros.service';

@Injectable({
    providedIn: 'root'
})
export class FacadeService {
    constructor(private injector: Injector) { }

    private _maestrosService: MaestrosService;
    private _graficosService: GraficosService;
    private _exportacionesService: ExportacionesService;

    public get maestrosService(): MaestrosService {
        if (!this._maestrosService) {
            this._maestrosService = this.injector.get(MaestrosService);
        }
        return this._maestrosService;
    }

    public get graficosService(): GraficosService {
        if (!this._graficosService) {
            this._graficosService = this.injector.get(GraficosService);
        }
        return this._graficosService;
    }

    public get exportacionesService(): ExportacionesService {
        if (!this._exportacionesService) {
            this._exportacionesService = this.injector.get(ExportacionesService);
        }
        return this._exportacionesService;
    }
}