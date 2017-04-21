import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatepickerModule } from 'angular2-material-datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FullListComponent } from './full-list/full-list.component';
import { TaskFormComponent } from './shared/task-form/task-form.component';
import { TaskService } from './shared/task.service';
import { TaskUtilsService } from './shared/task-utils.service';
import { UtilsService } from '../shared/utils.service';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        HttpModule,
        FlexLayoutModule,
        DatepickerModule,
        BrowserAnimationsModule
    ],
    declarations: [
        DashboardComponent,
        FullListComponent,
        TaskFormComponent,
    ],
    providers: [TaskService, UtilsService, TaskUtilsService]
})
export class TasksModule {}
