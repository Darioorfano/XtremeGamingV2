import { Component, Input, SimpleChanges, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Consulta } from 'src/app/models/consulta';
import { Product } from 'src/app/models/product';
import { Question } from 'src/app/models/question';
import { QuestionDTO } from 'src/app/models/questionDTO';
import { Resenia } from 'src/app/models/resenia';
import { ReseniaDTO } from 'src/app/models/reseniaDTO';
import { Respuesta } from 'src/app/models/respuesta';
import { Usuario } from 'src/app/models/usuario';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { QuestionService } from 'src/app/services/question.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  @Input() idProducto:string |null  = ''
  producto!:Product
  isAdmin: boolean =false; 
  nuevaConsulta: string = ''; 
  consultas: Consulta[] = []; 
  user: Usuario | null = null;
  loggedIn: boolean = false;
  consultaSeleccionada: QuestionDTO | null = null;
  nuevaRespuesta: string = '';
  mostrarFormularioRespuesta: boolean = false; // Lo usamos para mostrar el textarea para el admin
  reseniasDTO: ReseniaDTO [] = [] 
  questionDTO:QuestionDTO [] = []
  nombre: string = '';
  calificacion: number = 5;
  comentario: string = '';
  @ViewChild('exampleModal') modal: any; // Referencia al modal


  consultaForm = this.fb.group({
    content: ['',[Validators.required]],
  });

  respuestaForm = this.fb.group({
    content: ['',[Validators.required]],
  });

  
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
    private route: ActivatedRoute,private reviewServices:ReviewService, public cartService:CartService,
    public questionService:QuestionService ) {}

  ngOnInit() {
    this.obtenerUsuario();
    this.route.params.subscribe((params) =>{
      this.idProducto = this.route.snapshot.paramMap.get('id')
      this.obtenerProducto(this.idProducto);
    })
    this.obtenerResenia();
    this.obtenerConsulta();
  }
 


  agregarCarrito(product : Product){
    console.log("producto",product)
    this.cartService.addToCart(product);
  }

  obtenerProducto(idProducto:string |null) {
    
   this.productService.getProductById(idProducto).subscribe((response)=>{
    this.producto= response
   })
  }
 obtenerUsuario() {
    this.user = await this.userServices.obtenerUsuarioDeLaSesion();
    this.loggedIn = this.user != null;
  }

  obtenerResenia() {
    this.reviewServices.getReviews(this.idProducto).subscribe((response) => {
      this.reseniasDTO = response;
    })
  }
  obtenerConsulta() {
    this.questionService.getQuestions(this.idProducto).subscribe((response) => {
      this.questionDTO = response;
      
    })
  }
 
  agregarResenia(): void {
    if (this.reseniaForm.invalid) {
      return;
    }
    const {nombre,calificacion,comentario} = this.reseniaForm.controls
    
    const newReview: Resenia = {
      nombre: nombre.value as string,
      calificacion: Number(calificacion.value),
      comentario: comentario.value as string,
      idProducto: this.producto.id
    };

   this.reviewServices.addReview(newReview).subscribe((response) =>{
    Swal.fire("La reseña ha sido publicada con exito",response,'success')
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
    }
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    
    this.obtenerResenia();
    
   },
   (error) => {
    if(error.status == 500){
      Swal.fire("Error al realizar la reseña",error.error.mensaje,'error');
    }else{
      Swal.fire(
        "Se ha producido un error, por favor intente mas tarde",
        "error"
      );
    }
   }
   )
  }

  cerrarModal() {
    this.modal.nativeElement.style.display = 'none';
  this.modal.nativeElement.classList.remove('show');
  document.body.classList.remove('modal-open');
  document.body.style.paddingRight = '';
  }

  enviarConsulta() {
    if (this.consultaForm.invalid) {
      return;
    }
    const {content} = this.consultaForm.controls
    const usuario = this.userServices.obtenerUsuarioDeLaSesion();
    const photo= usuario.photoUrl || 'userPhoto.png'
    const question: Question = {
      idUsuario: usuario.uid,
      idProducto: this.producto.id,
      content:content.value,
      name:usuario.displayName,
      photoUrl:photo,
    };

   this.questionService.addQuestion(question).subscribe((response) =>{
    Swal.fire("La consulta ha sido publicada con exito",response,'success')
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
    }
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    
    this.obtenerConsulta();
    
   },
   (error) => {
    if(error.status == 500){
      Swal.fire("Error al realizar la reseña",error.error.mensaje,'error');
    }else{
      Swal.fire(
        "Se ha producido un error, por favor intente mas tarde",
        "error"
      );
    }
   }
   )
  }

  responderConsulta(consulta: QuestionDTO) {
    this.consultaSeleccionada = consulta;
    this.mostrarFormularioRespuesta = true;
    this.nuevaRespuesta = '';
  }
  
  enviarRespuesta(idQuestion:string){
    if (this.respuestaForm.invalid) {
      console.log("Invalido")
      return;
    }
    const {content} = this.respuestaForm.controls
    const usuario = this.userServices.obtenerUsuarioDeLaSesion();
    const photo= usuario.photoUrl || 'adminPhoto.png'
    const respuesta: Respuesta = {
      idUsuario: usuario.uid,
      idQuestion: idQuestion,
      content:content.value,
      name:usuario.displayName,
      photoUrl:photo,
    };

   this.questionService.replyQuestion(respuesta).subscribe((response) =>{
    Swal.fire("La consulta ha sido respondida con exito",response,'success')
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      modalElement.style.display = 'none';
      modalElement.classList.remove('show');
    }
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
    }
    this.obtenerConsulta();
    
   },
   (error) => {
    if(error.status == 500){
      Swal.fire("Error al realizar la reseña",error.error.mensaje,'error');
    }else{
      Swal.fire(
        "Se ha producido un error, por favor intente mas tarde",
        "error"
      );
    }
   }
   )
}
}
