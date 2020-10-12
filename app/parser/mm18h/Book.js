'use strict'

const WebBook = require("../../core/WebBook").WebBook;
const BookImageUrlLoader = require("./BookImageUrlLoader").BookImageUrlLoader;
class Book extends WebBook {
    
    constructor(){
        super("mm18h");
    }

    embedWebLoaders(){
        this.webLoaders.push(
            new BookImageUrlLoader(this)
        );
    }


}

module.exports.Book = Book;