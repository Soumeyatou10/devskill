


export type SkillLevel = 'Maîtrisé' | 'En cours' | 'À apprendre';

export interface SkillModel {
  id: number;
  name: string;
  category: 'Angular' | 'Fondamentaux' | 'Avancé';
  level: SkillLevel;
  xp: number;
  description: string;
}

export interface Challenge {
  id: number;
  title: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  tags: string[];
  xpReward: number;
  completed: boolean;
  skillId: number;
}

export interface User {
  name: string;
  level: number;
  xp: number;
  avatar: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  xpGained: number;
  timestamp: Date;
  icon: string;
  iconColor: string;
}