import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../models/heroe';
import { Supervillano } from './supervillano/supervillano';
declare var bootstrap: any;
@Component({
  selector: 'app-supervillanos',
  imports: [Supervillano],
  templateUrl: './supervillanos.html',
  styleUrl: './supervillanos.css',
})
export class Supervillanos implements OnInit {
  en_guerra: boolean = true;
  villanos: Heroe[] = [];
  villanoSeleccionado: Heroe = new Heroe('', '', 0, 0, 0, 0, 0, 0, '', '', '', '', 0);

  ngOnInit(): void {
    this.villanos = [
      new Heroe('6', 'Cliente IA', 85, 40, 95, 50, 45, 35, "Cliente_IA.png", "Un villano que utiliza la inteligencia artificial para sus planes malvados", "enemigo", "Negocio", 0),
      new Heroe('7', 'Señor de los bugs', 90, 30, 80, 60, 50, 40, "Bug_senior.png", "Un villano que explota los errores y fallos del sistema para sus fines", "enemigo", "QA", 0),
      new Heroe('8', 'Estimador matador', 75, 85, 65, 70, 55, 45, "Deadline_imposible.png", "Un villano que se alimenta de las pesadillas de sus víctimas", "enemigo", "Analista", 0),
      new Heroe('9', 'Vendehumo cloud', 80, 70, 90, 60, 50, 40, "Cloud_master.png", "Un villano que promete soluciones en la nube pero solo causa problemas", "enemigo", "Analista", 0),
    ];
  }
  expulsarVillano(villano: Heroe) {
    this.villanos = this.villanos.filter(v => v !== villano);
  }   

  mostrarModal(villano: Heroe) {
    this.villanoSeleccionado = villano;
    const modalElement = document.getElementById('modalImagen');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }


}
