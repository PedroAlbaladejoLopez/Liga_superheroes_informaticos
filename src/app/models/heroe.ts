export class Heroe {
    id: string;
    nombre: string;
    inteligencia: number;
    fuerza: number;
    velocidad: number;
    durabilidad: number;
    poder: number;
    combate: number;
    descripcion: string ='';
    imagen: string;
    alineacion: string = '';
    tipo: string = '';

    constructor(id: string, nombre: string, inteligencia: number, fuerza: number,
         velocidad: number, durabilidad: number, poder: number, combate: number,
          imagen: string, descripcion: string, alineacion: string, tipo: string) {
        this.id = id;
        this.nombre = nombre;
        this.inteligencia = inteligencia;
        this.fuerza = fuerza;
        this.velocidad = velocidad;
        this.durabilidad = durabilidad;
        this.poder = poder;
        this.combate = combate;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.alineacion = alineacion;
        this.tipo = tipo;
    }   
}
