import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[];

  constructor() {
    this.cargarListasStorage();
  }

  // FUNCIONES PARA GUARDAR LISTA EN EL STORAGE

  agregarLista( titulo: string ) {
    const nuevaLista = new Lista( titulo );
    if(this.listas === null) {
      this.listas = [];
      this.listas.push(nuevaLista);
    } else {
      this.listas.push(nuevaLista);
    }
    this.guardarListaStorage();
    return nuevaLista.id;
  }

  obtenerLista( id: string | number ) {
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id );
  }

  borrarListaStorage( lista: Lista ) {
    this.listas = this.listas.filter( listaData => listaData.id !== lista.id );
    this.guardarListaStorage();
  }

  async guardarListaStorage() {
      await Storage.set({
        key: 'data',
        value: JSON.stringify( this.listas )
      });
  }

  async cargarListasStorage() {
    if( await Storage.get({key: 'data'})){
      const { value } = await Storage.get({ key: 'data' });
      this.listas = JSON.parse(value);
      return this.listas;
    } else {
      return this.listas = [];
    }
  }
}
