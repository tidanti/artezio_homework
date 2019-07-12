function buttonClick(){
  var x1 = parseInt(document.getElementById('x1').value);
  var x2 = parseInt(document.getElementById('x2').value);
  
  if(document.getElementById('x1').value == '' || document.getElementById('x2').value == ''){
    alert("Поля обязательны к заполнению!");
  } else if(Number.isNaN(x1) || Number.isNaN(x2)){
    alert("x1 и x2 должны быть числами!");
    
  } else {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML=""; //очистка ввода
  }
  
  var choice = document.getElementsByName('op');
  if (choice[0].checked) {
    var sum = 0;
    if (x1 < x2){
      for(var i=x1; i<=x2; i++){
        sum += i;
      }
      resultDiv.append("Sum: " + sum);
    } else if (x1 > x2) {
      for(var i=x1; i>=x2; i--){
        sum += i;
      }
      resultDiv.append("Sum: " + sum);
    } else {
      resultDiv.append("x1 + x2 = " + (x1 + x2));
    }
  } else if (choice[1].checked) {
    var res = 1;
    if (x1 < x2){
      for(var i=x1; i<=x2; i++){
        res *= i;
      }
      resultDiv.append("Результат умножения: " + res);
    } else if (x1 > x2) {
      for(var i=x1; i>=x2; i--){
        res *= i;
      }
      resultDiv.append("Результат умножения: " + res);
    } else {
      resultDiv.append("x1 * x2 = " + (x1 * x2));
    }
  } else {
    var resArr = [];
    if (x1 < x2){
      for(var i=x1; i<=x2; i++){
        if (checkSimple(i))
          resArr.push(i);
      }
      resultDiv.append("Список простых чисел: " + resArr);
    } else if (x1 > x2) {
      for(var i=x1; i>=x2; i--){
        if (checkSimple(i))
          resArr.push(i);
      }
      resultDiv.append("Список простых чисел: " + resArr);
    } else {
      if (checkSimple(x1))
        resultDiv.append(x1 + " - простое число!");
      else
        resultDiv.append(x1 + " - не простое число!");
    }
  }
}


function buttonClear(){
  document.getElementById('x1').value = '';
  document.getElementById('x2').value = '';
}

function checkSimple(num) {
  for (var i = 2; i < num; i++)
    if (num % i == 0)
      return false;
  return true;
}