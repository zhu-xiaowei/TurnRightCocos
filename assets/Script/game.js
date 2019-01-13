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
        //汽车速度
        this.speed = 400;
        //拐弯半径
        this.raduis = this.innerRect.width / 2 + (this.outRect.width - this.innerRect.width) / 4;
        //旋转速度(画圆)
        this.angleRoundSpeed = 180 * this.speed / (Math.PI * this.raduis);

        //漂移旋转速度比例通过如下公式计算 ~ 0.675
        // this.rate = (Math.PI - Math.acos(this.innerRect.width / 2 / this.raduis)) / Math.PI;
        this.rate = 0.675008944;
        console.log("rate is : " + this.rate)
        //真实汽车旋转速度
        this.angleShiftSpeed = this.angleRoundSpeed / this.rate;
        //汽车漂移的方向
        this.shiftAngle = 0;
        //当前需要漂移的总时间
        this.shiftTime = 0;
        //当前需要漂移的剩余时间
        this.leftShiftTime = 0;
        //汽车横向漂移的初速度
        this.startShiftSpeed = 0;
        //汽车横向漂移的当前速度
        this.shiftSpeed = 0;

        //手指是否触摸
        this.isTouch = false;
        //初始化出生位置
        this.car.setPosition(this.getStartPosition());
        console.log("raduis is", this.raduis)
        //触摸 this不能少!
        this.mCanvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            //触摸位置在矩形的下部
            if (event.getLocationY() - this.mCanvas.height / 2 < this.outRect.y) {
                //按下时清零漂移时间
                this.shiftTime = 0;
                this.shiftAngle = this.car.angle;
                this.isTouch = true;
            }
        }, this)
        //抬起
        this.mCanvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            //漂移时间为转向时间的 比例
            console.log("按下时间 " + this.shiftTime);
            this.shiftTime *= this.shiftTime * 0.3;
            console.log("漂移时间 " + this.shiftTime);
            //初始化剩余漂移时间
            this.leftShiftTime = this.shiftTime;
            this.isTouch = false;
        }, this)
    },



    //获取初始位置
    getStartPosition: function () {
        var x = this.innerRect.x - this.innerRect.width / 2 - (this.outRect.width - this.innerRect.width) / 4;
        var y = this.innerRect.y - this.innerRect.height / 2;
        return cc.v2(x, y);
    },

    //更新汽车位置和方向实现漂移和甩尾
    update: function (dt) {
        if (this.isTouch) {
            //汽车按照漂移角度旋转
            this.car.angle -= this.angleShiftSpeed * dt;
            this.shiftAngle -= this.angleRoundSpeed * dt;
            //汽车按照圆形曲线行驶
            this.car.x += this.speed * dt * Math.sin(-this.shiftAngle / 180 * Math.PI);
            this.car.y += this.speed * dt * Math.cos(-this.shiftAngle / 180 * Math.PI);
            this.shiftTime += dt;
        } else {
            if (this.leftShiftTime > 0) {
                //不改变汽车方向 且汽车方向的速度不变 让汽车当前速度在汽车行驶的垂直方向的分速度将为0实现漂移
                this.car.x += this.speed * dt * Math.sin(-this.car.angle / 180 * Math.PI);
                this.car.y += this.speed * dt * Math.cos(-this.car.angle / 180 * Math.PI);

                //让汽车往汽车垂直方向漂移，漂移方向为匀减速运动 直到速度为0 


                //需要重点优化，效果不好


                if (this.startShiftSpeed == 0) {
                    //计算漂移初始速度 为漂移方向的分速度
                    this.startShiftSpeed = this.speed * (Math.sin((this.shiftAngle - this.car.angle) / 180));
                    console.log("汽车漂移初始速度： " + this.startShiftSpeed);
                }
                this.leftShiftTime -= dt;
                if (this.leftShiftTime > 0) {
                    this.shiftSpeed = this.startShiftSpeed * (this.leftShiftTime / this.shiftTime);
                    console.log("漂移速度： " + this.shiftSpeed);
                    this.car.x += this.shiftSpeed * dt * Math.sin((-this.car.angle - 90) / 180 * Math.PI);
                    this.car.y += this.shiftSpeed * dt * Math.cos((-this.car.angle - 90) / 180 * Math.PI);
                }
            } else {
                //汽车按照切线方向行驶
                if (this.startShiftSpeed > 0) {
                    this.startShiftSpeed = 0;
                }
                this.car.x += this.speed * dt * Math.sin(-this.car.angle / 180 * Math.PI);
                this.car.y += this.speed * dt * Math.cos(-this.car.angle / 180 * Math.PI);
            }
        }
    },


    //移除监听
    onDestroy: function () {
        this.Node.off(cc.Node.EventType.TOUCH_START, this);
        this.Node.off(cc.Node.EventType.TOUCH_END, this);
    },
});
