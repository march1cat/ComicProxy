'use strict'

const WebBook = require("../../core/entity/WebBook").WebBook;
const GroupIndexesLoader = require("./GroupIndexesLoader").GroupIndexesLoader;
const GroupImageUrlLoader = require("./GroupImageUrlLoader").GroupImageUrlLoader;


class Book extends WebBook {
    
    bookCode = null;

    constructor(){
        super("comicbus");
    }
    
    embedWebLoaders(){
        this.webLoaders.push(
            GroupIndexesLoader , 
            GroupImageUrlLoader
        );
    }

    setBookCode(code){
        this.bookCode = code;
    }

    getBookCode(){
        return this.bookCode;
    }

    static build(url){
        const book = new Book(url);
        book.setName("test");
        book.setEntryUrl(url);
        return book;
    }


}

module.exports.Book = Book;