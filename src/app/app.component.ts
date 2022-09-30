import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Die Komponente würde man CalculatorComponent nennen (und alle Dateien dazu entsprechend)
  // Außerdem solltest du unbedingt ne Validierung einführen, dass man keinen Quatsch (z.B. 1 + + 1) eingeben kann.
  // Interessant wäre es auch Mal eine andere Implementierung dagegenzuhalten, jetzt wo du fertig bist (z.B. https://www.tektutorialshub.com/angular/angular-calculator-application/ oder https://www.techiediaries.com/angular/angular-9-tutorial-and-example/ oder https://stackblitz.com/edit/ng-calculator oder https://stackblitz.com/edit/angular-basic-calculator?file=src%2Fapp%2Fapp.component.ts)


  // Properties immer möglichst selbstsprechend. Was ist z.B. a oder b? Musst auch nicht viel abkürzen dabei. Und immer kleingeschrieben und camelCase.
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

  // Der Name passt nicht gut. Besser du machst einzelne Methoden für die Operationen, z.B. add, multiply, ... Unter der Haube kannst du dann "chache" (oder besser "store") nutzen.
  // Außerdem ist das schwer zu testen mit Unit-Tests, weil die Methode so groß ist und so viele Möglichkeiten hat, durchlaufen zu werden (zyklomatische Komplexität).

  input(input: any) {

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

  // Der Name passt auch nicht gut. Eigentlich machst du hier zwei Dinge: store und calculate

  calculate(): void {
    this.cacheArr = this.cacheArr.concat(this.saveNum);
    this.cache2 = this.cache2 + this.saveNum;
    this.saveNum = '';
    this.displaySmall = this.cache2;
    this.result();
    this.result2();
  }
  // Und das ist calculate
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
  // Warum trennst du result (* und /) und result2 (+ und -)? Wären dann nicht andere Methodennamen besser?
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
  /* Nicht mit Globalen Variablen arbeiten */
  //Wegen Rundung schauen 0,1 + 0,2
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

  clear(): void {
    this.saveNum = '';
    this.display = '';
    this.displaySmall = '';
    this.cache2 = '';
    this.cacheArr = [];
    this.resultDis = '';
  }

  delete(): void {
    this.saveNum = this.saveNum.slice(0, -1);
    this.display = this.saveNum;
  }
  toggleDarkTheme(): void {
    document.body.classList.toggle('dark-theme');
  }
}