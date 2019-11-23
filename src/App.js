import React, {Component} from 'react';
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import RemoveAll from "./RemoveAll";
import "./App.css";


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        todos: [],
        doneTodos :[]
    };
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.removeAllTodos = this.removeAllTodos.bind(this);
    this.toggleCompleteStatus = this.toggleCompleteStatus.bind(this);
    this.removedoneTodos = this.removedoneTodos.bind(this);
    this.addDoneTodos=this.addDoneTodos.bind(this);
  }
  componentDidMount() {
    // Component oluştuktan sonra gerekli olan datayı localstoragedan geyiriyoruz.
    let localTodos = window.localStorage.getItem("todos");
    let localdoneTodos = window.localStorage.getItem("doneTodos");
    if(localTodos){
      localTodos  = JSON.parse(localTodos);
    }
    if(localdoneTodos){
        localdoneTodos  = JSON.parse(localdoneTodos);
      }
    // Getirdiğimiz datayı state'e kaydediyoruz.
    this.setState({
      todos: localTodos || [],
      doneTodos: localdoneTodos || []
    })
  }


  addTodo(newTodo){
 /*   let newArray = this.state.todos.some((todo) => {
        return todo.content == newTodo;
     });
     if (newArray){return;}

      newArray = this.state.doneTodos.some((todo) => {
        return todo.content == newTodo;
     });
     if (newArray){
        console.log("varrrrrrr");
        return;}
 */
    // Parametre olarak inputtan yeni eklenen değeri "newTodo" olarak alıyoruz.
    // State'i mutate etmemek için rest operatörü ile bir kopyalama yapıp yeni todoyu concat ile ekliyoruz.
    this.setState({
      todos: [...this.state.todos].concat([
          { content: newTodo, id: Math.random(), checked: false}
      ])
    }, () => {
        // Todo ekrana eklendikten sonra bunu localstorage'a da ekliyoruz.
      window.localStorage.setItem("todos", JSON.stringify(this.state.todos))
    })
}


  addDoneTodos(newTodo){
      // Parametre olarak inputtan yeni eklenen değeri "newTodo" olarak alıyoruz.
      // State'i mutate etmemek için rest operatörü ile bir kopyalama yapıp yeni todoyu concat ile ekliyoruz.
      let newArray = this.state.doneTodos.some((todo) => {
        return todo.content == newTodo;
     });    
      this.setState({
        doneTodos: [...this.state.doneTodos].concat([
            { content: newTodo, id: Math.random(), checked: true}
        ])
      }, () => {
          // Todo ekrana eklendikten sonra bunu localstorage'a da ekliyoruz.
        window.localStorage.setItem("doneTodos", JSON.stringify(this.state.doneTodos))
      })
  }

  removeTodo(id){
    // Silinecek todo'nun idsini parametre olarak alıyoruz.
    // State içerisindeki todolardan filter ile bu id'yi çıkarıyoruz.
    // Mutate etmemk için filter kullandık, filter bize yeni bir array döner.
    const newArray = this.state.todos.filter((todo) => {
       return todo.id !== id;
    });
    this.setState({
        todos: newArray
    }, () => {
        window.localStorage.setItem("todos", JSON.stringify(this.state.todos));
    });
}

  removedoneTodos(id){
      // Silinecek todo'nun idsini parametre olarak alıyoruz.
      // State içerisindeki todolardan filter ile bu id'yi çıkarıyoruz.
      // Mutate etmemk için filter kullandık, filter bize yeni bir array döner.
      const newArray = this.state.doneTodos.filter((todo) => {
         return todo.id !== id;
      });
      this.setState({
        doneTodos: newArray
      }, () => {
          window.localStorage.setItem("doneTodos", JSON.stringify(this.state.doneTodos));
      });
  }

  removeAllTodos(){
    this.setState({
        todos: [],
        doneTodos :[]
    }, () => {
        window.localStorage.removeItem("todos");
        window.localStorage.removeItem("doneTodos");
    })
  }

  toggleCompleteStatus(id){
    // Map ile mevcut todolar arasında döngüye girip, değiştirmek istediğimi farklı şekilde dönüyorum.
    // Aradığım itemin checked statusunu değiştiriyorum, rest ile kopyalayarak yani mutate etmeden.
    // Diğer elemanları olduğu gibi dönüyorum, "return todo";
    
   let hasHave = this.state.todos.some((todo) => {
        return todo.id == id;
     });
    if(hasHave==true){
    const newArray = this.state.todos.find((todo) => {
        return todo.id == id;
     });
     this.removeTodo(id);
     this.addDoneTodos(newArray.content);
}
else
{
    const newArray = this.state.doneTodos.find((todo) => {
        return todo.id == id;
     });
     this.removedoneTodos(id);
     this.addTodo(newArray.content);
}

}
  render(){
    return (
        <div className="App" id="todo">
            <div className="todo-list todo-list-add">
                <h3>Todo Ekle / Sil</h3>
                <div>
                    <AddTodo   onTodoAdd={this.addTodo} />
                    <RemoveAll onRemoveAll={this.removeAllTodos}/>
                </div>
            </div>

            <TodoList
                title="Tamamlanmamış Todolar"
                todos={this.state.todos}
                onTodoRemove={this.removeTodo}
                onCheckedToggle={this.toggleCompleteStatus} />

            <TodoList
                title="Tamamlanmış Todolar"
                todos={this.state.doneTodos}
                onTodoRemove={this.removedoneTodos}
                onCheckedToggle={this.toggleCompleteStatus} />
                
        </div>
    );
  }
}

export default App;
