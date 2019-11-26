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

    getContext() {
        const ctx = this.canvas ? this.ctx = this.canvas.getContext('2d') : null;
        this.ctx.fillStyle = '#00fe39';
    }

    getCanvasDimensions() {
        const dimensions = this.canvas ? (
            this.canvasWidth = this.canvas.width,
                this.canvasHeight = this.canvas.height
        ) : null;
    }

    getQuantitySquaresInRow() {
        this.squaresInRow = this.canvasWidth / this.options.squareSize;
    }

    getQuantitySquaresInColumn() {
        this.squaresInColumn = this.canvasHeight / this.options.squareSize;
    }

    initMatrix() {
        for (let i = 0; i < this.squaresInRow; i++) {
            this.matrix[i] = [];

            for (let j = 0; j < this.squaresInColumn; j++) {
                this.matrix[i][j] = Math.random() < 0.9 ? 0 : 1;
            }
        }
    }

    clearMatrix() {
        for (let i = 0; i < this.squaresInRow; i++) {
            for (let j = 0; j < this.squaresInColumn; j++) {
                this.matrix[i][j] = 0;
            }
        }
    }

    paintScene() {
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

    changeCellState(cell) {
        cell = !cell;
        console.log(cell);
    }

    initRandomOrganisms() {
        this.clearMatrix();
        this.initMatrix();
        this.paintScene();
    }

    initEvents() {
        const btnRandomOrganisms = document.querySelector('.random-organisms');

        if (this.canvas) {
            this.canvas.addEventListener('click', e => {
                console.log(Math.ceil(e.offsetX / this.options.squareSize) - 1, Math.ceil(e.offsetY / this.options.squareSize) - 1);
                this.changeCellState(this.matrix[Math.ceil(e.offsetX / this.options.squareSize) - 1][Math.ceil(e.offsetY / this.options.squareSize) - 1]);
                this.ctx.fillRect((Math.ceil(e.offsetX / this.options.squareSize) - 1) * this.options.squareSize, (Math.ceil(e.offsetY / this.options.squareSize) - 1) * this.options.squareSize, this.options.squareSize, this.options.squareSize);
            });
        }

        if (this.canvas && btnRandomOrganisms) {
            btnRandomOrganisms.addEventListener('click', e => {
                e.preventDefault();
                this.initRandomOrganisms();
            });
        }
    }


    init() {
        this.getContext();
        this.getCanvasDimensions();
        this.getQuantitySquaresInRow();
        this.getQuantitySquaresInColumn();
        this.initMatrix();
        this.initEvents();
    }
}
