import { GeneralService } from './../../services/general.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultar-cita',
  templateUrl: './consultar-cita.component.html',
  styleUrls: ['./consultar-cita.component.css']
})
export class ConsultarCitaComponent implements OnInit {

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.validarAccesoCliente();
  }

}
