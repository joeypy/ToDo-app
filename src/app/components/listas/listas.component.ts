import { Component, Input, ViewChild, OnChanges } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, ToastController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnChanges {

  @ViewChild( IonList, {static: true} ) lista: IonList;
  @Input() terminada = true;
  
  listas: Lista[] = [];
  
  constructor(public service: DeseosService,
              private alertCtrl: AlertController,
              public toastController: ToastController,
              private router: Router) {}

  ngOnChanges() {
    if (this.terminada){
      this.listas.filter( lista => lista.terminada ===  this.terminada);
      console.log("Terminada TRUE: ", this.listas);
    } else {
      this.listas.filter( lista => lista.terminada !==  this.terminada);
      console.log("Terminada FALSE: ", this.listas);
    }
  }

  async actualizarNombreLista(lista: Lista) {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar título',
      message: 'Nombre del nuevo título',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Título'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.lista.closeSlidingItems();
          }
        }, {
          text: 'Actualizar',
          handler: data => {
            if (data.titulo.length === 0) {
              this.actualizarNombreLista(lista);
              this.tituloToast();
            }
            lista.titulo = data.titulo;
            this.lista.closeSlidingItems();
            this.service.guardarListaStorage();
          }
        }
      ]
    });
    await alert.present();
  }

  async tituloToast() {
    const toast = await this.toastController.create({
      message: 'No puede dejar una tarea sin título.',
      duration: 3000
    });
    toast.present();
  }

  listaSeleccionada(lista: Lista) {
    if( this.terminada ) {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${ lista.id }`);
    }
  }

  borrarLista(lista: Lista) {
    this.service.borrarListaStorage(lista);

  }

}
