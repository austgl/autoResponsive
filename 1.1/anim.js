/**
 * @Description: 兼容css3和低版本浏览器动画效果
 * @Author:      dafeng.xdf[at]taobao.com
 * @Date:        2013.3.5
 */
KISSY.add(function (S) {
    'use strict';
    var D = S.DOM, Anim = S.Anim,

        letIE10 = S.UA.ie < 11,

        prefixes = ['-webkit-', '-moz-', '-ms-', '-o-', ''];

    /**
     * @name AutoAnim
     * @class css动画，采用帧重复
     * @constructor
     */
    function AutoAnim(cfg) {
        this.cfg = cfg;
        this._init();
    }

    S.augment(AutoAnim, {
        _init: function () {
            this[letIE10 ? 'fixedAnim' : 'css3Anim']();
        },
        /**
         * supply css ua prefix
         */
        cssPrefixes: function (styleKey, styleValue) {
            var fixedRule = {};

            for (var i = 0, len = prefixes.length; i < len; i++) {
                fixedRule[prefixes[i] + styleKey] = styleValue;
            }

            return fixedRule;
        },
        /**
         * css3动画效果
         */
        css3Anim: function () {
            /*
             * css3效果代码添加
             * 为了减少对象读取css3模式去除duration配置，改为css中读取
             */
            var cfg = this.cfg;
            // TODO 优化点：既然css3Anim在循环中，可以考虑将‘cfg.direction !== 'right'’该判断条件在逻辑树上上提，以加快该函数的执行
            D.css(cfg.elm, self.cssPrefixes('transform', 'translate(' + ((cfg.direction !== 'right') ? cfg.x : (cfg.owner.gridSort.containerWH - cfg.elm.__width - cfg.x)) + 'px,' + cfg.y + 'px) '));

            // 单元排序后触发
            cfg.owner.fire('afterUnitSort', {
                autoResponsive: {     // TODO 优化点：既然是给自定义事件传参，没必要再多挂一层 'autoResponsive' key
                    elm: cfg.elm,
                    position: {
                        x: cfg.x,
                        y: cfg.y
                    },
                    frame: cfg.owner.frame
                }
            });
        },
        /**
         * 降级模拟css3动画
         */
        fixedAnim: function () {
            var cfg = this.cfg,
                cssRules = {'top': cfg.y};

            if (cfg.closeAnim) {
                this.noneAnim();
                return;
            }

            cssRules[cfg.direction == 'right' ? 'right' : 'left'] = cfg.x;

            new Anim(cfg.elm, cssRules, cfg.duration, cfg.easing, function () {

                // 单元排序后触发
                cfg.owner.fire('afterUnitSort', {
                    autoResponsive: {
                        elm: cfg.elm,
                        position: {
                            x: cfg.x,
                            y: cfg.y
                        },
                        frame: cfg.owner.frame
                    }
                });
            }).run();
        },
        /**
         * 无动画
         */
        noneAnim: function () {
            var cfg = this.cfg;

            D.css(cfg.elm, {
                left: cfg.x,
                top: cfg.y
            });

            // 单元排序后触发
            cfg.owner.fire('afterUnitSort', {
                autoResponsive: {
                    elm: cfg.elm,
                    position: {
                        x: cfg.x,
                        y: cfg.y
                    },
                    frame: cfg.owner.frame
                }
            });
        }
    });
    return AutoAnim;
}, {requires: ['dom', 'anim']});
