import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router } from '@angular/router';
import { UserService } from '../../modules/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private userService: UserService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    return await this.checkAuth();
  }


  private async checkAuth(): Promise<boolean> {
    if (this.userService.user == undefined) {
        await this.userService.loadAuthenticatedUser()
    }

    if (this.userService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      return false;
    }
  }

}