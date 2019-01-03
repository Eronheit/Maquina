import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, App } from 'ionic-angular';

import { NgForm } from '@angular/forms';
import { User } from '../../providers/auth/user';
import { AuthService } from '../../providers/auth/auth-service';
import { TabsPage } from '../tabs/tabs';
import { AlocacoesuserPage } from '../alocacoesuser/alocacoesuser';
import { SignupPage } from '../signup/signup';
import { ResetpasswordPage } from '../resetpassword/resetpassword';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  user: User = new User();
  @ViewChild('form') form: NgForm;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private appCtrl: App
  ){

  }

  signIn() {
    if (this.form.form.valid) {
      let loader = this.loadingCtrl.create({
        content: "Por favor! Espere...",
        duration:3000
      });
      loader.present();
      this.authService.signIn(this.user).then(response => {
        var admin1 = 'mEKZHFf71ThRrlpPP60JWbZV2NC3';
        var admin2 = 'crgzghXSqnVGtI7vCJWtuOa7ahg2';
        var admin3 = 'upzDn7GUMxVeCZzh5fGz3Dikv2O2';
        window.localStorage.setItem('token', response.uid);
        if((response.uid ==  admin1) || (response.uid ==  admin2) || (response.uid ==  admin3)){
          this.navCtrl.setRoot(TabsPage);
        }
        else{
          this.appCtrl.getRootNav().setRoot(AlocacoesuserPage);
        }
        })
        .catch((error: any) => {
          let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
          if (error.code == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é válido.');
          }
          else if (error.code == 'auth/user-disabled') {
            toast.setMessage('O usuário está desativado.');
          }
          else if (error.code == 'auth/user-not-found') {
            toast.setMessage('O usuário não foi encontrado.');
          }
          else if (error.code == 'auth/wrong-password') {
            toast.setMessage('A senha digitada não é válida.');
          }
          toast.present();
      });
    }
  }

  resetPassword(){
    this.navCtrl.push(ResetpasswordPage);
  }

  createAccount() {
    this.navCtrl.push(SignupPage);
  }
  
}
