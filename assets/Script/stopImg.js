cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    listening: function () {
        this.node.active = true;
        var anim = this.getComponent(cc.Animation);
        anim.play('showStopImg');
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },

    hideStopImg: function () {
        var anim = this.getComponent(cc.Animation);
        anim.play('hideStopImg');
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
