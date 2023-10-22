import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADDQUESTION_URL, GETQUESTION_PRODUCT_URL, REPLYQUESTION_URL,} from '../utility/constant';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { QuestionDTO } from '../models/questionDTO';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(public httpClient:HttpClient) { 
  }

addQuestion(question:Question) : Observable<any>{
  return this.httpClient.post<Question>(ADDQUESTION_URL,question);
}
getQuestions(idProducto:string) : Observable<any>{
  return this.httpClient.get<QuestionDTO>(GETQUESTION_PRODUCT_URL+idProducto);
}
replyQuestion(respuesta:Respuesta): Observable<any>{
    return this.httpClient.post<Respuesta>(REPLYQUESTION_URL,respuesta); 
}
}
