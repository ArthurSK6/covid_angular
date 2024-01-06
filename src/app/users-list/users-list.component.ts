import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit{

  @Input() users?: User[];
  @Input() role: string = '';
  @Input() idCenter: number = 0;
  @Input() isSuperAdmin: boolean = false;

  AuthUserSub! : Subscription;
  idUserCenter?: number;
  idUser?: number;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {

    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next : user => {
        if(user) {
          this.idUserCenter = user.vaccinationCenter?.id;
          this.idUser = user.id;
        }
        //Conversion du nom du role
        this.role = this.convertRole(this.role);
      }
    });
  }

  // Bouton edit user
  editUser(id: number): void {
    if (this.isSuperAdmin) {this.router.navigate(['superadmin/user/', id]);}
    else {
      const url = "admin/user/"+id;
      this.router.navigate([url]);
    }
  }

  // Bouton delete user
  deleteUserFromCenter(id: number): void {
    // Supprimer le centre de vaccination d'un utilisateur
    this.userService.deleteCenterToUser(id).subscribe(result => {
      location.reload();
    });
   
  }

  // Convertir le role dans le bon format en string
  convertRole(role?: string): string {
    if (role === 'SUPERADMIN') {return 'Super Administrateur';}
    else if (role === 'ADMIN') {return 'Administrateur';}
    else if (role === 'DOCTOR') {return 'Docteur';}
    else if (role === 'Super Administrateur') {return 'SUPERADMIN';}
    else if (role === 'Administrateur') {return 'ADMIN';}
    else if (role === 'Docteur') {return 'DOCTOR';}
    else {return '';}
  }

}
