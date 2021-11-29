import { EventEmitter } from '@angular/core';

export class RouletteService {
  newNumber = new EventEmitter<number>();
  interval!: number;
  color!: string;
  intervalId!: number;

  generateNumber(){
    return Math.floor(Math.random() * 37);
  }

  start(){
    this.intervalId = setInterval(() =>{
      this.interval = this.generateNumber();
      this.newNumber.emit(this.interval);
    }, 100);
  }

  stop(){
    clearInterval(this.intervalId);
  }

  getColor(number: number){
    if(number >= 1 && number <= 10 || number >= 19 && number <= 28){
      if(number % 2 === 0) {
        this.color = 'black';
      } else {
        this.color = 'red';
      }
    } else if(number >= 11 && number <= 18 || number >= 29 && number <= 36) {
      if(number % 2 === 0) {
        this.color = 'red';
      } else {
        this.color = 'black';
      }
    } else if (number === 0) {
      this.color = 'zero';
    } else {
      this.color = 'unknown';
    }
    return this.color;
  }
}
