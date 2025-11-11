import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  protected readonly auth = inject(AuthService);

  async ngOnInit(): Promise<void> {
    await this.auth.init();
  }

  login(): void {
    this.auth.login();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
  }
}
