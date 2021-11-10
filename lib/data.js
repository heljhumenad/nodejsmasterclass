//libray for storing and editing the data

//Dependencies
var fs = require('fs');
var path = require('path');

//container for the module 
var lib = {};

//define base directory folder of data
lib.base_dir = path.join(__dirname, '/../.data/');
var slash = '/';
//var format = '.json';
var format = {
    'json_encoded': '.json',
    'utf8': 'utf-8',
}

var foptions = {
    'wx': 'wx',
    'rx': 'r+'
}

//create a function write the data to a file
lib.create = function (dir, file, data, callback) {
    //open the file for writing
    fs.open(lib.base_dir + dir + slash + file + format.json_encoded, foptions.wx, function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            //convert the data to a string
            var string_data = JSON.stringify(data);

            //write to the file and close it
            fs.writeFile(fileDescriptor, string_data, function (err) {
                if (!err) {
                    fs.close(fileDescriptor, function (err) {
                        if (!err) {
                            callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('Error writing to the file');
                }
            });
        } else {
            callback('Could not create new file, it may already exist');
        }
    });

};

lib.read = function (dir, file, callback) {
    fs.readFile(lib.base_dir + dir + slash + file + format.json_encoded, format.utf8, function (err, data) {
        callback(err, data);
    });
};

//update the data in the file
lib.update = function (dir, file, data, callback) {
    //open the file for 
    fs.open(lib.base_dir + dir + slash + file + format.json_encoded, + foptions.rx, function (err, fileDescriptor) {
        if (!err && fileDescriptor) {
            var string_data = JSON.stringify(data);
            //truncate the file
            fs.ftruncate(fileDescriptor, function (err) {
                if (!err) {
                    //write to the file and close it
                    fs.writeFile(fileDescriptor, string_data, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('There was an error occured');
                                }
                            });
                        } else {
                            callback('Error writing and updating in existing file');
                        }
                    });
                } else {
                    callback('Error updating the file');
                }
            });
        } else {
            callback('Could not open the file for update it may not exist yet');
        }
    });
};

//delete the file 
lib.delete = function (dir, file, callback) {
    //unlink the file 
    fs.unlink(lib.base_dir + dir + slash + file + format.json_encoded, function (err) {
        if (!err) {
            callback(false);
        } else { callback('Error deleting the file!'); }
    });
};
module.exports = lib;