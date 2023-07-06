import { Component } from '@angular/core';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
  panelOpenState = false;
  dropDowns = [
    { texto: 'Equipos y Notebooks' },
    { texto: 'Procesadores' },
    { texto: 'Mothers' },
    { texto: 'Placas de Video' },
    { texto: 'Memorias RAM' },
    { texto: 'Almacenamiento' },
    { texto: 'Refrigeracion' },
    { texto: 'Gabinetes' },
    { texto: 'Fuentes' },
    { texto: 'Monitores y Televisores' },
    { texto: 'Periféricos' },
    { texto: 'Sillas Gamers' },
    { texto: 'Conectividad' },
    { texto: 'Estabilizadores y UPS' },
    { texto: 'Cables y Adaptadores' },
    { texto: 'Celulares y Smartwatch' },
  ];
}
