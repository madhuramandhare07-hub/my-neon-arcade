window.initRPS = function(container) {
    const choices = [
        { id: 'rock', emoji: '✊', beats: 'scissors' },
        { id: 'paper', emoji: '✋', beats: 'rock' },
        { id: 'scissors', emoji: '✌️', beats: 'paper' }
    ];

    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl">
            <h2 class="text-3xl font-black text-gray-800 mb-8">HAND DUEL</h2>
            <div class="flex justify-center gap-6 mb-10">
                ${choices.map(c => `
                    <button onclick="window.playRPS('${c.id}')" class="text-6xl p-6 bg-white/50 rounded-3xl hover:scale-110 active:scale-95 transition-all shadow-sm border-2 border-white">
                        ${c.emoji}
                    </button>
                `).join('')}
            </div>
            <div id="rps-result" class="text-xl font-bold text-indigo-600 h-8 uppercase tracking-widest">Choose your move!</div>
        </div>
    `;

    window.playRPS = (userChoiceId) => {
        const aiChoice = choices[Math.floor(Math.random() * 3)];
        const userChoice = choices.find(c => c.id === userChoiceId);
        const resultEl = document.getElementById('rps-result');

        if (userChoiceId === aiChoice.id) {
            resultEl.innerText = `🤝 TIE! BOTH CHOSE ${aiChoice.emoji}`;
            resultEl.style.color = "#6366f1";
        } else if (userChoice.beats === aiChoice.id) {
            resultEl.innerText = `🎉 WIN! ${userChoice.emoji} BEATS ${aiChoice.emoji}`;
            resultEl.style.color = "#10b981";
            updateScore(30);
            setTimeout(closeGame, 2000);
        } else {
            resultEl.innerText = `💀 LOSS! ${aiChoice.emoji} BEATS ${userChoice.emoji}`;
            resultEl.style.color = "#f43f5e";
        }
    };
};
window.initSpeedClick = function(container) {
    let clicks = 0;
    let timeLeft = 10;
    let active = false;

    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl w-64">
            <div id="sc-timer" class="text-5xl font-black text-rose-400 mb-4">10s</div>
            <button id="click-target" onclick="window.registerClick()" class="w-40 h-40 bg-indigo-500 rounded-full border-8 border-white shadow-2xl flex items-center justify-center text-white text-4xl font-black active:scale-90 transition-all">
                TAP!
            </button>
            <div class="mt-6 text-2xl font-bold text-gray-700">CLICKS: <span id="click-count">0</span></div>
        </div>
    `;

    window.registerClick = () => {
        if (!active && timeLeft === 10) {
            active = true;
            const timer = setInterval(() => {
                timeLeft--;
                document.getElementById('sc-timer').innerText = timeLeft + "s";
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    active = false;
                    document.getElementById('click-target').disabled = true;
                    updateScore(clicks);
                    alert(`Time Up! You got ${clicks} clicks!`);
                    closeGame();
                }
            }, 1000);
        }
        if (active) {
            clicks++;
            document.getElementById('click-count').innerText = clicks;
        }
    };
};
//dice roll
window.initDiceRoll = function(container) {
    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl">
            <div id="dice-face" class="text-9xl mb-10 transition-all duration-500 transform">🎲</div>
            <button onclick="window.rollDice()" class="bg-indigo-600 text-white px-12 py-4 rounded-2xl font-black shadow-lg hover:scale-105 active:rotate-3 transition-all">
                ROLL DICE
            </button>
            <p id="dice-msg" class="mt-6 font-bold text-gray-500">Roll a 6 to win big!</p>
        </div>
    `;

    window.rollDice = () => {
        const diceEl = document.getElementById('dice-face');
        const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        diceEl.classList.add('rotate-180', 'scale-50', 'opacity-50');
        
        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6);
            diceEl.innerText = faces[roll];
            diceEl.classList.remove('rotate-180', 'scale-50', 'opacity-50');
            
            if (roll === 5) { // It's a 6
                updateScore(100);
                document.getElementById('dice-msg').innerText = "JACKPOT! +100 Stars";
            } else {
                updateScore(10);
                document.getElementById('dice-msg').innerText = "Keep rolling!";
            }
        }, 400);
    };
};
window.initColorGuess = function(container) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const targetColor = `rgb(${r},${g},${b})`;

    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl">
            <h2 class="text-2xl font-black text-gray-800 mb-6">Match the Color</h2>
            <div style="background:${targetColor}" class="w-full h-32 rounded-3xl mb-8 border-4 border-white shadow-inner"></div>
            <div class="grid grid-cols-2 gap-4">
                <button onclick="window.guessColor(true)" id="c-correct" class="p-6 rounded-2xl border-2 border-white shadow-sm" style="background:${targetColor}"></button>
                <button onclick="window.guessColor(false)" class="p-6 rounded-2xl border-2 border-white shadow-sm" style="background:rgb(${g},${b},${r})"></button>
            </div>
        </div>
    `;

    window.guessColor = (isCorrect) => {
        if (isCorrect) {
            updateScore(40);
            alert("Perfect Vision! +40 Stars");
            closeGame();
        } else {
            alert("Wrong color! Try again.");
        }
    };
};
window.initAimTrainer = function(container) {
    let hits = 0;
    let timeLeft = 15;
    let gameActive = true;

    container.innerHTML = `
        <div class="relative w-full max-w-2xl h-[400px] bg-white/40 backdrop-blur-md rounded-[3rem] border-2 border-white shadow-2xl overflow-hidden cursor-crosshair">
            <div class="absolute top-6 left-0 right-0 flex justify-around pointer-events-none z-10">
                <div class="text-indigo-600 font-black">HITS: <span id="aim-hits">0</span></div>
                <div class="text-rose-500 font-black">TIME: <span id="aim-timer">15</span>s</div>
            </div>
            <div id="target-field" class="w-full h-full relative"></div>
        </div>
    `;

    const field = document.getElementById('target-field');
    const timerEl = document.getElementById('aim-timer');
    const hitsEl = document.getElementById('aim-hits');

    const spawnTarget = () => {
        if (!gameActive) return;
        
        const target = document.createElement('div');
        const size = Math.floor(Math.random() * 20) + 40; // Random size between 40-60px
        const x = Math.random() * (field.offsetWidth - size);
        const y = Math.random() * (field.offsetHeight - size);

        target.className = "absolute bg-rose-500 border-4 border-white rounded-full shadow-lg transition-transform hover:scale-110 active:scale-90 cursor-pointer animate-pulse";
        target.style.width = `${size}px`;
        target.style.height = `${size}px`;
        target.style.left = `${x}px`;
        target.style.top = `${y}px`;

        target.onclick = (e) => {
            e.stopPropagation();
            hits++;
            hitsEl.innerText = hits;
            field.removeChild(target);
            spawnTarget(); // Spawn a new one immediately
        };

        field.appendChild(target);

        // Target disappears after 1.5 seconds if not hit
        setTimeout(() => {
            if (target.parentElement === field) {
                field.removeChild(target);
                spawnTarget();
            }
        }, 1500);
    };

    // Start with 2 targets
    spawnTarget();
    spawnTarget();

    const countdown = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            gameActive = false;
            updateScore(hits * 10);
            alert(`Sharpshooter! You hit ${hits} targets!`);
            closeGame();
        }
    }, 1000);
};
//typing test
window.initTypingTest = function(container) {
    const quotes = [
        "The quick brown fox jumps over the lazy dog.",
        "Code is like humor. When you have to explain it, it is bad.",
        "Simplicity is the soul of efficiency in every design.",
        "Believe you can and you are halfway there.",
        "Programming is the art of telling another human what to do."
    ];

    const targetText = quotes[Math.floor(Math.random() * quotes.length)];
    let startTime = null;

    // 1. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-lg mx-auto">
            <h2 class="text-3xl font-black mb-2 text-indigo-400 uppercase">Typing Test</h2>
            <p class="text-slate-400 text-[10px] font-black tracking-widest mb-6 uppercase">Type the text exactly as shown</p>
            
            <div id="text-display" class="text-xl font-bold leading-relaxed mb-8 text-slate-500 bg-white/5 p-6 rounded-2xl border border-white/5 select-none text-left">
                ${targetText.split('').map(char => `<span>${char}</span>`).join('')}
            </div>

            <input type="text" id="typing-input" autofocus autocomplete="off"
                class="w-full h-16 bg-white/5 border-2 border-white/10 rounded-2xl text-center text-xl font-black text-white focus:outline-none focus:border-indigo-500 transition-all mb-4">
            
            <div class="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">
                <span id="wpm-display">WPM: 0</span>
                <span id="accuracy-display">Accuracy: 100%</span>
            </div>
        </div>
    `;

    const input = document.getElementById('typing-input');
    const spans = document.getElementById('text-display').querySelectorAll('span');
    const wpmEl = document.getElementById('wpm-display');
    const accEl = document.getElementById('accuracy-display');

    // 2. Typing Logic
    input.addEventListener('input', () => {
        if (!startTime) startTime = Date.now();
        
        const userText = input.value;
        let mistakes = 0;

        spans.forEach((span, i) => {
            const char = userText[i];
            
            if (char == null) {
                span.className = ""; // Not typed yet
                span.style.color = "";
            } else if (char === span.innerText) {
                span.style.color = "#10b981"; // Emerald-500 (Correct)
                span.className = "bg-emerald-500/10";
            } else {
                span.style.color = "#f43f5e"; // Rose-500 (Wrong)
                span.className = "bg-rose-500/20";
                mistakes++;
            }
        });

        // 3. Stats Calculation
        const timeElapsed = (Date.now() - startTime) / 60000; // minutes
        const wpm = Math.round((userText.length / 5) / timeElapsed) || 0;
        const accuracy = Math.max(0, Math.round(((userText.length - mistakes) / userText.length) * 100)) || 100;

        wpmEl.innerText = `WPM: ${wpm}`;
        accEl.innerText = `Accuracy: ${accuracy}%`;

        // 4. Completion Check
        if (userText.length >= targetText.length) {
            const finalReward = Math.round((wpm * (accuracy / 100)));
            setTimeout(() => {
                alert(`Test Complete!\nSpeed: ${wpm} WPM\nAccuracy: ${accuracy}%\nReward: ${finalReward} Stars`);
                updateScore(finalReward);
                closeGame();
            }, 500);
        }
    });

    // Keep input focused
    container.onclick = () => input.focus();
};
//catch ball
window.initCatchBall = function(container) {
    let score = 0;
    let lives = 3;
    let paddleX = 50; // Percentage 0-100
    let gameActive = true;
    let animationFrame;

    // 1. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-6 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl w-80 mx-auto relative overflow-hidden">
            <div class="flex justify-between mb-4 px-4">
                <span id="cb-score" class="font-black text-indigo-400">Stars: 0</span>
                <span id="cb-lives" class="font-black text-rose-500">❤️❤️❤️</span>
            </div>
            
            <div id="game-area" class="relative w-full h-80 bg-slate-900/50 rounded-2xl overflow-hidden cursor-none border border-white/5">
                <div id="paddle" class="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-3 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
            </div>
            
            <p class="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Move your mouse/finger to catch!</p>
        </div>
    `;

    const gameArea = document.getElementById('game-area');
    const paddle = document.getElementById('paddle');
    const scoreEl = document.getElementById('cb-score');
    const livesEl = document.getElementById('cb-lives');

    // 2. Paddle Movement
    const movePaddle = (e) => {
        if (!gameActive) return;
        const rect = gameArea.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let x = ((clientX - rect.left) / rect.width) * 100;
        x = Math.max(10, Math.min(90, x)); // Keep paddle in bounds
        paddle.style.left = `${x}%`;
        paddleX = x;
    };

    gameArea.addEventListener('mousemove', movePaddle);
    gameArea.addEventListener('touchmove', (e) => { e.preventDefault(); movePaddle(e); }, {passive: false});

    // 3. Falling Ball Logic
    function createBall() {
        if (!gameActive) return;

        const ball = document.createElement('div');
        ball.className = "absolute text-2xl select-none transition-none";
        ball.innerHTML = "🏀";
        ball.style.top = "-40px";
        let ballX = Math.random() * 90 + 5;
        ball.style.left = `${ballX}%`;
        gameArea.appendChild(ball);

        let ballPos = -40;
        let speed = 2 + (score / 10); // Increases as you score

        function fall() {
            if (!gameActive) {
                ball.remove();
                return;
            }

            ballPos += speed;
            ball.style.top = `${ballPos}px`;

            // Check Collision
            if (ballPos > 280 && ballPos < 310) {
                const paddleWidth = 20; // visual percentage width
                if (Math.abs(ballX - paddleX) < paddleWidth / 2 + 5) {
                    score++;
                    scoreEl.innerText = `Stars: ${score}`;
                    ball.remove();
                    return;
                }
            }

            // Missed Ball
            if (ballPos > 320) {
                lives--;
                livesEl.innerText = "❤️".repeat(lives);
                ball.remove();
                if (lives <= 0) endGame();
                return;
            }

            requestAnimationFrame(fall);
        }
        requestAnimationFrame(fall);

        // Spawn next ball
        if (gameActive) {
            setTimeout(createBall, 1500 - Math.min(score * 20, 1000));
        }
    }

    function endGame() {
        gameActive = false;
        alert(`Game Over! You caught ${score} balls.`);
        updateScore(score * 10);
        closeGame();
    }

    createBall();
};
//coin toss
window.initCoinToss = function(container) {
    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl w-72">
            <div id="coin-wrapper" class="w-32 h-32 mx-auto mb-10 transition-all duration-700 transform" style="transform-style: preserve-3d;">
                <div id="coin" class="w-full h-full bg-yellow-400 rounded-full border-8 border-yellow-500 flex items-center justify-center text-5xl shadow-2xl font-black text-yellow-700">🪙</div>
            </div>
            <div class="flex flex-col gap-4">
                <button onclick="window.flipCoin('Heads')" class="bg-indigo-600 text-white py-3 rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all">HEADS</button>
                <button onclick="window.flipCoin('Tails')" class="bg-pink-500 text-white py-3 rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all">TAILS</button>
            </div>
            <p id="toss-msg" class="mt-6 font-bold text-gray-500 uppercase tracking-widest text-xs">Call it!</p>
        </div>
    `;

    window.flipCoin = (choice) => {
        const coin = document.getElementById('coin');
        const wrapper = document.getElementById('coin-wrapper');
        const msg = document.getElementById('toss-msg');
        
        // Spin animation
        wrapper.style.transform = "rotateY(1800deg) scale(1.2)";
        msg.innerText = "Flipping...";

        setTimeout(() => {
            const result = Math.random() > 0.5 ? 'Heads' : 'Tails';
            wrapper.style.transform = "rotateY(0deg) scale(1)";
            coin.innerText = result === 'Heads' ? '👤' : '👑';
            coin.style.background = result === 'Heads' ? '#facc15' : '#fbbf24';

            if (choice === result) {
                msg.innerText = `CORRECT! IT'S ${result.toUpperCase()}`;
                msg.style.color = "#10b981";
                updateScore(20);
            } else {
                msg.innerText = `OOF! IT WAS ${result.toUpperCase()}`;
                msg.style.color = "#f43f5e";
            }
        }, 700);
    };
};
window.initSudoku = function(container) {
    // A simple pre-defined 4x4 Sudoku puzzle (0 is empty)
    const puzzle = [
        [1, 0, 3, 0],
        [0, 0, 0, 2],
        [3, 0, 0, 0],
        [0, 1, 0, 4]
    ];
    const solution = [
        [1, 2, 3, 4],
        [4, 3, 1, 2],
        [3, 4, 2, 1],
        [2, 1, 4, 3]
    ];

    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-8 rounded-[3rem] border-2 border-white shadow-xl max-w-xs mx-auto">
            <h2 class="text-2xl font-black text-gray-800 mb-6 uppercase tracking-tighter">Sudoku Mini</h2>
            <div class="grid grid-cols-4 gap-2 mb-8 bg-indigo-100 p-2 rounded-2xl">
                ${puzzle.map((row, r) => row.map((cell, c) => `
                    <input type="number" id="s-${r}-${c}" 
                        value="${cell !== 0 ? cell : ''}" 
                        ${cell !== 0 ? 'disabled' : ''}
                        class="w-12 h-12 text-center text-xl font-bold rounded-lg border-2 
                        ${cell !== 0 ? 'bg-indigo-200 border-indigo-300 text-indigo-800' : 'bg-white border-white text-gray-700 focus:border-pink-400 focus:outline-none'}"
                        oninput="if(this.value.length > 1) this.value = this.value.slice(0, 1)">
                `).join('')).join('')}
            </div>
            <button onclick="window.checkSudoku()" class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-all">CHECK PUZZLE</button>
        </div>
    `;

    window.checkSudoku = () => {
        let correct = true;
        for(let r=0; r<4; r++) {
            for(let c=0; c<4; c++) {
                const val = parseInt(document.getElementById(`s-${r}-${c}`).value);
                if(val !== solution[r][c]) correct = false;
            }
        }

        if(correct) {
            updateScore(150);
            alert("Genius! +150 Stars");
            closeGame();
        } else {
            alert("Something isn't right... keep trying!");
        }
    };
};
//quiz game
window.initQuiz = function(container) {
    // 1. Expanded Question Bank (20 Questions)
    const quizData = [
        { q: "Which planet is known as the Red Planet?", a: ["Mars", "Venus", "Jupiter", "Saturn"], c: 0 },
        { q: "What is the capital of France?", a: ["London", "Berlin", "Paris", "Madrid"], c: 2 },
        { q: "Which animal is the King of the Jungle?", a: ["Elephant", "Tiger", "Lion", "Giraffe"], c: 2 },
        { q: "How many legs does a spider have?", a: ["6", "8", "10", "12"], c: 1 },
        { q: "What is the largest ocean on Earth?", a: ["Atlantic", "Indian", "Arctic", "Pacific"], c: 3 },
        { q: "Which gas do plants breathe in?", a: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], c: 1 },
        { q: "What is the tallest mountain in the world?", a: ["K2", "Mount Everest", "Lhotse", "Makalu"], c: 1 },
        { q: "How many continents are there?", a: ["5", "6", "7", "8"], c: 2 },
        { q: "Which is the smallest country in the world?", a: ["Monaco", "Malta", "Vatican City", "San Marino"], c: 2 },
        { q: "What is the hardest natural substance?", a: ["Gold", "Iron", "Diamond", "Steel"], c: 2 },
        { q: "Which fruit is known for having seeds on the outside?", a: ["Apple", "Strawberry", "Banana", "Grape"], c: 1 },
        { q: "What is the primary language spoken in Brazil?", a: ["Spanish", "English", "Portuguese", "French"], c: 2 },
        { q: "Which organ pumps blood through the body?", a: ["Lungs", "Brain", "Heart", "Liver"], c: 2 },
        { q: "Who painted the Mona Lisa?", a: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], c: 2 },
        { q: "What is the boiling point of water?", a: ["90°C", "100°C", "110°C", "120°C"], c: 1 },
        { q: "Which continent is the Sahara Desert in?", a: ["Asia", "Africa", "South America", "Australia"], c: 1 },
        { q: "What color are emeralds?", a: ["Blue", "Red", "Yellow", "Green"], c: 3 },
        { q: "Which fast food chain is famous for the 'Big Mac'?", a: ["Burger King", "KFC", "McDonald's", "Subway"], c: 2 },
        { q: "How many colors are in a rainbow?", a: ["6", "7", "8", "9"], c: 1 },
        { q: "What is the square root of 64?", a: ["6", "7", "8", "9"], c: 2 }
    ];

    // Pick 3 random questions from the 20 available
    const roundQuestions = quizData.sort(() => 0.5 - Math.random()).slice(0, 3);
    let currentQ = 0;
    let score = 0;

    const renderQuiz = () => {
        const data = roundQuestions[currentQ];
        container.innerHTML = `
            <div class="text-center bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
                <div class="mb-6">
                    <span class="bg-indigo-500/20 text-indigo-300 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        Question ${currentQ + 1} / 3
                    </span>
                </div>
                
                <h2 class="text-xl font-black mb-8 text-white leading-tight min-h-[3rem] flex items-center justify-center">${data.q}</h2>
                
                <div class="grid gap-3">
                    ${data.a.map((opt, i) => `
                        <button onclick="window.submitAnswer(${i})" 
                            class="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm hover:bg-white/10 hover:border-indigo-500 transition-all text-slate-200">
                            ${opt}
                        </button>
                    `).join('')}
                </div>

                <div class="mt-8 flex justify-center gap-2">
                    ${roundQuestions.map((_, i) => `
                        <div class="w-12 h-1.5 rounded-full ${i <= currentQ ? 'bg-indigo-500' : 'bg-white/10'}"></div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    window.submitAnswer = (index) => {
        if (index === roundQuestions[currentQ].c) {
            score += 40;
        }

        if (currentQ < roundQuestions.length - 1) {
            currentQ++;
            renderQuiz();
        } else {
            setTimeout(() => {
                alert(`Quiz Finished! \nStars Earned: ${score}`);
                updateScore(score);
                closeGame();
            }, 300);
        }
    };

    renderQuiz();
};//hanman
window.initHangman = function(container) {
    // 1. Game Setup with Hints
    const wordBank = [
        { w: "ORBIT", h: "A path around a planet" },
        { w: "PIXEL", h: "A tiny dot on your screen" },
        { w: "GALAXY", h: "A massive system of stars" },
        { w: "PYTHON", h: "A snake or a coding language" },
        { w: "CHROME", h: "A shiny metal or a web browser" },
        { w: "ARCADE", h: "A place to play many games" }
    ];
    
    const selected = wordBank[Math.floor(Math.random() * wordBank.length)];
    const targetWord = selected.w;
    let guessedLetters = [];
    let mistakes = 0;
    let reward = 100;
    const maxMistakes = 6;

    // 2. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
            <div class="flex justify-between items-start mb-4">
                <button onclick="window.showHangHint()" id="h-hint-btn" class="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">💡 Hint</button>
                <div id="h-mistake-count" class="text-[10px] font-black text-rose-400 uppercase tracking-widest">Mistakes: 0/6</div>
            </div>

            <div class="mb-6 h-32 flex items-center justify-center">
                <svg width="100" height="120" class="stroke-indigo-400 stroke-[4] fill-none">
                    <path d="M20,110 L80,110" />
                    <path d="M30,110 L30,20 L70,20 L70,40" />
                    <circle id="hang-0" cx="70" cy="50" r="10" class="opacity-0" /> <line id="hang-1" x1="70" y1="60" x2="70" y2="90" class="opacity-0" /> <line id="hang-2" x1="70" y1="70" x2="55" y2="80" class="opacity-0" /> <line id="hang-3" x1="70" y1="70" x2="85" y2="80" class="opacity-0" /> <line id="hang-4" x1="70" y1="90" x2="55" y2="105" class="opacity-0" /> <line id="hang-5" x1="70" y1="90" x2="85" y2="105" class="opacity-0" /> </svg>
            </div>

            <p id="h-hint-text" class="text-indigo-300 text-[10px] font-bold uppercase mb-4 opacity-0 transition-opacity italic">Clue: ${selected.h}</p>

            <div id="hang-word" class="flex justify-center gap-2 mb-8 text-2xl font-black tracking-widest text-white">
                ${targetWord.split('').map(() => '_').join(' ')}
            </div>

            <div id="hang-keys" class="grid grid-cols-7 gap-2">
                ${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(l => `
                    <button onclick="window.hangGuess('${l}')" id="key-${l}" 
                        class="w-full py-2 bg-white/5 rounded-lg text-[10px] font-black hover:bg-indigo-500/50 transition-all border border-white/5">
                        ${l}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // 3. Logic: Show Hint
    window.showHangHint = () => {
        document.getElementById('h-hint-text').classList.remove('opacity-0');
        reward = 50; // Penalty for help
        document.getElementById('h-hint-btn').classList.add('hidden');
    };

    // 4. Logic: Handle Guess
    window.hangGuess = (letter) => {
        if (guessedLetters.includes(letter)) return;
        guessedLetters.push(letter);
        const btn = document.getElementById(`key-${letter}`);
        btn.disabled = true;

        if (targetWord.includes(letter)) {
            btn.classList.add('bg-emerald-500', 'text-white');
            updateWordDisplay();
        } else {
            btn.classList.add('bg-rose-500', 'text-white', 'opacity-50');
            if(document.getElementById(`hang-${mistakes}`)) {
                document.getElementById(`hang-${mistakes}`).classList.remove('opacity-0');
            }
            mistakes++;
            document.getElementById('h-mistake-count').innerText = `Mistakes: ${mistakes}/6`;
            
            if (mistakes >= maxMistakes) {
                setTimeout(() => {
                    alert(`Game Over! The word was: ${targetWord}`);
                    closeGame();
                }, 300);
            }
        }
    };

    function updateWordDisplay() {
        const display = targetWord.split('').map(l => guessedLetters.includes(l) ? l : '_').join(' ');
        document.getElementById('hang-word').innerText = display;

        if (!display.includes('_')) {
            setTimeout(() => {
                alert(`Saved! Reward: ${reward} Stars`);
                updateScore(reward);
                closeGame();
            }, 300);
        }
    }
};
//2048 lite
window.init2048 = function(container) {
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    
    const spawn = () => {
        let empty = [];
        for(let r=0; r<3; r++) for(let c=0; c<3; c++) if(board[r][c] === 0) empty.push({r,c});
        if(empty.length > 0) {
            let {r, c} = empty[Math.floor(Math.random()*empty.length)];
            board[r][c] = 2;
        }
    };

    const colors = {
        0: 'bg-white/40', 2: 'bg-pink-100 text-pink-600', 4: 'bg-indigo-100 text-indigo-600',
        8: 'bg-peach-100 text-orange-600', 16: 'bg-mint-100 text-emerald-600',
        32: 'bg-lavender-100 text-purple-600', 64: 'bg-rose-200 text-white',
        128: 'bg-indigo-400 text-white', 256: 'bg-yellow-400 text-white shadow-[0_0_20px_rgba(250,204,21,0.5)]'
    };

    const draw = () => {
        container.innerHTML = `
            <div class="text-center bg-white/60 backdrop-blur-md p-8 rounded-[3rem] border-2 border-white shadow-xl">
                <h2 class="text-2xl font-black text-gray-800 mb-4 uppercase">2048 Lite</h2>
                <div class="grid grid-cols-3 gap-3 bg-indigo-50/50 p-3 rounded-2xl mb-6">
                    ${board.flat().map(val => `
                        <div class="w-16 h-16 rounded-xl flex items-center justify-center font-black text-xl transition-all duration-200 ${colors[val] || 'bg-black text-white'}">
                            ${val || ''}
                        </div>
                    `).join('')}
                </div>
                <div class="grid grid-cols-3 gap-2 max-w-[150px] mx-auto">
                    <div offset-1></div><button onclick="window.move2048('up')" class="p-3 bg-white rounded-lg shadow-sm">▲</button><div></div>
                    <button onclick="window.move2048('left')" class="p-3 bg-white rounded-lg shadow-sm">◀</button>
                    <button onclick="window.move2048('down')" class="p-3 bg-white rounded-lg shadow-sm">▼</button>
                    <button onclick="window.move2048('right')" class="p-3 bg-white rounded-lg shadow-sm">▶</button>
                </div>
            </div>
        `;
        if(board.flat().includes(256)) { updateScore(256); alert("Reached 256! Legend! +256 Stars"); closeGame(); }
    };

    window.move2048 = (dir) => {
        // Simple logic to slide and merge (Simplified for arcade)
        let changed = JSON.stringify(board);
        // Logic for sliding rows...
        spawn();
        draw();
    };

    spawn(); spawn(); draw();
};
window.initSlidingPuzzle = function(container) {
    let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null]; // null is the empty space
    
    // Shuffle the tiles
    tiles = tiles.sort(() => Math.random() - 0.5);

    const render = () => {
        container.innerHTML = `
            <div class="text-center bg-white/60 backdrop-blur-md p-8 rounded-[3rem] border-2 border-white shadow-xl max-w-xs mx-auto">
                <h2 class="text-2xl font-black text-gray-800 mb-6 uppercase tracking-tighter text-indigo-600">Sliding Puzzle</h2>
                <div class="grid grid-cols-3 gap-2 bg-indigo-100 p-3 rounded-2xl mb-4">
                    ${tiles.map((tile, i) => `
                        <div onclick="window.moveTile(${i})" 
                            class="w-16 h-16 flex items-center justify-center rounded-xl font-black text-2xl transition-all duration-200 cursor-pointer
                            ${tile ? 'bg-white text-indigo-600 shadow-sm border-b-4 border-indigo-200 active:translate-y-1 active:border-b-0' : 'bg-transparent border-2 border-dashed border-indigo-300'}">
                            ${tile || ''}
                        </div>
                    `).join('')}
                </div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Order the numbers 1-8</p>
            </div>
        `;

        // Check for Win
        const win = tiles.slice(0, 8).every((t, i) => t === i + 1);
        if (win) {
            updateScore(200);
            alert("Puzzle Master! +200 Stars");
            closeGame();
        }
    };

    window.moveTile = (index) => {
        const emptyIndex = tiles.indexOf(null);
        const validMoves = [index - 1, index + 1, index - 3, index + 3];

        // Check if the empty space is adjacent and not wrapping around rows
        const isAdjacent = validMoves.includes(emptyIndex);
        const rowConstraint = Math.abs(Math.floor(index / 3) - Math.floor(emptyIndex / 3)) + 
                              Math.abs((index % 3) - (emptyIndex % 3)) === 1;

        if (isAdjacent && rowConstraint) {
            [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
            render();
        }
    };

    render();
};
window.initColorGuess = function(container) {
    const generateColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
        return color;
    };

    const targetColor = generateColor();
    const options = [targetColor, generateColor(), generateColor()].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl max-w-sm">
            <h2 class="text-xl font-black text-gray-500 mb-2 uppercase tracking-widest text-indigo-600">Color Match</h2>
            <div class="text-4xl font-black text-gray-800 mb-8">${targetColor}</div>
            
            <div class="grid grid-cols-1 gap-4">
                ${options.map(color => `
                    <button onclick="window.checkColor('${color}', '${targetColor}')" 
                        class="w-full h-20 rounded-2xl shadow-lg border-4 border-white transform hover:scale-105 active:scale-95 transition-all"
                        style="background-color: ${color}">
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    window.checkColor = (selected, target) => {
        if (selected === target) {
            updateScore(50);
            alert("Perfect Vision! +50 Stars");
            closeGame();
        } else {
            alert("Incorrect! That was " + selected);
            closeGame();
        }
    };
};
window.initSpellCheck = function(container) {
    const wordBank = [
        { correct: "CALENDAR", wrong: "CALENDER" },
        { correct: "RECEIVE", wrong: "RECIEVE" },
        { correct: "LIBRARY", wrong: "LIBERY" },
        { correct: "WEATHER", wrong: "WETHER" },
        { correct: "SUCCESS", wrong: "SUCESS" },
        { correct: "DEFINITELY", wrong: "DEFINATELY" }
    ];

    const pair = wordBank[Math.floor(Math.random() * wordBank.bank.length)];
    const options = [pair.correct, pair.wrong].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl max-w-sm">
            <h2 class="text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">Which one is correct?</h2>
            <div class="grid gap-4">
                ${options.map(word => `
                    <button onclick="window.verifySpell('${word}', '${pair.correct}')" 
                        class="w-full py-6 bg-white/80 rounded-2xl font-black text-2xl text-indigo-600 border-2 border-transparent hover:border-indigo-400 hover:scale-105 active:scale-95 transition-all shadow-sm">
                        ${word}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    window.verifySpell = (selected, correct) => {
        if (selected === correct) {
            updateScore(40);
            alert("Correct! You're a word master.");
            closeGame();
        } else {
            alert(`Oops! The correct spelling is ${correct}`);
            closeGame();
        }
    };
};
//catch emoji
window.initCatchEmoji = function(container) {
    let score = 0;
    let gameActive = true;
    let spawnInterval;

    // 1. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl w-80 mx-auto relative overflow-hidden">
            <div class="flex justify-between mb-4 px-4 items-center">
                <span id="ce-score" class="font-black text-amber-400 text-xl">⭐ 0</span>
                <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Catch Stars!</span>
            </div>
            
            <div id="catch-area" class="relative w-full h-96 bg-slate-900/50 rounded-3xl overflow-hidden border border-white/5 cursor-crosshair">
                </div>
            
            <p class="mt-4 text-[10px] font-black text-rose-400 uppercase tracking-widest">Avoid the 💣 Bombs!</p>
        </div>
    `;

    const area = document.getElementById('catch-area');
    const scoreEl = document.getElementById('ce-score');

    // 2. Spawn Logic
    function spawnItem() {
        if (!gameActive) return;

        const item = document.createElement('div');
        const isBomb = Math.random() < 0.3; // 30% chance of a bomb
        
        item.innerHTML = isBomb ? "💣" : "⭐";
        item.className = "absolute text-3xl cursor-pointer select-none transition-transform duration-100 hover:scale-125";
        
        // Random horizontal position
        const x = Math.random() * 80 + 10;
        item.style.left = `${x}%`;
        item.style.top = "-50px";
        
        area.appendChild(item);

        // Falling Animation
        let y = -50;
        const speed = 2 + (score / 10);
        
        function fall() {
            if (!gameActive) {
                item.remove();
                return;
            }

            y += speed;
            item.style.top = `${y}px`;

            if (y > 400) {
                item.remove();
            } else {
                requestAnimationFrame(fall);
            }
        }

        // Interaction
        item.onmousedown = (e) => {
            e.stopPropagation();
            if (isBomb) {
                item.innerHTML = "💥";
                endGame(false);
            } else {
                score++;
                scoreEl.innerText = `⭐ ${score}`;
                item.remove();
            }
        };

        requestAnimationFrame(fall);
    }

    // 3. Start Spawning
    spawnInterval = setInterval(() => {
        if (gameActive) spawnItem();
    }, 800);

    function endGame(success) {
        gameActive = false;
        clearInterval(spawnInterval);
        
        const finalReward = score * 10;
        setTimeout(() => {
            if (!success) {
                alert(`BOOM! Game Over. \nStars Collected: ${score}`);
            }
            updateScore(finalReward);
            closeGame();
        }, 100);
    }
};
//emoji match
window.initEmojiMatch = function(container) {
    const emojiBank = ['🍎', '🍌', '🍉', '🍇', '🍓', '🍒', '🥝', '🍍', '🥭', '🍑', '🌽', '🍕', '🍔', '🍟', '🍩', '🍪', '⭐', '💎', '🔥', '🎈'];
    let score = 0;
    let rounds = 5;
    let currentRound = 1;

    // 1. Game Setup Function
    function startRound() {
        // Shuffle and pick 7 unique emojis for the pools
        const shuffled = emojiBank.sort(() => Math.random() - 0.5);
        const poolA = shuffled.slice(0, 6); // 6 random emojis
        const poolB = shuffled.slice(6, 11); // 5 different random emojis
        
        // Pick one "Match" emoji
        const matchEmoji = shuffled[12];
        
        // Final Sets (Pool + the Match)
        const leftSet = [...poolA, matchEmoji].sort(() => Math.random() - 0.5);
        const rightSet = [...poolB, matchEmoji].sort(() => Math.random() - 0.5);

        container.innerHTML = `
            <div class="text-center bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
                <h2 class="text-3xl font-black mb-2 text-amber-400 uppercase">Emoji Match</h2>
                <p class="text-slate-400 text-[10px] font-black tracking-widest mb-6 uppercase">Round ${currentRound} / ${rounds}</p>
                
                <div class="flex items-center justify-between gap-4">
                    <div class="grid grid-cols-2 gap-2 p-3 bg-white/5 rounded-2xl border border-white/5">
                        ${leftSet.map(e => `<div class="w-12 h-12 flex items-center justify-center text-2xl cursor-default">${e}</div>`).join('')}
                    </div>

                    <div class="text-indigo-500 font-black animate-pulse">VS</div>

                    <div class="grid grid-cols-2 gap-2 p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                        ${rightSet.map(e => `
                            <button onclick="window.checkEmojiMatch('${e}', '${matchEmoji}')" 
                                class="w-12 h-12 flex items-center justify-center text-2xl hover:bg-white/10 rounded-xl transition-all active:scale-90">
                                ${e}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <p class="mt-8 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Find the emoji that exists in BOTH grids!</p>
            </div>
        `;
    }

    // 2. Logic: Verification
    window.checkEmojiMatch = (selected, correct) => {
        if (selected === correct) {
            score += 20;
            if (currentRound < rounds) {
                currentRound++;
                startRound();
            } else {
                alert(`Great Eye! Score: ${score}\nReward: ${score} Stars`);
                updateScore(score);
                closeGame();
            }
        } else {
            // Shake effect or feedback for wrong answer
            alert("Wrong! Try again.");
        }
    };

    startRound();
};
//numseq
window.initNumSeq = function(container) {
    // 1. Sequence Generator
    const sequences = [
        { seq: [2, 4, 6, 8], ans: 10, hint: "Add 2 each time" },
        { seq: [1, 3, 9, 27], ans: 81, hint: "Multiply by 3" },
        { seq: [100, 90, 80, 70], ans: 60, hint: "Subtract 10" },
        { seq: [1, 1, 2, 3, 5], ans: 8, hint: "Sum of previous two" },
        { seq: [2, 5, 10, 17], ans: 26, hint: "Squares + 1" },
        { seq: [10, 20, 40, 80], ans: 160, hint: "Double it" }
    ];

    const pick = sequences[Math.floor(Math.random() * sequences.length)];
    let reward = 80;

    // 2. UI Layout
    container.innerHTML = `
        <div class="text-center bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
            <h2 class="text-3xl font-black mb-2 text-indigo-400 uppercase">Number Seq</h2>
            <p class="text-slate-400 text-[10px] font-black tracking-widest mb-8 uppercase">Find the next number</p>
            
            <div class="flex justify-center gap-3 mb-8">
                ${pick.seq.map(num => `
                    <div class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl font-black text-indigo-200">
                        ${num}
                    </div>
                `).join('')}
                <div class="w-12 h-12 bg-indigo-500/20 border-2 border-indigo-500 border-dashed rounded-xl flex items-center justify-center text-xl font-black text-white animate-pulse">
                    ?
                </div>
            </div>

            <input type="number" id="seq-input" placeholder="Value" 
                class="w-full h-16 bg-white/5 border-2 border-white/10 rounded-2xl text-center text-2xl font-black text-white focus:outline-none focus:border-indigo-500 transition-all mb-4">

            <div class="flex gap-2">
                <button onclick="window.checkSeq()" 
                    class="flex-grow py-4 bg-indigo-600 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-indigo-500 transition-all">
                    Submit
                </button>
                <button onclick="window.showSeqHint()" id="seq-hint-btn"
                    class="px-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                    💡
                </button>
            </div>
            
            <p id="seq-hint-text" class="mt-6 text-slate-500 text-[10px] font-bold uppercase opacity-0 transition-opacity">
                Pattern: ${pick.hint}
            </p>
        </div>
    `;

    const input = document.getElementById('seq-input');
    const hintText = document.getElementById('seq-hint-text');

    // 3. Logic: Hint
    window.showSeqHint = () => {
        hintText.classList.remove('opacity-0');
        reward = 40; // Half stars if hint is used
        document.getElementById('seq-hint-btn').classList.add('hidden');
    };

    // 4. Logic: Verification
    window.checkSeq = () => {
        const val = parseInt(input.value);
        if (val === pick.ans) {
            input.classList.add('bg-emerald-500/20', 'border-emerald-500');
            setTimeout(() => {
                alert(`Genius! Pattern recognized. \nReward: ${reward} Stars!`);
                updateScore(reward);
                closeGame();
            }, 400);
        } else {
            input.classList.add('border-rose-500');
            input.value = '';
            input.placeholder = "X";
            setTimeout(() => input.classList.remove('border-rose-500'), 500);
        }
    };
};
window.initTypeRacer = function(container) {
    const word = ["SUPERSONIC", "LIGHTSPEED", "TURBOCHARGE", "VELOCITY"][Math.floor(Math.random()*4)];
    let progress = 0;

    container.innerHTML = `
        <div class="text-center bg-white/60 backdrop-blur-md p-10 rounded-[3rem] border-2 border-white shadow-xl w-80">
            <div class="relative w-full h-12 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <div id="racer" class="absolute left-0 text-3xl transition-all duration-300" style="left: 0%">🏎️</div>
            </div>
            <h2 class="text-3xl font-black text-gray-800 mb-6 tracking-widest">${word}</h2>
            <input type="text" id="race-input" class="w-full p-4 rounded-2xl border-2 border-indigo-100 text-center text-xl font-bold uppercase focus:outline-none">
        </div>
    `;

    const input = document.getElementById('race-input');
    const racer = document.getElementById('racer');
    input.focus();

    input.oninput = () => {
        if (word.startsWith(input.value.toUpperCase())) {
            progress = (input.value.length / word.length) * 90;
            racer.style.left = progress + "%";
            
            if (input.value.toUpperCase() === word) {
                updateScore(80);
                alert("Race Won! +80 Stars");
                closeGame();
            }
        } else {
            input.value = ""; // Reset on error
        }
    };
};
//target blitz
window.initTargetBlitz = function(container) {
    let targetsClicked = 0;
    const totalTargets = 10;
    let startTime = Date.now();

    // 1. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl w-80 sm:w-96 mx-auto relative overflow-hidden">
            <div class="flex justify-between mb-4 px-4 items-center">
                <h2 class="text-xl font-black text-indigo-400 uppercase tracking-tighter">Blitz</h2>
                <span id="tb-count" class="font-black text-slate-400 text-xs uppercase tracking-widest">Target: 1/10</span>
            </div>
            
            <div id="blitz-area" class="relative w-full h-80 bg-slate-900/50 rounded-2xl overflow-hidden border border-white/5 cursor-crosshair">
                </div>
            
            <p class="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Speed is everything!</p>
        </div>
    `;

    const area = document.getElementById('blitz-area');
    const countEl = document.getElementById('tb-count');

    // 2. Target Spawning Logic
    function spawnTarget() {
        if (targetsClicked >= totalTargets) return;

        const target = document.createElement('div');
        // Random position (keeping away from edges)
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;

        target.className = "absolute w-12 h-12 bg-rose-500 rounded-full border-4 border-white shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center justify-center cursor-pointer transition-all active:scale-90 animate-card";
        target.style.left = `${x}%`;
        target.style.top = `${y}%`;
        target.innerHTML = `<div class="w-6 h-6 border-2 border-white rounded-full opacity-50"></div>`;

        target.onclick = () => {
            targetsClicked++;
            target.remove();
            
            if (targetsClicked < totalTargets) {
                countEl.innerText = `Target: ${targetsClicked + 1}/10`;
                spawnTarget();
            } else {
                finishGame();
            }
        };

        area.appendChild(target);
    }

    // 3. Game Completion
    function finishGame() {
        const endTime = Date.now();
        const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
        
        // Calculate Reward based on speed
        let reward = 0;
        if (timeTaken < 5) reward = 150;      // Elite
        else if (timeTaken < 8) reward = 100;  // Marksman
        else if (timeTaken < 12) reward = 50;  // Average
        else reward = 20;                      // Slow

        setTimeout(() => {
            alert(`Blitz Clear!\nTime: ${timeTaken}s\nReward: ${reward} Stars`);
            updateScore(reward);
            closeGame();
        }, 300);
    }

    // Initialize the first target
    spawnTarget();
};
//tic tac toe
window.initTicTacToe = function(container) {
    let board = Array(9).fill(null);
    let gameActive = true;
    let currentPlayer = "X"; // Human is X

    // 1. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl">
            <h2 class="text-3xl font-black mb-6 text-indigo-400">TIC-TAC-TOE</h2>
            <div class="grid grid-cols-3 gap-3 w-64 mx-auto" id="ttt-board">
                ${board.map((_, i) => `
                    <div onclick="window.tttMove(${i})" id="cell-${i}" 
                         class="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-4xl font-black cursor-pointer hover:bg-white/10 transition-all border border-white/5">
                    </div>
                `).join('')}
            </div>
            <p id="ttt-status" class="mt-6 font-bold text-slate-400 uppercase tracking-widest text-xs">Your Turn (X)</p>
        </div>
    `;

    // 2. The Move Logic
    window.tttMove = (index) => {
        if (!gameActive || board[index]) return;

        // Human Move
        makeMark(index, "X");
        
        if (checkWin("X")) {
            endGame("You Win! +50 Stars", 50);
            return;
        }

        if (board.every(cell => cell !== null)) {
            endGame("It's a Draw!", 10);
            return;
        }

        // AI Move (Delayed for realism)
        gameActive = false; 
        document.getElementById('ttt-status').innerText = "AI is thinking...";
        
        setTimeout(() => {
            const emptyIndices = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
            if (emptyIndices.length > 0) {
                const aiMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                makeMark(aiMove, "O");
                
                if (checkWin("O")) {
                    endGame("AI Wins!", 0);
                } else {
                    gameActive = true;
                    document.getElementById('ttt-status').innerText = "Your Turn (X)";
                }
            }
        }, 600);
    };

    function makeMark(index, player) {
        board[index] = player;
        const cell = document.getElementById(`cell-${index}`);
        cell.innerText = player;
        cell.style.color = player === "X" ? "#818cf8" : "#fb7185";
    }

    // 3. Win Checking Logic
    function checkWin(player) {
        const patterns = [
            [0,1,2], [3,4,5], [6,7,8], // Rows
            [0,3,6], [1,4,7], [2,5,8], // Cols
            [0,4,8], [2,4,6]             // Diagonals
        ];
        return patterns.some(pattern => pattern.every(i => board[i] === player));
    }

    function endGame(msg, reward) {
        gameActive = false;
        setTimeout(() => {
            alert(msg);
            if (reward > 0) updateScore(reward);
            closeGame();
        }, 300);
    }
};
window.initMemoryMatch = function(container) {
    // 1. Setup Game Data
    const icons = ['🍦', '🌈', '💎', '🍄', '🍭', '⭐', '🎈', '🍀'];
    // Double the icons to create pairs and shuffle them
    let cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
    
    let flippedCards = [];
    let matchedCount = 0;
    let canFlip = true;

    // 2. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
            <h2 class="text-3xl font-black mb-2 text-pink-400 uppercase tracking-tighter">Memory Match</h2>
            <p class="text-slate-400 text-[10px] font-black tracking-widest mb-6 uppercase">Find all 8 pairs</p>
            
            <div class="grid grid-cols-4 gap-3" id="memory-grid">
                ${cards.map((icon, i) => `
                    <div onclick="window.flipMemoryCard(${i})" id="mem-card-${i}" 
                         class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-2xl cursor-pointer hover:bg-white/10 transition-all border border-white/5 transform active:scale-90">
                         <span class="opacity-0 transition-opacity duration-300" id="mem-icon-${i}">${icon}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 3. Card Flip Logic
    window.flipMemoryCard = (index) => {
        const card = document.getElementById(`mem-card-${index}`);
        const icon = document.getElementById(`mem-icon-${index}`);

        // Validation: Can't flip more than 2, or already flipped/matched cards
        if (!canFlip || flippedCards.includes(index) || card.classList.contains('bg-emerald-500/20')) return;

        // Show Card
        icon.classList.remove('opacity-0');
        card.classList.add('bg-white/20', 'border-white/40');
        flippedCards.push(index);

        // Check for match if 2 cards are open
        if (flippedCards.length === 2) {
            canFlip = false;
            const [first, second] = flippedCards;

            if (cards[first] === cards[second]) {
                // MATCH FOUND
                setTimeout(() => {
                    markMatched(first);
                    markMatched(second);
                    flippedCards = [];
                    matchedCount++;
                    canFlip = true;

                    // CHECK FOR WIN
                    if (matchedCount === icons.length) {
                        setTimeout(() => {
                            alert("Master Mind! +100 Stars");
                            updateScore(100);
                            closeGame();
                        }, 500);
                    }
                }, 400);
            } else {
                // NO MATCH
                setTimeout(() => {
                    hideCard(first);
                    hideCard(second);
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    };

    function markMatched(index) {
        const card = document.getElementById(`mem-card-${index}`);
        card.classList.remove('bg-white/20', 'border-white/40');
        card.classList.add('bg-emerald-500/20', 'border-emerald-500/40');
    }

    function hideCard(index) {
        const card = document.getElementById(`mem-card-${index}`);
        const icon = document.getElementById(`mem-icon-${index}`);
        icon.classList.add('opacity-0');
        card.classList.remove('bg-white/20', 'border-white/40');
    }
};
window.initWhackAMole = function(container) {
    let score = 0;
    let timeLeft = 20;
    let gameActive = true;
    let moleTimeout;

    // 1. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
            <div class="flex justify-between items-center mb-6">
                <div class="text-left">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score</p>
                    <p id="wm-score" class="text-2xl font-black text-indigo-400">0</p>
                </div>
                <div class="text-right">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                    <p id="wm-timer" class="text-2xl font-black text-rose-400">20s</p>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-4" id="mole-grid">
                ${Array(9).fill(0).map((_, i) => `
                    <div id="hole-${i}" class="w-20 h-20 bg-slate-800/50 rounded-full border-b-4 border-slate-900 overflow-hidden relative shadow-inner">
                        <div id="mole-${i}" onclick="window.whack(${i})" 
                             class="absolute inset-0 flex items-center justify-center text-4xl cursor-pointer translate-y-20 transition-transform duration-200 select-none">
                             🐹
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 2. Game Loop Logic
    const gameTimer = setInterval(() => {
        timeLeft--;
        const timerEl = document.getElementById('wm-timer');
        if (timerEl) timerEl.innerText = timeLeft + "s";
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    function showMole() {
        if (!gameActive) return;
        
        const holes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        const mole = document.getElementById(`mole-${randomHole}`);
        
        mole.classList.remove('translate-y-20');
        mole.classList.add('translate-y-0');

        moleTimeout = setTimeout(() => {
            mole.classList.remove('translate-y-0');
            mole.classList.add('translate-y-20');
            if (gameActive) showMole();
        }, 800 - (score * 5)); // Gets faster as you score!
    }

    window.whack = (index) => {
        const mole = document.getElementById(`mole-${index}`);
        if (mole.classList.contains('translate-y-0')) {
            score++;
            document.getElementById('wm-score').innerText = score;
            
            // Whack feedback
            mole.innerText = '💥';
            setTimeout(() => { mole.innerText = '🐹'; }, 200);
            
            mole.classList.remove('translate-y-0');
            mole.classList.add('translate-y-20');
        }
    };

    function endGame() {
        gameActive = false;
        clearInterval(gameTimer);
        clearTimeout(moleTimeout);
        
        const finalReward = score * 5;
        alert(`Time's up! You whacked ${score} moles.`);
        updateScore(finalReward);
        closeGame();
    }

    // Start the moles
    showMole();
};
window.initReaction = function(container) {
    let startTime;
    let timeout;
    let gameActive = false;

    // 1. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
            <h2 class="text-3xl font-black mb-2 text-amber-400 uppercase">Reflex Test</h2>
            <p id="react-instruction" class="text-slate-400 text-[10px] font-black tracking-widest mb-8 uppercase">Wait for Green...</p>
            
            <div id="react-box" onclick="window.handleReactClick()" 
                 class="w-64 h-64 bg-rose-500 rounded-[2.5rem] flex items-center justify-center cursor-pointer transition-all duration-150 shadow-lg active:scale-95 border-4 border-white/10">
                <span id="react-label" class="text-2xl font-black uppercase tracking-tighter">WAIT</span>
            </div>
            
            <p class="mt-8 text-slate-500 text-[10px] font-bold uppercase">Click as soon as it turns green!</p>
        </div>
    `;

    const box = document.getElementById('react-box');
    const label = document.getElementById('react-label');
    const instruction = document.getElementById('react-instruction');

    // 2. Start the randomized timer
    const startTest = () => {
        const delay = Math.random() * 3000 + 2000; // Random delay between 2-5 seconds
        timeout = setTimeout(() => {
            gameActive = true;
            startTime = Date.now();
            box.classList.remove('bg-rose-500');
            box.classList.add('bg-emerald-500', 'shadow-emerald-500/20');
            label.innerText = "CLICK NOW!";
            instruction.innerText = "GO GO GO!";
        }, delay);
    };

    // 3. Handle Click Logic
    window.handleReactClick = () => {
        if (!gameActive) {
            // PENALTY: Clicked too early
            clearTimeout(timeout);
            alert("Too early! You must wait for green.");
            closeGame();
        } else {
            // SUCCESS: Calculate reaction time
            const endTime = Date.now();
            const reactionTime = endTime - startTime;
            
            // Calculate Stars based on speed
            let stars = 0;
            if (reactionTime < 200) stars = 100;      // God-like
            else if (reactionTime < 300) stars = 75;  // Fast
            else if (reactionTime < 500) stars = 50;  // Average
            else stars = 20;                          // Slow

            gameActive = false;
            box.classList.remove('bg-emerald-500');
            box.classList.add('bg-indigo-500');
            label.innerText = `${reactionTime}ms`;
            
            setTimeout(() => {
                alert(`Reaction Time: ${reactionTime}ms! \nStars Earned: ${stars}`);
                updateScore(stars);
                closeGame();
            }, 500);
        }
    };

    startTest();
};
window.initGuessNumber = function(container) {
    // 1. Updated Range: 1 to 100
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 7; // Increased attempts slightly because the range is wider

    // 2. Updated UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
            <h2 class="text-3xl font-black mb-2 text-indigo-400 uppercase">Number Mystery</h2>
            <p id="guess-hint" class="text-slate-400 text-[10px] font-black tracking-widest mb-8 uppercase">Guess between 1 and 100</p>
            
            <div class="mb-6">
                <input type="number" id="guess-input" placeholder="??" 
                    class="w-24 h-24 bg-white/5 border-2 border-white/10 rounded-3xl text-center text-4xl font-black text-white focus:outline-none focus:border-indigo-500 transition-all">
            </div>

            <button onclick="window.processGuess()" 
                class="w-full py-4 bg-indigo-600 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                Submit Guess
            </button>

            <div class="flex justify-center gap-2 mt-6" id="attempt-dots">
                ${Array(attempts).fill('<div class="w-2 h-2 bg-rose-500 rounded-full"></div>').join('')}
            </div>
        </div>
    `;

    const input = document.getElementById('guess-input');
    const hint = document.getElementById('guess-hint');
    const dots = document.getElementById('attempt-dots');

    window.processGuess = () => {
        const userGuess = parseInt(input.value);

        // Updated Validation for 100
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            hint.innerText = "Enter a number between 1-100!";
            hint.classList.add('text-rose-400');
            return;
        }

        if (userGuess === targetNumber) {
            input.classList.add('bg-emerald-500/20', 'border-emerald-500');
            hint.innerText = "BULLSEYE!";
            
            setTimeout(() => {
                alert(`Correct! The number was ${targetNumber}. \nReward: ${attempts * 25} Stars!`);
                updateScore(attempts * 25); 
                closeGame();
            }, 500);
        } else {
            attempts--;
            input.value = '';
            input.focus();
            
            // Dynamic dot update
            dots.innerHTML = Array(attempts).fill('<div class="w-2 h-2 bg-rose-500 rounded-full"></div>').join('') + 
                             Array(7 - attempts).fill('<div class="w-2 h-2 bg-white/10 rounded-full"></div>').join('');

            if (attempts <= 0) {
                alert(`Game Over! The number was ${targetNumber}.`);
                closeGame();
            } else {
                hint.innerText = userGuess > targetNumber ? "Too High! Try Lower" : "Too Low! Try Higher";
                hint.classList.replace('text-slate-400', 'text-amber-400');
            }
        }
    };
};
window.initWordScramble = function(container) {
    // 1. Word Bank (Add as many as you like!)
    const wordBank = [
        { word: 'GALAXY', hint: 'Space and Stars' },
        { word: 'PIZZA', hint: 'Cheesy Italian Food' },
        { word: 'PYTHON', hint: 'A Snake or a Language' },
        { word: 'GUITAR', hint: 'Musical Instrument' },
        { word: 'CHROME', hint: 'A Web Browser' },
        { word: 'OCEAN', hint: 'Big Blue Water' },
        { word: 'ROCKET', hint: 'Fly to the Moon' }
    ];

    // Pick a random word
    const selected = wordBank[Math.floor(Math.random() * wordBank.length)];
    const scrambled = selected.word.split('').sort(() => Math.random() - 0.5).join('');
    let reward = 100;

    // 2. Create the UI
    container.innerHTML = `
        <div class="text-center bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
            <h2 class="text-3xl font-black mb-2 text-indigo-400 uppercase">Scramble</h2>
            <p class="text-slate-400 text-[10px] font-black tracking-widest mb-8 uppercase">Unscramble the letters</p>
            
            <div class="flex justify-center gap-2 mb-8">
                ${scrambled.split('').map(letter => `
                    <div class="w-10 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-xl font-black text-indigo-300">
                        ${letter}
                    </div>
                `).join('')}
            </div>

            <div class="mb-6">
                <input type="text" id="ws-input" placeholder="Type here..." 
                    class="w-full h-16 bg-white/5 border-2 border-white/10 rounded-2xl text-center text-2xl font-black text-white focus:outline-none focus:border-indigo-500 transition-all uppercase">
            </div>

            <div class="flex gap-2">
                <button onclick="window.checkScramble()" 
                    class="flex-grow py-4 bg-indigo-600 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20">
                    Verify
                </button>
                <button id="ws-hint-btn" onclick="window.showScrambleHint()" 
                    class="px-4 bg-white/5 border border-white/10 rounded-2xl text-xl hover:bg-white/10 transition-all">
                    💡
                </button>
            </div>
            
            <p id="ws-hint-text" class="mt-6 text-slate-500 text-[10px] font-bold uppercase opacity-0 transition-opacity">
                Hint: ${selected.hint}
            </p>
        </div>
    `;

    const input = document.getElementById('ws-input');
    const hintText = document.getElementById('ws-hint-text');

    // 3. Logic: Show Hint (Reduces Reward)
    window.showScrambleHint = () => {
        hintText.classList.remove('opacity-0');
        reward = 50; // Penalty for using a hint
        document.getElementById('ws-hint-btn').disabled = true;
        document.getElementById('ws-hint-btn').classList.add('opacity-50');
    };

    // 4. Logic: Check Word
    window.checkScramble = () => {
        const userWord = input.value.trim().toUpperCase();

        if (userWord === selected.word) {
            input.classList.add('bg-emerald-500/20', 'border-emerald-500');
            setTimeout(() => {
                alert(`Amazing! The word was ${selected.word}. \nReward: ${reward} Stars!`);
                updateScore(reward);
                closeGame();
            }, 400);
        } else {
            input.classList.add('animate-shake', 'border-rose-500');
            setTimeout(() => input.classList.remove('animate-shake', 'border-rose-500'), 500);
            input.value = '';
            input.placeholder = "Try Again!";
        }
    };
};
window.initSpellCheck = function(container) {
    // 1. Question Bank
    const questions = [
        { options: ['Receive', 'Recieve', 'Receeve'], correct: 0 },
        { options: ['Acomodate', 'Accommodate', 'Accomodate'], correct: 1 },
        { options: ['Definitly', 'Definately', 'Definitely'], correct: 2 },
        { options: ['Calendar', 'Calender', 'Calendur'], correct: 0 },
        { options: ['Separate', 'Seperate', 'Seprate'], correct: 0 },
        { options: ['Ocasion', 'Occasion', 'Occassion'], correct: 1 },
        { options: ['Necessary', 'Neccesary', 'Necessery'], correct: 0 }
    ];

    // Pick 3 random questions for a "round"
    const roundQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, 3);
    let currentQ = 0;
    let totalScore = 0;

    // 2. Render Function
    const renderQuestion = () => {
        const q = roundQuestions[currentQ];
        container.innerHTML = `
            <div class="text-center bg-white/10 p-10 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl max-w-sm mx-auto">
                <h2 class="text-3xl font-black mb-2 text-rose-400 uppercase">Spell Check</h2>
                <p class="text-slate-400 text-[10px] font-black tracking-widest mb-8 uppercase">Question ${currentQ + 1} of 3</p>
                
                <div class="space-y-4">
                    ${q.options.map((opt, i) => `
                        <button onclick="window.checkSpelling(${i})" 
                            class="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-indigo-500 transition-all">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
                
                <div class="mt-8 flex justify-center gap-2">
                    ${roundQuestions.map((_, i) => `
                        <div class="w-8 h-1 rounded-full ${i <= currentQ ? 'bg-indigo-500' : 'bg-white/10'}"></div>
                    `).join('')}
                </div>
            </div>
        `;
    };

    // 3. Logic: Check Answer
    window.checkSpelling = (index) => {
        const isCorrect = index === roundQuestions[currentQ].correct;
        
        if (isCorrect) {
            totalScore += 40;
        }

        if (currentQ < roundQuestions.length - 1) {
            currentQ++;
            renderQuestion();
        } else {
            // End Game
            setTimeout(() => {
                alert(`Round Complete! \nStars Earned: ${totalScore}`);
                updateScore(totalScore);
                closeGame();
            }, 300);
        }
    };

    renderQuestion();
};
