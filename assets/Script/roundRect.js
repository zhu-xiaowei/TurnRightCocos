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
        _orientation: 0,//0竖直，1水平
        _fullColor: cc.color(),
        orientation: {
            type: cc.Integer,
            get: function () {
                return this._orientation;
            },
            set: function (val) {
                this._orientation = val;
            },
            tooltip: "方向"
        },
        fullColor: {
            type: cc.Color,
            get: function () {
                return this._fullColor;
            },
            set: function (val) {
                this._fullColor = val;
            },
            tooltip: "填充颜色"
        }
    },


    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    onLoad() {
        var g = this.getComponent(cc.Graphics);
        g.lineCap = cc.Graphics.LineCap.BUTT;
        g.lineJoin = cc.Graphics.LineJoin.BUTT
        g.lineWidth = 0;
        // g.fillColor.fromHEX('#78A687');
        g.fillColor = this._fullColor;

        var width = this.node.width;
        var height = this.node.height;
        if (this._orientation == 0) {
            g.roundRect(-width / 2, -height / 2, width, height, width / 2);
        } else {
            g.roundRect(-width / 2, -height / 2, width, height, height / 2);
        }
        g.stroke();
        g.fill();
    },
    // update (dt) {},
});