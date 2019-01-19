cc.Class({
    extends: cc.Component,
    properties: {
    },
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = false;
        this.showPosition = 1;
    },

    onCollisionEnter: function (other) {
        //得分
        this.game.onGainScore();
        //得分线消失动画
        this.showGainScoreAnim();
    },

    //得分线消失动画
    showGainScoreAnim: function () {
        var anim = this.getComponent(cc.Animation);
        anim.play();
    },
    
    //得分线出现动画
    showLineStartAnim: function () {
        //放到另一边
        this.node.setPosition(cc.v2(-this.node.x, 0))
        this.node.width = 0;
        this.node.height = 8;
        var anim = this.getComponent(cc.Animation);
        anim.play('showScoreLine');
    },

    initScoreLine: function () {
        if (this.node.x > 0) {
            this.showLineStartAnim();
        }
    },
});
