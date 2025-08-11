import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;
  

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ){
    this.model = {
      email:'',
      password:''
    };
  }


  onFormSubmit(): void{
    this.authService.login(this.model)
    .subscribe({
      next: (response) =>{
        console.log(response);
        // set auth cookie
        this.cookieService.set('Authorization',`Bearer ${response.token}`,
          undefined, '/',undefined,true,'Strict'
        );
        localStorage.setItem('token', response.token);
        const decodedToken: any = jwtDecode(response.token);
        const userId = decodedToken.sub || decodedToken.nameid;
        this.authService.setUser({
          id: userId,
          email: response.email,
          roles: response.roles
        });

        this.router.navigateByUrl('/');
      }
    });



  }

}
