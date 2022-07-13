import Box from "./Box";
import Img from "./Img";

export default class DrawOnCanvas {
    constructor(state, dispatch){
        this.state = state;
        this.dispatch = dispatch
    }

    addRect(x, y, w, h, fill) {
        var rect = new Box(this.state, this.dispatch);
        rect.x = x;
        rect.y = y;
        rect.w = w;
        rect.h = h;
        rect.fill = fill;
        this.state.boxState.boxes2.push({rect: rect, type: "box"});
        this.invalidate();
    }

    addImg(x, y, w, h) {
        var img = new Img(this.state, this.dispatch);
        img.x = x;
        img.y = y;
        img.w = w;
        img.h = h;

        this.state.boxState.boxes2.push({img: img, type: "img"});
        this.invalidate();
    } 

    init2() {
        const canvas = this.state.boxState.canvas;
        const ctx = this.state.boxState.ctx;
        this.state.boxState.HEIGHT = canvas.height;
        this.state.boxState.WIDTH = canvas.width;
        var ghostcanvas = document.createElement('canvas');
        ghostcanvas.height = this.state.boxState.HEIGHT;
        ghostcanvas.width = this.state.boxState.WIDTH;
        this.state.boxState.ghostcanvas = ghostcanvas;
        var gctx = ghostcanvas.getContext('2d');
        this.state.boxState.gctx = gctx;

        canvas.onselectstart = function () { return false; }
  
        // fixes mouse co-ordinate problems when there's a border or padding
        // see getMouse for more detail
        if (document.defaultView && document.defaultView.getComputedStyle) {
            this.state.boxState.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)     || 0;
            this.state.boxState.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)      || 0;
            this.state.boxState.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
            this.state.boxState.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)  || 0;
        }
        //console.log(this.state.boxState.INTERVAL)
        setInterval(() => {this.mainDraw()}, this.state.boxState.INTERVAL);

        canvas.onmousedown = (e) => { this.myDown(e) };
        //{(e) => {handleDraw()}}
        canvas.onmouseup = (e) => { this.myUp(e) };
        //canvas.ondblclick = (e) => { this.myDblClick(e) };
        canvas.onmousemove = (e) => { this.myMove(e) };

        for (var i = 0; i < 8; i ++) {
            var rect = new Box(this.state, this.dispatch);
            //console.log(this.state.boxState)
            this.state.boxState.selectionHandles.push(rect);
        }
    }

    clear(c) {
        c.clearRect(0, 0, this.state.boxState.WIDTH, this.state.boxState.HEIGHT);
    }

    mainDraw() {
        if (this.state.boxState.canvasValid == false) {
            this.clear(this.state.boxState.ctx);
            
            // Add stuff you want drawn in the background all the time here
            
            // draw all boxes
            var l = this.state.boxState.boxes2.length;
            for (var i = 0; i < l; i++) {
                if(this.state.boxState.boxes2[i].type === "box"){
                    //console.log("box");
                    this.state.boxState.boxes2[i].rect.draw(this.state.boxState.ctx); // we used to call drawshape, but now each box draws itself
                } else {
                    this.state.boxState.boxes2[i].img.draw(this.state.boxState.ctx); // we used to call drawshape, but now each box draws itself
                }
            }
            
            // Add stuff you want drawn on top all the time here
            
            this.state.boxState.canvasValid = true;
        }
    }

    myMove(e) {
        if (this.state.boxState.isDrag) {
            this.getMouse(e);
            
            this.state.boxState.mySel.x = this.state.boxState.mx - this.state.boxState.offsetx;
            this.state.boxState.mySel.y = this.state.boxState.my - this.state.boxState.offsety;   
            
            // something is changing position so we better invalidate the canvas!
            this.invalidate();
          } else if (this.state.boxState.isResizeDrag) {
            // time ro resize!
            var oldx = this.state.boxState.mySel.x;
            var oldy = this.state.boxState.mySel.y;
            
            // 0  1  2
            // 3     4
            // 5  6  7
            switch (this.state.boxState.expectResize) {
              case 0:
                this.state.boxState.mySel.x = this.state.boxState.mx;
                this.state.boxState.mySel.y = this.state.boxState.my;
                this.state.boxState.mySel.w += oldx - this.state.boxState.mx;
                this.state.boxState.mySel.h += oldy - this.state.boxState.my;
                break;
              case 1:
                this.state.boxState.mySel.y = this.state.boxState.my;
                this.state.boxState.mySel.h += oldy - this.state.boxState.my;
                break;
              case 2:
                this.state.boxState.mySel.y = this.state.boxState.my;
                this.state.boxState.mySel.w = this.state.boxState.mx - oldx;
                this.state.boxState.mySel.h += oldy - this.state.boxState.my;
                break;
              case 3:
                this.state.boxState.mySel.x = this.state.boxState.mx;
                this.state.boxState.mySel.w += oldx - this.state.boxState.mx;
                break;
              case 4:
                this.state.boxState.mySel.w = this.state.boxState.mx - oldx;
                break;
              case 5:
                this.state.boxState.mySel.x = this.state.boxState.mx;
                this.state.boxState.mySel.w += oldx - this.state.boxState.mx;
                this.state.boxState.mySel.h = this.state.boxState.my - oldy;
                break;
              case 6:
                this.state.boxState.mySel.h = this.state.boxState.my - oldy;
                break;
              case 7:
                this.state.boxState.mySel.w = this.state.boxState.mx - oldx;
                this.state.boxState.mySel.h = this.state.boxState.my - oldy;
                break;
            }
            
            this.invalidate();
          }
          
          this.getMouse(e);
          // if there's a selection see if we grabbed one of the selection handles
          if (this.state.boxState.mySel !== null && !this.state.boxState.isResizeDrag) {
            for (var i = 0; i < 8; i++) {
              // 0  1  2
              // 3     4
              // 5  6  7
              
              var cur = this.state.boxState.selectionHandles[i];
              
              // we dont need to use the ghost context because
              // selection handles will always be rectangles
              if (this.state.boxState.mx >= cur.x && this.state.boxState.mx <= cur.x + this.state.boxState.mySelBoxSize &&
                this.state.boxState.my >= cur.y && this.state.boxState.my <= cur.y + this.state.boxState.mySelBoxSize) {
                // we found one!
                this.state.boxState.expectResize = i;
                this.invalidate();
                
                switch (i) {
                  case 0:
                    this.state.boxState.canvas.style.cursor='nw-resize';
                    break;
                  case 1:
                    this.state.boxState.canvas.style.cursor='n-resize';
                    break;
                  case 2:
                    this.state.boxState.canvas.style.cursor='ne-resize';
                    break;
                  case 3:
                    this.state.boxState.canvas.style.cursor='w-resize';
                    break;
                  case 4:
                    this.state.boxState.canvas.style.cursor='e-resize';
                    break;
                  case 5:
                    this.state.boxState.canvas.style.cursor='sw-resize';
                    break;
                  case 6:
                    this.state.boxState.canvas.style.cursor='s-resize';
                    break;
                  case 7:
                    this.state.boxState.canvas.style.cursor='se-resize';
                    break;
                }
                return;
              }
              
            }
            // not over a selection box, return to normal
            this.state.boxState.isResizeDrag = false;
            this.state.boxState.expectResize = -1;
            this.state.boxState.canvas.style.cursor='auto';
          }        
    }

    myDown(e){
        this.getMouse(e);
  
        //we are over a selection box
        if (this.state.boxState.expectResize !== -1) {
            this.state.boxState.isResizeDrag = true;
          return;
        }
        
        this.clear(this.state.boxState.gctx);
        var l = this.state.boxState.boxes2.length;
        for (var i = l-1; i >= 0; i--) {
          // draw shape onto ghost 
          if(this.state.boxState.boxes2[i].type === "box"){
            this.state.boxState.boxes2[i].rect.draw(this.state.boxState.gctx, 'black');
          
            // get image data at the mouse x,y pixel
            var imageData = this.state.boxState.gctx.getImageData(this.state.boxState.mx, this.state.boxState.my, 1, 1);
            var index = (this.state.boxState.mx + this.state.boxState.my * imageData.width) * 4;
            
            // if the mouse pixel exists, select and break
            if (imageData.data[3] > 0) {
              this.state.boxState.mySel = this.state.boxState.boxes2[i].rect;
              this.state.boxState.offsetx = this.state.boxState.mx - this.state.boxState.mySel.x;
              this.state.boxState.offsety = this.state.boxState.my - this.state.boxState.mySel.y;
              this.state.boxState.mySel.x = this.state.boxState.mx - this.state.boxState.offsetx;
              this.state.boxState.mySel.y = this.state.boxState.my - this.state.boxState.offsety;
              this.state.boxState.isDrag = true;
              
              this.invalidate();
              this.clear(this.state.boxState.gctx);
              return;
            }
          }
        }
        // havent returned means we have selected nothing
        this.state.boxState.mySel = null;
        // clear the ghost canvas for next time
        this.clear(this.state.boxState.gctx);
        // invalidate because we might need the selection border to disappear
        this.invalidate();
    }

    myUp(e) {
        this.state.boxState.isDrag = false;
        this.state.boxState.isResizeDrag = false;
        this.state.boxState.expectResize = -1;
    }

    /* myDblClick(e) {
        this.getMouse(e);
        // for this method width and height determine the starting X and Y, too.
        // so I left them as vars in case someone wanted to make them args for something and copy this code
        var width = 20;
        var height = 20;
        this.addRect(
            this.state.boxState.mx - (width / 2), 
            this.state.boxState.my - (height / 2), 
            width, 
            height, 
            'rgba(220,205,65,0.7)'
        );
    } */

    invalidate() {
        this.state.boxState.canvasValid = false;
    }

    getMouse(e) {
        var element = this.state.boxState.canvas, offsetX = 0, offsetY = 0;
        if (element.offsetParent) {
            do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        // Add padding and border style widths to offset
        offsetX += this.state.boxState.stylePaddingLeft;
        offsetY += this.state.boxState.stylePaddingTop;

        offsetX += this.state.boxState.styleBorderLeft;
        offsetY += this.state.boxState.styleBorderTop;

        this.state.boxState.mx = e.pageX - offsetX;
        this.state.boxState.my = e.pageY - offsetY
    }

    /* drawImage() {
		if (this.state.files.length > 0) {
            const canvas = this.state.boxState.canvas;
			const ctx = this.state.boxState.ctx;
			
			const img = new Image();
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			img.src = this.state.files[this.state.currentFileIndex][1];

			img.onload = () => {
				ctx.save();
				ctx.globalCompositeOperation = "destination-over";
				ctx.drawImage(img, 0, 0);
				ctx.restore();

				this.dispatch({ 
					type: "SET_CURRENT_IMAGE_SIZE", 
					size: {width: img.width, height: img.height} });
			};
			img.onerror = (err) => {
				console.log("img error");
				console.error(err);
			};
		}
	} */

}