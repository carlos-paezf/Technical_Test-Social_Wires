import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { MainComponent } from './pages/main/main.component'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from '../shared/shared.module'


@NgModule( {
    declarations: [
        LoginComponent,
        RegisterComponent,
        MainComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        AuthRoutingModule
    ]
} )
export class AuthModule { }
