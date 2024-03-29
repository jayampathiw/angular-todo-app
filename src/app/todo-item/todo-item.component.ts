import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../state/todo.state';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  task = input.required<Task>();
  @Output() delete = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Task>();

  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveEdit() {
    this.edit.emit({ ...this.task() });
    this.editMode = false;
  }

  cancelEdit() {
    this.editMode = false;
  }

  toggleCompleted() {
    this.completed.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
