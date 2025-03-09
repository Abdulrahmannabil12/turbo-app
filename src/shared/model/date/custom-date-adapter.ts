
import { DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
    
    format(date: Date, displayFormat: any): string {
        if (displayFormat === 'input') {
            return date.toISOString().substr(0, 10);
        } else {
            const months = this.getMonthNames('short');
            return `${date.getFullYear()} ${months[date.getMonth()]}`;
        }
    }
}

export const MY_DATE_FORMATS = {
    display: {
        dateInput: 'input',
    },
    parse: {
        dateInput: { month: 'numeric', year: 'numeric', day: 'numeric' },
    },
};
