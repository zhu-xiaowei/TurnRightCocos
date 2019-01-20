cc.Class({
    extends: cc.Component,

    load() {
        this.node.active = true;
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },

    eventDown: function (event) {
        event.stopPropagation();

    },
    eventUp: function (event) {
        event.stopPropagation();
        //调用排行版
    },
});
