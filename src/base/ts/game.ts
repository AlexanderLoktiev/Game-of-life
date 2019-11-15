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
    }

    getCanvasDimensions() {
        const dimensions = this.canvas ? (
                this.canvasWidth = this.canvas.width,
                this.canvasHeight = this.canvas.height
        ) : null;
    }

    gridDraw() {
        for (var x = -0.5; x < this.canvasWidth; x += this.options.squareSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvasHeight);
        }

        for (var y = 0; y < this.canvasWidth; y += this.options.squareSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasWidth, y);
        }

        this.ctx.strokeStyle = "#888";
        this.ctx.stroke();
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

    paintScene() {
        this.matrix.forEach((row, rowKey) => {
            row.forEach((column, columnKey) => {
                column !== 0 ? (
                    this.ctx.fillStyle = '#00fe39',
                    this.ctx.fillRect(rowKey * this.options.squareSize, columnKey * this.options.squareSize, this.options.squareSize, this.options.squareSize)
                ) : null;
            });
        });
    }

    initEvents() {
        if (this.canvas) {
            this.canvas.addEventListener('click', e => {
                console.log(e);
            });
        }
    }

    init() {
        this.getContext();
        this.getCanvasDimensions();
        this.gridDraw();
        this.getQuantitySquaresInRow();
        this.getQuantitySquaresInColumn();
        this.initMatrix();
        this.paintScene();
        this.initEvents();

    }
}
