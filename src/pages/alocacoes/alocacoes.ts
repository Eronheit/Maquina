import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AlocacaoProvider } from '../../providers/alocacao/alocacao';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-alocacoes',
  templateUrl: 'alocacoes.html'
})

export class AlocacoesPage {

  alocacoes: Observable<any>;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController, 
    private provider: AlocacaoProvider, 
    private toast: ToastController
  ){
    this.alocacoes = this.provider.getAll();
  }

  removeAlocacao(key: string){
    this.provider.remove(key)
    .then(() => {
      this.toast.create({ message: 'Alocação removida com sucesso.', duration: 3000 }).present();
    })
    .catch((e) => {
      this.toast.create({ message: 'Erro ao remover Alocação.', duration: 3000 }).present();
    })
  }

  removeTodos() {
    let alert = this.alertCtrl.create({
      title: 'Apagar tudo',
      message: 'Deseja realmente apagar tudo ?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            let loader = this.loadingCtrl.create({
              content: "Por favor! Espere...",
              duration:1500
            });
            loader.present();
            this.provider.removeAll();
          }
        }
      ]
    });
    alert.present();
  }
}