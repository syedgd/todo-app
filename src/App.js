import React, { Component } from 'react';
//import './App.css';


class TodoItem extends Component {
  
  
  updateTodo() {
    var updatedTodo = Object.assign({}, this.props.todo)
    updatedTodo.isDone = !this.props.todo.isDone;
    //this.props.todo.isDone = !this.props.todo.isDone;
    this.props.onClick(updatedTodo);
  }

  render() {
    var isDone = this.props.todo.isDone ? 'checked' : '';
    
  
    return (
      <div>
        
            <li> <input type='checkbox' checked={isDone} onChange={this.updateTodo()}  value= {this.props.todo.id} /> {this.props.todo.title}</li>
        
      </div>
    );
  
}
}

class TodoList extends Component {
 
  render() {
   var todos = this.props.todos.map((todo, index)=>{
        return(
          <div>
           <TodoItem key = {index} todo = {todo} onClick={()=>this.props.onClick} /> 
          </div>
        );
    }); 

    return (todos);
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: getTodoItems(),
    }
  }

  updateTodo(todo) {
    var todos = this.state.todos.slice();
    todos[todo.id] = todo;
    this.setState(
      {
        todos: todos,
      }
    )
  }



  render() {
    return (
      <div>
        <TodoList todos = {this.state.todos} onClick={ todo => this.updateTodo(todo)} />
      </div>
    );
  }
}

function getTodoItems() {
  var todos =     
      [
        {
        id: 1,
        title: 'shopping',
        isDone: true,
        },
        {
        id: 2,
        title: 'exam prep',
        isDone: false,
        },

        {
          id: 3,
          title: 'running',
          isDone: true,
        }
    ];
  
    return todos;
}
export default App;
