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
  villanoSeleccionado: Heroe = new Heroe('', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, 0);

  ngOnInit(): void {
    this.villanos = [
      new Heroe('6', 'Cliente IA', "Un villano que utiliza la inteligencia artificial para sus planes malvados", "Cliente_IA.png", "enemigo", "Negocio", "cliente_ia@mail.com", 0, 85, 40, 95, 50, 45, 35),
      new Heroe('7', 'Señor de los bugs', "Un villano que explota los errores y fallos del sistema para sus fines", "Bug_senior.png", "enemigo", "QA", "senor_bugs@mail.com", 0, 90, 30, 80, 60, 50, 40),
      new Heroe('8', 'Estimador matador', "Un villano que se alimenta de las pesadillas de sus víctimas", "Deadline_imposible.png", "enemigo", "Analista", "estimador_matador@mail.com", 0, 75, 85, 65, 70, 55, 45),
      new Heroe('9', 'Vendehumo cloud', "Un villano que promete soluciones en la nube pero solo causa problemas", "Cloud_master.png", "enemigo", "Analista", "vendehumo_cloud@mail.com", 0, 80, 70, 90, 60, 50, 40),
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
