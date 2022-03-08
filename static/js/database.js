// Verifica se existe suporte para IndexedDB
if (!window.indexedDB) {
  alert(
    "O seu navegador não possui suporte para IndexedDB, portanto, muitas (se não todas) das funcionalidades presentes no site podem não funcionar."
  );
}

// Atalho para `window.indexedDB`;
const idb = window.indexedDB;

// Abre uma conexão com o banco de dados NotesDatabase
const request = idb.open("NotesDatabase", 3);

request.onerror = (e) => console.error("DB error: " + e.target.errorCode);

let addNote;
/**
 * @param {Event} e event
 */
request.onsuccess = (e) => {
  /**
   * @type {IDBDatabase} database
   */
  const db = e.target.result;

  const notesStore = db.createObjectStore("notes", {
    keyPath: "id",
  });

  notesStore.createIndex("id", "id", { unique: true });
  notesStore.createIndex("tags", "tags", { unique: false });

  notesStore.transaction.oncomplete = (e) => {
    const noteObjectStore = db
      .transaction("notes", "readwrite")
      .objectStore("notes");

    addNote = (notes) => {
      notes.forEach((note) => {
        noteObjectStore.add(note);
      });
    };
  };
};
