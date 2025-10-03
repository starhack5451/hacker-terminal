document.addEventListener('DOMContentLoaded', function () {
    const mainTerminal = document.getElementById('main-terminal');
    const scrollingCodeContainer = document.getElementById('scrolling-code');
    const passwordCracking = document.getElementById('password-cracking');

    // Start all visual effects and the terminal sequence
    initTerminal(mainTerminal, passwordCracking);
    scrollCode(scrollingCodeContainer);
    // displayNetworkGraph function remains a placeholder as it requires complex drawing logic.
});

// ====================================
// 1. Terminal Typing Simulation
// ====================================
function initTerminal(terminalElement, crackingElement) {
    const initialText = [
        "INITIALIZING CORE HACKER PROTOCOL...",
        "STATUS: OK",
        "CONNECTING TO TARGET HOST: 216.58.192.142...",
        "ENCRYPTION KEY REQUIRED...",
        "RUNNING HASH-CRACKER ALGORITHM (SHA-256)...",
        "" // Final empty line for cursor to appear on
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let terminalOutput = document.createElement('div');
    terminalElement.appendChild(terminalOutput);

    function typeLine() {
        if (lineIndex < initialText.length) {
            const currentLine = initialText[lineIndex];
            if (charIndex < currentLine.length) {
                // Type character and maintain blinking cursor
                terminalOutput.innerHTML = terminalOutput.innerHTML.slice(0, -1) + currentLine.charAt(charIndex) + '<span class="blinking-cursor">_</span>';
                charIndex++;
                // Randomize speed for a more natural typing effect
                setTimeout(typeLine, Math.random() * 50 + 20);
            } else {
                // Line finished. Remove blinking cursor and move to next line
                terminalOutput.innerHTML = terminalOutput.innerHTML.slice(0, -1) + currentLine + "<br>";
                
                // Create new line container for the next line of text
                terminalOutput = document.createElement('div');
                terminalElement.appendChild(terminalOutput);
                
                lineIndex++;
                charIndex = 0;
                
                // Wait longer between lines
                setTimeout(typeLine, 500); 
            }
        } else {
            // Once all initial text is done, start the password cracking simulation
            startHackingSimulation(crackingElement);
        }
    }

    typeLine();
}

// ====================================
// 2. Scrolling Code Background
// ====================================
function scrollCode(container) {
    const codeCharacters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()'; // Mix of binary and symbols
    const codeLength = 5000; 
    let codeContent = '';
    
    // Generate long string of random code
    for (let i = 0; i < codeLength; i++) {
        codeContent += codeCharacters.charAt(Math.floor(Math.random() * codeCharacters.length)) + ' ';
    }
    container.textContent = codeContent;

    function animateScroll() {
        // Slowly scroll the code up
        container.scrollTop += 1;
        
        // Reset scroll when it reaches the end to create an infinite loop
        if (container.scrollTop >= container.scrollHeight - container.clientHeight) {
            container.scrollTop = 0;
        }
        requestAnimationFrame(animateScroll);
    }
    
    animateScroll();
}

// ====================================
// 3. Password Cracking Simulation
// ====================================
function startHackingSimulation(element) {
    element.classList.remove('hidden');
    element.innerHTML = `
        <div>[ TASK: DECRYPTING PASSWORD HASH ]</div>
        <div>[ STATUS: <span id="progress-percent">0</span>% ]</div>
        <div>[ HASH: <span id="cracking-key"></span> ]</div>
    `;
    
    const progressPercent = document.getElementById('progress-percent');
    const crackingKey = document.getElementById('cracking-key');
    let progress = 0;

    function updateCracking() {
        if (progress < 100) {
            // Animate progress
            progress = Math.min(100, progress + Math.floor(Math.random() * 3) + 1); // Random incremental progress
            progressPercent.textContent = progress;
            
            // Generate a random 64-character hash sequence
            crackingKey.textContent = Array.from({ length: 64 }, () => 
                'abcdef0123456789'.charAt(Math.floor(Math.random() * 16))
            ).join('');
            
            setTimeout(updateCracking, 100);
        } else {
            // Success message
            element.innerHTML = `
                <div>[ ACCESS GRANTED ]</div>
                <div style="color: yellow; margin-top: 5px;">PASSWORD: YIPPEE-KI-YAY-GEMINI</div>
            `;
        }
    }

    updateCracking();
}