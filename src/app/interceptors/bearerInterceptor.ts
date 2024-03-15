import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthServiceService } from "../services/auth-service.service";

@Injectable()
export class bearerInterceptor implements HttpInterceptor{
    constructor(private _authService:AuthServiceService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const obj:{[key:string]:any} = this._authService.getData();
        if(obj["token"]){
            req = req.clone({setHeaders:{"Authorization":obj["token"]||"", "requestedBy":obj['email']}})
        }
        return next.handle(req)
    }
    
}