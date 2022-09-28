import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  createBlock(body: any, applicationID: string) {
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${applicationID}`
      ),
    };
    return this.http.post(`${environment.urlBase}create/block`, body, header);
  }

  updateApp(body: any) {
    return this.http.put(`${environment.urlBase}update/application`, body);
  }

  deleteApp(body: any) {
    return this.http.put(`${environment.urlBase}delete`, body);
  }

  registerApp(body: any) {
    return this.http.post(
      'https://albertus-main.herokuapp.com/register/application',
      body
    );
  }

  getBlockByHash(hash: string) {
    return this.http.get(`${environment.urlBaseView}block/${hash}`);
  }

  getAllBlocksByApplicationId(idApplication: string) : Observable<any>{
    return this.http.get(`${environment.urlBaseView}blocks/${idApplication}`);
  }

  getAllApplicationsByUserId(userId: string) {
    return this.http.get(
      `https://albertus-view.herokuapp.com/applications/${userId}`
    );
  }
}
