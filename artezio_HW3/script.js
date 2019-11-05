/* реализация калькулятора с помощью паттерна "модуль" (общая "функция-обёртка" с модулями внутри)
+ использование функции привязки контекста - функция очистки вынесена отдельно
*/

function calculator() {
  let Module = (function() {
    window.a = document.getElementById('first').value;
    window.b = document.getElementById('second').value;
    window.x = window.event.target;
    return {
      setA(number){a = number;},
      setB(number){b = number;}
    }
  })();
  
  Sum = (function(Module) {
    let obj1 = {};
    obj1.add = function(a, b) {
      return a + b;
    };
    return obj1;
  })(Module);
  
  Sub = (function(Module) {
    let obj2 = {};
    obj2.sub = function(a, b) {
      return a - b;
    };
    return obj2;
  })(Module);
  
  Mult = (function(Module) {
    let obj3 = {};
    obj3.mul = function(a, b) {
      return a * b;
    };
    return obj3;
  })(Module);
  
  Div = (function(Module) {
    let obj4 = {};
    obj4.div = function(a, b) {
      return a / b;
    };
    return obj4;
  })(Module);
  
  Mod = (function(Module) {
    let obj5 = {};
    obj5.mod = function(a, b) {
      return a % b;
    };
    return obj5;
  })(Module);
  
  
  Display = (function(Module) {
    let a = Number(window.a);
    let b = Number(window.b);
    
    if (x.id === '+') {
      document.getElementById("res").innerHTML = "Сумма: " + Sum.add(a, b);
      
    } else if (x.id === "-") {
      document.getElementById("res").innerHTML = "Разность: " + Sub.sub(a, b);
      
    } else if (x.id === "*") {
      document.getElementById("res").innerHTML = "Произведение: " + Mult.mul(a, b);

    } else if (x.id === "/") {
      document.getElementById("res").innerHTML = "Частное: " + Div.div(a, b);

    } else if (x.id === "%") {
      document.getElementById("res").innerHTML = "Остаток от деления: " + Mod.mod(a, b);
    }
  })(Module);
  
  let delButton = document.getElementById('C');
  let input1 = document.getElementById('first');
  let input2 = document.getElementById('second');
  let res = document.getElementById('res');
  
  function clear(){
  this.setA('');
  this.setB('');
}

delButton.addEventListener('click', function(){
  let del = clear.bind(Module);
  del();
  input1.value = '';
  input2.value = '';
  res.innerHTML = '';
})
}