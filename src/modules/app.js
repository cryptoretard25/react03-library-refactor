import React from "react";
import { useState } from "react";
import Book from "./book";
import Library from "./library";
import Storage from "./storage";

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
  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    pages: "",
    isRead: false,
    error: null,
  });
  const [isError, setIsError] = useState(false);

  const formClickHandler = (e) => {
    e.stopPropagation();
  };

  const overlayClickHandle = (e) => {
    if ((e.target.className = "overlay")) setAddBookClicked(false);
  };

  const submintHandler = (e) => {
    e.preventDefault();
    if (!formValues.title || !formValues.author || !formValues.pages) {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 2000);
      return;
    }

    console.log("Submit");
    setAddBookClicked(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    const newVal = type === "checkbox" ? checked : value;
    setFormValues((prevVal) => ({ ...prevVal, [name]: newVal }));
  };

  return (
    <div className="overlay" onClick={overlayClickHandle}>
      <form id="addBookForm" onClick={formClickHandler}>
        <div className="book add-book-menu">
          <h3>Add new book</h3>
          {isError && (
            <div className="error" style={{ color: "red" }}>
              Please fill in all text fields
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

  const addBookClickHandle = () => {
    setAddBookClicked(true);
  };

  return (
    <div className="main-container">
      <div className="menu">
        <button className="add-book" onClick={addBookClickHandle}>
          + Add book
        </button>
      </div>
      <div className="main">
        <BookItem />
        <BookItem />
        <BookItem />
      </div>
      {addBookClicked ? (
        <Overlay setAddBookClicked={setAddBookClicked} />
      ) : null}
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

function BookButtonRemove() {
  return <button className="book-button remove">Remove</button>;
}

function BookButtonIsRead({ isRead }) {
  const [text, setText] = useState(() => (isRead ? "Read" : "Not read"));

  return (
    <button className={`book-button read ${isRead ? "red" : "green"}`}>
      {text}
    </button>
  );
}

function BookItem({ name, author, pages, read }) {
  return (
    <div className="book">
      <div className="book-info">
        <p className="book-name"> "Well Behaved Wives" </p>
        <p className="book-author">Amy Sue Nathan</p>
        <p className="book-pages">319 pages</p>
      </div>
      <BookButtonIsRead isRead={false} />
      <BookButtonRemove />
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
