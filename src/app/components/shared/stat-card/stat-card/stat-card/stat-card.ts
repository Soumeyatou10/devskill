import { Component,input} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {
  label = input.required<string>();
  value = input.required<number | string>();
  color = input<string>('#1a2340');
  subtitle = input<string>('');
}
