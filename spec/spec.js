const { JSDOM } = require('jsdom')

const jsdom = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>Vivek's Calculator</title>
		<link href="styles.css" rel="stylesheet" />
		<script src="script.js" defer></script>
	</head>
	<body>
		<div class="calculator-grid">
			<div class="output">
				<div data-previous-operand class="previous-operand"></div>
				<div id="data-current-operand" class="current-operand"></div>
			</div>
			<button data-all-clear class="span-two">AC</button>
			<button data-delete>DEL</button>
			<button data-operation="/">÷</button>
			<button data-number="1">1</button>
			<button data-number="2">2</button>
			<button data-number="3">3</button>
			<button data-operation="*">x</button>
			<button data-number="4">4</button>
			<button data-number="5">5</button>
			<button data-number="6">6</button>
			<button data-operation="+">+</button>
			<button data-number="7">7</button>
			<button data-number="8">8</button>
			<button data-number="9">9</button>
			<button data-operation="-">-</button>
			<button data-number=".">.</button>
			<button data-number="0">0</button>
			<button data-equals="=" class="span-two">=</button>
		</div>
	</body>
</html>
`)

global.document = jsdom.window.document
const Calculator = require('../script')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.getElementById('data-current-operand')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

global.btn = (num) => document.querySelector(`[data-number="${num}"]`).getAttribute('data-number')

global.plus = document.querySelector('[data-operation="+"]')
global.minus = document.querySelector('[data-operation="-"]')
global.multiply = document.querySelector('[data-operation="*"]')
global.divide = document.querySelector('[data-operation="/"]')

global.dotBtn = document.querySelector('[data-number="."]')
global.deleteBtn = document.querySelector('[data-delete]')
global.clearBtn = document.querySelector('[data-all-clear]')

global.equalBtn = document.querySelector('[data-equals="="]')

describe('Plus', () => {

	beforeEach(() => {
		calculator.clear()
	})

	// general input
	it('shows “1” in output after clicking on “1”', () => {
		calculator.appendNumber(btn(1))
		calculator.updateDisplay()
		
		expect(document.getElementById('data-current-operand').innerText).toBe('1')
	  })

  it('shows “12” in viewer after clicking on “1 then 2”', () => {

	calculator.appendNumber(btn(1))
	calculator.appendNumber(btn(2))
    calculator.updateDisplay()

    expect(document.getElementById('data-current-operand').innerText).toBe('12')
  })

//   sum test

  it('shows “4” in output after clicking on “1+3=”', () => {
	calculator.appendNumber(btn(1))
	calculator.updateDisplay()
	calculator.chooseOperation("+")
	calculator.updateDisplay()
	calculator.appendNumber(btn(3))
	calculator.updateDisplay()
	calculator.compute()
	calculator.updateDisplay()
	
	expect(document.getElementById('data-current-operand').innerText).toBe('4')
  })

//   subtract
  
  it('shows “9” in output after clicking on “18-9=”', () => {
	calculator.appendNumber(btn(1))
	calculator.appendNumber(btn(8))
	calculator.updateDisplay()
	calculator.chooseOperation("-")
	calculator.updateDisplay()
	calculator.appendNumber(btn(9))
	calculator.updateDisplay()
	calculator.compute()
	calculator.updateDisplay()
	
	expect(document.getElementById('data-current-operand').innerText).toBe('9')
  })

//   multiply

it('shows “27” in output after clicking on “3x9=”', () => {
	calculator.appendNumber(btn(3))
	calculator.updateDisplay()
	calculator.chooseOperation("x")
	calculator.updateDisplay()
	calculator.appendNumber(btn(9))
	calculator.updateDisplay()
	calculator.compute()
	calculator.updateDisplay()
	
	expect(document.getElementById('data-current-operand').innerText).toBe('27')
  })

//   divide

it('shows “70” in output after clicking on “140÷2”', () => {
	calculator.appendNumber(btn(1))
	calculator.appendNumber(btn(4))
	calculator.appendNumber(btn(0))
	calculator.updateDisplay()
	calculator.chooseOperation("÷")
	calculator.updateDisplay()
	calculator.appendNumber(btn(2))
	calculator.updateDisplay()
	calculator.compute()
	calculator.updateDisplay()
	
	expect(document.getElementById('data-current-operand').innerText).toBe('70')
  })

//   decimals

it('shows “15.5” in output after clicking on “62÷4”', () => {
	calculator.appendNumber(btn(6))
	calculator.appendNumber(btn(2))
	calculator.updateDisplay()
	calculator.chooseOperation("÷")
	calculator.updateDisplay()
	calculator.appendNumber(btn(4))
	calculator.updateDisplay()
	calculator.compute()
	calculator.updateDisplay()
	
	expect(document.getElementById('data-current-operand').innerText).toBe('15.5')
  })

})