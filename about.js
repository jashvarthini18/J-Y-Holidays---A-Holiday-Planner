const toggleButton = document.getElementById("toggleButton");
const hiddenContent = document.getElementById("hiddenContent");

toggleButton.addEventListener("click", () => {
    if (hiddenContent.style.display === "none") {
        hiddenContent.style.display = "block";
        toggleButton.textContent = "Hide Content";
    } else {
        hiddenContent.style.display = "none";
        toggleButton.textContent = "Show Content";
    }
});
