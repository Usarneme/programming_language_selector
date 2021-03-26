$(document).ready(function() {
  // use a set so we don't get duplicate answers submitted (prevent double clicks, etc.)
  const answers = new Set()
  // get the divs containing the 5 questions
  const questions = $("form.questions-form > div")
  // track which question is showing using this index
  let questionShowingIndex = 0  
  // start by showing the first question
  questions[questionShowingIndex].style.display = "block"
  
  // ready the progress bar
  const progressBar = $(".progress-bar")
  progressBar.progressbar({ value: false })

  // handle clicking on any of the buttons within the form
  $("form.questions-form").submit(function(event) {
    event.preventDefault()
    // find the button that was clicked (aka the answer that was chosen)
    for (const buttons of event.target) {
      // the attribute value is a string but just to be thorough check for boolean as well
      if (buttons.attributes["aria-pressed"].value === true || buttons.attributes["aria-pressed"].value === "true") {
        // we found a chosen answer! add it to the set of answers
        answers.add(buttons.textContent)
      }
    }
    // after updating the answers set...
    // hide the current element
    questions[questionShowingIndex].style.display = "none"
    // increment which question is showing
    questionShowingIndex += 1
    // update the progressbar
    progressBar.progressbar({ value: questionShowingIndex * 20 }) // 5 questions, so 20%-40%-60%-80%-100%
    // show the next question if it exists
    if (questionShowingIndex < questions.length) {
      questions[questionShowingIndex].style.display = "block"
    } else {
      // otherwise all questions are answered! 
      // hide the questions
      $(".questions-container").hide()
      // ready the results for display
      // TODO func
      // display the results
      $("results-container").show()
      // and hide the progress bar
      progressBar.progressbar("destroy")
    }
  })
})