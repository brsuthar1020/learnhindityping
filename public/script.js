let timeLeft = 60; let timer; let isTyping = false; let originalText = "";

async function fetchParagraph() {
    const res = await fetch('/api/get-paragraph');
    const data = await res.json();
    originalText = data.paragraph;
    document.getElementById('original-text').innerText = originalText;
}
fetchParagraph();

function startTest() {
    const input = document.getElementById('typing-input');
    input.disabled = false; 
    input.value = "";
    input.focus();
    document.getElementById('start-btn').style.display = "none";
    input.addEventListener('input', () => {
        if (!isTyping) { 
            isTyping = true; 
            timer = setInterval(updateTimer, 1000); 
        }
        calculateLiveStats();
    });
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--; 
        document.getElementById('time').innerText = timeLeft;
    } else {
        clearInterval(timer); 
        document.getElementById('typing-input').disabled = true;
    }
}

function calculateLiveStats() {
    const typeInput = document.getElementById('typing-input').value;
    const typedWords = typeInput.trim().split(/\s+/);
    const originalWords = originalText.trim().split(/\s+/);
    let correctChars = 0; let correctWordsCount = 0;

    for (let i = 0; i < typedWords.length; i++) {
        if (typedWords[i] === originalWords[i] && typedWords[i] !== "") {
            correctChars += typedWords[i].length + 1;
            correctWordsCount++;
        }
    }

    let timeElapsed = (60 - timeLeft) / 60; 
    let wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0;
    let accuracy = typedWords[0] !== "" ? Math.round((correctWordsCount / typedWords.length) * 100) : 100;

    document.getElementById('wpm').innerText = wpm;
    document.getElementById('accuracy').innerText = accuracy;
}
