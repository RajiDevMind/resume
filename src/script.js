const noteEl = document.querySelector(".notes");

const careers = [
  "Web Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Content Creator",
];

let careerIndex = 0;

let characterIndex = 0;

const updateText = () => {
  characterIndex++;
  noteEl.innerHTML = `I am a ${careers[careerIndex].slice(0, characterIndex)}`;

  if (characterIndex === careers[careerIndex].length) {
    careerIndex++;
    characterIndex = 0;
  }
  if (careerIndex === careers.length) {
    careerIndex = 0;
  }
  setTimeout(updateText, 300);
};
updateText();

// Dark mode functionality
const inputEl = document.querySelector(".inputcheckbox");
const bodyEl = document.querySelector("body");

inputEl.checked = JSON.parse(localStorage.getItem("mode"));

// function change background color
const updateChecked = () => {
  if (inputEl.checked) {
    bodyEl.style.backgroundColor = "#ccc";
  } else {
    bodyEl.style.backgroundColor = "white";
  }
};
updateChecked();

// event update background color
inputEl.addEventListener("input", () => {
  updateChecked();
  updateLocalStorage();
});

// func to store users settings to local storage
function updateLocalStorage() {
  localStorage.setItem("mode", JSON.stringify(inputEl.checked));
}
// dark mode func ends here

// email form submission start here with dialog box
const formEl = document.getElementById("myForm");
const emailInputs = document.querySelector(".email");

// const btn = document.querySelector(".btn");
const thanks = document.querySelector(".thankyoucontainer");
const hidepopup = document.querySelector(".hidepopup");

formEl.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(formEl);

  const checkEmptyValues = [...formData.values()];
  const isEmpty = checkEmptyValues.includes("");
  if (isEmpty) {
    alert("Kindly provide valid details!");
    console.log("Kindly provide valid details!");
    return;
  }
  const emailInput = formData.get("email");

  const response = await fetch("http://localhost:4500/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailInput }),
    credentials: "include",
  });

  if (response.status === 200) {
    thanks.classList.add("display");
  } else {
    console.log("Failed to Subscribe, Try again!");
  }
  e.currentTarget.reset("");
});

// Dialog box popup to remove
hidepopup.addEventListener("click", function () {
  thanks.classList.remove("display");
});
