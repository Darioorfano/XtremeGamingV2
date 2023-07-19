import { SocialUser } from '@abacritt/angularx-social-login';
import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consulta } from 'src/app/models/consulta';
import { Product } from 'src/app/models/product';
import { Resenia } from 'src/app/models/resenia';
import { Respuesta } from 'src/app/models/respuesta';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  idProducto:string |null  = ''
  producto!:Product
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
    calificacion:['5', [Validators.required]],
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

  constructor(private userServices: UserService,public fb: FormBuilder,public productService:ProductService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.obtenerUsuario();
    this.idProducto = this.route.snapshot.paramMap.get('id')
    this.obtenerProducto(this.idProducto);
  }
  obtenerProducto(idProducto:string |null) {
    
   this.productService.getProductById(idProducto).subscribe((response)=>{
    this.producto= response
   })
  }
 obtenerUsuario() {
  //  this.user = await this.userServices.obtenerUsuarioDeLaSesion();
    this.loggedIn = this.user != null;
  }


 
  agregarResenia(): void {
    if (this.reseniaForm.invalid) {
      return;
    }
    const {nombre,calificacion,comentario} = this.reseniaForm.controls

    const newReview: Resenia = {
      nombre: nombre.value as string,
      calificacion: Number(calificacion.value),
      comentario: comentario.value as string
    };

    this.resenias.push(newReview);

   this.reseniaForm.reset({
    calificacion:'5'
   })
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
