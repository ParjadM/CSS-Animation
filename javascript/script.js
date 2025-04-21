window.onload = function() {
    const blocks = document.querySelectorAll(".animatedDiv");
    const winner = document.querySelector("#Winner");
    const resetCounters = {
        "car-1": 0,
        "car-2": 0,
        "car-3": 0,
        "car-4": 0,
        "car-5": 0
    };

    function setRandomDuration(block) {
        //Random duration between 1s and 6s
        const randomDuration = Math.random() * 5 + 1; 
        //Reset animation
        block.style.animation = "none"; 
        //Trigger reflow to restart the animation
        void block.offsetWidth; 
        block.style.animation = `mymove ${randomDuration}s linear infinite`;


        const blockId = block.id;
        resetCounters[blockId]++; 
        block.innerHTML = randomDuration.toFixed(2);

        //console.log to see the number of resets
        console.log(`Block ${blockId} has been reset ${resetCounters[blockId]} times`);

        if (resetCounters[blockId] === 5) {
            // Pause the animations
            blocks.forEach(block => {
                block.style.animationPlayState = "paused";
            });

            // Announce the winner
            const winnerColor = block.style.backgroundColor; 
            winner.innerHTML = `Winner is the car with color: ${winnerColor}`;
            winner.style.color = winnerColor; 
        }

    }

    //Set random duration for all blocks
    let i = 0;
    while (i < blocks.length) {
        const block = blocks[i];
        setRandomDuration(block);
        block.addEventListener("animationiteration", () => setRandomDuration(block));
        i++;
    }
}