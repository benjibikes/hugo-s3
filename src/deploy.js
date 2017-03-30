const fs = require("fs")
    , path = require("path")

module.exports = deploy;

function deploy(s3, bucket, directory) {
  const files = readDirectory(directory);
  return true;
}

function readDirectory(directory) {
  return fs.readdir(directory, (err, dirList) => {
    return dirList ? dirList.forEach(handleFile(directory)) : console.log(err);
  });
}

function handleFile(directory) {
  return (file) => {
    const filePath = path.resolve(directory, file);
    return fs.statSync(filePath).isDirectory() ? readDirectory(filePath) : print(filePath);
  }
}

function print(string) {
  return console.log(string);
}
