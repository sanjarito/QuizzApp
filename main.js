$(document).ready(function(){
  'use strict';
  let questionNo = 0;
  let score=0;
  const totalQuestions = 10;
  console.log("main js starts")

    function startQuiz(){
      $('button').on('click', function (event) {
        event.preventDefault()
        $('.start').fadeOut()
        $('.initial-header').fadeOut()
        createQuestions(questionNo)
      });
    }

      function createQuestions(questionNo){
          $('.container').find('.score').html(`<h2 class="green">score : ${score}</h2>`)
          $('.container').find('.question-No').html(`<h2 class="green">Question ${questionNo+1} out of 10</h2>`)
          $('.container').find('.instructions').html(`<h3 class="instructions">
          INSTRUCTIONS:<br><br>
          <i>Hover over one of the letter buttons below
          and chosen answer will display below the question</i></h2>`)
          $('.quiz-questions').append('<li class="question">'+'Question '+`${questionNo+1}`+' : ' + QUESTIONS[questionNo]["question"] + '</li>')
          $('.quiz-questions').append(`<li class="answer"></li>`)
          $('#js-climbing-quiz').append(`
          <a><input type="button" alt="Option A Button" class="choice choiceA" value="A"></input></a>
          <input type="button" alt="Option B Button" class="choice choiceB" value="B"></input>
          <input type="button" alt="Option C Button" class="choice choiceC" value="C"></input>
          <input type="button" alt="Option D Button" class="choice choiceD" value="D"></input>
          `)


          $('.choice').hover(function(e){
            e.stopPropagation()
            let letterVariable = $(this)[0]["value"]
            $('.answer').text("Your Answer : "+ QUESTIONS[questionNo]["answers"][0][letterVariable])
          })

          $('#js-climbing-quiz').one('click','.choice', function(e){
            e.preventDefault();
            console.log($(this)[0]["value"])

            let user_choice = $(this)[0]["value"]
            let correct_answer = QUESTIONS[questionNo]["correct"]
            let correct_answer_text = QUESTIONS[questionNo]["answers"][0][correct_answer]



            if (user_choice == correct_answer && questionNo != 9) {
              questionNo += 1
              $( "" ).replaceAll( ".question" );
              $( "" ).replaceAll( ".choice" );
              $( "" ).replaceAll( ".answer" );

              score +=1
              $('.image-centered-check').addClass('checkmark')
              $('.image-centered-check').fadeIn('fast')
              $('.image-centered-check').fadeOut(1000)

              createQuestions(questionNo)

            } else if (user_choice != correct_answer && questionNo != 9) {
              console.log("wrong answer")
              questionNo += 1
              $( "" ).replaceAll( ".question" );
              $( "" ).replaceAll( ".choice" );
              $( "" ).replaceAll( ".answer" );


              wronganswerscreen(questionNo,correct_answer_text)



            } else {
              if (user_choice == correct_answer){
                score +=1
              }
              endScreen(score)
            }
          })
      };

    function endScreen(score){
      console.log(score)
    $('.container').hide()
      if(score >= 8){
        $('body').append(
          `<div>
          <h1 class="score-header">You scored ${score} out of 10</h1>
          <img class='img-end-screen pass' src="images/pass.png" alt='you pass the test image'>
          <h2 class="no-pass-header"> You pass! <a href="https://www.climbing.com/videos/" target='_blank'>click here</a> for some inspiration</h2>
          <h2 class="no-pass-header"> Or  <a href>take test again </a></h2>
          </div>`
        )
      } else {
        $('body').append(
          `<div>
          <h1 class="score-header">You scored ${score} out of 10</h1>
          <img class='img-end-screen pass' src="images/no_pass.png" alt='no pass the test image'>
          <h2 class="no-pass-header"> Dont worry, you can <a href>Try Again </a></h2>
          </div>`
        )
        $('body').click(function(){
          console.log("hello")
          createQuestions(questionNo)
        })
      }
    }

    function wronganswerscreen(questionNo,correct_answer_text){

      on()
      $('.image-centered-cross').addClass('cross')
      $('.message-wrong-answer').addClass('show-it')
      // $('.image-centered-cross, .message-wrong-answer').fadeIn('fast')
      // $('.image-centered-cross, .message-wrong-answer').fadeOut(4000)
      $('.message-wrong-answer').children().text(`The correct answer was: ${correct_answer_text}`)
      $('#overlay').click(function(){
        off()
      })
      // $('.message-wrong-answer').fadeIn('fast')




      createQuestions(questionNo)
    }

    function on() {
      document.getElementById("overlay").style.display = "block";
    }

    function off() {
      document.getElementById("overlay").style.display = "none";
    }


    function startgame(){
      startQuiz()

    }

  startgame();
});
