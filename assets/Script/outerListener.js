
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        //计算出边界y值
        this.topY = this.node.y + this.node.parent.height / 2 + this.node.height / 2 - this.node.width / 2;
        this.bottomY = this.node.y + this.node.parent.height / 2 - this.node.height / 2 + this.node.width / 2;
    },

    //碰撞出去 1和 3
    onCollisionExit: function (other, self) {
        var world = self.world;
        if (self.tag == 1 && other.node.y > this.node.y) {
            if(other.node.angle % 360 > -90){
                //向上
                console.log("顶部碰撞：");
            }else{
                //向下
                // if()
            }
            // && world.position.y >= this.topY
            console.log("顶部碰撞：");
        }
        // if (self.tag == 3 && world.position.y <= this.bottomY) {
        //     console.log("底部碰撞："+world.position);
        //     console.log("bottomY is:"+this.bottomY);
        //     console.log(world.position.y <= this.bottomY);
        // }

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
