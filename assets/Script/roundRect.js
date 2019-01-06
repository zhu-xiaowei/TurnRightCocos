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
        _radiu: 0,
        _width: 0,
        _height: 0,
        _fullColor: cc.color(),
        radiu: {
            type: cc.Float,
            get: function () {
                return this._radiu;
            },
            set: function (val) {
                this._radiu = val;
                this._refreshRect();
            },
            tooltip: "半径"
        },
        width: {
            type: cc.Float,
            get: function () {
                return this._width;
            },
            set: function (val) {
                this._width = val;
                this._refreshRect();
            },
            tooltip: "宽度"
        },
        height: {
            type: cc.Float,
            get: function () {
                return this._height;
            },
            set: function (val) {
                this._height = val;
                this._refreshRect();
            },
            tooltip: "高度"
        },
        fullColor: {
            type: cc.Color,
            get: function () {
                return this._fullColor;
            },
            set: function (val) {
                this._fullColor = val;

                this._refreshRect();
            },
            tooltip: "填充颜色"
        }
    },


    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},

    onLoad() {
        var g = this.getComponent(cc.Graphics);

        g.lineWidth = 0;
        g.fillColor.fromHEX('#78A687');
        var width = this.node.width;
        var height = this.node.height;
        // round rect
        g.roundRect(-width / 2, -height / 2, width, height, width / 2);
        g.stroke();
        g.fill();
    },
    // update (dt) {},
});