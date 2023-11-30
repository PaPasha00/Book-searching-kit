import booksReducer, { TState } from "../booksReducer";

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        create: jest.fn(() => ({
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() },
            },
        })),
    },
}));


describe('book reducer test', () => {
    let state: TState;

    beforeEach(() => {
        state = {
            books: [{b: 'b'}],
            getting: false,
            counter: 0,
            startIndex: 0,
            maxResults: 30,
            searchParams: {},
            oneBook: {},
        }
    })

    it('gettingInfoFalse', () => {
        const newState = booksReducer(state, { type: 'GETTING', data: false })
        expect(newState.getting).toBeFalsy();
    });

    it('gettingInfoTrue', () => {
        const newState = booksReducer(state, { type: 'GETTING', data: true })
        expect(newState.getting).toBeTruthy();
    });
    it('gettingBooks', () => {
        const newState = booksReducer(state, {
            type: 'ADD_BOOKS', data: {
                books: [{a: 'a'}],
                counter: 10
            }   
        })
        expect(newState.books).toEqual([{a: 'a'}]);
    });
    it('addingNewBooksPart', () => {
        const newState = booksReducer(state, {
            type: 'GET_BOOKS', data: {
                books: [{a: 'a'}],
                counter: 10
            }   
        })
        expect(newState.books).toEqual([{b: 'b'}, {a: 'a'}]);
    });
})
