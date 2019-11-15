export default class Game {
    public canvas: any;
    public ctx: any;
    public canvasWidth: any;
    public canvasHeight: any;
    public options: any;

    constructor(canvasId = 'scene',
                options = {
                    squareSize: 20
                }
    ) {
        this.canvas = document.querySelector(`#${canvasId}`);
        this.options = options;

        this.getContext();
        this.getCanvasDimensions();
        this.gridDraw();
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
        console.log(this.canvasHeight);

        for (var y = 0; y < this.canvasWidth; y += this.options.squareSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvasWidth, y);
        }

        this.ctx.strokeStyle = "#888";
        this.ctx.stroke();
    }
}
