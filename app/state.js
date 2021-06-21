var _state = (function() {
    var _data = {};

    return {
        log: function(){
            console.log("Testing")
        }
    };

})();

var StatePlugin = new Object;

StatePlugin.install = function(TurpialCore) {

    TurpialCore.prototype.$state = _state

};

Tulipan.use(StatePlugin);