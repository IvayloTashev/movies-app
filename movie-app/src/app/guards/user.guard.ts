import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";

export const userAuthGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const userService = inject(UserService)
    const IsLogged = userService.IsLogged;
    const router = inject(Router)

    if (!IsLogged) {
        return true;
    }

    router.navigate(['/home']);
    return false;
}