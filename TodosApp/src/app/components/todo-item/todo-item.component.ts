import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../../classes/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()
  public todo!: Todo;

  constructor(private todoService: TodoService) { }
  myvar = "done";
  isActive = false;
  ngOnInit() {
    // this.isActive = false;
    if(this.todo.done==true){
      this.isActive = true;
      // console.log(this.todo.text,"     done.");
    }else{
      // console.log(this.todo.text," not done.");
    }
  }

  public removeTodo(): void {
    this.todoService.removeTodo(this.todo.id);
  }

  public toggleDone(): void{
    this.todoService.toggleDone(this.todo.id);
  }

  // public toggleDone (id:number): void{
  //   this.todos?.map((v, i) => {
  //     if(i==id) v.done = !v.done;
  //     console.log(v.done);
  //     return v;
  //   })
  // }

}