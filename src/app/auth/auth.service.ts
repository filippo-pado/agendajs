import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private authUrl: string = '/api/authenticate';

    constructor(private http: Http) {}

    login(name: string, password: string) {
        return this.http.post(this.authUrl, { name: name, password: password })
            .toPromise()
            .then(response => {
                // login successful if there's a jwt token in the response
                let member = response.json();
                if (member && member.token) {
                    // store member details and jwt token in local storage to keep member logged in between page refreshes
                    localStorage.setItem('currentMember', JSON.stringify(member));
                }
            })
            .catch(this.handleError);
    }

    logout() {
        // remove member from local storage to log user out
        localStorage.removeItem('currentMember');
    }
    private handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error);
    };
}
