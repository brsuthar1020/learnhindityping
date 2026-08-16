const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const typingPassages = [
    "भारत एक विशाल और सुंदर देश है। यहाँ विभिन्न धर्मों और जातियों के लोग एक साथ मिलजुल कर रहते हैं।",
    "कठिन परिश्रम ही सफलता की कुंजी है। जो व्यक्ति मेहनत करता है, वह जीवन में कभी असफल नहीं होता।"
];

app.get('/api/get-paragraph', (req, res) => {
    const randomParagraph = typingPassages[Math.floor(Math.random() * typingPassages.length)];
    res.json({ paragraph: randomParagraph });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
