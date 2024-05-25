const library = [];
const libraryTable = document.querySelector("tbody");

function createBook (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
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
            console.log("works");
            parent.remove();
        });
        row.appendChild(removeButton);

        const changeRead = document.createElement("button");
        changeRead.textContent = "Change Read Status";
        changeRead.addEventListener("click", () => {
            let readStatus = changeRead.previousElementSibling.previousElementSibling;
            console.log(readStatus);
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

const submit = document.querySelector("#submit-button");

submit.addEventListener("click", (event) => {
    event.preventDefault();
    let bookTitle = document.querySelector("#book-title").value;
    let bookAuthor = document.querySelector("#book-author").value;
    let bookPages = document.querySelector("#book-pages").value;
    let bookRead = document.querySelector("input[name=readBook]:checked");

    let check = bookRead.getAttribute("id");
    let bookReadStatus = document.querySelector(`label[for=${check}]`).textContent;
    let status = bookReadStatus === "true";

    addBookToLibrary(bookTitle, bookAuthor, bookPages, status);
    displayLibrary();
});