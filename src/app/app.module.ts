import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksModule } from './tasks/tasks.module';
import { PageNotFoundComponent } from './shared/not-found.component';

@NgModule({
    imports: [
        TasksModule,
        AppRoutingModule,
        BrowserModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
