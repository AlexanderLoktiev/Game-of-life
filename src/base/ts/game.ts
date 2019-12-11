export default class Game {
    public canvas: any;
    public ctx: any;
    public canvasWidth: any;
    public canvasHeight: any;
    public options: any;
    public squaresInRow: number | null;
    public squaresInColumn: number | null;
    private matrix: any[] = [];

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
    }

    public getQuantitySquaresInRow() {
        this.squaresInRow = this.canvasWidth / this.options.squareSize;
    }

    public getQuantitySquaresInColumn() {
        this.squaresInColumn = this.canvasHeight / this.options.squareSize;
    }

    public initMatrix(isClear = false) {
        for (let i = 0; i < this.squaresInRow; i++) {
            this.matrix[i] = [];

            for (let j = 0; j < this.squaresInColumn; j++) {
                this.matrix[i][j] = isClear ? 0 : Math.random() < 0.9 ? 0 : 1;
            }
        }
    }

    public clearMatrix() {
        for (let i = 0; i < this.squaresInRow; i++) {
            for (let j = 0; j < this.squaresInColumn; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    private paintScene() {
        this.matrix.forEach((row, rowKey) => {
            row.forEach((column, columnKey) => {
                column !== 0 ? (
                    this.ctx.fillRect(rowKey * this.options.squareSize, columnKey * this.options.squareSize, this.options.squareSize, this.options.squareSize)
                ) : (
                    this.ctx.clearRect(rowKey * this.options.squareSize, columnKey * this.options.squareSize, this.options.squareSize, this.options.squareSize)
                );
            });
        });
    }

    private checkNeighbours() {

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

    private getColRowPositions(el: MouseEvent, callback?) {
        // console.log(typeof el);
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
            });
        }

        if (this.canvas && btnRandomOrganisms) {
            btnRandomOrganisms.addEventListener('click', e => {
                e.preventDefault();
                this.initRandomOrganisms();
            });
        }
    }

    public init() {
        this.getContext();
        this.getCanvasDimensions();
        this.getQuantitySquaresInRow();
        this.getQuantitySquaresInColumn();
        this.initMatrix(true);
        this.initEvents();
    }
}
