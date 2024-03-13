import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  private URI = "http://localhost:4000/";
  private headers = new HttpHeaders({"content-type":"application/json"})
  public makeGetApiCall(uriExtend:string){
    return this._http.get<Observable<any>>(this.URI+uriExtend,{headers:this.headers})
  }
  public makePostApiCall(uriExtend:string,payload:any){
    return this._http.post(this.URI+uriExtend,payload,{headers:this.headers})
  }
  constructor(private _http: HttpClient) { }
}
