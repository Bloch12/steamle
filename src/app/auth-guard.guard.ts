import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { userService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

constructor(private user: userService, private router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    // Aquí puedes realizar la lógica de autorización.
    // Por ejemplo, verificar si el usuario está autenticado.
    if (await this.user.isAdm()) {
      return true;
    } else {
      // Redirigir al usuario a la página de inicio de sesión si no está autenticado.
      return this.router.parseUrl('/');
    }
  }
}
