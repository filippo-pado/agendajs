import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'frequency'
})
export class FrequencyPipe implements PipeTransform {  
	private weekdays=['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
	
    transform(value:any, frequency:any):any {
		if (!value || !frequency) return value;
		switch (frequency) {
            case 'once':
                return value;
            case 'daily':
                return 'Ogni giorno';
            case 'weekly':
                let weekday: number = new Date(value).getDay();
				return this.weekdays[weekday];
            case 'monthly':
                return new Date(value).getDate() + ' del mese'; 			
			default:				
				return value;
        };
	}
}
