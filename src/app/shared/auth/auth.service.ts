import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private authUrl: string = '/api/authenticate';
    private loggedIn: BehaviorSubject < boolean > = new BehaviorSubject < boolean > (false);
	private token: string;
	
    // make isLoggedIn public readonly
    get isLoggedIn(): boolean {
        return this.loggedIn.getValue();
    }
    get loginObserver(): Observable < boolean > {
        return this.loggedIn.asObservable();
    }
    constructor(private http: Http) {
        if (localStorage.getItem('currentMember') && localStorage.getItem('token')) {
            this.loggedIn.next(true);
			this.token=localStorage.getItem('token');
        }
    };
    login(username: string, password: string): Promise < any > {
        return this.http.post(this.authUrl, { username: username, password: password })
            .toPromise()
            .then(response => {
                // login successful if there's a jwt token in the response
                let member = response.json() && response.json().member;
                let token = response.json() && response.json().token;
                if (member && token) {
                    // store member details and jwt token in local storage to keep member logged in between page refreshes
                    localStorage.setItem('currentMember', JSON.stringify(member));
                    localStorage.setItem('token', token);
					this.token=token;
                    this.loggedIn.next(true);
                } else {
                    return Promise.reject('No token or member provided');
                }
            })
            .catch(this.handleError);
    }

    logout(): void {
        // remove member from local storage to log user out
		this.token=null;
        localStorage.removeItem('currentMember');
        localStorage.removeItem('token');
        this.loggedIn.next(false);
    }
    getToken(): string {
        return this.token;
    }
    getMember(): string {
        return JSON.parse(localStorage.getItem('currentMember'));
    }
    private handleError(error: any): Promise < any > {
        return Promise.reject(error);
    };
}
