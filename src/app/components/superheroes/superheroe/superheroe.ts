import { Component, Input, OnChanges, OnDestroy, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Heroe } from '../../../models/heroe';

@Component({
  selector: 'app-superheroe',
  standalone: true,
  imports: [],
  templateUrl: './superheroe.html',
  styleUrl: './superheroe.css',
})
export class Superheroe implements OnChanges, OnDestroy {

  @Input() heroe!: Heroe;
  @Input() edicionHabilitada!: boolean;
  @Output() expulsar = new EventEmitter<Heroe>();
  @Output() modalEditar = new EventEmitter<Heroe>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('CAMBIO DETECTADO:', changes['heroe']);
  }

  ngOnDestroy(): void {
    console.log(`El héroe ${this.heroe.nombre} ha sido eliminado`);
  }

  expulsarHeroe() {
    this.expulsar.emit(this.heroe);
  }

  editarHeroe() {
    this.modalEditar.emit(this.heroe);
  }
}
