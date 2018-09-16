import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppStore } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private store: Store<AppStore>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
    .pipe(
      filter (auth => auth.user !== null)
    )
    .subscribe( auth => {

      this.nombre = `${ auth.user.nombre}`;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut() {

    this.ingresoEgresoService.cancelarSubscriptions();
    this.authService.logout();
  }
}
