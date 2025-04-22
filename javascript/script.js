window.onload = function() {
    const blocks = document.querySelectorAll(".animatedDiv");
    const winner = document.querySelector("#Winner");
    const update = document.querySelector("#update");
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

        //Update the HTML with the number of resets
        update.innerHTML = `Update News: ${blockId} has been reset ${resetCounters[blockId]} times`;
        //5 laps completed
        if (resetCounters[blockId]===5) {
            // Pause the animations for all vehicles
            blocks.forEach(block => {
                block.style.animationPlayState ="paused";
            });

            //get the winner id
            const winnerId = block.id;
            //Announce the winner
            winner.innerHTML = `Winner is: ${winnerId}`;
        }

    }

    //Set random duration for all blocks
    let i = 0;
    while (i <blocks.length) {
        const block =blocks[i];
        setRandomDuration(block);
        block.addEventListener("animationiteration",() => setRandomDuration(block));
        i++;
    }
}