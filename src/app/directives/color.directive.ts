import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { RouletteService } from '../Roulette.service';

@Directive({ selector: '[appColor]'})

export class ColorDirective {
  color!: string;
  @Input() set appColor (number: string) {
    const newNumber = parseFloat(number);
    this.color = this.rouletteService.getColor(newNumber);
    if(newNumber){
      this.renderer.addClass(this.el.nativeElement, this.color);
    }
  }
  constructor(private rouletteService: RouletteService, private el: ElementRef, private renderer: Renderer2) {}
}
