import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { FullListComponent } from './full-list/full-list.component';

const tasksRoutes: Routes = [{
    path: '',
    component: TasksComponent,
    children: [
        { path: '', component: FullListComponent }
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(tasksRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TasksRoutingModule {}
