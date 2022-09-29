import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Calculator';
  myName = 'Kristian';
  display = '';
  saveNum = '';
  cache2 = '';
  displaySmall = '';
  cacheArr: string[] = [];
  Add: string[] = ["+"];
  Sub: string[] = ["-"];
  Mul: string[] = ["*"];
  Div: string[] = ["/"];
  a = '';
  b = '';
  finalResult = 0;
  resultDis = '';

  cache(input: any) {

    if (input !== '-' && input !== '+' && input !== '/' && input !== '*') {
      this.saveNum = this.saveNum + input;
      this.display = this.saveNum;
      return this.display;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum === '' && this.resultDis === '') {
      this.cacheArr = this.cacheArr.concat('0');
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = input;
      this.displaySmall = this.cache2;
      return this.displaySmall;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.saveNum !== '' && this.resultDis === '') {
      this.cacheArr = this.cacheArr.concat(this.saveNum);
      this.cacheArr = this.cacheArr.concat(input);
      this.saveNum = '';
      this.cache2 = this.cacheArr.join('');
      this.displaySmall = this.cache2
      return this.displaySmall;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.resultDis !== '' && this.saveNum === '') {
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = this.resultDis + input;
      this.displaySmall = this.cache2;
      return this.displaySmall;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.resultDis !== '' && this.saveNum !== '' && (this.cacheArr.slice(-1) === this.Sub || this.cacheArr.slice(-1) === this.Add || this.cacheArr.slice(-1) === this.Div || this.cacheArr.slice(-1) === this.Mul)) {
      this.cacheArr = this.cacheArr.concat(this.saveNum);
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = this.cacheArr.join('');
      this.displaySmall = this.cache2;
      this.saveNum = '';
      return this.displaySmall;
    }
    else if ((input === '-' || input === '+' || input === '/' || input === '*') && this.resultDis !== '' && this.saveNum !== '' && (this.cacheArr.slice(-1) !== this.Sub || this.cacheArr.slice(-1) !== this.Add || this.cacheArr.slice(-1) !== this.Div || this.cacheArr.slice(-1) !== this.Mul)) {
      this.cacheArr = [];
      this.resultDis = '';
      this.cacheArr = this.cacheArr.concat(this.saveNum);
      this.cacheArr = this.cacheArr.concat(input);
      this.cache2 = this.cacheArr.join('');
      this.displaySmall = this.cache2;
      this.saveNum = '';
      return this.displaySmall;
    }

    else {
      return
    }
  }

  StrArr(input: any) {
    this.cacheArr = this.cacheArr.concat(this.saveNum);
    this.cache2 = this.cache2 + this.saveNum;
    this.saveNum = '';
    this.displaySmall = this.cache2;
    this.result();
    this.result2();
    return this.displaySmall;
  }

  result() {
    if (this.cacheArr.length >= 3) {
      for (var i = 0; i < this.cacheArr.length; i++) {
        if (this.cacheArr[i] === '/') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.div('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.result();
        }
        else if (this.cacheArr[i] === '*') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.mul('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.result();
        }
      }
    }
    return this.cacheArr
  }
  result2() {
    if (this.cacheArr.length >= 3) {
      for (var i = 0; i < this.cacheArr.length; i++) {
        if (this.cacheArr[i] === '+') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.add('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.result2();
        }
        else if (this.cacheArr[i] === '-') {
          this.a = parseFloat(this.cacheArr[i - 1]).toFixed(7);
          this.b = parseFloat(this.cacheArr[i + 1]).toFixed(7);
          this.sub('=');
          this.cacheArr.splice(i + 1, 1);
          this.cacheArr.splice(i, 1);
          this.cacheArr.splice(i - 1, 1, this.finalResult.toString());
          this.result2();
        }
      }
    }
    this.resultDis = this.cacheArr.join('');
    this.display = this.resultDis;
    return this.display;
  }

  mul(multsymbol: any) {

    this.finalResult = parseFloat(this.a) * parseFloat(this.b);
    return this.finalResult;
  }
  add(addsymbol: any) {

    this.finalResult = parseFloat(this.a) + parseFloat(this.b);
    return this.finalResult;
  }
  sub(subtsymbol: any) {

    this.finalResult = parseFloat(this.a) - parseFloat(this.b);
    return this.finalResult;
  }
  div(divsymbol: any) {

    this.finalResult = parseFloat(this.a) / parseFloat(this.b);
    return this.finalResult;
  }

  clear(Cbutton: any) {
    this.saveNum = '';
    this.display = '';
    this.displaySmall = '';
    this.cache2 = '';
    this.cacheArr = [];
    this.resultDis = '';
    return this.display;
  }

  delete(DELbutton: any) {
    this.saveNum = this.saveNum.slice(0, -1);
    this.display = this.saveNum;
    return this.saveNum;
  }
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}