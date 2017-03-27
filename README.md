# hugo-s3
A minimal tool to deploy hugo sites to s3.

## Quick-Start
```npm install -g hugo-s3```

--------Configure your bucket.--------

```hugo-s3```

## How it works
On build of a Hugo site, a `public/` directory is created which holds all of the files for the website.

`hugo-s3`, when run in the root directory, will crawl this `public/` and push it to your s3 bucket, with permissions already configured.

## Future goals
 - Output the s3 url in the command line
 - Compress and gzip all files
