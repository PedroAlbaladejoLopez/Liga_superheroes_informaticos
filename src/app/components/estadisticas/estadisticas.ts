import { Component } from '@angular/core';
import { GraficaBarras } from './grafica-barras/grafica-barras';
import { GraficaTarta } from './grafica-tarta/grafica-tarta';

@Component({
  selector: 'app-estadisticas',
  imports: [GraficaBarras, GraficaTarta],
  templateUrl: './estadisticas.html',
  styleUrl: './estadisticas.css',
})
export class Estadisticas {}
