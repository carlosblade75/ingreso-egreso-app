
import { Routes } from '@angular/router';

import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';

import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DashboardComponent } from './dashboard.component';


export const dashboardRoutes: Routes = [
    { path: 'detalle', component: DetalleComponent},
    { path: 'ingesoegreso', component: IngresoEgresoComponent},
    { path: '', component: EstadisticaComponent}

];
