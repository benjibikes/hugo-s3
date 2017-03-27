module.exports = setNewPolicy;

function setNewPolicy(s3, bucket) {
  const policyGot = getPolicy(s3, bucket).then(policy => { return policy }).catch(err => { return checkNoPolicy(err) });
  const policySet = policyGot.then(policy => { return createAndSetPolicy(policy, s3, bucket) });

  return policySet;
}

function checkNoPolicy (err) {
  return err.code === "NoSuchBucketPolicy" ? {} : err;
}

function getPolicy(s3, bucket) {
  return s3.getBucketPolicy({ Bucket: bucket }).promise();
}

function createAndSetPolicy(currentPolicy, s3, bucket) {
  const policy = assignPublicReadToPolicy(currentPolicy, bucket);
  return s3.putBucketPolicy({ Bucket: bucket, Policy: JSON.stringify(policy) }).promise();
}

function assignPublicReadToPolicy(currentPolicy, bucket) {
  const publicRead = {
    "Statement": [ {
      "Sid": "AddPublicReadPermissions",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": `arn:aws:s3:::${ bucket }/*`
    } ]
  };
  const policyIsPublicAlready = currentPolicy.Policy ? checkPolicyForPublic(JSON.parse(currentPolicy.Policy).Statement) : false;
  return !policyIsPublicAlready ? Object.assign({}, currentPolicy, publicRead) : JSON.parse(currentPolicy.Policy);
}

function checkPolicyForPublic(statement) {
  return statement.filter(attribute => attribute.Sid === "AddPublicReadPermissions").length > 0 ? true : false;
}
