import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouletteService } from './Roulette.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  balance = 100;
  numbers: number[] = [];
  colors!: string;
  click = false;

  @ViewChild('inputBet') inputBet!: ElementRef;
  @ViewChild('black') black!: ElementRef;
  @ViewChild('red') red!: ElementRef;
  @ViewChild('zero') zero!: ElementRef;

  constructor(private rouletteService: RouletteService) {}

  ngOnInit(){
    this.rouletteService.newNumber.subscribe((number: number) => {
      this.numbers.push(number);

      this.colors = this.rouletteService.getColor(number);

      const bet = parseFloat(this.inputBet.nativeElement.value);
      const black = this.black.nativeElement.checked;
      const red = this.red.nativeElement.checked;
      const zero = this.zero.nativeElement.checked;

      if(black && this.colors === this.black.nativeElement.value ||
        red && this.colors === this.red.nativeElement.value){
        this.balance += bet;
      } else if (zero && this.colors === this.zero.nativeElement.value) {
        this.balance += bet * 35;
      } else {
        this.balance -= bet;
      }

      if(this.inputBet.nativeElement.value === '') {
        this.balance = 100;
      } else if (!black && !red && !zero) {
        this.balance = 100;
      }
    });
  }

  onStart(){
    this.rouletteService.start();
    this.click = true;
  }

  onStop(){
    this.rouletteService.stop();
    this.click = false;
  }

  onReset(){
    this.numbers = [];
    this.balance = 100;
    this.inputBet.nativeElement.value = '';
    this.black.nativeElement.checked = false;
    this.red.nativeElement.checked = false;
    this.zero.nativeElement.checked = false;
  }
 }
