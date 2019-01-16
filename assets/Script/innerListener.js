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
        this.game.onGameOver();
    },

    // start () {
    // },

    // update (dt) {},
});
