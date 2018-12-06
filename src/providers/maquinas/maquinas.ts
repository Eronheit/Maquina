import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class MaquinasProvider {

  private PATH = 'maquinas/';


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

  save(maquina: any){
    return new Promise((resolve, reject) => {
      if(maquina.key){
        this.db.list(this.PATH)
        .update(maquina.key, { nome: maquina.nome, valorSN: maquina.valorSN, valorCN: maquina.valorCN })
        .then(() => resolve())
        .catch((e) => reject(e))
      }
      else{
        this.db.list(this.PATH)
        .push({ nome: maquina.nome, valorSN: maquina.valorSN, valorCN: maquina.valorCN })
        .then(() => resolve())
      }
    });
  }

  remove(key: string){
    return this.db.list(this.PATH).remove(key);
  }

  removeAll(){
    return this.db.list(this.PATH).remove();
  }

}
    