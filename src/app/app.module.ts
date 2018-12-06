import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AlocacoesPage } from '../pages/alocacoes/alocacoes';
import { MaquinasPage } from '../pages/maquinas/maquinas';
import { AlocarPage } from '../pages/alocar/alocar';
import { TabsPage } from '../pages/tabs/tabs';
import { CadmaquinaPage } from '../pages/cadmaquina/cadmaquina';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaquinasProvider } from '../providers/maquinas/maquinas';
import { AlocacaoProvider } from '../providers/alocacao/alocacao';
import { CadalocacaoPage } from '../pages/cadalocacao/cadalocacao';
import { AlocacoesuserPage } from '../pages/alocacoesuser/alocacoesuser';
import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../providers/auth/auth-service';
import { ResetpasswordPage } from '../pages/resetpassword/resetpassword';
import { SignupPage } from '../pages/signup/signup';

@NgModule({
  declarations: [
    MyApp,
    AlocacoesPage,
    MaquinasPage,
    AlocarPage,
    TabsPage,
    CadmaquinaPage,
    CadalocacaoPage,
    SigninPage,
    AlocacoesuserPage,
    ResetpasswordPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDo9XbOwnFWjOGieKOu_e1TkQAmrub-o64",
      authDomain: "maquina-5cca3.firebaseapp.com",
      databaseURL: "https://maquina-5cca3.firebaseio.com",
      projectId: "maquina-5cca3",
      storageBucket: "maquina-5cca3.appspot.com",
      messagingSenderId: "948784637460"

    }), 
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlocacoesPage,
    MaquinasPage,
    AlocarPage,
    TabsPage,
    CadmaquinaPage,
    CadalocacaoPage,
    SigninPage,
    AlocacoesuserPage,
    ResetpasswordPage,
    SignupPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MaquinasProvider,
    AlocacaoProvider,
    AuthService,
    
  ]
})
export class AppModule {}
