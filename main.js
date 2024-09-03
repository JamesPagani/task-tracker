#!/usr/bin/env node
"use strict"

import path, { dirname } from 'node:path';
import {argv} from 'node:process';
import * as fs from 'node:fs/promises'

const jsonPath = new URL('./task-tracker.json', import.meta.url);
async function main() {
    let fileContents = JSON.parse(await fs.readFile(jsonPath, {
        encoding: 'utf-8',
        flag: "a+",
    }));
}
main();