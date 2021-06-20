const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const fparts = document.querySelectorAll('.figure-part');

const words = ['marvel', 'ironman', 'spiderman', 'captainamerica', 'falcon','blackwidow','hulk','hawkeye','drstrange','captainmarvel','wintersoldier','antman','warmachine','thor','scarletwitch','vision','quicksilver','mephisto','wasp','blackpanther','wolverine'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//trying something new

// const mysql = require('mysql2');
// const db_connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'marvel',
//     password:''
// });

// selectedWord=db_connection.promise().execute("SELECT name FROM superheroes ORDER BY RAND() LIMIT 1;");

// console.log(selectedWord)

// Show hidden word
function displayWord() {
        wordEl.innerHTML = `
          ${selectedWord
            .split('')
            .map(
              letter => `
                <span class="letter">
                  ${correctLetters.includes(letter) ? letter : ''}
                </span>
              `
            )
            .join('')}
        `;
const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'You did it Mr. Stark! We won! ';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersEl(){
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Bad move padawan</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  fparts.forEach((part,index)=>{
      const error=wrongLetters.length;
      if(index<error){
          part.style.display='block';
      }
      else{
          part.style.display='none';
      }
  });

  if(wrongLetters.length==fparts.length){
      finalMessage.innerText='I dont wanna go Mr.Stark, I am sorry';
      popup.style.display='flex';
  }
}

function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    }, 5000)
}

window.addEventListener('keydown', e=>{
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter=e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            }
            else{
                showNotification();
            }
        }
    }
})

playAgainBtn.addEventListener('click', ()=>{
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    // selectedWord=db_connection.promise().execute("SELECT name FROM superheroes ORDER BY RAND() LIMIT 1;");
    displayWord();
    updateWrongLettersEl();
    popup.style.display='none';
})

displayWord();

