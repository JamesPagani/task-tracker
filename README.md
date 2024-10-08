# Task Tracker CLI

*[This project is part of the many Backend projects available at Roadmap.sh](https://roadmap.sh/projects/task-tracker)*
Create and manage your tasks with your terminal!

## Installation

To install the program into your computer, run the following inside the repository:

``` bash
npm install -g .
```

And the app is ready to be used as `task-cli`!

## Usage

These are the supported commands for `task-cli`:

```
task-cli help: Show all the available commands!

task-cli add: Create new task. A random, 8 character long ID will be assigned to the task
task-cli update <id> <description>: Update the description of a task.
task-cli delete <id>: Delete a task

task-cli mark-todo <id>: Mark a task as todo
task-cli mark-in-progress <id>: Mark a task as in-progress
task-cli mark-done <id>: Mark a task as done

task-cli list [todo | in-progress | done]: List all tasks. You can pass the status to only show the tasks with that status.
```