define(function(require){
  var
    req = require('reqwest')

  , exports = {}
  ;

  exports.ajax = exports.http = req;

  exports.stage = function(fns){
    var current = function(){
      var args = Array.prototype.slice.call(arguments, 0);
      var callback = args.pop();
  
      // Redefine current after first call so that it doesn't default to 'start'
      current = function(name){
        if (!fns.hasOwnProperty(name)) throw new Error('Cannot find stage item: ', name);
        fns[name].apply(null, Array.prototype.slice.call(arguments, 1).concat(current, callback));
      };
  
      fns.start.apply(null, args.concat(current, callback));
    };
  
    return current;
  };


  exports.get = function(url, params, callback){
    exports.ajax({
      method: 'GET'
    , data:   params
    , url:    url
    }, callback);

    return exports;
  };

  exports.post = function(url, data, callback){
    exports.ajax({
      method: 'POST'
    , data:   data
    , url:    url
    }, callback);

    return exports;
  };

  exports.put = function(url, data, callback){
    exports.ajax({
      method: 'PUT'
    , data:   data
    , url:    url
    }, callback);

    return exports;
  };

   exports.put = function(url, data, callback){
    exports.ajax({
      method: 'PUT'
    , data:   data
    , url:    url
    }, callback);

    return exports;
  };

  exports.delete = function(url, data, callback){
    exports.ajax({
      method: 'PUT'
    , data:   data
    , url:    url
    }, callback);

    return exports;
  };

  /**
   * Returns a function that when called, will call the
   * passed in function with a specific set of arguments
   */
  exports.with = function(fn){
    var args = Array.prototype.slice.call(arguments, 1);
    return function(){ fn.apply({}, args); };
  };

  return exports;
});
