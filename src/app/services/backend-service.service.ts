import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {
  private URI = "http://localhost:4000/";

  private headers = new HttpHeaders({"content-type":"application/json"})
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
  public makeGetApiCall(uriExtend:string,params:{[key:string]:string}={}){
    
    return this._http.get<Observable<any>>(this.URI+uriExtend,{params:params,headers:this.headers})
  }
  public makePostApiCall(uriExtend:string,payload:any){
    return this._http.post(this.URI+uriExtend,payload,{headers:this.headers})
  }
  constructor(private _http: HttpClient) { }
}
