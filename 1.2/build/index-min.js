/*! autoResponsive - v1.2 - 2013-07-22 2:04:30 PM
* Copyright (c) 2013 xudafeng; Licensed  */
KISSY.add("gallery/autoResponsive/1.2/config",function(){"use strict";function e(){return{container:{value:t},selector:{value:t},filter:{value:t},fixedSelector:{value:t},priority:{value:t},gridWidth:{value:10},unitMargin:{value:{x:0,y:0}},closeAnim:{value:!1},duration:{value:1},easing:{value:"easeNone"},direction:{value:"left"},random:{value:!1},sortBy:{value:t},autoHeight:{value:!0},closeResize:{value:!1},autoInit:{value:!0},plugins:{value:[]},suspend:{value:!0},cache:{value:!1},resizeFrequency:{value:200},whensRecountUnitWH:{value:[]},delayOnResize:{value:-1},landscapeOrientation:{value:!1},exclude:{value:t}}}var t="";return e}),KISSY.add("gallery/autoResponsive/1.2/anim",function(e){"use strict";function t(e){this.cfg=e,this._init()}var n=e.DOM,i=e.Anim,r=11>e.UA.ie,o=["-webkit-","-moz-","-ms-","-o-",""],s=r?"fixedAnim":"css3Anim";return e.augment(t,{_init:function(){this[s]()},cssPrefixes:function(e,t){for(var n={},i=0,r=o.length;r>i;i++)n[o[i]+e]=t;return n},css3Anim:function(){var t=this.cfg;n.css(t.elm,this.cssPrefixes("transform","translate("+("right"!==t.direction?t.x:t.owner.gridSort.containerWH-t.elm.__width-t.x)+"px,"+t.y+"px) ")),t.owner.fire("afterUnitArrange",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}}),e.log("css3 anim success")},fixedAnim:function(){var t=this.cfg,n={top:t.y};return t.closeAnim?(this.noneAnim(),void 0):(n["right"==t.direction?"right":"left"]=t.x,new i(t.elm,n,t.duration,t.easing,function(){t.owner.fire("afterUnitArrange",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}})}).run(),e.log("kissy anim success"),void 0)},noneAnim:function(){var t=this.cfg;n.css(t.elm,{left:t.x,top:t.y}),t.owner.fire("afterUnitArrange",{autoResponsive:{elm:t.elm,position:{x:t.x,y:t.y},frame:t.owner.frame}}),e.log("maybe your anim is closed")}}),t},{requires:["dom","anim"]}),KISSY.add("gallery/autoResponsive/1.2/linkedlist",function(e){"use strict";function t(e){var t=this;t.length=0,t.head=null,t.tail=null,t.type=e.type||!0,t.query=[],t.init()}return e.augment(t,{init:function(){e.augment(Array,{shuffle:function(){for(var e,t,n=this.length;n;e=parseInt(Math.random()*n),t=this[--n],this[n]=this[e],this[e]=t);return this}})},add:function(e){var t=this;if(t.type)return t.query.push(e),void 0;var n={value:e,next:null,prev:null};0==t.length?t.head=t.tail=n:(t.tail.next=n,n.prev=t.tail,t.tail=n),t.length++},remove:function(e){var t=this;if(e>t.length-1||0>e)return null;var n=t.head,i=0;if(0==e)t.head=n.next,null==t.head?t.tail=null:t.head.previous=null;else if(e==t.length-1)n=t.tail,t.tail=n.prev,t.tail.next=null;else{for(;e>i++;)n=n.next;n.prev.next=n.next,n.next.prev=n.prev}t.length--},get:function(e){var t=this;return t.type?t.query[e]:t.node(e).value},node:function(e){var t=this;if(e>t.length-1||0>e)return null;for(var n=t.head,i=0;e>i++;)n=n.next;return n},update:function(e,t){var n=this;return n.type?(n.query[e]=t,void 0):(n.node(e).value=t,void 0)},size:function(){return this.query.length||this.length}}),t}),KISSY.add("gallery/autoResponsive/1.2/gridsort",function(e,t,n){"use strict";function i(){}var r=e.DOM,o="";return i.prototype={init:function(t,n){this.cfg=t,t.owner=n;var i=e.query(t.selector,t.container);switch(t.sortBy){case o:case"grid":default:this._gridSort(i);break;case"cell":this._cellSort(i)}},_gridSort:function(e){var t=this.cfg,n=this._getCols();this._setFrame(),t.random&&(e=e.shuffle()),t.owner.fire("beforeLocate",{autoResponsive:{elms:e}});var i=[];t.exclude!==o&&i.push("_exclude"),t.filter!==o&&i.push("_filter"),t.priority!==o&&i.push("_priority");var r=i.length,s=e.length,a=t.cache?t.owner._lastPos:0;if(0==r)for(var u=a;s>u;u++)this._render(n,e[u]);else{var l=[];i.push("_tail");for(var c=a;s>c;c++)for(var f,d=0;r+1>d;d++){if(f=this[i[d]](l,c,e[c]),"number"==typeof f){l.splice(f,0,c);break}if("boolean"==typeof f&&f)break}for(var h=0,g=l.length;g>h;h++)this._render(n,e[l[h]])}t.owner._lastPos=s;var p=this._getMinMaxColHeight();t.owner.fire("afterLocate",{autoResponsive:{elms:e,curMinMaxColHeight:p,frame:t.owner.frame}}),this.setHeight(p.max)},_getCols:function(){var e=this.cfg;if(this.containerWH=e.landscapeOrientation?r.outerHeight(e.container):r.outerWidth(e.container),e.owner.curQuery&&e.cache)return e.owner.curQuery;for(var t=new n({}),i=0,o=Math.ceil(this.containerWH/e.gridWidth);o>i;i++)t.add(0);return e.owner.curQuery=t},_setFrame:function(){this.cfg.owner.frame++},_exclude:function(e,t,n){var i=this.cfg;return r.hasClass(n,i.exclude)?!0:void 0},_filter:function(e,t,n){var i=this.cfg;return r.show(n),r.hasClass(n,i.filter)?(r.hide(n),!0):!1},_priority:function(e,t,n){void 0==e._priorityInsertPos&&(e._priorityInsertPos=0);var i=this.cfg;return r.hasClass(n,i.priority)?e._priorityInsertPos++:1/0},_tail:function(){return 1/0},_render:function(e,t){var n=this,i=n.cfg;i.owner.fire("beforeUnitArrange",{autoResponsive:{elm:t,frame:i.owner.frame}});var r=n.coordinate(e,t);i.owner.fire("afterUnitArrange",{autoResponsive:{elm:t,frame:i.owner.frame}}),n.asyncize(function(){n.callAnim(t,r)})},coordinate:function(e,t){var n=this.cfg,i=n.isRecountUnitWH;return(i||!t.__width)&&(t.__width=r.outerWidth(t),t.__height=r.outerHeight(t)),this._autoFit(e,t.__width,t.__height)},_autoFit:function(e,t,n){for(var i,r=this.cfg,o=Math.ceil(((r.landscapeOrientation?n:t)+r.unitMargin.x)/r.gridWidth),s=this._getCur(o,e),a=s[0],u=o+s[0],l=s[1]+(r.landscapeOrientation?t:n)+r.unitMargin.y;u>a;a++)e.update(a,l);return i=[s[0]*r.gridWidth+r.unitMargin.x,s[1]+r.unitMargin.y],r.landscapeOrientation?i.reverse():i},_getCur:function(e,t){return this._skipALG(e,t)},_stepALG:function(e,t){for(var n=[null,1/0],i=0,r=t.size();r-e+1>i;i++){for(var o=0,s=i;i+e>s;s++)t.get(s)>o&&(o=t.get(s));n[1]>o&&(n=[i,o])}return n},_skipALG:function(e,t){for(var n=1/0,i=0,r=0,o=t.size();o-e+1>i;i++){for(var s,a=-1/0,u=0;e>u;u++)if(s=t.get(i+u),s>=n){if(i+=u+1,i>o-e){a=n;break}u=-1,a=-1/0}else s>a&&(a=s);n>a&&(n=a,r=i)}return[r,n]},asyncize:function(e){var t=this,n=t.cfg;n.owner.get("suspend")?setTimeout(function(){e.call(t)},0):e.call(t)},callAnim:function(e,n){var i=this.cfg;new t({elm:e,x:n[0],y:n[1],closeAnim:i.closeAnim,duration:i.duration,easing:i.easing,direction:i.direction,frame:i.owner.frame,owner:i.owner}),e.autoResponsiveCoordinate={x:n[0],y:n[1]}},_getMinMaxColHeight:function(){var e=this.cfg,t=1/0,n=e.owner.curQuery.query,i=Math.max.apply(Math,n);if(0==i)t=0;else for(var r=0,o=n.length;o>r;r++)0!=n[r]&&t>n[r]&&(t=n[r]);return{min:t,max:i}},setHeight:function(e){var t=this.cfg;t.autoHeight&&(t.landscapeOrientation?r.width(t.container,e+t.unitMargin.x):r.height(t.container,e+t.unitMargin.y))},_cellSort:function(t){var n=this,i=[];e.each(t,function(){e.log("star from here!"),i.push(n._getCells())})},_getCells:function(){return this._getCols()}},i},{requires:["./anim","./linkedlist","dom"]}),KISSY.add("gallery/autoResponsive/1.2/base",function(e,t,n,i){"use strict";function r(){return r.superclass.constructor.apply(this,arguments),e.get(this.get("container"))?(this.fire("beforeInit",{autoResponsive:this}),this.get("autoInit")&&this.init(),this.fire("afterInit",{autoResponsive:this}),void 0):(e.log("can not init, lack of container!"),void 0)}var o=e.DOM,s=e.Event,a=window;return e.extend(r,i,{init:function(){this._bindEvent(),this.initPlugins(),this.render(),e.log("AutoResponsive init!")},initPlugins:function(){this.api={};for(var t,n=0,i=this.get("plugins"),r=i.length;r>n;n++)t=i[n],t.init(this),e.mix(this.api,t.api)},render:function(){var t=this.getAttrVals(),i=this.get("whensRecountUnitWH");t.isRecountUnitWH=!!i.length,this.frame=this.frame||0,arguments[0]&&e.each(arguments[0],function(e,n){t[n]=e}),e.mix(t,this.api),this.gridSort=this.gridSort||new n,this.gridSort.init(t,this)},_bind:function(t){var n=this,i=n.get("whensRecountUnitWH");n.get("closeResize")||s.on(a,"resize",function(){t.call(n,{isRecountUnitWH:e.inArray("resize",i)})})},_bindEvent:function(){var t=this;t._bind(e.buffer(function(){var e=t.get("delayOnResize");t.fire("beforeResize"),-1!==e?setTimeout(function(){t.render(arguments)},e):t.render(arguments),t.fire("resize")},t.get("resizeFrequency"),t))},adjust:function(t){var n=this.get("whensRecountUnitWH");this.__isAdjusting=1,this.render({isRecountUnitWH:t||e.inArray("adjust",n)}),this.__isAdjusting=0,e.log("adjust success")},isAdjusting:function(){return this.__isAdjusting||0},priority:function(e){this.render({priority:e})},filter:function(e){this.render({filter:e})},margin:function(e){this.render({unitMargin:e})},direction:function(e){this.render({direction:e})},random:function(){this.render({random:!0})},changeCfg:function(t){var n=this;e.each(t,function(e,t){n.set(t,e)})},append:function(e){o.append(e,this.get("container")),this.render({cache:!0})},prepend:function(e){o.prepend(e,this.get("container")),this.render()}},{ATTRS:new t}),r},{requires:["./config","./gridsort","base","dom","event"]}),KISSY.add("gallery/autoResponsive/1.2/plugin/hash",function(e){"use strict";function t(e){var t=this;t.prefix=e.prefix||"ks-",t.api={}}var n="&",i="=";return e.augment(t,{init:function(){var t=this;e.log("hash init!"),t.hasHash()&&t.parse()},hasHash:function(){return location.hash?!0:!1},parse:function(){var e=this;e.getParam()},getParam:function(){var t=this;t.hash=location.hash.split(n),e.each(t.hash,function(e){t.getPriority(e),t.getFilter(e)})},getPriority:function(t){var n=this,r=n.prefix+"priority";-1!=t.indexOf(r)&&e.mix(n.api,{priority:t.split(i)[1]})},getFilter:function(t){var n=this,r=n.prefix+"filter";-1!=t.indexOf(r)&&e.mix(n.api,{filter:t.split(i)[1]})}}),t},{requires:["event"]}),KISSY.add("gallery/autoResponsive/1.2/plugin/drag",function(e,t,n){"use strict";function i(e){var t=this;t.closeConstrain=e.closeConstrain||!1,t.selector=e.selector,t.handlers=e.handlers||[]}var r=e.DOM,o=e.DD,s=o.DDM,a=o.DraggableDelegate,u=o.DroppableDelegate,l=(11>e.UA.ie,"ks-autoResponsive-dd-"),c=l+"placeHolder",f=l+"dragging",d='<div class="'+c+'"></div>';return i.prototype={init:function(i){var r=this;r.owner=i,r.container=r.owner.userConfig.container,r.dragDelegate=new a({container:r.container,selector:r.selector,move:!0,plugins:[new t({constrain:r.container}),new n({node:r.container})],handlers:r.handlers}),r.dropDelegate=new u({container:r.container,selector:r.selector}),r._bindOperate(),e.log("drag init!")},reset:function(){},stop:function(){},_bindOperate:function(){var e=this;s.on("dragstart",function(t){var n=t.drag,i=n.get("node");e.select=i[0],e.originPosition=e.select.autoResponsiveCoordinate,e._renderPlaceHolder(),r.addClass(e.select,f),e.owner.changeCfg({exclude:f})}).on("dragend",function(){r.css(e.select,{left:r.offset(e.placeHolder).left,top:r.offset(e.placeHolder).top}),r.remove(e.placeHolder),r.removeClass(e.select,f)}).on("dropover",function(t){var n=t.drop,i=n.get("node");r.insertBefore(e.placeHolder,i),e.owner.adjust()})},_renderPlaceHolder:function(){var e=this;e.placeHolder=r.create(d),r.css(e.placeHolder,{left:e.originPosition.x,top:e.originPosition.y,width:r.width(e.select),height:r.height(e.select)}),r.insertBefore(e.placeHolder,e.select)}},i},{requires:["dd/plugin/constrain","dd/plugin/scroll","dd","dom","event"]}),KISSY.add("gallery/autoResponsive/1.2/plugin/loader",function(e){"use strict";function t(e){return this instanceof t?(this._makeCfg(e),void 0):new t(e)}function n(t,n,i,r){var o,s={},a=[],u=i.config,l=u.qpt||15;return s.start=function(){a=a.concat(e.makeArray(t));var u=function(){for(var e=+new Date;a.length>0&&50>new Date-e;){var c=a.splice(0,l);n.call(i,c)}return a.length>0?(o=setTimeout(u,25),void 0):(r&&r.call(i,t),s.stop(),s=null,void 0)};u()},s.stop=function(){o&&(clearTimeout(o),a=[])},s}function i(e,t,n,i){var r;return function(){function o(){i||e.apply(s,a),r=null}var s=n||this,a=arguments;r?clearTimeout(r):i&&e.apply(s,a),r=setTimeout(o,t||100)}}var r=e.DOM,o=e.Event,s=window,a=50;return e.augment(t,e.EventTarget,{init:function(e){this.owner=e,this.__bindMethods(),this._reset()},_reset:function(){var e=this,t=e.config,n=t.mod;e.__started=e.__destroyed=e.__stopped=0,"manual"===n||(e.__onScroll(),e.start())},_makeCfg:function(t){t={load:"function"==typeof t.load?t.load:function(){e.log("AutoResponsive.Loader::_makeCfg: the load function in user's config is undefined!","warn")},diff:t.diff||0,mod:"manual"==t.mod?"manual":"auto",qpt:15},this.config=t},changeCfg:function(t){this.stop(),this._makeCfg(e.merge(this.config,t)),this._reset()},__doScroll:function(){var t=this,n=t.owner,i=t.config;if("up"!==t.__scrollDirection&&(e.log("AutoResponsive.Loader::__doScroll..."),!t.__loading)){if(n.isAdjusting())return t.__onScroll(),void 0;var o=e.get(n.get("container"));if(o.offsetWidth){var a=r.offset(o).top,u=i.diff,l=n.getMinColHeight(),c=r.scrollTop(s),f=r.height(s);u+c+f>=a+l&&t.load()}}},load:function(){function t(e,t){i.__addItems(e,function(){t&&t.call(i),i.__doScroll()}),i.__loading=0}function n(){i.stop()}var i=this,r=i.config,o=r.load;return i.__stopped?(e.log("AutoResponsive.Loader::load: this loader has stopped, please to resume!","warn"),void 0):(e.log("AutoResponsive.Loader::loading..."),i.__loading=1,o&&o(t,n),void 0)},isLoading:function(){return this.__loading},isStarted:function(){return this.__started},isStopped:function(){return this.__stopped},isDestroyed:function(){return this.__destroyed},__addItems:function(e,t){var i=this;n(e,i.__appendItems,i,function(){t&&t.call(i),i.fire("autoresponsive.loader.complete",{items:e})}).start()},__appendItems:function(t){var n=this,i=n.owner;t=e.makeArray(t),i.append(t)},__bindMethods:function(){var e=this,t=e.owner,n={min:0,max:0};t.on("afterLocate",function(e){n=e.autoResponsive.curMinMaxColHeight}),t.getMaxColHeight=function(){return n.max},t.getMinColHeight=function(){return n.min},e.__onScroll=i(e.__doScroll,a,e,!0),e.__onMouseWheel=function(t){e.__scrollDirection=t.deltaY>0?"up":"down"}},start:function(){o.on(s,"mousewheel",this.__onMouseWheel),this.resume()},stop:function(){this.pause(),o.detach(s,"scroll",this.__onMouseWheel),this.__stopped=1},pause:function(){this.__destroyed||o.detach(s,"scroll",this.__onScroll)},resume:function(){var e=this;e.__destroyed||(o.on(s,"scroll",e.__onScroll),e.__started=1,e.__stopped=0)},destroy:function(){this.__destroyed=1}}),t},{requires:["dom","event"]}),KISSY.add("gallery/autoResponsive/1.2/index",function(e,t,n,i,r){return t.Hash=n,t.Drag=i,t.Loader=r,t},{requires:["./base","./plugin/hash","./plugin/drag","./plugin/loader"]});