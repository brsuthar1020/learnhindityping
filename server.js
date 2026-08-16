const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Devlys 010 वाले पैराग्राफ (यह स्क्रीन पर असली हिंदी में दिखेंगे)
const typingPassages = [
    "Hkkjr ,d fo'kky vkSj lqanj ns'k gSA ;gkWa fofHkUu /keksZa vkSj tkfr;ksa ds yksx ,d lkFk feytqy dj jgrs gSaA",
    "dfBu ifjJe gh lQyrk dh dqath gSA tks O;fDr esgur djrk gS] og thou esa dHkh vlQy ugha gksrkA"
];

app.get('/api/get-paragraph', (req, res) => {
    const randomParagraph = typingPassages[Math.floor(Math.random() * typingPassages.length)];
    res.json({ paragraph: randomParagraph });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
