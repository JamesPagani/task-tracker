#!/usr/bin/env node
"use strict"

import {argv} from 'node:process';
import {readFileSync, writeFileSync} from 'node:fs'

// CONSTANTS
const jsonPath = new URL('./task-tracker.json', import.meta.url);

function runCMD() {

}

function main() {
    let fileContents = JSON.parse(readFileSync(jsonPath, {
        encoding: 'utf-8',
        flag: "a+",
    }));
    console.log(fileContents)
    let newContents = '{"hotel": "trivago"}'
    // RUN COMMAND HERE
    writeFileSync(jsonPath, newContents, {
        encoding: "utf-8"
    })
}
main();