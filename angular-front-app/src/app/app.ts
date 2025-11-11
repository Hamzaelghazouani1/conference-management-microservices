import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar />
    <main class="container-fluid px-4">
      <router-outlet />
    </main>
  `,
  styles: ``
})
export class App {
  title = 'Conference Management System';
}
