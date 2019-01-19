cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },
    onCollisionEnter: function (other) {
        this.game.onGainScore();
    },
});
