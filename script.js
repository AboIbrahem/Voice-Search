/*
    ** Creat by DAA 
    ** 2022/3/20 12:00 PM

*/
const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.lang = "en-US";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="bi bi-mic-fill"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("bi-mic-fill")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.onstart = ()=> {
    micIcon.classList.remove("bi-mic-fill");
    micIcon.classList.add("bi-mic-mute-fill");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.onend = ()=> {
    micIcon.classList.remove("bi-mic-mute-fill");
    micIcon.classList.add("bi-mic-fill");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.onresult = (event)=> {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="stop recording") {
      recognition.stop();
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="go") {
        searchForm.submit();
      }
      else if(transcript.toLowerCase().trim()==="reset") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
  info.textContent = 'Voice Commands: "stop recording", "reset", "go"';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}