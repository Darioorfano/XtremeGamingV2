import { Injectable } from '@angular/core';
import { DatosFormRegister } from '../models/datosFormRegister';
import { DatosFormLogin } from '../models/datosFormLogin';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_LOGIN, USER_REGISTERURL } from '../utility/constant';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  constructor(public httpClient:HttpClient,public router:Router) { }
  
  
  registrarUsuario(user:DatosFormRegister) :Observable<any>{
    return this.httpClient.post<any>(USER_REGISTERURL,user);
  }
  
   loguearUsuario(user:DatosFormLogin) :Observable<any>{
     return this.httpClient.post<any>(USER_LOGIN,user);
    }
  
    cargarDatosDeSesion(usuario:string){
      const usuarioLogueado = localStorage.setItem('USUARIOLOGUEADO',usuario);
    }

  

    obtenerUsuarioDeLaSesion(): Usuario | null{
    const usuarioString = localStorage.getItem('USUARIOLOGUEADO')
    if(usuarioString != null){
      const usuarioParse = JSON.parse(usuarioString)
      console.log(usuarioParse)
      const usuario : Usuario = {
        ...usuarioParse
      
      }
      return usuario
    }else {
      return null;
    }
        
  }

  borrarSesion(){
    localStorage.removeItem('USUARIOLOGUEADO');
  }
}
