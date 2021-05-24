import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(resp => resp.json())
      .then(data => setQuestions(data))
  })

  function handleDelete(id) {
    const URL = `http://localhost:4000/questions/${id}`
    fetch(URL, { method: 'DELETE' })
  }

  function handleAnswerChange(id, correctIndex) {
    const URL = `http://localhost:4000/questions/${id}`
    fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => {
        return <QuestionItem question={question} handleDelete={handleDelete} onAnswerChange={handleAnswerChange} />
      })}</ul>
    </section>
  );
}

export default QuestionList;