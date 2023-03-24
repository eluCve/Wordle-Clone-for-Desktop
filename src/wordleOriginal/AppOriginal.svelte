<script>
  import BoardOriginal from "./BoardOriginal.svelte";
	import KeyboardOriginal from "./KeyboardOriginal.svelte"
	import GameOverOriginal from './GameOverOriginal.svelte';
  import {wordleBoard, getDailyWordle, wordList, acceptedWordList} from "../store";

  let currentWord = "excel";
	let currentDate = new Date().toLocaleDateString('en-GB');
	let boardPosX = 0;
	let boardPosY = 0;
	let isGamePaused = false;
	let isGameWon = false;
	let gameOverShowMessage = false;
	let noValidWord = false;
	let newWordleAvailable = false;
	let allDatesArray = [];
	let completedWordles = JSON.parse(localStorage.getItem("completedWordles")) || [];
	let failedWordles = JSON.parse(localStorage.getItem("failedWordles")) || [];

  function boardUpdate(update, letter) {
		if (isGamePaused == true) return

		//// Manage insert letter
		if (update == "insert") {
			if (boardPosX == 5) return;
			$wordleBoard[boardPosY][boardPosX] = letter;
			boardPosX = boardPosX + 1;
			
		//// Manage delete
		} else if (update == "delete") {
			if (boardPosX == 0) return;
			boardPosX = boardPosX - 1;
			$wordleBoard[boardPosY][boardPosX] = "";

		//// Manage enter
		}else if (update == "enter") {

			if (boardPosX != 5) return

			let posY = boardPosY;

			let checkWordArr = [];
			$wordleBoard[posY].forEach((char) => {
				checkWordArr.push(char);
			});

			const checkWord = checkWordArr.join('');
			
			if (!(wordList.includes(checkWord) || acceptedWordList.includes(checkWord))) {
				noValidWord = true;
				setTimeout(() => {
        	noValidWord = false
      	}, 2000);
				return
			}
			
			$wordleBoard[posY].forEach((char, index) => {
				if (currentWord[index] == char) {
					document.getElementById(`cell${posY}${index}`).style.backgroundColor = "#538D4E"
					document.getElementById(`${char}`).style.backgroundColor = "#538D4E"
				} else if (currentWord.toLowerCase().includes(char)) {
					document.getElementById(`cell${posY}${index}`).style.backgroundColor = "#B59F3B"
					if (!(document.getElementById(`${char}`).style.backgroundColor == "rgb(83, 141, 78)")) {
						document.getElementById(`${char}`).style.backgroundColor = "#B59F3B"
					}
				} else {
					document.getElementById(`cell${posY}${index}`).style.backgroundColor = "#39393C"
					document.getElementById(`${char}`).style.backgroundColor = "#39393C"
				}
				setTimeout(() => {
        	document.getElementById(`cells${posY}${index}`).style.transform = 'rotateY(180deg)'
     		 }, (200+index*300));
			});

			//// Check if word is found
			if (checkWord == currentWord) {
				gameOverShowMessage = true;
				isGamePaused = true;
				isGameWon = true;
				if (!completedWordles.includes(currentDate)) {
					completedWordles.push(currentDate);
					localStorage.setItem("completedWordles", JSON.stringify(completedWordles));
					let child = document.createElement("p");
					child.innerHTML = " ✔️ ";
					child.style.fontSize = "9px";
					child.style.marginLeft = "3px"
					child.style.padding = "3px 8px"
					child.style.backgroundColor = "rgba(0, 0, 0, 0)";
					document.getElementById(`dateId${currentDate}`).appendChild(child);
				}

				setTimeout(() => {
        gameOverShowMessage = false;
				isGameWon = false;
      }, 6000);

			//// Check if word is not found & zero tries left
			} else if (posY == 5) {
				gameOverShowMessage = true;
				isGamePaused = true;
				isGameWon = false;

				if (!(failedWordles.includes(currentDate)) && !(completedWordles.includes(currentDate))) {
					failedWordles.push(currentDate);
					localStorage.setItem("failedWordles", JSON.stringify(failedWordles));
					let child = document.createElement("p");
					child.innerHTML = " x ";
					child.style.fontSize = "10px";
					child.style.marginLeft = "3px"
					child.style.padding = "3px 8px"
					child.style.backgroundColor = "rgba(0, 0, 0, 0)";
					child.style.color = "red";
					document.getElementById(`dateId${currentDate}`).appendChild(child);
				}
				
				setTimeout(() => {
					gameOverShowMessage = false;
					isGameWon = false;
				}, 6000);

			//// If no word is found and more tries left continue playing to next line
			} else {
				boardPosY = boardPosY + 1;
				boardPosX = 0;
			}
		}
	}

	//// set and clean board for new wordle
	function updateToLatestWordle() {

		if (newWordleAvailable == false) return;

		currentWord = getDailyWordle();
		currentDate = new Date().toLocaleDateString('en-GB');
		
		newWordleAvailable = false;

		gameReset();

		registerAllDates();

		document.getElementById('selected-wordle').innerHTML = `Currently playing: ${new Date().toLocaleDateString('en-GB')}`
		for (let i = 0; i < allDatesArray.length ; i++) {
			let d = new Date(allDatesArray[i]);
			document.getElementById(`dateId${d.toLocaleDateString('en-gb')}`).style.color = "#fff";
		}
		document.getElementById(`dateId${new Date().toLocaleDateString('en-GB')}`).style.color = "#538D4E";
	}

	//// check if wordle is up to date every 30s
	setInterval(() => {
		let checkDailyWordle = getDailyWordle();
		if (checkDailyWordle != currentWord) {
			newWordleAvailable = true;
		}
	}, 1000);

	function gameReset() {
		for (let i = 0; i <= 5; i++) {
			setTimeout(() => {
				for (let j = 0; j <= 4; j++) {
					document.getElementById(`cells${5-i}${j}`).style.transform = 'rotateY(0deg)';
				}
				$wordleBoard[5-i] = (['','','','',''])
			}, 200+i*300);
		}
		let keyboardKeys = document.getElementsByClassName('key')
		for(let i = 0; i < keyboardKeys.length; i++) {
			keyboardKeys[i].style.backgroundColor = "#818283";
		}
		isGamePaused = false;
		boardPosX = 0;
		boardPosY = 0;
	}

	function chooseDate(date) {
		gameReset();
		currentWord = getDailyWordle(date);
		currentDate = date.toLocaleDateString('en-GB');
		document.getElementById('selected-wordle').innerHTML = `Currently playing: <span id="selected-date">${new Date().toLocaleDateString('en-GB')}</span>`
		for (let i = 0; i < allDatesArray.length ; i++) {
			let d = new Date(allDatesArray[i]);
			document.getElementById(`dateId${d.toLocaleDateString('en-gb')}`).style.color = "#fff";
		}
		document.getElementById(`dateId${date.toLocaleDateString('en-GB')}`).style.color = "#538D4E";
	}

	function registerAllDates() {
		const dateStart = new Date(2021, 5, 19, 0, 0, 0, 0);
		const dateEnd = new Date();
		const timeDiff = dateEnd.getTime() - dateStart.getTime();
		const oneDay = 1000*60*60*24;
		const daysDiff = Math.round(timeDiff/oneDay);
		let dateFirst = new Date(2021, 5, 19, 0, 0, 0, 0);
		for (let i = 0; i < daysDiff; i++) {
			allDatesArray[i] = new Date(dateFirst.getTime() + i*oneDay);
		}
		allDatesArray = allDatesArray.reverse();
	};	

	registerAllDates();
</script>


<BoardOriginal />

<KeyboardOriginal {boardUpdate}/>

{#if gameOverShowMessage}
		<GameOverOriginal {isGameWon} {currentWord}/>
{/if}

{#if newWordleAvailable == true}
	<div class="update-btn available" on:click={updateToLatestWordle}>Play Latest</div>
{:else}
	<div class="update-btn not-available">Up To Date</div>
{/if}


<div class="choose-date">
	<p>Previous Wordles</p>
	<div id="all-dates">
			{#each allDatesArray as day}
				<div class="date" id={`dateId${day.toLocaleDateString('en-GB')}`} on:click={() => chooseDate(day)}>
					{day.toLocaleDateString('en-GB')}
					{#if completedWordles.includes(day.toLocaleDateString('en-GB'))}
							<p> ✔️ </p>
						{:else if failedWordles.includes(day.toLocaleDateString('en-GB'))}
							<p style="color: red; font-size: 10px;"> x </p>
					{/if}
				</div>
			{/each}
	</div>
</div>

<div id="selected-wordle">Wordle Selected: <span id="selected-date">{new Date().toLocaleDateString('en-GB')}</span></div>

{#if noValidWord}
    <div class="not-a-word"><p>Not in word list</p></div>
{/if}

<style>
  .not-a-word {
    font-size: 18px;
    color: #121212;
    padding: 20px 25px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 36%;
    top: 15%;
    z-index: 999;
  }

	.update-btn {
		font-size: 16px;
		position: fixed;
		right: 10px;
		top: 80px;
		padding: 8px 14px;
		border-radius: 5px;
	}

	.not-available {
		background-color: #538D4E;
		color: white;
	}

	.available {
		background-color: #B59F3B;
		color: white;
	}
	
	.available:hover {
		filter: brightness(1.2);
		cursor: pointer;
	}

	.choose-date {
		position: fixed;
		left: 10px;
		top: 80px;
	}

	.choose-date:hover {
		cursor: pointer;
	}

	.choose-date p {
		font-size: 16px;
		padding: 8px 14px;
		background-color: #202020;
		border-radius: 5px;
		color: white;
	}

	#all-dates {
		display: none;
		height: 315px;
		overflow: auto;
		margin-top: 10px;
		padding: 15px;
		border-radius: 5px;
		text-align: center;
		background-color: #202020;
	}

	.date {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		font-weight: bold;
		margin: 10px;
		color: white;
	}

	.date p {
		font-size: 9px;
		margin-left: 3px;
		background-color: rgba(0, 0, 0, 0);
	}

	.date:hover {
		cursor: pointer !important;
		color: #B59F3B !important;
	}

	.choose-date:hover #all-dates {
		display: block;
	}

	::-webkit-scrollbar {
  	width: 8px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.2); 
		border-radius: 10px;
	}
	
	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #538D4E; 
		border-radius: 5px;
	}

	#selected-wordle {
		font-size: 14px;
		position: fixed;
		right: 10px;
		top: 50px;
		color: white;
	}

	#selected-date {
		font-weight: bold;
		color: #538D4E;
	}
</style>