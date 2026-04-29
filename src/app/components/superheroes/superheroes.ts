import { Component } from '@angular/core';
import { Heroe } from '../../models/heroe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-superheroes',
  imports: [CommonModule],
  templateUrl: './superheroes.html',
  styleUrl: './superheroes.css',
})
export class Superheroes {
  mostrarHeroes: boolean = false;
  tipoFiltrado: string = 'Todos';
  heroes: Heroe[] = [
    new Heroe('Capitán Frontend', 90, 30, 70, 80, 60, 50, "Capitan_frontend.png", "Líder del equipo de desarrollo frontend", "amigo", "Programador"),
    new Heroe('Backend Master', 80, 70, 90, 60, 50, 40, "Backend_Bruiser.png", "Experto en desarrollo backend", "amigo", "Programador"),
    new Heroe('Bug Buster', 70, 80, 60, 90, 40, 30, "Bug_Buster.png", "Especialista en pruebas y depuración de código", "amigo", "QA"),
    new Heroe('Product Ownerman', 60, 90, 80, 70, 30, 20, "Producto_Man.png", "Visionario del producto final", "amigo", "Negocio"),
    new Heroe('Titán del sistema', 85, 75, 65, 95, 55, 45, "Sys_Titan.png", "Maestro de la arquitectura y el diseño de sistemas", "amigo", "Sistemas"),
  ]
  heroesFiltrados: Heroe[] = this.heroes;
  
  filtrarHeroes(tipo: string) {
    this.tipoFiltrado = tipo;
    if (tipo === 'Todos') {
      this.heroesFiltrados = this.heroes;
    } else {
      this.heroesFiltrados = this.heroes.filter(heroe => heroe.tipo === tipo);
    }
    this.mostrarHeroes = true;
  }
}
