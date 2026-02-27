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
      { path: 'vouchers/receipt', loadComponent: () => import('./pages/vouchers/vouchers').then(m => m.VouchersComponent) },
      { path: 'vouchers/payment', loadComponent: () => import('./pages/vouchers/vouchers').then(m => m.VouchersComponent) },
      { path: 'journal', loadComponent: () => import('./pages/journal/journal').then(m => m.JournalComponent) },
      { path: 'operation-types', loadComponent: () => import('./pages/operation-types/operation-types').then(m => m.OperationTypesComponent) },
      { path: 'collections', loadComponent: () => import('./pages/collections/collections').then(m => m.CollectionsComponent) },
      { path: 'billing-systems', loadComponent: () => import('./pages/billing-systems/billing-systems').then(m => m.BillingSystemsComponent) },
      { path: 'sidebar-settings', loadComponent: () => import('./pages/sidebar-settings/sidebar-settings').then(m => m.SidebarSettingsComponent) },
      { path: 'summary', loadComponent: () => import('./pages/summary/summary').then(m => m.SummaryComponent) },
      { path: 'reports', loadComponent: () => import('./pages/reports/reports').then(m => m.ReportsComponent) },
      { path: 'banks', loadComponent: () => import('./pages/banks/banks').then(m => m.BanksComponent) },
      { path: 'exchangers', loadComponent: () => import('./pages/exchanges/exchanges').then(m => m.ExchangesComponent) },
      { path: 'wallets', loadComponent: () => import('./pages/wallets/wallets').then(m => m.WalletsComponent) },
      { path: 'partners', loadComponent: () => import('./pages/partners/partners').then(m => m.PartnersComponent) },
      { path: 'warehouse', loadComponent: () => import('./pages/warehouse/warehouse').then(m => m.WarehouseComponent) },
      { path: 'suppliers', loadComponent: () => import('./pages/suppliers/suppliers').then(m => m.SuppliersComponent) },
      { path: 'settlements', loadComponent: () => import('./pages/settlements/settlements').then(m => m.SettlementsComponent) },
      { path: 'pending', loadComponent: () => import('./pages/pending-accounts/pending-accounts').then(m => m.PendingAccountsComponent) },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
