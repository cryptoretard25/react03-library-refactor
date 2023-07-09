import React from "react";
import { useState } from "react";
import Book from "./book";
import { library, Storage } from "./backend.js";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <h1 className="title">Library</h1>
        <button className="log-button">Log In</button>
      </div>
    </div>
  );
}

function Overlay({ setAddBookClicked }) {
  const defaultFormValues = {
    title: "",
    author: "",
    pages: "",
    isRead: false,
  };
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [error, setError] = useState(null);

  const formClickHandler = (e) => {
    e.stopPropagation();
  };

  const overlayClickHandle = (e) => {
    if ((e.target.className = "overlay")) setAddBookClicked(false);
  };

  const submintHandler = (e) => {
    e.preventDefault();
    if (!formValues.title || !formValues.author || !formValues.pages) {
      setError("Please fill all of the text fields");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    const { title, author, pages, isRead } = formValues;
    if (library.contains(title)) {
      setError("This book is already exists!");
      setTimeout(() => {
        setError(null);
        setFormValues(defaultFormValues);
      }, 2000);
      return;
    }
    library.addBook(new Book(title, author, pages, isRead));
    Storage.saveLibrary(library);
    console.log(library);
    setAddBookClicked(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    setFormValues((prevVal) => ({ ...prevVal, [name]: newVal }));
  };

  return (
    <div className="overlay" onClick={overlayClickHandle}>
      <form id="addBookForm" onClick={formClickHandler}>
        <div className="book add-book-menu">
          <h3>Add new book</h3>
          {error && (
            <div className="error" style={{ color: "red" }}>
              {error}
            </div>
          )}
          <div className="book-info">
            <input
              value={formValues.title}
              onChange={handleChange}
              className="input"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              required=""
              maxLength="100"
            />
            <input
              value={formValues.author}
              onChange={handleChange}
              className="input"
              type="text"
              name="author"
              id="author"
              placeholder="Author"
              required=""
              maxLength="100"
            />
            <input
              value={formValues.pages}
              onChange={handleChange}
              className="input"
              type="number"
              name="pages"
              id="pages"
              placeholder="Pages"
              required=""
              max="10000"
            />
          </div>
          <div className="is-read">
            <label htmlFor="is-read">Have you read it?</label>
            <input
              checked={formValues.isRead}
              onChange={handleChange}
              className="checkbox"
              type="checkbox"
              name="isRead"
              id="isRead"
            />
          </div>
          <button
            type="submit"
            className="book-button dark"
            id="confirm"
            onClick={submintHandler}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [addBookClicked, setAddBookClicked] = useState(false);
  const [books, setBooks] = useState(library.books);

  const addBookClickHandle = () => {
    setAddBookClicked(true);
  };

  const AllBooks = books.map((book, index) => {
    const { title, author, pages, read } = book;
    return (
      <BookItem
        key={index}
        name={title}
        author={author}
        pages={pages}
        read={read}
        setBooks={setBooks}
      />
    );
  });

  return (
    <div className="main-container">
      <div className="menu">
        <button className="add-book" onClick={addBookClickHandle}>
          + Add book
        </button>
      </div>
      <div className="main">{AllBooks}</div>
      {addBookClicked && <Overlay setAddBookClicked={setAddBookClicked} />}
    </div>
  );
}

function Footer() {
  return (
    <div className="footer">
      <h3>Copyright 2022 © cryptoretard22</h3>
    </div>
  );
}

function BookButtonRemove({ setBooks, title }) {
  const removeHandler = () => {
    library.deleteBook(title);
    setBooks(library.books);
    Storage.saveLibrary(library);
  };

  return (
    <button className="book-button remove" onClick={removeHandler}>
      Remove
    </button>
  );
}

function BookButtonIsRead({ isRead, title }) {
  const [readed, setReaded] = useState(isRead);

  const isReadHandler = () => {
    const book = library.getBook(title);
    setReaded(book.setRead())
    Storage.saveLibrary(library)
  };

  return (
    <button
      onClick={isReadHandler}
      className={`book-button read ${readed ? "green" : "red"}`}
    >
      {readed ? "Read" : "Not read"}
    </button>
  );
}

function BookItem({ name, author, pages, read, setBooks }) {
  return (
    <div className="book">
      <div className="book-info">
        <p className="book-name"> {`"${name}"`} </p>
        <p className="book-author"> {author}</p>
        <p className="book-pages">{pages} pages</p>
      </div>
      <BookButtonIsRead isRead={read} title={name} />
      <BookButtonRemove setBooks={setBooks} title={name} />
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
