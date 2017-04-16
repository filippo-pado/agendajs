import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

const tasksRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(tasksRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class TasksRoutingModule {}
