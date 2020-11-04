import { createAction, handleActions } from 'redux-actions'
import { boardService } from '../../services/boardService'
import history from '../../../history'

export const boardConstants = {
    POST_REQUEST: 'BOARD_POST_REQUEST',
    POST_SUCCESS: 'BOARD_POST_SUCCESS',
    POST_FAILURE: 'BOARD_POST_FAILURE',

    GETALL_REQUEST: 'BOARDS_GETALL_REQUEST',
    GETALL_SUCCESS: 'BOARDS_GETALL_SUCCESS',
    GETALL_FAILURE: 'BOARDS_GETALL_FAILURE',

    GET_REQUEST: 'BOARD_GET_REQUEST',
    GET_SUCCESS: 'BOARD_GET_SUCCESS',
    GET_FAILURE: 'BOARD_GET_FAILURE',

    UPDATE_REQUEST: 'BOARD_UPDATE_REQUEST',
    UPDATE_SUCCESS: 'BOARD_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'BOARD_UPDATE_FAILURE',

    DELETE_REQUEST: 'BOARD_DELETE_REQUEST',
    DELETE_SUCCESS: 'BOARD_DELETE_SUCCESS',
    DELETE_FAILURE: 'BOARD_DELETE_FAILURE',
}

// export const getAllSuccess = createAction(boardConstants.GETALL_SUCCESS)

// const boardReducer = handleActions(
//     {[boardConstants.GETALL_SUCCESS]: (state, action) => ({board: action.board})}
// )

export const boardActions = {
    getAllArticles,
    // getArticle,
    // postArticle,
    // updateArticle,
    // delete: _delete
}

function getAllArticles() {
    return dispatch => {
        dispatch(request())
        boardService.getAllArticles()
        .then(
            boards => dispatch(success(boards)),
            error => dispatch(failure(error.toString()))
        )
    }

    function request() {return {type: boardConstants.GETALL_REQUEST}}
    function success(boards) {return {type: boardConstants.GETALL_SUCCESS, boards}}
    function failure(error) {return {type: boardConstants.GETALL_FAILURE, error}}
}

// export default boardReducer