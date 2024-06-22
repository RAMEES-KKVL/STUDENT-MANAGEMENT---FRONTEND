import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthInterceptor } from "./auth.interceptor.service";
import { Observable } from "rxjs";

export class AuthGuard {
    constructor(private router: Router, private authService: AuthInterceptor) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | boolean | UrlTree {
        const token = localStorage.getItem("token")

        if ( token ) {
            return true
        }
        this.router.navigate(["/auth/login"])
        return false
    }
}
