#!/usr/bin/env node

// go get and set the policies
// concurrently, do the work down here (crawling directories and whatnot)
// send that shit up

// import "minimist";
// import * as AWS from "aws-sdk";
const minimist = require("minimist")
    , AWS = require("aws-sdk")

const policy = require("./policy.js")
    , deploy = require("./deploy.js")

function run(processArgv) {
  const argv = minimist(processArgv.slice(2));
  const s3 = new AWS.S3({ region: "us-east-1" });
  const bucket = "";
  const directory = process.cwd() + "/public/";
  return Promise.all([ policy(s3, bucket), deploy(s3, bucket, directory) ]).then(response => { return console.log(response) });
}

process.title = "hugo-s3";
run(process.argv);
