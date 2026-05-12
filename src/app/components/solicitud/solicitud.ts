import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Heroe } from '../../models/heroe';
import { Superheroe } from '../superheroes/superheroe/superheroe';
import { HeroesService } from '../../services/heroes-service';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Superheroe],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.css',
})
export class Solicitud {

  formulario: FormGroup;
  heroePropuesto: Heroe = new Heroe('', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0);

  archivoSeleccionado: File | null = null;
  archivoError = false;

  constructor(private fb: FormBuilder, private heroesService: HeroesService) {
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
    // 1. Validar formulario y archivo
  if (this.formulario.invalid || !this.archivoSeleccionado) {
    this.formulario.markAllAsTouched();
    this.archivoError = !this.archivoSeleccionado;
    return;
  }

  const f = this.formulario.value;

  // 2. Subir la imagen REAL
  this.heroesService.uploadImage(this.archivoSeleccionado).subscribe(response => {

    // 3. Crear el héroe con el filename devuelto por el backend
    const nuevoHeroe = new Heroe(
      crypto.randomUUID(),
      f.nombre,
      f.descripcion,
      response.filename,
      "amigo",
      f.tipo,
      f.email,
      f.numeroMedallas,
      0, 0, 0, 0, 0, 0
    );

    // 4. Guardarlo en backend
    this.heroesService.postHeroe(nuevoHeroe).subscribe(() => {
      this.formulario.reset();
      this.archivoSeleccionado = null;
      this.heroePropuesto = nuevoHeroe;
    });

  });
}

}
