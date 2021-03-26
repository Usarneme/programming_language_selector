function fateChooser(answerSet) {
  console.log('Deciding your fate...')
  // letter count of answers ranges from low of 58 to high of 137
  let letterCount = 0
  for (const ans of answerSet) {
    letterCount += ans.length
  }
  if (letterCount < 60) return {"language": "J", "link": "https://code.jsoftware.com/wiki/Guides/GettingStarted"}
  if (letterCount < 70) return {"language": "Perl", "link": "https://www.perl.org/docs.html"}
  if (letterCount < 90) return {"language": "Go", "link": "https://golang.org/doc/"}
  if (letterCount < 100) return {"language": "Python", "link": "https://docs.python.org/3/index.html"}
  if (letterCount < 110) return {"language": "JavaScript", "link": "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/"}
  return {"language": "Java", "link": "https://docs.oracle.com/en/java/"}
}

// a,a,a,a,a = 59
// a,a,a,a,b = 68
// a,a,a,a,c = 74
// a,a,a,b,a = 61
// a,a,a,b,b = 70
// a,a,a,b,c = 76
// a,a,a,c,a = 85
// a,a,a,c,b = 94
// a,a,a,c,c = 100
// a,a,b,a,a = 61
// a,a,b,a,b = 70
// a,a,b,a,c = 76
// a,a,b,b,a = 63
// a,a,b,b,b = 72
// a,a,b,b,c = 78
// highest is 137
// lowest is 58

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
      const fate = fateChooser(answers)
      // display the results
      $("results-container").show()
      // and hide the progress bar
      progressBar.progressbar("destroy")
    }
  })
})