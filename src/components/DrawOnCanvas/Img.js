export default class Img {
    constructor(state, dispatch){
        this.state = state;
        this.dispatch = dispatch
        this.x = 0;
        this.y = 0;
        this.w = 1;
        this.h = 1;
        //this.fill = '#444444';
    }
    
    // mainDraw() will call this with a normal canvas
    // myDown will call this with the ghost canvas with 'black'
    draw(context, optionalColor) {
        //context.globalAlpha = 0.0;
        //context.fillStyle = 'read';
        //context.fillRect(this.x, this.y, this.w, this.h);
        //context.globalAlpha = 1;
        context.strokeStyle = this.state.boxState.mySelColor;
        context.lineWidth = this.state.boxState.mySelWidth;
        context.strokeRect(this.x, this.y, this.w, this.h);
    }
    
}