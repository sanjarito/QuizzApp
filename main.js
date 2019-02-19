'use strict';

let questionNo = 0;
let score=0;
const totalQuestions = 10;
console.log("main js starts")


  function startQuiz(){

    $('button').on('click', '.go-button', function (event) {
      event.preventDefault()
      $('.start').fadeOut()
      // $('.container').append('<h2 class="score">Score : '+score)
      // $('.container').append('<h2 class="questionNo">'+questionNo + " out of : "+totalQuestions+'</h2>')
      createQuestions(questionNo)


    });
  }


    function createQuestions(questionNo){
        $('.container').find('.score').html(`<h2 class="green">score : ${score}</h2>`)
        $('.container').find('.question-No').html(`<h2 class="green">Question ${questionNo} out of 10</h2>`)

        $('.quiz-questions').append('<li class="question">' + QUESTIONS[questionNo]["question"] + '</li>')
        $('#js-climbing-quiz').append(`
        <button class="choice"><p>A</p></button>
        <button class="choice"><p>B</p></button>
        <button class="choice"><p>C</p></button>
        <button class="choice"><p>D</p></button>
        `)

        $('button').hover(function(e){
          e.stopPropagation()
          let letterVariable = $(this).children().text()
          $(this).addClass('button_hover')
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
            createQuestions(questionNo)
          } else if (user_choice != correct_answer && questionNo != 9) {
            console.log("wrong answer")
            questionNo += 1
            $( "" ).replaceAll( ".question" );
            $( "" ).replaceAll( ".choice" );
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
        `<h1> You did great, end screen<h1>`
      )
    } else {
      $('body').append(
        `<h1> You did aweful, end screen<h1>`
      )
    }
  }


  function startgame(){
    startQuiz()

  }

startgame();
