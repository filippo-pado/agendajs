import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
	showFull: boolean=true;
    filter: any={};  
	priorityList = [
        { value: 1, viewValue: 'Bassa' },
        { value: 2, viewValue: 'Media' },
        { value: 3, viewValue: 'Alta' }
    ];
    frequencyList = [
        { value: 'once', viewValue: 'Una tantum' },
        { value: 'daily', viewValue: 'Giornaliero' },
        { value: 'weekly', viewValue: 'Settimanale' },
        { value: 'monthly', viewValue: 'Mensile' }
    ];
	
    constructor() {};
	
    ngOnInit(): void {};
}
