import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { AuthService } from './auth.service';

@Injectable()
export class HttpClientService {

    constructor(private http: Http, private authService: AuthService) {}

    appendToken(headers: any) {
        headers.headers.append('x-access-token', this.authService.getToken());
    }
    get(url: string) {
        let headers = { headers: new Headers() };
        this.appendToken(headers);
        return this.http.get(url, headers);
    }
    delete(url: string, headers: any) {
        this.appendToken(headers);
        return this.http.post(url, headers);
    }
    post(url: string, data: any, headers: any) {
        this.appendToken(headers);
        return this.http.post(url, data, headers);
    }
    put(url: string, data: any, headers: any) {
        this.appendToken(headers);
        return this.http.post(url, data, headers);
    }
}
