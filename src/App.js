import React, { Component } from 'react';
import testTodoListData from './TestTodoListData.json';
import HomeScreen from './components/home_screen/HomeScreen';
import ItemScreen from './components/item_screen/ItemScreen';
import ListScreen from './components/list_screen/ListScreen';

const AppScreen = {
  HOME_SCREEN: 'HOME_SCREEN',
  LIST_SCREEN: 'LIST_SCREEN',
  ITEM_SCREEN: 'ITEM_SCREEN'
};

class App extends Component {
  state = {
    currentScreen: AppScreen.HOME_SCREEN,
    todoLists: testTodoListData.todoLists,
    currentList: null
  };

  taskAscending = true;
  dueDateAscending = true;
  statusAscending = true;

  taskSortComparator = (a,b) => {
    if (a.description > b.description) {
      return -1;
    }
    if (b.description > a.description) {
        return 1;
    }
    return 0;
  };

  dueDateSortComparator = (a,b) => {
    if (new Date(a.due_date) > new Date(b.due_date)) {
      return -1;
    }
    if (new Date(b.due_date) > new Date(a.due_date)) {
        return 1;
    }
    return 0;
  };

  statusSortComparator = (a,b) => {
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
    const idxOfItem = updatedCurrentList.items.map(e => e.key).indexOf(todoListItem.key);
    if(idxOfItem !== 0) {
      updatedCurrentList.items.splice(idxOfItem, 1);
      updatedCurrentList.items.splice(idxOfItem-1, 0, todoListItem);
      this.setState({
        currentList: updatedCurrentList
      });
    }
  };

  moveDownBtn = todoListItem => {
    // if valid index, remove item & insert it 1 below
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    const idxOfItem = updatedCurrentList.items.map(e => e.key).indexOf(todoListItem.key);
    if(idxOfItem !== updatedCurrentList.items.length - 1) {
      updatedCurrentList.items.splice(idxOfItem, 1);
      updatedCurrentList.items.splice(idxOfItem+1, 0, todoListItem);
      this.setState({
        currentList: updatedCurrentList
      });
    }
  };

  goHome = (newName, newOwner) => {
    this.taskAscending = true;
    this.dueDateAscending = true;
    this.statusAscending = true;
    const currentListKey = this.state.currentList.key;
    const updatedTodoList = this.state.todoLists.slice();
    if(newName === "") {
      updatedTodoList[currentListKey].name = "Unknown";
    } else {
      updatedTodoList[currentListKey].name = newName;
    }
    if(newOwner === "") {
      updatedTodoList[currentListKey].owner = "Unknown";
    } else {
      updatedTodoList[currentListKey].owner = newOwner;
    }
    this.setState({todoLists: updatedTodoList})
    this.setState({ currentScreen: AppScreen.HOME_SCREEN });
    this.setState({ currentList: null });
  };

  loadList = todoListToLoad => {
    this.setState({ currentScreen: AppScreen.LIST_SCREEN });
    this.setState({ currentList: todoListToLoad });
    console.log('currentList: ' + this.state.currentList);
    console.log('currentScreen: ' + this.state.currentScreen);
  };

  removeItem = todoListItem => {
    const currentListKey = this.state.currentList.key;
    const updatedTodoList = this.state.todoLists.slice();
    updatedTodoList[currentListKey].items = updatedTodoList[
      currentListKey
    ].items.filter(e1 => e1.key !== todoListItem.key);
    // updatedTodoList[currentListKey].items.forEach(
      //   (item, idx) => (item.key = idx)
      // );
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    updatedCurrentList.items = updatedCurrentList.items.filter(e1 => e1.key !== todoListItem.key);
    this.setState({
      todoLists: updatedTodoList,
      currentList: updatedCurrentList
    });
  };

  sortTasksHeader = (sortType) => {
    // can further modularize code & avoid reuse later
    const updatedCurrentList = Object.assign({}, this.state.currentList);
    if(sortType === "task") {
      if(this.taskAscending) {
        updatedCurrentList.items.sort((a,b) => this.taskSortComparator(a, b));
      } else {
        updatedCurrentList.items.sort((a,b) => this.taskSortComparator(a, b)).reverse();
      }
      this.taskAscending = !this.taskAscending;
    } else if(sortType === "due_date") {
      if(this.dueDateAscending) {
        updatedCurrentList.items.sort((a,b) => this.dueDateSortComparator(a, b));
      } else {
        updatedCurrentList.items.sort((a,b) => this.dueDateSortComparator(a, b)).reverse();
      }
      this.dueDateAscending = !this.dueDateAscending;
    } else {
      if(this.statusAscending) {
        updatedCurrentList.items.sort((a,b) => this.statusSortComparator(a, b));
      } else {
        updatedCurrentList.items.sort((a,b) => this.statusSortComparator(a, b)).reverse();
      }
      this.statusAscending = !this.statusAscending;
    }
   
    this.setState({currentList: updatedCurrentList});
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
            todoList={this.state.currentList}
            removeItem={this.removeItem.bind(this)}
            sortTasksHeader={this.sortTasksHeader.bind(this)}
            moveUpBtn={this.moveUpBtn.bind(this)}
            moveDownBtn={this.moveDownBtn.bind(this)}
          />
        );
      case AppScreen.ITEM_SCREEN:
        return <ItemScreen />;
      default:
        return <div>ERROR</div>;
    }
  }
}

export default App;
