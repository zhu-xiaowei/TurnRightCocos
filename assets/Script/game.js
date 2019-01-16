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
        scoreLine: {
            default: null,
            type: cc.Node
        },
        //显示分数Label
        scoreDisplay: {
            default: null,
            type: cc.Label
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
        this.initGame();
    },


    initGame: function () {
        //是否开始游戏
        this.Playing = false;
        this.scoreDisplay.string = 0;
        this.score = 0;

        //汽车速度
        this.speed = 400;
        //拐弯半径
        this.raduis = this.innerRect.width / 2 + (this.outRect.width - this.innerRect.width) / 4;
        //旋转速度(画圆)
        this.angleRoundSpeed = 180 * this.speed / (Math.PI * this.raduis);

        //漂移旋转速度比例通过如下公式计算 ~ 0.675
        // this.rate = (Math.PI - Math.acos(this.innerRect.width / 2 / this.raduis)) / Math.PI;
        this.rate = 0.675008944;
        //真实汽车旋转速度 大于汽车行驶方向的速度改变 实现漂移
        this.angleShiftSpeed = this.angleRoundSpeed / this.rate;
        //汽车漂移的方向
        this.shiftAngle = 0;
        //手指是否触摸
        this.isTouch = false;
        //初始化出生位置
        this.car.setPosition(this.getStartPosition());
        this.car.angle = 0;
        //触摸 
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);

        //绑定game到碰撞监听器
        this.innerRect.getComponent('innerListener').game = this;
        this.outRect.getComponent('outerListener').game = this;
        this.scoreLine.getComponent('scoreListener').game = this;
        // this.outRect.getComponent('outerListener').canvas = this.mCanvas;
    },

    eventDown: function (event) {
        //触摸位置在矩形的下部
        if (event.getLocationY() - this.mCanvas.height / 2 < this.outRect.y) {
            //按下时清零漂移时间
            this.shiftAngle = this.car.angle;
            this.isTouch = true;
        }
    },
    eventUp: function (event) {
        if (!this.Playing) {
            this.Playing = true;
        }
        this.isTouch = false;
    },


    //获取初始位置
    getStartPosition: function () {
        var x = this.innerRect.x - this.innerRect.width / 2 - (this.outRect.width - this.innerRect.width) / 4;
        var y = this.innerRect.y - this.innerRect.height / 2 + this.car.height / 2 + 2
        return cc.v2(x, y);
    },

    //更新汽车位置和方向实现漂移和甩尾
    update: function (dt) {
        if (!this.Playing) return;
        if (this.isTouch) {
            //汽车按照漂移角度旋转
            this.car.angle -= this.angleShiftSpeed * dt;
            this.shiftAngle -= this.angleRoundSpeed * dt;
            //汽车按照圆形曲线行驶
            this.car.x += this.speed * dt * Math.sin(-this.shiftAngle / 180 * Math.PI);
            this.car.y += this.speed * dt * Math.cos(-this.shiftAngle / 180 * Math.PI);
        } else {
            if (this.car.angle < this.shiftAngle) {
                this.shiftAngle -= this.angleRoundSpeed * dt;
                //不改变汽车方向
                this.car.x += this.speed * dt * Math.sin(-this.shiftAngle / 180 * Math.PI);
                this.car.y += this.speed * dt * Math.cos(-this.shiftAngle / 180 * Math.PI);
            } else {
                //汽车按照切线方向行驶
                this.car.x += this.speed * dt * Math.sin(-this.car.angle / 180 * Math.PI);
                this.car.y += this.speed * dt * Math.cos(-this.car.angle / 180 * Math.PI);
            }
        }
    },


    onGainScore: function () {
        this.score++;
        this.scoreDisplay.string = this.score
    },

    //游戏结束
    onGameOver: function () {
        this.Playing = false;
        this.removeListener();
        this.scheduleOnce(function () {
            this.initGame();
        }, 1);
    },


    //移除监听
    onDestroy: function () {
        this.removeListener();
    },

    removeListener: function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },
});
