var gain = require('gain');

module.exports = pull;

function pull(options) {
  // Run gain factory.
  var fill = gain(options);

  // Return through pull-stream
  return function (read, ) {
    return function (end, cb) {
      read(end, function(end, data) {
        if (end !== null) return cb(end);
        cb(fill(data));
      });
    };
  };
};
