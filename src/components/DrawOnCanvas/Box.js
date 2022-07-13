export default class Box {
    constructor(state, dispatch){
        this.state = state;
        this.dispatch = dispatch
        this.x = 0;
        this.y = 0;
        this.w = 1;
        this.h = 1;
        this.fill = '#444444';
    }
    
    // mainDraw() will call this with a normal canvas
    // myDown will call this with the ghost canvas with 'black'
    draw(context, optionalColor) {
        if(context === this.state.boxState.gctx) {
            context.fillStyle = 'black'; // always black for the ghost canvas
        }
        else {
            context.fillStyle = this.fill
        }
    
        if(this.x > this.state.boxState.WIDTH || this.y > this.state.boxState.HEIGHT) return;
        if(this.x + this.w < 0 || this.y + this.h < 0) return;

        context.globalAlpha = 0.01;
        context.fillRect(this.x, this.y, this.w, this.h);
        context.globalAlpha = 1;
        context.strokeStyle = this.state.boxState.mySelColor;
        context.lineWidth = this.state.boxState.mySelWidth;
        context.strokeRect(this.x, this.y, this.w, this.h);
        //context.clearRect(this.x, this.y, this.w, this.h);

        //draw the selection -> stroke along the box and 8 new selection handles
        if(this.state.boxState.mySel === this) {
            context.strokeStyle = this.state.boxState.mySelColor;
            context.lineWidth = this.state.boxState.mySelWidth;
            context.strokeRect(this.x, this.y, this.w, this.h);

            var half = this.state.boxState.mySelBoxSize / 2;

            var selectionHandles = this.state.boxState.selectionHandles;

            selectionHandles[0].x = this.x-half;
            selectionHandles[0].y = this.y-half;
            
            selectionHandles[1].x = this.x+this.w/2-half;
            selectionHandles[1].y = this.y-half;
            
            selectionHandles[2].x = this.x+this.w-half;
            selectionHandles[2].y = this.y-half;
            
            //middle left
            selectionHandles[3].x = this.x-half;
            selectionHandles[3].y = this.y+this.h/2-half;
            
            //middle right
            selectionHandles[4].x = this.x+this.w-half;
            selectionHandles[4].y = this.y+this.h/2-half;
            
            //bottom left, middle, right
            selectionHandles[6].x = this.x+this.w/2-half;
            selectionHandles[6].y = this.y+this.h-half;
            
            selectionHandles[5].x = this.x-half;
            selectionHandles[5].y = this.y+this.h-half;
            
            selectionHandles[7].x = this.x+this.w-half;
            selectionHandles[7].y = this.y+this.h-half;

            context.fillStyle = this.state.boxState.mySelBoxColor;

            for(var i = 0; i < 8; i++) {
                var cur = selectionHandles[i];
                context.fillRect(cur.x, cur.y, this.state.boxState.mySelBoxSize, this.state.boxState.mySelBoxSize);
            }
        }
    }
    
}