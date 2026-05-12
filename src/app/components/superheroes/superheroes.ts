import {
  Component,
  OnInit,
  ChangeDetectorRef,
  signal,
  computed,
  effect
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
  imports: [CommonModule, FormsModule, Superheroe],
  templateUrl: './superheroes.html',
  styleUrl: './superheroes.css',
})
export class Superheroes implements OnInit {

  /* ------------------------------------------------------------
     ESTADO REACTIVO CON SIGNALS
  ------------------------------------------------------------ */
  mostrarHeroes = signal(true);
  tipoFiltrado = signal('Todos');
  heroes = signal<Heroe[]>([]);
  heroesFiltrados = computed(() => {
    const tipo = this.tipoFiltrado();
    const lista = this.heroes();
    return tipo === 'Todos'
      ? lista.filter(h => h.alineacion === 'amigo')
      : lista.filter(h => h.tipo === tipo && h.alineacion === 'amigo');
  });

  edicionHabilitada = signal(true);
  heroeEditado = signal(new Heroe('', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0));
  archivoEditar: File | null = null;

  constructor(
    private heroesService: HeroesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.obtenerHeroes();
    /* Efecto opcional para depuración */
    effect(() => console.log('Héroes filtrados:', this.heroesFiltrados()));
  }

  /* ------------------------------------------------------------
     OBTENER HÉROES
  ------------------------------------------------------------ */
  obtenerHeroes() {
    this.heroesService.getHeroes().then((data: Heroe[]) => {
      this.heroes.set(data);
      this.cdr.detectChanges();
    });
  }

  /* ------------------------------------------------------------
     FILTRAR HÉROES
  ------------------------------------------------------------ */
  filtrarHeroes(tipo: string) {
    this.tipoFiltrado.set(tipo);
  }

  /* ------------------------------------------------------------
     ELIMINAR HÉROE
  ------------------------------------------------------------ */
  expulsarHeroe(heroe: Heroe) {
    this.heroesService.deleteHeroe(heroe.id).then(() => {
      this.obtenerHeroes();
      this.cdr.detectChanges();
    });
  }

  /* ------------------------------------------------------------
     MODAL DE EDICIÓN
  ------------------------------------------------------------ */
  modalEditarHeroe(heroe: Heroe) {
    this.heroeEditado.set(heroe);
    this.archivoEditar = null;
    this.mostrarModal();
  }

  mostrarModal() {
    const modalElement = document.getElementById('modal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  /* ------------------------------------------------------------
     EDITAR HÉROE
  ------------------------------------------------------------ */
  editarHeroe(heroeEditado: Heroe) {
    if (this.archivoEditar) {
      this.heroesService.uploadImage(this.archivoEditar).then(response => {
        heroeEditado.imagen = response.filename;
        this.heroesService.updateHeroe(heroeEditado.id, heroeEditado).then(() => {
          this.obtenerHeroes();
          this.archivoEditar = null;
        });
      });
    } else {
      this.heroesService.updateHeroe(heroeEditado.id, heroeEditado).then(() => {
        this.obtenerHeroes();
      });
    }
  }

  /* ------------------------------------------------------------
     INPUT FILE
  ------------------------------------------------------------ */
  archivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;
    this.archivoEditar = input.files?.length ? input.files[0] : null;
  }
}
