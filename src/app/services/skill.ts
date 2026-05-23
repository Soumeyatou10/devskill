import { SkillModel } from './../models/skill';
import { Injectable, signal, computed, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SkillLevel, Challenge, Activity } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  // ═══ PRIVATE SIGNALS ═══
  private _skills = signal<SkillModel[]>([]);
  private _challenges = signal<Challenge[]>([]);
  private _search = signal<string>('');
  private _filter = signal<string>('Tous');
  private _activities = signal<Activity[]>([]);
  
  private isBrowser: boolean;

  // ═══ READONLY PUBLIC SIGNALS ═══
  readonly skills = this._skills.asReadonly();
  readonly challenges = this._challenges.asReadonly();
  readonly activities = this._activities.asReadonly();

  // ═══ COMPUTED SIGNALS ═══
  readonly filteredSkills = computed(() => {
    const query = this._search().toLowerCase();
    const filter = this._filter();
    
    return this._skills().filter(skill => {
      const matchesSearch = skill.name.toLowerCase().includes(query);
      const matchesFilter = filter === 'Tous' || skill.category === filter;
      return matchesSearch && matchesFilter;
    });
  });

  readonly totalXP = computed(() => 
    this._skills().reduce((sum, skill) => sum + skill.xp, 0)
  );

  readonly masteredCount = computed(() =>
    this._skills().filter(s => s.level === 'Maîtrisé').length
  );

  readonly learningCount = computed(() =>
    this._skills().filter(s => s.level === 'En cours').length
  );

  readonly completionRate = computed(() => {
    const total = this._skills().length;
    return total ? Math.round((this.masteredCount() / total) * 100) : 0;
  });

  readonly xpToNextLevel = computed(() => {
    const totalXP = this.totalXP();
    const nextLevelXP = Math.ceil((totalXP + 1) / 1000) * 1000;
    return nextLevelXP - totalXP;
  });

  readonly currentLevel = computed(() => 
    Math.floor(this.totalXP() / 1000) + 1
  );

  readonly progressToNextLevel = computed(() => {
    const currentLevelXP = (this.currentLevel() - 1) * 1000;
    const xpInCurrentLevel = this.totalXP() - currentLevelXP;
    return Math.round((xpInCurrentLevel / 1000) * 100);
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadData();
    if (this.isBrowser) {
      this.initMockActivities();
      this.setupAutoSave();
    }
  }

  private loadData(): void {
    if (this.isBrowser) {
      const storedSkills = localStorage.getItem('devskill_skills');
      const storedChallenges = localStorage.getItem('devskill_challenges');
      const storedActivities = localStorage.getItem('devskill_activities');

      this._skills.set(storedSkills ? JSON.parse(storedSkills) : this.getMockSkills());
      this._challenges.set(storedChallenges ? JSON.parse(storedChallenges) : this.getMockChallenges());
      if (storedActivities) {
        this._activities.set(JSON.parse(storedActivities));
      } else {
        this._activities.set(this.getMockActivities());
      }
    } else {
      // Mode SSR : utiliser les données mock
      this._skills.set(this.getMockSkills());
      this._challenges.set(this.getMockChallenges());
      this._activities.set(this.getMockActivities());
    }
  }

  private setupAutoSave(): void {
    // Effect pour sauvegarder automatiquement dans localStorage
    effect(() => {
      if (this.isBrowser) {
        localStorage.setItem('devskill_skills', JSON.stringify(this._skills()));
        localStorage.setItem('devskill_challenges', JSON.stringify(this._challenges()));
        localStorage.setItem('devskill_activities', JSON.stringify(this._activities()));
      }
    });
  }

  private getMockSkills(): SkillModel[] {
    return [
      { id: 1, name: 'Composants', category: 'Angular', level: 'Maîtrisé', xp: 100, description: 'Créer, configurer et utiliser des composants Angular avec le décorateur @Component.' },
      { id: 2, name: 'Sélecteurs', category: 'Angular', level: 'Maîtrisé', xp: 100, description: 'Maîtriser les 3 types de sélecteurs : balise, attribut et classe CSS.' },
      { id: 3, name: 'Inputs & Outputs', category: 'Angular', level: 'Maîtrisé', xp: 100, description: 'Communication parent-enfant avec la nouvelle API input() et output().' },
      { id: 4, name: 'Two-Way Binding', category: 'Angular', level: 'Maîtrisé', xp: 100, description: 'Synchronisation bidirectionnelle entre le composant et le template.' },
      { id: 5, name: 'Lifecycle Hooks', category: 'Angular', level: 'En cours', xp: 60, description: "ngOnInit, ngOnDestroy, ngAfterViewInit, ngOnChanges et leur ordre d'exécution." },
      { id: 6, name: 'Signals', category: 'Angular', level: 'Maîtrisé', xp: 100, description: 'Réactivité moderne avec signal(), computed() et effect() dans Angular 17+.' },
      { id: 7, name: 'Routing', category: 'Angular', level: 'En cours', xp: 40, description: 'Navigation entre vues avec le Router, les routes et RouterLink.' },
      { id: 8, name: 'TypeScript', category: 'Fondamentaux', level: 'Maîtrisé', xp: 90, description: 'Types, interfaces, génériques, décorateurs et options du compilateur.' },
      { id: 9, name: 'RxJS', category: 'Avancé', level: 'À apprendre', xp: 0, description: 'Programmation réactive avec Observables, opérateurs et subscriptions.' },
      { id: 10, name: 'NgRx', category: 'Avancé', level: 'À apprendre', xp: 0, description: "Gestion d'état avancée avec le pattern Redux." }
    ];
  }

  private getMockChallenges(): Challenge[] {
    return [
      { id: 1, title: 'Composant de carte profil réutilisable', difficulty: 'Facile', tags: ['Composants', 'Inputs'], xpReward: 50, completed: false, skillId: 1 },
      { id: 2, title: 'Système de filtrage avec Two-Way Binding', difficulty: 'Moyen', tags: ['Two-Way', 'Signals'], xpReward: 80, completed: false, skillId: 4 },
      { id: 3, title: 'Barre de progression animée', difficulty: 'Moyen', tags: ['Lifecycle', 'AfterViewInit'], xpReward: 80, completed: false, skillId: 5 },
      { id: 4, title: 'Service centralisé avec auto-save', difficulty: 'Difficile', tags: ['Services', 'Effects'], xpReward: 150, completed: false, skillId: 6 }
    ];
  }

  private getMockActivities(): Activity[] {
    return [
      {
        id: 1,
        title: 'Signals maîtrisés',
        description: 'Compétence validée',
        xpGained: 100,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        icon: '⚡',
        iconColor: 'bg-green-100'
      },
      {
        id: 2,
        title: 'Défi Two-Way Binding',
        description: 'Défi complété',
        xpGained: 80,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        icon: '🎯',
        iconColor: 'bg-amber-100'
      },
      {
        id: 3,
        title: 'Inputs & Outputs maîtrisés',
        description: 'Compétence validée',
        xpGained: 100,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        icon: '📤',
        iconColor: 'bg-blue-100'
      }
    ];
  }

  private initMockActivities(): void {
    if (this.isBrowser && !localStorage.getItem('devskill_activities')) {
      this._activities.set(this.getMockActivities());
    }
  }

  updateSkillLevel(id: number, level: SkillLevel): void {
    this._skills.update(list =>
      list.map(skill => {
        if (skill.id === id) {
          const newXP = level === 'Maîtrisé' ? 100 : level === 'En cours' ? 50 : 0;
          const oldLevel = skill.level;
          
          // Ajouter une activité si le niveau a changé
          if (oldLevel !== level && level === 'Maîtrisé') {
            this.addActivity({
              id: Date.now(),
              title: `${skill.name} maîtrisé !`,
              description: 'Compétence validée',
              xpGained: newXP - skill.xp,
              timestamp: new Date(),
              icon: '🏆',
              iconColor: 'bg-green-100'
            });
          }
          
          return { ...skill, level, xp: newXP };
        }
        return skill;
      })
    );
  }

  setSearch(query: string): void {
    this._search.set(query);
  }

  setFilter(filter: string): void {
    this._filter.set(filter);
  }

  completeChallenge(id: number): void {
    this._challenges.update(list =>
      list.map(challenge => {
        if (challenge.id === id && !challenge.completed) {
          // Ajouter l'XP à la compétence associée
          const skill = this._skills().find(s => s.id === challenge.skillId);
          if (skill && skill.xp < 100) {
            const newXP = Math.min(skill.xp + challenge.xpReward, 100);
            this._skills.update(skills =>
              skills.map(s => s.id === skill.id ? { ...s, xp: newXP, level: newXP === 100 ? 'Maîtrisé' : s.level } : s)
            );
          }
          
          // Ajouter une activité
          this.addActivity({
            id: Date.now(),
            title: challenge.title,
            description: 'Défi complété',
            xpGained: challenge.xpReward,
            timestamp: new Date(),
            icon: '🎉',
            iconColor: 'bg-purple-100'
          });
          
          return { ...challenge, completed: true };
        }
        return challenge;
      })
    );
  }

  private addActivity(activity: Activity): void {
    this._activities.update(list => [activity, ...list].slice(0, 10));
  }

  getXPColor(xp: number): string {
    if (xp === 100) return '#2d7a4f';
    if (xp >= 50) return '#e07b39';
    return '#cbd5e1';
  }

  getLevelClass(level: SkillLevel): string {
    switch(level) {
      case 'Maîtrisé': return 'lvl-mastered';
      case 'En cours': return 'lvl-learning';
      default: return 'lvl-tolearn';
    }
  }
}