import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';

import { TaskService } from './tasks/task.service';

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule
    ],
    providers: [TaskService],
    bootstrap: [AppComponent]
})
export class AppModule {}
