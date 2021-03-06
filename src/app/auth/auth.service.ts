import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';

import { map } from 'rxjs/operators';
import { User } from '../user.model';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppStore } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root' // esto significa que el servicio es global y no hace falta importarlo en el appmodule en providers
})
export class AuthService {

  private userSubscription: Subscription;
  private usuario: User;

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppStore>) { }

  initAuthListener() {

    this.afAuth.authState.subscribe ( ( fbUser: firebase.User ) => {

      if (fbUser) {
        this.userSubscription = this.afDB.doc(`${ fbUser.uid}/usuario`).valueChanges()
        .subscribe( (usuarioObj: any) => {

          const newUser = new User(usuarioObj);

          this.store.dispatch(new SetUserAction(newUser));
          this.usuario = newUser;

        });
      } else {
        this.usuario = null;
        // hacemos esto para que cuadno haya un logout no recibamos mas notificacios del observable para ese usuario uid en concreto
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
      }

    });
  }

  crearUsuario( nombre: string, email: string, password: string) {

    const activarLoading = new ActivarLoadingAction();

    this.store.dispatch(activarLoading);

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then ( resp => {

      const user: User = {
        nombre: nombre,
        email: resp.user.email,
        uid: resp.user.uid
      };

      this.afDB.doc(`${ user.uid}/usuario`)
      .set( user )
      .then ( () => {

        const desactivarLoading = new DesactivarLoadingAction();

        this.store.dispatch(desactivarLoading);

        this.router.navigate(['/dashboard']);

      });
      // console.log(resp);


    })
    .catch( error => {

      console.error(error);
      this.store.dispatch(new DesactivarLoadingAction());
      Swal('Error en el login', error.message, 'error');

    });
  }

  login (email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword( email, password)
    .then ( resp => {

      // console.log(resp);
      this.store.dispatch(new DesactivarLoadingAction());

      this.router.navigate(['/dashboard']);

    })
    .catch( error => {

      console.error(error);
      this.store.dispatch(new DesactivarLoadingAction());
      Swal('Error en el login', error.message, 'error');

    });

  }

  logout() {

    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch(new UnsetUserAction());

  }

  isAuth() {

    return this.afAuth.authState.pipe(
      map(fbUser => {

        if (fbUser === null) {
          this.router.navigate(['/login']);
        }

        return fbUser !== null;
      })
    );

  }

  getUser() {
    return {...this.usuario}; // estamos copiando el objeto
  }

}
