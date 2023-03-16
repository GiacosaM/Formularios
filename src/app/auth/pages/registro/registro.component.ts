import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { emailPattern, nombreApellidoPattern } from 'src/app/shared/validator/validaciones';
import { noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {







miFormulario: FormGroup= this.fb.group({
  nombre: ['', [Validators.required, Validators.pattern(this.validatorServide.nombreApellidoPattern)]],
  email: ['', [Validators.required,Validators.pattern(this.validatorServide.emailPattern)], [this.emailValidator]],
  username: ['', [Validators.required, this.validatorServide.noPuedeSerStrider]],
  password: ['', [Validators.required, Validators.minLength(6)]],
  password2: ['', [Validators.required]],
  }, {
    validators: [this.validatorServide.camposIguales("password","password2")]
  });



  get emailErrorMsg():string {
    const errors= this.miFormulario.get('email')?.errors;

    if (errors?.['required']){
      return 'Email es obligatorio'
    } else if ( errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de email'
    } else if ( errors?.['emailTomado']) {
      return 'El email ya se encuentra registrado'
    }
    return ''
  }

  constructor(private fb:FormBuilder,
              private validatorServide: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Martin Giacosa',
      email:'test1@test.com',
      username: 'giacosam'
    })
  }

  campoNoValido(campo:string) {
      return this.miFormulario.get(campo)?.invalid
        && this.miFormulario.get(campo)?.touched;
  }
/*   emailRequired(){
    return this.miFormulario.get('email')?.errors?.['required']
        && this.miFormulario.get('email')?.touched;
  }

  FormatoRequired(){
    return this.miFormulario.get('email')?.errors?.['pattern']
        && this.miFormulario.get('email')?.touched;
  }

  emailTomado(){
    return this.miFormulario.get('email')?.errors?.['emailTomado']
        && this.miFormulario.get('email')?.touched;
  } */

  submitFormulario() {
    console.log(this.miFormulario.valid);
    this.miFormulario.markAllAsTouched();
  }

}
