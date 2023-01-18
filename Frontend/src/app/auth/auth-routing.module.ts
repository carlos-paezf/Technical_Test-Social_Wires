import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { MainComponent } from './pages/main/main.component'
import { RegisterComponent } from './pages/register/register.component'


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
                pathMatch: 'full',
                data: {
                    title: 'Inicio de Sesión'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                pathMatch: 'full',
                data: {
                    title: 'Registro de Usuario'
                }
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
]


@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
} )
export class AuthRoutingModule { }
