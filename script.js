const library = [];
const libraryTable = document.querySelector("tbody");

class createBook {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };

    get info () {
        let readStatus = "not read yet";

        if (this.read) {
            readStatus = "already read"
        };

        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}.`;
    };
};

function addBookToLibrary (title, author, pages, read) {
    const book = new createBook(title, author, pages, read);
    library.push(book);
};

function displayLibrary () {

    while (libraryTable.lastElementChild) {
        libraryTable.removeChild(libraryTable.lastElementChild)
    }
    for (let index = 0; index < library.length; index++) {
        let book = library[index];
        let row = document.createElement("tr");
        for (let key in book) {
            if (key != 'info') {
                let tableElement = document.createElement("td");
                tableElement.textContent = book[key];
                tableElement.setAttribute("style","text-align: center; vertical-align: middle");
                row.appendChild(tableElement);
            };
        };

        const removeButton = document.createElement("button");
        removeButton.setAttribute("id", "removebook");
        removeButton.textContent = "delete book";
        removeButton.addEventListener("click", () => {
            const parent = removeButton.parentNode;
            parent.remove();
        });
        row.appendChild(removeButton);

        const changeRead = document.createElement("button");
        changeRead.textContent = "Change Read Status";
        changeRead.addEventListener("click", () => {
            let readStatus = changeRead.previousElementSibling.previousElementSibling;
            if (readStatus.textContent == "true") {
                readStatus.textContent = "false";
            } else {
                readStatus.textContent = "true"
            };
        });
        row.appendChild(changeRead);
        libraryTable.appendChild(row);
    };
};

const form = document.querySelector("form");

const errorMessage = function (formElement) {
    console.log(formElement.validity.valueMissing);
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let bookTitle = document.querySelector("#book-title");
    let bookAuthor = document.querySelector("#book-author");
    let bookPages = document.querySelector("#book-pages");

    errorMessage(bookAuthor);
    errorMessage(bookTitle);

    let bookRead = document.querySelector("input[name=readBook]:checked");

    let check = bookRead.getAttribute("id");
    let bookReadStatus = document.querySelector(`label[for=${check}]`).textContent;
    let status = bookReadStatus === "true";

    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, status);
    displayLibrary();
});