import { Component } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage {

  lista: Lista;
  nombreItem = '';
  listas: Lista[] = [];

  constructor(public service: DeseosService,
              private route: ActivatedRoute) {
    const listaID = this.route.snapshot.paramMap.get('listaId');
    this.lista = this.service.obtenerLista(listaID);
  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    }
    const nuevoItem = new ListaItem( this.nombreItem );
    this.lista.items.push( nuevoItem );
    this.nombreItem = '';
    this.service.guardarListaStorage();
  }

  borrarItem( index ) {
    this.lista.items.splice(index, 1);
    this.service.guardarListaStorage();
  }

  actualizarTarea() {
    const pendientes = this.lista.items.filter( itemData => !itemData.completado ).length;

    if( pendientes === 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }

    this.service.guardarListaStorage();
  }

}
