const stream = require('stream');
const util = require('util');
function ReplaceStream(searchString, replaceString, mutiLine = false) {
  stream.Transform.call(this, { decodeStrings: false });
  this.mutiLine = mutiLine;
  this.searchString = searchString;
  this.replaceString = replaceString;
  this.tailPiece = '';
}
util.inherits(ReplaceStream, stream.Transform);
ReplaceStream.prototype._transform = function(chunk, encoding, callback) {
  if (this.mutiLine) {
    this.tailPiece = this.tailPiece + chunk;
    return callback();
  }
  var pieces = (this.tailPiece + chunk).split(/\n/);
  this.tailPiece = '\n' + pieces.pop();
  this.push(pieces.join('\n').replace(this.searchString, this.replaceString));
  callback();
};
ReplaceStream.prototype._flush = function(callback) {
  this.push(this.tailPiece.replace(this.searchString, this.replaceString));
  callback();
};
module.exports = ReplaceStream;
