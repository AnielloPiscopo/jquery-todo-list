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

  // * MAIN CODE
  todoList = $("[data-todo-list]");
  addToListBtn = $("[data-add-to-todo-list]");
  addToListInput = addToListBtn.siblings("input");

  todoActions.forEach((todoAction, index) => {
    createATodoElement(todoAction.text, index);
  });

  addToListBtn.click(function (e) {
    e.preventDefault();
    inputValue = addToListInput.val().trim();
    addElementToTheList(todoActions, inputValue);
    createATodoElement(inputValue, todoActions.length - 1);
  });

  addToListInput.keydown(function (e) {
    if (e.which == 1 || e.which == 13) {
      e.preventDefault();
      inputValue = addToListInput.val().trim();
      addElementToTheList(todoActions, inputValue);
      createATodoElement(inputValue, todoActions.length - 1);
    }
  });

  // * USEFULL FUNCTIONS
  function getCapitalizedString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function getAnElementWithClasses(element, ...elementClasses) {
    let htmlElement = document.createElement(element);

    elementClasses.forEach((elementClass) => {
      htmlElement.classList.add(elementClass);
    });

    return htmlElement;
  }

  function addElementToTheList(list, newElementText) {
    newElementText = newElementText.toLowerCase();

    if (newElementText != "" && newElementText.length >= 2) {
      const newElement = {
        text: newElementText,
        done: false,
      };

      list.push(newElement);
    }
  }

  function createATodoElement(todoText, index) {
    liElement = getAnElementWithClasses(
      "li",
      "d-flex",
      "justify-content-between",
      "p-2",
      "rounded-1"
    );

    liElement.setAttribute("key", index);

    todoInfo = getAnElementWithClasses("div", "my_todo-info");
    todoInfoText = getAnElementWithClasses("span", "pe-3");
    todoInfoText.innerHTML = todoText;
    trashIcon = getAnElementWithClasses(
      "i",
      "my_icon",
      "fa-solid",
      "fa-trash",
      "align-self-center"
    );

    todoInfo.append(todoInfoText);
    liElement.append(todoInfo);
    liElement.append(trashIcon);
    this.todoList.append(liElement);
  }
});
