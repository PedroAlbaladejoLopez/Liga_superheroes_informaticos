import { Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Heroe } from '../../../models/heroe';

@Component({
  selector: 'app-superheroe',
  imports: [],
  templateUrl: './superheroe.html',
  styleUrl: './superheroe.css',
})
export class Superheroe implements OnChanges, OnDestroy {
  @Input() heroe!: Heroe;
  @Input() edicionHabilitada!: boolean;
  heroeEditado: Heroe = new Heroe('', '', 0, 0, 0, 0, 0, 0, '', '', '', '', 0);
  @Output() expulsar = new EventEmitter<Heroe>();
  @Output() modalEditar = new EventEmitter<Heroe>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['heroe'] && !changes['heroe'].isFirstChange()) {
      window.alert(`El héroe ${this.heroe.nombre} ha sido EDITADO`);
    }
  }

  ngOnDestroy(): void {
    window.alert(`El héroe ${this.heroe.nombre} ha sido ELIMINADO de la lista`);
  }

// ngAfterViewInit(): void {
//     window.alert(`El héroe ${this.heroe.nombre} ha sido CREADO`);
//   }

  // ngDoCheck(): void {
  //     alert(`El héroe ${this.heroe.nombre} ha sido VERIFICADO`);
  // }
  // ngAfterViewChecked(): void {
  //    alert(`El héroe ${this.heroe.nombre} ha sido CHECKEADO`);
  // }

  expulsarHeroe() {
    this.expulsar.emit(this.heroe);
  }

  editarHeroe() {
    this.modalEditar.emit(this.heroe);
  }
}
