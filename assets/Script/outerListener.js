
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        //计算出边界y值
        this.topY = this.node.height / 2 - this.node.width / 2;
        this.bottomY = - this.node.height / 2 + this.node.width / 2;

        //半径的平方
        this.r2 = this.node.width * this.node.width / 4;
        //计算两个圆心坐标
        this.radiusX = this.node.parent.width / 2;
        this.radiusY1 = this.node.parent.height / 2 + this.node.y + this.topY;
        this.radiusY2 = this.node.parent.height / 2 + this.node.y - this.topY;
    },

    onCollisionStay: function (other, self) {
        if (!this.game.Playing) return;
        var world = other.world;
        //碰撞到上面的圆形
        if (self.tag === 1 && other.node.y > this.topY - other.node.height / 2) {
            if (this.isCollision(world.points, 1)) {
                this.game.onGameOver();
            }
        } else if (self.tag === 3 && other.node.y < this.bottomY + other.node.height / 2) {
            if (this.isCollision(world.points, 2)) {
                this.game.onGameOver();
            }
        }
    },


    //碰撞进入 tag 0和2是肯定是碰到了侧面
    onCollisionEnter: function (other, self) {
        if (self.tag === 0 || self.tag === 2) {
            this.onCarCollision();
        }
    },


    //检测到碰撞
    onCarCollision: function () {
        this.game.onGameOver();
    },


    isCollision: function (array, tag) {
        //只判断左边的点即可
        var length = array.length / 2;
        if (tag === 1) {
            for (var i = 0; i < length; i++) {
                var dx = array[i].x - this.radiusX, dy = array[i].y - this.radiusY1
                if (array[i].y > this.radiusY1 && dx * dx + dy * dy > this.r2) {
                    return true;
                }
            }
        } else {
            for (var i = 0; i < length; i++) {
                var dx = array[i].x - this.radiusX, dy = array[i].y - this.radiusY2
                if (array[i].y < this.radiusY2 && dx * dx + dy * dy > this.r2) {
                    return true;
                }
            }
        }
        return false;
    },

    // start () {
    // },

    // update (dt) {},
});
