var yourPlayer,
	num,
	cell = document.querySelectorAll('.cell'),
	wrapper = document.querySelector('.wrapper'),
	span = document.querySelector('.doc span'),
	blockCombo = [
		//horizontal possibilties
		{ c: [1, 2], b: 0 },
		{ c: [0, 2], b: 1 },
		{ c: [0, 1], b: 2 },
		{ c: [4, 5], b: 3 },
		{ c: [3, 5], b: 4 },
		{ c: [3, 4], b: 5 },
		{ c: [7, 8], b: 6 },
		{ c: [6, 8], b: 7 },
		{ c: [6, 7], b: 8 },
		//vertical possibilities
		{ c: [3, 6], b: 0 },
		{ c: [4, 7], b: 1 },
		{ c: [5, 8], b: 2 },
		{ c: [0, 6], b: 3 },
		{ c: [1, 7], b: 4 },
		{ c: [2, 8], b: 5 },
		{ c: [0, 3], b: 6 },
		{ c: [1, 5], b: 7 },
		{ c: [2, 5], b: 8 },
		//cross possibilities
		{ c: [4, 8], b: 0 },
		{ c: [4, 6], b: 2 },
		{ c: [0, 8], b: 4 },
		{ c: [2, 6], b: 4 },
		{ c: [2, 4], b: 6 },
		{ c: [0, 4], b: 8 },
	],
	winingCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

/* SECTION ----------- choosing your player ----------- */
function chooseYourPlayer(c) {
	yourPlayer = c
	wrapper.style.display = 'none'
	span.innerHTML = isYou(true)
}

function isYou(boo) {
	if (boo) {
		return yourPlayer
	} else {
		if (yourPlayer == 'x') {
			return 'o'
		} else {
			return 'x'
		}
	}
}

/* SECTION ----- choose continue win, lose or draw ---- */
cell.forEach(cellItem => {
	cellItem.addEventListener('click', handleClick)
})

function handleClick() {
	if (!(this.classList.contains('x') || this.classList.contains('o'))) {
		item = this
		item.disabled = true
		item.innerHTML = isYou(true)
		item.classList.add(isYou(true))
		item.classList.remove('h')
		if (isFinish(isYou(false))) {
			alert(`You lose against ${isYou(false)}`)
			resetCells()
			restart()
		} else if (isFinish(isYou(true))) {
			alert(`You win against ${isYou(false)}`)
			resetCells()
			restart()
		} else if (isDraw()) {
			alert(`It was a draw`)
			resetCells()
			restart()
		} else {
			botTurn()
		}
	}
}

function isDraw() {
	return [...cell].every(item => {
		return item.classList.contains(isYou(true)) || item.classList.contains(isYou(false))
	})
}

function isFinish(player) {
	return winingCombos.some(combo => {
		return combo.every(itemNum => {
			return cell[itemNum].classList.contains(player)
		})
	})
}

/* SECTION -------- restart or reset the match -------- */
function restart() {
	wrapper.style.display = 'grid'
	cell.forEach(c => {
		c.innerHTML = ''
		c.classList.remove('x')
		c.classList.remove('o')
		c.disabled = false
	})
	blockCombo = [
		//horizontal possibilties
		{ c: [1, 2], b: 0 },
		{ c: [0, 2], b: 1 },
		{ c: [0, 1], b: 2 },
		{ c: [4, 5], b: 3 },
		{ c: [3, 5], b: 4 },
		{ c: [3, 4], b: 5 },
		{ c: [7, 8], b: 6 },
		{ c: [6, 8], b: 7 },
		{ c: [6, 7], b: 8 },
		//vertical possibilities
		{ c: [3, 6], b: 0 },
		{ c: [4, 7], b: 1 },
		{ c: [5, 8], b: 2 },
		{ c: [0, 6], b: 3 },
		{ c: [1, 7], b: 4 },
		{ c: [2, 8], b: 5 },
		{ c: [0, 3], b: 6 },
		{ c: [1, 5], b: 7 },
		{ c: [2, 5], b: 8 },
		//cross possibilities
		{ c: [4, 8], b: 0 },
		{ c: [4, 6], b: 2 },
		{ c: [0, 8], b: 4 },
		{ c: [2, 6], b: 4 },
		{ c: [2, 4], b: 6 },
		{ c: [0, 4], b: 8 },
	]
}

function resetCells() {
	cell.forEach(item => {
		item.innerHTML = ''
		item.disabled = false
	})
}

/* SECTION -------------- on hover effect ------------- */
cell.forEach(item => {
	item.addEventListener('mouseenter', () => {
		if (!(item.classList.contains('x') || item.classList.contains('o'))) {
			item.innerHTML = isYou(true)
			item.classList.add('h')
		}
	})
})

cell.forEach(item => {
	item.addEventListener('mouseout', () => {
		if (!(item.classList.contains('x') || item.classList.contains('o'))) {
			item.innerHTML = ''
			item.classList.remove('h')
		}
	})
})

/* SECTION -------------- bot is choosing ------------- */

function botTurn() {
	cell.forEach(item => {
		item.disabled = true
	})
	span.innerHTML = isYou(false)
	setTimeout(() => {
		botChoice()
		cell.forEach(item => {
			item.disabled = false
		})
		span.innerHTML = isYou(true)
	}, 1500)
}

function ChooseRandom() {
	num = Math.floor(Math.random() * 9)
	if (!(cell[num].classList.contains('x') || cell[num].classList.contains('o'))) {
		cell[num].innerHTML = isYou(false)
		cell[num].classList.add(isYou(false))
		blockCombo = blockCombo.filter(item => item.b !== num)
	}
	else {
		ChooseRandom()
	}
}

function botChoice() {
	let ifBlockNeed = blockCombo.find((y) => {
		return cell[y.c[0]].classList.contains(isYou(true)) && cell[y.c[1]].classList.contains(isYou(true))
	})
	let ComboNow = blockCombo.find((y) => {
		return cell[y.c[0]].classList.contains(isYou(false)) && cell[y.c[1]].classList.contains(isYou(false)) && !(cell[y.b].classList.contains(isYou(true)))
	})

	if (ComboNow) {
		cell[ComboNow.b].innerHTML = isYou(false)
		cell[ComboNow.b].classList.add(isYou(false))
		blockCombo = blockCombo.filter(item => item !== ComboNow)
	}
	else if (!(ifBlockNeed)) {
		ChooseRandom()
	}
	else if (ifBlockNeed) {
		cell[ifBlockNeed.b].innerHTML = isYou(false)
		cell[ifBlockNeed.b].classList.add(isYou(false))
		blockCombo = blockCombo.filter(item => item !== ifBlockNeed)
	}
	else {
		ChooseRandom()
	}

	console.log(ifBlockNeed)
	console.log(blockCombo)
	console.log(ComboNow)
}




//ANCHOR: well done, keep working

