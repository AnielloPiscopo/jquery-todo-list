// * DECLARATIONS
const todoActions = [
  {
    text: "Fare i compiti",
    done: false,
  },

  {
    text: "Fare la spesa",
    done: true,
  },

  {
    text: "Portare il cane a passeggio",
    done: false,
  },

  {
    text: "Cambiare la busta della spazzatura",
    done: true,
  },

  {
    text: "Cambiare la ciotola al cane",
    done: true,
  },

  {
    text: "Dare il cibo ai gatti",
    done: false,
  },

  {
    text: "Cucinare",
    done: true,
  },

  {
    text: "Studiare per l'esame",
    done: true,
  },

  {
    text: "Andare in palestra",
    done: false,
  },

  {
    text: "Fare la ricarica telefonica",
    done: false,
  },
];

const todoOptions = [
  {
    text: "Modifica testo",
    icon: ["my_icon", "fa-solid", "fa-pen-to-square"],
    "data-attribute": "data-view-todo-input-field",
  },

  {
    text: "Cancella promemoria",
    icon: ["my_icon", "fa-solid", "fa-trash"],
    "data-attribute": "data-remove-from-todo-list",
  },
];

var todoList = $("[data-todo-list]");
var filterTodoListInput = $("[data-search-bar");
var addToListBtn = $("[data-add-to-todo-list]");
var addToListInput = addToListBtn.siblings("input");

// * MAIN CODE
$(document).ready(function () {
  init();
  useSearchBar();
  modifyTodoList();
});

// * FUNCTIONS

// ? FUNCTIONS MAINLY LINKED TO THIS PROJECT

/**
 *  Function that permit to show in the page the default elements of the todo list that are located in the array "todoOptions".
 */
function init() {
  console.log(todoActions);
  todoActions.forEach((todoAction, index) => {
    putTodoElementInHtml(
      todoAction.text,
      todoAction.done,
      todoActions.length - 1 - index
    );
  });
}

/**
 * Function that permit the guest to use the searchbar of the page.
 */
function useSearchBar() {
  filterTodoListInput.keyup(function (e) {
    if (e.which == 27) {
      refreshSearchBar();
      $("[data-todo-list]>li").each(function () {
        addElementVisibility($(this));
      });
    } else {
      filterTodoElements($(this).val().trim().toLowerCase());
    }
  });
}

/**
 * Function that permit the guest to modify the todolist
 */
function modifyTodoList() {
  addToListBtn.click(function (e) {
    e.preventDefault();
    createTodoElement();
  });

  addToListInput.keyup(function (e) {
    if (e.which == 1 || e.which == 13) {
      createTodoElement();
    } else if (e.which == 27) {
      refreshTodoListInputField();
    }
  });

  $(document).on("click", "[data-change-dropdown-menu-status]", function () {
    toggleElementVisibility($(this).next());
  });

  $(document).on("click", "[data-view-todo-input-field]", function () {
    toggleElementVisibility(
      $(this).parents(".my_dropdown-menu").prev().children(".my_todo-text")
    );
    toggleElementVisibility(
      $(this).parents(".my_dropdown-menu").prev().children("input")
    );
    removeElementVisibility($(this).parents(".my_hidden-menu"));
  });

  $(document).on("click", "[data-remove-from-todo-list]", function () {
    deleteTodoElement($(this).parents("li"));
  });

  $(document).on(
    "click",
    "[data-todo-list] li .my_todo-info .my_todo-text",
    function (e) {
      e.stopPropagation();
      changeTodoStatus(
        $(this),
        todoActions.length - 1 - $(this).parents("li").attr("key")
      );
    }
  );

  $(document).on("keyup", "[data-edit-todo-text]", function (e) {
    if ((e.which == 1 || e.which == 13) && $(this).val().length >= 2) {
      updateTodoInputField($(this).val(), $(this).siblings(".my_todo-text"));
      toggleElementVisibility($(this));
      toggleElementVisibility($(this).siblings(".my_todo-text"));
      removeElementVisibility(
        $(this).parents("li").children().children(".my_hidden-menu")
      );
    } else if (e.which == 27) {
      toggleElementVisibility($(this));
      toggleElementVisibility($(this).siblings(".my_todo-text"));
      removeElementVisibility(
        $(this).parents("li").children().children(".my_hidden-menu")
      );
    }
  });

  $(document).on("dblclick", "[data-todo-list]>li", function () {
    console.log(
      $(this).children().children("[data-change-dropdown-menu-status]")
    );
    removeElementVisibility($(this).children().children("input"));
    addElementVisibility($(this).children().children(".my_todo-text"));
    removeElementVisibility($(this).children().children(".my_hidden-menu"));
    updateTodoInputField(
      $(this).children().children("input").val(),
      $(this).children().children(".my_todo-text")
    );
  });
}

/**
 * Function that permit the guest to filter the elements in the todoList available in the page.
 * @param {string} inputValue
 */
function filterTodoElements(inputValue) {
  $("[data-todo-list]>li").each(function () {
    const todoText = $(this).find(".my_todo-info .my_todo-text");
    const todoTextValue = todoText.text();

    const position = todoTextValue.toLowerCase().indexOf(inputValue);

    if (position !== -1) {
      addElementVisibility($(this));
      const before = todoTextValue.slice(0, position);
      const after = todoTextValue.slice(position + inputValue.length);
      const highlightedText = todoTextValue.slice(
        position,
        position + inputValue.length
      );
      const newText = `${before}<span class='my_highlighted-words'>${highlightedText}</span>${after}`;
      todoText.html(newText);
    } else {
      removeElementVisibility($(this));
    }
  });
}

/**
 * Function that permit the guest to create a new todo element.
 */
function createTodoElement() {
  inputValue = getCapitalizedString(addToListInput.val().trim());

  if (inputValue != "" && inputValue.length >= 2) {
    addElementToTheList(todoActions, inputValue);
    putTodoElementInHtml(inputValue, false, 0);
    refreshTodoListInputField();
    updateTodoElementIndex();
    console.log(todoActions);
  }
}

/**
 * Function that permit to put the created todoElement in the page available to the user.
 * @param {string} todoText
 * @param {boolean} todoStatus
 * @param {number} index
 */
function putTodoElementInHtml(todoText, todoStatus, index) {
  const todoElement = getElementWithClasses("li", [
    "d-flex",
    "justify-content-between",
    "p-2",
    "rounded-1",
  ]);
  todoElement.setAttribute("key", index);
  const todoInfo = getElementWithClasses("div", ["my_todo-info"]);
  const todoInfoText = todoStatus
    ? getElementWithClasses("span", ["my_todo-text", "pe-3", "my_line-through"])
    : getElementWithClasses("span", ["my_todo-text", "pe-3"]);
  todoInfoText.innerHTML = todoText;

  const todoInputField = getElementWithClasses("input", [
    "my_input",
    "my_d-none",
  ]);
  todoInputField.setAttribute("type", "text");
  todoInputField.setAttribute("data-edit-todo-text", "");
  todoInputField.value = todoText;

  const dropdownMenu = getElementWithClasses("div", [
    "my_dropdown-menu",
    "text-end",
    "position-relative",
  ]);
  const dropdownMenuIcon = getElementWithClasses("i", [
    "my_icon",
    "fa-solid",
    "fa-ellipsis",
    "w-100",
    "text-end",
  ]);
  dropdownMenuIcon.setAttribute("data-change-dropdown-menu-status", "");
  const hiddenMenu = getElementWithClasses("ul", [
    "my_hidden-menu",
    "my_d-none",
    "px-0",
    "position-absolute",
    "end-0",
  ]);

  todoOptions.forEach((todoOption) => {
    const dropdownElement = getElementWithClasses("li", ["p-2"]);
    dropdownElement.setAttribute(todoOption["data-attribute"], "");
    const dropdownElementIcon = getElementWithClasses("i", todoOption.icon);
    const dropdownElementText = getElementWithClasses("span", ["ps-2"]);
    dropdownElementText.innerHTML = todoOption.text;
    dropdownElement.append(dropdownElementIcon);
    dropdownElement.append(dropdownElementText);
    hiddenMenu.append(dropdownElement);
  });

  dropdownMenu.append(dropdownMenuIcon);
  dropdownMenu.append(hiddenMenu);
  todoInfo.append(todoInfoText);
  todoInfo.append(todoInputField);
  todoElement.append(todoInfo);
  todoElement.append(dropdownMenu);
  this.todoList.prepend(todoElement);
}

/**
 * Function that permit to update the text input field associated to the single todo element.
 * @param {string} todoInputValue
 * @param {object} todoTextElement
 */
function updateTodoInputField(todoInputValue, todoTextElement) {
  todoTextElement.text(todoInputValue);
  todoActions[
    todoActions.length - 1 - todoTextElement.parents("li").attr("key")
  ].text = todoInputValue;
  console.log(todoActions);
}

/**
 * Function that permit the guest to delete an element from the todo list.
 * @param {object} todoElement
 */
function deleteTodoElement(todoElement) {
  removeElementOfTheList(
    todoActions,
    todoActions.length - 1 - todoElement.attr("key")
  );
  todoElement.remove();
  updateTodoElementIndex();
  console.log(todoActions);
}

/**
 * Function that permit to change the attribute "key" of a single todo element.
 */
function updateTodoElementIndex() {
  $("[data-todo-list]>li").each(function (index) {
    $(this).attr("key", index);
  });
}

/**
 * Function that permit the guest to change the status of the todo element.
 * @param {object} todoElement
 * @param {number} index
 */
function changeTodoStatus(todoElement, index) {
  todoElement.toggleClass("my_line-through");
  todoActions[index].done = !todoActions[index].done;
  console.log(todoActions);
}

/**
 * Function that permit the reset of the value in the search bar.
 */
function refreshSearchBar() {
  filterTodoListInput.val("");
}

/**
 * Function that permit the reset of the value of the text input field of the todo list.
 */
function refreshTodoListInputField() {
  addToListInput.val("");
}

/**
 * Function that permit the reset of the value of the text input field of the single todo element.
 */
function refreshTodoElementInputField() {
  $("[data-edit-todo-text]").val("");
}

// ? USEFULL FUNCTIONS

/**
 * Function that return a capitazed string.
 * @param {string} str
 * @returns {string}
 */
function getCapitalizedString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Function that return a HTML element with optional classes.
 * @param {string} element
 * @param {array} elementClasses
 * @returns {DOM}
 */
function getElementWithClasses(element, elementClasses = []) {
  let htmlElement = document.createElement(element);

  elementClasses.forEach((elementClass) => {
    htmlElement.classList.add(elementClass);
  });

  return htmlElement;
}

/**
 * Function that permit to push something in a list.
 * @param {array} list
 * @param {string} newElementText
 */
function addElementToTheList(list, newElementText) {
  const newElement = {
    text: newElementText,
    done: false,
  };

  list.push(newElement);
}

/**
 * Function that permit to remove something in a list.
 * @param {array} list
 * @param {number} index
 */
function removeElementOfTheList(list, index) {
  list.splice(index, 1);
}

/**
 * Function that permit to change the visibility of a element given with Jquery
 * by changing the status of the presence of a default css class
 * that permit to add the 'display:none' property.
 * @param {object} element
 */
function toggleElementVisibility(element) {
  element.toggleClass("my_d-none");
}

/**
 * Function that permit to remove the visibility of a element given with Jquery
 * by adding the status of the presence of a default css class
 * that permit to add the 'display:none' property.
 * @param {object} element
 */
function removeElementVisibility(element) {
  element.addClass("my_d-none");
}

/**
 * Function that permit to add the visibility of a element given with Jquery
 * by removing the status of the presence of a default css class
 * that permit to add the 'display:none' property.
 * @param {object} element
 */
function addElementVisibility(element) {
  element.removeClass("my_d-none");
}
