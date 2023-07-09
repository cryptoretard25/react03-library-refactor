import "./style.css"
const { log } = console;

class DOM {
  static main = document.querySelector("div.main");

  static ui() {
    const overlay = document.querySelector(".overlay");
    const openOverlay = function () {
      overlay.classList.remove("hide");
    };
    const closeOverlay = function () {
      overlay.classList.add("hide");
    };

    const addBookButton = (() => {
      const addBookBtn = document.querySelector("button.add-book");
      const listeners = (() => {
        addBookBtn.addEventListener("click", openOverlay);
        overlay.addEventListener("click", (e) => {
          if (e.target.classList.contains("overlay")) {
            closeOverlay();
          }
        });
      })();
    })();

    const addBookMenu = (() => {
      const inputTitle = document.querySelector("input#title");
      const inputAuthor = document.querySelector("input#author");
      const inputPages = document.querySelector("input#pages");
      const inputRead = document.querySelector("#isRead");
      const submit = document.querySelector("button#confirm");
      const error = document.querySelector(".error");

      const isRead = () => inputRead.checked;

      const clearFields = () => {
        inputTitle.value = "";
        inputAuthor.value = "";
        inputPages.value = "";
        inputRead.checked = false;
      };

      const addBook = (e) => {
        e.preventDefault();

        const title = inputTitle.value;
        const author = inputAuthor.value;
        const pages = inputPages.value;
        const read = isRead();

        if (!title || !author || !pages) return;
        if (library.contains(title)) {
          error.textContent = "This book is already exists!";
          error.classList.add("red-font");
          error.classList.remove("hide");
          setTimeout(() => {
            error.classList.add("hide");
          }, 3000);
        }

        library.addBook(new Book(`"${title}"`, author, pages, read));
        this.updateDOM();
        clearFields();
        closeOverlay();
        //Storage
        Storage.saveLibrary(library);
        log(library);
      };

      const listeners = (() => {
        submit.addEventListener("click", addBook);
      })();
    })();
  }

  static bookToDOM(book) {
    const bookCard = document.createElement("div");
    const info = document.createElement("div");
    const name = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("button");
    const remove = document.createElement("button");

    const properties = (() => {
      bookCard.classList.add("book", "book-card");
      info.className = "book-info";
      name.className = "book-name";
      author.className = "book-author";
      pages.className = "book-pages";
      read.classList.add("book-button", "read");
      remove.classList.add("book-button", "remove");
      remove.textContent = "Remove";
    })();

    const listeners = (() => {
      read.addEventListener("click", this.setRead);
      remove.addEventListener("click", this.removeBook);
    })();

    const construct = (() => {
      info.append(name, author, pages);
      bookCard.append(info, read, remove);
    })();

    const isRead = () => {
      if (book.getRead()) {
        read.classList.remove("red");
        read.classList.add("green");
        return "Read";
      } else {
        read.classList.remove("green");
        read.classList.add("red");
        return "Not read";
      }
    };

    name.textContent = book.getTitle();
    author.textContent = book.getAuthor();
    pages.textContent = book.getPages();
    read.textContent = isRead();

    this.main.append(bookCard);
  }

  static blank() {
    this.main.innerHTML = "";
  }

  static updateDOM() {
    this.blank();
    library.getBooks().forEach((book) => {
      this.bookToDOM(book);
    });
  }

  static removeBook(e) {
    const parent = e.target.parentNode;
    const title = parent.firstChild.firstChild.textContent;
    library.deleteBook(title);
    parent.remove();
    //Storage
    Storage.saveLibrary(library);
  }

  static setRead = (e) => {
    const parent = e.target.parentNode;
    const title = parent.firstChild.firstChild.textContent;
    library.getBook(title).setRead();
    this.updateDOM();
    //Storage
    Storage.saveLibrary(library);
  };
}

const library = Storage.getLibrary();

const onload = (() => {
  DOM.ui();
  DOM.updateDOM();
})();
