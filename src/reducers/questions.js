import { RECEIVE_QUESTIONS, SAVE_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        case SAVE_QUESTION:
            return {
                ...state,
                ...action.question
            };
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.answer.qid]: {
                    ...state[action.answer.qid],
                    [action.answer.answer]: {
                        ...state[action.answer.qid][action.answer.answer],
                        votes: state[action.answer.qid][action.answer.answer].votes.concat(action.answer.authedUser)
                    }
                }
            };
        default:
            return state;
    }
}