cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    listening: function () {
        this.node.active = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },

    start() {

    },

    eventDown: function (event) {
        event.stopPropagation();
    },
    eventUp: function (event) {
        event.stopPropagation();
        this.game.startGame();
    },

    // update (dt) {},
});
