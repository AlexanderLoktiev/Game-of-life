export default class Game {
    public canvas: any;
    public ctx: any;
    public canvasWidth: any;
    public canvasHeight: any;
    public options: any;
    public squaresInRow: number | null;
    public squaresInColumn: number | null;
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
                matrix[i][j] !== 0 ? (
                    this.ctx.fillRect(j * this.options.squareSize, i * this.options.squareSize, this.options.squareSize, this.options.squareSize)
                ) : (
                    this.ctx.clearRect(j * this.options.squareSize, i * this.options.squareSize, this.options.squareSize, this.options.squareSize)
                );
            }
        }
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
            const neighbours = [ matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i - 1][j + 1], matrix[i][j - 1],
                matrix[i][j + 1], matrix[i + 1][j - 1], matrix[i + 1][j], matrix[i + 1][j + 1] ];
            neighbours.forEach(neighbour => {
                const isAlive = neighbour ? neighboursCount++ : null;
            });
        } catch (e)  {
            neighboursCount = neighboursCount;
        }

        return neighboursCount;
    }

    private setNewMatrixValues(matrix = this.matrix) {
        for (let i = 0; i < this.squaresInRow; i++) {
            for (let j = 0; j < this.squaresInColumn; j++) {
                if (!matrix[i][j] && this.countNeighbours(matrix, i, j) === 3) {
                    this.newMatrix[i][j] = 1;
                } else if (matrix[i][j] && this.countNeighbours(matrix, i, j) === 2 ||
                    matrix[i][j] && this.countNeighbours(matrix, i, j) === 3) {
                    this.newMatrix[i][j] = 1;
                }  else if (matrix[i][j] && this.countNeighbours(matrix, i, j) < 2 ||
                    matrix[i][j] && this.countNeighbours(matrix, i, j) > 3) {
                    this.newMatrix[i][j] = 0;
                } else {
                    this.newMatrix[i][j] = this.matrix[i][j];
                }
            }
        }

        this.matrix = this.newMatrix;
        this.paintScene();
    }

    private getColRowPositions(el: MouseEvent, callback?) {
        const colRowPositions = [Math.ceil(el.offsetX / this.options.squareSize) - 1, Math.ceil(el.offsetY / this.options.squareSize) - 1];
        const miodifiedColRowPositions = callback ? callback(colRowPositions) : null;
        return miodifiedColRowPositions ? miodifiedColRowPositions : colRowPositions;
    }

    private initEvents() {
        const btnRandomOrganisms = document.querySelector('.random-organisms');

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

                this.ctx.fillRect(...colRowSquare, this.options.squareSize, this.options.squareSize);
                this.countNeighbours(this.matrix, colRowPositions[1], colRowPositions[0]);
            });
        }

        if (this.canvas && btnRandomOrganisms) {
            btnRandomOrganisms.addEventListener('click', e => {
                e.preventDefault();
                this.initRandomOrganisms();

                setInterval(this.setNewMatrixValues.bind(this), 500);
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
