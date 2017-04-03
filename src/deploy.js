const fs = require("fs")
    , path = require("path")
    , crc = require("crc").crc32
    , utils = require("./utils.js")

module.exports = deploy;

function deploy(s3, bucket, directory) {
  const files = readDirectory(s3, bucket, directory);
  return true;
}

function readDirectory(s3, bucket, directory) {
  return fs.readdir(directory, (err, dirList) => {
    return dirList ? dirList.map(handleFile(s3, bucket, directory)) : console.log(err);
  });
}

function handleFile(s3, bucket, directory) {
  return (file) => {
    const filePath = path.resolve(directory, file);
    return fs.statSync(filePath).isDirectory()
      ? readDirectory(s3, bucket, filePath)
      : readFile(s3, bucket, filePath, directory);
  }
}

function readFile(s3, bucket, filePath, directory) {
  const file = fs.readFileSync(filePath);
  const cacheJson = {};
  try {
    Object.assign(cacheJson, JSON.parse(fs.readFileSync('your-cache-location')));
  } catch (err) {
    {};
  }
  return crc(file) === cacheJson[ filePath ]
    ? console.log('cached:', filePath)
    : writeCacheFile(s3, bucket, file, filePath, directory, cacheJson);
}

function writeCacheFile(s3, bucket, file, filePath, directory, cacheJson) {
  // console.log('deploying:', filePath);
  const newCache = Object.assign({}, cacheJson, { [filePath]: crc(file) });
  const cacheFile = fs.writeFileSync('your-cache-location', JSON.stringify(newCache));
  const projectPath = filePath.split(process.cwd() + "/public/")[1];
  return deployFile(s3, bucket, projectPath, file);
}

function deployFile(s3, bucket, projectPath, file) {
  const params = utils(file, projectPath, bucket);
  return s3.putObject(params).promise();
}
