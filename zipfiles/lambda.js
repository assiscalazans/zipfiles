let AWS = require('aws-sdk');
let JSZip = require("jszip");
let fs = require("fs");
const s3 = new AWS.S3();
exports.handler = function (event, context, callback) {
    /* The request payload will take the following format:
    {
        "path": "path/to/zip/file/within/bucket",
        "changes": {
            "path/to/new/file/1": "content for file 1",
            "path/to/existing/file/2": "new content of file 2",
            "path/to/deleted/file/3": null
        }
    }
     */
    ////let changes = event.changes;
    let modified = 0, removed = 0;
    console.log(`Fetching ${event.path}`);
    
      s3.getObject({
        'Bucket': "hosted-archives",
        'Key': event.path
    }).promise()
        .then(data => {
            console.log(data);           // successful response
            /*
            data = {
                AcceptRanges: "bytes", 
                ContentLength: 3191, 
                ContentType: "image/jpeg", 
                ETag: "\\"6805f2cfc46c0f04559748bb039d69ae\\"", 
                LastModified:

        
}