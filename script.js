window.onload = () => {

    let progress = 0;
    let musicStarted = false; 
    let progressFill =
        document.getElementById("progressFill");

    let progressText =
        document.getElementById("progressText");

    let dino =
        document.getElementById("dino");

    const mascot1 = document.getElementById("mascot");
    const mascot2 = document.getElementById("mascot2");
    const callout = document.getElementById("dinoCallout");
    const mainContent = document.getElementById("mainContent");
    const welcomeCard = document.getElementById("welcomeCard");

    // 🟦 INITIAL STATE
    callout.classList.add("hidden");
    mainContent.classList.add("hidden");
    welcomeCard.style.display = "block";

    mascot1.classList.remove("hidden");
    mascot2.classList.remove("hidden");

    let loadingInterval = setInterval(() => {

    progress++;

    // 🛡 SAFE DOM UPDATES
    if (progressFill) {
        progressFill.style.width = progress + "%";
    }

    if (progressText) {
        progressText.innerHTML = progress + "%";
    }

    if (dino && dino.isConnected) {
        dino.style.left = progress + "%";
    }

    // 🧠 DEBUG (temporary)
    console.log("loading:", progress);

    if (progress >= 100) {

        clearInterval(loadingInterval);
        
        // 👑 RETURNING USER INTERCEPTOR FLOW
    const savedProgress = localStorage.getItem("learnerProgress");
    if (savedProgress) {
        try {
            const learner = JSON.parse(savedProgress);
            if (learner && learner.name) {
                const nameInput = document.getElementById("learnerName");
                const startBtn = document.getElementById("startBtn");
                const savedMessage = document.getElementById("savedMessage");

                if (nameInput && startBtn) {
                    // Populate the saved player identity cleanly
                    nameInput.value = learner.name;
                    
                    // Explicitly lock the text box layer down
                    nameInput.disabled = true;
                    nameInput.setAttribute("disabled", "true");
                    
                    // Visual lock indicator styling properties
                    nameInput.style.backgroundColor = "#e1e8ed"; 
                    nameInput.style.color = "#777";
                    nameInput.style.cursor = "not-allowed";
                    nameInput.style.borderColor = "#ccc";

                    // Update button typography indicator instructions
                    startBtn.textContent = "Continue Journey";
                    
                }
            }
        } catch (e) {
            console.error("Error reading saved profile sequence data:", e);
        }
    } 

        setTimeout(() => {

            const loadingSection =
                document.getElementById("loadingSection");

            // 🔥 IMPORTANT: stop animation FIRST before DOM changes
            progress = 999;

            if (loadingSection) {
                loadingSection.style.display = "none";
            }

            welcomeCard.style.display = "none";

            mascot1.classList.add("hidden");
            mascot2.classList.add("hidden");

            callout.classList.remove("hidden");

            let calloutText =
                document.getElementById("calloutText");

            let savedName =
                localStorage.getItem("learnerName");

            let message = savedName
                ? "Welcome back, " + savedName + "! Get ready to continue your epic quest where every number holds a secret and every equation is a puzzle waiting to be solved!"
                : "Welcome Dino Adventurer! 🚀 Gear up to sharpen your number skills, conquer number mazes, and level up your multiplication fluency. As you embark on this ICT-Integrated Multiplication Drill, the whole gang will join and guide you all throughout! Let's go and start the adventure!";
            
            typeWriter(calloutText, message, 35);
            
            setTimeout(() => {

                callout.classList.add("hidden");

                welcomeCard.style.display = "block";

                mascot1.classList.remove("hidden");
                mascot2.classList.remove("hidden");

                mainContent.classList.remove("hidden");

            }, 12500);

        }, 300);
    }

}, 30);

document.addEventListener("DOMContentLoaded", () => {
    // 1. Check if a learner profile already exists in local storage
    const savedProgress = localStorage.getItem("learnerProgress");
    
    if (savedProgress) {
        try {
            const learner = JSON.parse(savedProgress);
            
            // Check if the profile contains a valid name string
            if (learner && learner.name) {
                const nameInput = document.getElementById("learnerName");
                const startBtn = document.getElementById("startBtn");
                const savedMessage = document.getElementById("savedMessage");

                if (nameInput && startBtn) {
                    // Populate and lock the name field
                    nameInput.value = learner.name;
                    nameInput.disabled = true;
                    nameInput.style.backgroundColor = "#e1e8ed"; /* Soft grey lock styling */
                    nameInput.style.cursor = "not-allowed";

                    // Update button message for a returning learner
                    startBtn.textContent = "Continue Journey";

                }
            }
        } catch (error) {
            console.error("Error parsing saved profile data:", error);
        }
    }
});

// FIX: Attach interactive sound listeners directly onto parent DOM structures
    window.addEventListener('DOMContentLoaded', () => {
        // Find main container grids and map explicit triggers
        const triggerZones = [document.body, document.querySelector('.dashboard-container')];
        triggerZones.forEach(zone => {
            if(zone) {
                zone.addEventListener('pointerdown', startBackgroundMusic, { passive: true });
                zone.addEventListener('click', startBackgroundMusic, { passive: true });
            }
        });
    });

    // Dedicated fallback checker
    document.addEventListener('click', startBackgroundMusic, true);

    function startBackgroundMusic() {
        if (musicStarted) return;
        
        const audio = document.getElementById("bgMusic");
        if (!audio) return;

        audio.volume = 0.15; 
        
        audio.play()
            .then(() => {
                musicStarted = true;
                console.log("Dashboard music started successfully!");
                // Cleanup clean lines
                window.removeEventListener('pointerdown', startBackgroundMusic);
                window.removeEventListener('click', startBackgroundMusic);
                document.removeEventListener('click', startBackgroundMusic, true);
            })
            .catch(error => {
                // If it fails silently, we attempt to unblock the channel stream
                console.log("Audio waiting for a deeper gesture interaction.", error);
            });
    }

function typeWriter(element, text, speed = 40) {
    element.innerHTML = "";
    let i = 0;

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

    // ✅ START BUTTON MUST BE OUTSIDE EVERYTHING
    document.getElementById("startBtn").addEventListener("click", () => {
    const nameInput = document.getElementById("learnerName");
    const enteredName = nameInput.value.trim();

    if (!enteredName) {
        alert("Please enter a name to start your adventure!");
        return;
    }

    // If there isn't progress stored yet, initialize a brand new learner save template
    if (!localStorage.getItem("learnerProgress")) {
        const newLearnerProfile = {
            name: enteredName,
            completedDrills: {
                Emerging: { groups: false, arrays: false, multiples: false, jumps: false },
                Developing: { groups: false, arrays: false, multiples: false, jumps: false },
                Connecting: { groups: false, arrays: false, multiples: false, jumps: false },
                Benchmarking: { groups: false, arrays: false, multiples: false, jumps: false },
                Advancing: { groups: false, arrays: false, multiples: false, jumps: false }
            }
        };
        localStorage.setItem("learnerProgress", JSON.stringify(newLearnerProfile));
    }

    // Cleanly transition screens or route straight to your drill interface dashboard
    window.location.href = "dashboard.html"; 
});

};