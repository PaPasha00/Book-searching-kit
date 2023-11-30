import { getBooksAPI } from "../api/api";

const GET_BOOKS = 'GET_BOOKS';
const GETTING = 'GETTING';
const ADD_PAGE = 'ADD_PAGE';
const SET_PARAMS = 'SET_PARAMS';
const ADD_BOOKS = 'ADD_BOOKS';
const GET_ONE_BOOK = 'GET_ONE_BOOK';

export type TState = {
    books: object[];
    getting: boolean;
    counter: number;
    startIndex: number;
    maxResults: number;
    searchParams: object;
    oneBook: object;
};

let initialState = {
    books: [],
    getting: false,
    counter: 0,
    startIndex: 0,
    maxResults: 30,
    searchParams: {},
    oneBook: {},
}

let booksReducer = (state: TState = initialState, action: { type: string, data: any }) => {

    switch (action.type) {
        case GET_BOOKS: 
            return {
                ...state,
                books: [...state.books, ...action.data.books],
            }
        case ADD_BOOKS:
            return {
                ...state,
                books: action.data.books,
                counter: action.data.counter,
            }
        case GETTING:
            return {
                ...state,
                getting: action.data
            }
        case GET_ONE_BOOK:
            return {
                ...state,
                oneBook: action.data
            }
        case ADD_PAGE:
            return {
                ...state,
                startIndex: state.startIndex + action.data,
            }
        case SET_PARAMS:
            return {
                ...state,
                searchParams: action.data,
            }
        default:
            return state
    }
}

export const getBooksThunk = (title: string, type: string, order: string, startIndex: number, maxResults: number)  => {
    return (dispatch: any) => {
        dispatch({
            type: GETTING,
            data: true
        })
        dispatch({ 
            type: 'SET_PARAMS',
            data: {
                title,
                type,
                order,
            }
        })
        getBooksAPI.getBooks(title, type, order, startIndex, maxResults)
            .then(({ data }: { data: { items: object, totalItems: number } }) => {
                if (data.items) {
                    dispatch({ 
                        type: ADD_BOOKS,
                        data: {
                            books: data.items,
                            counter: data.totalItems
                        }
                    }
                    )
                    dispatch({ 
                        type: GETTING,
                        data: false
                    })
                } else dispatch({
                    type: GETTING,
                    data: false
                })
            })
            .catch((err) => {
                alert('Error' + err)
                dispatch({
                    type: GETTING,
                    data: false
                })
            })
    }
}


export const getMoreBooksThunk = (title: string, type: string, order: string, startIndex: number, maxResults: number) => {
    return (dispatch: any) => {
        dispatch({
            type: GETTING,
            data: true
        })
        dispatch({
            type: 'ADD_PAGE',
            data: 1,
        })

        getBooksAPI.getBooks(title, type, order, startIndex + 1, maxResults)
            .then(( data : { data: { items: object, totalItems: string } }) => {
                if (data) {
                    dispatch(
                        { 
                            type: GET_BOOKS,
                            data: { 
                                books: data.data.items,
                                counter: data.data.totalItems
                            }
                        }
                    )
                    dispatch({
                        type: GETTING,
                        data: false
                    })
                } else dispatch({
                    type: GETTING,
                    data: false
                })
            })
            .catch((err) => {
                alert('Error' + err)
                dispatch({
                    type: GETTING,
                    data: false
                })
            })
    }
}


export const getOneBookThunk = (id: string) => { 
    return (dispatch: any) => {
        dispatch({
            type: GETTING,
            data: true
        })
        getBooksAPI.getOneBook(id)
            .then(({ data }: { data: object }) => {
                if (data) {
                    dispatch(
                        { type: GET_ONE_BOOK, data }
                    )
                    dispatch({
                        type: GETTING,
                        data: false
                    })
                } else dispatch({
                    type: GETTING,
                    data: false
                })
            })
            .catch((err) => {
                alert('Error' + err)
                dispatch({
                    type: GETTING,
                    data: false
                })
            })
    }
}

export default booksReducer;