export default class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  getTitle() {
    return this.title;
  }
  setTitle(title) {
    this.title = title;
  }
  getAuthor() {
    return this.author;
  }
  setAuthor(author) {
    this.author = author;
  }
  getPages() {
    return `${this.pages} pages`;
  }
  setPages(pages) {
    this.pages = pages;
  }
  getRead() {
    return this.read;
  }
  setRead() {
    this.read === true ? (this.read = false) : (this.read = true);
    return this.read
  }
}