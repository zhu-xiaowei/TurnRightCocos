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
        perfectTv: {
            default: null,
            type: cc.Label
        },
        //显示分数Label
        baseScoreTv: {
            default: null,
            type: cc.Label
        },
        totalScoreTv: {
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
        scoreCircle: {
            default: null,
            type: cc.Node
        },
        progressCircle: {
            default: null,
            type: cc.Node
        },
        bestScoreLayout: {
            default: null,
            type: cc.Node
        },
        bestScoreTv: {
            default: null,
            type: cc.Node
        },
        rank: {
            default: null,
            type: cc.Node
        },
        stopImg: {
            default: null,
            type: cc.Node
        },
        startLayout: {
            default: null,
            type: cc.Node
        },
        startImg: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        //开启抗锯齿
        this.firstInit = true;
        //处理第一次点击到上方touchup判断的错误的情况
        this.isTouchLower = false;
        //抗锯齿似乎没有用
        cc.view.enableAntiAlias(true);
        cc.macro.ENABLE_WEBGL_ANTIALIAS = true;
        cc.view.enableRetina(true);

        //初始化游戏
        this.initGame();
    },

    initGame: function () {
        this.gameStatus = 0;//-1 失败 0初始化 1正在运行，2暂停

        //基础得分
        this.baseScore = 1;
        //总得分
        this.totalScore = 0;
        //当前基数进行到第几个
        this.progress = 0;
        //下个得分之前的触摸次数
        this.touchNumber = 0;
        //连续perfect的次数
        this.perfectNumber = 0;

        //初始化关闭和隐藏
        this.startLayout.active = false;
        this.rank.active = true;


        //初始化car
        this.car.getComponent('car').game = this;
        this.car.getComponent('car').init();

        //触摸 
        this.node.on(cc.Node.EventType.TOUCH_START, this.eventDown, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.eventUp, this);

        //绑定game到碰撞监听器
        this.innerRect.getComponent('innerListener').game = this;
        this.outRect.getComponent('outerListener').game = this;
        this.scoreLine.getComponent('scoreLine').game = this;
        this.progressCircle.getComponent('progressCircle').game = this;
        this.stopImg.getComponent('stopImg').game = this;
        this.startImg.getComponent('startImg').game = this;
        this.scoreLine.getComponent('scoreLine').initScoreLine();

        //显示开始游戏文字
        if (this.firstInit) {
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
        var y = this.outRect.y - this.outRect.height / 1.8;
        this.startText.setPosition(cc.v2(0, y));
    },


    eventDown: function (event) {
        //触摸开始时才去初始化外层碰撞监听
        let touchTop = this.mCanvas.height / 2 + this.outRect.y;
        if (event.getLocationY() < touchTop) {
            //有效触摸
            //更新当前触摸次数
            this.touchNumber++;
            this.isTouchLower = true;
            if (this.firstInit) {
                this.outRect.getComponent('outerListener').init();
                this.firstInit = false;
            } else {
                //首次不触发 
                this.car.getComponent('car').onTouchDown();
            }

        } else {
            this.isTouchLower = false;
        }
    },

    eventUp: function (event) {
        if (this.gameStatus !== 1 && this.isTouchLower === true) {
            this.gameStatus = 1;
            //开始游戏之前调用
            this.initStartGame();

        }
        this.car.getComponent('car').onTouchUp();
    },

    //正式开始游戏之前清除之前的记录
    initStartGame: function () {
        this.baseScoreTv.string = 1;
        this.totalScoreTv.string = 0;
        this.startText.getComponent('startText').hide();
        //更新进度条
        this.updateCircleProgress();
        //显示暂停按钮
        this.stopImg.getComponent('stopImg').listening();
        //关闭排行显示
        this.rank.active = false;
        //关闭最高分显示
        this.bestScoreLayout.active = false;
    },



    //更新
    // update: function (dt) {
    // },


    //得分
    onGainScore: function () {
        //先判断是否是perfect
        if (this.touchNumber == 1 && this.totalScore > 0) {
            this.perfectNumber++;
        } else {
            //一次不是perfet终止perfectNumer累加
            this.perfectNumber = 0;
        }
        if (this.perfectNumber > 0) {
            //显示动画
            this.perfectTv.string = "perfect ×" + this.perfectNumber;
            this.perfectTv.getComponent('perfectTv').showPerfectTvAnim(this.scoreLine.x);
        }
        //总分 = 基础分数 * percet次数
        this.totalScore += this.baseScore * (this.perfectNumber + 1);
        this.totalScoreTv.string = this.totalScore;

        if (this.progress < this.baseScore) {
            //更新当前进度
            if (this.totalScore > 1) {
                this.progress++;
                this.updateCircleProgress();
                if (this.progress == this.baseScore) {
                    //进入下一轮
                    this.progress = 0;
                    this.baseScore++;
                    this.baseScoreTv.string = this.baseScore;
                }
            }
        }
        //得分完成之后将触摸次数置0
        this.touchNumber = 0;
    },


    //播放得分动画 
    showBaseScoreAddedAnim: function () {
        this.scoreCircle.getComponent('circleAnim').showCirlceAnim();
    },
    //更新进度
    updateCircleProgress: function () {
        this.progressCircle.getComponent('progressCircle').updateProgress(this.progress, this.baseScore);
    },

    //暂停游戏
    stopGame: function () {
        //停止游戏
        this.gameStatus = 2;
        //显示开始界面
        this.startLayout.getComponent('startLayout').listening();
        //开始监听
        this.startImg.getComponent('startImg').listening();
    },

    //开始游戏
    startGame: function () {
        //开始游戏
        this.gameStatus = 1;
        //显示开始界面
        this.startLayout.active = false;
    },


    //游戏结束
    onGameOver: function () {
        //这里需要移除触摸监听
        this.removeListener();
        this.gameStatus = -1;
        //隐藏暂停
        this.stopImg.getComponent('stopImg').hideStopImg();
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
