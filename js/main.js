$(document).ready(function () {
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
      "data-attribute": "data-edit-todo-text",
    },

    {
      text: "Cancella promemoria",
      icon: ["my_icon", "fa-solid", "fa-trash"],
      "data-attribute": "data-remove-from-todo-list",
    },
  ];

  todoList = $("[data-todo-list]");
  addToListBtn = $("[data-add-to-todo-list]");
  addToListInput = addToListBtn.siblings("input");

  // * MAIN CODE
  init();
  modifyTodoList();

  // * FUNCTIONS
  // ? FUNCTIONS MAINLY LINKED TO THIS PROJECT
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

  function modifyTodoList() {
    addToListBtn.click(function (e) {
      e.preventDefault();
      createTodoElement();
    });

    addToListInput.keydown(function (e) {
      if (e.which == 1 || e.which == 13) {
        createTodoElement();
      } else if (e.which == 27) {
        refreshTodoInputField();
      }
    });

    $(document).on("click", "[data-change-dropdown-menu-status]", function () {
      toggleElementVisibility($(this).next());
    });

    $(document).on("click", "[data-remove-from-todo-list]", function () {
      deleteTodoElement($(this).parents("li"));
    });

    $(document).on(
      "click",
      "[data-todo-list] li .my_todo-info .my_todo-text",
      function () {
        changeTodoStatus(
          $(this),
          todoActions.length - 1 - $(this).parents("li").attr("key")
        );
      }
    );
  }

  function createTodoElement() {
    inputValue = getCapitalizedString(
      addToListInput.val().trim().toLowerCase()
    );

    if (inputValue != "" && inputValue.length >= 2) {
      addElementToTheList(todoActions, inputValue);
      putTodoElementInHtml(inputValue, false, 0);
      refreshTodoInputField();
      updateTodoElementIndex();
      console.log(todoActions);
    }
  }

  function putTodoElementInHtml(todoText, todoStatus, index) {
    todoElement = getElementWithClasses("li", [
      "d-flex",
      "justify-content-between",
      "p-2",
      "rounded-1",
    ]);
    todoElement.setAttribute("key", index);
    todoInfo = getElementWithClasses("div", ["my_todo-info"]);
    todoInfoText = todoStatus
      ? getElementWithClasses("span", [
          "my_todo-text",
          "pe-3",
          "my_line-through",
        ])
      : getElementWithClasses("span", ["my_todo-text", "pe-3"]);
    todoInfoText.innerHTML = todoText;
    dropdownMenu = getElementWithClasses("div", [
      "my_dropdown-menu",
      "text-end",
      "position-relative",
    ]);
    dropdownMenuIcon = getElementWithClasses("i", [
      "my_icon",
      "fa-solid",
      "fa-ellipsis",
      "w-100",
      "text-end",
    ]);
    dropdownMenuIcon.setAttribute("data-change-dropdown-menu-status", "");
    hiddenMenu = getElementWithClasses("ul", [
      "my_hidden-menu",
      "my_d-none",
      "px-0",
      "position-absolute",
      "end-0",
    ]);

    todoOptions.forEach((todoOption) => {
      dropdownElement = getElementWithClasses("li", ["p-2"]);
      dropdownElement.setAttribute(todoOption["data-attribute"], "");
      dropdownElementIcon = getElementWithClasses("i", todoOption.icon);
      dropdownElementText = getElementWithClasses("span", ["ps-2"]);
      dropdownElementText.innerHTML = todoOption.text;
      dropdownElement.append(dropdownElementIcon);
      dropdownElement.append(dropdownElementText);
      hiddenMenu.append(dropdownElement);
    });

    dropdownMenu.append(dropdownMenuIcon);
    dropdownMenu.append(hiddenMenu);
    todoInfo.append(todoInfoText);
    todoElement.append(todoInfo);
    todoElement.append(dropdownMenu);
    this.todoList.prepend(todoElement);
  }

  function deleteTodoElement(todoElement) {
    removeElementOfTheList(
      todoActions,
      todoActions.length - 1 - todoElement.attr("key")
    );
    todoElement.remove();
    updateTodoElementIndex();
    console.log(todoActions);
  }

  function updateTodoElementIndex() {
    $("[data-todo-list]>li").each(function (index) {
      $(this).attr("key", index);
    });
  }

  function changeTodoStatus(todoElement, index) {
    todoElement.toggleClass("my_line-through");
    todoActions[index].done = !todoActions[index].done;
    console.log(todoActions);
  }

  function refreshTodoInputField() {
    addToListInput.val("");
  }

  // ? USEFULL FUNCTIONS
  function getCapitalizedString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getElementWithClasses(element, elementClasses = []) {
    let htmlElement = document.createElement(element);

    elementClasses.forEach((elementClass) => {
      htmlElement.classList.add(elementClass);
    });

    return htmlElement;
  }

  function addElementToTheList(list, newElementText) {
    const newElement = {
      text: newElementText,
      done: false,
    };

    list.push(newElement);
  }

  function removeElementOfTheList(list, index) {
    list.splice(index, 1);
  }

  function toggleElementVisibility(element) {
    element.toggleClass("my_d-none");
  }
});
