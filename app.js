let strike_button = document.getElementById("strike");
let reset_button = document.getElementById("reset");

let score_ind = document.getElementById("score-ind");
let score_pak = document.getElementById("score-pak");

let wickets_ind = document.getElementById("wickets-ind");
let wickets_pak = document.getElementById("wickets-pak");

let team1_score = 0;
let team2_score = 0;
let team1_wicket = 0;
let team2_wicket = 0;

let team = 1;
let team1_balls_faced = 0;
let team2_balls_faced = 0;

let possible_outcomes = [0, 1, 2, 3, 4, 6, 'W'];

let game_over_audio = new Audio("http://bit.ly/so-crowd-cheer");
let strike_audio = new Audio("http://bit.ly/so-ball-hit");

function game_over() {
    game_over_audio.play();
    switch (true) {
        case team1_score > team2_score:
            alert("Team INDIA Wins");
            break;
        case team1_score < team2_score:
            alert("Team Pak Wins");
            break;
        default:
            alert("It is another SuperOver");
    }
}

function update_scores() {
    score_ind.textContent = team1_score;
    score_pak.textContent = team2_score;

    wickets_ind.textContent = team1_wicket;
    wickets_pak.textContent = team2_wicket;
}

reset_button.onclick = () => {
    window.location.reload();
};

strike_button.addEventListener("click", () => {
    strike_audio.pause();
    strike_audio.currentTime = 0;
    strike_audio.play();

    let random_num = possible_outcomes[Math.floor(Math.random() * possible_outcomes.length)];
    console.log(random_num);

    if (team == 2) {
        team2_balls_faced++;
        document.querySelector(`#pak :nth-child(${team2_balls_faced})`).textContent = random_num;

        if (random_num == "W") {
            team2_wicket++;
            update_scores();
        } else {
            team2_score += random_num;
            update_scores();
        }
        if ((team2_wicket == 2) || (team2_balls_faced == 6) || (team2_score > team1_score)) {
            team = 3;
            game_over();
        }
    } else if (team == 1) {
        team1_balls_faced++;
        document.querySelector(`#ind :nth-child(${team1_balls_faced})`).textContent = random_num;

        if (random_num == "W") {
            team1_wicket++;
        } else {
            team1_score += random_num;
        }
        update_scores();
        if ((team1_wicket == 2) || (team1_balls_faced == 6)) {
            team = 2;
        }
    }
});
