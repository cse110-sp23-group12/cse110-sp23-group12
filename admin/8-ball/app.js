const fortunes = {
    love: [
      "You will meet someone special soon.",
      "An old flame may rekindle.",
      "Your love life will take a surprising turn.",
    ],
    career: [
      "A great opportunity awaits you.",
      "You will receive a promotion.",
      "A career change may be on the horizon.",
    ],
    health: [
      "You will find the strength to overcome a health challenge.",
      "Your energy levels will improve.",
      "Prioritize self-care for optimal health.",
    ],
    general: [
      "You will find success in unexpected places.",
      "Your patience will be rewarded.",
      "You will overcome a difficult challenge.",
    ],
  };
  
  const userInfoForm = document.getElementById("user-info");
  const crystalBall = document.getElementById("crystal-ball");
  const fortuneText = document.getElementById("fortune-text");
  const loader = document.getElementById("loader");
  const nameInput = document.getElementById("name");
  const submitButton = userInfoForm.querySelector("button");
  let selectedCategory = "general";
  
  function updateSubmitButtonState() {
    if (nameInput.value.trim()) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
  
  nameInput.addEventListener("input", updateSubmitButtonState);
  
  userInfoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    selectedCategory = document.getElementById("category").value;
  
    if (!name) {
      alert("Please enter your name.");
      return;
    }
  
    crystalBall.style.pointerEvents = "auto";
    userInfoForm.style.display = "none";
  });

function revealFortune() {
    crystalBall.classList.add("shake");
    loader.style.display = "block";
    
    setTimeout(() => {
      loader.style.display = "none";
      crystalBall.classList.remove("shake");
    
      const randomIndex = Math.floor(Math.random() * fortunes[selectedCategory].length);
      const randomFortune = fortunes[selectedCategory][randomIndex];
      fortuneText.textContent = randomFortune;
    
      fortuneText.classList.add("fade-in-up");
      fortuneText.classList.remove("visible");
      setTimeout(() => {
        fortuneText.classList.add("visible");
        fortuneText.classList.remove("fade-in-up");
      }, 500);
  
      setTimeout(() => {
        fortuneText.classList.remove("visible");
      }, 5000);
    }, 2000);
}

crystalBall.addEventListener("click", revealFortune);
crystalBall.style.pointerEvents = "none";