import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

import { ChartsModule } from 'ng2-charts';

import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';
import { SharedModule } from '../shared/shared.module';
import { DashboradRoutingModule } from '../dashboard/dashborad-routing.module';
import { StoreModule } from '@ngrx/store';
import { IngresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboradRoutingModule,
    StoreModule.forFeature('ingresoEgreso', IngresoEgresoReducer)
    // con esto cargamos esta caracteristicas en el reduces
  ],
  declarations: [
    DashboardComponent,
    EstadisticaComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ]
})
export class IngresoEgresoModule { }
