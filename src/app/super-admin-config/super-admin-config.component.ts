import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-super-admin-config',
  templateUrl: './super-admin-config.component.html',
  styleUrls: ['./super-admin-config.component.scss']
})
export class SuperAdminConfigComponent implements OnInit {

  supadUsers?: User[];
  adUsers?: User[];
  docUsers?: User[];

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    // Récupération des utilisateurs par role 'ROLE_SUPERADMIN'
    this.userService.getAllUsersByRole('SUPERADMIN').subscribe(resultUsers => {this.supadUsers = resultUsers;});

    // Récupération des utilisateurs par role 'ROLE_ADMIN'
    this.userService.getAllUsersByRole('ADMIN').subscribe(resultUsers => {this.adUsers = resultUsers;});

    // Récupération des utilisateurs par role 'ROLE_DOCTOR'
    this.userService.getAllUsersByRole('DOCTOR').subscribe(resultUsers => {this.docUsers = resultUsers;});
  }

  // Bouton add user
  addUser(): void {
    this.router.navigate(['superadmin/user/0'],);
  }
}
