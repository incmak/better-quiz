import React from "react";
import { decode } from "html-entities";
import { useEffect, useState } from "react";

function Quiz({
	questions,
	options,
	correctAnswer,
	handleRadioChange,
	checkAnswers,
	submitQuiz,
	submit,
	setSubmit,
	loading,
	score,
	setScore,
	setReset,
	responses,
	totalScore,
	setTotalScore,
}) {
	const [menu, showMenu] = useState(false);
	return (
		<div className="pt-10">
			{loading ? (
				<div className="loading-container">
					<div className="spinner"></div>
					<div className="spinner-center"></div>
					<div className="loading-text">Loading...</div>
				</div>
			) : (
				<>
					<button
						id="hamburger"
						className={`hamburger ${
							menu ? "active" : ""
						} absolute top-4  right-4 md:hidden`}
						onClick={() => showMenu((menu) => !menu)}
					>
						<div class="line"></div>
						<div class="line"></div>
						<div class="line"></div>
					</button>
					<div
						className={`menu-items ${
							menu ? "active" : ""
						} fixed top-5 right-5 flex flex-col items-end justify-end gap-0.5 lg:right-10`}
					>
						<button
							className="rounded-md bg-[#293264] px-3 py-1 text-white"
							onClick={submitQuiz}
						>
							Exit
						</button>
						{/* <button>
							<img src="/refresh.svg" alt="" />
						</button>
						<button>
							<img src="/share.svg" alt="" />
						</button>
						<button>
							<img src="/info.svg" alt="" />
						</button>
						<button>
							<img src="/settings.svg" alt="" />
						</button>
						<button>
							<img src="/help.svg" alt="" />
						</button> */}
						<button
							className="rounded-md bg-[#293264] px-3 py-1 text-white"
							onClick={() => {
								localStorage.setItem("totalScore", 0);
								setTotalScore(0);
							}}
						>
							Reset
						</button>
					</div>
					<form onSubmit={checkAnswers}>
						<ul>
							{questions.map((question, index) => (
								<div key={index}>
									<li className="pb-4 font-bold text-[#293264]">
										Q.{index + 1} {decode(question.question)}
									</li>
									<div className="flex flex-wrap items-center gap-3">
										{options[index].map((option, i) => (
											<li key={i}>
												<input
													type="radio"
													name={`Q${index + 1}`}
													value={option}
													id={option + index}
													onChange={handleRadioChange}
													checked={responses[`Q${index + 1}`] === option}
												/>
												<label
													htmlFor={option + index}
													style={{
														backgroundColor:
															submit &&
															correctAnswer[`Q${index + 1}`] === option
																? "#94D7A2"
																: "",
														border:
															submit &&
															correctAnswer[`Q${index + 1}`] === option
																? "none"
																: "",
													}}
													className={` ${
														submit
															? "submitted cursor-not-allowed opacity-60"
															: ""
													} cursor-pointer rounded-lg border border-[#4D5B9E] px-4 py-1 font-medium`}
												>
													{decode(option)}
												</label>
											</li>
										))}
									</div>
									<div className="mb-4 border-b border-b-[#DBDEF0] pt-4" />
									{/* <input type="radio" name={index} value={options[index]} />
										{options[index]} */}
								</div>
							))}
						</ul>
						<div className="flex w-full items-center justify-center">
							{submit && (
								<p className="pr-5 text-sm font-bold text-[#293264]">
									You scored {score}/5 correct answers
								</p>
							)}
							{!submit ? (
								<button
									className=" h-9 w-[120px] rounded-[10px] bg-[#4D5B9E] text-xs font-semibold text-[#F5F7FB]"
									type="submit"
									onClick={checkAnswers}
								>
									Check answers
								</button>
							) : (
								<button
									className=" h-9 w-[120px] rounded-[10px] bg-[#4D5B9E] text-xs font-semibold text-[#F5F7FB]"
									type="button"
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										setScore(0);
										setReset((prev) => !prev);
										setSubmit(false);
									}}
								>
									Play Again
								</button>
							)}
						</div>
						<p className="flex justify-start font-semibold">
							Total Score: {totalScore}
						</p>
					</form>
				</>
			)}
		</div>
	);
}

export default Quiz;
