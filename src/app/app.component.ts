import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Calculator';
  display = '0';
  displaySmall = '';
  storeArray: string[] = [];
  finalResult = '';
  regex = /\+|-|\*|\//;
  regexNumDot = /\.|0|1|2|3|4|5|6|7|8|9/;

  input(input: any): void {
    let lastValueOfArray = this.storeArray.slice(-1).toString();
    let secondLastValueOfArray = this.storeArray.slice(-2, -1).toString();
    if (this.regex.test(input) === false && input !== '.') {
      if (lastValueOfArray === '0' && (this.regex.test(secondLastValueOfArray) === true || secondLastValueOfArray === '')) {
        this.storeArray.splice(-1, 1);
        this.storeArray = this.storeArray.concat(input);
        this.display = this.storeArray.join('');
      }
      else {
        this.storeArray = this.storeArray.concat(input);
        this.display = this.storeArray.join('');
      }
      this.updateDisplay();
    }
    else if (this.regex.test(input) === true) {
      if (lastValueOfArray === '' && this.finalResult === '') {
        this.storeArray = this.storeArray.concat('0');
        this.storeArray = this.storeArray.concat(input);
        this.display = this.storeArray.join('');
      }
      else {
        if (lastValueOfArray === '' && this.finalResult !== '') {
          this.displaySmall = 'Ans=' + this.finalResult;
          this.storeArray = this.storeArray.concat(this.finalResult);
          this.validation(input);
          this.display = this.storeArray.join('')
        }
        else {
          this.validation(input);
          this.display = this.storeArray.join('');
        }
      }
      this.updateDisplay();
    }
    else if (input === '.') {
      for (var i = 0; i <= this.storeArray.length; i++) {
        if (this.storeArray[i] === '.') {
          this.dotChecker(input);
          break;
        }
        else if (i === this.storeArray.length && this.storeArray[i] !== '.') {
          this.storeArray = this.storeArray.concat(input);
          this.display = this.storeArray.join('');
          break;
        }
      }
      this.updateDisplay();
    }
  }

  dotChecker(input: string) {
    for (var i = this.storeArray.length; i >= 0; i--) {
      if (this.regex.test(this.storeArray[i]) === true) {
        this.storeArray = this.storeArray.concat(input);
        this.display = this.storeArray.join('');
        break;
      }
      else if (this.storeArray[i] === '.') {
        break;
      }
    }
  }

  updateDisplay(): void {
    if (this.finalResult === '') {
      this.displaySmall = 'Ans=' + '0';
    }
    else {
      this.displaySmall = 'Ans=' + this.finalResult;
    }
  }


  result(): void {
    this.checkError();
    if (this.regex.test(this.storeArray.slice(-1).toString()) === true || this.storeArray.length === 0) {
    }
    else {
      this.displaySmall = this.storeArray.join('') + '=';
      this.checkDoubleOperand();
      this.convertArrayForCalculation();
      if (this.storeArray.length >= 3) {
        this.CalcMulDiv();
        this.CalcAddSub();
        this.finalResult = this.storeArray.join('');
        this.display = this.finalResult;
        this.storeArray = [];
      }
      else {
        this.AddZero();
        this.finalResult = this.storeArray.join('');
        this.display = this.finalResult;
        this.storeArray = [];
      }
    }
  }

  checkError(): void {
    if ((this.storeArray[0] === '.' && this.storeArray[1] === undefined) || (this.storeArray[0] === '.' && this.regex.test(this.storeArray[1]) === true)) {
      this.display = 'Error'
      this.storeArray = [];
    }
    else if (this.storeArray.slice(-1).toString() === '.' && this.regex.test(this.storeArray.slice(-2, -1).toString()) === true) {
      this.display = 'Error'
      this.storeArray = [];
    }
  }

  AddZero(): void {
    let lastValueOfArray = this.storeArray.slice(-1).toString()
    if (lastValueOfArray.slice(-1) === '.') {
      lastValueOfArray = lastValueOfArray.slice(0, 1);
      this.storeArray = lastValueOfArray.split('');
    }
    else if (lastValueOfArray.slice(0, 1) === '.' && lastValueOfArray.slice(-1) !== '0') {
      lastValueOfArray = '0' + lastValueOfArray;
      this.storeArray = lastValueOfArray.split('');
    }
    else if (lastValueOfArray.slice(0, 1) === '.' && lastValueOfArray.slice(-1) == '0') {
      lastValueOfArray = '0';
      this.storeArray = lastValueOfArray.split('');
    }
  }

  CalcMulDiv(): void {
    for (var i = 0; i < this.storeArray.length; i++) {
      if (this.storeArray[i] === '/') {
        this.Calculation(i);
        this.CalcMulDiv();
      }
      else if (this.storeArray[i] === '*') {
        this.Calculation(i);
        this.CalcMulDiv();
      }
    }
  }

  CalcAddSub(): void {
    for (var i = 0; i < this.storeArray.length; i++) {
      if (this.storeArray[i] === '+') {
        this.Calculation(i);
        this.CalcAddSub();
      }
      else if (this.storeArray[i] === '-') {
        this.Calculation(i);
        this.CalcAddSub();
      }
    }
  }

  checkDoubleOperand(): void {
    if (this.storeArray.length >= 4) {
      for (var i = 0; i < this.storeArray.length; i++) {
        if (this.regex.test(this.storeArray[i]) === true) {
          if (this.storeArray[i + 1] === '-') {
            this.storeArray[i + 2] = this.storeArray[i + 1] + this.storeArray[i + 2];
            this.storeArray.splice(i + 1, 1);
          }
        }
      }
    }
  }

  validation(input: string): void {
    let lastValueOfArray = this.storeArray.slice(-1).toString();
    let secondLastValueOfArray = this.storeArray.slice(-2, -1).toString();
    if (this.regex.test(lastValueOfArray.slice(-1)) === true) {
      if ((lastValueOfArray === '/' || lastValueOfArray === '*') && input === '-') {
        this.storeArray = this.storeArray.concat(input);
      }
      if (this.regex.test(lastValueOfArray) === true && input !== '-' && this.regex.test(secondLastValueOfArray) === false) {
        this.storeArray.splice(-1, 1, input);
      }
      if (lastValueOfArray === '+' && input === '-') {
        this.storeArray.splice(-1, 1, input);
      }
    }
    else {
      this.storeArray = this.storeArray.concat(input);
    }
  }

  convertArrayForCalculation(): void {
    for (var i = 0; i <= this.storeArray.length; i++) {
      if (this.regexNumDot.test(this.storeArray[i]) === true && this.regexNumDot.test(this.storeArray[i + 1]) === true) {
        this.storeArray[i + 1] = this.storeArray[i] + this.storeArray[i + 1];
        this.storeArray.splice(i, 1);
        this.convertArrayForCalculation();
      }
    }
  }
  Calculation(i: number): void {
    let preOperand = '';
    let afterOperand = '';
    let miniResult = 0;
    preOperand = parseFloat(this.storeArray[i - 1]).toFixed(7);
    afterOperand = parseFloat(this.storeArray[i + 1]).toFixed(7);
    if (this.storeArray[i] === '+') {
      miniResult = this.add(preOperand, afterOperand);
    }
    else if (this.storeArray[i] === '-') {
      miniResult = this.sub(preOperand, afterOperand);
    }
    if (this.storeArray[i] === '*') {
      miniResult = this.mul(preOperand, afterOperand);
    }
    else if (this.storeArray[i] === '/') {
      miniResult = this.div(preOperand, afterOperand);
    }
    this.storeArray.splice(i + 1, 1);
    this.storeArray.splice(i, 1);
    this.storeArray.splice(i - 1, 1, miniResult.toString());
  }

  mul(preOperand: string, afterOperand: string) {
    let mulResult = parseFloat(preOperand) * parseFloat(afterOperand);
    return mulResult;
  }

  add(preOperand: string, afterOperand: string) {
    let addResult = parseFloat(preOperand) + parseFloat(afterOperand);
    return addResult;
  }

  sub(preOperand: string, afterOperand: string) {
    let subResult = parseFloat(preOperand) - parseFloat(afterOperand);
    return subResult;
  }

  div(preOperand: string, afterOperand: string) {
    let divResult = parseFloat(preOperand) / parseFloat(afterOperand);
    return divResult;
  }

  clear(): void {
    this.display = '';
    this.displaySmall = '';
    this.storeArray = [];
    this.finalResult = '';
  }

  delete(): void {
    this.storeArray.splice(-1, 1);
    this.display = this.storeArray.join('');
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  onKey(event: any): void {
    if (event.keyCode === 48 || event.keyCode === 96) {
      this.input('0');
    }
    if (event.keyCode === 49 || event.keyCode === 97) {
      this.input('1');
    }
    if (event.keyCode === 50 || event.keyCode === 98) {
      this.input('2');
    }
    if (event.keyCode === 51 || event.keyCode === 99) {
      this.input('3');
    }
    if (event.keyCode === 52 || event.keyCode === 100) {
      this.input('4');
    }
    if (event.keyCode === 53 || event.keyCode === 101) {
      this.input('5');
    }
    if (event.keyCode === 54 || event.keyCode === 102) {
      this.input('6');
    }
    if (event.keyCode === 55 || event.keyCode === 103) {
      this.input('7');
    }
    if (event.keyCode === 56 || event.keyCode === 104) {
      this.input('8');
    }
    if (event.keyCode === 57 || event.keyCode === 105) {
      this.input('9');
    }
    if (event.keyCode === 190 || event.keyCode === 110) {
      this.input('.');
    }
    if (event.keyCode === 107) {
      this.input('+');
    }
    if (event.keyCode === 109) {
      this.input('-');
    }
    if (event.keyCode === 106) {
      this.input('*');
    }
    if (event.keyCode === 111) {
      this.input('/');
    }
    if (event.keyCode === 13) {
      this.result();
    }
    if (event.keyCode === 8) {
      this.delete();
    }
    if (event.keyCode === 27) {
      this.clear();
    }
  }
}
