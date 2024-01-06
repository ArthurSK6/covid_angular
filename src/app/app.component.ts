import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "./services/auth.service";
import { Subscription } from "rxjs";
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{
  constructor(
    private authService : AuthService,
    private userService : UserService
    ) {
  }

  showSuperAdminBoard = false;
  showAdminBoard = false;
  idUserCenter? : number;
  idUser? : number;

  AuthUserSub! : Subscription;

  ngOnInit(): void {
    this.authService.autoLogin();
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next : user => {
        if(user) {
          this.showAdminBoard = user.role === 'ROLE_ADMIN';
          this.showSuperAdminBoard = user.role === 'ROLE_SUPERADMIN';
          this.idUser = user.id;
        }

        if (this.idUser) {
          this.userService.getUserById(this.idUser).subscribe(resultUser => {
            if(resultUser) {          
              this.idUserCenter = resultUser.vaccinationCenter?.id;
            }
          }); 
        }
      }
    })
  }

  handleLogout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.AuthUserSub.unsubscribe();
  }
}
