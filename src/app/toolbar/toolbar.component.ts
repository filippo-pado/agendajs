import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth/auth.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
    private loginObserver: Observable < boolean > ;

    constructor(private auth: AuthService) {}

    ngOnInit(): void {
        this.loginObserver = this.auth.loginObserver;
    };
}
