import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { MaquinasProvider } from '../../providers/maquinas/maquinas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadmaquina',
  templateUrl: 'cadmaquina.html',
})
export class CadmaquinaPage {

  title: string;
  form: FormGroup;
  maquinas: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder,
    private provider: MaquinasProvider, 
    private toast:ToastController
  ){
     
    this.maquinas = this.navParams.data.maquinas || {}
    
    this.createForm();
    this.setupPageTitle();
      
  }

  private setupPageTitle(){
    this.title = this.navParams.data.maquinas ? 'Alterando máquina' : 'Nova máquina';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.maquinas.key],
      nome: [this.maquinas.nome, Validators.required],
      valorSN: [this.maquinas.valorSN, Validators.required],
      valorCN: [this.maquinas.valorCN, Validators.required]
    })
  }

  onSubmit(){
    if(this.form.valid){
      this.provider.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Máquina salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar máquina.', duration: 3000 }).present();
        console.log(e);
      });
    }
  }
  
}
