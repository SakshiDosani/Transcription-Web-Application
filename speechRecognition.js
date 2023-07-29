if ("webkitSpeechRecognition" in window) {
  let speechRecognition = new webkitSpeechRecognition();
  let final_transcript = "";

  let iBox = document.getElementsByClassName("p-3");
  let listContaniner = document.getElementById("list_container");

  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang = document.querySelector("#select_dialect").value;

  speechRecognition.onstart = () => {
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Error");
  };
  speechRecognition.onend = () => {
    document.querySelector("#status").style.display = "none";
    console.log("Speech Recognition Ended");
  };

  speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
  };

  function addTask(){
      if(iBox.html() === ""){
        alert("Bata to dete, hum maarte thodi");
      }
      else{
        let li = document.createElement("li");
        li.innerHTML = iBox.html();
        listContaniner.appendChild(li);
      }
  }

  document.querySelector("#start").onclick = () => {
    speechRecognition.start();
  };
  document.querySelector("#stop").onclick = () => {
    speechRecognition.stop();
  };
  document.querySelector("#save").onclick = () => {
   addTask();
  };

} else {
  console.log("Speech Recognition Not Available");
}