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
                row.appendChild(tableElement);
            };
        };

        libraryTable.appendChild(row);
    };
};

addBookToLibrary("JoeMama", "Joe", 10, true);
