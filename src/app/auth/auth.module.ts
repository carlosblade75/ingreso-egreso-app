import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';

// es un método
@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule, // formularios templates
        AngularFireAuthModule,
        RouterModule // aunque se importe varias veces angular solo lo hace una vez
    ]
})
export class AuthModule {

}