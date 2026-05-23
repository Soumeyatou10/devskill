import { SkillService } from './../../../../services/skill';
import { Component , input, output, OnChanges, SimpleChanges, signal } from '@angular/core';
import { ProgressBar } from '../../progress-bar/progress-bar/progress-bar';
import { SkillLevel, SkillModel } from '../../../../models/skill'

;

@Component({
  selector: 'app-skill-card',
  imports: [ProgressBar],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.css',
})
export class SkillCard implements OnChanges {

 skill = input.required<SkillModel>();
  isSelected = input<boolean>(false);

  skillClicked = output<SkillModel>();
  levelChanged = output<{ skill: SkillModel; level: SkillLevel }>();

  levelClass = signal<string>('');
  barColor = signal<string>('#0d6e6e');

  constructor(private skillService: SkillService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['skill']) {
      this.updateStyles();
    }
  }

  private updateStyles(): void {
    const skill = this.skill();
    this.levelClass.set(this.skillService.getLevelClass(skill.level));
    this.barColor.set(this.skillService.getXPColor(skill.xp));
  }

  onClick(): void {
    this.skillClicked.emit(this.skill());
  }

  changeLevel(newLevel: SkillLevel, event: Event): void {
    event.stopPropagation();
    this.levelChanged.emit({ skill: this.skill(), level: newLevel });
  }
}

