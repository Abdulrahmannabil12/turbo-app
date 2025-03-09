
 import { AbstractControl, ValidatorFn } from '@angular/forms';
export function validInput(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>{
        if (control?.value?.startsWith(' ')) {
            return {
                'trimError': { value: 'Input has leading Whitespace !' }
            };
        }
        // if (control?.value?.endsWith(' ')) {
        //     return {
        //         'trimError': { value: 'Input has trailing whitespace !' }
        //     };
        // }

        return null!;
       }
}
 