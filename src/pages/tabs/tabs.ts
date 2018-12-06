import { Component } from '@angular/core';

import { AlocarPage } from '../alocar/alocar';
import { AlocacoesPage } from '../alocacoes/alocacoes';
import { MaquinasPage } from '../maquinas/maquinas';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlocarPage;
  tab2Root = AlocacoesPage;
  tab3Root = MaquinasPage;

  constructor() {

  }
}
