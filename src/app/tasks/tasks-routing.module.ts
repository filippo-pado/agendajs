import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FullListComponent } from './full-list/full-list.component';

const tasksRoutes: Routes = [    
    { path: 'dashboard', component: DashboardComponent },
    { path: 'full-list', component: FullListComponent },
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(tasksRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TasksRoutingModule { }