/**
 * Generated by Verge3D Puzzles v.4.0.0 pre5
 * Wed Jun 08 2022 12:14:48 GMT+0300 (Moscow Standard Time)
 * Prefer not editing this file as your changes may get overridden once Puzzles are saved.
 * Check out https://www.soft8soft.com/docs/manual/en/introduction/Using-JavaScript.html
 * for the information on how to add your own JavaScript to Verge3D apps.
 */

'use strict';

(function() {

// global variables/constants used by puzzles' functions

var LIST_NONE = '<none>';

var _pGlob = {};

_pGlob.objCache = {};
_pGlob.fadeAnnotations = true;
_pGlob.pickedObject = '';
_pGlob.hoveredObject = '';
_pGlob.mediaElements = {};
_pGlob.loadedFile = '';
_pGlob.states = [];
_pGlob.percentage = 0;
_pGlob.openedFile = '';
_pGlob.xrSessionAcquired = false;
_pGlob.xrSessionCallbacks = [];
_pGlob.screenCoords = new v3d.Vector2();
_pGlob.intervalTimers = {};

_pGlob.AXIS_X = new v3d.Vector3(1, 0, 0);
_pGlob.AXIS_Y = new v3d.Vector3(0, 1, 0);
_pGlob.AXIS_Z = new v3d.Vector3(0, 0, 1);
_pGlob.MIN_DRAG_SCALE = 10e-4;
_pGlob.SET_OBJ_ROT_EPS = 1e-8;

_pGlob.vec2Tmp = new v3d.Vector2();
_pGlob.vec2Tmp2 = new v3d.Vector2();
_pGlob.vec3Tmp = new v3d.Vector3();
_pGlob.vec3Tmp2 = new v3d.Vector3();
_pGlob.vec3Tmp3 = new v3d.Vector3();
_pGlob.vec3Tmp4 = new v3d.Vector3();
_pGlob.eulerTmp = new v3d.Euler();
_pGlob.eulerTmp2 = new v3d.Euler();
_pGlob.quatTmp = new v3d.Quaternion();
_pGlob.quatTmp2 = new v3d.Quaternion();
_pGlob.colorTmp = new v3d.Color();
_pGlob.mat4Tmp = new v3d.Matrix4();
_pGlob.planeTmp = new v3d.Plane();
_pGlob.raycasterTmp = new v3d.Raycaster();

var PL = v3d.PL = v3d.PL || {};

// a more readable alias for PL (stands for "Puzzle Logic")
v3d.puzzles = PL;

PL.procedures = PL.procedures || {};


_pGlob.wooProductInfo = {};


PL.execInitPuzzles = function(options) {
    // always null, should not be available in "init" puzzles
    var appInstance = null;
    // app is more conventional than appInstance (used in exec script and app templates)
    var app = null;

    var _initGlob = {};
    _initGlob.percentage = 0;
    _initGlob.output = {
        initOptions: {
            fadeAnnotations: true,
            useBkgTransp: false,
            preserveDrawBuf: false,
            useCompAssets: false,
            useFullscreen: true,
            useCustomPreloader: false,
            preloaderStartCb: function() {},
            preloaderProgressCb: function() {},
            preloaderEndCb: function() {},
        }
    }

    // provide the container's id to puzzles that need access to the container
    _initGlob.container = options !== undefined && 'container' in options
            ? options.container : "";

    

    var PROC = {
    
};


    return _initGlob.output;
}

PL.init = function(appInstance, initOptions) {

// app is more conventional than appInstance (used in exec script and app templates)
var app = appInstance;

initOptions = initOptions || {};

if ('fadeAnnotations' in initOptions) {
    _pGlob.fadeAnnotations = initOptions.fadeAnnotations;
}

this.procedures["clone_position_cans"] = clone_position_cans;

var PROC = {
    "clone_position_cans": clone_position_cans,
};

var cloned_cans, row, quantity, product_width, stride, i, cloned_can, x_pos, y_pos, child, cloned_cans_current;

// featureAvailable puzzle
function featureAvailable(feature) {

    var userAgent = window.navigator.userAgent;
    var platform = window.navigator.platform;

    switch (feature) {
    case 'LINUX':
        return /Linux/.test(platform);
    case 'WINDOWS':
        return ['Win32', 'Win64', 'Windows', 'WinCE'].indexOf(platform) !== -1;
    case 'MACOS':
        return (['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'].indexOf(platform) !== -1 && !v3d.Detector.checkIOS());
    case 'IOS':
        return v3d.Detector.checkIOS();
    case 'ANDROID':
        return /Android/i.test(userAgent);
    case 'MOBILE':
        return (/Android|webOS|BlackBerry/i.test(userAgent) || v3d.Detector.checkIOS());

    case 'CHROME':
        // Chromium based
        return (!!window.chrome && !/Edge/.test(navigator.userAgent));
    case 'FIREFOX':
        return /Firefox/.test(navigator.userAgent);
    case 'IE':
        return /Trident/.test(navigator.userAgent);
    case 'EDGE':
        return /Edge/.test(navigator.userAgent);
    case 'SAFARI':
        return (/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent));

    case 'TOUCH':
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    case 'RETINA':
        return window.devicePixelRatio >= 2;
    case 'HDR':
        return appInstance.useHDR;
    case 'WEBAUDIO':
        return v3d.Detector.checkWebAudio();
    case 'WEBGL2':
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl2')
        return !!gl;
    case 'WOOCOMMERCE':
        var woo_fun = window.parent.v3d_woo_get_product_info || window.parent.parent.v3d_woo_get_product_info;
        return !!woo_fun;
    case 'DO_NOT_TRACK':
        if (navigator.doNotTrack == '1' || window.doNotTrack == '1')
            return true;
        else
            return false;
    default:
        return false;
    }

}

// utility function envoked by almost all V3D-specific puzzles
// filter off some non-mesh types
function notIgnoredObj(obj) {
    return obj.type !== 'AmbientLight' &&
           obj.name !== '' &&
           !(obj.isMesh && obj.isMaterialGeneratedMesh) &&
           !obj.isAuxClippingMesh;
}


// utility function envoked by almost all V3D-specific puzzles
// find first occurence of the object by its name
function getObjectByName(objName) {
    var objFound;
    var runTime = _pGlob !== undefined;
    objFound = runTime ? _pGlob.objCache[objName] : null;

    if (objFound && objFound.name === objName)
        return objFound;

    if (appInstance.scene) {
        appInstance.scene.traverse(function(obj) {
            if (!objFound && notIgnoredObj(obj) && (obj.name == objName)) {
                objFound = obj;
                if (runTime) {
                    _pGlob.objCache[objName] = objFound;
                }
            }
        });
    }
    return objFound;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects on the scene
function getAllObjectNames() {
    var objNameList = [];
    appInstance.scene.traverse(function(obj) {
        if (notIgnoredObj(obj))
            objNameList.push(obj.name)
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// retrieve all objects which belong to the group
function getObjectNamesByGroupName(targetGroupName) {
    var objNameList = [];
    appInstance.scene.traverse(function(obj){
        if (notIgnoredObj(obj)) {
            var groupNames = obj.groupNames;
            if (!groupNames)
                return;
            for (var i = 0; i < groupNames.length; i++) {
                var groupName = groupNames[i];
                if (groupName == targetGroupName) {
                    objNameList.push(obj.name);
                }
            }
        }
    });
    return objNameList;
}


// utility function envoked by almost all V3D-specific puzzles
// process object input, which can be either single obj or array of objects, or a group
function retrieveObjectNames(objNames) {
    var acc = [];
    retrieveObjectNamesAcc(objNames, acc);
    return acc.filter(function(name) {
        return name;
    });
}

function retrieveObjectNamesAcc(currObjNames, acc) {
    if (typeof currObjNames == "string") {
        acc.push(currObjNames);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "GROUP") {
        var newObj = getObjectNamesByGroupName(currObjNames[1]);
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames) && currObjNames[0] == "ALL_OBJECTS") {
        var newObj = getAllObjectNames();
        for (var i = 0; i < newObj.length; i++)
            acc.push(newObj[i]);
    } else if (Array.isArray(currObjNames)) {
        for (var i = 0; i < currObjNames.length; i++)
            retrieveObjectNamesAcc(currObjNames[i], acc);
    }
}

/**
 * Retrieve coordinate system from the loaded scene
 */
function getCoordSystem() {
    var scene = appInstance.scene;

    if (scene && 'coordSystem' in scene.userData) {
        return scene.userData.coordSystem;
    }

    return 'Y_UP_RIGHT';
}


/**
 * Transform coordinates from one space to another
 * Can be used with Vector3 or Euler.
 */
function coordsTransform(coords, from, to, noSignChange) {

    if (from == to)
        return coords;

    var y = coords.y, z = coords.z;

    if (from == 'Z_UP_RIGHT' && to == 'Y_UP_RIGHT') {
        coords.y = z;
        coords.z = noSignChange ? y : -y;
    } else if (from == 'Y_UP_RIGHT' && to == 'Z_UP_RIGHT') {
        coords.y = noSignChange ? z : -z;
        coords.z = y;
    } else {
        console.error('coordsTransform: Unsupported coordinate space');
    }

    return coords;
}


/**
 * Verge3D euler rotation to Blender/Max shortest.
 * 1) Convert from intrinsic rotation (v3d) to extrinsic XYZ (Blender/Max default
 *    order) via reversion: XYZ -> ZYX
 * 2) swizzle ZYX->YZX
 * 3) choose the shortest rotation to resemble Blender's behavior
 */
var eulerV3DToBlenderShortest = function() {

    var eulerTmp = new v3d.Euler();
    var eulerTmp2 = new v3d.Euler();
    var vec3Tmp = new v3d.Vector3();

    return function(euler, dest) {

        var eulerBlender = eulerTmp.copy(euler).reorder('YZX');
        var eulerBlenderAlt = eulerTmp2.copy(eulerBlender).makeAlternative();

        var len = eulerBlender.toVector3(vec3Tmp).lengthSq();
        var lenAlt = eulerBlenderAlt.toVector3(vec3Tmp).lengthSq();

        dest.copy(len < lenAlt ? eulerBlender : eulerBlenderAlt);
        return coordsTransform(dest, 'Y_UP_RIGHT', 'Z_UP_RIGHT');
    }

}();

function RotationInterface() {
    /**
     * For user manipulations use XYZ extrinsic rotations (which
     * are the same as ZYX intrinsic rotations)
     *     - Blender/Max/Maya use extrinsic rotations in the UI
     *     - XYZ is the default option, but could be set from
     *       some order hint if exported
     */
    this._userRotation = new v3d.Euler(0, 0, 0, 'ZYX');
    this._actualRotation = new v3d.Euler();
}

Object.assign(RotationInterface, {
    initObject: function(obj) {
        if (obj.userData.puzzles === undefined) {
            obj.userData.puzzles = {}
        }
        if (obj.userData.puzzles.rotationInterface === undefined) {
            obj.userData.puzzles.rotationInterface = new RotationInterface();
        }

        var rotUI = obj.userData.puzzles.rotationInterface;
        rotUI.updateFromObject(obj);
        return rotUI;
    }
});

Object.assign(RotationInterface.prototype, {

    updateFromObject: function(obj) {
        var SYNC_ROT_EPS = 1e-8;

        if (!this._actualRotation.equalsEps(obj.rotation, SYNC_ROT_EPS)) {
            this._actualRotation.copy(obj.rotation);
            this._updateUserRotFromActualRot();
        }
    },

    getActualRotation: function(euler) {
        return euler.copy(this._actualRotation);
    },

    setUserRotation: function(euler) {
        // don't copy the order, since it's fixed to ZYX for now
        this._userRotation.set(euler.x, euler.y, euler.z);
        this._updateActualRotFromUserRot();
    },

    getUserRotation: function(euler) {
        return euler.copy(this._userRotation);
    },

    _updateUserRotFromActualRot: function() {
        var order = this._userRotation.order;
        this._userRotation.copy(this._actualRotation).reorder(order);
    },

    _updateActualRotFromUserRot: function() {
        var order = this._actualRotation.order;
        this._actualRotation.copy(this._userRotation).reorder(order);
    }

});

// setObjTransform puzzle
function setObjTransform(objSelector, isWorldSpace, mode, vector, offset){
    var x = vector[0];
      var y = vector[1];
      var z = vector[2];

    var objNames = retrieveObjectNames(objSelector);

    function setObjProp(obj, prop, val) {
        if (!offset) {
            obj[mode][prop] = val;
        } else {
            if (mode != "scale")
                obj[mode][prop] += val;
            else
                obj[mode][prop] *= val;
        }
    }

    var inputsUsed = _pGlob.vec3Tmp.set(Number(x !== ''), Number(y !== ''),
            Number(z !== ''));
    var coords = _pGlob.vec3Tmp2.set(x || 0, y || 0, z || 0);

    if (mode === 'rotation') {
        // rotations are specified in degrees
        coords.multiplyScalar(v3d.MathUtils.DEG2RAD);
    }

    var coordSystem = getCoordSystem();

    coordsTransform(inputsUsed, coordSystem, 'Y_UP_RIGHT', true);
    coordsTransform(coords, coordSystem, 'Y_UP_RIGHT', mode === 'scale');

    for (var i = 0; i < objNames.length; i++) {

        var objName = objNames[i];
        if (!objName) continue;

        var obj = getObjectByName(objName);
        if (!obj) continue;

        if (isWorldSpace && obj.parent) {
            obj.matrixWorld.decomposeE(obj.position, obj.rotation, obj.scale);

            if (inputsUsed.x) setObjProp(obj, "x", coords.x);
            if (inputsUsed.y) setObjProp(obj, "y", coords.y);
            if (inputsUsed.z) setObjProp(obj, "z", coords.z);

            obj.matrixWorld.composeE(obj.position, obj.rotation, obj.scale);
            obj.matrix.multiplyMatrices(_pGlob.mat4Tmp.copy(obj.parent.matrixWorld).invert(), obj.matrixWorld);
            obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);

        } else if (mode === 'rotation' && coordSystem == 'Z_UP_RIGHT') {
            // Blender/Max coordinates

            // need all the rotations for order conversions, especially if some
            // inputs are not specified
            var euler = eulerV3DToBlenderShortest(obj.rotation, _pGlob.eulerTmp);
            coordsTransform(euler, coordSystem, 'Y_UP_RIGHT');

            if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
            if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
            if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

            /**
             * convert from Blender/Max default XYZ extrinsic order to v3d XYZ
             * intrinsic with reversion (XYZ -> ZYX) and axes swizzling (ZYX -> YZX)
             */
            euler.order = "YZX";
            euler.reorder(obj.rotation.order);
            obj.rotation.copy(euler);

        } else if (mode === 'rotation' && coordSystem == 'Y_UP_RIGHT') {
            // Maya coordinates

            // Use separate rotation interface to fix ambiguous rotations for Maya,
            // might as well do the same for Blender/Max.

            var rotUI = RotationInterface.initObject(obj);
            var euler = rotUI.getUserRotation(_pGlob.eulerTmp);
            // TODO(ivan): this probably needs some reasonable wrapping
            if (inputsUsed.x) euler.x = offset ? euler.x + coords.x : coords.x;
            if (inputsUsed.y) euler.y = offset ? euler.y + coords.y : coords.y;
            if (inputsUsed.z) euler.z = offset ? euler.z + coords.z : coords.z;

            rotUI.setUserRotation(euler);
            rotUI.getActualRotation(obj.rotation);
        } else {
            if (inputsUsed.x) setObjProp(obj, "x", coords.x);
            if (inputsUsed.y) setObjProp(obj, "y", coords.y);
            if (inputsUsed.z) setObjProp(obj, "z", coords.z);

        }

        obj.updateMatrixWorld(true);
    }

}

// dictGet puzzle
function dictGet(dict, key) {
    if (dict && typeof dict == 'object')
        return dict[key];
}

// removeObject puzzles
function removeObject(objSelector) {
    var objNames = retrieveObjectNames(objSelector);

    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i]
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (!obj || !obj.parent)
            continue;

        obj.parent.remove(obj);

        // clean object cache
        _pGlob.objCache = {};
    }
}

// assignMaterial puzzle
function assignMat(objSelector, matName) {
    var objNames = retrieveObjectNames(objSelector);
    if (!matName)
        return;
    var mat = v3d.SceneUtils.getMaterialByName(appInstance, matName);
    if (!mat)
        return;
    for (var i = 0; i < objNames.length; i++) {
        var objName = objNames[i];
        if (!objName)
            continue;
        var obj = getObjectByName(objName);
        if (obj) {
            var firstSubmesh = obj.resolveMultiMaterial()[0];
            firstSubmesh.material = mat;
        }
    }
}

function wooProductAttribute() {
    return (function(name) {
        // wooProductAttribute puzzle
        const attr = name.toLowerCase().replace(' ', '-');
        return _pGlob.wooProductInfo.attributes[attr];
    }).apply(null, arguments);
}

function wooGetProductInfo() {
    return (function(whenReadyCb) {
        // wooGetProductInfo puzzle
        const woo_fun = window.parent.v3d_woo_get_product_info
                || window.parent.parent.v3d_woo_get_product_info || null;

        if (woo_fun) {
            woo_fun(function(info) {
                _pGlob.wooProductInfo = info;
                whenReadyCb();
            });
        } else {
            console.error('wooGetProductInfo: WooCommerce not found.');
        }
    }).apply(null, arguments);
}

// utility functions envoked by the HTML puzzles
function getElements(ids, isParent) {
    var elems = [];
    if (Array.isArray(ids) && ids[0] != 'CONTAINER' && ids[0] != 'WINDOW' &&
        ids[0] != 'DOCUMENT' && ids[0] != 'BODY' && ids[0] != 'QUERYSELECTOR') {
        for (var i = 0; i < ids.length; i++)
            elems.push(getElement(ids[i], isParent));
    } else {
        elems.push(getElement(ids, isParent));
    }
    return elems;
}

function getElement(id, isParent) {
    var elem;
    if (Array.isArray(id) && id[0] == 'CONTAINER') {
        if (appInstance !== null) {
            elem = appInstance.container;
        } else if (typeof _initGlob !== 'undefined') {
            // if we are on the initialization stage, we still can have access
            // to the container element
            var id = _initGlob.container;
            if (isParent) {
                elem = parent.document.getElementById(id);
            } else {
                elem = document.getElementById(id);
            }
        }
    } else if (Array.isArray(id) && id[0] == 'WINDOW') {
        if (isParent)
            elem = parent;
        else
            elem = window;
    } else if (Array.isArray(id) && id[0] == 'DOCUMENT') {
        if (isParent)
            elem = parent.document;
        else
            elem = document;
    } else if (Array.isArray(id) && id[0] == 'BODY') {
        if (isParent)
            elem = parent.document.body;
        else
            elem = document.body;
    } else if (Array.isArray(id) && id[0] == 'QUERYSELECTOR') {
        if (isParent)
            elem = parent.document.querySelector(id);
        else
            elem = document.querySelector(id);
    } else {
        if (isParent)
            elem = parent.document.getElementById(id);
        else
            elem = document.getElementById(id);
    }
    return elem;
}

// addHTMLElement puzzle
function addHTMLElement(elemType, id, mode, targetId, isParent) {

    var win = isParent ? window.parent : window;

    var elem = win.document.createElement(elemType);
    if (id !== '')
        elem.id = id;

    var targetElem = getElement(targetId, isParent);
    if (targetElem instanceof win.Element) {
        switch (mode) {
            case 'TO':
                targetElem.appendChild(elem);
                break;
            case 'BEFORE':
                targetElem.insertAdjacentElement('beforebegin', elem);
                break;
            case 'AFTER':
                targetElem.insertAdjacentElement('afterend', elem);
                break;
        }
    }
}

// setHTMLElemAttribute puzzle
function setHTMLElemAttribute(attr, value, ids, isParent) {
    var elems = getElements(ids, isParent);
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (!elem) continue;

        if ((attr == 'href' || attr == 'src') && value instanceof Promise) {
            // resolve promise value for url-based attributes
            value.then(function(response) {
                elem[attr] = response;
            });
        } else {
            elem[attr] = value;
        }
    }
}

function findUniqueObjectName(name) {
    function objNameUsed(name) {
        return Boolean(getObjectByName(name));
    }
    while (objNameUsed(name)) {
        var r = name.match(/^(.*?)(\d+)$/);
        if (!r) {
            name += "2";
        } else {
            name = r[1] + (parseInt(r[2], 10) + 1);
        }
    }
    return name;
}

// cloneObject puzzle
function cloneObject(objName) {
    if (!objName)
        return;
    var obj = getObjectByName(objName);
    if (!obj)
        return;
    var newObj = obj.clone();
    newObj.name = findUniqueObjectName(obj.name);
    appInstance.scene.add(newObj);
    return newObj.name;
}

// Describe this function...
function clone_position_cans(row, quantity, product_width, cloned_cans) {
  if (!quantity) {
    return;
  }
  stride = product_width / 100 + 0.02;
  var i_end = quantity - 1;
  var i_inc = 1;
  if (0 > i_end) {
    i_inc = -i_inc;
  }
  for (i = 0; i_inc >= 0 ? i <= i_end : i >= i_end; i += i_inc) {
    cloned_can = cloneObject('Can');
    x_pos = (quantity - 1) * -0.5 * stride + i * stride;
    y_pos = row * stride;
    setObjTransform(cloned_can, false, 'position', [x_pos, y_pos, 0], false);
    cloned_cans.push(cloned_can);
  }
}


cloned_cans = [];

if (featureAvailable('WOOCOMMERCE')) {
  setObjTransform('Can', false, 'position', ['', '', -1], false);
  wooGetProductInfo(function() {
    console.log(_pGlob.wooProductInfo);
    quantity = dictGet(_pGlob.wooProductInfo, 'quantity');
    removeObject(cloned_cans);
    cloned_cans = [];
    if (dictGet(_pGlob.wooProductInfo, 'type') == 'simple') {
      clone_position_cans(0, quantity, dictGet(_pGlob.wooProductInfo, 'width'), cloned_cans);
      assignMat(cloned_cans, dictGet(_pGlob.wooProductInfo, 'sku'));
    } else if (dictGet(_pGlob.wooProductInfo, 'type') == 'variable') {
      clone_position_cans(0, quantity, dictGet(_pGlob.wooProductInfo, 'width'), cloned_cans);
      assignMat(cloned_cans, wooProductAttribute('Kind'));
      if (wooProductAttribute('Size') == 'Small') {
        setObjTransform(cloned_cans, false, 'scale', [0.8, 0.8, 0.8], false);
      } else if (wooProductAttribute('Size') == 'Large') {
        setObjTransform(cloned_cans, false, 'scale', [1.2, 1.2, 1.2], false);
      }
    } else {
      row = -1;
      var child_list = dictGet(_pGlob.wooProductInfo, 'children');
      for (var child_index in child_list) {
        child = child_list[child_index];
        cloned_cans_current = [];
        clone_position_cans(row, dictGet(child, 'quantity'), dictGet(child, 'width'), cloned_cans_current);
        assignMat(cloned_cans_current, dictGet(child, 'sku'));
        cloned_cans.push(cloned_cans_current);
        row = (typeof row === 'number' ? row : 0) + 1;
      }
    }
  });
} else {
  addHTMLElement('div', 'alert', 'TO', ['CONTAINER'], false);
  setHTMLElemAttribute('innerHTML', ('WooCommerce not found! Please setup a new product to make this app work.' + '\n' +
  'Alternatively, you can play with sandbox store <a href="https://sandbox.soft8soft.com/shop/" target="_blank" id="alertLink">here</a>.'), 'alert', false);
  setHTMLElemAttribute('style', ('position: absolute;' + '\n' +
  'padding: 20px;' + '\n' +
  'background-color: #f44336;' + '\n' +
  'color: white;' + '\n' +
  'opacity: 1;' + '\n' +
  'transition: opacity 0.6s;' + '\n' +
  'left: 0px;' + '\n' +
  'right: 0px;' + '\n' +
  'bottom: 0px;' + '\n' +
  'font-family: sans-serif;' + '\n' +
  'text-align: center;'), 'alert', false);
  setHTMLElemAttribute('style', 'color: white', 'alertLink', false);
}



} // end of PL.init function

})(); // end of closure

/* ================================ end of code ============================= */
