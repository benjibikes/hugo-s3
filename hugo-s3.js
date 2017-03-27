#!/usr/bin/env node

// go get and set the policies
// concurrently, do the work down here (crawling directories and whatnot)
// send that shit up

// import "minimist";
// import * as AWS from "aws-sdk";
const minimist = require("minimist")
    , AWS = require("aws-sdk")

function run(processArgv) {
  const argv = minimist(processArgv.slice(2));
  const s3 = new AWS.S3({ region: "us-east-1" });
  const bucket = "biancaidas.com";
  const gotPolicy = s3.getBucketPolicy({ Bucket: bucket }).promise().then(createAndSetPolicy).catch(checkNoPolicy);

  function createAndSetPolicy(currentPolicy) {
    const policy = assignPublicReadToPolicy(currentPolicy);
    const putPolicy = s3.putBucketPolicy({ Bucket: "biancaidas.com", Policy: JSON.stringify(policy) }).promise().then();
    return true;
  }
  function checkNoPolicy (err) {
    return err.code === "NoSuchBucketPolicy" ? createAndSetPolicy(false) : err;
  }
  return true;
}

function assignPublicReadToPolicy(currentPolicy) {
  const publicRead = {
    "Statement": [ {
      "Sid": "AddPublicReadPermissions",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::biancaidas.com/*"
    } ]
  };
  const policyIsPublicAlready = currentPolicy.Policy ? checkPolicyForPublic(JSON.parse(currentPolicy.Policy).Statement) : false;
  return !policyIsPublicAlready ? Object.assign({}, currentPolicy, publicRead) : JSON.parse(currentPolicy.Policy);
}

function checkPolicyForPublic(statement) {
  return statement.filter(attribute => attribute.Sid === "AddPublicReadPermissions").length > 0 ? true : false;
}

process.title = "hugo-s3";
run(process.argv);
