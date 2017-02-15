//
// Inclass React ToDo Exercise
// ============================
//
// Using the views as described in our previous exercise
// re-implement the ToDo App using React.
// 
// Below you will transpile the h() function calls
// into JSX and implement ToDos.addTodo()
//
;(function() {

'use strict'

class ToDoItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            done: false
        }
    }

    render() { return (
        <li id={this.props.key}>
        <i className="check glyphicon glyphicon-check"> </i>
        <span contentEditable="true">{this.props.text}</span>
        <i className="destroy glyphicon glyphicon-remove" onClick={this.props.remove}>
        </i>
        
        </li>

        
        
        //h("li", { id: `task${_taskId++}`}, [
          //  h("i", { className: "check glyphicon glyphicon-check", onClick: toggleDone }, []),
            //h("span", { contentEditable: true, done: false }, typeof(text) === "string" ? text : ""),
            //h("i", { className: "destroy glyphicon glyphicon-remove", onClick: removeTask }, []),
        //])

        
    )}
}

class ToDos extends React.Component {


    constructor(props) {
        super(props)
        this.nextId = 2;
        this.state = {
            todoItems: [
                {id:0, text:"This is an item"},
                {id:1, text:"Another item" }
            ]
        }
        this.addTodo=this.addTodo.bind(this)
    }

    addTodo() {
        // IMPLEMENT ME!



        const text = this.input.value
        console.log(text)
        console.log(text)
        this.setState({ todoItems: [
                ...this.state.todoItems, 
                {id:this.nextId++, text}
            ]
        })
        this.input.value=""
    }
    removeTodo(removeId) {
        this.setState({ 
            todoItems: this.state.todoItems.filter(({id, text}) => id != removeId)
        })
    }

    render() { return (
        <div>
        <input ref={(node)=>this.input=node} id="newTODO" placeholder="To Do"></input>
        <button onClick={this.addTodo}>
        add Item
        </button>
        <span className="submit">
        <a href="https://webdev-rice.herokuapp.com" target="_blank">
        Submit your exercise
        </a>
        </span>
            <ul className="todo">
            {this.state.todoItems.map(
                (item) => <ToDoItem key={item.id} text={item.text} remove={() => this.removeTodo(item.id)}/>
                )}
            
            </ul>
        </div>
        // Hint: <input ... ref={ (node) => this.... = node } />
        /*
        h("div", { },
            h("input", { id: "newTODO", type: "text", placeholder: "To Do"}),
            h("button", { onClick: addItem }, "Add Item"),
            h("span", { className: "submit" }, [
                h("a", { href: "https://webdev-rice.herokuapp.com",
                     target: "_blank" }, "Submit your exercise"),
            ]),
            h("ul", { className: "todo" }, listItems)
        )
        */
    )}
}

ReactDOM.render(<ToDos/>, document.getElementById('app'));

})()
