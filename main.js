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
        // $('.container').append('<h2 class="score">Score : '+score)
        // $('.container').append('<h2 class="questionNo">'+questionNo + " out of : "+totalQuestions+'</h2>')
        createQuestions(questionNo)


      });
    }


      function createQuestions(questionNo){
          $('.container').find('.score').html(`<h2 class="green">score : ${score}</h2>`)
          $('.container').find('.question-No').html(`<h2 class="green">Question ${questionNo+1} out of 10</h2>`)

          $('.quiz-questions').append('<li class="question">'+'Question '+`${questionNo+1}`+' : ' + QUESTIONS[questionNo]["question"] + '</li>')
          $('#js-climbing-quiz').append(`
          <button alt="Option A Button" class="choice"><div style="height:18px;"><p>A</p></div></button>
          <button alt="Option B Button" class="choice"><div style="height:18px;"><p>B</p></div></button>
          <button alt="Option C Button" class="choice"><div style="height:18px;"><p>C</p></div></button>
          <button alt="Option D Button" class="choice"><div style="height:18px;"><p>D</p></div></button>
          `)

          $('button').hover(function(e){
            e.stopPropagation()
            let letterVariable = $(this).children().text()

            $(this).children().text(QUESTIONS[questionNo]["answers"][0][letterVariable])
          })


          $('#js-climbing-quiz').one('click','.choice', function(e){
            e.preventDefault();
            let user_choice = $(this).children().text()
            let correct_answer = QUESTIONS[questionNo]["correct"]
            if (user_choice == correct_answer && questionNo != 9) {
              questionNo += 1
              $( "" ).replaceAll( ".question" );
              $( "" ).replaceAll( ".choice" );
              console.log("right answer");
              score +=1
              // $('.image-centered-cross').Class('cross')
              $('.image-centered-check').addClass('checkmark')
              $('.image-centered-check').fadeIn('fast')
              $('.image-centered-check').fadeOut(1000)
              createQuestions(questionNo)

            } else if (user_choice != correct_answer && questionNo != 9) {
              console.log("wrong answer")
              questionNo += 1
              $( "" ).replaceAll( ".question" );
              $( "" ).replaceAll( ".choice" );
              $('.image-centered-cross').addClass('cross')
              $('.image-centered-cross').fadeIn('fast')
              $('.image-centered-cross').fadeOut(1000)
              createQuestions(questionNo)

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
          <img class='img-end-screen pass' src="images/pass.png" alt='you pass the test image'>
          <h1 class="no-pass-header"> You pass! <a href="https://www.climbing.com/videos/" target='_blank'>click here</a> for some inspiration</h1>
          <h1 class="no-pass-header"> Or  <a href>take test again </a></h1>
          </div>`
        )
      } else {
        $('body').append(
          `<div>
          <img class='img-end-screen pass' src="images/no_pass.png" alt='no pass the test image'>
          <h1 class="no-pass-header"> Dont worry, you can <a href>Try Again </a></h1>
          </div>`
        )
        $('body').click(function(){
          console.log("hello")
          createQuestions(questionNo)
        })
      }
    }


    function startgame(){
      startQuiz()

    }

  startgame();
});
