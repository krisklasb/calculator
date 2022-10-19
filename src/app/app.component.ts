import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Calculator';
  display = '';
  saveNum = '';
  displaySmall = '';
  storeArray: string[] = [];
  finalResult = '';
  regex = /\+\-\*\//g;

  input(input: any): void {
    let addSymbol = "+";
    let subSymbol = "-";
    let divSymbol = "/";
    let mulSymbol = "*";
    if (input !== '-' && input !== '+' && input !== '/' && input !== '*') {
      if (this.storeArray.slice(-1).toString() !== addSymbol && this.storeArray.slice(-1).toString() !== subSymbol && this.storeArray.slice(-1).toString() !== mulSymbol && this.storeArray.slice(-1).toString() !== divSymbol && this.finalResult !== '') {
        this.storeArray = [];
        this.displaySmall = "Ans=" + this.finalResult;
        this.finalResult = '';
        this.saveNum = this.saveNum + input;
        this.display = this.storeArray.join("") + this.saveNum.split(",");
      }
      else {
        this.saveNum = this.saveNum + input;
        this.display = this.storeArray.join("") + this.saveNum.split(",");
      }
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum === '' && this.finalResult === '' && (this.storeArray.slice(-1).toString() !== subSymbol && this.storeArray.slice(-1).toString() !== addSymbol && this.storeArray.slice(-1).toString() !== divSymbol && this.storeArray.slice(-1).toString() !== mulSymbol)) {
      this.storeArray = this.storeArray.concat('0');
      this.storeArray = this.storeArray.concat(input);
      this.display = this.storeArray.join("");
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum === '' && this.finalResult === '' && (this.storeArray.slice(-1).toString() === subSymbol || this.storeArray.slice(-1).toString() === addSymbol || this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol)) {
      this.validation(input);
      this.display = this.storeArray.join("");
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum !== '' && this.finalResult === '') {
      this.storeArray = this.storeArray.concat(this.saveNum);
      this.storeArray = this.storeArray.concat(input);
      this.saveNum = '';
      this.display = this.storeArray.join("");
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum === '' && this.finalResult !== '') {
      this.validation(input);
      this.display = this.storeArray.join("");
      this.displaySmall = "Ans=" + this.finalResult;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum !== '' && this.finalResult !== '' && (this.storeArray.slice(-1).toString() === subSymbol || this.storeArray.slice(-1).toString() === addSymbol || this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol)) {
      this.storeArray = this.storeArray.concat(this.saveNum);
      this.storeArray = this.storeArray.concat(input);
      this.saveNum = '';
      this.display = this.storeArray.join("");
      this.displaySmall = "Ans=" + this.finalResult;
    }
  }

  result(): void {
    let addSymbol = "+";
    let subSymbol = "-";
    let divSymbol = "/";
    let mulSymbol = "*";
    this.storeArray = this.storeArray.concat(this.saveNum);
    this.saveNum = '';
    this.displaySmall = this.storeArray.join("");
    if (this.storeArray.slice(-1).toString() === '') {
      this.storeArray.splice(-1, 1);
      this.display = this.storeArray.join("");
      if (this.finalResult === "") {
        this.displaySmall = "Ans=0"
      }
      else if (this.finalResult !== "") {
        this.displaySmall = "Ans=" + this.finalResult;
      }
    }
    else {
      this.checkDoubleOperand();
      this.CalcMulDiv();
      this.CalcAddSub();
    }
  }

  CalcMulDiv(): void {
    let preOperand = '';
    let afterOperand = '';
    let miniResult = 0;
    if (this.storeArray.length >= 3) {
      for (var i = 0; i < this.storeArray.length; i++) {
        if (this.storeArray[i] === '/') {
          preOperand = parseFloat(this.storeArray[i - 1]).toFixed(7);
          afterOperand = parseFloat(this.storeArray[i + 1]).toFixed(7);
          miniResult = this.div(preOperand, afterOperand);
          this.storeArray.splice(i + 1, 1);
          this.storeArray.splice(i, 1);
          this.storeArray.splice(i - 1, 1, miniResult.toString());
          this.CalcMulDiv();
        }
        else if (this.storeArray[i] === '*') {
          preOperand = parseFloat(this.storeArray[i - 1]).toFixed(7);
          afterOperand = parseFloat(this.storeArray[i + 1]).toFixed(7);
          miniResult = this.mul(preOperand, afterOperand);
          this.storeArray.splice(i + 1, 1);
          this.storeArray.splice(i, 1);
          this.storeArray.splice(i - 1, 1, miniResult.toString());
          this.CalcMulDiv();
        }
      }
    }
  }

  CalcAddSub(): void {
    let preOperand = '';
    let afterOperand = '';
    let miniResult = 0;

    if (this.storeArray.length >= 3) {
      for (var i = 0; i < this.storeArray.length; i++) {
        if (this.storeArray[i] === '+') {
          preOperand = parseFloat(this.storeArray[i - 1]).toFixed(7);
          afterOperand = parseFloat(this.storeArray[i + 1]).toFixed(7);
          miniResult = this.add(preOperand, afterOperand);
          this.storeArray.splice(i + 1, 1);
          this.storeArray.splice(i, 1);
          this.storeArray.splice(i - 1, 1, miniResult.toString());
          this.CalcAddSub();
        }
        else if (this.storeArray[i] === '-') {
          preOperand = parseFloat(this.storeArray[i - 1]).toFixed(7);
          afterOperand = parseFloat(this.storeArray[i + 1]).toFixed(7);
          miniResult = this.sub(preOperand, afterOperand);
          this.storeArray.splice(i + 1, 1);
          this.storeArray.splice(i, 1);
          this.storeArray.splice(i - 1, 1, miniResult.toString());
          this.CalcAddSub();
        }
      }
    }
    this.finalResult = this.storeArray.join('');
    this.display = this.finalResult;
  }

  checkDoubleOperand(): void {
    let addSymbol = "+";
    let subSymbol = "-";
    let divSymbol = "/";
    let mulSymbol = "*";
    let cacheArray: string[] = [];
    if (this.storeArray.length >= 4) {
      for (var i = 0; i < this.storeArray.length; i++) {
        if (this.storeArray[i] === addSymbol || this.storeArray[i] === subSymbol || this.storeArray[i] === divSymbol || this.storeArray[i] === mulSymbol) {
          if (this.storeArray[i + 1] === subSymbol) {
            this.storeArray[i + 2] = this.storeArray[i + 1] + this.storeArray[i + 2];
            this.storeArray.splice(i + 1, 1);
          }
        }
      }
    }
  }

  validation(input: string): void {
    let addSymbol = "+";
    let subSymbol = "-";
    let divSymbol = "/";
    let mulSymbol = "*";
    if (this.storeArray.slice(-1).toString() === subSymbol || this.storeArray.slice(-1).toString() === addSymbol || this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol) {
      if ((this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol) && input === "-") {
        this.storeArray = this.storeArray.concat(input);
      }
      if ((this.storeArray.slice(-1).toString() === subSymbol || this.storeArray.slice(-1).toString() === addSymbol || this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol) && input !== "-" && (this.storeArray.slice(-2, -1).toString() !== mulSymbol && this.storeArray.slice(-2, -1).toString() !== divSymbol)) {
        this.storeArray.splice(-1, 1, input);
      }
      if (this.storeArray.slice(-1).toString() === "+" && input === "-") {
        this.storeArray.splice(-1, 1, input);
      }
    }
    else {
      this.storeArray = this.storeArray.concat(input);
    }
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
    this.saveNum = '';
    this.display = '';
    this.displaySmall = '';
    this.storeArray = [];
    this.finalResult = '';
  }

  delete(): void {
    this.saveNum = this.saveNum.slice(0, -1);
    this.display = this.saveNum;
  }

  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }

  onKey(event: any): void {
    if (event.keyCode === 48 || event.keyCode === 96) {
      this.input("0");
    }
    if (event.keyCode === 49 || event.keyCode === 97) {
      this.input("1");
    }
    if (event.keyCode === 50 || event.keyCode === 98) {
      this.input("2");
    }
    if (event.keyCode === 51 || event.keyCode === 99) {
      this.input("3");
    }
    if (event.keyCode === 52 || event.keyCode === 100) {
      this.input("4");
    }
    if (event.keyCode === 53 || event.keyCode === 101) {
      this.input("5");
    }
    if (event.keyCode === 54 || event.keyCode === 102) {
      this.input("6");
    }
    if (event.keyCode === 55 || event.keyCode === 103) {
      this.input("7");
    }
    if (event.keyCode === 56 || event.keyCode === 104) {
      this.input("8");
    }
    if (event.keyCode === 57 || event.keyCode === 105) {
      this.input("9");
    }
    if (event.keyCode === 107) {
      this.input("+");
    }
    if (event.keyCode === 109) {
      this.input("-");
    }
    if (event.keyCode === 106) {
      this.input("*");
    }
    if (event.keyCode === 111) {
      this.input("/");
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

