export default class Game {
    public canvas: any;
    public ctx: any;
    public canvasWidth: any;
    public canvasHeight: any;
    public options: any;
    private gameIsActive = false;
    public squaresInRow: number | null;
    public squaresInColumn: number | null;
    private gameIntervalHandler: NodeJS.Timeout = null;
    private gameSpeed: number | null = null;
    private sliderRange: HTMLInputElement | null = document.querySelector('.slider-range');
    private matrix: any[] = [];
    private newMatrix: any[] = [];

    constructor(canvasId = 'scene',
                options = {
                    squareSize: 10
                }
    ) {
        this.canvas = document.querySelector(`#${canvasId}`);
        this.options = options;

        this.init();
    }

    private getContext() {
        const ctx = this.canvas ? this.ctx = this.canvas.getContext('2d') : null;
        this.ctx.fillStyle = '#00fe39';
    }

    public getCanvasDimensions() {
        const dimensions = this.canvas ? (
            this.canvasWidth = this.canvas.width,
                this.canvasHeight = this.canvas.height
        ) : null;

        return dimensions;
    }

    public getQuantitySquaresInRow() {
        this.squaresInRow = Math.round(this.canvasHeight / this.options.squareSize);
    }

    private changeSpeed(val) {
        this.gameSpeed = val * 4;
    }

    public getQuantitySquaresInColumn() {
        this.squaresInColumn = Math.round(this.canvasWidth / this.options.squareSize);
    }

    private initMatrix(isClear = false, matrix = this.matrix) {
        for (let i = 0; i < this.squaresInRow; i++) {
            matrix[i] = [];

            for (let j = 0; j < this.squaresInColumn; j++) {
                matrix[i][j] = isClear ? 0 : Math.random() < 0.9 ? 0 : 1;
            }
        }
    }

    public clearMatrix(matrix = this.matrix) {
        if (matrix.length) {
            for (let i = 0; i < this.squaresInRow; i++) {
                for (let j = 0; j < this.squaresInColumn; j++) {
                    matrix[i][j] = 0;
                }
            }
        }
    }

    private paintScene(matrix = this.matrix) {
        for (let i = 0; i < this.squaresInRow; i++) {
            for (let j = 0; j < this.squaresInColumn; j++) {
                this.paintSquare(i, j);
            }
        }
    }

    private paintSquare(i, j) {
        this.matrix[i][j] !== 0 ? (
            this.ctx.fillRect(j * this.options.squareSize, i * this.options.squareSize, this.options.squareSize, this.options.squareSize)
        ) : (
            this.ctx.clearRect(j * this.options.squareSize, i * this.options.squareSize, this.options.squareSize, this.options.squareSize)
        );
    }

    private changeCellState(cellPositions) {
        const [col, row] = cellPositions;
        this.matrix[row][col] = this.matrix[row][col] === 0 ? 1 : 0;
        return this.matrix;
    }

    public initRandomOrganisms() {
        this.clearMatrix();
        this.initMatrix();
        this.paintScene();
    }

    private countNeighbours(matrix, i, j) {
        let neighboursCount = 0;

        // Edges handler
        try {
            const neighbours = [
                matrix[i - 1][j - 1],
                matrix[i][j - 1],
                matrix[i + 1][j - 1],
                matrix[i - 1][j],
                matrix[i + 1][j],
                matrix[i - 1][j + 1],
                matrix[i][j + 1],
                matrix[i + 1][j + 1]
            ];

            // console.log(`Col: ${j} : row: ${i}`);
            neighbours.forEach((neighbour, key) => {
                // console.log(neighbour);
                const isAlive = neighbour ? neighboursCount++ : null;
                // console.log(`${key} : ${isAlive}`);
            });
            // console.log('====================');
        } catch (e)  {
        }
        return neighboursCount;
    }

    // TODO: create changeGameState handler
    private changeGameState() {
        this.gameIsActive != this.gameIsActive;
    }

    private setNewMatrixValues() {
        for (let i = 0; i < this.squaresInRow; i++) {
            for (let j = 0; j < this.squaresInColumn; j++) {
                const neighboursQuantity = this.countNeighbours(this.matrix, i, j);

                if (this.matrix[i][j] === 0 && neighboursQuantity === 3) {
                    this.newMatrix[i][j] = 1;
                } else if (this.matrix[i][j] && neighboursQuantity < 2 ||
                    this.matrix[i][j] && neighboursQuantity > 3) {
                    this.newMatrix[i][j] = 0;
                } else {
                    this.newMatrix[i][j] = this.matrix[i][j];
                }
            }
        }

        this.matrix = [...this.newMatrix];
        this.paintScene();
        this.initMatrix(true, this.newMatrix);
    }

    private getColRowPositions(el: MouseEvent, callback?) {
        const colRowPositions = [Math.ceil(el.offsetX / this.options.squareSize) - 1, Math.ceil(el.offsetY / this.options.squareSize) - 1];
        const miodifiedColRowPositions = callback ? callback(colRowPositions) : null;
        return miodifiedColRowPositions ? miodifiedColRowPositions : colRowPositions;
    }

    private initEvents() {
        const btnRandomOrganisms = document.querySelector('.random-organisms');
        const btnStartGame = document.querySelector('.start');
        const btnStopGame = document.querySelector('.stop');

        if (this.canvas) {
            this.canvas.addEventListener('click', e => {
                const colRowPositions = this.getColRowPositions(e);
                const state = this.changeCellState(colRowPositions);

                const colRowSquare = this.getColRowPositions(e, colRow => {
                    const filledItem = colRow.map(item => {
                        return item * this.options.squareSize;
                    });

                    return filledItem;
                });

                const eventTargetPos = colRowSquare.map(item => item / this.options.squareSize);
                this.paintSquare(eventTargetPos[1], eventTargetPos[0]);
                this.countNeighbours(this.matrix, colRowPositions[1], colRowPositions[0]);
            });
        }

        if (this.canvas && btnRandomOrganisms) {
            btnRandomOrganisms.addEventListener('click', e => {
                e.preventDefault();
                this.initRandomOrganisms();
            });
        }


        if (this.canvas && this.sliderRange) {
            this.changeSpeed(this.sliderRange.value);

           this.sliderRange.addEventListener('change', e => {
                e.preventDefault();
                this.changeSpeed((e.target as HTMLInputElement).value);
            });
        }

        if (this.canvas && btnStartGame) {
            btnStartGame.addEventListener('click', e => {
                e.preventDefault();
                this.gameIntervalHandler = setInterval(this.setNewMatrixValues.bind(this), this.gameSpeed);
            });
        }

        if (this.canvas && btnStopGame) {
            btnStopGame.addEventListener('click', e => {
                e.preventDefault();
                const gameIntervalHandlerCanceling = this.gameIntervalHandler ? clearTimeout(this.gameIntervalHandler) : null;
            });
        }
    }

    public init() {
        this.getContext();
        this.getCanvasDimensions();
        this.getQuantitySquaresInRow();
        this.getQuantitySquaresInColumn();
        this.initMatrix(true);
        this.initMatrix(true, this.newMatrix);
        this.initEvents();
    }
}
