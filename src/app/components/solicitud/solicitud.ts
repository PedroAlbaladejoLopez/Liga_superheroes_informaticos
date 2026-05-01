import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Heroe } from '../../models/heroe';
import { Superheroe } from '../superheroes/superheroe/superheroe';

@Component({
  selector: 'app-solicitud',
  imports: [CommonModule, ReactiveFormsModule, Superheroe],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.css',
})
export class Solicitud {
 
  formulario: FormGroup;
  heroes: Heroe[] = [];
  heroePropuesto: Heroe = new Heroe('', '', 0, 0, 0, 0, 0, 0, '', '', '', '', 0);

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      imagen: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', Validators.required],
      numeroMedallas: [0, [Validators.required, Validators.min(0)]]
    });
  }

  registrarHeroe() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const f = this.formulario.value;
    const nuevoHeroe = new Heroe(
      crypto.randomUUID(),
      f.nombre,
      0,
      0,
      0,
      0,
      0,
      0,
      f.imagen,
      f.descripcion,
      f.email,
      f.tipo,
      f.numeroMedallas
    );

    this.heroePropuesto = nuevoHeroe;
    // this.formulario.reset();
  }
}
