import { Injectable } from '@angular/core';
import { Heroe } from '../models/heroe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  /* URL base del backend */
  urlBase: string = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  /* Crear un nuevo Heroe */
  postHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.urlBase}/heroes`, heroe);
  }
  /* Obtener la lista de héroes */
  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.urlBase}/heroes`);
  }

  /* Eliminar un héroe */
  deleteHeroe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/heroes/${id}`);
  }

  /* Actualizar un héroe */
  updateHeroe(id: string, heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.urlBase}/heroes/${id}`, heroe);
  }

  /* Subir imagen de un héroe */
  uploadImage(file: File): Observable<{ filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ filename: string }>(`${this.urlBase}/upload`, formData);
  }
}
