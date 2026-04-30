import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Heroe } from '../../../models/heroe';

@Component({
  selector: 'app-superheroe',
  imports: [],
  templateUrl: './superheroe.html',
  styleUrl: './superheroe.css',
})
export class Superheroe {
  @Input() heroe!: Heroe;
  @Output() expulsar = new EventEmitter<Heroe>();
  @Output() modalEditar = new EventEmitter<Heroe>(); 

  expulsarHeroe() {
    this.expulsar.emit(this.heroe);
  } 
  editarHeroe() {
    this.modalEditar.emit(this.heroe);
  }
}
