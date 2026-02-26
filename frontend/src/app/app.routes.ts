import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'businesses',
    loadComponent: () => import('./pages/business-select/business-select').then(m => m.BusinessSelectComponent),
    canActivate: [authGuard],
  },
  {
    path: 'biz/:bizId',
    loadComponent: () => import('./pages/business-layout/business-layout').then(m => m.BusinessLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'stations', loadComponent: () => import('./pages/stations/stations').then(m => m.StationsComponent) },
      { path: 'accounts', loadComponent: () => import('./pages/accounts/accounts').then(m => m.AccountsComponent) },
      { path: 'employees', loadComponent: () => import('./pages/employees/employees').then(m => m.EmployeesComponent) },
      { path: 'funds', loadComponent: () => import('./pages/funds/funds').then(m => m.FundsComponent) },
      { path: 'vouchers', loadComponent: () => import('./pages/vouchers/vouchers').then(m => m.VouchersComponent) },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
