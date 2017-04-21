import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/not-found.component';
import { tasksRoutes } from './tasks/tasks-routing.module';


const appRoutes: Routes = [{
    path: 'tasks',
	children: tasksRoutes
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
