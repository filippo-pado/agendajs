import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    tabLinks = [
        { label: 'Tutti', link: '.' },
        { label: 'Dashboard', link: '.' }
    ];
    activeLinkIndex = 0;
}
