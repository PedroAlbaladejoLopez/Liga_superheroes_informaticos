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
    email: string = ''; 
    numeroMedallas: number = 0;

    constructor(id: string, nombre: string, inteligencia: number, fuerza: number,
         velocidad: number, durabilidad: number, poder: number, combate: number,
          imagen: string, descripcion: string, alineacion: string, tipo: string, numeroMedallas: number) {
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
        this.numeroMedallas = numeroMedallas;
    }   
}
