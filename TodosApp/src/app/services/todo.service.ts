import { Injectable } from '@angular/core';
import { Todo } from '../classes/todo'
@Injectable({
  providedIn: 'root'
})
/** 
in this export class use local storage to maintain data after reload the page.
!!!If the program error because cannot access undified object comment this export class
and use next comment class yo build some localStorage because getItem() can not get undified object 
*/
export class TodoService {
  private nextId: number;
  constructor() { 
    //Load data from Local storage as todos
    let todos = this.getTodos()
    let default_storage = [];
    
    //To control ID number
    if(todos.length == 0){
      this.nextId = 0; //assign 1st ID if it was empty
    }else{
      let maxId = todos[todos.length-1].id;
      this.nextId = maxId+1;
    }
    
  }

  //Add new item into locaStorage
  public addTodo(text: string):void{
    let todo = new Todo(this.nextId, text, false);
    let todos = this.getTodos();    //get Todos from local storage to use in this function

    todos.push(todo);   //Push item into array
    this.setLocalStorageTodos(todos); //Save item into locaStorage
    this,this.nextId++;

    //I have to refresh after add new list 
    //because if I don't the toggledone() will not work properly.
    window.location.reload();

  }

  //Everything star with this function
  //load data with JSON.parse() into localStorageItem[]
  public getTodos(){
    let localStorageItem = JSON.parse(localStorage.getItem('todos')||'{}');// ||'{}' it will error if take it off!!!Keep it!!!
    return localStorageItem == null ? [] : localStorageItem.todos;
  }

  //To remove list from screen and localStorage.
  public removeTodo(id: number): void {
    let todos = this.getTodos();  //get Todos from local storage to use in this function
    todos = todos.filter((todo: { id: number; })=>todo.id != id)//filter -> rebuild without deleted item(because todo.id != id filter)
    
    this.setLocalStorageTodos(todos);//Save new array into LocalStorage
    //I have to refresh after delete the list too 
    window.location.reload();
  }

  //To change done status in local storage
  //To change set item ID because after remove list ID will not match with
  //index in array.map() inthis function that cause this function work not propperly
  public toggleDone (id:number): void{
    let todos = this.getTodos(); //get Todos from local storage to use in this function
    todos.map((v: { id: number,done: boolean; }, i: number) => {
      if(i==id){
        v.done = !v.done;             //Change done status( it's boolean)
        this.setLocalStorageTodos(todos); //save data after status changed.
      }else if(i<id){ //Because after remove item: array.map() index will cause a problem 
        v.id = i;     //So I have to set item/List ID to make to match with the index
        this.setLocalStorageTodos(todos);//save data into localStorage
      }
    })
  }

  //To save data into localstorage todos
  public setLocalStorageTodos(todos:Todo[]):void{
    localStorage.setItem('todos',JSON.stringify({todos:todos})); //Save data to localstorage as JSON object
  }
 
}

/** 
If it error due to undefied localStorage use below export class 
to rebuild local storage before run above export class
*/

// export class TodoService {

//   private todos: Todo[];
//   private nextId: number;

//   constructor() { 
//     this.todos = [];
//     this.nextId=1;
//   }

//   public addTodo(text: string):void{
//     console.log(this.todos);
//     let todo = new Todo(this.nextId,text, false);
//     this.todos.push(todo);
//     this.setLocalStorageTodos(this.todos);
//     this,this.nextId++;
//   }
//   public getTodos(): Todo[] {
//     return this.todos;
//   }
//   public removeTodo(id: number): void {
//     this.todos = this.todos.filter((todo)=> todo.id != id);
//     this.setLocalStorageTodos(this.todos);
//   }
//   public toggleDone (id:number): void{
//     this.todos?.map((v, i) => {
//       if(i==id) v.done = !v.done;
//       console.log(v.text,":",v.done);
//       return v;
//     })
//   }

//   public setLocalStorageTodos(todos:Todo[]):void{
//     localStorage.setItem('todos',JSON.stringify({todos:todos}));
//   }
// }
