'use strict'

const WebBook = require("../../core/entity/WebBook").WebBook;
const BookImageUrlLoader = require("./BookImageUrlLoader").BookImageUrlLoader;
const Group = require("../../core/entity/Group").Group;
class Book extends WebBook {
    
    constructor(){
        super("mm18h");
    }

    embedWebLoaders(){
        this.webLoaders.push(
            BookImageUrlLoader
        );
    }

    static build(url){
        const book = new Book();
        book.setName("test");
        book.setEntryUrl(url);
        const g = Group.buildGroup(url);
        book.addGroup(g);
        return book;
    }

}

module.exports.Book = Book;