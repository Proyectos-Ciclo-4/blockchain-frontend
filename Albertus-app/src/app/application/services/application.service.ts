import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  createBlockchain(body:any){
    return this.http.post(`${environment.urlBase}/create/blockchain`,body)
  }
  
  createBlock(body:any){
    return this.http.post(`${environment.urlBase}/create/block`,body)
  }
  
  updateApp(body:any){
    return this.http.put(`${environment.urlBase}/update/application`,body)
  }
  
  deleteApp(body:any){
    return this.http.put(`${environment.urlBase}/delete`,body)
  }
  
  registerApp(body:any){
    return this.http.post(`${environment.urlBase}/register/application`,body)
  }

  getBlockByHash(hash:string){
    return this.http.get(`${environment.urlBaseView}/block/${hash}`);
  }
 
  getAllBlocksByApplicationId(idApplication:string){
    return this.http.get(`${environment.urlBaseView}/blocks/${idApplication}`);
  }
  
  getAllApplicationsByUserId(userId:string){
    return this.http.get(`${environment.urlBaseView}/applications/${userId}`);
  }




  

}

