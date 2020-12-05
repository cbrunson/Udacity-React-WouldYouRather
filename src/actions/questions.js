import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    };
}

export function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question,
    }
}

export function answerQuestion(answer) {
    return {
        type: ANSWER_QUESTION,
        answer
    }
}

export function handleReceiveQuestions() {
    return (dispatch) => {
        return _getQuestions()
            .then((questions) => {
                dispatch(receiveQuestions(questions))
            });
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        return _saveQuestion(question)
            .then((formattedQuestion) => {
                dispatch(saveQuestion({[formattedQuestion.id]: formattedQuestion}))
            });
    }
}

export function handleAnswerQuestion(answer) {
    return (dispatch) => {
        return _saveQuestionAnswer(answer)
            .then(() => {
                dispatch(answerQuestion(answer))
            });
    }
}