function Board(width, height) {
            this.width = width;
            this.height = height;
            
            this.squares = [];
            this.clickedSquares = {first: null, second: null};
            this.gameWon = false;
            for (var y = 0; y < this.height; y++) {
                this.squares[y] = [];
                for (var x = 0; x < this.width; x++) {
                    this.squares[y][x] = 0;
                }
            }
            this.populate = function () {
                for (var number = 1; number <= this.width * this.height / 2; number++) {
                    this.placeNumber(number);
                    this.placeNumber(number);
                }
            }
            this.placeNumber = function (number) {
                for (; ;) {
                    var y = Math.floor(Math.random() * this.height);
                    var x = Math.floor(Math.random() * this.width);
                    if (this.squares[y][x] == 0) {
                        this.squares[y][x] = number;
                        return;
                    }
                }
            }
            this.squaresMatch = function (firstSquare, secondSquare) {
                return this.squares[firstSquare.y][firstSquare.x] == this.squares[secondSquare.y][secondSquare.x];
            }
            this.clickedSquare = function (id) {
                var square = new Square(id);
                if (this.sameSquareClicked(square)) {
                    return;
                }
                if (this.bothSquaresFlipped()) {
                    if (this.squaresMatch(this.clickedSquares.first, this.clickedSquares.second)) {
                        this.clickedSquares.first = this.clickedSquares.second = null;
                    } else {
                    this.clickedSquares.first.clear();
                    this.clickedSquares.second.clear();
                    this.clickedSquares.first = this.clickedSquares.second = null;
                    }
                }
                this.flipSquare(square);
            }
            this.flipSquare = function (square) {
                if (this.clickedSquares.first == null) {
                    this.clickedSquares.first = square;
                } else if (this.clickedSquares.first != null && this.clickedSquares.second == null) {
                    this.clickedSquares.second = square;
                }
                square.showContents();
            }
            this.sameSquareClicked = function (otherSquare) {
                return this.clickedSquares.first != null && this.clickedSquares.first.id == otherSquare.id;
            }
            this.bothSquaresFlipped = function () {
                return this.clickedSquares.first != null && this.clickedSquares.second != null;
            }
        }
        function Square(id) {
            this.id = id;
            this.x = parseInt(id.substring(1, 2));
            this.y = parseInt(id.substring(2, 3));
            this.clear = function () {
                document.getElementById(this.id).innerHTML = "<img src=\"back.jpg\"/>";
            }
            this.showContents = function () {
                document.getElementById(this.id).innerHTML = "<img src=\"" + board.squares[this.y][this.x] + ".jpg\"/>";
            }
        }
        function showWinBanner() {
            document.getElementById("overlay").style.visibility = "visible";
        }
        var moves = 0;
        var board = new Board(4, 4, function () {
            document.getElementById("moveCounter").innerHTML = ++moves;
        });