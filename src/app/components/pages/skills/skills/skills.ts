import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SkillLevel, SkillModel } from '../../../../models/skill';
import { ProgressBar } from '../../../shared/progress-bar/progress-bar/progress-bar';
import { SkillCard } from '../../../shared/skill-card/skill-card/skill-card';
import { SkillService } from '../../../../services/skill';


@Component({
  selector: 'app-skills',
  imports: [CommonModule, FormsModule, SkillCard, ProgressBar],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
skillService = inject(SkillService);
  
  categories = ['Tous', 'Angular', 'Fondamentaux', 'Avancé'];
  levels: SkillLevel[] = ['Maîtrisé', 'En cours', 'À apprendre'];
  
  searchQuery = '';
  activeFilter = 'Tous';
  selectedSkillId = signal<number | null>(null);
  selectedSkill = signal<SkillModel | null>(null);

  onSearchChange(): void {
    this.skillService.setSearch(this.searchQuery);
  }

  setFilter(category: string): void {
    this.activeFilter = category;
    this.skillService.setFilter(category);
  }

  openDetail(skill: SkillModel): void {
    this.selectedSkillId.set(skill.id);
    this.selectedSkill.set(skill);
  }

  closeDetail(): void {
    this.selectedSkillId.set(null);
    this.selectedSkill.set(null);
  }

  onLevelChanged(event: { skill: SkillModel; level: SkillLevel }): void {
    this.skillService.updateSkillLevel(event.skill.id, event.level);
    if (this.selectedSkill()?.id === event.skill.id) {
      this.selectedSkill.set(this.skillService.skills().find(s => s.id === event.skill.id) || null);
    }
  }

  changeLevel(level: SkillLevel): void {
    const skill = this.selectedSkill();
    if (skill) {
      this.skillService.updateSkillLevel(skill.id, level);
      this.selectedSkill.set(this.skillService.skills().find(s => s.id === skill.id) || null);
    }
  }

  getLevelClass(level: SkillLevel): string {
    return this.skillService.getLevelClass(level);
  }

  getXPColor(xp: number): string {
    return this.skillService.getXPColor(xp);
  }

  getLevelButtonClass(level: SkillLevel): string {
    const isActive = this.selectedSkill()?.level === level;
    switch(level) {
      case 'Maîtrisé':
        return isActive ? 'bg-green-600 text-white' : 'bg-green-50 text-green-700 border border-green-600';
      case 'En cours':
        return isActive ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700 border border-amber-600';
      default:
        return isActive ? 'bg-gray-600 text-white' : 'bg-gray-50 text-gray-600 border border-gray-400';
    }
  }
}
