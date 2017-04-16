import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    tabLinks = [
        { label: 'Dashboard', link: 'dashboard' },
        { label: 'Tutti', link: 'full-list' }
    ];
    activeLinkIndex = 0;
}
