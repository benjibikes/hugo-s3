const mime = require("mime")

module.exports = buildUploadParams;

function buildUploadParams(file, projectPath, bucket) {
  return Object.assign({}, {
    Bucket: bucket,
    Body: file,
    ContentType: getContentType(projectPath),
    Key: projectPath
  });
}

function getContentType(projectPath) {
  const type = mime.lookup(projectPath).replace('-', '');
  const charset = mime.charsets.lookup(type, false);

  return charset ? type + '; charset=' + charset : type;
}
