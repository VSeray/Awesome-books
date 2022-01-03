let books = JSON.parse(localStorage.getItem('books') || '[]');
const bookList = document.querySelector('#book-list');
const titleElement = document.querySelector('#title');
const authorElement = document.querySelector('#author');

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBook(book) {
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function removeBook(book) {
  books = books.filter((bookE1) => bookE1 !== book);
  localStorage.setItem('books', JSON.stringify(books));
}

function addBookElement(book, addBook) {
  addBook(book);
  const li = document.createElement('li');
  const titleP = document.createElement('p');
  titleP.innerText = book.title;
  const authorP = document.createElement('p');
  authorP.innerText = book.author;
  const removeButton = document.createElement('button');
  removeButton.addEventListener('click', () => {
    removeBook(book);
    li.remove();
  });
}