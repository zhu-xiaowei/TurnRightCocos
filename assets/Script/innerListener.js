cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onCollisionEnter: function (other) {
        console.log("汽车碰到内壁");
    },


    // start () {
    // },

    // update (dt) {},
});
