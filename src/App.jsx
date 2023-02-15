import { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
function App() {
	const [quizStarted, setQuizStarted] = useState(
		localStorage.getItem("quizStarted") || false
	);
	const [totalScore, setTotalScore] = useState(
		localStorage.getItem("totalScore") || 0
	);
	const [questions, setQuestions] = useState([]);
	const [options, setOptions] = useState([]);
	const [correctAnswer, setCorrectAnswer] = useState({});
	const [responses, setResponses] = useState({});
	const [score, setScore] = useState(0);
	const [reset, setReset] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showMenu, setShowMenu] = useState(false);

	const baseURL =
		"https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple";

	const fetchQuestions = async () => {
		setLoading(true);
		const response = await fetch(baseURL);
		const data = await response.json();
		setQuestions(data.results);
		setOptions(
			data.results.map((question) => {
				const options = [
					...question.incorrect_answers,
					question.correct_answer,
				];
				return options.sort(() => Math.random() - 0.5);
			})
		);
		setCorrectAnswer(
			data.results.reduce((acc, question, index) => {
				acc[`Q${index + 1}`] = question.correct_answer;
				return acc;
			}, {})
		);
		setLoading(false);
	};

	const startQuiz = () => {
		setLoading(true);
		localStorage.setItem("quizStarted", true);
		setQuizStarted(true);
	};
	const handleRadioChange = (e) => {
		setResponses({ ...responses, [e.target.name]: e.target.value });
	};
	const submitQuiz = () => {
		localStorage.removeItem("quizStarted");
		setQuizStarted(false);
	};
	const checkAnswers = (e) => {
		e.preventDefault();
		setSubmit(true);
		let Score = 0;
		for (let key in responses) {
			if (responses[key] === correctAnswer[key]) {
				Score++;
			}
		}
		setScore(Score);
		setTotalScore(Number(totalScore) + Number(Score));
		localStorage.setItem("totalScore", Score + Number(totalScore));
	};
	useEffect(() => {
		if (quizStarted) {
			fetchQuestions();
		}
	}, [quizStarted, reset]);
	return (
		<div className="App">
			<img
				src="/top-bubble.svg"
				className="absolute top-0 right-0 z-[-1]"
				alt=""
			/>
			{quizStarted ? (
				<Quiz
					handleRadioChange={handleRadioChange}
					checkAnswers={checkAnswers}
					submitQuiz={submitQuiz}
					submit={submit}
					setSubmit={setSubmit}
					loading={loading}
					score={score}
					setScore={setScore}
					setReset={setReset}
					questions={questions}
					options={options}
					correctAnswer={correctAnswer}
					responses={responses}
					totalScore={totalScore}
					setTotalScore={setTotalScore}
				/>
			) : (
				<div className="flex h-screen flex-col items-center justify-center gap-5">
					<h3 className="text-3xl font-bold text-[#293264]">Quizzical</h3>
					<button
						className="flex h-[52px] w-48 items-center justify-center rounded-2xl bg-[#4D5B9E] font-medium text-[#F5F7FB]"
						onClick={startQuiz}
					>
						Start quiz
					</button>
				</div>
			)}
			<img
				src="/bottom-bubble.svg"
				className="absolute bottom-0 left-0 z-[-1]"
				alt=""
			/>
		</div>
	);
}

export default App;
