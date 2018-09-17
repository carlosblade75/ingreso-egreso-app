import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../ingres-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];

  subscriptionIngresoEgreso: Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgreso.AppStore>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {

    this.subscriptionIngresoEgreso = this.store.select('ingresoEgreso')
    .subscribe( ingresoEgreso => {

      this.items = ingresoEgreso.items;

    });
  }

  ngOnDestroy(): void {
    this.subscriptionIngresoEgreso.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ) {

    this.ingresoEgresoService.borrarIngesoEgreso(item.uid)
    .then( () => {
      Swal('Borrado', item.descripcion, 'success');
    });
  }

}
