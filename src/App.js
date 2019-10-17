import React, { Component } from "react";
import testTodoListData from "./TestTodoListData.json";
import HomeScreen from "./components/home_screen/HomeScreen";
import ItemScreen from "./components/item_screen/ItemScreen";
import ListScreen from "./components/list_screen/ListScreen";

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
    if (newName === "") {
      updatedTodoList[idxOfList].name = "Unknown";
    } else {
      updatedTodoList[idxOfList].name = newName;
    }
    if (newOwner === "") {
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
  };

  editItem = updatedItemFields => {
    const { key, id } = this.todoItem;
    for (let field in updatedItemFields) {
      if (field !== "completed" && updatedItemFields[field] == "")
        updatedItemFields[field] = "Unknown";
    }
    const updatedTodoItem = { key, ...updatedItemFields };
    // update it in current screen & todo list?
    const currentListKey = this.state.currentList.key;
    const updatedTodoList = this.state.todoLists.slice();
    let todoListItem = updatedTodoList[currentListKey].items.find(
      x => x.id === id
    );
    for (let value in updatedTodoItem)
      todoListItem[value] = updatedTodoItem[value];
    /////////////////////
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    let listItem = updatedCurrentList.items.find(x => x.id === id);
    for (let value in updatedTodoItem) listItem[value] = updatedTodoItem[value];
    this.setState({
      todoLists: updatedTodoList,
      currentList: updatedCurrentList
    });

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
          <HomeScreen
            loadList={this.loadList.bind(this)}
            todoLists={this.state.todoLists}
          />
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
