function fateChooser(answerSet) {
  // letter count of answers ranges from low of 58 to high of 137
  let letterCount = 0
  for (const ans of answerSet) {
    letterCount += ans.length
  }
  if (letterCount < 60) return {"language": "J", "link": "https://code.jsoftware.com/wiki/Guides/GettingStarted"} // short circuit return
  if (letterCount < 70) return {"language": "Perl", "link": "https://www.perl.org/docs.html"}
  if (letterCount < 80) return {"language": "Go", "link": "https://golang.org/doc/"}
  if (letterCount < 95) return {"language": "Python", "link": "https://docs.python.org/3/index.html"}
  if (letterCount < 110) return {"language": "JavaScript", "link": "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/"}
  return {"language": "Java", "link": "https://docs.oracle.com/en/java/"}
}

$(document).ready(function() {
  // use a set so we don't get duplicate answers submitted (prevent double clicks, etc.)
  const answers = new Set()
  // get the divs containing the 5 questions
  const questions = $("form.questions-form > div")
  // track which question is showing using this index
  let questionShowingIndex = 0  
  // start by showing the first question (note: must be a jquery object to use jquery functions eg show())
  $(questions[questionShowingIndex]).show("slide", { direction: "right" }, 200)
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
    $(questions[questionShowingIndex]).hide()
    // increment which question is showing
    questionShowingIndex += 1
    // update the progressbar
    progressBar.progressbar({ value: questionShowingIndex * 20 }) // 5 questions, so 20%-40%-60%-80%-100%
    // show the next question if it exists
    if (questionShowingIndex < questions.length) {
      $(questions[questionShowingIndex]).show("slide", { direction: "right" }, 200)
    } else {
      // otherwise all questions are answered! 
      // hide the questions
      $(".questions-container").hide()
      // ready the results for display
      const fate = fateChooser(answers)
      const resultsContainer = $(".results-container")[0]
      const htmlString = `
        <div class="container-fluid m-0 p-5 text-center">
          <h2>The ${fate.language} Language Is Your Future!</h2>
          <p>
            <a href="${fate.link}">${fate.link}</a>
          </p>
          <a class="btn btn-outline-info btn-block btn-lg p-2" href="/">Try again!</a>
        </div>`
      $(resultsContainer).html(htmlString)
      // display the results
      $(resultsContainer).fadeIn()
      // and hide the progress bar
      progressBar.progressbar("destroy")
    }
  })
})