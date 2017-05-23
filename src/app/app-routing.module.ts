import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [{
    path: 'tasks',
    loadChildren: './tasks/tasks.module#TasksModule',
    canActivate: [AuthGuard]
}, {
    path: 'login',
    component: LoginComponent
}, {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
}, {
    path: '**',
    component: PageNotFoundComponent
}];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
