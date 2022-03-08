const addNoteBtn = document.getElementById("new-todo");
const noteListUl = document.getElementById("note-list");
const tagBtn = document.querySelectorAll("section.tags button");

const tagList = document.getElementById("tag-list");

const composeForm = document.getElementById("compose-form");
const composeTextarea = document.getElementById("compose-item");

function buildNoteElement(data) {
  const listItem = document.createElement("li");
  const artItem = document.createElement("article");
  const noteTitle = document.createElement("h3");
  noteTitle.innerText = data.title;

  const paragraphArray = [];
  data.body?.forEach((p) => {
    const el = document.createElement("p");
    const pArr = p.split(" ");
    pArr.forEach((word, i) => {
      if (word.startsWith("#")) {
        const strongTag = document.createElement("strong");
        strongTag.innerText = word;

        if (pArr[i + 1]?.startsWith("#")) {
          el.appendChild(strongTag);
          el.innerHTML += " ";
        } else {
          el.appendChild(strongTag);
        }
      } else {
        el.innerHTML += ` ${word} `;
      }
    });

    el.innerHTML.trim();
    paragraphArray.push(el);
  });

  artItem.appendChild(noteTitle);
  paragraphArray.forEach((p) => {
    artItem.appendChild(p);
  });

  data.color && artItem.classList.add(data.color);
  listItem.appendChild(artItem);

  return listItem;
}

function buildTagElement(note) {
  const tagLi = document.createElement("li");
  const tagBtn = document.createElement("button");

  tagBtn.innerText = note;
  tagBtn.onclick = (e) => {
    e.preventDefault();
    alert(`Tag selecionada: #${note}`);
  };

  tagLi.appendChild(tagBtn);
  return tagLi;
}

function openComposeArea() {
  composeForm.classList.remove("collapsed");
  addNoteBtn.classList.add("opened");
}

function closeComposeArea() {
  composeForm.classList.add("collapsed");
  addNoteBtn.classList.remove("opened");
}

function updateNotesList() {
  noteListUl.innerHTML = null;
  for (let i = mockData.length - 1; i >= 0; i--) {
    noteListUl.appendChild(buildNoteElement(mockData[i]));
  }
}

/* function updateTagsList() {
  tagList.innerHTML = null;
  const finalTags = new Set();

  mockData.forEach((note) => {
    note.tags.forEach((noteTag) => {
      finalTags.add(noteTag.toLowerCase());
    });
  });

  Array.from(finalTags).forEach((tag) => {
    const liTag = document.createElement("li");
    const buttonTag = document.createElement("button");
    buttonTag.innerText = tag;
    buttonTag.onclick = function (e) {
      e.preventDefault();
      alert(`Ainda não adicionei o filtro por tags. Tag selecionada: #${tag}`);
    };
    liTag.appendChild(buttonTag);

    tagList.appendChild(liTag);
  });
} */

function getNotesByTag(tag) {
  return mockData.filter((note) => {
    return (
      note.tags.find((noteTag) => {
        return noteTag === tag;
      }) && true
    );
  });
}

function updateTagsList(selectedTags) {
  tagList.innerText = null;
  const finalTags = new Set();

  if (!selectedTags) {
    mockData.forEach((note) => {
      note.tags.forEach((noteTag) => {
        finalTags.add(noteTag.toLowerCase());
      });
    });
  } else {
    // Criar filtro para mostrar tags selecionadas
  }

  Array.from(finalTags).forEach((tag) => {
    tagList.appendChild(buildTagElement(tag));
  });
}

/**
 * @param {MouseEvent} e event
 */
addNoteBtn.onclick = function (e) {
  e.preventDefault();
  const collapsed = composeForm.classList.contains("collapsed");

  if (collapsed) {
    openComposeArea();
    composeTextarea.focus();
  } else closeComposeArea();
};

/**
 * @param {MouseEvent} e event
 */
/* composeAddBtn.onclick = function (e) {
  e.preventDefault();
  if (!composeTextarea.value) return;
  const text = composeTextarea.value.split(/\n/g);

  const data = {
    id: 0,
    title: "",
    body: [],
    color: "green",
    done: false,
    tags: [],
  };

  console.log(text.length);
  if (text.length > 1) {
    id = mockData.length;
    data.title = text[0];

    // Parse tags in title
    const parseTitleTags = text[0]
      .split(" ")
      .filter((w) => w.startsWith("#"))
      .map((w) => w.slice(1));
    if (parseTitleTags) data.tags.push(...parseTitleTags);
    // Parse tags in body
    for (let i = 1; i < text.length; i++) {
      const parseTags = text[i]
        .split(" ")
        .filter((w) => w.startsWith("#"))
        .map((w) => w.slice(1));
      if (parseTags) data.tags.push(...parseTags);
      data.body.push(text[i]);
    }
  } else {
    id = mockData.length;
    data.title = text[0];

    // Parse tags in title
    const parseTags = text[0]
      .split(" ")
      .filter((w) => w.startsWith("#"))
      .map((w) => w.slice(1));
    if (parseTags) data.tags.push(...parseTags);

    delete data.body;
  }

  mockData.push(data);

  closeComposeArea();
  updateNotesList();
  updateTagsList();
}; */

/**
 * @param {"green"|"red"|"yellow"|"blue"} color Cor da nota
 */
function composeNote(color) {
  if (!composeTextarea.value) return;
  const text = composeTextarea.value.split(/\n/g);

  const data = {
    id: 0,
    title: "",
    body: [],
    color,
    done: false,
    tags: [],
  };

  console.log(text.length);
  if (text.length > 1) {
    id = mockData.length;
    data.title = text[0];

    // Parse tags in title
    const parseTitleTags = text[0]
      .split(" ")
      .filter((w) => w.startsWith("#"))
      .map((w) => w.slice(1));
    if (parseTitleTags) data.tags.push(...parseTitleTags);
    // Parse tags in body
    for (let i = 1; i < text.length; i++) {
      const parseTags = text[i]
        .split(" ")
        .filter((w) => w.startsWith("#"))
        .map((w) => w.slice(1));
      if (parseTags) data.tags.push(...parseTags);
      data.body.push(text[i]);
    }
  } else {
    id = mockData.length;
    data.title = text[0];

    // Parse tags in title
    const parseTags = text[0]
      .split(" ")
      .filter((w) => w.startsWith("#"))
      .map((w) => w.slice(1));
    if (parseTags) data.tags.push(...parseTags);

    delete data.body;
  }

  mockData.push(data);

  composeTextarea.value = "";
  closeComposeArea();
  updateNotesList();
  updateTagsList();
}

const composeGreenBtn = document.getElementById("select-color__green");
const composeRedBtn = document.getElementById("select-color__red");
const composeYellowBtn = document.getElementById("select-color__yellow");
const composeBlueBtn = document.getElementById("select-color__blue");
const composeButtons = document.querySelectorAll(
  "form#compose-form section input[type=radio]"
);

composeGreenBtn.onclick = () => {
  if (
    composeForm.classList.contains("red") ||
    composeForm.classList.contains("yellow") ||
    composeForm.classList.contains("blue")
  ) {
    composeRedBtn.checked = false;
    composeYellowBtn.checked = false;
    composeBlueBtn.checked = false;
    composeGreenBtn.checked = true;
    composeForm.classList.add("green");
    composeForm.classList.remove("red", "yellow", "blue");
  } else if (composeForm.classList.contains("green")) {
    composeGreenBtn.checked = false;
    composeForm.classList.remove("color-selected", "green");
    composeNote("green");
  } else {
    composeForm.classList.add("color-selected", "green");
  }
};

composeRedBtn.onclick = () => {
  if (
    composeForm.classList.contains("green") ||
    composeForm.classList.contains("yellow") ||
    composeForm.classList.contains("blue")
  ) {
    composeGreenBtn.checked = false;
    composeYellowBtn.checked = false;
    composeBlueBtn.checked = false;
    composeRedBtn.checked = true;
    composeForm.classList.add("red");
    composeForm.classList.remove("green", "yellow", "blue");
  } else if (composeForm.classList.contains("red")) {
    composeRedBtn.checked = false;
    composeForm.classList.remove("color-selected", "red");
    composeNote("red");
  } else {
    composeForm.classList.add("color-selected", "red");
  }
};

composeYellowBtn.onclick = () => {
  if (
    composeForm.classList.contains("green") ||
    composeForm.classList.contains("red") ||
    composeForm.classList.contains("blue")
  ) {
    composeGreenBtn.checked = false;
    composeRedBtn.checked = false;
    composeBlueBtn.checked = false;
    composeYellowBtn.checked = true;
    composeForm.classList.add("yellow");
    composeForm.classList.remove("green", "red", "blue");
  } else if (composeForm.classList.contains("yellow")) {
    composeYellowBtn.checked = false;
    composeForm.classList.remove("color-selected", "yellow");
    composeNote("yellow");
  } else {
    composeForm.classList.add("color-selected", "yellow");
  }
};

composeBlueBtn.onclick = () => {
  if (
    composeForm.classList.contains("green") ||
    composeForm.classList.contains("red") ||
    composeForm.classList.contains("yellow")
  ) {
    composeGreenBtn.checked = false;
    composeRedBtn.checked = false;
    composeYellowBtn.checked = false;
    composeBlueBtn.checked = true;
    composeForm.classList.add("blue");
    composeForm.classList.remove("green", "red", "yellow");
  } else if (composeForm.classList.contains("blue")) {
    composeBlueBtn.checked = false;
    composeForm.classList.remove("color-selected", "blue");
    composeNote("blue");
  } else {
    composeForm.classList.add("color-selected", "blue");
  }
};

window.onload = () => {
  updateNotesList();
  updateTagsList();
};
