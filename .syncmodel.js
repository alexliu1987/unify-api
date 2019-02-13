const fs = require('fs');
const path = require('path');
const cfg = require('./configs');
const modelPath = './model';
const ReplaceStream = require('./services/replace-stream');

if (!fs.existsSync(modelPath)) {
  fs.mkdirSync(modelPath);
}
syncDir();

function syncDir(dirPath = '') {
  let dir = fs.readdirSync(cfg.model + dirPath, {
    withFileTypes: true
  });
  for (let d of dir) {
    //文件迁移
    if (d.isFile()) {
      syncFile(dirPath + '/' + d.name);
    }
    //目录递归
    if (d.isDirectory()) {
      if (!fs.existsSync(modelPath + dirPath + '/' + d.name)) {
        fs.mkdirSync(modelPath + dirPath + '/' + d.name);
      }
      syncDir(dirPath + '/' + d.name);
    }
  }
}

function syncFile(filePath) {
  let repImport = new ReplaceStream(
    /import (\S+) from (\S+)/g,
    'const $1 = require($2)'
  );
  let repExport = new ReplaceStream(/export default/g, 'module.exports =');
  fs.createReadStream(cfg.model + filePath)
    .pipe(repImport)
    .pipe(repExport)
    .pipe(fs.createWriteStream(modelPath + filePath));
}
