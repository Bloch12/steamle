import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { userService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class userGuard implements CanActivate {

constructor(private user: userService, private router: Router) { }
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    await this.user.validateUser();
    if (this.user.getUserData()) {
      return true;
    } else {
      localStorage.removeItem("userId");
      this.user.validateUser();
      return true;
    }
  }
}
