import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Heroe } from '../../models/heroe';
import { Superheroe } from '../superheroes/superheroe/superheroe';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Superheroe],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.css',
})
export class Solicitud {

  formulario: FormGroup;
  heroePropuesto: Heroe = new Heroe('', '', 0, 0, 0, 0, 0, 0, '', '', '', '', 0);

  archivoSeleccionado: File | null = null;
  archivoError = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', Validators.required],
      numeroMedallas: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
      this.archivoError = false;
    } else {
      this.archivoSeleccionado = null;
      this.archivoError = true;
    }
  }

  registrarHeroe() {
    if (this.formulario.invalid || !this.archivoSeleccionado) {
      this.formulario.markAllAsTouched();
      this.archivoError = !this.archivoSeleccionado;
      return;
    }

    const f = this.formulario.value;

    const nuevoHeroe = new Heroe(
      crypto.randomUUID(),
      f.nombre,
      0, 0, 0, 0, 0, 0,
      this.archivoSeleccionado.name,
      f.descripcion,
      f.email,
      f.tipo,
      f.numeroMedallas
    );

    this.heroePropuesto = nuevoHeroe;

    this.formulario.reset();
    this.archivoSeleccionado = null;
  }
}
