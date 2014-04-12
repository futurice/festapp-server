var General = {};

General.sendResult = function (res, err, result) {
  res.send(result);
};

General.updateArr =  function(index, arr, cb, err, object) {
  if (!err) {
    arr[index] = object;
  }
  cb(err, arr);
};



module.exports = General;
