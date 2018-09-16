import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStore } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  saludo: string;
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {

    this.subscription = this.store.select('auth')
    .pipe(
      filter (auth => auth.user !== null)
    )
    .subscribe( auth => {

      this.saludo = `Hola, ${ auth.user.nombre}`;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
