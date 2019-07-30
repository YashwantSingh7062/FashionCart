import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private httpService : HttpService, private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
    if(this.httpService.isLoggedIn()){
      return true;
    }
    else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
