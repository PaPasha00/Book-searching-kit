import axios from "axios";
import { link } from "fs";

export const getBooksAPI = {
    getBooks(title: string, type: string, order: string, startIndex: number, maxResults: number) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&printType=${type}&orderBy=${order}&startIndex=${String(startIndex)}&maxResults=${String(maxResults)}&key=AIzaSyDOkVaSryYHm3oFRu_rAVOpWbfJczbz8-Y`)
    },
    getOneBook(id: string) {
        return axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDOkVaSryYHm3oFRu_rAVOpWbfJczbz8-Y`)
    }, 
}