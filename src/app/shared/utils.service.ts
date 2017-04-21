import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
    dateDiff(d1: Date, d2: Date): number {
        let t2: number = d2.getTime();
        let t1: number = d1.getTime();
        return Math.round((t2 - t1) / (24 * 3600 * 1000));
    };
}
