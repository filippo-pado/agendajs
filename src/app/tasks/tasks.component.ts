import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}

    tabLinks = [
        { label: 'Dashboard', link: 'dashboard' },
        { label: 'Tutti', link: 'full-list' }
    ];
    activeLinkIndex = 0;

    ngOnInit(): void {
        this.router.navigate(['dashboard'], { relativeTo: this.route });
    };
}
