cordova.define("com.sergioapps.compass.CompassPlugin", function (require, exports, module) {
    var CompassPlugin = {     
                    callNativeFunction: function (success, fail, resultType) {
                        return cordova.exec( success, fail,
                                            "CompassPlugin", 
                                            "nativeAction", [resultType]);     
    } 
};
module.exports = CompassPlugin;

});