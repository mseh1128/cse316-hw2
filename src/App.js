import React, { Component } from "react";
import testTodoListData from "./TestTodoListData.json";
import HomeScreen from "./components/home_screen/HomeScreen";
import ItemScreen from "./components/item_screen/ItemScreen";
import ListScreen from "./components/list_screen/ListScreen";
import jTPS from "./jtps/jTPS";
import StrTransaction from "./jtps/AddToStr_Transaction"

const AppScreen = {
  HOME_SCREEN: "HOME_SCREEN",
  LIST_SCREEN: "LIST_SCREEN",
  ITEM_SCREEN: "ITEM_SCREEN"
};

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  };

  transactionSystem = new jTPS();

  todoItem = null;

  taskAscending = true;
  dueDateAscending = true;
  statusAscending = true;

  taskSortComparator = (a, b) => {
    if (a.description > b.description) {
      return -1;
    }
    if (b.description > a.description) {
      return 1;
    }
    return 0;
  };

  keys = {
    ctrl: false,
    z: false,
    y: false
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }
  
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyUp);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 90) {
        this.keys["z"] = true;
    } else if (event.keyCode === 17) {
        this.keys["ctrl"] = true;
    } else if(event.keyCode === 89) {
        this.keys["y"] = true;
    }
    if (this.keys["z"] && this.keys["ctrl"]) {
      console.log("Z AND CTRL WERE BOTH CLICKED AT THE SAME TIME ")
      this.transactionSystem.undoTransaction();
      // do something here! 
    } else if(this.keys["y"] && this.keys["ctrl"]) {
      console.log("Y AND CTRL WERE BOTH CLICKED AT THE SAME TIME ")
      this.transactionSystem.redoTransaction();
       // do something here!
    } 
  }

  handleKeyUp = (event) => {
    if (event.keyCode === 90) {
      this.keys["z"] = false;
    } else if (event.keyCode === 17) {
      this.keys["ctrl"] = false;
    }
  }

  addNameChangeTransaction = (oldStr, newStr) => {
    const transaction = new StrTransaction(oldStr, newStr);
    this.transactionSystem.addTransaction(transaction);
    console.log(this.transactionSystem);
  }

  undoNameChangeTransaction = (oldStr, newStr) => {
    const transaction = new StrTransaction(oldStr, newStr);
    this.transactionSystem.addTransaction(transaction);
  }

  redoNameChangeTransaction = (oldStr, newStr) => {
    const transaction = new StrTransaction(oldStr, newStr);
    this.transactionSystem.addTransaction(transaction);
  }

  dueDateSortComparator = (a, b) => {
    if (new Date(a.due_date) > new Date(b.due_date)) {
      return -1;
    }
    if (new Date(b.due_date) > new Date(a.due_date)) {
      return 1;
    }
    return 0;
  };

  statusSortComparator = (a, b) => {
    if (a.completed > b.completed) {
      return -1;
    }
    if (b.completed > a.completed) {
      return 1;
    }
    return 0;
  };

  // could modularized moveUpBtn/moveDownBtn later

  moveUpBtn = todoListItem => {
    // if valid index, remove item & insert it 1 above
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    const idxOfItem = updatedCurrentList.items
      .map(e => e.key)
      .indexOf(todoListItem.key);
    if (idxOfItem !== 0) {
      updatedCurrentList.items.splice(idxOfItem, 1);
      updatedCurrentList.items.splice(idxOfItem - 1, 0, todoListItem);
      this.setState({
        currentList: updatedCurrentList
      });
    }
  };

  moveDownBtn = todoListItem => {
    // if valid index, remove item & insert it 1 below
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    const idxOfItem = updatedCurrentList.items
      .map(e => e.key)
      .indexOf(todoListItem.key);
    if (idxOfItem !== updatedCurrentList.items.length - 1) {
      updatedCurrentList.items.splice(idxOfItem, 1);
      updatedCurrentList.items.splice(idxOfItem + 1, 0, todoListItem);
      this.setState({
        currentList: updatedCurrentList
      });
    }
  };

  goHome = (newName, newOwner) => {
    console.log(`Current List`);
    console.log(this.state.currentList);
    this.taskAscending = true;
    this.dueDateAscending = true;
    this.statusAscending = true;
    const currentListKey = this.state.currentList.key;
    const updatedTodoList = this.state.todoLists.slice();
    const idxOfList = updatedTodoList.map(e => e.key).indexOf(currentListKey);
    if (newName === "" || newName === null) {
      updatedTodoList[idxOfList].name = "Unknown";
    } else {
      updatedTodoList[idxOfList].name = newName;
    }
    if (newOwner === "" || newName === null) {
      updatedTodoList[idxOfList].owner = "Unknown";
    } else {
      updatedTodoList[idxOfList].owner = newOwner;
    }
    this.setState({ todoLists: updatedTodoList });
    this.setState({ currentScreen: AppScreen.HOME_SCREEN });
    this.setState({ currentList: null });
  };

  goHomeFromModal = () => {
    this.setState({ currentScreen: AppScreen.HOME_SCREEN });
    this.setState({ currentList: null });
  };

  goToItem = todoItem => {
    this.todoItem = todoItem;
    this.setState({ currentScreen: AppScreen.ITEM_SCREEN });
  };

  loadList = todoListToLoad => {
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
    this.setState({ currentList: todoListToLoad });
  };

  loadListFromItem = () => {
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
    const currentListKey = this.state.currentList.key;
    const idxOfList = this.state.todoLists.map(e => e.key).indexOf(currentListKey);
    const currentListUpdated = this.state.todoLists[idxOfList];
    this.setState({ currentList: currentListUpdated });
  };


  createNewItem = newItemFields => {
    // requires currentlist to be defined
    const currentListKey = this.state.currentList.key;
    const updatedTodoList = this.state.todoLists.slice();
    const idxOfList = updatedTodoList.map(e => e.key).indexOf(currentListKey);
    const listItems = updatedTodoList[idxOfList].items;
    let maxItemKey;
    if(listItems === undefined || listItems.length === 0) {
      console.log("REACHED UNDEFINED MESSAGE")
      maxItemKey = -1;
    } else {
      maxItemKey = Math.max.apply(Math, listItems.map(function(o) { return o.key; }));
    }
    const newItemKey = maxItemKey + 1;
    const newTodoItem = { key: newItemKey, ...newItemFields };
    listItems.push(newTodoItem);
    this.setState({
      todoLists: updatedTodoList
    });
  }

  editItem = updatedItemFields => {
    for (let field in updatedItemFields) {
      if (field !== "completed" && (updatedItemFields[field] === "" || !updatedItemFields[field]))
      updatedItemFields[field] = "Unknown";
    }
    if(!this.todoItem) {
      // create item & update todo list
      this.createNewItem(updatedItemFields);
    } else {
        const { key } = this.todoItem;
        const updatedTodoItem = { key, ...updatedItemFields };
        const currentListKey = this.state.currentList.key;
        const updatedTodoList = this.state.todoLists.slice();
        const idxOfList = updatedTodoList.map(e => e.key).indexOf(currentListKey);
        let todoListItem = updatedTodoList[idxOfList].items.find(
          x => x.key === key
        );
        for (let value in updatedTodoItem)
          todoListItem[value] = updatedTodoItem[value];

        // const updatedCurrentList = Object.assign({}, this.state.currentList);
        // let listItem = updatedCurrentList.items.find(x => x.key === key);
        // for (let value in updatedTodoItem) listItem[value] = updatedTodoItem[value];

        this.setState({
          todoLists: updatedTodoList,
          // currentList: updatedCurrentList
        });
      }
      
    this.loadListFromItem();
  };

  removeItem = todoListItem => {
    const currentListKey = this.state.currentList.key;
    const updatedTodoList = this.state.todoLists.slice();
    updatedTodoList[currentListKey].items = updatedTodoList[
      currentListKey
    ].items.filter(e1 => e1.key !== todoListItem.key);
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    updatedCurrentList.items = updatedCurrentList.items.filter(
      e1 => e1.key !== todoListItem.key
    );
    this.setState({
      todoLists: updatedTodoList,
      currentList: updatedCurrentList
    });
  };

  removeList = () => {
    const currentListKey = this.state.currentList.key;
    const updatedTodoList = this.state.todoLists.slice();
    const idxOfItem = updatedTodoList.map(e => e.key).indexOf(currentListKey);
    updatedTodoList.splice(idxOfItem, 1);
    this.setState({
      todoLists: updatedTodoList
    });
    this.goHomeFromModal();
  };

  createNewList = () => {
    const newList = {
      items: [],
      key: this.state.todoLists.slice(-1)[0].key+1,
      name: null,
      owner: null
    }
    const updatedTodoList = this.state.todoLists.slice();
    updatedTodoList.push(newList);
    this.setState({ todoLists: updatedTodoList,  currentList: newList, currentScreen: AppScreen.LIST_SCREEN });  
  }
  
  addNewItem = () => {
    this.todoItem = null;
    this.setState({ currentScreen: AppScreen.ITEM_SCREEN }); 
  }

  sortTasksHeader = sortType => {
    // can further modularize code & avoid reuse later
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    if (sortType === "task") {
      if (this.taskAscending) {
        updatedCurrentList.items.sort((a, b) => this.taskSortComparator(a, b));
      } else {
        updatedCurrentList.items
          .sort((a, b) => this.taskSortComparator(a, b))
          .reverse();
      }
      this.taskAscending = !this.taskAscending;
    } else if (sortType === "due_date") {
      if (this.dueDateAscending) {
        updatedCurrentList.items.sort((a, b) =>
          this.dueDateSortComparator(a, b)
        );
      } else {
        updatedCurrentList.items
          .sort((a, b) => this.dueDateSortComparator(a, b))
          .reverse();
      }
      this.dueDateAscending = !this.dueDateAscending;
    } else {
      if (this.statusAscending) {
        updatedCurrentList.items.sort((a, b) =>
          this.statusSortComparator(a, b)
        );
      } else {
        updatedCurrentList.items
          .sort((a, b) => this.statusSortComparator(a, b))
          .reverse();
      }
      this.statusAscending = !this.statusAscending;
    }

    this.setState({ currentList: updatedCurrentList });
  };



  render() {
    switch (this.state.currentScreen) {
      case AppScreen.HOME_SCREEN:
        return (
          <div 
          onKeyDown={() => console.log("TEST")} 
          tabIndex={0}>
            <HomeScreen
              loadList={this.loadList.bind(this)}
              todoLists={this.state.todoLists}
              createNewList={this.createNewList.bind(this)}
            />

          </div>
        );
      case AppScreen.LIST_SCREEN:
        return (
          <ListScreen
            goHome={this.goHome.bind(this)}
            goToItem={this.goToItem.bind(this)}
            todoList={this.state.currentList}
            removeItem={this.removeItem.bind(this)}
            removeList={this.removeList.bind(this)}
            sortTasksHeader={this.sortTasksHeader.bind(this)}
            moveUpBtn={this.moveUpBtn.bind(this)}
            moveDownBtn={this.moveDownBtn.bind(this)}
            addNewItem={this.addNewItem.bind(this)}
            addNameChangeTransaction={this.addNameChangeTransaction.bind(this)}
          />
        );
      case AppScreen.ITEM_SCREEN:
        return (
          <ItemScreen
            currentScreen={this.state.currentScreen}
            todoItem={this.todoItem}
            loadListFromItem={this.loadListFromItem.bind(this)}
            editItem={this.editItem.bind(this)}
          />
        );
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
