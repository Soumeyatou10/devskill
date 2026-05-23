import { Component, input, signal, OnChanges, AfterViewInit, ElementRef, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar implements AfterViewInit, OnChanges{

percentage = input.required<number>();
  color = input<string>('#0d6e6e');
  height = input<number>(5);
  animated = input<boolean>(true);

  @ViewChild('progressFill') progressFill!: ElementRef<HTMLDivElement>;
  
  displayWidth = signal<string>('0%');
  private hasAnimated = false;

  ngAfterViewInit(): void {
    if (this.animated() && !this.hasAnimated) {
      setTimeout(() => {
        this.displayWidth.set(`${this.percentage()}%`);
        this.hasAnimated = true;
      }, 50);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.animated() || this.hasAnimated) {
      this.displayWidth.set(`${this.percentage()}%`);
    }
  }
}
