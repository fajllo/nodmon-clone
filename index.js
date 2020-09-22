#!/usr/bin/env node
//required packages
const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const prog = require('caporal');
const fs = require('fs');
const {spawn} = require("child_process")
const chalk = require('chalk');


prog
.version('1.0.0')
.argument('[filename]','name od the file to execute')
.action(async ({filename}) =>{
    const name = filename || "index.js";
    try {
        await fs.promises.access(name);
    }catch(err){
        throw new Error(`Couldn't find a file ${name}`)
    }
    let proc;
    const start = debounce(() => {
        if (proc){
            proc.kill();
        }
        console.log(chalk.green('>>>Starting process...'))

        proc = spawn('node',[name], {stdio:'inherit'});
    },100);

    if(filename){

    }
    chokidar.watch(".")
    .on('add', start)
    .on('change',start)
    .on('unlink',start)
});

prog.parse(process.argv)



// chockidar events add change remove
