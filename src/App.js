import React, { Component } from 'react';
import './App.css';


class TodoAppHeader extends Component {
  render() {
    return(
      <div className="TodoHeader">Todo List</div>
    );
  }
}

class NewTodoItem extends Component {
  render() {

    return(
    <div>
        <input className="NewTodoItem" type='text' />
    </div>
    );
  }
}

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
      <div className={"TodoItem" + (this.props.todo.isDone ? ' Done' : '')}>
        
            <input type='checkbox' checked={isDone} onChange={()=>this.updateTodo()}  value= {this.props.todo.id} /> {this.props.todo.title}
        
      </div>
    );
  
}
}

class TodoList extends Component {
 
  render() {
  
   var todos = this.props.todos.map((todo, index)=>{
        return(
          <div>
           <TodoItem key = {index} todo = {todo} onClick={(a)=>this.props.onClick(a)} /> 
          </div>
        );
    }); 

    
    return (<div className='TodoList'>{todos}</div>);
  }
}

class ActionsBar extends Component {

  showFilteredTodos(isDone) {
    
    this.props.buttonClick(isDone);
  }

  render() {
    return(
      <div className="TodoItem ActionsBar">
        <div className="buttonsContainer">
          <table className="buttonsContainer">
            <tr className="buttonsContainer">
              <td><a href="#" onClick={()=>this.props.onClickShowAll()}><span className="button">All</span></a></td>
              <td><a href="#" onClick={()=>this.showFilteredTodos(true)}><span className="button">Completed</span></a></td>
              <td><a href="#" onClick={()=>this.showFilteredTodos(false)}><span className="button">Pending</span></a></td>
          </tr>
          </table>
        </div>
      </div>
    );
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
    todos[todo.id-1] = todo;
    updateTodoItems(todos);
    this.setState(
      {
        todos: todos,
      }
    )
  }

  showFilteredTodos(pIsDone) {
    var allTodos = getTodoItems();
    var filteredTodos = allTodos.filter(todo => todo.isDone==pIsDone);
    this.setState({
      todos: filteredTodos,
    });
  }

  showAllTodos() {
    var allTodos = getTodoItems();
    //var filteredTodos = allTodos.filter(todo => todo.isDone==pIsDone);
    this.setState({
      todos: allTodos,
    });
  }


  render() {
    return (
      <div className='App'>
        <TodoAppHeader />
        <NewTodoItem />
        <TodoList todos = {this.state.todos} onClick={ (todo) => this.updateTodo(todo)} />
        <ActionsBar buttonClick={(a)=>this.showFilteredTodos(a)} onClickShowAll={()=>this.showAllTodos()} />
      </div>
    );
  }
}

var globalTodos =     
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

function getTodoItems() {
      return globalTodos;
}

function updateTodoItems(pTodos) {
  globalTodos = pTodos.slice();
}
export default App;
