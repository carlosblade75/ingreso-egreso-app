import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

// es un método
@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [ // debemos de exportarlos ya que estos componentes se usan en el dashboard component
        // si no se exportaran el dashboard component no tendría forma de referenciarlos en su html
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ]
})
export class SharedModule {

}