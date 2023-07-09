import Library from "./library";
import Book from "./book";

export default class Storage {
  static saveLibrary(data) {
    localStorage.setItem("Library", JSON.stringify(data));
  }
  static getLibrary() {
    const library = Object.assign(
      new Library(),
      JSON.parse(localStorage.getItem("Library"))
    );
    library.setBooks(
      library.getBooks().map((book) => Object.assign(new Book(), book))
    );
    return library;
  }
}
