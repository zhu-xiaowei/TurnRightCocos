
cc.Class({
    extends: cc.Component,

    editor: {
        // 允许当前组件在编辑器模式下运行。
        // 默认情况下，所有组件都只会在运行时执行，也就是说它们的生命周期回调在编辑器模式下并不会触发。
        //
        // 值类型：Boolean
        // 默认值：false
        executeInEditMode: true,
    },
    properties: {
        speed: 2,
        circleBar: {
            type: cc.ProgressBar,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.circleBar.progress = 0;
        this.progressTo = 0;
        this.TotalNumber = 1;
    },

    update(dt) {
        if (this.progressTo === 0) {
            this.circleBar.progress = 0;
            return;
        }
        var progress = this.circleBar.progress;
        if (progress < this.progressTo) {
            progress += dt * this.speed / this.TotalNumber;
        }
        if (progress >= 1) {
            progress = 0;
            this.progressTo = 0;
            //默认 自加
            this.TotalNumber++;
            //调用game的动画
            this.game.showBaseScoreAddedAnim();
        }
        this.circleBar.progress = progress;
    },

    updateProgress(progress, basescore) {
        this.progressTo = progress / basescore;
        this.TotalNumber = basescore;
    },
});
