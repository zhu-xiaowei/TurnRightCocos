cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:
    listening: function () {
        this.node.active = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },


    eventDown: function (event) {
        event.stopPropagation();
    },
    eventUp: function (event) {
        event.stopPropagation();
    },
    // update (dt) {},
});
