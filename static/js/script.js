const addNoteBtn = document.getElementById("new-todo");
const noteListUl = document.getElementById("note-list");
const tagBtn = document.querySelectorAll("section.tags button");

const tagList = document.getElementById("tag-list");

const composeForm = document.getElementById("compose-form");
const composeTextarea = document.getElementById("compose-item");
const composeAddBtn = document.getElementById("composeForm__button");

function buildNoteElement(data) {
  const listItem = document.createElement("li");
  const artItem = document.createElement("article");
  const noteTitle = document.createElement("h3");
  noteTitle.innerText = data.title;
  const paragraphArray = [];
  data.body?.forEach((p) => {
    const el = document.createElement("p");

    // Parse tags
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

  data.color && artItem.classList.add([data.color]);
  listItem.appendChild(artItem);

  return listItem;
}

function updateNotesList(reload = false) {
  if (reload) noteListUl.innerHTML = null;
  for (let i = mockData.length - 1; i >= 0; i--) {
    noteListUl.appendChild(buildNoteElement(mockData[i]));
  }
}

function openComposeArea() {
  composeForm.classList.remove(["collapsed"]);
  addNoteBtn.classList.add(["opened"]);
}

function closeComposeArea() {
  composeForm.classList.add(["collapsed"]);
  addNoteBtn.classList.remove(["opened"]);
}

function updateTagsList() {
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
composeAddBtn.onclick = function (e) {
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
  updateNotesList(true);
  updateTagsList();
};

window.onload = () => {
  updateNotesList();
  updateTagsList();
};
