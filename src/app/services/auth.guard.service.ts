import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

export const AuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
): Observable<boolean | UrlTree> | boolean | UrlTree => {
    const router = inject(Router)
    const token = localStorage.getItem("token")

    if (token) {
        return true;
    }
    return router.createUrlTree(['/auth/login']);
}