// task1
let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
let matrixx = [[1, 2, 3, 4], [4, 5, 6, 8], [7, 8, 9, 3]]; //for test
let matrixxx = [[1, 2], [4, 5], [7, 8]]; //for test

function matrSum(matrix) {
  let sum = 0;
  matrix.forEach(function(matrStr) {
    for(let value of matrStr) {
        sum += value;
    }
});
  return sum;
}

console.log(matrSum(matrix));

// task2
let matrix2 = [[1, 2, 3, 4],
              [5, 6, 7, 8],
              [9, 10, 11, 12]];
let matrixx2 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; //for test
let matrixxx2 = [[1, 2], [4, 5], [7, 8]]; //for test

function matrRotate(matr) {
  let res = [];
  for(let i = 0; i < matr[0].length; i++) {
    res[i] = [];
    for (let j = 0; j < matr.length; j++) {
      res[i][matr.length - j - 1] = matr[j][i];
    }
  }
  return res;
}

let resMatr = matrRotate(matrix2);
console.log(resMatr);


// task3
let string = 'Hello, world';
let stringg = 'Hello, worldd';
let stringgg = 'Hhello, world';
let test = 'ffreerhg';

function uniq(str) {
  let arr = str.split('');
  let filtArr = arr.filter(function(symb, i, array) {
    return !(array.includes(symb, i + 1));
  });
  return filtArr.length;
}

console.log(uniq(string));