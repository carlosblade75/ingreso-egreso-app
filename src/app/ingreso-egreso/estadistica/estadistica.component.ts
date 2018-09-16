import { Component, OnInit } from '@angular/core';
import { AppStore } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingres-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  ingresos: number;
  egresos: number;

  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  constructor( private store: Store<AppStore>) { }

  ngOnInit() {

    this.subscription = this.store.select('ingresoEgreso')
    .subscribe( ingresoEgreso => {

      this.contarIngresoEgreso(ingresoEgreso.items);

    });
  }

  contarIngresoEgreso( items: IngresoEgreso[]) {

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach( item => {

      if (item.tipo === 'ingreso') {
        this.cuantosIngresos++;
        this.ingresos += item.monto;
      } else {
        this.cuantosEgresos++;
        this.egresos += item.monto;
      }
    });

    this.doughnutChartData.push(this.ingresos, this.egresos);
  }

}
