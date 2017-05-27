import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent {
    private loggedIn: Observable < boolean > ;

    constructor(private auth: AuthService) {
        this.loggedIn = this.auth.isLoggedIn;
    }
}
