import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) =>{
        console.log(response);
      }
    })
  }

}
