
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
        console.log("topY：" + this.topY + " bottomY：" + this.bottomY);
    },

    //碰撞出去 1和 3
    onCollisionExit: function (other, self) {
        //碰撞到上面的圆形
        if (self.tag == 1 && other.node.y > 0) {
            console.log("other.node.x：" + other.node.x + "  self.node.x：" + self.node.x);
            if (other.node.x < 0) {
                //在左侧一定是碰撞
                console.log("顶部左侧碰撞");
            } else {
                if (other.node.y > this.topY) {
                    console.log("顶部右侧碰撞");
                }
            }
        }
        //碰撞到底部的圆形
        if (self.tag == 3 && other.node.y < 0) {
            console.log("other.node.x：" + other.node.x + "  self.node.x：" + self.node.x);
            if (other.node.x > 0) {
                //在左侧一定是碰撞
                console.log("底部右侧碰撞");
            } else {
                if (other.node.y < this.bottomY) {
                    console.log("底部左侧碰撞");
                }
            }
        }

    },

    //碰撞进入 tag 0和2是肯定是碰到了
    onCollisionEnter: function (other, self) {
        if (self.tag == 0 || self.tag == 2) {
            console.log("侧面碰撞");
        }
    },


    // start () {
    // },

    // update (dt) {},
});
