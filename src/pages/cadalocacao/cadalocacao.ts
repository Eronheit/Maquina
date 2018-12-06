import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AlocacaoProvider } from '../../providers/alocacao/alocacao';

@IonicPage()
@Component({
  selector: 'page-cadalocacao',
  templateUrl: 'cadalocacao.html',
})

export class CadalocacaoPage {

  title: string;
  form: FormGroup;
  maquinas: any;

  qntH
  dataS
  dataE
  tipo
  local

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder, 
    private provider: AlocacaoProvider, 
    private toast: ToastController
  ){
    
    this.maquinas = this.navParams.data.maquinas || {}

    this.createForm();
    this.setupPageTitle();

  }

  private setupPageTitle(){
    this.title = this.navParams.data.maquinas ? 'Alocando máquina' : 'Nova alocação';
  }

  createForm(){
    this.form = this.formBuilder.group({
      key: [this.maquinas.key],
      nome: [this.maquinas.nome, Validators.required],
      valorSN: [this.maquinas.valorSN, Validators.required],
      valorCN: [this.maquinas.valorCN, Validators.required],


      local: [this.maquinas.local, Validators.required],
      dataS: [this.maquinas.dataS, Validators.required],
      dataE: [this.maquinas.dataE, Validators.required],
      qntH: [this.maquinas.qntH, Validators.required],
      tipo: [this.maquinas.qntH, Validators.required],
    })
  }

  onSubmit(){
    if(this.tipo == 'comNota'){
      var t : any = this.qntH * parseFloat(this.maquinas.valorCN);
      var tipo = 'Com nota';
    }
    else{
      var t : any = this.qntH * parseFloat(this.maquinas.valorSN);
      var tipo = 'Sem nota';
    }
    console.log(this.tipo)

    if(this.form.valid){
      this.provider.save({ nome:this.maquinas.nome, tipo: tipo, local: this.local, dataS: this.dataS, dataE: this.dataE, qntH: this.qntH, total: t.toFixed(2) })
      .then(() => {
        this.toast.create({ message: 'Alocação salva com sucesso.', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar Alocação.', duration: 3000 }).present();
        console.log(e);
      });
    }
  }
}
