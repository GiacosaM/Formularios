import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {
  
  miFormulario: FormGroup = this.fb.group({
    nombre: ['',[Validators.required, Validators.minLength(3)]],
    favoritos: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Back to the Future', Validators.required]
    ], Validators.required)
  })
  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  get FavoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }
  constructor( private fb: FormBuilder) { }



  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors &&
          this.miFormulario.controls[campo].touched
  }

  agregarFavorito() {
    if (this.nuevoFavorito.invalid) {
      return;
    }
    this.FavoritosArr.push( this.fb.control(this.nuevoFavorito.value, Validators.required))
    this.nuevoFavorito.reset();
  }

  borrar (i:number) {
    this.FavoritosArr.removeAt(i);
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    } 
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}
