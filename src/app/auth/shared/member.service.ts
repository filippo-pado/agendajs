import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Member } from './member.model';

@Injectable()
export class MemberService {
    private membersUrl: '/api/members';
    constructor(private http: Http) {}

    getAll() {
        return this.http.get(this.membersUrl, this.jwt()).toPromise().then((response: Response) => response.json());
    }

    getById(id: string) {
        return this.http.get(this.membersUrl + id, this.jwt()).toPromise().then((response: Response) => response.json());
    }

    create(member: Member) {
        return this.http.post(this.membersUrl, member, this.jwt());
    }

    update(member: Member) {
        return this.http.put(this.membersUrl + member._id, member, this.jwt());
    }

    delete(id: string) {
        return this.http.delete(this.membersUrl + id, this.jwt());
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentMember = JSON.parse(localStorage.getItem('currentMember'));
        if (currentMember && currentMember.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentMember.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
