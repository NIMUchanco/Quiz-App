const API_URL = 'https://the-trivia-api.com/v2/questions/';

async function getQuiz() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data && Array.isArray(data)) {
            return data.map(quiz => {
                return {
                    question: quiz.question.text,
                    correct_answer: quiz.correctAnswer,
                    incorrect_answers: quiz.incorrectAnswers
                };
            });
        } else {
            console.error('Error: Invalid API response format');
            return [];
        }
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export default getQuiz;