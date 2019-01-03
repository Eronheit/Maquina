import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { AlocacoesuserPage } from '../pages/alocacoesuser/alocacoesuser';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = SigninPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
  ){

    var admin1 = 'mEKZHFf71ThRrlpPP60JWbZV2NC3';
    var admin2 = 'crgzghXSqnVGtI7vCJWtuOa7ahg2';
    var admin3 = 'upzDn7GUMxVeCZzh5fGz3Dikv2O2';

    if(window.localStorage.getItem('token') == '' || window.localStorage.getItem('token') == null){
      this.rootPage = SigninPage;
    }
    else if((window.localStorage.getItem('token') == admin1) || (window.localStorage.getItem('token') == admin2) || (window.localStorage.getItem('token') == admin3)){
      this.rootPage = TabsPage;
    }
    else{
      this.rootPage = AlocacoesuserPage;
    }
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
