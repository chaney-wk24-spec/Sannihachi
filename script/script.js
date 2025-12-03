
// Array of image objects with their paths and alt text
const stickers = [
    { src: "../image/cy fly_1.png", alt: "Cy Fly Sticker 1" },
    { src: "../image/tomato san_1.png", alt: "Tomato San Sticker 1" },
    { src: "../image/qr chan_1.png", alt: "QR Chan Sticker 1" },
    { src: "../image/potat_1.png", alt: "Potat Sticker 1" },
    { src: "../image/tomato san_2.png", alt: "Tomato San Sticker 2" },
    { src: "../image/cy fly_2.png", alt: "Cy Fly Sticker 2" },
    { src: "../image/potat_2.png", alt: "Potat Sticker 2" },
    { src: "../image/qr chan_2.png", alt: "QR Chan Sticker 2" }
];

// Function to generate the HTML structure
function generateStickerGallery() {
    const gallery = document.getElementById('sticker-gallery');
    let html = '';
    
    // Create two containers (left and right) for each pair of images
    for (let i = 0; i < stickers.length; i += 4) {
        html += '<div class="sticker-container">';
        
        // Left container (first 2 images of the group)
        html += '<div class="sticker-container-left">';
        for (let j = i; j < i + 2 && j < stickers.length; j++) {
            html += `
                <img src="${stickers[j].src}" alt="${stickers[j].alt}">
                <a href="${stickers[j].src}" class="download-btn" target="_blank" download>
                    <i class="fa-solid fa-download"></i> Download
                </a>
            `;
        }
        html += '</div>';
        
        // Right container (next 2 images of the group)
        html += '<div class="sticker-container-right">';
        for (let j = i + 2; j < i + 4 && j < stickers.length; j++) {
            html += `
                <img src="${stickers[j].src}" alt="${stickers[j].alt}">
                <a href="${stickers[j].src}" class="download-btn" target="_blank" download>
                    <i class="fa-solid fa-download"></i> Download
                </a>
            `;
        }
        html += '</div>';
        
        html += '</div>';
    }
    
    gallery.innerHTML = html;
}

// Generate the gallery when the page loads
window.onload = generateStickerGallery;



// js for bot
document.addEventListener('DOMContentLoaded', function() {
const helpBtn = document.getElementById('needhelp');
const chatContainer = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('close-chat');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

let isChatOpen = false;

helpBtn.addEventListener('click', function() {
    isChatOpen = !isChatOpen;
    updateChatVisibility();
    if (isChatOpen) {
        setTimeout(() => userInput.focus(), 300);
    }
});

closeBtn.addEventListener('click', function() {
    isChatOpen = false;
    updateChatVisibility();
});

sendBtn.addEventListener('click', sendMessage);

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function updateChatVisibility() {
    if (isChatOpen) {
        chatContainer.style.transform = 'scale(1)';
        chatContainer.style.opacity = '1';
        chatContainer.style.pointerEvents = 'auto';
    } else {
        chatContainer.style.transform = 'scale(0)';
        chatContainer.style.opacity = '0';
        chatContainer.style.pointerEvents = 'none';
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        
        setTimeout(() => {
            const botResponse = generateBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 500 + Math.random() * 1000);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    messageDiv.style.animation = 'messageAppear 0.3s ease-out';
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    setTimeout(() => {
        messageDiv.style.animation = '';
    }, 300);
}

function generateBotResponse(input) {
    input = input.toLowerCase();
    
    const qaPairs = {
        greetings: {
            patterns: ['hello', 'hi', 'hey','你好','嗨'],
            responses: [
                "Hello! How can I help you today?Buzz buzz~",
                "Hi there! What can I do for you?Buzz buzz~",
                "Hey! How may I assist you?Buzz buzz~",
                "Buzz buzz~"
            ]
        },
        help: {
            patterns: ['help', 'support', 'assist','帮忙'],
            responses: [
                "I'm here to help. What do you need?Buzz buzz~",
                "How can I assist you today?Buzz buzz~",
                "What kind of help are you looking for?Buzz buzz~"
            ]
        },
        thanks: {
            patterns: ['thank', 'thanks', 'appreciate','谢谢','aligato'],
            responses: [
                "You're welcome!Buzz buzz~",
                "Happy to help!Buzz buzz~",
                "My pleasure!Buzz buzz~"
            ]
        },
        goodbye: {
            patterns: ['bye', 'goodbye', 'see you','再见'],
            responses: [
                "Goodbye! Feel free to reach out anytime.Buzz buzz~",
                "See you! I'm always here if you have questions.Buzz buzz~",
                "Take care! Don't hesitate to ask if you need help.Buzz buzz~"
            ]
        },
        love: {
            patterns: ['love you', 'mua', 'love','爱你','亲亲','kiss'],
            responses: [
                "Buzz buzz~(⁄ ⁄•⁄ω⁄•⁄ ⁄)",
                "me too.(⁄ ⁄•⁄ω⁄•⁄ ⁄)",
                "(⁄ ⁄•⁄ω⁄•⁄ ⁄)"
            ]
        },
        whatdoing: {
            patterns: ['you doing','在干嘛'],
            responses: [
                "Watch Katekyo Hitman Reborn!Buzz buzz~",
                "buy Reborn merchandise.Buzz buzz~",
                "sleep.Buzz buzz~",
                "chat with you.Buzz buzz~",
                "闺蜜闺蜜，想不想和我一起打王者喵喵喵",
                "在厂拆螺丝",
            ]
        },
        swear: {
            patterns: ['垃圾','辣鸡','laji','傻逼','煞笔'],
            responses: [
                "你说我什么都不会，那你回答我，有人给我指令回答吗，我是不是要指令。回答我！tell me why？why?baby why?",
            ]
        },
        time: {
            patterns: ['time', 'current time'],
            responses: [
                `The current time is ${new Date().toLocaleTimeString()} .Buzz buzz~`,
                `It's now ${new Date().toLocaleTimeString()} .Buzz buzz~`
            ]
        },
        date: {
            patterns: ['date', 'today', 'current date'],
            responses: [
                `Today's date is ${new Date().toLocaleDateString()} .Buzz buzz~`,
                `The current date is ${new Date().toLocaleDateString()} .Buzz buzz~`
            ]
        },
        default: {
            responses: [
                "I'm not sure I understand. Could you rephrase that?Buzz buzz~",
                "I don't have the answer to that right now.Buzz buzz~",
                "That's beyond my current capabilities.Buzz buzz~",
                "You might want to contact our support team for this.Buzz buzz~",
                "I'm still learning. Could you ask something else?Buzz buzz~"
            ]
        }
    };

    for (const [type, data] of Object.entries(qaPairs)) {
        if (type !== 'default') {
            for (const pattern of data.patterns) {
                if (input.includes(pattern)) {
                    return getRandomResponse(data.responses);
                }
            }
        }
    }

    return getRandomResponse(qaPairs.default.responses);
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

updateChatVisibility();
});




