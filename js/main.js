class StorageBookInLocal {
  static addBookLocal(book) {
    const arrBooks = StorageBookInLocal.getBookLocal();
    arrBooks.push(book);
    localStorage.setItem("arrBooks", JSON.stringify(arrBooks));
  }

  static deleteBookLocal() {
    const arrBooks = StorageBookInLocal.getBookLocal();
    const newBooks = arrBooks.filter((item) => item.isbn !== isbn);
    localStorage.setItem("arrBooks", JSON.stringify(newBooks));
  } 

  static getBookLocal() {
    const books = localStorage.getItem("booksApp");
    if (!books) return [];
    return JSON.parse(books);
  }
}

class SessionTask {
  static showInform(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.innerHTML = message;
    document.querySelector("#booklist__form").prepend(div);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }
  static clearValueInput() {
    document.querySelector("#booklist__title").value = "";
    document.querySelector("#booklist__author").value = "";
    document.querySelector("#booklist__isbn").value = "";
  }
  static displayListBooks() {
    listBookOrigin.map((book) => {
      StorageBookInLocal.getBookLocal(book);
      SessionTask.addToListBooks(book);
    });
  }
  static addToListBooks(book) {
    const listBook = document.querySelector(".booklist__ul");
    const colBook = document.createElement("li");
    colBook.className = "col-12 col-lg-6";
    colBook.innerHTML = `
    <figure class='booklist__book'>
        <ul class='booklist__coverFront'>
            <li>
                <img src="https://picsum.photos/200/${book.isbn}" alt="" width="100%" height="100%">
            </li>
            <li></li>
        </ul>
        <ul class='booklist__pages'>
            <li></li>
            <li>
                <button class="btnDownload" data-bs-toggle="modal" data-bs-target="#booklist__modal">More Detail</button>
            </li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <ul class='booklist__coverBack'>
            <li></li>
            <li></li>
        </ul>
        <ul class='book_spine'>
            <li></li>
            <li></li>
        </ul>
        <figcaption>
            <h1>${book.title}</h1>
            <span>${book.author}</span>
            <p class="mb-0 fw-bold">#ISBN</p>
            <p>${book.isbn}</p>
            <button href="#" class="btn btn-danger btn-sm removeBook">Delete</button>
          
        </figcaption>
    </figure>
`;
    {
      /* <button href="#" class="mx-2 btn btn-warning btn-sm changeBook">Change</button> */
    }
    listBook.appendChild(colBook);
    StorageBookInLocal.getBookLocal(book);
    SessionTask.removeBook();
  }

  static removeBook() {
    let listDelete = document.querySelectorAll(".removeBook");
    for (let i = 0; i < listDelete.length; i++) {
      listDelete[i].onclick = () => {
        listDelete[i].parentElement.parentElement.parentElement.remove();
        StorageBookInLocal.deleteBookLocal(
          listDelete[i].parentElement.childNodes[7].innerHTML
        );
        // console.log(listDelete[i].parentElement.childNodes[7].innerHTML);
      };
    }
  }

  static changeBook() {
    let listChange = document.querySelectorAll(".changeBook");
    for (let i = 0; i < listChange.length; i++) {
      listChange[i].onclick = () => {
        // document.querySelector("#booklist__title");
        // document.querySelector("#booklist__author");
        // document.querySelector("#booklist__isbn");
      };
    }
  }
}

SessionTask.displayListBooks();
SessionTask.changeBook();   

let addBookButtonForm = (e) => {
  e.preventDefault();
  const title = document.querySelector("#booklist__title").value;
  const author = document.querySelector("#booklist__author").value;
  const isbn = document.querySelector("#booklist__isbn").value;

  if (author.trim() === "" || title.trim() === "" || isbn.trim() === "") {
    SessionTask.showInform("Incorect value", "danger");
    return;
  }
  const newBook = new Book(title, author, isbn);
  SessionTask.addToListBooks(newBook);
  StorageBookInLocal.addBookLocal(newBook);
  SessionTask.showInform("Added Book Completely", "success");
  SessionTask.clearValueInput();
};
document.querySelector("#booklist__form").onsubmit = addBookButtonForm;
