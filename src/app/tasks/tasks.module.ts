import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TasksComponent } from './tasks.component';
import { FullListComponent } from './full-list/full-list.component';
import { TaskFormComponent } from './shared/task-form/task-form.component';
import { TaskService } from './shared/task.service';
import { TaskUtilsService } from './shared/task-utils.service';
import { UtilsService } from '../shared/utils.service';
import { HttpClientService } from '../shared/auth/http-client.service';
import { TasksRoutingModule } from './tasks-routing.module';
import { FrequencyPipe } from './shared/frequency.pipe'

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        HttpModule,
        FlexLayoutModule,
        TasksRoutingModule,
		MdDatepickerModule,
		MdNativeDateModule
    ],
    declarations: [
        TasksComponent,
        FullListComponent,
        TaskFormComponent,
        FrequencyPipe
    ],
    providers: [TaskService, UtilsService, TaskUtilsService, HttpClientService]
})
export class TasksModule {}
