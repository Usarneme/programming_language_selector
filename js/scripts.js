$(document).ready(function() {
  
  $("form.questions-form").submit(function(event) {
    event.preventDefault()
    console.log(event.target)
    // requiring the use of the form is making this way harder than it need be...
    for (const childElement of event.target) {
      console.log(childElement.attributes["aria-pressed"])
    }
  })



  // get the questions container/form
  const questions = $("form.questions-form > div")
  console.log(questions.length)
  // show the first question
  // when a question has been answered, move to the next question (while there are more questions)

  // show each question one at a time until they are all answered
  for (let i = 0; i < questions.length; i += 1) {
    questions[i].style.display = "block"
  }
  // once there are no more questions
  //  hide all questions
  //  show the results of the survey

})