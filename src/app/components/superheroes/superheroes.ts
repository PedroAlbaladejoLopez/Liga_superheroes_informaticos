import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Heroe } from '../../models/heroe';
import { HeroesService } from '../../services/heroes-service';
import { Superheroe } from './superheroe/superheroe';

declare var bootstrap: any;

@Component({
  selector: 'app-superheroes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Superheroe
  ],
  templateUrl: './superheroes.html',
  styleUrl: './superheroes.css',
})
export class Superheroes implements OnInit {

  mostrarHeroes: boolean = true;
  tipoFiltrado: string = 'Todos';
  heroes: Heroe[] = [];
  heroesFiltrados: Heroe[] = [];
  edicionHabilitada = true;
  heroeEditado: Heroe = new Heroe('', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0);
  archivoEditar: File | null = null;

  constructor(
    private heroesService: HeroesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.obtenerHeroes();
  }

  obtenerHeroes() {
    this.heroesService.getHeroes().subscribe((data: Heroe[]) => {
      this.heroes = data;
      this.filtrarHeroes(this.tipoFiltrado);
      this.cdr.detectChanges();
    });
  }

  filtrarHeroes(tipo: string) {
    this.tipoFiltrado = tipo;
    if (tipo === 'Todos') {
      this.heroesFiltrados = this.heroes.filter(h => h.alineacion === 'amigo');
    } else {
      this.heroesFiltrados = this.heroes.filter(h => h.tipo === tipo && h.alineacion === 'amigo');
    }
  }

  expulsarHeroe(heroe: Heroe) {
    /* Eliminar héroe del backend */
    this.heroesService.deleteHeroe(heroe.id).subscribe(() => {
      this.obtenerHeroes();
      this.cdr.detectChanges();
    });
  }

  modalEditarHeroe(heroe: Heroe) {
    this.heroeEditado = heroe;
    this.archivoEditar = null;
    this.mostrarModal();
  }

  mostrarModal() {
    const modalElement = document.getElementById('modal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  editarHeroe(heroeEditado: Heroe) {
    /* Si hay imagen nueva */
    if (this.archivoEditar) {
      /* Subir imagen nueva */
      this.heroesService.uploadImage(this.archivoEditar).subscribe(response => {
        /* Actualizar héroe con nueva imagen */
        heroeEditado.imagen = response.filename;
        /* Guardar cambios en Heroe en backend */
        this.heroesService.updateHeroe(heroeEditado.id, heroeEditado).subscribe((heroeActualizado: Heroe) => {
          /* Refrescar lista de héroes para mostrar cambios */
          this.heroesService.getHeroes().subscribe((data: Heroe[]) => {
            this.heroes = data;
            this.obtenerHeroes();
            this.archivoEditar = null;
          });
        });
      });
      /* Si no hay imagen nueva */
    } else {
      /* Guardar cambios en Heroe en backend */
      this.heroesService.updateHeroe(heroeEditado.id, heroeEditado).subscribe((heroeActualizado: Heroe) => {
        /* Refrescar lista de héroes para mostrar cambios */
        this.heroesService.getHeroes().subscribe((data: Heroe[]) => {
          this.heroes = data;
          this.obtenerHeroes();
        });
      });
    }
  }

  archivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.archivoEditar = input.files[0];
    } else {
      this.archivoEditar = null;
    }
  }
}