const fortunes = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy try again",
  "Better not tell you now",
  "Ask again later",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "Outlook not so good",
  "My sources say no",
  "Very doubtful"
];
  
  const userInfoForm = document.getElementById("user-info");
  const crystalBall = document.getElementById("crystal-ball");
  const fortuneText = document.getElementById("fortune-text");
  const loader = document.getElementById("loader");
  const questionInput = document.getElementById("question");
  const submitButton = userInfoForm.querySelector("button");
  const goBackButton = document.getElementById("go-back");

  function updateSubmitButtonState() {
    if (questionInput.value.trim()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
  
  questionInput.addEventListener("input", updateSubmitButtonState);
  
  userInfoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const question = questionInput.value.trim();
  
    if (!question) {
      alert("Please enter a question.");
      return;
    }
  
    crystalBall.style.pointerEvents = "auto";
    userInfoForm.style.display = "none";
  });

  goBackButton.addEventListener("click", function () {
    location.reload(); // Reload the page
  });

  function revealFortune() {
    crystalBall.classList.add("shake");
    loader.style.display = "block";
  
    setTimeout(() => {
    loader.style.display = "none";
    crystalBall.classList.remove("shake");

    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const randomFortune = fortunes[randomIndex];
    fortuneText.textContent = randomFortune;

    fortuneText.classList.add("fade-in-up");
    fortuneText.classList.remove("visible");
    setTimeout(() => {
      fortuneText.classList.add("visible");
      fortuneText.classList.remove("fade-in-up");
      goBackButton.style.display = "block"; // Show the "Go Back" button
    }, 500);

    setTimeout(() => {
      fortuneText.classList.remove("visible");
    }, 5000);
  }, 2000);
  }
  

crystalBall.addEventListener("click", revealFortune);
crystalBall.style.pointerEvents = "none";