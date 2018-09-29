class SmartCalculator {

  constructor(initialValue) {
    this.polishNotation = [];
    this.polishNotation.push(initialValue);  
    this.stack = [];  
  }

  add(number) {
    while (this.stack.length > 0 && (this.stack[this.stack.length-1] == "-" || this.stack[this.stack.length-1] == "/"
     || this.stack[this.stack.length-1] == "^" || this.stack[this.stack.length-1] == "*" 
     || this.stack[this.stack.length-1] == "+"  )) {
      this.polishNotation.push(this.stack.pop());  
    }  
    this.stack.push("+"); 
    this.polishNotation.push(number);
    return this;
  }
  
  subtract(number) {
    while (this.stack.length > 0 && (this.stack[this.stack.length-1] == "-" || this.stack[this.stack.length-1] == "/" 
      || this.stack[this.stack.length-1] == "^" || this.stack[this.stack.length-1] == "*" 
      || this.stack[this.stack.length-1] == "+"  )) {
      this.polishNotation.push(this.stack.pop()); 
    }  
    this.stack.push("-"); 
    this.polishNotation.push(number);
    return this;
  }

  multiply(number) {
    while (this.stack.length > 0 && (this.stack[this.stack.length-1] == "/" || this.stack[this.stack.length-1] == "^" 
      || this.stack[this.stack.length-1] == "*")) {
      this.polishNotation.push(this.stack.pop());
    }
    this.stack.push("*"); 
    this.polishNotation.push(number);
    return this;
  }

  devide(number) {
    while (this.stack.length > 0 && (this.stack[this.stack.length-1] == "*" || this.stack[this.stack.length-1] == "^" 
      || this.stack[this.stack.length-1] == "/")) {
      this.polishNotation.push(this.stack.pop());
    }
    this.stack.push("/"); 
    this.polishNotation.push(number);
    return this;
  }

  pow(number) {
    this.stack.push("^"); 
    this.polishNotation.push(number);
    return this;
  }

  getPolishNotation() {
    while (this.stack.length > 0) {
      this.polishNotation.push(this.stack.pop());
    }
    return this.polishNotation;
  }

  valueOf() {
    this.getPolishNotation();
    return this.calculate();
  }

  calculate() {
    var newStack = [];
    for (var i = 0; i < this.polishNotation.length; i++) {
      var nextFirstValue = this.polishNotation[i];
      if (typeof nextFirstValue == 'number') {
        newStack.push(nextFirstValue);
      } 
      else {
        var lastNumber = newStack.pop();
        var prevLastNumber = newStack.pop();
            switch (nextFirstValue) {
              case '+':
                newStack.push(prevLastNumber + lastNumber);
                break;
              case '-':
                newStack.push(prevLastNumber - lastNumber);
                break;
              case '*':
                newStack.push(prevLastNumber * lastNumber);
                break;
              case '/':
                newStack.push(prevLastNumber / lastNumber);
                break;
              case '^':
                newStack.push(Math.pow(prevLastNumber, lastNumber));
                break;  
              default:
                break;
            }
      }
    }
    return newStack.pop();
  }
}

module.exports = SmartCalculator;
