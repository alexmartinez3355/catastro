import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  passwordsIguales(pass1: string, pass2: string){
    return (formgroup: FormGroup) => {
      const passControl1 = formgroup.controls[pass1];
      const passControl2 = formgroup.controls[pass2];

      if (passControl2.value === ''){
        passControl2.setErrors({ noSonIguales: true});
      }
      else {
        if (passControl1.value === passControl2.value) {
          passControl2.setErrors(null);
        }
        else{
          passControl2.setErrors({ noSonIguales: true});
        }
      }
    };
  }
}
