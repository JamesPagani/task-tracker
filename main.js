#!/usr/bin/env node
"use strict"

import { argv, exit } from 'node:process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto';

// CONSTANTS
const jsonPath = new URL('./task-tracker.json', import.meta.url);

/**
 * Add a new task to the list
 * @param {object} tasks The list of tasks
 * @param {string} description A short description of the task
 * @returns {object} The new task
 */
function addTask(tasks, description) {
    if (!description) {
        throw Error(`A short description is required when creating a task.
            Usage: ${argv[1]} add <description>`);
    }

    const taskDate = new Date();
    const newId = randomUUID().split("-")[0];

    tasks[newId] = {
        id: newId,
        description: description,
        status: "todo",
        createdAt: taskDate,
        updatedAt: taskDate
    }
}


function updateTask(tasks, id, description) {

}

function deleteTask(tasks, id) {

}

function markTask(tasks, newStatus) {

}

function listTasks(tasks, status) {

}

function main() {
    // Read file
    let tasks;
    if (existsSync(jsonPath)) {
        tasks = JSON.parse(readFileSync(jsonPath, {
            encoding: "utf-8",
            flag: "r"
        }));
    } else {
        tasks = {};
    }

    // Execute command
    const command = argv[2];
    switch (command) {
        case 'add':
            addTask(tasks, argv[3]);
            break;
        case 'update':
            updateTask(tasks, argv[3], argv[4]);
            break;
        case 'delete':
            deleteTask(tasks, argv[3]);
            break;
        case 'mark-todo' | 'mark-in-progress' | 'mark-done':
            const newStatus = command.slice(5);
            markTask(tasks, argv[3], newStatus);
            break;
        case 'list':
            const statusFilter = argv[3];
            listTasks(tasks, statusFilter);
            break;
    }

    // Save to file
    writeFileSync(jsonPath, JSON.stringify(tasks));
}
main();