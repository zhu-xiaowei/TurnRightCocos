cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    showStopImg: function () {
        this.node.active = true;
        var anim = this.getComponent(cc.Animation);
        anim.play();
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },

    hideStopImg: function () {
        var anim = this.getComponent(cc.Animation);
        anim.play('hideStopImg');
    },

    //动画结束之后设置active状态
    onFinishHideStopImg: function () {
        this.node.active = false;
    },

    eventDown: function (event) {
        event.stopPropagation();
    },
    eventUp: function (event) {
        event.stopPropagation();
        this.game.stopGame();
    },
    // update (dt) {},
});
