cc.Class({
    extends: cc.Component,

    properties: {
        mCanvas: {
            default: null,
            type: cc.Node
        },
        outRect: {
            default: null,
            type: cc.Node
        },
        scoreLine: {
            default: null,
            type: cc.Node
        },
        //显示分数Label
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        innerRect: {
            default: null,
            type: cc.Node
        },
        car: {
            default: null,
            type: cc.Node
        },
        starTextPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {
        //开启抗锯齿
        this.firstInit = true;
        this.isTouchLower = false;
        cc.view.enableAntiAlias(true);
        cc.macro.ENABLE_WEBGL_ANTIALIAS = true;
        cc.view.enableRetina(true);

        this.initGame();
    },

    initGame: function () {
        this.gameStatus = 0;//-1 失败 0初始化 1正在运行，2暂停
        this.scoreDisplay.string = 0;
        this.score = 0;

        //初始化car
        this.car.getComponent('car').game = this;
        this.car.getComponent('car').init();

        //触摸 
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);

        //绑定game到碰撞监听器
        this.innerRect.getComponent('innerListener').game = this;
        this.outRect.getComponent('outerListener').game = this;
        this.scoreLine.getComponent('scoreListener').game = this;
        //显示开始游戏文字
        if(this.firstInit){
            this.startText = cc.instantiate(this.starTextPrefab);
            this.node.addChild(this.startText);
            this.scheduleOnce(function () {
                this.setStartTextPosition();
            }, 0.2);
        }
        this.startText.getComponent('startText').show();
    },

    //初始化开始游戏的文字
    setStartTextPosition: function () {
        var y = this.outRect.y - this.outRect.height / 1.7;
        this.startText.setPosition(cc.v2(0, y));
    },


    eventDown: function (event) {
        //触摸开始时才去初始化外层碰撞监听
        let touchTop = this.mCanvas.height / 2 + this.outRect.y;
        if (event.getLocationY() < touchTop) {
            this.isTouchLower = true;
            if (this.firstInit) {
                this.outRect.getComponent('outerListener').init();
                this.firstInit = false;
            }
            //按下时清零漂移时间
            this.car.getComponent('car').onTouchDown();
        } else {
            this.isTouchLower = false;
        }
    },

    eventUp: function (event) {
        if (this.gameStatus !== 1 && this.isTouchLower === true) {
            this.gameStatus = 1;
            //隐藏开始游戏文字
            this.startText.getComponent('startText').hide();
        }
        this.car.getComponent('car').onTouchUp();
    },


    //更新
    // update: function (dt) {
    // },


    //得分
    onGainScore: function () {
        this.score++;
        this.scoreDisplay.string = this.score;
    },

    //游戏结束
    onGameOver: function () {
        //这里需要移除触摸监听
        this.removeListener();
        this.gameStatus = -1;
        this.scheduleOnce(function () {
            this.initGame();
        }, 1);
    },


    //移除监听
    onDestroy: function () {
        this.removeListener();
    },

    removeListener: function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.eventUp, this);
    },
});
