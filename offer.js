// Function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}

// Function to check if a cookie exists and display the correct message
function checkSubmissionStatus() {
    const submitted = getCookie("submissionStatus");
    const creditChoice = getCookie("creditChoice");

    // If the user has submitted, show a thank you message
    if (submitted === "true") {
        document.getElementById('claimed').style.display = "flex";
    } else if (creditChoice) {
        // If a credit choice exists, show the saved credit message
        document.getElementById('offer-container-600').style.display = "none";
        document.getElementById('offer-container-1200').style.display = "none";
        document.getElementById('offer-container-1800').style.display = "none";
        document.getElementById('offer-container-' + creditChoice).style.display = "flex";
    } else {
        document.getElementById('new-here').style.display = "flex";
    }

    if (creditChoice && !window.creditChoiceSet) {
        setTimeout(function() {
            document.querySelector('[data-offer="'+ creditChoice +'"]').click();
            window.creditChoiceSet=true;
        }, 1000);
    }
}
