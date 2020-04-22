import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public service: DeseosService,
              private alertCtrl: AlertController,
              private router: Router) {}

  async goAgregar() {

    const alert = await this.alertCtrl.create({
      header: 'Nueva Lista',
      message: 'Nombre que desea para la nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Título'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Crear',
          handler: data => {
            if (data.titulo.length === 0) {
              return;
            }
            // Crear listas nuevas
            const listaID = this.service.agregarLista( data.titulo );
            this.router.navigateByUrl(`/tabs/tab1/agregar/${ listaID }`);
          }
        }
      ]
    });
    await alert.present();
  }

}
