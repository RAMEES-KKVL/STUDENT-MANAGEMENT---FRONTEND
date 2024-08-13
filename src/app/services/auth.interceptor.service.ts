import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoggedRole } from "./role.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private roleService: LoggedRole){}
    role: string = ""
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.role = this.roleService.loggedIdentity
        
        if ( this.role === "admin" ) {
            const adminToken = localStorage.getItem("adminToken")
            
            if ( adminToken ) {            
                const authReq = req.clone({
                    headers: req.headers.set("Authorization", `Bearer ${adminToken}`)
                })
                return next.handle(authReq)
            }
        } else if ( this.role === "user" ) {
            const token = localStorage.getItem("token")
            
            if ( token ) {            
                const authReq = req.clone({
                    headers: req.headers.set("Authorization", `Bearer ${token}`)
                })
                return next.handle(authReq)
            }
        }
        return next.handle(req)
    }
}













// const token = localStorage.getItem("token")

// if ( token ) {            
//     const authReq = req.clone({
//         headers: req.headers.set("Authorization", `Bearer ${token}`)
//     })
//     return next.handle(authReq)
// }
// return next.handle(req)