import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTabsModule} from '@angular/material/tabs';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminCentreComponent } from './admin-centre/admin-centre.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SuperAdminCentresComponent } from './super-admin-centres/super-admin-centres.component';
import { SuperAdminCentreIdComponent } from './super-admin-centre-id/super-admin-centre-id.component';
import { SuperAdminConfigComponent } from './super-admin-config/super-admin-config.component';
import { VaccinationCenterListComponent } from './vaccination-center-list/vaccination-center-list.component';
import { VaccinationCenterComponent } from './vaccination-center/vaccination-center.component';
import { SuperAdminUserComponent } from './super-admin-user/super-admin-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    VaccinationCenterComponent,
    VaccinationCenterListComponent,
    LoginComponent,
    SuperAdminCentresComponent,
    SuperAdminCentreIdComponent,
    SuperAdminConfigComponent,
    AdminCentreComponent,
    PlanningComponent,
    SearchBarComponent,
    SuperAdminUserComponent,
    UsersListComponent,
    AdminUserComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatGridListModule,
    MatSortModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'fr-IN'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
