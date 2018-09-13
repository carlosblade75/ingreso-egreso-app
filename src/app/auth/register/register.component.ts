import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppStore } from '../../app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  isLoading: boolean;

  constructor(private authService: AuthService,
              private store: Store<AppStore>) { }

  ngOnInit() {
    this.store.select('ui').subscribe ( ui => this.isLoading = ui.isLoading);
  }

  onSubmit( data: any) {

    console.log( data );

    this.authService.crearUsuario(data.nombre, data.email, data.password);

  }
}
