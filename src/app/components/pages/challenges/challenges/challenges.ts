import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SkillService } from '../../../../services/skill';
import { Challenge } from '../../../../models/skill';


@Component({
  selector: 'app-challenges',
  imports: [CommonModule],
  templateUrl: './challenges.html',
  styleUrl: './challenges.css',
})
export class Challenges {
skillService = inject(SkillService);

  completeChallenge(challenge: Challenge): void {
    if (!challenge.completed) {
      this.skillService.completeChallenge(challenge.id);
      this.showToast();
    }
  }

  private showToast(): void {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold z-50 animate-in slide-in-from-right';
    toast.textContent = '🎉 Défi complété ! +XP';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  getDifficultyClass(difficulty: string): string {
    switch(difficulty) {
      case 'Facile': return 'bg-green-100 text-green-700';
      case 'Moyen': return 'bg-amber-100 text-amber-700';
      default: return 'bg-red-100 text-red-700';
    }
  }

  getDifficultyIcon(difficulty: string): string {
    switch(difficulty) {
      case 'Facile': return '✓';
      case 'Moyen': return '●';
      default: return '★';
    }
  }
}
