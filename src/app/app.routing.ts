import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminGuard } from "./guards/admin.guard";
import { DepartmentComponent } from "./components/department/department.component";
import { MascotComponent } from "./components/mascot/mascot.component";
import { CreateDepartmentComponent } from "./components/department/create-department/create-department.component";
import { CreateMascotComponent } from "./components/mascot/create-mascot/create-mascot.component";
import { UserComponent } from "./components/register/user/user.component";
import { CreateUserComponent } from "./components/register/create-user/create-user.component";
import { UpdateUserComponent } from "./components/register/update-user/update-user.component";
import { VisitorComponent } from "./components/visit/visitor.component";
import { CreateVisitorComponent } from "./components/visit/create-visitor/create-visitor.component";
import { VisitComponent } from "./components/visit/visit/visit.component";
import { CreateVisitComponent } from "./components/visit/create-visit/create-visit.component";
import { UpdateDepartmentComponent } from "./components/department/update-department/update-department.component";
import { UpdateMascotComponent } from "./components/mascot/update-mascot/update-mascot.component";
import { PaymentServicesComponent } from "./components/payment/payment-services/payment-services.component";
import { PaymentReceiptsComponent } from "./components/payment/payment-receipts/payment-receipts.component";
import { CreatePaymentReceiptsComponent } from "./components/payment/create-payment-receipts/create-payment-receipts.component";
import { IncidenceComponent } from "./components/incidence/incidence/incidence.component";
import { CreateIncidenceComponent } from "./components/incidence/create-incidence/create-incidence.component";

const appRoute: Routes = [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard]},
    {path: 'dashboard', children: [
        {path: 'user', component: UserComponent, canActivate: [AdminGuard]},
        {path: 'user/create', component: CreateUserComponent, canActivate: [AdminGuard]},
        {path: 'user/update/:id', component: UpdateUserComponent, canActivate: [AdminGuard]},
        {path: 'department', component: DepartmentComponent, canActivate: [AdminGuard]},
        {path: 'department/create', component: CreateDepartmentComponent, canActivate: [AdminGuard]},
        {path: 'department/update/:id', component: UpdateDepartmentComponent, canActivate: [AdminGuard]},
        {path: 'mascot', component: MascotComponent, canActivate: [AdminGuard]},
        {path: 'mascot/create', component: CreateMascotComponent, canActivate: [AdminGuard]},
        {path: 'mascot/update/:id', component: UpdateMascotComponent, canActivate: [AdminGuard]},
        {path: 'visitor', component: VisitorComponent, canActivate: [AdminGuard]},
        {path: 'visitor/create', component: CreateVisitorComponent, canActivate: [AdminGuard]},
        {path: 'visit', component: VisitComponent, canActivate: [AdminGuard]},
        {path: 'visit/create', component: CreateVisitComponent, canActivate: [AdminGuard]},
        {path: 'boleta', component: PaymentReceiptsComponent, canActivate: [AdminGuard]},
        {path: 'boleta/create', component: CreatePaymentReceiptsComponent, canActivate: [AdminGuard]},
        {path: 'payment', component: PaymentServicesComponent, canActivate: [AdminGuard]},
        {path: 'incidence', component: IncidenceComponent, canActivate: [AdminGuard]},
        {path: 'incidence/create', component: CreateIncidenceComponent, canActivate: [AdminGuard]},
    ]},

    {path: 'login', component: LoginComponent}
]

export const appRoutingProvider: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);