import { RECEIVE_USERS } from '../actions/users';
import { SAVE_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function users(state = {}, action) {
    let authedUser;
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case SAVE_QUESTION:
            authedUser = action.question[Object.keys(action.question)[0]].author;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat(action.question)
                }
            };
        case ANSWER_QUESTION:
            authedUser = action.answer.authedUser;

            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        [action.answer.qid]: action.answer.answer,
                        ...state[authedUser].answers,
                    }
                }
            };
        default:
            return state;
    }
}