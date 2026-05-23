import { CommonModule} from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { SkillService } from '../../../../services/skill';
import { ProgressBar } from '../../../shared/progress-bar/progress-bar/progress-bar';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ProgressBar],
  
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
 skillService = inject(SkillService);

  categories = computed(() => {
    const skills = this.skillService.skills();
    const categoriesList = [
      { name: 'Angular', color: '#0d6e6e', skills: skills.filter(s => s.category === 'Angular') },
      { name: 'Fondamentaux', color: '#1a5fa8', skills: skills.filter(s => s.category === 'Fondamentaux') },
      { name: 'Avancé', color: '#6b3fa0', skills: skills.filter(s => s.category === 'Avancé') }
    ];
    
    return categoriesList.map(cat => ({
      name: cat.name,
      color: cat.color,
      total: cat.skills.length,
      mastered: cat.skills.filter(s => s.level === 'Maîtrisé').length,
      percentage: cat.skills.length ? Math.round(cat.skills.filter(s => s.level === 'Maîtrisé').length / cat.skills.length * 100) : 0
    }));
  });

  achievements = [
    { title: 'Premier Composant', icon: '🎨', earned: true },
    { title: 'Signaleur', icon: '⚡', earned: true },
    { title: 'Maître Binding', icon: '🔄', earned: true },
    { title: 'Routeur Pro', icon: '🗺️', earned: false },
    { title: 'Expert Angular', icon: '🏆', earned: false },
    { title: 'Full Stack', icon: '💪', earned: false }
  ];
}
