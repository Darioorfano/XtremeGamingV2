import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatosFormLogin } from 'src/app/models/datosFormLogin';
import { DatosFormRegister } from 'src/app/models/datosFormRegister';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ADMINS } from 'src/app/utility/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedIn: boolean | undefined;
  Swal: any;
  emailInvalido: boolean = false;
  rightPanelClass : boolean = false;
  emailValidator  = new RegExp(/[A-Z0-9._+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  
  //Expresion regular que verifica que contenga al menos un numero, una mayuscula, caracter especial
  passwordValidator =new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/gm)
  
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['',[Validators.required]],
  });

  registerForm = this.fb.group({
    nombre: ['',[Validators.required,Validators.min(3)]],
    emailRegistro: ['',[Validators.required,Validators.pattern(this.emailValidator)]],
    passwordRegistro: ['',[Validators.required,Validators.pattern(this.passwordValidator)]],
  });

  constructor(
    public fb: FormBuilder,
    private userServices:UserService,
    public router : Router
  ) {}

  ngOnInit() {
 
  }

  registrarUsuario(){
    const {nombre,emailRegistro,passwordRegistro} = this.registerForm.controls
      const user:DatosFormRegister = {
        name: nombre.value,
        email: emailRegistro.value,
        password:passwordRegistro.value,
    }
      
 return this.userServices.registrarUsuario(user).subscribe((response) =>{
       Swal.fire("Registro exitoso",response.mensaje + ', por favor verifique su casilla de email para confirmar la cuenta','success').then((result)=>{
        if(result.isConfirmed){
          this.rightPanelClass = false;
          this.resetarFormulario();
        }
       });
 },
 (error) =>{
  if(error.status == 500){
    Swal.fire("Error al registrar usuario",error.error.mensaje,'error');
  }else{
    Swal.fire(
      "Se ha producido un error, por favor intente mas tarde",
      "error"
    );
  }
 });

}

esAdmin(email:string){
  for (const admin of ADMINS) {
    if(admin == email){
      return 'true';
    }
  }
  return 'false';
  }
  
  validarUsuario(){
    const {email,password} = this.loginForm.controls
    const user:DatosFormLogin = {
      email:email.value,
      password:password.value
    }

    return this.userServices.loguearUsuario(user).subscribe((response) =>{
      if(response.usuario.emailVerified ){
        const usuarioString = JSON.stringify(response.usuario);
      this.userServices.cargarDatosDeSesion(usuarioString);
      const esAdmin = this.esAdmin(response.usuario.email)
      localStorage.setItem('ESADMIN',esAdmin);

      Swal.fire("Inicio de sesión exitoso","Acepte para continuar",'success')
     .then((result) => {
      if(result.isConfirmed){
        this.router.navigateByUrl('/');
      }
     })
      }else{
      Swal.fire("Error al iniciar sesión","Por favor confirme su cuenta",'error');
      }
      
    },
    (error) => {
      if(error.status == 401){
        Swal.fire("Error al iniciar sesión",error.error.mensaje,'error');
      }else{
        Swal.fire(
          "Se ha producido un error, por favor intente mas tarde",
          "error"
        );
      }
    }
    );
  }


  resetarFormulario(){
    this.registerForm.clearValidators()
    this.registerForm.reset();
  }

}
