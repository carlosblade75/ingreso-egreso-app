import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate() {

    return this.authService.isAuth();

  }

  canLoad() { // esto se usa en el lazy load. Se llamara una vez se cargue el módulo

    return this.authService.isAuth()
            .pipe(
              take(1) // esto hace que el pipe devuelve un solo observable y despues se cancele
              // con lo cual se crea uno cada vez
            );

  }

}
