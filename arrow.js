// 
//  arrow.js
//  <箭头对象>
// 

/**
 * 
 * @param {Object} x1起始点横坐标
 * @param {Object} y1起始点纵坐标
 * @param {Object} x2结束点横坐标
 * @param {Object} y2结束点纵坐标
 */
function Arrow(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.tmpX1 = null;
  this.tmpY1 = null;
  this.tmpX2 = null;
  this.tmpY2 = null;
  this.color = "black";

}

Arrow.prototype.setColor = function(color) {
  this.color=color;
}

/**
* 
* @param {Object} x1起始点横坐标
* @param {Object} y1起始点纵坐标
* @param {Object} x2结束点横坐标
* @param {Object} y2结束点纵坐标
*/
Arrow.prototype.setP = function(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
}

/**
* 第一个拐点
*/
Arrow.prototype.setP1 = function(tmpX1,tmpY1) {
  this.tmpX1=tmpX1;
  this.tmpY1=tmpY1;
}

/**
* 第二个拐点
*/
Arrow.prototype.setP2 = function(tmpX2,tmpY2) {
  this.tmpX2=tmpX2;
  this.tmpY2=tmpY2;
}


Arrow.prototype.drawBottomToTop = function(ctx) {
  if (this.x1 != this.x2) {
      this.setP1(this.x1,(this.y1+this.y2)/2);
      this.setP2(this.x2,(this.y1+this.y2)/2);
      this.draw(ctx);
  }else{
      this.draw(ctx);
  }
}

Arrow.prototype.drawLeftOrRightToTop = function(ctx) {
      this.setP1(this.x2,this.y1);
      this.draw(ctx);
}

Arrow.prototype.drawLeftToRightOrRightToLeft = function(ctx) {
  if (this.y1 != this.y2) {
      this.setP1((this.x1+this.x2)/2,this.y1);
      this.setP2((this.x1+this.x2)/2,this.y2);
      this.draw(ctx);
  }else{
      this.draw(ctx);
  }
}

Arrow.prototype.drawRound = function(ctx) {
  if (this.y1 != this.y2) {
      this.setP1(this.x1+200,this.y1);
      this.setP2(this.x2+200,this.y2);
      this.draw(ctx);
  }else{
      this.draw(ctx);
  }
}

Arrow.prototype.draw = function(ctx) {
  // arbitrary styling
  ctx.strokeStyle = this.color;
  ctx.fillStyle = this.color;
  // draw the line
  ctx.beginPath();
  ctx.moveTo(this.x1, this.y1);
  
  if(this.tmpX1 != null && this.tmpY1 != null && this.tmpX2 != null && this.tmpY2 != null) {
      ctx.lineTo(this.tmpX1, this.tmpY1);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.lineTo(this.x1, this.y1);
      console.log(this.tmpX1, this.tmpY1,this.tmpX2, this.tmpY2)
      ctx.moveTo(this.tmpX1, this.tmpY1)
      ctx.lineTo(this.tmpX2, this.tmpY2);
      
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.tmpX2, this.tmpY2);
      ctx.lineTo(this.x2, this.y2);
      ctx.closePath();
      ctx.stroke();
      var endRadians = Math.atan((this.y2 - this.tmpY2) / (this.x2 - this.tmpX2));
      endRadians += ((this.x2 >= this.tmpX2) ? 90 : -90) * Math.PI / 180;
      this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
  } else if(this.tmpX1 != null && this.tmpY1 != null && this.tmpX2 == null && this.tmpY2 == null) {
      ctx.lineTo(this.tmpX1, this.tmpY1);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(this.tmpX1, this.tmpY1)
      ctx.lineTo(this.x2, this.y2);
      ctx.closePath();
      ctx.stroke();
      var endRadians = Math.atan((this.y2 - this.tmpY1) / (this.x2 - this.tmpX1));
      endRadians += ((this.x2 >= this.tmpX1) ? 90 : -90) * Math.PI / 180;
      this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
  }else if(this.tmpX1 == null && this.tmpY1 == null && this.tmpX2 == null && this.tmpY2 == null){
      ctx.lineTo(this.x2, this.y2);
      ctx.closePath();
      ctx.stroke();
      var endRadians = Math.atan((this.y2 - this.y1) / (this.x2 - this.x1));
      endRadians += ((this.x2 >= this.x1) ? 90 : -90) * Math.PI / 180;
      this.drawArrowhead(ctx, this.x2, this.y2, endRadians);
  }
}

/**
* 画箭头
*/
Arrow.prototype.drawArrowhead = function(ctx, x, y, radians) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.rotate(radians);
  ctx.moveTo(0, 0);
  ctx.lineTo(5, 10);
  ctx.lineTo(-5, 10);
  ctx.closePath();
  ctx.restore();
  ctx.fill();
}