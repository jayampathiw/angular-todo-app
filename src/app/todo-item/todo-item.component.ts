import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input()
  task!: { title: string; completed: boolean };
  @Output() delete = new EventEmitter<void>();
  @Output() completed = new EventEmitter<void>();
  @Output() edit = new EventEmitter<{ title: string }>();

  editMode = false;

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveEdit() {
    this.edit.emit({ title: this.task?.title });
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
