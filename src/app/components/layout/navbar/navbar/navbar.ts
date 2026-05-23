import { CommonModule } from '@angular/common';
import { Component, input, output, OnInit, inject } from '@angular/core';
import { SkillService } from '../../../../services/skill';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar  implements OnInit{
  private router = inject(Router);
  skillService = inject(SkillService);
  
  userName = input<string>('Jean Dupont');
  routeChanged = output<string>();
  
  activeRoute = '/dashboard';
  
  navItems: NavItem[] = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/skills', label: 'Compétences', icon: '⭐' },
    { path: '/challenges', label: 'Défis', icon: '🎯' },
    { path: '/profile', label: 'Profil', icon: '👤' }
  ];

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activeRoute = this.router.url;
    });
    this.activeRoute = this.router.url;
  }

  navigate(route: string): void {
    this.activeRoute = route;
    this.routeChanged.emit(route);
    this.router.navigate([route]);
  }

}
