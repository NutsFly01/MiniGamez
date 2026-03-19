document.addEventListener("DOMContentLoaded", () => {
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

    function escapeHtml(value) {
        return value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
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

    backToHomeButton.addEventListener("click", () => showScreen("home"));
    boardSizeSelect.addEventListener("change", initializeKnightBoard);
    newGameButton.addEventListener("click", initializeKnightBoard);
    resetQueensButton.addEventListener("click", () => initializeQueensBoard("Quadrillage reinitialise."));
    changeQueensGridButton.addEventListener("click", () => {
        generateQueensPuzzle(true);
        initializeQueensBoard("Nouveau quadrillage 7x7 genere. Il reste realisable.");
    });
    loadWikiPageButton.addEventListener("click", loadRandomWikiArticle);
    wikiGuessForm.addEventListener("submit", handleWikiGuessSubmit);
    wikiText.addEventListener("click", handleWikiWordHintClick);

    renderGames();
    showGamePanel("");
    renderWikiText();
    showScreen("home");
});
