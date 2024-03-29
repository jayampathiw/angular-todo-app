import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoTaskStoreService, Task } from '../state/todo.state';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgFor, FormsModule, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  providers: [provideComponentStore(TodoTaskStoreService)],
})
export class TodoListComponent implements OnInit {
  tasks$ = signal(this.taskService.tasks$);
  newTask = '';

  @ViewChild('newTaskForm')
  newTaskForm!: NgForm;

  constructor(private taskService: TodoTaskStoreService) {}

  ngOnInit() {}

  addTask(form: NgForm) {
    if (form.valid) {
      this.taskService.addTask({
        id: new Date().getTime(),
        title: this.newTask,
        completed: false,
      });
      this.newTask = '';
      form.resetForm();
    }
  }

  deleteTask(deletedTask: Task) {
    this.taskService.deleteTask(deletedTask);
  }

  completeTask(task: Task) {
    this.taskService.editTask(task);
  }

  editTask(task: Task) {
    this.taskService.editTask(task);
  }
}
