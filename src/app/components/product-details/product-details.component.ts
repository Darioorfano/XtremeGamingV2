import { SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Consulta } from 'src/app/models/consulta';
import { Resenia } from 'src/app/models/resenia';
import { Respuesta } from 'src/app/models/respuesta';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  isAdmin: boolean =false; 
  nuevaConsulta: string = ''; 
  consultas: Consulta[] = []; 
  user: SocialUser | null = null;
  loggedIn: boolean = false;
  consultaSeleccionada: Consulta | null = null;
  nuevaRespuesta: string = '';
  mostrarFormularioRespuesta: boolean = false; // Lo usamos para mostrar el textarea para el admin
  resenias: Resenia[] = [];
  nombre: string = '';
  calificacion: number = 5;
  comentario: string = '';
  
  reseniaForm = this.fb.group({
    nombre: ['', [Validators.required]],
    calificacion:['', [Validators.required]],
    comentario: ['',[Validators.required]],
  });



  characteristicsProducts = [
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
    { detalle: 'Computadora', color: 'Blanco' },
  ];

  detailsProducts = [
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
    { detalle: 'Color', color: 'Negro' },
  ];

  constructor(private userServices: UserService,public fb: FormBuilder) {}

  ngOnInit() {
    this.obtenerUsuario();
  }
  async obtenerUsuario() {
    this.user = await this.userServices.obtenerUsuarioDeLaSesion();
    this.loggedIn = this.user != null;
  }


 
  agregarResenia(): void {
    const newReview: Resenia = {
      nombre: this.nombre,
      calificacion: this.calificacion,
      comentario: this.comentario
    };

    this.resenias.push(newReview);

    // Restablecer los valores del formulario
    this.nombre = '';
    this.calificacion = 5;
    this.comentario = '';
  }



  enviarConsulta() {
    const fechaHoraActual = new Date();

    const consulta: Consulta = {
      texto: this.nuevaConsulta,
      fechaHora: fechaHoraActual,
      respuestas:[]
    };
    this.consultas.push(consulta);
    this.nuevaConsulta = '';
  }

  responderConsulta(consulta: Consulta) {
    this.consultaSeleccionada = consulta;
    this.mostrarFormularioRespuesta = true;
    this.nuevaRespuesta = '';
  }
  


  seleccionarConsulta(consulta: Consulta) {
    this.consultaSeleccionada = consulta;
  }
  
  enviarRespuesta() {
    if (this.consultaSeleccionada) {
      const respuesta: Respuesta = {
        texto: this.nuevaRespuesta,
        fechaHora: new Date(),
      };
      this.consultaSeleccionada.respuestas.push(respuesta);
      this.nuevaRespuesta = '';
      this.mostrarFormularioRespuesta = false;
    }
  }
  
}
