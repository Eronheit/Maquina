import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, App, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { CadmaquinaPage } from '../cadmaquina/cadmaquina';
import { MaquinasProvider } from '../../providers/maquinas/maquinas';
import { AuthService } from '../../providers/auth/auth-service';
import { SigninPage } from '../signin/signin';

@Component({
  selector: 'page-maquinas',
  templateUrl: 'maquinas.html'
})
export class MaquinasPage {

  maquinas: Observable<any>;

  constructor(
    private loadingCtrl: LoadingController, 
    private appCtrl: App, 
    private authService: AuthService,
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    private provider: MaquinasProvider, 
    private toast: ToastController
  ){
    
    this.maquinas = this.provider.getAll();
    
  }

  newMaquina(){
    this.navCtrl.push(CadmaquinaPage);
  }

  editMaquina(maquinas: any){
    //Maneira 1
    this.navCtrl.push(CadmaquinaPage, { maquinas: maquinas });
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

  removeMaquina(key: string){
    this.provider.remove(key)
    .then(() => {
      this.toast.create({ message: 'Máquina removida com sucesso.', duration: 3000 }).present();
    })
    .catch((e) => {
      this.toast.create({ message: 'Erro ao remover maquina.', duration: 3000 }).present();
    })
  }

}
