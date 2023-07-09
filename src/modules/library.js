export default class Library {
  constructor() {
    this.books = [];
  }
  setBooks(array) {
    this.books = array;
  }
  getBooks() {
    return this.books;
  }
  contains(title) {
    return this.books.some((book) => book.title === title);
  }
  getBook(title) {
    return this.books.find((book) => book.title === title);
  }
  addBook(newBook) {
    if (this.books.find((book) => book.title === newBook.title)) return;
    this.books.push(newBook);
  }
  deleteBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
}
