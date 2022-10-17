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
  cache = '';
  displaySmall = '';
  storeArray: string[] = [];
  finalResult = '';


  // Außerdem ist das schwer zu testen mit Unit-Tests, weil die Methode so groß ist und so viele Möglichkeiten hat, durchlaufen zu werden (zyklomatische Komplexität).

  input(input: any): void {
    let addSymbol = "+";
    let subSymbol = "-";
    let divSymbol = "/";
    let mulSymbol = "*";
    if (input !== '-' && input !== '+' && input !== '/' && input !== '*') {
      this.saveNum = this.saveNum + input;
      this.display = this.saveNum;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum === '' && this.finalResult === '' && (this.storeArray.slice(-1).toString() !== subSymbol && this.storeArray.slice(-1).toString() !== addSymbol && this.storeArray.slice(-1).toString() !== divSymbol && this.storeArray.slice(-1).toString() !== mulSymbol)) {
      this.storeArray = this.storeArray.concat('0');
      this.storeArray = this.storeArray.concat(input);
      this.cache = input;
      this.displaySmall = this.cache;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum === '' && this.finalResult === '' && (this.storeArray.slice(-1).toString() === subSymbol || this.storeArray.slice(-1).toString() === addSymbol || this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol)) {
      /* this.storeArray = this.storeArray.concat(input); */
      this.validation(input);
      /* this.cache = this.cache + input; */
      this.displaySmall = this.cache;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum !== '' && this.finalResult === '') {
      this.storeArray = this.storeArray.concat(this.saveNum);
      this.storeArray = this.storeArray.concat(input);
      this.saveNum = '';
      this.cache = this.storeArray.join('');
      this.displaySmall = this.cache
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.finalResult !== '' && this.saveNum === '') {
      /* this.storeArray = this.storeArray.concat(input); */
      this.validation(input);
      /* this.cache = this.finalResult + input; */
      this.displaySmall = this.cache;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.finalResult !== '' && this.saveNum !== '' && (this.storeArray.slice(-1).toString() === subSymbol || this.storeArray.slice(-1).toString() === addSymbol || this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol)) {
      this.storeArray = this.storeArray.concat(this.saveNum);
      this.storeArray = this.storeArray.concat(input);
      this.cache = this.storeArray.join('');
      this.displaySmall = this.cache;
      this.saveNum = '';
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.finalResult !== '' && this.saveNum !== '' && (this.storeArray.slice(-1).toString() !== subSymbol || this.storeArray.slice(-1).toString() !== addSymbol || this.storeArray.slice(-1).toString() !== divSymbol || this.storeArray.slice(-1).toString() !== mulSymbol)) {
      this.storeArray = [];
      this.finalResult = '';
      this.storeArray = this.storeArray.concat(this.saveNum);
      this.storeArray = this.storeArray.concat(input);
      this.cache = this.storeArray.join('');
      this.displaySmall = this.cache;
      this.saveNum = '';
    }
  }

  result(): void {
    this.storeArray = this.storeArray.concat(this.saveNum);
    this.cache = this.cache + this.saveNum;
    this.saveNum = '';
    this.displaySmall = this.cache;
    this.checkDoubleOperand();
    this.CalcMulDiv();
    this.CalcAddSub();
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
  //Wegen Rundung schauen 0,1 + 0,2
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
    this.cache = '';
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
        this.cache = this.storeArray.join("");
      }
      if ((this.storeArray.slice(-1).toString() === subSymbol || this.storeArray.slice(-1).toString() === addSymbol || this.storeArray.slice(-1).toString() === divSymbol || this.storeArray.slice(-1).toString() === mulSymbol) && input !== "-") {
        this.storeArray.splice(-1, 1, input);
        this.cache = this.storeArray.join("");
      }
      if (this.storeArray.slice(-1).toString() === "+" && input === "-") {
        this.storeArray.splice(-1, 1, input);
        this.cache = this.storeArray.join("");
      }
    }
    else {
      this.storeArray = this.storeArray.concat(input);
    }
  }

}

