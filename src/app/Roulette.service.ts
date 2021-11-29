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
    }, 1000);
    console.log(this.intervalId);
  }

  stop(){
    clearInterval(this.intervalId);
  }

  getColor(number: number){
    for(number = 1; number <= 10; number++){
      if(number % 2 === 0){
        this.color = 'black';
      } else {
        this.color = 'red';
      }
    }

    for(number = 19; number <= 28; number++){
      if(number % 2 === 0) {
        this.color = 'black';
      } else {
        this.color = 'red';
      }
    }

    for(number = 11; number <= 18; number++){
      if(number % 2 === 0) {
        this.color = 'red';
      } else {
        this.color = 'black';
      }
    }

    for(number = 29; number <= 36; number++){
      if(number % 2 === 0) {
        this.color = 'red';
      } else {
        this.color = 'black';
      }
    }

    if(number === 0){
      this.color = 'zero'
    } else {
      this.color = 'unknown';
    }
  }
}
