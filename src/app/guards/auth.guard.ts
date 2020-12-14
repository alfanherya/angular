import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser: User;
  constructor(private router: Router,
    private UserService: UserService) {
    this.UserService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
    })

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.UserService.currentUserValue;
    if (this.currentUser) {
      if (route.data.roles && route.data.roles.indexOf(this.currentUser.role) === -1) {
        this.router.navigate(['/401']);
        return false;
      }
      return true;

    }
    this.router.navigate(['/login']);
    return false;
  }

}
