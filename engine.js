/**
 * PLAYVERSE ARCADE ENGINE (Gold Build)
 */

let totalStars = parseInt(localStorage.getItem('playverse_stars')) || 0;
let timerInterval;
let timer = 0;

const gamesList = [
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: '❌', cat: 'Logic', desc: 'Outsmart the AI in a battle of X and O.' },
    { id: 'sudoku', name: 'Sudoku Mini', icon: '🔢', cat: 'Logic', desc: 'Fill the 4x4 grid with speed and logic.' },
    { id: 'memory', name: 'Memory Match', icon: '🧠', cat: 'Logic', desc: 'Find the pairs before time runs out.' },
    { id: '2048', name: '2048 Lite', icon: '🔢', cat: 'Logic', desc: 'Slide tiles to reach the magic number.' },
    { id: 'sliding', name: 'Sliding Puzzle', icon: '🧩', cat: 'Logic', desc: 'Reorder blocks to solve the mystery.' },
    { id: 'whack', name: 'Whack-A-Mole', icon: '🔨', cat: 'Skill', desc: 'Test your reflexes on pesky moles.' },
    { id: 'reaction', name: 'Reaction Time', icon: '⚡', cat: 'Skill', desc: 'Click the moment the color changes!' },
    { id: 'aim', name: 'Aim Trainer', icon: '🎯', cat: 'Skill', desc: 'Hit the targets as fast as possible.' },
    { id: 'catchball', name: 'Catch Ball', icon: '🏀', cat: 'Skill', desc: 'Dont let the ball hit the ground.' },
    { id: 'speedclick', name: 'Speed Click', icon: '🖱️', cat: 'Skill', desc: 'How many clicks can you get in 10s?' },
    { id: 'catchemoji', name: 'Catch Emoji', icon: '🎈', cat: 'Skill', desc: 'Grab the stars, avoid the bombs!' },
    { id: 'targetblitz', name: 'Target Blitz', icon: '💥', cat: 'Skill', desc: 'Clear 10 targets in record time.' },
    { id: 'guessnumber', name: 'Guess Number', icon: '❓', cat: 'Casual', desc: 'Can you guess what the computer thinks?' },
    { id: 'rps', name: 'Hand Duel', icon: '✊', cat: 'Casual', desc: 'The classic hand-battle of champions.' },
    { id: 'dice', name: 'Dice Roll', icon: '🎲', cat: 'Casual', desc: 'Roll the bones and test your luck.' },
    { id: 'cointoss', name: 'Coin Toss', icon: '🪙', cat: 'Casual', desc: 'Heads or Tails? 50/50 chance for glory.' },
    { id: 'colorguess', name: 'Color Guess', icon: '🎨', cat: 'Casual', desc: 'Match the master swatch visually.' },
    { id: 'wordscramble', name: 'Word Scramble', icon: '🔡', cat: 'Word', desc: 'Unscramble the letters to find the word.' },
    { id: 'typing', name: 'Typing Test', icon: '⌨️', cat: 'Word', desc: 'Check your WPM and accuracy.' },
    { id: 'quiz', name: 'Quiz Game', icon: '💡', cat: 'Word', desc: 'Test your knowledge on various topics.' },
    { id: 'hangman', name: 'Hangman', icon: '🪑', cat: 'Word', desc: 'Guess the word and save the character.' },
    { id: 'spellcheck', name: 'Spell Check', icon: '📝', cat: 'Word', desc: 'Find the correctly spelled word.' },
    { id: 'typeracer', name: 'Type Racer', icon: '🏎️', cat: 'Word', desc: 'Type fast to beat the racing car!' },
    { id: 'emojimatch', name: 'Emoji Match', icon: '🎮', cat: 'Logic', desc: 'Repeat the emoji sequence correctly.' },
    { id: 'numseq', name: 'Number Seq', icon: '📈', cat: 'Logic', desc: 'Find the next number in the pattern.' }
];

window.onload = () => {
    updateStarDisplay();
    filterGames('All');
    initBalloons();
};

window.filterGames = (category) => {
    const grid = document.getElementById('game-grid');
    grid.innerHTML = '';
    const filtered = category === 'All' ? gamesList : gamesList.filter(g => g.cat === category);
    filtered.forEach((game, i) => {
        grid.innerHTML += `
            <div onclick="launchGame('${game.id}')" class="game-card p-8 group animate-card" style="animation-delay: ${i*0.05}s">
                <div class="text-5xl mb-4 group-hover:scale-110 transition-transform">${game.icon}</div>
                <h3 class="text-xl font-bold mb-1">${game.name}</h3>
                <p class="text-slate-400 text-xs mb-4">${game.desc}</p>
                <div class="text-indigo-400 text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-opacity">Play Now →</div>
            </div>`;
    });
};

function launchGame(gameId) {
    document.getElementById('hub-view').classList.add('hidden');
    document.getElementById('game-viewport').classList.remove('hidden');
    startTimer();
    const container = document.getElementById('active-game-container');
    container.innerHTML = ''; 

    const gameMap = {
        'tictactoe': window.initTicTacToe, 'memory': window.initMemoryMatch, 'whack': window.initWhackAMole,
        'reaction': window.initReaction, 'guessnumber': window.initGuessNumber, 'wordscramble': window.initWordScramble,
        'rps': window.initRPS, 'speedclick': window.initSpeedClick, 'dice': window.initDiceRoll,
        'aim': window.initAimTrainer, 'typing': window.initTypingTest, 'catchball': window.initCatchBall,
        'cointoss': window.initCoinToss, 'sudoku': window.initSudoku, 'quiz': window.initQuiz,
        'hangman': window.initHangman, '2048': window.init2048, 'sliding': window.initSlidingPuzzle,
        'spellcheck': window.initSpellCheck, 'catchemoji': window.initCatchEmoji, 'colorguess': window.initColorGuess,
        'emojimatch': window.initEmojiMatch, 'numseq': window.initNumSeq, 'typeracer': window.initTypeRacer,
        'targetblitz': window.initTargetBlitz
    };

    if (typeof gameMap[gameId] === 'function') gameMap[gameId](container);
    else container.innerHTML = '<h2 class="text-2xl font-black">Coming Soon!</h2>';
}

function updateScore(pts) {
    totalStars += pts;
    localStorage.setItem('playverse_stars', totalStars);
    updateStarDisplay();
}

function updateStarDisplay() {
    document.getElementById('star-count').innerText = totalStars;
}

function startTimer() {
    clearInterval(timerInterval);
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('game-timer').innerText = `⏱ ${timer}s`;
    }, 1000);
}

function closeGame() {
    document.getElementById('hub-view').classList.remove('hidden');
    document.getElementById('game-viewport').classList.add('hidden');
    clearInterval(timerInterval);
}

function resetArcadeData() {
    if(confirm("Wipe Progress?")) { localStorage.clear(); location.reload(); }
}

function initBalloons() {
    const container = document.getElementById('balloons');
    const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#3b82f6'];
    for(let i=0; i<15; i++) {
        const b = document.createElement('div');
        b.className = 'balloon';
        b.style.left = Math.random() * 100 + 'vw';
        b.style.background = colors[Math.floor(Math.random()*4)];
        b.style.animationDelay = Math.random()*8 + 's';
        b.style.width = '30px'; b.style.height = '40px'; b.style.borderRadius = '50%';
        container.appendChild(b);
    }
}