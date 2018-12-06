import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { MaquinasProvider } from '../../providers/maquinas/maquinas';
import { Observable } from 'rxjs/Observable';
import { CadalocacaoPage } from '../cadalocacao/cadalocacao';

@Component({
  selector: 'page-alocar',
  templateUrl: 'alocar.html'
})

export class AlocarPage {

  maquinas: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private provider: MaquinasProvider
  ){

    this.maquinas = this.provider.getAll();
  
  }          

  alocar(maquinas: any){
    //Maneira 1
    this.navCtrl.push(CadalocacaoPage, { maquinas: maquinas });
  }

}
