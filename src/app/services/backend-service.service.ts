/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendServiceService {
  private URI = 'http://localhost:4000/';

  public fileURI = 'http://localhost:4000/uploads/';

  private headers = { 'content-type': 'application/json' };
  // public makeHeaders(){
  //   let headers:any= {}
  //   const data = this._authService.getData()
  //   if(this._authService.getIsAuthenticated()&&data.token){
  //     headers["content-type"]="application/json";
  //     headers["Authorization"]=data.token;
  //     headers["requestedBy"]=data.userName
  //   }
  //   return new HttpHeaders(headers)
  // }
  public makeGetApiCall(
    uriExtend: string,
    params: { [key: string]: string } = {}
  ) {
    const headers = new HttpHeaders(this.headers);
    return this._http.get<Observable<any>>(this.URI + uriExtend, {
      params: params,
      headers,
    });
  }
  public makePostApiCall(uriExtend: string, payload: any) {
    const headers = new HttpHeaders(this.headers);
    return this._http.post(this.URI + uriExtend, payload, { headers });
  }
  public sendFormDataApiCall(uriExtend: string, payload: any) {
    return this._http.post(this.URI + uriExtend, payload);
  }
  constructor(private _http: HttpClient) {}
}
