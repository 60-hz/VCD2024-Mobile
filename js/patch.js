var CABLES;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/cgl/cgl_shader_default_glsl.vert":
/*!***************************************************!*\
  !*** ./src/core/cgl/cgl_shader_default_glsl.vert ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("{{MODULES_HEAD}}\nIN vec3 vPosition; //!@\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\nIN vec3 attrTangent,attrBiTangent;\n\nIN float attrVertIndex;\n\nOUT vec2 texCoord;\nOUT vec3 norm;\nUNI mat4 projMatrix;\nUNI mat4 viewMatrix;\nUNI mat4 modelMatrix;\n\nvoid main()\n{\n    texCoord=attrTexCoord;\n    norm=attrVertNormal;\n    vec4 pos=vec4(vPosition,  1.0);\n    vec3 tangent=attrTangent;\n    vec3 bitangent=attrBiTangent;\n    mat4 mMatrix=modelMatrix;\n    gl_PointSize=10.0;\n\n    {{MODULE_VERTEX_POSITION}}\n\n    mat4 modelViewMatrix=viewMatrix*mMatrix;\n    {{MODULE_VERTEX_MOVELVIEW}}\n\n    gl_Position = projMatrix * modelViewMatrix * pos;\n}\n");

/***/ }),

/***/ "./src/core/cgp/cgl_shader_default.wgsl":
/*!**********************************************!*\
  !*** ./src/core/cgp/cgl_shader_default.wgsl ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("struct VSUniforms\n{\n    modelMatrix: mat4x4<f32>,\n    viewMatrix: mat4x4<f32>,\n    projMatrix: mat4x4<f32>,\n};\n\nstruct FSUniforms\n{\n    color:vec4<f32>\n};\n\n@group(0) @binding(0) var<uniform> vsUniforms: VSUniforms;\n@group(0) @binding(1) var<uniform> fsUniforms: FSUniforms;\n\nstruct MyVSInput\n{\n    @location(0) position: vec3<f32>,\n    @location(1) normal: vec3<f32>,\n    @location(2) texcoord: vec2<f32>,\n};\n\nstruct MyVSOutput\n{\n    @builtin(position) position: vec4<f32>,\n    @location(0) normal: vec3<f32>,\n    @location(1) texcoord: vec2<f32>,\n};\n\n@vertex\nfn myVSMain(v: MyVSInput) -> MyVSOutput\n{\n    var vsOut: MyVSOutput;\n    var pos =vec4<f32>(v.position, 1.0);\n\n    var mvMatrix=vsUniforms.viewMatrix * vsUniforms.modelMatrix;\n    vsOut.position = vsUniforms.projMatrix * mvMatrix * pos;\n\n    vsOut.normal = v.normal;\n    vsOut.texcoord = v.texcoord;\n    return vsOut;\n}\n\n@fragment\nfn myFSMain(v: MyVSOutput) -> @location(0) vec4<f32>\n{\n    return fsUniforms.color+vec4<f32>(.5,.5,.5,1.0);\n}\n\n");

/***/ }),

/***/ "./src/core/anim.js":
/*!**************************!*\
  !*** ./src/core/anim.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ANIM": () => (/* binding */ ANIM),
/* harmony export */   "Anim": () => (/* binding */ Anim)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _anim_key_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./anim_key.js */ "./src/core/anim_key.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/* harmony import */ var _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventtarget.js */ "./src/core/eventtarget.js");





/**
 * Keyframed interpolated animation.
 *
 * Available Easings:
 * <pre>
 * CONSTANTS.ANIM.EASING_LINEAR
 * CONSTANTS.ANIM.EASING_ABSOLUTE
 * CONSTANTS.ANIM.EASING_SMOOTHSTEP
 * CONSTANTS.ANIM.EASING_SMOOTHERSTEP
 * CONSTANTS.ANIM.EASING_CUBICSPLINE

 * CONSTANTS.ANIM.EASING_CUBIC_IN
 * CONSTANTS.ANIM.EASING_CUBIC_OUT
 * CONSTANTS.ANIM.EASING_CUBIC_INOUT

 * CONSTANTS.ANIM.EASING_EXPO_IN
 * CONSTANTS.ANIM.EASING_EXPO_OUT
 * CONSTANTS.ANIM.EASING_EXPO_INOUT

 * CONSTANTS.ANIM.EASING_SIN_IN
 * CONSTANTS.ANIM.EASING_SIN_OUT
 * CONSTANTS.ANIM.EASING_SIN_INOUT

 * CONSTANTS.ANIM.EASING_BACK_IN
 * CONSTANTS.ANIM.EASING_BACK_OUT
 * CONSTANTS.ANIM.EASING_BACK_INOUT

 * CONSTANTS.ANIM.EASING_ELASTIC_IN
 * CONSTANTS.ANIM.EASING_ELASTIC_OUT

 * CONSTANTS.ANIM.EASING_BOUNCE_IN
 * CONSTANTS.ANIM.EASING_BOUNCE_OUT

 * CONSTANTS.ANIM.EASING_QUART_IN
 * CONSTANTS.ANIM.EASING_QUART_OUT
 * CONSTANTS.ANIM.EASING_QUART_INOUT

 * CONSTANTS.ANIM.EASING_QUINT_IN
 * CONSTANTS.ANIM.EASING_QUINT_OUT
 * CONSTANTS.ANIM.EASING_QUINT_INOUT
 * </pre>
 * @hideconstructor
 * @external CABLES
 * @namespace Anim
 * @class
 * @example
 * var anim=new CABLES.Anim();
 * anim.setValue(0,0);  // set value 0 at 0 seconds
 * anim.setValue(10,1); // set value 1 at 10 seconds
 * anim.getValue(5);    // get value at 5 seconds - this returns 0.5
 */

const Anim = function (cfg)
{
    _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__.EventTarget.apply(this);

    cfg = cfg || {};
    this.keys = [];
    this.onChange = null;
    this.stayInTimeline = false;
    this.loop = false;
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_1__["default"]("Anim");
    this._lastKeyIndex = 0;
    this._cachedIndex = 0;
    this.name = cfg.name || null;

    /**
     * @member defaultEasing
     * @memberof Anim
     * @instance
     * @type {Number}
     */
    this.defaultEasing = cfg.defaultEasing || _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_LINEAR;
    this.onLooped = null;

    this._timesLooped = 0;
    this._needsSort = false;
};

Anim.prototype.forceChangeCallback = function ()
{
    if (this.onChange !== null) this.onChange();
    this.emitEvent("onChange", this);
};

Anim.prototype.getLoop = function ()
{
    return this.loop;
};

Anim.prototype.setLoop = function (target)
{
    this.loop = target;
    this.emitEvent("onChange", this);
};

/**
 * returns true if animation has ended at @time
 * checks if last key time is < time
 * @param {Number} time
 * @returns {Boolean}
 * @memberof Anim
 * @instance
 * @function
 */
Anim.prototype.hasEnded = function (time)
{
    if (this.keys.length === 0) return true;
    if (this.keys[this._lastKeyIndex].time <= time) return true;
    return false;
};

Anim.prototype.isRising = function (time)
{
    if (this.hasEnded(time)) return false;
    const ki = this.getKeyIndex(time);
    if (this.keys[ki].value < this.keys[ki + 1].value) return true;
    return false;
};

/**
 * remove all keys from animation before time
 * @param {Number} time
 * @memberof Anim
 * @instance
 * @function
 */
Anim.prototype.clearBefore = function (time)
{
    const v = this.getValue(time);
    const ki = this.getKeyIndex(time);

    this.setValue(time, v);

    if (ki > 1) this.keys.splice(0, ki);
    this._updateLastIndex();
};
/**
 * remove all keys from animation
 * @param {Number} [time=0] set a new key at time with the old value at time
 * @memberof Anim
 * @instance
 * @function
 */
Anim.prototype.clear = function (time)
{
    let v = 0;
    if (time) v = this.getValue(time);
    this.keys.length = 0;
    this._updateLastIndex();
    if (time) this.setValue(time, v);
    if (this.onChange !== null) this.onChange();
    this.emitEvent("onChange", this);
};

Anim.prototype.sortKeys = function ()
{
    this.keys.sort((a, b) => { return parseFloat(a.time) - parseFloat(b.time); });
    this._updateLastIndex();
    this._needsSort = false;
    if (this.keys.length % 1000 == 0)console.log(this.name, this.keys.length);
};

Anim.prototype.getLength = function ()
{
    if (this.keys.length === 0) return 0;
    return this.keys[this.keys.length - 1].time;
};

Anim.prototype.getKeyIndex = function (time)
{
    let index = 0;
    let start = 0;
    if (this._cachedIndex && this.keys.length > this._cachedIndex && time >= this.keys[this._cachedIndex].time) start = this._cachedIndex;
    for (let i = start; i < this.keys.length; i++)
    {
        if (time >= this.keys[i].time) index = i;
        if (this.keys[i].time > time)
        {
            if (time != 0) this._cachedIndex = index;
            return index;
        }
    }

    return index;
};

/**
 * set value at time
 * @function setValue
 * @memberof Anim
 * @instance
 * @param {Number} time
 * @param {Number} value
 * @param {Function} [callback] callback
 */
Anim.prototype.setValue = function (time, value, cb)
{
    let found = null;

    if (this.keys.length == 0 || time <= this.keys[this.keys.length - 1].time)
        for (let i = 0; i < this.keys.length; i++)
            if (this.keys[i].time == time)
            {
                found = this.keys[i];
                this.keys[i].setValue(value);
                this.keys[i].cb = cb;
                break;
            }

    if (!found)
    {
        found = new _anim_key_js__WEBPACK_IMPORTED_MODULE_3__.Key(
            {
                "time": time,
                "value": value,
                "e": this.defaultEasing,
                "cb": cb,
            });
        this.keys.push(found);

        // if (this.keys.length % 1000 == 0)console.log(this.name, this.keys.length);
        this._updateLastIndex();
    }

    if (this.onChange) this.onChange();
    this.emitEvent("onChange", this);
    this._needsSort = true;
    return found;
};

Anim.prototype.setKeyEasing = function (index, e)
{
    if (this.keys[index])
    {
        this.keys[index].setEasing(e);
        this.emitEvent("onChange", this);
    }
};

Anim.prototype.getSerialized = function ()
{
    const obj = {};
    obj.keys = [];
    obj.loop = this.loop;

    for (let i = 0; i < this.keys.length; i++)
        obj.keys.push(this.keys[i].getSerialized());

    return obj;
};

Anim.prototype.getKey = function (time)
{
    const index = this.getKeyIndex(time);
    return this.keys[index];
};

Anim.prototype.getNextKey = function (time)
{
    let index = this.getKeyIndex(time) + 1;
    if (index >= this.keys.length) index = this.keys.length - 1;

    return this.keys[index];
};

Anim.prototype.isFinished = function (time)
{
    if (this.keys.length <= 0) return true;
    return time > this.keys[this.keys.length - 1].time;
};

Anim.prototype.isStarted = function (time)
{
    if (this.keys.length <= 0) return false;
    return time >= this.keys[0].time;
};

/**
 * get value at time
 * @function getValue
 * @memberof Anim
 * @instance
 * @param {Number} [time] time
 * @returns {Number} interpolated value at time
 */
Anim.prototype.getValue = function (time)
{
    if (this.keys.length === 0)
    {
        return 0;
    }
    if (this._needsSort) this.sortKeys();

    if (!this.loop && time > this.keys[this._lastKeyIndex].time)
    {
        if (this.keys[this._lastKeyIndex].cb && !this.keys[this._lastKeyIndex].cbTriggered) this.keys[this._lastKeyIndex].trigger();

        return this.keys[this._lastKeyIndex].value;
    }

    if (time < this.keys[0].time)
    {
        // if (this.name)console.log("A");

        return this.keys[0].value;
    }

    if (this.loop && time > this.keys[this._lastKeyIndex].time)
    {
        const currentLoop = time / this.keys[this._lastKeyIndex].time;
        if (currentLoop > this._timesLooped)
        {
            this._timesLooped++;
            if (this.onLooped) this.onLooped();
        }
        time = (time - this.keys[0].time) % (this.keys[this._lastKeyIndex].time - this.keys[0].time);
        time += this.keys[0].time;
    }

    const index = this.getKeyIndex(time);
    if (index >= this._lastKeyIndex)
    {
        if (this.keys[this._lastKeyIndex].cb && !this.keys[this._lastKeyIndex].cbTriggered) this.keys[this._lastKeyIndex].trigger();

        return this.keys[this._lastKeyIndex].value;
    }


    const index2 = index + 1;
    const key1 = this.keys[index];
    const key2 = this.keys[index2];

    if (key1.cb && !key1.cbTriggered) key1.trigger();

    if (!key2) return -1;

    const perc = (time - key1.time) / (key2.time - key1.time);

    if (!key1.ease) this.log._warn("has no ease", key1, key2);

    return key1.ease(perc, key2);
};

Anim.prototype._updateLastIndex = function ()
{
    this._lastKeyIndex = this.keys.length - 1;
};

Anim.prototype.addKey = function (k)
{
    if (k.time === undefined)
    {
        this.log.warn("key time undefined, ignoring!");
    }
    else
    {
        this.keys.push(k);
        if (this.onChange !== null) this.onChange();
        this.emitEvent("onChange", this);
    }
    this._updateLastIndex();
};

Anim.prototype.easingFromString = function (str)
{
    if (str == "linear") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_LINEAR;
    if (str == "absolute") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_ABSOLUTE;
    if (str == "smoothstep") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_SMOOTHSTEP;
    if (str == "smootherstep") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_SMOOTHERSTEP;

    if (str == "Cubic In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_CUBIC_IN;
    if (str == "Cubic Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_CUBIC_OUT;
    if (str == "Cubic In Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_CUBIC_INOUT;

    if (str == "Expo In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_EXPO_IN;
    if (str == "Expo Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_EXPO_OUT;
    if (str == "Expo In Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_EXPO_INOUT;

    if (str == "Sin In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_SIN_IN;
    if (str == "Sin Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_SIN_OUT;
    if (str == "Sin In Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_SIN_INOUT;

    if (str == "Back In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_BACK_IN;
    if (str == "Back Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_BACK_OUT;
    if (str == "Back In Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_BACK_INOUT;

    if (str == "Elastic In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_ELASTIC_IN;
    if (str == "Elastic Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_ELASTIC_OUT;

    if (str == "Bounce In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_BOUNCE_IN;
    if (str == "Bounce Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_BOUNCE_OUT;

    if (str == "Quart Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_QUART_OUT;
    if (str == "Quart In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_QUART_IN;
    if (str == "Quart In Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_QUART_INOUT;

    if (str == "Quint Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_QUINT_OUT;
    if (str == "Quint In") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_QUINT_IN;
    if (str == "Quint In Out") return _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASING_QUINT_INOUT;
};

Anim.prototype.createPort = function (op, title, cb)
{
    const port = op.inDropDown(title, _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.ANIM.EASINGS);

    // const port = op.addInPort(
    //     new Port(op, title, CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
    //         "display": "dropdown",
    //         "values": CONSTANTS.ANIM.EASINGS,
    //     }),
    // );

    port.set("linear");
    port.defaultValue = "linear";

    port.onChange = function ()
    {
        this.defaultEasing = this.easingFromString(port.get());
        this.emitEvent("onChangeDefaultEasing", this);

        if (cb) cb();
    }.bind(this);

    return port;
};

// ------------------------------

Anim.slerpQuaternion = function (time, q, animx, animy, animz, animw)
{
    if (!Anim.slerpQuaternion.q1)
    {
        Anim.slerpQuaternion.q1 = quat.create();
        Anim.slerpQuaternion.q2 = quat.create();
    }

    const i1 = animx.getKeyIndex(time);
    let i2 = i1 + 1;
    if (i2 >= animx.keys.length) i2 = animx.keys.length - 1;

    if (i1 == i2)
    {
        quat.set(q, animx.keys[i1].value, animy.keys[i1].value, animz.keys[i1].value, animw.keys[i1].value);
    }
    else
    {
        const key1Time = animx.keys[i1].time;
        const key2Time = animx.keys[i2].time;
        const perc = (time - key1Time) / (key2Time - key1Time);

        quat.set(Anim.slerpQuaternion.q1, animx.keys[i1].value, animy.keys[i1].value, animz.keys[i1].value, animw.keys[i1].value);

        quat.set(Anim.slerpQuaternion.q2, animx.keys[i2].value, animy.keys[i2].value, animz.keys[i2].value, animw.keys[i2].value);

        quat.slerp(q, Anim.slerpQuaternion.q1, Anim.slerpQuaternion.q2, perc);
    }
    return q;
};

const ANIM = { "Key": _anim_key_js__WEBPACK_IMPORTED_MODULE_3__.Key };





/***/ }),

/***/ "./src/core/anim_key.js":
/*!******************************!*\
  !*** ./src/core/anim_key.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Key": () => (/* binding */ Key)
/* harmony export */ });
/* unused harmony exports easeExpoIn, easeExpoOut, easeExpoInOut, easeCubicIn, easeCubicOut, easeCubicInOut */
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");


const Key = function (obj)
{
    this.time = 0.0;
    this.value = 0.0;
    // this.ui = null;
    this.onChange = null;
    this._easing = 0;
    // this.bezTangIn = 0;
    // this.bezTangOut = 0;
    // this.bezTime = 0.5;
    // this.bezValue = 0;
    // this.bezTimeIn = -0.5;
    // this.bezValueIn = 0;

    this.cb = null;
    this.cbTriggered = false;

    // const bezierAnim = null;
    // this._updateBezier = false;

    this.setEasing(_constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_LINEAR);
    this.set(obj);
};

Key.cubicSpline = function (perc, key1, key2)
{
    let
        previousPoint = key1.value,
        previousTangent = key1.bezTangOut,
        nextPoint = key2.value,
        nextTangent = key2.bezTangIn;
    let t = perc;
    let t2 = t * t;
    let t3 = t2 * t;

    return (2 * t3 - 3 * t2 + 1) * previousPoint + (t3 - 2 * t2 + t) * previousTangent + (-2 * t3 + 3 * t2) * nextPoint + (t3 - t2) * nextTangent;
};

Key.easeCubicSpline = function (perc, key2)
{
    return Key.cubicSpline(perc, this, key2);
};


Key.linear = function (perc, key1, key2)
{
    return parseFloat(key1.value) + parseFloat(key2.value - key1.value) * perc;
};

Key.easeLinear = function (perc, key2)
{
    return Key.linear(perc, this, key2);
};

Key.easeAbsolute = function (perc, key2)
{
    return this.value;
};

const easeExpoIn = function (t)
{
    return (t = 2 ** (10 * (t - 1)));
};

Key.easeExpoIn = function (t, key2)
{
    t = easeExpoIn(t);
    return Key.linear(t, this, key2);
};

const easeExpoOut = function (t)
{
    t = -(2 ** (-10 * t)) + 1;
    return t;
};

Key.easeExpoOut = function (t, key2)
{
    t = easeExpoOut(t);
    return Key.linear(t, this, key2);
};

const easeExpoInOut = function (t)
{
    t *= 2;
    if (t < 1)
    {
        t = 0.5 * 2 ** (10 * (t - 1));
    }
    else
    {
        t--;
        t = 0.5 * (-(2 ** (-10 * t)) + 2);
    }
    return t;
};

Key.easeExpoInOut = function (t, key2)
{
    t = easeExpoInOut(t);
    return Key.linear(t, this, key2);
};

Key.easeSinIn = function (t, key2)
{
    t = -1 * Math.cos((t * Math.PI) / 2) + 1;
    return Key.linear(t, this, key2);
};

Key.easeSinOut = function (t, key2)
{
    t = Math.sin((t * Math.PI) / 2);
    return Key.linear(t, this, key2);
};

Key.easeSinInOut = function (t, key2)
{
    t = -0.5 * (Math.cos(Math.PI * t) - 1.0);
    return Key.linear(t, this, key2);
};

const easeCubicIn = function (t)
{
    t = t * t * t;
    return t;
};

Key.easeCubicIn = function (t, key2)
{
    t = easeCubicIn(t);
    return Key.linear(t, this, key2);
};


// b 0
// c 1/2 or 1
// d always 1
// easeOutCubic: function (x, t, b, c, d) {
//     return c*((t=t/d-1)*t*t + 1) + b;

Key.easeInQuint = function (t, key2)
{
    t = t * t * t * t * t;
    return Key.linear(t, this, key2);
};
Key.easeOutQuint = function (t, key2)
{
    t = (t -= 1) * t * t * t * t + 1;
    return Key.linear(t, this, key2);
};
Key.easeInOutQuint = function (t, key2)
{
    if ((t /= 0.5) < 1) t = 0.5 * t * t * t * t * t;
    else t = 0.5 * ((t -= 2) * t * t * t * t + 2);
    return Key.linear(t, this, key2);
};

Key.easeInQuart = function (t, key2)
{
    t = t * t * t * t;
    return Key.linear(t, this, key2);
};

Key.easeOutQuart = function (t, key2)
{
    // return -c * ((t=t/d-1)*t*t*t - 1) + b;
    t = -1 * ((t -= 1) * t * t * t - 1);
    return Key.linear(t, this, key2);
};

Key.easeInOutQuart = function (t, key2)
{
    if ((t /= 0.5) < 1) t = 0.5 * t * t * t * t;
    else t = -0.5 * ((t -= 2) * t * t * t - 2);
    return Key.linear(t, this, key2);
};

Key.bounce = function (t)
{
    if ((t /= 1) < 1 / 2.75) t = 7.5625 * t * t;
    else if (t < 2 / 2.75) t = 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    else if (t < 2.5 / 2.75) t = 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    else t = 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    return t;
};

Key.easeInBounce = function (t, key2)
{
    return Key.linear(Key.bounce(t), this, key2);
    // return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d);
};

Key.easeOutBounce = function (t, key2)
{
    return Key.linear(Key.bounce(t), this, key2);
};

Key.easeInElastic = function (t, key2)
{
    let s = 1.70158;
    let p = 0;
    let a = 1;

    const b = 0;
    const d = 1;
    const c = 1;

    if (t === 0) t = b;
    else if ((t /= d) == 1) t = b + c;
    else
    {
        if (!p) p = d * 0.3;
        if (a < Math.abs(c))
        {
            a = c;
            s = p / 4;
        }
        else s = (p / (2 * Math.PI)) * Math.asin(c / a);
        t = -(a * 2 ** (10 * (t -= 1)) * Math.sin(((t * d - s) * (2 * Math.PI)) / p)) + b;
    }

    return Key.linear(t, this, key2);
};


Key.easeOutElastic = function (t, key2)
{
    let s = 1.70158;
    let p = 0;
    let a = 1;

    const b = 0;
    const d = 1;
    const c = 1;

    if (t === 0) t = b;
    else if ((t /= d) == 1) t = b + c;
    else
    {
        if (!p) p = d * 0.3;
        if (a < Math.abs(c))
        {
            a = c;
            s = p / 4;
        }
        else s = (p / (2 * Math.PI)) * Math.asin(c / a);
        t = a * 2 ** (-10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) + c + b;
    }

    return Key.linear(t, this, key2);
};

Key.easeInBack = function (t, key2)
{
    const s = 1.70158;
    t = t * t * ((s + 1) * t - s);

    return Key.linear(t, this, key2);
};

Key.easeOutBack = function (t, key2)
{
    const s = 1.70158;
    t = (t = t / 1 - 1) * t * ((s + 1) * t + s) + 1;

    return Key.linear(t, this, key2);
};

Key.easeInOutBack = function (t, key2)
{
    let s = 1.70158;
    const c = 1 / 2;
    if ((t /= 1 / 2) < 1) t = c * (t * t * (((s *= 1.525) + 1) * t - s));
    else t = c * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);

    return Key.linear(t, this, key2);
};

const easeCubicOut = function (t)
{
    t--;
    t = t * t * t + 1;
    return t;
};

Key.easeCubicOut = function (t, key2)
{
    t = easeCubicOut(t);
    return Key.linear(t, this, key2);
};

const easeCubicInOut = function (t)
{
    t *= 2;
    if (t < 1) t = 0.5 * t * t * t;
    else
    {
        t -= 2;
        t = 0.5 * (t * t * t + 2);
    }
    return t;
};

Key.easeCubicInOut = function (t, key2)
{
    t = easeCubicInOut(t);
    return Key.linear(t, this, key2);
};

Key.easeSmoothStep = function (perc, key2)
{
    // var x = Math.max(0, Math.min(1, (perc-0)/(1-0)));
    const x = Math.max(0, Math.min(1, perc));
    perc = x * x * (3 - 2 * x); // smoothstep
    return Key.linear(perc, this, key2);
};

Key.easeSmootherStep = function (perc, key2)
{
    const x = Math.max(0, Math.min(1, (perc - 0) / (1 - 0)));
    perc = x * x * x * (x * (x * 6 - 15) + 10); // smootherstep
    return Key.linear(perc, this, key2);
};

Key.prototype.setEasing = function (e)
{
    this._easing = e;

    if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_LINEAR) this.ease = Key.easeLinear;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_ABSOLUTE) this.ease = Key.easeAbsolute;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_SMOOTHSTEP) this.ease = Key.easeSmoothStep;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_SMOOTHERSTEP) this.ease = Key.easeSmootherStep;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_CUBIC_IN) this.ease = Key.easeCubicIn;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_CUBIC_OUT) this.ease = Key.easeCubicOut;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_CUBIC_INOUT) this.ease = Key.easeCubicInOut;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_EXPO_IN) this.ease = Key.easeExpoIn;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_EXPO_OUT) this.ease = Key.easeExpoOut;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_EXPO_INOUT) this.ease = Key.easeExpoInOut;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_SIN_IN) this.ease = Key.easeSinIn;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_SIN_OUT) this.ease = Key.easeSinOut;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_SIN_INOUT) this.ease = Key.easeSinInOut;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_BACK_OUT) this.ease = Key.easeOutBack;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_BACK_IN) this.ease = Key.easeInBack;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_BACK_INOUT) this.ease = Key.easeInOutBack;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_ELASTIC_IN) this.ease = Key.easeInElastic;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_ELASTIC_OUT) this.ease = Key.easeOutElastic;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_ELASTIC_INOUT) this.ease = Key.easeElasticInOut;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_BOUNCE_IN) this.ease = Key.easeInBounce;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_BOUNCE_OUT) this.ease = Key.easeOutBounce;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_QUART_OUT) this.ease = Key.easeOutQuart;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_QUART_IN) this.ease = Key.easeInQuart;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_QUART_INOUT) this.ease = Key.easeInOutQuart;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_QUINT_OUT) this.ease = Key.easeOutQuint;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_QUINT_IN) this.ease = Key.easeInQuint;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_QUINT_INOUT) this.ease = Key.easeInOutQuint;
    else if (this._easing == _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_CUBICSPLINE)
    {
        // this._updateBezier = true;
        this.ease = Key.easeCubicSpline;
    }
    else
    {
        this._easing = _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.ANIM.EASING_LINEAR;
        this.ease = Key.easeLinear;
    }
};

Key.prototype.trigger = function ()
{
    this.cb();
    this.cbTriggered = true;
};

Key.prototype.setValue = function (v)
{
    this.value = v;
    // this._updateBezier = true;
    if (this.onChange !== null) this.onChange();
};

Key.prototype.set = function (obj)
{
    if (obj)
    {
        if (obj.e) this.setEasing(obj.e);
        if (obj.cb)
        {
            this.cb = obj.cb;
            this.cbTriggered = false;
        }

        if (obj.b)
        {
            // this.bezTime = obj.b[0];
            // this.bezValue = obj.b[1];
            // this.bezTimeIn = obj.b[2];
            // this.bezValueIn = obj.b[3];
            // this._updateBezier = true;
        }

        if (obj.hasOwnProperty("t")) this.time = obj.t;
        if (obj.hasOwnProperty("time")) this.time = obj.time;
        if (obj.hasOwnProperty("v")) this.value = obj.v;
        else if (obj.hasOwnProperty("value")) this.value = obj.value;
    }
    if (this.onChange !== null) this.onChange();
};

Key.prototype.getSerialized = function ()
{
    const obj = {};
    obj.t = this.time;
    obj.v = this.value;
    obj.e = this._easing;
    // if (this._easing == CONSTANTS.ANIM.EASING_CUBICSPLINE) obj.b = [this.bezTime, this.bezValue, this.bezTimeIn, this.bezValueIn];

    return obj;
};

Key.prototype.getEasing = function ()
{
    return this._easing;
};




/***/ }),

/***/ "./src/core/banchprofiler.js":
/*!***********************************!*\
  !*** ./src/core/banchprofiler.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Branch": () => (/* binding */ Branch),
/* harmony export */   "BranchStack": () => (/* binding */ BranchStack)
/* harmony export */ });
class Branch
{
    constructor(name)
    {
        this.name = name;
        this.dur = 0;
        this._startTime = 0;
        this.childs = [];
    }

    start()
    {
        this._startTime = performance.now();
    }

    end()
    {
        this.dur = performance.now() - this._startTime;
    }

    push(name)
    {
        const b = new Branch(name);
        this.childs.push(b);
        b.start();
        return b;
    }

    print(level)
    {
        level = level || 0;

        let str = "";
        for (let i = 0; i < level; i++) str += "  ";

        for (let i = 0; i < this.childs.length; i++)
        {
            this.childs[i].print(level + 1);
        }
    }
}

// //////////////////////////////////////////

class BranchStack
{
    constructor()
    {
    }

    start()
    {
        this.root = new Branch("Root");
        this.root.start();

        this.current = this.root;
    }

    push(name)
    {
        if (!this.current) this.start();

        const prev = this.current;
        this.current = this.current.push(name);
        this.current.prev = prev;
        this.current.start();
        return this.current;
    }

    pop()
    {
        if (!this.current) return;
        this.current.end();
        this.current = this.current.prev;
    }

    finish()
    {
        this.current.end();
        this.root.print();
        this.current = null;
    }
}





/***/ }),

/***/ "./src/core/base64.js":
/*!****************************!*\
  !*** ./src/core/base64.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "b64decTypedArray": () => (/* binding */ b64decTypedArray),
/* harmony export */   "b64encTypesArray": () => (/* binding */ b64encTypesArray),
/* harmony export */   "base64Chars": () => (/* binding */ base64Chars),
/* harmony export */   "base64lookup": () => (/* binding */ base64lookup)
/* harmony export */ });
const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

// Use a lookup table to find the index.
const _base64lookup = new Uint8Array(256);
for (let i = 0; i < base64Chars.length; i++) _base64lookup[base64Chars.charCodeAt(i)] = i;

const base64lookup = _base64lookup;

const b64encTypesArray = function (arraybuffer)
{
    if (arraybuffer.buffer) arraybuffer = arraybuffer.buffer;
    let bytes = new Uint8Array(arraybuffer),
        i,
        len = bytes.length,
        base64 = "";

    for (i = 0; i < len; i += 3)
    {
        base64 += base64Chars[bytes[i] >> 2];
        base64 += base64Chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += base64Chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += base64Chars[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) base64 = base64.substring(0, base64.length - 1) + "=";
    else if (len % 3 === 1) base64 = base64.substring(0, base64.length - 2) + "==";

    return base64;
};

const b64decTypedArray = function (base64)
{
    let bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === "=")
    {
        bufferLength--;
        if (base64[base64.length - 2] === "=") bufferLength--;
    }

    let arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4)
    {
        encoded1 = base64lookup[base64.charCodeAt(i)];
        encoded2 = base64lookup[base64.charCodeAt(i + 1)];
        encoded3 = base64lookup[base64.charCodeAt(i + 2)];
        encoded4 = base64lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
};


/***/ }),

/***/ "./src/core/cg/cg_boundingbox.js":
/*!***************************************!*\
  !*** ./src/core/cg/cg_boundingbox.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoundingBox": () => (/* binding */ BoundingBox)
/* harmony export */ });


/**
 * bounding box
 * @class
 * @external CGL
 * @namespace BoundingBox
 * @param {Geometry} geometry or bounding box
 */
class BoundingBox
{
    constructor(geom)
    {
        this._init();
        this._first = true;
        this._wireMesh = null;

        if (geom) this.apply(geom);
    }

    _init()
    {
        this._max = [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE];
        this._min = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE];
        this._center = [0, 0, 0];
        this._size = [0, 0, 0];
        this._maxAxis = 0.0;
        this._first = true;
    }

    /**
     * get biggest number of maxX,maxY,maxZ
     * @type {Number}
     */
    get maxAxis() { return this._maxAxis || 1; }

    /**
     * size of bounding box
     * @type {vec3}
     */
    get size() { return this._size; }

    /**
     * center of bounding box
     * @type {vec3}
     */
    get center() { return this._center; }

    /**
     * center x
     * @type {Number}
     */
    get x() { return this._center[0]; }

    /**
     * center y
     * @type {Number}
     */
    get y() { return this._center[1]; }

    /**
     * center z
     * @type {Number}
     */
    get z() { return this._center[2]; }


    /**
     * minimum x
     * @type {Number}
     */
    get minX() { return this._min[0]; }

    /**
     * minimum y
     * @type {Number}
     */
    get minY() { return this._min[1]; }

    /**
     * minimum z
     * @type {Number}
     */
    get minZ() { return this._min[2]; }

    /**
     * maximum x
     * @type {Number}
     */
    get maxX() { return this._max[0]; }

    /**
     * maximum y
     * @type {Number}
     */
    get maxY() { return this._max[1]; }

    /**
     * maximum z
     * @type {Number}
     */
    get maxZ() { return this._max[2]; }


    apply(geom, mat)
    {
        if (!geom)
        {
            // console.warn("[boundingbox] no geom/vertices", geom);
            return;
        }

        if (geom instanceof BoundingBox)
        {
            const bb = geom;

            this.applyPos(bb.maxX, bb.maxY, bb.maxZ);
            this.applyPos(bb.minX, bb.minY, bb.minZ);
        }
        else
        {
            for (let i = 0; i < geom.vertices.length; i += 3)
                // if (geom.vertices[i] == geom.vertices[i] || geom.vertices[i] != null)
                // {
            // if(mat)
            // {
                this.applyPos(geom.vertices[i], geom.vertices[i + 1], geom.vertices[i + 2]);
            // }
            // else
            // {
            //     this.applyPos(geom.vertices[i + 0],geom.vertices[i + 1],geom.vertices[i + 2]);
            // }
                // }
        }
        this.calcCenterSize();
    }

    /**
     * returns a copy of the bounding box
     * @function copy
     * @memberof BoundingBox
     * @instance
     */
    copy()
    {
        return new BoundingBox(this);
    }

    get changed()
    {
        return !(this._max[0] == -Number.MAX_VALUE && this._max[1] == -Number.MAX_VALUE && this._max[2] == -Number.MAX_VALUE);
    }

    applyPos(x, y, z)
    {
        if (x == Number.MAX_VALUE || x == -Number.MAX_VALUE ||
            y == Number.MAX_VALUE || y == -Number.MAX_VALUE ||
            z == Number.MAX_VALUE || z == -Number.MAX_VALUE) return;

        if (!CABLES.UTILS.isNumeric(x) || !CABLES.UTILS.isNumeric(y) || !CABLES.UTILS.isNumeric(z)) return;

        if (this._first)
        {
            this._max[0] = x;
            this._max[1] = y;
            this._max[2] = z;

            this._min[0] = x;
            this._min[1] = y;
            this._min[2] = z;
            this._first = false;
            return;
        }

        this._max[0] = Math.max(this._max[0], x);
        this._max[1] = Math.max(this._max[1], y);
        this._max[2] = Math.max(this._max[2], z);

        this._min[0] = Math.min(this._min[0], x);
        this._min[1] = Math.min(this._min[1], y);
        this._min[2] = Math.min(this._min[2], z);
    }

    calcCenterSize()
    {
        if (this._first) return;
        // this._size[0]=Math.abs(this._min[0])+Math.abs(this._max[0]);
        // this._size[1]=Math.abs(this._min[1])+Math.abs(this._max[1]);
        // this._size[2]=Math.abs(this._min[2])+Math.abs(this._max[2]);
        this._size[0] = this._max[0] - this._min[0];
        this._size[1] = this._max[1] - this._min[1];
        this._size[2] = this._max[2] - this._min[2];

        this._center[0] = (this._min[0] + this._max[0]) / 2;
        this._center[1] = (this._min[1] + this._max[1]) / 2;
        this._center[2] = (this._min[2] + this._max[2]) / 2;

        this._maxAxis = Math.max(this._size[2], Math.max(this._size[0], this._size[1]));
    }

    mulMat4(m)
    {
        if (this._first)
        {
            this._max[0] = 0;
            this._max[1] = 0;
            this._max[2] = 0;

            this._min[0] = 0;
            this._min[1] = 0;
            this._min[2] = 0;
            this._first = false;
        }
        vec3.transformMat4(this._max, this._max, m);
        vec3.transformMat4(this._min, this._min, m);
        this.calcCenterSize();
    }

    render(cgl, shader, op)
    {
        if (!this._wireMesh) this._wireMesh = new CGL.WireCube(cgl);

        // console.log("bounding box render!");
        cgl.pushModelMatrix();
        mat4.translate(cgl.mMatrix, cgl.mMatrix, this._center);
        // this._wireMesh.render(cgl, this._size[0] / 2, this._size[1] / 2, this._size[2] / 2);

        if (CABLES.UI && op)
        {
            CABLES.UI.OverlayMeshes.drawCube(op, this._size[0] / 2, this._size[1] / 2, this._size[2] / 2);
        }

        cgl.popModelMatrix();
    }
}


/***/ }),

/***/ "./src/core/cg/cg_canvas.js":
/*!**********************************!*\
  !*** ./src/core/cg/cg_canvas.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CgCanvas": () => (/* binding */ CgCanvas)
/* harmony export */ });
class CgCanvas
{
    constructor(options)
    {
        if (!options)
        {
            console.error("CgCanvas no options");
        }
        else
        {
            this._canvasEle = options.canvasEle;
        }

        if (!options.cg)console.error("CgCanvas options has no cg");
        if (!options.canvasEle)console.error("CgCanvas options has no canvasEle");

        this._cg = options.cg;
        this.pixelDensity = 1;
        this.canvasWidth = this.canvasEle.clientWidth;
        this.canvasHeight = this.canvasEle.clientHeight;

        this._oldWidthRp = -1;
        this._oldHeightRp = -1;

        this.setSize(this.canvasWidth, this.canvasHeight);
    }

    get canvasEle() { return this._canvasEle; }


    setSize(w, h, ignorestyle)
    {
        if (this._oldWidthRp != w * this.pixelDensity || this._oldHeightRp != h * this.pixelDensity)
        {
            this._oldWidthRp = this.canvasEle.width = w * this.pixelDensity;
            this._oldHeightRp = this.canvasEle.height = h * this.pixelDensity;

            if (!ignorestyle)
            {
                this.canvasEle.style.width = w + "px";
                this.canvasEle.style.height = h + "px";
            }

            this.updateSize();

            this._cg.emitEvent("resize");
        }
    }

    updateSize()
    {
        this.canvasEle.width = this.canvasWidth = this.canvasEle.clientWidth * this.pixelDensity;
        this.canvasEle.height = this.canvasHeight = this.canvasEle.clientHeight * this.pixelDensity;
    }

    dispose()
    {
        this._canvasEle.remove();
        this._canvasEle = null;
    }
}




/***/ }),

/***/ "./src/core/cg/cg_constants.js":
/*!*************************************!*\
  !*** ./src/core/cg/cg_constants.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CG": () => (/* binding */ CG)
/* harmony export */ });
/* harmony import */ var _cg_boundingbox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cg_boundingbox.js */ "./src/core/cg/cg_boundingbox.js");
/* harmony import */ var _cg_canvas_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cg_canvas.js */ "./src/core/cg/cg_canvas.js");
/* harmony import */ var _cg_geom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cg_geom.js */ "./src/core/cg/cg_geom.js");
/* harmony import */ var _sg_fpscounter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sg_fpscounter.js */ "./src/core/cg/sg_fpscounter.js");





const CG = {

    "GAPI_WEBGL": 0,
    "GAPI_WEBGPU": 1,

    "DEPTH_COMPARE_NEVER": 0,
    "DEPTH_COMPARE_LESS": 1,
    "DEPTH_COMPARE_EQUAL": 2,
    "DEPTH_COMPARE_LESSEQUAL": 3,
    "DEPTH_COMPARE_GREATER": 4,
    "DEPTH_COMPARE_NOTEQUAL": 5,
    "DEPTH_COMPARE_GREATEREQUAL": 6,
    "DEPTH_COMPARE_ALWAYS": 7,

    "CULL_NONE": 0,
    "CULL_BACK": 1,
    "CULL_FRONT": 2,
    "CULL_BOTH": 3,


    "Geometry": _cg_geom_js__WEBPACK_IMPORTED_MODULE_0__.Geometry,
    "BoundingBox": _cg_boundingbox_js__WEBPACK_IMPORTED_MODULE_1__.BoundingBox,
    "FpsCounter": _sg_fpscounter_js__WEBPACK_IMPORTED_MODULE_2__["default"],

    "CgCanvas": _cg_canvas_js__WEBPACK_IMPORTED_MODULE_3__.CgCanvas
};





/***/ }),

/***/ "./src/core/cg/cg_geom.js":
/*!********************************!*\
  !*** ./src/core/cg/cg_geom.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Geometry": () => (/* binding */ Geometry)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/core/utils.js");
/* harmony import */ var _base64_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../base64.js */ "./src/core/base64.js");
/* harmony import */ var _cg_boundingbox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cg_boundingbox.js */ "./src/core/cg/cg_boundingbox.js");
// import { vec2, vec3 } from "gl-matrix";





/**
 * a geometry contains all information about a mesh, vertices, texturecoordinates etc. etc.
 * @external CGL
 * @namespace Geometry
 * @param {String} name
 * @class
 * @example
 * // create a triangle with all attributes
 * const geom=new Geometry("triangle"),
 *
 * geom.vertices = [
 *      0.0,           sizeH.get(),  0.0,
 *     -sizeW.get(),  -sizeH.get(),  0.0,
 *      sizeW.get(),  -sizeH.get(),  0.0 ];
 *
 * geom.vertexNormals = [
 *      0.0,  0.0,  1.0,
 *      0.0,  0.0,  1.0,
 *      0.0,  0.0,  1.0 ];
 *
 * geom.tangents = [
 *     1,0,0,
 *     1,0,0,
 *     1,0,0 ];
 *
 * geom.biTangents = [
 *     0,1,0,
 *     0,1,0,
 *     0,1,0 ];
 *
 * geom.texCoords = [
 *      0.5,  0.0,
 *      1.0,  1.0,
 *      0.0,  1.0, ];
 *
 * geom.verticesIndices = [
 *     0, 1, 2 ];
 *
 */
const Geometry = function (name)
{
    this.name = name || "unknown";
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgl_geometry");

    this.faceVertCount = 3;
    this.glPrimitive = null;
    this._attributes = {};

    this._vertices = [];
    this.verticesIndices = [];

    this.isGeometry = true;

    this.morphTargets = [];

    Object.defineProperty(this, "vertices", {
        get()
        {
            return this._vertices;
        },
        set(v)
        {
            this.setVertices(v);
        },
    });

    Object.defineProperty(this, "texCoords", {
        get()
        {
            const att = this.getAttribute("texCoords");
            if (!att) return [];
            return att.data;
        },
        set(v)
        {
            this.setAttribute("texCoords", v, 2);
        },
    });

    Object.defineProperty(this, "vertexNormals", {
        get()
        {
            const att = this.getAttribute("vertexNormals");
            if (!att) return [];
            return att.data;
        },
        set(v)
        {
            this.setAttribute("vertexNormals", v, 3);
        },
    });

    Object.defineProperty(this, "tangents", {
        get()
        {
            const att = this.getAttribute("tangents");
            if (!att) return [];
            return att.data;
        },
        set(v)
        {
            this.setAttribute("tangents", v, 3);
        },
    });

    Object.defineProperty(this, "biTangents", {
        get()
        {
            const att = this.getAttribute("biTangents");
            if (!att) return [];
            return att.data;
        },
        set(v)
        {
            this.setAttribute("biTangents", v, 3);
        },
    });

    Object.defineProperty(this, "vertexColors", {
        get()
        {
            const att = this.getAttribute("vertexColors");
            if (!att) return [];
            return att.data;
        },
        set(v)
        {
            this.setAttribute("vertexColors", v, 4);
        },
    });
};

/**
 * @function clear
 * @memberof Geometry
 * @instance
 * @description clear all buffers/set them to length 0
 */
Geometry.prototype.clear = function ()
{
    this._vertices = new Float32Array([]);
    this.verticesIndices = [];
    this.texCoords = new Float32Array([]);
    this.vertexNormals = new Float32Array([]);
    this.tangents = [];
    this.biTangents = [];
    this._attributes = {};
};



/**
 * @function getAttributes
   @memberof Geometry
 * @instance
 * @return {Array<Object>} returns array of attribute objects
 */
Geometry.prototype.getAttributes = function ()
{
    return this._attributes;
};

/**
 * @function getAttribute
 * @memberof Geometry
 * @instance
 * @param {String} name
 * @return {Object}
 */
Geometry.prototype.getAttribute = function (name)
{
    for (const i in this._attributes)
    {
        if (this._attributes[i].name == name) return this._attributes[i];
    }
    return null;
};

/**
 * @function setAttribute
 * @description create an attribute
 * @memberof Geometry
 * @instance
 * @param {String} name
 * @param {Array} data
 * @param {Number} itemsize
 */
Geometry.prototype.setAttribute = function (name, arr, itemSize)
{
    let attrType = "";
    if (!itemSize || itemSize > 4)
    {
        console.log("itemsize wrong?", itemSize, name);
        this._log.stack("itemsize");

        itemSize = 3;
    }

    if (itemSize == 1) attrType = "float";
    else if (itemSize == 2) attrType = "vec2";
    else if (itemSize == 3) attrType = "vec3";
    else if (itemSize == 4) attrType = "vec4";


    const attr = {
        "name": name,
        "data": arr,
        "itemSize": itemSize,
        "type": attrType,
    };

    this._attributes[name] = attr;
};

Geometry.prototype.copyAttribute = function (name, newgeom)
{
    const attr = this.getAttribute(name);
    newgeom.setAttribute(name, new Float32Array(attr.data), attr.itemSize);
};


/**
 * @function setVertices
 * @memberof Geometry
 * @instance
 * @description set vertices
 * @param {Array|Float32Array} data [x,y,z,x,y,z,...]
 */
Geometry.prototype.setVertices = function (arr)
{
    if (arr instanceof Float32Array) this._vertices = arr;
    else this._vertices = new Float32Array(arr);
};

/**
 * @function setTexCoords
 * @memberof Geometry
 * @instance
 * @description set texcoords
 * @param {Array|Float32Array} data [u,v,u,v,...]
 */
Geometry.prototype.setTexCoords = function (arr)
{
    if (arr instanceof Float32Array) this.texCoords = arr;
    else this.texCoords = new Float32Array(arr);
};

// Geometry.prototype.testIndices = function ()
// {
//     var foundError = false;
//     for (var i = 0; i < this.verticesIndices.length; i++)
//     {
//         if (this.verticesIndices[i * 3 + 0] >= this._vertices.length / 3 || this.verticesIndices[i * 3 + 1] >= this._vertices.length / 3 || this.verticesIndices[i * 3 + 2] >= this._vertices.length / 3)
//         {
//             foundError = true;
//             console.log("index error!");
//         }
//     }
// };

// deprecated
Geometry.prototype.calcNormals = function (smooth)
{
    const options = { "smooth": smooth };


    this.calculateNormals(options);
};

/**
 * @function flipNormals
 * @memberof Geometry
 * @description flip normals
 */
Geometry.prototype.flipNormals = function (x, y, z)
{
    let vec = vec3.create();

    if (x == undefined)x = 1;
    if (y == undefined)y = 1;
    if (z == undefined)z = 1;


    for (let i = 0; i < this.vertexNormals.length; i += 3)
    {
        vec3.set(vec,
            this.vertexNormals[i + 0],
            this.vertexNormals[i + 1],
            this.vertexNormals[i + 2]);

        vec[0] *= -x;
        vec[1] *= -y;
        vec[2] *= -z;

        vec3.normalize(vec, vec);

        this.vertexNormals[i + 0] = vec[0];
        this.vertexNormals[i + 1] = vec[1];
        this.vertexNormals[i + 2] = vec[2];
    }
};

Geometry.prototype.getNumTriangles = function ()
{
    if (this.verticesIndices && this.verticesIndices.length) return this.verticesIndices.length / 3;
    return this.vertices.length / 3;
};


/**
 * @function flipVertDir
 * @memberof Geometry
 * @description flip order of vertices in geom faces
 */
Geometry.prototype.flipVertDir = function ()
{
    const newInd = [];
    newInd.length = this.verticesIndices.length;
    for (let i = 0; i < this.verticesIndices.length; i += 3)
    {
        newInd[i] = this.verticesIndices[i + 2];
        newInd[i + 1] = this.verticesIndices[i + 1];
        newInd[i + 2] = this.verticesIndices[i];
    }
    this.verticesIndices = newInd;
};


Geometry.prototype.setPointVertices = function (verts)
{
    if (verts.length % 3 !== 0)
    {
        this._log.error("SetPointVertices: Array must be multiple of three.");
        return;
    }

    if (!(verts instanceof Float32Array)) this.vertices = new Float32Array(verts);
    else this.vertices = verts;

    if (!(this.texCoords instanceof Float32Array)) this.texCoords = new Float32Array((verts.length / 3) * 2);

    // this.texCoords.length=verts.length/3*2;
    this.verticesIndices.length = verts.length / 3;
    // this.verticesIndices=[];

    for (let i = 0; i < verts.length / 3; i++)
    {
        this.verticesIndices[i] = i;
        this.texCoords[i * 2] = 0;
        this.texCoords[i * 2 + 1] = 0;
    }
};

/**
 * merge a different geometry into the this geometry
 * @function merge
 * @param {Geometry} geom
 * @memberof Geometry
 * @instance
 */
Geometry.prototype.merge = function (geom)
{
    if (!geom) return;

    if (this.isIndexed() != geom.isIndexed())
    {
        if (this.isIndexed())
        {
            this.unIndex(false, true);
        }
        if (geom.isIndexed())
        {
            const g = geom.copy();
            g.unIndex(false, true);
            geom = g;
        }
    }

    const oldIndizesLength = this.verticesIndices.length;
    const vertLength = this._vertices.length / 3;

    this.verticesIndices.length += geom.verticesIndices.length;
    for (let i = 0; i < geom.verticesIndices.length; i++)
        this.verticesIndices[oldIndizesLength + i] = geom.verticesIndices[i] + vertLength;

    this.vertices = _utils_js__WEBPACK_IMPORTED_MODULE_1__.UTILS.float32Concat(this._vertices, geom.vertices);
    this.texCoords = _utils_js__WEBPACK_IMPORTED_MODULE_1__.UTILS.float32Concat(this.texCoords, geom.texCoords);
    this.vertexNormals = _utils_js__WEBPACK_IMPORTED_MODULE_1__.UTILS.float32Concat(this.vertexNormals, geom.vertexNormals);
    this.tangents = _utils_js__WEBPACK_IMPORTED_MODULE_1__.UTILS.float32Concat(this.tangents, geom.tangents);
    this.biTangents = _utils_js__WEBPACK_IMPORTED_MODULE_1__.UTILS.float32Concat(this.biTangents, geom.biTangents);
};

/**
 * create a copy of the geometry
 * @function copy
 * @memberof Geometry
 * @instance
 */
Geometry.prototype.copy = function ()
{
    const geom = new Geometry(this.name + " copy");
    geom.faceVertCount = this.faceVertCount;
    geom.glPrimitive = this.glPrimitive;

    geom.setVertices(this._vertices.slice(0));

    if (this.verticesIndices)
    {
        geom.verticesIndices.length = this.verticesIndices.length;
        for (let i = 0; i < this.verticesIndices.length; i++) geom.verticesIndices[i] = this.verticesIndices[i];
    }

    for (let i in this._attributes) this.copyAttribute(i, geom);

    geom.morphTargets.length = this.morphTargets.length;
    for (let i = 0; i < this.morphTargets.length; i++) geom.morphTargets[i] = this.morphTargets[i];

    return geom;
};

/**
 * Calculaten normals
 * @function calculateNormals
 * @memberof Geometry
 * @instance
 */
Geometry.prototype.calculateNormals = function (options)
{
    // todo: should check angle of normals to get edges    https://community.khronos.org/t/calculating-accurate-vertex-normals/28152
    options = options || {};
    if (options.smooth === false) this.unIndex();

    const u = vec3.create();
    const v = vec3.create();
    const n = vec3.create();

    function calcNormal(triangle)
    {
        vec3.subtract(u, triangle[0], triangle[1]);
        vec3.subtract(v, triangle[0], triangle[2]);
        vec3.cross(n, u, v);
        vec3.normalize(n, n);

        if (options && options.forceZUp)
        {
            if (n[2] < 0)
            {
                n[0] *= -1;
                n[1] *= -1;
                n[2] *= -1;
            }
        }
        return n;
    }

    this.getVertexVec = function (which)
    {
        const vec = [0, 0, 0];
        vec[0] = this.vertices[which * 3 + 0];
        vec[1] = this.vertices[which * 3 + 1];
        vec[2] = this.vertices[which * 3 + 2];
        return vec;
    };

    if (!(this.vertexNormals instanceof Float32Array) || this.vertexNormals.length != this.vertices.length) this.vertexNormals = new Float32Array(this.vertices.length);

    for (let i = 0; i < this.vertices.length; i++)
    {
        this.vertexNormals[i] = 0;
    }

    if (!this.isIndexed())
    {
        const norms = [];
        for (let i = 0; i < this.vertices.length; i += 9)
        {
            const triangle = [[this.vertices[i + 0], this.vertices[i + 1], this.vertices[i + 2]], [this.vertices[i + 3], this.vertices[i + 4], this.vertices[i + 5]], [this.vertices[i + 6], this.vertices[i + 7], this.vertices[i + 8]]];
            const nn = calcNormal(triangle);
            norms.push(nn[0], nn[1], nn[2], nn[0], nn[1], nn[2], nn[0], nn[1], nn[2]);
        }
        this.vertexNormals = norms;
    }
    else
    {
        const faceNormals = [];

        faceNormals.length = Math.floor(this.verticesIndices.length / 3);

        for (let i = 0; i < this.verticesIndices.length; i += 3)
        {
            const triangle = [this.getVertexVec(this.verticesIndices[i + 0]), this.getVertexVec(this.verticesIndices[i + 1]), this.getVertexVec(this.verticesIndices[i + 2])];

            faceNormals[i / 3] = calcNormal(triangle);

            this.vertexNormals[this.verticesIndices[i + 0] * 3 + 0] += faceNormals[i / 3][0];
            this.vertexNormals[this.verticesIndices[i + 0] * 3 + 1] += faceNormals[i / 3][1];
            this.vertexNormals[this.verticesIndices[i + 0] * 3 + 2] += faceNormals[i / 3][2];

            this.vertexNormals[this.verticesIndices[i + 1] * 3 + 0] += faceNormals[i / 3][0];
            this.vertexNormals[this.verticesIndices[i + 1] * 3 + 1] += faceNormals[i / 3][1];
            this.vertexNormals[this.verticesIndices[i + 1] * 3 + 2] += faceNormals[i / 3][2];

            this.vertexNormals[this.verticesIndices[i + 2] * 3 + 0] += faceNormals[i / 3][0];
            this.vertexNormals[this.verticesIndices[i + 2] * 3 + 1] += faceNormals[i / 3][1];
            this.vertexNormals[this.verticesIndices[i + 2] * 3 + 2] += faceNormals[i / 3][2];
        }


        for (let i = 0; i < this.verticesIndices.length; i += 3) // faces
        {
            for (let k = 0; k < 3; k++) // triangles
            {
                const vv = [this.vertexNormals[this.verticesIndices[i + k] * 3 + 0], this.vertexNormals[this.verticesIndices[i + k] * 3 + 1], this.vertexNormals[this.verticesIndices[i + k] * 3 + 2]];
                vec3.normalize(vv, vv);
                this.vertexNormals[this.verticesIndices[i + k] * 3 + 0] = vv[0];
                this.vertexNormals[this.verticesIndices[i + k] * 3 + 1] = vv[1];
                this.vertexNormals[this.verticesIndices[i + k] * 3 + 2] = vv[2];
            }
        }
    }
};

/**
 * Calculates tangents & bitangents with the help of uv-coordinates. Adapted from
 * Lengyel, Eric. “Computing Tangent Space Basis Vectors for an Arbitrary Mesh”.
 * Terathon Software 3D Graphics Library.
 * https://fenix.tecnico.ulisboa.pt/downloadFile/845043405449073/Tangent%20Space%20Calculation.pdf
 *
 * @function calcTangentsBitangents
 * @memberof Geometry
 * @instance
 */
Geometry.prototype.calcTangentsBitangents = function ()
{
    if (!this.vertices.length)
    {
        // this._log.error("Cannot calculate tangents/bitangents without vertices.");
        return;
    }
    if (!this.vertexNormals.length)
    {
        // this._log.error("Cannot calculate tangents/bitangents without normals.");
        return;
    }
    if (!this.texCoords.length)
    {
        // console.warn("No texcoords. Replacing with default values [0, 0].");
        const texCoordLength = (this.vertices.length / 3) * 2;
        this.texCoords = new Float32Array(texCoordLength);
        for (let i = 0; i < texCoordLength; i += 1) this.texCoords[i] = 0;
    }
    if (!this.verticesIndices || !this.verticesIndices.length)
    {
        // this._log.error("Cannot calculate tangents/bitangents without vertex indices.");
        return;
    }
    // this code assumes that we have three indices per triangle
    if (this.verticesIndices.length % 3 !== 0)
    {
        this._log.error("Vertex indices mismatch!");
        return;
    }

    const triangleCount = this.verticesIndices.length / 3;
    const vertexCount = this.vertices.length / 3;

    this.tangents = new Float32Array(this.vertexNormals.length);
    this.biTangents = new Float32Array(this.vertexNormals.length);

    // temporary buffers
    const tempVertices = [];
    tempVertices.length = vertexCount * 2;
    const v1 = vec3.create();
    const v2 = vec3.create();
    const v3 = vec3.create();

    const w1 = vec2.create();
    const w2 = vec2.create();
    const w3 = vec2.create();

    const sdir = vec3.create();
    const tdir = vec3.create();

    // for details on calculation, see article referenced above
    for (let tri = 0; tri < triangleCount; tri += 1)
    {
        // indices of the three vertices for a triangle
        const i1 = this.verticesIndices[tri * 3];
        const i2 = this.verticesIndices[tri * 3 + 1];
        const i3 = this.verticesIndices[tri * 3 + 2];

        // vertex position as vec3
        vec3.set(v1, this.vertices[i1 * 3], this.vertices[i1 * 3 + 1], this.vertices[i1 * 3 + 2]);
        vec3.set(v2, this.vertices[i2 * 3], this.vertices[i2 * 3 + 1], this.vertices[i2 * 3 + 2]);
        vec3.set(v3, this.vertices[i3 * 3], this.vertices[i3 * 3 + 1], this.vertices[i3 * 3 + 2]);

        // texture coordinate as vec2
        vec2.set(w1, this.texCoords[i1 * 2], this.texCoords[i1 * 2 + 1]);
        vec2.set(w2, this.texCoords[i2 * 2], this.texCoords[i2 * 2 + 1]);
        vec2.set(w3, this.texCoords[i3 * 2], this.texCoords[i3 * 2 + 1]);

        const x1 = v2[0] - v1[0];
        const x2 = v3[0] - v1[0];
        const y1 = v2[1] - v1[1];
        const y2 = v3[1] - v1[1];
        const z1 = v2[2] - v1[2];
        const z2 = v3[2] - v1[2];

        const s1 = w2[0] - w1[0];
        const s2 = w3[0] - w1[0];
        const t1 = w2[1] - w1[1];
        const t2 = w3[1] - w1[1];

        const r = 1.0 / (s1 * t2 - s2 * t1);

        vec3.set(sdir, (t2 * x1 - t1 * x2) * r, (t2 * y1 - t1 * y2) * r, (t2 * z1 - t1 * z2) * r);
        vec3.set(tdir, (s1 * x2 - s2 * x1) * r, (s1 * y2 - s2 * y1) * r, (s1 * z2 - s2 * z1) * r);

        tempVertices[i1] = sdir;
        tempVertices[i2] = sdir;
        tempVertices[i3] = sdir;

        tempVertices[i1 + vertexCount] = tdir;
        tempVertices[i2 + vertexCount] = tdir;
        tempVertices[i3 + vertexCount] = tdir;
    }

    const normal = vec3.create();
    const tempVert = vec3.create();
    const tan = vec3.create();
    const bitan = vec3.create();
    const temp1 = vec3.create();
    const temp2 = vec3.create();
    const crossPd = vec3.create();
    const normalized = vec3.create();

    for (let vert = 0; vert < vertexCount; vert += 1)
    {
        // NOTE: some meshes don't have index 0 - n in their indexbuffer, if this is the case, skip calculation of this vertex
        if (!tempVertices[vert]) continue;

        vec3.set(normal, this.vertexNormals[vert * 3], this.vertexNormals[vert * 3 + 1], this.vertexNormals[vert * 3 + 2]);
        vec3.set(tempVert, tempVertices[vert][0], tempVertices[vert][1], tempVertices[vert][2]);

        // Gram-Schmidt orthagonalize
        const _dp = vec3.dot(normal, tempVert);
        vec3.scale(temp1, normal, _dp);
        vec3.subtract(temp2, tempVert, temp1);

        vec3.normalize(normalized, temp2);
        vec3.cross(crossPd, normal, tempVert);

        // const intermDot = vec3.dot(crossPd, tempVertices[vert + vertexCount]);
        const w = 1.0;// intermDot < 0.0 ? -1.0 : 1.0;

        vec3.scale(tan, normalized, 1 / w);
        vec3.cross(bitan, normal, tan);

        this.tangents[vert * 3 + 0] = tan[0];
        this.tangents[vert * 3 + 1] = tan[1];
        this.tangents[vert * 3 + 2] = tan[2];
        this.biTangents[vert * 3 + 0] = bitan[0];
        this.biTangents[vert * 3 + 1] = bitan[1];
        this.biTangents[vert * 3 + 2] = bitan[2];
    }
};

Geometry.prototype.isIndexed = function ()
{
    if (this._vertices.length == 0) return true;
    return this.verticesIndices.length != 0;
};

/**
 * @function unIndex
 * @memberof Geometry
 * @instance
 * @param {Boolean}
 * @description remove all vertex indizes, vertices array will contain 3*XYZ for every triangle
 */
Geometry.prototype.unIndex = function (reIndex, dontCalcNormals)
{
    const newVerts = [];
    const newIndizes = [];
    let count = 0;

    for (let j in this._attributes)
    {
        const attr = this._attributes[j];
        let na = [];

        for (let i = 0; i < this.verticesIndices.length; i += 3)
        {
            for (let s = 0; s < 3; s++)
            {
                if (attr.itemSize == 3)
                    na.push(
                        attr.data[this.verticesIndices[i + s] * 3 + 0],
                        attr.data[this.verticesIndices[i + s] * 3 + 1],
                        attr.data[this.verticesIndices[i + s] * 3 + 2]);
                else if (attr.itemSize == 4)
                    na.push(
                        attr.data[this.verticesIndices[i + s] * 4 + 0],
                        attr.data[this.verticesIndices[i + s] * 4 + 1],
                        attr.data[this.verticesIndices[i + s] * 4 + 2],
                        attr.data[this.verticesIndices[i + s] * 4 + 3]);
                else if (attr.itemSize == 2)
                    na.push(
                        attr.data[this.verticesIndices[i + s] * 2 + 0],
                        attr.data[this.verticesIndices[i + s] * 2 + 1]);
                else if (attr.itemSize == 1)
                    na.push(
                        attr.data[this.verticesIndices[i + s]]);
                else console.log("unknown attr", attr);
            }
        }
        this.setAttribute(attr.name, na, attr.itemSize);
    }

    for (let i = 0; i < this.verticesIndices.length; i += 3)
    {
        newVerts.push(
            this.vertices[this.verticesIndices[i + 0] * 3 + 0],
            this.vertices[this.verticesIndices[i + 0] * 3 + 1],
            this.vertices[this.verticesIndices[i + 0] * 3 + 2]);

        newIndizes.push(count);
        count++;

        newVerts.push(
            this.vertices[this.verticesIndices[i + 1] * 3 + 0],
            this.vertices[this.verticesIndices[i + 1] * 3 + 1],
            this.vertices[this.verticesIndices[i + 1] * 3 + 2]);

        newIndizes.push(count);
        count++;

        newVerts.push(
            this.vertices[this.verticesIndices[i + 2] * 3 + 0],
            this.vertices[this.verticesIndices[i + 2] * 3 + 1],
            this.vertices[this.verticesIndices[i + 2] * 3 + 2]);

        newIndizes.push(count);
        count++;
    }

    this.vertices = newVerts;

    this.verticesIndices = [];
    if (reIndex) this.verticesIndices = newIndizes;

    if (!dontCalcNormals) this.calculateNormals();
};

Geometry.prototype.calcBarycentric = function ()
{
    let barycentrics = [];
    barycentrics.length = this.vertices.length;
    for (let i = 0; i < this.vertices.length; i++) barycentrics[i] = 0;

    let count = 0;
    for (let i = 0; i < this.vertices.length; i += 3)
    {
        barycentrics[i + count] = 1;
        count++;
        if (count == 3) count = 0;
    }

    this.setAttribute("attrBarycentric", barycentrics, 3);
};

Geometry.prototype.getBounds = function ()
{
    return new _cg_boundingbox_js__WEBPACK_IMPORTED_MODULE_2__.BoundingBox(this);
};

Geometry.prototype.center = function (x, y, z)
{
    if (x === undefined)
    {
        x = true;
        y = true;
        z = true;
    }

    let i = 0;
    const bounds = this.getBounds();
    const offset = [bounds.minX + (bounds.maxX - bounds.minX) / 2, bounds.minY + (bounds.maxY - bounds.minY) / 2, bounds.minZ + (bounds.maxZ - bounds.minZ) / 2];

    for (i = 0; i < this.vertices.length; i += 3)
    {
        if (this.vertices[i + 0] == this.vertices[i + 0])
        {
            if (x) this.vertices[i + 0] -= offset[0];
            if (y) this.vertices[i + 1] -= offset[1];
            if (z) this.vertices[i + 2] -= offset[2];
        }
    }

    return offset;
};

Geometry.prototype.mapTexCoords2d = function ()
{
    const bounds = this.getBounds();
    const num = this.vertices.length / 3;

    this.texCoords = new Float32Array(num * 2);

    for (let i = 0; i < num; i++)
    {
        const vertX = this.vertices[i * 3 + 0];
        const vertY = this.vertices[i * 3 + 1];
        this.texCoords[i * 2 + 0] = vertX / (bounds.maxX - bounds.minX) + 0.5;
        this.texCoords[i * 2 + 1] = 1.0 - vertY / (bounds.maxY - bounds.minY) + 0.5;
    }
};


Geometry.prototype.getInfoOneLine = function ()
{
    let txt = "";
    if (this.faceVertCount == 3 && this.verticesIndices)txt += this.verticesIndices.length / 3;
    else txt += 0;

    txt += " tris ";

    if (this.vertices)txt += this.vertices.length / 3;
    else txt += 0;

    txt += " verts";

    return txt;
};

Geometry.prototype.getInfo = function ()
{
    const info = {};

    if (this.faceVertCount == 3 && this.verticesIndices)info.numFaces = this.verticesIndices.length / 3;
    else info.numFaces = 0;

    if (this.verticesIndices && this.verticesIndices.length)info.indices = this.verticesIndices.length;

    if (this.vertices)info.numVerts = this.vertices.length / 3;
    else info.numVerts = 0;

    if (this.vertexNormals) info.numNormals = this.vertexNormals.length / 3;
    else info.numNormals = 0;

    if (this.texCoords) info.numTexCoords = this.texCoords.length / 2;
    else info.numTexCoords = 0;

    if (this.tangents) info.numTangents = this.tangents.length / 3;
    else info.numTangents = 0;

    if (this.biTangents) info.numBiTangents = this.biTangents.length / 3;
    else info.numBiTangents = 0;

    if (this.biTangents) info.numBiTangents = this.biTangents.length / 3;
    else info.numBiTangents = 0;

    if (this.vertexColors) info.numVertexColors = this.vertexColors.length / 4;
    else info.numVertexColors = 0;

    if (this.getAttributes()) info.numAttribs = Object.keys(this.getAttributes()).length;
    else info.numAttribs = 0;

    info.isIndexed = this.isIndexed();

    return info;
};

// -----------------

// TODO : move this into "old" circle op
Geometry.buildFromFaces = function (arr, name, optimize)
{
    const vertices = [];
    const verticesIndices = [];

    for (let i = 0; i < arr.length; i += 3)
    {
        const a = arr[i + 0];
        const b = arr[i + 1];
        const c = arr[i + 2];
        const face = [-1, -1, -1];

        if (optimize)
            for (let iv = 0; iv < vertices.length; iv += 3)
            {
                if (vertices[iv + 0] == a[0] && vertices[iv + 1] == a[1] && vertices[iv + 2] == a[2]) face[0] = iv / 3;
                if (vertices[iv + 0] == b[0] && vertices[iv + 1] == b[1] && vertices[iv + 2] == b[2]) face[1] = iv / 3;
                if (vertices[iv + 0] == c[0] && vertices[iv + 1] == c[1] && vertices[iv + 2] == c[2]) face[2] = iv / 3;
            }

        if (face[0] == -1)
        {
            vertices.push(a[0], a[1], a[2]);
            face[0] = (vertices.length - 1) / 3;
        }

        if (face[1] == -1)
        {
            vertices.push(b[0], b[1], b[2]);
            face[1] = (vertices.length - 1) / 3;
        }

        if (face[2] == -1)
        {
            vertices.push(c[0], c[1], c[2]);
            face[2] = (vertices.length - 1) / 3;
        }

        verticesIndices.push(parseInt(face[0], 10));
        verticesIndices.push(parseInt(face[1], 10));
        verticesIndices.push(parseInt(face[2], 10));
    }

    const geom = new Geometry(name);
    geom.name = name;
    geom.vertices = vertices;
    geom.verticesIndices = verticesIndices;

    return geom;
};

// TODO: not needed anymore ?! move to deprecated ops?
Geometry.json2geom = function (jsonMesh)
{
    const geom = new Geometry("jsonMeshGeom");
    geom.verticesIndices = [];

    geom.vertices = jsonMesh.vertices || [];
    geom.vertexNormals = jsonMesh.normals || [];
    geom.vertexColors = jsonMesh.colors || [];
    geom.tangents = jsonMesh.tangents || [];
    geom.biTangents = jsonMesh.bitangents || [];
    if (jsonMesh.texturecoords) geom.setTexCoords(jsonMesh.texturecoords[0]);

    if (jsonMesh.vertices_b64)geom.vertices = new Float32Array((0,_base64_js__WEBPACK_IMPORTED_MODULE_3__.b64decTypedArray)(jsonMesh.vertices_b64));
    if (jsonMesh.normals_b64) geom.vertexNormals = new Float32Array((0,_base64_js__WEBPACK_IMPORTED_MODULE_3__.b64decTypedArray)(jsonMesh.normals_b64));
    if (jsonMesh.tangents_b64) geom.tangents = new Float32Array((0,_base64_js__WEBPACK_IMPORTED_MODULE_3__.b64decTypedArray)(jsonMesh.tangents_b64));
    if (jsonMesh.bitangents_b64) geom.biTangents = new Float32Array((0,_base64_js__WEBPACK_IMPORTED_MODULE_3__.b64decTypedArray)(jsonMesh.bitangents_b64));
    if (jsonMesh.texturecoords_b64) geom.setTexCoords(new Float32Array((0,_base64_js__WEBPACK_IMPORTED_MODULE_3__.b64decTypedArray)(jsonMesh.texturecoords_b64[0])));

    if (jsonMesh.faces_b64)
    {
        geom.verticesIndices = new Uint32Array((0,_base64_js__WEBPACK_IMPORTED_MODULE_3__.b64decTypedArray)(jsonMesh.faces_b64));
    }
    else
    {
        geom.verticesIndices.length = jsonMesh.faces.length * 3;
        for (let i = 0; i < jsonMesh.faces.length; i++)
        {
            geom.verticesIndices[i * 3] = jsonMesh.faces[i][0];
            geom.verticesIndices[i * 3 + 1] = jsonMesh.faces[i][1];
            geom.verticesIndices[i * 3 + 2] = jsonMesh.faces[i][2];
        }
    }

    return geom;
};





/***/ }),

/***/ "./src/core/cg/cg_matrixstack.js":
/*!***************************************!*\
  !*** ./src/core/cg/cg_matrixstack.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MatrixStack": () => (/* binding */ MatrixStack)
/* harmony export */ });

const MatrixStack = function ()
{
    this._arr = [mat4.create()];
    this._index = 0;
    this.stateCounter = 0;
};

MatrixStack.prototype.push = function (m)
{
    this._index++;
    this.stateCounter++;

    if (this._index == this._arr.length)
    {
        const copy = mat4.create();
        this._arr.push(copy);
    }

    mat4.copy(this._arr[this._index], m || this._arr[this._index - 1]);

    return this._arr[this._index];
};

MatrixStack.prototype.pop = function ()
{
    this.stateCounter++;

    this._index--;
    if (this._index < 0) this._index = 0;

    return this._arr[this._index];
};

MatrixStack.prototype.length = function ()
{
    return this._index;
};




/***/ }),

/***/ "./src/core/cg/cg_state.js":
/*!*********************************!*\
  !*** ./src/core/cg/cg_state.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CGState": () => (/* binding */ CGState)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/eventtarget.js");
/* harmony import */ var _cg_canvas_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cg_canvas.js */ "./src/core/cg/cg_canvas.js");
/* harmony import */ var _cg_matrixstack_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cg_matrixstack.js */ "./src/core/cg/cg_matrixstack.js");





// const CGState ()
class CGState extends cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    constructor(_patch)
    {
        super();
        // this.canvas = null;

        this.fpsCounter = new CABLES.CG.FpsCounter();
        this._identView = vec3.create();
        this._ident = vec3.create();
        vec3.set(this._identView, 0, 0, -2);
        vec3.set(this._ident, 0, 0, 0);

        this.patch = _patch;



        this.DEPTH_COMPARE_FUNC_NEVER = 0;
        this.DEPTH_COMPARE_FUNC_LESS = 1;
        this.DEPTH_COMPARE_FUNC_EQUAL = 2;
        this.DEPTH_COMPARE_FUNC_LESSEQUAL = 3;
        this.DEPTH_COMPARE_FUNC_GREATER = 4;
        this.DEPTH_COMPARE_FUNC_NOTEQUAL = 5;
        this.DEPTH_COMPARE_FUNC_GREATEREQUAL = 6;
        this.DEPTH_COMPARE_FUNC_ALWAYS = 7;


        /**
             * Current projection matrix
             * @memberof Context
             * @instance
             * @type {mat4}
             */
        this.pMatrix = mat4.create();

        /**
             * Current model matrix
             * @memberof Context
             * @instance
             * @type {mat4}
             */
        this.mMatrix = mat4.create();

        /**
             * Current view matrix
             * @memberof Context
             * @instance
             * @type {mat4}
             */
        this.vMatrix = mat4.create();
        this._textureslots = [];

        this._pMatrixStack = new _cg_matrixstack_js__WEBPACK_IMPORTED_MODULE_1__.MatrixStack();
        this._mMatrixStack = new _cg_matrixstack_js__WEBPACK_IMPORTED_MODULE_1__.MatrixStack();
        this._vMatrixStack = new _cg_matrixstack_js__WEBPACK_IMPORTED_MODULE_1__.MatrixStack();

        this.canvasScale = 1;

        mat4.identity(this.mMatrix);
        mat4.identity(this.vMatrix);


        window.matchMedia("screen and (min-resolution: 2dppx)")
            .addEventListener("change", (e) =>
            {
                this.emitEvent("resize");
            });
    }

    get canvasWidth()
    {
        return this.cgCanvas.canvasWidth;
    }

    get canvasHeight()
    {
        return this.cgCanvas.canvasHeight;
    }

    set pixelDensity(p)
    {
        if (this.cgCanvas.pixelDensity != p)
        {
            this.cgCanvas.pixelDensity = p;
            this.cgCanvas.updateSize();
            this.emitEvent("resize");
        }
    }

    get pixelDensity()
    {
        return this.cgCanvas.pixelDensity;
    }


    getGApiName()
    {
        return ["WebGL", "WebGPU"][this.gApi];
    }

    get canvas()
    {
        return this.cgCanvas.canvasEle;
    }

    setCanvas(canvEle)
    {
        if (this.cgCanvas && canvEle == this.cgCanvas.canvasEle) return;
        if (typeof canvEle === "string") canvEle = document.getElementById(canvEle);

        this.cgCanvas = new _cg_canvas_js__WEBPACK_IMPORTED_MODULE_2__.CgCanvas({ "canvasEle": canvEle, "cg": this });

        if (this._setCanvas) this._setCanvas(canvEle);

        this.updateSize();
    }

    updateSize()
    {
        this.cgCanvas.updateSize();
    }

    setSize(w, h, ignorestyle)
    {
        this.cgCanvas.setSize(w, h, ignorestyle);
    }

    _resizeToWindowSize()
    {
        this.setSize(window.innerWidth, window.innerHeight);
        this.updateSize();
    }

    _resizeToParentSize()
    {
        const p = this.canvas.parentElement;
        if (!p)
        {
            this._log.error("cables: can not resize to container element");
            return;
        }
        this.setSize(p.clientWidth, p.clientHeight);

        this.updateSize();
    }

    setAutoResize(parent)
    {
        window.removeEventListener("resize", this._resizeToWindowSize.bind(this));
        window.removeEventListener("resize", this._resizeToParentSize.bind(this));

        if (parent == "window")
        {
            window.addEventListener("resize", this._resizeToWindowSize.bind(this));
            window.addEventListener("orientationchange", this._resizeToWindowSize.bind(this));
            this._resizeToWindowSize();
        }
        if (parent == "parent")
        {
            window.addEventListener("resize", this._resizeToParentSize.bind(this));
            this._resizeToParentSize();
        }
    }


    /**
 * push a matrix to the projection matrix stack
 * @function pushPMatrix
 * @memberof Context
 * @instance
 * @param {mat4} projectionmatrix
 */
    pushPMatrix()
    {
        this.pMatrix = this._pMatrixStack.push(this.pMatrix);
    }

    /**
  * pop projection matrix stack
  * @function popPMatrix
  * @memberof Context
  * @instance
  * @returns {mat4} current projectionmatrix
  */
    popPMatrix()
    {
        this.pMatrix = this._pMatrixStack.pop();
        return this.pMatrix;
    }

    getProjectionMatrixStateCount()
    {
        return this._pMatrixStack.stateCounter;
    }

    /**
  * push a matrix to the model matrix stack
  * @function pushModelMatrix
  * @memberof Context
  * @instance
  * @param {mat4} modelmatrix
  * @example
  * // see source code of translate op:
  * cgl.pushModelMatrix();
  * mat4.translate(cgl.mMatrix,cgl.mMatrix, vec);
  * trigger.trigger();
  * cgl.popModelMatrix();
  */
    pushModelMatrix()
    {
        this.mMatrix = this._mMatrixStack.push(this.mMatrix);
    }

    /**
  * pop model matrix stack
  * @function popModelMatrix
  * @memberof Context
  * @instance
  * @returns {mat4} current modelmatrix
  */
    popModelMatrix()
    {
        // todo: DEPRECATE
        // if (this._mMatrixStack.length === 0) throw "Invalid modelview popMatrix!";
        this.mMatrix = this._mMatrixStack.pop();
        return this.mMatrix;
    }

    /**
  * get model matrix
  * @function modelMatrix
  * @memberof Context
  * @instance
  * @returns {mat4} current modelmatrix
  */
    modelMatrix()
    {
        return this.mMatrix;
    }


    /**
 * push a matrix to the view matrix stack
 * @function pushviewMatrix
 * @memberof Context
 * @instance
 * @param {mat4} viewmatrix
 */
    pushViewMatrix()
    {
        this.vMatrix = this._vMatrixStack.push(this.vMatrix);
    }

    /**
  * pop view matrix stack
  * @function popViewMatrix
  * @memberof Context
  * @instance
  * @returns {mat4} current viewmatrix
  * @function
  */
    popViewMatrix()
    {
        this.vMatrix = this._vMatrixStack.pop();
    }

    getViewMatrixStateCount()
    {
        return this._vMatrixStack.stateCounter;
    }

    _startMatrixStacks(identTranslate, identTranslateView)
    {
        identTranslate = identTranslate || this._ident;
        identTranslateView = identTranslateView || this._identView;

        mat4.perspective(this.pMatrix, 45, this.canvasWidth / this.canvasHeight, 0.1, 1000.0);

        mat4.identity(this.mMatrix);
        mat4.identity(this.vMatrix);
        mat4.translate(this.mMatrix, this.mMatrix, identTranslate);
        mat4.translate(this.vMatrix, this.vMatrix, identTranslateView);

        this.pushPMatrix();
        this.pushModelMatrix();
        this.pushViewMatrix();
    }

    _endMatrixStacks()
    {
        this.popViewMatrix();
        this.popModelMatrix();
        this.popPMatrix();
    }

    dispose()
    {
        this.aborted = true;
        if (this.cgCanvas) this.cgCanvas.dispose();
        if (this._dispose) this._dispose();
    }
}






/***/ }),

/***/ "./src/core/cg/cg_uniform.js":
/*!***********************************!*\
  !*** ./src/core/cg/cg_uniform.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _core_port_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core_port.js */ "./src/core/core_port.js");



class CgUniform
{
    constructor(__shader, __type, __name, _value, _port2, _port3, _port4, _structUniformName, _structName, _propertyName)
    {
        this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cg_uniform");
        this._type = __type;
        this._name = __name;
        this._shader = __shader;
        this._value = 0.00001;
        this._oldValue = null;
        this._port = null;
        this._structName = _structName;
        this._structUniformName = _structUniformName;
        this._propertyName = _propertyName;

        this._shader._addUniform(this);
        this.needsUpdate = true;
        this.shaderType = null;
        this.comment = null;

        if (__type == "f")
        {
            this.set = this.setValue = this.setValueF.bind(this);
            this.updateValue = this.updateValueF.bind(this);
        }
        else if (__type == "f[]")
        {
            this.set = this.setValue = this.setValueArrayF.bind(this);
            this.updateValue = this.updateValueArrayF.bind(this);
        }
        else if (__type == "2f[]")
        {
            this.set = this.setValue = this.setValueArray2F.bind(this);
            this.updateValue = this.updateValueArray2F.bind(this);
        }
        else if (__type == "3f[]")
        {
            this.set = this.setValue = this.setValueArray3F.bind(this);
            this.updateValue = this.updateValueArray3F.bind(this);
        }
        else if (__type == "4f[]")
        {
            this.set = this.setValue = this.setValueArray4F.bind(this);
            this.updateValue = this.updateValueArray4F.bind(this);
        }
        else if (__type == "i")
        {
            this.set = this.setValue = this.setValueI.bind(this);
            this.updateValue = this.updateValueI.bind(this);
        }
        else if (__type == "2i")
        {
            this.set = this.setValue = this.setValue2I.bind(this);
            this.updateValue = this.updateValue2I.bind(this);
        }
        else if (__type == "3i")
        {
            this.set = this.setValue = this.setValue3I.bind(this);
            this.updateValue = this.updateValue3I.bind(this);
        }
        else if (__type == "4i")
        {
            this.set = this.setValue = this.setValue4I.bind(this);
            this.updateValue = this.updateValue4I.bind(this);
        }
        else if (__type == "b")
        {
            this.set = this.setValue = this.setValueBool.bind(this);
            this.updateValue = this.updateValueBool.bind(this);
        }
        else if (__type == "4f")
        {
            this.set = this.setValue = this.setValue4F.bind(this);
            this.updateValue = this.updateValue4F.bind(this);
        }
        else if (__type == "3f")
        {
            this.set = this.setValue = this.setValue3F.bind(this);
            this.updateValue = this.updateValue3F.bind(this);
        }
        else if (__type == "2f")
        {
            this.set = this.setValue = this.setValue2F.bind(this);
            this.updateValue = this.updateValue2F.bind(this);
        }
        else if (__type == "t")
        {
            this.set = this.setValue = this.setValueT.bind(this);
            this.updateValue = this.updateValueT.bind(this);
        }
        else if (__type == "tc")
        {
            this.set = this.setValue = this.setValueT.bind(this);
            this.updateValue = this.updateValueT.bind(this);
        }
        else if (__type == "t[]")
        {
            this.set = this.setValue = this.setValueArrayT.bind(this);
            this.updateValue = this.updateValueArrayT.bind(this);
        }
        else if (__type == "m4" || __type == "m4[]")
        {
            this.set = this.setValue = this.setValueM4.bind(this);
            this.updateValue = this.updateValueM4.bind(this);
        }
        else throw new Error("Unknown uniform type");

        if (typeof _value == "object" && _value instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_1__.Port)
        {
            this._port = _value;
            this._value = this._port.get();


            if (_port2 && _port3 && _port4)
            {
                if (!(_port2 instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_1__.Port) || !(_port3 instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_1__.Port) || !(_port4 instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_1__.Port))
                {
                    this._log.error("[cgl_uniform] mixed port/value parameter for vec4 ", this._name);
                }

                this._value = [0, 0, 0, 0];
                this._port2 = _port2;
                this._port3 = _port3;
                this._port4 = _port4;

                this._port.on("change", this.updateFromPort4f.bind(this));
                this._port2.on("change", this.updateFromPort4f.bind(this));
                this._port3.on("change", this.updateFromPort4f.bind(this));
                this._port4.on("change", this.updateFromPort4f.bind(this));

                // this._port.onChange = this._port2.onChange = this._port3.onChange = this._port4.onChange = this.updateFromPort4f.bind(this);
                this.updateFromPort4f();
            }
            else if (_port2 && _port3)
            {
                if (!(_port2 instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_1__.Port) || !(_port3 instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_1__.Port))
                {
                    this._log.error("[cgl_uniform] mixed port/value parameter for vec4 ", this._name);
                }

                this._value = [0, 0, 0];
                this._port2 = _port2;
                this._port3 = _port3;
                // this._port.onChange = this._port2.onChange = this._port3.onChange = this.updateFromPort3f.bind(this);
                this._port.on("change", this.updateFromPort3f.bind(this));
                this._port2.on("change", this.updateFromPort3f.bind(this));
                this._port3.on("change", this.updateFromPort3f.bind(this));

                this.updateFromPort3f();
            }
            else if (_port2)
            {
                if (!(_port2 instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_1__.Port))
                {
                    this._log.error("[cgl_uniform] mixed port/value parameter for vec4 ", this._name);
                }

                this._value = [0, 0];
                this._port2 = _port2;
                // this._port.onChange = this._port2.onChange = this.updateFromPort2f.bind(this);
                this._port.on("change", this.updateFromPort2f.bind(this));
                this._port2.on("change", this.updateFromPort2f.bind(this));

                this.updateFromPort2f();
            }
            else
            {
                // this._port.on = this.updateFromPort.bind(this);
                this._port.on("change", this.updateFromPort.bind(this));
            }
        }
        else this._value = _value;

        this.setValue(this._value);
        this.needsUpdate = true;
    }


    getType()
    {
        return this._type;
    }

    getName()
    {
        return this._name;
    }

    getValue()
    {
        return this._value;
    }

    getShaderType()
    {
        return this.shaderType;
    }

    isStructMember()
    {
        return !!this._structName;
    }


    updateFromPort4f()
    {
        this._value[0] = this._port.get();
        this._value[1] = this._port2.get();
        this._value[2] = this._port3.get();
        this._value[3] = this._port4.get();
        this.setValue(this._value);
    }

    updateFromPort3f()
    {
        this._value[0] = this._port.get();
        this._value[1] = this._port2.get();
        this._value[2] = this._port3.get();
        this.setValue(this._value);
    }

    updateFromPort2f()
    {
        this._value[0] = this._port.get();
        this._value[1] = this._port2.get();
        this.setValue(this._value);
    }

    updateFromPort()
    {
        this.setValue(this._port.get());
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CgUniform);


/***/ }),

/***/ "./src/core/cg/sg_fpscounter.js":
/*!**************************************!*\
  !*** ./src/core/cg/sg_fpscounter.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FpsCounter)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/eventtarget.js");


class FpsCounter extends cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    constructor()
    {
        super();
        this._timeStartFrame = 0;
        this._timeStartSecond = 0;
        this._fpsCounter = 0;
        this._msCounter = 0;
        this._frameCount = 0;

        this.stats = { "ms": 0, "fps": 0 };
    }

    get frameCount()
    {
        return this._frameCount;
    }

    startFrame()
    {
        this._timeStartFrame = CABLES.now();
    }

    endFrame()
    {
        this._frameCount++;
        this._fpsCounter++;

        const timeFrame = CABLES.now() - this._timeStartFrame;
        this._msCounter += timeFrame;

        if (CABLES.now() - this._timeStartSecond > 1000)
        {
            this.endSecond();
        }
    }

    endSecond()
    {
        this.stats.fps = this._fpsCounter;
        this.stats.ms = Math.round(this._msCounter / this._fpsCounter * 100) / 100;

        this.emitEvent("performance", this.stats);

        // reset
        this._fpsCounter = 0;
        this._msCounter = 0;
        this._timeStartSecond = CABLES.now();
    }
}


/***/ }),

/***/ "./src/core/cgl/cgl_framebuffer.js":
/*!*****************************************!*\
  !*** ./src/core/cgl/cgl_framebuffer.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Framebuffer": () => (/* binding */ Framebuffer)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgl_texture.js */ "./src/core/cgl/cgl_texture.js");



// todo: convert to prototyped...

/**
 * a framebuffer
 * @external CGL
 * @namespace Framebuffer
 * @constructor
 * @param {Context} cgl
 * @param {Number} width
 * @param {Number} height
 * @param {Object} [options]
 */
const Framebuffer = function (_cgl, _w, _h, options)
{
    const cgl = _cgl;
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("Framebuffer");
    this.valid = true;

    let depthTextureExt = cgl.gl.DEPTH_TEXTURE;
    if (!depthTextureExt) depthTextureExt = cgl.enableExtension("WEBGL_depth_texture");
    if (!depthTextureExt) depthTextureExt = cgl.enableExtension("WEBKIT_WEBGL_depth_texture");
    if (!depthTextureExt) depthTextureExt = cgl.enableExtension("MOZ_WEBGL_depth_texture");

    if (!depthTextureExt)
    {
        cgl.exitError("NO_DEPTH_TEXTURE", "no depth texture support");
        // return;
    }

    let width = _w || 512;
    let height = _h || 512;

    options = options || {
        "isFloatingPointTexture": false,
    };

    if (!options.hasOwnProperty("clear")) options.clear = true;
    if (!options.hasOwnProperty("filter")) options.filter = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_LINEAR;

    const texture = new _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture(cgl, {
        "isFloatingPointTexture": options.isFloatingPointTexture,
        "filter": options.filter,
        "wrap": options.wrap || _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.CLAMP_TO_EDGE
    });

    let textureDepth = null;
    if (depthTextureExt)
    {
        textureDepth = new _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture(cgl, {
            "isDepthTexture": true,
        });
    }
    this._options = options;

    const frameBuf = cgl.gl.createFramebuffer();
    const depthBuffer = cgl.gl.createRenderbuffer();

    this.getWidth = function ()
    {
        return width;
    };
    this.getHeight = function ()
    {
        return height;
    };

    /**
     * get native gl framebuffer
     * @function getGlFrameBuffer
     * @memberof Framebuffer
     * @returns {Object} framebuffer
     */
    this.getGlFrameBuffer = function ()
    {
        return frameBuf;
    };

    /**
     * get depth renderbuffer
     * @function getDepthRenderBuffer
     * @memberof Framebuffer
     * @returns {Object} renderbuffer
     */
    this.getDepthRenderBuffer = function ()
    {
        return depthBuffer;
    };

    /**
     * get color texture
     * @function getTextureColor
     * @memberof Framebuffer
     * @returns {Texture} rgba texture
     */
    this.getTextureColor = function ()
    {
        return texture;
    };

    /**
     * get depth texture
     * @function getTextureDepth
     * @memberof Framebuffer
     * @returns {Texture} depth texture
     */
    this.getTextureDepth = function ()
    {
        return textureDepth;
    };

    this.setFilter = function (f)
    {
        texture.filter = f;
        texture.setSize(width, height);
    };

    this.setSize = function (w, h)
    {
        if (w < 2) w = 2;
        if (h < 2) h = 2;

        width = Math.ceil(w);
        height = Math.ceil(h);

        cgl.profileData.profileFrameBuffercreate++;

        cgl.gl.bindFramebuffer(cgl.gl.FRAMEBUFFER, frameBuf);
        cgl.gl.bindRenderbuffer(cgl.gl.RENDERBUFFER, depthBuffer);

        texture.setSize(width, height);
        if (textureDepth) textureDepth.setSize(width, height);

        // if(depthTextureExt) cgl.gl.renderbufferStorage(cgl.gl.RENDERBUFFER, cgl.gl.DEPTH_COMPONENT16, width,height);
        if (depthTextureExt) cgl.gl.renderbufferStorage(cgl.gl.RENDERBUFFER, cgl.gl.DEPTH_COMPONENT16, width, height);

        cgl.gl.framebufferTexture2D(cgl.gl.FRAMEBUFFER, cgl.gl.COLOR_ATTACHMENT0, cgl.gl.TEXTURE_2D, texture.tex, 0);

        if (depthTextureExt)
        {
            cgl.gl.framebufferRenderbuffer(cgl.gl.FRAMEBUFFER, cgl.gl.DEPTH_ATTACHMENT, cgl.gl.RENDERBUFFER, depthBuffer);
            cgl.gl.framebufferTexture2D(
                cgl.gl.FRAMEBUFFER,
                cgl.gl.DEPTH_ATTACHMENT, // safari needs DEPTH_ATTACHMENT NOT DEPTH_ATTACHMENT16
                // cgl.gl.DEPTH_COMPONENT16,
                cgl.gl.TEXTURE_2D,
                textureDepth.tex,
                0,
            );
        }

        if (!cgl.gl.isFramebuffer(frameBuf)) throw new Error("Invalid framebuffer");
        const status = cgl.gl.checkFramebufferStatus(cgl.gl.FRAMEBUFFER);

        switch (status)
        {
        case cgl.gl.FRAMEBUFFER_COMPLETE:
            break;
        case cgl.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            this._log.warn("FRAMEBUFFER_INCOMPLETE_ATTACHMENT...", width, height, texture.tex, depthBuffer);
            this.valid = false;
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
        case cgl.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            this._log.warn("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
            this.valid = false;
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
        case cgl.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            this._log.warn("FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
            this.valid = false;
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
        case cgl.gl.FRAMEBUFFER_UNSUPPORTED:
            this._log.warn("FRAMEBUFFER_UNSUPPORTED");
            this.valid = false;
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
        case 0x8CDB:
            this._log.warn("Incomplete: FRAMEBUFFER_INCOMPLETE_DRAW_BUFFER from ext. Or Safari/iOS undefined behaviour.");
            this.valid = false;
            break;
        default:
            this._log.warn("incomplete framebuffer", status);
            this.valid = false;
            throw new Error("Incomplete framebuffer: " + status);
            // throw("Incomplete framebuffer: " + status);
        }

        cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, null);
        cgl.gl.bindRenderbuffer(cgl.gl.RENDERBUFFER, null);
        cgl.gl.bindFramebuffer(cgl.gl.FRAMEBUFFER, null);
    };

    this.renderStart = function ()
    {
        cgl.pushModelMatrix();
        cgl.gl.bindFramebuffer(cgl.gl.FRAMEBUFFER, frameBuf);
        cgl.pushGlFrameBuffer(frameBuf);
        cgl.pushFrameBuffer(this);

        cgl.pushPMatrix();
        cgl.gl.viewport(0, 0, width, height);

        if (this._options.clear)
        {
            cgl.gl.clearColor(0, 0, 0, 0);
            cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
        }
    };

    this.renderEnd = function ()
    {
        cgl.popPMatrix();
        cgl.gl.bindFramebuffer(cgl.gl.FRAMEBUFFER, cgl.popGlFrameBuffer());
        cgl.popFrameBuffer();

        cgl.popModelMatrix();
        cgl.resetViewPort();
    };


    this.delete = function ()
    {
        texture.delete();
        this.valid = false;
        if (textureDepth) textureDepth.delete();
        cgl.gl.deleteRenderbuffer(depthBuffer);
        cgl.gl.deleteFramebuffer(frameBuf);
    };

    this.dispose = this.delete;

    this.setSize(width, height);
};




/***/ }),

/***/ "./src/core/cgl/cgl_framebuffer2.js":
/*!******************************************!*\
  !*** ./src/core/cgl/cgl_framebuffer2.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Framebuffer2": () => (/* binding */ Framebuffer2)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgl_texture.js */ "./src/core/cgl/cgl_texture.js");
// * see framebuffer1






const Framebuffer2 = function (cgl, w, h, options)
{
    if (cgl.glVersion == 1) return console.log("framebuffer2 used on webgl1");
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgl_framebuffer2");
    this.Framebuffer2DrawTargetsDefault = null;
    this.Framebuffer2BlittingFramebuffer = null;
    this.Framebuffer2FinalFramebuffer = null;
    this._cgl = cgl;

    this._cgl.printError("before framebuffer2 constructor");

    this._width = 0;
    this._height = 0;
    this.valid = true;

    this._depthRenderbuffer = null;
    this._frameBuffer = null;
    this._textureFrameBuffer = null;
    this._colorRenderbuffers = [];
    this._drawTargetArray = [];
    this._disposed = false;

    if (!this.Framebuffer2BlittingFramebuffer) this.Framebuffer2BlittingFramebuffer = cgl.gl.createFramebuffer();
    if (!this.Framebuffer2FinalFramebuffer) this.Framebuffer2FinalFramebuffer = cgl.gl.createFramebuffer();

    if (!this.Framebuffer2DrawTargetsDefault) this.Framebuffer2DrawTargetsDefault = [cgl.gl.COLOR_ATTACHMENT0];

    this._options = options || {
        "isFloatingPointTexture": false,
    };

    // this._cgl.printError("fb2 before");

    this.name = this._options.name || "unknown";

    this._cgl.profileData.addHeavyEvent("framebuffer create", this.name);

    if (!this._options.hasOwnProperty("numRenderBuffers")) this._options.numRenderBuffers = 1;
    if (!this._options.hasOwnProperty("depth")) this._options.depth = true;
    if (!this._options.hasOwnProperty("clear")) this._options.clear = true;
    if (!this._options.hasOwnProperty("multisampling"))
    {
        this._options.multisampling = false;
        this._options.multisamplingSamples = 0;
    }

    if (this._options.multisamplingSamples)
    {
        if (this._cgl.glSlowRenderer) this._options.multisamplingSamples = 0;
        if (!this._cgl.gl.MAX_SAMPLES) this._options.multisamplingSamples = 0;
        else this._options.multisamplingSamples = Math.min(this._cgl.maxSamples, this._options.multisamplingSamples);
    }

    if (!this._options.hasOwnProperty("filter")) this._options.filter = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_LINEAR;
    if (!this._options.hasOwnProperty("wrap")) this._options.wrap = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.WRAP_REPEAT;

    this._numRenderBuffers = this._options.numRenderBuffers;
    this._colorTextures = [];

    this.clearColors = [];
    for (let i = 0; i < this._numRenderBuffers; i++) this.clearColors.push([0, 0, 0, 1]);


    if (!options.pixelFormat)
    {
        if (options.isFloatingPointTexture) this._options.pixelFormat = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.PFORMATSTR_RGBA32F;
        else this._options.pixelFormat = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.PFORMATSTR_RGBA8UB;
    }


    for (let i = 0; i < this._numRenderBuffers; i++)
    {
        this._colorTextures[i] = new _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture(cgl, {
            "name": "fb2 " + this.name + " " + i,
            "isFloatingPointTexture": this._options.isFloatingPointTexture,
            "anisotropic": this._options.anisotropic || 0,
            "pixelFormat": this._options.pixelFormat,
            "filter": this._options.filter,
            "wrap": this._options.wrap,
        });
    }



    let fil = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_NEAREST;
    if (this._options.shadowMap) fil = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_LINEAR;

    const defaultTexSize = 512;

    if (this._options.depth)
    {
        this._textureDepth = new _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture(cgl,
            {
                "name": "fb2 depth " + this.name,
                "isDepthTexture": true,
                "filter": fil,
                "shadowMap": this._options.shadowMap || false,
                "width": w || defaultTexSize,
                "height": h || defaultTexSize,
            });
    }

    if (cgl.aborted) return;

    this.setSize(w || defaultTexSize, h || defaultTexSize);

    this._cgl.printError("framebuffer2 constructor");
};

Framebuffer2.prototype.getWidth = function ()
{
    return this._width;
};
Framebuffer2.prototype.getHeight = function ()
{
    return this._height;
};

Framebuffer2.prototype.getGlFrameBuffer = function ()
{
    return this._frameBuffer;
};

Framebuffer2.prototype.getDepthRenderBuffer = function ()
{
    return this._depthRenderbuffer;
};

Framebuffer2.prototype.getTextureColor = function ()
{
    return this._colorTextures[0];
};

Framebuffer2.prototype.getTextureColorNum = function (i)
{
    return this._colorTextures[i];
};

Framebuffer2.prototype.getTextureDepth = function ()
{
    return this._textureDepth;
};

Framebuffer2.prototype.setFilter = function (f)
{
    for (let i = 0; i < this._numRenderBuffers; i++)
    {
        this._colorTextures[i].filter = f;
        this._colorTextures[i].setSize(this._width, this._height);
    }
};

Framebuffer2.prototype.delete = Framebuffer2.prototype.dispose = function ()
{
    this._disposed = true;
    let i = 0;
    for (i = 0; i < this._numRenderBuffers; i++) this._colorTextures[i].delete();
    // this._texture.delete();
    if (this._textureDepth) this._textureDepth.delete();
    for (i = 0; i < this._numRenderBuffers; i++) this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffers[i]);
    this._cgl.gl.deleteRenderbuffer(this._depthRenderbuffer);
    this._cgl.gl.deleteFramebuffer(this._frameBuffer);
    this._cgl.gl.deleteFramebuffer(this._textureFrameBuffer);
};

Framebuffer2.prototype.setSize = function (w, h)
{
    if (this._disposed) return this._log.warn("disposed framebuffer setsize...");
    this._cgl.profileData.addHeavyEvent("framebuffer resize", this.name);

    let i = 0;

    this._width = this._cgl.checkTextureSize(w);
    this._height = this._cgl.checkTextureSize(h);

    this._cgl.profileData.profileFrameBuffercreate++;

    if (this._frameBuffer)
    {
        for (i = 0; i < this._numRenderBuffers; i++) this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffers[i]);
        // this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffer);
        this._cgl.gl.deleteRenderbuffer(this._depthRenderbuffer);
        this._cgl.gl.deleteFramebuffer(this._frameBuffer);
        this._cgl.gl.deleteFramebuffer(this._textureFrameBuffer);
    }

    this._frameBuffer = this._cgl.gl.createFramebuffer();
    this._textureFrameBuffer = this._cgl.gl.createFramebuffer();

    const depth = this._options.depth;

    for (i = 0; i < this._numRenderBuffers; i++)
    {
        this._colorTextures[i].setSize(this._width, this._height);
    }



    for (i = 0; i < this._numRenderBuffers; i++)
    {
        const renderBuffer = this._cgl.gl.createRenderbuffer();

        // color renderbuffer

        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer);
        this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, renderBuffer);

        const info = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.setUpGlPixelFormat(this._cgl, this._options.pixelFormat);
        let internFormat = info.glInternalFormat;

        // if (this._options.isFloatingPointTexture)
        // {
        if (CGL.Texture.isPixelFormatHalfFloat(info.pixelFormat))
        {
            if (!this._cgl.enableExtension("OES_texture_float_linear"))
            {
                this._options.filter = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_NEAREST;
                this.setFilter(this._options.filter);
            }
        }
        else if (CGL.Texture.isPixelFormatFloat(info.pixelFormat))
        {
            if (!this._cgl.enableExtension("OES_texture_float_linear"))
            {
                console.log("no linear pixelformat,using nearest");
                this._options.filter = _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_NEAREST;
                this.setFilter(this._options.filter);
            }
        }
        // else if (info.pixelFormat == Texture.PFORMATSTR_RGBA32F || info.pixelFormat == Texture.PFORMATSTR_R11FG11FB10F
        // else if (info.pixelFormat == Texture.PFORMATSTR_RGBA32F || info.pixelFormat == Texture.PFORMATSTR_R11FG11FB10F
        // else if (info.pixelFormat == Texture.PFORMATSTR_RG16F)
        // {
        //     const extcb = this._cgl.enableExtension("EXT_color_buffer_float");

        //     if (!this._cgl.enableExtension("OES_texture_float_linear"))
        //     {
        //         console.log("no linear pixelformat,switching to nearest");
        //         this._options.filter = Texture.FILTER_NEAREST;
        //         this.setFilter(this._options.filter);
        //     }
        // }
        // }

        if (this._options.multisampling && this._options.multisamplingSamples)
        {
            this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, internFormat, this._width, this._height);
        }
        else
        {
            this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, internFormat, this._width, this._height);
        }



        this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0 + i, this._cgl.gl.RENDERBUFFER, renderBuffer);
        this._colorRenderbuffers[i] = renderBuffer;
    }

    // this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this._textureFrameBuffer);
    this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._textureFrameBuffer);

    for (i = 0; i < this._numRenderBuffers; i++)
    {
        this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0 + i, this._cgl.gl.TEXTURE_2D, this._colorTextures[i].tex, 0);
    }

    if (this._options.depth)
    {
        this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.TEXTURE_2D, this._textureDepth.tex, 0);
    }

    // depth renderbuffer

    this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer);


    let depthType = this._cgl.gl.DEPTH_COMPONENT32F;

    if (this._cgl.glSlowRenderer) depthType = this._cgl.gl.DEPTH_COMPONENT16;
    if (depth)
    {
        this._textureDepth.setSize(this._width, this._height);
        this._depthRenderbuffer = this._cgl.gl.createRenderbuffer();

        this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer);
        if (this._options.isFloatingPointTexture)
        {
            if (this._options.multisampling) this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, depthType, this._width, this._height);
            else this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, depthType, this._width, this._height);
        }
        else if (this._options.multisampling)
        {
            this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, depthType, this._width, this._height);
            // this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER,depthType, this._width, this._height);
        }
        else
        {
            this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, depthType, this._width, this._height);
        }

        this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer);
    }

    // this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null);
    // this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._textureFrameBuffer);

    this._drawTargetArray.length = 0;
    for (i = 0; i < this._numRenderBuffers; i++) this._drawTargetArray.push(this._cgl.gl.COLOR_ATTACHMENT0 + i);

    // this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null);


    if (!this._cgl.gl.isFramebuffer(this._textureFrameBuffer)) this._log.warn("invalid framebuffer");// throw new Error("Invalid framebuffer");
    const status = this._cgl.gl.checkFramebufferStatus(this._cgl.gl.FRAMEBUFFER);

    if (status != this._cgl.gl.FRAMEBUFFER_COMPLETE)
    {
        this._log.error("framebuffer incomplete: " + this.name, this);
        console.log("options", this._options);

        switch (status)
        {
        case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
            this._log.warn("FRAMEBUFFER_INCOMPLETE_ATTACHMENT...", this);
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
        case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
            this._log.warn("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
        case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
            this._log.warn("FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
        case this._cgl.gl.FRAMEBUFFER_UNSUPPORTED:
            this._log.warn("FRAMEBUFFER_UNSUPPORTED");
            throw new Error("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
        default:
            this.valid = false;
            this._log.warn("incomplete framebuffer", status, this._frameBuffer);
            this._cgl.printError();
            this._cgl.exitError("Framebuffer incomplete...");

            this._frameBuffer = null;
            // debugger;
            throw new Error("Incomplete framebuffer: " + status);

        // throw("Incomplete framebuffer: " + status);
        }
    }

    this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null);
    this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null);

    // this._cgl.printError("fb setsize");
};

Framebuffer2.prototype.renderStart = function ()
{
    if (this._disposed) return this._log.warn("disposed framebuffer renderStart...");
    this._cgl.checkFrameStarted("fb2 renderstart");
    this._cgl.pushModelMatrix(); // needed ??

    this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer);
    this._cgl.pushGlFrameBuffer(this._frameBuffer);
    this._cgl.pushFrameBuffer(this);

    this._cgl.pushPMatrix();
    this._cgl.pushViewPort(0, 0, this._width, this._height);

    this._cgl.gl.drawBuffers(this._drawTargetArray);

    if (this._options.clear)
    {
        this._cgl.gl.clearColor(0, 0, 0, 0);
        this._cgl.gl.clear(this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT);
    }
};

Framebuffer2.prototype.clear = function ()
{
    if (this._numRenderBuffers <= 1)
    {
        this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this._frameBuffer);
        this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this._textureFrameBuffer);
    }
    else this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer);

    this._cgl.gl.drawBuffers(this._drawTargetArray);

    for (let i = 0; i < this._numRenderBuffers; i++)
    {
        this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0 + i, this._cgl.gl.TEXTURE_2D, this._colorTextures[i].tex, 0);
        this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, i, this.clearColors[i]);
    }
    this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null);
};

Framebuffer2.prototype.renderEnd = function ()
{
    if (this._disposed) return this._log.warn("disposed framebuffer renderEnd...");
    this._cgl.popPMatrix();

    this._cgl.profileData.profileFramebuffer++;


    if (this._numRenderBuffers <= 1)
    {
        this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this._frameBuffer);
        this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this._textureFrameBuffer);

        // const a = this._cgl.gl.getFramebufferAttachmentParameter(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING);
        // if (a == this._cgl.gl.SRGB)console.log("SRGB", this._cgl.gl.SRGB);
        // else if (a == this._cgl.gl.LINEAR)console.log("LINEAR", this._cgl.gl.LINEAR);


        this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, 0, [0.0, 0.0, 0.0, 1.0]);
        this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT, this._cgl.gl.NEAREST);
    }
    else
    {
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer);
        this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer);

        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer);
        this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.TEXTURE_2D, this._textureDepth.tex, 0);

        // console.log("fb this._numRenderBuffers", this._numRenderBuffers);
        for (let i = 0; i < this._numRenderBuffers; i++)
        {
            this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer);
            this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.RENDERBUFFER, this._colorRenderbuffers[i]);


            this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer);
            this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._colorTextures[i].tex, 0);

            this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null);

            this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer);
            this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this.Framebuffer2FinalFramebuffer);

            // this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, i, [0.0, 0.0, 0.0, 1.0]);



            let flags = this._cgl.gl.COLOR_BUFFER_BIT;
            if (i == 0) flags |= this._cgl.gl.DEPTH_BUFFER_BIT;

            this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, flags, this._cgl.gl.NEAREST);
        }
    }

    this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer());
    this._cgl.popFrameBuffer();

    this._cgl.popModelMatrix();
    // this._cgl.resetViewPort();
    this._cgl.popViewPort();


    if (this._colorTextures[0].filter == _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_MIPMAP)
    {
        for (let i = 0; i < this._numRenderBuffers; i++)
        {
            this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._colorTextures[i].tex);
            this._colorTextures[i].updateMipMap();
            this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null);
        }
    }
};



/// ///////


/***/ }),

/***/ "./src/core/cgl/cgl_marker.js":
/*!************************************!*\
  !*** ./src/core/cgl/cgl_marker.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Marker": () => (/* binding */ Marker),
/* harmony export */   "WireCube": () => (/* binding */ WireCube),
/* harmony export */   "WirePoint": () => (/* binding */ WirePoint)
/* harmony export */ });
const Marker = function (_cgl) // deprecated...
{
    this.draw = function (cgl, _size, depthTest) {};
};

const WirePoint = function (cgl) // deprecated...
{
    this.render = function (_cgl, _size) {};
};

const WireCube = function (cgl) // deprecated...
{
    this.render = function (_cgl, sizeX, sizeY, sizeZ) {};
};


/***/ }),

/***/ "./src/core/cgl/cgl_mesh.js":
/*!**********************************!*\
  !*** ./src/core/cgl/cgl_mesh.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MESH": () => (/* binding */ MESH),
/* harmony export */   "Mesh": () => (/* binding */ Mesh)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _cgl_shader_uniform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgl_shader_uniform.js */ "./src/core/cgl/cgl_shader_uniform.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./src/core/cgl/constants.js");
/* harmony import */ var _cgl_mesh_feedback_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cgl_mesh_feedback.js */ "./src/core/cgl/cgl_mesh_feedback.js");





const MESH = {};
MESH.lastMesh = null;

/**
 * webgl renderable 3d object
 * @external CGL
 * @namespace Mesh
 * @hideconstructor
 * @param {Context} cgl
 * @param {Geometry} geometry
 * @param {Number} [glPrimitive]
 * @class
 * @example
 * const cgl=this._cgl
 * const mesh=new CGL.Mesh(cgl, geometry);
 *
 * function render()
 * {
 *   mesh.render(cgl.getShader());
 * }
 */
const Mesh = function (_cgl, __geom, _options)
{
    this._cgl = _cgl;

    let options = _options || {};
    if (CABLES.UTILS.isNumeric(options))options = { "glPrimitive": _options }; // old constructor fallback...
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgl_mesh");
    this._bufVertexAttrib = null;
    this._bufVerticesIndizes = this._cgl.gl.createBuffer();
    this._indexType = this._cgl.gl.UNSIGNED_SHORT;
    this._attributes = [];
    this._attribLocs = {};
    this._geom = null;
    this._lastShader = null;
    this._numInstances = 0;
    this._glPrimitive = options.glPrimitive;

    this.opId = options.opId || "";
    this._preWireframeGeom = null;
    this.addVertexNumbers = false;
    this._name = "unknown";

    this.feedBackAttributes = [];
    this.setGeom(__geom);

    this._feedBacks = [];
    this._feedBacksChanged = false;
    this._transformFeedBackLoc = -1;
    this._lastAttrUpdate = 0;

    this.memFreed = false;

    this._cgl.profileData.addHeavyEvent("mesh constructed", this._name);

    this._queryExt = null;

    Object.defineProperty(this, "numInstances", {
        get()
        {
            return this._numInstances;
        },
        set(v)
        {
            this.setNumInstances(v);
        },
    });
};

Mesh.prototype.freeMem = function ()
{
    this.memFreed = true;

    for (let i = 0; i < this._attributes.length; i++)
    {
        this._attributes[i].floatArray = null;
    }
};

/**
 * @function updateVertices
 * @memberof Mesh
 * @instance
 * @description update vertices only from a geometry
 * @param {Geometry} geometry
 */
Mesh.prototype.updateVertices = function (geom)
{
    this.setAttribute(_constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_POSITION, geom.vertices, 3);
    this._numVerts = geom.vertices.length / 3;
};

Mesh.prototype.setAttributePointer = function (attrName, name, stride, offset)
{
    for (let i = 0; i < this._attributes.length; i++)
    {
        if (this._attributes[i].name == attrName)
        {
            if (!this._attributes[i].pointer) this._attributes[i].pointer = [];

            this._attributes[i].pointer.push(
                {
                    "loc": -1,
                    "name": name,
                    "stride": stride,
                    "offset": offset,
                    "instanced": attrName == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_INSTANCE_MMATRIX,
                }
            );
        }
    }
};

Mesh.prototype.getAttribute = function (name)
{
    for (let i = 0; i < this._attributes.length; i++) if (this._attributes[i].name == name) return this._attributes[i];
};

Mesh.prototype.setAttributeRange = function (attr, array, start, end)
{
    if (!attr) return;
    if (!start && !end) return;

    if (!attr.name)
    {
        this._log.stack("no attrname?!");
    }

    this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, attr.buffer);
    this._cgl.profileData.profileMeshAttributes += (end - start) || 0;

    this._cgl.profileData.profileSingleMeshAttribute[this._name] = this._cgl.profileData.profileSingleMeshAttribute[this._name] || 0;
    this._cgl.profileData.profileSingleMeshAttribute[this._name] += (end - start) || 0;

    if (attr.numItems < array.length / attr.itemSize)
    {
        this._resizeAttr(array, attr);
    }

    if (end >= array.length - 1)
    {
        this._log.log(this._cgl.canvas.id + " " + attr.name + " buffersubdata out of bounds ?", array.length, end, start, attr);
    }

    if (this._cgl.glVersion == 1) this._cgl.gl.bufferSubData(this._cgl.gl.ARRAY_BUFFER, 0, array); // probably slow/ maybe create and array with only changed size ??
    else this._cgl.gl.bufferSubData(this._cgl.gl.ARRAY_BUFFER, start * 4, array, start, (end - start));
};

Mesh.prototype._resizeAttr = function (array, attr)
{
    if (attr.buffer)
        this._cgl.gl.deleteBuffer(attr.buffer);

    attr.buffer = this._cgl.gl.createBuffer();
    this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, attr.buffer);
    this._bufferArray(array, attr);
    attr.numItems = array.length / attr.itemSize;// numItems;
};


Mesh.prototype._bufferArray = function (array, attr)
{
    let floatArray = attr.floatArray || null;
    if (!array) return;


    if (this._cgl.debugOneFrame)
    {
        console.log("_bufferArray", array.length, attr.name); // eslint-disable-line
    }

    if (!(array instanceof Float32Array))
    {
        if (attr && floatArray && floatArray.length == array.length)
        {
            floatArray.set(array);
            // floatArray = floatArray;
        }
        else
        {
            floatArray = new Float32Array(array);

            if (this._cgl.debugOneFrame)
            {
                console.log("_bufferArray create new float32array", array.length, attr.name); // eslint-disable-line
            }

            if (array.length > 10000)
            {
                this._cgl.profileData.profileNonTypedAttrib++;
                this._cgl.profileData.profileNonTypedAttribNames = "(" + this._name + ":" + attr.name + ")";
            }
        }
    }
    else floatArray = array;

    attr.arrayLength = floatArray.length;
    attr.floatArray = null;// floatArray;

    this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, floatArray, this._cgl.gl.DYNAMIC_DRAW);
};

/**
 * @function setAttribute
 * @description update attribute
 * @memberof Mesh
 * @instance
 * @param {String} attribute name
 * @param {Array} data
 * @param {Number} itemSize
 * @param {Object} options
 */
Mesh.prototype.addAttribute = Mesh.prototype.updateAttribute = Mesh.prototype.setAttribute = function (name, array, itemSize, options)
{
    if (!array)
    {
        this._log.error("mesh addAttribute - no array given! " + name);
        throw new Error();
    }
    let cb = null;
    let instanced = false;
    let i = 0;
    const numItems = array.length / itemSize;

    this._cgl.profileData.profileMeshAttributes += numItems || 0;

    if (typeof options == "function")
    {
        cb = options;
    }

    if (typeof options == "object")
    {
        if (options.cb) cb = options.cb;
        if (options.instanced) instanced = options.instanced;
    }

    if (name == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_INSTANCE_MMATRIX) instanced = true;


    for (i = 0; i < this._attributes.length; i++)
    {
        const attr = this._attributes[i];
        if (attr.name == name)
        {
            if (attr.numItems === numItems)
            {
            }
            else
            {
                // this._log.log("wrong buffer size", this._geom.name, attr.name, attr.numItems, numItems);
                this._resizeAttr(array, attr);
            }

            this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, attr.buffer);
            this._bufferArray(array, attr);

            return attr;
        }
    }

    // create new buffer...

    const buffer = this._cgl.gl.createBuffer();

    this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, buffer);
    // this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, floatArray, this._cgl.gl.DYNAMIC_DRAW);

    let type = this._cgl.gl.FLOAT;
    if (options && options.type) type = options.type;
    const attr = {
        "buffer": buffer,
        "name": name,
        "cb": cb,
        "itemSize": itemSize,
        "numItems": numItems,
        "startItem": 0,
        "instanced": instanced,
        "type": type
    };

    this._bufferArray(array, attr);

    if (name == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_POSITION) this._bufVertexAttrib = attr;
    this._attributes.push(attr);
    this._attribLocs = {};

    return attr;
};

Mesh.prototype.getAttributes = function ()
{
    return this._attributes;
};

/**
 * @function updateTexCoords
 * @description update texture coordinates only from a geometry
 * @memberof Mesh
 * @instance
 * @param {Geometry} geometry
 */
Mesh.prototype.updateTexCoords = function (geom)
{
    if (geom.texCoords && geom.texCoords.length > 0)
    {
        this.setAttribute(_constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_TEXCOORD, geom.texCoords, 2);
    }
    else
    {
        const tcBuff = new Float32Array(Math.round((geom.vertices.length / 3) * 2));
        this.setAttribute(_constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_TEXCOORD, tcBuff, 2);
    }
};


/**
 * @function updateNormals
 * @description update normals only from a geometry
 * @memberof Mesh
 * @instance
 * @param {Geometry} geometry
 */
Mesh.prototype.updateNormals = function (geom)
{
    if (geom.vertexNormals && geom.vertexNormals.length > 0)
    {
        this.setAttribute(_constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_NORMAL, geom.vertexNormals, 3);
    }
    else
    {
        const tcBuff = new Float32Array(Math.round((geom.vertices.length)));
        this.setAttribute(_constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_NORMAL, tcBuff, 3);
    }
};


Mesh.prototype._setVertexNumbers = function (arr)
{
    if (!this._verticesNumbers || this._verticesNumbers.length != this._numVerts || arr)
    {
        if (arr) this._verticesNumbers = arr;
        else
        {
            this._verticesNumbers = new Float32Array(this._numVerts);
            for (let i = 0; i < this._numVerts; i++) this._verticesNumbers[i] = i;
        }

        this.setAttribute(_constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_NUMBER, this._verticesNumbers, 1, (attr, geom, shader) =>
        {
            if (!shader.uniformNumVertices) shader.uniformNumVertices = new _cgl_shader_uniform_js__WEBPACK_IMPORTED_MODULE_2__.Uniform(shader, "f", "numVertices", this._numVerts);
            shader.uniformNumVertices.setValue(this._numVerts);

            // console.log("this._numVerts", this._numVerts, attr, shader.uniformNumVertices);
        });
    }
};

/**
 * @function setVertexIndices
 * @description update vertex indices / faces
 * @memberof Mesh
 * @instance
 * @param {array} vertIndices
 */
Mesh.prototype.setVertexIndices = function (vertIndices)
{
    if (!this._bufVerticesIndizes)
    {
        this._log.warn("no bufVerticesIndizes: " + this._name);
        return;
    }
    if (vertIndices.length > 0)
    {
        if (vertIndices instanceof Float32Array) this._log.warn("vertIndices float32Array: " + this._name);

        for (let i = 0; i < vertIndices.length; i++)
        {
            if (vertIndices[i] >= this._numVerts)
            {
                this._log.warn("invalid index in " + this._name, i, vertIndices[i]);
                return;
            }
        }

        this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes);

        // todo cache this ?
        // if(!this.vertIndicesTyped || this.vertIndicesTyped.length!=this._geom.verticesIndices.length)

        if (vertIndices.length > 65535)
        {
            this.vertIndicesTyped = new Uint32Array(vertIndices);
            this._indexType = this._cgl.gl.UNSIGNED_INT;
        }
        else
        if (vertIndices instanceof Uint32Array)
        {
            this.vertIndicesTyped = vertIndices;
            this._indexType = this._cgl.gl.UNSIGNED_INT;
        }
        else
        if (!(vertIndices instanceof Uint16Array))
        {
            this.vertIndicesTyped = new Uint16Array(vertIndices);
            this._indexType = this._cgl.gl.UNSIGNED_SHORT;
        }
        else this.vertIndicesTyped = vertIndices;

        this._cgl.gl.bufferData(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this.vertIndicesTyped, this._cgl.gl.DYNAMIC_DRAW);
        this._bufVerticesIndizes.itemSize = 1;
        this._bufVerticesIndizes.numItems = vertIndices.length;
    }
    else this._bufVerticesIndizes.numItems = 0;
};

/**
 * @function setGeom
 * @memberof Mesh
 * @instance
 * @description set geometry for mesh
 * @param {Geometry} geometry
 */
Mesh.prototype.setGeom = function (geom, removeRef)
{
    this._geom = geom;
    if (geom.glPrimitive != null) this._glPrimitive = geom.glPrimitive;
    if (this._geom && this._geom.name) this._name = "mesh " + this._geom.name;

    MESH.lastMesh = null;
    this._cgl.profileData.profileMeshSetGeom++;

    this._disposeAttributes();

    this.updateVertices(this._geom);
    this.setVertexIndices(this._geom.verticesIndices);

    if (this.addVertexNumbers) this._setVertexNumbers();

    const geomAttribs = this._geom.getAttributes();

    const attribAssoc = {
        "texCoords": _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_TEXCOORD,
        "vertexNormals": _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_NORMAL,
        "vertexColors": _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_VERTEX_COLOR,
        "tangents": "attrTangent",
        "biTangents": "attrBiTangent",
    };

    for (const index in geomAttribs)
        if (geomAttribs[index].data && geomAttribs[index].data.length)
            this.setAttribute(attribAssoc[index] || index, geomAttribs[index].data, geomAttribs[index].itemSize);


    if (removeRef)
    {
        this._geom = null;
    }
};

Mesh.prototype._preBind = function (shader)
{
    for (let i = 0; i < this._attributes.length; i++)
        if (this._attributes[i].cb)
            this._attributes[i].cb(this._attributes[i], this._geom, shader);
};

Mesh.prototype._checkAttrLengths = function ()
{
    if (this.memFreed) return;
    // check length
    for (let i = 0; i < this._attributes.length; i++)
    {
        if (this._attributes[i].arrayLength / this._attributes[i].itemSize < this._attributes[0].arrayLength / this._attributes[0].itemSize)
        {
            let name = "unknown";
            if (this._geom)name = this._geom.name;
            // this._log.warn(
            //     name + ": " + this._attributes[i].name +
            //     " wrong attr length. is:", this._attributes[i].arrayLength / this._attributes[i].itemSize,
            //     " should be:", this._attributes[0].arrayLength / this._attributes[0].itemSize,
            // );
        }
    }
};

Mesh.prototype._bind = function (shader)
{
    if (!shader.isValid()) return;

    let attrLocs = [];
    if (this._attribLocs[shader.id]) attrLocs = this._attribLocs[shader.id];
    else this._attribLocs[shader.id] = attrLocs;

    this._lastShader = shader;
    if (shader.lastCompile > this._lastAttrUpdate || attrLocs.length != this._attributes.length)
    {
        this._lastAttrUpdate = shader.lastCompile;
        for (let i = 0; i < this._attributes.length; i++) attrLocs[i] = -1;
    }

    for (let i = 0; i < this._attributes.length; i++)
    {
        const attribute = this._attributes[i];
        if (attrLocs[i] == -1)
        {
            if (attribute._attrLocationLastShaderTime != shader.lastCompile)
            {
                attribute._attrLocationLastShaderTime = shader.lastCompile;
                attrLocs[i] = this._cgl.glGetAttribLocation(shader.getProgram(), attribute.name);
                // this._log.log('attribloc',attribute.name,attrLocs[i]);
                this._cgl.profileData.profileAttrLoc++;
            }
        }

        if (attrLocs[i] != -1)
        {
            this._cgl.gl.enableVertexAttribArray(attrLocs[i]);
            this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, attribute.buffer);

            if (attribute.instanced)
            {
                // todo: easier way to fill mat4 attribs...
                if (attribute.itemSize <= 4)
                {
                    if (!attribute.itemSize || attribute.itemSize == 0) this._log.warn("instanced attrib itemsize error", this._geom.name, attribute);

                    this._cgl.gl.vertexAttribPointer(attrLocs[i], attribute.itemSize, attribute.type, false, attribute.itemSize * 4, 0);
                    this._cgl.gl.vertexAttribDivisor(attrLocs[i], 1);
                }
                else if (attribute.itemSize == 16)
                {
                    const stride = 16 * 4;

                    this._cgl.gl.vertexAttribPointer(attrLocs[i], 4, attribute.type, false, stride, 0);
                    this._cgl.gl.enableVertexAttribArray(attrLocs[i] + 1);
                    this._cgl.gl.vertexAttribPointer(attrLocs[i] + 1, 4, attribute.type, false, stride, 4 * 4 * 1);
                    this._cgl.gl.enableVertexAttribArray(attrLocs[i] + 2);
                    this._cgl.gl.vertexAttribPointer(attrLocs[i] + 2, 4, attribute.type, false, stride, 4 * 4 * 2);
                    this._cgl.gl.enableVertexAttribArray(attrLocs[i] + 3);
                    this._cgl.gl.vertexAttribPointer(attrLocs[i] + 3, 4, attribute.type, false, stride, 4 * 4 * 3);

                    this._cgl.gl.vertexAttribDivisor(attrLocs[i], 1);
                    this._cgl.gl.vertexAttribDivisor(attrLocs[i] + 1, 1);
                    this._cgl.gl.vertexAttribDivisor(attrLocs[i] + 2, 1);
                    this._cgl.gl.vertexAttribDivisor(attrLocs[i] + 3, 1);
                }
                else
                {
                    this._log.warn("unknown instance attrib size", attribute.name);
                }
            }
            else
            {
                if (!attribute.itemSize || attribute.itemSize == 0) this._log.warn("attrib itemsize error", this._name, attribute);
                this._cgl.gl.vertexAttribPointer(attrLocs[i], attribute.itemSize, attribute.type, false, attribute.itemSize * 4, 0);

                if (attribute.pointer)
                {
                    for (let ip = 0; ip < attribute.pointer.length; ip++)
                    {
                        const pointer = attribute.pointer[ip];

                        if (pointer.loc == -1)
                            pointer.loc = this._cgl.glGetAttribLocation(shader.getProgram(), pointer.name);

                        this._cgl.profileData.profileAttrLoc++;

                        this._cgl.gl.enableVertexAttribArray(pointer.loc);
                        this._cgl.gl.vertexAttribPointer(pointer.loc, attribute.itemSize, attribute.type, false, pointer.stride, pointer.offset);
                    }
                }
                this.bindFeedback(attribute);
            }
        }
    }

    if (this._bufVerticesIndizes && this._bufVerticesIndizes.numItems !== 0) this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes);
};

Mesh.prototype.unBind = function ()
{
    const shader = this._lastShader;
    this._lastShader = null;
    if (!shader) return;

    let attrLocs = [];
    if (this._attribLocs[shader.id]) attrLocs = this._attribLocs[shader.id];
    else this._attribLocs[shader.id] = attrLocs;

    MESH.lastMesh = null;

    for (let i = 0; i < this._attributes.length; i++)
    {
        if (this._attributes[i].instanced)
        {
            // todo: easier way to fill mat4 attribs...
            if (this._attributes[i].itemSize <= 4)
            {
                if (attrLocs[i] != -1) this._cgl.gl.vertexAttribDivisor(attrLocs[i], 0);
                if (attrLocs[i] >= 0) this._cgl.gl.disableVertexAttribArray(attrLocs[i]);
            }
            else
            {
                this._cgl.gl.vertexAttribDivisor(attrLocs[i], 0);
                this._cgl.gl.vertexAttribDivisor(attrLocs[i] + 1, 0);
                this._cgl.gl.vertexAttribDivisor(attrLocs[i] + 2, 0);
                this._cgl.gl.vertexAttribDivisor(attrLocs[i] + 3, 0);
                this._cgl.gl.disableVertexAttribArray(attrLocs[i] + 1);
                this._cgl.gl.disableVertexAttribArray(attrLocs[i] + 2);
                this._cgl.gl.disableVertexAttribArray(attrLocs[i] + 3);
            }
        }

        if (attrLocs[i] != -1) this._cgl.gl.disableVertexAttribArray(attrLocs[i]);
    }
};

Mesh.prototype.meshChanged = function ()
{
    return this._cgl.lastMesh && this._cgl.lastMesh != this;
};

Mesh.prototype.printDebug = function (shader)
{
    console.log("--attributes");
    for (let i = 0; i < this._attributes.length; i++)
    {
        console.log("attribute " + i + " " + this._attributes[i].name);
    }
};

Mesh.prototype.setNumVertices = function (num)
{
    this._bufVertexAttrib.numItems = num;
};

Mesh.prototype.getNumVertices = function ()
{
    return this._bufVertexAttrib.numItems;
};


/**
 * @function render
 * @memberof Mesh
 * @instance
 * @description draw mesh to screen
 * @param {Shader} shader
 */
Mesh.prototype.render = function (shader)
{
    // TODO: enable/disablevertex only if the mesh has changed... think drawing 10000x the same mesh

    if (!shader || !shader.isValid() || this._cgl.aborted) return;

    this._checkAttrLengths();

    if (this._geom)
    {
        if (this._preWireframeGeom && !shader.wireframe && !this._geom.isIndexed())
        {
            this.setGeom(this._preWireframeGeom);
            this._preWireframeGeom = null;
            // console.log("remove prewireframe geom");
        }

        if (shader.wireframe)
        {
            let changed = false;

            if (this._geom.isIndexed())
            {
                if (!this._preWireframeGeom)
                {
                    this._preWireframeGeom = this._geom;
                    this._geom = this._geom.copy();
                }

                this._geom.unIndex();
                changed = true;
            }

            if (!this._geom.getAttribute("attrBarycentric"))
            {
                if (!this._preWireframeGeom)
                {
                    this._preWireframeGeom = this._geom;
                    this._geom = this._geom.copy();
                }
                changed = true;

                this._geom.calcBarycentric();
            }
            if (changed) this.setGeom(this._geom);
        }
        // if (shader.wireframe)
        // console.log(shader.wireframe, this._geom.isIndexed());
    }

    let needsBind = false;
    if (MESH.lastMesh != this)
    {
        if (MESH.lastMesh) MESH.lastMesh.unBind();
        needsBind = true;
    }


    // var needsBind=false;
    // {
    //     needsBind=true;
    // }
    if (needsBind) this._preBind(shader);

    if (!shader.bind()) return;

    // if(needsBind)
    this._bind(shader);
    if (this.addVertexNumbers) this._setVertexNumbers();

    MESH.lastMesh = this;

    let prim = this._cgl.gl.TRIANGLES;
    if (this._glPrimitive !== undefined) prim = this._glPrimitive;
    if (shader.glPrimitive !== null) prim = shader.glPrimitive;

    let elementDiv = 1;
    let doQuery = this._cgl.profileData.doProfileGlQuery;
    let queryStarted = false;
    if (doQuery)
    {
        let id = this._name + " - " + shader.getName() + " #" + shader.id;
        if (this._numInstances) id += " instanced " + this._numInstances + "x";

        let queryProfilerData = this._cgl.profileData.glQueryData[id];

        if (!queryProfilerData) queryProfilerData = { "id": id, "num": 0 };

        if (shader.opId)queryProfilerData.shaderOp = shader.opId;
        if (this.opId)queryProfilerData.meshOp = this.opId;

        this._cgl.profileData.glQueryData[id] = queryProfilerData;

        if (!this._queryExt && this._queryExt !== false) this._queryExt = this._cgl.enableExtension("EXT_disjoint_timer_query_webgl2") || false;
        if (this._queryExt)
        {
            if (queryProfilerData._drawQuery)
            {
                const available = this._cgl.gl.getQueryParameter(queryProfilerData._drawQuery, this._cgl.gl.QUERY_RESULT_AVAILABLE);
                if (available)
                {
                    const elapsedNanos = this._cgl.gl.getQueryParameter(queryProfilerData._drawQuery, this._cgl.gl.QUERY_RESULT);
                    const currentTimeGPU = elapsedNanos / 1000000;

                    queryProfilerData._times = queryProfilerData._times || 0;
                    queryProfilerData._times += currentTimeGPU;
                    queryProfilerData._numcount++;
                    queryProfilerData.when = performance.now();
                    queryProfilerData._drawQuery = null;
                    queryProfilerData.queryStarted = false;
                }
            }

            if (!queryProfilerData.queryStarted)
            {
                queryProfilerData._drawQuery = this._cgl.gl.createQuery();
                this._cgl.gl.beginQuery(this._queryExt.TIME_ELAPSED_EXT, queryProfilerData._drawQuery);
                queryStarted = queryProfilerData.queryStarted = true;
            }
        }
    }


    if (this.hasFeedbacks())
    {
        this.drawFeedbacks(shader, prim);
    }
    else if (!this._bufVerticesIndizes || this._bufVerticesIndizes.numItems === 0)
    {
        // for (let i = 0; i < this._attributes.length; i++)
        // {
        //     if (this._attributes[i].arrayLength / this._attributes[i].itemSize != this._bufVertexAttrib.floatArray.length / 3)
        //     {
        //         this._log.warn("attrib buffer length wrong! ", this._attributes[i].name, this._attributes[i].arrayLength / this._attributes[i].itemSize, this._bufVertexAttrib.floatArray.length / 3, this._attributes[i].itemSize);
        //         // this._log.log(this);
        //         // debugger;
        //         return;
        //     }
        // }


        if (prim == this._cgl.gl.TRIANGLES)elementDiv = 3;
        if (this._numInstances === 0) this._cgl.gl.drawArrays(prim, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems - this._bufVertexAttrib.startItem);
        else this._cgl.gl.drawArraysInstanced(prim, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems, this._numInstances);
    }
    else
    {
        if (prim == this._cgl.gl.TRIANGLES)elementDiv = 3;
        if (this._numInstances === 0)
        {
            // console.log("la", this._bufVerticesIndizes.numItems);

            this._cgl.gl.drawElements(prim, this._bufVerticesIndizes.numItems, this._indexType, 0);
        }
        else
        {
            this._cgl.gl.drawElementsInstanced(prim, this._bufVerticesIndizes.numItems, this._indexType, 0, this._numInstances);
        }
    }

    if (this._cgl.debugOneFrame && this._cgl.gl.getError() != this._cgl.gl.NO_ERROR)
    {
        this._log.error("mesh draw gl error");
        this._log.error("mesh", this);
        this._log.error("shader", shader);

        const attribNames = [];
        for (let i = 0; i < this._cgl.gl.getProgramParameter(shader.getProgram(), this._cgl.gl.ACTIVE_ATTRIBUTES); i++)
        {
            const name = this._cgl.gl.getActiveAttrib(shader.getProgram(), i).name;
            this._log.error("attrib ", name);
        }
    }

    this._cgl.profileData.profileMeshNumElements += (this._bufVertexAttrib.numItems / elementDiv) * (this._numInstances || 1);
    this._cgl.profileData.profileMeshDraw++;

    if (doQuery && queryStarted)
    {
        this._cgl.gl.endQuery(this._queryExt.TIME_ELAPSED_EXT);
    }

    this._cgl.printError("mesh render " + this._name);

    this.unBind();
};

Mesh.prototype.setNumInstances = function (n)
{
    n = Math.max(0, n);
    if (this._numInstances != n)
    {
        this._numInstances = n;
        const indexArr = new Float32Array(n);
        for (let i = 0; i < n; i++) indexArr[i] = i;
        this.setAttribute(_constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.SHADER.SHADERVAR_INSTANCE_INDEX, indexArr, 1, { "instanced": true });
    }
};

Mesh.prototype._disposeAttributes = function ()
{
    if (!this._attributes) return;

    for (let i = 0; i < this._attributes.length; i++)
    {
        if (this._attributes[i].buffer)
        {
            this._cgl.gl.deleteBuffer(this._attributes[i].buffer);
            this._attributes[i].buffer = null;
        }
    }
    this._attributes.length = 0;
};

Mesh.prototype.dispose = function ()
{
    if (this._bufVertexAttrib && this._bufVertexAttrib.buffer) this._cgl.gl.deleteBuffer(this._bufVertexAttrib.buffer);
    if (this._bufVerticesIndizes) this._cgl.gl.deleteBuffer(this._bufVerticesIndizes);
    this._bufVerticesIndizes = null;

    this._disposeAttributes();
};

(0,_cgl_mesh_feedback_js__WEBPACK_IMPORTED_MODULE_3__.extendMeshWithFeedback)(Mesh);




/***/ }),

/***/ "./src/core/cgl/cgl_mesh_feedback.js":
/*!*******************************************!*\
  !*** ./src/core/cgl/cgl_mesh_feedback.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extendMeshWithFeedback": () => (/* binding */ extendMeshWithFeedback)
/* harmony export */ });
// view-source:http://toji.github.io/webgl2-particles-2/

function extendMeshWithFeedback(Mesh)
{
    Mesh.prototype.hasFeedbacks = function ()
    {
        return this._feedBacks.length > 0;
    };

    Mesh.prototype.removeFeedbacks = function (shader)
    {
        if (!this._feedbacks) return;
        this._feedbacks.length = 0;
        this._feedBacksChanged = true;
    };

    Mesh.prototype.setAttributeFeedback = function () {};

    Mesh.prototype.setFeedback = function (attrib, nameOut, initialArr)
    {
        let fb = { nameOut, };
        let found = false;
        this.unBindFeedbacks();

        for (let i = 0; i < this._feedBacks.length; i++)
        {
            if (this._feedBacks[i].nameOut == nameOut)
            {
                fb = this._feedBacks[i];

                found = true;
            }
        }

        if (!found) this._feedBacksChanged = true;

        fb.initialArr = initialArr;
        fb.attrib = attrib;

        // console.log("setfeedback");

        if (fb.outBuffer) this._cgl.gl.deleteBuffer(fb.outBuffer);
        // if(fb.attrib.buffer)this._cgl.gl.deleteBuffer(fb.attrib.buffer);
        fb.outBuffer = this._cgl.gl.createBuffer();
        this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, fb.outBuffer);
        this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, fb.initialArr, this._cgl.gl.STATIC_DRAW);

        this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, fb.attrib.buffer);
        this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, fb.initialArr, this._cgl.gl.STATIC_DRAW);

        if (!found) this._feedBacks.push(fb);

        // console.log('initialArr',initialArr.length/3);
        // console.log('vertices',fb.attrib.numItems);
        // console.log('vertices',this._bufVertexAttrib.numItems);

        return fb;
    };

    Mesh.prototype.bindFeedback = function (attrib)
    {
        if (!this._feedBacks || this._feedBacks.length === 0) return;
        if (this._transformFeedBackLoc == -1) this._transformFeedBackLoc = this._cgl.gl.createTransformFeedback();

        this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc);

        let found = false;

        for (let i = 0; i < this._feedBacks.length; i++)
        {
            const fb = this._feedBacks[i];

            if (fb.attrib == attrib)
            {
                found = true;
                // this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, fb.attrib.buffer);
                //
                // this._cgl.gl.vertexAttribPointer(
                //     fb.attrib.loc,
                //     fb.attrib.itemSize,
                //     fb.attrib.type,
                //     false,
                //     fb.attrib.itemSize*4, 0);

                this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, i, fb.outBuffer);
            }
        }

        if (!found)
        {
            // console.log("ARTTRIB NOT FOUND",attrib.name);
        }
    };

    Mesh.prototype.drawFeedbacks = function (shader, prim)
    {
        let i = 0;

        if (this._feedBacksChanged)
        {
            const names = [];
            this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc);

            for (i = 0; i < this._feedBacks.length; i++) names.push(this._feedBacks[i].nameOut);
            shader.setFeedbackNames(names);

            console.log("feedbacknames", names);

            shader.compile();
            this._feedBacksChanged = false;
            this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, null);
            console.log("changed finished");
            return;
        }

        //
        // for( i=0;i<this._feedBacks.length;i++)
        // {
        //     var fb=this._feedBacks[i];
        //
        //     this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, i, fb.outBuffer);
        // }

        // draw
        this._cgl.gl.beginTransformFeedback(this.glPrimitive);
        this._cgl.gl.drawArrays(prim, 0, this._feedBacks[0].attrib.numItems);

        // unbind
        this._cgl.gl.endTransformFeedback();

        this.unBindFeedbacks();

        this.feedBacksSwapBuffers();
    };

    Mesh.prototype.unBindFeedbacks = function ()
    {
        for (let i = 0; i < this._feedBacks.length; i++)
        {
            // this._cgl.gl.disableVertexAttribArray(this._feedBacks[i].attrib.loc);
            this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, i, null);
        }

        this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, null);
    };

    Mesh.prototype.feedBacksSwapBuffers = function ()
    {
        for (let i = 0; i < this._feedBacks.length; i++)
        {
            const t = this._feedBacks[i].attrib.buffer;
            this._feedBacks[i].attrib.buffer = this._feedBacks[i].outBuffer;
            this._feedBacks[i].outBuffer = t;
        }
    };
}


/***/ }),

/***/ "./src/core/cgl/cgl_profiledata.js":
/*!*****************************************!*\
  !*** ./src/core/cgl/cgl_profiledata.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileData": () => (/* binding */ ProfileData)
/* harmony export */ });
class ProfileData
{
    constructor(cgl)
    {
        this._cgl = cgl;
        this._lastTime = 0;
        this.pause = false;
        this.profileUniformCount = 0;
        this.profileShaderBinds = 0;
        this.profileUniformCount = 0;
        this.profileShaderCompiles = 0;
        this.profileVideosPlaying = 0;
        this.profileMVPMatrixCount = 0;
        this.profileEffectBuffercreate = 0;
        this.profileShaderGetUniform = 0;
        this.profileFrameBuffercreate = 0;
        this.profileMeshSetGeom = 0;
        this.profileTextureNew = 0;
        this.profileGenMipMap = 0;
        this.profileOnAnimFrameOps = 0;

        this.profileFencedPixelRead = 0;
        this.profileMainloopMs = 0;
        this.profileMeshDraw = 0;
        this.profileTextureEffect = 0;
        this.profileTexPreviews = 0;
        this.shaderCompileTime = 0;
        this.profileMeshNumElements = 0;
        this.profileMeshAttributes = 0;
        this.profileSingleMeshAttribute = [];
        this.heavyEvents = [];

        this.doProfileGlQuery = false;
        this.glQueryData = {};
    }

    clear()
    {
        this.profileSingleMeshAttribute = {};
        this.profileMeshAttributes = 0;
        this.profileUniformCount = 0;
        this.profileShaderGetUniform = 0;
        this.profileShaderCompiles = 0;
        this.profileShaderBinds = 0;
        this.profileTextureResize = 0;
        this.profileFrameBuffercreate = 0;
        this.profileEffectBuffercreate = 0;
        this.profileTextureDelete = 0;
        this.profileMeshSetGeom = 0;
        this.profileVideosPlaying = 0;
        this.profileMVPMatrixCount = 0;
        this.profileNonTypedAttrib = 0;
        this.profileNonTypedAttribNames = "";
        this.profileTextureNew = 0;
        this.profileGenMipMap = 0;
        this.profileFramebuffer = 0;
        this.profileMeshDraw = 0;
        this.profileTextureEffect = 0;
        this.profileTexPreviews = 0;
        this.profileMeshNumElements = 0;
        this.profileFencedPixelRead = 0;
    }

    clearGlQuery()
    {
        for (let i in this.glQueryData)
        {
            if (!this.glQueryData[i].lastClear || performance.now() - this.glQueryData[i].lastClear > 1000)
            {
                this.glQueryData[i].time = this.glQueryData[i]._times / this.glQueryData[i]._numcount;
                this.glQueryData[i].num = this.glQueryData[i]._numcount;

                this.glQueryData[i]._times = 0;
                this.glQueryData[i]._numcount = 0;
                this.glQueryData[i].lastClear = performance.now();
            }
        }
    }

    addHeavyEvent(event, name, info)
    {
        const e = { "event": event, "name": name, "info": info, "date": performance.now() };
        this.heavyEvents.push(e);
        this._cgl.emitEvent("heavyEvent", e);
    }
}





/***/ }),

/***/ "./src/core/cgl/cgl_shader.js":
/*!************************************!*\
  !*** ./src/core/cgl/cgl_shader.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shader": () => (/* binding */ Shader)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _cgl_shader_lib_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgl_shader_lib.js */ "./src/core/cgl/cgl_shader_lib.js");
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../timer.js */ "./src/core/timer.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/core/utils.js");
/* harmony import */ var _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cgl_mesh.js */ "./src/core/cgl/cgl_mesh.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants.js */ "./src/core/cgl/constants.js");
/* harmony import */ var _cgl_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cgl_utils.js */ "./src/core/cgl/cgl_utils.js");
/* harmony import */ var _cgl_shader_default_glsl_vert__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cgl_shader_default_glsl.vert */ "./src/core/cgl/cgl_shader_default_glsl.vert");





// import { CGL } from "./index.js";



// ---------------------------------------------------------------------------


/*

proposal default shader variable names:

attrVertex - currently: vPosition
attrVertexIndex - currently: attrVertIndex
attrTexCoord
attrInstMat - currently: instMat
attrVertColor
attrTangent
attrBiTangent

uProjMatrix - currently: projMatrix
uModelMatrix - currently: modelMatrix
uNormalMatrix - currently: normalMatrix
uCamPosition - currently: camPos

*/


// ---------------------------------------------------------------------------

let materialIdCounter = 0;

/**
 * @class
 * @external CGL
 * @namespace Shader
 * @hideconstructor
 * @example
 * var shader=new CGL.Shader(cgl,'MinimalMaterial');
 * shader.setSource(attachments.shader_vert,attachments.shader_frag);
 */
const Shader = function (_cgl, _name, _op)
{
    if (!_cgl) throw new Error("shader constructed without cgl " + _name);

    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgl_shader");
    this._cgl = _cgl;

    if (!_name) this._log.stack("no shader name given");
    this._name = _name || "unknown";

    if (_op) this.opId = _op.id;
    this.glslVersion = 0;
    if (_cgl.glVersion > 1) this.glslVersion = 300;

    this._materialId = ++materialIdCounter;

    this.id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.simpleId)();
    this._isValid = true;
    this._program = null;
    this._uniforms = [];
    this._drawBuffers = [true];
    this._defines = [];
    this._needsRecompile = true;
    this._compileReason = "initial";

    this.ignoreMissingUniforms = false;
    this._projMatrixUniform = null;
    this._mvMatrixUniform = null;
    this._mMatrixUniform = null;
    this._vMatrixUniform = null;
    this._camPosUniform = null;
    this._normalMatrixUniform = null;
    this._inverseViewMatrixUniform = null;

    this._attrVertexPos = -1;
    this.precision = _cgl.patch.config.glslPrecision || "highp";

    this._pMatrixState = -1;
    this._vMatrixState = -1;

    this._countMissingUniforms = 0;
    this._modGroupCount = 0; // not needed anymore...
    this._feedBackNames = [];
    this._attributes = [];

    this.glPrimitive = null;
    this.offScreenPass = false;
    this._extensions = [];
    this.srcVert = this.getDefaultVertexShader();
    this.srcFrag = this.getDefaultFragmentShader();
    this.lastCompile = 0;

    this._moduleNames = [];
    this._modules = [];
    this._moduleNumId = 0;

    this._libs = [];
    this._structNames = [];
    this._structUniformNames = [];
    this._textureStackUni = [];
    this._textureStackTex = [];
    this._textureStackType = [];
    this._textureStackTexCgl = [];

    this._tempNormalMatrix = mat4.create();
    this._tempCamPosMatrix = mat4.create();
    this._tempInverseViewMatrix = mat4.create();
    this._tempInverseProjMatrix = mat4.create();

    this.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG", "MODULE_VERTEX_MOVELVIEW"]);
};

Shader.prototype.isValid = function ()
{
    return this._isValid;
};

Shader.prototype.getCgl = function ()
{
    return this._cgl;
};

Shader.prototype.getName = function ()
{
    return this._name;
};

/**
 * enable an extension for the shader
 * @function enableExtension
 * @memberof Shader
 * @instance
 * @param name extension name
 */
Shader.prototype.enableExtension = function (name)
{
    this.setWhyCompile("enable extension " + name);
    this._needsRecompile = true;
    this._extensions.push(name);
};

Shader.prototype.getAttrVertexPos = function ()
{
    return this._attrVertexPos;
};

Shader.prototype.hasTextureUniforms = function ()
{
    for (let i = 0; i < this._uniforms.length; i++)
        if (this._uniforms[i].getType() == "t") return true;
    return false;
};

Shader.prototype.setWhyCompile = function (why)
{
    this._compileReason = why;
};

/**
 * copy all uniform values from another shader
 * @function copyUniforms
 * @memberof Shader
 * @instance
 * @param shader uniform values will be copied from this shader
 */
Shader.prototype.copyUniformValues = function (origShader)
{
    // console.log(origShader._uniforms);
    for (let i = 0; i < origShader._uniforms.length; i++)
    {
        if (!this._uniforms[i])
        {
            this._log.log("unknown uniform?!");
            continue;
        }

        // this._log.log(origShader._uniforms[i].getName());
        // this.getUniform(origShader._uniforms[i].)
        // this._uniforms[i].set(origShader._uniforms[i].getValue());


        // if (origShader._uniforms[i].getName().contains("pathPoints"))
        //     console.log("copyUniformValues", origShader._uniforms[i].getName(), origShader._uniforms[i].getValue());

        this.getUniform(origShader._uniforms[i].getName()).set(origShader._uniforms[i].getValue());
    }

    this.popTextures();
    for (let i = 0; i < origShader._textureStackUni.length; i++)
    {
        this._textureStackUni[i] = origShader._textureStackUni[i];
        this._textureStackTex[i] = origShader._textureStackTex[i];
        this._textureStackType[i] = origShader._textureStackType[i];
        this._textureStackTexCgl[i] = origShader._textureStackTexCgl[i];
    }

    // this._textureStackUni = [];
    // this._textureStackTex = [];
    // this._textureStackType = [];
    // this._textureStackTexCgl = [];
};

/**
 * copy current shader
 * @function copy
 * @memberof Shader
 * @instance
 * @returns newShader
 */
Shader.prototype.copy = function ()
{
    const shader = new Shader(this._cgl, this._name + " copy");
    shader.setSource(this.srcVert, this.srcFrag);

    shader._modules = JSON.parse(JSON.stringify(this._modules));
    shader._defines = JSON.parse(JSON.stringify(this._defines));

    shader._modGroupCount = this._modGroupCount;
    shader._moduleNames = this._moduleNames;
    shader.glPrimitive = this.glPrimitive;
    shader.offScreenPass = this.offScreenPass;
    shader._extensions = this._extensions;
    shader.wireframe = this.wireframe;
    shader._attributes = this._attributes;

    for (let i = 0; i < this._uniforms.length; i++)
    {
        const u = this._uniforms[i].copy(shader);
        u.resetLoc();
    }

    this.setWhyCompile("copy");
    shader._needsRecompile = true;
    return shader;
};


/**
 * set shader source code
 * @function setSource
 * @memberof Shader
 * @instance
 * @param {String} srcVert
 * @param {String} srcFrag
 */
Shader.prototype.setSource = function (srcVert, srcFrag)
{
    this.srcVert = srcVert;
    this.srcFrag = srcFrag;
    this.setWhyCompile("Source changed");
    this._needsRecompile = true;
    this._isValid = true;
};

Shader.prototype._addLibs = function (src)
{
    for (const id in _cgl_shader_lib_js__WEBPACK_IMPORTED_MODULE_2__.ShaderLibMods)
    {
        if (src.contains(id))
        {
            const lib = new _cgl_shader_lib_js__WEBPACK_IMPORTED_MODULE_2__.ShaderLibMods[id]();
            src = src.replace("{{" + id + "}}", lib.srcHeadFrag);
            this._libs.push(lib);
            if (lib.initUniforms)lib.initUniforms(this);
        }
    }

    return src;
};

Shader.prototype.createStructUniforms = function ()
{
    // * create structs
    let structStrFrag = "";
    let structStrVert = ""; // TODO: not used yet

    this._structNames = [];
    // * reset the arrays holding the value each recompile so we don't skip structs
    // * key value mapping so the same struct can be added twice (two times the same modifier)
    this._injectedStringsFrag = {};
    this._injectedStringsVert = {};

    this._structUniformNamesIndicesFrag = [];
    this._structUniformNamesIndicesVert = [];

    for (let i = 0; i < this._uniforms.length; i++)
    {
        // * only add uniforms to struct that are a member of a struct
        if (this._uniforms[i].isStructMember())
        {
            const injectionString = "{{INJECTION_POINT_STRUCT_" + this._uniforms[i]._structName + "}}";

            // * check if struct is not already part of shader
            if (!this._structNames.includes(this._uniforms[i]._structName))
            {
                // * create struct definition with placeholder string to inject
                const structDefinition = "struct "
                    + this._uniforms[i]._structName + " {".endl()
                    + injectionString
                    + "};".endl().endl();

                if (this._uniforms[i].getShaderType() === "both" || this._uniforms[i].getShaderType() === "frag")
                    structStrFrag = structStrFrag.concat(structDefinition);

                if (this._uniforms[i].getShaderType() === "both" || this._uniforms[i].getShaderType() === "vert")
                    structStrVert = structStrVert.concat(structDefinition);

                this._structNames.push(this._uniforms[i]._structName);
                this._injectedStringsFrag[this._uniforms[i]._structName] = [];
                this._injectedStringsVert[this._uniforms[i]._structName] = [];
            }

            // * create member & comment
            let comment = "";
            if (this._uniforms[i].comment) comment = " // " + this._uniforms[i].comment;

            let stringToInsert = "";
            if (this._uniforms[i].getGlslTypeString() == undefined)stringToInsert += "//";
            stringToInsert += "  " + this._uniforms[i].getGlslTypeString()
                    + " " + this._uniforms[i]._propertyName + ";"
                    + comment;

            if (this._uniforms[i].getShaderType() === "both")
            {
                // * inject member before {injectionString}
                if (
                    !this._injectedStringsFrag[this._uniforms[i]._structName].contains(stringToInsert)
                && !this._injectedStringsVert[this._uniforms[i]._structName].contains(stringToInsert))
                {
                    const insertionIndexFrag = structStrFrag.lastIndexOf(injectionString);
                    const insertionIndexVert = structStrVert.lastIndexOf(injectionString);

                    structStrFrag =
                        structStrFrag.slice(0, insertionIndexFrag)
                        + stringToInsert + structStrFrag.slice(insertionIndexFrag - 1);

                    structStrVert =
                        structStrVert.slice(0, insertionIndexVert)
                        + stringToInsert + structStrVert.slice(insertionIndexVert - 1);

                    this._injectedStringsFrag[this._uniforms[i]._structName].push(stringToInsert);
                    this._injectedStringsVert[this._uniforms[i]._structName].push(stringToInsert);
                }

                if (!this._structUniformNamesIndicesFrag.includes(i)) this._structUniformNamesIndicesFrag.push(i);
                if (!this._structUniformNamesIndicesVert.includes(i)) this._structUniformNamesIndicesVert.push(i);
            }
            else if (this._uniforms[i].getShaderType() === "frag")
            {
                // * inject member before {injectionString}
                if (!this._injectedStringsFrag[this._uniforms[i]._structName].includes(stringToInsert)) //
                {
                    const insertionIndexFrag = structStrFrag.lastIndexOf(injectionString);

                    structStrFrag =
                        structStrFrag.slice(0, insertionIndexFrag)
                        + stringToInsert + structStrFrag.slice(insertionIndexFrag - 1);

                    this._injectedStringsFrag[this._uniforms[i]._structName].push(stringToInsert);
                }

                if (!this._structUniformNamesIndicesFrag.includes(i)) this._structUniformNamesIndicesFrag.push(i);
            }
            else if (this._uniforms[i].getShaderType() === "vert")
            {
                // * inject member before {injectionString}
                if (!this._injectedStringsVert[this._uniforms[i]._structName].includes(stringToInsert))
                {
                    const insertionIndexVert = structStrVert.lastIndexOf(injectionString);

                    structStrVert =
                        structStrVert.slice(0, insertionIndexVert)
                        + stringToInsert + structStrVert.slice(insertionIndexVert - 1);

                    this._injectedStringsVert[this._uniforms[i]._structName].push(stringToInsert);
                }

                if (!this._structUniformNamesIndicesVert.includes(i)) this._structUniformNamesIndicesVert.push(i);
            }
        }
    }

    // * dedupe injected uni declarations
    this._uniDeclarationsFrag = [];
    this._uniDeclarationsVert = [];

    // * remove struct injection points and add uniform in fragment
    for (let i = 0; i < this._structUniformNamesIndicesFrag.length; i += 1)
    {
        const index = this._structUniformNamesIndicesFrag[i];
        const uniDeclarationString = "UNI " + this._uniforms[index]._structName + " " + this._uniforms[index]._structUniformName + ";".endl();

        if (!this._uniDeclarationsFrag.includes(uniDeclarationString))
        {
            const injectionString = "{{INJECTION_POINT_STRUCT_" + this._uniforms[index]._structName + "}}";

            structStrFrag = structStrFrag.replace(injectionString, "");
            structStrFrag += uniDeclarationString;

            this._uniDeclarationsFrag.push(uniDeclarationString);
        }
    }

    // * remove struct injection points and add uniform in vertex
    for (let i = 0; i < this._structUniformNamesIndicesVert.length; i += 1)
    {
        const index = this._structUniformNamesIndicesVert[i];
        const uniDeclarationString = "UNI " + this._uniforms[index]._structName + " " + this._uniforms[index]._structUniformName + ";".endl();

        if (!this._uniDeclarationsVert.includes(uniDeclarationString))
        {
            const injectionString = "{{INJECTION_POINT_STRUCT_" + this._uniforms[index]._structName + "}}";

            structStrVert = structStrVert.replace(injectionString, "");
            structStrVert += uniDeclarationString;
            this._uniDeclarationsVert.push(uniDeclarationString);
        }
    }

    return [structStrVert, structStrFrag];
};

Shader.prototype._getAttrSrc = function (attr, firstLevel)
{
    const r = {};
    if (attr.name && attr.type)
    {
        r.srcHeadVert = "";
        if (!firstLevel) r.srcHeadVert += "#ifndef ATTRIB_" + attr.name.endl();
        r.srcHeadVert += "#define ATTRIB_" + attr.name.endl();
        r.srcHeadVert += "IN " + attr.type + " " + attr.name + ";".endl();
        if (!firstLevel) r.srcHeadVert += "#endif".endl();

        if (attr.nameFrag)
        {
            r.srcHeadVert += "";
            if (!firstLevel) r.srcHeadVert += "#ifndef ATTRIB_" + attr.nameFrag.endl();
            r.srcHeadVert += "#define ATTRIB_" + attr.nameFrag.endl();
            r.srcHeadVert += "OUT " + attr.type + " " + attr.nameFrag + ";".endl();
            if (!firstLevel) r.srcHeadVert += "#endif".endl();

            r.srcVert = "".endl() + attr.nameFrag + "=" + attr.name + ";";

            r.srcHeadFrag = "";
            if (!firstLevel) r.srcHeadFrag += "#ifndef ATTRIB_" + attr.nameFrag.endl();
            r.srcHeadFrag += "#define ATTRIB_" + attr.nameFrag.endl();
            r.srcHeadFrag += "IN " + attr.type + " " + attr.nameFrag + ";".endl();
            if (!firstLevel) r.srcHeadFrag += "#endif".endl();
        }
    }
    return r;
};

Shader.prototype.compile = function ()
{
    if (this._cgl.aborted) return;
    const startTime = performance.now();



    this._cgl.profileData.profileShaderCompiles++;
    this._cgl.profileData.profileShaderCompileName = this._name + " [" + this._compileReason + "]";

    let extensionString = "";
    if (this._extensions)
        for (let i = 0; i < this._extensions.length; i++)
            extensionString += "#extension " + this._extensions[i] + " : enable".endl();

    let definesStr = "";
    if (this._defines.length) definesStr = "\n// cgl generated".endl();
    for (let i = 0; i < this._defines.length; i++)
        definesStr += "#define " + this._defines[i][0] + " " + this._defines[i][1] + "".endl();

    const structStrings = this.createStructUniforms();
    this._cgl.profileData.addHeavyEvent("shader compile", this._name + " [" + this._compileReason + "]");
    this._compileReason = "";



    if (this._uniforms)
    {
        // * we create an array of the uniform names to check our indices & an array to save them
        const uniNames = this._uniforms.map((uni) => { return uni._name; });
        const indicesToRemove = [];

        // * we go through our uniforms and check if the same name is contained somewhere further in the array
        // * if so, we add the current index to be removed later
        for (let i = 0; i < this._uniforms.length; i++)
        {
            const uni = this._uniforms[i];
            const nextIndex = uniNames.indexOf(uni._name, i + 1);
            if (nextIndex > -1) indicesToRemove.push(i);
        }

        // * after that, we go through the uniforms backwards (so we keep the order) and remove the indices
        // * also, we reset the locations of all the other valid uniforms
        for (let j = this._uniforms.length - 1; j >= 0; j -= 1)
        {
            if (indicesToRemove.includes(j)) this._uniforms.splice(j, 1);
            else this._uniforms[j].resetLoc();
        }
    }

    this._cgl.printError("uniform resets");

    if (this.hasTextureUniforms()) definesStr += "#define HAS_TEXTURES".endl();

    let vs = "";
    let fs = "";

    if (!this.srcFrag)
    {
        this._log.error("[cgl shader] has no fragment source!", this);
        this.srcVert = this.getDefaultVertexShader();
        this.srcFrag = this.getDefaultFragmentShader();
        // return;
    }

    if (this.glslVersion == 300)
    {
        vs = "#version 300 es"
            .endl() + "// "
            .endl() + "// vertex shader " + this._name
            .endl() + "// "
            .endl() + "precision " + this.precision + " float;"
            .endl() + "precision " + this.precision + " sampler2D;"
            .endl() + ""
            .endl() + "#define WEBGL2"
            .endl() + "#define texture2D texture"
            .endl() + "#define UNI uniform"
            .endl() + "#define IN in"
            .endl() + "#define OUT out"
            .endl();

        fs = "#version 300 es"
            .endl() + "// "
            .endl() + "// fragment shader " + this._name
            .endl() + "// "
            .endl() + "precision " + this.precision + " float;"
            .endl() + "precision " + this.precision + " sampler2D;"
            .endl() + ""
            .endl() + "#define WEBGL2"
            .endl() + "#define texture2D texture"
            .endl() + "#define IN in"
            .endl() + "#define OUT out"
            .endl() + "#define UNI uniform"
            .endl() + "{{DRAWBUFFER}}"

            .endl();
    }
    else
    {
        fs = ""
            .endl() + "// "
            .endl() + "// fragment shader " + this._name
            .endl() + "// "
            .endl() + "#define WEBGL1"
            .endl() + "#define texture texture2D"
            .endl() + "#define outColor gl_FragColor"
            .endl() + "#define IN varying"
            .endl() + "#define UNI uniform"
            .endl();

        vs = ""
            .endl() + "// "
            .endl() + "// vertex shader " + this._name
            .endl() + "// "
            .endl() + "#define WEBGL1"
            .endl() + "#define texture texture2D"
            .endl() + "#define OUT varying"
            .endl() + "#define IN attribute"
            .endl() + "#define UNI uniform"
            .endl();
    }

    let uniformsStrVert = "\n// cgl generated".endl();
    let uniformsStrFrag = "\n// cgl generated".endl();


    fs += "\n// active mods: --------------- ";
    vs += "\n// active mods: --------------- ";

    let foundModsFrag = false;
    let foundModsVert = false;
    for (let i = 0; i < this._moduleNames.length; i++)
    {
        for (let j = 0; j < this._modules.length; j++)
        {
            if (this._modules[j].name == this._moduleNames[i])
            {
                if (this._modules[j].srcBodyFrag || this._modules[j].srcHeadFrag)
                {
                    foundModsFrag = true;
                    fs += "\n// " + i + "." + j + ". " + this._modules[j].title + " (" + this._modules[j].name + ")";
                }
                if (this._modules[j].srcBodyVert || this._modules[j].srcHeadVert)
                {
                    vs += "\n// " + i + "." + j + ". " + this._modules[j].title + " (" + this._modules[j].name + ")";
                    foundModsVert = true;
                }
            }
        }
    }
    if (!foundModsVert)fs += "\n// no mods used...";
    if (!foundModsFrag)fs += "\n// no mods used...";
    fs += "\n";
    vs += "\n";

    for (let i = 0; i < this._uniforms.length; i++)
    {
        if (this._uniforms[i].shaderType && !this._uniforms[i].isStructMember())
        {
            let uniStr = "";
            if (!this._uniforms[i].getGlslTypeString())uniStr += "// ";
            uniStr += "UNI " + this._uniforms[i].getGlslTypeString() + " " + this._uniforms[i].getName();
            let comment = "";
            if (this._uniforms[i].comment) comment = " // " + this._uniforms[i].comment;

            if (this._uniforms[i].shaderType == "vert" || this._uniforms[i].shaderType == "both")
                if (!this.srcVert.contains(uniStr) && !this.srcVert.contains("uniform " + this._uniforms[i].getGlslTypeString() + " " + this._uniforms[i].getName()))
                    uniformsStrVert += uniStr + ";" + comment.endl();

            if (this._uniforms[i].shaderType == "frag" || this._uniforms[i].shaderType == "both")
                if (!this.srcFrag.contains(uniStr) && !this.srcFrag.contains("uniform " + this._uniforms[i].getGlslTypeString() + " " + this._uniforms[i].getName()))
                    uniformsStrFrag += uniStr + ";" + comment.endl();
        }
    }


    let countUniFrag = 0;
    let countUniVert = 0;
    for (let i = 0; i < this._uniforms.length; i++)
    {
        if (this._uniforms[i].shaderType && !this._uniforms[i].isStructMember())
        {
            if (this._uniforms[i].shaderType == "vert" || this._uniforms[i].shaderType == "both") countUniVert++;
            if (this._uniforms[i].shaderType == "frag" || this._uniforms[i].shaderType == "both") countUniFrag++;
        }
    }
    if (countUniFrag >= this._cgl.maxUniformsFrag) this._log.warn("[cgl_shader] num uniforms frag: " + countUniFrag + " / " + this._cgl.maxUniformsFrag);
    if (countUniVert >= this._cgl.maxUniformsVert) this._log.warn("[cgl_shader] num uniforms vert: " + countUniVert + " / " + this._cgl.maxUniformsVert);


    if (!fs.contains("precision")) fs = "precision " + this.precision + " float;".endl() + fs;
    if (!vs.contains("precision")) vs = "precision " + this.precision + " float;".endl() + vs;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        fs += "#define MOBILE".endl();
        vs += "#define MOBILE".endl();
    }
    vs = extensionString + vs + definesStr + structStrings[0] + uniformsStrVert + "\n// -- \n" + this.srcVert;
    fs = extensionString + fs + definesStr + structStrings[1] + uniformsStrFrag + "\n// -- \n" + this.srcFrag;


    let srcHeadVert = "";
    let srcHeadFrag = "";

    this._modules.sort(function (a, b)
    {
        return a.group - b.group;
    });

    this._modules.sort(function (a, b)
    {
        return a.priority || 0 - b.priority || 0;
    });


    let addedAttribs = false;

    for (let i = 0; i < this._moduleNames.length; i++)
    {
        let srcVert = "";
        let srcFrag = "";

        if (!addedAttribs)
        {
            addedAttribs = true;

            for (let k = 0; k < this._attributes.length; k++)
            {
                const r = this._getAttrSrc(this._attributes[k], true);
                if (r.srcHeadVert)srcHeadVert += r.srcHeadVert;
                if (r.srcVert)srcVert += r.srcVert;
                if (r.srcHeadFrag)srcHeadFrag += r.srcHeadFrag;
            }
        }

        for (let j = 0; j < this._modules.length; j++)
        {
            const mod = this._modules[j];
            if (mod.name == this._moduleNames[i])
            {
                srcHeadVert += "\n//---- MOD: group:" + mod.group + ": idx:" + j + " - prfx:" + mod.prefix + " - " + mod.title + " ------\n";
                srcHeadFrag += "\n//---- MOD: group:" + mod.group + ": idx:" + j + " - prfx:" + mod.prefix + " - " + mod.title + " ------\n";

                srcVert += "\n\n//---- MOD: " + mod.title + " / " + mod.priority + " ------\n";
                srcFrag += "\n\n//---- MOD: " + mod.title + " / " + mod.priority + " ------\n";

                if (mod.attributes)
                    for (let k = 0; k < mod.attributes.length; k++)
                    {
                        const r = this._getAttrSrc(mod.attributes[k], false);
                        if (r.srcHeadVert)srcHeadVert += r.srcHeadVert;
                        if (r.srcVert)srcVert += r.srcVert;
                        if (r.srcHeadFrag)srcHeadFrag += r.srcHeadFrag;
                    }

                srcHeadVert += mod.srcHeadVert || "";
                srcHeadFrag += mod.srcHeadFrag || "";
                srcVert += mod.srcBodyVert || "";
                srcFrag += mod.srcBodyFrag || "";

                srcHeadVert += "\n//---- end mod ------\n";
                srcHeadFrag += "\n//---- end mod ------\n";

                srcVert += "\n//---- end mod ------\n";
                srcFrag += "\n//---- end mod ------\n";

                srcVert = srcVert.replace(/{{mod}}/g, mod.prefix);
                srcFrag = srcFrag.replace(/{{mod}}/g, mod.prefix);
                srcHeadVert = srcHeadVert.replace(/{{mod}}/g, mod.prefix);
                srcHeadFrag = srcHeadFrag.replace(/{{mod}}/g, mod.prefix);

                srcVert = srcVert.replace(/MOD_/g, mod.prefix);
                srcFrag = srcFrag.replace(/MOD_/g, mod.prefix);
                srcHeadVert = srcHeadVert.replace(/MOD_/g, mod.prefix);
                srcHeadFrag = srcHeadFrag.replace(/MOD_/g, mod.prefix);
            }
        }


        vs = vs.replace("{{" + this._moduleNames[i] + "}}", srcVert);
        fs = fs.replace("{{" + this._moduleNames[i] + "}}", srcFrag);
    }
    vs = vs.replace("{{MODULES_HEAD}}", srcHeadVert);
    fs = fs.replace("{{MODULES_HEAD}}", srcHeadFrag);


    vs = this._addLibs(vs);
    fs = this._addLibs(fs);


    // SETUP draw buffers / multi texture render targets

    let drawBufferStr = "";
    for (let i = 0; i < 16; i++)
        if (fs.contains("outColor" + i)) this._drawBuffers[i] = true;

    if (this._drawBuffers.length == 1)
    {
        drawBufferStr = "out vec4 outColor;".endl();
        drawBufferStr += "#define gl_FragColor outColor".endl();
    }
    else
    {
        drawBufferStr += "#define MULTI_COLORTARGETS".endl();
        drawBufferStr += "vec4 outColor;".endl();

        let count = 0;
        for (let i = 0; i < this._drawBuffers.length; i++)
        {
            if (count == 0) drawBufferStr += "#define gl_FragColor outColor" + i + "".endl();
            drawBufferStr += "layout(location = " + i + ") out vec4 outColor" + i + ";".endl();
            count++;
        }
    }

    fs = fs.replace("{{DRAWBUFFER}}", drawBufferStr);
    // //////


    if (!this._program)
    {
        this._program = this._createProgram(vs, fs);
    }
    else
    {
        // this.vshader=createShader(vs, gl.VERTEX_SHADER, this.vshader );
        // this.fshader=createShader(fs, gl.FRAGMENT_SHADER, this.fshader );
        // linkProgram(program);
        this._program = this._createProgram(vs, fs);

        this._projMatrixUniform = null;

        for (let i = 0; i < this._uniforms.length; i++) this._uniforms[i].resetLoc();
    }

    this.finalShaderFrag = fs;
    this.finalShaderVert = vs;


    _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_3__.MESH.lastMesh = null;
    _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_3__.MESH.lastShader = null;

    this._countMissingUniforms = 0;
    this._needsRecompile = false;
    this.lastCompile = (0,_timer_js__WEBPACK_IMPORTED_MODULE_4__.now)();

    // this._cgl.printError("shader compile");

    this._cgl.profileData.shaderCompileTime += performance.now() - startTime;
};

Shader.hasChanged = function ()
{
    return this._needsRecompile;
};


Shader.prototype.bind = function ()
{
    if (!this._isValid || this._cgl.aborted) return;

    _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_3__.MESH.lastShader = this;

    if (!this._program || this._needsRecompile) this.compile();
    if (!this._isValid) return;

    if (!this._projMatrixUniform && !this.ignoreMissingUniforms)
    {
        this._countMissingUniforms++;
        // if (this._countMissingUniforms == 10)console.log("stopping getlocation of missing uniforms...", this._name);
        if (this._countMissingUniforms < 10)
        {
            this._projMatrixUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_PROJMAT);
            this._attrVertexPos = this._cgl.glGetAttribLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_VERTEX_POSITION);
            this._mvMatrixUniform = this._cgl.gl.getUniformLocation(this._program, "mvMatrix");
            this._vMatrixUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_VIEWMAT);
            this._mMatrixUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_MODELMAT);
            this._camPosUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_VIEWPOS);
            this._normalMatrixUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_NORMALMAT);
            this._inverseViewMatrixUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_INVVIEWMAT);
            this._inverseProjMatrixUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_INVPROJMAT);
            this._materialIdUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_MATERIALID);
            this._objectIdUniform = this._cgl.gl.getUniformLocation(this._program, _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.SHADER.SHADERVAR_UNI_OBJECTID);

            for (let i = 0; i < this._uniforms.length; i++) this._uniforms[i].needsUpdate = true;
        }
    }


    if (this._cgl.currentProgram != this._program)
    {
        this._cgl.profileData.profileShaderBinds++;
        this._cgl.gl.useProgram(this._program);
        this._cgl.currentProgram = this._program;
    }

    for (let i = 0; i < this._uniforms.length; i++)
        if (this._uniforms[i].needsUpdate) this._uniforms[i].updateValue();

    if (this._pMatrixState != this._cgl.getProjectionMatrixStateCount())
    {
        this._pMatrixState = this._cgl.getProjectionMatrixStateCount();
        this._cgl.gl.uniformMatrix4fv(this._projMatrixUniform, false, this._cgl.pMatrix);
        this._cgl.profileData.profileMVPMatrixCount++;
    }

    if (this._objectIdUniform)
        this._cgl.gl.uniform1f(this._objectIdUniform, ++this._cgl.frameStore.objectIdCounter);

    if (this._materialIdUniform)
        this._cgl.gl.uniform1f(this._materialIdUniform, this._materialId);

    if (this._vMatrixUniform)
    {
        if (this._vMatrixState != this._cgl.getViewMatrixStateCount())
        {
            this._cgl.gl.uniformMatrix4fv(this._vMatrixUniform, false, this._cgl.vMatrix);
            this._cgl.profileData.profileMVPMatrixCount++;
            this._vMatrixState = this._cgl.getViewMatrixStateCount();

            if (this._inverseViewMatrixUniform)
            {
                mat4.invert(this._tempInverseViewMatrix, this._cgl.vMatrix);
                this._cgl.gl.uniformMatrix4fv(this._inverseViewMatrixUniform, false, this._tempInverseViewMatrix);
                this._cgl.profileData.profileMVPMatrixCount++;
            }
            if (this._inverseProjMatrixUniform)
            {
                mat4.invert(this._tempInverseProjMatrix, this._cgl.pMatrix);
                this._cgl.gl.uniformMatrix4fv(this._inverseProjMatrixUniform, false, this._tempInverseProjMatrix);
                this._cgl.profileData.profileMVPMatrixCount++;
            }
        }
        this._cgl.gl.uniformMatrix4fv(this._mMatrixUniform, false, this._cgl.mMatrix);
        this._cgl.profileData.profileMVPMatrixCount++;

        if (this._camPosUniform)
        {
            mat4.invert(this._tempCamPosMatrix, this._cgl.vMatrix);
            this._cgl.gl.uniform3f(this._camPosUniform, this._tempCamPosMatrix[12], this._tempCamPosMatrix[13], this._tempCamPosMatrix[14]);
            this._cgl.profileData.profileMVPMatrixCount++;
        }
    }
    else
    {
        // mvmatrix deprecated....
        const tempmv = mat4.create();

        mat4.mul(tempmv, this._cgl.vMatrix, this._cgl.mMatrix);
        this._cgl.gl.uniformMatrix4fv(this._mvMatrixUniform, false, tempmv);
        this._cgl.profileData.profileMVPMatrixCount++;
    }

    if (this._normalMatrixUniform)
    {
        // mat4.mul(this._tempNormalMatrix, this._cgl.vMatrix, this._cgl.mMatrix);
        mat4.invert(this._tempNormalMatrix, this._cgl.mMatrix);
        mat4.transpose(this._tempNormalMatrix, this._tempNormalMatrix);

        this._cgl.gl.uniformMatrix4fv(this._normalMatrixUniform, false, this._tempNormalMatrix);
        this._cgl.profileData.profileMVPMatrixCount++;
    }

    for (let i = 0; i < this._libs.length; i++)
    {
        if (this._libs[i].onBind) this._libs[i].onBind.bind(this._libs[i])(this._cgl, this);
    }

    this._bindTextures();

    return this._isValid;
};

Shader.prototype.unBind = function ()
{
};

/**
 * easily enable/disable a define without a value
 * @function toggleDefine
 * @memberof Shader
 * @instance
 * @param {name} name
 * @param {any} value or port
 */
Shader.prototype.toggleDefine = function (name, enabled)
{
    if (enabled && typeof (enabled) == "object" && enabled.addEventListener) // port
    {
        if (enabled.changeListener)enabled.removeEventListener(enabled.changeListener);

        enabled.onToggleDefine = (v) =>
        {
            this.toggleDefine(name, v);
        };

        enabled.changeListener = enabled.on("change", enabled.onToggleDefine);
        enabled = enabled.get();
    }

    if (enabled) this.define(name);
    else this.removeDefine(name);
};

/**
 * add a define to a shader, e.g.  #define DO_THIS_THAT 1
 * @function define
 * @memberof Shader
 * @instance
 * @param {String} name
 * @param {Any} value (can be empty)
 */
Shader.prototype.define = function (name, value)
{
    if (value === null || value === undefined) value = "";

    if (typeof (value) == "object") // port
    {
        value.removeEventListener("change", value.onDefineChange);
        value.onDefineChange = (v) =>
        {
            this.define(name, v);
        };
        value.on("change", value.onDefineChange);

        value = value.get();
    }


    for (let i = 0; i < this._defines.length; i++)
    {
        if (this._defines[i][0] == name && this._defines[i][1] == value) return;
        if (this._defines[i][0] == name)
        {
            this._defines[i][1] = value;
            this.setWhyCompile("define " + name + " " + value);

            this._needsRecompile = true;
            return;
        }
    }
    this.setWhyCompile("define " + name + " " + value);
    this._needsRecompile = true;
    this._defines.push([name, value]);
};

Shader.prototype.getDefines = function ()
{
    return this._defines;
};

Shader.prototype.getDefine = function (name)
{
    for (let i = 0; i < this._defines.length; i++)
        if (this._defines[i][0] == name) return this._defines[i][1];
    return null;
};

/**
 * return true if shader has define
 * @function hasDefine
 * @memberof Shader
 * @instance
 * @param {String} name
 * @return {Boolean}
 */
Shader.prototype.hasDefine = function (name)
{
    for (let i = 0; i < this._defines.length; i++)
        if (this._defines[i][0] == name) return true;
};

/**
 * remove a define from a shader
 * @param {name} name
 * @function removeDefine
 * @memberof Shader
 * @instance
 */
Shader.prototype.removeDefine = function (name)
{
    for (let i = 0; i < this._defines.length; i++)
    {
        if (this._defines[i][0] == name)
        {
            this._defines.splice(i, 1);
            this._needsRecompile = true;

            this.setWhyCompile("define removed:" + name);

            return;
        }
    }
};

/**
 * remove a module from shader
 * @function removeModule
 * @memberof Shader
 * @instance
 * @param {shaderModule} module the module to be removed
 */
Shader.prototype.removeModule = function (mod)
{
    for (let i = 0; i < this._modules.length; i++)
    {
        if (mod && mod.id)
        {
            if (this._modules[i].id == mod.id || !this._modules[i])
            {
                let found = true;
                while (found)
                {
                    found = false;
                    for (let j = 0; j < this._uniforms.length; j++)
                    {
                        if (this._uniforms[j].getName().startsWith(mod.prefix))
                        {
                            this._uniforms.splice(j, 1);
                            found = true;
                            continue;
                        }
                    }
                }

                this._needsRecompile = true;
                this.setWhyCompile("remove module " + mod.title);
                this._modules.splice(i, 1);
                break;
            }
        }
    }
};


Shader.prototype.getNumModules = function ()
{
    return this._modules.length;
};


Shader.prototype.getCurrentModules = function () { return this._modules; };


/**
 * add a module
 * @function addModule
 * @memberof Shader
 * @instance
 * @param {shaderModule} module the module to be added
 * @param {shaderModule} [sibling] sibling module, new module will share the same group
 */
Shader.prototype.addModule = function (mod, sibling)
{
    if (this.hasModule(mod.id)) return;
    if (!mod.id) mod.id = CABLES.simpleId();
    if (!mod.numId) mod.numId = this._moduleNumId;
    if (!mod.num)mod.num = this._modules.length;
    if (sibling && !sibling.group) sibling.group = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.simpleId)();

    if (!mod.group)
        if (sibling) mod.group = sibling.group;
        else mod.group = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.simpleId)();

    mod.prefix = "mod" + mod.group + "_";
    this._modules.push(mod);

    this._needsRecompile = true;
    this.setWhyCompile("add module " + mod.title);
    this._moduleNumId++;

    return mod;
};

Shader.prototype.hasModule = function (modId)
{
    for (let i = 0; i < this._modules.length; i++)
    {
        if (this._modules[i].id == modId) return true;
    }
    return false;
};

Shader.prototype.setModules = function (names)
{
    this._moduleNames = names;
};

Shader.prototype.dispose = function ()
{
    this._cgl.gl.deleteProgram(this._program);
};

Shader.prototype.needsRecompile = function ()
{
    return this._needsRecompile;
};

Shader.prototype.setDrawBuffers = function (arr)
{
    console.log("useless drawbuffers...?!");
    // if (this._drawBuffers.length !== arr.length)
    // {
    //     this._drawBuffers = arr;
    //     this._needsRecompile = true;
    //     this.setWhyCompile("setDrawBuffers");
    //     return;
    // }
    // for (let i = 0; i < arr.length; i++)
    // {
    //     if (arr[i] !== this._drawBuffers[i])
    //     {
    //         this._drawBuffers = arr;
    //         this._needsRecompile = true;
    //         this.setWhyCompile("setDrawBuffers");
    //         return;
    //     }
    // }
};

Shader.prototype.getUniforms = function ()
{
    return this._uniforms;
};

Shader.prototype.getUniform = function (name)
{
    for (let i = 0; i < this._uniforms.length; i++)
        if (this._uniforms[i].getName() == name)
            return this._uniforms[i];
    return null;
};

Shader.prototype.removeAllUniforms = function ()
{
    this._uniforms = [];
    // for (let i = 0; i < this._uniforms.length; i++)
    //     this.removeUniform(this._uniforms[i].name);
};

Shader.prototype.removeUniform = function (name)
{
    for (let i = 0; i < this._uniforms.length; i++)
    {
        if (this._uniforms[i].getName() == name)
        {
            this._uniforms.splice(i, 1);
        }
    }
    this._needsRecompile = true;
    this.setWhyCompile("remove uniform " + name);
};


Shader.prototype._addUniform = function (uni)
{
    this._uniforms.push(uni);
    this.setWhyCompile("add uniform " + name);
    this._needsRecompile = true;
};

/**
 * add a uniform to the fragment shader
 * @param {String} type ['f','t', etc]
 * @param {String} name
 * @param {any} value or port
 * @memberof Shader
 * @instance
 * @function addUniformFrag
 * @returns {CGL.Uniform}
 */
Shader.prototype.addUniformFrag = function (type, name, valueOrPort, p2, p3, p4)
{
    const uni = new CGL.Uniform(this, type, name, valueOrPort, p2, p3, p4);
    uni.shaderType = "frag";
    return uni;
};

/**
 * add a uniform to the vertex shader
 * @param {String} type ['f','t', etc]
 * @param {String} name
 * @param {any} value or port
 * @memberof Shader
 * @instance
 * @function addUniformVert
 * @returns {CGL.Uniform}
 */
Shader.prototype.addUniformVert = function (type, name, valueOrPort, p2, p3, p4)
{
    const uni = new CGL.Uniform(this, type, name, valueOrPort, p2, p3, p4);
    uni.shaderType = "vert";
    return uni;
};
/**
 * add a uniform to both shaders
 * @param {String} type ['f','t', etc]
 * @param {String} name
 * @param {any} value or port
 * @memberof Shader
 * @instance
 * @function addUniformBoth
 * @returns {CGL.Uniform}
 */
Shader.prototype.addUniformBoth = function (type, name, valueOrPort, p2, p3, p4)
{
    const uni = new CGL.Uniform(this, type, name, valueOrPort, p2, p3, p4);
    uni.shaderType = "both";
    return uni;
};

/**
 * add a struct & its uniforms to the fragment shader
 * @param {String} structName name of the struct, i.e.: LightStruct
 * @param {String} uniformName name of the struct uniform in the shader, i.e.: lightUni
 * @param {Array} members array of objects containing the struct members. see example for structure

 * @memberof Shader
 * @instance
 * @function addUniformStructFrag
 * @returns {Object}
 * @example
 * const shader = new CGL.Shader(cgl, 'MinimalMaterial');
 * shader.setSource(attachments.shader_vert, attachments.shader_frag);
 * shader.addUniformStructFrag("Light", "uniformLight", [
 * { "type": "3f", "name": "position", "v1": null },
 * { "type": "4f", "name": "color", "v1": inR, v2: inG, v3: inB, v4: inAlpha }
 * ]);
 */
Shader.prototype.addUniformStructFrag = function (structName, uniformName, members)
{
    const uniforms = {};

    if (!members) return uniforms;

    for (let i = 0; i < members.length; i += 1)
    {
        const member = members[i];
        if (!this.hasUniform(uniformName + "." + member.name))
        {
            const uni = new CGL.Uniform(this, member.type, uniformName + "." + member.name, member.v1, member.v2, member.v3, member.v4, uniformName, structName, member.name);
            uni.shaderType = "frag";
            uniforms[uniformName + "." + member.name] = uni;
        }
    }

    return uniforms;
};

/**
 * add a struct & its uniforms to the vertex shader
 * @param {String} structName name of the struct, i.e.: LightStruct
 * @param {String} uniformName name of the struct uniform in the shader, i.e.: lightUni
 * @param {Array} members array of objects containing the struct members. see example for structure

 * @memberof Shader
 * @instance
 * @function addUniformStructVert
 * @returns {CGL.Uniform}
 * @example
 * const shader = new CGL.Shader(cgl, 'MinimalMaterial');
 * shader.setSource(attachments.shader_vert, attachments.shader_frag);
 * shader.addUniformStructVert("Light", "uniformLight", [
 * { "type": "3f", "name": "position", "v1": null },
 * { "type": "4f", "name": "color", "v1": inR, v2: inG, v3: inB, v4: inAlpha }
 * ]);
 */
Shader.prototype.addUniformStructVert = function (structName, uniformName, members)
{
    const uniforms = {};

    if (!members) return uniforms;

    for (let i = 0; i < members.length; i += 1)
    {
        const member = members[i];
        if (!this.hasUniform(uniformName + "." + member.name))
        {
            const uni = new CGL.Uniform(this, member.type, uniformName + "." + member.name, member.v1, member.v2, member.v3, member.v4, uniformName, structName, member.name);
            uni.shaderType = "vert";
            uniforms[uniformName + "." + member.name] = uni;
        }
    }

    return uniforms;
};

/**
 * add a struct & its uniforms to the both shaders. PLEASE NOTE: it is not possible to add the same struct to both shaders when it contains ANY integer members.
 * @param {String} structName name of the struct, i.e.: LightStruct
 * @param {String} uniformName name of the struct uniform in the shader, i.e.: lightUni
 * @param {Array} members array of objects containing the struct members. see example for structure

 * @memberof Shader
 * @instance
 * @function addUniformStructBoth
 * @returns {Object}
 * @example
 * const shader = new CGL.Shader(cgl, 'MinimalMaterial');
 * shader.setSource(attachments.shader_vert, attachments.shader_frag);
 * shader.addUniformStructBoth("Light", "uniformLight", [
 * { "type": "3f", "name": "position", "v1": null },
 * { "type": "4f", "name": "color", "v1": inR, v2: inG, v3: inB, v4: inAlpha }
 * ]);
 */
Shader.prototype.addUniformStructBoth = function (structName, uniformName, members)
{
    const uniforms = {};

    if (!members) return uniforms;

    for (let i = 0; i < members.length; i += 1)
    {
        const member = members[i];
        if ((member.type === "2i" || member.type === "i" || member.type === "3i"))
            this._log.error("Adding an integer struct member to both shaders can potentially error. Please use different structs for each shader. Error occured in struct:", structName, " with member:", member.name, " of type:", member.type, ".");
        if (!this.hasUniform(uniformName + "." + member.name))
        {
            const uni = new CGL.Uniform(this, member.type, uniformName + "." + member.name, member.v1, member.v2, member.v3, member.v4, uniformName, structName, member.name);
            uni.shaderType = "both";
            uniforms[uniformName + "." + member.name] = uni;
        }
    }

    return uniforms;
};

Shader.prototype.hasUniform = function (name)
{
    for (let i = 0; i < this._uniforms.length; i++)
    {
        if (this._uniforms[i].getName() == name) return true;
    }
    return false;
};

Shader.prototype._createProgram = function (vstr, fstr)
{
    this._cgl.printError("before _createprogram");

    const program = this._cgl.gl.createProgram();

    this.vshader = Shader.createShader(this._cgl, vstr, this._cgl.gl.VERTEX_SHADER, this);
    this.fshader = Shader.createShader(this._cgl, fstr, this._cgl.gl.FRAGMENT_SHADER, this);


    if (this.vshader && this.fshader)
    {
        this._cgl.gl.attachShader(program, this.vshader);
        this._cgl.gl.attachShader(program, this.fshader);

        this._linkProgram(program, vstr, fstr);
    }
    else
    {
        this._isValid = false;
        this._cgl.printError("shader _createProgram");
        console.log("could not link shaderprogram");
        return null;
    }

    this._cgl.printError("shader _createProgram");
    return program;
};

Shader.prototype.hasErrors = function ()
{
    return this._hasErrors;
};

Shader.prototype._linkProgram = function (program, vstr, fstr)
{
    this._cgl.printError("before _linkprogram");

    if (this._feedBackNames.length > 0)
    {
        this._cgl.gl.transformFeedbackVaryings(program, this._feedBackNames, this._cgl.gl.SEPARATE_ATTRIBS);
        // INTERLEAVED_ATTRIBS
        // SEPARATE_ATTRIBS
    }

    this._cgl.gl.linkProgram(program);
    this._cgl.printError("gl.linkprogram");
    this._isValid = true;

    this._hasErrors = false;

    if (this._cgl.patch.config.glValidateShader !== false)
    {
        this._cgl.gl.validateProgram(program);

        if (!this._cgl.gl.getProgramParameter(program, this._cgl.gl.VALIDATE_STATUS))
        {
            // validation failed
            console.log("shaderprogram validation failed...");
            console.log(this._name + " programinfo: ", this._cgl.gl.getProgramInfoLog(program));
        }

        if (!this._cgl.gl.getProgramParameter(program, this._cgl.gl.LINK_STATUS))
        {
            this._hasErrors = true;
            this._log.warn(this._cgl.gl.getShaderInfoLog(this.fshader) || "empty shader infolog");
            this._log.warn(this._cgl.gl.getShaderInfoLog(this.vshader) || "empty shader infolog");
            this._log.error(this._name + " shader linking fail...");

            console.log(this._name + " programinfo: ", this._cgl.gl.getProgramInfoLog(program));

            console.log("--------------------------------------");
            console.log(this);
            console.log("--------------------------------------");
            this._isValid = false;

            this._name = "errorshader";
            this.setSource(Shader.getDefaultVertexShader(), Shader.getErrorFragmentShader());
            this._cgl.printError("shader link err");
        }
    }
};

Shader.prototype.getProgram = function ()
{
    return this._program;
};

Shader.prototype.setFeedbackNames = function (names)
{
    this.setWhyCompile("setFeedbackNames");
    this._needsRecompile = true;
    this._feedBackNames = names;
};

Shader.prototype.getDefaultVertexShader = Shader.getDefaultVertexShader = function ()
{
    return _cgl_shader_default_glsl_vert__WEBPACK_IMPORTED_MODULE_6__["default"];
};

Shader.prototype.getDefaultFragmentShader = Shader.getDefaultFragmentShader = function (r, g, b)
{
    if (r == undefined)
    {
        r = 0.5;
        g = 0.5;
        b = 0.5;
    }
    return ""
        .endl() + "IN vec2 texCoord;"
        .endl() + "{{MODULES_HEAD}}"
        .endl() + "void main()"
        .endl() + "{"
        .endl() + "    vec4 col=vec4(" + r + "," + g + "," + b + ",1.0);"
        .endl() + "    {{MODULE_COLOR}}"
        .endl() + "    outColor = col;"
        .endl() + "}";
};

/**
  * adds attribute definition to shader header without colliding with other shader modules...
 * when attrFrag is defined, vertex shader will output this attribute to the fragment shader
 * @function
 * @memberof Shader
 * @instance
 * @param {Object} attribObject {type:x,name:x,[nameFrag:x]}
 * @return {Object}
 */
Shader.prototype.addAttribute = function (attr)
{
    for (let i = 0; i < this._attributes.length; i++)
    {
        if (this._attributes[i].name == attr.name && this._attributes[i].nameFrag == attr.nameFrag) return;
    }
    this._attributes.push(attr);
    this._needsRecompile = true;
    this.setWhyCompile("addAttribute");
};

Shader.prototype.bindTextures =
Shader.prototype._bindTextures = function ()
{
    if (this._textureStackTex.length > this._cgl.maxTextureUnits)
    {
        this._log.warn("[shader._bindTextures] too many textures bound", this._textureStackTex.length + "/" + this._cgl.maxTextureUnits);
    }

    // for (let i = this._textureStackTex.length + 1; i < this._cgl.maxTextureUnits; i++) this._cgl.setTexture(i, null);

    for (let i = 0; i < this._textureStackTex.length; i++)
    {
        // console.log(this._textureStackTex.length, i);
        if (!this._textureStackTex[i] && !this._textureStackTexCgl[i])
        {
            this._log.warn("no texture for pushtexture", this._name);
        }
        else
        {
            let t = this._textureStackTex[i];
            if (this._textureStackTexCgl[i])
            {
                t = this._textureStackTexCgl[i].tex || CGL.Texture.getEmptyTexture(this._cgl).tex;
            }

            let bindOk = true;

            if (!this._textureStackUni[i])
            {
                // throw(new Error('no uniform given to texturestack'));
                this._log.warn("no uniform for pushtexture", this._name);
                bindOk = this._cgl.setTexture(i, t, this._textureStackType[i]);
            }
            else
            {
                this._textureStackUni[i].setValue(i);
                bindOk = this._cgl.setTexture(i, t, this._textureStackType[i]);

                // console.log(bindOk, i, t, this._textureStackType[i]);
            }
            if (!bindOk) console.warn("tex bind failed", this.getName(), this._textureStackUni[i]);
        }
    }
};

Shader.prototype.setUniformTexture = function (uni, tex)
{
    tex = tex || CGL.Texture.getTempTexture(this._cgl);
    for (let i = 0; i < this._textureStackUni.length; i++)
        if (this._textureStackUni[i] == uni)
        {
            const old = this._textureStackTex[i] || this._textureStackTexCgl[i];
            if (tex.hasOwnProperty("tex"))
            {
                this._textureStackTexCgl[i] = tex;
                this._textureStackTex[i] = null;
            }
            else
            {
                this._textureStackTexCgl[i] = null;
                this._textureStackTex[i] = tex;
            }

            // this._textureStackTex[i] = tex;
            // this._cgl.setTexture(i, tex, this._textureStackType[i]);
            return old;
        }
    return null;
};

/**
 * push a texture on the stack. those textures will be bound when binding the shader. texture slots are automatically set
 * @param {uniform} texture uniform
 * @param {texture} texture
 * @param {type} texture type, can be ignored when TEXTURE_2D
 * @function pushTexture
 * @memberof Shader
 * @instance
 */
Shader.prototype.pushTexture = function (uniform, t, type)
{
    if (!uniform)
    {
        console.log("no uniform given to texturestack", uniform);
        return;
    }
    if (!t)
    {
        return;
    }
    if (!t.hasOwnProperty("tex") && !(t instanceof WebGLTexture))
    {
        this._log.warn(new Error("invalid texture").stack);

        this._log.warn("[cgl_shader] invalid texture...", t);
        return;
    }

    this._textureStackUni.push(uniform);

    if (t.hasOwnProperty("tex"))
    {
        this._textureStackTexCgl.push(t);
        this._textureStackTex.push(null);
    }
    else
    {
        this._textureStackTexCgl.push(null);
        this._textureStackTex.push(t);
    }

    this._textureStackType.push(type);
};

/**
 * pop last texture
 * @function popTexture
 * @memberof Shader
 * @instance
 */
Shader.prototype.popTexture = function ()
{
    this._textureStackUni.pop();
    this._textureStackTex.pop();
    this._textureStackTexCgl.pop();
    this._textureStackType.pop();
};

/**
 * pop all textures
 * @function popTextures
 * @memberof Shader
 * @instance
 */
Shader.prototype.popTextures = function ()
{
    this._textureStackTex.length =
    this._textureStackTexCgl.length =
    this._textureStackType.length =
    this._textureStackUni.length = 0;
};

Shader.prototype.getMaterialId = function ()
{
    return this._materialId;
};

Shader.prototype.getInfo = function ()
{
    const info = {};
    info.name = this._name;
    // info.modules = JSON.parse(JSON.stringify(this._modules));
    // info.defines = JSON.parse(JSON.stringify(this._defines));
    info.defines = this.getDefines();
    info.hasErrors = this.hasErrors();

    return info;
};

// --------------------------

Shader.getErrorFragmentShader = function ()
{
    return ""
        .endl() + "void main()"
        .endl() + "{"
        .endl() + "   float g=mod((gl_FragCoord.y+gl_FragCoord.x),50.0)/50.0;"
        .endl() + "   g= step(0.1,g);"
        .endl() + "   outColor = vec4( g+0.5, 0.0, 0.0, 1.0);"
        .endl() + "}";
};

Shader.createShader = function (cgl, str, type, cglShader)
{
    if (cgl.aborted) return;

    // cgl.printError("[Shader.createShader] ", cglShader._name);

    function getBadLines(infoLog)
    {
        const basLines = [];
        const lines = infoLog.split("\n");
        for (const i in lines)
        {
            const divide = lines[i].split(":");
            if (parseInt(divide[2], 10)) basLines.push(parseInt(divide[2], 10));
        }
        return basLines;
    }


    const shader = cgl.gl.createShader(type);
    cgl.gl.shaderSource(shader, str);
    cgl.gl.compileShader(shader);

    if (!cgl.gl.getShaderParameter(shader, cgl.gl.COMPILE_STATUS))
    {
        let infoLog = cgl.gl.getShaderInfoLog(shader);
        if (!infoLog)
        {
            console.warn("empty shader info log", this._name);
            return;
        }

        console.log("compile status: ");

        const badLines = getBadLines(infoLog);
        let htmlWarning = "<pre style=\"margin-bottom:0px;\"><code class=\"shaderErrorCode language-glsl\" style=\"padding-bottom:0px;max-height: initial;max-width: initial;\">";
        const lines = str.match(/^.*((\r\n|\n|\r)|$)/gm);

        if (!cgl.aborted && infoLog)
        {
            if (type == cgl.gl.VERTEX_SHADER) console.log("VERTEX_SHADER");
            if (type == cgl.gl.FRAGMENT_SHADER) console.log("FRAGMENT_SHADER");

            for (const i in lines)
            {
                const j = parseInt(i, 10) + 1;
                const line = j + ": " + lines[i];
                console.log(line);

                let isBadLine = false;
                for (const bj in badLines)
                    if (badLines[bj] == j) isBadLine = true;

                if (isBadLine)
                {
                    htmlWarning += "</code></pre>";
                    // htmlWarning += "<span class=\"shaderErrorCode error\">";
                    htmlWarning += "<pre style=\"margin:0\"><code class=\"language-glsl\" style=\"background-color:#660000;padding-top:0px;padding-bottom:0px\">";
                }
                htmlWarning += (0,_cgl_utils_js__WEBPACK_IMPORTED_MODULE_7__.escapeHTML)(line);

                if (isBadLine)
                {
                    htmlWarning += "</code></pre>";
                    htmlWarning += "<pre style=\"margin:0\"><code class=\"language-glsl\" style=\";padding-top:0px;padding-bottom:0px\">";
                }
            }
        }

        console.warn(infoLog);

        infoLog = infoLog.replace(/\n/g, "<br/>");
        if (cgl.patch.isEditorMode())console.log("Shader error ", cglShader._name, infoLog, this);

        htmlWarning = infoLog + "<br/>" + htmlWarning + "<br/><br/>";
        htmlWarning += "</code></pre>";

        cgl.patch.emitEvent("criticalError", { "title": "Shader error " + cglShader._name, "text": htmlWarning, "exception": { "message": infoLog } });

        // this._name = "errorshader";
        cglShader.setSource(Shader.getDefaultVertexShader(), Shader.getErrorFragmentShader());
    }
    else
    {
        // console.log(name+' shader compiled...');
    }
    // cgl.printError("shader create2");
    return shader;
};





/***/ }),

/***/ "./src/core/cgl/cgl_shader_lib.js":
/*!****************************************!*\
  !*** ./src/core/cgl/cgl_shader_lib.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShaderLibMods": () => (/* binding */ ShaderLibMods)
/* harmony export */ });
/* harmony import */ var _cgl_shader_uniform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgl_shader_uniform.js */ "./src/core/cgl/cgl_shader_uniform.js");
/* harmony import */ var _cgl_texture_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgl_texture.js */ "./src/core/cgl/cgl_texture.js");
/* harmony import */ var _cgl_textureeffect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cgl_textureeffect.js */ "./src/core/cgl/cgl_textureeffect.js");




const ShaderLibMods = {
    "CGL.BLENDMODES": function ()
    {
        this.name = "blendmodes";
        this.srcHeadFrag = _cgl_textureeffect_js__WEBPACK_IMPORTED_MODULE_0__.TextureEffect.getBlendCode();
    },
    "CGL.BLENDMODES3": function ()
    {
        this.name = "blendmodes3";
        this.srcHeadFrag = _cgl_textureeffect_js__WEBPACK_IMPORTED_MODULE_0__.TextureEffect.getBlendCode(3);
    },

    "CGL.LUMINANCE": function ()
    {
        this.name = "luminance";
        this.srcHeadFrag = "".endl()
            + "float cgl_luminance(vec3 c)".endl()
            + "{".endl()
            + "    return dot(vec3(0.2126,0.7152,0.0722),c);".endl()
            + "}".endl();
    },


    // quite good random numbers, but somehow don't work in ANGLE
    "CGL.RANDOM_OLD": function ()
    {
        this.name = "randomNumber";
        this.srcHeadFrag = "".endl()
            + "float cgl_random(vec2 co)".endl()
            + "{".endl()
            + "    return fract(sin(dot(co.xy ,vec2(12.9898,4.1414))) * 432758.5453);".endl()
            + "}".endl()
            + "vec3 cgl_random3(vec2 co)".endl()
            + "{".endl()
            + "    return vec3( cgl_random(co),cgl_random(co+0.5711),cgl_random(co+1.5711));".endl()
            + "}";
    },


    // low quality generative ranodm numbers
    "CGL.RANDOM_LOW": function ()
    {
        this.name = "randomNumber";
        this.srcHeadFrag = "".endl()
            + "float cgl_random(vec2 co)".endl()
            + "{".endl()
            + "    return fract(sin(dot(co.xy ,vec2(12.9898,4.1414))) * 358.5453);".endl()
            + "}".endl()
            + "vec3 cgl_random3(vec2 co)".endl()
            + "{".endl()
            + "    return vec3( cgl_random(co),cgl_random(co+0.5711),cgl_random(co+1.5711));".endl()
            + "}";
    },

    // texture based random numbers
    "CGL.RANDOM_TEX": function ()
    {
        this.name = "randomNumbertex";
        this.srcHeadFrag = "".endl()
            + "UNI sampler2D CGLRNDTEX;".endl()
            + "float cgl_random(vec2 co)".endl()
            + "{".endl()
            + "    return texture(CGLRNDTEX,co*5711.0).r;".endl()
            + "}".endl()
            + "vec3 cgl_random3(vec2 co)".endl()
            + "{".endl()
            + "    return texture(CGLRNDTEX,co*5711.0).rgb;".endl()
            + "}";

        this.initUniforms = function (shader)
        {
            return [new _cgl_shader_uniform_js__WEBPACK_IMPORTED_MODULE_1__.Uniform(shader, "t", "CGLRNDTEX", 7)];
        };

        this.onBind = function (cgl, shader)
        {
            _cgl_texture_js__WEBPACK_IMPORTED_MODULE_2__.Texture.getRandomTexture(cgl);
            cgl.setTexture(7, _cgl_texture_js__WEBPACK_IMPORTED_MODULE_2__.Texture.getRandomTexture(cgl).tex);
        };
    },
};




/***/ }),

/***/ "./src/core/cgl/cgl_shader_uniform.js":
/*!********************************************!*\
  !*** ./src/core/cgl/cgl_shader_uniform.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Uniform": () => (/* binding */ Uniform)
/* harmony export */ });
/* harmony import */ var _cg_cg_uniform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cg/cg_uniform.js */ "./src/core/cg/cg_uniform.js");




/**
 * Shader uniforms
 *
 * types:
 * <pre>
 * f    - float
 * 2f   - vec2
 * 3f   - vec3
 * 4f   - vec4
 * i    - integer
 * t    - texture
 * m4   - mat4, 4x4 float matrix
 * f[]  - array of floats
 * 2f[] - array of float vec2
 * 3f[] - array of float vec3
 * 4f[] - array of float vec4
 * </pre>
 *
 * @external CGL
 * @namespace Uniform
 * @class
 * @param {Shader} shader
 * @param {String} [type=f]
 * @param {String} name
 * @param {Number|Port} value  can be a Number,Matrix or Port
 * @example
 * // bind float uniform called myfloat and initialize with value 1.0
 * const unir=new CGL.Uniform(shader,'f','myfloat',1.0);
 * unir.setValue(1.0);
 *
 * // bind float uniform called myfloat and automatically set it to input port value
 * const myPort=op.inFloat("input");
 * const pv=new CGL.Uniform(shader,'f','myfloat',myPort);
 *
 */


// export const Uniform(__shader, __type, __name, _value, _port2, _port3, _port4, _structUniformName, _structName, _propertyName)

class Uniform extends _cg_cg_uniform_js__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    constructor(__shader, __type, __name, _value, _port2, _port3, _port4, _structUniformName, _structName, _propertyName)
    {
        super(__shader, __type, __name, _value, _port2, _port3, _port4, _structUniformName, _structName, _propertyName);
        this._loc = -1;
        this._cgl = __shader._cgl;
    }

    get name()
    {
        return this._name;
    }

    copy(newShader)
    {
        const uni = new Uniform(newShader, this._type, this._name, this._value, this._port2, this._port3, this._port4, this._structUniformName, this._structName, this._propertyName);
        uni.shaderType = this.shaderType;
        return uni;
    }

    /**
     * returns type as glsl type string. e.g. 'f' returns 'float'
     * @function getGlslTypeString
     * @memberof Uniform
     * @instance
     * @return {string} type as string
     */
    getGlslTypeString()
    {
        return Uniform.glslTypeString(this._type);
    }

    _isValidLoc()
    {
        return this._loc != -1;// && this._loc != null;
    }

    resetLoc()
    {
        this._loc = -1;
        this.needsUpdate = true;
    }

    bindTextures() {}

    getLoc()
    {
        return this._loc;
    }

    updateFromPort4f()
    {
        this._value[0] = this._port.get();
        this._value[1] = this._port2.get();
        this._value[2] = this._port3.get();
        this._value[3] = this._port4.get();
        this.setValue(this._value);
    }

    updateFromPort3f()
    {
        this._value[0] = this._port.get();
        this._value[1] = this._port2.get();
        this._value[2] = this._port3.get();
        this.setValue(this._value);
    }

    updateFromPort2f()
    {
        this._value[0] = this._port.get();
        this._value[1] = this._port2.get();
        this.setValue(this._value);
    }

    updateFromPort()
    {
        this.setValue(this._port.get());
    }

    updateValueF()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;

        this._shader.getCgl().gl.uniform1f(this._loc, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    setValueF(v)
    {
        if (v != this._value)
        {
            this.needsUpdate = true;
            this._value = v;
        }
    }

    updateValueI()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;

        this._shader.getCgl().gl.uniform1i(this._loc, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    updateValue2I()
    {
        if (!this._value) return;

        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }

        this._shader.getCgl().gl.uniform2i(this._loc, this._value[0], this._value[1]);

        this.needsUpdate = false;
        this._cgl.profileData.profileUniformCount++;
    }

    updateValue3I()
    {
        if (!this._value) return;
        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }

        this._shader.getCgl().gl.uniform3i(this._loc, this._value[0], this._value[1], this._value[2]);
        this.needsUpdate = false;
        this._cgl.profileData.profileUniformCount++;
    }

    updateValue4I()
    {
        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }
        this._shader.getCgl().gl.uniform4i(this._loc, this._value[0], this._value[1], this._value[2], this._value[3]);
        this._cgl.profileData.profileUniformCount++;
    }

    setValueI(v)
    {
        if (v != this._value)
        {
            this.needsUpdate = true;
            this._value = v;
        }
    }

    setValue2I(v)
    {
        if (!v) return;
        if (!this._oldValue)
        {
            this._oldValue = [v[0] - 1, 1];
            this.needsUpdate = true;
        }
        else if (v[0] != this._oldValue[0] || v[1] != this._oldValue[1])
        {
            this._oldValue[0] = v[0];
            this._oldValue[1] = v[1];
            this.needsUpdate = true;
        }

        this._value = v;
    }

    setValue3I(v)
    {
        if (!v) return;
        if (!this._oldValue)
        {
            this._oldValue = [v[0] - 1, 1, 2];
            this.needsUpdate = true;
        }
        else if (v[0] != this._oldValue[0] || v[1] != this._oldValue[1] || v[2] != this._oldValue[2])
        {
            this._oldValue[0] = v[0];
            this._oldValue[1] = v[1];
            this._oldValue[2] = v[2];
            this.needsUpdate = true;
        }

        this._value = v;
    }

    setValue4I(v)
    {
        this.needsUpdate = true;
        this._value = v || vec4.create();
    }

    updateValueBool()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;
        this._shader.getCgl().gl.uniform1i(this._loc, this._value ? 1 : 0);

        this._cgl.profileData.profileUniformCount++;
    }

    setValueBool(v)
    {
        if (v != this._value)
        {
            this.needsUpdate = true;
            this._value = v;
        }
    }

    setValueArray4F(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    updateValueArray4F()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;

        if (!this._value) return;
        this._shader.getCgl().gl.uniform4fv(this._loc, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    setValueArray3F(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    updateValueArray3F()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;

        if (!this._value) return;
        this._shader.getCgl().gl.uniform3fv(this._loc, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    setValueArray2F(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    updateValueArray2F()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;

        if (!this._value) return;
        this._shader.getCgl().gl.uniform2fv(this._loc, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    setValueArrayF(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    updateValueArrayF()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;

        if (!this._value) return;
        this._shader.getCgl().gl.uniform1fv(this._loc, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    setValueArrayT(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }


    updateValue3F()
    {
        if (!this._value) return;
        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }

        this._shader.getCgl().gl.uniform3f(this._loc, this._value[0], this._value[1], this._value[2]);
        this.needsUpdate = false;
        this._cgl.profileData.profileUniformCount++;
    }

    setValue3F(v)
    {
        if (!v) return;
        if (!this._oldValue)
        {
            this._oldValue = [v[0] - 1, 1, 2];
            this.needsUpdate = true;
        }
        else if (v[0] != this._oldValue[0] || v[1] != this._oldValue[1] || v[2] != this._oldValue[2])
        {
            this._oldValue[0] = v[0];
            this._oldValue[1] = v[1];
            this._oldValue[2] = v[2];
            this.needsUpdate = true;
        }

        this._value = v;
    }

    updateValue2F()
    {
        if (!this._value) return;

        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }

        this._shader.getCgl().gl.uniform2f(this._loc, this._value[0], this._value[1]);
        this.needsUpdate = false;
        this._cgl.profileData.profileUniformCount++;
    }

    setValue2F(v)
    {
        if (!v) return;
        if (!this._oldValue)
        {
            this._oldValue = [v[0] - 1, 1];
            this.needsUpdate = true;
        }
        else if (v[0] != this._oldValue[0] || v[1] != this._oldValue[1])
        {
            this._oldValue[0] = v[0];
            this._oldValue[1] = v[1];
            this.needsUpdate = true;
        }
        this._value = v;
    }

    updateValue4F()
    {
        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }

        if (!this._value)
        {
            this._log.warn("no value for uniform", this._name, this);
            this._value = [0, 0, 0, 0];
        }

        this.needsUpdate = false;
        this._shader.getCgl().gl.uniform4f(this._loc, this._value[0], this._value[1], this._value[2], this._value[3]);
        this._cgl.profileData.profileUniformCount++;
    }

    setValue4F(v)
    {
        if (typeof this.value == "number") this.value = vec4.create(); // this should not be needed, but somehow it crashes with some shadermods

        if (!v) return;
        if (!this._oldValue)
        {
            this._oldValue = [v[0] - 1, 1, 2, 3];
            this.needsUpdate = true;
        }
        else if (v[0] != this._oldValue[0] || v[1] != this._oldValue[1] || v[2] != this._oldValue[2] || v[3] != this._oldValue[3])
        {
            this._oldValue[0] = v[0];
            this._oldValue[1] = v[1];
            this._oldValue[2] = v[2];
            this.needsUpdate = true;
        }

        this._value = v;
    }

    updateValueM4()
    {
        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }
        if (!this._value || this._value.length % 16 != 0) return console.log("this.name", this._name, this._value);

        this._shader.getCgl().gl.uniformMatrix4fv(this._loc, false, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    setValueM4(v)
    {
        this.needsUpdate = true;
        this._value = v || mat4.create();
    }

    updateValueArrayT()
    {
        if (!this._isValidLoc()) this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
        else this.needsUpdate = false;

        if (!this._value) return;
        this._shader.getCgl().gl.uniform1iv(this._loc, this._value);
        this._cgl.profileData.profileUniformCount++;
    }

    updateValueT()
    {
        if (!this._isValidLoc())
        {
            this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name);
            this._cgl.profileData.profileShaderGetUniform++;
            this._cgl.profileData.profileShaderGetUniformName = this._name;
        }

        this._cgl.profileData.profileUniformCount++;
        this._shader.getCgl().gl.uniform1i(this._loc, this._value);
        this.needsUpdate = false;
    }

    setValueT(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }
}


Uniform.glslTypeString = (t) =>
{
    if (t == "f") return "float";
    if (t == "b") return "bool";
    if (t == "i") return "int";
    if (t == "2i") return "ivec2";
    if (t == "2f") return "vec2";
    if (t == "3f") return "vec3";
    if (t == "4f") return "vec4";
    if (t == "m4") return "mat4";

    if (t == "t") return "sampler2D";
    if (t == "tc") return "samplerCube";

    if (t == "3f[]") return null; // ignore this for now...
    if (t == "m4[]") return null; // ignore this for now...
    if (t == "f[]") return null; // ignore this for now...

    console.warn("[CGL UNIFORM] unknown glsl type string ", t);
};


/**
 * @function setValue
 * @memberof Uniform
 * @instance
 * @param {Number|Array|Matrix|Texture} value
 */




/***/ }),

/***/ "./src/core/cgl/cgl_simplerect.js":
/*!****************************************!*\
  !*** ./src/core/cgl/cgl_simplerect.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MESHES": () => (/* binding */ MESHES)
/* harmony export */ });
/* harmony import */ var _cg_cg_geom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cg/cg_geom.js */ "./src/core/cg/cg_geom.js");
/* harmony import */ var _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgl_mesh.js */ "./src/core/cgl/cgl_mesh.js");




const MESHES = {};

MESHES.getSimpleRect = function (cgl, name)
{
    const geom = new _cg_cg_geom_js__WEBPACK_IMPORTED_MODULE_0__.Geometry(name);

    geom.vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];
    geom.texCoords = [1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0];
    geom.verticesIndices = [0, 1, 2, 2, 1, 3];
    geom.vertexNormals = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

    return new _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_1__.Mesh(cgl, geom);
};


MESHES.getSimpleCube = function (cgl, name)
{
    const geom = new _cg_cg_geom_js__WEBPACK_IMPORTED_MODULE_0__.Geometry(name);
    geom.vertices = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1];
    geom.setTexCoords([0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0,]);
    geom.verticesIndices = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23];
    geom.vertexNormals = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0]);
    geom.tangents = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
    geom.biTangents = new Float32Array([-1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1]);

    return new _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_1__.Mesh(cgl, geom);
};





/***/ }),

/***/ "./src/core/cgl/cgl_state.js":
/*!***********************************!*\
  !*** ./src/core/cgl/cgl_state.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Context": () => (/* binding */ Context)
/* harmony export */ });
/* unused harmony export BLENDS */
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants.js */ "./src/core/cgl/constants.js");
/* harmony import */ var _cgl_shader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cgl_shader.js */ "./src/core/cgl/cgl_shader.js");
/* harmony import */ var _cgl_profiledata_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgl_profiledata.js */ "./src/core/cgl/cgl_profiledata.js");
/* harmony import */ var _cg_cg_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cg/cg_state.js */ "./src/core/cg/cg_state.js");
/* harmony import */ var _cg_cg_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cg/cg_constants.js */ "./src/core/cg/cg_constants.js");








/**
 * cables gl context/state manager
 * @external CGL
 * @namespace Context
 * @class
 * @hideconstructor
 */
// const Context(_patch)
class Context extends _cg_cg_state_js__WEBPACK_IMPORTED_MODULE_0__.CGState
{
    constructor(_patch)
    {
        super(_patch);
        // EventTarget.apply(this);
        // CGState.apply(this);

        this.gApi = _cg_cg_constants_js__WEBPACK_IMPORTED_MODULE_1__.CG.GAPI_WEBGL;
        this.aborted = false;

        this.pushMvMatrix = this.pushModelMatrix; // deprecated and wrong... still used??
        this.popMvMatrix = this.popmMatrix = this.popModelMatrix;// deprecated and wrong... still used??

        this.profileData = new _cgl_profiledata_js__WEBPACK_IMPORTED_MODULE_2__.ProfileData(this);
        this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_3__["default"]("cgl_context");
        this._viewPort = [0, 0, 0, 0];
        this.glVersion = 0;
        this.glUseHalfFloatTex = false;
        this.clearCanvasTransparent = true;
        this.clearCanvasDepth = true;
        this.debugOneFrame = false;
        this.checkGlErrors = false; // true is slow // false should be default...
        this.maxTextureUnits = 0;
        this.maxVaryingVectors = 0;
        this.currentProgram = null;
        this._hadStackError = false;
        this.glSlowRenderer = false;
        this._isSafariCrap = false;

        this.temporaryTexture = null;
        this.frameStore = {};
        this._onetimeCallbacks = [];
        this.gl = null;

        this._cursor = "auto";
        this._currentCursor = "";

        this._viewPortStack = [];
        this._glFrameBufferStack = [];
        this._frameBufferStack = [];
        this._shaderStack = [];
        this._stackDepthTest = [];
        this.mainloopOp = null;

        this._simpleShader = new _cgl_shader_js__WEBPACK_IMPORTED_MODULE_4__.Shader(this, "simpleshader");
        this._simpleShader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG", "MODULE_VERTEX_MOVELVIEW"]);
        this._simpleShader.setSource(_cgl_shader_js__WEBPACK_IMPORTED_MODULE_4__.Shader.getDefaultVertexShader(), _cgl_shader_js__WEBPACK_IMPORTED_MODULE_4__.Shader.getDefaultFragmentShader());

        this._currentShader = this._simpleShader;


        this._oldCanvasWidth = -1;
        this._oldCanvasHeight = -1;
        this._enabledExtensions = {};
    }

    // set pixelDensity(p)
    // {
    //     this._pixelDensity = p;
    // }

    // get pixelDensity()
    // {
    //     return this._pixelDensity;
    // }



    get viewPort()
    {
        if (this._viewPortStack.length > 3)
        {
            const l = this._viewPortStack.length;

            return [
                this._viewPortStack[l - 4],
                this._viewPortStack[l - 3],
                this._viewPortStack[l - 2],
                this._viewPortStack[l - 1]
            ];
        }
        else
        {
            // workaround pre viewport stack times / or+and initial value...

            return this._viewPort;
        }
    }



    get mvMatrix() // deprecate
    {
        return this.mMatrix;
    }

    set mvMatrix(m) // deprecate
    {
        this.mMatrix = m;
    }


    exitError(msgId, msg)
    {
        console.log(msgId, msg);
        this.patch.exitError(msgId, msg);
        this.aborted = true;
    }


    _setCanvas(canv)
    {
        if (!canv)
        {
            this._log.stack("_setCanvas undef");
        }

        if (!this.patch.config.canvas) this.patch.config.canvas = {};
        if (!this.patch.config.canvas.hasOwnProperty("preserveDrawingBuffer")) this.patch.config.canvas.preserveDrawingBuffer = false;
        if (!this.patch.config.canvas.hasOwnProperty("premultipliedAlpha")) this.patch.config.canvas.premultipliedAlpha = false;
        if (!this.patch.config.canvas.hasOwnProperty("alpha")) this.patch.config.canvas.alpha = false;

        this.patch.config.canvas.stencil = true;

        if (this.patch.config.hasOwnProperty("clearCanvasColor")) this.clearCanvasTransparent = this.patch.config.clearCanvasColor;
        if (this.patch.config.hasOwnProperty("clearCanvasDepth")) this.clearCanvasDepth = this.patch.config.clearCanvasDepth;

        // safari stuff..........
        if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && (navigator.userAgent.match(/iPhone/i)))
        {
            this._isSafariCrap = true;
            this.glUseHalfFloatTex = true;
        }

        if (!this.patch.config.canvas.forceWebGl1) this.gl = canv.getContext("webgl2", this.patch.config.canvas);


        if (!this.gl || this.gl.isContextLost())
        {
            this.aborted = true;
            this.exitError("NO_WEBGL", "sorry, could not initialize WebGL. Please check if your Browser supports WebGL or try to restart your browser.");
            return;
        }

        if (this.gl.getParameter(this.gl.VERSION) != "WebGL 1.0")
        {
            this.glVersion = 2;
        }
        else
        {
            this.gl = canv.getContext("webgl", this.patch.config.canvas) || canv.getContext("experimental-webgl", this.patch.config.canvas);
            this.glVersion = 1;

            // safari
            // if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && (navigator.userAgent.match(/iPhone/i)))
            // {
            //     this.glUseHalfFloatTex = true;
            // }

            // ios
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
            {
                if (!this.patch.config.canvas.hasOwnProperty("powerPreference")) this.patch.config.canvas.powerPreference = "high-performance";
            }

            this.enableExtension("OES_standard_derivatives");
            // this.enableExtension("GL_OES_standard_derivatives");
            const instancingExt = this.enableExtension("ANGLE_instanced_arrays") || this.gl;
            if (instancingExt.vertexAttribDivisorANGLE)
            {
                this.gl.vertexAttribDivisor = instancingExt.vertexAttribDivisorANGLE.bind(instancingExt);
                this.gl.drawElementsInstanced = instancingExt.drawElementsInstancedANGLE.bind(instancingExt);
            }
        }

        const dbgRenderInfo = this.enableExtension("WEBGL_debug_renderer_info");
        if (dbgRenderInfo)
        {
            this.glRenderer = this.gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
            if (this.glRenderer === "Google SwiftShader") this.glSlowRenderer = true;
        }

        this.canvas.addEventListener("webglcontextlost", (event) =>
        {
            if (this.aborted) return console.log("[cgl_state] aborted context lost... can be ignored...");
            this._log.error("canvas lost...", event);
            this.emitEvent("webglcontextlost");
            this.aborted = true;
        });


        this.maxAnisotropic = 0;
        if (this.enableExtension("EXT_texture_filter_anisotropic"))
            this.maxAnisotropic = this.gl.getParameter(this.enableExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT);


        this.maxVaryingVectors = this.gl.getParameter(this.gl.MAX_VARYING_VECTORS);
        this.maxTextureUnits = this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS);
        this.maxTexSize = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE);
        this.maxUniformsFrag = this.gl.getParameter(this.gl.MAX_FRAGMENT_UNIFORM_VECTORS);
        this.maxUniformsVert = this.gl.getParameter(this.gl.MAX_VERTEX_UNIFORM_VECTORS);
        this.maxSamples = 0;
        if (this.gl.MAX_SAMPLES) this.maxSamples = this.gl.getParameter(this.gl.MAX_SAMPLES);

        if (this.glVersion == 1)
        {
            this.enableExtension("OES_standard_derivatives");
            const instancingExt = this.enableExtension("ANGLE_instanced_arrays") || this.gl;

            if (instancingExt.vertexAttribDivisorANGLE)
            {
                this.gl.vertexAttribDivisor = instancingExt.vertexAttribDivisorANGLE.bind(instancingExt);
                this.gl.drawElementsInstanced = instancingExt.drawElementsInstancedANGLE.bind(instancingExt);
            }
        }

        this.DEPTH_FUNCS = [
            this.gl.NEVER,
            this.gl.ALWAYS,
            this.gl.LESS,
            this.gl.LEQUAL,
            this.gl.GREATER,
            this.gl.GEQUAL,
            this.gl.EQUAL,
            this.gl.NOTEQUAL
        ];
        this.CULL_MODES = [
            null,
            this.gl.BACK,
            this.gl.FRONT,
            this.gl.FRONT_AND_BACK
        ];
    }

    getInfo()
    {
        return {
            "glVersion": this.glVersion,
            "glRenderer": this.glRenderer,
            "glUseHalfFloatTex": this.glUseHalfFloatTex,
            "maxVaryingVectors": this.maxVaryingVectors,
            "maxTextureUnits": this.maxTextureUnits,
            "maxTexSize": this.maxTexSize,
            "maxUniformsFrag": this.maxUniformsFrag,
            "maxUniformsVert": this.maxUniformsVert,
            "maxSamples": this.maxSamples
        };
    }





    /**
     * @function popViewPort
     * @memberof Context
     * @instance
     * @description pop viewPort stack
     */


    popViewPort()
    {
        this._viewPortStack.pop();
        this._viewPortStack.pop();
        this._viewPortStack.pop();
        this._viewPortStack.pop();

        if (this._viewPortStack.length == 0)
        {
            this.setViewPort(0, 0, this.canvasWidth, this.canvasHeight);
            // this.gl.viewport(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
            // this.setViewPort(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
        }
        else
        {
            // this.viewPort = [this._viewPortStack[this._viewPort.length - 4], this._viewPortStack[this._viewPort.length - 3], this._viewPortStack[this._viewPort.length - 2], this._viewPortStack[this._viewPort.length - 1]];
            // this.gl.viewport(this._viewPortStack[this._viewPort.length - 4], this._viewPortStack[this._viewPort.length - 3], this._viewPortStack[this._viewPort.length - 2], this._viewPortStack[this._viewPort.length - 1]);
            this.setViewPort(this._viewPortStack[this._viewPort.length - 4], this._viewPortStack[this._viewPort.length - 3], this._viewPortStack[this._viewPort.length - 2], this._viewPortStack[this._viewPort.length - 1]);
        }
    }

    /**
     * @function pushViewPort
     * @memberof Context
     * @instance
     * @description push a new viewport onto stack
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */

    pushViewPort(x, y, w, h)
    {
        this._viewPortStack.push(x, y, w, h);
        this.setViewPort(x, y, w, h);
    }


    // old
    getViewPort()
    {
        return this._viewPort;
    }

    // old
    resetViewPort()
    {
        this.gl.viewport(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
    }

    // old
    setViewPort(x, y, w, h)
    {
        this._viewPort[0] = Math.round(x);
        this._viewPort[1] = Math.round(y);
        this._viewPort[2] = Math.round(w);
        this._viewPort[3] = Math.round(h);
        this.gl.viewport(this._viewPort[0], this._viewPort[1], this._viewPort[2], this._viewPort[3]);
    }


    screenShot(cb, doScreenshotClearAlpha, mimeType, quality)
    {
        if (doScreenshotClearAlpha)
        {
            this.gl.clearColor(1, 1, 1, 1);
            this.gl.colorMask(false, false, false, true);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.gl.colorMask(true, true, true, true);
        }

        if (this.canvas && this.canvas.toBlob)
        {
            this.canvas.toBlob((blob) =>
            {
                if (cb) cb(blob);
                else this._log.log("no screenshot callback...");
            }, mimeType, quality);
        }
    }

    endFrame()
    {
        if (this.patch.isEditorMode()) CABLES.GL_MARKER.drawMarkerLayer(this);

        this.setPreviousShader();

        if (this._vMatrixStack.length() > 0) this.logStackError("view matrix stack length !=0 at end of rendering...");
        if (this._mMatrixStack.length() > 0) this.logStackError("mvmatrix stack length !=0 at end of rendering...");
        if (this._pMatrixStack.length() > 0) this.logStackError("pmatrix stack length !=0 at end of rendering...");
        if (this._glFrameBufferStack.length > 0) this.logStackError("glFrameBuffer stack length !=0 at end of rendering...");
        if (this._stackDepthTest.length > 0) this.logStackError("depthtest stack length !=0 at end of rendering...");
        if (this._stackDepthWrite.length > 0) this.logStackError("depthwrite stack length !=0 at end of rendering...");
        if (this._stackDepthFunc.length > 0) this.logStackError("depthfunc stack length !=0 at end of rendering...");
        if (this._stackBlend.length > 0) this.logStackError("blend stack length !=0 at end of rendering...");
        if (this._stackBlendMode.length > 0) this.logStackError("blendMode stack length !=0 at end of rendering...");
        if (this._shaderStack.length > 0) this.logStackError("this._shaderStack length !=0 at end of rendering...");
        if (this._stackCullFace.length > 0) this.logStackError("this._stackCullFace length !=0 at end of rendering...");
        if (this._stackCullFaceFacing.length > 0) this.logStackError("this._stackCullFaceFacing length !=0 at end of rendering...");
        if (this._viewPortStack.length > 0) this.logStackError("viewport stack length !=0 at end of rendering...");

        this._frameStarted = false;

        if (this._oldCanvasWidth != this.canvasWidth || this._oldCanvasHeight != this.canvasHeight)
        {
            this._oldCanvasWidth = this.canvasWidth;
            this._oldCanvasHeight = this.canvasHeight;
            this.emitEvent("resize");
        }

        if (this._cursor != this._currentCursor)
        {
            this._currentCursor = this.canvas.style.cursor = this._cursor;
        }

        this.emitEvent("endframe");

        this.fpsCounter.endFrame();
    }

    logStackError(str)
    {
        if (!this._hadStackError)
        {
            this._hadStackError = true;
            this._log.warn("[" + this.canvas.id + "]: ", str);
        }
    }

    // shader stack
    getShader()
    {
        if (this._currentShader) if (!this.frameStore || ((this.frameStore.renderOffscreen === true) == this._currentShader.offScreenPass) === true) return this._currentShader;

        for (let i = this._shaderStack.length - 1; i >= 0; i--) if (this._shaderStack[i]) if (this.frameStore.renderOffscreen == this._shaderStack[i].offScreenPass) return this._shaderStack[i];
    }

    getDefaultShader()
    {
        return this._simpleShader;
    }

    /**
     * push a shader to the shader stack
     * @function pushShader
     * @memberof Context
     * @instance
     * @param {Object} shader
     * @function
     */

    pushShader(shader)
    {
        if (this.frameStore.forceShaderMods)
        {
            for (let i = 0; i < this.frameStore.forceShaderMods.length; i++)
            {
                // if (!currentShader.forcedMod && currentShader != this.frameStore.forceShaderMods[i])
                // {
                //     currentShader.forcedMod = this.frameStore.forceShaderMods[i];
                shader = this.frameStore.forceShaderMods[i].bind(shader, false);
                // }
                // return currentShader;
                // if (this.frameStore.forceShaderMods[i].currentShader() && shader != this.frameStore.forceShaderMods[i].currentShader().shader)
            }
        }

        this._shaderStack.push(shader);
        this._currentShader = shader;
    }


    /**
     * pop current used shader from shader stack
     * @function popShader
     * @memberof Context
     * @instance
     * @function
     */
    setPreviousShader()
    {
        if (this.frameStore.forceShaderMods)
        {
            for (let i = 0; i < this.frameStore.forceShaderMods.length; i++)
            {
                // const a =
                this.frameStore.forceShaderMods[i].unbind(false);
                // if (a) return;
                // this.popShader();
            }
        }

        if (this._shaderStack.length === 0) throw new Error("Invalid shader stack pop!");
        this._shaderStack.pop();
        this._currentShader = this._shaderStack[this._shaderStack.length - 1];
    }

    /**
     * push a framebuffer to the framebuffer stack
     * @function pushGlFrameBuffer
     * @memberof Context
     * @instance
     * @param {Object} framebuffer
     * @function
     */
    pushGlFrameBuffer(fb)
    {
        this._glFrameBufferStack.push(fb);
    }

    /**
     * pop framebuffer stack
     * @function popGlFrameBuffer
     * @memberof Context
     * @instance
     * @returns {Object} current framebuffer or null
     */
    popGlFrameBuffer()
    {
        if (this._glFrameBufferStack.length == 0) return null;
        this._glFrameBufferStack.pop();
        return this._glFrameBufferStack[this._glFrameBufferStack.length - 1];
    }

    /**
     * get current framebuffer
     * @function getCurrentFrameBuffer
     * @memberof Context
     * @instance
     * @returns {Object} current framebuffer or null
     */
    getCurrentGlFrameBuffer()
    {
        if (this._glFrameBufferStack.length === 0) return null;
        return this._glFrameBufferStack[this._glFrameBufferStack.length - 1];
    }

    /**
     * push a framebuffer to the framebuffer stack
     * @function pushGlFrameBuffer
     * @memberof Context
     * @instance
     * @param {Framebuffer} framebuffer
     */
    pushFrameBuffer(fb)
    {
        this._frameBufferStack.push(fb);
    }

    /**
     * pop framebuffer stack
     * @function popFrameBuffer
     * @memberof Context
     * @instance
     * @returns {Framebuffer} current framebuffer or null
     */
    popFrameBuffer()
    {
        if (this._frameBufferStack.length == 0) return null;
        this._frameBufferStack.pop();
        return this._frameBufferStack[this._frameBufferStack.length - 1];
    }

    /**
     * get current framebuffer
     * @function getCurrentFrameBuffer
     * @memberof Context
     * @instance
     * @returns {Framebuffer} current framebuffer or null
     */
    getCurrentFrameBuffer()
    {
        if (this._frameBufferStack.length === 0) return null;
        return this._frameBufferStack[this._frameBufferStack.length - 1];
    }


    renderStart(cgl, identTranslate, identTranslateView)
    {
        this.fpsCounter.startFrame();
        this.pushDepthTest(true);
        this.pushDepthWrite(true);
        this.pushDepthFunc(cgl.gl.LEQUAL);
        this.pushCullFaceFacing(cgl.gl.BACK);
        this.pushCullFace(false);

        // if (this.clearCanvasTransparent)
        // {
        //     cgl.gl.clearColor(0, 0, 0, 0);
        //     cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT);
        // }
        // if (this.clearCanvasDepth) cgl.gl.clear(cgl.gl.DEPTH_BUFFER_BIT);

        cgl.setViewPort(0, 0, cgl.canvasWidth, cgl.canvasHeight);

        this._startMatrixStacks(identTranslate, identTranslateView);

        cgl.pushBlendMode(_constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_NORMAL, false);

        for (let i = 0; i < this._textureslots.length; i++) this._textureslots[i] = null;

        this.pushShader(this._simpleShader);

        this._frameStarted = true;

        if (this._onetimeCallbacks.length > 0)
        {
            for (let i = 0; i < this._onetimeCallbacks.length; i++) this._onetimeCallbacks[i]();
            this._onetimeCallbacks.length = 0;
        }

        for (let i = 0; i < this._textureslots.length; i++)
        {
            this.gl.activeTexture(this.gl.TEXTURE0 + i);
            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
            this._textureslots[i] = null;
        }

        this.emitEvent("beginFrame");
    }

    renderEnd(cgl)
    {
        this._endMatrixStacks();

        this.popDepthTest();
        this.popDepthWrite();
        this.popDepthFunc();
        this.popCullFaceFacing();
        this.popCullFace();
        this.popBlend();
        this.popBlendMode();

        cgl.endFrame();

        this.emitEvent("endFrame");
    }

    getTexture(slot)
    {
        return this._textureslots[slot];
    }

    hasFrameStarted()
    {
        return this._frameStarted;
    }

    /**
     * log warning to console if the rendering of one frame has not been started / handy to check for async problems
     * @function checkFrameStarted
     * @memberof Context
     * @instance
     */
    checkFrameStarted(string)
    {
        if (!this._frameStarted)
        {
            this._log.warn("frame not started " + string);
            this.patch.printTriggerStack();
        }
    }


    setTexture(slot, t, type)
    {
        this.checkFrameStarted("cgl setTexture");

        if (t === null) t = CGL.Texture.getEmptyTexture(this).tex;

        // if (!this.gl.isTexture(t))
        // {
        //     console.log("not a texture!!!!"); return false;
        //     t = CGL.Texture.getEmptyTexture(this).tex;
        // }

        // if (!this.gl.isTexture(t))
        // {
        //     t = CGL.Texture.getErrorTexture(this).tex;
        //     // this._log.stack("not a texture!!!!");
        //     // return false;
        // }


        if (this._textureslots[slot] != t)
        {
            this.gl.activeTexture(this.gl.TEXTURE0 + slot);
            this.gl.bindTexture(type || this.gl.TEXTURE_2D, t);
            this._textureslots[slot] = t;
        }


        return true;
    }

    fullScreen()
    {
        if (this.canvas.requestFullscreen) this.canvas.requestFullscreen();
        else if (this.canvas.mozRequestFullScreen) this.canvas.mozRequestFullScreen();
        else if (this.canvas.webkitRequestFullscreen) this.canvas.webkitRequestFullscreen();
        else if (this.canvas.msRequestFullscreen) this.canvas.msRequestFullscreen();
    }


    printError(str)
    {
        if (!this.checkGlErrors) return;
        let found = false;
        let error = this.gl.getError();

        if (error != this.gl.NO_ERROR)
        {
            let errStr = "";
            if (error == this.gl.OUT_OF_MEMORY) errStr = "OUT_OF_MEMORY";
            if (error == this.gl.INVALID_ENUM) errStr = "INVALID_ENUM";
            if (error == this.gl.INVALID_OPERATION) errStr = "INVALID_OPERATION";
            if (error == this.gl.INVALID_FRAMEBUFFER_OPERATION) errStr = "INVALID_FRAMEBUFFER_OPERATION";
            if (error == this.gl.INVALID_VALUE) errStr = "INVALID_VALUE";
            if (error == this.gl.CONTEXT_LOST_WEBGL)
            {
                this.aborted = true;
                errStr = "CONTEXT_LOST_WEBGL";
            }
            if (error == this.gl.NO_ERROR) errStr = "NO_ERROR";

            found = true;


            this._log.warn("gl error [" + this.canvas.id + "]: ", str, error, errStr);

            if (this.canvas.id.contains("glGuiCanvas"))
                if (!this._loggedGlError)
                {
                    this.patch.printTriggerStack();
                    this._log.stack("glerror");
                    this._loggedGlError = true;
                }
        }
        error = this.gl.getError();

        return found;
    }

    saveScreenshot(filename, cb, pw, ph, noclearalpha)
    {
        this.patch.renderOneFrame();

        let w = this.canvas.clientWidth * this.pixelDensity;
        let h = this.canvas.clientHeight * this.pixelDensity;

        if (pw)
        {
            this.canvas.width = pw;
            w = pw;
        }
        if (ph)
        {
            this.canvas.height = ph;
            h = ph;
        }

        function padLeft(nr, n, str)
        {
            return Array(n - String(nr).length + 1).join(str || "0") + nr;
        }

        const d = new Date();

        const dateStr = "".concat(String(d.getFullYear()) + String(d.getMonth() + 1) + String(d.getDate()), "_").concat(padLeft(d.getHours(), 2)).concat(padLeft(d.getMinutes(), 2)).concat(padLeft(d.getSeconds(), 2));

        if (!filename) filename = "cables_" + dateStr + ".png";
        else filename += ".png";

        this.patch.cgl.screenShot(function (blob)
        {
            this.canvas.width = w;
            this.canvas.height = h;

            if (blob)
            {
                const anchor = document.createElement("a");

                anchor.download = filename;
                anchor.href = URL.createObjectURL(blob);

                setTimeout(function ()
                {
                    anchor.click();
                    if (cb) cb(blob);
                }, 100);
            }
            else
            {
                this._log.log("screenshot: no blob");
            }
        }.bind(this), noclearalpha);
    }

    _dispose()
    {
        this._simpleShader.dispose();
        this.gl = null;
    }
}


Context.prototype.popShader = Context.prototype.setPreviousShader;
Context.prototype.setShader = Context.prototype.pushShader;

/**
 * execute the callback next frame, once
 * @function addNextFrameOnceCallback
 * @memberof Context
 * @instance
 * @param {function} callback
 */
Context.prototype.addNextFrameOnceCallback = function (cb)
{
    if (cb) this._onetimeCallbacks.push(cb);
};

// state depthtest

/**
 * push depth testing enabled state
 * @function pushDepthTest
 * @param {Boolean} enabled
 * @memberof Context
 * @instance
 */
Context.prototype._stackDepthTest = [];
Context.prototype.pushDepthTest = function (b)
{
    this._stackDepthTest.push(b);
    if (!b) this.gl.disable(this.gl.DEPTH_TEST);
    else this.gl.enable(this.gl.DEPTH_TEST);
};
/**
 * current state of depth testing
 * @function stateCullFace
 * @returns {Boolean} enabled
 * @memberof Context
 * @instance
 */
Context.prototype.stateDepthTest = function ()
{
    return this._stackDepthTest[this._stackDepthTest.length - 1];
};

/**
 * pop depth testing state
 * @function popCullFace
 * @memberof Context
 * @instance
 */
Context.prototype.popDepthTest = function ()
{
    this._stackDepthTest.pop();

    if (!this._stackDepthTest[this._stackDepthTest.length - 1]) this.gl.disable(this.gl.DEPTH_TEST);
    else this.gl.enable(this.gl.DEPTH_TEST);
};

// --------------------------------------
// state depthwrite

/**
 * push depth write enabled state
 * @function pushDepthTest
 * @param {Boolean} enabled
 * @memberof Context
 * @instance
 */
Context.prototype._stackDepthWrite = [];
Context.prototype.pushDepthWrite = function (b)
{
    b = b || false;
    this._stackDepthWrite.push(b);
    this.gl.depthMask(b);
};

/**
 * current state of depth writing
 * @function stateCullFace
 * @returns {Boolean} enabled
 * @memberof Context
 * @instance
 */
Context.prototype.stateDepthWrite = function ()
{
    return this._stackDepthWrite[this._stackDepthWrite.length - 1];
};

/**
 * pop depth writing state
 * @function popCullFace
 * @memberof Context
 * @instance
 */
Context.prototype.popDepthWrite = function ()
{
    this._stackDepthWrite.pop();
    this.gl.depthMask(this._stackDepthWrite[this._stackDepthWrite.length - 1] || false);
};


// --------------------------------------
// state CullFace

/**
 * push face culling face enabled state
 * @function pushCullFaceFacing
 * @param {Boolean} enabled
 * @memberof Context
 * @instance
 */
Context.prototype._stackCullFace = [];
Context.prototype.pushCullFace = function (b)
{
    this._stackCullFace.push(b);

    if (b) this.gl.enable(this.gl.CULL_FACE);
    else this.gl.disable(this.gl.CULL_FACE);
};

/**
 * current state of face culling
 * @function stateCullFace
 * @returns {Boolean} enabled
 * @memberof Context
 * @instance
 */
Context.prototype.stateCullFace = function ()
{
    return this._stackCullFace[this._stackCullFace.length - 1];
};

/**
 * pop face culling enabled state
 * @function popCullFace
 * @memberof Context
 * @instance
 */
Context.prototype.popCullFace = function ()
{
    this._stackCullFace.pop();

    if (this._stackCullFace[this._stackCullFace.length - 1]) this.gl.enable(this.gl.CULL_FACE);
    else this.gl.disable(this.gl.CULL_FACE);
};


// --------------------------------------
// state CullFace Facing


/**
 * push face culling face side
 * @function pushCullFaceFacing
 * @param {Number} cgl.gl.FRONT_AND_BACK, cgl.gl.BACK or cgl.gl.FRONT
 * @memberof Context
 * @instance
 */
Context.prototype._stackCullFaceFacing = [];
Context.prototype.pushCullFaceFacing = function (b)
{
    this._stackCullFaceFacing.push(b);
    this.gl.cullFace(this._stackCullFaceFacing[this._stackCullFaceFacing.length - 1]);
};

/**
 * current state of face culling side
 * @function stateCullFaceFacing
 * @returns {Boolean} enabled
 * @memberof Context
 * @instance
 */
Context.prototype.stateCullFaceFacing = function ()
{
    return this._stackCullFaceFacing[this._stackCullFaceFacing.length - 1];
};

/**
 * pop face culling face side
 * @function popCullFaceFacing
 * @memberof Context
 * @instance
 */
Context.prototype.popCullFaceFacing = function ()
{
    this._stackCullFaceFacing.pop();
    if (this._stackCullFaceFacing.length > 0) this.gl.cullFace(this._stackCullFaceFacing[this._stackCullFaceFacing.length - 1]);
};


// --------------------------------------
// state depthfunc

Context.prototype._stackDepthFunc = [];

/**
 * enable / disable depth testing
 * like `gl.depthFunc(boolean);`
 * @function pushDepthFunc
 * @memberof Context
 * @instance
 * @param {Boolean} depthtesting
 */
Context.prototype.pushDepthFunc = function (f)
{
    this._stackDepthFunc.push(f);
    this.gl.depthFunc(f);
};

/**
 * current state of blend
 * @function stateDepthFunc
 * @memberof Context
 * @instance
 * @returns {Boolean} depth testing enabled/disabled
 */
Context.prototype.stateDepthFunc = function ()
{
    if (this._stackDepthFunc.length > 0) return this._stackDepthFunc[this._stackDepthFunc.length - 1];
    return false;
};

/**
 * pop depth testing and set the previous state
 * @function popDepthFunc
 * @memberof Context
 * @instance
 */
Context.prototype.popDepthFunc = function ()
{
    this._stackDepthFunc.pop();
    if (this._stackDepthFunc.length > 0) this.gl.depthFunc(this._stackDepthFunc[this._stackDepthFunc.length - 1]);
};

// --------------------------------------
// state blending

Context.prototype._stackBlend = [];

/**
 * enable / disable blend
 * like gl.enable(gl.BLEND); / gl.disable(gl.BLEND);
 * @function pushBlend
 * @memberof Context
 * @instance
 * @param {Boolean} blending
 */
Context.prototype.pushBlend = function (b)
{
    this._stackBlend.push(b);
    if (!b) this.gl.disable(this.gl.BLEND);
    else this.gl.enable(this.gl.BLEND);
};

/**
 * pop blend state and set the previous state
 * @function popBlend
 * @memberof Context
 * @instance
 */
Context.prototype.popBlend = function ()
{
    this._stackBlend.pop();

    if (!this._stackBlend[this._stackBlend.length - 1]) this.gl.disable(this.gl.BLEND);
    else this.gl.enable(this.gl.BLEND);
};

/**
 * current state of blend
 * @function stateBlend
 * @returns {boolean} blending enabled/disabled
 * @memberof Context
 * @instance
 */
Context.prototype.stateBlend = function ()
{
    return this._stackBlend[this._stackBlend.length - 1];
};

const BLENDS = {
    "BLEND_NONE": 0,
    "BLEND_NORMAL": 1,
    "BLEND_ADD": 2,
    "BLEND_SUB": 3,
    "BLEND_MUL": 4,
};

Context.prototype._stackBlendMode = [];
Context.prototype._stackBlendModePremul = [];

/**
 * push and switch to predefined blendmode (CONSTANTS.BLEND_MODES.BLEND_NONE,CONSTANTS.BLEND_MODES.BLEND_NORMAL,CONSTANTS.BLEND_MODES.BLEND_ADD,CONSTANTS.BLEND_MODES.BLEND_SUB,CONSTANTS.BLEND_MODES.BLEND_MUL)
 * @function pushBlendMode
 * @memberof Context
 * @instance
 * @param {Number} blendmode
 * @param {Boolean} premultiplied mode
 */
Context.prototype.pushBlendMode = function (blendMode, premul)
{
    this._stackBlendMode.push(blendMode);
    this._stackBlendModePremul.push(premul);

    const n = this._stackBlendMode.length - 1;

    this.pushBlend(this._stackBlendMode[n] !== _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_NONE);
    this._setBlendMode(this._stackBlendMode[n], this._stackBlendModePremul[n]);
};

/**
 * pop predefined blendmode / switch back to previous blendmode
 * @function popBlendMode
 * @memberof Context
 * @instance
 */
Context.prototype.popBlendMode = function ()
{
    this._stackBlendMode.pop();
    this._stackBlendModePremul.pop();

    const n = this._stackBlendMode.length - 1;

    this.popBlend(this._stackBlendMode[n] !== _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_NONE);

    if (n >= 0) this._setBlendMode(this._stackBlendMode[n], this._stackBlendModePremul[n]);
};


// --------------------------------------
// state stencil

Context.prototype._stackStencil = [];

/**
 * enable / disable stencil testing

* @function pushStencil
 * @memberof Context
 * @instance
 * @param {Boolean} enable
 */
Context.prototype.pushStencil = function (b)
{
    this._stackStencil.push(b);
    if (!b) this.gl.disable(this.gl.STENCIL_TEST);
    else this.gl.enable(this.gl.STENCIL_TEST);
};

/**
 * pop stencil test state and set the previous state
 * @function popStencil
 * @memberof Context
 * @instance
 */
Context.prototype.popStencil = function ()
{
    this._stackStencil.pop();

    if (!this._stackStencil[this._stackStencil.length - 1]) this.gl.disable(this.gl.STENCIL_TEST);
    else this.gl.enable(this.gl.STENCIL_TEST);
};

// --------------------------------------


Context.prototype.glGetAttribLocation = function (prog, name)
{
    const l = this.gl.getAttribLocation(prog, name);
    // if (l == -1)
    // {
    //     this._log.warn("get attr loc -1 ", name);
    // }
    return l;
};


/**
 * should an op now draw helpermeshes
 * @function shouldDrawHelpers
 * @memberof Context
 * @instance
 */
Context.prototype.shouldDrawHelpers = function (op)
{
    if (this.frameStore.shadowPass) return false;
    if (!op.patch.isEditorMode()) return false;

    // const fb = this.getCurrentFrameBuffer();
    // if (fb && fb.getWidth)
    // {
    //     const fbshould = this.canvasWidth / this.canvasHeight == fb.getWidth() / fb.getHeight();
    //     if (!fbshould) return false;
    // }

    return gui.shouldDrawOverlay;// || (CABLES.UI.renderHelperCurrent && op.isCurrentUiOp());
};

Context.prototype._setBlendMode = function (blendMode, premul)
{
    const gl = this.gl;

    if (blendMode == _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_NONE)
    {
        // this.gl.disable(this.gl.BLEND);
    }
    else if (blendMode == _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_ADD)
    {
        if (premul)
        {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.ONE, gl.ONE, gl.ONE, gl.ONE);
        }
        else
        {
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
        }
    }
    else if (blendMode == _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_SUB)
    {
        if (premul)
        {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.ZERO, gl.ZERO, gl.ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_ALPHA);
        }
        else
        {
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
        }
    }
    else if (blendMode == _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_MUL)
    {
        if (premul)
        {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.ZERO, gl.SRC_COLOR, gl.ZERO, gl.SRC_ALPHA);
        }
        else
        {
            gl.blendEquation(gl.FUNC_ADD);
            gl.blendFunc(gl.ZERO, gl.SRC_COLOR);
        }
    }
    else if (blendMode == _constants_js__WEBPACK_IMPORTED_MODULE_5__.CONSTANTS.BLEND_MODES.BLEND_NORMAL)
    {
        if (premul)
        {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        }
        else
        {
            gl.blendEquationSeparate(gl.FUNC_ADD, gl.FUNC_ADD);
            gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        }
    }
    else
    {
        this._log.log("setblendmode: unknown blendmode");
    }
};

Context.prototype.createMesh = function (geom, options)
{
    if (CABLES.UTILS.isNumeric(options))options = { "glPrimitive": options }; // old constructor fallback...
    return new CGL.Mesh(this, geom, options);
};


/**
 * set cursor
 * @function setCursor
 * @memberof Context
 * @instance
 * @param {String} css cursor string
 */
Context.prototype.setCursor = function (str)
{
    this._cursor = str;
};

/**
 * enable a webgl extension
 * @function enableExtension
 * @memberof Context
 * @instance
 * @param {String} extension name
 * @returns {Object} extension object or null
 */
Context.prototype.enableExtension = function (name)
{
    if (!this.gl) return null;
    // const start = performance.now();

    if (this._enabledExtensions.hasOwnProperty(name))
    {
        return this._enabledExtensions[name];
    }

    const o = this.gl.getExtension(name);
    this._enabledExtensions[name] = o;

    if (!o)
        this._log.warn("[cgl_state] extension not available " + name);
    else
        this._log.log("enabled extension", name);

    return o;
};

Context.prototype.checkTextureSize = function (x)
{
    x = x || 1;
    x = Math.floor(x);
    x = Math.min(x, this.maxTexSize);
    x = Math.max(x, 1);
    return x;
};






/***/ }),

/***/ "./src/core/cgl/cgl_texture.js":
/*!*************************************!*\
  !*** ./src/core/cgl/cgl_texture.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Texture": () => (/* binding */ Texture)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");





const DEFAULT_TEXTURE_SIZE = 8;

/**
 * A Texture
 * @external CGL
 * @namespace Texture
 * @constructor
 * @param {Context} cgl
 * @param {Object} [options]
 * @hideconstructor
 * @class
 * @example
 * // generate a 256x256 pixel texture of random colors
 * const size=256;
 * const data = new Uint8Array(size*size*4);
 *
 * for(var x=0;x<size*size*4;x++) data[ x*4+3]=255;
 *
 * const tex=new CGL.Texture(cgl);
 * tex.initFromData(data,size,size,CGL.Texture.FILTER_NEAREST,CGL.Texture.WRAP_REPEAT);
 */
const Texture = function (__cgl, options = {})
{
    if (!__cgl) throw new Error("no cgl");
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgl_texture");
    this._cgl = __cgl;
    this.pixelFormat = options.pixelFormat || Texture.PFORMATSTR_RGBA8UB;
    this.tex = this._cgl.gl.createTexture();
    this.id = CABLES.uuid();
    this.width = 0;
    this.height = 0;
    this.loading = false;
    this.flip = true;
    this.flipped = false;
    this.shadowMap = false;
    this.deleted = false;
    this.image = null;
    this.anisotropic = 0;
    this.filter = Texture.FILTER_NEAREST;
    this.wrap = Texture.WRAP_CLAMP_TO_EDGE;
    this.texTarget = this._cgl.gl.TEXTURE_2D;
    if (options && options.type) this.texTarget = options.type;
    this.textureType = Texture.TYPE_DEFAULT;
    this.unpackAlpha = true;
    this._fromData = true;
    this.name = "unknown";

    this._glDataType = -1;
    this._glInternalFormat = -1;
    this._glDataFormat = -1;


    if (options)
    {
        this.name = options.name || this.name;
        if (options.isDepthTexture)
        {
            this.textureType = Texture.TYPE_DEPTH;
        }
        if (options.isFloatingPointTexture === true) this.textureType = Texture.TYPE_FLOAT;

        if ("textureType" in options) this.textureType = options.textureType;
        if ("filter" in options) this.filter = options.filter;
        if ("wrap" in options) this.wrap = options.wrap;
        if ("unpackAlpha" in options) this.unpackAlpha = options.unpackAlpha;
        if ("flip" in options) this.flip = options.flip;
        if ("shadowMap" in options) this.shadowMap = options.shadowMap;
        if ("anisotropic" in options) this.anisotropic = options.anisotropic;
    }
    else
    {
        options = {};
    }

    if (!options.pixelFormat && options.isFloatingPointTexture) this.pixelFormat = Texture.PFORMATSTR_RGBA32F;

    if (this.textureType == Texture.TYPE_DEPTH) this.pixelFormat = Texture.PFORMATSTR_DEPTH;



    if (!options.width) options.width = DEFAULT_TEXTURE_SIZE;
    if (!options.height) options.height = DEFAULT_TEXTURE_SIZE;

    this._cgl.profileData.profileTextureNew++;


    this.setFormat(Texture.setUpGlPixelFormat(this._cgl, this.pixelFormat));
    this._cgl.profileData.addHeavyEvent("texture created", this.name, options.width + "x" + options.height);

    this.setSize(options.width, options.height);
    this.getInfoOneLine();
};

Texture.prototype.isFloatingPoint = function ()
{
    return Texture.isPixelFormatFloat(this.pixelFormat);
};

/**
 * returns true if otherTexture has same options (width/height/filter/wrap etc)
 * @function compareSettings
 * @memberof Texture
 * @instance
 * @param {Texture} otherTexture
 * @returns {Boolean}
 */
Texture.prototype.compareSettings = function (tex)
{
    // if (!tex) { this._log.warn("compare: no tex"); return false; }
    // if (tex.width != this.width) this._log.warn("tex.width not equal", tex.width, this.width);
    // if (tex.height != this.height) this._log.warn("tex.height not equal", tex.height, this.height);
    // if (tex.filter != this.filter) this._log.warn("tex.filter not equal");
    // if (tex.wrap != this.wrap) this._log.warn("tex.wrap not equal");
    // if (tex.textureType != this.textureType) this._log.warn("tex.textureType not equal");
    // if (tex.unpackAlpha != this.unpackAlpha) this._log.warn("tex.unpackAlpha not equal");
    // if (tex.anisotropic != this.anisotropic) this._log.warn("tex.anisotropic not equal");
    // if (tex.shadowMap != this.shadowMap) this._log.warn("tex.shadowMap not equal");
    // if (tex.texTarget != this.texTarget) this._log.warn("tex.texTarget not equal");
    // if (tex.flip != this.flip) this._log.warn("tex.flip not equal");

    if (!tex) return false;
    return (
        tex.width == this.width &&
        tex.height == this.height &&
        tex.filter == this.filter &&
        tex.wrap == this.wrap &&
        tex.textureType == this.textureType &&
        tex.unpackAlpha == this.unpackAlpha &&
        tex.anisotropic == this.anisotropic &&
        tex.shadowMap == this.shadowMap &&
        tex.texTarget == this.texTarget &&
        tex.flip == this.flip
    );
};

/**
 * returns a new texture with the same settings (does not copy texture itself)
 * @function clone
 * @memberof Texture
 * @instance
 * @returns {Texture}
 */
Texture.prototype.clone = function ()
{
    const newTex = new Texture(this._cgl, {
        "name": this.name,
        "filter": this.filter,
        "anisotropic": this.anisotropic,
        "wrap": this.wrap,
        "textureType": this.textureType,
        "pixelFormat": this.pixelFormat,
        "unpackAlpha": this.unpackAlpha,
        "flip": this.flip,
        "width": this.width,
        "height": this.height,
    });

    this._cgl.profileData.addHeavyEvent("texture created", this.name, this.width + "x" + this.height);

    if (!this.compareSettings(newTex))
    {
        this._log.error("Cloned texture settings do not compare!");
        this._log.error(this);
        this._log.error(newTex);
    }

    return newTex;
};


Texture.prototype.setFormat = function (o)
{
    this.pixelFormat = o.pixelFormat;
    this._glDataFormat = o.glDataFormat;
    this._glInternalFormat = o.glInternalFormat;
    this._glDataType = o.glDataType;
};


Texture.setUpGlPixelFormat = function (cgl, pixelFormatStr)
{
    const o = {};

    if (!pixelFormatStr)
    {
        console.log("no pixelformatstr!");
        console.log((new Error()).stack);
        pixelFormatStr = Texture.PFORMATSTR_RGBA8UB;
    }

    o.pixelFormatBase = pixelFormatStr;


    o.pixelFormat = pixelFormatStr;
    o.glDataType = cgl.gl.UNSIGNED_BYTE;
    o.glInternalFormat = cgl.gl.RGBA8;
    o.glDataFormat = cgl.gl.RGBA;

    let floatDatatype = cgl.gl.FLOAT;

    if (cgl.glUseHalfFloatTex)
    {
        if (pixelFormatStr == Texture.PFORMATSTR_RGBA32F) pixelFormatStr = Texture.PFORMATSTR_RGBA16F;
        if (pixelFormatStr == Texture.PFORMATSTR_RG32F) pixelFormatStr = Texture.PFORMATSTR_RG16F;
        if (pixelFormatStr == Texture.PFORMATSTR_R32F) pixelFormatStr = Texture.PFORMATSTR_R16F;
    }

    if (pixelFormatStr.contains("16bit"))
    {
        if (cgl.glVersion == 2)
        {
            // cgl.enableExtension("OES_texture_half_float");
            const hasExt = cgl.enableExtension("EXT_color_buffer_half_float");

            if (!hasExt)
            {
                console.warn("no 16bit extension, fallback to 32bit", pixelFormatStr);
                // fallback to 32 bit?
                if (pixelFormatStr == Texture.PFORMATSTR_RGBA16F) pixelFormatStr = Texture.PFORMATSTR_RGBA32F;
                if (pixelFormatStr == Texture.PFORMATSTR_RGB16F) pixelFormatStr = Texture.PFORMATSTR_RGB32F;
                if (pixelFormatStr == Texture.PFORMATSTR_RG16F) pixelFormatStr = Texture.PFORMATSTR_RG32F;
                if (pixelFormatStr == Texture.PFORMATSTR_R16F) pixelFormatStr = Texture.PFORMATSTR_R32F;
            }
            else
            {
                floatDatatype = cgl.gl.HALF_FLOAT;
            }
        }
    }

    if (cgl.glVersion == 1)
    {
        o.glInternalFormat = cgl.gl.RGBA;

        if (pixelFormatStr == Texture.PFORMATSTR_RGBA16F || pixelFormatStr == Texture.PFORMATSTR_RG16F || pixelFormatStr == Texture.PFORMATSTR_R16F)
        {
            const ext = cgl.enableExtension("OES_texture_half_float");
            if (!ext) throw new Error("no half float texture extension");

            floatDatatype = ext.HALF_FLOAT_OES;
        }
    }


    if (pixelFormatStr == Texture.PFORMATSTR_RGBA8UB)
    {
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_RGB565)
    {
        o.glInternalFormat = cgl.gl.RGB565;
        o.glDataFormat = cgl.gl.RGB;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_R8UB)
    {
        o.glInternalFormat = cgl.gl.R8;
        o.glDataFormat = cgl.gl.RED;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_RG8UB)
    {
        o.glInternalFormat = cgl.gl.RG8;
        o.glDataFormat = cgl.gl.RG;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_RGB8UB)
    {
        o.glInternalFormat = cgl.gl.RGB8;
        o.glDataFormat = cgl.gl.RGB;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_SRGBA8)
    {
        o.glInternalFormat = cgl.gl.SRGB8_ALPHA8;
    }

    else if (pixelFormatStr == Texture.PFORMATSTR_R32F)
    {
        o.glInternalFormat = cgl.gl.R32F;
        o.glDataFormat = cgl.gl.RED;
        o.glDataType = floatDatatype;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_R16F)
    {
        o.glInternalFormat = cgl.gl.R16F;
        o.glDataType = floatDatatype;
        o.glDataFormat = cgl.gl.RED;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_RG16F)
    {
        o.glInternalFormat = cgl.gl.RG16F;
        o.glDataType = floatDatatype;
        o.glDataFormat = cgl.gl.RG;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_RGBA16F)
    {
        if (cgl.glVersion == 1) o.glInternalFormat = cgl.gl.RGBA;
        else o.glInternalFormat = cgl.gl.RGBA16F;
        o.glDataType = floatDatatype;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_R11FG11FB10F)
    {
        o.glInternalFormat = cgl.gl.R11F_G11F_B10F;
        o.glDataType = floatDatatype;
        o.glDataFormat = cgl.gl.RGB;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_RGBA32F)
    {
        if (cgl.glVersion == 1) o.glInternalFormat = cgl.gl.RGBA;
        else o.glInternalFormat = cgl.gl.RGBA32F;
        o.glDataType = floatDatatype;
    }
    else if (pixelFormatStr == Texture.PFORMATSTR_DEPTH)
    {
        if (cgl.glVersion == 1)
        {
            o.glInternalFormat = cgl.gl.DEPTH_COMPONENT;
            o.glDataType = cgl.gl.UNSIGNED_SHORT;
            o.glDataFormat = cgl.gl.DEPTH_COMPONENT;
        }
        else
        {
            o.glInternalFormat = cgl.gl.DEPTH_COMPONENT32F;
            o.glDataType = cgl.gl.FLOAT;
            o.glDataFormat = cgl.gl.DEPTH_COMPONENT;
        }
    }
    else
    {
        console.log("unknown pixelformat ", pixelFormatStr);
    }

    /// //////

    if (pixelFormatStr.contains("32bit") || pixelFormatStr == Texture.PFORMATSTR_R11FG11FB10F)
    {
        if (cgl.glVersion == 2) cgl.enableExtension("EXT_color_buffer_float");
        if (cgl.glVersion == 2) cgl.enableExtension("EXT_float_blend");

        cgl.enableExtension("OES_texture_float_linear"); // yes, i am sure, this is a webgl 1 and 2 ext
    }


    o.numColorChannels = 1;
    if (pixelFormatStr.startsWith("R"))o.numColorChannels = 1;
    if (pixelFormatStr.startsWith("RG"))o.numColorChannels = 2;
    if (pixelFormatStr.startsWith("RGB"))o.numColorChannels = 3;
    if (pixelFormatStr.startsWith("RGBA"))o.numColorChannels = 4;


    // console.log(pixelFormatStr, this.name);

    if (!o.glDataType || !o.glInternalFormat || !o.glDataFormat) console.log("pixelformat wrong ?!", pixelFormatStr, o.glDataType, o.glInternalFormat, o.glDataFormat, this);

    return o;
};

/**
 * set pixel size of texture
 * @function setSize
 * @memberof Texture
 * @instance
 * @param {Number} width
 * @param {Number} height
 */
Texture.prototype.setSize = function (w, h)
{
    if (this._cgl.aborted) return;
    if (w != w || w <= 0 || !w) w = DEFAULT_TEXTURE_SIZE;
    if (h != h || h <= 0 || !h) h = DEFAULT_TEXTURE_SIZE;

    if (w > this._cgl.maxTexSize || h > this._cgl.maxTexSize) this._log.error("texture size too big! " + w + "x" + h + " / max: " + this._cgl.maxTexSize);

    w = Math.min(w, this._cgl.maxTexSize);
    h = Math.min(h, this._cgl.maxTexSize);

    w = Math.floor(w);
    h = Math.floor(h);
    if (this.width == w && this.height == h) return;

    w = this._cgl.checkTextureSize(w);
    h = this._cgl.checkTextureSize(h);

    this.width = w;
    this.height = h;
    this.deleted = false;

    this.setFormat(Texture.setUpGlPixelFormat(this._cgl, this.pixelFormat));

    this.shortInfoString = this.getInfoOneLine();// w + "x" + h + "";

    this._cgl.gl.bindTexture(this.texTarget, this.tex);
    this._cgl.profileData.profileTextureResize++;

    const uarr = null;

    this._cgl.gl.texImage2D(this.texTarget, 0, this._glInternalFormat, w, h, 0, this._glDataFormat, this._glDataType, uarr);

    this._setFilter();

    this.updateMipMap();

    this._cgl.gl.bindTexture(this.texTarget, null);
};


/**
 * @function initFromData
 * @memberof Texture
 * @instance
 * @description create texturem from rgb data
 * @param {Array<Number>} data rgb color array [r,g,b,a,r,g,b,a,...]
 * @param {Number} width
 * @param {Number} height
 * @param {Number} filter
 * @param {Number} wrap
 */
Texture.prototype.initFromData = function (data, w, h, filter, wrap)
{
    this.filter = filter;
    this.wrap = wrap;
    if (filter == undefined) this.filter = Texture.FILTER_LINEAR;
    if (wrap == undefined) this.wrap = Texture.WRAP_CLAMP_TO_EDGE;
    this.width = w;
    this.height = h;
    this._fromData = true;
    this.deleted = false;

    if (this.height > this._cgl.maxTexSize || this.width > this._cgl.maxTexSize)
    {
        const t = CGL.Texture.getTempTexture(this._cgl);
        this.width = t.width;
        this.height = t.height;
        this.tex = t.tex;
        this._log.error("[cgl_texture] texture size to big!!!", this.width, this.height, this._cgl.maxTexSize);
        return;
    }

    if (this.flip) this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_FLIP_Y_WEBGL, this.flip);

    this._cgl.gl.bindTexture(this.texTarget, this.tex);

    this.setFormat(Texture.setUpGlPixelFormat(this._cgl, this.pixelFormat));

    this._cgl.gl.texImage2D(this.texTarget, 0, this._glInternalFormat, w, h, 0, this._glDataFormat, this._glDataType, data);

    this._setFilter();
    this.updateMipMap();

    if (this.flip) this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_FLIP_Y_WEBGL, false);
    this._cgl.gl.bindTexture(this.texTarget, null);
};

Texture.prototype.updateMipMap = function ()
{
    if ((this._cgl.glVersion == 2 || this.isPowerOfTwo()) && this.filter == Texture.FILTER_MIPMAP)
    {
        this._cgl.gl.generateMipmap(this.texTarget);
        this._cgl.profileData.profileGenMipMap++;
    }
};

/**
 * set texture data from an image/canvas object
 * @function initTexture
 * @memberof Texture
 * @instance
 * @param {Object} image
 * @param {Number} filter
 */
Texture.prototype.initTexture = function (img, filter)
{
    this._cgl.printError("before initTexture");
    this._cgl.checkFrameStarted("texture inittexture");
    this._fromData = false;

    this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha);
    if (img.width || img.videoWidth) this.width = img.videoWidth || img.width;
    if (img.height || img.videoHeight) this.height = img.videoHeight || img.height;

    if (filter !== undefined) this.filter = filter; // todo: can we remove this filter param?

    if (img.height > this._cgl.maxTexSize || img.width > this._cgl.maxTexSize)
    {
        const t = CGL.Texture.getTempTexture(this._cgl);
        this.width = t.width;
        this.height = t.height;
        this.tex = t.tex;
        this._log.error("[cgl_texture] texture size to big!!!", img.width, img.height, this._cgl.maxTexSize);
        return;
    }


    // console.log("loaded texture", img.width, img.height);

    this._cgl.gl.bindTexture(this.texTarget, this.tex);

    this.deleted = false;
    this.flipped = !this.flip;
    if (this.flipped) this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_FLIP_Y_WEBGL, this.flipped);


    this.setFormat(Texture.setUpGlPixelFormat(this._cgl, this.pixelFormat));

    this._cgl.gl.texImage2D(this.texTarget, 0, this._glInternalFormat, this._glDataFormat, this._glDataType, img);
    // this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, img);

    // if (this._cgl.printError("[cgl_texture] init " + this.name));

    this._setFilter();
    this.updateMipMap();

    // if (this._cgl.printError("[cgl_texture] init2"));

    this._cgl.gl.bindTexture(this.texTarget, null);
    this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    if (this.flipped) this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_FLIP_Y_WEBGL, false);

    this.getInfoOneLine();
    this._cgl.printError("initTexture");
};

/**
 * delete texture. use this when texture is no longer needed
 * @function delete
 * @memberof Texture
 * @instance
 */
Texture.prototype.dispose =
Texture.prototype.delete = function ()
{
    if (this.loading)
    {
        // cant delete texture when still loading
        // setTimeout(this.delete.bind(this), 50);
        return;
    }

    this.deleted = true;
    this.width = 0;
    this.height = 0;
    this._cgl.profileData.profileTextureDelete++;
    this._cgl.gl.deleteTexture(this.tex);
    this.image = null;

    this.tex = null;
};

/**
 * @function isPowerOfTwo
 * @memberof Texture
 * @instance
 * @description return true if texture width and height are both power of two
 * @return {Boolean}
 */
Texture.prototype.isPowerOfTwo = function ()
{
    return Texture.isPowerOfTwo(this.width) && Texture.isPowerOfTwo(this.height);
};

Texture.prototype.printInfo = function ()
{
    console.log(this.getInfo());
};

Texture.prototype.getInfoReadable = function ()
{
    const info = this.getInfo();
    let html = "";

    info.name = info.name.substr(0, info.name.indexOf("?rnd="));

    for (const i in info)
    {
        html += "* " + i + ":  **" + info[i] + "**\n";
    }

    return html;
};

Texture.prototype.getInfoOneLine = function ()
{
    let txt = "" + this.width + "x" + this.height;
    txt += " ";
    // if (this.textureType === CGL.Texture.TYPE_FLOAT) txt += " 32bit"; else txt += " 8bit";
    // if (this.textureType === CGL.Texture.TYPE_FLOAT) txt += " 32bit"; else txt += " 8bit";
    txt += this.pixelFormat;

    if (this.filter === CGL.Texture.FILTER_NEAREST) txt += " nearest";
    if (this.filter === CGL.Texture.FILTER_LINEAR) txt += " linear";
    if (this.filter === CGL.Texture.FILTER_MIPMAP) txt += " mipmap";

    if (this.wrap === CGL.Texture.WRAP_CLAMP_TO_EDGE) txt += " clamp";
    if (this.wrap === CGL.Texture.WRAP_REPEAT) txt += " repeat";
    if (this.wrap === CGL.Texture.WRAP_MIRRORED_REPEAT) txt += " repeatmir";

    this.shortInfoString = txt;

    return txt;
};

Texture.prototype.getInfoOneLineShort = function ()
{
    let txt = "" + this.width + "x" + this.height;
    // if (this.textureType === CGL.Texture.TYPE_FLOAT) txt += " 32bit"; else txt += " 8bit";
    txt += " ";
    txt += this.pixelFormat;

    this.shortInfoString = txt;

    return txt;
};


Texture.prototype.getInfo = function ()
{
    return Texture.getTexInfo(this);
};


Texture.prototype._setFilter = function ()
{
    this._cgl.printError("before _setFilter");

    if (!this._fromData)
    {
        this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha);
    }

    if (this.shadowMap)
    {
        this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_MODE, this._cgl.gl.COMPARE_REF_TO_TEXTURE);
        this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_FUNC, this._cgl.gl.LEQUAL);
    }

    if (this.textureType == Texture.TYPE_FLOAT && this.filter == Texture.FILTER_MIPMAP)
    {
        this.filter = Texture.FILTER_LINEAR;
        this._log.stack("texture: HDR and mipmap filtering at the same time is not possible");
    }

    if (this._cgl.glVersion == 1 && !this.isPowerOfTwo())
    {
        this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST);
        this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST);

        this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE);
        this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE);

        this.filter = Texture.FILTER_NEAREST;
        this.wrap = Texture.WRAP_CLAMP_TO_EDGE;
    }
    else
    {
        if (this.wrap == Texture.WRAP_CLAMP_TO_EDGE)
        {
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE);
        }
        else if (this.wrap == Texture.WRAP_REPEAT)
        {
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.REPEAT);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.REPEAT);
        }
        else if (this.wrap == Texture.WRAP_MIRRORED_REPEAT)
        {
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.MIRRORED_REPEAT);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.MIRRORED_REPEAT);
        }

        if (this.filter == Texture.FILTER_NEAREST)
        {
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST);
        }
        else if (this.filter == Texture.FILTER_LINEAR)
        {
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR);
        }
        else if (this.filter == Texture.FILTER_MIPMAP)
        {
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR_MIPMAP_LINEAR);
        }
        else
        {
            this._log.log("unknown texture filter!", this.filter);
            throw new Error("unknown texture filter!" + this.filter);
        }

        if (this.anisotropic)
        {
            const ext = this._cgl.enableExtension("EXT_texture_filter_anisotropic");



            if (this._cgl.maxAnisotropic)
            {
                const aniso = Math.min(this._cgl.maxAnisotropic, this.anisotropic);
                this._cgl.gl.texParameterf(this._cgl.gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, aniso);
            }
        }
    }
    this.getInfoOneLine();
    this._cgl.printError("_setFilter");
};


/**
 * @function load
 * @static
 * @memberof Texture
 * @description load an image from an url
 * @param {Context} cgl
 * @param {String} url
 * @param {Function} onFinished
 * @param {Object} options
 * @return {Texture}
 */
Texture.load = function (cgl, url, finishedCallback, settings)
{
    if (!url) return finishedCallback({ "error": true });
    let loadingId = null;
    if (!cgl.patch.loading.existByName(url)) loadingId = cgl.patch.loading.start("cgl.texture", url);

    const texture = new Texture(cgl);
    texture.name = url;

    // texture.pixelFormat = Texture.PFORMATSTR_;

    // if (cgl.patch.isEditorMode()) gui.jobs().start({ "id": "loadtexture" + loadingId, "title": "loading texture " + CABLES.basename(url) });

    texture.image = new Image();
    texture.image.crossOrigin = "anonymous";
    texture.loading = true;

    if (settings && settings.hasOwnProperty("filter")) texture.filter = settings.filter;
    if (settings && settings.hasOwnProperty("flip")) texture.flip = settings.flip;
    if (settings && settings.hasOwnProperty("wrap")) texture.wrap = settings.wrap;
    if (settings && settings.hasOwnProperty("anisotropic")) texture.anisotropic = settings.anisotropic;
    if (settings && settings.hasOwnProperty("unpackAlpha")) texture.unpackAlpha = settings.unpackAlpha;
    if (settings && settings.hasOwnProperty("pixelFormat")) texture.pixelFormat = settings.pixelFormat;

    texture.image.onabort = texture.image.onerror = (e) =>
    {
        console.warn("[cgl.texture.load] error loading texture", url, e);
        texture.loading = false;
        if (loadingId) cgl.patch.loading.finished(loadingId);
        const error = { "error": true };
        if (finishedCallback) finishedCallback(error, texture);
        // if (cgl.patch.isEditorMode()) gui.jobs().finish("loadtexture" + loadingId);
    };

    texture.image.onload = function (e)
    {
        cgl.addNextFrameOnceCallback(() =>
        {
            texture.initTexture(texture.image);
            if (loadingId) cgl.patch.loading.finished(loadingId);
            texture.loading = false;
            // if (cgl.patch.isEditorMode()) gui.jobs().finish("loadtexture" + loadingId);

            if (finishedCallback) finishedCallback(null, texture);
        });
    };
    texture.image.src = url;

    return texture;
};

/**
 * @static
 * @function getTempTexture
 * @memberof Texture
 * @description returns the default temporary texture (grey diagonal stipes)
 * @param {Context} cgl
 * @return {Texture}
 */
Texture.getTempTexture = function (cgl)
{
    if (!cgl) console.error("[getTempTexture] no cgl!");
    if (!cgl.tempTexture) cgl.tempTexture = Texture.getTemporaryTexture(cgl, 256, Texture.FILTER_LINEAR, Texture.REPEAT);
    return cgl.tempTexture;
};

/**
 * @static
 * @function getErrorTexture
 * @memberof Texture
 * @description returns the default temporary texture (grey diagonal stipes)
 * @param {Context} cgl
 * @return {Texture}
 */
Texture.getErrorTexture = function (cgl)
{
    if (!cgl) console.error("[getTempTexture] no cgl!");
    if (!cgl.errorTexture) cgl.errorTexture = Texture.getTemporaryTexture(cgl, 256, Texture.FILTER_LINEAR, Texture.REPEAT, 1, 0.2, 0.2);
    return cgl.errorTexture;
};


/**
 * @function getEmptyTexture
 * @memberof Texture
 * @instance
 * @description returns a reference to a small empty (transparent) texture
 * @return {Texture}
 */
Texture.getEmptyTexture = function (cgl, fp)
{
    if (fp) return Texture.getEmptyTextureFloat(cgl);
    if (!cgl) console.error("[getEmptyTexture] no cgl!");
    if (cgl.tempTextureEmpty) return cgl.tempTextureEmpty;

    cgl.tempTextureEmpty = new Texture(cgl, { "name": "emptyTexture" });
    const data = new Uint8Array(8 * 8 * 4).fill(0);
    for (let i = 0; i < 8 * 8 * 4; i += 4) data[i + 3] = 0;

    cgl.tempTextureEmpty.initFromData(data, 8, 8, Texture.FILTER_NEAREST, Texture.WRAP_REPEAT);

    return cgl.tempTextureEmpty;
};

/**
 * @function getEmptyTextureFloat
 * @memberof Texture
 * @instance
 * @description returns a reference to a small empty (transparent) 32bit texture
 * @return {Texture}
 */
Texture.getEmptyTextureFloat = function (cgl)
{
    if (!cgl) console.error("[getEmptyTextureFloat] no cgl!");
    if (cgl.tempTextureEmptyFloat) return cgl.tempTextureEmptyFloat;

    cgl.tempTextureEmptyFloat = new Texture(cgl, { "name": "emptyTexture", "isFloatingPointTexture": true });
    const data = new Float32Array(8 * 8 * 4).fill(1);
    for (let i = 0; i < 8 * 8 * 4; i += 4) data[i + 3] = 0;

    cgl.tempTextureEmptyFloat.initFromData(data, 8, 8, Texture.FILTER_NEAREST, Texture.WRAP_REPEAT);

    return cgl.tempTextureEmptyFloat;
};


/**
 * @function getRandomTexture
 * @memberof Texture
 * @static
 * @description returns a reference to a random texture
 * @return {Texture}
 */
Texture.getRandomTexture = function (cgl)
{
    if (!cgl) console.error("[getRandomTexture] no cgl!");
    if (cgl.randomTexture) return cgl.randomTexture;

    const size = 256;
    const data = new Uint8Array(size * size * 4);

    for (let x = 0; x < size * size; x++)
    {
        data[x * 4 + 0] = Math.random() * 255;
        data[x * 4 + 1] = Math.random() * 255;
        data[x * 4 + 2] = Math.random() * 255;
        data[x * 4 + 3] = 255;
    }

    cgl.randomTexture = new Texture(cgl);
    cgl.randomTexture.initFromData(data, size, size, Texture.FILTER_NEAREST, Texture.WRAP_REPEAT);

    return cgl.randomTexture;
};

/**
 * @function getRandomFloatTexture
 * @memberof Texture
 * @static
 * @description returns a reference to a texture containing random numbers between -1 and 1
 * @return {Texture}
 */
Texture.getRandomFloatTexture = function (cgl)
{
    if (!cgl) console.error("[getRandomTexture] no cgl!");
    if (cgl.getRandomFloatTexture) return cgl.getRandomFloatTexture;

    const size = 256;
    const data = new Float32Array(size * size * 4);

    for (let x = 0; x < size * size; x++)
    {
        data[x * 4 + 0] = (Math.random() - 0.5) * 2.0;
        data[x * 4 + 1] = (Math.random() - 0.5) * 2.0;
        data[x * 4 + 2] = (Math.random() - 0.5) * 2.0;
        data[x * 4 + 3] = 1;
    }

    cgl.getRandomFloatTexture = new Texture(cgl, { "isFloatingPointTexture": true });
    cgl.getRandomFloatTexture.initFromData(data, size, size, Texture.FILTER_NEAREST, Texture.WRAP_REPEAT);

    return cgl.getRandomFloatTexture;
};

/**
 * @function getBlackTexture
 * @memberof Texture
 * @static
 * @description returns a reference to a black texture
 * @return {Texture}
 */
Texture.getBlackTexture = function (cgl)
{
    if (!cgl) this._log.error("[getBlackTexture] no cgl!");
    if (cgl.blackTexture) return cgl.blackTexture;

    const size = 8;
    const data = new Uint8Array(size * size * 4);

    for (let x = 0; x < size * size; x++)
    {
        data[x * 4 + 0] = data[x * 4 + 1] = data[x * 4 + 2] = 0;
        data[x * 4 + 3] = 255;
    }

    cgl.blackTexture = new Texture(cgl);
    cgl.blackTexture.initFromData(data, size, size, Texture.FILTER_NEAREST, Texture.WRAP_REPEAT);

    return cgl.blackTexture;
};


/**
 * @function getEmptyCubemapTexture
 * @memberof Texture
 * @static
 * @description returns an empty cubemap texture with rgba = [0, 0, 0, 0]
 * @return {Texture}
 */
Texture.getEmptyCubemapTexture = function (cgl)
{
    const faces = [
        cgl.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
        cgl.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
        cgl.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
        cgl.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        cgl.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
        cgl.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
    ];

    const tex = cgl.gl.createTexture();
    const target = cgl.gl.TEXTURE_CUBE_MAP;
    const filter = Texture.FILTER_NEAREST;
    const wrap = Texture.WRAP_CLAMP_TO_EDGE;
    const width = 8;
    const height = 8;

    cgl.profileData.profileTextureNew++;


    cgl.gl.bindTexture(target, tex);
    cgl.profileData.profileTextureResize++;

    for (let i = 0; i < 6; i += 1)
    {
        const data = new Uint8Array(8 * 8 * 4);

        cgl.gl.texImage2D(faces[i], 0, cgl.gl.RGBA, 8, 8, 0, cgl.gl.RGBA, cgl.gl.UNSIGNED_BYTE, data);
        cgl.gl.texParameteri(target, cgl.gl.TEXTURE_MAG_FILTER, cgl.gl.NEAREST);
        cgl.gl.texParameteri(target, cgl.gl.TEXTURE_MIN_FILTER, cgl.gl.NEAREST);

        cgl.gl.texParameteri(target, cgl.gl.TEXTURE_WRAP_S, cgl.gl.CLAMP_TO_EDGE);
        cgl.gl.texParameteri(target, cgl.gl.TEXTURE_WRAP_T, cgl.gl.CLAMP_TO_EDGE);
    }


    cgl.gl.bindTexture(target, null);

    return {
        "id": CABLES.uuid(),
        "tex": tex,
        "cubemap": tex,
        "width": width,
        "height": height,
        "filter": filter,
        "wrap": wrap,
        "unpackAlpha": true,
        "flip": true,
        "_fromData": true,
        "name": "emptyCubemapTexture",
        "anisotropic": 0,
    };
};

/**
 * @static
 * @function getTempGradientTexture
 * @memberof Texture
 * @description returns a gradient texture from black to white
 * @param {Context} cgl
 * @return {Texture}
 */
Texture.getTempGradientTexture = function (cgl)
{
    if (!cgl) console.error("[getTempGradientTexture] no cgl!");

    if (cgl.tempTextureGradient) return cgl.tempTextureGradient;
    const temptex = new Texture(cgl);
    const size = 256;
    const data = new Uint8Array(size * size * 4); // .fill(0);

    for (let y = 0; y < size; y++)
    {
        for (let x = 0; x < size; x++)
        {
            data[(x + y * size) * 4 + 0] = data[(x + y * size) * 4 + 1] = data[(x + y * size) * 4 + 2] = 255 - y;
            data[(x + y * size) * 4 + 3] = 255;
        }
    }

    temptex.initFromData(data, size, size, Texture.FILTER_NEAREST, Texture.WRAP_REPEAT);
    cgl.tempTextureGradient = temptex;
    return temptex;
};

Texture.getTemporaryTexture = function (cgl, size, filter, wrap, r, g, b)
{
    if (r === undefined)r = 1;
    if (g === undefined)g = 1;
    if (b === undefined)b = 1;
    const temptex = new Texture(cgl);
    const arr = [];
    for (let y = 0; y < size; y++)
    {
        for (let x = 0; x < size; x++)
        {
            if ((x + y) % 64 < 32)
            {
                arr.push((200 + (y / size) * 25 + (x / size) * 25) * r);
                arr.push((200 + (y / size) * 25 + (x / size) * 25) * g);
                arr.push((200 + (y / size) * 25 + (x / size) * 25) * b);
            }
            else
            {
                arr.push((40 + (y / size) * 25 + (x / size) * 25) * r);
                arr.push((40 + (y / size) * 25 + (x / size) * 25) * g);
                arr.push((40 + (y / size) * 25 + (x / size) * 25) * b);
            }
            arr.push(255);
        }
    }

    const data = new Uint8Array(arr);
    temptex.initFromData(data, size, size, filter, wrap);

    return temptex;
};

/**
 * @static
 * @function createFromImage
 * @memberof Texture
 * @description create texturem from image data (e.g. image or canvas)
 * @param {Context} cgl
 * @param {Object} image
 * @param {Object} options
 */
Texture.createFromImage = function (cgl, img, options)
{
    options = options || {};
    const texture = new Texture(cgl, options);
    texture.flip = false;
    texture.image = img;
    texture.width = img.videoWidth || img.width || 8;
    texture.height = img.videoHeight || img.height || 8;
    if (options.hasOwnProperty("wrap"))texture.wrap = options.wrap;

    texture.initTexture(img, options.filter);

    return texture;
};

// deprecated!
Texture.fromImage = function (cgl, img, filter, wrap)
{
    console.error("deprecated texture from image...");

    const texture = new Texture(cgl);
    texture.flip = false;
    if (filter) texture.filter = filter;
    if (wrap) texture.wrap = wrap;
    texture.image = img;
    texture.initTexture(img);
    return texture;
};

/**
 * @static
 * @function isPowerOfTwo
 * @memberof Texture
 * @description returns true if x is power of two
 * @param {Number} x
 * @return {Boolean}
 */
Texture.isPowerOfTwo = function (x)
{
    return x == 1 || x == 2 || x == 4 || x == 8 || x == 16 || x == 32 || x == 64 || x == 128 || x == 256 || x == 512 || x == 1024 || x == 2048 || x == 4096 || x == 8192 || x == 16384;
};

Texture.getTexInfo = function (tex)
{
    const obj = {};

    obj.name = tex.name;
    obj["power of two"] = tex.isPowerOfTwo();
    obj.size = tex.width + " x " + tex.height;

    let targetString = tex.texTarget;
    if (tex.texTarget == tex._cgl.gl.TEXTURE_2D) targetString = "TEXTURE_2D";
    obj.target = targetString;

    obj.unpackAlpha = tex.unpackAlpha;

    if (tex.cubemap)obj.cubemap = true;

    if (tex.textureType == Texture.TYPE_FLOAT) obj.textureType = "TYPE_FLOAT";
    if (tex.textureType == Texture.TYPE_HALF_FLOAT) obj.textureType = "TYPE_HALF_FLOAT";
    else if (tex.textureType == Texture.TYPE_DEPTH) obj.textureType = "TYPE_DEPTH";
    else if (tex.textureType == Texture.TYPE_DEFAULT) obj.textureType = "TYPE_DEFAULT";
    else obj.textureType = "UNKNOWN " + this.textureType;

    if (tex.wrap == Texture.WRAP_CLAMP_TO_EDGE) obj.wrap = "CLAMP_TO_EDGE";
    else if (tex.wrap == Texture.WRAP_REPEAT) obj.wrap = "WRAP_REPEAT";
    else if (tex.wrap == Texture.WRAP_MIRRORED_REPEAT) obj.wrap = "WRAP_MIRRORED_REPEAT";
    else obj.wrap = "UNKNOWN";

    if (tex.filter == Texture.FILTER_NEAREST) obj.filter = "FILTER_NEAREST";
    else if (tex.filter == Texture.FILTER_LINEAR) obj.filter = "FILTER_LINEAR";
    else if (tex.filter == Texture.FILTER_MIPMAP) obj.filter = "FILTER_MIPMAP";
    else obj.filter = "UNKNOWN";

    obj.pixelFormat = tex.pixelFormat || "unknown";

    return obj;
};


Texture.FILTER_NEAREST = 0;
Texture.FILTER_LINEAR = 1;
Texture.FILTER_MIPMAP = 2;

Texture.WRAP_REPEAT = 0;
Texture.WRAP_MIRRORED_REPEAT = 1;
Texture.WRAP_CLAMP_TO_EDGE = 2;

Texture.TYPE_DEFAULT = 0;
Texture.TYPE_DEPTH = 1;
Texture.TYPE_FLOAT = 2;


Texture.PFORMATSTR_RGB565 = "RGB 5/6/5bit ubyte";

Texture.PFORMATSTR_R8UB = "R 8bit ubyte";
Texture.PFORMATSTR_RG8UB = "RG 8bit ubyte";
Texture.PFORMATSTR_RGB8UB = "RGB 8bit ubyte";
Texture.PFORMATSTR_RGBA8UB = "RGBA 8bit ubyte";

Texture.PFORMATSTR_SRGBA8 = "SRGBA 8bit ubyte";

Texture.PFORMATSTR_R11FG11FB10F = "RGB 11/11/10bit float";

Texture.PFORMATSTR_R16F = "R 16bit float";
Texture.PFORMATSTR_RG16F = "RG 16bit float";
Texture.PFORMATSTR_RGB16F = "RGB 16bit float";
Texture.PFORMATSTR_RGBA16F = "RGBA 16bit float";


Texture.PFORMATSTR_R32F = "R 32bit float";
Texture.PFORMATSTR_RG32F = "RG 32bit float";
Texture.PFORMATSTR_RGB32F = "RGB 32bit float";
Texture.PFORMATSTR_RGBA32F = "RGBA 32bit float";

Texture.PFORMATSTR_DEPTH = "DEPTH";


Texture.PIXELFORMATS = [

    Texture.PFORMATSTR_RGB565,

    Texture.PFORMATSTR_R8UB,
    Texture.PFORMATSTR_RG8UB,
    Texture.PFORMATSTR_RGB8UB,
    Texture.PFORMATSTR_RGBA8UB,

    Texture.PFORMATSTR_SRGBA8,

    Texture.PFORMATSTR_R11FG11FB10F,
    Texture.PFORMATSTR_R16F,
    Texture.PFORMATSTR_RG16F,
    Texture.PFORMATSTR_RGBA16F,

    Texture.PFORMATSTR_R32F,
    Texture.PFORMATSTR_RGBA32F

];

Texture.isPixelFormatFloat =
    (pxlfrmt) =>
    {
        return (pxlfrmt || "").contains("float");
    };

Texture.isPixelFormatHalfFloat =
    (pxlfrmt) =>
    {
        return (pxlfrmt || "").contains("float") && (pxlfrmt || "").contains("16bit");
    };







/***/ }),

/***/ "./src/core/cgl/cgl_textureeffect.js":
/*!*******************************************!*\
  !*** ./src/core/cgl/cgl_textureeffect.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextureEffect": () => (/* binding */ TextureEffect)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgl_texture.js */ "./src/core/cgl/cgl_texture.js");
/* harmony import */ var _cgl_simplerect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgl_simplerect.js */ "./src/core/cgl/cgl_simplerect.js");




const TextureEffect = function (cgl, options)
{
    this._cgl = cgl;
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgl_TextureEffect");

    if (!cgl.TextureEffectMesh) this.createMesh();

    this._textureSource = null;
    this._options = options;
    this.name = options.name || "unknown";

    // TODO: do we still need the options ?
    // var opts=options ||
    //     {
    //         isFloatingPointTexture:false,
    //         filter:CGL.Texture.FILTER_LINEAR
    //     };
    // if(options && options.fp)opts.isFloatingPointTexture=true;

    this.imgCompVer = 0;
    this.aspectRatio = 1;
    this._textureTarget = null; // new CGL.Texture(this._cgl,opts);
    this._frameBuf = this._cgl.gl.createFramebuffer();
    this._frameBuf2 = this._cgl.gl.createFramebuffer();
    this._renderbuffer = this._cgl.gl.createRenderbuffer();
    this._renderbuffer2 = this._cgl.gl.createRenderbuffer();
    this.switched = false;
    this.depth = false;
};

TextureEffect.prototype.dispose = function ()
{
    if (this._renderbuffer) this._cgl.gl.deleteRenderbuffer(this._renderbuffer);
    if (this._frameBuf) this._cgl.gl.deleteFramebuffer(this._frameBuf);
    if (this._renderbuffer2) this._cgl.gl.deleteRenderbuffer(this._renderbuffer2);
    if (this._frameBuf2) this._cgl.gl.deleteFramebuffer(this._frameBuf2);
};

TextureEffect.prototype.getWidth = function ()
{
    return this._textureSource.width;
};

TextureEffect.prototype.getHeight = function ()
{
    return this._textureSource.height;
};

TextureEffect.prototype.setSourceTexture = function (tex)
{
    if (tex === null)
    {
        this._textureSource = new _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture(this._cgl);
        this._textureSource.setSize(16, 16);
    }
    else
    {
        this._textureSource = tex;
    }

    if (!this._textureSource.compareSettings(this._textureTarget))
    {
        if (this._textureTarget) this._textureTarget.delete();

        this._textureTarget = this._textureSource.clone();

        this._cgl.profileData.profileEffectBuffercreate++;

        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf);

        this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer);

        // if(tex.textureType==CGL.Texture.TYPE_FLOAT) this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER,this._cgl.gl.RGBA32F, this._textureSource.width,this._textureSource.height);
        // else this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER,this._cgl.gl.RGBA8, this._textureSource.width,this._textureSource.height);

        if (this.depth) this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height);
        this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureTarget.tex, 0);
        if (this.depth) this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer);

        // this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureTarget.tex, 0);

        this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null);
        this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null);
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null);

        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2);

        this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer2);

        // if(tex.textureType==CGL.Texture.TYPE_FLOAT) this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER,this._cgl.gl.RGBA32F, this._textureSource.width,this._textureSource.height);
        // else this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER,this._cgl.gl.RGBA8, this._textureSource.width,this._textureSource.height);

        if (this.depth) this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height);
        this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureSource.tex, 0);

        if (this.depth) this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer2);

        // this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureSource.tex, 0);

        this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null);
        this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null);
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null);
    }

    this.aspectRatio = this._textureSource.width / this._textureSource.height;
};
TextureEffect.prototype.continueEffect = function ()
{
    this._cgl.pushDepthTest(false);
    this._cgl.pushModelMatrix();
    this._cgl.pushPMatrix();
    // todo why two pushs?



    this._cgl.pushViewPort(0, 0, this.getCurrentTargetTexture().width, this.getCurrentTargetTexture().height);



    mat4.perspective(this._cgl.pMatrix, 45, this.getCurrentTargetTexture().width / this.getCurrentTargetTexture().height, 0.1, 1100.0); // todo: why?

    this._cgl.pushPMatrix();
    mat4.identity(this._cgl.pMatrix);

    this._cgl.pushViewMatrix();
    mat4.identity(this._cgl.vMatrix);

    this._cgl.pushModelMatrix();
    mat4.identity(this._cgl.mMatrix);
};


TextureEffect.prototype.startEffect = function (bgTex)
{
    if (!this._textureTarget)
    {
        this._log.warn("effect has no target");
        return;
    }

    this.switched = false;

    this.continueEffect();

    if (bgTex)
    {
        this._bgTex = bgTex;
    }
    this._countEffects = 0;
};

TextureEffect.prototype.endEffect = function ()
{
    this._cgl.popDepthTest();
    this._cgl.popModelMatrix();

    this._cgl.popPMatrix();
    this._cgl.popModelMatrix();
    this._cgl.popViewMatrix();

    this._cgl.popPMatrix();
    this._cgl.popViewPort();
};

TextureEffect.prototype.bind = function ()
{
    if (this._textureSource === null)
    {
        this._log.warn("no base texture set!");
        return;
    }

    if (!this.switched)
    {
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf);
        this._cgl.pushGlFrameBuffer(this._frameBuf);
    }
    else
    {
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2);
        this._cgl.pushGlFrameBuffer(this._frameBuf2);
    }
};

TextureEffect.prototype.finish = function ()
{
    if (this._textureSource === null)
    {
        this._log.warn("no base texture set!");
        return;
    }

    this._cgl.TextureEffectMesh.render(this._cgl.getShader());

    this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer());

    this._cgl.profileData.profileTextureEffect++;

    if (this._textureTarget.filter == _cgl_texture_js__WEBPACK_IMPORTED_MODULE_1__.Texture.FILTER_MIPMAP)
    {
        if (!this.switched)
        {
            this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureTarget.tex);
            this._textureTarget.updateMipMap();
        }
        else
        {
            this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureSource.tex);
            this._textureSource.updateMipMap();
        }

        this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null);
    }

    this.switched = !this.switched;
    this._countEffects++;
};

TextureEffect.prototype.getCurrentTargetTexture = function ()
{
    if (this.switched) return this._textureSource;
    return this._textureTarget;
};

TextureEffect.prototype.getCurrentSourceTexture = function ()
{
    if (this._countEffects == 0 && this._bgTex) return this._bgTex;

    if (this.switched) return this._textureTarget;
    return this._textureSource;
};

TextureEffect.prototype.delete = function ()
{
    if (this._textureTarget) this._textureTarget.delete();
    if (this._textureSource) this._textureSource.delete();
    this._cgl.gl.deleteRenderbuffer(this._renderbuffer);
    this._cgl.gl.deleteFramebuffer(this._frameBuf);
};

TextureEffect.prototype.createMesh = function ()
{
    this._cgl.TextureEffectMesh = _cgl_simplerect_js__WEBPACK_IMPORTED_MODULE_2__.MESHES.getSimpleRect(this._cgl, "texEffectRect");
};

// ---------------------------------------------------------------------------------

TextureEffect.checkOpNotInTextureEffect = function (op)
{
    if (!op.patch.cgl) return true;
    if (op.uiAttribs.error && !op.patch.cgl.currentTextureEffect)
    {
        op.setUiError("textureeffect", null);
        return true;
    }
    if (!op.patch.cgl.currentTextureEffect) return true;

    if (op.patch.cgl.currentTextureEffect && !op.uiAttribs.error)
    {
        op.setUiError("textureeffect", "This op can not be a child of a ImageCompose/texture effect! imagecompose should only have textureeffect childs.", 0);
        return false;
    }

    if (op.patch.cgl.currentTextureEffect) return false;
    return true;
};

TextureEffect.checkOpInEffect = function (op, minver)
{
    minver = minver || 0;

    if (op.patch.cgl.currentTextureEffect)
    {
        if (op.uiAttribs.uierrors && op.patch.cgl.currentTextureEffect.imgCompVer >= minver)
        {
            op.setUiError("texeffect", null);
            return true;
        }

        if (minver && op.patch.cgl.currentTextureEffect.imgCompVer < minver)
        {
            op.setUiError("texeffect", "This op must be a child of an ImageCompose op with version >=" + minver + " <span class=\"button-small\" onclick=\"gui.patchView.downGradeOp('" + op.id + "','" + op.name + "')\">Downgrade</span> to previous version", 1);
        }
    }

    if (op.patch.cgl.currentTextureEffect) return true;

    if (!op.patch.cgl.currentTextureEffect && (!op.uiAttribs.uierrors || op.uiAttribs.uierrors.length == 0))
    {
        op.setUiError("texeffect", "This op must be a child of an ImageCompose op! More infos <a href=\"https://docs.cables.gl/image_composition/image_composition.html\" target=\"_blank\">here</a>. ", 1);
        return false;
    }

    if (!op.patch.cgl.currentTextureEffect) return false;
    return true;
};

TextureEffect.getBlendCode = function (ver)
{
    let src = "".endl()
        + "vec3 _blend(vec3 base,vec3 blend)".endl()
        + "{".endl()
        + "   vec3 colNew=blend;".endl()
        + "   #ifdef BM_MULTIPLY".endl()
        + "       colNew=base*blend;".endl()
        + "   #endif".endl()
        + "   #ifdef BM_MULTIPLY_INV".endl()
        + "       colNew=base* vec3(1.0)-blend;".endl()
        + "   #endif".endl()
        + "   #ifdef BM_AVERAGE".endl()
        + "       colNew=((base + blend) / 2.0);".endl()
        + "   #endif".endl()
        + "   #ifdef BM_ADD".endl()
        + "       colNew=min(base + blend, vec3(1.0));".endl()
        + "   #endif".endl()
        + "   #ifdef BM_SUBTRACT_ONE".endl()
        + "       colNew=max(base + blend - vec3(1.0), vec3(0.0));".endl()
        + "   #endif".endl()

        + "   #ifdef BM_SUBTRACT".endl()
        + "       colNew=base - blend;".endl()
        + "   #endif".endl()

        + "   #ifdef BM_DIFFERENCE".endl()
        + "       colNew=abs(base - blend);".endl()
        + "   #endif".endl()
        + "   #ifdef BM_NEGATION".endl()
        + "       colNew=(vec3(1.0) - abs(vec3(1.0) - base - blend));".endl()
        + "   #endif".endl()
        + "   #ifdef BM_EXCLUSION".endl()
        + "       colNew=(base + blend - 2.0 * base * blend);".endl()
        + "   #endif".endl()
        + "   #ifdef BM_LIGHTEN".endl()
        + "       colNew=max(blend, base);".endl()
        + "   #endif".endl()
        + "   #ifdef BM_DARKEN".endl()
        + "       colNew=min(blend, base);".endl()
        + "   #endif".endl()
        + "   #ifdef BM_OVERLAY".endl()
        + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))"
            // .endl()+'       #define BlendOverlay(base, blend)       Blend(base, blend, BlendOverlayf)'
            //    .endl()+'      colNew=Blend(base, blend, BlendOverlayf);'
            .endl()
        + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl()
        + "   #endif".endl()
        + "   #ifdef BM_SCREEN".endl()
        + "      #define BlendScreenf(base, blend)       (1.0 - ((1.0 - base) * (1.0 - blend)))"
            // .endl()+'       #define BlendScreen(base, blend)        Blend(base, blend, BlendScreenf)'
            // .endl()+'      colNew=Blend(base, blend, BlendScreenf);'
            .endl()
        + "      colNew=vec3(BlendScreenf(base.r, blend.r),BlendScreenf(base.g, blend.g),BlendScreenf(base.b, blend.b));".endl()
        + "   #endif".endl()
        + "   #ifdef BM_SOFTLIGHT".endl()
        + "      #define BlendSoftLightf(base, blend)    ((blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend)))"
            // .endl()+'       #define BlendSoftLight(base, blend)     Blend(base, blend, BlendSoftLightf)'
            //    .endl()+'      colNew=Blend(base, blend, BlendSoftLightf);'
            .endl()
        + "      colNew=vec3(BlendSoftLightf(base.r, blend.r),BlendSoftLightf(base.g, blend.g),BlendSoftLightf(base.b, blend.b));".endl()
        + "   #endif".endl()
        + "   #ifdef BM_HARDLIGHT".endl()
        + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))"
            // .endl()+'       #define BlendOverlay(base, blend)       Blend(base, blend, BlendOverlayf)'
            // .endl()+'      colNew=Blend(blend, base, BlendOverlayf);'
            .endl()
        + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl()
        + "   #endif".endl()
        + "   #ifdef BM_COLORDODGE".endl()
        + "      #define BlendColorDodgef(base, blend)   ((blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0))"
            // .endl()+'      colNew=Blend(base, blend, BlendColorDodgef);'
            .endl()
        + "      colNew=vec3(BlendColorDodgef(base.r, blend.r),BlendColorDodgef(base.g, blend.g),BlendColorDodgef(base.b, blend.b));".endl()
        + "   #endif".endl()
        + "   #ifdef BM_COLORBURN".endl()
        + "      #define BlendColorBurnf(base, blend)    ((blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0))"
            // .endl()+'      colNew=Blend(base, blend, BlendColorBurnf);'
            .endl()
        + "      colNew=vec3(BlendColorBurnf(base.r, blend.r),BlendColorBurnf(base.g, blend.g),BlendColorBurnf(base.b, blend.b));".endl()
        + "   #endif".endl()










        + "   return colNew;".endl()
        + "}".endl();

    if (!ver)
        src += "vec4 cgl_blend(vec4 oldColor,vec4 newColor,float amount)".endl()
                + "{".endl()
                    + "vec4 col=vec4( _blend(oldColor.rgb,newColor.rgb) ,1.0);".endl()
                    + "col=vec4( mix( col.rgb, oldColor.rgb ,1.0-oldColor.a*amount),1.0);".endl()
                    + "return col;".endl()
                + "}".endl();

    if (ver >= 3)
        src += "vec4 cgl_blendPixel(vec4 base,vec4 col,float amount)".endl() +
                "{".endl() +

                "#ifdef BM_MATH_ADD".endl() +
                "   return vec4(base.rgb+col.rgb*amount,1.0);".endl() +
                "#endif".endl() +

                "#ifdef BM_MATH_SUB".endl() +
                "   return vec4(base.rgb-col.rgb*amount,1.0);".endl() +
                "#endif".endl() +

                "#ifdef BM_MATH_MUL".endl() +
                "   return vec4(base.rgb*col.rgb*amount,1.0);".endl() +
                "#endif".endl() +

                "#ifdef BM_MATH_DIV".endl() +
                "   return vec4(base.rgb/col.rgb*amount,1.0);".endl() +
                "#endif".endl() +


                    "#ifndef BM_MATH".endl() +
                        "vec3 colNew=_blend(base.rgb,col.rgb);".endl() +

                        "float newA=clamp(base.a+(col.a*amount),0.,1.);".endl() +

                        "#ifdef BM_ALPHAMASKED".endl() +
                            "newA=base.a;".endl() +
                        "#endif".endl() +

                        "return vec4(".endl() +
                            "mix(colNew,base.rgb,1.0-(amount*col.a)),".endl() +
                            "newA);".endl() +

                    "#endif".endl() +
    "}".endl();

    return src;
};

TextureEffect.onChangeBlendSelect = function (shader, blendName, maskAlpha = false)
{
    blendName = String(blendName);
    shader.toggleDefine("BM_NORMAL", blendName == "normal");
    shader.toggleDefine("BM_MULTIPLY", blendName == "multiply");
    shader.toggleDefine("BM_MULTIPLY_INV", blendName == "multiply invert");
    shader.toggleDefine("BM_AVERAGE", blendName == "average");
    shader.toggleDefine("BM_ADD", blendName == "add");
    shader.toggleDefine("BM_SUBTRACT_ONE", blendName == "subtract one");
    shader.toggleDefine("BM_SUBTRACT", blendName == "subtract");
    shader.toggleDefine("BM_DIFFERENCE", blendName == "difference");
    shader.toggleDefine("BM_NEGATION", blendName == "negation");
    shader.toggleDefine("BM_EXCLUSION", blendName == "exclusion");
    shader.toggleDefine("BM_LIGHTEN", blendName == "lighten");
    shader.toggleDefine("BM_DARKEN", blendName == "darken");
    shader.toggleDefine("BM_OVERLAY", blendName == "overlay");
    shader.toggleDefine("BM_SCREEN", blendName == "screen");
    shader.toggleDefine("BM_SOFTLIGHT", blendName == "softlight");
    shader.toggleDefine("BM_HARDLIGHT", blendName == "hardlight");
    shader.toggleDefine("BM_COLORDODGE", blendName == "color dodge");
    shader.toggleDefine("BM_COLORBURN", blendName == "color burn");

    shader.toggleDefine("BM_MATH_ADD", blendName == "Math Add");
    shader.toggleDefine("BM_MATH_SUB", blendName == "Math Subtract");
    shader.toggleDefine("BM_MATH_MUL", blendName == "Math Multiply");
    shader.toggleDefine("BM_MATH_DIV", blendName == "Math Divide");

    shader.toggleDefine("BM_MATH", blendName.indexOf("Math ") == 0);


    shader.toggleDefine("BM_ALPHAMASKED", maskAlpha);
};

TextureEffect.AddBlendSelect = function (op, name, defaultMode)
{
    const p = op.inValueSelect(name || "Blend Mode", [
        "normal", "lighten", "darken", "multiply", "multiply invert", "average", "add", "subtract", "difference", "negation", "exclusion", "overlay", "screen", "color dodge", "color burn", "softlight", "hardlight", "subtract one",
        "Math Add",
        "Math Subtract",
        "Math Multiply",
        "Math Divide",

    ], defaultMode || "normal");
    return p;
};

TextureEffect.AddBlendAlphaMask = function (op, name, defaultMode)
{
    const p = op.inSwitch(name || "Alpha Mask", ["Off", "On"], defaultMode || "Off");
    return p;
};

TextureEffect.setupBlending = function (op, shader, blendPort, amountPort, alphaMaskPort)
{
    const onChange = () =>
    {
        let maskAlpha = false;
        if (alphaMaskPort) maskAlpha = alphaMaskPort.get() == "On";
        TextureEffect.onChangeBlendSelect(shader, blendPort.get(), maskAlpha);

        let str = blendPort.get();
        if (str == "normal") str = null;
        else if (str == "multiply") str = "mul";
        else if (str == "multiply invert") str = "mulinv";
        else if (str == "lighten") str = "light";
        else if (str == "darken") str = "darken";
        else if (str == "average") str = "avg";
        else if (str == "subtract one") str = "sub one";
        else if (str == "subtract") str = "sub";
        else if (str == "difference") str = "diff";
        else if (str == "negation") str = "neg";
        else if (str == "exclusion") str = "exc";
        else if (str == "overlay") str = "ovl";
        else if (str == "color dodge") str = "dodge";
        else if (str == "color burn") str = "burn";
        else if (str == "softlight") str = "soft";
        else if (str == "hardlight") str = "hard";
        else if (str == "Math Add") str = "+";
        else if (str == "Math Subtract") str = "-";
        else if (str == "Math Multiply") str = "*";
        else if (str == "Math Divide") str = "/";

        op.setUiAttrib({ "extendTitle": str });
    };
    op.setPortGroup("Blending", [blendPort, amountPort, alphaMaskPort]);

    let maskAlpha = false;

    blendPort.onChange = onChange;
    if (alphaMaskPort)
    {
        alphaMaskPort.onChange = onChange;
        maskAlpha = alphaMaskPort.get() == "On";
    }

    TextureEffect.onChangeBlendSelect(shader, blendPort.get(), maskAlpha);
};




/***/ }),

/***/ "./src/core/cgl/cgl_unicolorshader.js":
/*!********************************************!*\
  !*** ./src/core/cgl/cgl_unicolorshader.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniColorShader": () => (/* binding */ UniColorShader)
/* harmony export */ });


class UniColorShader
{
    constructor(_cgl)
    {
        this.shader = new CGL.Shader(_cgl, "markermaterial");

        const frag = ""
            .endl() + "void main()"
            .endl() + "{"
            .endl() + "    outColor = vec4(color.rgb,1.0);"
            .endl() + "}";


        const vert = ""
            .endl() + "IN vec3 vPosition;"
            .endl() + "UNI mat4 projMatrix;"
            .endl() + "UNI mat4 mvMatrix;"

            .endl() + "void main()"
            .endl() + "{"
            .endl() + "   gl_Position = projMatrix * mvMatrix * vec4(vPosition,1.0);"
            .endl() + "}";

        this.shader.setSource(vert, frag);
        this.coloruni = this.shader.addUniformFrag("4f", "color", [1, 0.777, 1, 1]);
    }

    setColor(r, g, b, a)
    {
        this.coloruni.set(r, g, b, a);
    }
}


/***/ }),

/***/ "./src/core/cgl/cgl_utils.js":
/*!***********************************!*\
  !*** ./src/core/cgl/cgl_utils.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "escapeHTML": () => (/* binding */ escapeHTML),
/* harmony export */   "getWheelDelta": () => (/* binding */ getWheelDelta),
/* harmony export */   "getWheelSpeed": () => (/* binding */ getWheelSpeed),
/* harmony export */   "isWindows": () => (/* binding */ isWindows),
/* harmony export */   "onLoadingAssetsFinished": () => (/* binding */ onLoadingAssetsFinished)
/* harmony export */ });
/* unused harmony exports DEG2RAD, RAD2DEG */
/** @namespace CGL */

/**
 * multiply to get radians from degree, e.g. `360 * CGL.DEG2RAD`
 * @const {Number}
 * @memberof CGL
 * @static
 */
const DEG2RAD = Math.PI / 180.0;

/**
 * to get degrees from radians, e.g. `3.14 * CGL.RAD2DEG`
 * @const {number}
 * @memberof CGL
 */
const RAD2DEG = 180.0 / Math.PI;

const onLoadingAssetsFinished = null; // deprecated / remove later

/**
 * get normalized mouse wheel delta (including browser specific adjustment)
 * @function getWheelDelta
 * @static
 * @memberof CGL
 * @param {MouseEvent} event
 * @return {Number} normalized delta
 */
const isWindows = window.navigator.userAgent.contains("Windows");
const getWheelDelta_ = function (event)
{
    let normalized;
    if (event.wheelDelta)
    {
        // chrome
        normalized = (event.wheelDelta % 120) - 0 == -0 ? event.wheelDelta / 120 : event.wheelDelta / 30;
        normalized *= -1.5;
        if (isWindows) normalized *= 2;
    }
    else
    {
        // firefox
        let d = event.deltaY;
        if (event.shiftKey) d = event.deltaX;
        const rawAmmount = d || event.detail;
        normalized = -(rawAmmount % 3 ? rawAmmount * 10 : rawAmmount / 3);
        normalized *= -3;
    }

    if (normalized > 20) normalized = 20;
    if (normalized < -20) normalized = -20;

    return normalized;
};

const getWheelSpeed = getWheelDelta_;
const getWheelDelta = getWheelDelta_;

// from https://github.com/lodash/lodash/blob/master/escape.js

const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
};

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/*  eslint-disable */
const escapeHTML = function(string)
{
    return string && reHasUnescapedHtml.test(string) ?
        string.replace(reUnescapedHtml, function(chr) { return htmlEscapes[chr]; })
        : string || "";
}
/* eslint-enable */


/***/ }),

/***/ "./src/core/cgl/constants.js":
/*!***********************************!*\
  !*** ./src/core/cgl/constants.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONSTANTS": () => (/* binding */ CONSTANTS)
/* harmony export */ });
const SHADER = {
    // default attributes
    "SHADERVAR_VERTEX_POSITION": "vPosition",
    "SHADERVAR_VERTEX_NUMBER": "attrVertIndex",
    "SHADERVAR_VERTEX_NORMAL": "attrVertNormal",
    "SHADERVAR_VERTEX_TEXCOORD": "attrTexCoord",
    "SHADERVAR_INSTANCE_MMATRIX": "instMat",
    "SHADERVAR_VERTEX_COLOR": "attrVertColor",

    "SHADERVAR_INSTANCE_INDEX": "instanceIndex",

    // default uniforms
    "SHADERVAR_UNI_PROJMAT": "projMatrix",
    "SHADERVAR_UNI_VIEWMAT": "viewMatrix",
    "SHADERVAR_UNI_MODELMAT": "modelMatrix",
    "SHADERVAR_UNI_NORMALMAT": "normalMatrix",
    "SHADERVAR_UNI_INVVIEWMAT": "inverseViewMatrix",
    "SHADERVAR_UNI_INVPROJMAT": "invProjMatrix",
    "SHADERVAR_UNI_MATERIALID": "materialId",
    "SHADERVAR_UNI_OBJECTID": "objectId",

    "SHADERVAR_UNI_VIEWPOS": "camPos",
};


const BLEND_MODES = {
    "BLEND_NONE": 0,
    "BLEND_NORMAL": 1,
    "BLEND_ADD": 2,
    "BLEND_SUB": 3,
    "BLEND_MUL": 4,
};





const RAD2DEG = 180.0 / Math.PI;
const DEG2RAD = Math.PI / 180.0;

const CONSTANTS = {
    "MATH": {
        "DEG2RAD": DEG2RAD,
        "RAD2DEG": RAD2DEG,
    },
    "SHADER": SHADER,
    "BLEND_MODES": BLEND_MODES,
};





/***/ }),

/***/ "./src/core/cgl/index.js":
/*!*******************************!*\
  !*** ./src/core/cgl/index.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CGL": () => (/* binding */ CGL)
/* harmony export */ });
/* harmony import */ var _cgl_framebuffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cgl_framebuffer.js */ "./src/core/cgl/cgl_framebuffer.js");
/* harmony import */ var _cgl_framebuffer2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgl_framebuffer2.js */ "./src/core/cgl/cgl_framebuffer2.js");
/* harmony import */ var _cgl_marker_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cgl_marker.js */ "./src/core/cgl/cgl_marker.js");
/* harmony import */ var _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cgl_mesh.js */ "./src/core/cgl/cgl_mesh.js");
/* harmony import */ var _cgl_shader_uniform_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cgl_shader_uniform.js */ "./src/core/cgl/cgl_shader_uniform.js");
/* harmony import */ var _cgl_shader_lib_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cgl_shader_lib.js */ "./src/core/cgl/cgl_shader_lib.js");
/* harmony import */ var _cgl_unicolorshader_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cgl_unicolorshader.js */ "./src/core/cgl/cgl_unicolorshader.js");
/* harmony import */ var _cgl_shader_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cgl_shader.js */ "./src/core/cgl/cgl_shader.js");
/* harmony import */ var _cgl_simplerect_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cgl_simplerect.js */ "./src/core/cgl/cgl_simplerect.js");
/* harmony import */ var _cgl_state_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./cgl_state.js */ "./src/core/cgl/cgl_state.js");
/* harmony import */ var _cgl_utils_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cgl_utils.js */ "./src/core/cgl/cgl_utils.js");
/* harmony import */ var _cgl_texture_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cgl_texture.js */ "./src/core/cgl/cgl_texture.js");
/* harmony import */ var _cgl_textureeffect_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cgl_textureeffect.js */ "./src/core/cgl/cgl_textureeffect.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./constants.js */ "./src/core/cgl/constants.js");
/* harmony import */ var _cgl_profiledata_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./cgl_profiledata.js */ "./src/core/cgl/cgl_profiledata.js");
/* harmony import */ var _cg_cg_matrixstack_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cg/cg_matrixstack.js */ "./src/core/cg/cg_matrixstack.js");
/* harmony import */ var _cg_cg_geom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cg/cg_geom.js */ "./src/core/cg/cg_geom.js");
/* harmony import */ var _cg_cg_boundingbox_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cg/cg_boundingbox.js */ "./src/core/cg/cg_boundingbox.js");






















const CGL = {
    "Framebuffer": _cgl_framebuffer_js__WEBPACK_IMPORTED_MODULE_0__.Framebuffer,
    "Framebuffer2": _cgl_framebuffer2_js__WEBPACK_IMPORTED_MODULE_1__.Framebuffer2,
    "Geometry": _cg_cg_geom_js__WEBPACK_IMPORTED_MODULE_2__.Geometry,
    "BoundingBox": _cg_cg_boundingbox_js__WEBPACK_IMPORTED_MODULE_3__.BoundingBox,
    "Marker": _cgl_marker_js__WEBPACK_IMPORTED_MODULE_4__.Marker,
    "WirePoint": _cgl_marker_js__WEBPACK_IMPORTED_MODULE_4__.WirePoint,
    "WireCube": _cgl_marker_js__WEBPACK_IMPORTED_MODULE_4__.WireCube,
    "MatrixStack": _cg_cg_matrixstack_js__WEBPACK_IMPORTED_MODULE_5__.MatrixStack,
    "Mesh": _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_6__.Mesh,
    "MESH": _cgl_mesh_js__WEBPACK_IMPORTED_MODULE_6__.MESH,
    "ShaderLibMods": _cgl_shader_lib_js__WEBPACK_IMPORTED_MODULE_7__.ShaderLibMods,
    "Shader": _cgl_shader_js__WEBPACK_IMPORTED_MODULE_8__.Shader,
    "Uniform": _cgl_shader_uniform_js__WEBPACK_IMPORTED_MODULE_9__.Uniform,
    "MESHES": _cgl_simplerect_js__WEBPACK_IMPORTED_MODULE_10__.MESHES,
    "Context": _cgl_state_js__WEBPACK_IMPORTED_MODULE_11__.Context,
    "Texture": _cgl_texture_js__WEBPACK_IMPORTED_MODULE_12__.Texture,
    "TextureEffect": _cgl_textureeffect_js__WEBPACK_IMPORTED_MODULE_13__.TextureEffect,
    "isWindows": _cgl_utils_js__WEBPACK_IMPORTED_MODULE_14__.isWindows,
    "getWheelSpeed": _cgl_utils_js__WEBPACK_IMPORTED_MODULE_14__.getWheelSpeed,
    "getWheelDelta": _cgl_utils_js__WEBPACK_IMPORTED_MODULE_14__.getWheelDelta,
    "onLoadingAssetsFinished": _cgl_utils_js__WEBPACK_IMPORTED_MODULE_14__.onLoadingAssetsFinished,
    "ProfileData": _cgl_profiledata_js__WEBPACK_IMPORTED_MODULE_15__.ProfileData,
    "UniColorShader": _cgl_unicolorshader_js__WEBPACK_IMPORTED_MODULE_16__.UniColorShader,
    ..._constants_js__WEBPACK_IMPORTED_MODULE_17__.CONSTANTS.BLEND_MODES,
    ..._constants_js__WEBPACK_IMPORTED_MODULE_17__.CONSTANTS.SHADER,
    ..._constants_js__WEBPACK_IMPORTED_MODULE_17__.CONSTANTS.MATH,
    ..._constants_js__WEBPACK_IMPORTED_MODULE_17__.CONSTANTS.BLEND_MODES,
};

window.CGL = CGL;






/***/ }),

/***/ "./src/core/cgp/cgp_mesh.js":
/*!**********************************!*\
  !*** ./src/core/cgp/cgp_mesh.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mesh)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _cgp_pipeline_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgp_pipeline.js */ "./src/core/cgp/cgp_pipeline.js");



class Mesh
{
    constructor(_cgp, __geom)
    {
        this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgl_mesh");
        this._cgp = _cgp;
        this._geom = null;
        this.numIndex = 0;

        this._pipe = new _cgp_pipeline_js__WEBPACK_IMPORTED_MODULE_1__["default"](this._cgp);

        this._numNonIndexed = 0;
        this._positionBuffer = null;
        this._bufVerticesIndizes = null;
        this._attributes = [];

        this._needsPipelineUpdate = false;

        if (__geom) this.setGeom(__geom);
    }

    _createBuffer(device, data, usage)
    {
        const buffer = device.createBuffer({
            "size": data.byteLength,
            "usage": usage,
            "mappedAtCreation": true,
        });
        const dst = new data.constructor(buffer.getMappedRange());
        dst.set(data);
        buffer.unmap();
        return buffer;
    }

    /**
     * @function setGeom
     * @memberof Mesh
     * @instance
     * @description set geometry for mesh
     * @param {Geometry} geometry
     */
    setGeom(geom, removeRef)
    {
        this._needsPipelineUpdate = true;
        this._geom = geom;
        this._disposeAttributes();

        this._positionBuffer = this._createBuffer(this._cgp.device, new Float32Array(geom.vertices), GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);

        let vi = geom.verticesIndices;
        if (!geom.isIndexed()) vi = Array.from(Array(geom.vertices.length / 3).keys());
        this._numIndices = vi.length;
        this._indicesBuffer = this._createBuffer(this._cgp.device, new Uint32Array(vi), GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST);

        if (geom.texCoords && geom.texCoords.length) this.setAttribute("texCoords", geom.texCoords, 2);
        if (geom.vertexNormals && geom.vertexNormals.length) this.setAttribute("normals", geom.vertexNormals, 3);
    }


    _disposeAttributes()
    {
        this._needsPipelineUpdate = true;
        for (let i = 0; i < this._attributes.length; i++)
        {
            this._attributes[i].buffer.destroy();
        }
        this._attributes.length = 0;
    }

    dispose()
    {
        this._disposeAttributes();
    }

    /**
     * @function setAttribute
     * @description update attribute
     * @memberof Mesh
     * @instance
     * @param {String} attribute name
     * @param {Array} data
     * @param {Number} itemSize
     * @param {Object} options
     */
    setAttribute(name, array, itemSize, options)
    {
        if (!array)
        {
            this._log.error("mesh addAttribute - no array given! " + name);
            throw new Error();
        }

        for (let i = 0; i < this._attributes.length; i++)
        {
            const attr = this._attributes[i];
            if (attr.name == name)
            {
                // if (attr.numItems === numItems)
                // {
                // }
                // else
                // {
                //     // this._log.log("wrong buffer size", this._geom.name, attr.name, attr.numItems, numItems);
                //     this._resizeAttr(array, attr);
                // }
                // normalBuffer = this._createBuffer(this._cgp.device, new Float32Array(geom.vertexNormals), GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);

                // this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, attr.buffer);
                // this._bufferArray(array, attr);

                return attr;
            }
        }

        const buffer = this._createBuffer(this._cgp.device, new Float32Array(array), GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST);

        const attr = {
            "buffer": buffer,
            "name": name,
            // "cb": cb,
            // "itemSize": itemSize,
            // "numItems": numItems,
            // "startItem": 0,
            // "instanced": instanced,
            // "type": type
        };
        this._attributes.push(attr);

        return attr;
    }

    // setPipeline()
    // {

    //     this._cgp.passEncoder.setPipeline(this._pipe.getPiplelineObject(this._cgp.getShader(),this));


    // }

    render()
    {
        if (!this._positionBuffer) return;

        // this.setPipeline();

        const shader = this._cgp.getShader();
        if (shader)shader.bind();

        if (!this._cgp.getShader() || !this._cgp.getShader().isValid)
        {
            // console.log("invalid");
            return;
        }

        this._pipe.setPipeline(this._cgp.getShader(), this);

        if (!this._pipe.isValid)
        {
            // console.log("invalid");
            return;
        }


        this._cgp.passEncoder.setVertexBuffer(0, this._positionBuffer);
        for (let i = 0; i < this._attributes.length; i++)
        {
            this._cgp.passEncoder.setVertexBuffer(i + 1, this._attributes[i].buffer);
        }

        this._cgp.passEncoder.setIndexBuffer(this._indicesBuffer, "uint32");

        if (this._numNonIndexed)
            this._cgp.passEncoder.draw(this._numIndices);
        else
            this._cgp.passEncoder.drawIndexed(this._numIndices);

        // if (shader)shader.unbind();
    }
}


/***/ }),

/***/ "./src/core/cgp/cgp_pipeline.js":
/*!**************************************!*\
  !*** ./src/core/cgp/cgp_pipeline.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Pipeline)
/* harmony export */ });
/* harmony import */ var _cgp_uniformbuffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cgp_uniformbuffer.js */ "./src/core/cgp/cgp_uniformbuffer.js");



class Pipeline
{
    constructor(_cgp, _name)
    {
        if (!_cgp) throw new Error("Pipeline constructed without cgp " + _name);
        this._cgp = _cgp;
        this._isValid = true;

        this._pipeCfg = null;
        this._renderPipeline = null;

        this._fsUniformBuffer = null;
        this._vsUniformBuffer = null;

        this._old = {};


        this.DEPTH_COMPARE_FUNCS_STRINGS = [
            "never",
            "less",
            "equal",
            "lessequal",
            "greater",
            "notequal",
            "greaterequal",
            "always"];
    }

    get isValid() { return this._isValid; }

    setPipeline(shader, mesh)
    {
        if (!mesh || !shader)
        {
            console.log("pipeline unknown shader/mesh");
            return;
        }

        let needsRebuild =
            !this._renderPipeline ||
            !this._pipeCfg ||
            this._old.mesh != mesh ||
            this._old.shader != shader ||
            mesh.needsPipelineUpdate ||
            shader.needsPipelineUpdate;

        if (this._pipeCfg)
        {
            if (this._pipeCfg.depthStencil.depthWriteEnabled != this._cgp.stateDepthWrite())
            {
                needsRebuild = true;
                this._pipeCfg.depthStencil.depthWriteEnabled = this._cgp.stateDepthWrite();
            }

            if (this._cgp.stateDepthTest() === false)
            {
                if (this._pipeCfg.depthStencil.depthCompare != "never")
                {
                    this._pipeCfg.depthStencil.depthCompare = "never";
                    needsRebuild = true;
                }
            }
            else
            if (this._pipeCfg.depthStencil.depthCompare != this._cgp.stateDepthFunc())
            {
                needsRebuild = true;
                this._pipeCfg.depthStencil.depthCompare = this._cgp.stateDepthFunc();
            }


            if (this._cgp.stateCullFace() === false)
            {
                if (this._pipeCfg.primitive.cullMode != "none")
                {
                    needsRebuild = true;
                    this._pipeCfg.primitive.cullMode = "none";
                }
            }
            else
            {
                needsRebuild = true;
                this._pipeCfg.primitive.cullMode = this._cgp.stateCullFaceFacing();
            }
        }

        if (needsRebuild)
        {
            if (!this._pipeCfg || this._old.shader != shader) this._pipeCfg = this.getPiplelineObject(shader, mesh);

            this._old.shader = shader;
            this._old.mesh = mesh;


            // try
            // {
            this._renderPipeline = this._cgp.device.createRenderPipeline(this._pipeCfg);
            // }
            // catch (e)
            // {
            //     console.error(e.message);
            // }

            this._bindUniforms(shader);
        }

        if (this._renderPipeline && this._isValid)
        {
            mat4.copy(this._matModel, this._cgp.mMatrix);
            mat4.copy(this._matView, this._cgp.vMatrix);
            mat4.copy(this._matProj, this._cgp.pMatrix);

            this._cgp.device.queue.writeBuffer(
                this._vsUniformBuffer,
                0,
                this._vsUniformValues.buffer,
                this._vsUniformValues.byteOffset,
                this._vsUniformValues.byteLength
            );

            this._uniBufFrag.updateUniformValues();

            this._cgp.passEncoder.setPipeline(this._renderPipeline);
            this._cgp.passEncoder.setBindGroup(0, this._bindGroup);
            // this._pipeline = this._cgp.device.createRenderPipeline(this._pipeCfg);
        }
    }

    getPiplelineObject(shader, mesh)
    {
        const pipeCfg = {
            "layout": "auto",
            "vertex": {
                "module": shader.shaderModule,
                "entryPoint": "myVSMain",
                "buffers": [
                    // position
                    {
                        "arrayStride": 3 * 4, // 3 floats, 4 bytes each
                        "attributes": [
                            { "shaderLocation": 0, "offset": 0, "format": "float32x3" },
                        ],
                    },
                    // normals
                    {
                        "arrayStride": 3 * 4, // 3 floats, 4 bytes each
                        "attributes": [
                            { "shaderLocation": 1, "offset": 0, "format": "float32x3" },
                        ],
                    },
                    // texcoords
                    {
                        "arrayStride": 2 * 4, // 2 floats, 4 bytes each
                        "attributes": [
                            { "shaderLocation": 2, "offset": 0, "format": "float32x2", },
                        ],
                    },
                ],
            },
            "fragment": {
                "module": shader.shaderModule,
                "entryPoint": "myFSMain",
                "targets": [
                    { "format": this._cgp.presentationFormat },
                ],
            },
            "primitive": {
                "topology": "triangle-list",
                "cullMode": "back", // back/none/front

                // "point-list",
                // "line-list",
                // "line-strip",
                // "triangle-list",
                // "triangle-strip"
            },
            "depthStencil": {
                "depthWriteEnabled": true,
                "depthCompare": "less",
                "format": "depth24plus",
            },

        };

        return pipeCfg;
    }


    _bindUniforms(shader)
    {
        this._cgp.pushErrorScope();


        const counts = { };

        this._uniBufFrag = new _cgp_uniformbuffer_js__WEBPACK_IMPORTED_MODULE_0__["default"](shader, "frag");

        // for (let i = 0; i < shader.uniforms.length; i++)
        // {
        //     const uni = shader.uniforms[i];
        //     const type = uni.shaderType;
        //     counts[type] = counts[type] || 0;


        //     counts[type] += uni.getSizeBytes();
        // }
        // console.log(counts, counts.frag);


        const vUniformBufferSize = 3 * 16 * 4; // 2 mat4s * 16 floats per mat * 4 bytes per float
        // const fUniformBufferSize = counts.frag;// 2 * 3 * 4; // 1 vec3 * 3 floats per vec3 * 4 bytes per float

        this._vsUniformBuffer = this._cgp.device.createBuffer({
            "size": vUniformBufferSize,
            "usage": GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        // this._fsUniformBuffer = this._cgp.device.createBuffer({
        //     "size": fUniformBufferSize,
        //     "usage": GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        // });

        // this._fsUniformValues = new Float32Array(counts.frag / 4);

        this._vsUniformValues = new Float32Array(vUniformBufferSize / 4);

        this._matModel = this._vsUniformValues.subarray(0, 16);
        this._matView = this._vsUniformValues.subarray(16, 32);
        this._matProj = this._vsUniformValues.subarray(32, 48);


        // this._fsUniformValues[1] = 1.0;
        // this._fsUniformValues[0] = 1.0;
        // const lightDirection = this._fsUniformValues.subarray(0, 3);

        // console.log("pipeline bindgrouplayout ", pipeline.getBindGroupLayout(0));

        this._bindGroup = this._cgp.device.createBindGroup(
            {
                "layout": this._renderPipeline.getBindGroupLayout(0),
                "entries": [
                    { "binding": 0, "resource": { "buffer": this._vsUniformBuffer } },
                    { "binding": 1, "resource": { "buffer": this._uniBufFrag._gpuBuffer } }
                    //   { binding: 2, resource: sampler },
                    //   { binding: 3, resource: tex.createView() },
                ],
            });

        this._cgp.device.queue.writeBuffer(
            this._vsUniformBuffer,
            0,
            this._vsUniformValues.buffer,
            this._vsUniformValues.byteOffset,
            this._vsUniformValues.byteLength
        );

        this._uniBufFrag.updateUniformValues();
        this._cgp.popErrorScope("cgp_pipeline end", (e) =>
        {
            this._isValid = false;
        });
    }
}


/***/ }),

/***/ "./src/core/cgp/cgp_shader.js":
/*!************************************!*\
  !*** ./src/core/cgp/cgp_shader.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Shader)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/core/utils.js");
/* harmony import */ var _cgp_uniform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgp_uniform.js */ "./src/core/cgp/cgp_uniform.js");




class Shader
{
    constructor(_cgp, _name)
    {
        if (!_cgp) throw new Error("shader constructed without cgp " + _name);
        this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgp_shader");
        this._cgp = _cgp;
        this._name = _name;
        this._uniforms = [];

        if (!_name) this._log.stack("no shader name given");
        this._name = _name || "unknown";
        this.id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.simpleId)();
        this._isValid = true;
        this._compileReason = "";
        this.shaderModule = null;
        this._needsRecompile = true;

        this._src = "";
    }

    get isValid()
    {
        return this._isValid;
    }

    get uniforms()
    {
        return this._uniforms;
    }

    getName()
    {
        return this._name;
    }

    setWhyCompile(why)
    {
        this._compileReason = why;
    }

    setSource(src)
    {
        this._src = src;
        this.setWhyCompile("Source changed");
        this._needsRecompile = true;
    }

    compile()
    {
        this._isValid = true;
        console.log("compiling shader...", this._compileReason);
        this._cgp.pushErrorScope();
        this.shaderModule = this._cgp.device.createShaderModule({ "code": this._src });
        this._cgp.popErrorScope("cgp_shader " + this._name, this.error.bind(this));
        this._needsRecompile = false;
    }

    error(e)
    {
        this._isValid = false;
    }


    bind()
    {
        let sizes = {};
        for (let i = 0; i < this._uniforms.length; i++)
        {
            // console.log(this._uniforms[i]);
        }

        if (this._needsRecompile) this.compile();
    }

    /**
     * add a uniform to the fragment shader
     * @param {String} type ['f','t', etc]
     * @param {String} name
     * @param {any} value or port
     * @memberof Shader
     * @instance
     * @function addUniformFrag
     * @returns {Uniform}
     */
    addUniformFrag(type, name, valueOrPort, p2, p3, p4)
    {
        const uni = new _cgp_uniform_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, type, name, valueOrPort, p2, p3, p4);
        uni.shaderType = "frag";
        return uni;
    }

    /**
     * add a uniform to the vertex shader
     * @param {String} type ['f','t', etc]
     * @param {String} name
     * @param {any} value or port
     * @memberof Shader
     * @instance
     * @function addUniformVert
     * @returns {Uniform}
     */
    addUniformVert(type, name, valueOrPort, p2, p3, p4)
    {
        const uni = new _cgp_uniform_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, type, name, valueOrPort, p2, p3, p4);
        uni.shaderType = "vert";
        return uni;
    }

    /**
     * add a uniform to all shader programs
     * @param {String} type ['f','t', etc]
     * @param {String} name
     * @param {any} value or port
     * @memberof Shader
     * @instance
     * @function addUniform
     * @returns {Uniform}
     */
    addUniform(type, name, valueOrPort, p2, p3, p4)
    {
        const uni = new _cgp_uniform_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, type, name, valueOrPort, p2, p3, p4);
        uni.shaderType = "both";
        return uni;
    }


    _addUniform(uni)
    {
        this._uniforms.push(uni);
        this.setWhyCompile("add uniform " + name);
        this._needsRecompile = true;
    }
}


/***/ }),

/***/ "./src/core/cgp/cgp_state.js":
/*!***********************************!*\
  !*** ./src/core/cgp/cgp_state.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebGpuContext": () => (/* binding */ WebGpuContext)
/* harmony export */ });
/* harmony import */ var _cg_cg_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cg/cg_constants.js */ "./src/core/cg/cg_constants.js");
/* harmony import */ var _cg_cg_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cg/cg_state.js */ "./src/core/cg/cg_state.js");
/* harmony import */ var _cgp_shader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgp_shader.js */ "./src/core/cgp/cgp_shader.js");
/* harmony import */ var _cgl_shader_default_wgsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cgl_shader_default.wgsl */ "./src/core/cgp/cgl_shader_default.wgsl");





// https://github.com/greggman/webgpu-utils
// https://developer.chrome.com/blog/from-webgl-to-webgpu/
// https://gpuweb.github.io/gpuweb/explainer/


/**
 * cables webgpu context/state manager
 * @external CGP
 * @namespace Context
 * @class
 * @hideconstructor
 */
// const Context = function (_patch)
class WebGpuContext extends _cg_cg_state_js__WEBPACK_IMPORTED_MODULE_0__.CGState
{
    constructor(_patch)
    {
        super();

        this.patch = _patch;

        this.gApi = _cg_cg_constants_js__WEBPACK_IMPORTED_MODULE_1__.CG.GAPI_WEBGPU;
        this._viewport = [0, 0, 256, 256];
        this._shaderStack = [];
        this._simpleShader = null;

        this._stackCullFaceFacing = [];
        this._stackDepthTest = [];
        this._stackCullFace = [];
        this._stackDepthFunc = [];
        this._stackDepthWrite = [];

        this.DEPTH_FUNCS = [
            "never",
            "always",
            "less",
            "less-equal",
            "greater",
            "greater-equal",
            "equal",
            "not-equal"
        ];

        this.CULL_MODES = [
            "none",
            "back",
            "front",
            "none" // both does not exist in webgpu
        ];
    }


    /// ////////////////////

    getViewPort()
    {
        return [0, 0, this.canvasWidth, this.canvasHeight];
    }

    renderStart(cgp, identTranslate, identTranslateView)
    {
        if (!this._simpleShader)
        {
            this._simpleShader = new _cgp_shader_js__WEBPACK_IMPORTED_MODULE_2__["default"](this, "simple default shader");
            this._simpleShader.setSource(_cgl_shader_default_wgsl__WEBPACK_IMPORTED_MODULE_3__["default"]);
            this._simpleShader.addUniformFrag("4f", "color", 1, 1, 0, 1);
        }

        this.fpsCounter.startFrame();

        this._startMatrixStacks(identTranslate, identTranslateView);
        this.setViewPort(0, 0, this.canvasWidth, this.canvasHeight);

        this.pushShader(this._simpleShader);
        this.pushDepthTest(true);
        this.pushDepthWrite(true);
        this.pushDepthFunc("less-equal");

        this.emitEvent("beginFrame");
    }

    renderEnd()
    {
        this._endMatrixStacks();

        this.popShader();
        this.popDepthFunc();
        this.popDepthWrite();
        this.popDepthTest();

        this.emitEvent("endFrame");
        this.fpsCounter.endFrame();
    }


    setViewPort(x, y, w, h)
    {
        this._viewport = [x, y, w, h];
    }

    /**
     * @function getViewPort
     * @memberof Context
     * @instance
     * @description get current gl viewport
     * @returns {Array} array [x,y,w,h]
     */
    getViewPort()
    {
        return this._viewPort;
    }


    createMesh(geom, glPrimitive)
    {
        return new CGP.Mesh(this, geom, glPrimitive);
    }

    getShader()
    {
        return {};
    }

    /**
     * push a shader to the shader stack
     * @function pushShader
     * @memberof Context
     * @instance
     * @param {Object} shader
     * @function
    */
    pushShader(shader)
    {
        this._shaderStack.push(shader);
        // currentShader = shader;
    }

    /**
     * pop current used shader from shader stack
     * @function popShader
     * @memberof Context
     * @instance
     * @function
     */
    popShader()
    {
        if (this._shaderStack.length === 0) throw new Error("Invalid shader stack pop!");
        this._shaderStack.pop();
        // currentShader = this._shaderStack[this._shaderStack.length - 1];
    }

    getShader()
    {
        return this._shaderStack[this._shaderStack.length - 1];
        // if (currentShader) if (!this.frameStore || ((this.frameStore.renderOffscreen === true) == currentShader.offScreenPass) === true) return currentShader;
        // for (let i = this._shaderStack.length - 1; i >= 0; i--) if (this._shaderStack[i]) if (this.frameStore.renderOffscreen == this._shaderStack[i].offScreenPass) return this._shaderStack[i];
    }

    pushErrorScope()
    {
        this.device.pushErrorScope("validation");
    }

    popErrorScope(name, cb)
    {
        this.device.popErrorScope().then((error) =>
        {
            if (error)
            {
                this.patch.emitEvent("criticalError", { "title": "WebGPU error \"" + name + "\"", "codeText": error.message });
                // if (this.patch.isEditorMode())console.log("WebGPU error " + this._name, error.message);

                console.warn("[cgp]", name, error.message, error, cb);
                if (cb)cb(error);
            }
        });
    }

    /**
     * push depth testing enabled state
     * @function pushDepthTest
     * @param {Boolean} enabled
     * @memberof Context
     * @instance
     */

    pushDepthTest(b)
    {
        this._stackDepthTest.push(b);
    }

    /**
     * current state of depth testing
     * @function stateDepthTest
     * @returns {Boolean} enabled
     * @memberof Context
     * @instance
     */
    stateDepthTest()
    {
        return this._stackDepthTest[this._stackDepthTest.length - 1];
    }

    /**
     * pop depth testing state
     * @function popDepthTest
     * @memberof Context
     * @instance
     */
    popDepthTest()
    {
        this._stackDepthTest.pop();
    }

    // --------------------------------------
    // state depthwrite

    /**
     * push depth write enabled state
     * @function pushDepthTest
     * @param {Boolean} enabled
     * @memberof Context
     * @instance
     */

    pushDepthWrite(b)
    {
        b = b || false;
        this._stackDepthWrite.push(b);
    }

    /**
     * current state of depth writing
     * @function stateCullFace
     * @returns {Boolean} enabled
     * @memberof Context
     * @instance
     */
    stateDepthWrite()
    {
        return this._stackDepthWrite[this._stackDepthWrite.length - 1];
    }

    /**
     * pop depth writing state
     * @function popCullFace
     * @memberof Context
     * @instance
     */
    popDepthWrite()
    {
        this._stackDepthWrite.pop();
    }


    // --------------------------------------
    // state depthfunc


    /**
     * @function pushDepthFunc
     * @memberof Context
     * @instance
     * @param {string} depth compare func
     */
    pushDepthFunc(f)
    {
        this._stackDepthFunc.push(f);
    }

    /**
     * @function stateDepthFunc
     * @memberof Context
     * @instance
     * @returns {string}
     */
    stateDepthFunc()
    {
        if (this._stackDepthFunc.length > 0) return this._stackDepthFunc[this._stackDepthFunc.length - 1];
        return false;
    }

    /**
     * pop depth compare func
     * @function popDepthFunc
     * @memberof Context
     * @instance
     */
    popDepthFunc()
    {
        this._stackDepthFunc.pop();
    }



    // --------------------------------------
    // state CullFace

    /**
     * push face culling face enabled state
     * @function pushCullFaceFacing
     * @param {Boolean} enabled
     * @memberof Context
     * @instance
     */
    pushCullFace(b)
    {
        this._stackCullFace.push(b);
    }

    /**
 * current state of face culling
 * @function stateCullFace
 * @returns {Boolean} enabled
 * @memberof Context
 * @instance
 */
    stateCullFace()
    {
        return this._stackCullFace[this._stackCullFace.length - 1];
    }

    /**
 * pop face culling enabled state
 * @function popCullFace
 * @memberof Context
 * @instance
 */
    popCullFace()
    {
        this._stackCullFace.pop();
    }


    // --------------------------------------
    // state CullFace Facing


    /**
     * push face culling face side
     * @function pushCullFaceFacing
     * @memberof Context
     * @instance
     */

    pushCullFaceFacing(b)
    {
        this._stackCullFaceFacing.push(b);
    }

    /**
     * current state of face culling side
     * @function stateCullFaceFacing
     * @returns {Boolean} enabled
     * @memberof Context
     * @instance
     */
    stateCullFaceFacing()
    {
        return this._stackCullFaceFacing[this._stackCullFaceFacing.length - 1];
    }

    /**
     * pop face culling face side
     * @function popCullFaceFacing
     * @memberof Context
     * @instance
     */
    popCullFaceFacing()
    {
        this._stackCullFaceFacing.pop();
    }
}



/***/ }),

/***/ "./src/core/cgp/cgp_texture.js":
/*!*************************************!*\
  !*** ./src/core/cgp/cgp_texture.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Texture)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");


class Texture
{
    constructor(_cgp, options)
    {
        if (!_cgp) throw new Error("no cgp");
        this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("cgp_texture");
        this._cgp = _cgp;
        this.id = CABLES.uuid();

        options = options || {};

        this.name = options.name || "unknown";
    }

    /**
     * set texture data from an image/canvas object
     * @function initTexture
     * @memberof Texture
     * @instance
     * @param {Object} image
     * @param {Number} filter
     */
    initTexture(img, filter)
    {
        this.width = img.width;
        this.height = img.height;

        this.textureType = "rgba8unorm";

        const textureDescriptor = {
            // Unlike in WebGL, the size of our texture must be set at texture creation time.
            // This means we have to wait until the image is loaded to create the texture, since we won't
            // know the size until then.
            "size": { "width": img.width, "height": img.height },
            "format": this.textureType,
            "usage": GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
        };
        const texture = this._cgp.device.createTexture(textureDescriptor);

        this._cgp.device.queue.copyExternalImageToTexture({ "source": img }, { "texture": texture }, textureDescriptor.size);

        return texture;
    }

    getInfo()
    {
        const tex = this;
        const obj = {};

        obj.name = tex.name;
        obj.size = tex.width + " x " + tex.height;

        obj.textureType = tex.textureType;

        return obj;
    }
}


/**
 * @function load
 * @static
 * @memberof Texture
 * @description load an image from an url
 * @param {Context} cgl
 * @param {String} url
 * @param {Function} onFinished
 * @param {Object} options
 * @return {Texture}
 */
Texture.load = function (cgp, url, onFinished, settings)
{
    fetch(url).then((response) =>
    {
        response.blob().then((blob) =>
        {
            createImageBitmap(blob).then((imgBitmap) =>
            {
                const texture = new Texture(cgp, { "name": url });
                texture.initTexture(imgBitmap);
                if (onFinished)onFinished(texture);
                else console.log("Texture.load no onFinished callback");
            });
        });
    });
};


/***/ }),

/***/ "./src/core/cgp/cgp_uniform.js":
/*!*************************************!*\
  !*** ./src/core/cgp/cgp_uniform.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Uniform)
/* harmony export */ });
/* harmony import */ var _cg_cg_uniform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cg/cg_uniform.js */ "./src/core/cg/cg_uniform.js");


class Uniform extends _cg_cg_uniform_js__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    constructor(__shader, __type, __name, _value, _port2, _port3, _port4, _structUniformName, _structName, _propertyName)
    {
        super(__shader, __type, __name, _value, _port2, _port3, _port4, _structUniformName, _structName, _propertyName);
        this._loc = -1;
        this._cgl = __shader._cgl;
    }


    updateValueF() { }

    setValueF(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    updateValue2F() { }

    setValue2F(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    updateValue3F() { }

    setValue3F(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    updateValue4F() { }

    setValue4F(v)
    {
        this.needsUpdate = true;
        this._value = v;
    }

    getSizeBytes()
    {
        if (this._type == "f") return 1 * 4;
        if (this._type == "i") return 1 * 4;
        if (this._type == "2i") return 2 * 4;
        if (this._type == "2f") return 2 * 4;
        if (this._type == "3f") return 3 * 4;
        if (this._type == "4f") return 4 * 4;
        if (this._type == "m4") return 4 * 4 * 4;

        this._log.warn("unknown type getSizeBytes");
        // if (this._type == "t") return "sampler2D";
        // if (this._type == "tc") return "samplerCube";
        // if (this._type == "b") return "bool";

        // if (t == "3f[]") return null; // ignore this for now...
        // if (t == "m4[]") return null; // ignore this for now...
        // if (t == "f[]") return null; // ignore this for now...
    }
}


/***/ }),

/***/ "./src/core/cgp/cgp_uniformbuffer.js":
/*!*******************************************!*\
  !*** ./src/core/cgp/cgp_uniformbuffer.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UniformBuffer)
/* harmony export */ });
class UniformBuffer
{
    constructor(shader, shaderType)
    {
        this._shaderType = shaderType; // frag, vert...
        this._shader = shader;
        this._cgp = shader._cgp;

        this._gpuBuffer = null;
        this._values = null;

        this._sizeBytes = 0;
        this.update();
    }

    update()
    {
        this._sizeBytes = 0;

        for (let i = 0; i < this._shader.uniforms.length; i++)
        {
            const uni = this._shader.uniforms[i];

            if (this._shaderType == uni.shaderType)
                this._sizeBytes += uni.getSizeBytes();
        }

        this._gpuBuffer = this._cgp.device.createBuffer(
            {
                "size": this._sizeBytes,
                "usage": GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });


        this._values = new Float32Array(this._sizeBytes / 4);
        this.updateUniformValues();
    }

    updateUniformValues()
    {
        let count = 0;
        for (let i = 0; i < this._shader.uniforms.length; i++)
        {
            const uni = this._shader.uniforms[i];
            if (uni.shaderType == this._shaderType)
            {
                if (uni.getSizeBytes() / 4 > 1)
                {
                    for (let j = 0; j < uni.getValue().length; j++)
                    {
                        this._values[count] = uni.getValue()[j];
                        count++;
                    }
                }
                else
                {
                    this._values[count] = uni.getValue();
                    count++;
                }
            }
        }


        this._cgp.device.queue.writeBuffer(
            this._gpuBuffer,
            0,
            this._values.buffer,
            this._values.byteOffset,
            this._values.byteLength
        );
    }
}


/***/ }),

/***/ "./src/core/cgp/index.js":
/*!*******************************!*\
  !*** ./src/core/cgp/index.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CGP": () => (/* binding */ CGP)
/* harmony export */ });
/* harmony import */ var _cgp_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cgp_state.js */ "./src/core/cgp/cgp_state.js");
/* harmony import */ var _cgp_shader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cgp_shader.js */ "./src/core/cgp/cgp_shader.js");
/* harmony import */ var _cgp_mesh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgp_mesh.js */ "./src/core/cgp/cgp_mesh.js");
/* harmony import */ var _cgp_pipeline_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cgp_pipeline.js */ "./src/core/cgp/cgp_pipeline.js");
/* harmony import */ var _cgp_texture_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cgp_texture.js */ "./src/core/cgp/cgp_texture.js");






const CGP = {
    "Context": _cgp_state_js__WEBPACK_IMPORTED_MODULE_0__.WebGpuContext,
    "Shader": _cgp_shader_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    "Mesh": _cgp_mesh_js__WEBPACK_IMPORTED_MODULE_2__["default"],
    "Pipeline": _cgp_pipeline_js__WEBPACK_IMPORTED_MODULE_3__["default"],
    "Texture": _cgp_texture_js__WEBPACK_IMPORTED_MODULE_4__["default"],
};

window.CGP = CGP;





/***/ }),

/***/ "./src/core/constants.js":
/*!*******************************!*\
  !*** ./src/core/constants.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CONSTANTS": () => (/* binding */ CONSTANTS)
/* harmony export */ });
const CONSTANTS = {
    "ANIM": {
        "EASINGS": [
            "linear",
            "absolute",
            "smoothstep",
            "smootherstep",
            "Cubic In",
            "Cubic Out",
            "Cubic In Out",
            "Expo In",
            "Expo Out",
            "Expo In Out",
            "Sin In",
            "Sin Out",
            "Sin In Out",
            "Quart In",
            "Quart Out",
            "Quart In Out",
            "Quint In",
            "Quint Out",
            "Quint In Out",
            "Back In",
            "Back Out",
            "Back In Out",
            "Elastic In",
            "Elastic Out",
            "Bounce In",
            "Bounce Out",
        ],
        "EASING_LINEAR": 0,
        "EASING_ABSOLUTE": 1,
        "EASING_SMOOTHSTEP": 2,
        "EASING_SMOOTHERSTEP": 3,
        "EASING_CUBICSPLINE": 4,

        "EASING_CUBIC_IN": 5,
        "EASING_CUBIC_OUT": 6,
        "EASING_CUBIC_INOUT": 7,

        "EASING_EXPO_IN": 8,
        "EASING_EXPO_OUT": 9,
        "EASING_EXPO_INOUT": 10,

        "EASING_SIN_IN": 11,
        "EASING_SIN_OUT": 12,
        "EASING_SIN_INOUT": 13,

        "EASING_BACK_IN": 14,
        "EASING_BACK_OUT": 15,
        "EASING_BACK_INOUT": 16,

        "EASING_ELASTIC_IN": 17,
        "EASING_ELASTIC_OUT": 18,

        "EASING_BOUNCE_IN": 19,
        "EASING_BOUNCE_OUT": 21,

        "EASING_QUART_IN": 22,
        "EASING_QUART_OUT": 23,
        "EASING_QUART_INOUT": 24,

        "EASING_QUINT_IN": 25,
        "EASING_QUINT_OUT": 26,
        "EASING_QUINT_INOUT": 27,
    },

    "OP": {
        "OP_PORT_TYPE_VALUE": 0,
        "OP_PORT_TYPE_NUMBER": 0,
        "OP_PORT_TYPE_FUNCTION": 1,
        "OP_PORT_TYPE_TRIGGER": 1,
        "OP_PORT_TYPE_OBJECT": 2,
        "OP_PORT_TYPE_TEXTURE": 2,
        "OP_PORT_TYPE_ARRAY": 3,
        "OP_PORT_TYPE_DYNAMIC": 4,
        "OP_PORT_TYPE_STRING": 5,

        "OP_VERSION_PREFIX": "_v",
    },

    "PORT": {
        "PORT_DIR_IN": 0,
        "PORT_DIR_OUT": 1,
    },

    "PACO": {
        "PACO_CLEAR": 0,
        "PACO_VALUECHANGE": 1,
        "PACO_OP_DELETE": 2,
        "PACO_UNLINK": 3,
        "PACO_LINK": 4,
        "PACO_LOAD": 5,
        "PACO_OP_CREATE": 6,
        "PACO_OP_ENABLE": 7,
        "PACO_OP_DISABLE": 8,
        "PACO_UIATTRIBS": 9,
        "PACO_VARIABLES": 10,
        "PACO_TRIGGERS": 11,
        "PACO_PORT_SETVARIABLE": 12,
        "PACO_PORT_SETANIMATED": 13,
        "PACO_PORT_ANIM_UPDATED": 14,
        "PACO_DESERIALIZE": 15

    },
};


/***/ }),

/***/ "./src/core/core_link.js":
/*!*******************************!*\
  !*** ./src/core/core_link.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Link": () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/* harmony import */ var _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventtarget.js */ "./src/core/eventtarget.js");



/**
 * @external CABLES
 * @namespace Link
 * @param {Object} patch The patch object
 * @description a link is a connection between two ops/ports -> one input and one output port
 * @hideconstructor
 * @class
 */
const Link = function (scene)
{
    _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__.EventTarget.apply(this);

    this.id = CABLES.simpleId();
    this.portIn = null;
    this.portOut = null;
    this.scene = scene; // todo: make private and rename to patch
    this.activityCounter = 0;
    this.ignoreInSerialize = false;
};

Link.prototype.setValue = function (v)
{
    if (v === undefined) this._setValue();
    else this.portIn.set(v);
};

Link.prototype.activity = function ()
{
    this.activityCounter++;
    // if(Date.now()-this.lastTime>100)
    // {
    //     // this.lastTime=Date.now();
    //     // this.changesPerSecond=this.changesCounter*10;
    //     this.changesCounter=0;
    // }
};

Link.prototype._setValue = function ()
{
    if (!this.portOut)
    {
        this.remove();
        return;
    }
    const v = this.portOut.get();

    if (v == v) // NaN is the only JavaScript value that is treated as unequal to itself
    {
        if (this.portIn.type != _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION) this.activity();

        if (this.portIn.get() !== v)
        {
            this.portIn.set(v);
        }
        else
        {
            if (this.portIn.changeAlways) this.portIn.set(v);
            if (this.portOut.forceRefChange) this.portIn.forceChange();
        }
    }
};

/**
 * @function getOtherPort
 * @memberof Link
 * @instance
 * @param {Port} port
 * @description returns the port of the link, which is not port
 */
Link.prototype.getOtherPort = function (p)
{
    if (p == this.portIn) return this.portOut;
    return this.portIn;
};

/**
 * @function remove
 * @memberof Link
 * @instance
 * @description unlink/remove this link from all ports
 */
Link.prototype.remove = function ()
{
    if (this.portIn) this.portIn.removeLink(this);
    if (this.portOut) this.portOut.removeLink(this);
    if (this.scene)
    {
        this.scene.emitEvent("onUnLink", this.portIn, this.portOut, this);
    }

    if (this.portIn && (this.portIn.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT || this.portIn.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY))
    {
        this.portIn.set(null);
        if (this.portIn.links.length > 0) this.portIn.set(this.portIn.links[0].getOtherPort(this.portIn).get());
    }

    if (this.portIn) this.portIn.op._checkLinksNeededToWork();
    if (this.portOut) this.portOut.op._checkLinksNeededToWork();

    this.portIn = null;
    this.portOut = null;
    this.scene = null;
};

/**
 * @function link
 * @memberof Link
 * @instance
 * @description link those two ports
 * @param {Port} port1
 * @param {Port} port2
 */
Link.prototype.link = function (p1, p2)
{
    if (!Link.canLink(p1, p2))
    {
        console.warn("[core_link] cannot link ports!", p1, p2);
        return false;
    }

    if (p1.direction == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.PORT.PORT_DIR_IN)
    {
        this.portIn = p1;
        this.portOut = p2;
    }
    else
    {
        this.portIn = p2;
        this.portOut = p1;
    }

    p1.addLink(this);
    p2.addLink(this);

    this.setValue();

    if (p1.onLink) p1.onLink(this);
    if (p2.onLink) p2.onLink(this);

    p1.op._checkLinksNeededToWork();
    p2.op._checkLinksNeededToWork();
};

Link.prototype.getSerialized = function ()
{
    const obj = {};

    obj.portIn = this.portIn.getName();
    obj.portOut = this.portOut.getName();
    obj.objIn = this.portIn.op.id;
    obj.objOut = this.portOut.op.id;

    return obj;
};

// --------------------------------------------

/**
 * @function canLinkText
 * @memberof Link
 * @instance
 * @description return a text message with human readable reason if ports can not be linked, or can be
 * @param {Port} port1
 * @param {Port} port2
 */
Link.canLinkText = function (p1, p2)
{
    if (p1.direction == p2.direction)
    {
        let txt = "(out)";
        if (p2.direction == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.PORT.PORT_DIR_IN) txt = "(in)";
        return "can not link: same direction " + txt;
    }
    if (p1.op == p2.op) return "can not link: same op";
    if (p1.type != _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC && p2.type != _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC)
    {
        if (p1.type != p2.type) return "can not link: different type";
    }

    if (CABLES.UI && p1.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT && p2.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT)
    {
        if (p1.uiAttribs.objType && p2.uiAttribs.objType)
            if (p1.uiAttribs.objType != p2.uiAttribs.objType)
                return "incompatible objects";
    }


    if (!p1) return "can not link: port 1 invalid";
    if (!p2) return "can not link: port 2 invalid";

    if (p1.direction == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.PORT.PORT_DIR_IN && p1.isAnimated()) return "can not link: is animated";
    if (p2.direction == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.PORT.PORT_DIR_IN && p2.isAnimated()) return "can not link: is animated";

    // if(p1.direction==CABLES.CONSTANTS.PORT.PORT_DIR_IN && p1.links.length>0)return 'input port already busy';
    // if(p2.direction==CABLES.CONSTANTS.PORT.PORT_DIR_IN && p2.links.length>0)return 'input port already busy';
    if (p1.isLinkedTo(p2)) return "ports already linked";

    if ((p1.canLink && !p1.canLink(p2)) || (p2.canLink && !p2.canLink(p1))) return "Incompatible";

    return "can link";
};

/**
 * @function canLink
 * @memberof Link
 * @instance
 * @description return true if ports can be linked
 * @param {Port} port1
 * @param {Port} port2
 * @returns {Boolean}
 */
Link.canLink = function (p1, p2)
{
    if (!p1) return false;
    if (!p2) return false;
    if (p1.direction == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.PORT.PORT_DIR_IN && p1.isAnimated()) return false;
    if (p2.direction == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.PORT.PORT_DIR_IN && p2.isAnimated()) return false;

    if (p1.isHidden() || p2.isHidden()) return false;

    if (p1.isLinkedTo(p2)) return false;

    if (p1.direction == p2.direction) return false;

    if (CABLES.UI && p1.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT && p2.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT)
    {
        if (p1.uiAttribs.objType && p2.uiAttribs.objType)
        {
            if (p1.uiAttribs.objType.indexOf("sg_") == 0 && p2.uiAttribs.objType.indexOf("sg_") == 0) return true;
            if (p1.uiAttribs.objType != p2.uiAttribs.objType)
                return false;
        }
    }

    if (p1.type != p2.type && (p1.type != _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC && p2.type != _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC)) return false;
    if (p1.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC || p2.type == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC) return true;

    if (p1.op == p2.op) return false;

    if (p1.canLink && !p1.canLink(p2)) return false;
    if (p2.canLink && !p2.canLink(p1)) return false;

    return true;
};




/***/ }),

/***/ "./src/core/core_op.js":
/*!*****************************!*\
  !*** ./src/core/core_op.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Op": () => (/* binding */ Op)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventtarget.js */ "./src/core/eventtarget.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/core/utils.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/* harmony import */ var _core_port_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core_port.js */ "./src/core/core_port.js");
/* harmony import */ var _core_port_switch_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core_port_switch.js */ "./src/core/core_port_switch.js");
/* harmony import */ var _core_port_select_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core_port_select.js */ "./src/core/core_port_select.js");
/* harmony import */ var _core_port_multi_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core_port_multi.js */ "./src/core/core_port_multi.js");









/**
 * op the class of all operators
 * @external CABLES
 * @namespace Op
 * @hideconstructor
 */

/**
 * @type {Object}
 * @name attachments
 * @instance
 * @memberof Op
 * @description access file attachments as String values
 * @example
 * // set shader source to attached files (files are called shader.vert / shader.frag)
 * shader.setSource(attachments.shader_vert,attachments.shader_frag);
 */

const Ops = {};

const Op = function ()
{
    _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__.EventTarget.apply(this);

    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_1__["default"]("core_op");
    this.data = {}; // UNUSED, DEPRECATED, only left in for backwards compatibility with userops
    this.storage = {}; // op-specific data to be included in export
    this._objName = "";
    this.portsOut = [];
    this.portsIn = [];
    this.portsInData = []; // original loaded patch data
    this.opId = ""; // unique op id
    this.uiAttribs = {};
    this.enabled = true;
    this.patch = arguments[0];
    this.name = arguments[1];
    this.preservedPortValues = {};
    this.preservedPortLinks = {};

    this._linkTimeRules = {
        "needsLinkedToWork": [],
        "needsParentOp": null
    };

    this.shouldWork = {};
    this.hasUiErrors = false;
    this._uiErrors = {};
    this._hasAnimPort = false;

    if (arguments[1])
    {
        this._shortOpName = CABLES.getShortOpName(arguments[1]);
        this.getTitle();
    }

    this.id = arguments[2] || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shortId)(); // instance id
    this.onAddPort = null;
    this.onCreate = null;
    this.onResize = null;
    this.onLoaded = null;
    this.onDelete = null;
    this.onUiAttrChange = null;
    this.onError = null;

    this._instances = null;

    /**
     * overwrite this to prerender shader and meshes / will be called by op `loadingStatus`
     * @function preRender
     * @memberof Op
     * @instance
     */
    this.preRender = null;

    /**
     * overwrite this to initialize your op
     * @function init
     * @memberof Op
     * @instance
     */
    this.init = null;

    Object.defineProperty(this, "objName", { get() { return this._objName; } });
    Object.defineProperty(this, "shortName", { get() { return this._shortOpName; } });

    if (this.initUi) this.initUi();
};

{
    Op.prototype.clearUiAttrib = function (name)
    {
        const obj = {};
        obj.name = null;
        this.uiAttrib(obj);
    };

    Op.prototype.checkMainloopExists = function ()
    {
        if (!CABLES.UI) return;
        if (!this.patch.cgl.mainloopOp) this.setUiError("nomainloop", "patch should have a mainloop to use this op");
        else this.setUiError("nomainloop", null);
    };

    Op.prototype.getTitle = function ()
    {
        if (!this.uiAttribs) return "nouiattribs" + this.name;

        if ((this.uiAttribs.title === undefined || this.uiAttribs.title === "") && this.objName.indexOf("Ops.Ui.") == -1)
            this.uiAttribs.title = this._shortOpName;

        if (this.uiAttribs.title === undefined) this.uiAttribs.title = this._shortOpName;

        return this.uiAttribs.title;
    };

    Op.prototype.setTitle = function (name)
    {
        const doEmitEvent = this.name != name;
        this.name = name;

        if (this.uiAttribs.title != name) this.uiAttr({ "title": name });
        if (doEmitEvent) this.emitEvent("onTitleChange", name);
    };

    Op.prototype.setStorage = function (newAttribs)
    {
        if (!newAttribs) return;
        this.storage = this.storage || {};

        let changed = false;
        for (const p in newAttribs)
        {
            if (this.storage[p] != newAttribs[p]) changed = true;
            this.storage[p] = newAttribs[p];
        }

        if (changed) this.emitEvent("onStorageChange", newAttribs);
    };

    Op.prototype.isSubPatchOp = function ()
    {
        if (this.storage) return (this.storage.subPatchVer || 0);
    };

    const _setUiAttrib = function (newAttribs)
    {
        if (!newAttribs) return;

        if (newAttribs.error || newAttribs.warning || newAttribs.hint)
        {
            this._log.warn("old ui error/warning attribute in " + this.name + ", use op.setUiError !", newAttribs);
        }



        if (typeof newAttribs != "object") this._log.error("op.uiAttrib attribs are not of type object");
        if (!this.uiAttribs) this.uiAttribs = {};


        let emitMove = false;
        if (
            CABLES.UI &&
            newAttribs.hasOwnProperty("translate") &&
            (
                !this.uiAttribs.translate ||
                this.uiAttribs.translate.x != newAttribs.translate.x ||
                this.uiAttribs.translate.y != newAttribs.translate.y
            )) emitMove = true;


        if (newAttribs.hasOwnProperty("disabled"))
        {
            this.setEnabled(!newAttribs.disabled);
        }

        let changed = false;
        for (const p in newAttribs)
        {
            if (this.uiAttribs[p] != newAttribs[p]) changed = true;
            this.uiAttribs[p] = newAttribs[p];
        }

        if (this.uiAttribs.hasOwnProperty("selected") && this.uiAttribs.selected == false) delete this.uiAttribs.selected;
        if (newAttribs.title && newAttribs.title != this.name) this.setTitle(newAttribs.title);

        if (changed)
        {
            this.emitEvent("onUiAttribsChange", newAttribs);
            this.patch.emitEvent("onUiAttribsChange", this, newAttribs);
        }


        if (emitMove) this.emitEvent("move");
    };
    /**
     * setUiAttrib
     * possible values:
     * <pre>
     * warning - warning message - showing up in op parameter panel
     * error - error message - showing up in op parameter panel
     * extendTitle - op title extension, e.g. [ + ]
     * </pre>
     * @function setUiAttrib
     * @param {Object} newAttribs, e.g. {"attrib":value}
     * @memberof Op
     * @instance
     * @example
     * op.setUiAttrib({"extendTitle":str});
     */
    Op.prototype.setUiAttribs = Op.prototype.setUiAttrib = Op.prototype.uiAttr = _setUiAttrib;

    Op.prototype.getName = function ()
    {
        if (this.uiAttribs.name) return this.uiAttribs.name;
        return this.name;
    };

    Op.prototype.addOutPort = function (p)
    {
        p.direction = _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.PORT.PORT_DIR_OUT;
        p._op = this;
        this.portsOut.push(p);
        this.emitEvent("onPortAdd", p);
        return p;
    };

    Op.prototype.hasDynamicPort = function ()
    {
        let i = 0;
        for (i = 0; i < this.portsIn.length; i++)
        {
            if (this.portsIn[i].type == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC) return true;
            if (this.portsIn[i].getName() == "dyn") return true;
        }
        for (i = 0; i < this.portsOut.length; i++)
        {
            if (this.portsOut[i].type == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC) return true;
            if (this.portsOut[i].getName() == "dyn") return true;
        }

        return false;
    };

    Op.prototype.addInPort = function (p)
    {
        if (!(p instanceof _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port)) throw new Error("parameter is not a port!");

        p.direction = _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.PORT.PORT_DIR_IN;
        p._op = this;

        this.portsIn.push(p);
        this.emitEvent("onPortAdd", p);

        return p;
    };

    /**
     * create a trigger input port
     * @function inTrigger
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     *
     */
    Op.prototype.inFunction = Op.prototype.inTrigger = function (name, v)
    {
        const p = this.addInPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION));
        if (v !== undefined) p.set(v);
        return p;
    };

    /**
     * create multiple UI trigger buttons
     * @function inTriggerButton
     * @memberof Op
     * @instance
     * @param {String} name
     * @param {Array} names
     * @return {Port} created port
     */
    Op.prototype.inFunctionButton = Op.prototype.inTriggerButton = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION, {
                "display": "button"
            })
        );
        if (v !== undefined) p.set(v);
        return p;
    };

    Op.prototype.inFunctionButton = Op.prototype.inUiTriggerButtons = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION, {
                "display": "buttons"
            })
        );
        if (v !== undefined) p.set(v);
        return p;
    };



    /**
     * create a number value input port
     * @function inFloat
     * @memberof Op
     * @instance
     * @param {String} name
     * @param {Number} value
     * @return {Port} created port
     */
    Op.prototype.inValueFloat = Op.prototype.inValue = Op.prototype.inFloat = function (name, v)
    {
        const p = this.addInPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE));

        p.setInitialValue(v);

        return p;
    };

    /**
     * create a boolean input port, displayed as a checkbox
     * @function inBool
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {Boolean} value
     * @return {Port} created port
     */
    Op.prototype.inValueBool = Op.prototype.inBool = function (name, v)
    {
        // old
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_NUMBER, {
                "display": "bool"
            })
        );
        // if (v !== undefined)
        // {
        p.setInitialValue(v);
        // p.set(v);
        // p.defaultValue = p.get();
        // }

        return p;
    };


    Op.prototype.inMultiPort = function (name, type)
    {
        const p = new _core_port_multi_js__WEBPACK_IMPORTED_MODULE_5__.MultiPort(
            this,
            name,
            type,
            _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.PORT.PORT_DIR_IN,
            {
                "addPort": true,
                "hidePort": true
            }
        );
        p.ignoreValueSerialize = true;

        this.addInPort(p);
        p.initPorts();

        return p;
    };

    Op.prototype.outMultiPort = function (name, type)
    {
        const p = new _core_port_multi_js__WEBPACK_IMPORTED_MODULE_5__.MultiPort(
            this,
            name,
            type,
            _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.PORT.PORT_DIR_OUT,
            {
                "display": "multiport",
                "hidePort": true
            }
        );
        p.ignoreValueSerialize = true;

        this.addOutPort(p);
        p.initPorts();

        return p;
    };



    Op.prototype.inValueString = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "type": "string"
            })
        );
        p.value = "";

        p.setInitialValue(v);
        return p;
    };

    /**
     * create a String value input port
     * @function inString
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {String} value default value
     * @return {Port} created port
     */
    Op.prototype.inString = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_STRING, {
                "type": "string"
            })
        );
        v = v || "";
        // p.value = v;

        p.setInitialValue(v);
        return p;
    };

    /**
     * create a String value input port displayed as TextArea
     * @function inValueText
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {String} value default value
     * @return {Port} created port
     */
    Op.prototype.inValueText = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "type": "string",
                "display": "text"
            })
        );
        p.value = "";

        p.setInitialValue(v);
        // if (v !== undefined)
        // {
        //     p.set(v);
        //     p.defaultValue = v;
        // }
        return p;
    };

    Op.prototype.inTextarea = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_STRING, {
                "type": "string",
                "display": "text"
            })
        );
        p.value = "";
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    /**
     * create a String value input port displayed as editor
     * @function inStringEditor
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {String} value default value
     * @return {Port} created port
     */
    // new string
    Op.prototype.inStringEditor = function (name, v, syntax, hideFormatButton = true)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_STRING, {
                "type": "string",
                "display": "editor",
                "editShortcut": true,
                "editorSyntax": syntax,
                "hideFormatButton": hideFormatButton
            }));

        p.value = "";
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    // old
    Op.prototype.inValueEditor = function (name, v, syntax, hideFormatButton = true)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_NUMBER, {
                "type": "string",
                "display": "editor",
                "editorSyntax": syntax,
                "hideFormatButton": hideFormatButton
            })
        );
        p.value = "";
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    /**
     * create a string select box
     * @function inDropDown
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {Array} values
     * @param {String} value default value
     * @return {Port} created port
     */
    Op.prototype.inValueSelect = Op.prototype.inDropDown = function (name, values, v, noindex)
    {
        let p = null;
        if (!noindex)
        {
            const indexPort = new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name + " index", _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_NUMBER, {
                "increment": "integer",
                "hideParam": true
            });
            const n = this.addInPort(indexPort);

            if (values) for (let i = 0; i < values.length; i++) values[i] = String(values[i]);

            const valuePort = new _core_port_select_js__WEBPACK_IMPORTED_MODULE_6__.ValueSelectPort(
                this,
                name,
                _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_NUMBER,
                {
                    "display": "dropdown",
                    "hidePort": true,
                    "type": "string",
                    "values": values
                },
                n
            );

            valuePort.indexPort = indexPort;

            valuePort.on("change", (val, thePort) =>
            {
                if (!thePort.indexPort.isLinked() && thePort.uiAttribs.values)
                {
                    const idx = thePort.uiAttribs.values.indexOf(val);
                    if (idx > -1) thePort.indexPort.set(idx);
                }
            });

            indexPort.onLinkChanged = function ()
            {
                valuePort.setUiAttribs({ "greyout": indexPort.isLinked() });
            };

            p = this.addInPort(valuePort);

            if (v !== undefined)
            {
                p.set(v);
                const index = values.findIndex((item) => { return item == v; });
                n.setValue(index);
                p.defaultValue = v;
                n.defaultValue = index;
            }
        }
        else
        {
            const valuePort = new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "display": "dropdown",
                "hidePort": true,
                "type": "string",
                values
            });

            p = this.addInPort(valuePort);
        }

        return p;
    };

    /**
     * create a string switch box
     * @function inSwitch
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {Array} values
     * @param {String} value default value
     * @return {Port} created port
     */
    Op.prototype.inSwitch = function (name, values, v, noindex)
    {
        let p = null;
        if (!noindex)
        {
            if (!v)v = values[0];
            const indexPort = new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name + " index", _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "increment": "integer",
                "values": values,
                "hideParam": true
            });
            const n = this.addInPort(indexPort);

            if (values) for (let i = 0; i < values.length; i++) values[i] = String(values[i]);

            const switchPort = new _core_port_switch_js__WEBPACK_IMPORTED_MODULE_7__.SwitchPort(
                this,
                name,
                _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_STRING,
                {
                    "display": "switch",
                    "hidePort": true,
                    "type": "string",
                    "values": values
                },
                n
            );

            switchPort.indexPort = indexPort;

            switchPort.on("change", (val, thePort) =>
            {
                if (!thePort.indexPort.isLinked() && thePort.uiAttribs.values)
                {
                    const idx = thePort.uiAttribs.values.indexOf(val);
                    if (idx > -1) thePort.indexPort.set(idx);
                }
            });

            indexPort.onLinkChanged = function ()
            {
                switchPort.setUiAttribs({ "greyout": indexPort.isLinked() });
            };
            p = this.addInPort(switchPort);

            if (v !== undefined)
            {
                p.set(v);
                const index = values.findIndex((item) => { return item == v; });
                n.setValue(index);
                p.defaultValue = v;
                n.defaultValue = index;
            }
        }
        else
        {
            const switchPort = new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_STRING, {
                "display": "switch",
                "hidePort": true,
                "type": "string",
                "values": values
            });
            p = this.addInPort(switchPort);
        }

        return p;
    };

    /**
     * create a integer input port
     * @function inInt
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {number} value default value
     * @return {Port} created port
     */
    Op.prototype.inValueInt = Op.prototype.inInt = function (name, v)
    {
        // old
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "increment": "integer"
            })
        );
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    /**
     * create a file/URL input port
     * @function inURL
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.inFile = function (name, filter, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "display": "file",
                "type": "string",
                "filter": filter
            })
        );
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    Op.prototype.inUrl = function (name, filter, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_STRING, {
                "display": "file",
                "type": "string",
                "filter": filter
            })
        );
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    /**
     * create a texture input port
     * @function inTexture
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.inTexture = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT, {
                "display": "texture",
                "objType": "texture",
                "preview": true
            })
        );
        p.ignoreValueSerialize = true;
        if (v !== undefined) p.set(v);
        return p;
    };


    /**
     * create a object input port
     * @function inObject
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.inObject = function (name, v, objType)
    {
        const p = this.addInPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT, { "objType": objType }));
        p.ignoreValueSerialize = true;

        if (v !== undefined) p.set(v);
        return p;
    };

    Op.prototype.inGradient = function (name, v)
    {
        const p = this.addInPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "display": "gradient"
                // "hidePort": true
            })
        );
        if (v !== undefined) p.set(v);
        return p;
    };


    Op.prototype.getPortVisibleIndex = function (p)
    {
        let ports = this.portsIn;
        if (p.direction == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.PORT_DIR_OUT)ports = this.portsOut;

        let index = 0;
        for (let i = 0; i < ports.length; i++)
        {
            if (ports[i].uiAttribs.hidePort) continue;
            index++;
            if (ports[i] == p) return index;
        }
    };

    /**
     * create a array input port
     * @function inArray
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.inArray = function (name, v, stride)
    {
        if (!stride && CABLES.UTILS.isNumeric(v))stride = v;

        const p = this.addInPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY, { "stride": stride }));

        if (v !== undefined && (Array.isArray(v) || v == null)) p.set(v);

        // if (v !== undefined) p.set(v);
        return p;
    };

    /**
     * create a value slider input port
     * @function inFloatSlider
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {number} defaultvalue
     * @param {number} min
     * @param {number} max
     * @return {Port} created port
     */
    Op.prototype.inValueSlider = Op.prototype.inFloatSlider = function (name, v, min, max)
    {
        const uiattribs = { "display": "range" };

        if (min != undefined && max != undefined)
        {
            uiattribs.min = min;
            uiattribs.max = max;
        }

        const p = this.addInPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, uiattribs));
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    /**
     * create output trigger port
     * @function outTrigger
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.outFunction = Op.prototype.outTrigger = function (name, v)
    {
        // old
        const p = this.addOutPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION));
        if (v !== undefined) p.set(v);
        return p;
    };

    /**
     * create output value port
     * @function outNumber
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {number} default value
     * @return {Port} created port
     */
    Op.prototype.outValue = Op.prototype.outNumber = function (name, v)
    {
        // old
        const p = this.addOutPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE));
        if (v !== undefined) p.set(v);
        return p;
    };

    /**
     * create output boolean port
     * @function outBool
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.outValueBool = Op.prototype.outBool = function (name, v)
    {
        // old
        const p = this.addOutPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "display": "bool"
            })
        );
        if (v !== undefined) p.set(v);
        else p.set(0);
        return p;
    };

    /**
     * create output boolean port,value will be converted to 0 or 1
     * @function outBool
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.outBoolNum = function (name, v)
    {
        const p = this.addOutPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "display": "boolnum"
            })
        );

        p.set = function (b)
        {
            this.setValue(b ? 1 : 0);
            // console.log("bool set", b, this.get());
        }.bind(p);

        if (v !== undefined) p.set(v);
        else p.set(0);
        return p;
    };

    /**
     * create output string port
     * @function outString
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.outValueString = function (name, v)
    {
        const p = this.addOutPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, {
                "type": "string"
            })
        );
        if (v !== undefined) p.set(v);
        return p;
    };
    Op.prototype.outString = function (name, v)
    {
        const p = this.addOutPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_STRING, {
                "type": "string"
            })
        );
        if (v !== undefined) p.set(v);
        else p.set("");
        return p;
    };

    /**
     * create output object port
     * @function outObject
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.outObject = function (name, v, objType)
    {
        const p = this.addOutPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT, { "objType": objType || null }));
        p.set(v || null);
        p.ignoreValueSerialize = true;
        return p;
    };

    /**
     * create output array port
     * @function outArray
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.outArray = function (name, v, stride)
    {
        if (!stride && CABLES.UTILS.isNumeric(v))stride = v;
        const p = this.addOutPort(new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY, { "stride": stride }));
        if (v !== undefined && (Array.isArray(v) || v == null)) p.set(v);

        p.ignoreValueSerialize = true;
        return p;
    };

    /**
     * create output texture port
     * @function outTexture
     * @instance
     * @memberof Op
     * @param {String} name
     * @return {Port} created port
     */
    Op.prototype.outTexture = function (name, v)
    {
        const p = this.addOutPort(
            new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT, {
                "preview": true,
                "objType": "texture",
                "display": "texture"
            })
        );
        if (v !== undefined) p.set(v || CGL.Texture.getEmptyTexture(this.patch.cgl));

        p.ignoreValueSerialize = true;
        return p;
    };

    Op.prototype.inDynamic = function (name, filter, options, v)
    {
        const p = new _core_port_js__WEBPACK_IMPORTED_MODULE_4__.Port(this, name, _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC, options);

        p.shouldLink = function (p1, p2)
        {
            if (filter && _utils_js__WEBPACK_IMPORTED_MODULE_2__.UTILS.isArray(filter))
            {
                for (let i = 0; i < filter.length; i++)
                {
                    if (p1 == this && p2.type === filter[i]) return true;
                    if (p2 == this && p1.type === filter[i]) return true;
                }
                return false; // types do not match
            }
            return true; // no filter set
        };

        this.addInPort(p);
        if (v !== undefined)
        {
            p.set(v);
            p.defaultValue = v;
        }
        return p;
    };

    Op.prototype.removeLinks = function ()
    {
        for (let i = 0; i < this.portsIn.length; i++) this.portsIn[i].removeLinks();
        for (let ipo = 0; ipo < this.portsOut.length; ipo++) this.portsOut[ipo].removeLinks();
    };

    Op.prototype.getSerialized = function ()
    {
        const opObj = {};

        if (this.opId) opObj.opId = this.opId;
        if (this.patch.storeObjNames) opObj.objName = this.objName;


        opObj.id = this.id;
        opObj.uiAttribs = JSON.parse(JSON.stringify(this.uiAttribs)) || {};

        if (this.storage && Object.keys(this.storage).length > 0) opObj.storage = JSON.parse(JSON.stringify(this.storage));
        if (this.uiAttribs.hasOwnProperty("working") && this.uiAttribs.working == true) delete this.uiAttribs.working;
        if (opObj.uiAttribs.hasOwnProperty("uierrors")) delete opObj.uiAttribs.uierrors;

        if (opObj.uiAttribs.title == this._shortOpName) delete opObj.uiAttribs.title;

        opObj.portsIn = [];
        opObj.portsOut = [];

        // console.log("this.portsIn", this.portsIn);

        for (let i = 0; i < this.portsIn.length; i++)
        {
            const s = this.portsIn[i].getSerialized();
            if (s)opObj.portsIn.push(s);
        }
        for (const ipo in this.portsOut)
        {
            const s = this.portsOut[ipo].getSerialized();
            if (s)opObj.portsOut.push(s);
        }

        if (opObj.portsIn.length == 0) delete opObj.portsIn;
        if (opObj.portsOut.length == 0) delete opObj.portsOut;
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.cleanJson)(opObj);

        return opObj;
    };

    Op.prototype.getFirstOutPortByType = function (type)
    {
        for (const ipo in this.portsOut) if (this.portsOut[ipo].type == type) return this.portsOut[ipo];
    };

    Op.prototype.getFirstInPortByType = function (type)
    {
        for (const ipo in this.portsIn) if (this.portsIn[ipo].type == type) return this.portsIn[ipo];
    };

    /**
     * return port by the name portName
     * @function getPort
     * @instance
     * @memberof Op
     * @param {String} portName
     * @return {Port}
     */
    Op.prototype.getPort = Op.prototype.getPortByName = function (name, lowerCase)
    {
        if (lowerCase)
        {
            for (let ipi = 0; ipi < this.portsIn.length; ipi++)
                if (this.portsIn[ipi].getName().toLowerCase() == name || this.portsIn[ipi].id.toLowerCase() == name)
                    return this.portsIn[ipi];

            for (let ipo = 0; ipo < this.portsOut.length; ipo++)
                if (this.portsOut[ipo].getName().toLowerCase() == name || this.portsOut[ipo].id.toLowerCase() == name)
                    return this.portsOut[ipo];
        }
        else
        {
            for (let ipi = 0; ipi < this.portsIn.length; ipi++)
                if (this.portsIn[ipi].getName() == name || this.portsIn[ipi].id == name)
                    return this.portsIn[ipi];

            for (let ipo = 0; ipo < this.portsOut.length; ipo++)
                if (this.portsOut[ipo].getName() == name || this.portsOut[ipo].id == name)
                    return this.portsOut[ipo];
        }
    };


    /**
     * return port by the name id
     * @function getPortById
     * @instance
     * @memberof Op
     * @param {String} id
     * @return {Port}
     */
    Op.prototype.getPortById = function (id)
    {
        for (let ipi = 0; ipi < this.portsIn.length; ipi++) if (this.portsIn[ipi].id == id) return this.portsIn[ipi];
        for (let ipo = 0; ipo < this.portsOut.length; ipo++) if (this.portsOut[ipo].id == id) return this.portsOut[ipo];
    };

    Op.prototype.updateAnims = function ()
    {
        if (this._hasAnimPort)
            for (let i = 0; i < this.portsIn.length; i++) this.portsIn[i].updateAnim();
    };

    Op.prototype.log = function ()
    {
        const initiator = "op " + this.objName;
        if (CABLES.UI && !CABLES.UI.logFilter.shouldPrint(initiator, ...arguments)) return;
        if (!CABLES.UI && this.patch.silent) return;

        const args = ["[op " + CABLES.getShortOpName(this.objName) + "]"];
        args.push.apply(args, arguments);
        Function.prototype.apply.apply(console.log, [console, args]);// eslint-disable-line
    };

    Op.prototype.error = Op.prototype.logError = function ()
    {
        if (!this)
        {
            console.log("no this...!!!");
            debugger;
            return;
        }

        // if (this.patch.silent) return;
        const args = ["[op " + CABLES.getShortOpName(this.objName) + "]"];
        args.push.apply(args, arguments);
        Function.prototype.apply.apply(console.error, [console, args]);// eslint-disable-line
        if (window.gui) window.gui.emitEvent("opLogEvent", this.objName, "error", arguments);
    };

    Op.prototype.warn = Op.prototype.logWarn = function ()
    {
        // if (this.patch.silent) return;
        const args = ["[op " + CABLES.getShortOpName(this.objName) + "]"];
        args.push.apply(args, arguments);
        Function.prototype.apply.apply(console.warn, [console, args]);// eslint-disable-line
    };

    Op.prototype.verbose = Op.prototype.logVerbose = function ()
    {
        const initiator = "op " + CABLES.getShortOpName(this.objName);
        if (CABLES.UI && !CABLES.UI.logFilter.shouldPrint(initiator, ...arguments)) return;

        if (!CABLES.UI && this.patch.silent) return;

        const args = ["[" + initiator + "]"];
        args.push.apply(args, arguments);
        Function.prototype.apply.apply(console.info, [console, args]);// eslint-disable-line
    };


    Op.prototype.profile = function (enable)
    {
        for (let ipi = 0; ipi < this.portsIn.length; ipi++)
        {
            this.portsIn[ipi]._onTriggered = this.portsIn[ipi]._onTriggeredProfiling;
            this.portsIn[ipi].set = this.portsIn[ipi]._onSetProfiling;
        }
    };

    Op.prototype.findParent = function (objName)
    {
        for (let ipi = 0; ipi < this.portsIn.length; ipi++)
        {
            if (this.portsIn[ipi].isLinked())
            {
                if (this.portsIn[ipi].links[0].portOut.parent.objName == objName)
                    return this.portsIn[ipi].links[0].portOut.parent;

                let found = null;
                found = this.portsIn[ipi].links[0].portOut.parent.findParent(objName);
                if (found) return found;
            }
        }
        return null;
    };


    // todo: check instancing stuff?
    Op.prototype.cleanUp = function ()
    {
        if (this._instances)
        {
            for (let i = 0; i < this._instances.length; i++)
            {
                if (this._instances[i].onDelete) this._instances[i].onDelete();
            }


            this._instances.length = 0;
        }
        for (let i = 0; i < this.portsIn.length; i++)
        {
            this.portsIn[i].setAnimated(false);
        }

        if (this.onAnimFrame) this.patch.removeOnAnimFrame(this);
    };

    // todo: check instancing stuff?
    Op.prototype.instanced = function (triggerPort)
    {
        console.log("instanced", this.patch.instancing.numCycles());
        if (this.patch.instancing.numCycles() === 0) return false;


        let i = 0;
        let ipi = 0;
        if (!this._instances || this._instances.length != this.patch.instancing.numCycles())
        {
            if (!this._instances) this._instances = [];
            this._.log("creating instances of ", this.objName, this.patch.instancing.numCycles(), this._instances.length);
            this._instances.length = this.patch.instancing.numCycles();

            for (i = 0; i < this._instances.length; i++)
            {
                this._instances[i] = this.patch.createOp(this.objName, true);
                this._instances[i].instanced = function ()
                {
                    return false;
                };
                this._instances[i].uiAttr(this.uiAttribs);

                for (let ipo = 0; ipo < this.portsOut.length; ipo++)
                {
                    if (this.portsOut[ipo].type == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION)
                    {
                        this._instances[i].getPortByName(this.portsOut[ipo].name).trigger = this.portsOut[ipo].trigger.bind(this.portsOut[ipo]);
                    }
                }
            }

            for (ipi = 0; ipi < this.portsIn.length; ipi++)
            {
                this.portsIn[ipi].onChange = null;
                this.portsIn[ipi].onValueChanged = null;
            }
        }

        const theTriggerPort = null;
        for (ipi = 0; ipi < this.portsIn.length; ipi++)
        {
            if (
                this.portsIn[ipi].type == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE ||
                this.portsIn[ipi].type == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY
            )
            {
                this._instances[this.patch.instancing.index()].portsIn[ipi].set(this.portsIn[ipi].get());
            }
            if (this.portsIn[ipi].type == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION)
            {
                // if(this._instances[ this.patch.instancing.index() ].portsIn[ipi].name==triggerPort.name)
                // theTriggerPort=this._instances[ this.patch.instancing.index() ].portsIn[ipi];
            }
        }

        if (theTriggerPort) theTriggerPort.onTriggered();

        for (ipi = 0; ipi < this.portsOut.length; ipi++)
        {
            if (this.portsOut[ipi].type == _constants_js__WEBPACK_IMPORTED_MODULE_3__.CONSTANTS.OP.OP_PORT_TYPE_VALUE)
            {
                this.portsOut[ipi].set(this._instances[this.patch.instancing.index()].portsOut[ipi].get());
            }
        }

        return true;
    };

    // todo: check instancing stuff?
    Op.prototype.initInstancable = function ()
    {
        //         if(this.isInstanced)
        //         {
        //             console.log('cancel instancing');
        //             return;
        //         }
        //         this._instances=[];
        //         for(var ipi=0;ipi<this.portsIn.length;ipi++)
        //         {
        //             if(this.portsIn[ipi].type==CONSTANTS.OP.OP_PORT_TYPE_VALUE)
        //             {
        //
        //             }
        //             if(this.portsIn[ipi].type==CONSTANTS.OP.OP_PORT_TYPE_FUNCTION)
        //             {
        //                 // var piIndex=ipi;
        //                 this.portsIn[ipi].onTriggered=function(piIndex)
        //                 {
        //
        //                     var i=0;
        // // console.log('trigger',this._instances.length);
        //
        //                 }.bind(this,ipi );
        //
        //             }
        // };
        // this._instances=null;
    };

    Op.prototype.setValues = function (obj)
    {
        for (const i in obj)
        {
            const port = this.getPortByName(i);
            if (port) port.set(obj[i]);
            else this._log.warn("op.setValues: port not found:", i);
        }
    };

    /**
     * return true if op has this error message id
     * @function hasUiError
     * @instance
     * @memberof Op
     * @param {id} error id
     * @returns {Boolean} - has id
     */
    Op.prototype.hasUiError = function (id)
    {
        return this._uiErrors.hasOwnProperty(id) && this._uiErrors[id];
    };

    /**
     * show op error message - set message to null to remove error message
     * @function setUiError
     * @instance
     * @memberof Op
     * @param {id} error id
     * @param {txt} text message
     * @param {level} level
     */
    Op.prototype.setUiError = function (id, txt, level)
    {
        // overwritten in ui: core_extend_op
    };

    // todo: remove
    Op.prototype.setError = function (id, txt)
    {
        this._log.warn("old error message op.error() - use op.setUiError()");
    };


    /**
     * enable/disable op
     * @function
     * @instance
     * @memberof Op
     * @param {boolean}
     */
    Op.prototype.setEnabled = function (b)
    {
        this.enabled = b;
        this.emitEvent("onEnabledChange", b);
        if (!this.enabled) this.setUiError("_disabled", "Op is disabled", 0);
        else this.setUiError("_disabled", null);
    };

    /**
     * organize ports into a group
     * @function
     * @instance
     * @memberof Op
     * @param {String} name
     * @param {Array} ports
     */
    Op.prototype.setPortGroup = function (name, ports)
    {
        for (let i = 0; i < ports.length; i++)
        {
            if (ports[i])
                if (ports[i].setUiAttribs) ports[i].setUiAttribs({ "group": name });
                else
                {
                    this._log.error("setPortGroup: invalid port!");
                }
        }
    };

    /**
     * visually indicate ports that they are coordinate inputs
     * @function
     * @instance
     * @memberof Op
     * @param {Port} portX
     * @param {Port} portY
     * @param {Port} portZ
     */
    Op.prototype.setUiAxisPorts = function (px, py, pz)
    {
        if (px) px.setUiAttribs({ "axis": "X" });
        if (py) py.setUiAttribs({ "axis": "Y" });
        if (pz) pz.setUiAttribs({ "axis": "Z" });
    };

    /**
     * remove port from op
     * @function removePort
     * @instance
     * @memberof Op
     * @param {Port} port to remove
     */
    Op.prototype.removePort = function (port)
    {
        for (let ipi = 0; ipi < this.portsIn.length; ipi++)
        {
            if (this.portsIn[ipi] == port)
            {
                this.portsIn.splice(ipi, 1);
                this.emitEvent("onUiAttribsChange", {});
                this.emitEvent("onPortRemoved", {});
                return;
            }
        }
    };

    Op.prototype._checkLinksNeededToWork = function () {};

    /**
     * show a warning of this op is not a child of parentOpName
     * @function
     * @instance
     * @memberof Op
     * @param {String} parentOpName
     */
    Op.prototype.toWorkNeedsParent = function (parentOpName)
    {
        if (!this.patch.isEditorMode()) return;

        this._linkTimeRules.needsParentOp = parentOpName;
    };

    // /**
    //  * show a warning of this op is a child of parentOpName
    //  * @function
    //  * @instance
    //  * @memberof Op
    //  * @param {String} parentOpName
    //  */
    Op.prototype.toWorkShouldNotBeChild = function (parentOpName, type)
    {
        if (!this.patch.isEditorMode()) return;
        this._linkTimeRules.forbiddenParent = parentOpName;
        if (type != undefined) this._linkTimeRules.forbiddenParentType = type;
    };


    /**
     * show a small X to indicate op is not working when given ports are not linked
     * @function
     * @instance
     * @memberof Op
     * @param {Port} port1
     * @param {Port} port2
     * @param {Port} port3
     */
    Op.prototype.toWorkPortsNeedToBeLinked = function ()
    {
        if (!this.patch.isEditorMode()) return;
        for (let i = 0; i < arguments.length; i++)
            if (this._linkTimeRules.needsLinkedToWork.indexOf(arguments[i]) == -1) this._linkTimeRules.needsLinkedToWork.push(arguments[i]);
    };
    Op.prototype.toWorkPortsNeedToBeLinkedReset = function ()
    {
        if (!this.patch.isEditorMode()) return;
        this._linkTimeRules.needsLinkedToWork.length = 0;
        if (this.checkLinkTimeWarnings) this.checkLinkTimeWarnings();
    };

    Op.prototype.initVarPorts = function ()
    {
        for (let i = 0; i < this.portsIn.length; i++)
        {
            if (this.portsIn[i].getVariableName()) this.portsIn[i].setVariable(this.portsIn[i].getVariableName());
        }
    };

    /**
     * refresh op parameters, if current op is selected
     * @function
     * @instance
     * @memberof Op
     */
    Op.prototype.refreshParams = function ()
    {
        if (this.patch && this.patch.isEditorMode() && this.isCurrentUiOp())
        {
            gui.opParams.show(this);
        }
    };

    /**
     * Returns true if op is selected and parameter are shown in the editor, can only return true if in editor/ui
     * @function isCurrentUiOp
     * @instance
     * @memberof Op
     * @returns {Boolean} - is current ui op
     */
    Op.prototype.isCurrentUiOp = function ()
    {
        if (this.patch.isEditorMode()) return gui.patchView.isCurrentOp(this);
    };

    /**
     * Implement to render 2d canvas based graphics from in an op
     * @function renderVizLayer
     * @instance
     * @memberof Op
     * @param {ctx} context of canvas 2d
     * @param {Object} layer info
     * @param {number} layer.x x position on canvas
     * @param {number} layer.y y position on canvas
     * @param {number} layer.width width of canvas
     * @param {number} layer.height height of canvas
     * @param {number} layer.scale current scaling of patchfield view
     */
    Op.prototype.renderVizLayer = null; // optionaly defined in op instance
}




/***/ }),

/***/ "./src/core/core_patch.js":
/*!********************************!*\
  !*** ./src/core/core_patch.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventtarget.js */ "./src/core/eventtarget.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils.js */ "./src/core/utils.js");
/* harmony import */ var _loadingstatus_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loadingstatus.js */ "./src/core/loadingstatus.js");
/* harmony import */ var _instancing_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instancing.js */ "./src/core/instancing.js");
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timer.js */ "./src/core/timer.js");
/* harmony import */ var _core_link_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core_link.js */ "./src/core/core_link.js");
/* harmony import */ var _core_profiler_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./core_profiler.js */ "./src/core/core_profiler.js");
/* harmony import */ var _cgl_cgl_state_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cgl/cgl_state.js */ "./src/core/cgl/cgl_state.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/* harmony import */ var _core_variable_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core_variable.js */ "./src/core/core_variable.js");













/**
 * Patch class, contains all operators,values,links etc. manages loading and running of the whole patch
 *
 * see {@link PatchConfig}
 *
 * @external CABLES
 * @namespace Patch
 * @hideconstructor
 * @param {PatchConfig} config The configuration object.
 * @class
 * @example
 * CABLES.patch=new CABLES.Patch(
 * {
 *     patch:pStr,
 *     glCanvasId:'glcanvas',
 *     glCanvasResizeToWindow:true,
 *     canvas:{powerPreference:"high-performance"},
 *     prefixAssetPath:'/assets/',
 *     prefixJsPath:'/js/',
 *     onError:function(e){console.log(e);}
 *     glslPrecision:'highp'
 * });
 */

const Patch = function (cfg)
{
    _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__.EventTarget.apply(this);

    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_1__["default"]("core_patch");
    this.ops = [];
    this.settings = {};
    this.config = cfg ||
        {
            "glCanvasResizeToWindow": false,
            "prefixAssetPath": "",
            "prefixJsPath": "",
            "silent": true,
            "onError": null,
            "onFinishedLoading": null,
            "onFirstFrameRendered": null,
            "onPatchLoaded": null,
            "fpsLimit": 0,
        };
    this.timer = new _timer_js__WEBPACK_IMPORTED_MODULE_2__.Timer();
    this.freeTimer = new _timer_js__WEBPACK_IMPORTED_MODULE_2__.Timer();
    this.animFrameOps = [];
    this.animFrameCallbacks = [];
    this.gui = false;
    CABLES.logSilent = this.silent = true;
    this.profiler = null;
    this.aborted = false;
    this._crashedOps = [];
    this._renderOneFrame = false;
    this._animReq = null;
    this._opIdCache = {};
    this._triggerStack = [];
    this.storeObjNames = false; // remove after may release

    this.loading = new _loadingstatus_js__WEBPACK_IMPORTED_MODULE_3__.LoadingStatus(this);

    this._volumeListeners = [];
    this._paused = false;
    this._frameNum = 0;
    this.instancing = new _instancing_js__WEBPACK_IMPORTED_MODULE_4__.Instancing();
    this.onOneFrameRendered = null;
    this.namedTriggers = {};

    this._origData = null;
    this._frameNext = 0;
    this._frameInterval = 0;
    this._lastFrameTime = 0;
    this._frameWasdelayed = true;
    this.frameStore = {};
    this.deSerialized = false;
    this.reqAnimTimeStamp = 0;

    this.cgCanvas = null;

    if (!(function () { return !this; }())) console.log("not in strict mode: core patch");

    this._isLocal = document.location.href.indexOf("file:") === 0;

    if (this.config.hasOwnProperty("silent")) this.silent = CABLES.logSilent = this.config.silent;
    if (!this.config.hasOwnProperty("doRequestAnimation")) this.config.doRequestAnimation = true;

    if (!this.config.prefixAssetPath) this.config.prefixAssetPath = "";
    if (!this.config.prefixJsPath) this.config.prefixJsPath = "";
    if (!this.config.masterVolume) this.config.masterVolume = 1.0;

    this._variables = {};
    this._variableListeners = [];
    this.vars = {};
    if (cfg && cfg.vars) this.vars = cfg.vars; // vars is old!

    this.cgl = new _cgl_cgl_state_js__WEBPACK_IMPORTED_MODULE_5__.Context(this);
    this.cgp = null;

    this._subpatchOpCache = {};

    this.cgl.setCanvas(this.config.glCanvasId || this.config.glCanvas || "glcanvas");
    if (this.config.glCanvasResizeToWindow === true) this.cgl.setAutoResize("window");
    if (this.config.glCanvasResizeToParent === true) this.cgl.setAutoResize("parent");
    this.loading.setOnFinishedLoading(this.config.onFinishedLoading);

    if (this.cgl.aborted) this.aborted = true;
    if (this.cgl.silent) this.silent = true;

    this.freeTimer.play();
    this.exec();

    if (!this.aborted)
    {
        if (this.config.patch)
        {
            this.deSerialize(this.config.patch);
        }
        else if (this.config.patchFile)
        {
            (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.ajax)(
                this.config.patchFile,
                (err, _data) =>
                {
                    const data = JSON.parse(_data);
                    if (err)
                    {
                        const txt = "";
                        this._log.error("err", err);
                        this._log.error("data", data);
                        this._log.error("data", data.msg);
                        return;
                    }
                    this.deSerialize(data);
                }
            );
        }
        this.timer.play();
    }

    console.log("made with https://cables.gl"); // eslint-disable-line
};

Patch.prototype.isPlaying = function ()
{
    return !this._paused;
};

Patch.prototype.isRenderingOneFrame = function ()
{
    return this._renderOneFrame;
};


Patch.prototype.renderOneFrame = function ()
{
    this._paused = true;
    this._renderOneFrame = true;
    this.exec();
    this._renderOneFrame = false;
};

/**
 * current number of frames per second
 * @function getFPS
 * @memberof Patch
 * @instance
 * @return {Number} fps
 */
Patch.prototype.getFPS = function ()
{
    console.log("deprecated getfps");
    return 0;
};

/**
 * returns true if patch is opened in editor/gui mode
 * @function isEditorMode
 * @memberof Patch
 * @instance
 * @return {Boolean} editor mode
 */
Patch.prototype.isEditorMode = function ()
{
    return this.config.editorMode === true;
};

/**
 * pauses patch execution
 * @function pause
 * @memberof Patch
 * @instance
 */
Patch.prototype.pause = function ()
{
    cancelAnimationFrame(this._animReq);
    this.emitEvent("pause");
    this._animReq = null;
    this._paused = true;
    this.freeTimer.pause();
};

/**
 * resumes patch execution
 * @function resume
 * @memberof Patch
 * @instance
 */
Patch.prototype.resume = function ()
{
    if (this._paused)
    {
        cancelAnimationFrame(this._animReq);
        this._paused = false;
        this.freeTimer.play();
        this.emitEvent("resume");
        this.exec();
    }
};

/**
 * set volume [0-1]
 * @function setVolume
 * @param {Number} volume
 * @memberof Patch
 * @instance
 */
Patch.prototype.setVolume = function (v)
{
    this.config.masterVolume = v;
    for (let i = 0; i < this._volumeListeners.length; i++) this._volumeListeners[i].onMasterVolumeChanged(v);
};


/**
 * get asset path
 * @function getAssetPath
 * @memberof Patch
 * @instance
 */
Patch.prototype.getAssetPath = function (patchId = null)
{
    if (this.isEditorMode())
    {
        let id = patchId || gui.project()._id;
        return "/assets/" + id + "/";
    }
    else if (document.location.href.indexOf("cables.gl") > 0 || document.location.href.indexOf("cables.local") > 0)
    {
        const parts = document.location.pathname.split("/");
        let id = patchId || parts[parts.length - 1];
        return "/assets/" + id + "/";
    }
    else if (this.config.hasOwnProperty("assetPath"))
    {
        return this.config.assetPath;
    }
    else
    {
        return "assets/";
    }
};

/**
 * get js path
 * @function getJsPath
 * @memberof Patch
 * @instance
 */
Patch.prototype.getJsPath = function ()
{
    if (this.config.hasOwnProperty("jsPath"))
    {
        return this.config.jsPath;
    }
    else
    {
        return "js/";
    }
};

/**
 * get url/filepath for a filename
 * this uses prefixAssetpath in exported patches
 * @function getFilePath
 * @memberof Patch
 * @instance
 * @param {String} filename
 * @return {String} url
 */
Patch.prototype.getFilePath = function (filename)
{
    if (!filename) return filename;
    filename = String(filename);
    if (filename.indexOf("https:") === 0 || filename.indexOf("http:") === 0) return filename;
    if (filename.indexOf("data:") === 0) return filename;
    if (filename.indexOf("file:") === 0) return filename;
    filename = filename.replace("//", "/");
    if (filename.startsWith(this.config.prefixAssetPath)) filename.replace(this.config.prefixAssetPath, "");
    return this.config.prefixAssetPath + filename + (this.config.suffixAssetPath || "");
};

Patch.prototype.clear = function ()
{
    this.emitEvent("patchClearStart");
    this.cgl.TextureEffectMesh = null;
    this.animFrameOps.length = 0;
    this.timer = new _timer_js__WEBPACK_IMPORTED_MODULE_2__.Timer();
    while (this.ops.length > 0) this.deleteOp(this.ops[0].id);

    this._opIdCache = {};
    this.emitEvent("patchClearEnd");
};

Patch.getOpClass = function (objName)
{
    const parts = objName.split(".");
    let opObj = null;

    try
    {
        if (parts.length == 2) opObj = window[parts[0]][parts[1]];
        else if (parts.length == 3) opObj = window[parts[0]][parts[1]][parts[2]];
        else if (parts.length == 4) opObj = window[parts[0]][parts[1]][parts[2]][parts[3]];
        else if (parts.length == 5) opObj = window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]];
        else if (parts.length == 6) opObj = window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]];
        else if (parts.length == 7) opObj = window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]];
        else if (parts.length == 8) opObj = window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]][parts[7]];
        else if (parts.length == 9) opObj = window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]][parts[7]][parts[8]];
        else if (parts.length == 10) opObj = window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]][parts[7]][parts[8]][parts[9]];
        return opObj;
    }
    catch (e)
    {
        return null;
    }
};

Patch.prototype.createOp = function (identifier, id, opName = null)
{
    let op = null;
    let objName = "";

    try
    {
        if (!identifier)
        {
            console.error("createop identifier false", identifier);
            console.log((new Error()).stack);
            return;
        }
        if (identifier.indexOf("Ops.") === -1)
        {
            // this should be a uuid, not a namespace
            // creating ops by id should be the default way from now on!
            const opId = identifier;



            if (CABLES.OPS[opId])
            {
                objName = CABLES.OPS[opId].objName;
                op = new CABLES.OPS[opId].f(this, objName, id, opId);
                op.opId = opId;
            }
            else
            {
                if (opName)
                {
                    identifier = opName;
                    console.log("could not find op by id: " + opId);
                }
                else
                {
                    throw new Error("could not find op by id: " + opId, { "cause": "opId:" + opId });
                }
            }
        }

        if (!op)
        {
            // fallback: create by objname!
            objName = identifier;
            const parts = identifier.split(".");
            const opObj = Patch.getOpClass(objName);

            if (!opObj)
            {
                this.emitEvent("criticalError", { "title": "unknown op" + objName, "text": "unknown op: " + objName });

                this._log.error("unknown op: " + objName);
                throw new Error("unknown op: " + objName);
            }
            else
            {
                if (parts.length == 2) op = new window[parts[0]][parts[1]](this, objName, id);
                else if (parts.length == 3) op = new window[parts[0]][parts[1]][parts[2]](this, objName, id);
                else if (parts.length == 4) op = new window[parts[0]][parts[1]][parts[2]][parts[3]](this, objName, id);
                else if (parts.length == 5) op = new window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]](this, objName, id);
                else if (parts.length == 6) op = new window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]](this, objName, id);
                else if (parts.length == 7) op = new window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]](this, objName, id);
                else if (parts.length == 8) op = new window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]][parts[7]](this, objName, id);
                else if (parts.length == 9) op = new window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]][parts[7]][parts[8]](this, objName, id);
                else if (parts.length == 10) op = new window[parts[0]][parts[1]][parts[2]][parts[3]][parts[4]][parts[5]][parts[6]][parts[7]][parts[8]][parts[9]](this, objName, id);
                else console.log("parts.length", parts.length);
            }

            if (op)
            {
                op.opId = null;
                for (const i in CABLES.OPS)
                {
                    if (CABLES.OPS[i].objName == objName) op.opId = i;
                }
            }
        }
    }
    catch (e)
    {
        this._crashedOps.push(objName);

        this.emitEvent("exceptionOp", e, objName, op);

        if (!this.isEditorMode())
        {
            this._log.error(e);
            this._log.error("[instancing error] " + objName, e);

            if (CABLES.api) CABLES.api.sendErrorReport(e);
            this.exitError("INSTANCE_ERR", "Instancing Error 1" + objName, e);
            throw new Error("instancing error 1" + objName);
        }
    }

    if (op)
    {
        op._objName = objName;
        op.patch = this;
    }
    else
    {
        this._log.log("no op was created!?", identifier, id);
    }
    return op;
};

/**
 * create a new op in patch
 * @function addOp
 * @memberof Patch
 * @instance
 * @param {String} opIdentifier, uuid or name, e.g. Ops.Math.Sum
 * @param {Object} uiAttribs Attributes
 * @param {String} id
 * @param {boolean} fromDeserialize
 * @param {String} opName, e.g. Ops.Math.Sum
 * @example
 * // add invisible op
 * patch.addOp('Ops.Math.Sum', { showUiAttribs: false });
 */
Patch.prototype.addOp = function (opIdentifier, uiAttribs, id, fromDeserialize, opName)
{
    const op = this.createOp(opIdentifier, id, opName);

    if (op)
    {
        uiAttribs = uiAttribs || {};
        if (uiAttribs.hasOwnProperty("errors")) delete uiAttribs.errors;
        if (uiAttribs.hasOwnProperty("error")) delete uiAttribs.error;
        uiAttribs.subPatch = uiAttribs.subPatch || 0;

        op.setUiAttribs(uiAttribs);
        if (op.onCreate) op.onCreate();

        if (op.hasOwnProperty("onAnimFrame")) this.addOnAnimFrame(op);
        if (op.hasOwnProperty("onMasterVolumeChanged")) this._volumeListeners.push(op);

        if (this._opIdCache[op.id])
        {
            console.log("opid with id " + op.id + " already exists in patch!");
            this.deleteOp(op.id); // strange with subpatch ops: why is this needed, somehow ops get added twice ???.....
            // return;
        }

        this.ops.push(op);
        this._opIdCache[op.id] = op;

        if (this._subPatchCacheAdd) this._subPatchCacheAdd(uiAttribs.subPatch, op);
        this.emitEvent("onOpAdd", op, fromDeserialize);

        if (op.init) op.init();

        op.emitEvent("init", fromDeserialize);
    }
    else
    {
        this._log.error("addop: no op.....");
    }

    return op;
};

Patch.prototype.addOnAnimFrame = function (op)
{
    for (let i = 0; i < this.animFrameOps.length; i++) if (this.animFrameOps[i] == op) { return; }

    this.animFrameOps.push(op);
};

Patch.prototype.removeOnAnimFrame = function (op)
{
    for (let i = 0; i < this.animFrameOps.length; i++)
    {
        if (this.animFrameOps[i] == op)
        {
            this.animFrameOps.splice(i, 1);
            return;
        }
    }
};

Patch.prototype.addOnAnimFrameCallback = function (cb)
{
    this.animFrameCallbacks.push(cb);
};

Patch.prototype.removeOnAnimCallback = function (cb)
{
    for (let i = 0; i < this.animFrameCallbacks.length; i++)
    {
        if (this.animFrameCallbacks[i] == cb)
        {
            this.animFrameCallbacks.splice(i, 1);
            return;
        }
    }
};

Patch.prototype.deleteOp = function (opid, tryRelink, reloadingOp)
{
    let found = false;
    for (const i in this.ops)
    {
        if (this.ops[i].id == opid)
        {
            const op = this.ops[i];
            let reLinkP1 = null;
            let reLinkP2 = null;

            if (op)
            {
                found = true;
                if (tryRelink)
                {
                    if (op.portsIn.length > 0 && op.portsIn[0].isLinked() && (op.portsOut.length > 0 && op.portsOut[0].isLinked()))
                    {
                        if (op.portsIn[0].getType() == op.portsOut[0].getType() && op.portsIn[0].links[0])
                        {
                            reLinkP1 = op.portsIn[0].links[0].getOtherPort(op.portsIn[0]);
                            reLinkP2 = op.portsOut[0].links[0].getOtherPort(op.portsOut[0]);
                        }
                    }
                }

                const opToDelete = this.ops[i];
                opToDelete.removeLinks();

                if (this.onDelete)
                {
                    // todo: remove
                    console.log("deprecated this.onDelete", this.onDelete);
                    this.onDelete(opToDelete);
                }

                this.ops.splice(i, 1);
                opToDelete.emitEvent("delete", opToDelete);
                this.emitEvent("onOpDelete", opToDelete, reloadingOp);

                if (this.clearSubPatchCache) this.clearSubPatchCache(opToDelete.uiAttribs.subPatch);

                if (opToDelete.onDelete) opToDelete.onDelete(reloadingOp);
                opToDelete.cleanUp();

                if (reLinkP1 !== null && reLinkP2 !== null)
                {
                    this.link(reLinkP1.op, reLinkP1.getName(), reLinkP2.op, reLinkP2.getName());
                }

                delete this._opIdCache[opid];
                break;
            }
        }
    }

    if (!found) console.log("core patch deleteop: not found...", opid);
};

Patch.prototype.getFrameNum = function ()
{
    return this._frameNum;
};

Patch.prototype.emitOnAnimFrameEvent = function (time, delta)
{
    time = time || this.timer.getTime();

    for (let i = 0; i < this.animFrameCallbacks.length; ++i)
        if (this.animFrameCallbacks[i])
            this.animFrameCallbacks[i](time, this._frameNum, delta);

    for (let i = 0; i < this.animFrameOps.length; ++i)
        if (this.animFrameOps[i].onAnimFrame)
            this.animFrameOps[i].onAnimFrame(time, this._frameNum, delta);
};

Patch.prototype.renderFrame = function (timestamp)
{
    this.timer.update(this.reqAnimTimeStamp);
    this.freeTimer.update(this.reqAnimTimeStamp);
    const time = this.timer.getTime();
    const startTime = performance.now();
    this.cgl.frameStartTime = this.timer.getTime();

    const delta = timestamp - this.reqAnimTimeStamp || timestamp;

    this.emitOnAnimFrameEvent(null, delta);

    this.cgl.profileData.profileFrameDelta = delta;
    this.reqAnimTimeStamp = timestamp;
    this.cgl.profileData.profileOnAnimFrameOps = performance.now() - startTime;

    this.emitEvent("onRenderFrame", time);

    this._frameNum++;
    if (this._frameNum == 1)
    {
        if (this.config.onFirstFrameRendered) this.config.onFirstFrameRendered();
    }
};

Patch.prototype.exec = function (timestamp)
{
    if (!this._renderOneFrame && (this._paused || this.aborted)) return;
    this.emitEvent("reqAnimFrame");
    cancelAnimationFrame(this._animReq);

    this.config.fpsLimit = this.config.fpsLimit || 0;
    if (this.config.fpsLimit)
    {
        this._frameInterval = 1000 / this.config.fpsLimit;
    }

    const now = CABLES.now();
    const frameDelta = now - this._frameNext;

    if (this.isEditorMode())
    {
        if (!this._renderOneFrame)
        {
            if (now - this._lastFrameTime >= 500 && this._lastFrameTime !== 0 && !this._frameWasdelayed)
            {
                this._lastFrameTime = 0;
                setTimeout(this.exec.bind(this), 500);
                this.emitEvent("renderDelayStart");
                this._frameWasdelayed = true;
                return;
            }
        }
    }

    if (this._renderOneFrame || this.config.fpsLimit === 0 || frameDelta > this._frameInterval || this._frameWasdelayed)
    {
        this.renderFrame(timestamp);

        if (this._frameInterval) this._frameNext = now - (frameDelta % this._frameInterval);
    }

    if (this._frameWasdelayed)
    {
        this.emitEvent("renderDelayEnd");
        this._frameWasdelayed = false;
    }

    if (this._renderOneFrame)
    {
        if (this.onOneFrameRendered) this.onOneFrameRendered(); // todo remove everywhere and use propper event...
        this.emitEvent("renderedOneFrame");
        this._renderOneFrame = false;
    }


    if (this.config.doRequestAnimation) this._animReq = this.cgl.canvas.ownerDocument.defaultView.requestAnimationFrame(this.exec.bind(this));
};

/**
 * link two ops/ports
 * @function link
 * @memberof Patch
 * @instance
 * @param {Op} op1
 * @param {String} portName1
 * @param {Op} op2
 * @param {String} portName2
 */
Patch.prototype.link = function (op1, port1Name, op2, port2Name, lowerCase, fromDeserialize)
{
    if (!op1)
    {
        console.warn("link: op1 is null ");
        return;
    }
    if (!op2)
    {
        console.warn("link: op2 is null");
        return;
    }

    const port1 = op1.getPort(port1Name, lowerCase);
    const port2 = op2.getPort(port2Name, lowerCase);

    if (!port1)
    {
        console.warn("port1 not found! " + port1Name + "(" + op1.objName + ")");
        return;
    }

    if (!port2)
    {
        console.warn("port2 not found! " + port2Name + " of " + op2.name + "(" + op2.objName + ")", op2);
        return;
    }

    if (!port1.shouldLink(port1, port2) || !port2.shouldLink(port1, port2))
    {
        return false;
    }

    if (_core_link_js__WEBPACK_IMPORTED_MODULE_7__.Link.canLink(port1, port2))
    {
        const link = new _core_link_js__WEBPACK_IMPORTED_MODULE_7__.Link(this);
        link.link(port1, port2);

        this.emitEvent("onLink", port1, port2, link, fromDeserialize);
        return link;
    }
};

Patch.prototype.serialize = function (options)
{
    const obj = {};

    options = options || {};
    obj.ops = [];
    obj.settings = this.settings;
    for (const i in this.ops)
    {
        const op = this.ops[i];
        obj.ops.push(op.getSerialized());
    }

    (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.cleanJson)(obj);

    if (options.asObject) return obj;
    return JSON.stringify(obj);
};

Patch.prototype.getOpsByRefId = function (refId)
{
    const perf = CABLES.UI.uiProfiler.start("[corepatchetend] getOpsByRefId");
    const refOps = [];
    const ops = gui.corePatch().ops;
    for (let i = 0; i < ops.length; i++)
        if (ops[i].storage && ops[i].storage.ref == refId) refOps.push(ops[i]);
    perf.finish();
    return refOps;
};


Patch.prototype.getOpById = function (opid)
{
    return this._opIdCache[opid];
};

Patch.prototype.getOpsByName = function (name)
{
    // TODO: is this still needed ? unclear behaviour....
    const arr = [];
    for (const i in this.ops)
        if (this.ops[i].name == name) arr.push(this.ops[i]);
    return arr;
};

Patch.prototype.getOpsByObjName = function (name)
{
    const arr = [];
    for (const i in this.ops)
        if (this.ops[i].objName == name) arr.push(this.ops[i]);
    return arr;
};

Patch.prototype.getOpsByOpId = function (opid)
{
    const arr = [];
    for (const i in this.ops)
        if (this.ops[i].opId == opid) arr.push(this.ops[i]);
    return arr;
};

Patch.prototype.loadLib = function (which)
{
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.ajaxSync)(
        "/ui/libs/" + which + ".js",
        (err, res) =>
        {
            const se = document.createElement("script");
            se.type = "text/javascript";
            se.text = res;
            document.getElementsByTagName("head")[0].appendChild(se);
        },
        "GET",
    );
    // open and send a synchronous request
    // xhrObj.open('GET', '/ui/libs/'+which+'.js', false);
    // xhrObj.send('');
    // add the returned content to a newly created script tag
};


Patch.prototype.getSubPatchOp = function (patchId, objName)
{
    for (const i in this.ops)
        if (this.ops[i].uiAttribs && this.ops[i].uiAttribs.subPatch == patchId && this.ops[i].objName == objName)
            return this.ops[i];
    return false;
};

Patch.prototype._addLink = function (opinid, opoutid, inName, outName)
{
    return this.link(this.getOpById(opinid), inName, this.getOpById(opoutid), outName, false, true);
};

Patch.prototype.deSerialize = function (obj, options)
{
    options = options || { "genIds": false, "createRef": false };
    if (this.aborted) return;
    const newOps = [];
    const loadingId = this.loading.start("core", "deserialize");

    this.namespace = obj.namespace || "";
    this.name = obj.name || "";

    if (typeof obj === "string") obj = JSON.parse(obj);

    this.settings = obj.settings;

    this.emitEvent("patchLoadStart");

    if (window.logStartup)logStartup("add " + obj.ops.length + " ops... ");

    const addedOps = [];
    // add ops...
    for (let iop = 0; iop < obj.ops.length; iop++)
    {
        const start = CABLES.now();
        const opData = obj.ops[iop];
        let op = null;

        try
        {
            if (opData.opId) op = this.addOp(opData.opId, opData.uiAttribs, opData.id, true, opData.objName);
            else op = this.addOp(opData.objName, opData.uiAttribs, opData.id, true);
        }
        catch (e)
        {
            console.log("[instancing error] op data:", opData, e);
            throw new Error("could not create op by id: <b>" + (opData.objName || opData.opId) + "</b> (" + opData.id + ")");
        }

        if (op)
        {
            addedOps.push(op);
            if (options.genIds) op.id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.shortId)();
            op.portsInData = opData.portsIn;
            op._origData = JSON.parse(JSON.stringify(opData));
            op.storage = opData.storage;
            // if (opData.hasOwnProperty("disabled"))op.setEnabled(!opData.disabled);

            for (const ipi in opData.portsIn)
            {
                const objPort = opData.portsIn[ipi];
                if (objPort && objPort.hasOwnProperty("name"))
                {
                    // console.log("load poirt data,objPort", objPort.name, objPort);
                    const port = op.getPort(objPort.name);

                    if (port && (port.uiAttribs.display == "bool" || port.uiAttribs.type == "bool") && !isNaN(objPort.value)) objPort.value = objPort.value == true ? 1 : 0;
                    if (port && objPort.value !== undefined && port.type != _constants_js__WEBPACK_IMPORTED_MODULE_8__.CONSTANTS.OP.OP_PORT_TYPE_TEXTURE) port.set(objPort.value);

                    if (port)
                    {
                        port.deSerializeSettings(objPort);
                    }
                    else
                    {
                        console.log("preserve", objPort.name, objPort.value);
                        op.preservedPortValues = op.preservedPortValues || {};
                        op.preservedPortValues[objPort.name] = objPort.value;
                    }
                }
            }

            for (const ipo in opData.portsOut)
            {
                const objPort = opData.portsOut[ipo];
                if (objPort && objPort.hasOwnProperty("name"))
                {
                    const port2 = op.getPort(objPort.name);
                    if (port2 && port2.type != _constants_js__WEBPACK_IMPORTED_MODULE_8__.CONSTANTS.OP.OP_PORT_TYPE_TEXTURE && objPort.hasOwnProperty("value"))
                        port2.set(obj.ops[iop].portsOut[ipo].value);

                    if (port2 && objPort.expose) port2.setUiAttribs({ "expose": true });
                }
            }
            newOps.push(op);
        }

        const timeused = Math.round(100 * (CABLES.now() - start)) / 100;
        if (!this.silent && timeused > 5) console.log("long op init ", obj.ops[iop].objName, timeused);
    }
    if (window.logStartup)logStartup("add ops done");

    for (const i in this.ops)
    {
        if (this.ops[i].onLoadedValueSet)
        {
            this.ops[i].onLoadedValueSet(this.ops[i]._origData);
            this.ops[i].onLoadedValueSet = null;
            this.ops[i]._origData = null;
        }
        this.ops[i].emitEvent("loadedValueSet");
    }

    if (window.logStartup)logStartup("creating links");

    if (options.opsCreated)options.opsCreated(addedOps);
    // create links...
    if (obj.ops)
    {
        for (let iop = 0; iop < obj.ops.length; iop++)
        {
            if (obj.ops[iop].portsIn)
            {
                for (let ipi2 = 0; ipi2 < obj.ops[iop].portsIn.length; ipi2++)
                {
                    if (obj.ops[iop].portsIn[ipi2] && obj.ops[iop].portsIn[ipi2].links)
                    {
                        for (let ili = 0; ili < obj.ops[iop].portsIn[ipi2].links.length; ili++)
                        {
                            const l = this._addLink(
                                obj.ops[iop].portsIn[ipi2].links[ili].objIn,
                                obj.ops[iop].portsIn[ipi2].links[ili].objOut,
                                obj.ops[iop].portsIn[ipi2].links[ili].portIn,
                                obj.ops[iop].portsIn[ipi2].links[ili].portOut);

                            console.log("aaaa", l);


                            // const took = performance.now - startTime;
                            // if (took > 100)console.log(obj().ops[iop].portsIn[ipi2].links[ili].objIn, obj.ops[iop].portsIn[ipi2].links[ili].objOut, took);
                        }
                    }
                }
            }
            if (obj.ops[iop].portsOut)
                for (let ipi2 = 0; ipi2 < obj.ops[iop].portsOut.length; ipi2++)
                    if (obj.ops[iop].portsOut[ipi2] && obj.ops[iop].portsOut[ipi2].links)
                    {
                        for (let ili = 0; ili < obj.ops[iop].portsOut[ipi2].links.length; ili++)
                        {
                            if (obj.ops[iop].portsOut[ipi2].links[ili])
                            {
                                if (obj.ops[iop].portsOut[ipi2].links[ili].subOpRef)
                                {
                                    // lost link
                                    const outOp = this.getOpById(obj.ops[iop].portsOut[ipi2].links[ili].objOut);
                                    let dstOp = null;
                                    let theSubPatch = 0;

                                    for (let i = 0; i < this.ops.length; i++)
                                    {
                                        if (
                                            this.ops[i].storage &&
                                            this.ops[i].storage.ref == obj.ops[iop].portsOut[ipi2].links[ili].subOpRef &&
                                            outOp.uiAttribs.subPatch == this.ops[i].uiAttribs.subPatch
                                        )
                                        {
                                            theSubPatch = this.ops[i].patchId.get();
                                            break;
                                        }
                                    }

                                    for (let i = 0; i < this.ops.length; i++)
                                    {
                                        if (
                                            this.ops[i].storage &&
                                            this.ops[i].storage.ref == obj.ops[iop].portsOut[ipi2].links[ili].refOp &&
                                            this.ops[i].uiAttribs.subPatch == theSubPatch)
                                        {
                                            dstOp = this.ops[i];
                                            break;
                                        }
                                    }

                                    if (!dstOp) this._log.warn("could not find op for lost link");
                                    else
                                    {
                                        const l = this._addLink(
                                            dstOp.id,
                                            obj.ops[iop].portsOut[ipi2].links[ili].objOut,

                                            obj.ops[iop].portsOut[ipi2].links[ili].portIn,
                                            obj.ops[iop].portsOut[ipi2].links[ili].portOut);
                                    }
                                }
                                else
                                {
                                    const l = this._addLink(obj.ops[iop].portsOut[ipi2].links[ili].objIn, obj.ops[iop].portsOut[ipi2].links[ili].objOut, obj.ops[iop].portsOut[ipi2].links[ili].portIn, obj.ops[iop].portsOut[ipi2].links[ili].portOut);

                                    if (!l)
                                    {
                                        const op1 = this.getOpById(obj.ops[iop].portsOut[ipi2].links[ili].objIn);
                                        const op2 = this.getOpById(obj.ops[iop].portsOut[ipi2].links[ili].objOut);

                                        if (!op1)console.log("could not find link op1");
                                        if (!op2)console.log("could not find link op2");

                                        const p1Name = obj.ops[iop].portsOut[ipi2].links[ili].portIn;

                                        if (op1 && !op1.getPort(p1Name))
                                        {
                                            console.log("PRESERVE port 1 not found", p1Name);

                                            op1.preservedPortLinks[p1Name] = op1.preservedPortLinks[p1Name] || [];
                                            op1.preservedPortLinks[p1Name].push(obj.ops[iop].portsOut[ipi2].links[ili]);
                                        }

                                        const p2Name = obj.ops[iop].portsOut[ipi2].links[ili].portOut;
                                        if (op2 && !op2.getPort(p2Name))
                                        {
                                            console.log("PRESERVE port 2 not found", obj.ops[iop].portsOut[ipi2].links[ili].portOut);
                                            op2.preservedPortLinks[p1Name] = op2.preservedPortLinks[p1Name] || [];
                                            op2.preservedPortLinks[p1Name].push(obj.ops[iop].portsOut[ipi2].links[ili]);
                                        }
                                    }
                                }
                            }
                        }
                    }
        }
    }

    if (window.logStartup)logStartup("calling ops onloaded");

    for (const i in this.ops)
    {
        if (this.ops[i].onLoaded)
        {
            // TODO: deprecate!!!
            this.ops[i].onLoaded();
            this.ops[i].onLoaded = null;
        }
    }

    if (window.logStartup)logStartup("initializing ops...");
    for (const i in this.ops)
    {
        if (this.ops[i].init)
        {
            this.ops[i].init();
            this.ops[i].init = null;
        }
    }

    if (window.logStartup)logStartup("initializing vars...");

    if (this.config.variables)
        for (const varName in this.config.variables)
            this.setVarValue(varName, this.config.variables[varName]);

    if (window.logStartup)logStartup("initializing var ports");

    for (const i in this.ops)
    {
        this.ops[i].initVarPorts();
        delete this.ops[i].uiAttribs.pasted;
    }

    setTimeout(() => { this.loading.finished(loadingId); }, 100);

    if (window.logStartup)logStartup("calling onPatchLoaded/patchLoadEnd");

    if (this.config.onPatchLoaded) this.config.onPatchLoaded(this);

    this.deSerialized = true;
    this.emitEvent("patchLoadEnd", newOps, obj, options.genIds);
};

Patch.prototype.profile = function (enable)
{
    this.profiler = new _core_profiler_js__WEBPACK_IMPORTED_MODULE_9__.Profiler(this);
    for (const i in this.ops)
    {
        this.ops[i].profile(enable);
    }
};

// ----------------------

/**
 * set variable value
 * @function setVariable
 * @memberof Patch
 * @instance
 * @param {String} name of variable
 * @param {Number|String|Boolean} value
 */
Patch.prototype.setVariable = function (name, val)
{
    // if (this._variables.hasOwnProperty(name))
    if (this._variables[name] !== undefined)
    {
        this._variables[name].setValue(val);
    }
    else
    {
        console.log("variable " + name + " not found!");
    }
};

Patch.prototype._sortVars = function ()
{
    if (!this.isEditorMode()) return;
    const ordered = {};
    Object.keys(this._variables).sort(
        (a, b) =>
        { return a.localeCompare(b, "en", { "sensitivity": "base" }); }
    ).forEach((key) =>
    {
        ordered[key] = this._variables[key];
    });
    this._variables = ordered;
};

/**
 * has variable
 * @function hasVariable
 * @memberof Patch
 * @instance
 * @param {String} name of variable
 */
Patch.prototype.hasVar = function (name)
{
    return this._variables[name] !== undefined;

    // return this._variables.hasOwnProperty(name);
};

// used internally
Patch.prototype.setVarValue = function (name, val, type)
{
    if (this.hasVar(name))
    {
        this._variables[name].setValue(val);
    }
    else
    {
        this._variables[name] = new _core_variable_js__WEBPACK_IMPORTED_MODULE_10__["default"](name, val, type);
        this._sortVars();
        this.emitEvent("variablesChanged");
    }
    return this._variables[name];
};
// old?
Patch.prototype.getVarValue = function (name, val)
{
    if (this._variables.hasOwnProperty(name)) return this._variables[name].getValue();
};

/**
 * @function getVar
 * @memberof Patch
 * @instance
 * @param {String} name
 * @return {Variable} variable
 */
Patch.prototype.getVar = function (name)
{
    if (this._variables.hasOwnProperty(name)) return this._variables[name];
};


Patch.prototype.deleteVar = function (name)
{
    for (let i = 0; i < this.ops.length; i++)
        for (let j = 0; j < this.ops[i].portsIn.length; j++)
            if (this.ops[i].portsIn[j].getVariableName() == name)
                this.ops[i].portsIn[j].setVariable(null);

    delete this._variables[name];
    this.emitEvent("variableDeleted", name);
    this.emitEvent("variablesChanged");
};

/**
 * @function getVars
 * @memberof Patch
 * @instance
 * @return {Array<Variable>} variables
 * @function
 */
Patch.prototype.getVars = function (t)
{
    if (t === undefined) return this._variables;

    const vars = [];
    if (t == CABLES.OP_PORT_TYPE_STRING) t = "string";
    if (t == CABLES.OP_PORT_TYPE_VALUE) t = "number";
    if (t == CABLES.OP_PORT_TYPE_ARRAY) t = "array";
    if (t == CABLES.OP_PORT_TYPE_OBJECT) t = "object";

    for (const i in this._variables)
    {
        if (!this._variables[i].type || this._variables[i].type == t) vars.push(this._variables[i]);
    }
    return vars;
};

/**
 * @function exitError
 * @memberof Patch
 * @instance
 * @description cancel patch execution and quit showing an errormessage
 * @function
 */
Patch.prototype.exitError = function (errorId, errorMessage, ex)
{
    this.aborted = true;

    if (this && this.config && this.config.onError)
    {
        this.config.onError(errorId, errorMessage);
    }
    else
    {
        if (!this.isEditorMode())
        {
            const newDiv = document.createElement("div");

            const rect = this.cgl.canvas.getBoundingClientRect();

            newDiv.setAttribute("style", "position:absolute;border:5px solid red;padding:15px;background-color:black;color:white;font-family:monospace;");
            newDiv.style.top = rect.top + "px";
            newDiv.style.left = rect.left + "px";
            let str = "cables - An error occured:<br/>";
            str += "[" + errorId + "] - " + errorMessage;
            if (ex)str += "<br/>Exception: " + ex.message;
            newDiv.innerHTML = str;

            const pe = this.cgl.canvas.parentElement;

            while (pe.hasChildNodes()) pe.removeChild(pe.lastChild);

            document.body.appendChild(newDiv);
        }
    }
};

/**
 * @function preRenderOps
 * @memberof Patch
 * @instance
 * @description invoke pre rendering of ops
 * @function
 */
Patch.prototype.preRenderOps = function ()
{
    this._log.log("prerendering...");

    for (let i = 0; i < this.ops.length; i++)
    {
        if (this.ops[i].preRender)
        {
            this.ops[i].preRender();
            this._log.log("prerender " + this.ops[i].objName);
        }
    }
};

/**
 * @function dispose
 * @memberof Patch
 * @instance
 * @description stop, dispose and cleanup patch
 */
Patch.prototype.dispose = function ()
{
    this.pause();
    this.clear();
    this.cgl.dispose();
};

Patch.prototype.pushTriggerStack = function (p)
{
    this._triggerStack.push(p);
};

Patch.prototype.popTriggerStack = function ()
{
    this._triggerStack.pop();
};

Patch.prototype.printTriggerStack = function ()
{
    if (this._triggerStack.length == 0)
    {
        // console.log("stack length", this._triggerStack.length); // eslint-disable-line
        return;
    }
    console.groupCollapsed( // eslint-disable-line
        "trigger port stack " + this._triggerStack[this._triggerStack.length - 1].op.name + "." + this._triggerStack[this._triggerStack.length - 1].name,
    );

    const rows = [];
    for (let i = 0; i < this._triggerStack.length; i++)
    {
        rows.push(i + ". " + this._triggerStack[i].op.name + " " + this._triggerStack[i].name);
    }

    console.table(rows); // eslint-disable-line
    console.groupEnd(); // eslint-disable-line
};

/**
 * returns document object of the patch could be != global document object when opening canvas ina popout window
 * @function getDocument
 * @memberof Patch
 * @instance
 * @return {Object} document
 */
Patch.prototype.getDocument = function ()
{
    return this.cgl.canvas.ownerDocument;
};

Patch.replaceOpIds = function (json, options)
{
    const opids = {};
    for (const i in json.ops)
    {
        opids[json.ops[i].id] = json.ops[i];
    }

    for (const j in json.ops)
    {
        for (const k in json.ops[j].portsOut)
        {
            const links = json.ops[j].portsOut[k].links;
            if (links)
            {
                let l = links.length;

                while (l--)
                {
                    if (links[l] && (!opids[links[l].objIn] || !opids[links[l].objOut]))
                    {
                        if (!options.doNotUnlinkLostLinks)
                        {
                            links.splice(l, 1);
                        }
                        else
                        {
                            if (options.fixLostLinks)
                            {
                                // console.log("lost link...?", links[l]);
                                const op = gui.corePatch().getOpById(links[l].objIn);
                                if (!op) console.log("op not found!");
                                else
                                {
                                    const outerOp = gui.patchView.getSubPatchOuterOp(op.uiAttribs.subPatch);
                                    if (outerOp)
                                    {
                                        op.storage = op.storage || {};
                                        op.storage.ref = op.storage.ref || CABLES.shortId();
                                        links[l].refOp = op.storage.ref;
                                        links[l].subOpRef = outerOp.storage.ref;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }



    for (const i in json.ops)
    {
        const op = json.ops[i];
        const oldId = op.id;
        let newId = CABLES.shortId();

        if (options.prefixHash) newId = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.prefixedHash)(options.prefixHash + oldId);

        else if (options.prefixId) newId = options.prefixId + oldId;
        else if (options.refAsId) // when saving json
        {
            if (op.storage && op.storage.ref)
            {
                newId = op.storage.ref;
                delete op.storage.ref;
            }
            else
            {
                op.storage = op.storage || {};
                op.storage.ref = newId = CABLES.shortId();
            }
        }

        const newID = op.id = newId;

        if (options.oldIdAsRef) // when loading json
        {
            op.storage = op.storage || {};
            op.storage.ref = oldId;
        }

        for (const j in json.ops)
        {
            if (json.ops[j].portsIn)
                for (const k in json.ops[j].portsIn)
                {
                    if (json.ops[j].portsIn[k].links)
                    {
                        let l = json.ops[j].portsIn[k].links.length;

                        while (l--) if (json.ops[j].portsIn[k].links[l] === null) json.ops[j].portsIn[k].links.splice(l, 1);

                        for (l in json.ops[j].portsIn[k].links)
                        {
                            if (json.ops[j].portsIn[k].links[l].objIn === oldId) json.ops[j].portsIn[k].links[l].objIn = newID;
                            if (json.ops[j].portsIn[k].links[l].objOut === oldId) json.ops[j].portsIn[k].links[l].objOut = newID;
                        }
                    }
                }

            if (json.ops[j].portsOut)
                for (const k in json.ops[j].portsOut)
                {
                    if (json.ops[j].portsOut[k].links)
                    {
                        let l = json.ops[j].portsOut[k].links.length;

                        while (l--) if (json.ops[j].portsOut[k].links[l] === null) json.ops[j].portsOut[k].links.splice(l, 1);

                        for (l in json.ops[j].portsOut[k].links)
                        {
                            if (json.ops[j].portsOut[k].links[l].objIn === oldId) json.ops[j].portsOut[k].links[l].objIn = newID;
                            if (json.ops[j].portsOut[k].links[l].objOut === oldId) json.ops[j].portsOut[k].links[l].objOut = newID;
                        }
                    }
                }
        }
    }

    // set correct subpatch
    const subpatchIds = [];
    const fixedSubPatches = [];

    for (let i = 0; i < json.ops.length; i++)
    {
        // if (CABLES.Op.isSubPatchOpName(json.ops[i].objName))
        if (json.ops[i].storage && json.ops[i].storage.subPatchVer)
        {
            for (const k in json.ops[i].portsIn)
            {
                if (json.ops[i].portsIn[k].name === "patchId")
                {
                    let newId = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.shortId)();

                    if (options.prefixHash) newId = (0,_utils_js__WEBPACK_IMPORTED_MODULE_6__.prefixedHash)(options.prefixHash + json.ops[i].portsIn[k].value);

                    const oldSubPatchId = json.ops[i].portsIn[k].value;
                    const newSubPatchId = json.ops[i].portsIn[k].value = newId;

                    subpatchIds.push(newSubPatchId);

                    for (let j = 0; j < json.ops.length; j++)
                    {
                        // op has no uiAttribs in export, we don't care about subpatches in export though
                        if (json.ops[j].uiAttribs)
                        {
                            if (json.ops[j].uiAttribs.subPatch === oldSubPatchId)
                            {
                                json.ops[j].uiAttribs.subPatch = newSubPatchId;
                                fixedSubPatches.push(json.ops[j].id);
                            }
                        }
                    }
                }
            }
        }
    }

    for (const kk in json.ops)
    {
        let found = false;
        for (let j = 0; j < fixedSubPatches.length; j++)
        {
            if (json.ops[kk].id === fixedSubPatches[j])
            {
                found = true;
                break;
            }
        }
        // op has no uiAttribs in export, we don't care about subpatches in export though
        if (!found && json.ops[kk].uiAttribs && options.parentSubPatchId != null)
            json.ops[kk].uiAttribs.subPatch = options.parentSubPatchId;
    }

    return json;
};

/**
 * remove an eventlistener
 * @instance
 * @function addEventListener
 * @param {String} name of event
 * @param {function} callback
 */

/**
 * remove an eventlistener
 * @instance
 * @function removeEventListener
 * @param {String} name of event
 * @param {function} callback
 */

/**
 * op added to patch event
 * @event onOpAdd
 *
 * @memberof Patch
 * @type {Object}
 * @property {Op} op new op
 */

/**
 * op deleted from patch
 * @event onOpDelete
 * @memberof Patch
 * @type {Object}
 * @property {Op} op that will be deleted
 */

/**
 * link event - two ports will be linked
 * @event onLink
 * @memberof Patch
 * @type {Object}
 * @property {Port} port1
 * @property {Port} port2
 */

/**
 * unlink event - a link was deleted
 * @event onUnLink
 * @memberof Patch
 * @type {Object}
 */

/**
 * variables has been changed / a variable has been added to the patch
 * @event variablesChanged
 * @memberof Patch
 * @type {Object}
 * @property {Port} port1
 * @property {Port} port2
 */

/**
 * configuration object for loading a patch
 * @typedef {Object} PatchConfig
 * @hideconstructor
 * @property {String} [prefixAssetPath=''] prefix for path to assets
 * @property {String} [assetPath=''] path to assets
 * @property {String} [jsPath=''] path to javascript files
 * @property {String} [glCanvasId='glcanvas'] dom element id of canvas element
 * @property {Function} [onError=null] called when an error occurs
 * @property {Function} [onFinishedLoading=null] called when patch finished loading all assets
 * @property {Function} [onFirstFrameRendered=null] called when patch rendered it's first frame
 * @property {Boolean} [glCanvasResizeToWindow=false] resize canvas automatically to window size
 * @property {Boolean} [doRequestAnimation=true] do requestAnimationFrame set to false if you want to trigger exec() from outside (only do if you know what you are doing)
 * @property {Boolean} [clearCanvasColor=true] clear canvas in transparent color every frame
 * @property {Boolean} [clearCanvasDepth=true] clear depth every frame
 * @property {Boolean} [glValidateShader=true] enable/disable validation of shaders *
 * @property {Boolean} [silent=false]
 * @property {Number} [fpsLimit=0] 0 for maximum possible frames per second
 * @property {String} [glslPrecision='mediump'] default precision for glsl shader
 *
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Patch);



/***/ }),

/***/ "./src/core/core_port.js":
/*!*******************************!*\
  !*** ./src/core/core_port.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Port": () => (/* binding */ Port)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventtarget.js */ "./src/core/eventtarget.js");
/* harmony import */ var _anim_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./anim.js */ "./src/core/anim.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./src/core/utils.js");







/**
 * data is coming into and out of ops through input and output ports
 * @external CABLES
 * @namespace Port
 * @class
 * @hideconstructor
 * @example
 * const myPort=op.inString("String Port");
 */
const Port = function (___op, name, type, uiAttribs)
{
    _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__.EventTarget.apply(this);

    this.data = {}; // UNUSED, DEPRECATED, only left in for backwards compatibility with userops
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_1__["default"]("core_port");
    /**
     * @type {Number}
     * @name direction
     * @instance
     * @memberof Port
     * @description direction of port (input(0) or output(1))
     */
    this.direction = _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.PORT.PORT_DIR_IN;
    this.id = String(CABLES.simpleId());
    this._op = ___op;

    /**
     * @type {Array<Link>}
     * @name links
     * @instance
     * @memberof Port
     * @description links of port
     */
    this.links = [];
    this.value = 0.0;
    this.name = name;
    this.type = type || _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_VALUE;
    this.uiAttribs = uiAttribs || {};
    this.anim = null;
    this._oldAnimVal = -5711;
    this.defaultValue = null;


    this._uiActiveState = true;
    this.ignoreValueSerialize = false;
    this.onLinkChanged = null;
    this.crashed = false;

    this._valueBeforeLink = null;
    this._lastAnimFrame = -1;
    this._animated = false;

    this.onValueChanged = null;
    this.onTriggered = null;
    this.onUiActiveStateChange = null;
    this.changeAlways = false;
    this.forceRefChange = false;

    this._useVariableName = null;

    this.activityCounter = 0;
    this.apf = 0;
    this.activityCounterStartFrame = 0;

    this._tempLastUiValue = null;

    Object.defineProperty(this, "title", {
        get()
        {
            return this.uiAttribs.title || this.name;
        } });


    Object.defineProperty(this, "parent", {
        get()
        {
            this._log.stack("use port.op, not .parent");
            return this._op;
        } });



    Object.defineProperty(this, "op", {
        get()
        {
            return this._op;
        } });


    Object.defineProperty(this, "val", {
        get()
        {
            this._log.warn("val getter deprecated!", this);
            this._log.stack("val getter deprecated");
            return this.get();
        },
        set(v)
        {
            this._log.warn("val setter deprecated!", this);
            this._log.stack("val setter deprecated");
            this.setValue(v);
        }
    });
};


/**
 * copy over a uiattrib from an external connected port to another port
 * @function copyLinkedUiAttrib
 * @memberof Port
 * @param {which} attrib name
 * @param {Port} source port
 * @instance
 * @example

inArray.onLinkChanged=()=>
{
    if(inArray) inArray.copyLinkedUiAttrib("stride", outArray);
};

 */
Port.prototype.copyLinkedUiAttrib = function (which, port)
{
    if (!CABLES.UI) return;
    if (!this.isLinked()) return;

    const attr = {};
    attr[which] = this.links[0].getOtherPort(this).getUiAttrib(which);
    port.setUiAttribs(attr);
};


// TODO make extend class for ports, like for ops only for ui
Port.prototype.getValueForDisplay = function ()
{
    let str = this.value;

    if (typeof this.value === "string" || this.value instanceof String)
    {
        if (str.length > 1000)
        {
            str = str.substring(0, 999);
            str += "...";
        }
        if (this.uiAttribs && (this.uiAttribs.display == "boolnum"))
        {
            str += " - ";

            if (!this.value) str += "false";
            else str += "true";
        }

        str = str.replace(/[\u00A0-\u9999<>\&]/g, function (i)
        {
            return "&#" + i.charCodeAt(0) + ";";
        });


        if (str.length > 100) str = str.substring(0, 100);
    }
    else
    {
        str = this.value;
    }
    return str;
};

/**
 * change listener for input value ports, overwrite to react to changes
 * @function onChange
 * @memberof Port
 * @instance
 * @example
 * const myPort=op.inString("MyPort");
 * myPort.onChange=function()
 * {
 *   console.log("was changed to: ",myPort.get());
 * }
 *
 */
Port.prototype.onAnimToggle = function () {};
Port.prototype._onAnimToggle = function ()
{
    this.onAnimToggle();
};


/**
 * @function remove
 * @memberof Port
 * @instance
 * @description remove port
 */
Port.prototype.remove = function ()
{
    // this.setUiAttribs({ "hidePort": true });
    this.removeLinks();
    this._op.removePort(this);
};

/**
 * set ui attributes
 * @function setUiAttribs
 * @memberof Port
 * @instance
 * @param {Object} newAttribs
 * <pre>
 * title - overwrite title of port (by default this is portname)
 * greyout - port paramater will appear greyed out, can not be
 * hidePort - port will be hidden from op
 * hideParam - port params will be hidden from parameter panel
 * showIndex - only for dropdowns - show value index (e.g. `0 - normal` )
 * editorSyntax - set syntax highlighting theme for editor port
 * ignoreObjTypeErrors - do not auto check object types
 * </pre>
 * @example
 * myPort.setUiAttribs({greyout:true});
 */
Port.prototype.setUiAttribs = function (newAttribs)
{
    let changed = false;
    if (!this.uiAttribs) this.uiAttribs = {};

    for (const p in newAttribs)
    {
        if (newAttribs[p] === undefined)
        {
            // delete newAttribs[p];
            delete this.uiAttribs[p];
            continue;
        }
        if (this.uiAttribs[p] != newAttribs[p]) changed = true;
        this.uiAttribs[p] = newAttribs[p];

        if (p == "group" && this.indexPort) this.indexPort.setUiAttribs({ "group": newAttribs[p] });
    }

    if (newAttribs.hasOwnProperty("expose")) this._op.patch.emitEvent("subpatchExpose", this._op.uiAttribs.subPatch);

    if (changed) this.emitEvent("onUiAttrChange", newAttribs, this);
};

/**
 * get ui attributes
 * @function getUiAttribs
 * @memberof Port
 * @example
 * myPort.getUiAttribs();
 */
Port.prototype.getUiAttribs = function ()
{
    return this.uiAttribs;
};

/**
 * get ui attribute
 * @function getUiAttrib
 * @memberof Port
 * @instance
 * @param {String} attribName
 * <pre>
 * attribName - return value of the ui-attribute, or null on unknown attribute
 * </pre>
 * @example
 * myPort.setUiAttribs("values");
 */
Port.prototype.getUiAttrib = function (attribName)
{
    if (!this.uiAttribs || !this.uiAttribs.hasOwnProperty(attribName))
    {
        return null;
    }
    return this.uiAttribs[attribName];
};

/**
 * @function get
 * @memberof Port
 * @instance
 * @description get value of port
 */
Port.prototype.get = function ()
{
    if (this._animated && this._lastAnimFrame != this._op.patch.getFrameNum())
    {
        this._lastAnimFrame = this._op.patch.getFrameNum();
        this.value = this.anim.getValue(this._op.patch.timer.getTime());

        this._oldAnimVal = this.value;
        this.forceChange();
    }

    return this.value;
};

Port.prototype.setRef = function (v)
{
    this.forceRefChange = true;
    this.set(v);
};

/**
 * @function setValue
 * @memberof Port
 * @instance
 * @description set value of port / will send value to all linked ports (only for output ports)
 */
Port.prototype.set = Port.prototype.setValue = function (v)
{
    if (v === undefined) v = null;

    if (this._op.enabled && !this.crashed)
    {
        if (v !== this.value || this.changeAlways || this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_TEXTURE || this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY)
        {
            if (this._animated)
            {
                this.anim.setValue(this._op.patch.timer.getTime(), v);
            }
            else
            {
                try
                {
                    this.value = v;
                    this.forceChange();
                }
                catch (ex)
                {
                    this.crashed = true;
                    this.op.crashed = true;

                    console.log("crash", this.op.objName);

                    this.setValue = function (_v) {};
                    this.onTriggered = function () {};

                    this._log.error("onvaluechanged exception cought", ex);
                    this._log.error(ex.stack);
                    this._log.warn("exception in: " + this._op.name);

                    if (this._op.patch.isEditorMode()) gui.showOpCrash(this._op);

                    this._op.patch.emitEvent("exception", ex, this._op);
                    if (this._op.onError) this._op.onError(ex);
                }

                if (this._op && this._op.patch && this._op.patch.isEditorMode() && this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_TEXTURE) gui.texturePreview().updateTexturePort(this);
            }

            if (this.direction == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.PORT.PORT_DIR_OUT) for (let i = 0; i < this.links.length; ++i) this.links[i].setValue();
        }
    }
};

Port.prototype.updateAnim = function ()
{
    if (this._animated)
    {
        this.value = this.get();

        if (this._oldAnimVal != this.value || this.changeAlways)
        {
            this._oldAnimVal = this.value;
            this.forceChange();
        }
        this._oldAnimVal = this.value;
    }
};

Port.prototype.forceChange = function ()
{
    if (this.onValueChanged || this.onChange)
    {
        // very temporary: deprecated warning!!!!!!!!!
        // if(params.length>0) this._log.warn('TOM: port has onchange params!',this._op.objName,this.name);
    }
    this._activity();
    this.emitEvent("change", this.value, this);

    if (this.onChange) this.onChange(this, this.value);
    else if (this.onValueChanged) this.onValueChanged(this, this.value); // deprecated
};

/**
 * @function getTypeString
 * @memberof Port
 * @instance
 * @description get port type as string, e.g. "Function","Value"...
 * @return {String} type
 */
Port.prototype.getTypeString = function ()
{
    if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_VALUE) return "Number";
    if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION) return "Trigger";
    if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT) return "Object";
    if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC) return "Dynamic";
    if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY) return "Array";
    if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_STRING) return "String";
    return "Unknown";
};

Port.prototype.deSerializeSettings = function (objPort)
{
    if (!objPort) return;
    if (objPort.animated) this.setAnimated(objPort.animated);
    if (objPort.useVariable) this.setVariableName(objPort.useVariable);
    if (objPort.title) this.setUiAttribs({ "title": objPort.title });
    if (objPort.expose) this.setUiAttribs({ "expose": true });
    if (objPort.order) this.setUiAttribs({ "order": objPort.order });

    if (objPort.multiPortManual) this.setUiAttribs({ "multiPortManual": objPort.multiPortManual });
    if (objPort.multiPortNum) this.setUiAttribs({ "multiPortNum": objPort.multiPortNum });

    if (objPort.anim)
    {
        if (!this.anim) this.anim = new _anim_js__WEBPACK_IMPORTED_MODULE_3__.Anim({ "name": "port " + this.name });
        this._op._hasAnimPort = true;
        this.anim.addEventListener("onChange", () =>
        {
            this._op.patch.emitEvent("portAnimUpdated", this._op, this, this.anim);
        });
        if (objPort.anim.loop) this.anim.loop = objPort.anim.loop;
        for (const ani in objPort.anim.keys)
        {
            this.anim.keys.push(new _anim_js__WEBPACK_IMPORTED_MODULE_3__.ANIM.Key(objPort.anim.keys[ani]));
        }
        this.anim.sortKeys();
    }
};

Port.prototype.setInitialValue = function (v)
{
    if (this.op.preservedPortLinks[this.name])
    {
        for (let i = 0; i < this.op.preservedPortLinks[this.name].length; i++)
        {
            const lobj = this.op.preservedPortLinks[this.name][i];
            this.op.patch._addLink(
                lobj.objIn,
                lobj.objOut,
                lobj.portIn,
                lobj.portOut);
        }
    }

    if (this.op.preservedPortValues && this.op.preservedPortValues.hasOwnProperty(this.name) && this.op.preservedPortValues[this.name] !== undefined)
    {
        this.set(this.op.preservedPortValues[this.name]);
    }
    else
    if (v !== undefined) this.set(v);
    if (v !== undefined) this.defaultValue = v;
};

Port.prototype.getSerialized = function ()
{
    let obj = { "name": this.getName() };


    if (!this.ignoreValueSerialize && this.links.length === 0)
    {
        if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT && this.value && this.value.tex) {}
        else obj.value = this.value;
    }
    if (this._useVariableName) obj.useVariable = this._useVariableName;
    if (this._animated) obj.animated = true;
    if (this.anim) obj.anim = this.anim.getSerialized();
    if (this.uiAttribs.multiPortNum) obj.multiPortNum = this.uiAttribs.multiPortNum;
    if (this.uiAttribs.multiPortManual) obj.multiPortManual = this.uiAttribs.multiPortManual;

    if (this.uiAttribs.display == "file") obj.display = this.uiAttribs.display;
    if (this.uiAttribs.expose)
    {
        obj.expose = true;
        if (this.uiAttribs.hasOwnProperty("order")) obj.order = this.uiAttribs.order;
    }
    if (this.uiAttribs.title) obj.title = this.uiAttribs.title;
    if ((this.preserveLinks || this.direction == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.PORT.PORT_DIR_OUT) && this.links.length > 0)
    {
        obj.links = [];
        for (const i in this.links)
        {
            if (!this.links[i].ignoreInSerialize && (this.links[i].portIn && this.links[i].portOut)) obj.links.push(this.links[i].getSerialized());
        }
    }

    if (this.direction == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.PORT.PORT_DIR_IN && this.links.length > 0)
    {
        for (const i in this.links)
        {
            if (!this.links[i].portIn || !this.links[i].portOut) continue;

            const otherp = this.links[i].getOtherPort(this);
            // check if functions exist, are defined in core_extend_ops code in ui
            if (otherp.op.isInBlueprint2 && this.op.isInBlueprint2)
            {
                if (otherp.op.isInBlueprint2() && !this.op.isInBlueprint2())
                {
                    obj.links = obj.links || [];
                    obj.links.push(this.links[i].getSerialized());
                }
            }
        }
    }

    if (obj.links && obj.links.length == 0) delete obj.links;
    if (this.type === _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION) delete obj.value;
    if (this.type === _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION && this.links.length == 0) obj = null;
    if (obj && Object.keys(obj).length == 1 && obj.name)obj = null; // obj is null if there is no real information other than name
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.cleanJson)(obj);

    return obj;
};

Port.prototype.shouldLink = function ()
{
    return true;
};

/**
 * @function removeLinks
 * @memberof Port
 * @instance
 * @description remove all links from port
 */
Port.prototype.removeLinks = function ()
{
    let count = 0;
    while (this.links.length > 0)
    {
        count++;
        if (count > 5000)
        {
            this._log.warn("could not delete links... / infinite loop");
            this.links.length = 0;
            break;
        }
        this.links[0].remove();
    }
};

/**
 * @function removeLink
 * @memberof Port
 * @instance
 * @description remove all link from port
 * @param {CABLES.Link} link
 */
Port.prototype.removeLink = function (link)
{
    for (const i in this.links)
        if (this.links[i] == link)
            this.links.splice(i, 1);

    if (this.direction == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.PORT.PORT_DIR_IN)
    {
        if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_VALUE) this.setValue(this._valueBeforeLink || 0);
        else this.setValue(this._valueBeforeLink || null);
    }

    if (CABLES.UI && this._op.checkLinkTimeWarnings) this._op.checkLinkTimeWarnings();

    if (this.onLinkChanged) this.onLinkChanged();
    this.emitEvent("onLinkChanged");
    this._op.emitEvent("onLinkChanged");
};

/**
 * @function getName
 * @memberof Port
 * @instance
 * @description return port name
 */
Port.prototype.getName = function ()
{
    return this.name;
};

/**
 * @function getTitle
 * @memberof Port
 * @instance
 * @description return port name or title
 */
Port.prototype.getTitle = function ()
{
    if (this.uiAttribs.title) return this.uiAttribs.title;
    return this.name;
};

Port.prototype.addLink = function (l)
{
    this._valueBeforeLink = this.value;
    this.links.push(l);
    if (CABLES.UI && this._op.checkLinkTimeWarnings) this._op.checkLinkTimeWarnings();

    if (this.onLinkChanged) this.onLinkChanged();
    this.emitEvent("onLinkChanged");
    this._op.emitEvent("onLinkChanged");
};

/**
 * @function getLinkTo
 * @memberof Port
 * @instance
 * @param {Port} otherPort
 * @description return link, which is linked to otherPort
 */
Port.prototype.getLinkTo = function (p2)
{
    for (const i in this.links) if (this.links[i].portIn == p2 || this.links[i].portOut == p2) return this.links[i];
};

/**
 * @function removeLinkTo
 * @memberof Port
 * @instance
 * @param {Port} otherPort
 * @description removes link, which is linked to otherPort
 */
Port.prototype.removeLinkTo = function (p2)
{
    for (const i in this.links)
    {
        if (this.links[i].portIn == p2 || this.links[i].portOut == p2)
        {
            this.links[i].remove();
            if (CABLES.UI && this._op.checkLinkTimeWarnings) this._op.checkLinkTimeWarnings();

            if (this.onLinkChanged) this.onLinkChanged();
            this.emitEvent("onLinkChanged");
            return;
        }
    }
};

/**
 * @function isLinkedTo
 * @memberof Port
 * @instance
 * @param {Port} otherPort
 * @description returns true if port is linked to otherPort
 */
Port.prototype.isLinkedTo = function (p2)
{
    for (const i in this.links) if (this.links[i].portIn == p2 || this.links[i].portOut == p2) return true;

    return false;
};

Port.prototype._activity = function ()
{
    this.activityCounter++;
};

/**
 * @function trigger
 * @memberof Port
 * @instance
 * @description trigger the linked port (usually invoked on an output function port)
 */
Port.prototype.trigger = function ()
{
    const linksLength = this.links.length;

    this._activity();
    if (linksLength === 0) return;
    if (!this._op.enabled) return;

    let portTriggered = null;
    try
    {
        for (let i = 0; i < linksLength; ++i)
        {
            if (this.links[i].portIn)
            {
                portTriggered = this.links[i].portIn;

                portTriggered.op.patch.pushTriggerStack(portTriggered);
                portTriggered._onTriggered();

                portTriggered.op.patch.popTriggerStack();
            }
            if (this.links[i]) this.links[i].activity();
        }
    }
    catch (ex)
    {
        portTriggered.op.enabled = false;

        if (this._op.patch.isEditorMode())
        {
            this._op.patch.emitEvent("exception", ex, portTriggered.op);
            this._op.patch.emitEvent("opcrash", portTriggered);
            console.log("crash", portTriggered.op.objName);

            if (portTriggered.op.onError) portTriggered.op.onError(ex);
        }
        this._log.warn("exception!");
        this._log.error("ontriggered exception caught", ex);
        this._log.error(ex.stack);
        this._log.warn("exception in: " + portTriggered.op.name);
    }
};

Port.prototype.call = function ()
{
    this._log.warn("call deprecated - use trigger() ");
    this.trigger();
};

Port.prototype.execute = function ()
{
    this._log.warn("### execute port: " + this.getName(), this.goals.length);
};

Port.prototype.setVariableName = function (n)
{
    this._useVariableName = n;


    this._op.patch.on("variableRename", (oldname, newname) =>
    {
        if (oldname != this._useVariableName) return;
        this._useVariableName = newname;
    });
};

Port.prototype.getVariableName = function ()
{
    return this._useVariableName;
};

Port.prototype.setVariable = function (v)
{
    this.setAnimated(false);
    const attr = { "useVariable": false };

    if (this._variableIn && this._varChangeListenerId)
    {
        this._variableIn.off(this._varChangeListenerId);
        this._variableIn = null;
    }

    if (v)
    {
        this._variableIn = this._op.patch.getVar(v);

        if (!this._variableIn)
        {
            this._log.warn("PORT VAR NOT FOUND!!!", v);
        }
        else
        {
            if (this.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT)
            {
                this._varChangeListenerId = this._variableIn.on("change", () => { this.set(null); this.set(this._variableIn.getValue()); });
            }
            else
            {
                this._varChangeListenerId = this._variableIn.on("change", this.set.bind(this));
            }
            this.set(this._variableIn.getValue());
        }
        this._useVariableName = v;
        attr.useVariable = true;
        attr.variableName = this._useVariableName;
    }
    else
    {
        attr.variableName = this._useVariableName = null;
        attr.useVariable = false;
    }

    this.setUiAttribs(attr);
    this._op.patch.emitEvent("portSetVariable", this._op, this, v);
};

Port.prototype._handleNoTriggerOpAnimUpdates = function (a)
{
    let hasTriggerPort = false;
    for (let i = 0; i < this._op.portsIn.length; i++)
    {
        if (this._op.portsIn.type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION)
        {
            hasTriggerPort = true;
            break;
        }
    }

    if (!hasTriggerPort)
    {
        if (a) this._notriggerAnimUpdate = this._op.patch.on("onRenderFrame",
            () =>
            {
                this.updateAnim();
            });
        else this._op.patch.removeEventListener(this._notriggerAnimUpdate);
    }
};

Port.prototype.setAnimated = function (a)
{
    if (this._animated != a)
    {
        this._animated = a;
        this._op._hasAnimPort = true;

        if (this._animated && !this.anim)
        {
            this.anim = new _anim_js__WEBPACK_IMPORTED_MODULE_3__.Anim({ "name": "port " + this.name });
            this.anim.addEventListener("onChange", () =>
            {
                this._op.patch.emitEvent("portAnimUpdated", this._op, this, this.anim);
            });
        }
        this._onAnimToggle();
    }

    this._handleNoTriggerOpAnimUpdates(a);
    if (!a)
    {
        this.anim = null;
    }

    this.setUiAttribs({ "isAnimated": this._animated });
};

Port.prototype.toggleAnim = function ()
{
    this._animated = !this._animated;
    if (this._animated && !this.anim)
    {
        this.anim = new _anim_js__WEBPACK_IMPORTED_MODULE_3__.Anim({ "name": "port " + this.name });
        this.anim.addEventListener("onChange", () =>
        {
            this._op.patch.emitEvent("portAnimUpdated", this._op, this, this.anim);
        });
    }
    this.setAnimated(this._animated);
    this._onAnimToggle();
    this.setUiAttribs({ "isAnimated": this._animated });
};

/**
 * <pre>
 * CABLES.CONSTANTS.OP.OP_PORT_TYPE_VALUE = 0;
 * CABLES.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION = 1;
 * CABLES.CONSTANTS.OP.OP_PORT_TYPE_OBJECT = 2;
 * CABLES.CONSTANTS.OP.OP_PORT_TYPE_TEXTURE = 2;
 * CABLES.CONSTANTS.OP.OP_PORT_TYPE_ARRAY = 3;
 * CABLES.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC = 4;
 * CABLES.CONSTANTS.OP.OP_PORT_TYPE_STRING = 5;
 * </pre>
 * @function getType
 * @memberof Port
 * @instance
 * @return {Number} type of port
 */
Port.prototype.getType = function ()
{
    return this.type;
};

/**
 * @function isLinked
 * @memberof Port
 * @instance
 * @return {Boolean} true if port is linked
 */
Port.prototype.isLinked = function ()
{
    return this.links.length > 0 || this._animated || this._useVariableName != null;
};

Port.prototype.isBoundToVar = function ()
{
    const b = this._useVariableName != null;
    this.uiAttribs.boundToVar = b;
    return b;
};
/**
 * @function isAnimated
 * @memberof Port
 * @instance
 * @return {Boolean} true if port is animated
 */
Port.prototype.isAnimated = function ()
{
    return this._animated;
};

/**
 * @function isHidden
 * @memberof Port
 * @instance
 * @return {Boolean} true if port is hidden
 */
Port.prototype.isHidden = function ()
{
    return this.uiAttribs.hidePort;
};

/**
 * @function onTriggered
 * @memberof Port
 * @instance
 * @param {onTriggeredCallback} callback
 * @description set callback, which will be executed when port was triggered (usually output port)
 */
Port.prototype._onTriggered = function (a)
{
    this._activity();
    this._op.updateAnims();
    if (this._op.enabled && this.onTriggered) this.onTriggered(a);
};

Port.prototype._onSetProfiling = function (v)
{
    this._op.patch.profiler.add("port", this);
    this.setValue(v);
    this._op.patch.profiler.add("port", null);
};

Port.prototype._onTriggeredProfiling = function ()
{
    if (this._op.enabled && this.onTriggered)
    {
        this._op.patch.profiler.add("port", this);
        this.onTriggered();
        this._op.patch.profiler.add("port", null);
    }
};



Port.prototype.getUiActiveState = function ()
{
    return this._uiActiveState;
};

Port.prototype.setUiActiveState = function (onoff)
{
    this._uiActiveState = onoff;
    if (this.onUiActiveStateChange) this.onUiActiveStateChange();
};

/**
 * @deprecated
 */
Port.prototype.onValueChange = function (cb)
{
    this.onChange = cb;
};

/**
 * @deprecated
 */
Port.prototype.hidePort = function () {};


/**
 * Returns the port type string, e.g. "value" based on the port type number
 * @function portTypeNumberToString
 * @instance
 * @memberof Port
 * @param {Number} type - The port type number
 * @returns {String} - The port type as string
 */
Port.portTypeNumberToString = function (type)
{
    if (type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_VALUE) return "value";
    if (type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_FUNCTION) return "function";
    if (type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT) return "object";
    if (type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY) return "array";
    if (type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_STRING) return "string";
    if (type == _constants_js__WEBPACK_IMPORTED_MODULE_2__.CONSTANTS.OP.OP_PORT_TYPE_DYNAMIC) return "dynamic";
    return "unknown";
};




/***/ }),

/***/ "./src/core/core_port_multi.js":
/*!*************************************!*\
  !*** ./src/core/core_port_multi.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MultiPort": () => (/* binding */ MultiPort)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/* harmony import */ var _core_port_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_port.js */ "./src/core/core_port.js");



const MIN_NUM_PORTS = 2;

class MultiPort extends _core_port_js__WEBPACK_IMPORTED_MODULE_0__.Port
{
    constructor(__parent, name, type, dir, uiAttribs)
    {
        super(__parent, name, _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.OP.OP_PORT_TYPE_ARRAY, uiAttribs);

        console.log("uiAttribs.multiPortNum", uiAttribs, this.uiAttribs);

        // this.uiAttribs.multiPortManual = uiAttribs.multiPortManual || false;
        // this.uiAttribs.multiPortNum = uiAttribs.multiPortNum || MIN_NUM_PORTS;
        this.setUiAttribs({ "multiPort": true, "group": this.name, "order": -1 });
        this.ports = [];
        this.direction = dir;

        console.log("uiattribs", uiAttribs);

        const updateArray = () =>
        {
            const arr = [];

            let ll = 1;
            if (this.uiAttribs.multiPortManual)ll = 0;

            for (let i = 0; i < this.ports.length - ll; i++)
            {
                arr[i] = this.ports[i];
            }


            this.setRef(arr);
        };

        const updateUi = () =>
        {
            let grey = !this.uiAttribs.multiPortManual || undefined;

            for (let i = 0; i < this.ports.length; i++)
            {
                let lp; // undefined to remove/not set it
                // let opacity;// undefined to remove/not set it
                // let grey;// undefined to remove/not set it
                let addPort = false;
                let title;
                let o = {};

                // if (!this.uiAttribs.multiPortManual)grey = true;
                if (i == 0) lp = this.ports.length;

                if (!this.uiAttribs.multiPortManual)
                    if (i == this.ports.length - 1)
                    {
                        console.log("adding addport...", this.uiAttribs.multiPortManual, this);
                        addPort = true;
                        grey = true;
                    }

                o.addPort = addPort;
                o.longPort = lp;
                o.greyout = grey;
                o.group = this.name;

                this.ports[i].setUiAttribs(o);
            }

            console.log(this.ports);
        };

        this.removeInvalidPorts = () =>
        {
            for (let i = 0; i < this.ports.length; i++)
            {
                if (!this.ports[i]) this.ports.splice(i, 1);
            }

            if (!this.uiAttribs.multiPortManual)
            {
                console.log("remove from auto multi port");
                for (let i = this.ports.length - 1; i > 0; i--)
                {
                    if (!this.ports[i].isLinked()) this.uiAttribs.multiPortNum = i;
                    else break;
                }
            }

            updateArray();
        };

        this.countPorts = () =>
        {
            if (gui.patchView.patchRenderer.isDraggingPort())
            {
                clearTimeout(this.retryTo);
                this.retryTo = setTimeout(this.countPorts.bind(this));
                return;
            }
            this.retryTo = null;

            let redo = false;
            this.removeListeners();
            this.removeInvalidPorts();

            for (let i = 0; i < this.ports.length; i++)
            {
                if (this.ports[i] && this.ports[i].links.length > 1)
                {
                    const po = this.ports[i + 1];
                    const otherPort = this.ports[i].links[0].getOtherPort(this.ports[i]);
                    this.ports[i].links[0].remove();
                    this.op.patch.link(this.op, po.name, otherPort.op, otherPort.name);
                    redo = true;
                    break;
                }
            }

            if (!this.uiAttribs.multiPortManual)
            {
                let foundHole = true;
                while (foundHole)
                {
                    console.log("search holes...");
                    foundHole = false;
                    for (let i = this.ports.length - 1; i > 0; i--)
                    {
                        if (this.ports[i] && this.ports[i].links.length > 0 && this.ports[i - 1].links.length == 0)
                        {
                            console.log("found hole!");

                            // found hole
                            const otherPort = this.ports[i].links[0].getOtherPort(this.ports[i]);
                            this.ports[i].links[0].remove();

                            const po = this.ports[i - 1];

                            if (po && this.ports[i])
                            {
                                console.log("move ", this.ports[i].name, "to", po.name);
                                this.op.patch.link(this.op, po.name, otherPort.op, otherPort.name);
                                foundHole = true;
                                redo = true;
                                break;
                            }
                        }
                    }


                    // this.checkNum();
                }

                // this.removeInvalidPorts();
            }


            if (this.ports.length > 2)
            {
                let i = this.ports.length - 1;
                if (!this.uiAttribs.multiPortManual)
                {
                    if (this.ports[i].links.length == 0 && this.ports[i - 1].links.length == 0)
                    {
                        this.ports[i].setUiAttribs({ "hidePort": true });
                        this.ports[i].remove();
                        this.ports[i] = null;
                    }
                }
            }
            this.removeInvalidPorts();

            if (!this.uiAttribs.multiPortManual && this.ports.length > 0 && this.ports[this.ports.length - 1].isLinked()) this.newPort();

            updateArray();
            updateUi();

            if (redo) this.countPorts();
            else this.addListeners();
        };

        this.removeListeners = () =>
        {
            for (let i = 0; i < this.ports.length; i++)
            {
                const po = this.ports[i];
                po.multiPortChangeListener = po.off(po.multiPortChangeListener);
                po.multiLinkChangeListener = po.off(po.multiLinkChangeListener);
            }
        };

        this.addListeners = () =>
        {
            for (let i = 0; i < this.ports.length; i++)
            {
                const po = this.ports[i];

                if (po.multiPortChangeListener)po.multiPortChangeListener = po.off(po.multiPortChangeListener);
                po.multiPortChangeListener = po.on("change", updateArray.bind(this));

                if (po.multiPortTriggerListener)po.multiPortTriggerListener = po.off(po.multiPortTriggerListener);
                po.multiPortTriggerListener = po.on("trigger", this.trigger());

                if (po.multiLinkChangeListener)po.multiLinkChangeListener = po.off(po.multiLinkChangeListener);
                po.multiLinkChangeListener = po.on("onLinkChanged", this.countPorts.bind(this));
            }
        };

        this.newPort = () =>
        {
            const attrs = {};
            // if (type == CABLES.OP_PORT_TYPE_STRING) attrs.type = "string";
            attrs.type = type;
            const po = new _core_port_js__WEBPACK_IMPORTED_MODULE_0__.Port(this.op, name + "_" + this.ports.length, type, attrs);

            po.direction = dir;
            this.ports.push(po);
            // console.log("CONSTANTS.PORT_DIR_OUT", CONSTANTS.PORT.PORT_DIR_OUT, this.direction);
            if (this.direction == _constants_js__WEBPACK_IMPORTED_MODULE_1__.CONSTANTS.PORT.PORT_DIR_OUT) this.op.addOutPort(po);
            else this.op.addInPort(po);

            po.setInitialValue("");
            this.addListeners();

            updateUi();
            updateArray();
            return po;
        };

        this.initPorts = () =>
        {
            for (let i = 0; i < 2; i++) this.newPort();
            updateArray();
            updateUi();
        };

        this.checkNum = () =>
        {
            this.uiAttribs.multiPortNum = Math.max(MIN_NUM_PORTS, this.uiAttribs.multiPortNum);

            while (this.ports.length < this.uiAttribs.multiPortNum) this.newPort();
            while (this.ports.length > this.uiAttribs.multiPortNum) if (this.ports[this.ports.length - 1]) this.ports.pop().remove();

            this.removeInvalidPorts();
        };

        this.incDec = (incDir) =>
        {
            this.setUiAttribs({ "multiPortNum": this.uiAttribs.multiPortNum + incDir });
            this.checkNum();

            updateUi();
        };

        this.toggleManual = () =>
        {
            this.setUiAttribs({ "multiPortManual": !this.uiAttribs.multiPortManual });
            this.removeInvalidPorts();
            this.removeInvalidPorts();
            this.checkNum();
            this.countPorts();
            updateUi();
            this.op.refreshParams();
        };

        this.on("onUiAttrChange", this.checkNum.bind(this));
        this.checkNum();
        this.countPorts();
        this.removeInvalidPorts();
        updateUi();
    }
}






/***/ }),

/***/ "./src/core/core_port_select.js":
/*!**************************************!*\
  !*** ./src/core/core_port_select.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ValueSelectPort": () => (/* binding */ ValueSelectPort)
/* harmony export */ });
/* harmony import */ var _core_port_switch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_port_switch.js */ "./src/core/core_port_switch.js");




class ValueSelectPort extends _core_port_switch_js__WEBPACK_IMPORTED_MODULE_0__.SwitchPort
{
    setUiAttribs(newAttribs)
    {
        // never unhide valuePort when indexPort is linked
        if (this.indexPort.isLinked())
        {
            for (const p in newAttribs)
            {
                if (p == "greyout" && !newAttribs[p]) newAttribs[p] = "true";
            }
        }
        super.setUiAttribs(newAttribs);
    }
}






/***/ }),

/***/ "./src/core/core_port_switch.js":
/*!**************************************!*\
  !*** ./src/core/core_port_switch.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SwitchPort": () => (/* binding */ SwitchPort)
/* harmony export */ });
/* harmony import */ var _core_port_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core_port.js */ "./src/core/core_port.js");




class SwitchPort extends _core_port_js__WEBPACK_IMPORTED_MODULE_0__.Port
{
    constructor(__parent, name, type, uiAttribs, indexPort)
    {
        super(__parent, name, type, uiAttribs);

        this.get = () =>
        {
            let s = super.get();

            if (CABLES.UI)
            {
                if (
                    s === "" ||
                    s === null ||
                    s === undefined ||
                    (uiAttribs.values && uiAttribs.values.indexOf(String(s)) === -1)
                )
                {
                    this.op.setUiError("invalidswitch", "Invalid Value [" + this.name + "]: \"" + s + "\"");
                }
                else this.op.setUiError("invalidswitch", null);
            }

            if (s === null || s === undefined)s = "";

            return s;
        };

        this.indexPort = indexPort;
        this.indexPort.set = (value) =>
        {
            const values = uiAttribs.values;

            if (!values)
            {
                // console.log("switch port has no values", this);
                return;
            }

            let intValue = Math.floor(value);

            intValue = Math.min(intValue, values.length - 1);
            intValue = Math.max(intValue, 0);

            this.indexPort.setValue(intValue);
            this.set(values[intValue]);

            if (this.op.patch.isEditorMode() && performance.now() - (this.lastTime || 0) > 100 && window.gui && gui.patchView.isCurrentOp(this.op))
            {
                gui.opParams.show(this.op);
                this.lastTime = performance.now();
            }
        };
    }

    setUiAttribs(attribs)
    {
        const hidePort = attribs.hidePort;
        attribs.hidePort = true;
        super.setUiAttribs(attribs);
        if (typeof hidePort !== "undefined")
        {
            this.indexPort.setUiAttribs({ hidePort });
        }
    }
}




/***/ }),

/***/ "./src/core/core_profiler.js":
/*!***********************************!*\
  !*** ./src/core/core_profiler.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Profiler": () => (/* binding */ Profiler)
/* harmony export */ });
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "./src/core/timer.js");


class Profiler
{
    constructor(patch)
    {
        this.startFrame = patch.getFrameNum();
        this.items = {};
        this.currentId = null;
        this.currentStart = 0;
        this._patch = patch;
    }

    getItems()
    {
        return this.items;
    }

    clear()
    {
        if (this.paused) return;
        this.items = {};
    }

    togglePause()
    {
        this.paused = !this.paused;
        if (!this.paused)
        {
            this.items = {};
            this.currentStart = performance.now();
        }
    }

    add(type, object)
    {
        if (this.paused) return;

        if (this.currentId !== null)
        {
            if (!object || object.id != this.currentId)
            {
                if (this.items[this.currentId])
                {
                    this.items[this.currentId].timeUsed += performance.now() - this.currentStart;

                    if (!this.items[this.currentId].peakTime || (0,_timer_js__WEBPACK_IMPORTED_MODULE_0__.now)() - this.items[this.currentId].peakTime > 5000)
                    {
                        this.items[this.currentId].peak = 0;
                        this.items[this.currentId].peakTime = (0,_timer_js__WEBPACK_IMPORTED_MODULE_0__.now)();
                    }
                    this.items[this.currentId].peak = Math.max(this.items[this.currentId].peak, performance.now() - this.currentStart);
                }
            }
        }

        if (object !== null)
        {
            if (!this.items[object.id])
            {
                this.items[object.id] = {
                    "numTriggers": 0,
                    "timeUsed": 0,
                };
            }

            if (this.items[object.id].lastFrame != this._patch.getFrameNum()) this.items[object.id].numTriggers = 0;

            this.items[object.id].lastFrame = this._patch.getFrameNum();
            this.items[object.id].numTriggers++;
            this.items[object.id].opid = object.op.id;
            this.items[object.id].title = object.op.name + "." + object.name;
            this.items[object.id].subPatch = object.op.uiAttribs.subPatch;

            this.currentId = object.id;
            this.currentStart = performance.now();
        }
        else
        {
            this.currentId = null;
        }
    }

    print()
    {
        console.log("--------");
        for (const i in this.items)
        {
            console.log(this.items[i].title + ": " + this.items[i].numTriggers + " / " + this.items[i].timeUsed);
        }
    }
}




/***/ }),

/***/ "./src/core/core_variable.js":
/*!***********************************!*\
  !*** ./src/core/core_variable.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/eventtarget.js");


/**
 * @type {Object}
 * @name Variable
 * @param {String} name
 * @param {String|Number} value
 * @memberof Patch
 * @constructor
 */
class PatchVariable extends cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    constructor(name, val, type)
    {
        super();
        this._name = name;
        this.type = type;
        this.setValue(val);
    }

    /**
     * keeping this for backwards compatibility in older
     * exports before using eventtarget
     *
     * @param cb
     */
    addListener(cb)
    {
        this.on("change", cb, "var");
    }

    /**
     * @function Variable.getValue
     * @memberof Variable
     * @returns {String|Number|Boolean}
     */

    getValue()
    {
        return this._v;
    }

    /**
     * @function getName
     * @memberof Variable
     * @instance
     * @returns {String|Number|Boolean}
     * @function
     */
    getName()
    {
        return this._name;
    }

    /**
     * @function setValue
     * @memberof Variable
     * @instance
     * @returns {String|Number|Boolean}
     * @function
     */
    setValue(v)
    {
        this._v = v;
        this.emitEvent("change", v, this);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatchVariable);


/***/ }),

/***/ "./src/core/embedding.js":
/*!*******************************!*\
  !*** ./src/core/embedding.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EMBED": () => (/* binding */ EMBED)
/* harmony export */ });
/* harmony import */ var _core_patch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core_patch.js */ "./src/core/core_patch.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/core/utils.js");



const EMBED = {};

/**
 * add patch into html element (will create canvas and set size to fill containerElement)
 * @name CABLES.EMBED#addPatch
 * @param {object|string} containerElement dom element or id of element
 * @param {options} patch options
 * @function
 */
EMBED.addPatch = function (_element, options)
{
    let el = _element;
    let id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.generateUUID)();
    if (typeof _element == "string")
    {
        id = _element;
        el = document.getElementById(id);

        if (!el)
        {
            console.error(id + " Polyshape Container Element not found!");
            return;
        }
    }

    const canvEl = document.createElement("canvas");
    canvEl.id = "glcanvas_" + id;
    canvEl.width = el.clientWidth;
    canvEl.height = el.clientHeight;

    window.addEventListener(
        "resize",
        function ()
        {
            this.setAttribute("width", el.clientWidth);
            this.height = el.clientHeight;
        }.bind(canvEl),
    );

    el.appendChild(canvEl);

    options = options || {};
    options.glCanvasId = canvEl.id;

    if (!options.onError)
    {
        options.onError = function (err)
        {
            console.error(err);
        };
    }

    CABLES.patch = new _core_patch_js__WEBPACK_IMPORTED_MODULE_1__["default"](options);
    return canvEl;
};




/***/ }),

/***/ "./src/core/eventtarget.js":
/*!*********************************!*\
  !*** ./src/core/eventtarget.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventTarget": () => (/* binding */ EventTarget)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");


const EventTarget = function ()
{
    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_0__["default"]("eventtarget");
    this._eventCallbacks = {};
    this._logName = "";
    this._logEvents = false;
    this._listeners = {};

    this.addEventListener = this.on = function (which, cb, idPrefix)
    {
        const event =
        {
            "id": (idPrefix || "") + CABLES.simpleId(),
            "name": which,
            "cb": cb,
        };
        if (!this._eventCallbacks[which]) this._eventCallbacks[which] = [event];
        else this._eventCallbacks[which].push(event);

        this._listeners[event.id] = event;

        return event.id;
    };

    this.hasEventListener = function (which, cb)
    {
        if (which && !cb)
        {
            // check by id
            if (this._listeners[which]) return true;
            else return false;
        }
        else
        {
            this._log.warn("old eventtarget function haseventlistener!");
            if (which && cb)
            {
                if (this._eventCallbacks[which])
                {
                    const idx = this._eventCallbacks[which].indexOf(cb);
                    if (idx == -1) return false;
                    return true;
                }
            }
        }
    };

    this.hasListenerForEventName = function (eventName)
    {
        return this._eventCallbacks[eventName] && this._eventCallbacks[eventName].length > 0;
    };

    this.removeEventListener = this.off = function (which, cb)
    {
        if (which === null || which === undefined) return;

        if (!cb) // new style, remove by id, not by name/callback
        {
            const event = this._listeners[which];
            if (!event)
            {
                this._log.log("could not find event...");
                return;
            }

            let found = true;
            while (found)
            {
                found = false;
                let index = -1;
                for (let i = 0; i < this._eventCallbacks[event.name].length; i++)
                {
                    if (this._eventCallbacks[event.name][i].id.startsWith(which)) // this._eventCallbacks[event.name][i].id == which ||
                    {
                        found = true;
                        index = i;
                    }
                }

                if (index !== -1)
                {
                    this._eventCallbacks[event.name].splice(index, 1);
                    delete this._listeners[which];
                }
            }

            return;
        }

        this._log.info("[eventtaget] ", "old function signature: removeEventListener! use listener id");
        this._log.log((new Error()).stack);

        let index = null;
        for (let i = 0; i < this._eventCallbacks[which].length; i++)
            if (this._eventCallbacks[which][i].cb == cb)
                index = i;

        if (index !== null)
        {
            delete this._eventCallbacks[index];
        }
        else this._log.warn("removeEventListener not found " + which);
    };

    this.logEvents = function (enabled, name)
    {
        this._logEvents = enabled;
        this._logName = name;
    };

    this.emitEvent = function (which, param1, param2, param3, param4, param5, param6)
    {
        if (this._logEvents) this._log.log("[event] ", this._logName, which, this._eventCallbacks);

        if (this._eventCallbacks[which])
        {
            for (let i = 0; i < this._eventCallbacks[which].length; i++)
            {
                if (this._eventCallbacks[which][i])
                {
                    this._eventCallbacks[which][i].cb(param1, param2, param3, param4, param5, param6);
                }
            }
        }
        else
        {
            if (this._logEvents) this._log.log("[event] has no event callback", which, this._eventCallbacks);
        }
    };
};




/***/ }),

/***/ "./src/core/instancing.js":
/*!********************************!*\
  !*** ./src/core/instancing.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Instancing": () => (/* binding */ Instancing)
/* harmony export */ });
// todo: needs to be removed...

const Instancing = function ()
{
    this._loops = [];
    this._indizes = [];
    this._index = 0;
};

Instancing.prototype.pushLoop = function (maxNum)
{
    this._loops.push(Math.abs(Math.floor(maxNum)));
    this._indizes.push(this._index);
};

Instancing.prototype.popLoop = function ()
{
    this._loops.pop();
    // this._index--;
    this._index = this._indizes.pop();
    if (this._loops.length === 0) this._index = 0;
};

Instancing.prototype.numLoops = function ()
{
    return this._loops.length;
};

Instancing.prototype.numCycles = function ()
{
    if (this._loops.length === 0) return 0;
    let num = this._loops[0];
    for (let i = 1; i < this._loops.length; i++) num *= this._loops[i];

    return num;
};

Instancing.prototype.inLoop = function ()
{
    return this._loops.length > 0;
};

Instancing.prototype.increment = function ()
{
    this._index++;
};

Instancing.prototype.index = function ()
{
    return this._index;
};




/***/ }),

/***/ "./src/core/loadingstatus.js":
/*!***********************************!*\
  !*** ./src/core/loadingstatus.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoadingStatus": () => (/* binding */ LoadingStatus)
/* harmony export */ });
/* harmony import */ var cables_shared_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cables-shared-client */ "../shared/client/src/logger.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./src/core/utils.js");
/* harmony import */ var _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventtarget.js */ "./src/core/eventtarget.js");




/**
 * LoadingStatus class, manages asynchronous loading jobs
 *
 * @external CABLES
 * @namespace LoadingStatus
 * @hideconstructor
 * @class
 */
const LoadingStatus = function (patch)
{
    _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__.EventTarget.apply(this);

    this._log = new cables_shared_client__WEBPACK_IMPORTED_MODULE_1__["default"]("LoadingStatus");
    this._loadingAssets = {};
    this._cbFinished = [];
    this._assetTasks = [];
    this._percent = 0;
    this._count = 0;
    this._countFinished = 0;
    this._order = 0;
    this._startTime = 0;
    this._patch = patch;
    this._wasFinishedPrinted = false;
    this._loadingAssetTaskCb = false;
};

LoadingStatus.prototype.setOnFinishedLoading = function (cb)
{
    this._cbFinished.push(cb);
};

LoadingStatus.prototype.getNumAssets = function ()
{
    return this._countFinished;
};

LoadingStatus.prototype.getProgress = function ()
{
    return this._percent;
};

LoadingStatus.prototype.checkStatus = function ()
{
    this._countFinished = 0;
    this._count = 0;

    for (const i in this._loadingAssets)
    {
        this._count++;
        if (!this._loadingAssets[i].finished)
        {
            this._countFinished++;
        }
    }

    this._percent = (this._count - this._countFinished) / this._count;

    if (this._countFinished === 0)
    {
        for (let j = 0; j < this._cbFinished.length; j++)
        {
            if (this._cbFinished[j])
            {
                const cb = this._cbFinished[j];
                setTimeout(() => { cb(this._patch); this.emitEvent("finishedAll"); }, 100);
            }
        }

        if (!this._wasFinishedPrinted)
        {
            this._wasFinishedPrinted = true;
            this.print();
        }
        this.emitEvent("finishedAll");
    }
};

LoadingStatus.prototype.getList = function ()
{
    let arr = [];
    for (const i in this._loadingAssets)
    {
        arr.push(this._loadingAssets[i]);
    }

    return arr;
};


LoadingStatus.prototype.getListJobs = function ()
{
    let arr = [];
    for (const i in this._loadingAssets)
    {
        if (!this._loadingAssets[i].finished)arr.push(this._loadingAssets[i].name);
    }

    return arr;
};

LoadingStatus.prototype.print = function ()
{
    if (this._patch.config.silent) return;

    const rows = [];

    for (const i in this._loadingAssets)
    {
        rows.push([
            this._loadingAssets[i].order,
            this._loadingAssets[i].type,
            this._loadingAssets[i].name,
            (this._loadingAssets[i].timeEnd - this._loadingAssets[i].timeStart) / 1000 + "s",
        ]);
    }

    this._log.groupCollapsed(
        "finished loading " + this._order + " assets in " + (Date.now() - this._startTime) / 1000 + "s",
    );
    this._log.table(rows);
    this._log.groupEnd();
};

LoadingStatus.prototype.finished = function (id)
{
    const l = this._loadingAssets[id];
    if (l)
    {
        if (l.finished) this._log.warn("loading job was already finished", l);

        if (l.op) l.op.setUiAttribs({ "loading": false });
        l.finished = true;
        l.timeEnd = Date.now();
    }

    this.checkStatus();
    this.emitEvent("finishedTask");
    return null;
};

LoadingStatus.prototype._startAssetTasks = function ()
{
    for (let i = 0; i < this._assetTasks.length; i++) this._assetTasks[i]();
    this._assetTasks.length = 0;
};

/**
 * delay an asset loading task, mainly to wait for ui to be finished loading and showing, and only then start loading assets
 * @function addAssetLoadingTask
 * @instance
 * @memberof Op
 * @param {function} callback
 */
LoadingStatus.prototype.addAssetLoadingTask = function (cb)
{
    if (this._patch.isEditorMode() && !CABLES.UI.loaded)
    {
        this._assetTasks.push(cb);

        if (!this._loadingAssetTaskCb)window.gui.addEventListener("uiloaded", this._startAssetTasks.bind(this));
        this._loadingAssetTaskCb = true;
    }
    else
    {
        cb();
    }
    this.emitEvent("addAssetTask");
};

LoadingStatus.prototype.existByName = function (name)
{
    for (let i in this._loadingAssets)
    {
        if (this._loadingAssets[i].name == name && !this._loadingAssets[i].finished)
            return true;
    }
};

LoadingStatus.prototype.start = function (type, name, op)
{
    if (this._startTime == 0) this._startTime = Date.now();
    const id = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.generateUUID)();

    name = name || "unknown";
    if (name.length > 100)name = name.substring(0, 100);


    if (op)op.setUiAttribs({ "loading": true });

    this._loadingAssets[id] = {
        "id": id,
        "op": op,
        "type": type,
        "name": name,
        "finished": false,
        "timeStart": Date.now(),
        "order": this._order,
    };
    this._order++;

    this.emitEvent("startTask");

    return id;
};




/***/ }),

/***/ "./src/core/sessionvar.js":
/*!********************************!*\
  !*** ./src/core/sessionvar.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Variable": () => (/* binding */ Variable)
/* harmony export */ });
// todo: old... remove this from ops...

const Variable = function ()
{
    let value = null;
    const changedCallbacks = [];

    this.onChanged = function (f)
    {
        changedCallbacks.push(f);
    };

    this.getValue = function ()
    {
        return value;
    };

    this.setValue = function (v)
    {
        value = v;
        this.emitChanged();
    };

    this.emitChanged = function ()
    {
        for (let i = 0; i < changedCallbacks.length; i++)
        {
            changedCallbacks[i]();
        }
    };
};




/***/ }),

/***/ "./src/core/timer.js":
/*!***************************!*\
  !*** ./src/core/timer.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timer": () => (/* binding */ Timer),
/* harmony export */   "internalNow": () => (/* binding */ internalNow),
/* harmony export */   "now": () => (/* binding */ now)
/* harmony export */ });
/* harmony import */ var _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventtarget.js */ "./src/core/eventtarget.js");


/** @namespace CABLES */

const internalNow = function ()
{
    return window.performance.now();
};

/**
 * current time in milliseconds
 * @memberof CABLES
 * @function now
 * @static
 */
const now = function ()
{
    return internalNow();
};

// ----------------------------

/**
 * Measuring time
 * @external CABLES
 * @namespace Timer
 * @hideconstructor
 * @class
 */
const Timer = function ()
{
    _eventtarget_js__WEBPACK_IMPORTED_MODULE_0__.EventTarget.apply(this);

    this._timeStart = internalNow();
    this._timeOffset = 0;

    this._currentTime = 0;
    this._lastTime = 0;
    this._paused = true;
    this._delay = 0;
    this.overwriteTime = -1;
};


Timer.prototype._internalNow = function ()
{
    if (this._ts) return this._ts;
    return internalNow();
};

Timer.prototype._getTime = function ()
{
    this._lastTime = (this._internalNow() - this._timeStart) / 1000;
    return this._lastTime + this._timeOffset;
};

Timer.prototype.setDelay = function (d)
{
    this._delay = d;
    this.emitEvent("timeChange");
};

/**
 * @function
 * @memberof Timer
 * @instance
 * @description returns true if timer is playing
 * @return {Boolean} value
 */
Timer.prototype.isPlaying = function ()
{
    return !this._paused;
};

/**
 * @function
 * @memberof Timer
 * @instance
 * @description update timer
 * @return {Number} time
 */
Timer.prototype.update = function (ts)
{
    if (ts) this._ts = ts;
    if (this._paused) return;
    this._currentTime = this._getTime();

    return this._currentTime;
};

/**
 * @function
 * @memberof Timer
 * @instance
 * @return {Number} time in milliseconds
 */
Timer.prototype.getMillis = function ()
{
    return this.get() * 1000;
};

/**
 * @function
 * @memberof Timer
 * @instance
 * @return {Number} value time in seconds
 */
Timer.prototype.get = Timer.prototype.getTime = function ()
{
    if (this.overwriteTime >= 0) return this.overwriteTime - this._delay;
    return this._currentTime - this._delay;
};

/**
 * toggle between play/pause state
 * @function
 * @memberof Timer
 * @instance
 */
Timer.prototype.togglePlay = function ()
{
    if (this._paused) this.play();
    else this.pause();
};

/**
 * set current time
 * @function
 * @memberof Timer
 * @instance
 * @param {Number} t
 */
Timer.prototype.setTime = function (t)
{
    if (isNaN(t) || t < 0) t = 0;
    this._timeStart = this._internalNow();
    this._timeOffset = t;
    this._currentTime = t;
    this.emitEvent("timeChange");
};

Timer.prototype.setOffset = function (val)
{
    if (this._currentTime + val < 0)
    {
        this._timeStart = this._internalNow();
        this._timeOffset = 0;
        this._currentTime = 0;
    }
    else
    {
        this._timeOffset += val;
        this._currentTime = this._lastTime + this._timeOffset;
    }
    this.emitEvent("timeChange");
};

/**
 * (re)starts the timer
 * @function
 * @memberof Timer
 * @instance
 */
Timer.prototype.play = function ()
{
    this._timeStart = this._internalNow();
    this._paused = false;
    this.emitEvent("playPause");
};

/**
 * pauses the timer
 * @function
 * @memberof Timer
 * @instance
 */
Timer.prototype.pause = function ()
{
    this._timeOffset = this._currentTime;
    this._paused = true;
    this.emitEvent("playPause");
};




/***/ }),

/***/ "./src/core/utils.js":
/*!***************************!*\
  !*** ./src/core/utils.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UTILS": () => (/* binding */ UTILS),
/* harmony export */   "ajax": () => (/* binding */ ajax),
/* harmony export */   "ajaxSync": () => (/* binding */ ajaxSync),
/* harmony export */   "basename": () => (/* binding */ basename),
/* harmony export */   "cacheBust": () => (/* binding */ cacheBust),
/* harmony export */   "clamp": () => (/* binding */ clamp),
/* harmony export */   "cleanJson": () => (/* binding */ cleanJson),
/* harmony export */   "copyArray": () => (/* binding */ copyArray),
/* harmony export */   "filename": () => (/* binding */ filename),
/* harmony export */   "generateUUID": () => (/* binding */ generateUUID),
/* harmony export */   "getShortOpName": () => (/* binding */ getShortOpName),
/* harmony export */   "keyCodeToName": () => (/* binding */ keyCodeToName),
/* harmony export */   "logStack": () => (/* binding */ logStack),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "prefixedHash": () => (/* binding */ prefixedHash),
/* harmony export */   "request": () => (/* binding */ request),
/* harmony export */   "shortId": () => (/* binding */ shortId),
/* harmony export */   "shuffleArray": () => (/* binding */ shuffleArray),
/* harmony export */   "simpleId": () => (/* binding */ simpleId),
/* harmony export */   "smoothStep": () => (/* binding */ smoothStep),
/* harmony export */   "smootherStep": () => (/* binding */ smootherStep),
/* harmony export */   "uuid": () => (/* binding */ uuid)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");

/**
 * @external CABLES
 * @namespace Utils
 */



const UTILS = {};
/**
 * Merge two Float32Arrays.
 * @function float32Concat
 * @memberof Utils
 * @param {Float32Array} first Left-hand side array
 * @param {Float32Array} second Right-hand side array
 * @return {Float32Array}
 * @static
 */
UTILS.float32Concat = function (first, second)
{
    if (!(first instanceof Float32Array)) first = new Float32Array(first);
    if (!(second instanceof Float32Array)) second = new Float32Array(second);

    const result = new Float32Array(first.length + second.length);

    result.set(first);
    result.set(second, first.length);

    return result;
};

/**
 * get op shortname: only last part of fullname and without version
 * @function getShortOpName
 * @memberof CABLES
 * @param {String} full op name
 * @static
 */
const getShortOpName = function (fullname)
{
    let name = fullname.split(".")[fullname.split(".").length - 1];

    if (name.contains(_constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.OP.OP_VERSION_PREFIX))
    {
        const n = name.split(_constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.OP.OP_VERSION_PREFIX)[1];
        name = name.substring(0, name.length - (_constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.OP.OP_VERSION_PREFIX + n).length);
    }
    return name;
};

/**
 * randomize order of an array
 * @function shuffleArray
 * @memberof Utils
 * @param {Array|Float32Array} array {Array} original
 * @return {Array|Float32Array} shuffled array
 * @static
 */
const shuffleArray = function (array)
{
    for (let i = array.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.seededRandom() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};


/**
 * generate a short "relativly unique" id
 * @function shortId
 * @memberof Utils
 * @return {String} generated ID
 * @static
 */

const _shortIds = {};
const _shortId = function ()
{
    let str = Math.random().toString(36).substr(2, 9);

    if (_shortIds.hasOwnProperty(str)) str = _shortId();
    _shortIds[str] = true;
    return str;
};
const shortId = _shortId;


/**
 * generate a UUID
 * @function uuid
 * @memberof Utils
 * @return {String} generated UUID
 * @static
 */
const _uuid = function ()
{
    let d = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) =>
    {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};
const uuid = _uuid;
const generateUUID = _uuid;



function cleanJson(obj)
{
    for (const i in obj)
    {
        if (obj[i] && typeof objValue === "object" && obj[i].constructor === Object) obj[i] = cleanJson(obj[i]);

        if (obj[i] === null || obj[i] === undefined) delete obj[i];
        else if (Array.isArray(obj[i]) && obj[i].length == 0) delete obj[i];
    }

    return obj;
}


/**
 * @see http://stackoverflow.com/q/7616461/940217
 * @return {string}
 */
const _prefixedHash = function (str, prefix = "id")
{
    let hash = 0;
    if (Array.prototype.reduce)
    {
        hash = str.split("").reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
    }
    else
    {
        if (str.length > 0)
        {
            for (let i = 0; i < str.length; i++)
            {
                let character = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + character;
                hash &= hash; // Convert to 32bit integer
            }
        }
    }
    return prefix + "" + hash;
};
const prefixedHash = _prefixedHash;

/**
 * generate a simple ID
 * @function simpleId
 * @memberof Utils
 * @return {Number} new id
 * @static
 */
let simpleIdCounter = 0;
const simpleId = function ()
{
    simpleIdCounter++;
    return simpleIdCounter;
};

/**
 * smoothStep a value
 * @function smoothStep
 * @memberof Utils
 * @function
 * @param {Number} value value to be smoothed [0-1]
 * @return {Number} smoothed value
 * @static
 */
const smoothStep = function (perc)
{
    const x = Math.max(0, Math.min(1, (perc - 0) / (1 - 0)));
    perc = x * x * (3 - 2 * x); // smoothstep
    return perc;
};

/**
 * smootherstep a value
 * @function smootherStep
 * @memberof Utils
 * @param value {Number} value to be smoothed [0-1]
 * @return {Number} smoothed value
 * @static
 */
const smootherStep = function (perc)
{
    const x = Math.max(0, Math.min(1, (perc - 0) / (1 - 0)));
    perc = x * x * x * (x * (x * 6 - 15) + 10); // smootherstep
    return perc;
};


/**
 * clamp number / make sure its between min/max
 * @function clamp
 * @memberof Utils
 * @param {Number} value value to be mapped
 * @param {Number} min minimum value
 * @param {Number} max maximum value
 * @static
 */
const clamp = function (value, min, max)
{
    return Math.min(Math.max(value, min), max);
};

/**
 * map a value in a range to a value in another range
 * @function map
 * @memberof Utils
 * @param {Number} value value to be mapped
 * @param {Number} oldMin old range minimum value
 * @param {Number} oldMax old range maximum value
 * @param {Number} newMin new range minimum value
 * @param {Number} newMax new range maximum value
 * @return {Number} mapped value
 * @static
 */
const map = function (x, _oldMin, _oldMax, _newMin, _newMax, _easing)
{
    if (x >= _oldMax) return _newMax;
    if (x <= _oldMin) return _newMin;

    let reverseInput = false;
    const oldMin = Math.min(_oldMin, _oldMax);
    const oldMax = Math.max(_oldMin, _oldMax);
    if (oldMin != _oldMin) reverseInput = true;

    let reverseOutput = false;
    const newMin = Math.min(_newMin, _newMax);
    const newMax = Math.max(_newMin, _newMax);
    if (newMin != _newMin) reverseOutput = true;

    let portion = 0;
    let r = 0;

    if (reverseInput) portion = ((oldMax - x) * (newMax - newMin)) / (oldMax - oldMin);
    else portion = ((x - oldMin) * (newMax - newMin)) / (oldMax - oldMin);

    if (reverseOutput) r = newMax - portion;
    else r = portion + newMin;

    if (!_easing) return r;
    if (_easing == 1)
    {
        // smoothstep
        x = Math.max(0, Math.min(1, (r - _newMin) / (_newMax - _newMin)));
        return _newMin + x * x * (3 - 2 * x) * (_newMax - _newMin);
    }
    if (_easing == 2)
    {
        // smootherstep
        x = Math.max(0, Math.min(1, (r - _newMin) / (_newMax - _newMin)));
        return _newMin + x * x * x * (x * (x * 6 - 15) + 10) * (_newMax - _newMin);
    }

    return r;
};

/**
 * @namespace Math
 */
/**
 * set random seed for seededRandom()
 * @memberof Math
 * @type Number
 * @static
 */
Math.randomSeed = 1;


Math.setRandomSeed = function (seed)
{
    // https://github.com/cables-gl/cables_docs/issues/622
    Math.randomSeed = seed * 50728129;
    if (seed != 0)
    {
        Math.randomSeed = Math.seededRandom() * 17624813;
        Math.randomSeed = Math.seededRandom() * 9737333;
    }
};


/**
 * generate a seeded random number
 * @function seededRandom
 * @memberof Math
 * @param {Number} max minimum possible random number
 * @param {Number} min maximum possible random number
 * @return {Number} random value
 * @static
 */
Math.seededRandom = function (max, min)
{
    if (Math.randomSeed === 0) Math.randomSeed = Math.random() * 999;
    max = max || 1;
    min = min || 0;

    Math.randomSeed = (Math.randomSeed * 9301 + 49297) % 233280;
    const rnd = Math.randomSeed / 233280.0;

    return min + rnd * (max - min);
};


// ----------------------------------------------------------------

/**
 * returns true if parameter is a number
 * @function isNumeric
 * @memberof Utils
 * @param {Any} value The value to check.
 * @return {Boolean}
 * @static
 */
UTILS.isNumeric = function (n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
};

/**
 * returns true if parameter is array
 * @function isArray
 * @param {Any} value Value to check
 * @memberof Utils
 * @return {Boolean}
 * @static
 */
UTILS.isArray = function (v)
{
    return Object.prototype.toString.call(v) === "[object Array]";
};

/**
 * @namespace String
 */

/**
 * append a linebreak to a string
 * @function endl
 * @memberof String
 * @return {String} string with newline break appended ('\n')
 */
String.prototype.endl = function ()
{
    return this + "\n";
};

/**
 * return true if string starts with prefix
 * @function startsWith
 * @memberof String
 * @param {String} prefix The prefix to check.
 * @return {Boolean}
 */
String.prototype.startsWith = function (prefix)
{
    return this.indexOf(prefix) === 0;
};

/**
 * return true if string ends with suffix
 * @function endsWith
 * @memberof String
 * @param {String} suffix
 * @return {Boolean}
 */
String.prototype.endsWith = String.prototype.endsWith || function (suffix)
{
    return this.match(suffix + "$") == suffix;
};

/**
 * return true if string contains string
 * @function contains
 * @memberof String
 * @param {String} searchStr
 * @return {Boolean}
 */
String.prototype.contains = String.prototype.contains || function (searchStr)
{
    return this.indexOf(searchStr) > -1;
};



// ----------------------------------------------------------------

/**
 * append a unique/random parameter to a url, so the browser is forced to reload the file, even if its cached
 * @function cacheBust
 * @static
 * @memberof Utils
 * @param {String} url The url to append the cachebuster parameter to.
 * @return {String} url with cachebuster parameter
 */
const cacheBust = function (url)
{
    if (url.startsWith("data:")) return;
    if (url.contains("?")) url += "&";
    else url += "?";
    return url + "cache=" + CABLES.uuid();
};

/**
 * copy the content of an array
 * @function copyArray
 * @static
 * @memberof Utils
 * @param {Array} sourceArray
 * @param {Array} dst optional
 * @return {Array} dst
 */
const copyArray = function (src, dst)
{
    if (!src) return null;
    dst = dst || [];
    dst.length = src.length;
    for (let i = 0; i < src.length; i++)
    {
        dst[i] = src[i];
    }

    return dst;
};


/**
 * return the filename part of a url without extension
 * @function basename
 * @static
 * @memberof Utils
 * @param {String} url
 * @return {String} just the filename
 */
const basename = function (url)
{
    let name = CABLES.filename(url);

    const parts2 = name.split(".");
    name = parts2[0];

    return name;
};

/**
 * output a stacktrace to the console
 * @function logStack
 * @static
 * @memberof Utils
 */
const logStack = function ()
{
    console.log("logstack", (new Error()).stack);
};

/**
 * return the filename part of a url
 * @function filename
 * @static
 * @memberof Utils
 * @param {String} url
 * @return {String} just the filename
 */
const filename = function (url)
{
    let name = "";
    if (!url) return "";

    if (url.startsWith("data:") && url.contains(":"))
    {
        const parts = url.split(",");
        return parts[0];
    }

    const parts = (url + "").split("/");
    if (parts.length > 0)
    {
        const str = parts[parts.length - 1];
        let parts2 = str.split("?");
        name = parts2[0];
    }

    return name || "";
};


const ajaxSync = function (url, cb, method, post, contenttype)
{
    request({
        "url": url,
        "cb": cb,
        "method": method,
        "data": post,
        "contenttype": contenttype,
        "sync": true,
    });
};

/**
 * make an ajax request
 * @function ajax
 * @static
 */
const ajax = function (url, cb, method, post, contenttype, jsonP, headers = {}, options = {})
{
    const requestOptions = {
        "url": url,
        "cb": cb,
        "method": method,
        "data": post,
        "contenttype": contenttype,
        "sync": false,
        "jsonP": jsonP,
        "headers": headers,
    };
    if (options && options.credentials) requestOptions.credentials = options.credentials;
    request(requestOptions);
};

const request = function (options)
{
    if (!options.hasOwnProperty("asynch")) options.asynch = true;

    let xhr;
    try
    {
        xhr = new XMLHttpRequest();
    }
    catch (e) {}

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState != 4) return;

        if (options.cb)
        {
            if (xhr.status == 200 || xhr.status == 0) options.cb(false, xhr.responseText, xhr);
            else options.cb(true, xhr.responseText, xhr);
        }
    };

    try
    {
        xhr.open(options.method ? options.method.toUpperCase() : "GET", options.url, !options.sync);
    }
    catch (e)
    {
        if (options.cb && e) options.cb(true, e.msg, xhr);
    }

    if (typeof options.headers === "object")
    {
        const keys = Object.keys(options.headers);
        for (let i = 0; i < keys.length; i++)
        {
            const name = keys[i];
            const value = options.headers[name];
            xhr.setRequestHeader(name, value);
        }
    }

    if (options.credentials && options.credentials !== "omit")
    {
        xhr.withCredentials = true;
    }

    try
    {
        if (!options.post && !options.data)
        {
            xhr.send();
        }
        else
        {
            xhr.setRequestHeader(
                "Content-type",
                options.contenttype ? options.contenttype : "application/x-www-form-urlencoded",
            );
            xhr.send(options.data || options.post);
        }
    }
    catch (e)
    {
        if (options.cb) options.cb(true, e.msg, xhr);
    }
};


const keyCodeToName = function (keyCode)
{
    if (!keyCode && keyCode !== 0) return "Unidentified";
    const keys = {
        "8": "Backspace",
        "9": "Tab",
        "12": "Clear",
        "13": "Enter",
        "16": "Shift",
        "17": "Control",
        "18": "Alt",
        "19": "Pause",
        "20": "CapsLock",
        "27": "Escape",
        "32": "Space",
        "33": "PageUp",
        "34": "PageDown",
        "35": "End",
        "36": "Home",
        "37": "ArrowLeft",
        "38": "ArrowUp",
        "39": "ArrowRight",
        "40": "ArrowDown",
        "45": "Insert",
        "46": "Delete",
        "112": "F1",
        "113": "F2",
        "114": "F3",
        "115": "F4",
        "116": "F5",
        "117": "F6",
        "118": "F7",
        "119": "F8",
        "120": "F9",
        "121": "F10",
        "122": "F11",
        "123": "F12",
        "144": "NumLock",
        "145": "ScrollLock",
        "224": "Meta"
    };
    if (keys[keyCode])
    {
        return keys[keyCode];
    }
    else
    {
        return String.fromCharCode(keyCode);
    }
};
// ----------------------------------------------------------------

window.performance = window.performance || {
    "offset": Date.now(),
    "now": function now()
    {
        return Date.now() - this.offset;
    },
};




/***/ }),

/***/ "./src/core/webaudio.js":
/*!******************************!*\
  !*** ./src/core/webaudio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WEBAUDIO": () => (/* binding */ WEBAUDIO)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/** @namespace WEBAUDIO */



const WEBAUDIO = {};

WEBAUDIO.toneJsInitialized = false;

/*
 * External JSDoc definitions
 */

/**
 * Part of the Web Audio API, the AudioBuffer interface represents a short audio asset residing in memory.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer}
 */

/**
 * Part of the Web Audio API, the AudioNode interface is a generic interface for representing an audio processing module.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioNode}
 */

/**
 * The AudioContext interface represents an audio-processing graph built from audio modules linked together
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioContext}
 */

/**
 * Checks if a global audio context has been created and creates
 * it if necessary. This audio context can be used for native Web Audio as well as Tone.js ops.
 * Associates the audio context with Tone.js if it is being used
 * @param {CABLES.Op} op - The operator which needs the Audio Context
 */
WEBAUDIO.createAudioContext = function (op)
{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if (window.AudioContext)
    {
        if (!window.audioContext)
        {
            window.audioContext = new AudioContext();
        }
        // check if tone.js lib is being used
        if (window.Tone && !WEBAUDIO.toneJsInitialized)
        {
            // set current audio context in tone.js
            Tone.setContext(window.audioContext);
            WEBAUDIO.toneJsInitialized = true;
        }
    }
    else
    {
        op.patch.config.onError("NO_WEBAUDIO", "Web Audio is not supported in this browser.");
        return;
    }
    return window.audioContext;
};

/**
 * Returns the audio context.
 * Before `createAudioContext` must have been called at least once.
 * It most cases you should use `createAudioContext`, which just returns the audio context
 * when it has been created already.
 */
WEBAUDIO.getAudioContext = function ()
{
    return window.audioContext;
};

/**
 * Creates an audio in port for the op with name `portName`
 * When disconnected it will disconnect the previous connected audio node
 * from the op's audio node.
 * @param {CABLES.Op} op - The operator to create the audio port in
 * @param {string} portName - The name of the port
 * @param {AudioNode} audioNode - The audionode incoming connections should connect to
 * @param {number} [inputChannelIndex=0] - If the audio node has multiple inputs, this is the index of the input channel to connect to
 * @returns {CABLES.Port|undefined} - The newly created audio in port or `undefined` if there was an error
 */
WEBAUDIO.createAudioInPort = function (op, portName, audioNode, inputChannelIndex)
{
    if (!op || !portName || !audioNode)
    {
        const msg = "ERROR: createAudioInPort needs three parameters, op, portName and audioNode";
        op.log(msg);
        throw new Error(msg);
        // return;
    }
    if (!inputChannelIndex)
    {
        inputChannelIndex = 0;
    }
    op.webAudio = op.webAudio || {};
    op.webAudio.audioInPorts = op.webAudio.audioInPorts || [];
    const port = op.inObject(portName);
    port.webAudio = {};
    port.webAudio.previousAudioInNode = null;
    port.webAudio.audioNode = audioNode;

    op.webAudio.audioInPorts[portName] = port;

    port.onChange = function ()
    {
        const audioInNode = port.get();
        // when port disconnected, disconnect audio nodes
        if (!audioInNode)
        {
            if (port.webAudio.previousAudioInNode)
            {
                try
                {
                    if (port.webAudio.previousAudioInNode.disconnect) port.webAudio.previousAudioInNode.disconnect(port.webAudio.audioNode, 0, inputChannelIndex);
                    op.setUiError("audioCtx", null);
                }
                catch (e)
                {
                    try
                    {
                        port.webAudio.previousAudioInNode.disconnect(port.webAudio.audioNode);
                    }
                    catch (er)
                    {
                        op.log(
                            "Disconnecting audio node with in/out port index, as well as without in/out-port-index did not work ",
                            e,
                        );
                        if (e.printStackTrace)
                        {
                            e.printStackTrace();
                        }
                        throw e;
                    }
                }
            }
        }
        else
        {
            try
            {
                if (audioInNode.connect)
                {
                    audioInNode.connect(port.webAudio.audioNode, 0, inputChannelIndex);
                    op.setUiError("audioCtx", null);
                }
                else op.setUiError("audioCtx", "The passed input is not an audio context. Please make sure you connect an audio context to the input.", 2);
            }
            catch (e)
            {
                op.log("Error: Failed to connect web audio node!", e);
                op.log("port.webAudio.audioNode", port.webAudio.audioNode);
                op.log("audioInNode: ", audioInNode);
                op.log("inputChannelIndex:", inputChannelIndex);
                op.log("audioInNode.connect: ", audioInNode.connect);
                throw e;
            }
        }
        port.webAudio.previousAudioInNode = audioInNode;
    };
    // TODO: Maybe add subtype to audio-node-object?
    return port;
};

/**
 * Sometimes it is necessary to replace a node of a port, if so all
 * connections to this node must be disconnected and connections to the new
 * node must be made.
 * Can be used for both Audio ports as well as AudioParam ports
 * if used with an AudioParam pass e.g. `synth.frequency` as newNode
 * @param {CABLES.Port} port - The port where the audio node needs to be replaced
 */
WEBAUDIO.replaceNodeInPort = function (port, oldNode, newNode)
{
    const connectedNode = port.webAudio.previousAudioInNode;
    // check if connected
    if (connectedNode && connectedNode.disconnect)
    {
        try
        {
            connectedNode.disconnect(oldNode);
        }
        catch (e)
        {
            if (e.printStackTrace)
            {
                e.printStackTrace();
            }
            throw new Error("replaceNodeInPort: Could not disconnect old audio node. " + e.name + " " + e.message);
        }
        port.webAudio.audioNode = newNode;
        try
        {
            connectedNode.connect(newNode);
        }
        catch (e)
        {
            if (e.printStackTrace)
            {
                e.printStackTrace();
            }
            throw new Error("replaceNodeInPort: Could not connect to new node. " + e.name + " " + e.message);
        }
    }
};

/**
 * Creates an audio out port which takes care of (dis-)connecting on it’s own
 * @param {CABLES.op} op - The op to create an audio out port for
 * @param {string} portName - The name of the port to be created
 * @param {AudioNode} audioNode - The audio node to link to the port
 * @returns {(CABLES.Port|undefined)} - The newly created audio out port or `undefined` if there was an error
 */
WEBAUDIO.createAudioOutPort = function (op, portName, audioNode)
{
    if (!op || !portName || !audioNode)
    {
        const msg = "ERROR: createAudioOutPort needs three parameters, op, portName and audioNode";
        op.log(msg);
        throw new Error(msg);
    }

    const port = op.outObject(portName);
    // TODO: Maybe add subtype to audio-node-object?
    port.set(audioNode);
    return port;
};

/**
 * Creates an audio param in port for the op with name portName.
 * The port accepts other audio nodes as signals as well as values (numbers)
 * When the port is disconnected it will disconnect the previous connected audio node
 * from the op's audio node and restore the number value set before.
 * @param {CABLES.Op} op - The operator to create an audio param input port for
 * @param {string} portName - The name of the port to create
 * @returns {(CABLES.Port|undefined)} - The newly created port, which takes care of (dis-)connecting on its own, or `undefined` if there was an error
 */
WEBAUDIO.createAudioParamInPort = function (op, portName, audioNode, options, defaultValue)
{
    if (!op || !portName || !audioNode)
    {
        op.log("ERROR: createAudioParamInPort needs three parameters, op, portName and audioNode");
        if (op && op.name) op.log("opname: ", op.name);
        op.log("portName", portName);
        op.log("audioNode: ", audioNode);
        return;
    }
    op.webAudio = op.webAudio || {};
    op.webAudio.audioInPorts = op.webAudio.audioInPorts || [];
    // var port = op.inObject(portName);
    const port = op.inDynamic(
        portName,
        [_constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.OP.OP_PORT_TYPE_VALUE, _constants_js__WEBPACK_IMPORTED_MODULE_0__.CONSTANTS.OP.OP_PORT_TYPE_OBJECT],
        options,
        defaultValue,
    );
    port.webAudio = {};
    port.webAudio.previousAudioInNode = null;
    port.webAudio.audioNode = audioNode;

    op.webAudio.audioInPorts[portName] = port;

    // port.onLinkChanged = function() {
    //   op.log("onLinkChanged");
    //   if(port.isLinked()) {
    //
    //       if(port.links[0].portOut.type === CABLES.CONSTANTS.OP.OP_PORT_TYPE_) { // value
    //
    //       } else if(port.links[0].portOut.type === CABLES.CONSTANTS.OP.OP_PORT_TYPE_OBJECT) { // object
    //
    //       }
    //   } else { // unlinked
    //
    //   }
    // };

    port.onChange = function ()
    {
        const audioInNode = port.get();
        const node = port.webAudio.audioNode;
        const audioCtx = WEBAUDIO.getAudioContext();

        if (audioInNode != undefined)
        {
            if (typeof audioInNode === "object" && audioInNode.connect)
            {
                try
                {
                    audioInNode.connect(node);
                }
                catch (e)
                {
                    op.log("Could not connect audio node: ", e);
                    if (e.printStackTrace)
                    {
                        e.printStackTrace();
                    }
                    throw e;
                }
                port.webAudio.previousAudioInNode = audioInNode;
            }
            else
            {
                // tone.js audio param
                if (node._param && node._param.minValue && node._param.maxValue)
                {
                    if (audioInNode >= node._param.minValue && audioInNode <= node._param.maxValue)
                    {
                        try
                        {
                            if (node.setValueAtTime)
                            {
                                node.setValueAtTime(audioInNode, audioCtx.currentTime);
                            }
                            else
                            {
                                node.value = audioInNode;
                            }
                        }
                        catch (e)
                        {
                            op.log("Possible AudioParam problem with tone.js op: ", e);
                            if (e.printStackTrace)
                            {
                                e.printStackTrace();
                            }
                            throw e;
                        }
                    }
                    else
                    {
                        op.log("Warning: The value for an audio parameter is out of range!");
                    }
                } // native Web Audio param
                else if (node.minValue && node.maxValue)
                {
                    if (audioInNode >= node.minValue && audioInNode <= node.maxValue)
                    {
                        try
                        {
                            if (node.setValueAtTime)
                            {
                                node.setValueAtTime(audioInNode, audioCtx.currentTime);
                            }
                            else
                            {
                                node.value = audioInNode;
                            }
                        }
                        catch (e)
                        {
                            op.log(
                                "AudioParam has minValue / maxValue defined, and value is in range, but setting the value failed! ",
                                e,
                            );
                            if (e.printStackTrace)
                            {
                                e.printStackTrace();
                            }
                            throw e;
                        }
                    }
                    else
                    {
                        op.log("Warning: The value for an audio parameter is out of range!");
                    }
                } // no min-max values, try anyway
                else
                {
                    try
                    {
                        if (node.setValueAtTime)
                        {
                            node.setValueAtTime(audioInNode, audioCtx.currentTime);
                        }
                        else
                        {
                            node.value = audioInNode;
                        }
                    }
                    catch (e)
                    {
                        op.log("Possible AudioParam problem (without minValue / maxValue): ", e);
                        if (e.printStackTrace)
                        {
                            e.printStackTrace();
                        }
                        throw e;
                    }
                }

                if (port.webAudio.previousAudioInNode && port.webAudio.previousAudioInNode.disconnect)
                {
                    try
                    {
                        port.webAudio.previousAudioInNode.disconnect(node);
                    }
                    catch (e)
                    {
                        op.log("Could not disconnect previous audio node: ", e);
                        throw e;
                    }
                    port.webAudio.previousAudioInNode = undefined;
                }
            }
        }
        else
        {
            // disconnected
            if (port.webAudio.previousAudioInNode)
            {
            }
        }
    };
    return port;
};


/**
 * Loads an audio file and updates the loading indicators when cables is run in the editor.
 * @param {CABLES.Patch} patch - The cables patch, when called from inside an op this is `op.patch`
 * @param {string} url - The url of the audio file to load
 * @param {loadAudioFileFinishedCallback} onFinished - The callback to be called when the loading is finished, passes the AudioBuffer
 * @param {loadAudioFileErrorCallback} onError - The callback when there was an error loading the file, the rror message is passed
 * @see {@link https://developer.mozilla.org/de/docs/Web/API/AudioContext/decodeAudioData}
 */
WEBAUDIO.loadAudioFile = function (patch, url, onFinished, onError, loadingTask)
{
    const audioContext = WEBAUDIO.createAudioContext();

    let loadingId = null;
    if (loadingTask || loadingTask === undefined)
    {
        loadingId = patch.loading.start("audio", url);
        if (patch.isEditorMode()) gui.jobs().start({ "id": "loadaudio" + loadingId, "title": " loading audio (" + url + ")" });
    }
    const request = new XMLHttpRequest();
    if (!url)
    {
        return;
    }
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    // TODO: maybe crossorigin stuff needed?
    // Decode asynchronously
    request.onload = function ()
    {
        patch.loading.finished(loadingId);
        if (patch.isEditorMode()) gui.jobs().finish("loadaudio" + loadingId);
        audioContext.decodeAudioData(request.response, onFinished, onError);
    };
    request.send();
};

/**
 * Checks if the passed time is a valid time to be used in any of the Tone.js ops.
 * @param {(string|number)} t - The time to check
 * @returns {boolean} - True if time is valid, false if not
 */
WEBAUDIO.isValidToneTime = function (t)
{
    try
    {
        const time = new Tone.Time(t);
    }
    catch (e)
    {
        return false;
    }
    return true;
};

/**
 * Checks if the passed note is a valid note to be used with Tone.js
 * @param {string} note - The note to be checked, e.g. `"C4"`
 * @returns {boolean} - True if the note is a valid note, false otherwise
 */
WEBAUDIO.isValidToneNote = function (note)
{
    try
    {
        Tone.Frequency(note);
    }
    catch (e)
    {
        return false;
    }
    return true;
};




/***/ }),

/***/ "../shared/client/src/eventtarget.js":
/*!*******************************************!*\
  !*** ../shared/client/src/eventtarget.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Events)
/* harmony export */ });
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper.js */ "../shared/client/src/helper.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger.js */ "../shared/client/src/logger.js");



class Events
{
    constructor()
    {
        this._log = new _logger_js__WEBPACK_IMPORTED_MODULE_0__["default"]("eventtarget");
        this._eventCallbacks = {};
        this._logName = "";
        this._logEvents = false;
        this._listeners = {};

        this.on = this.addEventListener;
        this.off = this.removeEventListener;
    }

    addEventListener(which, cb, idPrefix)
    {
        const event =
            {
                "id": (idPrefix || "") + _helper_js__WEBPACK_IMPORTED_MODULE_1__["default"].simpleId(),
                "name": which,
                "cb": cb,
            };
        if (!this._eventCallbacks[which]) this._eventCallbacks[which] = [event];
        else this._eventCallbacks[which].push(event);

        this._listeners[event.id] = event;

        return event.id;
    }

    hasEventListener(which, cb)
    {
        if (which && !cb)
        {
            // check by id
            return !!this._listeners[which];
        }
        else
        {
            this._log.warn("old eventtarget function haseventlistener!");
            if (which && cb)
            {
                if (this._eventCallbacks[which])
                {
                    const idx = this._eventCallbacks[which].indexOf(cb);
                    return idx !== -1;
                }
            }
        }
    }

    hasListenerForEventName(eventName)
    {
        return this._eventCallbacks[eventName] && this._eventCallbacks[eventName].length > 0;
    }

    removeEventListener(which, cb)
    {
        if (which === null || which === undefined) return;

        if (!cb) // new style, remove by id, not by name/callback
        {
            const event = this._listeners[which];
            if (!event)
            {
                this._log.log("could not find event...");
                return;
            }

            let found = true;
            while (found)
            {
                found = false;
                let index = -1;
                for (let i = 0; i < this._eventCallbacks[event.name].length; i++)
                {
                    if (this._eventCallbacks[event.name][i].id.indexOf(which) === 0) // this._eventCallbacks[event.name][i].id == which ||
                    {
                        found = true;
                        index = i;
                    }
                }

                if (index !== -1)
                {
                    this._eventCallbacks[event.name].splice(index, 1);
                    delete this._listeners[which];
                }
            }

            return;
        }

        this._log.info("[eventtaget] ", "old function signature: removeEventListener! use listener id");
        this._log.log((new Error()).stack);

        let index = null;
        for (let i = 0; i < this._eventCallbacks[which].length; i++)
            if (this._eventCallbacks[which][i].cb === cb)
                index = i;

        if (index !== null)
        {
            delete this._eventCallbacks[index];
        }
        else this._log.warn("removeEventListener not found " + which);
    }

    logEvents(enabled, name)
    {
        this._logEvents = enabled;
        this._logName = name;
    }

    emitEvent(which, param1, param2, param3, param4, param5, param6)
    {
        if (this._logEvents) this._log.log("[event] ", this._logName, which, this._eventCallbacks);

        if (this._eventCallbacks[which])
        {
            for (let i = 0; i < this._eventCallbacks[which].length; i++)
            {
                if (this._eventCallbacks[which][i])
                {
                    this._eventCallbacks[which][i].cb(param1, param2, param3, param4, param5, param6);
                }
            }
        }
        else
        {
            if (this._logEvents) this._log.log("[event] has no event callback", which, this._eventCallbacks);
        }
    }
}



/***/ }),

/***/ "../shared/client/src/helper.js":
/*!**************************************!*\
  !*** ../shared/client/src/helper.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Helper
{
    constructor()
    {
        this._simpleIdCounter = 0;
    }

    uuid()
    {
        let d = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) =>
        {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    }

    isNumeric(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * generate a simple ID
     * @function simpleId
     * @memberof Utils
     * @return {Number} new id
     * @static
     */
    simpleId()
    {
        this._simpleIdCounter++;
        return this._simpleIdCounter;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Helper());


/***/ }),

/***/ "../shared/client/src/logger.js":
/*!**************************************!*\
  !*** ../shared/client/src/logger.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Logger)
/* harmony export */ });
/* eslint-disable no-console */

class Logger
{
    constructor(initiator)
    {
        this._logs = [];
        this.initiator = initiator;
    }

    stack(t)
    {
        console.info("[" + this.initiator + "] ", t);
        console.log((new Error()).stack);
    }

    groupCollapsed(t)
    {
        console.groupCollapsed("[" + this.initiator + "] " + t);
    }

    table(t)
    {
        console.table(t);
    }

    groupEnd()
    {
        console.groupEnd();
    }

    error(args)
    {
        console.error("[" + this.initiator + "]", ...arguments);
        if (window.gui) window.gui.emitEvent("coreLogEvent", this.initiator, "error", arguments);
    }

    info(args)
    {
        console.error("[" + this.initiator + "]", ...arguments);
        if (window.gui) window.gui.emitEvent("coreLogEvent", this.initiator, "info", arguments);
    }

    warn(args)
    {
        console.warn("[" + this.initiator + "]", ...arguments);
        // console.log((new Error()).stack);
        if (window.gui) window.gui.emitEvent("coreLogEvent", this.initiator, "warn", arguments);
    }

    verbose()
    {
        if ((CABLES.UI && CABLES.UI.logFilter.shouldPrint(this.initiator, ...arguments)) || !CABLES.logSilent)
            console.log("[" + this.initiator + "]", ...arguments);
        if (window.gui) window.gui.emitEvent("coreLogEvent", this.initiator, "verbose", arguments);
    }

    log(args)
    {
        if ((CABLES.UI && CABLES.UI.logFilter.shouldPrint(this.initiator, ...arguments)) || !CABLES.logSilent)
            console.log("[" + this.initiator + "]", ...arguments);
        if (window.gui) window.gui.emitEvent("coreLogEvent", this.initiator, "log", arguments);
    }

    userInteraction(text)
    {
        // this.log({ "initiator": "userinteraction", "text": text });
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _base64_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./base64.js */ "./src/core/base64.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils.js */ "./src/core/utils.js");
/* harmony import */ var _anim_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./anim.js */ "./src/core/anim.js");
/* harmony import */ var _core_link_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core_link.js */ "./src/core/core_link.js");
/* harmony import */ var _core_port_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core_port.js */ "./src/core/core_port.js");
/* harmony import */ var _core_op_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core_op.js */ "./src/core/core_op.js");
/* harmony import */ var _embedding_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./embedding.js */ "./src/core/embedding.js");
/* harmony import */ var _core_profiler_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core_profiler.js */ "./src/core/core_profiler.js");
/* harmony import */ var _core_patch_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core_patch.js */ "./src/core/core_patch.js");
/* harmony import */ var _instancing_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./instancing.js */ "./src/core/instancing.js");
/* harmony import */ var _loadingstatus_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./loadingstatus.js */ "./src/core/loadingstatus.js");
/* harmony import */ var _webaudio_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./webaudio.js */ "./src/core/webaudio.js");
/* harmony import */ var _sessionvar_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sessionvar.js */ "./src/core/sessionvar.js");
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./timer.js */ "./src/core/timer.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./constants.js */ "./src/core/constants.js");
/* harmony import */ var _banchprofiler_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./banchprofiler.js */ "./src/core/banchprofiler.js");
/* harmony import */ var _cgp_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cgp/index.js */ "./src/core/cgp/index.js");
/* harmony import */ var _cg_cg_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cg/cg_constants.js */ "./src/core/cg/cg_constants.js");
/* harmony import */ var _cgl_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cgl/index.js */ "./src/core/cgl/index.js");




















window.CABLES = window.CABLES || {};

CABLES.CGL = _cgl_index_js__WEBPACK_IMPORTED_MODULE_0__.CGL;
CABLES.CG = _cg_cg_constants_js__WEBPACK_IMPORTED_MODULE_1__.CG;
CABLES.CGP = _cgp_index_js__WEBPACK_IMPORTED_MODULE_2__.CGP;
CABLES.EMBED = _embedding_js__WEBPACK_IMPORTED_MODULE_3__.EMBED;
CABLES.Link = _core_link_js__WEBPACK_IMPORTED_MODULE_4__.Link;
CABLES.Port = _core_port_js__WEBPACK_IMPORTED_MODULE_5__.Port;
CABLES.Op = _core_op_js__WEBPACK_IMPORTED_MODULE_6__.Op;
CABLES.Profiler = _core_profiler_js__WEBPACK_IMPORTED_MODULE_7__.Profiler;
CABLES.Patch = _core_patch_js__WEBPACK_IMPORTED_MODULE_8__["default"];
CABLES.Instancing = _instancing_js__WEBPACK_IMPORTED_MODULE_9__.Instancing;
CABLES.Timer = _timer_js__WEBPACK_IMPORTED_MODULE_10__.Timer;
CABLES.WEBAUDIO = _webaudio_js__WEBPACK_IMPORTED_MODULE_11__.WEBAUDIO;
CABLES.Variable = _sessionvar_js__WEBPACK_IMPORTED_MODULE_12__.Variable;
CABLES.LoadingStatus = _loadingstatus_js__WEBPACK_IMPORTED_MODULE_13__.LoadingStatus;
CABLES.now = _timer_js__WEBPACK_IMPORTED_MODULE_10__.now;
CABLES.internalNow = _timer_js__WEBPACK_IMPORTED_MODULE_10__.internalNow;
CABLES.BranchStack = _banchprofiler_js__WEBPACK_IMPORTED_MODULE_14__.BranchStack;
CABLES.Branch = _banchprofiler_js__WEBPACK_IMPORTED_MODULE_14__.Branch;


CABLES = Object.assign(CABLES,
    _base64_js__WEBPACK_IMPORTED_MODULE_15__,
    _utils_js__WEBPACK_IMPORTED_MODULE_16__,
    _anim_js__WEBPACK_IMPORTED_MODULE_17__,
    _constants_js__WEBPACK_IMPORTED_MODULE_18__.CONSTANTS.PORT,
    _constants_js__WEBPACK_IMPORTED_MODULE_18__.CONSTANTS.PACO,
    _constants_js__WEBPACK_IMPORTED_MODULE_18__.CONSTANTS.ANIM,
    _constants_js__WEBPACK_IMPORTED_MODULE_18__.CONSTANTS.OP
);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CABLES);

if (!(function () { return !this; }())) console.warn("not in strict mode: index core"); // eslint-disable-line

})();

CABLES = __webpack_exports__["default"];
/******/ })()
;


var CABLES = CABLES || {}; CABLES.build = {"timestamp":1716557011848,"created":"2024-05-24T13:23:31.848Z","git":{"branch":"develop","commit":"59163a5b93e2c78904d29b77aa30ce7420d4f68f","date":"1716556990","message":"new op routetrigger mp"}};
/*!
@fileoverview gl-matrix - High performance matrix and vector operations
@author Brandon Jones
@author Colin MacKenzie IV
@version 3.1.0

Copyright (c) 2015-2019, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t=t||self).glMatrix={})}(this,function(t){"use strict";var n=1e-6,a="undefined"!=typeof Float32Array?Float32Array:Array,r=Math.random;var u=Math.PI/180;Math.hypot||(Math.hypot=function(){for(var t=0,n=arguments.length;n--;)t+=arguments[n]*arguments[n];return Math.sqrt(t)});var e=Object.freeze({EPSILON:n,get ARRAY_TYPE(){return a},RANDOM:r,setMatrixArrayType:function(t){a=t},toRadian:function(t){return t*u},equals:function(t,a){return Math.abs(t-a)<=n*Math.max(1,Math.abs(t),Math.abs(a))}});function o(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],c=a[1],h=a[2],s=a[3];return t[0]=r*i+e*c,t[1]=u*i+o*c,t[2]=r*h+e*s,t[3]=u*h+o*s,t}function i(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}var c=o,h=i,s=Object.freeze({create:function(){var t=new a(4);return a!=Float32Array&&(t[1]=0,t[2]=0),t[0]=1,t[3]=1,t},clone:function(t){var n=new a(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},fromValues:function(t,n,r,u){var e=new a(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=u,e},set:function(t,n,a,r,u){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t},transpose:function(t,n){if(t===n){var a=n[1];t[1]=n[2],t[2]=a}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a*e-u*r;return o?(o=1/o,t[0]=e*o,t[1]=-r*o,t[2]=-u*o,t[3]=a*o,t):null},adjoint:function(t,n){var a=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=a,t},determinant:function(t){return t[0]*t[3]-t[2]*t[1]},multiply:o,rotate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),c=Math.cos(a);return t[0]=r*c+e*i,t[1]=u*c+o*i,t[2]=r*-i+e*c,t[3]=u*-i+o*c,t},scale:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],c=a[1];return t[0]=r*i,t[1]=u*i,t[2]=e*c,t[3]=o*c,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=-a,t[3]=r,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t},str:function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3])},LDU:function(t,n,a,r){return t[2]=r[2]/r[0],a[0]=r[0],a[1]=r[1],a[3]=r[3]-t[2]*a[1],[t,n,a]},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t},subtract:i,exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=a[0],c=a[1],h=a[2],s=a[3];return Math.abs(r-i)<=n*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(u-c)<=n*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(e-h)<=n*Math.max(1,Math.abs(e),Math.abs(h))&&Math.abs(o-s)<=n*Math.max(1,Math.abs(o),Math.abs(s))},multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t},mul:c,sub:h});function M(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=a[0],s=a[1],M=a[2],f=a[3],l=a[4],v=a[5];return t[0]=r*h+e*s,t[1]=u*h+o*s,t[2]=r*M+e*f,t[3]=u*M+o*f,t[4]=r*l+e*v+i,t[5]=u*l+o*v+c,t}function f(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t}var l=M,v=f,b=Object.freeze({create:function(){var t=new a(6);return a!=Float32Array&&(t[1]=0,t[2]=0,t[4]=0,t[5]=0),t[0]=1,t[3]=1,t},clone:function(t){var n=new a(6);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},fromValues:function(t,n,r,u,e,o){var i=new a(6);return i[0]=t,i[1]=n,i[2]=r,i[3]=u,i[4]=e,i[5]=o,i},set:function(t,n,a,r,u,e,o){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],c=a*e-r*u;return c?(c=1/c,t[0]=e*c,t[1]=-r*c,t[2]=-u*c,t[3]=a*c,t[4]=(u*i-e*o)*c,t[5]=(r*o-a*i)*c,t):null},determinant:function(t){return t[0]*t[3]-t[1]*t[2]},multiply:M,rotate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=Math.sin(a),s=Math.cos(a);return t[0]=r*s+e*h,t[1]=u*s+o*h,t[2]=r*-h+e*s,t[3]=u*-h+o*s,t[4]=i,t[5]=c,t},scale:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=a[0],s=a[1];return t[0]=r*h,t[1]=u*h,t[2]=e*s,t[3]=o*s,t[4]=i,t[5]=c,t},translate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=a[0],s=a[1];return t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=r*h+e*s+i,t[5]=u*h+o*s+c,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=-a,t[3]=r,t[4]=0,t[5]=0,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t},str:function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],1)},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t},subtract:f,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],c=t[5],h=a[0],s=a[1],M=a[2],f=a[3],l=a[4],v=a[5];return Math.abs(r-h)<=n*Math.max(1,Math.abs(r),Math.abs(h))&&Math.abs(u-s)<=n*Math.max(1,Math.abs(u),Math.abs(s))&&Math.abs(e-M)<=n*Math.max(1,Math.abs(e),Math.abs(M))&&Math.abs(o-f)<=n*Math.max(1,Math.abs(o),Math.abs(f))&&Math.abs(i-l)<=n*Math.max(1,Math.abs(i),Math.abs(l))&&Math.abs(c-v)<=n*Math.max(1,Math.abs(c),Math.abs(v))},mul:l,sub:v});function m(){var t=new a(9);return a!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function d(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=n[8],f=a[0],l=a[1],v=a[2],b=a[3],m=a[4],d=a[5],x=a[6],p=a[7],y=a[8];return t[0]=f*r+l*o+v*h,t[1]=f*u+l*i+v*s,t[2]=f*e+l*c+v*M,t[3]=b*r+m*o+d*h,t[4]=b*u+m*i+d*s,t[5]=b*e+m*c+d*M,t[6]=x*r+p*o+y*h,t[7]=x*u+p*i+y*s,t[8]=x*e+p*c+y*M,t}function x(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t[6]=n[6]-a[6],t[7]=n[7]-a[7],t[8]=n[8]-a[8],t}var p=d,y=x,q=Object.freeze({create:m,fromMat4:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t},clone:function(t){var n=new a(9);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},fromValues:function(t,n,r,u,e,o,i,c,h){var s=new a(9);return s[0]=t,s[1]=n,s[2]=r,s[3]=u,s[4]=e,s[5]=o,s[6]=i,s[7]=c,s[8]=h,s},set:function(t,n,a,r,u,e,o,i,c,h){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t[6]=i,t[7]=c,t[8]=h,t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},transpose:function(t,n){if(t===n){var a=n[1],r=n[2],u=n[5];t[1]=n[3],t[2]=n[6],t[3]=a,t[5]=n[7],t[6]=r,t[7]=u}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],c=n[6],h=n[7],s=n[8],M=s*o-i*h,f=-s*e+i*c,l=h*e-o*c,v=a*M+r*f+u*l;return v?(v=1/v,t[0]=M*v,t[1]=(-s*r+u*h)*v,t[2]=(i*r-u*o)*v,t[3]=f*v,t[4]=(s*a-u*c)*v,t[5]=(-i*a+u*e)*v,t[6]=l*v,t[7]=(-h*a+r*c)*v,t[8]=(o*a-r*e)*v,t):null},adjoint:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],c=n[6],h=n[7],s=n[8];return t[0]=o*s-i*h,t[1]=u*h-r*s,t[2]=r*i-u*o,t[3]=i*c-e*s,t[4]=a*s-u*c,t[5]=u*e-a*i,t[6]=e*h-o*c,t[7]=r*c-a*h,t[8]=a*o-r*e,t},determinant:function(t){var n=t[0],a=t[1],r=t[2],u=t[3],e=t[4],o=t[5],i=t[6],c=t[7],h=t[8];return n*(h*e-o*c)+a*(-h*u+o*i)+r*(c*u-e*i)},multiply:d,translate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=n[8],f=a[0],l=a[1];return t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=i,t[5]=c,t[6]=f*r+l*o+h,t[7]=f*u+l*i+s,t[8]=f*e+l*c+M,t},rotate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=n[8],f=Math.sin(a),l=Math.cos(a);return t[0]=l*r+f*o,t[1]=l*u+f*i,t[2]=l*e+f*c,t[3]=l*o-f*r,t[4]=l*i-f*u,t[5]=l*c-f*e,t[6]=h,t[7]=s,t[8]=M,t},scale:function(t,n,a){var r=a[0],u=a[1];return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=u*n[3],t[4]=u*n[4],t[5]=u*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=0,t[3]=-a,t[4]=r,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},fromMat2d:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t},fromQuat:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a+a,i=r+r,c=u+u,h=a*o,s=r*o,M=r*i,f=u*o,l=u*i,v=u*c,b=e*o,m=e*i,d=e*c;return t[0]=1-M-v,t[3]=s-d,t[6]=f+m,t[1]=s+d,t[4]=1-h-v,t[7]=l-b,t[2]=f-m,t[5]=l+b,t[8]=1-h-M,t},normalFromMat4:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],c=n[6],h=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15],x=a*i-r*o,p=a*c-u*o,y=a*h-e*o,q=r*c-u*i,g=r*h-e*i,A=u*h-e*c,w=s*b-M*v,R=s*m-f*v,z=s*d-l*v,P=M*m-f*b,j=M*d-l*b,I=f*d-l*m,S=x*I-p*j+y*P+q*z-g*R+A*w;return S?(S=1/S,t[0]=(i*I-c*j+h*P)*S,t[1]=(c*z-o*I-h*R)*S,t[2]=(o*j-i*z+h*w)*S,t[3]=(u*j-r*I-e*P)*S,t[4]=(a*I-u*z+e*R)*S,t[5]=(r*z-a*j-e*w)*S,t[6]=(b*A-m*g+d*q)*S,t[7]=(m*y-v*A-d*p)*S,t[8]=(v*g-b*y+d*x)*S,t):null},projection:function(t,n,a){return t[0]=2/n,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/a,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t},str:function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8])},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t[8]=n[8]+a[8],t},subtract:x,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t[8]=n[8]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t[6]=n[6]+a[6]*r,t[7]=n[7]+a[7]*r,t[8]=n[8]+a[8]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],c=t[5],h=t[6],s=t[7],M=t[8],f=a[0],l=a[1],v=a[2],b=a[3],m=a[4],d=a[5],x=a[6],p=a[7],y=a[8];return Math.abs(r-f)<=n*Math.max(1,Math.abs(r),Math.abs(f))&&Math.abs(u-l)<=n*Math.max(1,Math.abs(u),Math.abs(l))&&Math.abs(e-v)<=n*Math.max(1,Math.abs(e),Math.abs(v))&&Math.abs(o-b)<=n*Math.max(1,Math.abs(o),Math.abs(b))&&Math.abs(i-m)<=n*Math.max(1,Math.abs(i),Math.abs(m))&&Math.abs(c-d)<=n*Math.max(1,Math.abs(c),Math.abs(d))&&Math.abs(h-x)<=n*Math.max(1,Math.abs(h),Math.abs(x))&&Math.abs(s-p)<=n*Math.max(1,Math.abs(s),Math.abs(p))&&Math.abs(M-y)<=n*Math.max(1,Math.abs(M),Math.abs(y))},mul:p,sub:y});function g(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function A(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=n[8],f=n[9],l=n[10],v=n[11],b=n[12],m=n[13],d=n[14],x=n[15],p=a[0],y=a[1],q=a[2],g=a[3];return t[0]=p*r+y*i+q*M+g*b,t[1]=p*u+y*c+q*f+g*m,t[2]=p*e+y*h+q*l+g*d,t[3]=p*o+y*s+q*v+g*x,p=a[4],y=a[5],q=a[6],g=a[7],t[4]=p*r+y*i+q*M+g*b,t[5]=p*u+y*c+q*f+g*m,t[6]=p*e+y*h+q*l+g*d,t[7]=p*o+y*s+q*v+g*x,p=a[8],y=a[9],q=a[10],g=a[11],t[8]=p*r+y*i+q*M+g*b,t[9]=p*u+y*c+q*f+g*m,t[10]=p*e+y*h+q*l+g*d,t[11]=p*o+y*s+q*v+g*x,p=a[12],y=a[13],q=a[14],g=a[15],t[12]=p*r+y*i+q*M+g*b,t[13]=p*u+y*c+q*f+g*m,t[14]=p*e+y*h+q*l+g*d,t[15]=p*o+y*s+q*v+g*x,t}function w(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=r+r,c=u+u,h=e+e,s=r*i,M=r*c,f=r*h,l=u*c,v=u*h,b=e*h,m=o*i,d=o*c,x=o*h;return t[0]=1-(l+b),t[1]=M+x,t[2]=f-d,t[3]=0,t[4]=M-x,t[5]=1-(s+b),t[6]=v+m,t[7]=0,t[8]=f+d,t[9]=v-m,t[10]=1-(s+l),t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t}function R(t,n){return t[0]=n[12],t[1]=n[13],t[2]=n[14],t}function z(t,n){var a=n[0],r=n[1],u=n[2],e=n[4],o=n[5],i=n[6],c=n[8],h=n[9],s=n[10];return t[0]=Math.hypot(a,r,u),t[1]=Math.hypot(e,o,i),t[2]=Math.hypot(c,h,s),t}function P(t,n){var r=new a(3);z(r,n);var u=1/r[0],e=1/r[1],o=1/r[2],i=n[0]*u,c=n[1]*e,h=n[2]*o,s=n[4]*u,M=n[5]*e,f=n[6]*o,l=n[8]*u,v=n[9]*e,b=n[10]*o,m=i+M+b,d=0;return m>0?(d=2*Math.sqrt(m+1),t[3]=.25*d,t[0]=(f-v)/d,t[1]=(l-h)/d,t[2]=(c-s)/d):i>M&&i>b?(d=2*Math.sqrt(1+i-M-b),t[3]=(f-v)/d,t[0]=.25*d,t[1]=(c+s)/d,t[2]=(l+h)/d):M>b?(d=2*Math.sqrt(1+M-i-b),t[3]=(l-h)/d,t[0]=(c+s)/d,t[1]=.25*d,t[2]=(f+v)/d):(d=2*Math.sqrt(1+b-i-M),t[3]=(c-s)/d,t[0]=(l+h)/d,t[1]=(f+v)/d,t[2]=.25*d),t}function j(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t[6]=n[6]-a[6],t[7]=n[7]-a[7],t[8]=n[8]-a[8],t[9]=n[9]-a[9],t[10]=n[10]-a[10],t[11]=n[11]-a[11],t[12]=n[12]-a[12],t[13]=n[13]-a[13],t[14]=n[14]-a[14],t[15]=n[15]-a[15],t}var I=A,S=j,E=Object.freeze({create:function(){var t=new a(16);return a!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t},clone:function(t){var n=new a(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},fromValues:function(t,n,r,u,e,o,i,c,h,s,M,f,l,v,b,m){var d=new a(16);return d[0]=t,d[1]=n,d[2]=r,d[3]=u,d[4]=e,d[5]=o,d[6]=i,d[7]=c,d[8]=h,d[9]=s,d[10]=M,d[11]=f,d[12]=l,d[13]=v,d[14]=b,d[15]=m,d},set:function(t,n,a,r,u,e,o,i,c,h,s,M,f,l,v,b,m){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t[6]=i,t[7]=c,t[8]=h,t[9]=s,t[10]=M,t[11]=f,t[12]=l,t[13]=v,t[14]=b,t[15]=m,t},identity:g,transpose:function(t,n){if(t===n){var a=n[1],r=n[2],u=n[3],e=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=a,t[6]=n[9],t[7]=n[13],t[8]=r,t[9]=e,t[11]=n[14],t[12]=u,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],c=n[6],h=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15],x=a*i-r*o,p=a*c-u*o,y=a*h-e*o,q=r*c-u*i,g=r*h-e*i,A=u*h-e*c,w=s*b-M*v,R=s*m-f*v,z=s*d-l*v,P=M*m-f*b,j=M*d-l*b,I=f*d-l*m,S=x*I-p*j+y*P+q*z-g*R+A*w;return S?(S=1/S,t[0]=(i*I-c*j+h*P)*S,t[1]=(u*j-r*I-e*P)*S,t[2]=(b*A-m*g+d*q)*S,t[3]=(f*g-M*A-l*q)*S,t[4]=(c*z-o*I-h*R)*S,t[5]=(a*I-u*z+e*R)*S,t[6]=(m*y-v*A-d*p)*S,t[7]=(s*A-f*y+l*p)*S,t[8]=(o*j-i*z+h*w)*S,t[9]=(r*z-a*j-e*w)*S,t[10]=(v*g-b*y+d*x)*S,t[11]=(M*y-s*g-l*x)*S,t[12]=(i*R-o*P-c*w)*S,t[13]=(a*P-r*R+u*w)*S,t[14]=(b*p-v*q-m*x)*S,t[15]=(s*q-M*p+f*x)*S,t):null},adjoint:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=n[4],i=n[5],c=n[6],h=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15];return t[0]=i*(f*d-l*m)-M*(c*d-h*m)+b*(c*l-h*f),t[1]=-(r*(f*d-l*m)-M*(u*d-e*m)+b*(u*l-e*f)),t[2]=r*(c*d-h*m)-i*(u*d-e*m)+b*(u*h-e*c),t[3]=-(r*(c*l-h*f)-i*(u*l-e*f)+M*(u*h-e*c)),t[4]=-(o*(f*d-l*m)-s*(c*d-h*m)+v*(c*l-h*f)),t[5]=a*(f*d-l*m)-s*(u*d-e*m)+v*(u*l-e*f),t[6]=-(a*(c*d-h*m)-o*(u*d-e*m)+v*(u*h-e*c)),t[7]=a*(c*l-h*f)-o*(u*l-e*f)+s*(u*h-e*c),t[8]=o*(M*d-l*b)-s*(i*d-h*b)+v*(i*l-h*M),t[9]=-(a*(M*d-l*b)-s*(r*d-e*b)+v*(r*l-e*M)),t[10]=a*(i*d-h*b)-o*(r*d-e*b)+v*(r*h-e*i),t[11]=-(a*(i*l-h*M)-o*(r*l-e*M)+s*(r*h-e*i)),t[12]=-(o*(M*m-f*b)-s*(i*m-c*b)+v*(i*f-c*M)),t[13]=a*(M*m-f*b)-s*(r*m-u*b)+v*(r*f-u*M),t[14]=-(a*(i*m-c*b)-o*(r*m-u*b)+v*(r*c-u*i)),t[15]=a*(i*f-c*M)-o*(r*f-u*M)+s*(r*c-u*i),t},determinant:function(t){var n=t[0],a=t[1],r=t[2],u=t[3],e=t[4],o=t[5],i=t[6],c=t[7],h=t[8],s=t[9],M=t[10],f=t[11],l=t[12],v=t[13],b=t[14],m=t[15];return(n*o-a*e)*(M*m-f*b)-(n*i-r*e)*(s*m-f*v)+(n*c-u*e)*(s*b-M*v)+(a*i-r*o)*(h*m-f*l)-(a*c-u*o)*(h*b-M*l)+(r*c-u*i)*(h*v-s*l)},multiply:A,translate:function(t,n,a){var r,u,e,o,i,c,h,s,M,f,l,v,b=a[0],m=a[1],d=a[2];return n===t?(t[12]=n[0]*b+n[4]*m+n[8]*d+n[12],t[13]=n[1]*b+n[5]*m+n[9]*d+n[13],t[14]=n[2]*b+n[6]*m+n[10]*d+n[14],t[15]=n[3]*b+n[7]*m+n[11]*d+n[15]):(r=n[0],u=n[1],e=n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=n[8],f=n[9],l=n[10],v=n[11],t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=i,t[5]=c,t[6]=h,t[7]=s,t[8]=M,t[9]=f,t[10]=l,t[11]=v,t[12]=r*b+i*m+M*d+n[12],t[13]=u*b+c*m+f*d+n[13],t[14]=e*b+h*m+l*d+n[14],t[15]=o*b+s*m+v*d+n[15]),t},scale:function(t,n,a){var r=a[0],u=a[1],e=a[2];return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*u,t[5]=n[5]*u,t[6]=n[6]*u,t[7]=n[7]*u,t[8]=n[8]*e,t[9]=n[9]*e,t[10]=n[10]*e,t[11]=n[11]*e,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},rotate:function(t,a,r,u){var e,o,i,c,h,s,M,f,l,v,b,m,d,x,p,y,q,g,A,w,R,z,P,j,I=u[0],S=u[1],E=u[2],O=Math.hypot(I,S,E);return O<n?null:(I*=O=1/O,S*=O,E*=O,e=Math.sin(r),i=1-(o=Math.cos(r)),c=a[0],h=a[1],s=a[2],M=a[3],f=a[4],l=a[5],v=a[6],b=a[7],m=a[8],d=a[9],x=a[10],p=a[11],y=I*I*i+o,q=S*I*i+E*e,g=E*I*i-S*e,A=I*S*i-E*e,w=S*S*i+o,R=E*S*i+I*e,z=I*E*i+S*e,P=S*E*i-I*e,j=E*E*i+o,t[0]=c*y+f*q+m*g,t[1]=h*y+l*q+d*g,t[2]=s*y+v*q+x*g,t[3]=M*y+b*q+p*g,t[4]=c*A+f*w+m*R,t[5]=h*A+l*w+d*R,t[6]=s*A+v*w+x*R,t[7]=M*A+b*w+p*R,t[8]=c*z+f*P+m*j,t[9]=h*z+l*P+d*j,t[10]=s*z+v*P+x*j,t[11]=M*z+b*P+p*j,a!==t&&(t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t)},rotateX:function(t,n,a){var r=Math.sin(a),u=Math.cos(a),e=n[4],o=n[5],i=n[6],c=n[7],h=n[8],s=n[9],M=n[10],f=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=e*u+h*r,t[5]=o*u+s*r,t[6]=i*u+M*r,t[7]=c*u+f*r,t[8]=h*u-e*r,t[9]=s*u-o*r,t[10]=M*u-i*r,t[11]=f*u-c*r,t},rotateY:function(t,n,a){var r=Math.sin(a),u=Math.cos(a),e=n[0],o=n[1],i=n[2],c=n[3],h=n[8],s=n[9],M=n[10],f=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=e*u-h*r,t[1]=o*u-s*r,t[2]=i*u-M*r,t[3]=c*u-f*r,t[8]=e*r+h*u,t[9]=o*r+s*u,t[10]=i*r+M*u,t[11]=c*r+f*u,t},rotateZ:function(t,n,a){var r=Math.sin(a),u=Math.cos(a),e=n[0],o=n[1],i=n[2],c=n[3],h=n[4],s=n[5],M=n[6],f=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=e*u+h*r,t[1]=o*u+s*r,t[2]=i*u+M*r,t[3]=c*u+f*r,t[4]=h*u-e*r,t[5]=s*u-o*r,t[6]=M*u-i*r,t[7]=f*u-c*r,t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromRotation:function(t,a,r){var u,e,o,i=r[0],c=r[1],h=r[2],s=Math.hypot(i,c,h);return s<n?null:(i*=s=1/s,c*=s,h*=s,u=Math.sin(a),o=1-(e=Math.cos(a)),t[0]=i*i*o+e,t[1]=c*i*o+h*u,t[2]=h*i*o-c*u,t[3]=0,t[4]=i*c*o-h*u,t[5]=c*c*o+e,t[6]=h*c*o+i*u,t[7]=0,t[8]=i*h*o+c*u,t[9]=c*h*o-i*u,t[10]=h*h*o+e,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)},fromXRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=a,t[7]=0,t[8]=0,t[9]=-a,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromYRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=0,t[2]=-a,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=a,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromZRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=0,t[3]=0,t[4]=-a,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromRotationTranslation:w,fromQuat2:function(t,n){var r=new a(3),u=-n[0],e=-n[1],o=-n[2],i=n[3],c=n[4],h=n[5],s=n[6],M=n[7],f=u*u+e*e+o*o+i*i;return f>0?(r[0]=2*(c*i+M*u+h*o-s*e)/f,r[1]=2*(h*i+M*e+s*u-c*o)/f,r[2]=2*(s*i+M*o+c*e-h*u)/f):(r[0]=2*(c*i+M*u+h*o-s*e),r[1]=2*(h*i+M*e+s*u-c*o),r[2]=2*(s*i+M*o+c*e-h*u)),w(t,n,r),t},getTranslation:R,getScaling:z,getRotation:P,fromRotationTranslationScale:function(t,n,a,r){var u=n[0],e=n[1],o=n[2],i=n[3],c=u+u,h=e+e,s=o+o,M=u*c,f=u*h,l=u*s,v=e*h,b=e*s,m=o*s,d=i*c,x=i*h,p=i*s,y=r[0],q=r[1],g=r[2];return t[0]=(1-(v+m))*y,t[1]=(f+p)*y,t[2]=(l-x)*y,t[3]=0,t[4]=(f-p)*q,t[5]=(1-(M+m))*q,t[6]=(b+d)*q,t[7]=0,t[8]=(l+x)*g,t[9]=(b-d)*g,t[10]=(1-(M+v))*g,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t},fromRotationTranslationScaleOrigin:function(t,n,a,r,u){var e=n[0],o=n[1],i=n[2],c=n[3],h=e+e,s=o+o,M=i+i,f=e*h,l=e*s,v=e*M,b=o*s,m=o*M,d=i*M,x=c*h,p=c*s,y=c*M,q=r[0],g=r[1],A=r[2],w=u[0],R=u[1],z=u[2],P=(1-(b+d))*q,j=(l+y)*q,I=(v-p)*q,S=(l-y)*g,E=(1-(f+d))*g,O=(m+x)*g,T=(v+p)*A,D=(m-x)*A,F=(1-(f+b))*A;return t[0]=P,t[1]=j,t[2]=I,t[3]=0,t[4]=S,t[5]=E,t[6]=O,t[7]=0,t[8]=T,t[9]=D,t[10]=F,t[11]=0,t[12]=a[0]+w-(P*w+S*R+T*z),t[13]=a[1]+R-(j*w+E*R+D*z),t[14]=a[2]+z-(I*w+O*R+F*z),t[15]=1,t},fromQuat:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a+a,i=r+r,c=u+u,h=a*o,s=r*o,M=r*i,f=u*o,l=u*i,v=u*c,b=e*o,m=e*i,d=e*c;return t[0]=1-M-v,t[1]=s+d,t[2]=f-m,t[3]=0,t[4]=s-d,t[5]=1-h-v,t[6]=l+b,t[7]=0,t[8]=f+m,t[9]=l-b,t[10]=1-h-M,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},frustum:function(t,n,a,r,u,e,o){var i=1/(a-n),c=1/(u-r),h=1/(e-o);return t[0]=2*e*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*e*c,t[6]=0,t[7]=0,t[8]=(a+n)*i,t[9]=(u+r)*c,t[10]=(o+e)*h,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*e*2*h,t[15]=0,t},perspective:function(t,n,a,r,u){var e,o=1/Math.tan(n/2);return t[0]=o/a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=u&&u!==1/0?(e=1/(r-u),t[10]=(u+r)*e,t[14]=2*u*r*e):(t[10]=-1,t[14]=-2*r),t},perspectiveFromFieldOfView:function(t,n,a,r){var u=Math.tan(n.upDegrees*Math.PI/180),e=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),c=2/(o+i),h=2/(u+e);return t[0]=c,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=h,t[6]=0,t[7]=0,t[8]=-(o-i)*c*.5,t[9]=(u-e)*h*.5,t[10]=r/(a-r),t[11]=-1,t[12]=0,t[13]=0,t[14]=r*a/(a-r),t[15]=0,t},ortho:function(t,n,a,r,u,e,o){var i=1/(n-a),c=1/(r-u),h=1/(e-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(n+a)*i,t[13]=(u+r)*c,t[14]=(o+e)*h,t[15]=1,t},lookAt:function(t,a,r,u){var e,o,i,c,h,s,M,f,l,v,b=a[0],m=a[1],d=a[2],x=u[0],p=u[1],y=u[2],q=r[0],A=r[1],w=r[2];return Math.abs(b-q)<n&&Math.abs(m-A)<n&&Math.abs(d-w)<n?g(t):(M=b-q,f=m-A,l=d-w,e=p*(l*=v=1/Math.hypot(M,f,l))-y*(f*=v),o=y*(M*=v)-x*l,i=x*f-p*M,(v=Math.hypot(e,o,i))?(e*=v=1/v,o*=v,i*=v):(e=0,o=0,i=0),c=f*i-l*o,h=l*e-M*i,s=M*o-f*e,(v=Math.hypot(c,h,s))?(c*=v=1/v,h*=v,s*=v):(c=0,h=0,s=0),t[0]=e,t[1]=c,t[2]=M,t[3]=0,t[4]=o,t[5]=h,t[6]=f,t[7]=0,t[8]=i,t[9]=s,t[10]=l,t[11]=0,t[12]=-(e*b+o*m+i*d),t[13]=-(c*b+h*m+s*d),t[14]=-(M*b+f*m+l*d),t[15]=1,t)},targetTo:function(t,n,a,r){var u=n[0],e=n[1],o=n[2],i=r[0],c=r[1],h=r[2],s=u-a[0],M=e-a[1],f=o-a[2],l=s*s+M*M+f*f;l>0&&(s*=l=1/Math.sqrt(l),M*=l,f*=l);var v=c*f-h*M,b=h*s-i*f,m=i*M-c*s;return(l=v*v+b*b+m*m)>0&&(v*=l=1/Math.sqrt(l),b*=l,m*=l),t[0]=v,t[1]=b,t[2]=m,t[3]=0,t[4]=M*m-f*b,t[5]=f*v-s*m,t[6]=s*b-M*v,t[7]=0,t[8]=s,t[9]=M,t[10]=f,t[11]=0,t[12]=u,t[13]=e,t[14]=o,t[15]=1,t},str:function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15])},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t[8]=n[8]+a[8],t[9]=n[9]+a[9],t[10]=n[10]+a[10],t[11]=n[11]+a[11],t[12]=n[12]+a[12],t[13]=n[13]+a[13],t[14]=n[14]+a[14],t[15]=n[15]+a[15],t},subtract:j,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=n[11]*a,t[12]=n[12]*a,t[13]=n[13]*a,t[14]=n[14]*a,t[15]=n[15]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t[6]=n[6]+a[6]*r,t[7]=n[7]+a[7]*r,t[8]=n[8]+a[8]*r,t[9]=n[9]+a[9]*r,t[10]=n[10]+a[10]*r,t[11]=n[11]+a[11]*r,t[12]=n[12]+a[12]*r,t[13]=n[13]+a[13]*r,t[14]=n[14]+a[14]*r,t[15]=n[15]+a[15]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],c=t[5],h=t[6],s=t[7],M=t[8],f=t[9],l=t[10],v=t[11],b=t[12],m=t[13],d=t[14],x=t[15],p=a[0],y=a[1],q=a[2],g=a[3],A=a[4],w=a[5],R=a[6],z=a[7],P=a[8],j=a[9],I=a[10],S=a[11],E=a[12],O=a[13],T=a[14],D=a[15];return Math.abs(r-p)<=n*Math.max(1,Math.abs(r),Math.abs(p))&&Math.abs(u-y)<=n*Math.max(1,Math.abs(u),Math.abs(y))&&Math.abs(e-q)<=n*Math.max(1,Math.abs(e),Math.abs(q))&&Math.abs(o-g)<=n*Math.max(1,Math.abs(o),Math.abs(g))&&Math.abs(i-A)<=n*Math.max(1,Math.abs(i),Math.abs(A))&&Math.abs(c-w)<=n*Math.max(1,Math.abs(c),Math.abs(w))&&Math.abs(h-R)<=n*Math.max(1,Math.abs(h),Math.abs(R))&&Math.abs(s-z)<=n*Math.max(1,Math.abs(s),Math.abs(z))&&Math.abs(M-P)<=n*Math.max(1,Math.abs(M),Math.abs(P))&&Math.abs(f-j)<=n*Math.max(1,Math.abs(f),Math.abs(j))&&Math.abs(l-I)<=n*Math.max(1,Math.abs(l),Math.abs(I))&&Math.abs(v-S)<=n*Math.max(1,Math.abs(v),Math.abs(S))&&Math.abs(b-E)<=n*Math.max(1,Math.abs(b),Math.abs(E))&&Math.abs(m-O)<=n*Math.max(1,Math.abs(m),Math.abs(O))&&Math.abs(d-T)<=n*Math.max(1,Math.abs(d),Math.abs(T))&&Math.abs(x-D)<=n*Math.max(1,Math.abs(x),Math.abs(D))},mul:I,sub:S});function O(){var t=new a(3);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function T(t){var n=t[0],a=t[1],r=t[2];return Math.hypot(n,a,r)}function D(t,n,r){var u=new a(3);return u[0]=t,u[1]=n,u[2]=r,u}function F(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t}function L(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t}function V(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t}function Q(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2];return Math.hypot(a,r,u)}function Y(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2];return a*a+r*r+u*u}function X(t){var n=t[0],a=t[1],r=t[2];return n*n+a*a+r*r}function Z(t,n){var a=n[0],r=n[1],u=n[2],e=a*a+r*r+u*u;return e>0&&(e=1/Math.sqrt(e)),t[0]=n[0]*e,t[1]=n[1]*e,t[2]=n[2]*e,t}function _(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function B(t,n,a){var r=n[0],u=n[1],e=n[2],o=a[0],i=a[1],c=a[2];return t[0]=u*c-e*i,t[1]=e*o-r*c,t[2]=r*i-u*o,t}var N,k=F,U=L,W=V,C=Q,G=Y,H=T,J=X,K=(N=O(),function(t,n,a,r,u,e){var o,i;for(n||(n=3),a||(a=0),i=r?Math.min(r*n+a,t.length):t.length,o=a;o<i;o+=n)N[0]=t[o],N[1]=t[o+1],N[2]=t[o+2],u(N,N,e),t[o]=N[0],t[o+1]=N[1],t[o+2]=N[2];return t}),$=Object.freeze({create:O,clone:function(t){var n=new a(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n},length:T,fromValues:D,copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},set:function(t,n,a,r){return t[0]=n,t[1]=a,t[2]=r,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t},subtract:F,multiply:L,divide:V,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t},scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t},scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t},distance:Q,squaredDistance:Y,squaredLength:X,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},normalize:Z,dot:_,cross:B,lerp:function(t,n,a,r){var u=n[0],e=n[1],o=n[2];return t[0]=u+r*(a[0]-u),t[1]=e+r*(a[1]-e),t[2]=o+r*(a[2]-o),t},hermite:function(t,n,a,r,u,e){var o=e*e,i=o*(2*e-3)+1,c=o*(e-2)+e,h=o*(e-1),s=o*(3-2*e);return t[0]=n[0]*i+a[0]*c+r[0]*h+u[0]*s,t[1]=n[1]*i+a[1]*c+r[1]*h+u[1]*s,t[2]=n[2]*i+a[2]*c+r[2]*h+u[2]*s,t},bezier:function(t,n,a,r,u,e){var o=1-e,i=o*o,c=e*e,h=i*o,s=3*e*i,M=3*c*o,f=c*e;return t[0]=n[0]*h+a[0]*s+r[0]*M+u[0]*f,t[1]=n[1]*h+a[1]*s+r[1]*M+u[1]*f,t[2]=n[2]*h+a[2]*s+r[2]*M+u[2]*f,t},random:function(t,n){n=n||1;var a=2*r()*Math.PI,u=2*r()-1,e=Math.sqrt(1-u*u)*n;return t[0]=Math.cos(a)*e,t[1]=Math.sin(a)*e,t[2]=u*n,t},transformMat4:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=a[3]*r+a[7]*u+a[11]*e+a[15];return o=o||1,t[0]=(a[0]*r+a[4]*u+a[8]*e+a[12])/o,t[1]=(a[1]*r+a[5]*u+a[9]*e+a[13])/o,t[2]=(a[2]*r+a[6]*u+a[10]*e+a[14])/o,t},transformMat3:function(t,n,a){var r=n[0],u=n[1],e=n[2];return t[0]=r*a[0]+u*a[3]+e*a[6],t[1]=r*a[1]+u*a[4]+e*a[7],t[2]=r*a[2]+u*a[5]+e*a[8],t},transformQuat:function(t,n,a){var r=a[0],u=a[1],e=a[2],o=a[3],i=n[0],c=n[1],h=n[2],s=u*h-e*c,M=e*i-r*h,f=r*c-u*i,l=u*f-e*M,v=e*s-r*f,b=r*M-u*s,m=2*o;return s*=m,M*=m,f*=m,l*=2,v*=2,b*=2,t[0]=i+s+l,t[1]=c+M+v,t[2]=h+f+b,t},rotateX:function(t,n,a,r){var u=[],e=[];return u[0]=n[0]-a[0],u[1]=n[1]-a[1],u[2]=n[2]-a[2],e[0]=u[0],e[1]=u[1]*Math.cos(r)-u[2]*Math.sin(r),e[2]=u[1]*Math.sin(r)+u[2]*Math.cos(r),t[0]=e[0]+a[0],t[1]=e[1]+a[1],t[2]=e[2]+a[2],t},rotateY:function(t,n,a,r){var u=[],e=[];return u[0]=n[0]-a[0],u[1]=n[1]-a[1],u[2]=n[2]-a[2],e[0]=u[2]*Math.sin(r)+u[0]*Math.cos(r),e[1]=u[1],e[2]=u[2]*Math.cos(r)-u[0]*Math.sin(r),t[0]=e[0]+a[0],t[1]=e[1]+a[1],t[2]=e[2]+a[2],t},rotateZ:function(t,n,a,r){var u=[],e=[];return u[0]=n[0]-a[0],u[1]=n[1]-a[1],u[2]=n[2]-a[2],e[0]=u[0]*Math.cos(r)-u[1]*Math.sin(r),e[1]=u[0]*Math.sin(r)+u[1]*Math.cos(r),e[2]=u[2],t[0]=e[0]+a[0],t[1]=e[1]+a[1],t[2]=e[2]+a[2],t},angle:function(t,n){var a=D(t[0],t[1],t[2]),r=D(n[0],n[1],n[2]);Z(a,a),Z(r,r);var u=_(a,r);return u>1?0:u<-1?Math.PI:Math.acos(u)},zero:function(t){return t[0]=0,t[1]=0,t[2]=0,t},str:function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=a[0],i=a[1],c=a[2];return Math.abs(r-o)<=n*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(u-i)<=n*Math.max(1,Math.abs(u),Math.abs(i))&&Math.abs(e-c)<=n*Math.max(1,Math.abs(e),Math.abs(c))},sub:k,mul:U,div:W,dist:C,sqrDist:G,len:H,sqrLen:J,forEach:K});function tt(){var t=new a(4);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function nt(t){var n=new a(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function at(t,n,r,u){var e=new a(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=u,e}function rt(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function ut(t,n,a,r,u){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t}function et(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t}function ot(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}function it(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t[3]=n[3]*a[3],t}function ct(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t[3]=n[3]/a[3],t}function ht(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t}function st(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2],e=n[3]-t[3];return Math.hypot(a,r,u,e)}function Mt(t,n){var a=n[0]-t[0],r=n[1]-t[1],u=n[2]-t[2],e=n[3]-t[3];return a*a+r*r+u*u+e*e}function ft(t){var n=t[0],a=t[1],r=t[2],u=t[3];return Math.hypot(n,a,r,u)}function lt(t){var n=t[0],a=t[1],r=t[2],u=t[3];return n*n+a*a+r*r+u*u}function vt(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a*a+r*r+u*u+e*e;return o>0&&(o=1/Math.sqrt(o)),t[0]=a*o,t[1]=r*o,t[2]=u*o,t[3]=e*o,t}function bt(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]}function mt(t,n,a,r){var u=n[0],e=n[1],o=n[2],i=n[3];return t[0]=u+r*(a[0]-u),t[1]=e+r*(a[1]-e),t[2]=o+r*(a[2]-o),t[3]=i+r*(a[3]-i),t}function dt(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function xt(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=a[0],c=a[1],h=a[2],s=a[3];return Math.abs(r-i)<=n*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(u-c)<=n*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(e-h)<=n*Math.max(1,Math.abs(e),Math.abs(h))&&Math.abs(o-s)<=n*Math.max(1,Math.abs(o),Math.abs(s))}var pt=ot,yt=it,qt=ct,gt=st,At=Mt,wt=ft,Rt=lt,zt=function(){var t=tt();return function(n,a,r,u,e,o){var i,c;for(a||(a=4),r||(r=0),c=u?Math.min(u*a+r,n.length):n.length,i=r;i<c;i+=a)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],e(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}(),Pt=Object.freeze({create:tt,clone:nt,fromValues:at,copy:rt,set:ut,add:et,subtract:ot,multiply:it,divide:ct,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t[3]=Math.min(n[3],a[3]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t[3]=Math.max(n[3],a[3]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t},scale:ht,scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t},distance:st,squaredDistance:Mt,length:ft,squaredLength:lt,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},normalize:vt,dot:bt,cross:function(t,n,a,r){var u=a[0]*r[1]-a[1]*r[0],e=a[0]*r[2]-a[2]*r[0],o=a[0]*r[3]-a[3]*r[0],i=a[1]*r[2]-a[2]*r[1],c=a[1]*r[3]-a[3]*r[1],h=a[2]*r[3]-a[3]*r[2],s=n[0],M=n[1],f=n[2],l=n[3];return t[0]=M*h-f*c+l*i,t[1]=-s*h+f*o-l*e,t[2]=s*c-M*o+l*u,t[3]=-s*i+M*e-f*u,t},lerp:mt,random:function(t,n){var a,u,e,o,i,c;n=n||1;do{i=(a=2*r()-1)*a+(u=2*r()-1)*u}while(i>=1);do{c=(e=2*r()-1)*e+(o=2*r()-1)*o}while(c>=1);var h=Math.sqrt((1-i)/c);return t[0]=n*a,t[1]=n*u,t[2]=n*e*h,t[3]=n*o*h,t},transformMat4:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3];return t[0]=a[0]*r+a[4]*u+a[8]*e+a[12]*o,t[1]=a[1]*r+a[5]*u+a[9]*e+a[13]*o,t[2]=a[2]*r+a[6]*u+a[10]*e+a[14]*o,t[3]=a[3]*r+a[7]*u+a[11]*e+a[15]*o,t},transformQuat:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=a[0],i=a[1],c=a[2],h=a[3],s=h*r+i*e-c*u,M=h*u+c*r-o*e,f=h*e+o*u-i*r,l=-o*r-i*u-c*e;return t[0]=s*h+l*-o+M*-c-f*-i,t[1]=M*h+l*-i+f*-o-s*-c,t[2]=f*h+l*-c+s*-i-M*-o,t[3]=n[3],t},zero:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},str:function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},exactEquals:dt,equals:xt,sub:pt,mul:yt,div:qt,dist:gt,sqrDist:At,len:wt,sqrLen:Rt,forEach:zt});function jt(){var t=new a(4);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function It(t,n,a){a*=.5;var r=Math.sin(a);return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=Math.cos(a),t}function St(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],c=a[1],h=a[2],s=a[3];return t[0]=r*s+o*i+u*h-e*c,t[1]=u*s+o*c+e*i-r*h,t[2]=e*s+o*h+r*c-u*i,t[3]=o*s-r*i-u*c-e*h,t}function Et(t,n,a){a*=.5;var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),c=Math.cos(a);return t[0]=r*c+o*i,t[1]=u*c+e*i,t[2]=e*c-u*i,t[3]=o*c-r*i,t}function Ot(t,n,a){a*=.5;var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),c=Math.cos(a);return t[0]=r*c-e*i,t[1]=u*c+o*i,t[2]=e*c+r*i,t[3]=o*c-u*i,t}function Tt(t,n,a){a*=.5;var r=n[0],u=n[1],e=n[2],o=n[3],i=Math.sin(a),c=Math.cos(a);return t[0]=r*c+u*i,t[1]=u*c-r*i,t[2]=e*c+o*i,t[3]=o*c-e*i,t}function Dt(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=Math.sqrt(a*a+r*r+u*u),i=Math.exp(e),c=o>0?i*Math.sin(o)/o:0;return t[0]=a*c,t[1]=r*c,t[2]=u*c,t[3]=i*Math.cos(o),t}function Ft(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=Math.sqrt(a*a+r*r+u*u),i=o>0?Math.atan2(o,e)/o:0;return t[0]=a*i,t[1]=r*i,t[2]=u*i,t[3]=.5*Math.log(a*a+r*r+u*u+e*e),t}function Lt(t,a,r,u){var e,o,i,c,h,s=a[0],M=a[1],f=a[2],l=a[3],v=r[0],b=r[1],m=r[2],d=r[3];return(o=s*v+M*b+f*m+l*d)<0&&(o=-o,v=-v,b=-b,m=-m,d=-d),1-o>n?(e=Math.acos(o),i=Math.sin(e),c=Math.sin((1-u)*e)/i,h=Math.sin(u*e)/i):(c=1-u,h=u),t[0]=c*s+h*v,t[1]=c*M+h*b,t[2]=c*f+h*m,t[3]=c*l+h*d,t}function Vt(t,n){var a,r=n[0]+n[4]+n[8];if(r>0)a=Math.sqrt(r+1),t[3]=.5*a,a=.5/a,t[0]=(n[5]-n[7])*a,t[1]=(n[6]-n[2])*a,t[2]=(n[1]-n[3])*a;else{var u=0;n[4]>n[0]&&(u=1),n[8]>n[3*u+u]&&(u=2);var e=(u+1)%3,o=(u+2)%3;a=Math.sqrt(n[3*u+u]-n[3*e+e]-n[3*o+o]+1),t[u]=.5*a,a=.5/a,t[3]=(n[3*e+o]-n[3*o+e])*a,t[e]=(n[3*e+u]+n[3*u+e])*a,t[o]=(n[3*o+u]+n[3*u+o])*a}return t}var Qt,Yt,Xt,Zt,_t,Bt,Nt=nt,kt=at,Ut=rt,Wt=ut,Ct=et,Gt=St,Ht=ht,Jt=bt,Kt=mt,$t=ft,tn=$t,nn=lt,an=nn,rn=vt,un=dt,en=xt,on=(Qt=O(),Yt=D(1,0,0),Xt=D(0,1,0),function(t,n,a){var r=_(n,a);return r<-.999999?(B(Qt,Yt,n),H(Qt)<1e-6&&B(Qt,Xt,n),Z(Qt,Qt),It(t,Qt,Math.PI),t):r>.999999?(t[0]=0,t[1]=0,t[2]=0,t[3]=1,t):(B(Qt,n,a),t[0]=Qt[0],t[1]=Qt[1],t[2]=Qt[2],t[3]=1+r,rn(t,t))}),cn=(Zt=jt(),_t=jt(),function(t,n,a,r,u,e){return Lt(Zt,n,u,e),Lt(_t,a,r,e),Lt(t,Zt,_t,2*e*(1-e)),t}),hn=(Bt=m(),function(t,n,a,r){return Bt[0]=a[0],Bt[3]=a[1],Bt[6]=a[2],Bt[1]=r[0],Bt[4]=r[1],Bt[7]=r[2],Bt[2]=-n[0],Bt[5]=-n[1],Bt[8]=-n[2],rn(t,Vt(t,Bt))}),sn=Object.freeze({create:jt,identity:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},setAxisAngle:It,getAxisAngle:function(t,a){var r=2*Math.acos(a[3]),u=Math.sin(r/2);return u>n?(t[0]=a[0]/u,t[1]=a[1]/u,t[2]=a[2]/u):(t[0]=1,t[1]=0,t[2]=0),r},getAngle:function(t,n){var a=Jt(t,n);return Math.acos(2*a*a-1)},multiply:St,rotateX:Et,rotateY:Ot,rotateZ:Tt,calculateW:function(t,n){var a=n[0],r=n[1],u=n[2];return t[0]=a,t[1]=r,t[2]=u,t[3]=Math.sqrt(Math.abs(1-a*a-r*r-u*u)),t},exp:Dt,ln:Ft,pow:function(t,n,a){return Ft(t,n),Ht(t,t,a),Dt(t,t),t},slerp:Lt,random:function(t){var n=r(),a=r(),u=r(),e=Math.sqrt(1-n),o=Math.sqrt(n);return t[0]=e*Math.sin(2*Math.PI*a),t[1]=e*Math.cos(2*Math.PI*a),t[2]=o*Math.sin(2*Math.PI*u),t[3]=o*Math.cos(2*Math.PI*u),t},invert:function(t,n){var a=n[0],r=n[1],u=n[2],e=n[3],o=a*a+r*r+u*u+e*e,i=o?1/o:0;return t[0]=-a*i,t[1]=-r*i,t[2]=-u*i,t[3]=e*i,t},conjugate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},fromMat3:Vt,fromEuler:function(t,n,a,r){var u=.5*Math.PI/180;n*=u,a*=u,r*=u;var e=Math.sin(n),o=Math.cos(n),i=Math.sin(a),c=Math.cos(a),h=Math.sin(r),s=Math.cos(r);return t[0]=e*c*s-o*i*h,t[1]=o*i*s+e*c*h,t[2]=o*c*h-e*i*s,t[3]=o*c*s+e*i*h,t},str:function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},clone:Nt,fromValues:kt,copy:Ut,set:Wt,add:Ct,mul:Gt,scale:Ht,dot:Jt,lerp:Kt,length:$t,len:tn,squaredLength:nn,sqrLen:an,normalize:rn,exactEquals:un,equals:en,rotationTo:on,sqlerp:cn,setAxes:hn});function Mn(t,n,a){var r=.5*a[0],u=.5*a[1],e=.5*a[2],o=n[0],i=n[1],c=n[2],h=n[3];return t[0]=o,t[1]=i,t[2]=c,t[3]=h,t[4]=r*h+u*c-e*i,t[5]=u*h+e*o-r*c,t[6]=e*h+r*i-u*o,t[7]=-r*o-u*i-e*c,t}function fn(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t}var ln=Ut;var vn=Ut;function bn(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[4],c=a[5],h=a[6],s=a[7],M=n[4],f=n[5],l=n[6],v=n[7],b=a[0],m=a[1],d=a[2],x=a[3];return t[0]=r*x+o*b+u*d-e*m,t[1]=u*x+o*m+e*b-r*d,t[2]=e*x+o*d+r*m-u*b,t[3]=o*x-r*b-u*m-e*d,t[4]=r*s+o*i+u*h-e*c+M*x+v*b+f*d-l*m,t[5]=u*s+o*c+e*i-r*h+f*x+v*m+l*b-M*d,t[6]=e*s+o*h+r*c-u*i+l*x+v*d+M*m-f*b,t[7]=o*s-r*i-u*c-e*h+v*x-M*b-f*m-l*d,t}var mn=bn;var dn=Jt;var xn=$t,pn=xn,yn=nn,qn=yn;var gn=Object.freeze({create:function(){var t=new a(8);return a!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0),t[3]=1,t},clone:function(t){var n=new a(8);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n},fromValues:function(t,n,r,u,e,o,i,c){var h=new a(8);return h[0]=t,h[1]=n,h[2]=r,h[3]=u,h[4]=e,h[5]=o,h[6]=i,h[7]=c,h},fromRotationTranslationValues:function(t,n,r,u,e,o,i){var c=new a(8);c[0]=t,c[1]=n,c[2]=r,c[3]=u;var h=.5*e,s=.5*o,M=.5*i;return c[4]=h*u+s*r-M*n,c[5]=s*u+M*t-h*r,c[6]=M*u+h*n-s*t,c[7]=-h*t-s*n-M*r,c},fromRotationTranslation:Mn,fromTranslation:function(t,n){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=.5*n[0],t[5]=.5*n[1],t[6]=.5*n[2],t[7]=0,t},fromRotation:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},fromMat4:function(t,n){var r=jt();P(r,n);var u=new a(3);return R(u,n),Mn(t,r,u),t},copy:fn,identity:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},set:function(t,n,a,r,u,e,o,i,c){return t[0]=n,t[1]=a,t[2]=r,t[3]=u,t[4]=e,t[5]=o,t[6]=i,t[7]=c,t},getReal:ln,getDual:function(t,n){return t[0]=n[4],t[1]=n[5],t[2]=n[6],t[3]=n[7],t},setReal:vn,setDual:function(t,n){return t[4]=n[0],t[5]=n[1],t[6]=n[2],t[7]=n[3],t},getTranslation:function(t,n){var a=n[4],r=n[5],u=n[6],e=n[7],o=-n[0],i=-n[1],c=-n[2],h=n[3];return t[0]=2*(a*h+e*o+r*c-u*i),t[1]=2*(r*h+e*i+u*o-a*c),t[2]=2*(u*h+e*c+a*i-r*o),t},translate:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=.5*a[0],c=.5*a[1],h=.5*a[2],s=n[4],M=n[5],f=n[6],l=n[7];return t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=o*i+u*h-e*c+s,t[5]=o*c+e*i-r*h+M,t[6]=o*h+r*c-u*i+f,t[7]=-r*i-u*c-e*h+l,t},rotateX:function(t,n,a){var r=-n[0],u=-n[1],e=-n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=i*o+s*r+c*e-h*u,f=c*o+s*u+h*r-i*e,l=h*o+s*e+i*u-c*r,v=s*o-i*r-c*u-h*e;return Et(t,n,a),r=t[0],u=t[1],e=t[2],o=t[3],t[4]=M*o+v*r+f*e-l*u,t[5]=f*o+v*u+l*r-M*e,t[6]=l*o+v*e+M*u-f*r,t[7]=v*o-M*r-f*u-l*e,t},rotateY:function(t,n,a){var r=-n[0],u=-n[1],e=-n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=i*o+s*r+c*e-h*u,f=c*o+s*u+h*r-i*e,l=h*o+s*e+i*u-c*r,v=s*o-i*r-c*u-h*e;return Ot(t,n,a),r=t[0],u=t[1],e=t[2],o=t[3],t[4]=M*o+v*r+f*e-l*u,t[5]=f*o+v*u+l*r-M*e,t[6]=l*o+v*e+M*u-f*r,t[7]=v*o-M*r-f*u-l*e,t},rotateZ:function(t,n,a){var r=-n[0],u=-n[1],e=-n[2],o=n[3],i=n[4],c=n[5],h=n[6],s=n[7],M=i*o+s*r+c*e-h*u,f=c*o+s*u+h*r-i*e,l=h*o+s*e+i*u-c*r,v=s*o-i*r-c*u-h*e;return Tt(t,n,a),r=t[0],u=t[1],e=t[2],o=t[3],t[4]=M*o+v*r+f*e-l*u,t[5]=f*o+v*u+l*r-M*e,t[6]=l*o+v*e+M*u-f*r,t[7]=v*o-M*r-f*u-l*e,t},rotateByQuatAppend:function(t,n,a){var r=a[0],u=a[1],e=a[2],o=a[3],i=n[0],c=n[1],h=n[2],s=n[3];return t[0]=i*o+s*r+c*e-h*u,t[1]=c*o+s*u+h*r-i*e,t[2]=h*o+s*e+i*u-c*r,t[3]=s*o-i*r-c*u-h*e,i=n[4],c=n[5],h=n[6],s=n[7],t[4]=i*o+s*r+c*e-h*u,t[5]=c*o+s*u+h*r-i*e,t[6]=h*o+s*e+i*u-c*r,t[7]=s*o-i*r-c*u-h*e,t},rotateByQuatPrepend:function(t,n,a){var r=n[0],u=n[1],e=n[2],o=n[3],i=a[0],c=a[1],h=a[2],s=a[3];return t[0]=r*s+o*i+u*h-e*c,t[1]=u*s+o*c+e*i-r*h,t[2]=e*s+o*h+r*c-u*i,t[3]=o*s-r*i-u*c-e*h,i=a[4],c=a[5],h=a[6],s=a[7],t[4]=r*s+o*i+u*h-e*c,t[5]=u*s+o*c+e*i-r*h,t[6]=e*s+o*h+r*c-u*i,t[7]=o*s-r*i-u*c-e*h,t},rotateAroundAxis:function(t,a,r,u){if(Math.abs(u)<n)return fn(t,a);var e=Math.hypot(r[0],r[1],r[2]);u*=.5;var o=Math.sin(u),i=o*r[0]/e,c=o*r[1]/e,h=o*r[2]/e,s=Math.cos(u),M=a[0],f=a[1],l=a[2],v=a[3];t[0]=M*s+v*i+f*h-l*c,t[1]=f*s+v*c+l*i-M*h,t[2]=l*s+v*h+M*c-f*i,t[3]=v*s-M*i-f*c-l*h;var b=a[4],m=a[5],d=a[6],x=a[7];return t[4]=b*s+x*i+m*h-d*c,t[5]=m*s+x*c+d*i-b*h,t[6]=d*s+x*h+b*c-m*i,t[7]=x*s-b*i-m*c-d*h,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t},multiply:bn,mul:mn,scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t},dot:dn,lerp:function(t,n,a,r){var u=1-r;return dn(n,a)<0&&(r=-r),t[0]=n[0]*u+a[0]*r,t[1]=n[1]*u+a[1]*r,t[2]=n[2]*u+a[2]*r,t[3]=n[3]*u+a[3]*r,t[4]=n[4]*u+a[4]*r,t[5]=n[5]*u+a[5]*r,t[6]=n[6]*u+a[6]*r,t[7]=n[7]*u+a[7]*r,t},invert:function(t,n){var a=yn(n);return t[0]=-n[0]/a,t[1]=-n[1]/a,t[2]=-n[2]/a,t[3]=n[3]/a,t[4]=-n[4]/a,t[5]=-n[5]/a,t[6]=-n[6]/a,t[7]=n[7]/a,t},conjugate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t[4]=-n[4],t[5]=-n[5],t[6]=-n[6],t[7]=n[7],t},length:xn,len:pn,squaredLength:yn,sqrLen:qn,normalize:function(t,n){var a=yn(n);if(a>0){a=Math.sqrt(a);var r=n[0]/a,u=n[1]/a,e=n[2]/a,o=n[3]/a,i=n[4],c=n[5],h=n[6],s=n[7],M=r*i+u*c+e*h+o*s;t[0]=r,t[1]=u,t[2]=e,t[3]=o,t[4]=(i-r*M)/a,t[5]=(c-u*M)/a,t[6]=(h-e*M)/a,t[7]=(s-o*M)/a}return t},str:function(t){return"quat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]},equals:function(t,a){var r=t[0],u=t[1],e=t[2],o=t[3],i=t[4],c=t[5],h=t[6],s=t[7],M=a[0],f=a[1],l=a[2],v=a[3],b=a[4],m=a[5],d=a[6],x=a[7];return Math.abs(r-M)<=n*Math.max(1,Math.abs(r),Math.abs(M))&&Math.abs(u-f)<=n*Math.max(1,Math.abs(u),Math.abs(f))&&Math.abs(e-l)<=n*Math.max(1,Math.abs(e),Math.abs(l))&&Math.abs(o-v)<=n*Math.max(1,Math.abs(o),Math.abs(v))&&Math.abs(i-b)<=n*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(c-m)<=n*Math.max(1,Math.abs(c),Math.abs(m))&&Math.abs(h-d)<=n*Math.max(1,Math.abs(h),Math.abs(d))&&Math.abs(s-x)<=n*Math.max(1,Math.abs(s),Math.abs(x))}});function An(){var t=new a(2);return a!=Float32Array&&(t[0]=0,t[1]=0),t}function wn(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t}function Rn(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t}function zn(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t}function Pn(t,n){var a=n[0]-t[0],r=n[1]-t[1];return Math.hypot(a,r)}function jn(t,n){var a=n[0]-t[0],r=n[1]-t[1];return a*a+r*r}function In(t){var n=t[0],a=t[1];return Math.hypot(n,a)}function Sn(t){var n=t[0],a=t[1];return n*n+a*a}var En=In,On=wn,Tn=Rn,Dn=zn,Fn=Pn,Ln=jn,Vn=Sn,Qn=function(){var t=An();return function(n,a,r,u,e,o){var i,c;for(a||(a=2),r||(r=0),c=u?Math.min(u*a+r,n.length):n.length,i=r;i<c;i+=a)t[0]=n[i],t[1]=n[i+1],e(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}(),Yn=Object.freeze({create:An,clone:function(t){var n=new a(2);return n[0]=t[0],n[1]=t[1],n},fromValues:function(t,n){var r=new a(2);return r[0]=t,r[1]=n,r},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t},set:function(t,n,a){return t[0]=n,t[1]=a,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t},subtract:wn,multiply:Rn,divide:zn,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t},scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t},scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t},distance:Pn,squaredDistance:jn,length:In,squaredLength:Sn,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t},normalize:function(t,n){var a=n[0],r=n[1],u=a*a+r*r;return u>0&&(u=1/Math.sqrt(u)),t[0]=n[0]*u,t[1]=n[1]*u,t},dot:function(t,n){return t[0]*n[0]+t[1]*n[1]},cross:function(t,n,a){var r=n[0]*a[1]-n[1]*a[0];return t[0]=t[1]=0,t[2]=r,t},lerp:function(t,n,a,r){var u=n[0],e=n[1];return t[0]=u+r*(a[0]-u),t[1]=e+r*(a[1]-e),t},random:function(t,n){n=n||1;var a=2*r()*Math.PI;return t[0]=Math.cos(a)*n,t[1]=Math.sin(a)*n,t},transformMat2:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[2]*u,t[1]=a[1]*r+a[3]*u,t},transformMat2d:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[2]*u+a[4],t[1]=a[1]*r+a[3]*u+a[5],t},transformMat3:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[3]*u+a[6],t[1]=a[1]*r+a[4]*u+a[7],t},transformMat4:function(t,n,a){var r=n[0],u=n[1];return t[0]=a[0]*r+a[4]*u+a[12],t[1]=a[1]*r+a[5]*u+a[13],t},rotate:function(t,n,a,r){var u=n[0]-a[0],e=n[1]-a[1],o=Math.sin(r),i=Math.cos(r);return t[0]=u*i-e*o+a[0],t[1]=u*o+e*i+a[1],t},angle:function(t,n){var a=t[0],r=t[1],u=n[0],e=n[1],o=a*a+r*r;o>0&&(o=1/Math.sqrt(o));var i=u*u+e*e;i>0&&(i=1/Math.sqrt(i));var c=(a*u+r*e)*o*i;return c>1?0:c<-1?Math.PI:Math.acos(c)},zero:function(t){return t[0]=0,t[1]=0,t},str:function(t){return"vec2("+t[0]+", "+t[1]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]},equals:function(t,a){var r=t[0],u=t[1],e=a[0],o=a[1];return Math.abs(r-e)<=n*Math.max(1,Math.abs(r),Math.abs(e))&&Math.abs(u-o)<=n*Math.max(1,Math.abs(u),Math.abs(o))},len:En,sub:On,mul:Tn,div:Dn,dist:Fn,sqrDist:Ln,sqrLen:Vn,forEach:Qn});t.glMatrix=e,t.mat2=s,t.mat2d=b,t.mat3=q,t.mat4=E,t.quat=sn,t.quat2=gn,t.vec2=Yn,t.vec3=$,t.vec4=Pt,Object.defineProperty(t,"__esModule",{value:!0})});

// ["glMatrix", "mat2", "mat2d", "mat3", "mat4", "quat", "quat2", "vec2", "vec3", "vec4"]
window.glMatrix = glMatrix;
window.mat2 = glMatrix.mat2;
window.mat2d = glMatrix.mat2d;
window.mat3 = glMatrix.mat3;
window.mat4 = glMatrix.mat4;
window.quat = glMatrix.quat;
window.quat2 = glMatrix.quat2;
window.vec2 = glMatrix.vec2;
window.vec3 = glMatrix.vec3;
window.vec4 = glMatrix.vec4;


if(!CABLES.exportedPatches)CABLES.exportedPatches={};CABLES.exportedPatches["ANk42a"]={_id:"661d5785b8e0fb8e375ce07a",ops:[{id:"c54lfjszr",uiAttribs:{},portsIn:[{name:"min",value:0},{name:"max",value:1},{name:"Integer",value:0},{name:"No consecutive duplicates",value:0}],portsOut:[{name:"next",links:[{portIn:"Trigger",portOut:"next",objIn:"d39oo6bj0",objOut:"c54lfjszr"}]},{name:"result",links:[{portIn:"Number",portOut:"result",objIn:"taefa6f39",objOut:"c54lfjszr"}]}],objName:"Ops.Math.TriggerRandomNumber_v2"},{id:"946tb062z",uiAttribs:{},portsIn:[{name:"Key",value:"name"}],portsOut:[{name:"Result Object",links:[{portIn:"Object",portOut:"Result Object",objIn:"7g6jhwess",objOut:"946tb062z"}]}],objName:"Ops.Json.ObjectSetString_v2"},{id:"g8cn2s7li",uiAttribs:{},portsIn:[{name:"topic",value:"player"},{name:"Receive Own Data",value:1}],portsOut:[{name:"client id",links:[{portIn:"Value",portOut:"client id",objIn:"ibl0znpj2",objOut:"g8cn2s7li"}]},{name:"data",links:[{portIn:"Object",portOut:"data",objIn:"pp7v43yab",objOut:"g8cn2s7li"}]}],objName:"Ops.Extension.SocketCluster.SocketClusterReceiveObject"},{id:"m3e0xa6y2",uiAttribs:{},portsIn:[{name:"topic",value:"player"},{name:"delay (ms)",value:0}],objName:"Ops.Extension.SocketCluster.SocketClusterSendObject"},{id:"taefa6f39",uiAttribs:{},portsIn:[{name:"Key",value:"rnd"}],portsOut:[{name:"Result Object",links:[{portIn:"Object",portOut:"Result Object",objIn:"d39oo6bj0",objOut:"taefa6f39"}]}],objName:"Ops.Json.ObjectSetNumber_v2"},{id:"09zjhykx5",uiAttribs:{},portsOut:[{name:"Result",links:[{portIn:"Object",portOut:"Result",objIn:"946tb062z",objOut:"09zjhykx5"}]}],objName:"Ops.Json.EmptyObject"},{id:"4485rh1l5",uiAttribs:{},portsIn:[{name:"Active",value:1},{name:"Server hostname",value:"socket.cables.gl"},{name:"Server path",value:"/socketcluster/"},{name:"Server port",value:443},{name:"Use SSL",value:1},{name:"Allow send",value:1},{name:"Allow multiple senders",value:1},{name:"Channel",value:"0ff4185f-0354-46bb-a881-39ab856dd827"},{name:"Delay send (ms)",value:0}],portsOut:[{name:"Ready",value:true},{name:"Socket",links:[{portIn:"socket",portOut:"Socket",objIn:"g8cn2s7li",objOut:"4485rh1l5"},{portIn:"socket",portOut:"Socket",objIn:"m3e0xa6y2",objOut:"4485rh1l5"},{portIn:"Socket",portOut:"Socket",objIn:"bl4refm4w",objOut:"4485rh1l5"}]},{name:"Own client id",links:[{portIn:"Value",portOut:"Own client id",objIn:"edx6mbiqj",objOut:"4485rh1l5"}]},{name:"Can send",value:1}],objName:"Ops.Extension.SocketCluster.SocketCluster_v2"},{id:"4m7v2s9vp",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"validation"}],objName:"Ops.Trigger.TriggerSend"},{id:"7g6jhwess",uiAttribs:{},portsOut:[{name:"Next",links:[{portIn:"send",portOut:"Next",objIn:"m3e0xa6y2",objOut:"7g6jhwess"}]},{name:"Result",links:[{portIn:"data",portOut:"Result",objIn:"m3e0xa6y2",objOut:"7g6jhwess"}]}],objName:"Ops.Json.ObjectTrigger"},{id:"v1n9nhfxr",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"validation"}],portsOut:[{name:"Triggered",links:[{portIn:"Trigger",portOut:"Triggered",objIn:"7g6jhwess",objOut:"v1n9nhfxr"}]}],objName:"Ops.Trigger.TriggerReceive"},{id:"m5210lz9v",uiAttribs:{},portsIn:[{name:"String 0",value:"position:relative; z-index:9999; border-radius:30px; width:170px; transform:translate(0%,20px); background:rgba(0,0,0,0.7); cursor:pointer; border:2px solid white; text-align: center;"},{name:"String 1",value:"position:relative; z-index:9999; border-radius:30px; width:170px; transform:translate(0%,20px); background:rgba(127,127,127,0.7); cursor:pointer; border:2px solid white; text-align: center;"},{name:"String 2",value:""},{name:"String 3",value:""},{name:"String 4",value:""},{name:"String 5",value:""},{name:"String 6",value:""},{name:"String 7",value:""},{name:"String 8",value:""},{name:"String 9",value:""}],portsOut:[{name:"Result",links:[{portIn:"Style",portOut:"Result",objIn:"e7fdtvlh7",objOut:"m5210lz9v"}]}],objName:"Ops.String.SwitchString"},{id:"edx6mbiqj",uiAttribs:{},portsIn:[{name:"Variable",value:"My Client ID"}],objName:"Ops.Vars.VarSetString_v2"},{id:"ibl0znpj2",uiAttribs:{},portsIn:[{name:"Variable",value:"Received data from"}],objName:"Ops.Vars.VarSetString_v2"},{id:"jzi9v4cpa",uiAttribs:{},portsIn:[{name:"Variable",value:"Client focus"}],portsOut:[{name:"Value",links:[{portIn:"Value",portOut:"Value",objIn:"u5hoh1m57",objOut:"jzi9v4cpa"}]}],objName:"Ops.Vars.VarGetNumber_v2"},{id:"u5hoh1m57",uiAttribs:{},portsOut:[{name:"Next",links:[{portIn:"Generate",portOut:"Next",objIn:"c54lfjszr",objOut:"u5hoh1m57"}]}],objName:"Ops.Boolean.TriggerChangedTrue"},{id:"d39oo6bj0",uiAttribs:{},portsOut:[{name:"Next",links:[{portIn:"send",portOut:"Next",objIn:"m3e0xa6y2",objOut:"d39oo6bj0"}]},{name:"Result",links:[{portIn:"data",portOut:"Result",objIn:"m3e0xa6y2",objOut:"d39oo6bj0"}]}],objName:"Ops.Json.ObjectTrigger"},{id:"lyf0kfle8",uiAttribs:{},portsIn:[{name:"Translate Active",value:1},{name:"Translate X",value:-70},{name:"Translate Y",value:60},{name:"Unit index",value:1},{name:"Unit",value:"%"},{name:"Scale Active",value:1},{name:"Scale",value:1.7},{name:"Rotate Active",value:1},{name:"Rot Z",value:0},{name:"Set Origin",value:1},{name:"Origin X index",value:0},{name:"Origin X",value:"left"},{name:"Origin Y index",value:1},{name:"Origin Y",value:"center"}],objName:"Ops.Html.ElementCssTransform"},{id:"q5e42botg",uiAttribs:{},portsIn:[{name:"Opacity",value:1},{name:"Default Minimized",value:0},{name:"Minimized Opacity",value:.5},{name:"Show undo button",value:0},{name:"Show Minimize",value:0},{name:"Title",value:"DEbug mode"},{name:"Side",value:1},{name:"Default CSS",value:1}],portsOut:[{name:"childs",title:"Children",links:[{portIn:"link",portOut:"childs",objIn:"o170jydmu",objOut:"q5e42botg"}]},{name:"Opfened",value:false,title:"Opened"}],objName:"Ops.Sidebar.Sidebar"},{id:"vpgu2hu7n",uiAttribs:{},portsIn:[{name:"SearchValue",value:"**"}],portsOut:[{name:"Found",links:[{portIn:"Value",portOut:"Found",objIn:"mhu7pybnr",objOut:"vpgu2hu7n"}]},{name:"Index",value:-1}],objName:"Ops.String.StringContains_v2"},{id:"mhu7pybnr",uiAttribs:{},portsOut:[{name:"Next",links:[{portIn:"trigger",portOut:"Next",objIn:"pchvdovgx",objOut:"mhu7pybnr"}]}],objName:"Ops.Boolean.TriggerChangedTrue"},{id:"pchvdovgx",uiAttribs:{},portsIn:[{name:"Default",value:0}],portsOut:[{name:"result",links:[{portIn:"Visible",portOut:"result",objIn:"q5e42botg",objOut:"pchvdovgx"}]}],objName:"Ops.Boolean.ToggleBool_v2"},{id:"ni0d5aluf",uiAttribs:{},portsIn:[{name:"interval",value:1e3},{name:"Active",value:1}],portsOut:[{name:"trigger",links:[{portIn:"update",portOut:"trigger",objIn:"o170jydmu",objOut:"ni0d5aluf"}]}],objName:"Ops.Trigger.Interval"},{id:"cpongune1",uiAttribs:{},portsIn:[{name:"Title",value:"Debug **"}],objName:"Ops.Ui.Area"},{id:"o170jydmu",uiAttribs:{},portsIn:[{name:"Id",value:""}],portsOut:[{name:"childs",links:[{portIn:"link",portOut:"childs",objIn:"c9dulil5x",objOut:"o170jydmu"}]}],objName:"Ops.Sidebar.SidebarVariables"},{id:"c9dulil5x",uiAttribs:{},portsIn:[{name:"Text",value:"Clear all"},{name:"Grey Out",value:0},{name:"Visible",value:1}],portsOut:[{name:"Pressed Trigger",links:[{portIn:"Trigger",portOut:"Pressed Trigger",objIn:"yexk6fsru",objOut:"c9dulil5x"}]}],objName:"Ops.Sidebar.Button_v2"},{id:"yexk6fsru",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"clearall"}],objName:"Ops.Trigger.TriggerSend"},{id:"yq9fmoz8o",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"clearall"}],portsOut:[{name:"Triggered",links:[{portIn:"Trigger",portOut:"Triggered",objIn:"uao0ueg7i",objOut:"yq9fmoz8o"}]}],objName:"Ops.Trigger.TriggerReceive"},{id:"uao0ueg7i",uiAttribs:{},portsIn:[{name:"String",value:"*cl*"}],portsOut:[{name:"Next",links:[{portIn:"Trigger",portOut:"Next",objIn:"7g6jhwess",objOut:"uao0ueg7i"}]},{name:"Result",links:[{portIn:"Value",portOut:"Result",objIn:"946tb062z",objOut:"uao0ueg7i"}]}],objName:"Ops.Trigger.TriggerString"},{id:"jtmmk7ngn",uiAttribs:{},portsIn:[{name:"FPS Limit",value:0},{name:"Reduce FPS not focussed",value:1},{name:"Reduce FPS loading",value:0},{name:"Clear",value:1},{name:"ClearAlpha",value:1},{name:"Fullscreen Button",value:0},{name:"Active",value:1},{name:"Hires Displays",value:1},{name:"Pixel Unit index",value:0},{name:"Pixel Unit",value:"Display"}],portsOut:[{name:"trigger",links:[{portIn:"exe",portOut:"trigger",objIn:"yzrk78cbk",objOut:"jtmmk7ngn"}]},{name:"width",value:1182},{name:"height",value:1060}],objName:"Ops.Gl.MainLoop"},{id:"dwka5o3tf",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"rendering"}],objName:"Ops.Trigger.TriggerSend"},{id:"pp7v43yab",uiAttribs:{},portsIn:[{name:"Path",value:"name"},{name:"Output path if missing",value:0}],portsOut:[{name:"Output",links:[{portIn:"String",portOut:"Output",objIn:"9odgvsy0x",objOut:"pp7v43yab"}]},{name:"Found",value:true}],objName:"Ops.Data.JsonPath.ObjectGetStringByPath"},{id:"spujzm34w",uiAttribs:{},portsIn:[{name:"Array length",value:10}],portsOut:[{name:"Array",links:[{portIn:"Array",portOut:"Array",objIn:"5idada7k5",objOut:"spujzm34w"},{portIn:"array",portOut:"Array",objIn:"cyrrqfcmr",objOut:"spujzm34w"},{portIn:"Value",portOut:"Array",objIn:"grenny4hy",objOut:"spujzm34w"},{portIn:"array",portOut:"Array",objIn:"vi4jjgysx",objOut:"spujzm34w"}]},{name:"Array length out",value:10}],objName:"Ops.User.u_60hz.ArrayInsertString"},{id:"5idada7k5",uiAttribs:{},portsIn:[{name:"Start Row",value:0}],objName:"Ops.Ui.VizArrayTable"},{id:"9odgvsy0x",uiAttribs:{},portsIn:[{name:"Invalid if null",value:1},{name:"Invalid if undefined",value:1},{name:"Invalid if empty",value:1},{name:"Invalid if 0",value:1}],portsOut:[{name:"Last Valid String",links:[{portIn:"Value",portOut:"Last Valid String",objIn:"spujzm34w",objOut:"9odgvsy0x"}]},{name:"Is Valid",value:1}],objName:"Ops.String.FilterValidString"},{id:"rxmufd9t7",uiAttribs:{},portsIn:[{name:"height",value:.33},{name:"pivot x index",value:1},{name:"pivot x",value:"center"},{name:"pivot y index",value:1},{name:"pivot y",value:"center"},{name:"num columns",value:1},{name:"num rows",value:1},{name:"axis index",value:0},{name:"axis",value:"xy"},{name:"Active",value:1,title:"Render mesh"}],objName:"Ops.Gl.Meshes.Rectangle_v2"},{id:"0dfz35olp",uiAttribs:{},portsIn:[{name:"scale",value:1},{name:"rotX",value:0},{name:"rotY",value:0},{name:"rotZ",value:0}],portsOut:[{name:"trigger",links:[{portIn:"Exec",portOut:"trigger",objIn:"jajf3icit",objOut:"0dfz35olp"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"58u076a9i",uiAttribs:{},portsOut:[{name:"trigger 5",links:[{portIn:"Render",portOut:"trigger 5",objIn:"v2vlgythl",objOut:"58u076a9i"}]}],objName:"Ops.Trigger.Sequence"},{id:"m91ugq384",uiAttribs:{},portsIn:[{name:"number2",value:2}],portsOut:[{name:"result",links:[{portIn:"number1",portOut:"result",objIn:"jkm4likn9",objOut:"m91ugq384"}]}],objName:"Ops.Math.Multiply"},{id:"7yzfzvdzp",uiAttribs:{},portsIn:[{name:"Repeats",value:16},{name:"Direction index",value:0},{name:"Direction",value:"Forward"}],portsOut:[{name:"Next",links:[{portIn:"render",portOut:"Next",objIn:"0dfz35olp",objOut:"7yzfzvdzp"}]},{name:"index",links:[{portIn:"Seed",portOut:"index",objIn:"0uc2gwl14",objOut:"7yzfzvdzp"},{portIn:"index",portOut:"index",objIn:"cyrrqfcmr",objOut:"7yzfzvdzp"}]}],objName:"Ops.Trigger.Repeat_v2"},{id:"0uc2gwl14",uiAttribs:{},portsIn:[{name:"Min",value:-.94},{name:"Max",value:.64}],portsOut:[{name:"X",links:[{portIn:"posX",portOut:"X",objIn:"0dfz35olp",objOut:"0uc2gwl14"}]},{name:"Y",links:[{portIn:"posY",portOut:"Y",objIn:"0dfz35olp",objOut:"0uc2gwl14"}]},{name:"Z",links:[{portIn:"posZ",portOut:"Z",objIn:"0dfz35olp",objOut:"0uc2gwl14"}]},{name:"W",value:.5670482681755831}],objName:"Ops.Math.RandomNumbers_v3"},{id:"cyrrqfcmr",uiAttribs:{},portsOut:[{name:"result",links:[{portIn:"Text",portOut:"result",objIn:"v2vlgythl",objOut:"cyrrqfcmr"}]}],objName:"Ops.Array.ArrayGetString"},{id:"djztdnm7z",uiAttribs:{},portsIn:[{name:"posX",value:0},{name:"posY",value:0},{name:"posZ",value:-.01},{name:"scale",value:1},{name:"rotX",value:0},{name:"rotY",value:0},{name:"rotZ",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"rxmufd9t7",objOut:"djztdnm7z"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"v2vlgythl",uiAttribs:{},portsIn:[{name:"Scale",value:.12},{name:"Font",value:"Arial"},{name:"align index",value:1},{name:"align",value:"center"},{name:"vertical align index",value:1},{name:"vertical align",value:"Middle"},{name:"Line Height",value:.4},{name:"Letter Spacing",value:0},{name:"filter index",value:2},{name:"filter",value:"mipmap"},{name:"Anisotropic index",value:5},{name:"Anisotropic",value:"16"},{name:"r",value:1},{name:"g",value:1},{name:"b",value:1},{name:"a",value:1}],portsOut:[{name:"Total Lines",value:1},{name:"Width",links:[{portIn:"number1",portOut:"Width",objIn:"m91ugq384",objOut:"v2vlgythl"}]},{name:"Font Available",value:0}],objName:"Ops.Gl.Meshes.TextMesh_v2"},{id:"jkm4likn9",uiAttribs:{},portsIn:[{name:"number2",value:0}],portsOut:[{name:"result",links:[{portIn:"width",portOut:"result",objIn:"rxmufd9t7",objOut:"jkm4likn9"}]}],objName:"Ops.Math.Sum"},{id:"y85dqlnq1",uiAttribs:{},portsIn:[{name:"posX",value:0},{name:"posY",value:0},{name:"posZ",value:0},{name:"scale",value:.47}],portsOut:[{name:"trigger",links:[{portIn:"Execute",portOut:"trigger",objIn:"7yzfzvdzp",objOut:"y85dqlnq1"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"jajf3icit",uiAttribs:{},portsOut:[{name:"Next",links:[{portIn:"exe",portOut:"Next",objIn:"58u076a9i",objOut:"jajf3icit"}]}],objName:"Ops.Gl.Matrix.Billboard"},{id:"3lrx6ah9i",uiAttribs:{},portsIn:[{name:"Speed",value:10},{name:"Play",value:1},{name:"Sync to timeline",value:0}],portsOut:[{name:"Time",links:[{portIn:"rotX",portOut:"Time",objIn:"y85dqlnq1",objOut:"3lrx6ah9i"},{portIn:"rotY",portOut:"Time",objIn:"y85dqlnq1",objOut:"3lrx6ah9i"},{portIn:"rotZ",portOut:"Time",objIn:"y85dqlnq1",objOut:"3lrx6ah9i"}]}],objName:"Ops.Anim.Timer_v2"},{id:"jyhrli6q7",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"rendering"}],objName:"Ops.Trigger.TriggerReceive"},{id:"0ibj0rzrq",uiAttribs:{},portsIn:[{name:"r",value:0},{name:"g",value:0},{name:"b",value:0},{name:"a",value:1}],portsOut:[{name:"trigger",links:[{portIn:"Trigger",portOut:"trigger",objIn:"dwka5o3tf",objOut:"0ibj0rzrq"}]}],objName:"Ops.Gl.ClearColor"},{id:"sm8kqb1t8",uiAttribs:{},portsOut:[{name:"Parent Out",links:[{portIn:"Element",portOut:"Parent Out",objIn:"lyf0kfle8",objOut:"sm8kqb1t8"}]}],objName:"Ops.Html.AppendChild_v2"},{id:"yzrk78cbk",uiAttribs:{},portsIn:[{name:"Visible",value:"true"},{name:"Measure GPU",value:1},{name:"Position index",value:1},{name:"Position",value:"bottom"},{name:"Open",value:0},{name:"Smooth Graph",value:1},{name:"Scale",value:3},{name:"Size",value:128}],portsOut:[{name:"childs",links:[{portIn:"render",portOut:"childs",objIn:"0ibj0rzrq",objOut:"yzrk78cbk"}]},{name:"FPS",value:120}],objName:"Ops.Gl.Performance"},{id:"grenny4hy",uiAttribs:{},portsIn:[{name:"Variable",value:"List of words"}],objName:"Ops.Vars.VarSetArray_v2"},{id:"2loc1bl6l",uiAttribs:{},portsIn:[{name:"interval",value:1e3},{name:"Active",value:1}],portsOut:[{name:"trigger",links:[{portIn:"Update",portOut:"trigger",objIn:"bl4refm4w",objOut:"2loc1bl6l"}]}],objName:"Ops.Trigger.Interval"},{id:"bl4refm4w",uiAttribs:{},portsIn:[{name:"Topic",value:"player"},{name:"Timeout",value:2e4},{name:"Soft Timeout",value:15e3},{name:"Retain Messages",value:1},{name:"Receive My Data",value:1}],objName:"Ops.Extension.SocketCluster.SocketClusterTopicInfo"},{id:"9fivs2rj3",uiAttribs:{},portsIn:[{name:"segments",value:10},{name:"radius",value:1},{name:"percent",value:1},{name:"Absolute",value:1},{name:"Flip",value:0},{name:"Rotate",value:0}],portsOut:[{name:"trigger",links:[{portIn:"exe",portOut:"trigger",objIn:"hvj3y8y18",objOut:"9fivs2rj3"}]},{name:"index",links:[{portIn:"index",portOut:"index",objIn:"4we1bno71",objOut:"9fivs2rj3"},{portIn:"offset",portOut:"index",objIn:"qvooqi0n9",objOut:"9fivs2rj3"},{portIn:"number1",portOut:"index",objIn:"b01wbndao",objOut:"9fivs2rj3"},{portIn:"offset",portOut:"index",objIn:"tgzinbp5u",objOut:"9fivs2rj3"},{portIn:"index",portOut:"index",objIn:"vi4jjgysx",objOut:"9fivs2rj3"}]}],objName:"Ops.Deprecated.Gl.Matrix.CircleTransform"},{id:"sz5xmlrs6",uiAttribs:{},portsIn:[{name:"radius",value:.1},{name:"innerRadius",value:0},{name:"segments",value:40},{name:"percent",value:1},{name:"steps",value:0},{name:"invertSteps",value:0},{name:"mapping index",value:0},{name:"mapping",value:"flat"},{name:"Spline",value:0},{name:"Draw",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"l5xfygzin",objOut:"sz5xmlrs6"},{portIn:"render",portOut:"trigger",objIn:"tnp708kt9",objOut:"sz5xmlrs6"},{portIn:"render",portOut:"trigger",objIn:"4ksazhghs",objOut:"sz5xmlrs6"},{portIn:"Exec",portOut:"trigger",objIn:"e0uugzyin",objOut:"sz5xmlrs6"}]}],objName:"Ops.Gl.Meshes.Circle"},{id:"vssxa13ix",uiAttribs:{},portsIn:[{name:"segments",value:5},{name:"radius",value:.8},{name:"percent",value:1},{name:"Absolute",value:1},{name:"Flip",value:0},{name:"Rotate",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"889py2kcm",objOut:"vssxa13ix"}]},{name:"index",links:[{portIn:"index",portOut:"index",objIn:"eh9mbhzer",objOut:"vssxa13ix"}]}],objName:"Ops.Deprecated.Gl.Matrix.CircleTransform"},{id:"yv5d23wnp",uiAttribs:{},portsIn:[{name:"radius",value:.14},{name:"innerRadius",value:0},{name:"segments",value:40},{name:"percent",value:1},{name:"steps",value:0},{name:"invertSteps",value:0},{name:"mapping index",value:0},{name:"mapping",value:"flat"},{name:"Spline",value:0},{name:"Draw",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"cjva3213g",objOut:"yv5d23wnp"},{portIn:"Exe",portOut:"trigger",objIn:"f8k1lggwj",objOut:"yv5d23wnp"}]}],objName:"Ops.Gl.Meshes.Circle"},{id:"jwndnyuo6",uiAttribs:{},portsIn:[{name:"segments",value:15},{name:"radius",value:.41},{name:"percent",value:1},{name:"Absolute",value:1},{name:"Flip",value:0},{name:"Rotate",value:0}],portsOut:[{name:"trigger",links:[{portIn:"Exe",portOut:"trigger",objIn:"dxir3tl9y",objOut:"jwndnyuo6"}]},{name:"index",links:[{portIn:"index",portOut:"index",objIn:"o28bel73l",objOut:"jwndnyuo6"}]}],objName:"Ops.Deprecated.Gl.Matrix.CircleTransform"},{id:"mhbysxjby",uiAttribs:{},portsIn:[{name:"radius",value:.14},{name:"innerRadius",value:0},{name:"segments",value:40},{name:"percent",value:1},{name:"steps",value:0},{name:"invertSteps",value:0},{name:"mapping index",value:0},{name:"mapping",value:"flat"},{name:"Spline",value:0},{name:"Draw",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"z3fq8yj2n",objOut:"mhbysxjby"}]}],objName:"Ops.Gl.Meshes.Circle"},{id:"4we1bno71",uiAttribs:{},portsIn:[{name:"Value Invalid Index",value:0}],portsOut:[{name:"value",links:[{portIn:"number1",portOut:"value",objIn:"qu7ppe6l9",objOut:"4we1bno71"}]},{name:"Valid Index",value:1}],objName:"Ops.Array.ArrayGetNumber"},{id:"bar3b5awg",uiAttribs:{},portsIn:[{name:"posX",value:0},{name:"posY",value:0},{name:"posZ",value:0},{name:"scale",value:.6},{name:"rotX",value:0},{name:"rotZ",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"xgs0ycjvn",objOut:"bar3b5awg"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"xqmowof1m",uiAttribs:{},portsIn:[{name:"numValues",value:100},{name:"Min",value:.6},{name:"Max",value:-1.3},{name:"random seed",value:0},{name:"Integer",value:0}],portsOut:[{name:"values",links:[{portIn:"array",portOut:"values",objIn:"eh9mbhzer",objOut:"xqmowof1m"}]},{name:"Array length",value:100}],objName:"Ops.Array.RandomNumbersArray"},{id:"eh9mbhzer",uiAttribs:{},portsIn:[{name:"Value Invalid Index",value:0}],portsOut:[{name:"value",value:.4655101708950288},{name:"Valid Index",value:1}],objName:"Ops.Array.ArrayGetNumber"},{id:"qvooqi0n9",uiAttribs:{},portsIn:[{name:"segments",value:40},{name:"radius",value:1},{name:"mulX",value:.1},{name:"mulY",value:.1},{name:"percent",value:0},{name:"speed",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"k9fif19w6",objOut:"qvooqi0n9"}]},{name:"index",value:0},{name:"X",value:.03984656471677914},{name:"Y",value:-.09140056711723556}],objName:"Ops.Deprecated.Gl.Matrix.CircleMovement"},{id:"vy40soz6g",uiAttribs:{},portsIn:[{name:"r",value:.82},{name:"g",value:.82},{name:"b",value:.82},{name:"a",value:.7},{name:"colorizeTexture",value:0},{name:"billboard",value:1},{name:"Opacity TexCoords Transform",value:0},{name:"preMultiplied alpha",value:0},{name:"diffuseRepeatX",value:1},{name:"diffuseRepeatY",value:1},{name:"Tex Offset X",value:0},{name:"Tex Offset Y",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"jwndnyuo6",objOut:"vy40soz6g"}]}],objName:"Ops.Gl.Shader.BasicMaterial"},{id:"889py2kcm",uiAttribs:{},portsIn:[{name:"r",value:.586},{name:"g",value:.586},{name:"b",value:.586},{name:"a",value:.7},{name:"colorizeTexture",value:0},{name:"billboard",value:1},{name:"Opacity TexCoords Transform",value:0},{name:"preMultiplied alpha",value:0},{name:"diffuseRepeatX",value:1},{name:"diffuseRepeatY",value:1},{name:"Tex Offset X",value:0},{name:"Tex Offset Y",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"beg02ch9j",objOut:"889py2kcm"}]}],objName:"Ops.Gl.Shader.BasicMaterial"},{id:"beg02ch9j",uiAttribs:{},portsIn:[{name:"posX",value:0},{name:"posY",value:0},{name:"posZ",value:0},{name:"scale",value:1},{name:"rotY",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"yv5d23wnp",objOut:"beg02ch9j"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"unbbhh2cc",uiAttribs:{},portsIn:[{name:"Multiply",value:11}],portsOut:[{name:"result",links:[{portIn:"rotX",portOut:"result",objIn:"beg02ch9j",objOut:"unbbhh2cc"},{portIn:"rotZ",portOut:"result",objIn:"beg02ch9j",objOut:"unbbhh2cc"},{portIn:"rotY",portOut:"result",objIn:"7su8qlsrj",objOut:"unbbhh2cc"}]}],objName:"Ops.Deprecated.Anim.RelativeTime"},{id:"dm97lombc",uiAttribs:{},portsIn:[{name:"thickness",value:1},{name:"subDivs",value:0},{name:"Bezier",value:0},{name:"centerpoint",value:1},{name:"Closed",value:0},{name:"Draw",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"4p0f9oeck",objOut:"dm97lombc"}]}],objName:"Ops.Deprecated.Gl.Meshes.Spline"},{id:"cjva3213g",uiAttribs:{},objName:"Ops.Deprecated.Ops.Gl.Meshes.SplinePoint"},{id:"4p0f9oeck",uiAttribs:{},portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"7su8qlsrj",objOut:"4p0f9oeck"}]}],objName:"Ops.Deprecated.Ops.Gl.Meshes.SplinePoint"},{id:"1kg0zwofb",uiAttribs:{},portsIn:[{name:"thickness",value:1},{name:"subDivs",value:0},{name:"Bezier",value:0},{name:"centerpoint",value:1},{name:"Closed",value:0},{name:"Draw",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"t2zbs3zzn",objOut:"1kg0zwofb"}]}],objName:"Ops.Deprecated.Gl.Meshes.Spline"},{id:"t2zbs3zzn",uiAttribs:{},portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"vy40soz6g",objOut:"t2zbs3zzn"}]}],objName:"Ops.Deprecated.Ops.Gl.Meshes.SplinePoint"},{id:"z3fq8yj2n",uiAttribs:{},objName:"Ops.Deprecated.Ops.Gl.Meshes.SplinePoint"},{id:"w1kzouwca",uiAttribs:{},portsIn:[{name:"r",value:.531},{name:"g",value:.531},{name:"b",value:.531},{name:"a",value:.752},{name:"colorizeTexture",value:0},{name:"billboard",value:1},{name:"Opacity TexCoords Transform",value:0},{name:"preMultiplied alpha",value:0},{name:"diffuseRepeatX",value:1},{name:"diffuseRepeatY",value:1},{name:"Tex Offset X",value:0},{name:"Tex Offset Y",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"9fivs2rj3",objOut:"w1kzouwca"},{portIn:"exe",portOut:"trigger",objIn:"8nt9wr91d",objOut:"w1kzouwca"}]}],objName:"Ops.Gl.Shader.BasicMaterial"},{id:"f8k1lggwj",uiAttribs:{},portsIn:[{name:"Nth",value:3}],portsOut:[{name:"next",links:[{portIn:"render",portOut:"next",objIn:"unygzdu6i",objOut:"f8k1lggwj"}]}],objName:"Ops.Trigger.NthTrigger"},{id:"3a8cxxvpv",uiAttribs:{},portsIn:[{name:"Nth",value:2}],portsOut:[{name:"next",links:[{portIn:"render",portOut:"next",objIn:"vssxa13ix",objOut:"3a8cxxvpv"}]}],objName:"Ops.Trigger.NthTrigger"},{id:"dxir3tl9y",uiAttribs:{},portsIn:[{name:"Nth",value:3}],portsOut:[{name:"next",links:[{portIn:"render",portOut:"next",objIn:"mhbysxjby",objOut:"dxir3tl9y"}]}],objName:"Ops.Trigger.NthTrigger"},{id:"rtdf9uyok",uiAttribs:{},portsIn:[{name:"numValues",value:100},{name:"Min",value:0},{name:"Max",value:0},{name:"random seed",value:0},{name:"Integer",value:0}],portsOut:[{name:"values",links:[{portIn:"array",portOut:"values",objIn:"o28bel73l",objOut:"rtdf9uyok"}]},{name:"Array length",value:100}],objName:"Ops.Array.RandomNumbersArray"},{id:"o28bel73l",uiAttribs:{},portsIn:[{name:"Value Invalid Index",value:0}],portsOut:[{name:"value",value:0},{name:"Valid Index",value:1}],objName:"Ops.Array.ArrayGetNumber"},{id:"qu7ppe6l9",uiAttribs:{},portsIn:[{name:"number2",value:2.6}],portsOut:[{name:"result",links:[{portIn:"number2",portOut:"result",objIn:"rps9bjx08",objOut:"qu7ppe6l9"},{portIn:"mul",portOut:"result",objIn:"k9fif19w6",objOut:"qu7ppe6l9"}]}],objName:"Ops.Math.Multiply"},{id:"7su8qlsrj",uiAttribs:{},portsIn:[{name:"posX",value:0},{name:"posY",value:0},{name:"posZ",value:0},{name:"scale",value:1},{name:"rotX",value:0},{name:"rotZ",value:0}],portsOut:[{name:"trigger",links:[{portIn:"Exe",portOut:"trigger",objIn:"3a8cxxvpv",objOut:"7su8qlsrj"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"l5xfygzin",uiAttribs:{},portsIn:[{name:"r",value:.414},{name:"g",value:.698},{name:"b",value:1},{name:"a",value:1},{name:"colorizeTexture",value:0},{name:"billboard",value:0},{name:"Opacity TexCoords Transform",value:0},{name:"preMultiplied alpha",value:0},{name:"diffuseRepeatX",value:1},{name:"diffuseRepeatY",value:1},{name:"Tex Offset X",value:0},{name:"Tex Offset Y",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"dm97lombc",objOut:"l5xfygzin"}]}],objName:"Ops.Gl.Shader.BasicMaterial"},{id:"unygzdu6i",uiAttribs:{},portsIn:[{name:"r",value:.028063835650486535},{name:"g",value:.6127608112416902},{name:"b",value:.884862974159129},{name:"a",value:1},{name:"colorizeTexture",value:0},{name:"billboard",value:0},{name:"Opacity TexCoords Transform",value:0},{name:"preMultiplied alpha",value:0},{name:"diffuseRepeatX",value:1},{name:"diffuseRepeatY",value:1},{name:"Tex Offset X",value:0},{name:"Tex Offset Y",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"1kg0zwofb",objOut:"unygzdu6i"}]}],objName:"Ops.Gl.Shader.BasicMaterial"},{id:"b01wbndao",uiAttribs:{},portsIn:[{name:"number2",value:111}],portsOut:[{name:"result",links:[{portIn:"rotY",portOut:"result",objIn:"45xywog3s",objOut:"b01wbndao"},{portIn:"rotY",portOut:"result",objIn:"hp9sxyvrg",objOut:"b01wbndao"}]}],objName:"Ops.Math.Multiply"},{id:"xgs0ycjvn",uiAttribs:{},portsIn:[{name:"r",value:.074},{name:"g",value:.555},{name:"b",value:.555},{name:"a",value:1},{name:"colorizeTexture",value:0},{name:"billboard",value:0},{name:"Opacity TexCoords Transform",value:0},{name:"preMultiplied alpha",value:0},{name:"diffuseRepeatX",value:1},{name:"diffuseRepeatY",value:1},{name:"Tex Offset X",value:0},{name:"Tex Offset Y",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"x18sm10ji",objOut:"xgs0ycjvn"}]}],objName:"Ops.Gl.Shader.BasicMaterial"},{id:"8nt9wr91d",uiAttribs:{},portsIn:[{name:"Multiply",value:1}],portsOut:[{name:"result",links:[{portIn:"number1",portOut:"result",objIn:"rps9bjx08",objOut:"8nt9wr91d"}]}],objName:"Ops.Deprecated.Anim.RelativeTime"},{id:"72n46zsmy",uiAttribs:{},portsIn:[{name:"radius",value:.05},{name:"innerRadius",value:0},{name:"segments",value:16},{name:"percent",value:1},{name:"steps",value:0},{name:"invertSteps",value:0},{name:"mapping index",value:0},{name:"mapping",value:"flat"},{name:"Spline",value:0},{name:"Draw",value:1}],objName:"Ops.Gl.Meshes.Circle"},{id:"tgzinbp5u",uiAttribs:{},portsIn:[{name:"segments",value:80},{name:"radius",value:1},{name:"mulX",value:.1},{name:"mulY",value:.1},{name:"percent",value:0},{name:"speed",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"uohuilbrx",objOut:"tgzinbp5u"}]},{name:"index",value:0},{name:"X",value:-.08306540866810762},{name:"Y",value:.055540305525979584}],objName:"Ops.Deprecated.Gl.Matrix.CircleMovement"},{id:"rps9bjx08",uiAttribs:{},portsIn:[{name:"pingpong",value:1}],portsOut:[{name:"result",links:[{portIn:"mul",portOut:"result",objIn:"uohuilbrx",objOut:"rps9bjx08"}]}],objName:"Ops.Math.Modulo"},{id:"hvj3y8y18",uiAttribs:{},portsOut:[{name:"trigger 0",links:[{portIn:"render",portOut:"trigger 0",objIn:"hp9sxyvrg",objOut:"hvj3y8y18"}]},{name:"trigger 14",links:[{portIn:"render",portOut:"trigger 14",objIn:"45xywog3s",objOut:"hvj3y8y18"}]}],objName:"Ops.Deprecated.Trigger.Sequence"},{id:"45xywog3s",uiAttribs:{},portsIn:[{name:"posX",value:0},{name:"posY",value:0},{name:"posZ",value:0},{name:"scale",value:1},{name:"rotX",value:0},{name:"rotZ",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"tgzinbp5u",objOut:"45xywog3s"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"hp9sxyvrg",uiAttribs:{},portsIn:[{name:"posX",value:0},{name:"posY",value:0},{name:"posZ",value:0},{name:"scale",value:1},{name:"rotX",value:0},{name:"rotZ",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"qvooqi0n9",objOut:"hp9sxyvrg"}]}],objName:"Ops.Gl.Matrix.Transform"},{id:"k9fif19w6",uiAttribs:{},portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"sz5xmlrs6",objOut:"k9fif19w6"}]}],objName:"Ops.Gl.Matrix.TransformMul"},{id:"uohuilbrx",uiAttribs:{},portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"72n46zsmy",objOut:"uohuilbrx"}]}],objName:"Ops.Gl.Matrix.TransformMul"},{id:"tnp708kt9",uiAttribs:{},portsIn:[{name:"mul",value:0}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"dx2fphbw7",objOut:"tnp708kt9"}]}],objName:"Ops.Gl.Matrix.TransformMul"},{id:"dx2fphbw7",uiAttribs:{},portsIn:[{name:"radius",value:.5},{name:"innerRadius",value:.973},{name:"segments",value:40},{name:"percent",value:1},{name:"steps",value:0},{name:"invertSteps",value:0},{name:"mapping index",value:0},{name:"mapping",value:"flat"},{name:"Spline",value:1},{name:"Draw",value:1}],objName:"Ops.Gl.Meshes.Circle"},{id:"4ksazhghs",uiAttribs:{},objName:"Ops.Deprecated.Ops.Gl.Meshes.SplinePoint"},{id:"188b40xxo",uiAttribs:{},portsIn:[{name:"Scale",value:.25},{name:"Font",value:"Arial"},{name:"align index",value:1},{name:"align",value:"center"},{name:"vertical align index",value:1},{name:"vertical align",value:"Middle"},{name:"Line Height",value:1},{name:"Letter Spacing",value:0},{name:"filter index",value:2},{name:"filter",value:"mipmap"},{name:"Anisotropic index",value:0},{name:"Anisotropic",value:0},{name:"r",value:1},{name:"g",value:1},{name:"b",value:1},{name:"a",value:1}],portsOut:[{name:"Total Lines",value:1},{name:"Width",value:.2631051199776786},{name:"Font Available",value:1}],objName:"Ops.Gl.Meshes.TextMesh_v2"},{id:"vi4jjgysx",uiAttribs:{},portsOut:[{name:"result",links:[{portIn:"Text",portOut:"result",objIn:"188b40xxo",objOut:"vi4jjgysx"}]}],objName:"Ops.Array.ArrayGetString"},{id:"e0uugzyin",uiAttribs:{},portsOut:[{name:"Next",links:[{portIn:"Render",portOut:"Next",objIn:"188b40xxo",objOut:"e0uugzyin"}]}],objName:"Ops.Gl.Matrix.Billboard"},{id:"zg4w9i49j",uiAttribs:{},portsIn:[{name:"clear depth",value:0},{name:"enable depth testing",value:0},{name:"write to depth buffer",value:1},{name:"ratio",value:"less or equal"}],portsOut:[{name:"trigger",links:[{portIn:"exe",portOut:"trigger",objIn:"unbbhh2cc",objOut:"zg4w9i49j"},{portIn:"render",portOut:"trigger",objIn:"nhnzjweee",objOut:"zg4w9i49j"}]}],objName:"Ops.Deprecated.Gl.Depth"},{id:"cqgfoy3ry",uiAttribs:{},portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"w1kzouwca",objOut:"cqgfoy3ry"}]}],objName:"Ops.Deprecated.Ops.Gl.Meshes.SplinePoint"},{id:"x18sm10ji",uiAttribs:{},portsIn:[{name:"thickness",value:1},{name:"subDivs",value:0},{name:"Bezier",value:0},{name:"centerpoint",value:1},{name:"Closed",value:0},{name:"Draw",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"cqgfoy3ry",objOut:"x18sm10ji"}]}],objName:"Ops.Deprecated.Gl.Meshes.Spline"},{id:"665eaum81",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"rendering"}],portsOut:[{name:"Triggered",links:[{portIn:"render",portOut:"Triggered",objIn:"zg4w9i49j",objOut:"665eaum81"}]}],objName:"Ops.Trigger.TriggerReceive"},{id:"1lsk4pmgr",uiAttribs:{},portsIn:[{name:"numValues",value:100},{name:"Min",value:.21},{name:"Max",value:2.05},{name:"random seed",value:6.62},{name:"Integer",value:0}],portsOut:[{name:"values",links:[{portIn:"array",portOut:"values",objIn:"4we1bno71",objOut:"1lsk4pmgr"}]},{name:"Array length",value:100}],objName:"Ops.Array.RandomNumbersArray"},{id:"nhnzjweee",uiAttribs:{},portsIn:[{name:"min distance",value:1},{name:"max distance",value:999999},{name:"min rot y",value:0},{name:"max rot y",value:0},{name:"initial radius",value:2},{name:"initial axis y",value:.5},{name:"initial axis x",value:.25},{name:"Smoothness",value:1},{name:"Speed X",value:1},{name:"Speed Y",value:1},{name:"Active",value:1},{name:"Allow Panning",value:1},{name:"Allow Zooming",value:1},{name:"Allow Rotation",value:1},{name:"restricted",value:1},{name:"Identity",value:1}],portsOut:[{name:"trigger",links:[{portIn:"render",portOut:"trigger",objIn:"bar3b5awg",objOut:"nhnzjweee"}]},{name:"radius",value:5},{name:"Rot X",value:-5.203620600309239},{name:"Rot Y",value:111.92906249999999}],objName:"Ops.Gl.Matrix.OrbitControls_v2"},{id:"5i8l14hwv",uiAttribs:{},portsIn:[{name:"Speed",value:5},{name:"Play",value:1},{name:"Sync to timeline",value:0}],portsOut:[{name:"Time",links:[{portIn:"rotY",portOut:"Time",objIn:"bar3b5awg",objOut:"5i8l14hwv"}]}],objName:"Ops.Anim.Timer_v2"},{id:"e7fdtvlh7",uiAttribs:{},portsIn:[{name:"Text",value:"SEND"},{name:"Id",value:""},{name:"Class",value:""},{name:"Convert Line Breaks",value:0},{name:"Propagate Click-Events",value:1}],portsOut:[{name:"DOM Element",links:[{portIn:"Child",portOut:"DOM Element",objIn:"sm8kqb1t8",objOut:"e7fdtvlh7"}]},{name:"Hover",links:[{portIn:"Index",portOut:"Hover",objIn:"m5210lz9v",objOut:"e7fdtvlh7"}]},{name:"Clicked",links:[{portIn:"Trigger",portOut:"Clicked",objIn:"4m7v2s9vp",objOut:"e7fdtvlh7"}]}],objName:"Ops.Html.DivElement_v3"},{id:"vru67xymu",uiAttribs:{},portsIn:[{name:"Element index",value:0},{name:"Element",value:"Input"},{name:"Type index",value:0},{name:"Type",value:"Text"},{name:"Default Value",value:""},{name:"Placeholder",value:"Type here..."},{name:"Id",value:""},{name:"Class",value:""},{name:"Style",value:"position:relative;\ntop:10px;\nfont-size: 16px;\ncolor:#ccc;\nbackground-color:rgba(85,85,85,0.8);\nborder:none;\npadding:4px;"},{name:"Autocomplete",value:0},{name:"Max Length",value:8},{name:"Interactive",value:1},{name:"Visible",value:1}],portsOut:[{name:"DOM Element",links:[{portIn:"Child",portOut:"DOM Element",objIn:"5pn77ljam",objOut:"vru67xymu"}]},{name:"Value",links:[{portIn:"String 0",portOut:"Value",objIn:"9uxstj2zl",objOut:"vru67xymu"}]},{name:"Hover",value:0}],objName:"Ops.Html.InputElement"},{id:"z71j2edco",uiAttribs:{},portsIn:[{name:"Id",value:""},{name:"Class",value:""},{name:"Style",value:"position:absolute;\nz-index:100;\nmargin: auto;\nwidth: 100%;\nbackground-color:rgba(85, 85, 85, 0);\ncolor::rgba(185, 185, 185, 185);\npadding:0px;\nborder-radius: 20px;\ntop:5%;\nleft:75%;\n"},{name:"Interactive",value:0},{name:"Visible",value:1},{name:"Convert Line Breaks",value:0},{name:"Propagate Click-Events",value:1}],portsOut:[{name:"DOM Element",links:[{portIn:"Parent",portOut:"DOM Element",objIn:"yxc30omdg",objOut:"z71j2edco"}]},{name:"Hover",value:0}],objName:"Ops.Html.DivElement_v3"},{id:"p1mfdzoh3",uiAttribs:{},portsIn:[{name:"Id",value:""},{name:"Class",value:""},{name:"Style",value:"position:relative;\nz-index:100;\nmargin: auto;\nwidth: 100%;\nbackground-color:rgba(85, 85, 85, 0);\ncolor::rgba(185, 185, 185, 185);\npadding:0px;\n"},{name:"Interactive",value:0},{name:"Visible",value:1},{name:"Convert Line Breaks",value:1},{name:"Propagate Click-Events",value:1}],portsOut:[{name:"DOM Element",links:[{portIn:"Child",portOut:"DOM Element",objIn:"yxc30omdg",objOut:"p1mfdzoh3"}]},{name:"Hover",value:0}],objName:"Ops.Html.DivElement_v3"},{id:"yxc30omdg",uiAttribs:{},portsOut:[{name:"Parent Out",links:[{portIn:"Parent",portOut:"Parent Out",objIn:"5pn77ljam",objOut:"yxc30omdg"}]}],objName:"Ops.Html.AppendChild_v2"},{id:"5pn77ljam",uiAttribs:{},portsOut:[{name:"Parent Out",links:[{portIn:"Parent",portOut:"Parent Out",objIn:"sm8kqb1t8",objOut:"5pn77ljam"}]}],objName:"Ops.Html.AppendChild_v2"},{id:"udel9i7b9",uiAttribs:{},portsIn:[{name:"String 0",value:"Tell me your dream..."},{name:"String 1",value:"What is design?"},{name:"String 2",value:"May I have your name?"},{name:"String 3",value:"What are you thinking about?"},{name:"String 4",value:"What color do you like?"},{name:"String 5",value:"How design changed your life?"},{name:"String 6",value:""},{name:"String 7",value:""},{name:"String 8",value:""},{name:"String 9",value:""}],portsOut:[{name:"Result",links:[{portIn:"Text",portOut:"Result",objIn:"p1mfdzoh3",objOut:"udel9i7b9"}]}],objName:"Ops.String.SwitchString"},{id:"f2ksr9dv7",uiAttribs:{},portsIn:[{name:"min",value:0},{name:"max",value:5},{name:"Integer",value:1},{name:"No consecutive duplicates",value:1}],portsOut:[{name:"result",links:[{portIn:"Index",portOut:"result",objIn:"udel9i7b9",objOut:"f2ksr9dv7"},{portIn:"Index",portOut:"result",objIn:"0bvhlmnrk",objOut:"f2ksr9dv7"}]}],objName:"Ops.Math.TriggerRandomNumber_v2"},{id:"4xbhcsisj",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"validation"}],portsOut:[{name:"Triggered",links:[{portIn:"Generate",portOut:"Triggered",objIn:"f2ksr9dv7",objOut:"4xbhcsisj"}]}],objName:"Ops.Trigger.TriggerReceive"},{id:"0bvhlmnrk",uiAttribs:{},portsIn:[{name:"String 0",value:"告訴我，您的夢想"},{name:"String 1",value:"設計是什麼？"},{name:"String 2",value:"你叫什麼名字？"},{name:"String 3",value:"你正在想什麼？"},{name:"String 4",value:"您喜歡什麼色彩"},{name:"String 5",value:"設計如何改變了你的生活?"},{name:"String 6",value:""},{name:"String 7",value:""},{name:"String 8",value:""},{name:"String 9",value:""}],portsOut:[{name:"Result",links:[{portIn:"Text",portOut:"Result",objIn:"z71j2edco",objOut:"0bvhlmnrk"}]}],objName:"Ops.String.SwitchString"},{id:"0lmg57usc",uiAttribs:{},portsIn:[{name:"String",value:""}],portsOut:[{name:"Result",links:[{portIn:"String 1",portOut:"Result",objIn:"9uxstj2zl",objOut:"0lmg57usc"}]}],objName:"Ops.Trigger.TriggerString"},{id:"9uxstj2zl",uiAttribs:{},portsIn:[{name:"String 2",value:""},{name:"String 3",value:""},{name:"String 4",value:""},{name:"String 5",value:""},{name:"String 6",value:""},{name:"String 7",value:""},{name:"String 8",value:""},{name:"String 9",value:""},{name:"String 10",value:""},{name:"String 11",value:""},{name:"String 12",value:""},{name:"String 13",value:""},{name:"String 14",value:""},{name:"String 15",value:""}],portsOut:[{name:"Output 0",value:""},{name:"Output 1",value:""},{name:"Output 2",value:""},{name:"Output 3",links:[{portIn:"String",portOut:"Output 3",objIn:"vpgu2hu7n",objOut:"9uxstj2zl"}]},{name:"Output 4",value:""},{name:"Output 5",value:""},{name:"Output 6",value:""},{name:"Output 7",value:""},{name:"Output 8",links:[{portIn:"String",portOut:"Output 8",objIn:"wesu94w5q",objOut:"9uxstj2zl"}]},{name:"Output 9",value:""},{name:"Output 10",value:""},{name:"Output 11",value:""},{name:"Output 12",value:""},{name:"Output 13",value:""},{name:"Output 14",value:""},{name:"Output 15",links:[{portIn:"Value",portOut:"Output 15",objIn:"946tb062z",objOut:"9uxstj2zl"}]}],objName:"Ops.String.SequenceStrings"},{id:"vhnd7vr0s",uiAttribs:{},portsIn:[{name:"number2",value:0}],portsOut:[{name:"result",links:[{portIn:"Interactive",portOut:"result",objIn:"e7fdtvlh7",objOut:"vhnd7vr0s"},{portIn:"Visible",portOut:"result",objIn:"e7fdtvlh7",objOut:"vhnd7vr0s"},{portIn:"Value",portOut:"result",objIn:"qtfcgml44",objOut:"vhnd7vr0s"}]}],objName:"Ops.Math.Compare.GreaterThan"},{id:"wesu94w5q",uiAttribs:{},portsOut:[{name:"Result",links:[{portIn:"number1",portOut:"Result",objIn:"vhnd7vr0s",objOut:"wesu94w5q"}]}],objName:"Ops.String.StringLength_v2"},{id:"qtfcgml44",uiAttribs:{},portsIn:[{name:"Variable",value:"Client focus"}],objName:"Ops.Vars.VarSetNumber_v2"},{id:"myjqkq08g",uiAttribs:{},portsIn:[{name:"Named Trigger",value:"validation"}],portsOut:[{name:"Triggered",links:[{portIn:"Clear",portOut:"Triggered",objIn:"vru67xymu",objOut:"myjqkq08g"},{portIn:"Trigger",portOut:"Triggered",objIn:"0lmg57usc",objOut:"myjqkq08g"}]}],objName:"Ops.Trigger.TriggerReceive"}],export:{time:"2024-05-25 08:40:42",service:"github",exportNumber:51}};if(!CABLES.exportedPatch){CABLES.exportedPatch=CABLES.exportedPatches["ANk42a"]}"use strict";var CABLES=CABLES||{};CABLES.OPS=CABLES.OPS||{};var Ops=Ops||{};Ops.Gl=Ops.Gl||{};Ops.Ui=Ops.Ui||{};Ops.Anim=Ops.Anim||{};Ops.Data=Ops.Data||{};Ops.Html=Ops.Html||{};Ops.Json=Ops.Json||{};Ops.Math=Ops.Math||{};Ops.User=Ops.User||{};Ops.Vars=Ops.Vars||{};Ops.Array=Ops.Array||{};Ops.String=Ops.String||{};Ops.Boolean=Ops.Boolean||{};Ops.Sidebar=Ops.Sidebar||{};Ops.Trigger=Ops.Trigger||{};Ops.Extension=Ops.Extension||{};Ops.Gl.Matrix=Ops.Gl.Matrix||{};Ops.Gl.Meshes=Ops.Gl.Meshes||{};Ops.Gl.Shader=Ops.Gl.Shader||{};Ops.Deprecated=Ops.Deprecated||{};Ops.User.u_60hz=Ops.User.u_60hz||{};Ops.Math.Compare=Ops.Math.Compare||{};Ops.Data.JsonPath=Ops.Data.JsonPath||{};Ops.Deprecated.Gl=Ops.Deprecated.Gl||{};Ops.Deprecated.Ops=Ops.Deprecated.Ops||{};Ops.Deprecated.Anim=Ops.Deprecated.Anim||{};Ops.Deprecated.Ops.Gl=Ops.Deprecated.Ops.Gl||{};Ops.Deprecated.Trigger=Ops.Deprecated.Trigger||{};Ops.Deprecated.Gl.Matrix=Ops.Deprecated.Gl.Matrix||{};Ops.Deprecated.Gl.Meshes=Ops.Deprecated.Gl.Meshes||{};Ops.Extension.SocketCluster=Ops.Extension.SocketCluster||{};Ops.Deprecated.Ops.Gl.Meshes=Ops.Deprecated.Ops.Gl.Meshes||{};Ops.Math.TriggerRandomNumber_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTriggerButton("Generate"),r=e.inValue("min",0),i=e.inValue("max",1),o=e.outTrigger("next"),a=e.outNumber("result"),s=e.inValueBool("Integer",false),l=e.inValueBool("No consecutive duplicates",false);e.setPortGroup("Value Range",[r,i]);n.onTriggered=i.onChange=r.onChange=s.onChange=u;u();function u(){let e=Math.random()*(i.get()-r.get())+r.get();if(s.get())e=c();if(r.get()!=i.get()&&i.get()>r.get())while(l.get()&&e==a.get())e=c();a.set(e);o.trigger()}function c(){return Math.floor(Math.random()*(i.get()-r.get()+1)+r.get())}};Ops.Math.TriggerRandomNumber_v2.prototype=new CABLES.Op;CABLES.OPS["26f446cc-9107-4164-8209-5254487fa132"]={f:Ops.Math.TriggerRandomNumber_v2,objName:"Ops.Math.TriggerRandomNumber_v2"};Ops.Json.ObjectSetString_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const r=e.inObject("Object"),i=e.outObject("Result Object"),o=e.inString("Key"),a=e.inString("Value");r.onChange=a.onChange=n;o.setUiAttribs({stringTrim:true,minLength:1});o.onChange=()=>{e.setUiAttrib({extendTitle:o.get()});n()};function n(){let e=r.get();if(!e)e={};const t=o.get();const n=JSON.parse(JSON.stringify(e));if(t)n[t]=a.get();i.setRef(n)}};Ops.Json.ObjectSetString_v2.prototype=new CABLES.Op;CABLES.OPS["1ed8f375-c3d7-4662-88c7-1afbc3dc6129"]={f:Ops.Json.ObjectSetString_v2,objName:"Ops.Json.ObjectSetString_v2"};Ops.Extension.SocketCluster.SocketClusterReceiveObject=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const r=e.inObject("socket",null,"socketcluster");const i=e.inString("topic","main");const o=e.inBool("Receive Own Data",false);const a=e.outString("client id");const s=e.outObject("data");const l=e.outTrigger("received");const n=()=>{const n=r.get();if(n){(async()=>{const e=n.subscribe(n.channelName+"/objects");for await(const t of e){if(t.topic==i.get()){if(o.get()||t.clientId!=n.clientId){s.set(t.payload);a.set(t.clientId);l.trigger()}}}})()}};r.onChange=n};Ops.Extension.SocketCluster.SocketClusterReceiveObject.prototype=new CABLES.Op;CABLES.OPS["0ac88fc4-3d8a-4dd4-a5ae-f196d0303580"]={f:Ops.Extension.SocketCluster.SocketClusterReceiveObject,objName:"Ops.Extension.SocketCluster.SocketClusterReceiveObject"};Ops.Extension.SocketCluster.SocketClusterSendObject=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("send"),i=e.inObject("socket",null,"socketcluster"),o=e.inString("topic","main"),a=e.inObject("data"),s=e.inInt("delay (ms)",0),l=e.outTrigger("Sent Data");e.toWorkPortsNeedToBeLinked(n,i,a);const r=()=>{const t=i.get();if(!t)return;if(!t.allowSend)e.setUiError("allowsend","socket is not allowed to send data");else e.setUiError("allowsend",null);if(t.channelName&&t.allowSend){const n=Object.assign(t.commonValues,{topic:o.get(),clientId:t.clientId,payload:a.get()});let e=0;const r=s.get();if(s.get()>0||t.globalDelay>0){e=t.globalDelay;if(r){e=r}}setTimeout(()=>{t.transmitPublish(t.channelName+"/objects",n);l.trigger()},e)}};n.onTriggered=r};Ops.Extension.SocketCluster.SocketClusterSendObject.prototype=new CABLES.Op;CABLES.OPS["03d2c172-5492-48c1-8093-f3335f665c67"]={f:Ops.Extension.SocketCluster.SocketClusterSendObject,objName:"Ops.Extension.SocketCluster.SocketClusterSendObject"};Ops.Json.ObjectSetNumber_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inObject("Object"),r=e.outObject("Result Object"),i=e.inString("Key"),o=e.inFloat("Number");n.onChange=o.onChange=a;i.setUiAttribs({stringTrim:true,minLength:1});function a(){let e=n.get();if(!e)e={};const t=JSON.parse(JSON.stringify(e));t[i.get()]=o.get();r.setRef(t)}i.onChange=()=>{e.setUiAttrib({extendTitle:i.get()});a()}};Ops.Json.ObjectSetNumber_v2.prototype=new CABLES.Op;CABLES.OPS["20f7bcab-ed71-45d1-9fae-d89aacf3961b"]={f:Ops.Json.ObjectSetNumber_v2,objName:"Ops.Json.ObjectSetNumber_v2"};Ops.Json.EmptyObject=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.outObject("Result");n.setRef({})};Ops.Json.EmptyObject.prototype=new CABLES.Op;CABLES.OPS["1b98cb80-8487-47d8-9a50-40a645c4e2b4"]={f:Ops.Json.EmptyObject,objName:"Ops.Json.EmptyObject"};Ops.Extension.SocketCluster.SocketCluster_v2=function(){CABLES.Op.apply(this,arguments);const t=this;const e=t.attachments={};const n=t.inBool("Active",false);const r=t.inString("Server hostname","");const i=t.inString("Server path","/socketcluster/");const o=t.inValue("Server port",443);const a=t.inBool("Use SSL",true);const s=t.inBool("Allow send",true);const l=t.inBool("Allow multiple senders",true);const u=t.inString("Channel",CABLES.generateUUID());const c=t.inInt("Delay send (ms)",0);const p=t.inObject("Additional serverdata",{});const h=t.outBool("Ready",false);const d=t.outObject("Socket",null,"socketcluster");const f=t.outString("Own client id");const g=t.outBool("Can send",false);const m=t.outObject("Error",null);let b=null;let v=null;const O=()=>{if(!v&&n.get()){v=setTimeout(()=>{m.set(null);if(b){b.disconnect();b=null}b=socketClusterClient.create({hostname:r.get(),secure:a.get(),port:o.get(),path:i.get()});b.allowSend=s.get();b.channelName=u.get();b.globalDelay=c.get();b.commonValues=p.get()||{};g.set(s.get());f.set(b.clientId);(async()=>{for await(const{error:e}of b.listener("error")){t.setUiError("connectionError",`error in socketcluster connection (${e.name})`,2);t.logError(e);m.set(e);h.set(false)}})();(async()=>{for await(const e of b.listener("connect")){t.setUiError("connectionError",null);h.set(true);d.set(b)}})();(async()=>{const e=b.subscribe(u.get()+"/control");for await(const t of e){if(t.clientId!=b.clientId){y(t)}}})();r.onChange=O;o.onChange=O;a.onChange=O;v=null},1e3)}else if(!n.get()){if(b){b.disconnect();b=null}}};c.onChange=()=>{if(b){b.globalDelay=c.get();d.set(b)}};s.onChange=()=>{if(b){b.allowSend=s.get();d.set(b);g.set(s.get());const e=Object.assign(b.commonValues,{topic:"cablescontrol",clientId:b.clientId,payload:{allowSend:s.get()}});b.transmitPublish(u.get()+"/control",e)}};u.onChange=()=>{if(b){b.unsubscribe(b.channelName+"/control");b.channelName=u.get();d.set(b);(async()=>{const e=b.subscribe(u.get()+"/control");for await(const t of e){if(t.clientId!=b.clientId){y(t)}}})()}};p.onChange=()=>{if(b){b.commonValues=p.get()||{};d.set(b)}};const y=e=>{if(e.payload.allowSend&&!l.get()){b.allowSend=false;d.set(b);g.set(false)}};t.init=O;n.onChange=O;r.onChange=i.onChange=o.onChange=a.onChange=O};Ops.Extension.SocketCluster.SocketCluster_v2.prototype=new CABLES.Op;CABLES.OPS["1ec869b2-9a89-45ec-8fe5-ae2e039379cc"]={f:Ops.Extension.SocketCluster.SocketCluster_v2,objName:"Ops.Extension.SocketCluster.SocketCluster_v2"};Ops.Trigger.TriggerSend=function(){CABLES.Op.apply(this,arguments);const r=this;const e=r.attachments={};const t=r.inTriggerButton("Trigger");r.varName=r.inValueSelect("Named Trigger",[],"",true);r.varName.onChange=i;t.onTriggered=o;r.patch.addEventListener("namedTriggersChanged",n);n();function n(){if(CABLES.UI){const e=[];const t=r.patch.namedTriggers;e.push("+ create new one");for(const n in t)e.push(n);r.varName.uiAttribs.values=e}}function i(){if(CABLES.UI){if(r.varName.get()=="+ create new one"){new CABLES.UI.ModalDialog({prompt:true,title:"New Trigger",text:"Enter a name for the new trigger",promptValue:"",promptOk:e=>{r.varName.set(e);r.patch.namedTriggers[e]=r.patch.namedTriggers[e]||[];n()}});return}r.refreshParams()}if(!r.patch.namedTriggers[r.varName.get()]){r.patch.namedTriggers[r.varName.get()]=r.patch.namedTriggers[r.varName.get()]||[];r.patch.emitEvent("namedTriggersChanged")}r.setTitle(">"+r.varName.get());r.refreshParams();r.patch.emitEvent("opTriggerNameChanged",r,r.varName.get())}function o(){const t=r.patch.namedTriggers[r.varName.get()];r.patch.emitEvent("namedTriggerSent",r.varName.get());if(!t){r.setUiError("unknowntrigger","unknown trigger");return}else r.setUiError("unknowntrigger",null);for(let e=0;e<t.length;e++){t[e]()}}};Ops.Trigger.TriggerSend.prototype=new CABLES.Op;CABLES.OPS["ce1eaf2b-943b-4dc0-ab5e-ee11b63c9ed0"]={f:Ops.Trigger.TriggerSend,objName:"Ops.Trigger.TriggerSend"};Ops.Json.ObjectTrigger=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTriggerButton("Trigger"),r=e.inObject("Object"),i=e.outTrigger("Next"),o=e.outObject("Result");n.onTriggered=function(){o.setRef(r.get());i.trigger()}};Ops.Json.ObjectTrigger.prototype=new CABLES.Op;CABLES.OPS["e437c074-190f-4adb-8265-3fddea27fe33"]={f:Ops.Json.ObjectTrigger,objName:"Ops.Json.ObjectTrigger"};Ops.Trigger.TriggerReceive=function(){CABLES.Op.apply(this,arguments);const r=this;const e=r.attachments={};const t=r.outTrigger("Triggered");r.varName=r.inValueSelect("Named Trigger",[],"",true);o();r.patch.addEventListener("namedTriggersChanged",o);let n=null;function i(){t.trigger()}function o(){if(CABLES.UI){let t=[];let n=r.patch.namedTriggers;for(let e in n)t.push(e);r.varName.uiAttribs.values=t}}r.varName.onChange=function(){if(n){let e=r.patch.namedTriggers[n];let t=e.indexOf(i);if(t!=-1)e.splice(t,1)}r.setTitle(">"+r.varName.get());r.patch.namedTriggers[r.varName.get()]=r.patch.namedTriggers[r.varName.get()]||[];let e=r.patch.namedTriggers[r.varName.get()];e.push(i);n=r.varName.get();a();r.patch.emitEvent("opTriggerNameChanged",r,r.varName.get())};r.on("uiParamPanel",a);function a(){if(!r.varName.get()){r.setUiError("unknowntrigger","unknown trigger")}else r.setUiError("unknowntrigger",null)}};Ops.Trigger.TriggerReceive.prototype=new CABLES.Op;CABLES.OPS["0816c999-f2db-466b-9777-2814573574c5"]={f:Ops.Trigger.TriggerReceive,objName:"Ops.Trigger.TriggerReceive"};Ops.String.SwitchString=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValueInt("Index"),r=e.outString("Result");const i=[];n.onChange=s;for(var o=0;o<10;o++){var a=e.inString("String "+o);i.push(a);a.onChange=s}function s(){if(n.get()>=0&&i[n.get()]){r.set(i[n.get()].get())}}};Ops.String.SwitchString.prototype=new CABLES.Op;CABLES.OPS["2a7a0c68-f7c9-4249-b19a-d2de5cb4862c"]={f:Ops.String.SwitchString,objName:"Ops.String.SwitchString"};Ops.Vars.VarSetString_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inString("Value","New String");e.varName=e.inDropDown("Variable",[],"",true);new CABLES.VarSetOpWrapper(e,"string",n,e.varName)};Ops.Vars.VarSetString_v2.prototype=new CABLES.Op;CABLES.OPS["0b4d9229-8024-4a30-9cc0-f6653942c2e4"]={f:Ops.Vars.VarSetString_v2,objName:"Ops.Vars.VarSetString_v2"};Ops.Vars.VarGetNumber_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.outNumber("Value");e.varName=e.inValueSelect("Variable",[],"",true);new CABLES.VarGetOpWrapper(e,"number",e.varName,n)};Ops.Vars.VarGetNumber_v2.prototype=new CABLES.Op;CABLES.OPS["421f5b52-c0fa-47c4-8b7a-012b9e1c864a"]={f:Ops.Vars.VarGetNumber_v2,objName:"Ops.Vars.VarGetNumber_v2"};Ops.Boolean.TriggerChangedTrue=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};let n=e.inValueBool("Value",false);let r=e.outTrigger("Next");let i=0;n.onChange=function(){let e=n.get();if(!i&&e){i=true;r.trigger()}else{i=false}}};Ops.Boolean.TriggerChangedTrue.prototype=new CABLES.Op;CABLES.OPS["385197e1-8b34-4d1c-897f-d1386d99e3b3"]={f:Ops.Boolean.TriggerChangedTrue,objName:"Ops.Boolean.TriggerChangedTrue"};Ops.Html.ElementCssTransform=function(){CABLES.Op.apply(this,arguments);const t=this;const e=t.attachments={};const n=t.inObject("Element",null,"element"),r=t.inBool("Translate Active",true),i=t.inFloat("Translate X",0),o=t.inFloat("Translate Y",0),a=t.inSwitch("Unit",["px","%"],"px"),s=t.inBool("Scale Active",true),l=t.inFloat("Scale",1),u=t.inBool("Rotate Active",true),c=t.inFloat("Rot Z",0),p=t.inBool("Set Origin",true),h=t.inSwitch("Origin X",["left","center","right"],"center"),d=t.inSwitch("Origin Y",["top","center","bottom"],"center");t.setPortGroup("Element",[n]);t.setPortGroup("Translation",[r,o,i,a]);t.setPortGroup("Scaling",[l,s]);t.setPortGroup("Rotation",[u,c]);t.setPortGroup("Origin",[p,h,d]);a.onChange=s.onChange=p.onChange=h.onChange=d.onChange=u.onChange=r.onChange=u.onChange=i.onChange=o.onChange=l.onChange=c.onChange=g;let f=null;n.onChange=n.onLinkChanged=function(){if(f&&f.style){f.style.transform="initial"}g()};function g(){f=n.get();if(f&&f.style){let e="";if(r.get())if(o.get()||i.get())e+="translate("+i.get()+a.get()+" , "+o.get()+a.get()+") ";if(s.get())if(l.get()!=1)e+="scale("+l.get()+") ";if(u.get())if(c.get()!=0)e+="rotateZ("+c.get()+"deg) ";try{f.style.transform=e;if(p.get())f.style["transform-origin"]=d.get()+" "+h.get();else f.style["transform-origin"]="initial"}catch(e){t.logError(e)}}else{setTimeout(g,50)}}};Ops.Html.ElementCssTransform.prototype=new CABLES.Op;CABLES.OPS["777d00c6-5605-43c5-9b6a-b20d465bd3ba"]={f:Ops.Html.ElementCssTransform,objName:"Ops.Html.ElementCssTransform"};Ops.Sidebar.Sidebar=function(){CABLES.Op.apply(this,arguments);const a=this;const n=a.attachments={style_css:" /*\n * SIDEBAR\n  http://danielstern.ca/range.css/#/\n  https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-progress-value\n */\n\n.sidebar-icon-undo\n{\n    width:10px;\n    height:10px;\n    background-image: url(\"data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='grey' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 7v6h6'/%3E%3Cpath d='M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13'/%3E%3C/svg%3E\");\n    background-size: 19px;\n    background-repeat: no-repeat;\n    top: -19px;\n    margin-top: -7px;\n}\n\n.icon-chevron-down {\n    top: 2px;\n    right: 9px;\n}\n\n.iconsidebar-chevron-up,.sidebar__close-button {\n\tbackground-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4=);\n}\n\n.iconsidebar-minimizebutton {\n    background-position: 98% center;\n    background-repeat: no-repeat;\n}\n\n.sidebar-cables-right\n{\n    right: 15px;\n    left: initial !important;\n}\n\n.sidebar-cables *\n{\n    color: #BBBBBB !important;\n    font-family: Arial;\n}\n\n.sidebar-cables {\n    --sidebar-color: #07f78c;\n    --sidebar-width: 220px;\n    --sidebar-border-radius: 10px;\n    --sidebar-monospace-font-stack: \"SFMono-Regular\", Consolas, \"Liberation Mono\", Menlo, Courier, monospace;\n    --sidebar-hover-transition-time: .2s;\n\n    position: absolute;\n    top: 15px;\n    left: 15px;\n    border-radius: var(--sidebar-border-radius);\n    z-index: 100000;\n    width: var(--sidebar-width);\n    max-height: 100%;\n    box-sizing: border-box;\n    overflow-y: auto;\n    overflow-x: hidden;\n    font-size: 13px;\n    line-height: 1em; /* prevent emojis from breaking height of the title */\n}\n\n.sidebar-cables::selection {\n    background-color: var(--sidebar-color);\n    color: #EEEEEE;\n}\n\n.sidebar-cables::-webkit-scrollbar {\n    background-color: transparent;\n    --cables-scrollbar-width: 8px;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables::-webkit-scrollbar-track {\n    background-color: transparent;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables::-webkit-scrollbar-thumb {\n    background-color: #333333;\n    border-radius: 4px;\n    width: var(--cables-scrollbar-width);\n}\n\n.sidebar-cables--closed {\n    width: auto;\n}\n\n.sidebar__close-button {\n    background-color: #222;\n    /*-webkit-user-select: none;  */\n    /*-moz-user-select: none;     */\n    /*-ms-user-select: none;      */\n    /*user-select: none;          */\n    /*transition: background-color var(--sidebar-hover-transition-time);*/\n    /*color: #CCCCCC;*/\n    height: 2px;\n    /*border-bottom:20px solid #222;*/\n\n    /*box-sizing: border-box;*/\n    /*padding-top: 2px;*/\n    /*text-align: center;*/\n    /*cursor: pointer;*/\n    /*border-radius: 0 0 var(--sidebar-border-radius) var(--sidebar-border-radius);*/\n    /*opacity: 1.0;*/\n    /*transition: opacity 0.3s;*/\n    /*overflow: hidden;*/\n}\n\n.sidebar__close-button-icon {\n    display: inline-block;\n    /*opacity: 0;*/\n    width: 20px;\n    height: 20px;\n    /*position: relative;*/\n    /*top: -1px;*/\n\n\n}\n\n.sidebar--closed {\n    width: auto;\n    margin-right: 20px;\n}\n\n.sidebar--closed .sidebar__close-button {\n    margin-top: 8px;\n    margin-left: 8px;\n    padding:10px;\n\n    height: 25px;\n    width:25px;\n    border-radius: 50%;\n    cursor: pointer;\n    opacity: 0.3;\n    background-repeat: no-repeat;\n    background-position: center center;\n    transform:rotate(180deg);\n}\n\n.sidebar--closed .sidebar__group\n{\n    display:none;\n\n}\n.sidebar--closed .sidebar__close-button-icon {\n    background-position: 0px 0px;\n}\n\n.sidebar__close-button:hover {\n    background-color: #111111;\n    opacity: 1.0 !important;\n}\n\n/*\n * SIDEBAR ITEMS\n */\n\n.sidebar__items {\n    /* max-height: 1000px; */\n    /* transition: max-height 0.5;*/\n    background-color: #222;\n    padding-bottom: 20px;\n}\n\n.sidebar--closed .sidebar__items {\n    /* max-height: 0; */\n    height: 0;\n    display: none;\n    pointer-interactions: none;\n}\n\n.sidebar__item__right {\n    float: right;\n}\n\n/*\n * SIDEBAR GROUP\n */\n\n.sidebar__group {\n    /*background-color: #1A1A1A;*/\n    overflow: hidden;\n    box-sizing: border-box;\n    animate: height;\n    /*background-color: #151515;*/\n    /* max-height: 1000px; */\n    /* transition: max-height 0.5s; */\n--sidebar-group-header-height: 33px;\n}\n\n.sidebar__group-items\n{\n    padding-top: 15px;\n    padding-bottom: 15px;\n}\n\n.sidebar__group--closed {\n    /* max-height: 13px; */\n    height: var(--sidebar-group-header-height);\n}\n\n.sidebar__group-header {\n    box-sizing: border-box;\n    color: #EEEEEE;\n    background-color: #151515;\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n\n    /*height: 100%;//var(--sidebar-group-header-height);*/\n\n    padding-top: 7px;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    cursor: pointer;\n    /*transition: background-color var(--sidebar-hover-transition-time);*/\n    position: relative;\n}\n\n.sidebar__group-header:hover {\n  background-color: #111111;\n}\n\n.sidebar__group-header-title {\n  /*float: left;*/\n  overflow: hidden;\n  padding: 0 15px;\n  padding-top:5px;\n  padding-bottom:10px;\n  font-weight:bold;\n}\n\n.sidebar__group-header-undo {\n    float: right;\n    overflow: hidden;\n    padding-right: 15px;\n    padding-top:5px;\n    font-weight:bold;\n  }\n\n.sidebar__group-header-icon {\n    width: 17px;\n    height: 14px;\n    background-repeat: no-repeat;\n    display: inline-block;\n    position: absolute;\n    background-size: cover;\n\n    /* icon open */\n    /* feather icon: chevron up */\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tdXAiPjxwb2x5bGluZSBwb2ludHM9IjE4IDE1IDEyIDkgNiAxNSI+PC9wb2x5bGluZT48L3N2Zz4=);\n    top: 4px;\n    right: 5px;\n    opacity: 0.0;\n    transition: opacity 0.3;\n}\n\n.sidebar__group-header:hover .sidebar__group-header-icon {\n    opacity: 1.0;\n}\n\n/* icon closed */\n.sidebar__group--closed .sidebar__group-header-icon {\n    /* feather icon: chevron down */\n    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);\n    top: 4px;\n    right: 5px;\n}\n\n/*\n * SIDEBAR ITEM\n */\n\n.sidebar__item\n{\n    box-sizing: border-box;\n    padding: 7px;\n    padding-left:15px;\n    padding-right:15px;\n\n    overflow: hidden;\n    position: relative;\n}\n\n.sidebar__item-label {\n    display: inline-block;\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n    width: calc(50% - 7px);\n    margin-right: 7px;\n    margin-top: 2px;\n    text-overflow: ellipsis;\n    /* overflow: hidden; */\n}\n\n.sidebar__item-value-label {\n    font-family: var(--sidebar-monospace-font-stack);\n    display: inline-block;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    max-width: 60%;\n}\n\n.sidebar__item-value-label::selection {\n    background-color: var(--sidebar-color);\n    color: #EEEEEE;\n}\n\n.sidebar__item + .sidebar__item,\n.sidebar__item + .sidebar__group,\n.sidebar__group + .sidebar__item,\n.sidebar__group + .sidebar__group {\n    /*border-top: 1px solid #272727;*/\n}\n\n/*\n * SIDEBAR ITEM TOGGLE\n */\n\n/*.sidebar__toggle */\n.icon_toggle{\n    cursor: pointer;\n}\n\n.sidebar__toggle-input {\n    --sidebar-toggle-input-color: #CCCCCC;\n    --sidebar-toggle-input-color-hover: #EEEEEE;\n    --sidebar-toggle-input-border-size: 2px;\n    display: inline;\n    float: right;\n    box-sizing: border-box;\n    border-radius: 50%;\n    cursor: pointer;\n    --toggle-size: 11px;\n    margin-top: 2px;\n    background-color: transparent !important;\n    border: var(--sidebar-toggle-input-border-size) solid var(--sidebar-toggle-input-color);\n    width: var(--toggle-size);\n    height: var(--toggle-size);\n    transition: background-color var(--sidebar-hover-transition-time);\n    transition: border-color var(--sidebar-hover-transition-time);\n}\n.sidebar__toggle:hover .sidebar__toggle-input {\n    border-color: var(--sidebar-toggle-input-color-hover);\n}\n\n.sidebar__toggle .sidebar__item-value-label {\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n    max-width: calc(50% - 12px);\n}\n.sidebar__toggle-input::after { clear: both; }\n\n.sidebar__toggle--active .icon_toggle\n{\n\n    background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE1cHgiIHdpZHRoPSIzMHB4IiBmaWxsPSIjMDZmNzhiIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iIzA2Zjc4YiIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCBjMTIuNjUsMCwyMy0xMC4zNSwyMy0yM2wwLDBjMC0xMi42NS0xMC4zNS0yMy0yMy0yM0gzMHogTTcwLDY3Yy05LjM4OSwwLTE3LTcuNjEtMTctMTdzNy42MTEtMTcsMTctMTdzMTcsNy42MSwxNywxNyAgICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PC9nPjwvZz48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMweiBNNzAsNjdjLTkuMzg5LDAtMTctNy42MS0xNy0xN3M3LjYxMS0xNywxNy0xN3MxNyw3LjYxLDE3LDE3ICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBmaWxsPSIjMDZmNzhiIiBzdHJva2U9IiMwNmY3OGIiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNyw1MGMwLDEyLjY1LDEwLjM1LDIzLDIzLDIzaDQwICAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMwQzE3LjM1LDI3LDcsMzcuMzUsNyw1MEw3LDUweiI+PC9wYXRoPjwvZz48Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiMwNmY3OGIiIHN0cm9rZT0iIzA2Zjc4YiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI3MCIgY3k9IjUwIiByPSIxNyI+PC9jaXJjbGU+PC9nPjxnIGRpc3BsYXk9Im5vbmUiPjxwYXRoIGRpc3BsYXk9ImlubGluZSIgZD0iTTcwLDI1SDMwQzE2LjIxNSwyNSw1LDM2LjIxNSw1LDUwczExLjIxNSwyNSwyNSwyNWg0MGMxMy43ODUsMCwyNS0xMS4yMTUsMjUtMjVTODMuNzg1LDI1LDcwLDI1eiBNNzAsNzEgICBIMzBDMTguNDIxLDcxLDksNjEuNTc5LDksNTBzOS40MjEtMjEsMjEtMjFoNDBjMTEuNTc5LDAsMjEsOS40MjEsMjEsMjFTODEuNTc5LDcxLDcwLDcxeiBNNzAsMzFjLTEwLjQ3NywwLTE5LDguNTIzLTE5LDE5ICAgczguNTIzLDE5LDE5LDE5czE5LTguNTIzLDE5LTE5UzgwLjQ3NywzMSw3MCwzMXogTTcwLDY1Yy04LjI3MSwwLTE1LTYuNzI5LTE1LTE1czYuNzI5LTE1LDE1LTE1czE1LDYuNzI5LDE1LDE1Uzc4LjI3MSw2NSw3MCw2NXoiPjwvcGF0aD48L2c+PC9zdmc+);\n    opacity: 1;\n    transform: rotate(0deg);\n}\n\n\n.icon_toggle\n{\n    float: right;\n    width:40px;\n    height:18px;\n    background-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE1cHgiIHdpZHRoPSIzMHB4IiBmaWxsPSIjYWFhYWFhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2FhYWFhYSIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCBjMTIuNjUsMCwyMy0xMC4zNSwyMy0yM2wwLDBjMC0xMi42NS0xMC4zNS0yMy0yMy0yM0gzMHogTTcwLDY3Yy05LjM4OSwwLTE3LTcuNjEtMTctMTdzNy42MTEtMTcsMTctMTdzMTcsNy42MSwxNywxNyAgICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PC9nPjwvZz48Zz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMwLDI3QzE3LjM1LDI3LDcsMzcuMzUsNyw1MGwwLDBjMCwxMi42NSwxMC4zNSwyMywyMywyM2g0MCAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMweiBNNzAsNjdjLTkuMzg5LDAtMTctNy42MS0xNy0xN3M3LjYxMS0xNywxNy0xN3MxNyw3LjYxLDE3LDE3ICAgUzc5LjM4OSw2Nyw3MCw2N3oiPjwvcGF0aD48L2c+PGcgZGlzcGxheT0ibm9uZSI+PGcgZGlzcGxheT0iaW5saW5lIj48cGF0aCBmaWxsPSIjYWFhYWFhIiBzdHJva2U9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBkPSJNNyw1MGMwLDEyLjY1LDEwLjM1LDIzLDIzLDIzaDQwICAgIGMxMi42NSwwLDIzLTEwLjM1LDIzLTIzbDAsMGMwLTEyLjY1LTEwLjM1LTIzLTIzLTIzSDMwQzE3LjM1LDI3LDcsMzcuMzUsNyw1MEw3LDUweiI+PC9wYXRoPjwvZz48Y2lyY2xlIGRpc3BsYXk9ImlubGluZSIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNhYWFhYWEiIHN0cm9rZT0iI2FhYWFhYSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIGN4PSI3MCIgY3k9IjUwIiByPSIxNyI+PC9jaXJjbGU+PC9nPjxnIGRpc3BsYXk9Im5vbmUiPjxwYXRoIGRpc3BsYXk9ImlubGluZSIgZD0iTTcwLDI1SDMwQzE2LjIxNSwyNSw1LDM2LjIxNSw1LDUwczExLjIxNSwyNSwyNSwyNWg0MGMxMy43ODUsMCwyNS0xMS4yMTUsMjUtMjVTODMuNzg1LDI1LDcwLDI1eiBNNzAsNzEgICBIMzBDMTguNDIxLDcxLDksNjEuNTc5LDksNTBzOS40MjEtMjEsMjEtMjFoNDBjMTEuNTc5LDAsMjEsOS40MjEsMjEsMjFTODEuNTc5LDcxLDcwLDcxeiBNNzAsMzFjLTEwLjQ3NywwLTE5LDguNTIzLTE5LDE5ICAgczguNTIzLDE5LDE5LDE5czE5LTguNTIzLDE5LTE5UzgwLjQ3NywzMSw3MCwzMXogTTcwLDY1Yy04LjI3MSwwLTE1LTYuNzI5LTE1LTE1czYuNzI5LTE1LDE1LTE1czE1LDYuNzI5LDE1LDE1Uzc4LjI3MSw2NSw3MCw2NXoiPjwvcGF0aD48L2c+PC9zdmc+);\n    background-size: 50px 37px;\n    background-position: -6px -10px;\n    transform: rotate(180deg);\n    opacity: 0.4;\n}\n\n\n\n/*.sidebar__toggle--active .sidebar__toggle-input {*/\n/*    transition: background-color var(--sidebar-hover-transition-time);*/\n/*    background-color: var(--sidebar-toggle-input-color);*/\n/*}*/\n/*.sidebar__toggle--active .sidebar__toggle-input:hover*/\n/*{*/\n/*    background-color: var(--sidebar-toggle-input-color-hover);*/\n/*    border-color: var(--sidebar-toggle-input-color-hover);*/\n/*    transition: background-color var(--sidebar-hover-transition-time);*/\n/*    transition: border-color var(--sidebar-hover-transition-time);*/\n/*}*/\n\n/*\n * SIDEBAR ITEM BUTTON\n */\n\n.sidebar__button {}\n\n.sidebar__button-input:active\n{\n    background-color: #555 !important;\n}\n\n.sidebar__button-input {\n    -webkit-user-select: none;  /* Chrome all / Safari all */\n    -moz-user-select: none;     /* Firefox all */\n    -ms-user-select: none;      /* IE 10+ */\n    user-select: none;          /* Likely future */\n    min-height: 24px;\n    background-color: transparent;\n    color: #CCCCCC;\n    box-sizing: border-box;\n    padding-top: 3px;\n    text-align: center;\n    border-radius: 125px;\n    border:2px solid #555;\n    cursor: pointer;\n    padding-bottom: 3px;\n}\n\n.sidebar__button-input.plus, .sidebar__button-input.minus {\n    display: inline-block;\n    min-width: 20px;\n}\n\n.sidebar__button-input:hover {\n  background-color: #333;\n  border:2px solid var(--sidebar-color);\n}\n\n/*\n * VALUE DISPLAY (shows a value)\n */\n\n.sidebar__value-display {}\n\n/*\n * SLIDER\n */\n\n.sidebar__slider {\n    --sidebar-slider-input-height: 3px;\n}\n\n.sidebar__slider-input-wrapper {\n    width: 100%;\n\n    margin-top: 8px;\n    position: relative;\n}\n\n.sidebar__slider-input {\n    -webkit-appearance: none;\n    appearance: none;\n    margin: 0;\n    width: 100%;\n    height: var(--sidebar-slider-input-height);\n    background: #555;\n    cursor: pointer;\n    outline: 0;\n\n    -webkit-transition: .2s;\n    transition: background-color .2s;\n    border: none;\n}\n\n.sidebar__slider-input:focus, .sidebar__slider-input:hover {\n    border: none;\n}\n\n.sidebar__slider-input-active-track {\n    user-select: none;\n    position: absolute;\n    z-index: 11;\n    top: 0;\n    left: 0;\n    background-color: var(--sidebar-color);\n    pointer-events: none;\n    height: var(--sidebar-slider-input-height);\n    max-width: 100%;\n}\n\n/* Mouse-over effects */\n.sidebar__slider-input:hover {\n    /*background-color: #444444;*/\n}\n\n/*.sidebar__slider-input::-webkit-progress-value {*/\n/*    background-color: green;*/\n/*    color:green;*/\n\n/*    }*/\n\n/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */\n\n.sidebar__slider-input::-moz-range-thumb\n{\n    position: absolute;\n    height: 15px;\n    width: 15px;\n    z-index: 900 !important;\n    border-radius: 20px !important;\n    cursor: pointer;\n    background: var(--sidebar-color) !important;\n    user-select: none;\n\n}\n\n.sidebar__slider-input::-webkit-slider-thumb\n{\n    position: relative;\n    appearance: none;\n    -webkit-appearance: none;\n    user-select: none;\n    height: 15px;\n    width: 15px;\n    display: block;\n    z-index: 900 !important;\n    border: 0;\n    border-radius: 20px !important;\n    cursor: pointer;\n    background: #777 !important;\n}\n\n.sidebar__slider-input:hover ::-webkit-slider-thumb {\n    background-color: #EEEEEE !important;\n}\n\n/*.sidebar__slider-input::-moz-range-thumb {*/\n\n/*    width: 0 !important;*/\n/*    height: var(--sidebar-slider-input-height);*/\n/*    background: #EEEEEE;*/\n/*    cursor: pointer;*/\n/*    border-radius: 0 !important;*/\n/*    border: none;*/\n/*    outline: 0;*/\n/*    z-index: 100 !important;*/\n/*}*/\n\n.sidebar__slider-input::-moz-range-track {\n    background-color: transparent;\n    z-index: 11;\n}\n\n/*.sidebar__slider-input::-moz-range-thumb:hover {*/\n  /* background-color: #EEEEEE; */\n/*}*/\n\n\n/*.sidebar__slider-input-wrapper:hover .sidebar__slider-input-active-track {*/\n/*    background-color: #EEEEEE;*/\n/*}*/\n\n/*.sidebar__slider-input-wrapper:hover .sidebar__slider-input::-moz-range-thumb {*/\n/*    background-color: #fff !important;*/\n/*}*/\n\n/*.sidebar__slider-input-wrapper:hover .sidebar__slider-input::-webkit-slider-thumb {*/\n/*    background-color: #EEEEEE;*/\n/*}*/\n\n.sidebar__slider input[type=text],\n.sidebar__slider input[type=paddword]\n{\n    box-sizing: border-box;\n    /*background-color: #333333;*/\n    text-align: right;\n    color: #BBBBBB;\n    display: inline-block;\n    background-color: transparent !important;\n\n    width: 40%;\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n}\n\n.sidebar__slider input[type=text]:active,\n.sidebar__slider input[type=text]:focus,\n.sidebar__slider input[type=text]:hover\n.sidebar__slider input[type=password]:active,\n.sidebar__slider input[type=password]:focus,\n.sidebar__slider input[type=password]:hover\n{\n\n    color: #EEEEEE;\n}\n\n/*\n * TEXT / DESCRIPTION\n */\n\n.sidebar__text .sidebar__item-label {\n    width: auto;\n    display: block;\n    max-height: none;\n    margin-right: 0;\n    line-height: 1.1em;\n}\n\n/*\n * SIDEBAR INPUT\n */\n.sidebar__text-input textarea,\n.sidebar__text-input input[type=text],\n.sidebar__text-input input[type=password] {\n    box-sizing: border-box;\n    background-color: #333333;\n    color: #BBBBBB;\n    display: inline-block;\n    width: 50%;\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    border:1px solid #666;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n}\n\n.sidebar__text-input textarea:focus::placeholder {\n  color: transparent;\n}\n\n.sidebar__color-picker .sidebar__item-label\n{\n    width:45%;\n}\n\n.sidebar__text-input textarea,\n.sidebar__text-input input[type=text]:active,\n.sidebar__text-input input[type=text]:focus,\n.sidebar__text-input input[type=text]:hover,\n.sidebar__text-input input[type=password]:active,\n.sidebar__text-input input[type=password]:focus,\n.sidebar__text-input input[type=password]:hover {\n    background-color: transparent;\n    color: #EEEEEE;\n}\n\n.sidebar__text-input textarea\n{\n    margin-top:10px;\n    height:60px;\n    width:100%;\n}\n\n/*\n * SIDEBAR SELECT\n */\n\n\n\n .sidebar__select {}\n .sidebar__select-select {\n    color: #BBBBBB;\n    /*-webkit-appearance: none;*/\n    /*-moz-appearance: none;*/\n    appearance: none;\n    /*box-sizing: border-box;*/\n    width: 50%;\n    /*height: 20px;*/\n    background-color: #333333;\n    /*background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODg4ODgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWNoZXZyb24tZG93biI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+);*/\n    background-repeat: no-repeat;\n    background-position: right center;\n    background-size: 16px 16px;\n    margin: 0;\n    /*padding: 0 2 2 6px;*/\n    border-radius: 5px;\n    border: 1px solid #777;\n    background-color: #444;\n    cursor: pointer;\n    outline: none;\n    padding-left: 5px;\n\n }\n\n.sidebar__select-select:hover,\n.sidebar__select-select:active,\n.sidebar__select-select:inactive {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\n/*.sidebar__select-select option*/\n/*{*/\n/*    background-color: #444444;*/\n/*    color: #bbb;*/\n/*}*/\n\n.sidebar__select-select option:checked\n{\n    background-color: #000;\n    color: #FFF;\n}\n\n\n/*\n * COLOR PICKER\n */\n\n\n .sidebar__color-picker input[type=text] {\n    box-sizing: border-box;\n    background-color: #333333;\n    color: #BBBBBB;\n    display: inline-block;\n    width: calc(50% - 21px); /* 50% minus space of picker circle */\n    height: 18px;\n    outline: none;\n    border: none;\n    border-radius: 0;\n    padding: 0 0 0 4px !important;\n    margin: 0;\n    margin-right: 7px;\n}\n\n.sidebar__color-picker input[type=text]:active,\n.sidebar__color-picker input[type=text]:focus,\n.sidebar__color-picker input[type=text]:hover {\n    background-color: #444444;\n    color: #EEEEEE;\n}\n\ndiv.sidebar__color-picker-color-input,\n.sidebar__color-picker input[type=color],\n.sidebar__palette-picker input[type=color] {\n    display: inline-block;\n    border-radius: 100%;\n    height: 14px;\n    width: 14px;\n\n    padding: 0;\n    border: none;\n    /*border:2px solid red;*/\n    border-color: transparent;\n    outline: none;\n    background: none;\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    cursor: pointer;\n    position: relative;\n    top: 3px;\n}\n.sidebar__color-picker input[type=color]:focus,\n.sidebar__palette-picker input[type=color]:focus {\n    outline: none;\n}\n.sidebar__color-picker input[type=color]::-moz-color-swatch,\n.sidebar__palette-picker input[type=color]::-moz-color-swatch {\n    border: none;\n}\n.sidebar__color-picker input[type=color]::-webkit-color-swatch-wrapper,\n.sidebar__palette-picker input[type=color]::-webkit-color-swatch-wrapper {\n    padding: 0;\n}\n.sidebar__color-picker input[type=color]::-webkit-color-swatch,\n.sidebar__palette-picker input[type=color]::-webkit-color-swatch {\n    border: none;\n    border-radius: 100%;\n}\n\n/*\n * Palette Picker\n */\n.sidebar__palette-picker .sidebar__palette-picker-color-input.first {\n    margin-left: 0;\n}\n.sidebar__palette-picker .sidebar__palette-picker-color-input.last {\n    margin-right: 0;\n}\n.sidebar__palette-picker .sidebar__palette-picker-color-input {\n    margin: 0 4px;\n}\n\n.sidebar__palette-picker .circlebutton {\n    width: 14px;\n    height: 14px;\n    border-radius: 1em;\n    display: inline-block;\n    top: 3px;\n    position: relative;\n}\n\n/*\n * Preset\n */\n.sidebar__item-presets-preset\n{\n    padding:4px;\n    cursor:pointer;\n    padding-left:8px;\n    padding-right:8px;\n    margin-right:4px;\n    background-color:#444;\n}\n\n.sidebar__item-presets-preset:hover\n{\n    background-color:#666;\n}\n\n.sidebar__greyout\n{\n    background: #222;\n    opacity: 0.8;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: 1000;\n    right: 0;\n    top: 0;\n}\n\n.sidebar_tabs\n{\n    background-color: #151515;\n    padding-bottom: 0px;\n}\n\n.sidebar_switchs\n{\n    float: right;\n}\n\n.sidebar_tab\n{\n    float:left;\n    background-color: #151515;\n    border-bottom:1px solid transparent;\n    padding-right:7px;\n    padding-left:7px;\n    padding-bottom: 5px;\n    padding-top: 5px;\n    cursor:pointer;\n}\n\n.sidebar_tab_active\n{\n    background-color: #272727;\n    color:white;\n}\n\n.sidebar_tab:hover\n{\n    border-bottom:1px solid #777;\n    color:white;\n}\n\n\n.sidebar_switch\n{\n    float:left;\n    background-color: #444;\n    padding-right:7px;\n    padding-left:7px;\n    padding-bottom: 5px;\n    padding-top: 5px;\n    cursor:pointer;\n}\n\n.sidebar_switch:last-child\n{\n    border-top-right-radius: 7px;\n    border-bottom-right-radius: 7px;\n}\n\n.sidebar_switch:first-child\n{\n    border-top-left-radius: 7px;\n    border-bottom-left-radius: 7px;\n}\n\n\n.sidebar_switch_active\n{\n    background-color: #999;\n    color:white;\n}\n\n.sidebar_switch:hover\n{\n    color:white;\n}\n\n"};const r="cables-sidebar-style";const i="cables-sidebar-dynamic-style";const s="sidebar-cables";const l="sidebar"+CABLES.uuid();const u="sidebar__items";const c="sidebar__close-button";const o="";const p="";let h=null;let M=null;let d=null;const e=a.inValueBool("Visible",true);const t=a.inValueSlider("Opacity",1);const f=a.inValueBool("Default Minimized");const g=a.inValueSlider("Minimized Opacity",.5);const m=a.inValueBool("Show undo button",false);const b=a.inValueBool("Show Minimize",false);const v=a.inString("Title","");const O=a.inValueBool("Side");const y=a.inValueBool("Default CSS",true);let S=a.patch.cgl.canvas.ownerDocument;const C=a.outObject("childs");C.setUiAttribs({title:"Children"});const E=a.outBool("Opfened");E.setUiAttribs({title:"Opened"});let x=S.querySelector("."+l);if(!x)x=D();const I=x.querySelector("."+u);C.set({parentElement:I,parentOp:a});k();B();j();y.onChange=()=>{B();j()};e.onChange=P;t.onChange=L;f.onChange=k;g.onChange=_;m.onChange=A;a.onDelete=G;function _(){j()}b.onChange=T;function T(e){if(!e||e.uiAttribs)e=S.querySelector(".sidebar-cables .sidebar__group-header");if(!e)return;const t=S.querySelector(".sidebar-cables .sidebar__group-header .sidebar__group-header-undo");if(b.get()){e.classList.add("iconsidebar-chevron-up");e.classList.add("iconsidebar-minimizebutton");if(t)t.style.marginRight="20px"}else{e.classList.remove("iconsidebar-chevron-up");e.classList.remove("iconsidebar-minimizebutton");if(t)t.style.marginRight="initial"}}O.onChange=function(){if(!x)return;if(O.get())x.classList.add("sidebar-cables-right");else x.classList.remove("sidebar-cables-right")};function A(){const e=S.querySelector(".sidebar-cables .sidebar__group-header");if(e){w(e)}}function w(e){if(e){const t=S.querySelector(".sidebar-cables .sidebar__group-header .sidebar__group-header-undo");if(t){if(!m.get()){t.remove()}}else{if(m.get()){const n=S.createElement("span");n.classList.add("sidebar__group-header-undo");n.classList.add("sidebar-icon-undo");n.addEventListener("click",function(e){e.stopPropagation();const t=S.querySelectorAll(".sidebar-cables .sidebar__reloadable");const n=S.createEvent("MouseEvents");n.initEvent("dblclick",true,true);t.forEach(e=>{e.dispatchEvent(n)})});e.appendChild(n)}}}T(e)}function k(){if(!h){return}if(f.get()){x.classList.add("sidebar--closed");if(e.get())E.set(false)}else{x.classList.remove("sidebar--closed");if(e.get())E.set(true)}}function L(){const e=t.get();x.style.opacity=e}function P(){if(!x)return;if(e.get()){x.style.display="block";if(!x.classList.contains("sidebar--closed"))E.set(true)}else{x.style.display="none";E.set(false)}}O.onChanged=function(){};function j(){const e=S.querySelectorAll("."+i);if(e){e.forEach(function(e){e.parentNode.removeChild(e)})}if(!y.get())return;const t=S.createElement("style");t.classList.add("cablesEle");t.classList.add(i);let n=".sidebar--closed .sidebar__close-button { ";n+="opacity: "+g.get();n+="}";const r=S.createTextNode(n);t.appendChild(r);S.body.appendChild(t)}function D(){const e=S.createElement("div");e.classList.add(s);e.classList.add(l);const t=a.patch.cgl.canvas.parentElement;const n=S.createElement("div");n.classList.add("sidebar__group");e.appendChild(n);const r=S.createElement("div");r.classList.add("sidebar__group-header");e.appendChild(r);const i=S.createElement("span");i.classList.add("sidebar__group-header-title");d=S.createElement("span");d.classList.add("sidebar__group-header-title-text");d.innerHTML=v.get();i.appendChild(d);r.appendChild(i);w(r);T(r);n.appendChild(r);e.appendChild(n);n.addEventListener("click",N);if(!t){a.warn("[sidebar] no canvas parentelement found...");return}t.appendChild(e);const o=S.createElement("div");o.classList.add(u);e.appendChild(o);h=S.createElement("div");h.classList.add(c);h.addEventListener("click",N);e.appendChild(h);return e}v.onChange=function(){if(d)d.innerHTML=v.get()};function R(e){}function N(e){e.stopPropagation();if(!x){a.logError("Sidebar could not be closed...");return}x.classList.toggle("sidebar--closed");const t=e.target;let n=o;if(x.classList.contains("sidebar--closed")){n=p;E.set(false)}else{E.set(true)}}function B(){const e=S.querySelectorAll("."+r);if(e){e.forEach(e=>{e.parentNode.removeChild(e)})}if(!y.get())return;const t=S.createElement("style");t.innerHTML=n.style_css;t.classList.add(r);t.classList.add("cablesEle");S.body.appendChild(t)}function G(){U(x)}function U(e){if(e&&e.parentNode&&e.parentNode.removeChild)e.parentNode.removeChild(e)}};Ops.Sidebar.Sidebar.prototype=new CABLES.Op;CABLES.OPS["5a681c35-78ce-4cb3-9858-bc79c34c6819"]={f:Ops.Sidebar.Sidebar,objName:"Ops.Sidebar.Sidebar"};Ops.String.StringContains_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inString("String"),r=e.inString("SearchValue"),i=e.outBoolNum("Found",false),o=e.outNumber("Index",-1);r.onChange=n.onChange=a;a();function a(){if(n.get()&&r.get()&&r.get().length>0){const e=n.get().indexOf(r.get());o.set(e);i.set(e>-1)}else{o.set(-1);i.set(false)}}};Ops.String.StringContains_v2.prototype=new CABLES.Op;CABLES.OPS["2ca3e5d7-e6b4-46a7-8381-3fe1ad8b6879"]={f:Ops.String.StringContains_v2,objName:"Ops.String.StringContains_v2"};Ops.Boolean.ToggleBool_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTriggerButton("trigger"),r=e.inTriggerButton("reset"),i=e.inBool("Default",false),o=e.outBoolNum("result");let a=false;e.onLoadedValueSet=()=>{o.set(i.get())};n.onTriggered=function(){a=!a;o.set(a)};r.onTriggered=function(){a=i.get();o.set(a)}};Ops.Boolean.ToggleBool_v2.prototype=new CABLES.Op;CABLES.OPS["4313d9bb-96b6-43bc-9190-6068cfb2593c"]={f:Ops.Boolean.ToggleBool_v2,objName:"Ops.Boolean.ToggleBool_v2"};Ops.Trigger.Interval=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValue("interval"),r=e.outTrigger("trigger"),i=e.inValueBool("Active",true);i.onChange=function(){clearTimeout(o);o=-1;if(!i.get()){}else a()};n.set(1e3);let o=-1;function a(){if(!i.get())return;if(o!=-1)return;o=setTimeout(function(){o=-1;r.trigger();a()},n.get())}n.onChange=a;a()};Ops.Trigger.Interval.prototype=new CABLES.Op;CABLES.OPS["3e9bae10-38af-4e36-9fcc-35faeeaf57f8"]={f:Ops.Trigger.Interval,objName:"Ops.Trigger.Interval"};Ops.Ui.Area=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inString("Title","");n.setUiAttribs({hidePort:true});e.setUiAttrib({hasArea:true});e.init=n.onChange=e.onLoaded=r;r();function r(){if(CABLES.UI){gui.savedState.setUnSaved("areaOp");e.uiAttr({comment_title:n.get()||" "});e.name=n.get()}}};Ops.Ui.Area.prototype=new CABLES.Op;CABLES.OPS["38f79614-b0de-4960-8da5-2827e7f43415"]={f:Ops.Ui.Area,objName:"Ops.Ui.Area"};Ops.Sidebar.SidebarVariables=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};let n=e.inObject("link");let r=e.inValueString("Id","");let i=e.inTriggerButton("update");let o=e.outObject("childs");let a=document.createElement("div");a.classList.add("sidebar__item");a.classList.add("sidebar__text");let s=document.createElement("div");a.appendChild(s);n.onChange=c;i.onTriggered=u;r.onChange=l;e.onDelete=d;e.toWorkNeedsParent("Ops.Sidebar.Sidebar");u();function l(){a.id=r.get()}function u(){let n=e.patch.getVars();let r='<table style="font-size:13px;">';for(let t in n){let e=n[t].getValue();if(typeof e=="object")e="[object]";r+="<tr><td>"+t+"</td><td><b>"+e+"</b></td></tr>"}r+="</table>";s.innerHTML=r}function c(){o.set(null);let e=n.get();if(e&&e.parentElement){e.parentElement.appendChild(a);o.set(e)}else{if(a.parentElement){a.parentElement.removeChild(a)}}}function p(e){if(e){e.style.display="block"}}function h(e){if(e){e.style.display="none"}}function d(){f(a)}function f(e){if(e&&e.parentNode&&e.parentNode.removeChild){e.parentNode.removeChild(e)}}};Ops.Sidebar.SidebarVariables.prototype=new CABLES.Op;CABLES.OPS["55e502d6-0360-41aa-9c84-deb9f9e0be24"]={f:Ops.Sidebar.SidebarVariables,objName:"Ops.Sidebar.SidebarVariables"};Ops.Sidebar.Button_v2=function(){CABLES.Op.apply(this,arguments);const t=this;const e=t.attachments={};const n=t.inObject("link");const r=t.inString("Text","Button");const i=t.outObject("childs");const o=t.outTrigger("Pressed Trigger");const a=t.inBool("Grey Out",false);const s=t.inBool("Visible",true);const l=document.createElement("div");l.dataset.op=t.id;l.classList.add("cablesEle");l.classList.add("sidebar__item");l.classList.add("sidebar--button");const u=document.createElement("div");u.classList.add("sidebar__button-input");l.appendChild(u);u.addEventListener("click",h);const c=document.createTextNode(r.get());u.appendChild(c);t.toWorkNeedsParent("Ops.Sidebar.Sidebar");n.onChange=f;r.onChange=d;t.onDelete=b;const p=document.createElement("div");p.classList.add("sidebar__greyout");l.appendChild(p);p.style.display="none";a.onChange=function(){p.style.display=a.get()?"block":"none"};s.onChange=function(){l.style.display=s.get()?"block":"none"};function h(){o.trigger()}function d(){const e=r.get();u.textContent=e;if(CABLES.UI){t.setUiAttrib({extendTitle:e})}}function f(){i.set(null);const e=n.get();if(e&&e.parentElement){e.parentElement.appendChild(l);i.set(e)}else{if(l.parentElement){l.parentElement.removeChild(l)}}}function g(e){if(e){e.style.display="block"}}function m(e){if(e){e.style.display="none"}}function b(){v(l)}function v(e){if(e&&e.parentNode&&e.parentNode.removeChild){e.parentNode.removeChild(e)}}};Ops.Sidebar.Button_v2.prototype=new CABLES.Op;CABLES.OPS["5e9c6933-0605-4bf7-8671-a016d917f327"]={f:Ops.Sidebar.Button_v2,objName:"Ops.Sidebar.Button_v2"};Ops.Trigger.TriggerString=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTriggerButton("Trigger"),r=e.inString("String",""),i=e.outTrigger("Next"),o=e.outString("Result");o.changeAlways=true;n.onTriggered=function(){o.set(r.get());i.trigger()}};Ops.Trigger.TriggerString.prototype=new CABLES.Op;CABLES.OPS["217482b8-2ee6-4609-b7ad-4550e6aaa371"]={f:Ops.Trigger.TriggerString,objName:"Ops.Trigger.TriggerString"};Ops.Gl.MainLoop=function(){CABLES.Op.apply(this,arguments);const r=this;const e=r.attachments={};const t=r.inValue("FPS Limit",0),n=r.outTrigger("trigger"),i=r.outNumber("width"),o=r.outNumber("height"),a=r.inValueBool("Reduce FPS not focussed",false),s=r.inValueBool("Reduce FPS loading"),l=r.inValueBool("Clear",true),u=r.inValueBool("ClearAlpha",true),c=r.inValueBool("Fullscreen Button",false),p=r.inValueBool("Active",true),h=r.inValueBool("Hires Displays",false),d=r.inSwitch("Pixel Unit",["Display","CSS"],"Display");r.onAnimFrame=_;h.onChange=function(){if(h.get())r.patch.cgl.pixelDensity=window.devicePixelRatio;else r.patch.cgl.pixelDensity=1;r.patch.cgl.updateSize();if(CABLES.UI)gui.setLayout()};p.onChange=function(){r.patch.removeOnAnimFrame(r);if(p.get()){r.setUiAttrib({extendTitle:""});r.onAnimFrame=_;r.patch.addOnAnimFrame(r);r.log("adding again!")}else{r.setUiAttrib({extendTitle:"Inactive"})}};const f=r.patch.cgl;let g=0;let m=0;let b=null;let v=false;if(!r.patch.cgl)r.uiAttr({error:"No webgl cgl context"});const O=vec3.create();vec3.set(O,0,0,0);const y=vec3.create();vec3.set(y,0,0,-2);c.onChange=I;setTimeout(I,100);let S=null;let C=true;let E=true;window.addEventListener("blur",()=>{C=false});window.addEventListener("focus",()=>{C=true});document.addEventListener("visibilitychange",()=>{E=!document.hidden});T();f.mainloopOp=this;d.onChange=()=>{i.set(0);o.set(0)};function x(){if(s.get()&&r.patch.loading.getProgress()<1)return 5;if(a.get()){if(!E)return 10;if(!C)return 30}return t.get()}function I(){function e(){if(S)S.style.display="block"}function t(){if(S)S.style.display="none"}r.patch.cgl.canvas.addEventListener("mouseleave",t);r.patch.cgl.canvas.addEventListener("mouseenter",e);if(c.get()){if(!S){S=document.createElement("div");const n=r.patch.cgl.canvas.parentElement;if(n)n.appendChild(S);S.addEventListener("mouseenter",e);S.addEventListener("click",function(e){if(CABLES.UI&&!e.shiftKey)gui.cycleFullscreen();else f.fullScreen()})}S.style.padding="10px";S.style.position="absolute";S.style.right="5px";S.style.top="5px";S.style.width="20px";S.style.height="20px";S.style.cursor="pointer";S.style["border-radius"]="40px";S.style.background="#444";S.style["z-index"]="9999";S.style.display="none";S.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490 490" style="width:20px;height:20px;" xml:space="preserve" width="512px" height="512px"><g><path d="M173.792,301.792L21.333,454.251v-80.917c0-5.891-4.776-10.667-10.667-10.667C4.776,362.667,0,367.442,0,373.333V480     c0,5.891,4.776,10.667,10.667,10.667h106.667c5.891,0,10.667-4.776,10.667-10.667s-4.776-10.667-10.667-10.667H36.416     l152.459-152.459c4.093-4.237,3.975-10.99-0.262-15.083C184.479,297.799,177.926,297.799,173.792,301.792z" fill="#FFFFFF"/><path d="M480,0H373.333c-5.891,0-10.667,4.776-10.667,10.667c0,5.891,4.776,10.667,10.667,10.667h80.917L301.792,173.792     c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262     L469.333,36.416v80.917c0,5.891,4.776,10.667,10.667,10.667s10.667-4.776,10.667-10.667V10.667C490.667,4.776,485.891,0,480,0z" fill="#FFFFFF"/><path d="M36.416,21.333h80.917c5.891,0,10.667-4.776,10.667-10.667C128,4.776,123.224,0,117.333,0H10.667     C4.776,0,0,4.776,0,10.667v106.667C0,123.224,4.776,128,10.667,128c5.891,0,10.667-4.776,10.667-10.667V36.416l152.459,152.459     c4.237,4.093,10.99,3.975,15.083-0.262c3.992-4.134,3.992-10.687,0-14.82L36.416,21.333z" fill="#FFFFFF"/><path d="M480,362.667c-5.891,0-10.667,4.776-10.667,10.667v80.917L316.875,301.792c-4.237-4.093-10.99-3.976-15.083,0.261     c-3.993,4.134-3.993,10.688,0,14.821l152.459,152.459h-80.917c-5.891,0-10.667,4.776-10.667,10.667s4.776,10.667,10.667,10.667     H480c5.891,0,10.667-4.776,10.667-10.667V373.333C490.667,367.442,485.891,362.667,480,362.667z" fill="#FFFFFF"/></g></svg>'}else{if(S){S.style.display="none";S.remove();S=null}}}r.onDelete=function(){f.gl.clearColor(0,0,0,0);f.gl.clear(f.gl.COLOR_BUFFER_BIT|f.gl.DEPTH_BUFFER_BIT)};function _(e){if(!p.get())return;if(f.aborted||f.canvas.clientWidth===0||f.canvas.clientHeight===0)return;r.patch.cg=f;if(h.get())r.patch.cgl.pixelDensity=window.devicePixelRatio;const t=performance.now();r.patch.config.fpsLimit=x();if(f.canvasWidth==-1){f.setCanvas(r.patch.config.glCanvasId);return}if(f.canvasWidth!=i.get()||f.canvasHeight!=o.get()){let e=1;if(d.get()=="CSS")e=r.patch.cgl.pixelDensity;i.set(f.canvasWidth/e);o.set(f.canvasHeight/e)}if(CABLES.now()-m>1e3){CGL.fpsReport=CGL.fpsReport||[];if(r.patch.loading.getProgress()>=1&&m!==0)CGL.fpsReport.push(g);g=0;m=CABLES.now()}CGL.MESH.lastShader=null;CGL.MESH.lastMesh=null;f.renderStart(f,O,y);if(l.get()){f.gl.clearColor(0,0,0,1);f.gl.clear(f.gl.COLOR_BUFFER_BIT|f.gl.DEPTH_BUFFER_BIT)}n.trigger();if(CGL.MESH.lastMesh)CGL.MESH.lastMesh.unBind();if(CGL.Texture.previewTexture){if(!CGL.Texture.texturePreviewer)CGL.Texture.texturePreviewer=new CGL.Texture.texturePreview(f);CGL.Texture.texturePreviewer.render(CGL.Texture.previewTexture)}f.renderEnd(f);r.patch.cg=null;if(u.get()){f.gl.clearColor(1,1,1,1);f.gl.colorMask(false,false,false,true);f.gl.clear(f.gl.COLOR_BUFFER_BIT);f.gl.colorMask(true,true,true,true)}if(!f.frameStore.phong)f.frameStore.phong={};g++;r.patch.cgl.profileData.profileMainloopMs=performance.now()-t}function T(){clearTimeout(b);b=setTimeout(()=>{if(r.patch.getOpsByObjName(r.name).length>1){r.setUiError("multimainloop","there should only be one mainloop op!");if(!v)v=r.patch.addEventListener("onOpDelete",T)}else r.setUiError("multimainloop",null,1)},500)}};Ops.Gl.MainLoop.prototype=new CABLES.Op;CABLES.OPS["b0472a1d-db16-4ba6-8787-f300fbdc77bb"]={f:Ops.Gl.MainLoop,objName:"Ops.Gl.MainLoop"};Ops.Data.JsonPath.ObjectGetStringByPath=function(){CABLES.Op.apply(this,arguments);const o=this;const e=o.attachments={};const t=o.inObject("Object"),a=o.inString("Path"),s=o.inBool("Output path if missing",false),l=o.outString("Output"),u=o.outBool("Found");t.ignoreValueSerialize=true;t.onChange=a.onChange=s.onChange=r;a.setUiAttribs({stringTrim:true});a.on("change",n);n();function n(){if(!a.get())o.setUiError("nokey","Missing Key Value");else o.setUiError("nokey",null)}function r(){const e=t.get();const n=a.get();o.setUiError("missing",null);if(e&&n){if(!Array.isArray(e)&&!(typeof e==="object")){u.set(false);o.setUiError("notiterable","input object of type "+typeof e+" is not travesable by path")}else{o.setUiError("notiterable",null);let t=e[n];const r=n.split(".");o.setUiAttrib({extendTitle:r[r.length-1]+""});if(!t)t=c(n,e);if(t===undefined){const i="could not find element at path "+n;let e=2;t=null;u.set(false);if(s.get()){t=n;e=1}else{t=null}o.setUiError("missing",i,e)}else{u.set(true);t=String(t)}l.set(t)}}else{u.set(false)}}function c(e,t=self,n="."){const r=Array.isArray(e)?e:e.split(n);return r.reduce((e,t)=>{return e&&e[t]},t)}};Ops.Data.JsonPath.ObjectGetStringByPath.prototype=new CABLES.Op;CABLES.OPS["497a6b7c-e33c-45e4-8fb2-a9149d972b5b"]={f:Ops.Data.JsonPath.ObjectGetStringByPath,objName:"Ops.Data.JsonPath.ObjectGetStringByPath"};Ops.User.u_60hz.ArrayInsertString=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inString("Value");const r=e.inValueInt("Array length",10);const i=e.outArray("Array");const o=e.outNumber("Array length out");let a=[];r.onChange=s;n.onChange=l;s();function s(){a.length=0;let e=r.get();let t;for(t=0;t<e;t++){a[t]=""}i.setRef(a);o.set(a.length)}function l(){let e=n.get();if(a.length>=r.get()){a.shift()}a.push(e);i.setRef(a);o.set(a.length)}};Ops.User.u_60hz.ArrayInsertString.prototype=new CABLES.Op;CABLES.OPS["7b07222d-7e09-4697-ba7c-fedb4b1f098e"]={f:Ops.User.u_60hz.ArrayInsertString,objName:"Ops.User.u_60hz.ArrayInsertString"};Ops.Ui.VizArrayTable=function(){CABLES.Op.apply(this,arguments);const f=this;const e=f.attachments={};const g=f.inArray("Array"),m=f.inInt("Start Row",0);f.setUiAttrib({height:200,width:400,resizable:true,vizLayerMaxZoom:2500});function b(t){let n="";if(typeof t=="string"){n='"'+t+'"'}else if(CABLES.UTILS.isNumeric(t))n=String(Math.round(t*1e4)/1e4);else if(Array.isArray(t)){let e="...";if(t.length==0)e="";n="["+e+"] ("+t.length+")"}else if(typeof t=="object"){try{n=JSON.stringify(t,true,1)}catch(e){n="{???}"}}else if(t!=t||t===undefined){n+=String(t)}else{n+=String(t)}return n}f.renderVizLayer=(r,i)=>{r.fillStyle="#222";r.fillRect(i.x,i.y,i.width,i.height);r.save();r.scale(i.scale,i.scale);r.font="normal 10px sourceCodePro";r.fillStyle="#ccc";const o=g.get()||[];let a=1;if(g.get()===null)f.setUiAttrib({extendTitle:"null"});else if(g.get()===undefined)f.setUiAttrib({extendTitle:"undefined"});else f.setUiAttrib({extendTitle:"length: "+o.length});if(g.links.length>0&&g.links[0].getOtherPort(g))a=g.links[0].getOtherPort(g).uiAttribs.stride||1;let e=Math.floor(i.height/i.scale/10-1);let s=4;let l=m.get()*a;let n=[];for(let e=0;e<a;e++)n[e]=0;for(let t=l;t<l+e*a;t+=a){for(let e=0;e<a;e++){const p=o[t+e];n[e]=Math.max(n[e],b(p).length)}}let u=[];let t=30;for(let e=0;e<a;e++){u[e]=t;t+=(n[e]+1)*7}for(let n=l;n<l+e*a;n+=a){if(n<0)continue;if(n+a>o.length)continue;r.fillStyle="#666";const h=n/a;if(h>=0)r.fillText(h,i.x/i.scale+s,i.y/i.scale+10+(n-l)/a*10+s);for(let t=0;t<a;t++){const p=o[n+t];let e=b(p);r.fillStyle="#ccc";if(typeof p=="string"){}else if(CABLES.UTILS.isNumeric(p))e=String(Math.round(p*1e4)/1e4);else if(Array.isArray(p)){}else if(typeof p=="object"){}else if(p!=p||p===undefined){r.fillStyle="#f00"}r.fillText(e,i.x/i.scale+u[t],i.y/i.scale+10+(n-l)/a*10+s)}}if(g.get()===null)r.fillText("null",i.x/i.scale+10,i.y/i.scale+10+s);else if(g.get()===undefined)r.fillText("undefined",i.x/i.scale+10,i.y/i.scale+10+s);const c=30;if(i.scale<=0)return;if(l>0){const d=r.createLinearGradient(0,i.y/i.scale+5,0,i.y/i.scale+c);d.addColorStop(0,"#222");d.addColorStop(1,"rgba(34,34,34,0.0)");r.fillStyle=d;r.fillRect(i.x/i.scale,i.y/i.scale,2e5,c)}if(l+e*a<o.length){const d=r.createLinearGradient(0,i.y/i.scale+i.height/i.scale-c+5,0,i.y/i.scale+i.height/i.scale-c+c);d.addColorStop(1,"#222");d.addColorStop(0,"rgba(34,34,34,0.0)");r.fillStyle=d;r.fillRect(i.x/i.scale,i.y/i.scale+i.height/i.scale-c,2e5,c)}r.restore()}};Ops.Ui.VizArrayTable.prototype=new CABLES.Op;CABLES.OPS["af2eeaaf-ff86-4bfb-9a27-42f05160a5d8"]={f:Ops.Ui.VizArrayTable,objName:"Ops.Ui.VizArrayTable"};Ops.String.FilterValidString=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inString("String",""),r=e.inBool("Invalid if null",true),i=e.inBool("Invalid if undefined",true),o=e.inBool("Invalid if empty",true),a=e.inBool("Invalid if 0",true),s=e.outString("Last Valid String"),l=e.outBoolNum("Is Valid");n.onChange=r.onChange=i.onChange=o.onChange=function(){const e=n.get();let t=true;if(t===false)t=false;if(t&&a.get()&&(e===0||e==="0"))t=false;if(t&&r.get()&&e===null)t=false;if(t&&i.get()&&e===undefined)t=false;if(t&&o.get()&&e==="")t=false;l.set(t);if(t)s.set(e)}};Ops.String.FilterValidString.prototype=new CABLES.Op;CABLES.OPS["a522235d-f220-46ea-bc26-13a5b20ec8c6"]={f:Ops.String.FilterValidString,objName:"Ops.String.FilterValidString"};Ops.Gl.Meshes.Rectangle_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("render"),r=e.outTrigger("trigger"),C=e.inValue("width",1),E=e.inValue("height",1),x=e.inSwitch("pivot x",["left","center","right"]),I=e.inSwitch("pivot y",["top","center","bottom"]),_=e.inValueInt("num columns",1),T=e.inValueInt("num rows",1),A=e.inSwitch("axis",["xy","xz"],"xy"),i=e.inValueBool("Active",true),w=e.outObject("geometry",null,"geometry");w.ignoreValueSerialize=true;i.setUiAttribs({title:"Render mesh"});const k=e.patch.cgl;A.set("xy");x.set("center");I.set("center");e.setPortGroup("Pivot",[x,I]);e.setPortGroup("Size",[C,E]);e.setPortGroup("Structure",[_,T]);e.toWorkPortsNeedToBeLinked(n);const L=new CGL.Geometry("rectangle");let j=null;let N=false;A.onChange=x.onChange=I.onChange=C.onChange=E.onChange=T.onChange=_.onChange=o;a();function o(){N=true}e.preRender=n.onTriggered=function(){if(!CGL.TextureEffect.checkOpNotInTextureEffect(e))return;if(N)a();if(i.get()&&j)j.render(k.getShader());r.trigger()};function a(){let e=C.get();let t=parseFloat(E.get());let n=0;let r=0;if(typeof e=="string")e=parseFloat(e);if(typeof t=="string")t=parseFloat(t);if(x.get()=="center")n=0;else if(x.get()=="right")n=-e/2;else if(x.get()=="left")n=+e/2;if(I.get()=="center")r=0;else if(I.get()=="top")r=-t/2;else if(I.get()=="bottom")r=+t/2;const i=[];const o=[];const a=[];const s=[];const l=[];const u=[];const c=Math.round(T.get());const p=Math.round(_.get());const h=e/p;const d=t/c;let f,g,m;m=A.get();for(g=0;g<=c;g++){for(f=0;f<=p;f++){i.push(f*h-C.get()/2+n);if(m=="xz")i.push(0);i.push(g*d-E.get()/2+r);if(m=="xy")i.push(0);o.push(f/p);o.push(1-g/c);if(m=="xz"){a.push(0,1,0);s.push(1,0,0);l.push(0,0,1)}else if(m=="xy"){a.push(0,0,1);s.push(-1,0,0);l.push(0,-1,0)}}}for(f=0;f<p;f++){for(g=0;g<c;g++){const b=f+(p+1)*g;const v=b;const O=b+1;const y=b+p+1;const S=b+1+p+1;u.push(v);u.push(y);u.push(O);u.push(O);u.push(y);u.push(S)}}L.clear();L.vertices=i;L.texCoords=o;L.verticesIndices=u;L.vertexNormals=a;L.tangents=s;L.biTangents=l;if(p*c>64e3)L.unIndex();if(!j)j=new CGL.Mesh(k,L);else j.setGeom(L);w.setRef(L);N=false}e.onDelete=function(){if(j)j.dispose()}};Ops.Gl.Meshes.Rectangle_v2.prototype=new CABLES.Op;CABLES.OPS["fc5718d6-11a5-496e-8f16-1c78b1a2824c"]={f:Ops.Gl.Meshes.Rectangle_v2,objName:"Ops.Gl.Meshes.Rectangle_v2"};Ops.Gl.Matrix.Transform=function(){CABLES.Op.apply(this,arguments);const n=this;const e=n.attachments={};const t=n.inTrigger("render"),r=n.inValue("posX",0),i=n.inValue("posY",0),o=n.inValue("posZ",0),a=n.inValue("scale",1),s=n.inValue("rotX",0),l=n.inValue("rotY",0),u=n.inValue("rotZ",0),c=n.outTrigger("trigger");n.setPortGroup("Rotation",[s,l,u]);n.setPortGroup("Position",[r,i,o]);n.setPortGroup("Scale",[a]);n.setUiAxisPorts(r,i,o);n.toWorkPortsNeedToBeLinked(t,c);const p=vec3.create();const h=vec3.create();const d=mat4.create();mat4.identity(d);let f=false,g=false,m=true,b=true,v=true;s.onChange=l.onChange=u.onChange=x;r.onChange=i.onChange=o.onChange=C;a.onChange=E;t.onTriggered=function(){let e=false;if(m){y();e=true}if(b){S();e=true}if(v)e=true;if(e)O();const t=n.patch.cg||n.patch.cgl;t.pushModelMatrix();mat4.multiply(t.mMatrix,t.mMatrix,d);c.trigger();t.popModelMatrix();if(CABLES.UI)gui.setTransform(n.id,r.get(),i.get(),o.get());if(n.isCurrentUiOp())gui.setTransformGizmo({posX:r,posY:i,posZ:o})};function O(){mat4.identity(d);if(g)mat4.translate(d,d,p);if(s.get()!==0)mat4.rotateX(d,d,s.get()*CGL.DEG2RAD);if(l.get()!==0)mat4.rotateY(d,d,l.get()*CGL.DEG2RAD);if(u.get()!==0)mat4.rotateZ(d,d,u.get()*CGL.DEG2RAD);if(f)mat4.scale(d,d,h);v=false}function y(){g=false;if(r.get()!==0||i.get()!==0||o.get()!==0)g=true;vec3.set(p,r.get(),i.get(),o.get());m=false}function S(){f=true;vec3.set(h,a.get(),a.get(),a.get());b=false}function C(){m=true}function E(){b=true}function x(){v=true}O()};Ops.Gl.Matrix.Transform.prototype=new CABLES.Op;CABLES.OPS["650baeb1-db2d-4781-9af6-ab4e9d4277be"]={f:Ops.Gl.Matrix.Transform,objName:"Ops.Gl.Matrix.Transform"};Ops.Trigger.Sequence=function(){CABLES.Op.apply(this,arguments);const o=this;const e=o.attachments={};const t=o.inTrigger("exe"),n=o.inTriggerButton("Clean up connections");o.setUiAttrib({resizable:true,resizableY:false,stretchPorts:true});const r=[],a=[],i=16;let s=null,l=[];t.onTriggered=p;n.onTriggered=h;n.setUiAttribs({hideParam:true,hidePort:true});for(let t=0;t<i;t++){const d=o.outTrigger("trigger "+t);a.push(d);d.onLinkChanged=c;if(t<i-1){let e=o.inTrigger("exe "+t);e.onTriggered=p;r.push(e)}}u();function u(){l.length=0;for(let e=0;e<a.length;e++)if(a[e].links.length>0)l.push(a[e])}function c(){u();clearTimeout(s);s=setTimeout(()=>{let t=false;for(let e=0;e<a.length;e++)if(a[e].links.length>1)t=true;n.setUiAttribs({hideParam:!t});if(o.isCurrentUiOp())o.refreshParams()},60)}function p(){for(let e=0;e<l.length;e++)l[e].trigger()}function h(){let r=0;for(let n=0;n<a.length;n++){let t=[];if(a[n].links.length>1)for(let e=1;e<a[n].links.length;e++){while(a[r].links.length>0)r++;t.push(a[n].links[e]);const i=a[n].links[e].getOtherPort(a[n]);o.patch.link(o,"trigger "+r,i.op,i.name);r++}for(let e=0;e<t.length;e++)t[e].remove()}c();u()}};Ops.Trigger.Sequence.prototype=new CABLES.Op;CABLES.OPS["a466bc1f-06e9-4595-8849-bffb9fe22f99"]={f:Ops.Trigger.Sequence,objName:"Ops.Trigger.Sequence"};Ops.Math.Multiply=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValueFloat("number1",1),r=e.inValueFloat("number2",1),i=e.outNumber("result");e.setUiAttribs({mathTitle:true});n.onChange=r.onChange=o;o();function o(){const e=n.get();const t=r.get();i.set(e*t)}};Ops.Math.Multiply.prototype=new CABLES.Op;CABLES.OPS["1bbdae06-fbb2-489b-9bcc-36c9d65bd441"]={f:Ops.Math.Multiply,objName:"Ops.Math.Multiply"};Ops.Trigger.Repeat_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("Execute"),r=e.inValueInt("Repeats",5),i=e.inSwitch("Direction",["Forward","Backward"],"Forward"),o=e.outTrigger("Next"),a=e.addOutPort(new CABLES.Port(e,"index"));i.onChange=s;s();function s(){if(i.get()=="Forward")n.onTriggered=l;else n.onTriggered=u}function l(){const e=Math.floor(r.get());for(var t=0;t<e;t++){a.set(t);o.trigger()}}function u(){const e=Math.floor(r.get());for(var t=e-1;t>-1;t--){a.set(t);o.trigger()}}};Ops.Trigger.Repeat_v2.prototype=new CABLES.Op;CABLES.OPS["a4deea80-db97-478f-ad1a-5ee30f2f47cc"]={f:Ops.Trigger.Repeat_v2,objName:"Ops.Trigger.Repeat_v2"};Ops.Math.RandomNumbers_v3=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValueFloat("Seed",1),r=e.inValueFloat("Min",0),i=e.inValueFloat("Max",1),o=e.outNumber("X"),a=e.outNumber("Y"),s=e.outNumber("Z"),l=e.outNumber("W");n.onChange=r.onChange=i.onChange=u;u();function u(){const e=r.get();const t=i.get();Math.randomSeed=Math.abs(n.get()||0)*571.1+1;o.set(Math.seededRandom()*(t-e)+e);a.set(Math.seededRandom()*(t-e)+e);s.set(Math.seededRandom()*(t-e)+e);l.set(Math.seededRandom()*(t-e)+e)}};Ops.Math.RandomNumbers_v3.prototype=new CABLES.Op;CABLES.OPS["d2b970e1-9406-4459-995c-5a594acd88e3"]={f:Ops.Math.RandomNumbers_v3,objName:"Ops.Math.RandomNumbers_v3"};Ops.Array.ArrayGetString=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inArray("array"),r=e.inValueInt("index"),i=e.outString("result");n.ignoreValueSerialize=true;r.onChange=o;n.onChange=function(){o()};function o(){const e=n.get();if(e)i.set(e[r.get()])}};Ops.Array.ArrayGetString.prototype=new CABLES.Op;CABLES.OPS["be8f16c0-0c8a-48a2-a92b-45dbf88c76c1"]={f:Ops.Array.ArrayGetString,objName:"Ops.Array.ArrayGetString"};Ops.Gl.Meshes.TextMesh_v2=function(){CABLES.Op.apply(this,arguments);const t=this;const e=t.attachments={textmesh_frag:"{{MODULES_HEAD}}\n\n#define INSTANCING\n\nUNI sampler2D tex;\n#ifdef DO_MULTEX\n    UNI sampler2D texMul;\n#endif\n#ifdef DO_MULTEX_MASK\n    UNI sampler2D texMulMask;\n#endif\nIN vec2 texCoord;\nIN vec2 texPos;\nUNI float r;\nUNI float g;\nUNI float b;\nUNI float a;\n\nflat IN float frag_instIndex;\n\nvoid main()\n{\n    {{MODULE_BEGIN_FRAG}}\n\n    vec4 col=texture(tex,texCoord);\n    col.a=col.r;\n    col.r*=r;\n    col.g*=g;\n    col.b*=b;\n    col*=a;\n\n    if(col.a==0.0)discard;\n\n    #ifdef DO_MULTEX\n        col*=texture(texMul,texPos);\n    #endif\n\n    #ifdef DO_MULTEX_MASK\n        col*=texture(texMulMask,texPos).r;\n    #endif\n\n    {{MODULE_COLOR}}\n\n    outColor=col;\n}",textmesh_vert:"{{MODULES_HEAD}}\n\nUNI sampler2D tex;\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\nUNI float scale;\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN mat4 instMat;\nIN vec2 attrTexOffsets;\nIN vec2 attrTexSize;\nIN vec2 attrTexPos;\nIN float attrVertIndex;\nIN float instanceIndex;\nflat OUT float frag_instIndex;\n\nOUT vec2 texPos;\n\nOUT vec2 texCoord;\nOUT vec4 modelPos;\n\nvoid main()\n{\n\n    texCoord=(attrTexCoord*(attrTexSize)) + attrTexOffsets;\n    mat4 instMVMat=instMat;\n    instMVMat[3][0]*=scale;\n\n    texPos=attrTexPos;\n\n    vec4 pos=vec4( vPosition.x*(attrTexSize.x/attrTexSize.y)*scale,vPosition.y*scale,vPosition.z*scale, 1. );\n\n    mat4 mvMatrix=viewMatrix * modelMatrix * instMVMat;\n    frag_instIndex=instanceIndex;\n\n    {{MODULE_VERTEX_POSITION}}\n\n    gl_Position = projMatrix * mvMatrix * pos;\n}\n\n"};const n=t.inTrigger("Render"),v=t.inString("Text","cables"),r=t.inValueFloat("Scale",1),c=t.inString("Font","Arial"),O=t.inValueSelect("align",["left","center","right"],"center"),i=t.inValueSelect("vertical align",["Top","Middle","Bottom"],"Middle"),y=t.inValueFloat("Line Height",1),S=t.inValueFloat("Letter Spacing"),s=t.inSwitch("filter",["nearest","linear","mipmap"],"mipmap"),l=t.inSwitch("Anisotropic",[0,1,2,4,8,16],0),o=t.inTexture("Texture Color"),a=t.inTexture("Texture Mask"),P=t.outTrigger("Next"),C=t.outTexture("texture"),D=t.outNumber("Total Lines",0),R=t.outNumber("Width",0),G=t.outBoolNum("Font Available",0);const E=t.patch.cgl;t.toWorkPortsNeedToBeLinked(n);t.setPortGroup("Masking",[o,a]);C.setUiAttribs({hidePort:true});const p=1024;let u=false;let h=true;O.onChange=v.onChange=y.onChange=U;function U(){h=true}let d=null;CABLES.OpTextureMeshCanvas={};let f=0;const z=null;let x=null;let I=true;let _=true;l.onChange=s.onChange=()=>{T().texture=null;_=true};a.onChange=o.onChange=function(){m.toggleDefine("DO_MULTEX",o.get());m.toggleDefine("DO_MULTEX_MASK",a.get())};C.set(null);c.onChange=function(){_=true;I=true;g()};t.patch.on("fontLoaded",e=>{if(e==c.get()){_=true;I=true}});function g(){const e=u;try{u=document.fonts.check('20px "'+c.get()+'"')}catch(e){t.logError(e)}if(!e&&u){G.set(true);_=true;I=true}if(!u)setTimeout(g,250)}i.onChange=function(){if(i.get()=="Middle")f=0;else if(i.get()=="Top")f=1;else if(i.get()=="Bottom")f=2};function T(){d=""+c.get();if(CABLES.OpTextureMeshCanvas.hasOwnProperty(d))return CABLES.OpTextureMeshCanvas[d];const e=document.createElement("canvas");e.dataset.font=c.get();e.id="texturetext_"+CABLES.generateUUID();e.style.display="none";const t=document.getElementsByTagName("body")[0];t.appendChild(e);const n=e.getContext("2d");CABLES.OpTextureMeshCanvas[d]={ctx:n,canvas:e,chars:{},characters:"",fontSize:320};return CABLES.OpTextureMeshCanvas[d]}t.onDelete=function(){if(d&&CABLES.OpTextureMeshCanvas[d])CABLES.OpTextureMeshCanvas[d].canvas.remove()};const m=new CGL.Shader(E,"TextMesh",this);m.setSource(e.textmesh_vert,e.textmesh_frag);const V=new CGL.Uniform(m,"t","tex",0);const F=new CGL.Uniform(m,"t","texMul",1);const H=new CGL.Uniform(m,"t","texMulMask",2);const Y=new CGL.Uniform(m,"f","scale",r);const b=t.inValueSlider("r",1),A=t.inValueSlider("g",1),w=t.inValueSlider("b",1),k=t.inValueSlider("a",1),Z=new CGL.Uniform(m,"f","r",b),W=new CGL.Uniform(m,"f","g",A),X=new CGL.Uniform(m,"f","b",w),q=new CGL.Uniform(m,"f","a",k);b.setUiAttribs({colorPick:true});t.setPortGroup("Display",[r,c]);t.setPortGroup("Alignment",[O,i]);t.setPortGroup("Color",[b,A,w,k]);let L=0;const j=vec3.create();let N=-1;let B=false;n.onTriggered=function(){if(h){J();h=false}const e=T();if(e.lastChange!=N){I=true;N=e.lastChange}if(_)Q();if(I)J();if(x&&x.numInstances>0){E.pushBlendMode(CGL.BLEND_NORMAL,true);E.pushShader(m);E.setTexture(0,C.get().tex);const t=o.get();if(t)E.setTexture(1,t.tex);const n=a.get();if(n)E.setTexture(2,n.tex);if(f===2)vec3.set(j,0,L,0);else if(f===1)vec3.set(j,0,0,0);else if(f===0)vec3.set(j,0,L/2,0);j[1]-=y.get();E.pushModelMatrix();mat4.translate(E.mMatrix,E.mMatrix,j);if(!B)x.render(E.getShader());E.popModelMatrix();E.setTexture(0,null);E.popShader();E.popBlendMode()}P.trigger()};S.onChange=function(){I=true};function J(){const e=String(v.get()+"");if(!C.get())return;const o=T();if(!o.geom){o.geom=new CGL.Geometry("textmesh");o.geom.vertices=[1,1,0,0,1,0,1,0,0,0,0,0];o.geom.texCoords=new Float32Array([1,1,0,1,1,0,0,0]);o.geom.verticesIndices=[0,1,2,2,1,3]}if(!x)x=new CGL.Mesh(E,o.geom);const a=e.split("\n");D.set(a.length);const s=[];const l=[];const u=[];const c=[];const p=mat4.create();let h=0;let d=0;_=false;for(let i=0;i<a.length;i++){const f=a[i];const g=f.length;let t=0;let n=0;let r=0;for(let e=0;e<g;e++){const m=f.substring(e,e+1);const b=o.chars[String(m)];if(b){r+=b.texCoordWidth/b.texCoordHeight;r+=S.get()}}r-=S.get();L=0;if(O.get()=="left")n=0;else if(O.get()=="right")n=r;else if(O.get()=="center")n=r/2;L=(i+1)*y.get();for(let e=0;e<g;e++){const m=f.substring(e,e+1);const b=o.chars[String(m)];if(!b){_=true;return}else{c.push(t/r*.99+.005,(1-i/(a.length-1))*.99+.005);l.push(b.texCoordX,1-b.texCoordY-b.texCoordHeight);u.push(b.texCoordWidth,b.texCoordHeight);mat4.identity(p);mat4.translate(p,p,[t-n,0-i*y.get(),0]);t+=b.texCoordWidth/b.texCoordHeight+S.get();d=Math.max(d,t-n);s.push(Array.prototype.slice.call(p));h++}}}const t=[].concat.apply([],s);B=false;if(t.length==0)B=true;const n=t.length/16;x.setNumInstances(n);if(x.numInstances==0){B=true;return}R.set(d*r.get());x.setAttribute("instMat",new Float32Array(t),16,{instanced:true});x.setAttribute("attrTexOffsets",new Float32Array(l),2,{instanced:true});x.setAttribute("attrTexSize",new Float32Array(u),2,{instanced:true});x.setAttribute("attrTexPos",new Float32Array(c),2,{instanced:true});I=false;if(_)Q()}function M(t,n){const r=T();if(!n)r.chars={};const i=r.ctx;i.font=t+"px "+c.get();i.textAlign="left";let o=0;let a=0;const s=t*1.4;const e={fits:true};for(let e=0;e<r.characters.length;e++){const l=String(r.characters.substring(e,e+1));const u=i.measureText(l).width;if(a+u>=p){o+=s+2;a=0}if(!n){r.chars[l]={str:l,texCoordX:a/p,texCoordY:o/p,texCoordWidth:u/p,texCoordHeight:s/p};i.fillText(l,a,o+t)}a+=u+12}if(o>p-s){e.fits=false}e.spaceLeft=p-o;return e}function Q(){let e=CGL.Texture.FILTER_LINEAR;if(s.get()=="nearest")e=CGL.Texture.FILTER_NEAREST;if(s.get()=="mipmap")e=CGL.Texture.FILTER_MIPMAP;const t=T();let n=String(v.get());if(n==null||n==undefined)n="";for(let e=0;e<n.length;e++){const a=n.substring(e,e+1);if(t.characters.indexOf(a)==-1){t.characters+=a;_=true}}const r=t.ctx;t.canvas.width=t.canvas.height=p;if(!t.texture)t.texture=CGL.Texture.createFromImage(E,t.canvas,{filter:e,anisotropic:parseFloat(l.get())});t.texture.setSize(p,p);r.fillStyle="transparent";r.clearRect(0,0,p,p);r.fillStyle="rgba(255,255,255,255)";let i=t.fontSize+40;let o=M(i,true);while(!o.fits){i-=5;o=M(i,true)}M(i,false);r.restore();t.texture.initTexture(t.canvas,e);t.texture.unpackAlpha=true;C.set(t.texture);t.lastChange=CABLES.now();I=true;_=false}};Ops.Gl.Meshes.TextMesh_v2.prototype=new CABLES.Op;CABLES.OPS["2390f6b3-2122-412e-8c8d-5c2f574e8bd1"]={f:Ops.Gl.Meshes.TextMesh_v2,objName:"Ops.Gl.Meshes.TextMesh_v2"};Ops.Math.Sum=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValueFloat("number1",0),r=e.inValueFloat("number2",0),i=e.outNumber("result");e.setUiAttribs({mathTitle:true});n.onChange=r.onChange=o;o();function o(){const e=n.get()+r.get();if(!isNaN(e))i.set(e)}};Ops.Math.Sum.prototype=new CABLES.Op;CABLES.OPS["c8fb181e-0b03-4b41-9e55-06b6267bc634"]={f:Ops.Math.Sum,objName:"Ops.Math.Sum"};Ops.Gl.Matrix.Billboard=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("Exec");const r=e.outTrigger("Next");const i=e.patch.cgl;let o=mat4.create();let a=mat4.create();let s=mat4.create();let l=mat4.create();n.onTriggered=function(){mat4.invert(o,i.mMatrix);mat4.invert(a,i.vMatrix);mat4.mul(o,o,a);o[12]=0;o[13]=0;o[14]=0;i.pushModelMatrix();i.pushViewMatrix();mat4.mul(i.mMatrix,i.mMatrix,o);r.trigger();i.popViewMatrix();i.popModelMatrix()}};Ops.Gl.Matrix.Billboard.prototype=new CABLES.Op;CABLES.OPS["d41e676e-d8a7-4a1e-8abf-f1bddfc982d5"]={f:Ops.Gl.Matrix.Billboard,objName:"Ops.Gl.Matrix.Billboard"};Ops.Anim.Timer_v2=function(){CABLES.Op.apply(this,arguments);const o=this;const e=o.attachments={};const a=o.inValue("Speed",1),t=o.inValueBool("Play",true),n=o.inTriggerButton("Reset"),r=o.inValueBool("Sync to timeline",false),s=o.outNumber("Time");o.setPortGroup("Controls",[t,n,a]);const l=new CABLES.Timer;let u=null;let c=0;let p=false;t.onChange=i;i();function i(){if(t.get()){l.play();o.patch.addOnAnimFrame(o)}else{l.pause();o.patch.removeOnAnimFrame(o)}}n.onTriggered=h;function h(){c=0;u=null;l.setTime(0);s.set(0)}r.onChange=function(){p=r.get();t.setUiAttribs({greyout:p});n.setUiAttribs({greyout:p})};o.onAnimFrame=function(e,t,n){if(l.isPlaying()){if(CABLES.overwriteTime!==undefined){s.set(CABLES.overwriteTime*a.get())}else if(p){s.set(e*a.get())}else{l.update(o.patch.reqAnimTimeStamp);const r=l.get();if(u===null){u=r;return}const i=Math.abs(r-u);u=r;c+=i*a.get();if(c!=c)c=0;s.set(c)}}}};Ops.Anim.Timer_v2.prototype=new CABLES.Op;CABLES.OPS["aac7f721-208f-411a-adb3-79adae2e471a"]={f:Ops.Anim.Timer_v2,objName:"Ops.Anim.Timer_v2"};Ops.Gl.ClearColor=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("render"),r=e.outTrigger("trigger"),i=e.inFloatSlider("r",.1),o=e.inFloatSlider("g",.1),a=e.inFloatSlider("b",.1),s=e.inFloatSlider("a",1);i.setUiAttribs({colorPick:true});const l=e.patch.cgl;n.onTriggered=function(){l.gl.clearColor(i.get(),o.get(),a.get(),s.get());l.gl.clear(l.gl.COLOR_BUFFER_BIT|l.gl.DEPTH_BUFFER_BIT);r.trigger()}};Ops.Gl.ClearColor.prototype=new CABLES.Op;CABLES.OPS["19b441eb-9f63-4f35-ba08-b87841517c4d"]={f:Ops.Gl.ClearColor,objName:"Ops.Gl.ClearColor"};Ops.Html.AppendChild_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};let n=e.patch.cgl.canvas.parentElement;let r=null;let i=null;let o=e.inObject("Parent",null,"element");let a=e.inObject("Child",null,"element");let s=e.outObject("Parent Out",null,"element");let l=e.outObject("Child Out",null,"element");o.onChange=u;a.onChange=u;function u(){let e=o.get();let t=a.get();if(e!==r){if(e){c(e,t)}else{p(e,t)}r=e}if(t!==i){if(t){h(e,t)}else{d(e,t)}i=t}s.set(e);l.set(t)}function c(e,t){if(t){e.appendChild(t)}}function p(e,t){if(t){n.appendChild(t)}}function h(e,t){if(e){e.appendChild(t)}}function d(e,t){if(i){n.appendChild(i)}}};Ops.Html.AppendChild_v2.prototype=new CABLES.Op;CABLES.OPS["e15cfbc7-d2fa-4348-8964-66d02aec77aa"]={f:Ops.Html.AppendChild_v2,objName:"Ops.Html.AppendChild_v2"};Ops.Gl.Performance=function(){CABLES.Op.apply(this,arguments);const a=this;const P=a.attachments={};const e=a.inTrigger("exe"),s=a.inValueBool("Visible",true),D=a.inValueBool("Measure GPU",true),l=a.outTrigger("childs"),t=a.inSwitch("Position",["top","bottom"],"top"),n=a.inBool("Open",false),R=a.inBool("Smooth Graph",true),G=a.inFloat("Scale",3),u=a.inFloat("Size",128),U=a.outObject("Canvas"),z=a.outNumber("FPS");const r=a.patch.cgl;const i=document.createElement("div");let o=null;let c=null;let p=false;let h=0;let d=0;let f=0;let g=0;let m=0;const b=[];const v=[];const O=[];const y=[];let S=0;let C=0;let E=null;let V=0;let F=0;const x=["|","/","-","\\"];let I=true;const H="#007f9c";const Y="#aaaaaa";const Z="#222222";const _="#003f5c";const T="#7a5195";const A="#ef5675";const w="#ffa600";let W=false;let k=0;let L=0;let j=0;a.toWorkPortsNeedToBeLinked(e,l);const X=a.patch.cgl.gl;const q=X.getExtension("EXT_disjoint_timer_query_webgl2");e.onLinkChanged=s.onChange=()=>{M();Q()};t.onChange=J;u.onChange=B;i.id="performance";i.style.position="absolute";i.style.left="0px";i.style.opacity="0.8";i.style.padding="10px";i.style.cursor="pointer";i.style.background="#222";i.style.color="white";i.style["font-family"]="monospace";i.style["font-size"]="12px";i.style["z-index"]="99999";i.innerHTML="&nbsp;";i.addEventListener("click",$);const N=a.patch.cgl.canvas.parentElement;N.appendChild(i);B();M();J();Q();a.onDelete=function(){if(E)E.remove();if(i)i.remove()};function J(){E.style["pointer-events"]="none";if(t.get()=="top"){E.style.top=i.style.top="0px";E.style.bottom=i.style.bottom="initial"}else{E.style.bottom=i.style.bottom="0px";E.style.top=i.style.top="initial"}}function Q(){if(!s.get()||!e.isLinked()){i.style.display="none";i.style.opacity=0;E.style.display="none"}else{i.style.display="block";i.style.opacity=1;E.style.display="block"}}function B(){if(!E)return;const t=Math.max(0,parseInt(u.get()));E.width=t;E.height=t;i.style.left=t+"px";b.length=0;v.length=0;O.length=0;y.length=0;for(let e=0;e<t;e++){b[e]=-1;v[e]=-1;O[e]=-1;y[e]=-1}}n.onChange=function(){p=n.get();M()};function $(){if(!s.get())return;i.style.opacity=1;p=!p;M()}function M(){te();if(!E)ee();if(p){E.style.display="block";i.style.left=u.get()+"px";i.style["min-height"]="56px"}else{E.style.display="none";i.style.left="0px";i.style["min-height"]="auto"}}function K(){const t=E.height;const n=G.get();c.fillStyle=Z;c.fillRect(0,0,E.width,t);c.fillStyle=_;let r=0;const i=Math.max(0,parseInt(u.get()));for(r=i;r>=0;r--){if(b[r]>30)c.fillStyle=H;if(b[r]>60)c.fillStyle=Y;c.fillRect(i-r,t-b[r]*n,1,b[r]*n);if(b[r]>30)c.fillStyle=_}for(r=i;r>=0;r--){let e=0;c.fillStyle=T;e=v[r];c.fillRect(i-r,t-e*n,1,v[r]*n);c.fillStyle=A;e+=O[r];c.fillRect(i-r,t-e*n,1,O[r]*n);c.fillStyle=w;e+=y[r];c.fillRect(i-r,t-e*n,1,y[r]*n)}for(let e=10;e<t;e+=10){c.fillStyle="#888";const o=t-e*n;c.fillRect(E.width-5,o,5,1);c.font="8px arial";c.fillText(e+"ms",E.width-27,o+3)}c.fillStyle="#fff";c.fillRect(E.width-5,t-1e3/d*n,5,1);c.fillText(Math.round(1e3/d)+"ms",E.width-27,t-1e3/d*n)}function ee(){E=document.createElement("canvas");E.id="performance_"+a.patch.config.glCanvasId;E.width=u.get();E.height=u.get();E.style.display="block";E.style.opacity=.9;E.style.position="absolute";E.style.left="0px";E.style.cursor="pointer";E.style.top="-64px";E.style["z-index"]="99998";N.appendChild(E);c=E.getContext("2d");E.addEventListener("click",$);B()}function te(){if(!s.get())return;let e="";if(a.patch.cgl.profileData.profileShaderCompiles>0)e+="Shader compile ("+a.patch.cgl.profileData.profileShaderCompileName+") ";if(a.patch.cgl.profileData.profileShaderGetUniform>0)e+="Shader get uni loc! ("+a.patch.cgl.profileData.profileShaderGetUniformName+")";if(a.patch.cgl.profileData.profileTextureResize>0)e+="Texture resize! ";if(a.patch.cgl.profileData.profileFrameBuffercreate>0)e+="Framebuffer create! ";if(a.patch.cgl.profileData.profileEffectBuffercreate>0)e+="Effectbuffer create! ";if(a.patch.cgl.profileData.profileTextureDelete>0)e+="Texture delete! ";if(a.patch.cgl.profileData.profileNonTypedAttrib>0)e+="Not-Typed Buffer Attrib! "+a.patch.cgl.profileData.profileNonTypedAttribNames;if(a.patch.cgl.profileData.profileTextureNew>0)e+="new texture created! ";if(a.patch.cgl.profileData.profileGenMipMap>0)e+="generating mip maps!";if(e.length>0){e='| <span style="color:#f80;">WARNING: '+e+"<span>"}let t="";if(p){t+='<span style="color:'+_+'">■</span> '+d+" fps ";t+='<span style="color:'+T+'">■</span> '+Math.round(L*100)/100+"ms mainloop ";t+='<span style="color:'+A+'">■</span> '+Math.round(j*100)/100+"ms onframe ";if(k)t+='<span style="color:'+w+'">■</span> '+Math.round(k*100)/100+"ms GPU";t+=e;i.innerHTML=t}else{t+=d+" fps / ";t+="CPU: "+Math.round(a.patch.cgl.profileData.profileOnAnimFrameOps*100)/100+"ms / ";if(k)t+="GPU: "+Math.round(k*100)/100+"ms  ";i.innerHTML=t}if(a.patch.loading.getProgress()!=1){i.innerHTML+="<br/>loading "+Math.round(a.patch.loading.getProgress()*100)+"% "+x[++F%x.length]}if(p){let t=0;S=0;m=0;for(let e=b.length;e>b.length-b.length/3;e--){if(b[e]>-1){S+=b[e];t++}if(v[e]>-1)m+=v[e]}S/=t;m/=t;i.innerHTML+="<br/> "+r.canvasWidth+" x "+r.canvasHeight+" (x"+r.pixelDensity+") ";i.innerHTML+="<br/>frame avg: "+Math.round(m*100)/100+" ms ("+Math.round(m/S*100)+"%) / "+Math.round(S*100)/100+" ms";i.innerHTML+=" (self: "+Math.round(C*100)/100+" ms) ";i.innerHTML+="<br/>shader binds: "+Math.ceil(a.patch.cgl.profileData.profileShaderBinds/d)+" uniforms: "+Math.ceil(a.patch.cgl.profileData.profileUniformCount/d)+" mvp_uni_mat4: "+Math.ceil(a.patch.cgl.profileData.profileMVPMatrixCount/d)+" num glPrimitives: "+Math.ceil(a.patch.cgl.profileData.profileMeshNumElements/d)+" fenced pixelread: "+Math.ceil(a.patch.cgl.profileData.profileFencedPixelRead)+" mesh.setGeom: "+a.patch.cgl.profileData.profileMeshSetGeom+" videos: "+a.patch.cgl.profileData.profileVideosPlaying+" tex preview: "+a.patch.cgl.profileData.profileTexPreviews;i.innerHTML+=" draw meshes: "+Math.ceil(a.patch.cgl.profileData.profileMeshDraw/d)+" framebuffer blit: "+Math.ceil(a.patch.cgl.profileData.profileFramebuffer/d)+" texeffect blit: "+Math.ceil(a.patch.cgl.profileData.profileTextureEffect/d);i.innerHTML+=" all shader compiletime: "+Math.round(a.patch.cgl.profileData.shaderCompileTime*100)/100}a.patch.cgl.profileData.clear()}function ne(e){e.style.padding="0px";e.style.margin="0px"}function re(t,e,n,r){const i=20;t.usedAvg=t.usedAvg||t.used;if(!t.ele||I){const a=document.createElement("div");t.ele=a;if(t.childs&&t.childs.length>0)a.style.height="500px";else a.style.height=i+"px";a.style.overflow="hidden";a.style.display="inline-block";if(!t.isRoot){a.innerHTML='<div style="min-height:'+i+'px;width:100%;overflow:hidden;color:black;position:relative">&nbsp;'+t.name+"</div>";a.style["background-color"]="rgb("+t.colR+","+t.colG+","+t.colB+")";a.style["border-left"]="1px solid black"}e.appendChild(a)}if(!t.isRoot){if(performance.now()-t.lastTime>200){t.ele.style.display="none";t.hidden=true}else{if(t.hidden){t.ele.style.display="inline-block";t.hidden=false}}t.ele.style.float="left";t.ele.style.width=Math.floor(t.usedAvg/n*98)+"%"}else{t.ele.style.width="100%";t.ele.style.clear="both";t.ele.style.float="none"}if(t&&t.childs&&t.childs.length>0){let e=0;for(var o=0;o<t.childs.length;o++){t.childs[o].usedAvg=(t.childs[o].usedAvg||t.childs[o].used)*.95+t.childs[o].used*.05;e+=t.childs[o].usedAvg}for(var o=0;o<t.childs.length;o++){re(t.childs[o],t.ele,e,r+1)}}}function ie(t){for(let e=0;e<t.childs.length;e++)ie(t.childs[e]);t.childs.length=0}function oe(){if(!CGL.performanceMeasures)return;if(!o){a.log("create measure ele");o=document.createElement("div");o.style.width="100%";o.style["background-color"]="#444";o.style.bottom="10px";o.style.height="100px";o.style.opacity="1";o.style.position="absolute";o.style["z-index"]="99999";o.innerHTML="";N.appendChild(o)}let t=0;const n=CGL.performanceMeasures[0];for(let e=0;e<n.childs.length;e++)t+=n.childs[e].used;re(CGL.performanceMeasures[0],o,t,0);n.childs.length=0;ie(CGL.performanceMeasures[0]);CGL.performanceMeasures.length=0;I=false}e.onTriggered=ae;function ae(){const e=performance.now();h++;if(q&&D.get()&&s.get())a.patch.cgl.profileData.doProfileGlQuery=true;else a.patch.cgl.profileData.doProfileGlQuery=false;if(f===0)f=Date.now();if(Date.now()-f>=1e3){d=h;h=0;z.set(d);if(s.get())te();f=Date.now()}const n=a.patch.cgl.profileData.glQueryData;k=0;if(n){let t=0;for(let e in n){t++;if(n[e].time)k+=n[e].time}}if(s.get()){oe();if(p&&!a.patch.cgl.profileData.pause){b.push(a.patch.cgl.profileData.profileFrameDelta);b.shift();v.push(g);v.shift();O.push(a.patch.cgl.profileData.profileOnAnimFrameOps-a.patch.cgl.profileData.profileMainloopMs);O.shift();y.push(k);y.shift();K()}}V=performance.now();C=performance.now()-e;const t=performance.now();U.setRef(E);l.trigger();const r=performance.now()-t;const i=a.patch.cgl.profileData.profileMainloopMs;const o=a.patch.cgl.profileData.profileOnAnimFrameOps-a.patch.cgl.profileData.profileMainloopMs;if(R.get()){g=g*.9+r*.1;L=L*.5+i*.5;j=j*.5+o*.5}else{g=r;L=i;j=o}a.patch.cgl.profileData.clearGlQuery()}};Ops.Gl.Performance.prototype=new CABLES.Op;CABLES.OPS["9cd2d9de-000f-4a14-bd13-e7d5f057583c"]={f:Ops.Gl.Performance,objName:"Ops.Gl.Performance"};Ops.Vars.VarSetArray_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inArray("Value",null);e.varName=e.inDropDown("Variable",[],"",true);new CABLES.VarSetOpWrapper(e,"array",n,e.varName)};Ops.Vars.VarSetArray_v2.prototype=new CABLES.Op;CABLES.OPS["8088290f-45d4-4312-b4ca-184d34ca4667"]={f:Ops.Vars.VarSetArray_v2,objName:"Ops.Vars.VarSetArray_v2"};Ops.Extension.SocketCluster.SocketClusterTopicInfo=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inObject("Socket",null,"socketcluster"),o=e.inString("Topic","main"),p=e.inInt("Timeout",2e4),h=e.inInt("Soft Timeout",15e3),d=e.inInt("Retain Messages",1),r=e.inTriggerButton("Update"),a=e.inBool("Receive My Data",true),f=e.outArray("Active Clients"),g=e.outObject("Will Time Out"),m=e.outArray("Timed Out Clients"),b=e.outObject("Messages"),v=e.outTrigger("Updated");const O={};const y={};let S={};let C=[];let E=false;const i=()=>{const r=n.get();if(r){const i={};i.boolean=r.subscribe(r.channelName+"/booleans");i.number=r.subscribe(r.channelName+"/numbers");i.string=r.subscribe(r.channelName+"/strings");i.trigger=r.subscribe(r.channelName+"/triggers");i.array=r.subscribe(r.channelName+"/arrays");i.object=r.subscribe(r.channelName+"/objects");Object.keys(i).forEach((n,e)=>{(async()=>{const e=i[n];for await(const t of e){s(r,t,n)}})()})}};const s=(e,t,n)=>{if(a.get()||t.clientId!=e.clientId)if(t.topic==o.get()){if(!O.hasOwnProperty(t.clientId)){O[t.clientId]=[];E=true}const r=Date.now();const i={type:n,timestamp:r,payload:t.payload};O[t.clientId].push(i);y[t.clientId]=Date.now();l(E)}};const l=()=>{let o=E;let a=false;let s=false;let t=false;const l=Date.now();const u=p.get();const c=h.get();Object.keys(y).forEach((t,e)=>{const n=y[t];if(n<=l-u){if(O.hasOwnProperty(t)){delete O[t];C.push(t);o=true}if(S.hasOwnProperty(t)){delete S[t];a=true}delete y[t]}else if(n<=l-c){const r=(l-n)/u;const i={lastMessage:n,timeoutAt:n+u,progress:r};S[t]=i;a=true}else{if(S.hasOwnProperty(t)){delete S[t];a=true}if(C.includes(t)){C=C.filter(e=>{return e!==t});s=true}}});if(d.get()>0){const n=Object.keys(O);for(let e=0;e<n.length;e++){const r=n[e];const i=O[r].length-d.get();for(let e=0;e<i;e++){O[r].shift();t=true}}}let e=false;if(o){f.set(null);f.set(Object.keys(O));e=true;E=false}if(t){b.set(null);b.set(O);e=true}if(a){g.set(null);g.set(S);e=true}if(s){m.set(null);m.set(C);e=true}if(e){v.trigger()}};r.onTriggered=l;n.onChange=i;p.onChange=h.onChange=()=>{if(p.get()<h.get()){e.setUiError("timeout","softtimeout should be smaller than timeout",1)}else{e.setUiError("timeout",null)}};d.onChange=()=>{if(d.get()<1){e.setUiError("retain","unable to give information if retain == 0")}else{e.setUiError("retain",null)}}};Ops.Extension.SocketCluster.SocketClusterTopicInfo.prototype=new CABLES.Op;CABLES.OPS["2836cef3-acc0-4bd2-bc8e-0c5c0cdb3d76"]={f:Ops.Extension.SocketCluster.SocketClusterTopicInfo,objName:"Ops.Extension.SocketCluster.SocketClusterTopicInfo"};Ops.Deprecated.Gl.Matrix.CircleTransform=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("render"),a=e.inValueInt("segments",40),s=e.inValueFloat("radius",1),l=e.inValueSlider("percent",1),u=e.inBool("Absolute",true),c=e.inBool("Flip",false),r=e.inValueBool("Rotate"),i=e.outTrigger("trigger"),o=e.outNumber("index");const p=e.patch.cgl;a.set(40);s.set(1);l.set(1);const h=[];c.onChange=u.onChange=a.onChange=s.onChange=l.onChange=g;let d=true;n.onTriggered=f;function f(){if(d)m();const t=r.get();const n=l.get();for(let e=0;e<h.length;e++){p.pushModelMatrix();mat4.translate(p.mMatrix,p.mMatrix,h[e]);if(t)mat4.rotateZ(p.mMatrix,p.mMatrix,e/h.length*n*CGL.DEG2RAD*-360);o.set(e);i.trigger();p.popModelMatrix()}}function g(){d=true}function m(){h.length=0;let e=0,t=0;let n=a.get();if(n<1)n=1;let r=Math.round(n*l.get());let i=360/Math.round(n);if(!u.get()){r=n;i=360/Math.round(n)*l.get()}const o=c.get();for(e=0;e<r;e++){if(o)t=(360-i*e)*CGL.DEG2RAD;else t=i*e*CGL.DEG2RAD;h.push([Math.sin(t)*s.get(),Math.cos(t)*s.get(),0])}d=false}};Ops.Deprecated.Gl.Matrix.CircleTransform.prototype=new CABLES.Op;CABLES.OPS["4e96d5a2-a1ec-4f83-954d-7c34a9021e9c"]={f:Ops.Deprecated.Gl.Matrix.CircleTransform,objName:"Ops.Deprecated.Gl.Matrix.CircleTransform"};Ops.Gl.Meshes.Circle=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("render"),k=e.inValue("radius",.5),L=e.inValueSlider("innerRadius",0),j=e.inValueInt("segments",40),N=e.inValueSlider("percent",1),B=e.inValue("steps",0),M=e.inValueBool("invertSteps",false),P=e.inSwitch("mapping",["flat","round"]),D=e.inValueBool("Spline",false),r=e.inValueBool("Draw",true),i=e.outTrigger("trigger"),R=e.outObject("geometry",null,"geometry");e.setPortGroup("Size",[k,L]);e.setPortGroup("Display",[N,B,M]);P.set("flat");P.onChange=j.onChange=k.onChange=L.onChange=N.onChange=B.onChange=M.onChange=D.onChange=c;R.ignoreValueSerialize=true;const G=e.patch.cgl;let U=new CGL.Geometry("circle");let z=null;const o=-1;let a=0;let s=null;let V=true;n.onTriggered=l;e.preRender=()=>{l()};function l(){if(!CGL.TextureEffect.checkOpNotInTextureEffect(e))return;if(V)u();s=G.getShader();if(!s)return;a=s.glPrimitive;if(D.get())s.glPrimitive=G.gl.LINE_STRIP;if(r.get())z.render(s);i.trigger();s.glPrimitive=a}function u(){const n=Math.max(3,Math.floor(j.get()));U.clear();const t=[];const r=[];const i=[];const o=[];const a=[];let s=0,l=0;let u=0,c=0;let p=0,h=0;let d=0,f=0;let g=0,m=0;let b=0,v=0;let O=0,y=0;let S=0,C=0;const E=Math.max(0,N.get());const x=[];if(D.get()){let e=0;let t=0;const I=[];for(s=0;s<=n*E;s++){l=360/n*s*CGL.DEG2RAD;S=Math.cos(l)*k.get();C=Math.sin(l)*k.get();y=.5;if(s>0){x.push(e);x.push(t);x.push(0);O=1-(s-1)/n;I.push(O,y)}x.push(S);x.push(C);x.push(0);e=S;t=C}U.setPointVertices(x)}else if(L.get()<=0){for(s=0;s<=n*E;s++){l=360/n*s*CGL.DEG2RAD;S=Math.cos(l)*k.get();C=Math.sin(l)*k.get();if(P.get()=="flat"){O=(Math.cos(l)+1)/2;y=1-(Math.sin(l)+1)/2;b=.5;v=.5}else if(P.get()=="round"){O=1-s/n;y=0;b=O;v=1}t.push([S,C,0],[u,c,0],[0,0,0]);r.push(O,y,p,h,b,v);i.push(0,0,1,0,0,1,0,0,1);o.push(1,0,0,1,0,0,1,0,0);a.push(0,1,0,0,1,0,0,1,0);p=O;h=y;u=S;c=C}U=CGL.Geometry.buildFromFaces(t,"circle");U.vertexNormals=i;U.tangents=o;U.biTangents=a;U.texCoords=r}else{let e=0;const _=n*E;const T=0;for(s=0;s<=_;s++){e++;l=360/n*s*CGL.DEG2RAD;S=Math.cos(l)*k.get();C=Math.sin(l)*k.get();const A=Math.cos(l)*L.get()*k.get();const w=Math.sin(l)*L.get()*k.get();if(P.get()=="round"){O=1-s/n;y=0;b=O;v=1}if(B.get()===0||e%parseInt(B.get(),10)===0&&!M.get()||e%parseInt(B.get(),10)!==0&&M.get()){t.push([S,C,0],[u,c,0],[A,w,0]);t.push([A,w,0],[u,c,0],[d,f,0]);r.push(O,0,p,0,b,1,O,1,p,0,g,1);i.push(0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1);o.push(1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0);a.push(0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0)}g=b;m=v;p=O;h=y;u=S;c=C;d=A;f=w}U=CGL.Geometry.buildFromFaces(t,"circle");U.vertexNormals=i;U.tangents=o;U.biTangents=a;if(P.get()=="flat")U.mapTexCoords2d();else U.texCoords=r}R.set(null);R.set(U);if(U.vertices.length==0)return;if(z)z.dispose();z=null;z=new CGL.Mesh(G,U);V=false}function c(){V=true}e.onDelete=function(){if(z)z.dispose()}};Ops.Gl.Meshes.Circle.prototype=new CABLES.Op;CABLES.OPS["4db917cc-2cef-43f4-83d5-38c4572fe943"]={f:Ops.Gl.Meshes.Circle,objName:"Ops.Gl.Meshes.Circle"};Ops.Array.ArrayGetNumber=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inArray("array"),r=e.inValueInt("index"),i=e.inFloat("Value Invalid Index",0),o=e.outNumber("value"),a=e.outBoolNum("Valid Index",true);n.ignoreValueSerialize=true;r.onChange=n.onChange=s;function s(){if(n.get()){const e=n.get()[r.get()];if(isNaN(e)){o.set(i.get());a.set(false)}else{a.set(true);o.set(parseFloat(e))}}}};Ops.Array.ArrayGetNumber.prototype=new CABLES.Op;CABLES.OPS["d1189078-70cf-437d-9a37-b2ebe89acdaf"]={f:Ops.Array.ArrayGetNumber,objName:"Ops.Array.ArrayGetNumber"};Ops.Array.RandomNumbersArray=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const r=e.inValueInt("numValues",10),i=e.inValueFloat("Min",0),o=e.inValueFloat("Max",1),a=e.inValueFloat("random seed"),s=e.outArray("values",100),l=e.outNumber("Array length"),u=e.inValueBool("Integer",false);s.ignoreValueSerialize=true;e.setPortGroup("Value Range",[i,o]);e.setPortGroup("",[a]);o.onChange=i.onChange=r.onChange=a.onChange=s.onLinkChanged=u.onChange=n;var c=[];n();function n(){Math.randomSeed=a.get();var e=u.get();var t=c.length=Math.abs(parseInt(r.get()))||100;if(!e){for(var n=0;n<t;n++){c[n]=Math.seededRandom()*(o.get()-i.get())+parseFloat(i.get())}}else{for(var n=0;n<t;n++){c[n]=Math.floor(Math.seededRandom()*(o.get()-i.get())+parseFloat(i.get()))}}s.set(null);s.set(c);l.set(t)}};Ops.Array.RandomNumbersArray.prototype=new CABLES.Op;CABLES.OPS["4620a278-2f57-48d9-bbb6-db027adfd14b"]={f:Ops.Array.RandomNumbersArray,objName:"Ops.Array.RandomNumbersArray"};Ops.Deprecated.Gl.Matrix.CircleMovement=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};var n=e.inTrigger("render");var r=e.inValueInt("segments",40);var i=e.inValueFloat("radius",1);var o=e.inValueFloat("mulX",1);var a=e.inValueFloat("mulY",1);var s=e.inValueSlider("percent");var l=e.inValueFloat("offset");var u=e.outTrigger("trigger");var c=e.outValue("index");var p=e.outValue("X");var h=e.outValue("Y");var d=e.inValue("speed",1);var f=CABLES.now()/1e3;var g=e.patch.cgl;var m=new CABLES.Anim;var b=new CABLES.Anim;var v=[];m.loop=true;b.loop=true;r.onChange=O;O();n.onTriggered=function(){g.pushModelMatrix();var e=(CABLES.now()/1e3-f)*d.get()+Math.round(r.get())*.1*s.get();var t=m.getValue(e+l.get())*o.get()*i.get();var n=b.getValue(e+l.get())*a.get()*i.get();p.set(t);h.set(n);mat4.translate(g.mMatrix,g.mMatrix,[t,n,0]);u.trigger();g.popModelMatrix()};function O(){v.length=0;var e=0,t=0;m.clear();b.clear();for(e=0;e<=Math.round(r.get());e++){c.set(e);t=360/Math.round(r.get())*e*CGL.DEG2RAD;m.setValue(e*.1,Math.cos(t));b.setValue(e*.1,Math.sin(t))}}};Ops.Deprecated.Gl.Matrix.CircleMovement.prototype=new CABLES.Op;CABLES.OPS["0dfae74d-cb5b-4214-b7da-bb42204041ba"]={f:Ops.Deprecated.Gl.Matrix.CircleMovement,objName:"Ops.Deprecated.Gl.Matrix.CircleMovement"};Ops.Gl.Shader.BasicMaterial=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={shader_frag:"{{MODULES_HEAD}}\n\nIN vec2 texCoord;\n#ifdef HAS_TEXTURES\n    IN vec2 texCoordOrig;\n    #ifdef HAS_TEXTURE_DIFFUSE\n        UNI sampler2D tex;\n    #endif\n    #ifdef HAS_TEXTURE_OPACITY\n        UNI sampler2D texOpacity;\n   #endif\n#endif\nUNI float r;\nUNI float g;\nUNI float b;\nUNI float a;\n\nvoid main()\n{\n    {{MODULE_BEGIN_FRAG}}\n    vec4 col=vec4(r,g,b,a);\n\n    #ifdef HAS_TEXTURES\n        #ifdef HAS_TEXTURE_DIFFUSE\n\n           col=texture(tex,vec2(texCoord.x,(1.0-texCoord.y)));\n\n           #ifdef COLORIZE_TEXTURE\n               col.r*=r;\n               col.g*=g;\n               col.b*=b;\n           #endif\n        #endif\n\n        col.a*=a;\n        #ifdef HAS_TEXTURE_OPACITY\n            #ifdef TRANSFORMALPHATEXCOORDS\n                col.a*=texture(texOpacity,vec2(texCoordOrig.s,1.0-texCoordOrig.t)).g;\n            #endif\n            #ifndef TRANSFORMALPHATEXCOORDS\n                col.a*=texture(texOpacity,vec2(texCoord.s,1.0-texCoord.t)).g;\n            #endif\n       #endif\n\n    #endif\n\n    {{MODULE_COLOR}}\n\n    outColor = col;\n\n\n}\n",shader_vert:"{{MODULES_HEAD}}\n\nIN vec3 vPosition;\nIN vec3 attrVertNormal;\nIN vec2 attrTexCoord;\n\nOUT vec3 norm;\nOUT vec2 texCoord;\nOUT vec2 texCoordOrig;\n\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\n#ifdef HAS_TEXTURES\n    #ifdef TEXTURE_REPEAT\n        UNI float diffuseRepeatX;\n        UNI float diffuseRepeatY;\n        UNI float texOffsetX;\n        UNI float texOffsetY;\n    #endif\n#endif\n\n\nvoid main()\n{\n    mat4 mMatrix=modelMatrix;\n    mat4 mvMatrix;\n\n    texCoordOrig=attrTexCoord;\n    texCoord=attrTexCoord;\n    #ifdef HAS_TEXTURES\n        #ifdef TEXTURE_REPEAT\n            texCoord.x=texCoord.x*diffuseRepeatX+texOffsetX;\n            texCoord.y=texCoord.y*diffuseRepeatY+texOffsetY;\n        #endif\n    #endif\n\n    vec4 pos = vec4( vPosition, 1. );\n\n\n    #ifdef BILLBOARD\n       vec3 position=vPosition;\n       mvMatrix=viewMatrix*modelMatrix;\n\n       gl_Position = projMatrix * mvMatrix * vec4((\n           position.x * vec3(\n               mvMatrix[0][0],\n               mvMatrix[1][0],\n               mvMatrix[2][0] ) +\n           position.y * vec3(\n               mvMatrix[0][1],\n               mvMatrix[1][1],\n               mvMatrix[2][1]) ), 1.0);\n    #endif\n\n    {{MODULE_VERTEX_POSITION}}\n\n    #ifndef BILLBOARD\n        mvMatrix=viewMatrix * mMatrix;\n    #endif\n\n\n    #ifndef BILLBOARD\n        // gl_Position = projMatrix * viewMatrix * modelMatrix * pos;\n        gl_Position = projMatrix * mvMatrix * pos;\n    #endif\n}\n"};const n=e.inTrigger("render"),r=e.outTrigger("trigger"),i=e.outObject("shader");i.ignoreValueSerialize=true;const o=e.patch.cgl;var a=new CGL.Shader(o,"BasicMaterial");a.setModules(["MODULE_VERTEX_POSITION","MODULE_COLOR","MODULE_BEGIN_FRAG"]);a.bindTextures=u;a.setSource(t.shader_vert,t.shader_frag);i.set(a);n.onTriggered=c;var s=null;var l=null;function u(){if(p.get())o.setTexture(0,p.get().tex);if(s.get())o.setTexture(1,s.get().tex)}e.preRender=function(){a.bind();c()};function c(){if(!a)return;o.pushShader(a);a.bindTextures();r.trigger();o.popShader()}{const x=e.inValueSlider("r",Math.random()),I=e.inValueSlider("g",Math.random()),_=e.inValueSlider("b",Math.random()),T=e.inValueSlider("a",1);x.setUiAttribs({colorPick:true});T.uniform=new CGL.Uniform(a,"f","a",T);_.uniform=new CGL.Uniform(a,"f","b",_);x.uniform=new CGL.Uniform(a,"f","r",x);I.uniform=new CGL.Uniform(a,"f","g",I);e.setPortGroup("Color",[x,I,_,T])}{var p=e.inTexture("texture");var h=null;a.bindTextures=u;p.onChange=function(){if(p.get()){if(!a.hasDefine("HAS_TEXTURE_DIFFUSE"))a.define("HAS_TEXTURE_DIFFUSE");if(!h)h=new CGL.Uniform(a,"t","texDiffuse",0);g()}else{a.removeUniform("texDiffuse");a.removeDefine("HAS_TEXTURE_DIFFUSE");h=null}}}{s=e.inTexture("textureOpacity");s.onChange=function(){if(s.get()){if(l!==null)return;a.removeUniform("texOpacity");a.define("HAS_TEXTURE_OPACITY");if(!l)l=new CGL.Uniform(a,"t","texOpacity",1)}else{a.removeUniform("texOpacity");a.removeDefine("HAS_TEXTURE_OPACITY");l=null}}}e.colorizeTexture=e.inValueBool("colorizeTexture");e.colorizeTexture.set(false);e.colorizeTexture.onChange=function(){if(e.colorizeTexture.get())a.define("COLORIZE_TEXTURE");else a.removeDefine("COLORIZE_TEXTURE")};e.doBillboard=e.inValueBool("billboard");e.doBillboard.set(false);e.doBillboard.onChange=function(){if(e.doBillboard.get())a.define("BILLBOARD");else a.removeDefine("BILLBOARD")};var d=e.inValueBool("Opacity TexCoords Transform",false);d.onChange=function(){if(d.get())a.define("TRANSFORMALPHATEXCOORDS");else a.removeDefine("TRANSFORMALPHATEXCOORDS")};var f=e.inValueBool("preMultiplied alpha");function g(){if(!y){y=new CGL.Uniform(a,"f","diffuseRepeatX",m);S=new CGL.Uniform(a,"f","diffuseRepeatY",b);C=new CGL.Uniform(a,"f","texOffsetX",v);E=new CGL.Uniform(a,"f","texOffsetY",O)}y.setValue(m.get());S.setValue(b.get());C.setValue(v.get());E.setValue(O.get())}{var m=e.inValueFloat("diffuseRepeatX",1);var b=e.inValueFloat("diffuseRepeatY",1);var v=e.inValueFloat("Tex Offset X");var O=e.inValueFloat("Tex Offset Y");e.setPortGroup("Transform Texture",[m,b,v,O]);m.onChange=g;b.onChange=g;O.onChange=g;v.onChange=g;var y=null;var S=null;var C=null;var E=null;a.define("TEXTURE_REPEAT");v.set(0);O.set(0);m.set(1);b.set(1)}g()};Ops.Gl.Shader.BasicMaterial.prototype=new CABLES.Op;CABLES.OPS["85ae5cfa-5eca-4dd8-8b30-850ac34f7cd5"]={f:Ops.Gl.Shader.BasicMaterial,objName:"Ops.Gl.Shader.BasicMaterial"};Ops.Deprecated.Anim.RelativeTime=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("exe"),r=e.inValue("Multiply",1),i=e.outTrigger("Trigger out"),o=e.outNumber("result");n.onTriggered=a;a();function a(){o.set(e.patch.freeTimer.get()*r.get());i.trigger()}};Ops.Deprecated.Anim.RelativeTime.prototype=new CABLES.Op;CABLES.OPS["917df27b-7cc3-465f-986d-bcf5a7e125a7"]={f:Ops.Deprecated.Anim.RelativeTime,objName:"Ops.Deprecated.Anim.RelativeTime"};Ops.Deprecated.Gl.Meshes.Spline=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};var n=e.inTrigger("render");var a=e.addInPort(new CABLES.Port(e,"thickness",CABLES.OP_PORT_TYPE_VALUE));var s=e.addInPort(new CABLES.Port(e,"subDivs",CABLES.OP_PORT_TYPE_VALUE));var l=e.addInPort(new CABLES.Port(e,"Bezier",CABLES.OP_PORT_TYPE_VALUE,{display:"bool"}));var u=e.addInPort(new CABLES.Port(e,"centerpoint",CABLES.OP_PORT_TYPE_VALUE,{display:"bool"}));var c=e.addInPort(new CABLES.Port(e,"Closed",CABLES.OP_PORT_TYPE_VALUE,{display:"bool"}));var p=e.addInPort(new CABLES.Port(e,"Draw",CABLES.OP_PORT_TYPE_VALUE,{display:"bool"}));var i=e.outTrigger("trigger");var o=e.addOutPort(new CABLES.Port(e,"triggerPoints",CABLES.OP_PORT_TYPE_FUNCTION));var h=e.addOutPort(new CABLES.Port(e,"Points",CABLES.OP_PORT_TYPE_ARRAY));p.set(true);u.set(false);a.set(1);h.ignoreValueSerialize=true;var d=[];var f=null;var g=0;var m=e.patch.cgl;var b=new CGL.Geometry("spline");var v=[];var O=null;n.onTriggered=function(){if(m.frameStore.SplinePoints)O=m.frameStore.SplinePoints;v.length=0;m.frameStore.SplinePoints=v;var e=m.getShader();i.trigger();if(!e)return;S();m.pushModelMatrix();mat4.identity(m.mvMatrix);if(p.get()&&f){var t=e.glPrimitive;if(u.get())e.glPrimitive=m.gl.LINES;e.glPrimitive=m.gl.LINE_STRIP;m.gl.lineWidth(a.get());f.render(e);e.glPrimitive=t}if(o.isLinked()){for(var n=0;n<m.frameStore.SplinePoints.length;n+=3){var r=[0,0,0];vec3.set(r,m.frameStore.SplinePoints[n+0],m.frameStore.SplinePoints[n+1],m.frameStore.SplinePoints[n+2]);m.pushModelMatrix();mat4.translate(m.mvMatrix,m.mvMatrix,r);o.trigger();m.popModelMatrix()}}h.set(null);h.set(d);m.popModelMatrix();v.length=0;if(O)m.frameStore.SplinePoints=O;O=null};function y(e,t,n,r){var i=e*(1-r)*(1-r)+2*t*(1-r)*r+n*r*r;return i}function S(){var e=0,t=0,n=0;var r=s.get();if(!m.frameStore.SplinePoints||m.frameStore.SplinePoints.length===0)return;d.length=0;if(c.get()){m.frameStore.SplinePoints.push(m.frameStore.SplinePoints[0]);m.frameStore.SplinePoints.push(m.frameStore.SplinePoints[1]);m.frameStore.SplinePoints.push(m.frameStore.SplinePoints[2])}if(u.get()){for(e=0;e<m.frameStore.SplinePoints.length;e+=3){d.push(m.frameStore.SplinePoints[0]);d.push(m.frameStore.SplinePoints[1]);d.push(m.frameStore.SplinePoints[2]);d.push(m.frameStore.SplinePoints[e+0]);d.push(m.frameStore.SplinePoints[e+1]);d.push(m.frameStore.SplinePoints[e+2])}}else if(r>0&&!l.get()){d.length=(m.frameStore.SplinePoints.length-3)*r;var i=0;for(e=0;e<m.frameStore.SplinePoints.length-3;e+=3){for(n=0;n<r;n++){for(t=0;t<3;t++){d[i]=m.frameStore.SplinePoints[e+t]+(m.frameStore.SplinePoints[e+t+3]-m.frameStore.SplinePoints[e+t])*n/r;i++}}}}else if(r>0&&l.get()){d.length=(m.frameStore.SplinePoints.length-3)*r;var i=0;for(e=3;e<m.frameStore.SplinePoints.length-6;e+=3){for(n=0;n<r;n++){for(t=0;t<3;t++){var o=y((m.frameStore.SplinePoints[e+t-3]+m.frameStore.SplinePoints[e+t])/2,m.frameStore.SplinePoints[e+t+0],(m.frameStore.SplinePoints[e+t+3]+m.frameStore.SplinePoints[e+t+0])/2,n/r);d[i]=o;i++}}}}else{d=m.frameStore.SplinePoints.slice()}if(a.get()<1)a.set(1);if(!d||d.length===0){}if(p.get()){b.clear();b.vertices=d;if(g!=b.vertices.length){g=b.vertices.length;b.verticesIndices.length=b.vertices.length;for(e=0;e<b.vertices.length;e+=3){b.texCoords[e*2+0]=0;b.texCoords[e*2+1]=0;b.verticesIndices[e/3]=e/3}}if(!f)f=new CGL.Mesh(m,b);else f.setGeom(b)}}S()};Ops.Deprecated.Gl.Meshes.Spline.prototype=new CABLES.Op;CABLES.OPS["93e45490-d5ec-421a-8f3e-d3c76a220b74"]={f:Ops.Deprecated.Gl.Meshes.Spline,objName:"Ops.Deprecated.Gl.Meshes.Spline"};Ops.Deprecated.Ops.Gl.Meshes.SplinePoint=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};e.name="SplinePoint";var n=e.inTrigger("render");var r=e.outTrigger("trigger");var i=e.patch.cgl;n.onTriggered=function(){if(!i.frameStore.SplinePoints)return;var e=[0,0,0];vec3.transformMat4(e,[0,0,0],i.mvMatrix);i.frameStore.SplinePoints.push(e[0]);i.frameStore.SplinePoints.push(e[1]);i.frameStore.SplinePoints.push(e[2]);r.trigger()}};Ops.Deprecated.Ops.Gl.Meshes.SplinePoint.prototype=new CABLES.Op;CABLES.OPS["274ada02-9fe1-42cc-b847-24b4ba02cf75"]={f:Ops.Deprecated.Ops.Gl.Meshes.SplinePoint,objName:"Ops.Deprecated.Ops.Gl.Meshes.SplinePoint"};Ops.Trigger.NthTrigger=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};var n=e.inTriggerButton("Exe");var r=e.inValue("Nth");var i=e.outTrigger("next");var o=0;var a=-1;r.onChange=s;function s(){o=0}n.onTriggered=function(){if(e.patch._frameNum!=a)o=0;a=e.patch._frameNum;if(o==r.get()){i.trigger();o=0}o++}};Ops.Trigger.NthTrigger.prototype=new CABLES.Op;CABLES.OPS["c16b1d90-4436-4a7d-91b8-4199f491dfa9"]={f:Ops.Trigger.NthTrigger,objName:"Ops.Trigger.NthTrigger"};Ops.Math.Modulo=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValueFloat("number1",1),r=e.inValueFloat("number2",2),i=e.inValueBool("pingpong"),o=e.outNumber("result");let a=l;n.onChange=r.onChange=s;i.onChange=c;s();function s(){let e=r.get();let t=n.get();o.set(a(t,e))}function l(e,t){let n=(e%t+t)%t;if(n!=n)n=0;return n}function u(e,t){let n=2*t;e%=n;if(e>=t)return n-e;else return e}function c(){if(i.get())a=u;else a=l}};Ops.Math.Modulo.prototype=new CABLES.Op;CABLES.OPS["ebc13b25-3705-4265-8f06-5f985b6a7bb1"]={f:Ops.Math.Modulo,objName:"Ops.Math.Modulo"};Ops.Deprecated.Trigger.Sequence=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("exe");var r=[];var i=[];var o=function(){for(var e=0;e<i.length;e++)i[e].trigger()};n.onTriggered=o;var a=16;for(var s=0;s<a;s++){i.push(e.addOutPort(new CABLES.Port(e,"trigger "+s,CABLES.OP_PORT_TYPE_FUNCTION)));if(s<a-1){var l=e.addInPort(new CABLES.Port(e,"exe "+s,CABLES.OP_PORT_TYPE_FUNCTION));l.onTriggered=o;r.push(l)}}};Ops.Deprecated.Trigger.Sequence.prototype=new CABLES.Op;CABLES.OPS["641934f6-5143-4a6b-b592-08ab26e2cab0"]={f:Ops.Deprecated.Trigger.Sequence,objName:"Ops.Deprecated.Trigger.Sequence"};Ops.Gl.Matrix.TransformMul=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inTrigger("render");const r=e.inValueFloat("mul");const i=e.outTrigger("trigger");const o=e.patch.cgl;n.onTriggered=function(){var e=[0,0,0];vec3.transformMat4(e,[0,0,0],o.mMatrix);o.pushModelMatrix();vec3.mul(e,e,[r.get(),r.get(),r.get()]);mat4.translate(o.mMatrix,o.mMatrix,e);i.trigger();o.popModelMatrix()}};Ops.Gl.Matrix.TransformMul.prototype=new CABLES.Op;CABLES.OPS["2a83f565-7c5c-4cce-862f-d38481eb3726"]={f:Ops.Gl.Matrix.TransformMul,objName:"Ops.Gl.Matrix.TransformMul"};Ops.Deprecated.Gl.Depth=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};var n=e.patch.cgl;var r=e.inTrigger("render");var i=e.outTrigger("trigger");var o=e.addInPort(new CABLES.Port(e,"clear depth",CABLES.OP_PORT_TYPE_VALUE,{display:"bool"}));var a=e.addInPort(new CABLES.Port(e,"enable depth testing",CABLES.OP_PORT_TYPE_VALUE,{display:"bool"}));var s=e.addInPort(new CABLES.Port(e,"write to depth buffer",CABLES.OP_PORT_TYPE_VALUE,{display:"bool"}));var l=e.addInPort(new CABLES.Port(e,"ratio",CABLES.OP_PORT_TYPE_VALUE,{display:"dropdown",values:["never","always","less","less or equal","greater","greater or equal","equal","not equal"]}));var u=n.gl.LEQUAL;l.onChange=c;l.set("less or equal");o.set(false);a.set(true);s.set(true);function c(){if(l.get()=="never")u=n.gl.NEVER;if(l.get()=="always")u=n.gl.ALWAYS;if(l.get()=="less")u=n.gl.LESS;if(l.get()=="less or equal")u=n.gl.LEQUAL;if(l.get()=="greater")u=n.gl.GREATER;if(l.get()=="greater or equal")u=n.gl.GEQUAL;if(l.get()=="equal")u=n.gl.EQUAL;if(l.get()=="not equal")u=n.gl.NOTEQUAL}r.onTriggered=function(){if(o.get())n.gl.clear(n.gl.DEPTH_BUFFER_BIT);if(!a.get())n.gl.disable(n.gl.DEPTH_TEST);else n.gl.enable(n.gl.DEPTH_TEST);if(!s.get())n.gl.depthMask(false);else n.gl.depthMask(true);n.gl.depthFunc(u);i.trigger();n.gl.enable(n.gl.DEPTH_TEST);n.gl.depthMask(true);n.gl.depthFunc(n.gl.LEQUAL)}};Ops.Deprecated.Gl.Depth.prototype=new CABLES.Op;CABLES.OPS["4aff5f97-ec90-42d3-9856-b2bed578d9de"]={f:Ops.Deprecated.Gl.Depth,objName:"Ops.Deprecated.Gl.Depth"};Ops.Gl.Matrix.OrbitControls_v2=function(){CABLES.Op.apply(this,arguments);const i=this;const P=i.attachments={};const D=i.inTrigger("render"),o=i.inValueFloat("min distance",1),a=i.inValueFloat("max distance",999999),s=i.inValue("min rot y",0),l=i.inValue("max rot y",0),t=i.inValue("initial radius",2),n=i.inValueSlider("initial axis y",.5),r=i.inValueSlider("initial axis x",.25),e=i.inValueSlider("Smoothness",1),R=i.inValue("Speed X",1),G=i.inValue("Speed Y",1),U=i.inValueBool("Active",true),z=i.inValueBool("Allow Panning",true),V=i.inValueBool("Allow Zooming",true),F=i.inValueBool("Allow Rotation",true),H=i.inValueBool("restricted",true),Y=i.inBool("Identity",true),Z=i.inTriggerButton("Reset"),W=i.outTrigger("trigger"),X=i.outNumber("radius"),q=i.outNumber("Rot X"),J=i.outNumber("Rot Y");i.setPortGroup("Initial Values",[n,r,t]);i.setPortGroup("Interaction",[e,R,G]);i.setPortGroup("Boundaries",[s,l,o,a]);const Q=Math.PI;const u=Math.PI*2;const c=vec3.create(),p=vec3.create(),h=mat4.create(),$=mat4.create(),d=vec3.create(),K=vec3.create(),f=vec3.create(),g=vec3.create(),m=vec3.create(),b=vec3.create();let v=vec3.create(),O=false,y=5,S=0,C=0,E=0,x=0,I=0,_=0,ee=1,T=null,te=true,ne=[0,0,0,0,0,0],A=0;i.onDelete=M;e.onChange=ie;t.onChange=Z.onTriggered=re;v=k(0);vec3.set(p,0,0,0);vec3.set(c,0,1,0);ie();function re(){let e=0;if(I%u<-Q){e=-u;I%=-u}else if(I%u>Q){e=u;I%=u}else I%=u;_%=Math.PI;vec3.set(d,0,0,0);vec3.set(p,0,0,0);vec3.set(c,0,1,0);E=r.get()*Math.PI*2+e;x=n.get()-.5;y=t.get();v=k(x)}function ie(){ee=e.get()*10+1}function w(e,t){if(te)return t;return e+(t-e)/ee}D.onTriggered=function(){const e=i.patch.cg;if(!T){he(e.canvas);B()}e.pushViewMatrix();I=w(I,E);_=w(_,x);let t=(_+.5)*180;if(s.get()!==0&&t<s.get()){t=s.get();_=A}else if(l.get()!==0&&t>l.get()){t=l.get();_=A}else{A=_}const n=I*CGL.RAD2DEG;J.set(t);q.set(n);oe(v,_);vec3.add(f,v,d);vec3.add(m,p,d);g[0]=w(g[0],f[0]);g[1]=w(g[1],f[1]);g[2]=w(g[2],f[2]);b[0]=w(b[0],m[0]);b[1]=w(b[1],m[1]);b[2]=w(b[2],m[2]);const r=vec3.create();if(Y.get())mat4.identity(e.vMatrix);mat4.lookAt(h,g,b,c);mat4.rotate(h,h,I,c);mat4.multiply(e.vMatrix,e.vMatrix,h);W.trigger();e.popViewMatrix();te=false};function oe(e,t){if(y<o.get())y=o.get();if(y>a.get())y=a.get();X.set(y);let n=0,r=0;r=360*t/2*CGL.DEG2RAD;vec3.set(e,Math.cos(r)*y,Math.sin(r)*y,0);return e}function k(e){if(y<o.get())y=o.get();if(y>a.get())y=a.get();X.set(y);let t=0,n=0;const r=vec3.create();n=360*e/2*CGL.DEG2RAD;vec3.set(r,Math.cos(n)*y,Math.sin(n)*y,0);return r}function L(e){if(!O)return;const t=e.clientX;const n=e.clientY;let r=t-S;let i=n-C;r*=R.get();i*=G.get();if(e.buttons==2&&z.get()){d[2]+=r*.01;d[1]+=i*.01}else if(e.buttons==4&&V.get()){y+=i*.05;v=k(x)}else{if(F.get()){E+=r*.003;x+=i*.002;if(H.get()){if(x>.5)x=.5;if(x<-.5)x=-.5}}}S=t;C=n}function j(e){S=e.clientX;C=e.clientY;O=true;try{T.setPointerCapture(e.pointerId)}catch(e){}}function N(e){O=false;try{T.releasePointerCapture(e.pointerId)}catch(e){}}function ae(){const e=i.patch.cg.canvas;if(document.pointerLockElement===e||document.mozPointerLockElement===e||document.webkitPointerLockElement===e)document.addEventListener("mousemove",L,false)}function se(e){}r.onChange=function(){I=E=r.get()*Math.PI*2};n.onChange=function(){_=x=n.get()-.5;v=k(x)};const le=function(e){if(V.get()){const t=CGL.getWheelSpeed(e)*.06;y+=parseFloat(t)*1.2;v=k(x)}};const ue=function(e){if(e.touches&&e.touches.length>0)j(e.touches[0])};const ce=function(e){N()};const pe=function(e){if(e.touches&&e.touches.length>0)L(e.touches[0])};U.onChange=function(){if(U.get())B();else M()};function he(e){M();T=e;B()}function B(){if(!T)return;T.addEventListener("pointermove",L);T.addEventListener("pointerdown",j);T.addEventListener("pointerup",N);T.addEventListener("pointerleave",N);T.addEventListener("pointerenter",se);T.addEventListener("contextmenu",function(e){e.preventDefault()});T.addEventListener("wheel",le,{passive:true})}function M(){if(!T)return;T.removeEventListener("pointermove",L);T.removeEventListener("pointerdown",j);T.removeEventListener("pointerup",N);T.removeEventListener("pointerleave",N);T.removeEventListener("pointerenter",N);T.removeEventListener("wheel",le)}};Ops.Gl.Matrix.OrbitControls_v2.prototype=new CABLES.Op;CABLES.OPS["efd09072-3dff-4be8-97b9-d8222ed967db"]={f:Ops.Gl.Matrix.OrbitControls_v2,objName:"Ops.Gl.Matrix.OrbitControls_v2"};Ops.Html.DivElement_v3=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inString("Text","Hello Div"),r=e.inString("Id"),i=e.inString("Class"),o=e.inStringEditor("Style","position:absolute;\nz-index:100;","inline-css"),a=e.inValueBool("Interactive",false),s=e.inValueBool("Visible",true),l=e.inValueBool("Convert Line Breaks",false),u=e.inValueBool("Propagate Click-Events",true),c=e.outObject("DOM Element",null,"element"),p=e.outBoolNum("Hover"),h=e.outTrigger("Clicked");let d=null;let f=null;let g="block";let m=null;const b=e.patch.cgl.canvas.parentElement;v();i.onChange=_;l.onChange=n.onChange=C;o.onChange=E;a.onChange=k;s.onChange=S;C();E();N();k();e.onDelete=O;c.onLinkChanged=E;function v(){m=e.patch.getDocument().createElement("div");m.dataset.op=e.id;m.classList.add("cablesEle");if(r.get())m.id=r.get();b.appendChild(m);c.set(m)}function O(){if(m)I();if(m&&m.parentNode)m.parentNode.removeChild(m);f=null;m=null}function y(e){if(!e){m.style.visibility="hidden";g=m.style.display||"inherit";m.style.display="none"}else{if(g=="none")g="inherit";m.style.visibility="visible";m.style.display=g}}function S(){y(s.get())}function C(){let e=n.get();if(f===e)return;f=e;if(e&&l.get())e=e.replace(/(?:\r\n|\r|\n)/g,"<br>");if(m.innerHTML!=e)m.innerHTML=e;c.set(null);c.set(m)}function E(){if(!m)return;m.setAttribute("style",o.get());S();c.set(null);c.set(m);if(!m.parentElement){b.appendChild(m)}N()}let x="";function I(){if(!m)return;const t=(i.get()||"").split(" ");for(let e=0;e<t.length;e++){if(t[e])m.classList.remove(t[e])}x=""}function _(){const t=(i.get()||"").split(" ");const n=(x||"").split(" ");let r=false;for(let e=0;e<n.length;e++){if(n[e]&&t.indexOf(n[e].trim())==-1){r=true;m.classList.remove(n[e])}}for(let e=0;e<t.length;e++){if(t[e]){m.classList.add(t[e].trim())}}x=i.get();N()}function T(e){p.set(true)}function A(e){p.set(false)}function w(e){if(!u.get()){e.stopPropagation()}h.trigger()}function k(){L();if(a.get())j()}r.onChange=function(){m.id=r.get()};function L(){if(d){d.removeEventListener("pointerdown",w);d.removeEventListener("pointerleave",A);d.removeEventListener("pointerenter",T);d=null}}function j(){if(d)L();d=m;if(d){d.addEventListener("pointerdown",w);d.addEventListener("pointerleave",A);d.addEventListener("pointerenter",T)}}e.addEventListener("onEnabledChange",function(e){O();if(e){v();E();_();C();k()}});function N(){if(i.get()&&o.get()){e.setUiError("error","Element uses external and inline CSS",1)}else{e.setUiError("error",null)}}};Ops.Html.DivElement_v3.prototype=new CABLES.Op;CABLES.OPS["d55d398c-e68e-486b-b0ce-d9c4bdf7df05"]={f:Ops.Html.DivElement_v3,objName:"Ops.Html.DivElement_v3"};Ops.Html.InputElement=function(){CABLES.Op.apply(this,arguments);const e=this;const M=e.attachments={};const t=e.inSwitch("Element",["Input","Textarea"],"Input"),i=e.inSwitch("Type",["Text","Number","Password","Date"],"Text"),n=e.inString("Default Value",""),r=e.inString("Placeholder","Type here..."),o=e.inString("Id"),a=e.inString("Class"),s=e.inStringEditor("Style","color:#ccc;\nbackground-color:#222;\nborder:none;\npadding:4px;\n","inline-css"),l=e.inBool("Autocomplete",false),u=e.inInt("Max Length",0),c=e.inValueBool("Interactive",false),p=e.inValueBool("Visible",true),h=e.inTriggerButton("Focus"),d=e.inTriggerButton("Blur"),f=e.inTriggerButton("Clear"),g=e.inTriggerButton("Select"),m=e.outObject("DOM Element",null,"element"),b=e.outString("Value"),v=e.outBoolNum("Hover");let O=null;let y="block";let S=null;const C=e.patch.cgl.canvas.parentElement;E();g.onTriggered=()=>{S.select()};f.onTriggered=()=>{S.value=""};h.onTriggered=()=>{S.focus()};d.onTriggered=()=>{S.blur()};t.onChange=()=>{E();T()};u.onChange=i.onChange=l.onChange=a.onChange=w;r.onChange=n.onChange=_;s.onChange=T;c.onChange=j;p.onChange=I;_();T();B();j();e.onDelete=x;m.onLinkChanged=T;function E(){x();S=document.createElement(t.get().toLowerCase());S.addEventListener("input",()=>{b.set(S.value)});S.dataset.op=e.id;S.classList.add("cablesEle");if(o.get())S.id=o.get();C.appendChild(S);m.set(S)}function x(){if(S)D();if(S&&S.parentNode)S.parentNode.removeChild(S);S=null}function P(e){if(!e){S.style.visibility="hidden";y=S.style.display||"block";S.style.display="none"}else{if(y=="none")y="block";S.style.visibility="visible";S.style.display=y}}function I(){P(p.get())}function _(){let e=n.get();S.setAttribute("placeholder",r.get());S.value=e;b.set(e);m.setRef(S)}function T(){if(!S)return;S.setAttribute("style",s.get());I();m.set(null);m.set(S);if(!S.parentElement){C.appendChild(S)}B()}let A="";function D(){if(!S)return;const t=(a.get()||"").split(" ");for(let e=0;e<t.length;e++){if(t[e])S.classList.remove(t[e])}A=""}function w(){S.setAttribute("tabindex",0);S.setAttribute("maxlength",u.get()||null);S.setAttribute("type",i.get().toLowerCase());if(l.get())S.setAttribute("autocomplete","on");else S.setAttribute("autocomplete","off");const t=(a.get()||"").split(" ");const n=(A||"").split(" ");let r=false;for(let e=0;e<n.length;e++){if(n[e]&&t.indexOf(n[e].trim())==-1){r=true;S.classList.remove(n[e])}}for(let e=0;e<t.length;e++){if(t[e]){S.classList.add(t[e].trim())}}A=a.get();B()}function k(e){v.set(true)}function L(e){v.set(false)}function j(){N();if(c.get())R()}o.onChange=function(){S.id=o.get()};function N(){if(O){O.removeEventListener("pointerleave",L);O.removeEventListener("pointerenter",k);O=null}}function R(){if(O)N();O=S;if(O){O.addEventListener("pointerleave",L);O.addEventListener("pointerenter",k)}}e.addEventListener("onEnabledChange",function(e){x();if(e){E();T();w();_();j()}});function B(){if(a.get()&&s.get()){e.setUiError("error","Element uses external and inline CSS",1)}else{e.setUiError("error",null)}}};Ops.Html.InputElement.prototype=new CABLES.Op;CABLES.OPS["b7e1635c-b5c0-43e1-be03-2f137e6e61ea"]={f:Ops.Html.InputElement,objName:"Ops.Html.InputElement"};Ops.String.SequenceStrings=function(){CABLES.Op.apply(this,arguments);const t=this;const e=t.attachments={};const n=[];const r=[];for(let e=0;e<16;e++){const i=t.inString("String "+e,0);const o=t.outString("Output "+e);i.changeAlways=true;n.push(o);r.push(i)}for(let e=0;e<r.length;e++){const i=r[e];i.onChange=function(){for(let e=0;e<n.length;e++)n[e].set(i.get())}}};Ops.String.SequenceStrings.prototype=new CABLES.Op;CABLES.OPS["ee0459bd-3dc1-4b32-b6c1-01f98d06eebd"]={f:Ops.String.SequenceStrings,objName:"Ops.String.SequenceStrings"};Ops.Math.Compare.GreaterThan=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValueFloat("number1"),r=e.inValueFloat("number2"),i=e.outBoolNum("result");e.setUiAttribs({mathTitle:true});n.onChange=r.onChange=o;function o(){i.set(n.get()>r.get())}};Ops.Math.Compare.GreaterThan.prototype=new CABLES.Op;CABLES.OPS["b250d606-f7f8-44d3-b099-c29efff2608a"]={f:Ops.Math.Compare.GreaterThan,objName:"Ops.Math.Compare.GreaterThan"};Ops.String.StringLength_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inString("String"),r=e.outNumber("Result");n.onChange=function(){if(!n.get())r.set(0);else r.set(String(n.get()).length)}};Ops.String.StringLength_v2.prototype=new CABLES.Op;CABLES.OPS["aa47bb8b-d5d7-4175-b217-ab0157d3365d"]={f:Ops.String.StringLength_v2,objName:"Ops.String.StringLength_v2"};Ops.Vars.VarSetNumber_v2=function(){CABLES.Op.apply(this,arguments);const e=this;const t=e.attachments={};const n=e.inValueFloat("Value",0);e.varName=e.inDropDown("Variable",[],"",true);new CABLES.VarSetOpWrapper(e,"number",n,e.varName)};Ops.Vars.VarSetNumber_v2.prototype=new CABLES.Op;CABLES.OPS["b5249226-6095-4828-8a1c-080654e192fa"]={f:Ops.Vars.VarSetNumber_v2,objName:"Ops.Vars.VarSetNumber_v2"};window.addEventListener("load",function(e){CABLES.jsLoaded=new Event("CABLES.jsLoaded");document.dispatchEvent(CABLES.jsLoaded)});(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.socketClusterClient=e()}})(function(){var e,t,n;return function(){function c(o,a,s){function l(n,e){if(!a[n]){if(!o[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(u)return u(n,!0);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}var i=a[n]={exports:{}};o[n][0].call(i.exports,function(e){var t=o[n][1][e];return l(t||e)},i,i.exports,c,o,a,s)}return a[n].exports}for(var u="function"==typeof require&&require,e=0;e<s.length;e++)l(s[e]);return l}return c}()({1:[function(e,t,n){(function(r){function e(){this._internalStorage={};this.isLocalStorageEnabled=this._checkLocalStorageEnabled()}e.prototype._checkLocalStorageEnabled=function(){let t;try{r.localStorage;r.localStorage.setItem("__scLocalStorageTest",1);r.localStorage.removeItem("__scLocalStorageTest")}catch(e){t=e}return!t};e.prototype.saveToken=function(e,t,n){if(this.isLocalStorageEnabled&&r.localStorage){r.localStorage.setItem(e,t)}else{this._internalStorage[e]=t}return Promise.resolve(t)};e.prototype.removeToken=function(e){let t=this.loadToken(e);if(this.isLocalStorageEnabled&&r.localStorage){r.localStorage.removeItem(e)}else{delete this._internalStorage[e]}return t};e.prototype.loadToken=function(e){let t;if(this.isLocalStorageEnabled&&r.localStorage){t=r.localStorage.getItem(e)}else{t=this._internalStorage[e]||null}return Promise.resolve(t)};t.exports=e}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],2:[function(S,C,e){(function(o){const a=S("stream-demux");const s=S("async-stream-emitter");const l=S("ag-channel");const u=S("./auth");const c=S("sc-formatter");const t=S("./transport");const p=S("querystring");const h=S("linked-list");const d=S("clone-deep");const n=S("buffer/").Buffer;const r=S("./wait");const i=S("sc-errors");const f=i.InvalidArgumentsError;const g=i.InvalidMessageError;const e=i.InvalidActionError;const m=i.SocketProtocolError;const b=i.TimeoutError;const v=i.BadConnectionError;const O=typeof window!=="undefined";function y(e){s.call(this);let t={path:"/socketcluster/",secure:false,protocolScheme:null,socketPath:null,autoConnect:true,autoReconnect:true,autoSubscribeOnConnect:true,connectTimeout:2e4,ackTimeout:1e4,timestampRequests:false,timestampParam:"t",authTokenName:"socketcluster.authToken",binaryType:"arraybuffer",batchOnHandshake:false,batchOnHandshakeDuration:100,batchInterval:50,protocolVersion:2,wsOptions:{},cloneData:false};let n=Object.assign(t,e);this.id=null;this.version=n.version||null;this.protocolVersion=n.protocolVersion;this.state=this.CLOSED;this.authState=this.UNAUTHENTICATED;this.signedAuthToken=null;this.authToken=null;this.pendingReconnect=false;this.pendingReconnectTimeout=null;this.preparingPendingSubscriptions=false;this.clientId=n.clientId;this.wsOptions=n.wsOptions;this.connectTimeout=n.connectTimeout;this.ackTimeout=n.ackTimeout;this.channelPrefix=n.channelPrefix||null;this.disconnectOnUnload=n.disconnectOnUnload==null?true:n.disconnectOnUnload;this.authTokenName=n.authTokenName;n.pingTimeout=n.connectTimeout;this.pingTimeout=n.pingTimeout;this.pingTimeoutDisabled=!!n.pingTimeoutDisabled;let r=Math.pow(2,31)-1;let i=e=>{if(this[e]>r){throw new f(`The ${e} value provided exceeded the maximum amount allowed`)}};i("connectTimeout");i("ackTimeout");i("pingTimeout");this.connectAttempts=0;this.isBatching=false;this.batchOnHandshake=n.batchOnHandshake;this.batchOnHandshakeDuration=n.batchOnHandshakeDuration;this._batchingIntervalId=null;this._outboundBuffer=new h;this._channelMap={};this._channelEventDemux=new a;this._channelDataDemux=new a;this._receiverDemux=new a;this._procedureDemux=new a;this.options=n;this._cid=1;this.options.callIdGenerator=()=>{return this._cid++};if(this.options.autoReconnect){if(this.options.autoReconnectOptions==null){this.options.autoReconnectOptions={}}let e=this.options.autoReconnectOptions;if(e.initialDelay==null){e.initialDelay=1e4}if(e.randomness==null){e.randomness=1e4}if(e.multiplier==null){e.multiplier=1.5}if(e.maxDelay==null){e.maxDelay=6e4}}if(this.options.subscriptionRetryOptions==null){this.options.subscriptionRetryOptions={}}if(this.options.authEngine){this.auth=this.options.authEngine}else{this.auth=new u}if(this.options.codecEngine){this.codec=this.options.codecEngine}else{this.codec=c}if(this.options.protocol){let e=new f('The "protocol" option does not affect socketcluster-client - '+'If you want to utilize SSL/TLS, use "secure" option instead');this._onError(e)}this.options.query=n.query||{};if(typeof this.options.query==="string"){this.options.query=p.parse(this.options.query)}if(O&&this.disconnectOnUnload&&o.addEventListener&&o.removeEventListener){this._handleBrowserUnload()}if(this.options.autoConnect){this.connect()}}y.prototype=Object.create(s.prototype);y.CONNECTING=y.prototype.CONNECTING=t.prototype.CONNECTING;y.OPEN=y.prototype.OPEN=t.prototype.OPEN;y.CLOSED=y.prototype.CLOSED=t.prototype.CLOSED;y.AUTHENTICATED=y.prototype.AUTHENTICATED="authenticated";y.UNAUTHENTICATED=y.prototype.UNAUTHENTICATED="unauthenticated";y.SUBSCRIBED=y.prototype.SUBSCRIBED=l.SUBSCRIBED;y.PENDING=y.prototype.PENDING=l.PENDING;y.UNSUBSCRIBED=y.prototype.UNSUBSCRIBED=l.UNSUBSCRIBED;y.ignoreStatuses=i.socketProtocolIgnoreStatuses;y.errorStatuses=i.socketProtocolErrorStatuses;Object.defineProperty(y.prototype,"isBufferingBatch",{get:function(){return this.transport.isBufferingBatch}});y.prototype.getBackpressure=function(){return Math.max(this.getAllListenersBackpressure(),this.getAllReceiversBackpressure(),this.getAllProceduresBackpressure(),this.getAllChannelsBackpressure())};y.prototype._handleBrowserUnload=async function(){let e=()=>{this.disconnect()};let t=false;let n=()=>{if(!t){t=true;o.addEventListener("beforeunload",e,false)}};let r=()=>{if(t){t=false;o.removeEventListener("beforeunload",e,false)}};(async()=>{let t=this.listener("connecting").createConsumer();while(true){let e=await t.next();if(e.done)break;n()}})();(async()=>{let t=this.listener("close").createConsumer();while(true){let e=await t.next();if(e.done)break;r()}})()};y.prototype._setAuthToken=function(e){this._changeToAuthenticatedState(e.token);(async()=>{try{await this.auth.saveToken(this.authTokenName,e.token,{})}catch(e){this._onError(e)}})()};y.prototype._removeAuthToken=function(e){(async()=>{let e;try{e=await this.auth.removeToken(this.authTokenName)}catch(e){this._onError(e);return}this.emit("removeAuthToken",{oldAuthToken:e})})();this._changeToUnauthenticatedStateAndClearTokens()};y.prototype._privateDataHandlerMap={"#publish":function(e){let t=this._undecorateChannelName(e.channel);let n=this.isSubscribed(t,true);if(n){this._channelDataDemux.write(t,e.data)}},"#kickOut":function(e){let t=this._undecorateChannelName(e.channel);let n=this._channelMap[t];if(n){this.emit("kickOut",{channel:t,message:e.message});this._channelEventDemux.write(`${t}/kickOut`,{message:e.message});this._triggerChannelUnsubscribe(n)}},"#setAuthToken":function(e){if(e){this._setAuthToken(e)}},"#removeAuthToken":function(e){this._removeAuthToken(e)}};y.prototype._privateRPCHandlerMap={"#setAuthToken":function(e,t){if(e){this._setAuthToken(e);t.end()}else{t.error(new g("No token data provided by #setAuthToken event"))}},"#removeAuthToken":function(e,t){this._removeAuthToken(e);t.end()}};y.prototype.getState=function(){return this.state};y.prototype.getBytesReceived=function(){return this.transport.getBytesReceived()};y.prototype.deauthenticate=async function(){(async()=>{let e;try{e=await this.auth.removeToken(this.authTokenName)}catch(e){this._onError(e);return}this.emit("removeAuthToken",{oldAuthToken:e})})();if(this.state!==this.CLOSED){this.transmit("#removeAuthToken")}this._changeToUnauthenticatedStateAndClearTokens();await r(0)};y.prototype.connect=function(){if(this.state===this.CLOSED){this.pendingReconnect=false;this.pendingReconnectTimeout=null;clearTimeout(this._reconnectTimeoutRef);this.state=this.CONNECTING;this.emit("connecting",{});if(this.transport){this.transport.clearAllListeners()}let e={onOpen:e=>{this.state=this.OPEN;this._onOpen(e)},onOpenAbort:e=>{if(this.state!==this.CLOSED){this.state=this.CLOSED;this._destroy(e.code,e.reason,true)}},onClose:e=>{if(this.state!==this.CLOSED){this.state=this.CLOSED;this._destroy(e.code,e.reason)}},onEvent:e=>{this.emit(e.event,e.data)},onError:e=>{this._onError(e.error)},onInboundInvoke:e=>{this._onInboundInvoke(e)},onInboundTransmit:e=>{this._onInboundTransmit(e.event,e.data)}};this.transport=new t(this.auth,this.codec,this.options,this.wsOptions,e)}};y.prototype.reconnect=function(e,t){this.disconnect(e,t);this.connect()};y.prototype.disconnect=function(e,t){e=e||1e3;if(typeof e!=="number"){throw new f("If specified, the code argument must be a number")}let n=this.state===this.CONNECTING;if(n||this.state===this.OPEN){this.state=this.CLOSED;this._destroy(e,t,n);this.transport.close(e,t)}else{this.pendingReconnect=false;this.pendingReconnectTimeout=null;clearTimeout(this._reconnectTimeoutRef)}};y.prototype._changeToUnauthenticatedStateAndClearTokens=function(){if(this.authState!==this.UNAUTHENTICATED){let e=this.authState;let t=this.authToken;let n=this.signedAuthToken;this.authState=this.UNAUTHENTICATED;this.signedAuthToken=null;this.authToken=null;let r={oldAuthState:e,newAuthState:this.authState};this.emit("authStateChange",r);this.emit("deauthenticate",{oldSignedAuthToken:n,oldAuthToken:t})}};y.prototype._changeToAuthenticatedState=function(n){this.signedAuthToken=n;this.authToken=this._extractAuthTokenData(n);if(this.authState!==this.AUTHENTICATED){let e=this.authState;this.authState=this.AUTHENTICATED;let t={oldAuthState:e,newAuthState:this.authState,signedAuthToken:n,authToken:this.authToken};if(!this.preparingPendingSubscriptions){this.processPendingSubscriptions()}this.emit("authStateChange",t)}this.emit("authenticate",{signedAuthToken:n,authToken:this.authToken})};y.prototype.decodeBase64=function(e){return n.from(e,"base64").toString("utf8")};y.prototype.encodeBase64=function(e){return n.from(e,"utf8").toString("base64")};y.prototype._extractAuthTokenData=function(e){let t=(e||"").split(".");let n=t[1];if(n!=null){let t=n;try{t=this.decodeBase64(t);return JSON.parse(t)}catch(e){return t}}return null};y.prototype.getAuthToken=function(){return this.authToken};y.prototype.getSignedAuthToken=function(){return this.signedAuthToken};y.prototype.authenticate=async function(e){let t;try{t=await this.invoke("#authenticate",e)}catch(e){if(e.name!=="BadConnectionError"&&e.name!=="TimeoutError"){this._changeToUnauthenticatedStateAndClearTokens()}await r(0);throw e}if(t&&t.isAuthenticated!=null){if(t.authError){t.authError=i.hydrateError(t.authError)}}else{t={isAuthenticated:this.authState,authError:null}}if(t.isAuthenticated){this._changeToAuthenticatedState(e)}else{this._changeToUnauthenticatedStateAndClearTokens()}(async()=>{try{await this.auth.saveToken(this.authTokenName,e,{})}catch(e){this._onError(e)}})();await r(0);return t};y.prototype._tryReconnect=function(e){let t=this.connectAttempts++;let n=this.options.autoReconnectOptions;let r;if(e==null||t>0){let e=Math.round(n.initialDelay+(n.randomness||0)*Math.random());r=Math.round(e*Math.pow(n.multiplier,t))}else{r=e}if(r>n.maxDelay){r=n.maxDelay}clearTimeout(this._reconnectTimeoutRef);this.pendingReconnect=true;this.pendingReconnectTimeout=r;this._reconnectTimeoutRef=setTimeout(()=>{this.connect()},r)};y.prototype._onOpen=function(e){if(this.isBatching){this._startBatching()}else if(this.batchOnHandshake){this._startBatching();setTimeout(()=>{if(!this.isBatching){this._stopBatching()}},this.batchOnHandshakeDuration)}this.preparingPendingSubscriptions=true;if(e){this.id=e.id;this.pingTimeout=e.pingTimeout;if(e.isAuthenticated){this._changeToAuthenticatedState(e.authToken)}else{this._changeToUnauthenticatedStateAndClearTokens()}}else{this._changeToUnauthenticatedStateAndClearTokens()}this.connectAttempts=0;if(this.options.autoSubscribeOnConnect){this.processPendingSubscriptions()}this.emit("connect",{...e,processPendingSubscriptions:()=>{this.processPendingSubscriptions()}});if(this.state===this.OPEN){this._flushOutboundBuffer()}};y.prototype._onError=function(e){this.emit("error",{error:e})};y.prototype._suspendSubscriptions=function(){Object.keys(this._channelMap).forEach(e=>{let t=this._channelMap[e];this._triggerChannelUnsubscribe(t,true)})};y.prototype._abortAllPendingEventsDueToBadConnection=function(i){let e=this._outboundBuffer.head;let t;while(e){t=e.next;let n=e.data;clearTimeout(n.timeout);delete n.timeout;e.detach();e=t;let r=n.callback;if(r){delete n.callback;let e=`Event "${n.event}" was aborted due to a bad connection`;let t=new v(e,i);r.call(n,t,n)}if(n.cid){this.transport.cancelPendingResponse(n.cid)}}};y.prototype._destroy=function(n,r,e){this.id=null;this._cancelBatching();if(this.transport){this.transport.clearAllListeners()}this.pendingReconnect=false;this.pendingReconnectTimeout=null;clearTimeout(this._reconnectTimeoutRef);this._suspendSubscriptions();if(e){this.emit("connectAbort",{code:n,reason:r})}else{this.emit("disconnect",{code:n,reason:r})}this.emit("close",{code:n,reason:r});if(!y.ignoreStatuses[n]){let e;if(r){e="Socket connection closed with status code "+n+" and reason: "+r}else{e="Socket connection closed with status code "+n}let t=new m(y.errorStatuses[n]||e,n);this._onError(t)}this._abortAllPendingEventsDueToBadConnection(e?"connectAbort":"disconnect");if(this.options.autoReconnect){if(n===4e3||n===4001||n===1005){this._tryReconnect(0)}else if(n!==1e3&&n<4500){this._tryReconnect()}}};y.prototype._onInboundTransmit=function(e,t){let n=this._privateDataHandlerMap[e];if(n){n.call(this,t)}else{this._receiverDemux.write(e,t)}};y.prototype._onInboundInvoke=function(e){let{procedure:t,data:n}=e;let r=this._privateRPCHandlerMap[t];if(r){r.call(this,n,e)}else{this._procedureDemux.write(t,e)}};y.prototype.decode=function(e){return this.transport.decode(e)};y.prototype.encode=function(e){return this.transport.encode(e)};y.prototype._flushOutboundBuffer=function(){let t=this._outboundBuffer.head;let n;while(t){n=t.next;let e=t.data;t.detach();this.transport.transmitObject(e);t=n}};y.prototype._handleEventAckTimeout=function(t,e){if(e){e.detach()}delete t.timeout;let n=t.callback;if(n){delete t.callback;let e=new b(`Event response for "${t.event}" timed out`);n.call(t,e,t)}if(t.cid){this.transport.cancelPendingResponse(t.cid)}};y.prototype._processOutboundEvent=function(e,t,n,r){n=n||{};if(this.state===this.CLOSED){this.connect()}let i={event:e};let o;if(r){o=new Promise((n,r)=>{i.callback=(e,t)=>{if(e){r(e);return}n(t)}})}else{o=Promise.resolve()}let a=new h.Item;if(this.options.cloneData){i.data=d(t)}else{i.data=t}a.data=i;let s=n.ackTimeout==null?this.ackTimeout:n.ackTimeout;i.timeout=setTimeout(()=>{this._handleEventAckTimeout(i,a)},s);this._outboundBuffer.append(a);if(this.state===this.OPEN){this._flushOutboundBuffer()}return o};y.prototype.send=function(e){this.transport.send(e)};y.prototype.transmit=function(e,t,n){return this._processOutboundEvent(e,t,n)};y.prototype.invoke=function(e,t,n){return this._processOutboundEvent(e,t,n,true)};y.prototype.transmitPublish=function(e,t){let n={channel:this._decorateChannelName(e),data:t};return this.transmit("#publish",n)};y.prototype.invokePublish=function(e,t){let n={channel:this._decorateChannelName(e),data:t};return this.invoke("#publish",n)};y.prototype._triggerChannelSubscribe=function(n,r){let i=n.name;if(n.state!==l.SUBSCRIBED){let e=n.state;n.state=l.SUBSCRIBED;let t={oldChannelState:e,newChannelState:n.state,subscriptionOptions:r};this._channelEventDemux.write(`${i}/subscribeStateChange`,t);this._channelEventDemux.write(`${i}/subscribe`,{subscriptionOptions:r});this.emit("subscribeStateChange",{channel:i,...t});this.emit("subscribe",{channel:i,subscriptionOptions:r})}};y.prototype._triggerChannelSubscribeFail=function(e,t,n){let r=t.name;let i=!t.options.waitForAuth||this.authState===this.AUTHENTICATED;let o=!!this._channelMap[r];if(o&&i){delete this._channelMap[r];this._channelEventDemux.write(`${r}/subscribeFail`,{error:e,subscriptionOptions:n});this.emit("subscribeFail",{error:e,channel:r,subscriptionOptions:n})}};y.prototype._cancelPendingSubscribeCallback=function(e){if(e._pendingSubscriptionCid!=null){this.transport.cancelPendingResponse(e._pendingSubscriptionCid);delete e._pendingSubscriptionCid}};y.prototype._decorateChannelName=function(e){if(this.channelPrefix){e=this.channelPrefix+e}return e};y.prototype._undecorateChannelName=function(e){if(this.channelPrefix&&e.indexOf(this.channelPrefix)===0){return e.replace(this.channelPrefix,"")}return e};y.prototype.startBatch=function(){this.transport.startBatch()};y.prototype.flushBatch=function(){this.transport.flushBatch()};y.prototype.cancelBatch=function(){this.transport.cancelBatch()};y.prototype._startBatching=function(){if(this._batchingIntervalId!=null){return}this.startBatch();this._batchingIntervalId=setInterval(()=>{this.flushBatch();this.startBatch()},this.options.batchInterval)};y.prototype.startBatching=function(){this.isBatching=true;this._startBatching()};y.prototype._stopBatching=function(){if(this._batchingIntervalId!=null){clearInterval(this._batchingIntervalId)}this._batchingIntervalId=null;this.flushBatch()};y.prototype.stopBatching=function(){this.isBatching=false;this._stopBatching()};y.prototype._cancelBatching=function(){if(this._batchingIntervalId!=null){clearInterval(this._batchingIntervalId)}this._batchingIntervalId=null;this.cancelBatch()};y.prototype.cancelBatching=function(){this.isBatching=false;this._cancelBatching()};y.prototype._trySubscribe=function(n){let e=!n.options.waitForAuth||this.authState===this.AUTHENTICATED;if(this.state===this.OPEN&&!this.preparingPendingSubscriptions&&n._pendingSubscriptionCid==null&&e){let e={noTimeout:true};let t={};if(n.options.waitForAuth){e.waitForAuth=true;t.waitForAuth=e.waitForAuth}if(n.options.data){t.data=n.options.data}n._pendingSubscriptionCid=this.transport.invokeRaw("#subscribe",{channel:this._decorateChannelName(n.name),...t},e,e=>{if(e){if(e.name==="BadConnectionError"){return}delete n._pendingSubscriptionCid;this._triggerChannelSubscribeFail(e,n,t)}else{delete n._pendingSubscriptionCid;this._triggerChannelSubscribe(n,t)}});this.emit("subscribeRequest",{channel:n.name,subscriptionOptions:t})}};y.prototype.subscribe=function(e,t){t=t||{};let n=this._channelMap[e];let r={waitForAuth:!!t.waitForAuth};if(t.priority!=null){r.priority=t.priority}if(t.data!==undefined){r.data=t.data}if(!n){n={name:e,state:l.PENDING,options:r};this._channelMap[e]=n;this._trySubscribe(n)}else if(t){n.options=r}let i=new l(e,this,this._channelEventDemux,this._channelDataDemux);return i};y.prototype._triggerChannelUnsubscribe=function(t,n){let r=t.name;this._cancelPendingSubscribeCallback(t);if(t.state===l.SUBSCRIBED){let e={oldChannelState:t.state,newChannelState:n?l.PENDING:l.UNSUBSCRIBED};this._channelEventDemux.write(`${r}/subscribeStateChange`,e);this._channelEventDemux.write(`${r}/unsubscribe`,{});this.emit("subscribeStateChange",{channel:r,...e});this.emit("unsubscribe",{channel:r})}if(n){t.state=l.PENDING}else{delete this._channelMap[r]}};y.prototype._tryUnsubscribe=function(n){if(this.state===this.OPEN){let e={noTimeout:true};this._cancelPendingSubscribeCallback(n);let t=this._decorateChannelName(n.name);this.transport.transmit("#unsubscribe",t,e)}};y.prototype.unsubscribe=function(e){let t=this._channelMap[e];if(t){this._triggerChannelUnsubscribe(t);this._tryUnsubscribe(t)}};y.prototype.receiver=function(e){return this._receiverDemux.stream(e)};y.prototype.closeReceiver=function(e){this._receiverDemux.close(e)};y.prototype.closeAllReceivers=function(){this._receiverDemux.closeAll()};y.prototype.killReceiver=function(e){this._receiverDemux.kill(e)};y.prototype.killAllReceivers=function(){this._receiverDemux.killAll()};y.prototype.killReceiverConsumer=function(e){this._receiverDemux.killConsumer(e)};y.prototype.getReceiverConsumerStats=function(e){return this._receiverDemux.getConsumerStats(e)};y.prototype.getReceiverConsumerStatsList=function(e){return this._receiverDemux.getConsumerStatsList(e)};y.prototype.getAllReceiversConsumerStatsList=function(){return this._receiverDemux.getConsumerStatsListAll()};y.prototype.getReceiverBackpressure=function(e){return this._receiverDemux.getBackpressure(e)};y.prototype.getAllReceiversBackpressure=function(){return this._receiverDemux.getBackpressureAll()};y.prototype.getReceiverConsumerBackpressure=function(e){return this._receiverDemux.getConsumerBackpressure(e)};y.prototype.hasReceiverConsumer=function(e,t){return this._receiverDemux.hasConsumer(e,t)};y.prototype.hasAnyReceiverConsumer=function(e){return this._receiverDemux.hasConsumerAll(e)};y.prototype.procedure=function(e){return this._procedureDemux.stream(e)};y.prototype.closeProcedure=function(e){this._procedureDemux.close(e)};y.prototype.closeAllProcedures=function(){this._procedureDemux.closeAll()};y.prototype.killProcedure=function(e){this._procedureDemux.kill(e)};y.prototype.killAllProcedures=function(){this._procedureDemux.killAll()};y.prototype.killProcedureConsumer=function(e){this._procedureDemux.killConsumer(e)};y.prototype.getProcedureConsumerStats=function(e){return this._procedureDemux.getConsumerStats(e)};y.prototype.getProcedureConsumerStatsList=function(e){return this._procedureDemux.getConsumerStatsList(e)};y.prototype.getAllProceduresConsumerStatsList=function(){return this._procedureDemux.getConsumerStatsListAll()};y.prototype.getProcedureBackpressure=function(e){return this._procedureDemux.getBackpressure(e)};y.prototype.getAllProceduresBackpressure=function(){return this._procedureDemux.getBackpressureAll()};y.prototype.getProcedureConsumerBackpressure=function(e){return this._procedureDemux.getConsumerBackpressure(e)};y.prototype.hasProcedureConsumer=function(e,t){return this._procedureDemux.hasConsumer(e,t)};y.prototype.hasAnyProcedureConsumer=function(e){return this._procedureDemux.hasConsumerAll(e)};y.prototype.channel=function(e){let t=this._channelMap[e];let n=new l(e,this,this._channelEventDemux,this._channelDataDemux);return n};y.prototype.closeChannel=function(e){this.channelCloseOutput(e);this.channelCloseAllListeners(e)};y.prototype.closeAllChannelOutputs=function(){this._channelDataDemux.closeAll()};y.prototype.closeAllChannelListeners=function(){this._channelEventDemux.closeAll()};y.prototype.closeAllChannels=function(){this.closeAllChannelOutputs();this.closeAllChannelListeners()};y.prototype.killChannel=function(e){this.channelKillOutput(e);this.channelKillAllListeners(e)};y.prototype.killAllChannelOutputs=function(){this._channelDataDemux.killAll()};y.prototype.killAllChannelListeners=function(){this._channelEventDemux.killAll()};y.prototype.killAllChannels=function(){this.killAllChannelOutputs();this.killAllChannelListeners()};y.prototype.killChannelOutputConsumer=function(e){this._channelDataDemux.killConsumer(e)};y.prototype.killChannelListenerConsumer=function(e){this._channelEventDemux.killConsumer(e)};y.prototype.getChannelOutputConsumerStats=function(e){return this._channelDataDemux.getConsumerStats(e)};y.prototype.getChannelListenerConsumerStats=function(e){return this._channelEventDemux.getConsumerStats(e)};y.prototype.getAllChannelOutputsConsumerStatsList=function(){return this._channelDataDemux.getConsumerStatsListAll()};y.prototype.getAllChannelListenersConsumerStatsList=function(){return this._channelEventDemux.getConsumerStatsListAll()};y.prototype.getChannelBackpressure=function(e){return Math.max(this.channelGetOutputBackpressure(e),this.channelGetAllListenersBackpressure(e))};y.prototype.getAllChannelOutputsBackpressure=function(){return this._channelDataDemux.getBackpressureAll()};y.prototype.getAllChannelListenersBackpressure=function(){return this._channelEventDemux.getBackpressureAll()};y.prototype.getAllChannelsBackpressure=function(){return Math.max(this.getAllChannelOutputsBackpressure(),this.getAllChannelListenersBackpressure())};y.prototype.getChannelListenerConsumerBackpressure=function(e){return this._channelEventDemux.getConsumerBackpressure(e)};y.prototype.getChannelOutputConsumerBackpressure=function(e){return this._channelDataDemux.getConsumerBackpressure(e)};y.prototype.hasAnyChannelOutputConsumer=function(e){return this._channelDataDemux.hasConsumerAll(e)};y.prototype.hasAnyChannelListenerConsumer=function(e){return this._channelEventDemux.hasConsumerAll(e)};y.prototype.getChannelState=function(e){let t=this._channelMap[e];if(t){return t.state}return l.UNSUBSCRIBED};y.prototype.getChannelOptions=function(e){let t=this._channelMap[e];if(t){return{...t.options}}return{}};y.prototype._getAllChannelStreamNames=function(t){let e=this._channelEventDemux.getConsumerStatsListAll().filter(e=>{return e.stream.indexOf(`${t}/`)===0}).reduce((e,t)=>{e[t.stream]=true;return e},{});return Object.keys(e)};y.prototype.channelCloseOutput=function(e){this._channelDataDemux.close(e)};y.prototype.channelCloseListener=function(e,t){this._channelEventDemux.close(`${e}/${t}`)};y.prototype.channelCloseAllListeners=function(e){let t=this._getAllChannelStreamNames(e).forEach(e=>{this._channelEventDemux.close(e)})};y.prototype.channelKillOutput=function(e){this._channelDataDemux.kill(e)};y.prototype.channelKillListener=function(e,t){this._channelEventDemux.kill(`${e}/${t}`)};y.prototype.channelKillAllListeners=function(e){let t=this._getAllChannelStreamNames(e).forEach(e=>{this._channelEventDemux.kill(e)})};y.prototype.channelGetOutputConsumerStatsList=function(e){return this._channelDataDemux.getConsumerStatsList(e)};y.prototype.channelGetListenerConsumerStatsList=function(e,t){return this._channelEventDemux.getConsumerStatsList(`${e}/${t}`)};y.prototype.channelGetAllListenersConsumerStatsList=function(e){return this._getAllChannelStreamNames(e).map(e=>{return this._channelEventDemux.getConsumerStatsList(e)}).reduce((t,e)=>{e.forEach(e=>{t.push(e)});return t},[])};y.prototype.channelGetOutputBackpressure=function(e){return this._channelDataDemux.getBackpressure(e)};y.prototype.channelGetListenerBackpressure=function(e,t){return this._channelEventDemux.getBackpressure(`${e}/${t}`)};y.prototype.channelGetAllListenersBackpressure=function(e){let t=this._getAllChannelStreamNames(e).map(e=>{return this._channelEventDemux.getBackpressure(e)});return Math.max(...t.concat(0))};y.prototype.channelHasOutputConsumer=function(e,t){return this._channelDataDemux.hasConsumer(e,t)};y.prototype.channelHasListenerConsumer=function(e,t,n){return this._channelEventDemux.hasConsumer(`${e}/${t}`,n)};y.prototype.channelHasAnyListenerConsumer=function(e,t){return this._getAllChannelStreamNames(e).some(e=>{return this._channelEventDemux.hasConsumer(e,t)})};y.prototype.subscriptions=function(t){let n=[];Object.keys(this._channelMap).forEach(e=>{if(t||this._channelMap[e].state===l.SUBSCRIBED){n.push(e)}});return n};y.prototype.isSubscribed=function(e,t){let n=this._channelMap[e];if(t){return!!n}return!!n&&n.state===l.SUBSCRIBED};y.prototype.processPendingSubscriptions=function(){this.preparingPendingSubscriptions=false;let n=[];Object.keys(this._channelMap).forEach(e=>{let t=this._channelMap[e];if(t.state===l.PENDING){n.push(t)}});n.sort((e,t)=>{let n=e.options.priority||0;let r=t.options.priority||0;if(n>r){return-1}if(n<r){return 1}return 0});n.forEach(e=>{this._trySubscribe(e)})};C.exports=y}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./auth":1,"./transport":4,"./wait":5,"ag-channel":7,"async-stream-emitter":9,"buffer/":11,"clone-deep":12,"linked-list":19,querystring:22,"sc-errors":24,"sc-formatter":25,"stream-demux":28}],3:[function(n,u,e){(function(r){const i=n("./clientsocket");const o=n("uuid");const e=n("sc-errors");const a=e.InvalidArgumentsError;function s(){return r.location&&location.protocol==="https:"}function l(e,t){let n=e.secure==null?t:e.secure;return e.port||(r.location&&location.port?location.port:n?443:80)}function t(e){e=e||{};if(e.host&&!e.host.match(/[^:]+:\d{2,5}/)){throw new a("The host option should include both"+' the hostname and the port number in the format "hostname:port"')}if(e.host&&e.hostname){throw new a("The host option should already include"+' the hostname and the port number in the format "hostname:port"'+" - Because of this, you should never use host and hostname options together")}if(e.host&&e.port){throw new a("The host option should already include"+' the hostname and the port number in the format "hostname:port"'+" - Because of this, you should never use host and port options together")}let t=s();let n={clientId:o.v4(),port:l(e,t),hostname:r.location&&location.hostname||"localhost",secure:t};Object.assign(n,e);return new i(n)}u.exports={create:t}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"./clientsocket":2,"sc-errors":24,uuid:29}],4:[function(u,c,e){(function(e){const t=u("ag-request");const i=u("querystring");let n;let s;if(e.WebSocket){n=e.WebSocket;s=function(e,t){return new n(e)}}else{n=u("ws");s=function(e,t){return new n(e,null,t)}}const r=u("sc-errors");const o=r.TimeoutError;const a=r.BadConnectionError;function l(e,t,n,r,i){this.state=this.CLOSED;this.auth=e;this.codec=t;this.options=n;this.wsOptions=r;this.protocolVersion=n.protocolVersion;this.connectTimeout=n.connectTimeout;this.pingTimeout=n.pingTimeout;this.pingTimeoutDisabled=!!n.pingTimeoutDisabled;this.callIdGenerator=n.callIdGenerator;this.authTokenName=n.authTokenName;this.isBufferingBatch=false;this._pingTimeoutTicker=null;this._callbackMap={};this._batchBuffer=[];if(!i){i={}}this._onOpenHandler=i.onOpen||function(){};this._onOpenAbortHandler=i.onOpenAbort||function(){};this._onCloseHandler=i.onClose||function(){};this._onEventHandler=i.onEvent||function(){};this._onErrorHandler=i.onError||function(){};this._onInboundInvokeHandler=i.onInboundInvoke||function(){};this._onInboundTransmitHandler=i.onInboundTransmit||function(){};this.state=this.CONNECTING;let o=this.uri();let a=s(o,r);a.binaryType=this.options.binaryType;this.socket=a;a.onopen=()=>{this._onOpen()};a.onclose=async e=>{let t;if(e.code==null){t=1005}else{t=e.code}this._destroy(t,e.reason)};a.onmessage=(e,t)=>{this._onMessage(e.data)};a.onerror=e=>{if(this.state===this.CONNECTING){this._destroy(1006)}};this._connectTimeoutRef=setTimeout(()=>{this._destroy(4007);this.socket.close(4007)},this.connectTimeout);if(this.protocolVersion===1){this._handlePing=e=>{if(e==="#1"){this._resetPingTimeout();if(this.socket.readyState===this.socket.OPEN){this.send("#2")}return true}return false}}else{this._handlePing=e=>{if(e===""){this._resetPingTimeout();if(this.socket.readyState===this.socket.OPEN){this.send("")}return true}return false}}}l.CONNECTING=l.prototype.CONNECTING="connecting";l.OPEN=l.prototype.OPEN="open";l.CLOSED=l.prototype.CLOSED="closed";l.prototype.uri=function(){let e=this.options.query||{};let t;if(this.options.protocolScheme==null){t=this.options.secure?"wss":"ws"}else{t=this.options.protocolScheme}if(this.options.timestampRequests){e[this.options.timestampParam]=(new Date).getTime()}e=i.encode(e);if(e.length){e="?"+e}let n;let r;if(this.options.socketPath==null){if(this.options.host){n=this.options.host}else{let e="";if(this.options.port&&(t==="wss"&&this.options.port!==443||t==="ws"&&this.options.port!==80)){e=":"+this.options.port}n=this.options.hostname+e}r=this.options.path}else{n=this.options.socketPath;r=`:${this.options.path}`}return t+"://"+n+r+e};l.prototype._onOpen=async function(){clearTimeout(this._connectTimeoutRef);this._resetPingTimeout();let e;try{e=await this._handshake()}catch(e){if(e.statusCode==null){e.statusCode=4003}this._onError(e);this._destroy(e.statusCode,e.toString());this.socket.close(e.statusCode);return}this.state=this.OPEN;if(e){this.pingTimeout=e.pingTimeout}this._resetPingTimeout();this._onOpenHandler(e)};l.prototype._handshake=async function(){let e=await this.auth.loadToken(this.authTokenName);let t={force:true};let n=await this.invoke("#handshake",{authToken:e},t);if(n){n.authToken=e;if(n.authError){n.authError=r.hydrateError(n.authError)}}return n};l.prototype._abortAllPendingEventsDueToBadConnection=function(o){Object.keys(this._callbackMap||{}).forEach(e=>{let t=this._callbackMap[e];delete this._callbackMap[e];clearTimeout(t.timeout);delete t.timeout;let n=`Event "${t.event}" was aborted due to a bad connection`;let r=new a(n,o);let i=t.callback;delete t.callback;i.call(t,r,t)})};l.prototype._destroy=function(e,t){let n=r.socketProtocolErrorStatuses[e];if(!t&&r.socketProtocolErrorStatuses[e]){t=r.socketProtocolErrorStatuses[e]}delete this.socket.onopen;delete this.socket.onclose;delete this.socket.onmessage;delete this.socket.onerror;clearTimeout(this._connectTimeoutRef);clearTimeout(this._pingTimeoutTicker);if(this.state===this.OPEN){this.state=this.CLOSED;this._abortAllPendingEventsDueToBadConnection("disconnect");this._onCloseHandler({code:e,reason:t})}else if(this.state===this.CONNECTING){this.state=this.CLOSED;this._abortAllPendingEventsDueToBadConnection("connectAbort");this._onOpenAbortHandler({code:e,reason:t})}else if(this.state===this.CLOSED){this._abortAllPendingEventsDueToBadConnection("connectAbort")}};l.prototype._processInboundPacket=function(n,e){if(n&&n.event!=null){if(n.cid==null){this._onInboundTransmitHandler({...n})}else{let e=new t(this,n.cid,n.event,n.data);this._onInboundInvokeHandler(e)}}else if(n&&n.rid!=null){let t=this._callbackMap[n.rid];if(t){clearTimeout(t.timeout);delete t.timeout;delete this._callbackMap[n.rid];if(t.callback){let e=r.hydrateError(n.error);t.callback(e,n.data)}}}else{this._onEventHandler({event:"raw",data:{message:e}})}};l.prototype._onMessage=function(n){this._onEventHandler({event:"message",data:{message:n}});if(this._handlePing(n)){return}let r=this.decode(n);if(Array.isArray(r)){let t=r.length;for(let e=0;e<t;e++){this._processInboundPacket(r[e],n)}}else{this._processInboundPacket(r,n)}};l.prototype._onError=function(e){this._onErrorHandler({error:e})};l.prototype._resetPingTimeout=function(){if(this.pingTimeoutDisabled){return}let e=(new Date).getTime();clearTimeout(this._pingTimeoutTicker);this._pingTimeoutTicker=setTimeout(()=>{this._destroy(4e3);this.socket.close(4e3)},this.pingTimeout)};l.prototype.clearAllListeners=function(){this._onOpenHandler=function(){};this._onOpenAbortHandler=function(){};this._onCloseHandler=function(){};this._onEventHandler=function(){};this._onErrorHandler=function(){};this._onInboundInvokeHandler=function(){};this._onInboundTransmitHandler=function(){}};l.prototype.startBatch=function(){this.isBufferingBatch=true;this._batchBuffer=[]};l.prototype.flushBatch=function(){this.isBufferingBatch=false;if(!this._batchBuffer.length){return}let e=this.serializeObject(this._batchBuffer);this._batchBuffer=[];this.send(e)};l.prototype.cancelBatch=function(){this.isBufferingBatch=false;this._batchBuffer=[]};l.prototype.getBytesReceived=function(){return this.socket.bytesReceived};l.prototype.close=function(e,t){if(this.state===this.OPEN||this.state===this.CONNECTING){e=e||1e3;this._destroy(e,t);this.socket.close(e,t)}};l.prototype.transmitObject=function(e){let t={event:e.event,data:e.data};if(e.callback){t.cid=e.cid=this.callIdGenerator();this._callbackMap[e.cid]=e}this.sendObject(t);return e.cid||null};l.prototype._handleEventAckTimeout=function(t){if(t.cid){delete this._callbackMap[t.cid]}delete t.timeout;let n=t.callback;if(n){delete t.callback;let e=new o(`Event response for "${t.event}" timed out`);n.call(t,e,t)}};l.prototype.transmit=function(e,t,n){let r={event:e,data:t};if(this.state===this.OPEN||n.force){this.transmitObject(r)}return Promise.resolve()};l.prototype.invokeRaw=function(e,t,n,r){let i={event:e,data:t,callback:r};if(!n.noTimeout){i.timeout=setTimeout(()=>{this._handleEventAckTimeout(i)},this.options.ackTimeout)}let o=null;if(this.state===this.OPEN||n.force){o=this.transmitObject(i)}return o};l.prototype.invoke=function(e,t,i){return new Promise((n,r)=>{this.invokeRaw(e,t,i,(e,t)=>{if(e){r(e);return}n(t)})})};l.prototype.cancelPendingResponse=function(e){delete this._callbackMap[e]};l.prototype.decode=function(e){return this.codec.decode(e)};l.prototype.encode=function(e){return this.codec.encode(e)};l.prototype.send=function(e){if(this.socket.readyState!==this.socket.OPEN){this._destroy(1005)}else{this.socket.send(e)}};l.prototype.serializeObject=function(e){let t;try{t=this.encode(e)}catch(e){this._onError(e);return null}return t};l.prototype.sendObject=function(e){if(this.isBufferingBatch){this._batchBuffer.push(e);return}let t=this.serializeObject(e);if(t!=null){this.send(t)}};c.exports=l}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{"ag-request":8,querystring:22,"sc-errors":24,ws:6}],5:[function(e,t,n){function r(t){return new Promise(e=>{setTimeout(()=>{e()},t)})}t.exports=r},{}],6:[function(e,t,n){let r;if(typeof WorkerGlobalScope!=="undefined"){r=self}else{r=typeof window!=="undefined"&&window||function(){return this}()}const i=r.WebSocket||r.MozWebSocket;function o(e,t,n){let r;if(t){r=new i(e,t)}else{r=new i(e)}return r}if(i)o.prototype=i.prototype;t.exports=i?o:null},{}],7:[function(e,t,n){const r=e("consumable-stream");class i extends r{constructor(e,t,n,r){super();this.PENDING=i.PENDING;this.SUBSCRIBED=i.SUBSCRIBED;this.UNSUBSCRIBED=i.UNSUBSCRIBED;this.name=e;this.client=t;this._eventDemux=n;this._dataStream=r.stream(this.name)}createConsumer(e){return this._dataStream.createConsumer(e)}listener(e){return this._eventDemux.stream(`${this.name}/${e}`)}close(){this.client.closeChannel(this.name)}kill(){this.client.killChannel(this.name)}killOutputConsumer(e){if(this.hasOutputConsumer(e)){this.client.killChannelOutputConsumer(e)}}killListenerConsumer(e){if(this.hasAnyListenerConsumer(e)){this.client.killChannelListenerConsumer(e)}}getOutputConsumerStats(e){if(this.hasOutputConsumer(e)){return this.client.getChannelOutputConsumerStats(e)}return undefined}getListenerConsumerStats(e){if(this.hasAnyListenerConsumer(e)){return this.client.getChannelListenerConsumerStats(e)}return undefined}getBackpressure(){return this.client.getChannelBackpressure(this.name)}getListenerConsumerBackpressure(e){if(this.hasAnyListenerConsumer(e)){return this.client.getChannelListenerConsumerBackpressure(e)}return 0}getOutputConsumerBackpressure(e){if(this.hasOutputConsumer(e)){return this.client.getChannelOutputConsumerBackpressure(e)}return 0}closeOutput(){this.client.channelCloseOutput(this.name)}closeListener(e){this.client.channelCloseListener(this.name,e)}closeAllListeners(){this.client.channelCloseAllListeners(this.name)}killOutput(){this.client.channelKillOutput(this.name)}killListener(e){this.client.channelKillListener(this.name,e)}killAllListeners(){this.client.channelKillAllListeners(this.name)}getOutputConsumerStatsList(){return this.client.channelGetOutputConsumerStatsList(this.name)}getListenerConsumerStatsList(e){return this.client.channelGetListenerConsumerStatsList(this.name,e)}getAllListenersConsumerStatsList(){return this.client.channelGetAllListenersConsumerStatsList(this.name)}getOutputBackpressure(){return this.client.channelGetOutputBackpressure(this.name)}getListenerBackpressure(e){return this.client.channelGetListenerBackpressure(this.name,e)}getAllListenersBackpressure(){return this.client.channelGetAllListenersBackpressure(this.name)}hasOutputConsumer(e){return this.client.channelHasOutputConsumer(this.name,e)}hasListenerConsumer(e,t){return this.client.channelHasListenerConsumer(this.name,e,t)}hasAnyListenerConsumer(e){return this.client.channelHasAnyListenerConsumer(this.name,e)}get state(){return this.client.getChannelState(this.name)}set state(e){throw new Error("Cannot directly set channel state")}get options(){return this.client.getChannelOptions(this.name)}set options(e){throw new Error("Cannot directly set channel options")}subscribe(e){this.client.subscribe(this.name,e)}unsubscribe(){this.client.unsubscribe(this.name)}isSubscribed(e){return this.client.isSubscribed(this.name,e)}transmitPublish(e){return this.client.transmitPublish(this.name,e)}invokePublish(e){return this.client.invokePublish(this.name,e)}}i.PENDING="pending";i.SUBSCRIBED="subscribed";i.UNSUBSCRIBED="unsubscribed";t.exports=i},{"consumable-stream":13}],8:[function(e,t,n){const i=e("sc-errors");const o=i.InvalidActionError;function r(e,t,n,r){this.socket=e;this.id=t;this.procedure=n;this.data=r;this.sent=false;this._respond=(e,t)=>{if(this.sent){throw new o(`Response to request ${this.id} has already been sent`)}this.sent=true;this.socket.sendObject(e,t)};this.end=(e,t)=>{let n={rid:this.id};if(e!==undefined){n.data=e}this._respond(n,t)};this.error=(e,t)=>{let n={rid:this.id,error:i.dehydrateError(e)};this._respond(n,t)}}t.exports=r},{"sc-errors":24}],9:[function(e,t,n){const r=e("stream-demux");function i(){this._listenerDemux=new r}i.prototype.emit=function(e,t){this._listenerDemux.write(e,t)};i.prototype.listener=function(e){return this._listenerDemux.stream(e)};i.prototype.closeListener=function(e){this._listenerDemux.close(e)};i.prototype.closeAllListeners=function(){this._listenerDemux.closeAll()};i.prototype.getListenerConsumerStats=function(e){return this._listenerDemux.getConsumerStats(e)};i.prototype.getListenerConsumerStatsList=function(e){return this._listenerDemux.getConsumerStatsList(e)};i.prototype.getAllListenersConsumerStatsList=function(){return this._listenerDemux.getConsumerStatsListAll()};i.prototype.killListener=function(e){this._listenerDemux.kill(e)};i.prototype.killAllListeners=function(){this._listenerDemux.killAll()};i.prototype.killListenerConsumer=function(e){this._listenerDemux.killConsumer(e)};i.prototype.getListenerBackpressure=function(e){return this._listenerDemux.getBackpressure(e)};i.prototype.getAllListenersBackpressure=function(){return this._listenerDemux.getBackpressureAll()};i.prototype.getListenerConsumerBackpressure=function(e){return this._listenerDemux.getConsumerBackpressure(e)};i.prototype.hasListenerConsumer=function(e,t){return this._listenerDemux.hasConsumer(e,t)};i.prototype.hasAnyListenerConsumer=function(e){return this._listenerDemux.hasConsumerAll(e)};t.exports=i},{"stream-demux":28}],10:[function(e,t,n){"use strict";n.byteLength=a;n.toByteArray=s;n.fromByteArray=g;var l=[];var u=[];var c=typeof Uint8Array!=="undefined"?Uint8Array:Array;var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0,o=r.length;i<o;++i){l[i]=r[i];u[r.charCodeAt(i)]=i}u["-".charCodeAt(0)]=62;u["_".charCodeAt(0)]=63;function p(e){var t=e.length;if(t%4>0){throw new Error("Invalid string. Length must be a multiple of 4")}var n=e.indexOf("=");if(n===-1)n=t;var r=n===t?0:4-n%4;return[n,r]}function a(e){var t=p(e);var n=t[0];var r=t[1];return(n+r)*3/4-r}function h(e,t,n){return(t+n)*3/4-n}function s(e){var t;var n=p(e);var r=n[0];var i=n[1];var o=new c(h(e,r,i));var a=0;var s=i>0?r-4:r;var l;for(l=0;l<s;l+=4){t=u[e.charCodeAt(l)]<<18|u[e.charCodeAt(l+1)]<<12|u[e.charCodeAt(l+2)]<<6|u[e.charCodeAt(l+3)];o[a++]=t>>16&255;o[a++]=t>>8&255;o[a++]=t&255}if(i===2){t=u[e.charCodeAt(l)]<<2|u[e.charCodeAt(l+1)]>>4;o[a++]=t&255}if(i===1){t=u[e.charCodeAt(l)]<<10|u[e.charCodeAt(l+1)]<<4|u[e.charCodeAt(l+2)]>>2;o[a++]=t>>8&255;o[a++]=t&255}return o}function d(e){return l[e>>18&63]+l[e>>12&63]+l[e>>6&63]+l[e&63]}function f(e,t,n){var r;var i=[];for(var o=t;o<n;o+=3){r=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(e[o+2]&255);i.push(d(r))}return i.join("")}function g(e){var t;var n=e.length;var r=n%3;var i=[];var o=16383;for(var a=0,s=n-r;a<s;a+=o){i.push(f(e,a,a+o>s?s:a+o))}if(r===1){t=e[n-1];i.push(l[t>>2]+l[t<<4&63]+"==")}else if(r===2){t=(e[n-2]<<8)+e[n-1];i.push(l[t>>10]+l[t>>4&63]+l[t<<2&63]+"=")}return i.join("")}},{}],11:[function(Q,e,$){(function(h){"use strict";var r=Q("base64-js");var o=Q("ieee754");var e=typeof Symbol==="function"&&typeof Symbol.for==="function"?Symbol.for("nodejs.util.inspect.custom"):null;$.Buffer=h;$.SlowBuffer=m;$.INSPECT_MAX_BYTES=50;var n=2147483647;$.kMaxLength=n;h.TYPED_ARRAY_SUPPORT=t();if(!h.TYPED_ARRAY_SUPPORT&&typeof console!=="undefined"&&typeof console.error==="function"){console.error("This browser lacks typed array (Uint8Array) support which is required by "+"`buffer` v5.x. Use `buffer` v4.x if you require old browser support.")}function t(){try{var e=new Uint8Array(1);var t={foo:function(){return 42}};Object.setPrototypeOf(t,Uint8Array.prototype);Object.setPrototypeOf(e,t);return e.foo()===42}catch(e){return false}}Object.defineProperty(h.prototype,"parent",{enumerable:true,get:function(){if(!h.isBuffer(this))return undefined;return this.buffer}});Object.defineProperty(h.prototype,"offset",{enumerable:true,get:function(){if(!h.isBuffer(this))return undefined;return this.byteOffset}});function a(e){if(e>n){throw new RangeError('The value "'+e+'" is invalid for option "size"')}var t=new Uint8Array(e);Object.setPrototypeOf(t,h.prototype);return t}function h(e,t,n){if(typeof e==="number"){if(typeof t==="string"){throw new TypeError('The "string" argument must be of type string. Received type number')}return u(e)}return i(e,t,n)}if(typeof Symbol!=="undefined"&&Symbol.species!=null&&h[Symbol.species]===h){Object.defineProperty(h,Symbol.species,{value:null,configurable:true,enumerable:false,writable:false})}h.poolSize=8192;function i(e,t,n){if(typeof e==="string"){return c(e,t)}if(ArrayBuffer.isView(e)){return p(e)}if(e==null){throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, "+"or Array-like Object. Received type "+typeof e)}if(B(e,ArrayBuffer)||e&&B(e.buffer,ArrayBuffer)){return d(e,t,n)}if(typeof e==="number"){throw new TypeError('The "value" argument must not be of type number. Received type number')}var r=e.valueOf&&e.valueOf();if(r!=null&&r!==e){return h.from(r,t,n)}var i=f(e);if(i)return i;if(typeof Symbol!=="undefined"&&Symbol.toPrimitive!=null&&typeof e[Symbol.toPrimitive]==="function"){return h.from(e[Symbol.toPrimitive]("string"),t,n)}throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, "+"or Array-like Object. Received type "+typeof e)}h.from=function(e,t,n){return i(e,t,n)};Object.setPrototypeOf(h.prototype,Uint8Array.prototype);Object.setPrototypeOf(h,Uint8Array);function s(e){if(typeof e!=="number"){throw new TypeError('"size" argument must be of type number')}else if(e<0){throw new RangeError('The value "'+e+'" is invalid for option "size"')}}function l(e,t,n){s(e);if(e<=0){return a(e)}if(t!==undefined){return typeof n==="string"?a(e).fill(t,n):a(e).fill(t)}return a(e)}h.alloc=function(e,t,n){return l(e,t,n)};function u(e){s(e);return a(e<0?0:g(e)|0)}h.allocUnsafe=function(e){return u(e)};h.allocUnsafeSlow=function(e){return u(e)};function c(e,t){if(typeof t!=="string"||t===""){t="utf8"}if(!h.isEncoding(t)){throw new TypeError("Unknown encoding: "+t)}var n=b(e,t)|0;var r=a(n);var i=r.write(e,t);if(i!==n){r=r.slice(0,i)}return r}function p(e){var t=e.length<0?0:g(e.length)|0;var n=a(t);for(var r=0;r<t;r+=1){n[r]=e[r]&255}return n}function d(e,t,n){if(t<0||e.byteLength<t){throw new RangeError('"offset" is outside of buffer bounds')}if(e.byteLength<t+(n||0)){throw new RangeError('"length" is outside of buffer bounds')}var r;if(t===undefined&&n===undefined){r=new Uint8Array(e)}else if(n===undefined){r=new Uint8Array(e,t)}else{r=new Uint8Array(e,t,n)}Object.setPrototypeOf(r,h.prototype);return r}function f(e){if(h.isBuffer(e)){var t=g(e.length)|0;var n=a(t);if(n.length===0){return n}e.copy(n,0,0,t);return n}if(e.length!==undefined){if(typeof e.length!=="number"||M(e.length)){return a(0)}return p(e)}if(e.type==="Buffer"&&Array.isArray(e.data)){return p(e.data)}}function g(e){if(e>=n){throw new RangeError("Attempt to allocate Buffer larger than maximum "+"size: 0x"+n.toString(16)+" bytes")}return e|0}function m(e){if(+e!=e){e=0}return h.alloc(+e)}h.isBuffer=function e(t){return t!=null&&t._isBuffer===true&&t!==h.prototype};h.compare=function e(t,n){if(B(t,Uint8Array))t=h.from(t,t.offset,t.byteLength);if(B(n,Uint8Array))n=h.from(n,n.offset,n.byteLength);if(!h.isBuffer(t)||!h.isBuffer(n)){throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array')}if(t===n)return 0;var r=t.length;var i=n.length;for(var o=0,a=Math.min(r,i);o<a;++o){if(t[o]!==n[o]){r=t[o];i=n[o];break}}if(r<i)return-1;if(i<r)return 1;return 0};h.isEncoding=function e(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return true;default:return false}};h.concat=function e(t,n){if(!Array.isArray(t)){throw new TypeError('"list" argument must be an Array of Buffers')}if(t.length===0){return h.alloc(0)}var r;if(n===undefined){n=0;for(r=0;r<t.length;++r){n+=t[r].length}}var i=h.allocUnsafe(n);var o=0;for(r=0;r<t.length;++r){var a=t[r];if(B(a,Uint8Array)){a=h.from(a)}if(!h.isBuffer(a)){throw new TypeError('"list" argument must be an Array of Buffers')}a.copy(i,o);o+=a.length}return i};function b(e,t){if(h.isBuffer(e)){return e.length}if(ArrayBuffer.isView(e)||B(e,ArrayBuffer)){return e.byteLength}if(typeof e!=="string"){throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. '+"Received type "+typeof e)}var n=e.length;var r=arguments.length>2&&arguments[2]===true;if(!r&&n===0)return 0;var i=false;for(;;){switch(t){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return L(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return n*2;case"hex":return n>>>1;case"base64":return j(e).length;default:if(i){return r?-1:L(e).length}t=(""+t).toLowerCase();i=true}}}h.byteLength=b;function v(e,t,n){var r=false;if(t===undefined||t<0){t=0}if(t>this.length){return""}if(n===undefined||n>this.length){n=this.length}if(n<=0){return""}n>>>=0;t>>>=0;if(n<=t){return""}if(!e)e="utf8";while(true){switch(e){case"hex":return H(this,t,n);case"utf8":case"utf-8":return x(this,t,n);case"ascii":return V(this,t,n);case"latin1":case"binary":return F(this,t,n);case"base64":return U(this,t,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return Y(this,t,n);default:if(r)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase();r=true}}}h.prototype._isBuffer=true;function O(e,t,n){var r=e[t];e[t]=e[n];e[n]=r}h.prototype.swap16=function e(){var t=this.length;if(t%2!==0){throw new RangeError("Buffer size must be a multiple of 16-bits")}for(var n=0;n<t;n+=2){O(this,n,n+1)}return this};h.prototype.swap32=function e(){var t=this.length;if(t%4!==0){throw new RangeError("Buffer size must be a multiple of 32-bits")}for(var n=0;n<t;n+=4){O(this,n,n+3);O(this,n+1,n+2)}return this};h.prototype.swap64=function e(){var t=this.length;if(t%8!==0){throw new RangeError("Buffer size must be a multiple of 64-bits")}for(var n=0;n<t;n+=8){O(this,n,n+7);O(this,n+1,n+6);O(this,n+2,n+5);O(this,n+3,n+4)}return this};h.prototype.toString=function e(){var t=this.length;if(t===0)return"";if(arguments.length===0)return x(this,0,t);return v.apply(this,arguments)};h.prototype.toLocaleString=h.prototype.toString;h.prototype.equals=function e(t){if(!h.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(this===t)return true;return h.compare(this,t)===0};h.prototype.inspect=function e(){var t="";var n=$.INSPECT_MAX_BYTES;t=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim();if(this.length>n)t+=" ... ";return"<Buffer "+t+">"};if(e){h.prototype[e]=h.prototype.inspect}h.prototype.compare=function e(t,n,r,i,o){if(B(t,Uint8Array)){t=h.from(t,t.offset,t.byteLength)}if(!h.isBuffer(t)){throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. '+"Received type "+typeof t)}if(n===undefined){n=0}if(r===undefined){r=t?t.length:0}if(i===undefined){i=0}if(o===undefined){o=this.length}if(n<0||r>t.length||i<0||o>this.length){throw new RangeError("out of range index")}if(i>=o&&n>=r){return 0}if(i>=o){return-1}if(n>=r){return 1}n>>>=0;r>>>=0;i>>>=0;o>>>=0;if(this===t)return 0;var a=o-i;var s=r-n;var l=Math.min(a,s);var u=this.slice(i,o);var c=t.slice(n,r);for(var p=0;p<l;++p){if(u[p]!==c[p]){a=u[p];s=c[p];break}}if(a<s)return-1;if(s<a)return 1;return 0};function y(e,t,n,r,i){if(e.length===0)return-1;if(typeof n==="string"){r=n;n=0}else if(n>2147483647){n=2147483647}else if(n<-2147483648){n=-2147483648}n=+n;if(M(n)){n=i?0:e.length-1}if(n<0)n=e.length+n;if(n>=e.length){if(i)return-1;else n=e.length-1}else if(n<0){if(i)n=0;else return-1}if(typeof t==="string"){t=h.from(t,r)}if(h.isBuffer(t)){if(t.length===0){return-1}return S(e,t,n,r,i)}else if(typeof t==="number"){t=t&255;if(typeof Uint8Array.prototype.indexOf==="function"){if(i){return Uint8Array.prototype.indexOf.call(e,t,n)}else{return Uint8Array.prototype.lastIndexOf.call(e,t,n)}}return S(e,[t],n,r,i)}throw new TypeError("val must be string, number or Buffer")}function S(e,t,n,r,i){var o=1;var a=e.length;var s=t.length;if(r!==undefined){r=String(r).toLowerCase();if(r==="ucs2"||r==="ucs-2"||r==="utf16le"||r==="utf-16le"){if(e.length<2||t.length<2){return-1}o=2;a/=2;s/=2;n/=2}}function l(e,t){if(o===1){return e[t]}else{return e.readUInt16BE(t*o)}}var u;if(i){var c=-1;for(u=n;u<a;u++){if(l(e,u)===l(t,c===-1?0:u-c)){if(c===-1)c=u;if(u-c+1===s)return c*o}else{if(c!==-1)u-=u-c;c=-1}}}else{if(n+s>a)n=a-s;for(u=n;u>=0;u--){var p=true;for(var h=0;h<s;h++){if(l(e,u+h)!==l(t,h)){p=false;break}}if(p)return u}}return-1}h.prototype.includes=function e(t,n,r){return this.indexOf(t,n,r)!==-1};h.prototype.indexOf=function e(t,n,r){return y(this,t,n,r,true)};h.prototype.lastIndexOf=function e(t,n,r){return y(this,t,n,r,false)};function C(e,t,n,r){n=Number(n)||0;var i=e.length-n;if(!r){r=i}else{r=Number(r);if(r>i){r=i}}var o=t.length;if(r>o/2){r=o/2}for(var a=0;a<r;++a){var s=parseInt(t.substr(a*2,2),16);if(M(s))return a;e[n+a]=s}return a}function P(e,t,n,r){return N(L(t,e.length-n),e,n,r)}function E(e,t,n,r){return N(X(t),e,n,r)}function D(e,t,n,r){return E(e,t,n,r)}function R(e,t,n,r){return N(j(t),e,n,r)}function G(e,t,n,r){return N(q(t,e.length-n),e,n,r)}h.prototype.write=function e(t,n,r,i){if(n===undefined){i="utf8";r=this.length;n=0}else if(r===undefined&&typeof n==="string"){i=n;r=this.length;n=0}else if(isFinite(n)){n=n>>>0;if(isFinite(r)){r=r>>>0;if(i===undefined)i="utf8"}else{i=r;r=undefined}}else{throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")}var o=this.length-n;if(r===undefined||r>o)r=o;if(t.length>0&&(r<0||n<0)||n>this.length){throw new RangeError("Attempt to write outside buffer bounds")}if(!i)i="utf8";var a=false;for(;;){switch(i){case"hex":return C(this,t,n,r);case"utf8":case"utf-8":return P(this,t,n,r);case"ascii":return E(this,t,n,r);case"latin1":case"binary":return D(this,t,n,r);case"base64":return R(this,t,n,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return G(this,t,n,r);default:if(a)throw new TypeError("Unknown encoding: "+i);i=(""+i).toLowerCase();a=true}}};h.prototype.toJSON=function e(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function U(e,t,n){if(t===0&&n===e.length){return r.fromByteArray(e)}else{return r.fromByteArray(e.slice(t,n))}}function x(e,t,n){n=Math.min(e.length,n);var r=[];var i=t;while(i<n){var o=e[i];var a=null;var s=o>239?4:o>223?3:o>191?2:1;if(i+s<=n){var l,u,c,p;switch(s){case 1:if(o<128){a=o}break;case 2:l=e[i+1];if((l&192)===128){p=(o&31)<<6|l&63;if(p>127){a=p}}break;case 3:l=e[i+1];u=e[i+2];if((l&192)===128&&(u&192)===128){p=(o&15)<<12|(l&63)<<6|u&63;if(p>2047&&(p<55296||p>57343)){a=p}}break;case 4:l=e[i+1];u=e[i+2];c=e[i+3];if((l&192)===128&&(u&192)===128&&(c&192)===128){p=(o&15)<<18|(l&63)<<12|(u&63)<<6|c&63;if(p>65535&&p<1114112){a=p}}}}if(a===null){a=65533;s=1}else if(a>65535){a-=65536;r.push(a>>>10&1023|55296);a=56320|a&1023}r.push(a);i+=s}return z(r)}var I=4096;function z(e){var t=e.length;if(t<=I){return String.fromCharCode.apply(String,e)}var n="";var r=0;while(r<t){n+=String.fromCharCode.apply(String,e.slice(r,r+=I))}return n}function V(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i){r+=String.fromCharCode(e[i]&127)}return r}function F(e,t,n){var r="";n=Math.min(e.length,n);for(var i=t;i<n;++i){r+=String.fromCharCode(e[i])}return r}function H(e,t,n){var r=e.length;if(!t||t<0)t=0;if(!n||n<0||n>r)n=r;var i="";for(var o=t;o<n;++o){i+=J[e[o]]}return i}function Y(e,t,n){var r=e.slice(t,n);var i="";for(var o=0;o<r.length;o+=2){i+=String.fromCharCode(r[o]+r[o+1]*256)}return i}h.prototype.slice=function e(t,n){var r=this.length;t=~~t;n=n===undefined?r:~~n;if(t<0){t+=r;if(t<0)t=0}else if(t>r){t=r}if(n<0){n+=r;if(n<0)n=0}else if(n>r){n=r}if(n<t)n=t;var i=this.subarray(t,n);Object.setPrototypeOf(i,h.prototype);return i};function _(e,t,n){if(e%1!==0||e<0)throw new RangeError("offset is not uint");if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}h.prototype.readUIntLE=function e(t,n,r){t=t>>>0;n=n>>>0;if(!r)_(t,n,this.length);var i=this[t];var o=1;var a=0;while(++a<n&&(o*=256)){i+=this[t+a]*o}return i};h.prototype.readUIntBE=function e(t,n,r){t=t>>>0;n=n>>>0;if(!r){_(t,n,this.length)}var i=this[t+--n];var o=1;while(n>0&&(o*=256)){i+=this[t+--n]*o}return i};h.prototype.readUInt8=function e(t,n){t=t>>>0;if(!n)_(t,1,this.length);return this[t]};h.prototype.readUInt16LE=function e(t,n){t=t>>>0;if(!n)_(t,2,this.length);return this[t]|this[t+1]<<8};h.prototype.readUInt16BE=function e(t,n){t=t>>>0;if(!n)_(t,2,this.length);return this[t]<<8|this[t+1]};h.prototype.readUInt32LE=function e(t,n){t=t>>>0;if(!n)_(t,4,this.length);return(this[t]|this[t+1]<<8|this[t+2]<<16)+this[t+3]*16777216};h.prototype.readUInt32BE=function e(t,n){t=t>>>0;if(!n)_(t,4,this.length);return this[t]*16777216+(this[t+1]<<16|this[t+2]<<8|this[t+3])};h.prototype.readIntLE=function e(t,n,r){t=t>>>0;n=n>>>0;if(!r)_(t,n,this.length);var i=this[t];var o=1;var a=0;while(++a<n&&(o*=256)){i+=this[t+a]*o}o*=128;if(i>=o)i-=Math.pow(2,8*n);return i};h.prototype.readIntBE=function e(t,n,r){t=t>>>0;n=n>>>0;if(!r)_(t,n,this.length);var i=n;var o=1;var a=this[t+--i];while(i>0&&(o*=256)){a+=this[t+--i]*o}o*=128;if(a>=o)a-=Math.pow(2,8*n);return a};h.prototype.readInt8=function e(t,n){t=t>>>0;if(!n)_(t,1,this.length);if(!(this[t]&128))return this[t];return(255-this[t]+1)*-1};h.prototype.readInt16LE=function e(t,n){t=t>>>0;if(!n)_(t,2,this.length);var r=this[t]|this[t+1]<<8;return r&32768?r|4294901760:r};h.prototype.readInt16BE=function e(t,n){t=t>>>0;if(!n)_(t,2,this.length);var r=this[t+1]|this[t]<<8;return r&32768?r|4294901760:r};h.prototype.readInt32LE=function e(t,n){t=t>>>0;if(!n)_(t,4,this.length);return this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24};h.prototype.readInt32BE=function e(t,n){t=t>>>0;if(!n)_(t,4,this.length);return this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]};h.prototype.readFloatLE=function e(t,n){t=t>>>0;if(!n)_(t,4,this.length);return o.read(this,t,true,23,4)};h.prototype.readFloatBE=function e(t,n){t=t>>>0;if(!n)_(t,4,this.length);return o.read(this,t,false,23,4)};h.prototype.readDoubleLE=function e(t,n){t=t>>>0;if(!n)_(t,8,this.length);return o.read(this,t,true,52,8)};h.prototype.readDoubleBE=function e(t,n){t=t>>>0;if(!n)_(t,8,this.length);return o.read(this,t,false,52,8)};function T(e,t,n,r,i,o){if(!h.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<o)throw new RangeError('"value" argument is out of bounds');if(n+r>e.length)throw new RangeError("Index out of range")}h.prototype.writeUIntLE=function e(t,n,r,i){t=+t;n=n>>>0;r=r>>>0;if(!i){var o=Math.pow(2,8*r)-1;T(this,t,n,r,o,0)}var a=1;var s=0;this[n]=t&255;while(++s<r&&(a*=256)){this[n+s]=t/a&255}return n+r};h.prototype.writeUIntBE=function e(t,n,r,i){t=+t;n=n>>>0;r=r>>>0;if(!i){var o=Math.pow(2,8*r)-1;T(this,t,n,r,o,0)}var a=r-1;var s=1;this[n+a]=t&255;while(--a>=0&&(s*=256)){this[n+a]=t/s&255}return n+r};h.prototype.writeUInt8=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,1,255,0);this[n]=t&255;return n+1};h.prototype.writeUInt16LE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,2,65535,0);this[n]=t&255;this[n+1]=t>>>8;return n+2};h.prototype.writeUInt16BE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,2,65535,0);this[n]=t>>>8;this[n+1]=t&255;return n+2};h.prototype.writeUInt32LE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,4,4294967295,0);this[n+3]=t>>>24;this[n+2]=t>>>16;this[n+1]=t>>>8;this[n]=t&255;return n+4};h.prototype.writeUInt32BE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,4,4294967295,0);this[n]=t>>>24;this[n+1]=t>>>16;this[n+2]=t>>>8;this[n+3]=t&255;return n+4};h.prototype.writeIntLE=function e(t,n,r,i){t=+t;n=n>>>0;if(!i){var o=Math.pow(2,8*r-1);T(this,t,n,r,o-1,-o)}var a=0;var s=1;var l=0;this[n]=t&255;while(++a<r&&(s*=256)){if(t<0&&l===0&&this[n+a-1]!==0){l=1}this[n+a]=(t/s>>0)-l&255}return n+r};h.prototype.writeIntBE=function e(t,n,r,i){t=+t;n=n>>>0;if(!i){var o=Math.pow(2,8*r-1);T(this,t,n,r,o-1,-o)}var a=r-1;var s=1;var l=0;this[n+a]=t&255;while(--a>=0&&(s*=256)){if(t<0&&l===0&&this[n+a+1]!==0){l=1}this[n+a]=(t/s>>0)-l&255}return n+r};h.prototype.writeInt8=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,1,127,-128);if(t<0)t=255+t+1;this[n]=t&255;return n+1};h.prototype.writeInt16LE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,2,32767,-32768);this[n]=t&255;this[n+1]=t>>>8;return n+2};h.prototype.writeInt16BE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,2,32767,-32768);this[n]=t>>>8;this[n+1]=t&255;return n+2};h.prototype.writeInt32LE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,4,2147483647,-2147483648);this[n]=t&255;this[n+1]=t>>>8;this[n+2]=t>>>16;this[n+3]=t>>>24;return n+4};h.prototype.writeInt32BE=function e(t,n,r){t=+t;n=n>>>0;if(!r)T(this,t,n,4,2147483647,-2147483648);if(t<0)t=4294967295+t+1;this[n]=t>>>24;this[n+1]=t>>>16;this[n+2]=t>>>8;this[n+3]=t&255;return n+4};function A(e,t,n,r,i,o){if(n+r>e.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function w(e,t,n,r,i){t=+t;n=n>>>0;if(!i){A(e,t,n,4,34028234663852886e22,-34028234663852886e22)}o.write(e,t,n,r,23,4);return n+4}h.prototype.writeFloatLE=function e(t,n,r){return w(this,t,n,true,r)};h.prototype.writeFloatBE=function e(t,n,r){return w(this,t,n,false,r)};function k(e,t,n,r,i){t=+t;n=n>>>0;if(!i){A(e,t,n,8,17976931348623157e292,-17976931348623157e292)}o.write(e,t,n,r,52,8);return n+8}h.prototype.writeDoubleLE=function e(t,n,r){return k(this,t,n,true,r)};h.prototype.writeDoubleBE=function e(t,n,r){return k(this,t,n,false,r)};h.prototype.copy=function e(t,n,r,i){if(!h.isBuffer(t))throw new TypeError("argument should be a Buffer");if(!r)r=0;if(!i&&i!==0)i=this.length;if(n>=t.length)n=t.length;if(!n)n=0;if(i>0&&i<r)i=r;if(i===r)return 0;if(t.length===0||this.length===0)return 0;if(n<0){throw new RangeError("targetStart out of bounds")}if(r<0||r>=this.length)throw new RangeError("Index out of range");if(i<0)throw new RangeError("sourceEnd out of bounds");if(i>this.length)i=this.length;if(t.length-n<i-r){i=t.length-n+r}var o=i-r;if(this===t&&typeof Uint8Array.prototype.copyWithin==="function"){this.copyWithin(n,r,i)}else if(this===t&&r<n&&n<i){for(var a=o-1;a>=0;--a){t[a+n]=this[a+r]}}else{Uint8Array.prototype.set.call(t,this.subarray(r,i),n)}return o};h.prototype.fill=function e(t,n,r,i){if(typeof t==="string"){if(typeof n==="string"){i=n;n=0;r=this.length}else if(typeof r==="string"){i=r;r=this.length}if(i!==undefined&&typeof i!=="string"){throw new TypeError("encoding must be a string")}if(typeof i==="string"&&!h.isEncoding(i)){throw new TypeError("Unknown encoding: "+i)}if(t.length===1){var o=t.charCodeAt(0);if(i==="utf8"&&o<128||i==="latin1"){t=o}}}else if(typeof t==="number"){t=t&255}else if(typeof t==="boolean"){t=Number(t)}if(n<0||this.length<n||this.length<r){throw new RangeError("Out of range index")}if(r<=n){return this}n=n>>>0;r=r===undefined?this.length:r>>>0;if(!t)t=0;var a;if(typeof t==="number"){for(a=n;a<r;++a){this[a]=t}}else{var s=h.isBuffer(t)?t:h.from(t,i);var l=s.length;if(l===0){throw new TypeError('The value "'+t+'" is invalid for argument "value"')}for(a=0;a<r-n;++a){this[a+n]=s[a%l]}}return this};var Z=/[^+/0-9A-Za-z-_]/g;function W(e){e=e.split("=")[0];e=e.trim().replace(Z,"");if(e.length<2)return"";while(e.length%4!==0){e=e+"="}return e}function L(e,t){t=t||Infinity;var n;var r=e.length;var i=null;var o=[];for(var a=0;a<r;++a){n=e.charCodeAt(a);if(n>55295&&n<57344){if(!i){if(n>56319){if((t-=3)>-1)o.push(239,191,189);continue}else if(a+1===r){if((t-=3)>-1)o.push(239,191,189);continue}i=n;continue}if(n<56320){if((t-=3)>-1)o.push(239,191,189);i=n;continue}n=(i-55296<<10|n-56320)+65536}else if(i){if((t-=3)>-1)o.push(239,191,189)}i=null;if(n<128){if((t-=1)<0)break;o.push(n)}else if(n<2048){if((t-=2)<0)break;o.push(n>>6|192,n&63|128)}else if(n<65536){if((t-=3)<0)break;o.push(n>>12|224,n>>6&63|128,n&63|128)}else if(n<1114112){if((t-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,n&63|128)}else{throw new Error("Invalid code point")}}return o}function X(e){var t=[];for(var n=0;n<e.length;++n){t.push(e.charCodeAt(n)&255)}return t}function q(e,t){var n,r,i;var o=[];for(var a=0;a<e.length;++a){if((t-=2)<0)break;n=e.charCodeAt(a);r=n>>8;i=n%256;o.push(i);o.push(r)}return o}function j(e){return r.toByteArray(W(e))}function N(e,t,n,r){for(var i=0;i<r;++i){if(i+n>=t.length||i>=e.length)break;t[i+n]=e[i]}return i}function B(e,t){return e instanceof t||e!=null&&e.constructor!=null&&e.constructor.name!=null&&e.constructor.name===t.name}function M(e){return e!==e}var J=function(){var e="0123456789abcdef";var t=new Array(256);for(var n=0;n<16;++n){var r=n*16;for(var i=0;i<16;++i){t[r+i]=e[n]+e[i]}}return t}()}).call(this,Q("buffer").Buffer)},{"base64-js":10,buffer:11,ieee754:14}],12:[function(e,t,n){"use strict";const r=e("shallow-clone");const i=e("kind-of");const o=e("is-plain-object");function a(e,t){switch(i(e)){case"object":return s(e,t);case"array":return l(e,t);default:{return r(e)}}}function s(t,n){if(typeof n==="function"){return n(t)}if(n||o(t)){const r=new t.constructor;for(let e in t){r[e]=a(t[e],n)}return r}return t}function l(t,n){const r=new t.constructor(t.length);for(let e=0;e<t.length;e++){r[e]=a(t[e],n)}return r}t.exports=a},{"is-plain-object":15,"kind-of":17,"shallow-clone":26}],13:[function(e,t,n){class r{async next(e){let t=this.createConsumer(e);let n=await t.next();t.return();return n}async once(e){let t=await this.next(e);if(t.done){await new Promise(()=>{})}return t.value}createConsumer(){throw new TypeError("Method must be overriden by subclass")}[Symbol.asyncIterator](){return this.createConsumer()}}t.exports=r},{}],14:[function(e,t,n){n.read=function(e,t,n,r,i){var o,a;var s=i*8-r-1;var l=(1<<s)-1;var u=l>>1;var c=-7;var p=n?i-1:0;var h=n?-1:1;var d=e[t+p];p+=h;o=d&(1<<-c)-1;d>>=-c;c+=s;for(;c>0;o=o*256+e[t+p],p+=h,c-=8){}a=o&(1<<-c)-1;o>>=-c;c+=r;for(;c>0;a=a*256+e[t+p],p+=h,c-=8){}if(o===0){o=1-u}else if(o===l){return a?NaN:(d?-1:1)*Infinity}else{a=a+Math.pow(2,r);o=o-u}return(d?-1:1)*a*Math.pow(2,o-r)};n.write=function(e,t,n,r,i,o){var a,s,l;var u=o*8-i-1;var c=(1<<u)-1;var p=c>>1;var h=i===23?Math.pow(2,-24)-Math.pow(2,-77):0;var d=r?0:o-1;var f=r?1:-1;var g=t<0||t===0&&1/t<0?1:0;t=Math.abs(t);if(isNaN(t)||t===Infinity){s=isNaN(t)?1:0;a=c}else{a=Math.floor(Math.log(t)/Math.LN2);if(t*(l=Math.pow(2,-a))<1){a--;l*=2}if(a+p>=1){t+=h/l}else{t+=h*Math.pow(2,1-p)}if(t*l>=2){a++;l/=2}if(a+p>=c){s=0;a=c}else if(a+p>=1){s=(t*l-1)*Math.pow(2,i);a=a+p}else{s=t*Math.pow(2,p-1)*Math.pow(2,i);a=0}}for(;i>=8;e[n+d]=s&255,d+=f,s/=256,i-=8){}a=a<<i|s;u+=i;for(;u>0;e[n+d]=a&255,d+=f,a/=256,u-=8){}e[n+d-f]|=g*128}},{}],15:[function(e,t,n){"use strict";var r=e("isobject");function i(e){return r(e)===true&&Object.prototype.toString.call(e)==="[object Object]"}t.exports=function e(t){var n,r;if(i(t)===false)return false;n=t.constructor;if(typeof n!=="function")return false;r=n.prototype;if(i(r)===false)return false;if(r.hasOwnProperty("isPrototypeOf")===false){return false}return true}},{isobject:16}],16:[function(e,t,n){"use strict";t.exports=function e(t){return t!=null&&typeof t==="object"&&Array.isArray(t)===false}},{}],17:[function(e,t,n){var r=Object.prototype.toString;t.exports=function e(t){if(t===void 0)return"undefined";if(t===null)return"null";var n=typeof t;if(n==="boolean")return"boolean";if(n==="string")return"string";if(n==="number")return"number";if(n==="symbol")return"symbol";if(n==="function"){return u(t)?"generatorfunction":"function"}if(o(t))return"array";if(h(t))return"buffer";if(p(t))return"arguments";if(s(t))return"date";if(a(t))return"error";if(l(t))return"regexp";switch(i(t)){case"Symbol":return"symbol";case"Promise":return"promise";case"WeakMap":return"weakmap";case"WeakSet":return"weakset";case"Map":return"map";case"Set":return"set";case"Int8Array":return"int8array";case"Uint8Array":return"uint8array";case"Uint8ClampedArray":return"uint8clampedarray";case"Int16Array":return"int16array";case"Uint16Array":return"uint16array";case"Int32Array":return"int32array";case"Uint32Array":return"uint32array";case"Float32Array":return"float32array";case"Float64Array":return"float64array"}if(c(t)){return"generator"}n=r.call(t);switch(n){case"[object Object]":return"object";case"[object Map Iterator]":return"mapiterator";case"[object Set Iterator]":return"setiterator";case"[object String Iterator]":return"stringiterator";case"[object Array Iterator]":return"arrayiterator"}return n.slice(8,-1).toLowerCase().replace(/\s/g,"")};function i(e){return typeof e.constructor==="function"?e.constructor.name:null}function o(e){if(Array.isArray)return Array.isArray(e);return e instanceof Array}function a(e){return e instanceof Error||typeof e.message==="string"&&e.constructor&&typeof e.constructor.stackTraceLimit==="number"}function s(e){if(e instanceof Date)return true;return typeof e.toDateString==="function"&&typeof e.getDate==="function"&&typeof e.setDate==="function"}function l(e){if(e instanceof RegExp)return true;return typeof e.flags==="string"&&typeof e.ignoreCase==="boolean"&&typeof e.multiline==="boolean"&&typeof e.global==="boolean"}function u(e,t){return i(e)==="GeneratorFunction"}function c(e){return typeof e.throw==="function"&&typeof e.return==="function"&&typeof e.next==="function"}function p(e){try{if(typeof e.length==="number"&&typeof e.callee==="function"){return true}}catch(e){if(e.message.indexOf("callee")!==-1){return true}}return false}function h(e){if(e.constructor&&typeof e.constructor.isBuffer==="function"){return e.constructor.isBuffer(e)}return false}},{}],18:[function(e,t,n){"use strict";var i;i="An argument without append, prepend, "+"or detach methods was given to `List";function r(){if(arguments.length){return r.from(arguments)}}var o;o=r.prototype;r.of=function(){return r.from.call(this,arguments)};r.from=function(e){var t=new this,n,r,i;if(e&&(n=e.length)){r=-1;while(++r<n){i=e[r];if(i!==null&&i!==undefined){t.append(i)}}}return t};o.head=null;o.tail=null;o.toArray=function(){var e=this.head,t=[];while(e){t.push(e);e=e.next}return t};o.prepend=function(e){if(!e){return false}if(!e.append||!e.prepend||!e.detach){throw new Error(i+"#prepend`.")}var t,n;t=this;n=t.head;if(n){return n.prepend(e)}e.detach();e.list=t;t.head=e;return e};o.append=function(e){if(!e){return false}if(!e.append||!e.prepend||!e.detach){throw new Error(i+"#append`.")}var t,n,r;t=this;r=t.tail;if(r){return r.append(e)}n=t.head;if(n){return n.append(e)}e.detach();e.list=t;t.head=e;return e};function a(){}r.Item=a;var s=a.prototype;s.next=null;s.prev=null;s.list=null;s.detach=function(){var e=this,t=e.list,n=e.prev,r=e.next;if(!t){return e}if(t.tail===e){t.tail=n}if(t.head===e){t.head=r}if(t.tail===t.head){t.tail=null}if(n){n.next=r}if(r){r.prev=n}e.prev=e.next=e.list=null;return e};s.prepend=function(e){if(!e||!e.append||!e.prepend||!e.detach){throw new Error(i+"Item#prepend`.")}var t=this,n=t.list,r=t.prev;if(!n){return false}e.detach();if(r){e.prev=r;r.next=e}e.next=t;e.list=n;t.prev=e;if(t===n.head){n.head=e}if(!n.tail){n.tail=t}return e};s.append=function(e){if(!e||!e.append||!e.prepend||!e.detach){throw new Error(i+"Item#append`.")}var t=this,n=t.list,r=t.next;if(!n){return false}e.detach();if(r){e.next=r;r.prev=e}e.prev=t;e.list=n;t.next=e;if(t===n.tail||!n.tail){n.tail=e}return e};t.exports=r},{}],19:[function(e,t,n){"use strict";t.exports=e("./_source/linked-list.js")},{"./_source/linked-list.js":18}],20:[function(e,t,n){"use strict";function g(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,r){t=t||"&";n=n||"=";var i={};if(typeof e!=="string"||e.length===0){return i}var o=/\+/g;e=e.split(t);var a=1e3;if(r&&typeof r.maxKeys==="number"){a=r.maxKeys}var s=e.length;if(a>0&&s>a){s=a}for(var l=0;l<s;++l){var u=e[l].replace(o,"%20"),c=u.indexOf(n),p,h,d,f;if(c>=0){p=u.substr(0,c);h=u.substr(c+1)}else{p=u;h=""}d=decodeURIComponent(p);f=decodeURIComponent(h);if(!g(i,d)){i[d]=f}else if(m(i[d])){i[d].push(f)}else{i[d]=[i[d],f]}}return i};var m=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"}},{}],21:[function(e,t,n){"use strict";var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(n,r,i,e){r=r||"&";i=i||"=";if(n===null){n=undefined}if(typeof n==="object"){return s(l(n),function(e){var t=encodeURIComponent(o(e))+i;if(a(n[e])){return s(n[e],function(e){return t+encodeURIComponent(o(e))}).join(r)}else{return t+encodeURIComponent(o(n[e]))}}).join(r)}if(!e)return"";return encodeURIComponent(o(e))+i+encodeURIComponent(o(n))};var a=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"};function s(e,t){if(e.map)return e.map(t);var n=[];for(var r=0;r<e.length;r++){n.push(t(e[r],r))}return n}var l=Object.keys||function(e){var t=[];for(var n in e){if(Object.prototype.hasOwnProperty.call(e,n))t.push(n)}return t}},{}],22:[function(e,t,n){"use strict";n.decode=n.parse=e("./decode");n.encode=n.stringify=e("./encode")},{"./decode":20,"./encode":21}],23:[function(e,t,n){t.exports=function e(t){var a=[],s=[];return function e(t,n){var r,i,o;if(typeof t==="object"&&t!==null&&!(t instanceof Boolean)&&!(t instanceof Date)&&!(t instanceof Number)&&!(t instanceof RegExp)&&!(t instanceof String)){for(r=0;r<a.length;r+=1){if(a[r]===t){return{$ref:s[r]}}}a.push(t);s.push(n);if(Object.prototype.toString.apply(t)==="[object Array]"){o=[];for(r=0;r<t.length;r+=1){o[r]=e(t[r],n+"["+r+"]")}}else{o={};for(i in t){if(Object.prototype.hasOwnProperty.call(t,i)){o[i]=e(t[i],n+"["+JSON.stringify(i)+"]")}}}return o}return t}(t,"$")}},{}],24:[function(e,t,n){var o=e("./decycle");var r=function(){return!this}();function i(e,t){this.name="AuthTokenExpiredError";this.message=e;this.expiry=t;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}i.prototype=Object.create(Error.prototype);function a(e){this.name="AuthTokenInvalidError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}a.prototype=Object.create(Error.prototype);function s(e,t){this.name="AuthTokenNotBeforeError";this.message=e;this.date=t;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}s.prototype=Object.create(Error.prototype);function l(e){this.name="AuthTokenError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}l.prototype=Object.create(Error.prototype);function u(e){this.name="AuthError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}u.prototype=Object.create(Error.prototype);function c(e,t){this.name="SilentMiddlewareBlockedError";this.message=e;this.type=t;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}c.prototype=Object.create(Error.prototype);function p(e){this.name="InvalidActionError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}p.prototype=Object.create(Error.prototype);function h(e){this.name="InvalidArgumentsError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}h.prototype=Object.create(Error.prototype);function d(e){this.name="InvalidOptionsError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}d.prototype=Object.create(Error.prototype);function f(e){this.name="InvalidMessageError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}f.prototype=Object.create(Error.prototype);function g(e,t){this.name="SocketProtocolError";this.message=e;this.code=t;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}g.prototype=Object.create(Error.prototype);function m(e){this.name="ServerProtocolError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}m.prototype=Object.create(Error.prototype);function b(e){this.name="HTTPServerError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}b.prototype=Object.create(Error.prototype);function v(e){this.name="ResourceLimitError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}v.prototype=Object.create(Error.prototype);function O(e){this.name="TimeoutError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}O.prototype=Object.create(Error.prototype);function y(e,t){this.name="BadConnectionError";this.message=e;this.type=t;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}y.prototype=Object.create(Error.prototype);function S(e){this.name="BrokerError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}S.prototype=Object.create(Error.prototype);function C(e,t){this.name="ProcessExitError";this.message=e;this.code=t;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}C.prototype=Object.create(Error.prototype);function E(e){this.name="UnknownError";this.message=e;if(Error.captureStackTrace&&!r){Error.captureStackTrace(this,arguments.callee)}else{this.stack=(new Error).stack}}E.prototype=Object.create(Error.prototype);t.exports={AuthTokenExpiredError:i,AuthTokenInvalidError:a,AuthTokenNotBeforeError:s,AuthTokenError:l,AuthError:u,SilentMiddlewareBlockedError:c,InvalidActionError:p,InvalidArgumentsError:h,InvalidOptionsError:d,InvalidMessageError:f,SocketProtocolError:g,ServerProtocolError:m,HTTPServerError:b,ResourceLimitError:v,TimeoutError:O,BadConnectionError:y,BrokerError:S,ProcessExitError:C,UnknownError:E};t.exports.socketProtocolErrorStatuses={1001:"Socket was disconnected",1002:"A WebSocket protocol error was encountered",1003:"Server terminated socket because it received invalid data",1005:"Socket closed without status code",1006:"Socket hung up",1007:"Message format was incorrect",1008:"Encountered a policy violation",1009:"Message was too big to process",1010:"Client ended the connection because the server did not comply with extension requirements",1011:"Server encountered an unexpected fatal condition",4e3:"Server ping timed out",4001:"Client pong timed out",4002:"Server failed to sign auth token",4003:"Failed to complete handshake",4004:"Client failed to save auth token",4005:"Did not receive #handshake from client before timeout",4006:"Failed to bind socket to message broker",4007:"Client connection establishment timed out",4008:"Server rejected handshake from client",4009:"Server received a message before the client handshake"};t.exports.socketProtocolIgnoreStatuses={1e3:"Socket closed normally",1001:"Socket hung up"};var x={domain:1,domainEmitter:1,domainThrown:1};t.exports.dehydrateError=function e(t,n){var r;if(t&&typeof t==="object"){r={message:t.message};if(n){r.stack=t.stack}for(var i in t){if(!x[i]){r[i]=t[i]}}}else if(typeof t==="function"){r="[function "+(t.name||"anonymous")+"]"}else{r=t}return o(r)};t.exports.hydrateError=function e(t){var n=null;if(t!=null){if(typeof t==="object"){n=new Error(t.message);for(var r in t){if(t.hasOwnProperty(r)){n[r]=t[r]}}}else{n=t}}return n};t.exports.decycle=o},{"./decycle":23}],25:[function(e,a,t){(function(r){var o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var n=/^[ \n\r\t]*[{\[]/;var i=function(e){var t=new Uint8Array(e);var n=t.length;var r="";for(var i=0;i<n;i+=3){r+=o[t[i]>>2];r+=o[(t[i]&3)<<4|t[i+1]>>4];r+=o[(t[i+1]&15)<<2|t[i+2]>>6];r+=o[t[i+2]&63]}if(n%3===2){r=r.substring(0,r.length-1)+"="}else if(n%3===1){r=r.substring(0,r.length-2)+"=="}return r};var t=function(e,t){if(r.ArrayBuffer&&t instanceof r.ArrayBuffer){return{base64:true,data:i(t)}}else if(r.Buffer){if(t instanceof r.Buffer){return{base64:true,data:t.toString("base64")}}if(t&&t.type==="Buffer"&&Array.isArray(t.data)){var n;if(r.Buffer.from){n=r.Buffer.from(t.data)}else{n=new r.Buffer(t.data)}return{base64:true,data:n.toString("base64")}}}return t};a.exports.decode=function(e){if(e==null){return null}if(e==="#1"||e==="#2"){return e}var t=e.toString();if(!n.test(t)){return t}try{return JSON.parse(t)}catch(e){}return t};a.exports.encode=function(e){if(e==="#1"||e==="#2"){return e}return JSON.stringify(e,t)}}).call(this,typeof global!=="undefined"?global:typeof self!=="undefined"?self:typeof window!=="undefined"?window:{})},{}],26:[function(u,c,e){(function(r){"use strict";const t=Symbol.prototype.valueOf;const n=u("kind-of");function e(e,t){switch(n(e)){case"array":return e.slice();case"object":return Object.assign({},e);case"date":return new e.constructor(Number(e));case"map":return new Map(e);case"set":return new Set(e);case"buffer":return s(e);case"symbol":return l(e);case"arraybuffer":return o(e);case"float32array":case"float64array":case"int16array":case"int32array":case"int8array":case"uint16array":case"uint32array":case"uint8clampedarray":case"uint8array":return a(e);case"regexp":return i(e);case"error":return Object.create(e);default:{return e}}}function i(e){const t=e.flags!==void 0?e.flags:/\w+$/.exec(e)||void 0;const n=new e.constructor(e.source,t);n.lastIndex=e.lastIndex;return n}function o(e){const t=new e.constructor(e.byteLength);new Uint8Array(t).set(new Uint8Array(e));return t}function a(e,t){return new e.constructor(e.buffer,e.byteOffset,e.length)}function s(e){const t=e.length;const n=r.allocUnsafe?r.allocUnsafe(t):r.from(t);e.copy(n);return n}function l(e){return t?Object(t.call(e)):{}}c.exports=e}).call(this,u("buffer").Buffer)},{buffer:11,"kind-of":17}],27:[function(e,t,n){const r=e("consumable-stream");class i extends r{constructor(e,t){super();this.name=t;this._streamDemux=e}createConsumer(e){return this._streamDemux.createConsumer(this.name,e)}}t.exports=i},{"consumable-stream":13}],28:[function(e,t,n){const r=e("writable-consumable-stream");const i=e("./demuxed-consumable-stream");class o{constructor(){this._mainStream=new r}write(e,t){this._mainStream.write({stream:e,data:{value:t,done:false}})}close(e,t){this._mainStream.write({stream:e,data:{value:t,done:true}})}closeAll(e){this._mainStream.close(e)}writeToConsumer(e,t){this._mainStream.writeToConsumer(e,{consumerId:e,data:{value:t,done:false}})}closeConsumer(e,t){this._mainStream.closeConsumer(e,{consumerId:e,data:{value:t,done:true}})}getConsumerStats(e){return this._mainStream.getConsumerStats(e)}getConsumerStatsList(t){let e=this._mainStream.getConsumerStatsList();return e.filter(e=>{return e.stream===t})}getConsumerStatsListAll(){return this._mainStream.getConsumerStatsList()}kill(e,t){let n=this.getConsumerStatsList(e);let r=n.length;for(let e=0;e<r;e++){this.killConsumer(n[e].id,t)}}killAll(e){this._mainStream.kill(e)}killConsumer(e,t){this._mainStream.killConsumer(e,t)}getBackpressure(e){let n=this.getConsumerStatsList(e);let r=n.length;let i=0;for(let t=0;t<r;t++){let e=n[t];if(e.backpressure>i){i=e.backpressure}}return i}getBackpressureAll(){return this._mainStream.getBackpressure()}getConsumerBackpressure(e){return this._mainStream.getConsumerBackpressure(e)}hasConsumer(e,t){let n=this._mainStream.getConsumerStats(t);return!!n&&n.stream===e}hasConsumerAll(e){return this._mainStream.hasConsumer(e)}createConsumer(t,e){let n=this._mainStream.createConsumer(e);let r=n.next;n.next=async function(){while(true){let e=await r.apply(this,arguments);if(e.value){if(e.value.stream===t||e.value.consumerId===this.id){if(e.value.data.done){this.return()}return e.value.data}}if(e.done){return e}}};let i=n.getStats;n.getStats=function(){let e=i.apply(this,arguments);e.stream=t;return e};let o=n.applyBackpressure;n.applyBackpressure=function(e){if(e.value){if(e.value.stream===t||e.value.consumerId===this.id){o.apply(this,arguments);return}}if(e.done){o.apply(this,arguments)}};let a=n.releaseBackpressure;n.releaseBackpressure=function(e){if(e.value){if(e.value.stream===t||e.value.consumerId===this.id){a.apply(this,arguments);return}}if(e.done){a.apply(this,arguments)}};return n}stream(e){return new i(this,e)}}t.exports=o},{"./demuxed-consumable-stream":27,"writable-consumable-stream":35}],29:[function(e,t,n){var r=e("./v1");var i=e("./v4");var o=i;o.v1=r;o.v4=i;t.exports=o},{"./v1":32,"./v4":33}],30:[function(e,t,n){var i=[];for(var r=0;r<256;++r){i[r]=(r+256).toString(16).substr(1)}function o(e,t){var n=t||0;var r=i;return[r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]]].join("")}t.exports=o},{}],31:[function(e,t,n){var r=typeof crypto!="undefined"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto!="undefined"&&typeof window.msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto);if(r){var i=new Uint8Array(16);t.exports=function e(){r(i);return i}}else{var o=new Array(16);t.exports=function e(){for(var t=0,n;t<16;t++){if((t&3)===0)n=Math.random()*4294967296;o[t]=n>>>((t&3)<<3)&255}return o}}},{}],32:[function(e,t,n){var f=e("./lib/rng");var g=e("./lib/bytesToUuid");var m;var b;var v=0;var O=0;function r(e,t,n){var r=t&&n||0;var i=t||[];e=e||{};var o=e.node||m;var a=e.clockseq!==undefined?e.clockseq:b;if(o==null||a==null){var s=f();if(o==null){o=m=[s[0]|1,s[1],s[2],s[3],s[4],s[5]]}if(a==null){a=b=(s[6]<<8|s[7])&16383}}var l=e.msecs!==undefined?e.msecs:(new Date).getTime();var u=e.nsecs!==undefined?e.nsecs:O+1;var c=l-v+(u-O)/1e4;if(c<0&&e.clockseq===undefined){a=a+1&16383}if((c<0||l>v)&&e.nsecs===undefined){u=0}if(u>=1e4){throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")}v=l;O=u;b=a;l+=122192928e5;var p=((l&268435455)*1e4+u)%4294967296;i[r++]=p>>>24&255;i[r++]=p>>>16&255;i[r++]=p>>>8&255;i[r++]=p&255;var h=l/4294967296*1e4&268435455;i[r++]=h>>>8&255;i[r++]=h&255;i[r++]=h>>>24&15|16;i[r++]=h>>>16&255;i[r++]=a>>>8|128;i[r++]=a&255;for(var d=0;d<6;++d){i[r+d]=o[d]}return t?t:g(i)}t.exports=r},{"./lib/bytesToUuid":30,"./lib/rng":31}],33:[function(e,t,n){var a=e("./lib/rng");var s=e("./lib/bytesToUuid");function r(e,t,n){var r=t&&n||0;if(typeof e=="string"){t=e==="binary"?new Array(16):null;e=null}e=e||{};var i=e.random||(e.rng||a)();i[6]=i[6]&15|64;i[8]=i[8]&63|128;if(t){for(var o=0;o<16;++o){t[r+o]=i[o]}}return t||s(i)}t.exports=r},{"./lib/bytesToUuid":30,"./lib/rng":31}],34:[function(e,t,n){class r{constructor(e,t,n,r){this.id=t;this._backpressure=0;this.stream=e;this.currentNode=n;this.timeout=r;this.isAlive=true;this.stream.setConsumer(this.id,this)}getStats(){let e={id:this.id,backpressure:this._backpressure};if(this.timeout!=null){e.timeout=this.timeout}return e}_resetBackpressure(){this._backpressure=0}applyBackpressure(e){this._backpressure++}releaseBackpressure(e){this._backpressure--}getBackpressure(){return this._backpressure}write(e){if(this._timeoutId!==undefined){clearTimeout(this._timeoutId);delete this._timeoutId}this.applyBackpressure(e);if(this._resolve){this._resolve();delete this._resolve}}kill(e){if(this._timeoutId!==undefined){clearTimeout(this._timeoutId);delete this._timeoutId}this._killPacket={value:e,done:true};this._destroy();if(this._resolve){this._resolve();delete this._resolve}}_destroy(){this.isAlive=false;this._resetBackpressure();this.stream.removeConsumer(this.id)}async _waitForNextItem(i){return new Promise((e,n)=>{this._resolve=e;let r;if(i!==undefined){let t=new Error("Stream consumer iteration timed out");(async()=>{let e=o(i);r=e.timeoutId;await e.promise;t.name="TimeoutError";delete this._resolve;n(t)})()}this._timeoutId=r})}async next(){this.stream.setConsumer(this.id,this);while(true){if(!this.currentNode.next){try{await this._waitForNextItem(this.timeout)}catch(e){this._destroy();throw e}}if(this._killPacket){this._destroy();let e=this._killPacket;delete this._killPacket;return e}this.currentNode=this.currentNode.next;this.releaseBackpressure(this.currentNode.data);if(this.currentNode.consumerId&&this.currentNode.consumerId!==this.id){continue}if(this.currentNode.data.done){this._destroy()}return this.currentNode.data}}return(){delete this.currentNode;this._destroy();return{}}[Symbol.asyncIterator](){return this}}function o(t){let n;let e=new Promise(e=>{n=setTimeout(e,t)});return{timeoutId:n,promise:e}}t.exports=r},{}],35:[function(e,t,n){const r=e("consumable-stream");const i=e("./consumer");class o extends r{constructor(){super();this.nextConsumerId=1;this._consumers={};this._tailNode={next:null,data:{value:undefined,done:false}}}_write(e,t,n){let r={data:{value:e,done:t},next:null};if(n){r.consumerId=n}this._tailNode.next=r;this._tailNode=r;let i=Object.values(this._consumers);let o=i.length;for(let t=0;t<o;t++){let e=i[t];e.write(r.data)}}write(e){this._write(e,false)}close(e){this._write(e,true)}writeToConsumer(e,t){this._write(t,false,e)}closeConsumer(e,t){this._write(t,true,e)}kill(t){let n=Object.keys(this._consumers);let r=n.length;for(let e=0;e<r;e++){this.killConsumer(n[e],t)}}killConsumer(e,t){let n=this._consumers[e];if(!n){return}n.kill(t)}getBackpressure(){let r=Object.values(this._consumers);let e=r.length;let i=0;for(let n=0;n<e;n++){let e=r[n];let t=e.getBackpressure();if(t>i){i=t}}return i}getConsumerBackpressure(e){let t=this._consumers[e];if(t){return t.getBackpressure()}return 0}hasConsumer(e){return!!this._consumers[e]}setConsumer(e,t){this._consumers[e]=t;if(!t.currentNode){t.currentNode=this._tailNode}}removeConsumer(e){delete this._consumers[e]}getConsumerStats(e){let t=this._consumers[e];if(t){return t.getStats()}return undefined}getConsumerStatsList(){let n=[];let r=Object.values(this._consumers);let e=r.length;for(let t=0;t<e;t++){let e=r[t];n.push(e.getStats())}return n}createConsumer(e){return new i(this,this.nextConsumerId++,this._tailNode,e)}}t.exports=o},{"./consumer":34,"consumable-stream":13}],"socketcluster-client":[function(e,t,n){const r=e("./lib/clientsocket");const i=e("./lib/factory");const o="16.0.1";t.exports.factory=i;t.exports.AGClientSocket=r;t.exports.create=function(e){return i.create({...e,version:o})};t.exports.version=o},{"./lib/clientsocket":2,"./lib/factory":3}]},{},["socketcluster-client"])("socketcluster-client")});(()=>{"use strict";var e={};const a={ANIM:{EASINGS:["linear","absolute","smoothstep","smootherstep","Cubic In","Cubic Out","Cubic In Out","Expo In","Expo Out","Expo In Out","Sin In","Sin Out","Sin In Out","Quart In","Quart Out","Quart In Out","Quint In","Quint Out","Quint In Out","Back In","Back Out","Back In Out","Elastic In","Elastic Out","Bounce In","Bounce Out"],EASING_LINEAR:0,EASING_ABSOLUTE:1,EASING_SMOOTHSTEP:2,EASING_SMOOTHERSTEP:3,EASING_CUBICSPLINE:4,EASING_CUBIC_IN:5,EASING_CUBIC_OUT:6,EASING_CUBIC_INOUT:7,EASING_EXPO_IN:8,EASING_EXPO_OUT:9,EASING_EXPO_INOUT:10,EASING_SIN_IN:11,EASING_SIN_OUT:12,EASING_SIN_INOUT:13,EASING_BACK_IN:14,EASING_BACK_OUT:15,EASING_BACK_INOUT:16,EASING_ELASTIC_IN:17,EASING_ELASTIC_OUT:18,EASING_BOUNCE_IN:19,EASING_BOUNCE_OUT:21,EASING_QUART_IN:22,EASING_QUART_OUT:23,EASING_QUART_INOUT:24,EASING_QUINT_IN:25,EASING_QUINT_OUT:26,EASING_QUINT_INOUT:27},OP:{OP_PORT_TYPE_VALUE:0,OP_PORT_TYPE_NUMBER:0,OP_PORT_TYPE_FUNCTION:1,OP_PORT_TYPE_TRIGGER:1,OP_PORT_TYPE_OBJECT:2,OP_PORT_TYPE_TEXTURE:2,OP_PORT_TYPE_ARRAY:3,OP_PORT_TYPE_DYNAMIC:4,OP_PORT_TYPE_STRING:5,OP_VERSION_PREFIX:"_v"},PORT:{PORT_DIR_IN:0,PORT_DIR_OUT:1},PACO:{PACO_CLEAR:0,PACO_VALUECHANGE:1,PACO_OP_DELETE:2,PACO_UNLINK:3,PACO_LINK:4,PACO_LOAD:5,PACO_OP_CREATE:6,PACO_OP_ENABLE:7,PACO_OP_DISABLE:8,PACO_UIATTRIBS:9,PACO_VARIABLES:10,PACO_TRIGGERS:11,PACO_PORT_SETVARIABLE:12,PACO_PORT_SETANIMATED:13,PACO_PORT_ANIM_UPDATED:14,PACO_DESERIALIZE:15}};const t=class{constructor(t,e,n,r,i,o){this._valuePort=n;this._varNamePort=r;this._op=t;this._type=e;this._typeId=-1;this._triggerPort=i;this._nextPort=o;this._btnCreate=t.inTriggerButton("Create new variable");this._btnCreate.setUiAttribs({hidePort:true});this._btnCreate.onTriggered=this._createVar.bind(this);this._helper=t.inUiTriggerButtons("",["Rename"]);this._helper.setUiAttribs({hidePort:true});this._helper.onTriggered=e=>{if(e=="Rename")CABLES.CMD.PATCH.renameVariable(t.varName.get())};this._op.setPortGroup("Variable",[this._helper,this._varNamePort,this._btnCreate]);this._op.on("uiParamPanel",this._updateVarNamesDropdown.bind(this));this._op.patch.addEventListener("variablesChanged",this._updateName.bind(this));this._op.patch.addEventListener("variableRename",this._renameVar.bind(this));this._varNamePort.onChange=this._updateName.bind(this);this._isTexture=this._valuePort.uiAttribs.objType==="texture";this._valuePort.changeAlways=true;if(this._triggerPort){this._triggerPort.onTriggered=()=>{this._setVarValue(true)}}else{this._valuePort.onChange=this._setVarValue.bind(this)}this._op.init=()=>{this._updateName();if(!this._triggerPort)this._setVarValue();this._updateErrorUi()};if(e=="array")this._typeId=a.OP.OP_PORT_TYPE_ARRAY;else if(e=="object")this._typeId=a.OP.OP_PORT_TYPE_OBJECT;else if(e=="string")this._typeId=a.OP.OP_PORT_TYPE_STRING;else if(e=="texture")this._typeId=a.OP.OP_PORT_TYPE_TEXTURE;else this._typeId=a.OP.OP_PORT_TYPE_VALUE}_updateErrorUi(){if(CABLES.UI){if(!this._varNamePort.get())this._op.setUiError("novarname","no variable selected");else{if(this._op.hasUiErrors){this._op.setUiError("novarname",null)}}}}_updateName(){const e=this._varNamePort.get();this._op.setTitle("var set");this._op.setUiAttrib({extendTitle:"#"+e});this._updateErrorUi();const t=this._op.patch.getVar(e);if(t&&!t.type)t.type=this._type;if(!this._op.patch.hasVar(e)&&e!=0&&!this._triggerPort){this._setVarValue()}if(!this._op.patch.hasVar(e)&&e!=0&&this._triggerPort){if(this._type=="string")this._op.patch.setVarValue(e,"");else if(this._type=="number")this._op.patch.setVarValue(e,"");else this._op.patch.setVarValue(e,null)}if(this._op.isCurrentUiOp()){this._updateVarNamesDropdown();this._op.refreshParams()}this._updateDisplay();this._op.patch.emitEvent("opVariableNameChanged",this._op,this._varNamePort.get())}_createVar(){CABLES.CMD.PATCH.createVariable(this._op,this._type,()=>{this._updateName()})}_updateDisplay(){this._valuePort.setUiAttribs({greyout:!this._varNamePort.get()})}_updateVarNamesDropdown(){if(CABLES.UI&&CABLES.UI.loaded&&CABLES.UI.loaded){const e=CABLES.UI.uiProfiler.start("[vars] _updateVarNamesDropdown");const t=[];const n=this._op.patch.getVars();for(const r in n)if(n[r].type==this._type&&r!="0")t.push(r);this._varNamePort.uiAttribs.values=t;e.finish()}}_renameVar(e,t){if(e!=this._varNamePort.get())return;this._varNamePort.set(t);this._updateName()}_setVarValue(e){const t=this._varNamePort.get();if(!t)return;const n=this._valuePort.get();if(this._typeId==a.OP.OP_PORT_TYPE_VALUE||this._typeId==a.OP.OP_PORT_TYPE_STRING){this._op.patch.setVarValue(t,n)}else if(this._typeId==a.OP.OP_PORT_TYPE_ARRAY){this._arr=[];CABLES.copyArray(n,this._arr);this._op.patch.setVarValue(t,this._arr)}else{if(this._typeId==a.OP.OP_PORT_TYPE_OBJECT){if(this._isTexture)this._op.patch.setVarValue(t,CGL.Texture.getEmptyTexture(this._op.patch.cgl));else this._op.patch.setVarValue(t,null);if(n&&n.tex&&n._cgl&&!this._isTexture)this._op.setUiError("texobj","Dont use object variables for textures, use varSetTexture");else this._op.setUiError("texobj",null)}this._op.patch.setVarValue(t,n)}if(e&&this._nextPort)this._nextPort.trigger()}};const n=class{constructor(e,t,n,r){this._op=e;this._type=t;this._varnamePort=n;this._variable=null;this._valueOutPort=r;this._listenerId=null;this._op.on("uiParamPanel",this._updateVarNamesDropdown.bind(this));this._op.on("uiErrorChange",this._updateTitle.bind(this));this._op.patch.on("variableRename",this._renameVar.bind(this));this._op.patch.on("variableDeleted",e=>{if(this._op.isCurrentUiOp())this._op.refreshParams()});this._varnamePort.onChange=this._changeVar.bind(this);this._op.patch.addEventListener("variablesChanged",this._init.bind(this));this._op.onDelete=()=>{if(this._variable&&this._listenerId)this._variable.off(this._listenerId)};this._op.init=()=>{this._init()}}get variable(){return this._variable}_changeVar(){if(this._variable&&this._listenerId){this._variable.off(this._listenerId)}this._init()}_renameVar(e,t){if(e!=this._varnamePort.get())return;this._varnamePort.set(t);this._updateVarNamesDropdown();this._updateTitle();this._listenerId=this._variable.on("change",this._setValueOut.bind(this))}_updateVarNamesDropdown(){if(CABLES.UI&&CABLES.UI.loaded){const e=[];const t=this._op.patch.getVars();for(const n in t)if(t[n].type==this._type&&n!="0")e.push(n);this._op.varName.uiAttribs.values=e}}_setValueOut(e){if(this._valueOutPort)this._valueOutPort.set(e)}_updateTitle(){if(this._variable){this._op.setUiError("unknownvar",null);this._op.setTitle("var get");this._op.setUiAttrib({extendTitle:"#"+this._varnamePort.get()});if(this._valueOutPort)this._valueOutPort.set(this._variable.getValue())}else{this._op.setUiError("unknownvar","unknown variable! - there is no setVariable with this name ("+this._varnamePort.get()+")");this._op.setUiAttrib({extendTitle:"#invalid"});if(this._valueOutPort)this._valueOutPort.set(0)}}_init(){this._updateVarNamesDropdown();if(this._variable&&this._listenerId)this._variable.off(this._listenerId);this._variable=this._op.patch.getVar(this._op.varName.get());if(this._variable)this._listenerId=this._variable.on("change",this._setValueOut.bind(this));this._updateTitle();this._op.patch.emitEvent("opVariableNameChanged",this._op,this._varnamePort.get())}};CABLES.VarSetOpWrapper=t;CABLES.VarGetOpWrapper=n;((this.CABLES=this.CABLES||{}).COREMODULES=this.CABLES.COREMODULES||{}).Vargetset=e.Cables})();