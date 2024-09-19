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
    let newId = randomUUID().split("-")[0];

    // Just in off-chance the ID is already in use...
    while (tasks[newId]) {
        newId = randomUUID().split("-")[0];
    }

    tasks[newId] = {
        id: newId,
        description: description,
        status: "todo",
        createdAt: taskDate,
        updatedAt: taskDate
    }
}

/**
 * Update a task with a new description
 * @param {object} tasks The list of tasks
 * @param {string} id The ID of the task to update
 * @param {string} description The new description of the task
 */
function updateTask(tasks, id, description) {
    if (!id) {
        throw Error(`You need to provide the ID of the task to update.\nUsage: ${argv[1]} update <id> <description>`);
    }
    if (!description) {
        throw Error(`You need to provide another short description when updating a task.\nUsage: ${argv[1]} update <id> <description>`);
    }

    const task = tasks[id];

    if (!task) {
        throw Error(`Task ${id} was not found.`);
    }

    const updateDate = new Date();
    task.description = description;
    task.updatedAt = updateDate;
}

/**
 * Delete a task from the list
 * @param {object} tasks The list of tasks
 * @param {string} id The ID of the task to delete
 */
function deleteTask(tasks, id) {
    if (!id) {
        throw Error(`You need to provide the ID of the task to delete.\nUsage: ${argv[1]} delete <id>`);
    }

    if (!tasks[id]) {
        throw Error(`Task ${id} was not found.`);
    }
    
    delete tasks[id];
}

/**
 * Update the status of a task
 * @param {object} tasks The list of tasks
 * @param {string} id The ID of the task to update its status
 * @param {string} newStatus The new status of the task (todo, in-progress, or done)
 */
function markTask(tasks, id, newStatus) {
    if (!id) {
        throw Error(`You need the ID of the task to update its status\nUsage: ${argv[1]} mark-${newStatus} <id>`);
    }

    const task = tasks[id];
    if (!task) {
        throw Error(`Task ${id} was not found.`);
    }

    const updateDate = new Date();
    task.status = newStatus;
    task.updatedAt = updateDate;
}

/**
 * 
 * @param {object} tasks The list of tasks
 * @param {string} status If specified, show all tasks with this status
 */
function listTasks(tasks, status) {
    for (let task of Object.values(tasks)) {
        if (!status || task.status == status) {
            console.log(`${task.id}: ${task.description} [${task.status}]\n[C: ${task.createdAt} | U: ${task.updatedAt}]`)
        }
    }
}

/**
 * Main function
 */
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
    try {
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
            case 'mark-todo':
            case 'mark-in-progress':
            case 'mark-done':
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
    } catch (error) {
        console.error(error.message);
    }
}

main();