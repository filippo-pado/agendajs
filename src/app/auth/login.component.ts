import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { Member } from './member.model';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    member: Member = new Member();
    loading = false;
    returnUrl: string;
    message: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService) {}

    ngOnInit() {
        // reset login status
        this.authService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.message = null;
        this.loading = true;
        this.authService.login(this.member.name, this.member.password)
            .then(
                success => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.message = error._body;
                    this.loading = false;
                }
            );
    }
}
