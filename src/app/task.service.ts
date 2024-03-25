import { Injectable } from '@angular/core';

interface Task {
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksKey = 'tasks'; 
  tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    const storedTasks = localStorage.getItem(this.tasksKey);
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  saveTasks() {
    localStorage.setItem(this.tasksKey, JSON.stringify(this.tasks));
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  editTask(index: number, updatedTask: Task) {
    this.tasks[index] = updatedTask;
    this.saveTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  getTasks(): Task[] {
    return this.tasks;
  }
}
