#!/usr/bin/env node

// go get and set the policies
// concurrently, do the work down here (crawling directories and whatnot)
// send that shit up

// import "minimist";
// import * as AWS from "aws-sdk";
const minimist = require("minimist")
    , AWS = require("aws-sdk")

const policy = require("./policy.js")

function run(processArgv) {
  const argv = minimist(processArgv.slice(2));
  const s3 = new AWS.S3({ region: "us-east-1" });
  const bucket = "lifeinsiberia.com";
  const setPolicy = policy(s3, bucket);
  // const sendFiles = sendFiles(s3,bucket);
  return Promise.all([ setPolicy, /*sendFiles*/ ]).then(response => { return console.log(response) });
}

process.title = "hugo-s3";
run(process.argv);
