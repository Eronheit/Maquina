import { Component } from '@angular/core';
import { NavController, App, LoadingController, AlertController } from 'ionic-angular';
import { AlocacaoProvider } from '../../providers/alocacao/alocacao';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../providers/auth/auth-service';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-alocacoesuser',
  templateUrl: 'alocacoesuser.html'
})

export class AlocacoesuserPage {

  alocacoes: Observable<any>;

  constructor(
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    private appCtrl: App, 
    public navCtrl: NavController, 
    private authService:AuthService, 
    private provider: AlocacaoProvider
  ){

    this.alocacoes = this.provider.getAll();
  
  }

  signOut() {
    let alert = this.alertCtrl.create({
      title: 'Sair',
      message: 'Deseja realmente sair ?',
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
            this.authService.signOut();
            window.localStorage.removeItem('token');  
            this.appCtrl.getRootNav().setRoot(SigninPage);
          }
        }
      ]
    });
    alert.present();
  }
}
