import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksRoutingModule } from './tasks/tasks-routing.module'
import { PageNotFoundComponent } from './shared/not-found.component';

const appRoutes: Routes = [{
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full'
}, {
    path: 'tasks',
    loadChildren: () => TasksRoutingModule
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
