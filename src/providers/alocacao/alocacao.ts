import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the AlocacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlocacaoProvider {

  private PATH = 'alocacao/';

  constructor(private db: AngularFireDatabase) {

  }

  getAll(){
    return this.db.list(this.PATH)
    .snapshotChanges()
    .map(changes =>{
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })

  }

  get(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => {
      return { key: c.payload.key, ... c.payload.val() }
    })
  }

  save(maquinas: any){
    return new Promise((resolve, reject) => {
      // if(alocacao.key){
      //   this.db.list(this.PATH)
      //   .update(alocacao.key, { nome: alocacao.nome, valorSN: alocacao.valorSN, valorCN: alocacao.valorCN })
      //   .then(() => resolve())
      //   .catch((e) => reject(e))
      // }
      // else{

        this.db.list(this.PATH)
        .push({ nome: maquinas.nome, tipo: maquinas.tipo, local: maquinas.local,  dataS: maquinas.dataS, dataE: maquinas.dataE,
           qntH: maquinas.qntH, total: maquinas.total })
        .then(() => resolve())
      // }
    });
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }

  removeAll(){
    return this.db.list(this.PATH).remove();
  }

}
