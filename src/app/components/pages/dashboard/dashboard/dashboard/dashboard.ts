import { Component, OnInit, inject} from '@angular/core';
import { StatCard } from '../../../../shared/stat-card/stat-card/stat-card/stat-card';
import { ProgressBar } from '../../../../shared/progress-bar/progress-bar/progress-bar';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../../../../services/skill';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, StatCard, ProgressBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
 skillService = inject(SkillService);

  ngOnInit(): void {
    // Les données sont déjà chargées via le service
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'à l\'instant';
    if (hours < 24) return `il y a ${hours}h`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'hier';
    return `il y a ${days}j`;
  }
}
