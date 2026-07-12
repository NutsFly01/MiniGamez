document.addEventListener("DOMContentLoaded", () => {
    const themeStorageKey = "minigamez_theme";
    const games = [
        {
            id: "knight",
            title: "Jeu du Cavalier",
            description: "Parcours l'echiquier en sauts de cavalier sans repasser sur une case.",
            status: "Disponible",
            available: true
        },
        {
            id: "queens",
            title: "Queens",
            description: "Place des couronnes sur un plateau colore en respectant les contraintes du puzzle.",
            status: "Nouveau",
            available: true
        },
        {
            id: "wiki",
            title: "Wiki masque",
            description: "Devine un article Wikipedia mot par mot en revelant son premier paragraphe.",
            status: "Nouveau",
            available: true
        },
        {
            id: "sudoku",
            title: "Sudoku",
            description: "Une grille 9x9 avec aides pratiques : notes, indice, clavier et surbrillance.",
            status: "Nouveau",
            available: true
        },
        {
            id: "puzzle",
            title: "Puzzle rapide",
            description: "Un puzzle a assembler en deplacant les pieces pour reconstruire le dessin final.",
            status: "Nouveau",
            available: true
        },
        {
            id: "petitbac",
            title: "Petit Bac",
            description: "Une lettre, huit categories, un chrono : trouve un mot par categorie avant la fin du temps.",
            status: "Nouveau",
            available: true
        },
        {
            id: "snake",
            title: "Snake",
            description: "Une version maison du serpent, a faire grandir sans heurter les murs.",
            status: "Bientot",
            available: false
        },
        {
            id: "breakout",
            title: "Breakout",
            description: "Une salle d'arcade avec balle, rebonds et pluie de briques a faire tomber.",
            status: "Bientot",
            available: false
        }
    ];

    const queensPuzzleSize = 7;
    const queensRegionIds = ["a", "b", "c", "d", "e", "f", "g"];

    const homeScreen = document.getElementById("homeScreen");
    const gameScreen = document.getElementById("gameScreen");
    const gamesGrid = document.getElementById("gamesGrid");
    const sidebarGames = document.getElementById("sidebarGames");
    const activeGameTitle = document.getElementById("activeGameTitle");
    const backToHomeButton = document.getElementById("backToHome");
    const themeToggleButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));

    const knightGame = document.getElementById("knightGame");
    const knightBoard = document.getElementById("chessboard");
    const boardSizeSelect = document.getElementById("boardSize");
    const newGameButton = document.getElementById("newGame");
    const moveCountElement = document.getElementById("moveCount");
    const bestScoreElement = document.getElementById("bestScore");
    const knightInfo = document.getElementById("gameInfo");

    const queensGame = document.getElementById("queensGame");
    const queensBoard = document.getElementById("queensBoard");
    const resetQueensButton = document.getElementById("resetQueens");
    const changeQueensGridButton = document.getElementById("changeQueensGrid");
    const queensPlacedCount = document.getElementById("queensPlacedCount");
    const queensRegionCount = document.getElementById("queensRegionCount");
    const queensGridNumber = document.getElementById("queensGridNumber");
    const queensInfo = document.getElementById("queensInfo");

    const wikiGame = document.getElementById("wikiGame");
    const wikiTitle = document.getElementById("wikiTitle");
    const loadWikiPageButton = document.getElementById("loadWikiPage");
    const wikiGuessForm = document.getElementById("wikiGuessForm");
    const wikiGuessInput = document.getElementById("wikiGuessInput");
    const submitWikiGuessButton = document.getElementById("submitWikiGuess");
    const wikiTitleProgress = document.getElementById("wikiTitleProgress");
    const wikiRevealedCount = document.getElementById("wikiRevealedCount");
    const wikiAttemptCount = document.getElementById("wikiAttemptCount");
    const wikiText = document.getElementById("wikiText");
    const wikiAnswer = document.getElementById("wikiAnswer");
    const wikiInfo = document.getElementById("wikiInfo");

    const sudokuGame = document.getElementById("sudokuGame");
    const sudokuBoard = document.getElementById("sudokuBoard");
    const sudokuDifficultySelect = document.getElementById("sudokuDifficulty");
    const newSudokuGameButton = document.getElementById("newSudokuGame");
    const toggleSudokuNotesButton = document.getElementById("toggleSudokuNotes");
    const sudokuHintButton = document.getElementById("sudokuHint");
    const sudokuFilledCount = document.getElementById("sudokuFilledCount");
    const sudokuModeState = document.getElementById("sudokuModeState");
    const sudokuHintCount = document.getElementById("sudokuHintCount");
    const sudokuSelectionInfo = document.getElementById("sudokuSelectionInfo");
    const sudokuCandidates = document.getElementById("sudokuCandidates");
    const sudokuNumberPad = document.getElementById("sudokuNumberPad");
    const sudokuInfo = document.getElementById("sudokuInfo");
    const puzzleGame = document.getElementById("puzzleGame");
    const puzzleBoard = document.getElementById("puzzleBoard");
    const puzzleSizeSelect = document.getElementById("puzzleSize");
    const puzzleArtworkSelect = document.getElementById("puzzleArtwork");
    const newPuzzleGameButton = document.getElementById("newPuzzleGame");
    const togglePuzzleHelpButton = document.getElementById("togglePuzzleHelp");
    const puzzleMoveCount = document.getElementById("puzzleMoveCount");
    const puzzleElapsedTime = document.getElementById("puzzleElapsedTime");
    const puzzleBestTime = document.getElementById("puzzleBestTime");
    const puzzleInfo = document.getElementById("puzzleInfo");

    const petitbacGame = document.getElementById("petitbacGame");
    const petitbacBoard = document.getElementById("petitbacBoard");
    const petitbacModeSelect = document.getElementById("petitbacMode");
    const petitbacDurationSelect = document.getElementById("petitbacDuration");
    const petitbacScoreLabel = document.getElementById("petitbacScoreLabel");
    const petitbacChain = document.getElementById("petitbacChain");
    const petitbacChainQuestion = document.getElementById("petitbacChainQuestion");
    const petitbacChainLetter = document.getElementById("petitbacChainLetter");
    const petitbacChainForm = document.getElementById("petitbacChainForm");
    const petitbacChainInput = document.getElementById("petitbacChainInput");
    const petitbacChainSubmit = document.getElementById("petitbacChainSubmit");
    const petitbacChainSkip = document.getElementById("petitbacChainSkip");
    const petitbacChainFeedback = document.getElementById("petitbacChainFeedback");
    const newPetitbacRoundButton = document.getElementById("newPetitbacRound");
    const stopPetitbacRoundButton = document.getElementById("stopPetitbacRound");
    const petitbacLetterElement = document.getElementById("petitbacLetter");
    const petitbacTimeLeftElement = document.getElementById("petitbacTimeLeft");
    const petitbacRoundScoreElement = document.getElementById("petitbacRoundScore");
    const petitbacBestScoreElement = document.getElementById("petitbacBestScore");
    const petitbacInfo = document.getElementById("petitbacInfo");

    const knightState = {
        knightPosition: { row: 0, col: 0 },
        visitedSquares: new Set(),
        gameOver: false,
        boardSize: 8,
        moveCount: 0
    };

    const queensState = {
        marks: new Map(),
        gameOver: false,
        puzzle: null,
        gridNumber: 1
    };

    const wikiState = {
        isLoading: false,
        isSolved: false,
        title: "",
        url: "",
        paragraphs: [],
        titleTokens: [],
        tokensByParagraph: [],
        availableWords: new Set(),
        revealedWords: new Set(),
        attemptedWords: new Set(),
        relatedTitleWords: new Map()
    };

    const sudokuState = {
        difficulty: "easy",
        solution: [],
        puzzle: [],
        values: [],
        fixedCells: new Set(),
        notes: [],
        selectedIndex: null,
        noteMode: false,
        hintCount: 0,
        gameOver: false
    };

    const puzzleState = {
        size: 3,
        artworkId: "bubbles",
        artworkLabel: "Bulles pop",
        pieces: [],
        placedCount: 0,
        startedAt: 0,
        elapsedSeconds: 0,
        timerId: null,
        gameOver: false,
        helpMode: false,
        activePieceId: "",
        dragOffsetX: 0,
        dragOffsetY: 0,
        artworkCache: new Map()
    };

    const petitbacCategories = [
        { id: "prenom", label: "Prenom", placeholder: "Exemple : Lea, Bruno..." },
        { id: "animal", label: "Animal", placeholder: "Exemple : loutre, aigle..." },
        { id: "ville", label: "Ville", placeholder: "Exemple : Lyon, Oslo..." },
        { id: "pays", label: "Pays", placeholder: "Exemple : Bresil, Italie..." },
        { id: "metier", label: "Metier", placeholder: "Exemple : boulanger, avocate..." },
        { id: "fruit", label: "Fruit ou legume", placeholder: "Exemple : ananas, radis..." },
        { id: "objet", label: "Objet", placeholder: "Exemple : lampe, ciseaux..." },
        { id: "celebrite", label: "Celebrite", placeholder: "Exemple : Zidane, Piaf..." }
    ];

    const petitbacLetterPool = "ABCDEFGHIJLMNOPRSTV";

    const petitbacChainQuestions = [
        "Un metier",
        "Une chose en metal",
        "Un animal",
        "Un prenom",
        "Une ville",
        "Un pays",
        "Quelque chose qui se mange",
        "Un objet de la maison",
        "Quelque chose qu'on trouve a l'ecole",
        "Un sport",
        "Un fruit ou un legume",
        "Une chose en bois",
        "Quelque chose de rond",
        "Un vetement",
        "Un instrument de musique",
        "Un personnage de fiction",
        "Une celebrite",
        "Quelque chose qui fait du bruit",
        "Une chose plus petite qu'une main",
        "Quelque chose qu'on trouve dans la cuisine",
        "Un titre de film ou de serie",
        "Quelque chose de froid",
        "Quelque chose qui vole",
        "Une boisson",
        "Quelque chose qu'on peut offrir en cadeau",
        "Quelque chose qui roule",
        "Quelque chose qu'on trouve dans la nature",
        "Une partie du corps",
        "Un mot de la salle de bain",
        "Quelque chose qui se trouve dans une valise"
    ];

    const petitbacState = {
        mode: "classic",
        letter: "",
        phase: "idle",
        remainingSeconds: 0,
        timerId: null,
        results: new Map(),
        roundScore: 0,
        roundId: 0,
        chainCount: 0,
        chainQuestion: "",
        chainChallengeId: 0,
        chainChecking: false
    };

    const petitbacWordCache = new Map();

    const puzzleArtworkCatalog = {
        bubbles: {
            label: "Bulles pop",
            render(targetSize, detailCount) {
                const sparkles = Array.from({ length: detailCount }, (_, index) => {
                    const cx = 22 + (index * 47) % (targetSize - 44);
                    const cy = 24 + (index * 59) % (targetSize - 48);
                    const radius = 2 + (index % 3);
                    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="rgba(255,255,255,${0.16 + (index % 4) * 0.06})"/>`;
                }).join("");

                return `
                    <defs>
                        <radialGradient id="bg" cx="50%" cy="45%" r="70%">
                            <stop offset="0%" stop-color="#a789e0"/>
                            <stop offset="100%" stop-color="#694ea8"/>
                        </radialGradient>
                        <radialGradient id="redBall" cx="35%" cy="30%" r="65%">
                            <stop offset="0%" stop-color="#ffd6dc"/>
                            <stop offset="55%" stop-color="#f3779f"/>
                            <stop offset="100%" stop-color="#c6466f"/>
                        </radialGradient>
                        <radialGradient id="greenBall" cx="32%" cy="28%" r="65%">
                            <stop offset="0%" stop-color="#f5ffe1"/>
                            <stop offset="55%" stop-color="#b7ea74"/>
                            <stop offset="100%" stop-color="#6eb243"/>
                        </radialGradient>
                        <radialGradient id="brownBall" cx="34%" cy="28%" r="65%">
                            <stop offset="0%" stop-color="#f3d7cb"/>
                            <stop offset="55%" stop-color="#c88f6b"/>
                            <stop offset="100%" stop-color="#8f5b3c"/>
                        </radialGradient>
                        <radialGradient id="pinkBall" cx="35%" cy="30%" r="65%">
                            <stop offset="0%" stop-color="#ffd5ef"/>
                            <stop offset="55%" stop-color="#f35cb8"/>
                            <stop offset="100%" stop-color="#bf2f86"/>
                        </radialGradient>
                        <radialGradient id="yellowBall" cx="34%" cy="28%" r="65%">
                            <stop offset="0%" stop-color="#fff7bf"/>
                            <stop offset="55%" stop-color="#ffd74a"/>
                            <stop offset="100%" stop-color="#e4a623"/>
                        </radialGradient>
                        <radialGradient id="cyanBall" cx="35%" cy="30%" r="65%">
                            <stop offset="0%" stop-color="#ebffff"/>
                            <stop offset="55%" stop-color="#8fe3ff"/>
                            <stop offset="100%" stop-color="#54b6d8"/>
                        </radialGradient>
                        <linearGradient id="frameGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="rgba(255,255,255,0.46)"/>
                            <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                        </linearGradient>
                    </defs>
                    <rect width="${targetSize}" height="${targetSize}" fill="url(#bg)"/>
                    <rect x="4" y="4" width="${targetSize - 8}" height="${targetSize - 8}" rx="18" fill="none" stroke="url(#frameGlow)" stroke-width="8"/>
                    <path d="M${targetSize * 0.02} ${targetSize * 0.11}c${targetSize * 0.18} ${targetSize * 0.12} ${targetSize * 0.32} ${targetSize * 0.03} ${targetSize * 0.52} ${targetSize * 0.08}" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="3" stroke-linecap="round"/>
                    <path d="M${targetSize * 0.03} ${targetSize * 0.36}c${targetSize * 0.2}-${targetSize * 0.1} ${targetSize * 0.34} ${targetSize * 0.02} ${targetSize * 0.48}-${targetSize * 0.02}" fill="none" stroke="rgba(255,255,255,0.24)" stroke-width="3" stroke-linecap="round"/>
                    <path d="M${targetSize * 0.07} ${targetSize * 0.74}c${targetSize * 0.24}-${targetSize * 0.05} ${targetSize * 0.28}-${targetSize * 0.21} ${targetSize * 0.54}-${targetSize * 0.22}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="3" stroke-linecap="round"/>
                    <circle cx="${targetSize * 0.06}" cy="${targetSize * 0.14}" r="${targetSize * 0.19}" fill="url(#redBall)"/>
                    <circle cx="${targetSize * 0.5}" cy="${targetSize * 0.18}" r="${targetSize * 0.19}" fill="url(#greenBall)"/>
                    <circle cx="${targetSize * 0.93}" cy="${targetSize * 0.13}" r="${targetSize * 0.18}" fill="url(#brownBall)"/>
                    <circle cx="${targetSize * 0.22}" cy="${targetSize * 0.54}" r="${targetSize * 0.2}" fill="url(#pinkBall)"/>
                    <circle cx="${targetSize * 0.76}" cy="${targetSize * 0.56}" r="${targetSize * 0.2}" fill="url(#yellowBall)"/>
                    <circle cx="${targetSize * 0.48}" cy="${targetSize * 0.84}" r="${targetSize * 0.22}" fill="url(#cyanBall)"/>
                    <g fill="none" stroke="rgba(255,255,255,0.34)" stroke-width="2.5" stroke-linecap="round">
                        <path d="M${targetSize * 0.01} ${targetSize * 0.05}c${targetSize * 0.08} ${targetSize * 0.02} ${targetSize * 0.06} ${targetSize * 0.12} ${targetSize * 0.14} ${targetSize * 0.14}"/>
                        <path d="M${targetSize * 0.38} ${targetSize * 0.08}c${targetSize * 0.04} ${targetSize * 0.06} ${targetSize * 0.16} ${targetSize * 0.02} ${targetSize * 0.18} ${targetSize * 0.09}"/>
                        <path d="M${targetSize * 0.79} ${targetSize * 0.02}c${targetSize * 0.01} ${targetSize * 0.06} ${targetSize * 0.12} ${targetSize * 0.08} ${targetSize * 0.11} ${targetSize * 0.15}"/>
                        <path d="M${targetSize * 0.14} ${targetSize * 0.46}c${targetSize * 0.05} ${targetSize * 0.05}-${targetSize * 0.01} ${targetSize * 0.13} ${targetSize * 0.06} ${targetSize * 0.17}"/>
                        <path d="M${targetSize * 0.66} ${targetSize * 0.46}c${targetSize * 0.08} ${targetSize * 0.03} ${targetSize * 0.09} ${targetSize * 0.11} ${targetSize * 0.16} ${targetSize * 0.13}"/>
                        <path d="M${targetSize * 0.37} ${targetSize * 0.78}c${targetSize * 0.07} ${targetSize * 0.02} ${targetSize * 0.09} ${targetSize * 0.13} ${targetSize * 0.17} ${targetSize * 0.14}"/>
                    </g>
                    ${sparkles}
                `;
            }
        },
        garden: {
            label: "Jardin",
            render(targetSize, detailCount) {
                const petals = Array.from({ length: detailCount }, (_, index) => {
                    const x = 26 + (index * 53) % (targetSize - 52);
                    const y = 18 + (index * 37) % (targetSize - 40);
                    return `
                        <circle cx="${x}" cy="${y}" r="${4 + (index % 3)}" fill="rgba(255,255,255,0.28)"/>
                        <path d="M ${x - 8} ${y + 8} q 8 8 16 0" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
                    `;
                }).join("");

                return `
                    <defs>
                        <linearGradient id="gardenBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#c9f1d0"/>
                            <stop offset="55%" stop-color="#8bd3a2"/>
                            <stop offset="100%" stop-color="#5aad74"/>
                        </linearGradient>
                        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stop-color="#fff9c9"/>
                            <stop offset="100%" stop-color="#f6c95d"/>
                        </radialGradient>
                        <radialGradient id="flowerPink" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffe0f0"/>
                            <stop offset="100%" stop-color="#ec5aa7"/>
                        </radialGradient>
                        <radialGradient id="flowerOrange" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#fff0d4"/>
                            <stop offset="100%" stop-color="#f28d37"/>
                        </radialGradient>
                        <radialGradient id="flowerBlue" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#e5f8ff"/>
                            <stop offset="100%" stop-color="#4faad8"/>
                        </radialGradient>
                    </defs>
                    <rect width="${targetSize}" height="${targetSize}" fill="url(#gardenBg)"/>
                    <rect y="${targetSize * 0.7}" width="${targetSize}" height="${targetSize * 0.3}" fill="#4f8c4d"/>
                    <circle cx="${targetSize * 0.83}" cy="${targetSize * 0.18}" r="${targetSize * 0.12}" fill="url(#sun)"/>
                    <g fill="none" stroke="#3f7b47" stroke-width="${Math.max(4, targetSize * 0.012)}" stroke-linecap="round">
                        <path d="M${targetSize * 0.2} ${targetSize * 0.86} C ${targetSize * 0.22} ${targetSize * 0.68}, ${targetSize * 0.18} ${targetSize * 0.5}, ${targetSize * 0.22} ${targetSize * 0.34}"/>
                        <path d="M${targetSize * 0.48} ${targetSize * 0.88} C ${targetSize * 0.5} ${targetSize * 0.7}, ${targetSize * 0.47} ${targetSize * 0.54}, ${targetSize * 0.52} ${targetSize * 0.32}"/>
                        <path d="M${targetSize * 0.76} ${targetSize * 0.86} C ${targetSize * 0.74} ${targetSize * 0.7}, ${targetSize * 0.78} ${targetSize * 0.54}, ${targetSize * 0.74} ${targetSize * 0.38}"/>
                    </g>
                    <g>
                        <circle cx="${targetSize * 0.22}" cy="${targetSize * 0.3}" r="${targetSize * 0.12}" fill="url(#flowerPink)"/>
                        <circle cx="${targetSize * 0.52}" cy="${targetSize * 0.29}" r="${targetSize * 0.13}" fill="url(#flowerOrange)"/>
                        <circle cx="${targetSize * 0.74}" cy="${targetSize * 0.35}" r="${targetSize * 0.11}" fill="url(#flowerBlue)"/>
                        <circle cx="${targetSize * 0.22}" cy="${targetSize * 0.3}" r="${targetSize * 0.03}" fill="#fff5b1"/>
                        <circle cx="${targetSize * 0.52}" cy="${targetSize * 0.29}" r="${targetSize * 0.03}" fill="#fff3a0"/>
                        <circle cx="${targetSize * 0.74}" cy="${targetSize * 0.35}" r="${targetSize * 0.03}" fill="#fff8c4"/>
                    </g>
                    ${petals}
                `;
            }
        },
        rocket: {
            label: "Fusee",
            render(targetSize, detailCount) {
                const stars = Array.from({ length: detailCount + 6 }, (_, index) => {
                    const x = 20 + (index * 61) % (targetSize - 40);
                    const y = 16 + (index * 43) % (targetSize - 32);
                    const size = 4 + (index % 3);
                    return `<path d="M ${x} ${y - size} L ${x + size * 0.35} ${y - size * 0.35} L ${x + size} ${y} L ${x + size * 0.35} ${y + size * 0.35} L ${x} ${y + size} L ${x - size * 0.35} ${y + size * 0.35} L ${x - size} ${y} L ${x - size * 0.35} ${y - size * 0.35} Z" fill="rgba(255,242,130,0.72)"/>`;
                }).join("");

                return `
                    <defs>
                        <linearGradient id="spaceBg" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#10183d"/>
                            <stop offset="55%" stop-color="#25388d"/>
                            <stop offset="100%" stop-color="#6e2ab3"/>
                        </linearGradient>
                        <radialGradient id="planet" cx="35%" cy="30%" r="65%">
                            <stop offset="0%" stop-color="#d9ecff"/>
                            <stop offset="100%" stop-color="#7aa6ff"/>
                        </radialGradient>
                        <linearGradient id="ship" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#fff5f5"/>
                            <stop offset="100%" stop-color="#d8d9ec"/>
                        </linearGradient>
                        <linearGradient id="fire" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#fff4a1"/>
                            <stop offset="50%" stop-color="#ff9f3c"/>
                            <stop offset="100%" stop-color="#f04f2a"/>
                        </linearGradient>
                    </defs>
                    <rect width="${targetSize}" height="${targetSize}" fill="url(#spaceBg)"/>
                    <circle cx="${targetSize * 0.16}" cy="${targetSize * 0.2}" r="${targetSize * 0.11}" fill="url(#planet)" opacity="0.86"/>
                    <circle cx="${targetSize * 0.82}" cy="${targetSize * 0.18}" r="${targetSize * 0.08}" fill="#ffd874" opacity="0.7"/>
                    <path d="M${targetSize * 0.2} ${targetSize * 0.78} C ${targetSize * 0.34} ${targetSize * 0.68}, ${targetSize * 0.5} ${targetSize * 0.5}, ${targetSize * 0.64} ${targetSize * 0.2}" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="${Math.max(6, targetSize * 0.018)}" stroke-linecap="round"/>
                    <g transform="translate(${targetSize * 0.46} ${targetSize * 0.2}) rotate(18)">
                        <path d="M0 0 C ${targetSize * 0.06} ${targetSize * 0.04}, ${targetSize * 0.1} ${targetSize * 0.16}, 0 ${targetSize * 0.28} C -${targetSize * 0.1} ${targetSize * 0.16}, -${targetSize * 0.06} ${targetSize * 0.04}, 0 0 Z" fill="url(#ship)"/>
                        <circle cx="0" cy="${targetSize * 0.11}" r="${targetSize * 0.03}" fill="#69c7ff"/>
                        <path d="M-${targetSize * 0.06} ${targetSize * 0.16} L -${targetSize * 0.12} ${targetSize * 0.22} L -${targetSize * 0.04} ${targetSize * 0.2} Z" fill="#ff6375"/>
                        <path d="M${targetSize * 0.06} ${targetSize * 0.16} L ${targetSize * 0.12} ${targetSize * 0.22} L ${targetSize * 0.04} ${targetSize * 0.2} Z" fill="#ff6375"/>
                        <path d="M0 ${targetSize * 0.28} C ${targetSize * 0.03} ${targetSize * 0.34}, ${targetSize * 0.02} ${targetSize * 0.42}, 0 ${targetSize * 0.48} C -${targetSize * 0.02} ${targetSize * 0.42}, -${targetSize * 0.03} ${targetSize * 0.34}, 0 ${targetSize * 0.28} Z" fill="url(#fire)"/>
                    </g>
                    ${stars}
                `;
            }
        },
        aquarium: {
            label: "Aquarium",
            render(targetSize, detailCount) {
                const bubbles = Array.from({ length: detailCount + 6 }, (_, index) => {
                    const x = 18 + (index * 39) % (targetSize - 36);
                    const y = targetSize - 18 - (index * 51) % (targetSize - 40);
                    const r = 3 + (index % 4) * 1.5;
                    return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.24)" stroke-width="1"/>`;
                }).join("");

                return `
                    <defs>
                        <linearGradient id="water" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stop-color="#89d8ff"/>
                            <stop offset="55%" stop-color="#3f96d6"/>
                            <stop offset="100%" stop-color="#1f5f96"/>
                        </linearGradient>
                        <linearGradient id="sand" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#ffd88a"/>
                            <stop offset="100%" stop-color="#e2b969"/>
                        </linearGradient>
                        <radialGradient id="fishOrange" cx="30%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#fff0d7"/>
                            <stop offset="100%" stop-color="#ff9b42"/>
                        </radialGradient>
                        <radialGradient id="fishBlue" cx="30%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#eef9ff"/>
                            <stop offset="100%" stop-color="#5ab5f2"/>
                        </radialGradient>
                        <radialGradient id="fishPink" cx="30%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffe5f2"/>
                            <stop offset="100%" stop-color="#ff70b1"/>
                        </radialGradient>
                    </defs>
                    <rect width="${targetSize}" height="${targetSize}" fill="url(#water)"/>
                    <path d="M0 ${targetSize * 0.8} C ${targetSize * 0.14} ${targetSize * 0.74}, ${targetSize * 0.3} ${targetSize * 0.84}, ${targetSize * 0.42} ${targetSize * 0.78} S ${targetSize * 0.74} ${targetSize * 0.86}, ${targetSize} ${targetSize * 0.78} V ${targetSize} H 0 Z" fill="url(#sand)"/>
                    <g fill="none" stroke="#2a8857" stroke-width="${Math.max(5, targetSize * 0.014)}" stroke-linecap="round">
                        <path d="M${targetSize * 0.18} ${targetSize * 0.82} C ${targetSize * 0.12} ${targetSize * 0.62}, ${targetSize * 0.16} ${targetSize * 0.48}, ${targetSize * 0.14} ${targetSize * 0.28}"/>
                        <path d="M${targetSize * 0.3} ${targetSize * 0.84} C ${targetSize * 0.34} ${targetSize * 0.64}, ${targetSize * 0.28} ${targetSize * 0.5}, ${targetSize * 0.32} ${targetSize * 0.24}"/>
                        <path d="M${targetSize * 0.8} ${targetSize * 0.82} C ${targetSize * 0.76} ${targetSize * 0.62}, ${targetSize * 0.82} ${targetSize * 0.48}, ${targetSize * 0.78} ${targetSize * 0.26}"/>
                    </g>
                    <g>
                        <ellipse cx="${targetSize * 0.3}" cy="${targetSize * 0.34}" rx="${targetSize * 0.12}" ry="${targetSize * 0.08}" fill="url(#fishOrange)"/>
                        <polygon points="${targetSize * 0.18},${targetSize * 0.34} ${targetSize * 0.1},${targetSize * 0.28} ${targetSize * 0.1},${targetSize * 0.4}" fill="#ff7a39"/>
                        <circle cx="${targetSize * 0.35}" cy="${targetSize * 0.32}" r="${targetSize * 0.01}" fill="#27344b"/>
                        <ellipse cx="${targetSize * 0.66}" cy="${targetSize * 0.46}" rx="${targetSize * 0.11}" ry="${targetSize * 0.07}" fill="url(#fishBlue)"/>
                        <polygon points="${targetSize * 0.55},${targetSize * 0.46} ${targetSize * 0.48},${targetSize * 0.4} ${targetSize * 0.48},${targetSize * 0.52}" fill="#3f8fd1"/>
                        <circle cx="${targetSize * 0.7}" cy="${targetSize * 0.44}" r="${targetSize * 0.01}" fill="#27344b"/>
                        <ellipse cx="${targetSize * 0.48}" cy="${targetSize * 0.64}" rx="${targetSize * 0.13}" ry="${targetSize * 0.08}" fill="url(#fishPink)"/>
                        <polygon points="${targetSize * 0.35},${targetSize * 0.64} ${targetSize * 0.27},${targetSize * 0.58} ${targetSize * 0.27},${targetSize * 0.7}" fill="#ef5f9d"/>
                        <circle cx="${targetSize * 0.53}" cy="${targetSize * 0.62}" r="${targetSize * 0.01}" fill="#27344b"/>
                    </g>
                    ${bubbles}
                `;
            }
        },
        cat: {
            label: "Chat cosy",
            render(targetSize, detailCount) {
                const hearts = Array.from({ length: Math.max(6, Math.floor(detailCount / 2)) }, (_, index) => {
                    const x = 24 + (index * 57) % (targetSize - 48);
                    const y = 22 + (index * 49) % (targetSize * 0.34);
                    const size = 8 + (index % 3) * 2;
                    return `<path d="M ${x} ${y} c -${size * 0.55} -${size * 0.75}, -${size * 1.5} -${size * 0.2}, -${size * 1.5} ${size * 0.65} c 0 ${size * 0.55}, ${size * 0.48} ${size * 1.08}, ${size * 1.5} ${size * 1.72} c ${size * 1.02}-${size * 0.64}, ${size * 1.5}-${size * 1.17}, ${size * 1.5}-${size * 1.72} c 0-${size * 0.85}-${size * 0.95}-${size * 1.4}-${size * 1.5}-${size * 0.65} z" fill="rgba(255,255,255,0.24)"/>`;
                }).join("");

                return `
                    <defs>
                        <linearGradient id="room" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#ffe4c5"/>
                            <stop offset="100%" stop-color="#f0b98d"/>
                        </linearGradient>
                        <radialGradient id="catFur" cx="40%" cy="35%" r="65%">
                            <stop offset="0%" stop-color="#ffd7b0"/>
                            <stop offset="100%" stop-color="#cc8b52"/>
                        </radialGradient>
                        <linearGradient id="cushion" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#e88996"/>
                            <stop offset="100%" stop-color="#b94f62"/>
                        </linearGradient>
                    </defs>
                    <rect width="${targetSize}" height="${targetSize}" fill="url(#room)"/>
                    <rect y="${targetSize * 0.72}" width="${targetSize}" height="${targetSize * 0.28}" fill="#d39769"/>
                    <ellipse cx="${targetSize * 0.5}" cy="${targetSize * 0.74}" rx="${targetSize * 0.28}" ry="${targetSize * 0.13}" fill="url(#cushion)"/>
                    <g transform="translate(${targetSize * 0.5} ${targetSize * 0.52})">
                        <ellipse cx="0" cy="${targetSize * 0.08}" rx="${targetSize * 0.2}" ry="${targetSize * 0.16}" fill="url(#catFur)"/>
                        <circle cx="0" cy="-${targetSize * 0.06}" r="${targetSize * 0.15}" fill="url(#catFur)"/>
                        <polygon points="-${targetSize * 0.12},-${targetSize * 0.16} -${targetSize * 0.04},-${targetSize * 0.28} -${targetSize * 0.01},-${targetSize * 0.11}" fill="#c27c47"/>
                        <polygon points="${targetSize * 0.12},-${targetSize * 0.16} ${targetSize * 0.04},-${targetSize * 0.28} ${targetSize * 0.01},-${targetSize * 0.11}" fill="#c27c47"/>
                        <circle cx="-${targetSize * 0.05}" cy="-${targetSize * 0.06}" r="${targetSize * 0.013}" fill="#27344b"/>
                        <circle cx="${targetSize * 0.05}" cy="-${targetSize * 0.06}" r="${targetSize * 0.013}" fill="#27344b"/>
                        <path d="M -${targetSize * 0.03} 0 Q 0 ${targetSize * 0.03} ${targetSize * 0.03} 0" fill="none" stroke="#7d4b2b" stroke-width="${Math.max(2, targetSize * 0.007)}" stroke-linecap="round"/>
                        <g stroke="#7d4b2b" stroke-width="${Math.max(2, targetSize * 0.005)}" stroke-linecap="round">
                            <path d="M -${targetSize * 0.05} ${targetSize * 0.01} L -${targetSize * 0.13} -${targetSize * 0.01}"/>
                            <path d="M -${targetSize * 0.05} ${targetSize * 0.03} L -${targetSize * 0.14} ${targetSize * 0.05}"/>
                            <path d="M ${targetSize * 0.05} ${targetSize * 0.01} L ${targetSize * 0.13} -${targetSize * 0.01}"/>
                            <path d="M ${targetSize * 0.05} ${targetSize * 0.03} L ${targetSize * 0.14} ${targetSize * 0.05}"/>
                        </g>
                        <path d="M ${targetSize * 0.15} ${targetSize * 0.18} C ${targetSize * 0.28} ${targetSize * 0.05}, ${targetSize * 0.33} ${targetSize * 0.26}, ${targetSize * 0.2} ${targetSize * 0.26}" fill="none" stroke="#c27c47" stroke-width="${Math.max(6, targetSize * 0.016)}" stroke-linecap="round"/>
                    </g>
                    ${hearts}
                `;
            }
        }
    };

    function escapeHtml(value) {
        return value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
    }

    function applyTheme(theme) {
        document.body.dataset.theme = theme;
        const isDark = theme === "dark";
        themeToggleButtons.forEach((button) => {
            button.textContent = `Mode sombre : ${isDark ? "oui" : "non"}`;
            button.setAttribute("aria-pressed", String(isDark));
        });
    }

    function getInitialTheme() {
        const storedTheme = localStorage.getItem(themeStorageKey);
        if (storedTheme === "light" || storedTheme === "dark") {
            return storedTheme;
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function toggleTheme() {
        const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem(themeStorageKey, nextTheme);
        applyTheme(nextTheme);
    }

    function renderGames() {
        const cardsMarkup = games.map((game) => {
            const actionButton = game.available
                ? `<button class="launch-button" type="button" data-launch-game="${game.id}">Lancer</button>`
                : `<button class="disabled-button" type="button" disabled>En preparation</button>`;

            return `
                <article class="game-option ${game.available ? "" : "coming-soon"}">
                    <span class="card-badge">${escapeHtml(game.status)}</span>
                    <div>
                        <h3>${escapeHtml(game.title)}</h3>
                        <p>${escapeHtml(game.description)}</p>
                    </div>
                    <div class="card-footer">${actionButton}</div>
                </article>
            `;
        }).join("");

        const sidebarMarkup = games.map((game) => {
            const buttonMarkup = game.available
                ? `<button class="sidebar-button" type="button" data-launch-game="${game.id}">Ouvrir</button>`
                : `<button class="sidebar-button" type="button" disabled>Bientot</button>`;

            return `
                <article class="sidebar-game-item">
                    <div>
                        <h4>${escapeHtml(game.title)}</h4>
                        <p>${escapeHtml(game.description)}</p>
                    </div>
                    ${buttonMarkup}
                </article>
            `;
        }).join("");

        gamesGrid.innerHTML = cardsMarkup;
        sidebarGames.innerHTML = sidebarMarkup;

        document.querySelectorAll("[data-launch-game]").forEach((button) => {
            button.addEventListener("click", () => launchGame(button.dataset.launchGame));
        });
    }

    function showScreen(screenName) {
        const showHome = screenName === "home";
        homeScreen.classList.toggle("hidden", !showHome);
        gameScreen.classList.toggle("hidden", showHome);
    }

    function showGamePanel(gameId) {
        knightGame.classList.toggle("hidden", gameId !== "knight");
        queensGame.classList.toggle("hidden", gameId !== "queens");
        wikiGame.classList.toggle("hidden", gameId !== "wiki");
        sudokuGame.classList.toggle("hidden", gameId !== "sudoku");
        puzzleGame.classList.toggle("hidden", gameId !== "puzzle");
        petitbacGame.classList.toggle("hidden", gameId !== "petitbac");

        if (gameId !== "puzzle") {
            stopPuzzleTimer();
        }

        if (gameId !== "petitbac") {
            stopPetitbacTimer();
        }
    }

    function launchGame(gameId) {
        const selectedGame = games.find((game) => game.id === gameId);
        if (!selectedGame || !selectedGame.available) {
            return;
        }

        activeGameTitle.textContent = selectedGame.title;
        showGamePanel(gameId);
        showScreen("game");

        if (gameId === "knight") {
            initializeKnightBoard();
        }

        if (gameId === "queens") {
            initializeQueensBoard();
        }

        if (gameId === "wiki") {
            initializeWikiGame();
        }

        if (gameId === "sudoku") {
            initializeSudokuGame();
        }

        if (gameId === "puzzle") {
            initializePuzzleGame();
        }

        if (gameId === "petitbac") {
            initializePetitbacGame();
        }
    }

    function flashInvalidCell(cell) {
        cell.classList.remove("invalid");
        void cell.offsetWidth;
        cell.classList.add("invalid");
    }

    function setKnightInfoMessage(message, tone = "") {
        knightInfo.textContent = message;
        knightInfo.className = "info";
        if (tone) {
            knightInfo.classList.add(tone);
        }
    }

    function setKnightBestScore(value) {
        localStorage.setItem(`webcavalier_knight_bestScore_${knightState.boardSize}`, String(value));
    }

    function getKnightBestScore() {
        return localStorage.getItem(`webcavalier_knight_bestScore_${knightState.boardSize}`);
    }

    function updateKnightBestScore() {
        const currentBest = getKnightBestScore();
        if (!currentBest || knightState.moveCount > Number.parseInt(currentBest, 10)) {
            setKnightBestScore(knightState.moveCount);
            bestScoreElement.textContent = String(knightState.moveCount);
        }
    }

    function loadKnightBestScore() {
        bestScoreElement.textContent = getKnightBestScore() || "-";
    }

    function createKnightSquare(row, col) {
        const square = document.createElement("button");
        square.className = "square";
        square.type = "button";
        square.dataset.row = String(row);
        square.dataset.col = String(col);
        square.setAttribute("aria-label", `Case ${row + 1}, ${col + 1}`);
        square.addEventListener("click", handleKnightSquareClick);
        return square;
    }

    function initializeKnightBoard() {
        knightBoard.innerHTML = "";
        knightState.visitedSquares.clear();
        knightState.gameOver = false;
        knightState.moveCount = 0;
        moveCountElement.textContent = "0";

        knightState.boardSize = Number.parseInt(boardSizeSelect.value, 10);
        knightBoard.style.gridTemplateColumns = `repeat(${knightState.boardSize}, var(--square-size))`;
        knightBoard.style.gridTemplateRows = `repeat(${knightState.boardSize}, var(--square-size))`;

        loadKnightBestScore();

        for (let row = 0; row < knightState.boardSize; row += 1) {
            for (let col = 0; col < knightState.boardSize; col += 1) {
                knightBoard.appendChild(createKnightSquare(row, col));
            }
        }

        knightState.knightPosition = { row: 0, col: knightState.boardSize - 1 };
        updateKnightPosition();
        markKnightSquareAsVisited(knightState.knightPosition.row, knightState.knightPosition.col);
        setKnightInfoMessage("Clique sur une case valide pour deplacer le cavalier.");
    }

    function updateKnightPosition() {
        document.querySelectorAll(".knight").forEach((knight) => knight.remove());

        const square = knightBoard.querySelector(
            `[data-row="${knightState.knightPosition.row}"][data-col="${knightState.knightPosition.col}"]`
        );

        if (!square) {
            return;
        }

        const knight = document.createElement("span");
        knight.className = "knight";
        knight.textContent = "\u265E";
        square.appendChild(knight);
    }

    function markKnightSquareAsVisited(row, col) {
        const square = knightBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (!square) {
            return;
        }

        square.classList.add("visited");
        knightState.visitedSquares.add(`${row},${col}`);

        if (knightState.visitedSquares.size === knightState.boardSize * knightState.boardSize) {
            knightState.gameOver = true;
            updateKnightBestScore();
            setKnightInfoMessage(
                `Felicitations ! Tu as visite toutes les cases en ${knightState.moveCount} mouvements.`,
                "success"
            );
        }
    }

    function isValidKnightMove(row, col) {
        if (knightState.gameOver) {
            return false;
        }

        const rowDiff = Math.abs(row - knightState.knightPosition.row);
        const colDiff = Math.abs(col - knightState.knightPosition.col);
        const isKnightMove = (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

        return isKnightMove && !knightState.visitedSquares.has(`${row},${col}`);
    }

    function hasAvailableKnightMove() {
        const possibleMoves = [
            { row: -2, col: -1 },
            { row: -2, col: 1 },
            { row: -1, col: -2 },
            { row: -1, col: 2 },
            { row: 1, col: -2 },
            { row: 1, col: 2 },
            { row: 2, col: -1 },
            { row: 2, col: 1 }
        ];

        return possibleMoves.some((move) => {
            const nextRow = knightState.knightPosition.row + move.row;
            const nextCol = knightState.knightPosition.col + move.col;

            const isInsideBoard =
                nextRow >= 0 &&
                nextRow < knightState.boardSize &&
                nextCol >= 0 &&
                nextCol < knightState.boardSize;

            if (!isInsideBoard) {
                return false;
            }

            return !knightState.visitedSquares.has(`${nextRow},${nextCol}`);
        });
    }

    function handleKnightSquareClick(event) {
        const square = event.currentTarget;
        const row = Number.parseInt(square.dataset.row, 10);
        const col = Number.parseInt(square.dataset.col, 10);

        if (!isValidKnightMove(row, col)) {
            flashInvalidCell(square);
            setKnightInfoMessage("Mouvement invalide: le cavalier se deplace en L sans revisiter une case.", "warning");
            return;
        }

        knightState.knightPosition = { row, col };
        updateKnightPosition();
        knightState.moveCount += 1;
        moveCountElement.textContent = String(knightState.moveCount);
        markKnightSquareAsVisited(row, col);

        if (!knightState.gameOver) {
            if (hasAvailableKnightMove()) {
                setKnightInfoMessage("Bien joue. Continue tant qu'il reste un saut valide.");
            } else {
                knightState.gameOver = true;
                updateKnightBestScore();
                setKnightInfoMessage(
                    `Partie terminee. Plus aucun mouvement possible apres ${knightState.moveCount} mouvements.`,
                    "warning"
                );
            }
        }
    }

    function setQueensInfoMessage(message, tone = "") {
        queensInfo.textContent = message;
        queensInfo.className = "info";
        if (tone) {
            queensInfo.classList.add(tone);
        }
    }

    function shuffleValues(values) {
        const copy = [...values];
        for (let index = copy.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
        }
        return copy;
    }

    function generateQueensSolution(size) {
        const columns = Array.from({ length: size }, (_, index) => index);
        const solutionColumns = new Array(size).fill(-1);
        const usedColumns = new Set();

        function backtrack(row) {
            if (row === size) {
                return true;
            }

            for (const col of shuffleValues(columns)) {
                if (usedColumns.has(col)) {
                    continue;
                }

                if (row > 0 && Math.abs(solutionColumns[row - 1] - col) === 1) {
                    continue;
                }

                solutionColumns[row] = col;
                usedColumns.add(col);

                if (backtrack(row + 1)) {
                    return true;
                }

                usedColumns.delete(col);
                solutionColumns[row] = -1;
            }

            return false;
        }

        if (!backtrack(0)) {
            throw new Error("Impossible de generer une solution Queens 7x7.");
        }

        return solutionColumns;
    }

    function buildQueensRegions(solutionColumns, size) {
        const regions = Array.from({ length: size }, () => Array(size).fill(""));
        const regionCounts = Object.fromEntries(queensRegionIds.slice(0, size).map((id) => [id, 0]));

        for (let row = 0; row < size; row += 1) {
            const regionId = queensRegionIds[row];
            regions[row][solutionColumns[row]] = regionId;
            regionCounts[regionId] = 1;
        }

        let filledCells = size;
        while (filledCells < size * size) {
            const candidates = [];

            for (let row = 0; row < size; row += 1) {
                for (let col = 0; col < size; col += 1) {
                    if (regions[row][col] !== "") {
                        continue;
                    }

                    const neighboringRegions = new Set();

                    if (row > 0 && regions[row - 1][col] !== "") {
                        neighboringRegions.add(regions[row - 1][col]);
                    }

                    if (row < size - 1 && regions[row + 1][col] !== "") {
                        neighboringRegions.add(regions[row + 1][col]);
                    }

                    if (col > 0 && regions[row][col - 1] !== "") {
                        neighboringRegions.add(regions[row][col - 1]);
                    }

                    if (col < size - 1 && regions[row][col + 1] !== "") {
                        neighboringRegions.add(regions[row][col + 1]);
                    }

                    for (const regionId of neighboringRegions) {
                        candidates.push({ row, col, regionId });
                    }
                }
            }

            if (candidates.length === 0) {
                throw new Error("Impossible de construire un quadrillage Queens connecte.");
            }

            const minRegionSize = Math.min(...candidates.map((candidate) => regionCounts[candidate.regionId]));
            const smallestRegionCandidates = candidates.filter(
                (candidate) => regionCounts[candidate.regionId] === minRegionSize
            );
            const pick = smallestRegionCandidates[Math.floor(Math.random() * smallestRegionCandidates.length)];

            regions[pick.row][pick.col] = pick.regionId;
            regionCounts[pick.regionId] += 1;
            filledCells += 1;
        }

        return regions;
    }

    function generateQueensPuzzle(incrementGridNumber = false) {
        const solutionColumns = generateQueensSolution(queensPuzzleSize);
        const regions = buildQueensRegions(solutionColumns, queensPuzzleSize);

        queensState.puzzle = {
            size: queensPuzzleSize,
            regions,
            solutionColumns
        };

        queensState.gridNumber = incrementGridNumber ? queensState.gridNumber + 1 : 1;
    }

    function createQueensKey(row, col) {
        return `${row},${col}`;
    }

    function parseQueensKey(key) {
        const [row, col] = key.split(",").map((value) => Number.parseInt(value, 10));
        return { row, col };
    }

    function getQueensRegion(row, col) {
        return queensState.puzzle.regions[row][col];
    }

    function getQueensMark(key) {
        return queensState.marks.get(key) || "empty";
    }

    function getQueensCrowns() {
        return Array.from(queensState.marks.entries())
            .filter(([, mark]) => mark === "crown")
            .map(([key]) => parseQueensKey(key));
    }

    function updateQueensStats() {
        const crowns = getQueensCrowns();
        const coveredRegions = new Set(crowns.map((crown) => getQueensRegion(crown.row, crown.col)));
        const size = queensState.puzzle.size;

        queensPlacedCount.textContent = `${crowns.length} / ${size}`;
        queensRegionCount.textContent = `${coveredRegions.size} / ${size}`;
        queensGridNumber.textContent = String(queensState.gridNumber);
    }

    function getQueensRuleState() {
        const crowns = getQueensCrowns();
        const conflictingKeys = new Set();
        const brokenRules = [];

        function registerGroupedConflicts(values, type) {
            for (const keys of values.values()) {
                if (keys.length > 1) {
                    keys.forEach((key) => conflictingKeys.add(key));
                    brokenRules.push(type);
                }
            }
        }

        const rowMap = new Map();
        const colMap = new Map();
        const regionMap = new Map();

        for (const crown of crowns) {
            const key = createQueensKey(crown.row, crown.col);
            const region = getQueensRegion(crown.row, crown.col);

            if (!rowMap.has(crown.row)) {
                rowMap.set(crown.row, []);
            }
            rowMap.get(crown.row).push(key);

            if (!colMap.has(crown.col)) {
                colMap.set(crown.col, []);
            }
            colMap.get(crown.col).push(key);

            if (!regionMap.has(region)) {
                regionMap.set(region, []);
            }
            regionMap.get(region).push(key);
        }

        registerGroupedConflicts(rowMap, "plus d'une couronne sur la meme ligne");
        registerGroupedConflicts(colMap, "plus d'une couronne sur la meme colonne");
        registerGroupedConflicts(regionMap, "plus d'une couronne dans la meme forme");

        for (let index = 0; index < crowns.length; index += 1) {
            for (let nextIndex = index + 1; nextIndex < crowns.length; nextIndex += 1) {
                const first = crowns[index];
                const second = crowns[nextIndex];
                const isTouchingDiagonally =
                    Math.abs(first.row - second.row) === 1 && Math.abs(first.col - second.col) === 1;

                if (isTouchingDiagonally) {
                    conflictingKeys.add(createQueensKey(first.row, first.col));
                    conflictingKeys.add(createQueensKey(second.row, second.col));
                    brokenRules.push("des couronnes se touchent en diagonale");
                }
            }
        }

        const messages = [...new Set(brokenRules)];

        return {
            isValid: messages.length === 0,
            messages,
            conflictingKeys
        };
    }

    function renderQueensMarks(ruleState = getQueensRuleState()) {
        queensBoard.querySelectorAll(".queens-cell").forEach((cell) => {
            const key = createQueensKey(
                Number.parseInt(cell.dataset.row, 10),
                Number.parseInt(cell.dataset.col, 10)
            );
            const mark = getQueensMark(key);

            cell.classList.toggle("has-cross", mark === "cross");
            cell.classList.toggle("has-crown", mark === "crown");
            cell.classList.toggle("is-conflict", ruleState.conflictingKeys.has(key));
            cell.textContent = mark === "cross" ? "\u00D7" : mark === "crown" ? "\u265B" : "";
        });
    }

    function createQueensCell(row, col) {
        const size = queensState.puzzle.size;
        const region = getQueensRegion(row, col);
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = `queens-cell region-${region}`;
        cell.dataset.row = String(row);
        cell.dataset.col = String(col);
        cell.dataset.region = region;
        cell.setAttribute("aria-label", `Case ${row + 1}, ${col + 1}, forme ${region.toUpperCase()}`);
        cell.addEventListener("click", handleQueensCellClick);
        cell.style.borderTop = row === 0 || getQueensRegion(row - 1, col) !== region
            ? "3px solid rgba(35, 22, 13, 0.34)"
            : "1px solid rgba(35, 22, 13, 0.08)";
        cell.style.borderRight = col === size - 1 || getQueensRegion(row, col + 1) !== region
            ? "3px solid rgba(35, 22, 13, 0.34)"
            : "1px solid rgba(35, 22, 13, 0.08)";
        cell.style.borderBottom = row === size - 1 || getQueensRegion(row + 1, col) !== region
            ? "3px solid rgba(35, 22, 13, 0.34)"
            : "1px solid rgba(35, 22, 13, 0.08)";
        cell.style.borderLeft = col === 0 || getQueensRegion(row, col - 1) !== region
            ? "3px solid rgba(35, 22, 13, 0.34)"
            : "1px solid rgba(35, 22, 13, 0.08)";
        return cell;
    }

    function refreshQueensBoard(preferredMessage = "") {
        const ruleState = getQueensRuleState();
        const crowns = getQueensCrowns();
        const isSolved = ruleState.isValid && crowns.length === queensState.puzzle.size;

        queensState.gameOver = isSolved;
        renderQueensMarks(ruleState);
        updateQueensStats();

        if (isSolved) {
            setQueensInfoMessage("Bravo ! Toutes les couronnes sont placees et les regles sont respectees.", "success");
            return;
        }

        if (!ruleState.isValid) {
            setQueensInfoMessage(`Regles cassees : ${ruleState.messages.join(", ")}.`, "warning");
            return;
        }

        if (preferredMessage) {
            setQueensInfoMessage(preferredMessage);
            return;
        }

        setQueensInfoMessage("Plateau valide pour l'instant. Clique une fois pour une croix, deux fois pour une couronne.");
    }

    function initializeQueensBoard(
        message = "Clique une fois pour une croix, deux fois pour une couronne, trois fois pour vider la case."
    ) {
        if (!queensState.puzzle) {
            generateQueensPuzzle();
        }

        queensState.marks.clear();
        queensState.gameOver = false;
        queensBoard.innerHTML = "";
        queensBoard.style.gridTemplateColumns = `repeat(${queensState.puzzle.size}, var(--square-size))`;
        queensBoard.style.gridTemplateRows = `repeat(${queensState.puzzle.size}, var(--square-size))`;

        for (let row = 0; row < queensState.puzzle.size; row += 1) {
            for (let col = 0; col < queensState.puzzle.size; col += 1) {
                queensBoard.appendChild(createQueensCell(row, col));
            }
        }

        refreshQueensBoard(message);
    }

    function handleQueensCellClick(event) {
        const row = Number.parseInt(event.currentTarget.dataset.row, 10);
        const col = Number.parseInt(event.currentTarget.dataset.col, 10);
        const key = createQueensKey(row, col);
        const currentMark = getQueensMark(key);

        if (currentMark === "empty") {
            queensState.marks.set(key, "cross");
            refreshQueensBoard("Croix posee.");
            return;
        }

        if (currentMark === "cross") {
            queensState.marks.set(key, "crown");
            refreshQueensBoard("Couronne posee.");
            return;
        }

        queensState.marks.delete(key);
        refreshQueensBoard("Case vide.");
    }

    function setWikiInfoMessage(message, tone = "") {
        wikiInfo.textContent = message;
        wikiInfo.className = "info";
        if (tone) {
            wikiInfo.classList.add(tone);
        }
    }

    function normalizeWikiWord(value) {
        return value
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase();
    }

    function tokenizeWikiText(text) {
        return text.match(/[\p{L}\p{N}]+(?:['\u2019-][\p{L}\p{N}]+)*|[^\p{L}\p{N}]+/gu) || [];
    }

    function extractWikiGuessWords(value) {
        return value.match(/[\p{L}\p{N}]+(?:['\u2019-][\p{L}\p{N}]+)*/gu) || [];
    }

    function isWikiWordToken(token) {
        return /[\p{L}\p{N}]/u.test(token);
    }

    function getWikiTokenLetterCount(token) {
        return (token.match(/[\p{L}\p{N}]/gu) || []).length;
    }

    function createWikiHiddenWordMarkup(token) {
        const letterCount = getWikiTokenLetterCount(token);

        return `<button class="wiki-word wiki-word-button is-hidden" type="button" data-word-length="${letterCount}" style="--word-length: ${letterCount};" aria-label="Mot masque de ${letterCount} lettres"></button>`;
    }

    function createWikiRelatedWordMarkup(word) {
        return `<span class="wiki-word is-related">${escapeHtml(word)}</span>`;
    }

    function normalizeWikiPhrase(value) {
        return value
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .replace(/[^\p{L}\p{N}]+/gu, " ")
            .trim()
            .replace(/\s+/g, " ");
    }

    function resetWikiProgress() {
        wikiState.isSolved = false;
        wikiState.revealedWords.clear();
        wikiState.attemptedWords.clear();
        wikiState.relatedTitleWords.clear();
        wikiAnswer.classList.add("hidden");
        wikiAnswer.innerHTML = "";
        wikiGuessInput.value = "";
    }

    function computeLevenshteinDistance(source, target) {
        if (source === target) {
            return 0;
        }

        if (source.length === 0) {
            return target.length;
        }

        if (target.length === 0) {
            return source.length;
        }

        const previousRow = Array.from({ length: target.length + 1 }, (_, index) => index);
        const currentRow = new Array(target.length + 1);

        for (let sourceIndex = 0; sourceIndex < source.length; sourceIndex += 1) {
            currentRow[0] = sourceIndex + 1;

            for (let targetIndex = 0; targetIndex < target.length; targetIndex += 1) {
                const substitutionCost = source[sourceIndex] === target[targetIndex] ? 0 : 1;
                currentRow[targetIndex + 1] = Math.min(
                    currentRow[targetIndex] + 1,
                    previousRow[targetIndex + 1] + 1,
                    previousRow[targetIndex] + substitutionCost
                );
            }

            for (let index = 0; index < previousRow.length; index += 1) {
                previousRow[index] = currentRow[index];
            }
        }

        return previousRow[target.length];
    }

    function isRelatedWikiWord(guessWord, titleWord) {
        if (guessWord.length < 2 || titleWord.length < 2) {
            return false;
        }

        if (guessWord === titleWord) {
            return false;
        }

        if (guessWord.length >= 4 && titleWord.includes(guessWord)) {
            return true;
        }

        if (titleWord.length >= 4 && guessWord.includes(titleWord)) {
            return true;
        }

        if (guessWord.length >= 3 && titleWord.length >= 3) {
            const guessPrefix = guessWord.slice(0, 4);
            const titlePrefix = titleWord.slice(0, 4);
            if (guessPrefix === titlePrefix) {
                return true;
            }
        }

        const maxDistance = Math.max(1, Math.floor(Math.min(guessWord.length, titleWord.length) / 4));
        return computeLevenshteinDistance(guessWord, titleWord) <= maxDistance;
    }

    function registerRelatedTitleGuess(guessWord) {
        let relatedMatchCount = 0;

        wikiState.titleTokens.forEach((token) => {
            if (!isWikiWordToken(token)) {
                return;
            }

            const normalizedToken = normalizeWikiWord(token);
            if (wikiState.revealedWords.has(normalizedToken)) {
                return;
            }

            if (!isRelatedWikiWord(guessWord, normalizedToken)) {
                return;
            }

            const currentRelatedWord = wikiState.relatedTitleWords.get(normalizedToken);
            if (!currentRelatedWord) {
                wikiState.relatedTitleWords.set(normalizedToken, guessWord);
                relatedMatchCount += 1;
                return;
            }

            const currentDistance = computeLevenshteinDistance(currentRelatedWord, normalizedToken);
            const nextDistance = computeLevenshteinDistance(guessWord, normalizedToken);
            if (nextDistance < currentDistance) {
                wikiState.relatedTitleWords.set(normalizedToken, guessWord);
                relatedMatchCount += 1;
            }
        });

        return relatedMatchCount;
    }

    function setWikiLoadingState(isLoading) {
        wikiState.isLoading = isLoading;
        loadWikiPageButton.disabled = isLoading;
        submitWikiGuessButton.disabled = isLoading || wikiState.tokensByParagraph.length === 0;
        wikiGuessInput.disabled = isLoading || wikiState.tokensByParagraph.length === 0;
    }

    function getWikiStats() {
        let totalWords = 0;
        let revealedCount = 0;

        wikiState.tokensByParagraph.forEach((tokens) => {
            tokens.forEach((token) => {
                if (!isWikiWordToken(token)) {
                    return;
                }

                totalWords += 1;
                if (wikiState.revealedWords.has(normalizeWikiWord(token))) {
                    revealedCount += 1;
                }
            });
        });

        return { totalWords, revealedCount };
    }

    function getWikiTitleStats() {
        let totalWords = 0;
        let revealedCount = 0;

        wikiState.titleTokens.forEach((token) => {
            if (!isWikiWordToken(token)) {
                return;
            }

            totalWords += 1;
            if (wikiState.revealedWords.has(normalizeWikiWord(token))) {
                revealedCount += 1;
            }
        });

        return { totalWords, revealedCount };
    }

    function updateWikiStats() {
        const textStats = getWikiStats();
        const titleStats = getWikiTitleStats();
        wikiTitleProgress.textContent = `${titleStats.revealedCount} / ${titleStats.totalWords}`;
        wikiRevealedCount.textContent = `${textStats.revealedCount} / ${textStats.totalWords}`;
        wikiAttemptCount.textContent = String(wikiState.attemptedWords.size);
    }

    function renderWikiTitle() {
        if (wikiState.titleTokens.length === 0) {
            wikiTitle.innerHTML = "";
            return;
        }

        const titleMarkup = wikiState.titleTokens.map((token) => {
            if (!isWikiWordToken(token)) {
                return escapeHtml(token);
            }

            const normalizedToken = normalizeWikiWord(token);
            const isRevealed = wikiState.revealedWords.has(normalizedToken);

            if (isRevealed) {
                return `<span class="wiki-word is-revealed is-title-word">${escapeHtml(token)}</span>`;
            }

            const relatedWord = wikiState.relatedTitleWords.get(normalizedToken);
            if (relatedWord) {
                return createWikiRelatedWordMarkup(relatedWord);
            }

            return createWikiHiddenWordMarkup(token);
        }).join("");

        wikiTitle.innerHTML = titleMarkup;
    }

    function renderWikiText() {
        if (wikiState.tokensByParagraph.length === 0) {
            renderWikiTitle();
            wikiText.innerHTML = '<p class="wiki-placeholder">Charge un article pour commencer.</p>';
            updateWikiStats();
            setWikiLoadingState(wikiState.isLoading);
            return;
        }

        const markup = wikiState.tokensByParagraph.map((tokens) => {
            const paragraphMarkup = tokens.map((token) => {
                if (!isWikiWordToken(token)) {
                    return escapeHtml(token);
                }

                const normalizedToken = normalizeWikiWord(token);
                const isRevealed = wikiState.revealedWords.has(normalizedToken);

                if (isRevealed) {
                    return `<span class="wiki-word is-revealed">${escapeHtml(token)}</span>`;
                }

                return createWikiHiddenWordMarkup(token);
            }).join("");

            return `<p class="wiki-paragraph">${paragraphMarkup}</p>`;
        }).join("");

        renderWikiTitle();
        wikiText.innerHTML = markup;
        updateWikiStats();
        setWikiLoadingState(wikiState.isLoading);
    }

    async function fetchRandomWikipediaParagraph(retryCount = 0) {
        const response = await fetch(
            "https://fr.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&grnlimit=1&prop=extracts|info&inprop=url&exintro=1&explaintext=1&format=json&origin=*"
        );

        if (!response.ok) {
            throw new Error("Wikipedia n'a pas repondu correctement.");
        }

        const data = await response.json();
        const pages = Object.values(data.query?.pages || {});
        const article = pages[0];
        const paragraphs = (article?.extract || "")
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);
        const firstParagraph = paragraphs[0] || "";
        const paragraphWordCount = tokenizeWikiText(firstParagraph).filter(isWikiWordToken).length;

        if ((!firstParagraph || paragraphWordCount < 18) && retryCount < 5) {
            return fetchRandomWikipediaParagraph(retryCount + 1);
        }

        if (!firstParagraph) {
            throw new Error("Impossible de trouver un article exploitable pour le moment.");
        }

        return {
            title: article.title,
            url: article.fullurl || `https://fr.wikipedia.org/?curid=${article.pageid}`,
            paragraph: firstParagraph
        };
    }

    function applyWikiArticle(article) {
        wikiState.title = article.title;
        wikiState.url = article.url;
        wikiState.paragraphs = [article.paragraph];
        wikiState.titleTokens = tokenizeWikiText(article.title);
        wikiState.tokensByParagraph = wikiState.paragraphs.map(tokenizeWikiText);
        wikiState.availableWords = new Set(
            [...wikiState.titleTokens, ...wikiState.tokensByParagraph.flat()]
                .filter(isWikiWordToken)
                .map((token) => normalizeWikiWord(token))
        );

        resetWikiProgress();
        renderWikiText();
    }

    function revealWikiAnswer() {
        wikiAnswer.innerHTML = `<p>Article trouve : <a href="${escapeHtml(wikiState.url)}" target="_blank" rel="noreferrer">${escapeHtml(wikiState.title)}</a></p>`;
        wikiAnswer.classList.remove("hidden");
    }

    async function loadRandomWikiArticle() {
        wikiState.isSolved = false;
        wikiState.title = "";
        wikiState.url = "";
        wikiState.paragraphs = [];
        wikiState.titleTokens = [];
        wikiState.tokensByParagraph = [];
        wikiState.availableWords = new Set();
        resetWikiProgress();
        wikiText.innerHTML = '<p class="wiki-placeholder">Chargement d\'un article aleatoire...</p>';
        wikiTitle.innerHTML = "";
        setWikiLoadingState(true);
        setWikiInfoMessage("Chargement d'un article Wikipedia aleatoire...");

        try {
            const article = await fetchRandomWikipediaParagraph();
            applyWikiArticle(article);
            setWikiInfoMessage("Article charge. Devine le titre en testant des mots ou une proposition complete.");
            wikiGuessInput.focus();
        } catch (error) {
            wikiText.innerHTML = '<p class="wiki-placeholder">Impossible de charger Wikipedia pour le moment.</p>';
            setWikiInfoMessage("Le chargement a echoue. Reessaie dans un instant.", "warning");
        } finally {
            setWikiLoadingState(false);
        }
    }

    function initializeWikiGame() {
        if (wikiState.tokensByParagraph.length === 0 && !wikiState.isLoading) {
            loadRandomWikiArticle();
            return;
        }

        renderWikiText();
        if (wikiState.isSolved) {
            setWikiInfoMessage(`Titre trouve : "${wikiState.title}".`, "success");
            return;
        }

        setWikiInfoMessage("Trouve le nom de la page. Chaque essai revele les mots correspondants.");
    }

    function handleWikiGuessSubmit(event) {
        event.preventDefault();

        if (wikiState.isLoading || wikiState.tokensByParagraph.length === 0 || wikiState.isSolved) {
            return;
        }

        const rawGuess = wikiGuessInput.value.trim();
        const normalizedPhrase = normalizeWikiPhrase(rawGuess);
        const guessWords = extractWikiGuessWords(wikiGuessInput.value);
        if (!normalizedPhrase) {
            setWikiInfoMessage("Entre au moins un mot ou une proposition de titre.", "warning");
            return;
        }

        const { revealedCount: revealedBefore } = getWikiStats();
        const titleStatsBefore = getWikiTitleStats();
        let matchedWords = 0;
        let relatedWords = 0;

        guessWords.forEach((word) => {
            const normalizedWord = normalizeWikiWord(word);
            if (!normalizedWord) {
                return;
            }

            wikiState.attemptedWords.add(normalizedWord);
            if (wikiState.availableWords.has(normalizedWord) && !wikiState.revealedWords.has(normalizedWord)) {
                wikiState.revealedWords.add(normalizedWord);
                matchedWords += 1;
                return;
            }

            relatedWords += registerRelatedTitleGuess(normalizedWord);
        });

        if (normalizedPhrase === normalizeWikiPhrase(wikiState.title)) {
            wikiState.isSolved = true;
            wikiState.titleTokens
                .filter(isWikiWordToken)
                .forEach((token) => wikiState.revealedWords.add(normalizeWikiWord(token)));
        }

        wikiGuessInput.value = "";
        renderWikiText();

        const { totalWords, revealedCount } = getWikiStats();
        const titleStatsAfter = getWikiTitleStats();
        const revealedNow = revealedCount - revealedBefore;
        const revealedTitleNow = titleStatsAfter.revealedCount - titleStatsBefore.revealedCount;

        if (wikiState.isSolved || (titleStatsAfter.revealedCount === titleStatsAfter.totalWords && titleStatsAfter.totalWords > 0)) {
            wikiState.isSolved = true;
            revealWikiAnswer();
            setWikiInfoMessage(`Bravo, tu as trouve le titre : "${wikiState.title}".`, "success");
            return;
        }

        if (matchedWords > 0) {
            const parts = [];
            if (revealedTitleNow > 0) {
                parts.push(`${revealedTitleNow} mot(s) reveles dans le titre`);
            }
            if (revealedNow > 0) {
                parts.push(`${revealedNow} mot(s) reveles dans le texte`);
            }
            if (relatedWords > 0) {
                parts.push(`${relatedWords} mot(s) proches du titre`);
            }

            setWikiInfoMessage(`${parts.join(" et ")}. Continue.`, "success");
            return;
        }

        if (relatedWords > 0) {
            setWikiInfoMessage(`${relatedWords} mot(s) proches du titre affiches en gris.`, "success");
            return;
        }

        setWikiInfoMessage("Aucune occurrence trouvee dans le titre ou le texte.", "warning");
    }

    function handleWikiWordHintClick(event) {
        const hiddenWordButton = event.target.closest(".wiki-word-button.is-hidden");
        if (!hiddenWordButton) {
            return;
        }

        const letterCount = hiddenWordButton.dataset.wordLength || "0";
        hiddenWordButton.textContent = letterCount;
        hiddenWordButton.classList.add("show-hint");

        if (hiddenWordButton.hintTimeoutId) {
            clearTimeout(hiddenWordButton.hintTimeoutId);
        }

        hiddenWordButton.hintTimeoutId = window.setTimeout(() => {
            hiddenWordButton.textContent = "";
            hiddenWordButton.classList.remove("show-hint");
            hiddenWordButton.hintTimeoutId = null;
        }, 2400);
    }

    function setSudokuInfoMessage(message, tone = "") {
        sudokuInfo.textContent = message;
        sudokuInfo.className = "info";
        if (tone) {
            sudokuInfo.classList.add(tone);
        }
    }

    function getSudokuRow(index) {
        return Math.floor(index / 9);
    }

    function getSudokuCol(index) {
        return index % 9;
    }

    function getSudokuBox(index) {
        return Math.floor(getSudokuRow(index) / 3) * 3 + Math.floor(getSudokuCol(index) / 3);
    }

    function isSudokuPeer(firstIndex, secondIndex) {
        return (
            getSudokuRow(firstIndex) === getSudokuRow(secondIndex) ||
            getSudokuCol(firstIndex) === getSudokuCol(secondIndex) ||
            getSudokuBox(firstIndex) === getSudokuBox(secondIndex)
        );
    }

    function generateSudokuSolution() {
        const base = 3;
        const side = base * base;
        const groups = [0, 1, 2];
        const numbers = shuffleValues([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const rows = shuffleValues(groups).flatMap((group) =>
            shuffleValues(groups).map((value) => group * base + value)
        );
        const cols = shuffleValues(groups).flatMap((group) =>
            shuffleValues(groups).map((value) => group * base + value)
        );

        return rows.flatMap((row) =>
            cols.map((col) => numbers[(base * (row % base) + Math.floor(row / base) + col) % side])
        );
    }

    function createSudokuPuzzleFromSolution(solution, difficulty) {
        const clueTargets = {
            easy: 40,
            medium: 33,
            hard: 28
        };

        const puzzle = [...solution];
        const positions = shuffleValues(Array.from({ length: 81 }, (_, index) => index));
        const rowCounts = new Array(9).fill(9);
        const colCounts = new Array(9).fill(9);
        const boxCounts = new Array(9).fill(9);
        const targetClues = clueTargets[difficulty] || clueTargets.easy;
        let clueCount = 81;

        for (const index of positions) {
            if (clueCount <= targetClues) {
                break;
            }

            const row = getSudokuRow(index);
            const col = getSudokuCol(index);
            const box = getSudokuBox(index);

            if (rowCounts[row] <= 3 || colCounts[col] <= 3 || boxCounts[box] <= 3) {
                continue;
            }

            puzzle[index] = 0;
            rowCounts[row] -= 1;
            colCounts[col] -= 1;
            boxCounts[box] -= 1;
            clueCount -= 1;
        }

        return puzzle;
    }

    function createSudokuCell(index) {
        const cell = document.createElement("button");
        const row = getSudokuRow(index);
        const col = getSudokuCol(index);

        cell.type = "button";
        cell.className = "sudoku-cell";
        cell.dataset.index = String(index);
        cell.setAttribute("aria-label", `Case Sudoku ${row + 1}, ${col + 1}`);
        cell.style.borderTop = row % 3 === 0 ? "3px solid rgba(35, 22, 13, 0.36)" : "1px solid rgba(35, 22, 13, 0.08)";
        cell.style.borderRight = col === 8 ? "3px solid rgba(35, 22, 13, 0.36)" : col % 3 === 2 ? "3px solid rgba(35, 22, 13, 0.36)" : "1px solid rgba(35, 22, 13, 0.08)";
        cell.style.borderBottom = row === 8 ? "3px solid rgba(35, 22, 13, 0.36)" : row % 3 === 2 ? "3px solid rgba(35, 22, 13, 0.36)" : "1px solid rgba(35, 22, 13, 0.08)";
        cell.style.borderLeft = col % 3 === 0 ? "3px solid rgba(35, 22, 13, 0.36)" : "1px solid rgba(35, 22, 13, 0.08)";
        cell.addEventListener("click", () => handleSudokuCellClick(index));
        return cell;
    }

    function buildSudokuBoard() {
        sudokuBoard.innerHTML = "";
        for (let index = 0; index < 81; index += 1) {
            sudokuBoard.appendChild(createSudokuCell(index));
        }
    }

    function buildSudokuNumberPad() {
        const buttonsMarkup = Array.from({ length: 9 }, (_, index) => index + 1).map((value) => `
            <button class="sudoku-pad-button" type="button" data-sudoku-digit="${value}">${value}</button>
        `).join("");

        sudokuNumberPad.innerHTML = `
            ${buttonsMarkup}
            <button class="sudoku-pad-button is-secondary" type="button" data-sudoku-action="erase">Effacer</button>
            <button class="sudoku-pad-button is-secondary" type="button" data-sudoku-action="clear-notes">Effacer notes</button>
        `;
    }

    function setSudokuSelectionMessage() {
        if (sudokuState.selectedIndex === null) {
            sudokuSelectionInfo.textContent = "Selectionne une case vide pour commencer.";
            return;
        }

        const row = getSudokuRow(sudokuState.selectedIndex) + 1;
        const col = getSudokuCol(sudokuState.selectedIndex) + 1;

        if (sudokuState.fixedCells.has(sudokuState.selectedIndex)) {
            sudokuSelectionInfo.textContent = `Case ${row}, ${col} : indice fixe de depart.`;
            return;
        }

        const modeLabel = sudokuState.noteMode ? "Mode notes actif." : "Mode chiffres actif.";
        sudokuSelectionInfo.textContent = `Case ${row}, ${col}. ${modeLabel}`;
    }

    function getSudokuAnalysis() {
        const conflictCells = new Set();

        function markDuplicates(indexes) {
            const groups = new Map();

            indexes.forEach((index) => {
                const value = sudokuState.values[index];
                if (value === 0) {
                    return;
                }

                if (!groups.has(value)) {
                    groups.set(value, []);
                }

                groups.get(value).push(index);
            });

            groups.forEach((groupIndexes) => {
                if (groupIndexes.length > 1) {
                    groupIndexes.forEach((index) => conflictCells.add(index));
                }
            });
        }

        for (let row = 0; row < 9; row += 1) {
            markDuplicates(Array.from({ length: 9 }, (_, col) => row * 9 + col));
        }

        for (let col = 0; col < 9; col += 1) {
            markDuplicates(Array.from({ length: 9 }, (_, row) => row * 9 + col));
        }

        for (let box = 0; box < 9; box += 1) {
            const startRow = Math.floor(box / 3) * 3;
            const startCol = (box % 3) * 3;
            const indexes = [];

            for (let row = 0; row < 3; row += 1) {
                for (let col = 0; col < 3; col += 1) {
                    indexes.push((startRow + row) * 9 + startCol + col);
                }
            }

            markDuplicates(indexes);
        }

        sudokuState.values.forEach((value, index) => {
            if (value !== 0 && sudokuState.solution[index] && value !== sudokuState.solution[index]) {
                conflictCells.add(index);
            }
        });

        const filledCount = sudokuState.values.filter((value) => value !== 0).length;
        const isSolved = filledCount === 81 && conflictCells.size === 0;

        return {
            filledCount,
            conflictCells,
            isSolved
        };
    }

    function getSudokuSelectedValue() {
        if (sudokuState.selectedIndex === null) {
            return 0;
        }

        return sudokuState.values[sudokuState.selectedIndex];
    }

    function getSudokuPossibleValues(index) {
        if (index === null || sudokuState.fixedCells.has(index) || sudokuState.values[index] !== 0) {
            return [];
        }

        const unavailableValues = new Set();

        sudokuState.values.forEach((value, valueIndex) => {
            if (value === 0 || valueIndex === index) {
                return;
            }

            if (isSudokuPeer(index, valueIndex)) {
                unavailableValues.add(value);
            }
        });

        return Array.from({ length: 9 }, (_, offset) => offset + 1).filter((value) => !unavailableValues.has(value));
    }

    function renderSudokuCandidates() {
        const possibleValues = getSudokuPossibleValues(sudokuState.selectedIndex);

        if (possibleValues.length === 0) {
            sudokuCandidates.innerHTML = `
                <p class="sudoku-candidates-label">Possibilites</p>
                <p class="sudoku-candidates-empty">Selectionne une case vide pour afficher les chiffres suggeres.</p>
            `;
            return;
        }

        const buttonsMarkup = possibleValues.map((value) => `
            <button class="sudoku-candidate-button" type="button" data-sudoku-digit="${value}">${value}</button>
        `).join("");

        sudokuCandidates.innerHTML = `
            <p class="sudoku-candidates-label">Possibilites pour cette case</p>
            <div class="sudoku-candidate-list">${buttonsMarkup}</div>
        `;
    }

    function renderSudokuStats(analysis) {
        sudokuFilledCount.textContent = `${analysis.filledCount} / 81`;
        sudokuModeState.textContent = sudokuState.noteMode ? "Notes" : "Chiffres";
        sudokuHintCount.textContent = String(sudokuState.hintCount);
        toggleSudokuNotesButton.textContent = `Mode notes : ${sudokuState.noteMode ? "oui" : "non"}`;
        toggleSudokuNotesButton.classList.toggle("is-active", sudokuState.noteMode);
    }

    function renderSudokuBoard() {
        if (sudokuState.values.length === 0) {
            sudokuBoard.innerHTML = "";
            return;
        }

        if (sudokuBoard.children.length !== 81) {
            buildSudokuBoard();
        }

        const analysis = getSudokuAnalysis();
        const selectedValue = getSudokuSelectedValue();

        sudokuBoard.querySelectorAll(".sudoku-cell").forEach((cell, index) => {
            const value = sudokuState.values[index];
            const notes = sudokuState.notes[index];
            const isSelected = sudokuState.selectedIndex === index;
            const isPeer = sudokuState.selectedIndex !== null && !isSelected && isSudokuPeer(index, sudokuState.selectedIndex);
            const isSameValue = selectedValue !== 0 && value !== 0 && selectedValue === value && !isSelected;

            cell.classList.toggle("is-fixed", sudokuState.fixedCells.has(index));
            cell.classList.toggle("is-selected", isSelected);
            cell.classList.toggle("is-peer", isPeer);
            cell.classList.toggle("is-same-value", isSameValue);
            cell.classList.toggle("is-empty", value === 0);

            if (value !== 0) {
                cell.innerHTML = `<span class="sudoku-value">${value}</span>`;
                return;
            }

            const notesMarkup = Array.from({ length: 9 }, (_, noteIndex) => {
                const noteValue = noteIndex + 1;
                return `<span class="sudoku-note">${notes.has(noteValue) ? noteValue : ""}</span>`;
            }).join("");

            cell.innerHTML = `<span class="sudoku-notes">${notesMarkup}</span>`;
        });

        renderSudokuStats(analysis);
        renderSudokuCandidates();
        setSudokuSelectionMessage();

        if (analysis.isSolved) {
            sudokuState.gameOver = true;
            setSudokuInfoMessage("Bravo ! La grille est complete et correcte.", "success");
            return;
        }

        sudokuState.gameOver = false;
        if (sudokuState.noteMode) {
            setSudokuInfoMessage("Mode notes actif. Les chiffres sont ajoutes en petit dans les cases vides.");
            return;
        }

        setSudokuInfoMessage("Choisis une case, puis utilise le pavé, le clavier ou les suggestions.");
    }

    function clearSudokuPeerNotes(index, value) {
        sudokuState.notes.forEach((noteSet, noteIndex) => {
            if (!isSudokuPeer(index, noteIndex) || noteIndex === index) {
                return;
            }

            noteSet.delete(value);
        });
    }

    function applySudokuDigit(value) {
        if (sudokuState.selectedIndex === null) {
            setSudokuInfoMessage("Selectionne d'abord une case.", "warning");
            return;
        }

        if (sudokuState.fixedCells.has(sudokuState.selectedIndex)) {
            setSudokuInfoMessage("Cette case fait partie des indices de depart.", "warning");
            return;
        }

        if (sudokuState.gameOver) {
            return;
        }

        if (sudokuState.noteMode && sudokuState.values[sudokuState.selectedIndex] === 0) {
            const noteSet = sudokuState.notes[sudokuState.selectedIndex];
            if (noteSet.has(value)) {
                noteSet.delete(value);
            } else {
                noteSet.add(value);
            }

            renderSudokuBoard();
            return;
        }

        sudokuState.values[sudokuState.selectedIndex] = value;
        sudokuState.notes[sudokuState.selectedIndex].clear();
        clearSudokuPeerNotes(sudokuState.selectedIndex, value);
        renderSudokuBoard();
    }

    function eraseSudokuCell(clearNotesOnly = false) {
        if (sudokuState.selectedIndex === null) {
            setSudokuInfoMessage("Selectionne une case a vider.", "warning");
            return;
        }

        if (sudokuState.fixedCells.has(sudokuState.selectedIndex)) {
            setSudokuInfoMessage("Impossible de modifier un indice de depart.", "warning");
            return;
        }

        if (clearNotesOnly) {
            sudokuState.notes[sudokuState.selectedIndex].clear();
        } else {
            sudokuState.values[sudokuState.selectedIndex] = 0;
            sudokuState.notes[sudokuState.selectedIndex].clear();
        }

        renderSudokuBoard();
    }

    function useSudokuHint() {
        if (sudokuState.gameOver || sudokuState.solution.length === 0) {
            return;
        }

        let targetIndex = sudokuState.selectedIndex;

        if (
            targetIndex === null ||
            sudokuState.fixedCells.has(targetIndex) ||
            sudokuState.values[targetIndex] === sudokuState.solution[targetIndex]
        ) {
            targetIndex = sudokuState.values.findIndex((value, index) => value !== sudokuState.solution[index]);
        }

        if (targetIndex === -1 || targetIndex === null) {
            setSudokuInfoMessage("Il n'y a plus d'indice utile a donner.", "success");
            return;
        }

        sudokuState.selectedIndex = targetIndex;
        sudokuState.values[targetIndex] = sudokuState.solution[targetIndex];
        sudokuState.notes[targetIndex].clear();
        clearSudokuPeerNotes(targetIndex, sudokuState.solution[targetIndex]);
        sudokuState.hintCount += 1;
        renderSudokuBoard();
        setSudokuInfoMessage("Indice place dans la grille.", "success");
    }

    function handleSudokuCellClick(index) {
        sudokuState.selectedIndex = index;
        renderSudokuBoard();
    }

    function handleSudokuPadClick(event) {
        const button = event.target.closest("[data-sudoku-digit], [data-sudoku-action]");
        if (!button) {
            return;
        }

        if (button.dataset.sudokuDigit) {
            applySudokuDigit(Number.parseInt(button.dataset.sudokuDigit, 10));
            return;
        }

        if (button.dataset.sudokuAction === "erase") {
            eraseSudokuCell();
            return;
        }

        if (button.dataset.sudokuAction === "clear-notes") {
            eraseSudokuCell(true);
        }
    }

    function moveSudokuSelection(rowOffset, colOffset) {
        const currentIndex = sudokuState.selectedIndex ?? 0;
        const nextRow = Math.max(0, Math.min(8, getSudokuRow(currentIndex) + rowOffset));
        const nextCol = Math.max(0, Math.min(8, getSudokuCol(currentIndex) + colOffset));
        sudokuState.selectedIndex = nextRow * 9 + nextCol;
        renderSudokuBoard();
    }

    function handleSudokuKeydown(event) {
        if (sudokuGame.classList.contains("hidden")) {
            return;
        }

        const activeElement = document.activeElement;
        if (
            activeElement &&
            (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)
        ) {
            return;
        }

        if (/^[1-9]$/.test(event.key)) {
            event.preventDefault();
            applySudokuDigit(Number.parseInt(event.key, 10));
            return;
        }

        if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") {
            event.preventDefault();
            eraseSudokuCell();
            return;
        }

        if (event.key.toLowerCase() === "n") {
            event.preventDefault();
            sudokuState.noteMode = !sudokuState.noteMode;
            renderSudokuBoard();
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            moveSudokuSelection(-1, 0);
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            moveSudokuSelection(1, 0);
            return;
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            moveSudokuSelection(0, -1);
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            moveSudokuSelection(0, 1);
        }
    }

    function initializeSudokuGame(forceNew = false) {
        const nextDifficulty = sudokuDifficultySelect.value;

        if (!forceNew && sudokuState.puzzle.length > 0 && sudokuState.difficulty === nextDifficulty) {
            renderSudokuBoard();
            return;
        }

        sudokuState.difficulty = nextDifficulty;
        sudokuState.solution = generateSudokuSolution();
        sudokuState.puzzle = createSudokuPuzzleFromSolution(sudokuState.solution, sudokuState.difficulty);
        sudokuState.values = [...sudokuState.puzzle];
        sudokuState.fixedCells = new Set(
            sudokuState.puzzle
                .map((value, index) => value !== 0 ? index : -1)
                .filter((index) => index !== -1)
        );
        sudokuState.notes = Array.from({ length: 81 }, () => new Set());
        sudokuState.selectedIndex = sudokuState.values.findIndex((value) => value === 0);
        if (sudokuState.selectedIndex === -1) {
            sudokuState.selectedIndex = null;
        }
        sudokuState.noteMode = false;
        sudokuState.hintCount = 0;
        sudokuState.gameOver = false;

        if (sudokuNumberPad.children.length === 0) {
            buildSudokuNumberPad();
        }

        buildSudokuBoard();
        renderSudokuBoard();
        setSudokuInfoMessage("Nouvelle grille prete. Selectionne une case vide pour commencer.");
    }

    function getPuzzleBestTime() {
        return Number.parseInt(localStorage.getItem(`minigamez_shape_puzzle_bestTime_${puzzleState.size}`) || "", 10);
    }

    function setPuzzleBestTime(seconds) {
        localStorage.setItem(`minigamez_shape_puzzle_bestTime_${puzzleState.size}`, String(seconds));
    }

    function formatPuzzleTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function getPuzzleBoardMetrics() {
        const profiles = {
            3: {
                width: 760,
                height: 636,
                targetX: 42,
                targetY: 34,
                pieceSize: 124,
                tabSize: 20,
                trays: [
                    { x: 458, y: 28, width: 270, height: 226, label: "Reserve" },
                    { x: 34, y: 450, width: 694, height: 146, label: "Table de tri" }
                ]
            },
            4: {
                width: 760,
                height: 650,
                targetX: 54,
                targetY: 40,
                pieceSize: 94,
                tabSize: 16,
                trays: [
                    { x: 458, y: 26, width: 270, height: 270, label: "Reserve" },
                    { x: 34, y: 450, width: 694, height: 160, label: "Table de tri" }
                ]
            },
            5: {
                width: 760,
                height: 684,
                targetX: 64,
                targetY: 46,
                pieceSize: 74,
                tabSize: 12,
                trays: [
                    { x: 456, y: 24, width: 272, height: 316, label: "Reserve" },
                    { x: 34, y: 432, width: 694, height: 212, label: "Table de tri" }
                ]
            }
        };
        const profile = profiles[puzzleState.size] || profiles[3];
        return {
            ...profile,
            targetSize: profile.pieceSize * puzzleState.size
        };
    }

    function resolvePuzzleArtworkSelection(allowRandomRefresh = false) {
        const artworkIds = Object.keys(puzzleArtworkCatalog);
        const requestedArtworkId = puzzleArtworkSelect.value;

        if (requestedArtworkId !== "random" && puzzleArtworkCatalog[requestedArtworkId]) {
            return requestedArtworkId;
        }

        if (!allowRandomRefresh && puzzleArtworkCatalog[puzzleState.artworkId]) {
            return puzzleState.artworkId;
        }

        return artworkIds[Math.floor(Math.random() * artworkIds.length)];
    }

    function getPuzzleArtworkUrl() {
        const cacheKey = `${puzzleState.artworkId}-${puzzleState.size}`;
        if (puzzleState.artworkCache.has(cacheKey)) {
            return puzzleState.artworkCache.get(cacheKey);
        }

        const metrics = getPuzzleBoardMetrics();
        const targetSize = metrics.targetSize;
        const artworkConfig = puzzleArtworkCatalog[puzzleState.artworkId] || puzzleArtworkCatalog.bubbles;
        const detailCount = 10 + puzzleState.size * 3;
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${targetSize}" height="${targetSize}" viewBox="0 0 ${targetSize} ${targetSize}">
                ${artworkConfig.render(targetSize, detailCount)}
            </svg>
        `;

        const artworkUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
        puzzleState.artworkCache.set(cacheKey, artworkUrl);
        return artworkUrl;
    }

    function buildPuzzleHorizontalEdge(startX, endX, y, edgeValue, normalDirection, tabSize) {
        if (edgeValue === 0) {
            return `L ${endX} ${y}`;
        }

        const step = Math.sign(endX - startX) || 1;
        const middleX = (startX + endX) / 2;
        const offsetY = edgeValue * normalDirection * tabSize;
        const beforeX = middleX - step * tabSize * 1.1;
        const afterX = middleX + step * tabSize * 1.1;

        return [
            `L ${beforeX} ${y}`,
            `C ${middleX - step * tabSize * 0.7} ${y} ${middleX - step * tabSize * 0.9} ${y + offsetY} ${middleX} ${y + offsetY}`,
            `C ${middleX + step * tabSize * 0.9} ${y + offsetY} ${middleX + step * tabSize * 0.7} ${y} ${afterX} ${y}`,
            `L ${endX} ${y}`
        ].join(" ");
    }

    function buildPuzzleVerticalEdge(x, startY, endY, edgeValue, normalDirection, tabSize) {
        if (edgeValue === 0) {
            return `L ${x} ${endY}`;
        }

        const step = Math.sign(endY - startY) || 1;
        const middleY = (startY + endY) / 2;
        const offsetX = edgeValue * normalDirection * tabSize;
        const beforeY = middleY - step * tabSize * 1.1;
        const afterY = middleY + step * tabSize * 1.1;

        return [
            `L ${x} ${beforeY}`,
            `C ${x} ${middleY - step * tabSize * 0.7} ${x + offsetX} ${middleY - step * tabSize * 0.9} ${x + offsetX} ${middleY}`,
            `C ${x + offsetX} ${middleY + step * tabSize * 0.9} ${x} ${middleY + step * tabSize * 0.7} ${x} ${afterY}`,
            `L ${x} ${endY}`
        ].join(" ");
    }

    function buildPuzzlePiecePath(pieceSize, tabSize, edges, leftInset, topInset) {
        const startX = leftInset;
        const startY = topInset;
        const endX = startX + pieceSize;
        const endY = startY + pieceSize;

        return [
            `M ${startX} ${startY}`,
            buildPuzzleHorizontalEdge(startX, endX, startY, edges.top, -1, tabSize),
            buildPuzzleVerticalEdge(endX, startY, endY, edges.right, 1, tabSize),
            buildPuzzleHorizontalEdge(endX, startX, endY, edges.bottom, 1, tabSize),
            buildPuzzleVerticalEdge(startX, endY, startY, edges.left, -1, tabSize),
            "Z"
        ].join(" ");
    }

    function getPuzzlePieceDefinitions() {
        const metrics = getPuzzleBoardMetrics();
        const size = puzzleState.size;
        const edgeGrid = [];

        for (let rowIndex = 0; rowIndex < size; rowIndex += 1) {
            const rowEdges = [];
            for (let colIndex = 0; colIndex < size; colIndex += 1) {
                const top = rowIndex === 0 ? 0 : -edgeGrid[rowIndex - 1][colIndex].bottom;
                const left = colIndex === 0 ? 0 : -rowEdges[colIndex - 1].right;
                const right = colIndex === size - 1 ? 0 : ((rowIndex + colIndex) % 2 === 0 ? 1 : -1);
                const bottom = rowIndex === size - 1 ? 0 : ((rowIndex * 3 + colIndex) % 2 === 0 ? -1 : 1);
                rowEdges.push({ top, right, bottom, left });
            }
            edgeGrid.push(rowEdges);
        }

        return edgeGrid.flatMap((rowEdges, rowIndex) => rowEdges.map((edges, colIndex) => {
            const leftInset = edges.left === 1 ? metrics.tabSize : 0;
            const topInset = edges.top === 1 ? metrics.tabSize : 0;
            const rightInset = edges.right === 1 ? metrics.tabSize : 0;
            const bottomInset = edges.bottom === 1 ? metrics.tabSize : 0;
            const correctX = metrics.targetX + colIndex * metrics.pieceSize - leftInset;
            const correctY = metrics.targetY + rowIndex * metrics.pieceSize - topInset;
            const width = metrics.pieceSize + leftInset + rightInset;
            const height = metrics.pieceSize + topInset + bottomInset;

            return {
                id: `piece-${rowIndex}-${colIndex}`,
                width,
                height,
                correctX,
                correctY,
                backgroundOffsetX: -(correctX - metrics.targetX),
                backgroundOffsetY: -(correctY - metrics.targetY),
                path: buildPuzzlePiecePath(metrics.pieceSize, metrics.tabSize, edges, leftInset, topInset)
            };
        }));
    }

    function getPuzzleTraySpots() {
        const metrics = getPuzzleBoardMetrics();
        const spots = [];
        const padding = 18;
        const cellWidth = metrics.pieceSize * 0.74;
        const cellHeight = metrics.pieceSize * 0.72;

        metrics.trays.forEach((tray, trayIndex) => {
            const usableWidth = Math.max(cellWidth, tray.width - padding * 2);
            const usableHeight = Math.max(cellHeight, tray.height - padding * 2 - (trayIndex === 0 ? 18 : 0));
            const columnCount = Math.max(1, Math.floor(usableWidth / cellWidth));
            const rowCount = Math.max(1, Math.floor(usableHeight / cellHeight));
            const stepX = columnCount > 1 ? (usableWidth - cellWidth) / (columnCount - 1) : 0;
            const stepY = rowCount > 1 ? (usableHeight - cellHeight) / (rowCount - 1) : 0;

            for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
                for (let colIndex = 0; colIndex < columnCount; colIndex += 1) {
                    const x = tray.x + padding + colIndex * stepX;
                    const y = tray.y + padding + (trayIndex === 0 ? 28 : 0) + rowIndex * stepY;
                    const rotationSeed = (trayIndex * 7 + rowIndex * 3 + colIndex * 5) % 9;
                    spots.push({
                        x,
                        y,
                        rotation: -10 + rotationSeed * 2.5
                    });
                }
            }
        });

        return spots;
    }

    function setPuzzleInfoMessage(message, tone = "") {
        puzzleInfo.textContent = message;
        puzzleInfo.className = "info";
        if (tone) {
            puzzleInfo.classList.add(tone);
        }
    }

    function updatePuzzleStats() {
        const bestTime = getPuzzleBestTime();
        const totalPieces = getPuzzlePieceDefinitions().length;
        puzzleMoveCount.textContent = `${puzzleState.placedCount} / ${totalPieces}`;
        puzzleElapsedTime.textContent = formatPuzzleTime(puzzleState.elapsedSeconds);
        puzzleBestTime.textContent = Number.isFinite(bestTime) ? formatPuzzleTime(bestTime) : "-";
        togglePuzzleHelpButton.textContent = `Silhouette aide : ${puzzleState.helpMode ? "oui" : "non"}`;
        togglePuzzleHelpButton.classList.toggle("is-active", puzzleState.helpMode);
    }

    function stopPuzzleTimer() {
        if (puzzleState.timerId !== null) {
            window.clearInterval(puzzleState.timerId);
            puzzleState.timerId = null;
        }
    }

    function startPuzzleTimer() {
        stopPuzzleTimer();
        if (puzzleState.gameOver) {
            return;
        }

        puzzleState.startedAt = Date.now() - puzzleState.elapsedSeconds * 1000;
        puzzleState.timerId = window.setInterval(() => {
            puzzleState.elapsedSeconds = Math.floor((Date.now() - puzzleState.startedAt) / 1000);
            updatePuzzleStats();
        }, 1000);
    }

    function shufflePuzzleArray(items) {
        const nextItems = [...items];
        for (let index = nextItems.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
        }
        return nextItems;
    }

    function createPuzzlePieces() {
        const definitions = getPuzzlePieceDefinitions();
        const traySpots = shufflePuzzleArray(getPuzzleTraySpots());
        const { width, height } = getPuzzleBoardMetrics();

        puzzleState.pieces = definitions.map((pieceDefinition, index) => ({
            ...(traySpots[index] || traySpots[index % traySpots.length]),
            ...pieceDefinition,
            x: Math.max(12, Math.min(width - pieceDefinition.width - 12, (traySpots[index] || traySpots[index % traySpots.length]).x)),
            y: Math.max(12, Math.min(height - pieceDefinition.height - 12, (traySpots[index] || traySpots[index % traySpots.length]).y)),
            rotation: (traySpots[index] || traySpots[index % traySpots.length]).rotation,
            snapped: false,
            zIndex: index + 1
        }));
        puzzleState.placedCount = 0;
        puzzleState.activePieceId = "";
    }

    function getPuzzlePieceById(pieceId) {
        return puzzleState.pieces.find((piece) => piece.id === pieceId) || null;
    }

    function getPuzzleBoardPoint(pointerEvent) {
        const boardRect = puzzleBoard.getBoundingClientRect();
        const scaleX = puzzleBoard.offsetWidth / boardRect.width || 1;
        const scaleY = puzzleBoard.offsetHeight / boardRect.height || 1;

        return {
            x: (pointerEvent.clientX - boardRect.left) * scaleX,
            y: (pointerEvent.clientY - boardRect.top) * scaleY
        };
    }

    function buildPuzzleBoard() {
        const { width, height } = getPuzzleBoardMetrics();
        puzzleBoard.style.width = `${width}px`;
        puzzleBoard.style.height = `${height}px`;
        puzzleBoard.dataset.puzzleSize = String(puzzleState.size);
    }

    function renderPuzzleBoard() {
        const totalPieces = getPuzzlePieceDefinitions().length;
        const metrics = getPuzzleBoardMetrics();
        const artworkUrl = getPuzzleArtworkUrl();
        puzzleBoard.classList.toggle("show-help", puzzleState.helpMode);
        puzzleBoard.innerHTML = "";

        const stage = document.createElement("div");
        stage.className = "puzzle-stage";
        stage.style.left = `${metrics.targetX - 14}px`;
        stage.style.top = `${metrics.targetY - 14}px`;
        stage.style.width = `${metrics.targetSize + 28}px`;
        stage.style.height = `${metrics.targetSize + 28}px`;

        const artwork = document.createElement("div");
        artwork.className = "puzzle-stage-artwork";
        artwork.style.left = `${metrics.targetX}px`;
        artwork.style.top = `${metrics.targetY}px`;
        artwork.style.width = `${metrics.targetSize}px`;
        artwork.style.height = `${metrics.targetSize}px`;
        artwork.style.backgroundImage = `url("${artworkUrl}")`;

        const previewLayer = document.createElement("div");
        previewLayer.className = "puzzle-preview-layer";

        puzzleState.pieces.forEach((piece) => {
            const slot = document.createElement("div");
            slot.className = "puzzle-slot";
            slot.style.width = `${piece.width}px`;
            slot.style.height = `${piece.height}px`;
            slot.style.left = `${piece.correctX}px`;
            slot.style.top = `${piece.correctY}px`;
            slot.style.clipPath = `path("${piece.path}")`;
            slot.style.backgroundImage = `url("${artworkUrl}")`;
            slot.style.backgroundSize = `${metrics.targetSize}px ${metrics.targetSize}px`;
            slot.style.backgroundPosition = `${piece.backgroundOffsetX}px ${piece.backgroundOffsetY}px`;
            previewLayer.appendChild(slot);
        });

        const pieceLayer = document.createElement("div");
        pieceLayer.className = "puzzle-piece-layer";

        const trays = metrics.trays.map((trayConfig, trayIndex) => {
            const tray = document.createElement("div");
            tray.className = "puzzle-tray";
            tray.style.left = `${trayConfig.x}px`;
            tray.style.top = `${trayConfig.y}px`;
            tray.style.width = `${trayConfig.width}px`;
            tray.style.height = `${trayConfig.height}px`;

            const trayTitle = document.createElement("p");
            trayTitle.className = "puzzle-tray-label";
            trayTitle.textContent = puzzleState.placedCount === totalPieces && trayIndex === 0
                ? "Dessin reconstruit"
                : trayConfig.label;
            tray.appendChild(trayTitle);
            return tray;
        });

        puzzleState.pieces.forEach((piece) => {
            const pieceButton = document.createElement("button");
            pieceButton.type = "button";
            pieceButton.className = "puzzle-piece";
            pieceButton.dataset.puzzlePiece = piece.id;
            pieceButton.classList.toggle("is-snapped", piece.snapped);
            pieceButton.style.width = `${piece.width}px`;
            pieceButton.style.height = `${piece.height}px`;
            pieceButton.style.left = `${piece.x}px`;
            pieceButton.style.top = `${piece.y}px`;
            pieceButton.style.clipPath = `path("${piece.path}")`;
            pieceButton.style.backgroundImage = `url("${artworkUrl}")`;
            pieceButton.style.backgroundSize = `${metrics.targetSize}px ${metrics.targetSize}px`;
            pieceButton.style.backgroundPosition = `${piece.backgroundOffsetX}px ${piece.backgroundOffsetY}px`;
            pieceButton.style.setProperty("--piece-rotation", `${piece.snapped ? 0 : piece.rotation}deg`);
            pieceButton.style.zIndex = String(piece.snapped ? 4 : piece.zIndex);
            pieceButton.setAttribute("aria-label", `Piece ${piece.id}`);
            pieceLayer.appendChild(pieceButton);
        });

        puzzleBoard.append(stage, artwork, previewLayer, ...trays, pieceLayer);
        updatePuzzleStats();
    }

    function finishPuzzleGame() {
        puzzleState.gameOver = true;
        stopPuzzleTimer();

        const bestTime = getPuzzleBestTime();
        if (!Number.isFinite(bestTime) || puzzleState.elapsedSeconds < bestTime) {
            setPuzzleBestTime(puzzleState.elapsedSeconds);
        }

        renderPuzzleBoard();
        setPuzzleInfoMessage(`Bravo, ${puzzleState.artworkLabel.toLowerCase()} est reconstruit en ${formatPuzzleTime(puzzleState.elapsedSeconds)}.`, "success");
    }

    function initializePuzzleGame(forceNew = false) {
        const requestedSize = Number.parseInt(puzzleSizeSelect.value, 10) || 3;
        const sizeChanged = requestedSize !== puzzleState.size;
        const requestedArtworkChoice = puzzleArtworkSelect.value;
        const artworkChanged = requestedArtworkChoice !== "random" && requestedArtworkChoice !== puzzleState.artworkId;
        puzzleState.size = requestedSize;

        if (!forceNew && !sizeChanged && !artworkChanged && puzzleState.pieces.length > 0) {
            buildPuzzleBoard();
            renderPuzzleBoard();
            if (!puzzleState.gameOver) {
                startPuzzleTimer();
            }
            return;
        }

        const resolvedArtworkId = resolvePuzzleArtworkSelection(forceNew && requestedArtworkChoice === "random");
        const resolvedArtwork = puzzleArtworkCatalog[resolvedArtworkId] || puzzleArtworkCatalog.bubbles;
        puzzleState.artworkId = resolvedArtworkId;
        puzzleState.artworkLabel = resolvedArtwork.label;
        puzzleState.elapsedSeconds = 0;
        puzzleState.gameOver = false;
        puzzleState.helpMode = false;
        createPuzzlePieces();
        buildPuzzleBoard();
        renderPuzzleBoard();
        startPuzzleTimer();
        setPuzzleInfoMessage(`Glisse les pieces des reserves vers ${puzzleState.artworkLabel.toLowerCase()} en ${puzzleState.size} x ${puzzleState.size}.`);
    }

    function handlePuzzlePointerDown(event) {
        const pieceButton = event.target.closest("[data-puzzle-piece]");
        if (!pieceButton || puzzleGame.classList.contains("hidden") || puzzleState.gameOver) {
            return;
        }

        const piece = getPuzzlePieceById(pieceButton.dataset.puzzlePiece);
        if (!piece || piece.snapped) {
            return;
        }

        piece.zIndex = Math.max(...puzzleState.pieces.map((currentPiece) => currentPiece.zIndex)) + 1;
        const pointerPoint = getPuzzleBoardPoint(event);
        puzzleState.activePieceId = piece.id;
        puzzleState.dragOffsetX = pointerPoint.x - piece.x;
        puzzleState.dragOffsetY = pointerPoint.y - piece.y;
        pieceButton.classList.add("is-dragging");
        pieceButton.style.zIndex = "30";
        event.preventDefault();
    }

    function handlePuzzlePointerMove(event) {
        if (!puzzleState.activePieceId) {
            return;
        }

        const piece = getPuzzlePieceById(puzzleState.activePieceId);
        if (!piece) {
            return;
        }

        const pointerPoint = getPuzzleBoardPoint(event);
        const { width, height } = getPuzzleBoardMetrics();
        piece.x = Math.max(12, Math.min(width - piece.width - 12, pointerPoint.x - puzzleState.dragOffsetX));
        piece.y = Math.max(12, Math.min(height - piece.height - 12, pointerPoint.y - puzzleState.dragOffsetY));

        const pieceButton = puzzleBoard.querySelector(`[data-puzzle-piece="${piece.id}"]`);
        if (pieceButton) {
            pieceButton.style.left = `${piece.x}px`;
            pieceButton.style.top = `${piece.y}px`;
        }
    }

    function handlePuzzlePointerUp() {
        if (!puzzleState.activePieceId) {
            return;
        }

        const piece = getPuzzlePieceById(puzzleState.activePieceId);
        puzzleState.activePieceId = "";

        if (!piece) {
            renderPuzzleBoard();
            return;
        }

        const distance = Math.hypot(piece.x - piece.correctX, piece.y - piece.correctY);
        if (distance <= 34) {
            piece.x = piece.correctX;
            piece.y = piece.correctY;
            piece.rotation = 0;
            piece.snapped = true;
            puzzleState.placedCount = puzzleState.pieces.filter((currentPiece) => currentPiece.snapped).length;
            renderPuzzleBoard();

            if (puzzleState.placedCount === puzzleState.pieces.length) {
                finishPuzzleGame();
            } else {
                setPuzzleInfoMessage("Piece bien placee. Continue jusqu'a reconstituer toute l'image.", "success");
            }
            return;
        }

        renderPuzzleBoard();
    }

    function handlePuzzleKeydown(event) {
        if (puzzleGame.classList.contains("hidden")) {
            return;
        }

        const activeElement = document.activeElement;
        if (
            activeElement &&
            (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)
        ) {
            return;
        }

        if (event.key.toLowerCase() === "h") {
            event.preventDefault();
            puzzleState.helpMode = !puzzleState.helpMode;
            renderPuzzleBoard();
            return;
        }

        if (event.key.toLowerCase() === "r") {
            event.preventDefault();
            initializePuzzleGame(true);
        }
    }

    backToHomeButton.addEventListener("click", () => {
        stopPuzzleTimer();
        showScreen("home");
    });
    themeToggleButtons.forEach((button) => button.addEventListener("click", toggleTheme));
    boardSizeSelect.addEventListener("change", initializeKnightBoard);
    function normalizePetitbacText(value) {
        return value
            .normalize("NFD")
            .replace(/\p{Diacritic}/gu, "")
            .toLowerCase()
            .trim();
    }

    function capitalizePetitbacWords(value) {
        return value.replace(/(^|[\s-])(\p{L})/gu, (match, separator, letter) => separator + letter.toUpperCase());
    }

    async function queryPetitbacPagesExist(host, titles) {
        const encodedTitles = encodeURIComponent(titles.join("|"));
        const response = await fetch(
            `https://${host}/w/api.php?action=query&format=json&origin=*&redirects=1&titles=${encodedTitles}`
        );

        if (!response.ok) {
            throw new Error(`${host} n'a pas repondu correctement.`);
        }

        const payload = await response.json();
        const pages = payload.query && payload.query.pages ? payload.query.pages : {};
        return Object.values(pages).some((page) => typeof page.pageid === "number" && page.pageid > 0);
    }

    // Renvoie true (mot trouve), false (introuvable) ou null (dictionnaire injoignable).
    async function checkPetitbacWordExists(rawWord) {
        const cleanedWord = rawWord.trim().replace(/\s+/g, " ");
        const cacheKey = cleanedWord.toLowerCase();

        if (petitbacWordCache.has(cacheKey)) {
            return petitbacWordCache.get(cacheKey);
        }

        const lowerWord = cleanedWord.toLowerCase();
        const capitalizedWord = lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
        const wiktionaryTitles = [...new Set([cleanedWord, lowerWord, capitalizedWord])];
        const wikipediaTitles = [...new Set([cleanedWord, capitalizePetitbacWords(lowerWord)])];

        const lookups = await Promise.all([
            queryPetitbacPagesExist("fr.wiktionary.org", wiktionaryTitles).catch(() => null),
            queryPetitbacPagesExist("fr.wikipedia.org", wikipediaTitles).catch(() => null)
        ]);

        let verdict;
        if (lookups.includes(true)) {
            verdict = true;
        } else if (lookups.every((result) => result === false)) {
            verdict = false;
        } else {
            return null;
        }

        petitbacWordCache.set(cacheKey, verdict);
        return verdict;
    }

    function setPetitbacInfoMessage(message, tone = "") {
        petitbacInfo.textContent = message;
        petitbacInfo.className = "info";
        if (tone) {
            petitbacInfo.classList.add(tone);
        }
    }

    function getPetitbacBestScoreKey() {
        const modeSuffix = petitbacState.mode === "chain" ? "chain_" : "";
        return `minigamez_petitbac_${modeSuffix}bestScore_${petitbacDurationSelect.value}`;
    }

    function loadPetitbacBestScore() {
        const storedBest = localStorage.getItem(getPetitbacBestScoreKey());
        const unit = petitbacState.mode === "chain" ? "mots" : "pts";
        petitbacBestScoreElement.textContent = storedBest ? `${storedBest} ${unit}` : "-";
    }

    function updatePetitbacBestScore(score) {
        const storedBest = Number.parseInt(localStorage.getItem(getPetitbacBestScoreKey()) || "0", 10);
        if (score > storedBest) {
            localStorage.setItem(getPetitbacBestScoreKey(), String(score));
        }
        loadPetitbacBestScore();
    }

    function formatPetitbacTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    function stopPetitbacTimer() {
        if (petitbacState.timerId !== null) {
            clearInterval(petitbacState.timerId);
            petitbacState.timerId = null;
        }
    }

    function buildPetitbacBoard() {
        const rowsMarkup = petitbacCategories.map((category) => `
            <div class="petitbac-row" data-category="${category.id}">
                <label class="petitbac-label" for="petitbac-input-${category.id}">${escapeHtml(category.label)}</label>
                <input
                    id="petitbac-input-${category.id}"
                    class="petitbac-input"
                    type="text"
                    autocomplete="off"
                    spellcheck="false"
                    placeholder="${escapeHtml(category.placeholder)}"
                    disabled
                >
                <button class="petitbac-mark" type="button" disabled aria-label="Resultat ${escapeHtml(category.label)}"></button>
            </div>
        `).join("");

        petitbacBoard.innerHTML = rowsMarkup;

        petitbacBoard.querySelectorAll(".petitbac-input").forEach((input, index, inputs) => {
            input.addEventListener("keydown", (event) => {
                if (event.key !== "Enter") {
                    return;
                }

                event.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else if (petitbacState.phase === "running") {
                    finishPetitbacRound();
                }
            });
        });

        petitbacBoard.querySelectorAll(".petitbac-mark").forEach((markButton) => {
            markButton.addEventListener("click", handlePetitbacMarkClick);
        });
    }

    function updatePetitbacTimeDisplay() {
        petitbacTimeLeftElement.textContent = formatPetitbacTime(petitbacState.remainingSeconds);
        petitbacTimeLeftElement.classList.toggle(
            "petitbac-time-urgent",
            petitbacState.phase === "running" && petitbacState.remainingSeconds <= 10
        );
    }

    function drawPetitbacLetter() {
        return petitbacLetterPool[Math.floor(Math.random() * petitbacLetterPool.length)];
    }

    function startPetitbacCountdown(onTimeout) {
        petitbacState.timerId = setInterval(() => {
            petitbacState.remainingSeconds -= 1;
            updatePetitbacTimeDisplay();

            if (petitbacState.remainingSeconds <= 0) {
                onTimeout();
            }
        }, 1000);
    }

    function startPetitbacRound() {
        if (petitbacState.mode === "chain") {
            startPetitbacChainRound();
        } else {
            startPetitbacClassicRound();
        }
    }

    function startPetitbacClassicRound() {
        stopPetitbacTimer();

        petitbacState.letter = drawPetitbacLetter();
        petitbacState.phase = "running";
        petitbacState.roundId += 1;
        petitbacState.remainingSeconds = Number.parseInt(petitbacDurationSelect.value, 10);
        petitbacState.results.clear();
        petitbacState.roundScore = 0;

        petitbacLetterElement.textContent = petitbacState.letter;
        petitbacRoundScoreElement.textContent = "0";
        stopPetitbacRoundButton.disabled = false;
        newPetitbacRoundButton.textContent = "Relancer une manche";
        loadPetitbacBestScore();
        updatePetitbacTimeDisplay();

        petitbacBoard.querySelectorAll(".petitbac-row").forEach((row) => {
            row.classList.remove("is-valid", "is-invalid");
            const input = row.querySelector(".petitbac-input");
            const markButton = row.querySelector(".petitbac-mark");
            input.value = "";
            input.disabled = false;
            markButton.disabled = true;
            markButton.textContent = "";
            markButton.classList.remove("valid", "invalid", "is-toggleable");
        });

        const firstInput = petitbacBoard.querySelector(".petitbac-input");
        if (firstInput) {
            firstInput.focus();
        }

        setPetitbacInfoMessage(`C'est parti ! Trouve des mots qui commencent par la lettre ${petitbacState.letter}.`);

        startPetitbacCountdown(() => finishPetitbacClassicRound(true));
    }

    function evaluatePetitbacAnswer(value) {
        const normalizedAnswer = normalizePetitbacText(value);
        if (!normalizedAnswer) {
            return "empty";
        }

        return normalizedAnswer.startsWith(petitbacState.letter.toLowerCase()) ? "accepted" : "wrong-letter";
    }

    function recomputePetitbacScore() {
        let score = 0;
        petitbacState.results.forEach((result) => {
            if (result === "accepted") {
                score += 2;
            }
        });

        petitbacState.roundScore = score;
        petitbacRoundScoreElement.textContent = String(score);
    }

    function renderPetitbacMarkChecking(row) {
        const markButton = row.querySelector(".petitbac-mark");
        row.classList.remove("is-valid", "is-invalid");
        markButton.classList.remove("valid", "invalid", "is-toggleable");
        markButton.classList.add("checking");
        markButton.disabled = true;
        markButton.textContent = "verif...";
        markButton.title = "";
    }

    function renderPetitbacMark(row, result) {
        const markButton = row.querySelector(".petitbac-mark");
        const isAccepted = result === "accepted";
        const isToggleable = result === "accepted" || result === "refused" || result === "not-found";

        row.classList.toggle("is-valid", isAccepted);
        row.classList.toggle("is-invalid", !isAccepted);
        markButton.classList.remove("checking");
        markButton.classList.toggle("valid", isAccepted);
        markButton.classList.toggle("invalid", !isAccepted);
        markButton.classList.toggle("is-toggleable", isToggleable);
        markButton.disabled = !isToggleable;

        if (isAccepted) {
            markButton.textContent = "✓ 2 pts";
            markButton.title = "Clique pour refuser ce mot";
        } else if (result === "refused") {
            markButton.textContent = "✗ refuse";
            markButton.title = "Clique pour reaccepter ce mot";
        } else if (result === "not-found") {
            markButton.textContent = "✗ pas au dico";
            markButton.title = "Introuvable au dictionnaire. Clique pour forcer ce mot.";
        } else if (result === "wrong-letter") {
            markButton.textContent = "✗ mauvaise lettre";
            markButton.title = "";
        } else {
            markButton.textContent = "✗ vide";
            markButton.title = "";
        }
    }

    function handlePetitbacMarkClick(event) {
        if (petitbacState.phase !== "review") {
            return;
        }

        const row = event.currentTarget.closest(".petitbac-row");
        const categoryId = row.dataset.category;
        const currentResult = petitbacState.results.get(categoryId);

        if (currentResult !== "accepted" && currentResult !== "refused" && currentResult !== "not-found") {
            return;
        }

        const nextResult = currentResult === "accepted" ? "refused" : "accepted";
        petitbacState.results.set(categoryId, nextResult);
        renderPetitbacMark(row, nextResult);
        recomputePetitbacScore();
        updatePetitbacBestScore(petitbacState.roundScore);
    }

    function finishPetitbacRound(isTimeout = false) {
        if (petitbacState.mode === "chain") {
            finishPetitbacChainRound(isTimeout);
        } else {
            finishPetitbacClassicRound(isTimeout);
        }
    }

    function finishPetitbacClassicRound(isTimeout = false) {
        if (petitbacState.phase !== "running") {
            return;
        }

        stopPetitbacTimer();
        petitbacState.phase = "review";
        petitbacState.remainingSeconds = Math.max(petitbacState.remainingSeconds, 0);
        stopPetitbacRoundButton.disabled = true;
        updatePetitbacTimeDisplay();

        const rowsToVerify = [];

        petitbacBoard.querySelectorAll(".petitbac-row").forEach((row) => {
            const input = row.querySelector(".petitbac-input");
            input.disabled = true;

            const result = evaluatePetitbacAnswer(input.value);
            petitbacState.results.set(row.dataset.category, result);

            if (result === "accepted") {
                rowsToVerify.push(row);
                renderPetitbacMarkChecking(row);
            } else {
                renderPetitbacMark(row, result);
            }
        });

        recomputePetitbacScore();

        const openingMessage = isTimeout ? "Temps ecoule !" : "Manche terminee !";

        if (!rowsToVerify.length) {
            updatePetitbacBestScore(petitbacState.roundScore);
            setPetitbacInfoMessage(`${openingMessage} Score : 0 / ${petitbacCategories.length * 2} points.`);
            return;
        }

        setPetitbacInfoMessage(`${openingMessage} Verification des mots au dictionnaire...`);
        verifyPetitbacClassicAnswers(rowsToVerify, openingMessage);
    }

    async function verifyPetitbacClassicAnswers(rowsToVerify, openingMessage) {
        const currentRoundId = petitbacState.roundId;
        let unreachableCount = 0;

        await Promise.all(rowsToVerify.map(async (row) => {
            const input = row.querySelector(".petitbac-input");
            const verdict = await checkPetitbacWordExists(input.value);

            if (petitbacState.roundId !== currentRoundId) {
                return;
            }

            if (verdict === null) {
                unreachableCount += 1;
            }

            const result = verdict === false ? "not-found" : "accepted";
            petitbacState.results.set(row.dataset.category, result);
            renderPetitbacMark(row, result);
        }));

        if (petitbacState.roundId !== currentRoundId || petitbacState.phase !== "review") {
            return;
        }

        recomputePetitbacScore();
        updatePetitbacBestScore(petitbacState.roundScore);

        const maxScore = petitbacCategories.length * 2;
        const tone = petitbacState.roundScore >= maxScore ? "success" : "";
        const unreachableNote = unreachableCount > 0
            ? " (dictionnaire injoignable pour certains mots, ils sont acceptes)"
            : "";
        setPetitbacInfoMessage(
            `${openingMessage} Score : ${petitbacState.roundScore} / ${maxScore} points${unreachableNote}. Clique sur une coche pour corriger si le dico se trompe.`,
            tone
        );
    }

    function setPetitbacChainFeedback(message, tone = "") {
        petitbacChainFeedback.textContent = message;
        petitbacChainFeedback.className = "petitbac-chain-feedback";
        if (tone) {
            petitbacChainFeedback.classList.add(tone);
        }
    }

    function setPetitbacChainControlsEnabled(isEnabled) {
        petitbacChainInput.disabled = !isEnabled;
        petitbacChainSubmit.disabled = !isEnabled;
        petitbacChainSkip.disabled = !isEnabled;
    }

    function nextPetitbacChainChallenge() {
        petitbacState.chainChallengeId += 1;
        petitbacState.letter = drawPetitbacLetter();

        let question = petitbacState.chainQuestion;
        while (question === petitbacState.chainQuestion) {
            question = petitbacChainQuestions[Math.floor(Math.random() * petitbacChainQuestions.length)];
        }
        petitbacState.chainQuestion = question;

        petitbacLetterElement.textContent = petitbacState.letter;
        petitbacChainLetter.textContent = petitbacState.letter;
        petitbacChainQuestion.textContent = question;
        petitbacChainInput.value = "";
        petitbacChainInput.focus();
    }

    function startPetitbacChainRound() {
        stopPetitbacTimer();

        petitbacState.phase = "running";
        petitbacState.roundId += 1;
        petitbacState.remainingSeconds = Number.parseInt(petitbacDurationSelect.value, 10);
        petitbacState.chainCount = 0;
        petitbacState.chainQuestion = "";
        petitbacState.chainChecking = false;

        petitbacRoundScoreElement.textContent = "0";
        stopPetitbacRoundButton.disabled = false;
        newPetitbacRoundButton.textContent = "Relancer une manche";
        setPetitbacChainControlsEnabled(true);
        setPetitbacChainFeedback("");
        loadPetitbacBestScore();
        updatePetitbacTimeDisplay();
        nextPetitbacChainChallenge();

        setPetitbacInfoMessage("C'est parti ! Reponds a la question avec un mot qui commence par la lettre affichee.");

        startPetitbacCountdown(() => finishPetitbacChainRound(true));
    }

    function rejectPetitbacChainAnswer(message) {
        setPetitbacChainFeedback(message, "error");
        petitbacChainInput.classList.remove("petitbac-chain-shake");
        void petitbacChainInput.offsetWidth;
        petitbacChainInput.classList.add("petitbac-chain-shake");
        petitbacChainInput.select();
    }

    async function handlePetitbacChainSubmit(event) {
        event.preventDefault();

        if (petitbacState.phase !== "running" || petitbacState.mode !== "chain" || petitbacState.chainChecking) {
            return;
        }

        const rawAnswer = petitbacChainInput.value.trim();
        const normalizedAnswer = normalizePetitbacText(rawAnswer);

        if (!normalizedAnswer) {
            rejectPetitbacChainAnswer("Ecris un mot avant de valider !");
            return;
        }

        if (normalizedAnswer.length < 2) {
            rejectPetitbacChainAnswer("Il faut un vrai mot, pas juste une lettre !");
            return;
        }

        if (!normalizedAnswer.startsWith(petitbacState.letter.toLowerCase())) {
            rejectPetitbacChainAnswer(`"${rawAnswer}" ne commence pas par la lettre ${petitbacState.letter} !`);
            return;
        }

        const currentRoundId = petitbacState.roundId;
        const currentChallengeId = petitbacState.chainChallengeId;
        petitbacState.chainChecking = true;
        petitbacChainSubmit.disabled = true;
        setPetitbacChainFeedback(`Verification de "${rawAnswer}" au dictionnaire...`);

        const verdict = await checkPetitbacWordExists(rawAnswer);

        petitbacState.chainChecking = false;
        if (petitbacState.roundId !== currentRoundId || petitbacState.phase !== "running") {
            return;
        }

        petitbacChainSubmit.disabled = false;
        if (petitbacState.chainChallengeId !== currentChallengeId) {
            return;
        }

        if (verdict === false) {
            rejectPetitbacChainAnswer(`"${rawAnswer}" est introuvable au dictionnaire !`);
            return;
        }

        petitbacState.chainCount += 1;
        petitbacRoundScoreElement.textContent = String(petitbacState.chainCount);
        setPetitbacChainFeedback(
            verdict === null
                ? `"${rawAnswer}" accepte (dictionnaire injoignable), question suivante !`
                : `"${rawAnswer}" accepte, question suivante !`,
            "success"
        );
        nextPetitbacChainChallenge();
    }

    function skipPetitbacChainChallenge() {
        if (petitbacState.phase !== "running" || petitbacState.mode !== "chain") {
            return;
        }

        setPetitbacChainFeedback("Question passee, en voila une autre !");
        nextPetitbacChainChallenge();
    }

    function finishPetitbacChainRound(isTimeout = false) {
        if (petitbacState.phase !== "running") {
            return;
        }

        stopPetitbacTimer();
        petitbacState.phase = "finished";
        petitbacState.remainingSeconds = Math.max(petitbacState.remainingSeconds, 0);
        stopPetitbacRoundButton.disabled = true;
        setPetitbacChainControlsEnabled(false);
        updatePetitbacTimeDisplay();
        updatePetitbacBestScore(petitbacState.chainCount);
        setPetitbacChainFeedback("");

        const openingMessage = isTimeout ? "Temps ecoule !" : "Manche terminee !";
        const wordLabel = petitbacState.chainCount > 1 ? "mots" : "mot";
        setPetitbacInfoMessage(
            `${openingMessage} Tu as trouve ${petitbacState.chainCount} ${wordLabel}. Relance une manche pour battre ton record.`,
            petitbacState.chainCount > 0 ? "success" : ""
        );
    }

    function initializePetitbacGame() {
        stopPetitbacTimer();
        petitbacState.mode = petitbacModeSelect.value;
        petitbacState.phase = "idle";
        petitbacState.roundId += 1;
        petitbacState.letter = "";
        petitbacState.results.clear();
        petitbacState.roundScore = 0;
        petitbacState.chainCount = 0;
        petitbacState.chainQuestion = "";
        petitbacState.chainChecking = false;

        if (!petitbacBoard.children.length) {
            buildPetitbacBoard();
        }

        const isChainMode = petitbacState.mode === "chain";
        petitbacBoard.classList.toggle("hidden", isChainMode);
        petitbacChain.classList.toggle("hidden", !isChainMode);
        petitbacScoreLabel.textContent = isChainMode ? "Mots trouves" : "Score de la manche";

        petitbacChainQuestion.textContent = "Lance une manche pour voir la premiere question.";
        petitbacChainLetter.textContent = "?";
        petitbacChainInput.value = "";
        setPetitbacChainControlsEnabled(false);
        setPetitbacChainFeedback("");

        petitbacBoard.querySelectorAll(".petitbac-row").forEach((row) => {
            row.classList.remove("is-valid", "is-invalid");
            const input = row.querySelector(".petitbac-input");
            const markButton = row.querySelector(".petitbac-mark");
            input.value = "";
            input.disabled = true;
            markButton.disabled = true;
            markButton.textContent = "";
            markButton.classList.remove("valid", "invalid", "is-toggleable");
        });

        petitbacLetterElement.textContent = "-";
        petitbacTimeLeftElement.textContent = "--";
        petitbacTimeLeftElement.classList.remove("petitbac-time-urgent");
        petitbacRoundScoreElement.textContent = "0";
        stopPetitbacRoundButton.disabled = true;
        newPetitbacRoundButton.textContent = "Nouvelle manche";
        loadPetitbacBestScore();
        setPetitbacInfoMessage(
            isChainMode
                ? "Lance une manche : une lettre et une question a la fois, enchaine un maximum de bonnes reponses."
                : "Lance une manche pour tirer une lettre au sort."
        );
    }

    newGameButton.addEventListener("click", initializeKnightBoard);
    resetQueensButton.addEventListener("click", () => initializeQueensBoard("Quadrillage reinitialise."));
    changeQueensGridButton.addEventListener("click", () => {
        generateQueensPuzzle(true);
        initializeQueensBoard("Nouveau quadrillage 7x7 genere. Il reste realisable.");
    });
    loadWikiPageButton.addEventListener("click", loadRandomWikiArticle);
    wikiGuessForm.addEventListener("submit", handleWikiGuessSubmit);
    wikiText.addEventListener("click", handleWikiWordHintClick);
    sudokuDifficultySelect.addEventListener("change", () => initializeSudokuGame(true));
    newSudokuGameButton.addEventListener("click", () => initializeSudokuGame(true));
    toggleSudokuNotesButton.addEventListener("click", () => {
        sudokuState.noteMode = !sudokuState.noteMode;
        renderSudokuBoard();
    });
    sudokuHintButton.addEventListener("click", useSudokuHint);
    sudokuNumberPad.addEventListener("click", handleSudokuPadClick);
    sudokuCandidates.addEventListener("click", handleSudokuPadClick);
    window.addEventListener("keydown", handleSudokuKeydown);
    puzzleSizeSelect.addEventListener("change", () => initializePuzzleGame(true));
    puzzleArtworkSelect.addEventListener("change", () => initializePuzzleGame(true));
    newPuzzleGameButton.addEventListener("click", () => initializePuzzleGame(true));
    togglePuzzleHelpButton.addEventListener("click", () => {
        puzzleState.helpMode = !puzzleState.helpMode;
        renderPuzzleBoard();
    });
    puzzleBoard.addEventListener("pointerdown", handlePuzzlePointerDown);
    window.addEventListener("pointermove", handlePuzzlePointerMove);
    window.addEventListener("pointerup", handlePuzzlePointerUp);
    window.addEventListener("pointercancel", handlePuzzlePointerUp);
    window.addEventListener("keydown", handlePuzzleKeydown);
    newPetitbacRoundButton.addEventListener("click", startPetitbacRound);
    stopPetitbacRoundButton.addEventListener("click", () => finishPetitbacRound(false));
    petitbacModeSelect.addEventListener("change", initializePetitbacGame);
    petitbacChainForm.addEventListener("submit", handlePetitbacChainSubmit);
    petitbacChainSkip.addEventListener("click", skipPetitbacChainChallenge);
    petitbacDurationSelect.addEventListener("change", () => {
        loadPetitbacBestScore();
        if (petitbacState.phase === "idle") {
            petitbacTimeLeftElement.textContent = "--";
        }
    });

    renderGames();
    applyTheme(getInitialTheme());
    showGamePanel("");
    renderWikiText();
    buildSudokuNumberPad();
    updatePuzzleStats();
    showScreen("home");
});
