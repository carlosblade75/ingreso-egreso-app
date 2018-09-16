import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingres-egreso.model';
import { Store } from '@ngrx/store';
import { AppStore } from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import { AuthState } from '../auth/auth.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(  private afDB: AngularFirestore,
                private authService: AuthService,
                private store: Store<AppStore>) { }


  cancelarSubscriptions() {
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
// con el operador spread hacemos que solo las prop del objeto que se envien cambien o se añadan en otro obj
    return this.afDB.doc(`${ this.authService.getUser().uid }/ingresos-egresos`)
    .collection('items').add({ ...ingresoEgreso });
  }

  initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('auth')
    .pipe (
      filter( auth => auth.user !== null )
    )
    .subscribe( (authState: AuthState) => {

      // console.log('uid', authState.user.uid);

      this.IngresoEgresoItems( authState.user.uid );
    });
  }


  private IngresoEgresoItems( uid: string) {

    this.ingresoEgresoItemsSubscription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
    .snapshotChanges()
    .pipe (
      map( docData => {

        return docData.map( doc => {

          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() // funcion que obtiene los datos del item
          };
        });
      })
    )
    .subscribe( (coleccion: any[]) => {
      // console.log(coleccion);

      this.store.dispatch(new SetItemsAction(coleccion));

    });

  }

  borrarIngesoEgreso(uid: string) {

    const user = this.authService.getUser();

    return this.afDB.doc(`${ user.uid }/ingresos-egresos/items/${ uid }`)
            .delete();
  }

}

