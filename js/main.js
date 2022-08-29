//Generate Sudoku
//---------------

//? Functions Of Return A Empty Sudoku And Entry Positions

function EmptySudoku() {
	return [
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '', '']
	]
}

function EmptyPossitions(Sudoku) {
	for (let Row = 0; Row < 9; Row++) {
		for (let Column = 0; Column < 9; Column++) {
			if (Sudoku[Row][Column]=='') {
				return true
			}
		}
	}
	return false
}

//? Functions Of Return Possition

function ReturnQuadrant(Row, Column) {
	if (Row <=2 && Column <=2){return 1;}
	else if (Row <=5 && Column <=2){return 4;}
	else if (Row <=8 && Column <=2){return 7;}
	else if (Row <=2 && Column <=5){return 2;}
	else if (Row <=5 && Column <=5){return 5;}
	else if (Row <=8 && Column <=5){return 8;}
	else if (Row <=2 && Column <=8){return 3;}
	else if (Row <=5 && Column <=8){return 6;}
	else if (Row <=8 && Column <=8){return 9;}
}

function ReturnRows(Quadrant) {
	if (Quadrant==1 || Quadrant==2 || Quadrant==3) {return [0,1,2];}
	else if (Quadrant==4 || Quadrant==5 || Quadrant==6) {return [3,4,5];}
	else if (Quadrant==7 || Quadrant==8 || Quadrant==9) {return [6,7,8];}
}

function ReturnColumns(Quadrant) {
	if (Quadrant==1 || Quadrant==4 || Quadrant==7) {return [0,1,2];}
	else if (Quadrant==2 || Quadrant==5 || Quadrant==8) {return [3,4,5];}
	else if (Quadrant==3 || Quadrant==6 || Quadrant==9) {return [6,7,8];}
}

//? Functions Of Return Possibles Numbers

function ReturnPossibleNumbersQuadrant(Sudoku, Row, Column) {
	let AvailableNumbers = [1,2,3,4,5,6,7,8,9]
	let Quadrant = ReturnQuadrant(Row, Column)
	let Rows = ReturnRows(Quadrant);
	let Columns = ReturnColumns(Quadrant);
	let StudyingValue = Sudoku[Row][Column];
	Sudoku[Row][Column] = 'Studying';

	Rows.forEach(Row => {
		Columns.forEach(Column => {
			if (Sudoku[Row][Column] != 'Studying') {
				let Value = Sudoku[Row][Column]
				if (AvailableNumbers.includes(Value)) {
					let Index = AvailableNumbers.indexOf(Value)
					AvailableNumbers.splice(Index, 1)
				}
			}
		})
	})
	Sudoku[Row][Column]=StudyingValue
	return AvailableNumbers
}

function ReturnPossibleNumbersColumns(Sudoku, x, y) {
	let AvailableNumbers =[1,2,3,4,5,6,7,8,9];
	for (let i = 0; i < 9; i++) {
		if (i != y) {
			let Value=Sudoku[x][i];
			if (AvailableNumbers.includes(Value)) {
				let Index = AvailableNumbers.indexOf(Value);
				AvailableNumbers.splice(Index, 1);
			}
		}
	}
	return AvailableNumbers;
}

function ReturnPossibleNumbersRows(Sudoku, x, y) {
	let AvailableNumbers = [1,2,3,4,5,6,7,8,9];
	for (let i = 0; i < 9; i++) {
		if (i != x) {
			let Value = Sudoku[i][y];
			if (AvailableNumbers.includes(Value)) {
				let Index = AvailableNumbers.indexOf(Value);
				AvailableNumbers.splice(Index, 1);
			}
		}
	}
	return AvailableNumbers;
}

//? Function Of Random Numbers

function ReturnRandomNumbers(List) {
	let LengthNumbers = List.length;
	return List[Math.floor(Math.random()*(LengthNumbers))];
}

//? Function Of Return A List Of Dossition Number

function PossibleNumbers(Sudoku, Row, Column) {
	let ListRow = ReturnPossibleNumbersRows(Sudoku, Row, Column);
	let ListColumn = ReturnPossibleNumbersColumns(Sudoku, Row, Column);
	let ListQuadrant = ReturnPossibleNumbersQuadrant(Sudoku, Row, Column);

	let NumbersNotAdded = [];
	let NumbersPossibleAdd=[];

	ListRow = ReverseList(ListRow);
	ListColumn = ReverseList(ListColumn);
	ListQuadrant = ReverseList(ListQuadrant);

	NumbersNotAdded = NumbersNotAdded.concat(ListRow, ListColumn, ListQuadrant);

	for (let index = 1; index < 10; index++) {
		if (NumbersNotAdded.includes(index)){NumbersPossibleAdd.push(index)}
	}

	let NumbersPossible = ReverseList(NumbersPossibleAdd);
	return NumbersPossible;
}

function ReverseList(NumbersPossibleAdd) {
	let NumbersNotPossibleAdd=[];

	for (let index = 1; index < 10; index++) {
		if (!NumbersPossibleAdd.includes(index)){NumbersNotPossibleAdd.push(index)}
	}
	
	return NumbersNotPossibleAdd;
}

//? Function Of Return A Number In A Possition

function FillQuadrantsPossiblyNumber(Sudoku, Number) {
	for (let Row = 0; Row < 9; Row++) {
		for (let Column = 0; Column < 9; Column++) {
			if (Sudoku[Row][Column] == '') {
				let Possible = PossibleNumbers(Sudoku, Row, Column);
				if (Possible.length == Number) {
					Sudoku[Row][Column]=ReturnRandomNumbers(Possible);
					return true;
				}
			}
		}
	}
	return false;
}

//? Function Of Generate A Sudoku

function GenerateSudoku(Sudoku) {
	let Quadrants159 = [1,5,9];
	let Counter = 0;

	Quadrants159.forEach(Quadrant => {
		let AvailableNumbers = [1,2,3,4,5,6,7,8,9];
		let Rows = ReturnRows(Quadrant);
		let Columns = ReturnColumns(Quadrant);

		Rows.forEach(x => {
			Columns.forEach(y => {
				let RandomNumbers = ReturnRandomNumbers(AvailableNumbers);
				let Index = AvailableNumbers.indexOf(RandomNumbers);

				Sudoku[x][y] = RandomNumbers;
				AvailableNumbers.splice(Index,1);
			});
		});
	});

	while (EmptyPossitions(Sudoku) && Counter <= 200) {
		Counter++;

		while (FillQuadrantsPossiblyNumber(Sudoku, 1)) {Counter++;}
		if (FillQuadrantsPossiblyNumber(Sudoku, 2)) {continue}
		else if (FillQuadrantsPossiblyNumber(Sudoku, 3)) {continue}
		else if (FillQuadrantsPossiblyNumber(Sudoku, 4)) {continue}
		else if (FillQuadrantsPossiblyNumber(Sudoku,5)) {continue}
	}

	if (EmptyPossitions(Sudoku)) {
		return GenerateSudoku(EmptySudoku());
	} else {
		return Sudoku
	}
}

NewSudoku = GenerateSudoku(EmptySudoku());

//Print Sudoku
//------------

//? Function Of Hide Numbers

function HideNumbers(Sudoku, Difficult) {
	let MaxNumbers = 0;
	let HiddenNumbers = 0;
	let Counter = 0

	if (Difficult == 1) {MaxNumbers = 27;}
	else if (Difficult == 2) {MaxNumbers = 36;}
	else if (Difficult == 3) {MaxNumbers = 45;}

	while (MaxNumbers > HiddenNumbers && Counter < 100){
		Counter++;

		let Row = Math.floor(Math.random()*(0,9))
		let Column = Math.floor(Math.random()*(0,9))

		if (Sudoku[Row][Column] != 0) {
			if (PossibleNumbers(Sudoku, Row, Column)) {
				Sudoku[Row][Column] = '' ;
				HiddenNumbers++;
			}
		}
	}
	return Sudoku
}

//? Function For Render Item Of Print Sudoku

function RenderItem({content, row, column}, SudokuGame) {
	const element = document.createElement('span');
	element.textContent = `${content}`;
	element.dataset.row = row;
	element.dataset.column = column;

	if (row==2 && column==2 || row==2 && column==5 || row==5 && column==2 || row==5 && column==5) {element.classList.add('bottom'); element.classList.add('right');}
	else if (row==2 || row==5) {element.classList.add('bottom');}
	else if (column==2 || column==5) {element.classList.add('right');}

	if (FirstHideSudoku[row][column] != '') {
		element.classList.add('background');
	} else {
		element.addEventListener('click', function (event) {
			if (HideSudoku[this.dataset.row][this.dataset.column] === '') {
				HideSudoku[this.dataset.row][this.dataset.column] = ActiveNumbers;
				PrintSudoku(HideSudoku);
			} else if (ActiveNumbers == '') {
				HideSudoku[this.dataset.row][this.dataset.column] = ActiveNumbers;
				PrintSudoku(HideSudoku);
			}
		});
	}
	SudokuGame.append(element);
}

function EmptyQuadarnts() {
	if (!EmptyPossitions(HideSudoku)) {
		let Correct = true;
		for (let x = 0; x < 9; x++) {
			for (let y = 0; y < 9; y++) {
				if (HideSudoku[x][y] != NewSudoku[x][y]) {Correct = false;}
			}
		}

		if (Correct) {alert('Congratulations, you have won');parar();}
		else {alert('I´m sorry, you made a mistake');}
	}
}

//? Function Of Print Sudoku

function PrintSudoku(Sudoku) {
	SudokuGame.innerHTML='';
	Sudoku.forEach((row, indexRow) => {
		row.forEach((column, indexColumn) => {
			RenderItem({
				content: column,
				row: indexRow,
				column: indexColumn
			}, window.SudokuGame);
		});
	});
	EmptyQuadarnts();
}

FirstHideSudoku = HideNumbers(JSON.parse(JSON.stringify(NewSudoku)), 2);
HideSudoku = JSON.parse(JSON.stringify(FirstHideSudoku));

PrintSudoku(HideSudoku);

//Game
//---

const BtnNum = document.getElementsByClassName('BtnNum');

for (let Index = 0; Index < BtnNum.length; Index++) {
	BtnNum[Index].addEventListener('click', function () {
		if (this.dataset.attribute == Index+1) {
			ActiveNumbers = Index+1;
			BtnActive(this);
		}
	});
}

function BtnActive(btn) {
	for (let index = 0; index < BtnNum.length; index++) {
		BtnNum[index].classList.remove('active');
	}

	if (btn.dataset.attribute==10) {
		ActiveNumbers=''
		btn.classList.add('active');
	} else if (btn.dataset.attribute==ActiveNumbers) {
		btn.classList.add('active');
	}
}