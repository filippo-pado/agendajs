import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './shared/not-found.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { AuthService } from './shared/auth/auth.service';
//import { MemberService } from './auth/member.service';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        HttpModule,
        FlexLayoutModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    providers: [
        AuthGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
