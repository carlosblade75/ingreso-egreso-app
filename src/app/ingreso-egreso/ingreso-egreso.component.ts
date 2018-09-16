import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingres-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';

import { AppStore } from '../app.reducer';
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup; // reactive form
  tipo = 'ingreso';

  subscription: Subscription = new Subscription();
  isLoading: boolean;

  constructor(private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppStore>) { }

  ngOnInit() {

    this.subscription = this.store.select('ui').subscribe ( ui => this.isLoading = ui.isLoading);

    this.forma = new FormGroup ( {
      'descripcion': new FormControl('', Validators.required),
      'monto': new FormControl(0, Validators.min(0))
    });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  crearIngresoEgreso() {

    this.store.dispatch( new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo });

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then ( () => {

      this.store.dispatch( new DesactivarLoadingAction());

      this.forma.reset({ monto: 0, descripcion: ''});

      Swal('Creado', ingresoEgreso.descripcion, 'success');

    })
    .catch(err => {
      console.log(err);
      this.store.dispatch( new DesactivarLoadingAction());
    });

  }
}
