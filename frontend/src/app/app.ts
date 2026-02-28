import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent, ConfirmModalComponent],
  template: `
    <router-outlet />
    <app-toast />
    <app-confirm-modal />
  `,
  styles: [':host { display: block; min-height: 100vh; }'],
})
export class App {}
