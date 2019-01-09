cc.Class({
    extends: cc.Component,

    properties: {
        mCanvas: {
            default: null,
            type: cc.Node
        },
        outRect: {
            default: null,
            type: cc.Node
        },
        innerRect: {
            default: null,
            type: cc.Node
        },
        car: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        //初始化未触摸
        this.speed = 400;
        this.raduis = this.innerRect.width / 2 + (this.outRect.width - this.innerRect.width) / 4;
        this.angleSpeed = 180 * this.speed / (Math.PI * this.raduis);
        this.direction = Math.PI / 2;
        this.isTouch = false;
        this.car.setPosition(this.getStartPosition());

        console.log("raduis is", this.raduis)
        this.touchTop = this.outRect.y;
        //触摸 this不能少!
        this.mCanvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (event.getLocationY() - this.mCanvas.height / 2 < this.outRect.y) {
                this.isTouch = true;
            }
        }, this)
        //抬起
        this.mCanvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.isTouch = false;
        }, this)
    },



    getStartPosition: function () {
        var x = this.innerRect.x - this.innerRect.width / 2 - (this.outRect.width - this.innerRect.width) / 4;
        var y = this.innerRect.y - this.innerRect.height / 2;
        return cc.v2(x, y);
    },

    // called every frame
    update: function (dt) {
        this.car.x += this.speed * dt * Math.sin(-this.car.angle/180*Math.PI);
        this.car.y += this.speed * dt * Math.cos(-this.car.angle/180*Math.PI);
        if (this.isTouch) {
            this.car.angle -= this.angleSpeed * dt;
        }
    },


    onDestroy: function () {
        this.Node.off(cc.Node.EventType.TOUCH_START, this);
    },
});
