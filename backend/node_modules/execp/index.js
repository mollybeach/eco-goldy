const _ = require('lodash');
const childProcess = require('child_process')

function exec(query, options){
    options = _.defaults(options, {
        maxBuffer: 512 * 1024 * 1024,
        chomp: true,
    });

    return new Promise(function(res, rej){
        childProcess.exec(query, {maxBuffer: options.maxBuffer}, function(err, stdout, stderr){
            if(err){return rej(err);}
            return res(options.chomp ? chomp(stdout) : stdout);
        });
    });
}

function chomp(string){
    return string.replace(/[\n\r]+$/, '');
}

module.exports = exec;