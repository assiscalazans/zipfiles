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

    s3.getObject({
        'Bucket': "gedcef",
        'Key': event.path
    }).promise()
        .then(data => {
            let jszip = new JSZip();
            console.log(`Opening ${event.path}`);
            jszip.loadAsync(data).then(function(contents) {
                Object.keys(contents.files).forEach(function(filename) {
                    zip.file(filename).async('nodebuffer').then(function(content) {
                    var dest = path + filename;
                    fs.writeFileSync(dest, content);
                    }); 
                });
                });



        })
        .catch(err => {
            console.log(err, err.stack); // an error occurred
        });

     if (!err) {
        return Promise.reject('Oops!').catch(err => {
            throw new Error(err);
            });
     }
}