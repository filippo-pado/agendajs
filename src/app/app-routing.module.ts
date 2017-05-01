import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login.component';

const appRoutes: Routes = [{
    path: 'tasks',
    loadChildren: './tasks/tasks.module#TasksModule',
    data: { preload: true },
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
