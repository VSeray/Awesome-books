const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

class Bclasses {
  constructor(title, author, id = undefined) {
    this.title = title;
    this.author = author;
    if (id !== undefined) {
      this.id = id;
    }
  }

  getCode() {
    return `<div class='wrapper'>
            <ul class='wrapper-ul'>
              <li class='title'>"${this.title}" by</li>
              <li class='author'>${this.author}</li>
            </ul>
            <ul class='btn'>
              <li><button class='remove' data-id='${this.id}'>Remove</button></li>
            </ul>
           </div>`;
  }

  static add(book) {
    const bookItems = this.getAllBooks();
    let id = 1;
    if (bookItems.length > 0) {
      id = bookItems[bookItems.length - 1].id + 1;
    }
    book.id = id;
    bookItems.push(book);
    saveToLocalStorage('bookItems', bookItems);
  }

  static remove(id) {
    let bookItems = this.getAllBooks();
    bookItems = bookItems.filter((b) => b.id !== Number(id));
    saveToLocalStorage('bookItems', bookItems);
  }

  static getAllBooks() {
    let bookItems = getFromLocalStorage('bookItems');
    if (bookItems === null) {
      bookItems = [];
    }
    return bookItems;
  }
}

function displayBooks() {
  const bookItems = Bclasses.getAllBooks();

  const booksCode = bookItems.map((book) => 
  new Bclasses(book.title, book.author, book.id).getCode());
  document.getElementById('bitems').innerHTML = booksCode.join('');

  const removeButtons = Array.from(document.querySelectorAll('.remove'));
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      Bclasses.remove(id);
      displayBooks();
    });
  });
}

displayBooks();

const titleInput = document.getElementById('btitle');
const authorInput = document.getElementById('bauthor');
document
  .getElementById('bookslist')
  .addEventListener('submit', (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (!title || !author) {
      return;
    }

    const book = new Bclasses(title, author);
    Bclasses.add(book);
    displayBooks();
  });