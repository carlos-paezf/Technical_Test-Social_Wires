import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { ValidateAuthGuard, ValidateTokenGuard } from './shared/guards'


const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule ),
        canActivate: [ ValidateAuthGuard ],
        canLoad: [ ValidateAuthGuard ]
    },
    {
        path: '',
        loadChildren: () => import( './protected/protected.module' ).then( m => m.ProtectedModule ),
        canActivate: [ ValidateTokenGuard ],
        canLoad: [ ValidateTokenGuard ]
    }
]


@NgModule( {
    imports: [ RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule { }
