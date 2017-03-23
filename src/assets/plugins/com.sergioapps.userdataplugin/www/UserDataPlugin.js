cordova.define("com.sergioapps.userdata.UserDataPlugin", function (require, exports, module) {
    var UserDataPlugin = {     
                    callNativeFunction: function (success, fail, resultType) {
                        return cordova.exec( success, fail,
                                            "UserDataPlugin", 
                                            "nativeAction", [resultType]);     
    } 
};
module.exports = UserDataPlugin;

});