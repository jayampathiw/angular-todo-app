import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [TodoItemComponent, NgFor, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  tasks: { title: string; completed: boolean }[] = [];
  newTask = '';

  @ViewChild('newTaskForm')
  newTaskForm!: NgForm;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks(); 
  }

  addTask(form: NgForm) {
    if (form.valid) {
      this.taskService.addTask({ title: this.newTask, completed: false });
      this.newTask = '';
      form.resetForm();
    }
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index)
  }

  completeTask(index: number) {
    const item = this.tasks[index];
    this.taskService.editTask(index, {...item, completed: !item.completed})
  }

  editTask(event: { title: string }, index: number) {
    this.tasks[index].title = event.title;
    this.taskService.editTask(index, this.tasks[index])
  }

}
