
cc.Class({
    extends: cc.Component,

    properties: {
    },
    //得分线消失动画
    showCirlceAnim: function () {
        var anim = this.getComponent(cc.Animation);
        anim.play();
    },
});
