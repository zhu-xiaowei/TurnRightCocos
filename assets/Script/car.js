cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {

    },
    init: function () {
        //汽车速度
        this.speed = 700;
        //拐弯半径
        this.raduis = this.game.innerRect.width / 2 + (this.game.outRect.width - this.game.innerRect.width) / 4;
        //旋转速度(画圆)
        this.angleRoundSpeed = 180 * this.speed / (Math.PI * this.raduis);
        //漂移旋转速度比例通过如下公式计算 ~ 0.675
        // this.rate = (Math.PI - Math.acos(this.innerRect.width / 2 / this.raduis)) / Math.PI;
        this.rate = 0.675008944;
        //真实汽车旋转速度 大于汽车行驶方向的速度改变 实现漂移
        this.angleShiftSpeed = this.angleRoundSpeed / this.rate;
        //汽车漂移的方向
        this.shiftAngle = 0;
        //初始化出生位置
        this.node.setPosition(this.getStartPosition());
        this.node.angle = 0;
         //手指是否触摸
         this.isTouch = false;
    },

    //获取初始位置
    getStartPosition: function () {
        var x = this.game.innerRect.x - this.game.innerRect.width / 2 - (this.game.outRect.width - this.game.innerRect.width) / 4;
        var y = this.game.innerRect.y - this.game.innerRect.height / 2 + this.node.height / 2;
        return cc.v2(x, y);
    },


    onTouchDown: function () {
        this.shiftAngle = this.node.angle;
        this.isTouch = true;
    },

    onTouchUp: function () {
        this.isTouch = false;
    },


    //更新汽车位置和方向实现漂移和甩尾
    update(dt) {
        if (this.game.gameStatus !== 1) return;
        if (this.isTouch) {
            //汽车按照漂移角度旋转
            this.node.angle -= this.angleShiftSpeed * dt;
            this.shiftAngle -= this.angleRoundSpeed * dt;
            //汽车按照圆形曲线行驶
            this.node.x += this.speed * dt * Math.sin(-this.shiftAngle / 180 * Math.PI);
            this.node.y += this.speed * dt * Math.cos(-this.shiftAngle / 180 * Math.PI);
        } else {
            if (this.node.angle < this.shiftAngle) {
                this.shiftAngle -= this.angleRoundSpeed * dt;
                //不改变汽车方向
                this.node.x += this.speed * dt * Math.sin(-this.shiftAngle / 180 * Math.PI);
                this.node.y += this.speed * dt * Math.cos(-this.shiftAngle / 180 * Math.PI);
            } else {
                //汽车按照切线方向行驶
                this.node.x += this.speed * dt * Math.sin(-this.node.angle / 180 * Math.PI);
                this.node.y += this.speed * dt * Math.cos(-this.node.angle / 180 * Math.PI);
            }
        }
    },

});
