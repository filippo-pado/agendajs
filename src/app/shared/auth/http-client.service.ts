import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from './auth.service';

@Injectable()
export class HttpClientService {

    constructor(private http: Http, private authService: AuthService) {}

    appendToken(headers: any) {
        headers.append('x-access-token', this.authService.getToken());
    }
    get(url: string) {
        let headers = new Headers();
        this.appendToken(headers);
        return this.http.get(url, {headers: headers});
    }
    delete(url: string) {
		let headers = new Headers();
        this.appendToken(headers);
        return this.http.delete(url, {headers: headers});
    }
    post(url: string, data: any) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
        this.appendToken(headers);
        return this.http.post(url, data, {headers: headers});
    }
    put(url: string, data: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.appendToken(headers);
        return this.http.put(url, data, {headers: headers});
    }
}
