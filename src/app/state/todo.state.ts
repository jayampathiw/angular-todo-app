import { Injectable, OnDestroy } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { EMPTY, Observable, catchError, of, switchMap } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoTaskState {
  tasks: Task[];
}

const initialTodoTaskState: TodoTaskState = {
  tasks: [],
};

@Injectable()
export class TodoTaskStoreService
  extends ComponentStore<TodoTaskState>
  implements OnStoreInit
{
  private tasksKey = 'tasks';

  tasks$ = this.select((state) => state.tasks);

  constructor() {
    super(initialTodoTaskState);
  }

  ngrxOnStoreInit() {
    this.loadTasks();
  }

  loadTasks() {
    const storedTasks = localStorage.getItem(this.tasksKey);
    if (storedTasks) {
      this.setState({ tasks: JSON.parse(storedTasks) });
    }
  }

  private add = this.updater((state: TodoTaskState, task: Task) => {
    return {
      ...state,
      tasks: state.tasks.concat(task),
    };
  });

  private edit = this.updater((state: TodoTaskState, updatedTask: Task) => {
    return {
      ...state,
      tasks: state.tasks.map((task) => {
        if (updatedTask.id === task.id) return updatedTask;
        return task;
      }),
    };
  });

  private delete = this.updater((state: TodoTaskState, deletedTask: Task) => {
    return {
      ...state,
      tasks: state.tasks.filter((task) => deletedTask.id !== task.id),
    };
  });

  private saveTasks = this.effect((tasksArray$: Observable<Task[]>) => {
    return tasksArray$.pipe(
      switchMap((tasks) => {
        localStorage.setItem(this.tasksKey, JSON.stringify(tasks));
        return of(tasks);
      }),
      catchError(() => EMPTY)
    );
  });

  addTask(task: Task): void {
    this.add(task);
    this.saveTasks(this.tasks$);
  }

  editTask(task: Task): void {
    this.edit(task);
    this.saveTasks(this.tasks$);
  }

  deleteTask(task: Task): void {
    this.delete(task);
    this.saveTasks(this.tasks$);
  }
}
