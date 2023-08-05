import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resenia } from '../models/resenia';
import { ADDREVIEW_URL } from '../utility/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(public httpClient:HttpClient) { 
  }

addReview(review:Resenia) : Observable<any>{
  return this.httpClient.post<Resenia>(ADDREVIEW_URL,review);
}
  
}
