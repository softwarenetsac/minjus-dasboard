import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AccordionGroupComponent } from "src/app/core/commons/accordion/accordion-group.component";
import { AccordionComponent } from "src/app/core/commons/accordion/accordion.component";
import { FiltrosComponent } from "src/app/core/commons/filters/filters.component";
import { SharedModule } from "../../shared/shared.module";
import { ConsultasDefensaPenalComponent } from "./consultas/consultas-defensa-penal/consultas-defensa-penal.component";

import { ConsultasDiariasComponent } from './consultas/consultas-diarias/consultas-diarias.component';
import { ConsultasPenalComponent } from "./consultas/consultas-penal/consultas-penal.component";
import { ConsultasComponent } from "./consultas/consultas.component";
import { EventosDistritoComponent } from "./eventos/eventos-distrito/eventos-distrito.component";
import { EventosTemarioComponent } from "./eventos/eventos-temario/eventos-temario.component";
import { EventosComponent } from "./eventos/eventos.component";
import { ExportacionesComponent } from "./exportaciones/exportaciones.component";
import { PatrocinioPenalDistritoComponent } from "./patrocinios/patrocinio-penal-distrito/patrocinio-penal-distrito.component";
import { PatrocinioPenalEdadComponent } from "./patrocinios/patrocinio-penal-edad/patrocinio-penal-edad.component";
import { PatrocinioPenalGeneroComponent } from "./patrocinios/patrocinio-penal-genero/patrocinio-penal-genero.component";
import { PatrocinioPenalMensualComponent } from "./patrocinios/patrocinio-penal-mensual/patrocinio-penal-mensual.component";
import { PatrocinioPenalPeriodoComponent } from "./patrocinios/patrocinio-penal-periodo/patrocinio-penal-periodo.component";
import { PatrociniosComponent } from "./patrocinios/patrocinios.component";

const routes: Routes = [
    {
        path: "", component: ConsultasComponent
    },
    {
        path: "consultas", component: ConsultasComponent
    },
    {
        path: "patrocinios", component: PatrociniosComponent
    },
    {
        path: "exportaciones", component: ExportacionesComponent
    },
    {
        path: "eventos", component: EventosComponent
    }
];

@NgModule({
    declarations: [ConsultasComponent, ConsultasDiariasComponent, ConsultasPenalComponent, ConsultasDefensaPenalComponent, PatrociniosComponent, AccordionGroupComponent, AccordionComponent, FiltrosComponent, PatrocinioPenalPeriodoComponent, PatrocinioPenalMensualComponent, PatrocinioPenalEdadComponent, PatrocinioPenalGeneroComponent, PatrocinioPenalDistritoComponent, ExportacionesComponent, EventosComponent, EventosTemarioComponent, EventosDistritoComponent],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class IndexModule { }
