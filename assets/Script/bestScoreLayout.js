
cc.Class({
    extends: cc.Component,
    properties: {
        bestScoreTv: {
            default: null,
            type: cc.Label
        },
    },


    showBestScoreLayout: function (score) {
        this.node.active = true;
        this.bestScoreTv.string = score;
        var anim = this.getComponent(cc.Animation);
        anim.play();
    },


    hideBestScoreLayout: function () {
        var anim = this.getComponent(cc.Animation);
        anim.play('hideBestScore');
    },


    //动画消失后调用暂停的显示动画
    showStopImgAnim: function () {
        this.node.active = false;
        this.game.stopImg.getComponent('stopImg').showStopImg();
    }
});
