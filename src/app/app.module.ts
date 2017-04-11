import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatepickerModule } from 'angular2-material-datepicker'

import { AppComponent } from './app.component';
import { TaskListComponent } from './tasks/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail.component';

import { TaskService } from './tasks/task.service';
import { CallbackPipe } from './tasks/callback.pipe';

@NgModule({
    declarations: [
        AppComponent,
        TaskListComponent,
        TaskDetailComponent,
        CallbackPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        DatepickerModule
    ],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule {}
