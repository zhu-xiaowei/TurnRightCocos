cc.Class({
    extends: cc.Component,

    listening: function () {
        if(this.node.opacity<255){
            var anim = this.getComponent(cc.Animation);
            anim.play();
        }
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },


    hideRankImg: function () {
        var anim = this.getComponent(cc.Animation);
        anim.play('hideRankImg');
    },

    eventDown: function (event) {
        event.stopPropagation();

    },

    eventUp: function (event) {
        event.stopPropagation();
        cc.director.loadScene("RankingView");
    },
});
