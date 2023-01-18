import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule, Title } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'


import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'


@NgModule( {
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot( {
            preventDuplicates: true
        } ),
        AppRoutingModule
    ],
    providers: [
        Title
    ],
    bootstrap: [ AppComponent ]
} )
export class AppModule { }