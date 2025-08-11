import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '../services/users.service'; // adjust path as needed
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];
  loading = true;

  constructor(private usersService: UsersService,
    private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
   this.getAllUsers();
  }


  getAllUsers(): void {
     const currentUser = this.authService.getUser(); 
    this.usersService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data.filter(u => u.userId !== currentUser?.id);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.loading = false;
      }
    });
  }
  openChat(userId: string) {
    this.router.navigate(['/chat', userId]);
  }
}
