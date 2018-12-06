import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { AlocacoesuserPage } from '../alocacoesuser/alocacoesuser';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  user: User = new User();

  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    private loadingCtrl: LoadingController, 
    private authService: AuthService
  ){

  }

  createAccount() {
    if (this.form.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

      this.authService.createUser(this.user)
        .then((user: any) => {
          user.sendEmailVerification();

          toast.setMessage('Usuário criado com sucesso.');
          toast.present();

          let loader = this.loadingCtrl.create({
            content: "Por favor! Espere...",
            duration:3000
          });
          loader.present();
          this.authService.signIn(this.user).then(response => {
            window.localStorage.setItem('token', response.uid);
            this.navCtrl.setRoot(AlocacoesuserPage);
          });
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }
          toast.present();
        });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
