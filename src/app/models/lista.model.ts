import { ListaItem } from './lista-item.model';


export class Lista {
    filter(arg0: (lista: any) => boolean) {
      throw new Error("Method not implemented.");
    }

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    terminada: boolean;
    items: ListaItem[];

    constructor( titulo: string ) {
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.terminada = false;
        this.items = [];
        this.id = new Date().getTime();
    }
}