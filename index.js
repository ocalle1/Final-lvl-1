
const readline = require("readline-sync");
const playerName = readline.question("What is your name? ");
console.log(`Welcome, ${playerName}, to the jungle, we got fun and games.`);

//press start
const start = readline.keyIn(`${playerName} please press 1 to start`, { limit: '$<1>' });
let pressStart = false;
if (start == 1) {
    console.log("\n You're standing in the middle of the Amazon forest.");
    pressStart = true;
}

//set variables
const enemies = ['Midget', 'Shrek', 'Giga'];
const treasure = ['Monster Energy drink', 'Burrito', 'AK 47'];
let inventory = [];
let userHealth = 100;
let killNum = 0;

function hungerGames() {
    // The while loop allows a code to be executed repeatedly depending on the given boolean conditions.
    while (pressStart == true && userHealth > 0) {

        // Assigned Variables
        const attackPower = Math.floor(Math.random() * (30 + 15 - 3) + 15);
        let enemyHealth = Math.floor(Math.random() * 100);
        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        const enemyPower = Math.floor(Math.random() * (20 + 20 - 2) + 12);
        let pickUp = treasure[Math.floor(Math.random() * treasure.length)];//Math.floor - gives largest less than integer - 5.95 = 5 or 5.05 = 5;
       

        //Action option
        const perform = readline.keyIn("What would you like to do? \nPress 'w' to walk. \nPress 'p' to print stats. \nPress 'x' to quit the game.", { limit: '$<w, p, x>' });

        //game mechanics

        if (perform == 'x') {
            console.log(` \n ~~${playerName}'s Stats~~  \nHealth: ${userHealth} \nKills: ${killNum} \nItems: ${inventory}`);
            return (userHealth = 0);
        }
        else if (perform == 'p') {
            console.log(` \nName: ${playerName} \nHealth ${userHealth} \nKills: ${killNum} \nItems: ${inventory}`);
        }
        else if (perform == 'w') {
            let randomize = Math.random();
            if (randomize >= 0.50) {
                console.log("you're walking in the jungle.");
            }
            else if (randomize <= 0.50) {
                console.log(`\nnooooo! A ${enemy} just appeared`);
                while (userHealth > 0 && enemyHealth > 0) {
                    const actions = readline.keyIn("What would you like to do? \nPress 'r' to run away. \nPress 'a' to attack.", { limit: '<r, a>' });
                    if (actions == 'r') {
                        const run = Math.random();
                        if (run <= 0.50) {
                            console.log(`\nYou couldn't get away! The ${enemy} attacks you for ${enemyPower} damage!`);
                            userHealth -= enemyPower;
                            if (userHealth <= 0) {
                                console.log(`The ${enemy} has slain you! ${playerName} is dead!`);
                                console.log(`\n~~ ${playerName}'s Final Stats ~~ \nName: ${playerName} \nHealth: ${userHealth} \nKills: ${killNum} \nItems:${inventory} \n`);
                                break;
                            }
                        }
                        else if (run >= 0.50) {
                            console.log("\nYou got away!")
                            break;
                        }
                    }
                    else if (actions == 'a') {
                        enemyHealth -= attackPower;
                        console.log(` \nYou attacked the ${enemy} for ${attackPower} damage!`);
                        userHealth -= enemyPower;
                        console.log(`The ${enemy} attacked you for ${enemyPower} damage!`);
                        if (enemyHealth <= 0) {
                            console.log(`You successfully killed the ${enemy}!`);
                            killNum += 1;
                            let dropLoot = Math.random();
                            if (dropLoot <= 0.25) {
                                console.log(`You found a ${pickUp} on the dead ${enemy}!`);
                                inventory.push(" " + pickUp);
                            }
                        }
                        if (userHealth <= 0) {
                            console.log(`The ${enemy} has slain you! ${playerName} is dead!`);
                            console.log(`\n~~ ${playerName}'s Final Stats ~~ \nName: ${playerName} \nHealth: ${userHealth} \nKills: ${killNum} \nItems:${inventory} \n`);
                            break;
                        }
                    }
                }



            }
        }
    }
}
hungerGames();