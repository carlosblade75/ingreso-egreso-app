import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  
  isLoading: boolean;
  subscription: Subscription = new Subscription();

  constructor(private authService: AuthService,
              private store: Store<AppStore>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe ( ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit( data: any) {

    // console.log( data );

    this.authService.login(data.email, data.password);

  }
}
