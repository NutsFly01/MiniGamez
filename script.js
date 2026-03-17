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

    const knightState = {
        knightPosition: { row: 0, col: 0 },
        visitedSquares: new Set(),
        gameOver: false,
        boardSize: 8,
        moveCount: 0
    };

    const queensState = {
        crowns: new Set(),
        gameOver: false,
        puzzle: null,
        gridNumber: 1
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

    function getQueensCrowns() {
        return Array.from(queensState.crowns, parseQueensKey);
    }

    function updateQueensStats() {
        const crowns = getQueensCrowns();
        const coveredRegions = new Set(crowns.map((crown) => getQueensRegion(crown.row, crown.col)));
        const size = queensState.puzzle.size;

        queensPlacedCount.textContent = `${crowns.length} / ${size}`;
        queensRegionCount.textContent = `${coveredRegions.size} / ${size}`;
        queensGridNumber.textContent = String(queensState.gridNumber);
    }

    function renderQueensCrowns() {
        queensBoard.querySelectorAll(".queens-cell").forEach((cell) => {
            const key = createQueensKey(
                Number.parseInt(cell.dataset.row, 10),
                Number.parseInt(cell.dataset.col, 10)
            );

            const hasCrown = queensState.crowns.has(key);
            cell.classList.toggle("has-crown", hasCrown);
            cell.textContent = hasCrown ? "\u265B" : "";
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

    function initializeQueensBoard(message = "Clique sur une case pour poser une couronne. Reclique dessus pour l'enlever.") {
        if (!queensState.puzzle) {
            generateQueensPuzzle();
        }

        queensState.crowns.clear();
        queensState.gameOver = false;
        queensBoard.innerHTML = "";
        queensBoard.style.gridTemplateColumns = `repeat(${queensState.puzzle.size}, var(--square-size))`;
        queensBoard.style.gridTemplateRows = `repeat(${queensState.puzzle.size}, var(--square-size))`;

        for (let row = 0; row < queensState.puzzle.size; row += 1) {
            for (let col = 0; col < queensState.puzzle.size; col += 1) {
                queensBoard.appendChild(createQueensCell(row, col));
            }
        }

        renderQueensCrowns();
        updateQueensStats();
        setQueensInfoMessage(message);
    }

    function validateQueensPlacement(row, col) {
        const region = getQueensRegion(row, col);

        for (const crown of getQueensCrowns()) {
            if (crown.row === row) {
                return { valid: false, message: "Impossible: il y a deja une couronne sur cette ligne." };
            }

            if (crown.col === col) {
                return { valid: false, message: "Impossible: il y a deja une couronne sur cette colonne." };
            }

            if (getQueensRegion(crown.row, crown.col) === region) {
                return { valid: false, message: "Impossible: cette forme de couleur a deja sa couronne." };
            }

            const isTouchingDiagonally = Math.abs(crown.row - row) === 1 && Math.abs(crown.col - col) === 1;
            if (isTouchingDiagonally) {
                return { valid: false, message: "Impossible: une couronne ne peut pas toucher une autre en diagonale." };
            }
        }

        return { valid: true, message: "" };
    }

    function isQueensSolved() {
        const crowns = getQueensCrowns();
        const size = queensState.puzzle.size;

        if (crowns.length !== size) {
            return false;
        }

        const rows = new Set(crowns.map((crown) => crown.row));
        const cols = new Set(crowns.map((crown) => crown.col));
        const regions = new Set(crowns.map((crown) => getQueensRegion(crown.row, crown.col)));

        return rows.size === size && cols.size === size && regions.size === size;
    }

    function handleQueensCellClick(event) {
        const cell = event.currentTarget;
        const row = Number.parseInt(cell.dataset.row, 10);
        const col = Number.parseInt(cell.dataset.col, 10);
        const key = createQueensKey(row, col);

        if (queensState.crowns.has(key)) {
            queensState.crowns.delete(key);
            queensState.gameOver = false;
            renderQueensCrowns();
            updateQueensStats();
            setQueensInfoMessage("Couronne retiree. Tu peux essayer une autre position.");
            return;
        }

        const validation = validateQueensPlacement(row, col);
        if (!validation.valid) {
            flashInvalidCell(cell);
            setQueensInfoMessage(validation.message, "warning");
            return;
        }

        queensState.crowns.add(key);
        renderQueensCrowns();
        updateQueensStats();

        if (isQueensSolved()) {
            queensState.gameOver = true;
            setQueensInfoMessage("Bravo ! Toutes les couronnes sont placees et les regles sont respectees.", "success");
            return;
        }

        setQueensInfoMessage("Couronne posee. Continue jusqu'a remplir chaque ligne, colonne et forme.");
    }

    backToHomeButton.addEventListener("click", () => showScreen("home"));
    boardSizeSelect.addEventListener("change", initializeKnightBoard);
    newGameButton.addEventListener("click", initializeKnightBoard);
    resetQueensButton.addEventListener("click", () => initializeQueensBoard("Quadrillage reinitialise."));
    changeQueensGridButton.addEventListener("click", () => {
        generateQueensPuzzle(true);
        initializeQueensBoard("Nouveau quadrillage 7x7 genere. Il reste realisable.");
    });

    renderGames();
    showGamePanel("");
    showScreen("home");
});
