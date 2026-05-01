import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Heroe } from '../../models/heroe';
import { CommonModule } from '@angular/common';
import { Superheroe } from './superheroe/superheroe';
import { FormsModule, NgModel } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-superheroes',
  imports: [CommonModule, Superheroe, FormsModule],
  templateUrl: './superheroes.html',
  styleUrl: './superheroes.css',
})
export class Superheroes implements OnInit {
  mostrarHeroes: boolean = false;
  edicionHabilitada: boolean = true;
  tipoFiltrado: string = 'Todos';
  heroes: Heroe[] = [];
  heroesFiltrados: Heroe[] = [];
  heroeEditado: Heroe = new Heroe('', '', 0, 0, 0, 0, 0, 0, '', '', '', '', 0);

  ngOnInit() {
    this.heroes = [new Heroe('1', 'Capitán Frontend', 90, 30, 70, 80, 60, 50, "Capitan_frontend.png", "Líder del equipo de desarrollo frontend", "amigo", "Programador", 0),
    new Heroe('2', 'Backend Master', 80, 70, 90, 60, 50, 40, "Backend_Bruiser.png", "Experto en desarrollo backend", "amigo", "Programador", 0),
    new Heroe('3', 'Bug Buster', 70, 80, 60, 90, 40, 30, "Bug_Buster.png", "Especialista en pruebas y depuración de código", "amigo", "QA", 0),
    new Heroe('4', 'Product Ownerman', 60, 90, 80, 70, 30, 20, "Producto_Man.png", "Visionario del producto final", "amigo", "Negocio", 0),
    new Heroe('5', 'Titán del sistema', 85, 75, 65, 95, 55, 45, "Sys_Titan.png", "Maestro de la arquitectura y el diseño de sistemas", "amigo", "Sistemas", 0),
    ]
    this.heroesFiltrados = this.heroes;
  }

  filtrarHeroes(tipo: string) {
    this.tipoFiltrado = tipo;
    if (tipo === 'Todos') {
      this.heroesFiltrados = this.heroes;
    } else {
      this.heroesFiltrados = this.heroes.filter(heroe => heroe.tipo === tipo);
    }
    this.mostrarHeroes = true;
  }

  expulsarHeroe(heroe: Heroe) {
    this.heroes = this.heroes.filter(h => h !== heroe);
    this.filtrarHeroes(this.tipoFiltrado);
  }

  modalEditarHeroe(heroe: Heroe) {
    this.heroeEditado = { ...heroe };
    this.mostrarModal();

  }

  mostrarModal() {
    const modalElement = document.getElementById('modal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }

  editarHeroe(heroeEditado: Heroe) {
    const index = this.heroes.findIndex(h => h.id === heroeEditado.id);
    if (index !== -1) {
      this.heroes[index] = heroeEditado;
      this.filtrarHeroes(this.tipoFiltrado);
    }
  }
}
