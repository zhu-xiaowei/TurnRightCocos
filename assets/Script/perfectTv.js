
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    //得分线出现动画
    showPerfectTvAnim: function (positionX) {
        //放到另一边
        this.node.setPosition(cc.v2(positionX, 0))
        var anim = this.getComponent(cc.Animation);
        anim.play();
    },

    // update (dt) {},
});
