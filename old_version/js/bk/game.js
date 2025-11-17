openModal('myModal1');

//textspeech(1,'');
/*
function textspeech(val, text) {

    //var pauseResumeButton = document.getElementById('pause-resume-button');
    var skipButtonIntro = document.getElementById('skip-button-intro');
    var skipButtonPop = document.getElementById('skip-button-pop');
    var skipButtonQuest = document.getElementById('skip-button-quest');
    var synthesis = window.speechSynthesis;
    var utterance;

    var speech = '';
    if (val == 0)
        synthesis.cancel();
    else if (val == 1) {        
        speech = "Hi There, Welcome to Snake and Ladder Game. Please Enter Player Names. There are nearly 3,000 species of snakes distributed across the globe. These fascinating reptiles come in a wide array of shapes, sizes, and behaviors." +
            "Let us explore some of the major general and species of snakes over the Snake and Ladder Game. All the Best !!!";

            speech = 'नमस्ते, सांप और सीढ़ी खेल में आपका स्वागत है। कृपया खिलाड़ी के नाम दर्ज करें। दुनिया भर में सांपों की लगभग 3,000 प्रजातियां वितरित की जाती हैं। ये आकर्षक सरीसृप आकार, आकार और व्यवहार की एक विस्तृत श्रृंखला में आते हैं। आइए हम सांप और सीढ़ी के खेल पर सांपों के कुछ प्रमुख सामान्य और प्रजातियों का पता लगाएं। शुभकामनाएँ!!!';
    }
    else if (val == 2) {
        speech = text;
    }

    //pauseResumeButton.style.display = 'inline-block';
    skipButtonIntro.style.display = 'inline-block';
    skipButtonPop.style.display = 'inline-block';
    skipButtonQuest.style.display = 'inline-block';

    if ('speechSynthesis' in window) {
        synthesis = window.speechSynthesis;
        utterance = new SpeechSynthesisUtterance(speech);
        utterance.lang = 'hi-IN'; // Set language to Hindi (India)
        synthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support speech synthesis.");
    }

    /*pauseResumeButton.addEventListener('click', () => {
        if (synthesis.paused) {
            synthesis.resume();
            pauseResumeButton.textContent = 'Pause';
        } else {
            synthesis.pause();
            pauseResumeButton.textContent = 'Resume';
        }
    });*/

 /*   skipButtonIntro.addEventListener('click', () => {
        synthesis.cancel();
    });
    skipButtonPop.addEventListener('click', () => {
        synthesis.cancel();
    });
    skipButtonQuest.addEventListener('click', () => {
        synthesis.cancel();
    });
}*/

var modcnt = 0;
var player1 = '';
var player2 = '';
function getplayernames() {
    //textspeech(0);
    player1 = document.getElementById('player1').value;
    player2 = document.getElementById('player2').value;

    /*document.getElementById('play1').innerText = "P1: " + player1;
    document.getElementById('play2').innerText = "P2: " + player2;*/

    if (player1 == '' || player2 == '') {
        alert("Please enter both the Player Names");
        window.location.reload();
    }

    if (modcnt < 1) {
        document.getElementById('tog1').innerText = player1 + "'s Turn";
        modcnt++;
        closeModal('myModal1');
    }
}

let diceSound = new Audio('sound/rpg-dice-rolling-95182.mp3')
let winSound = new Audio('sound/win.mp3')
let s1sound = new Audio('sound/open-hat-snake-100639.mp3')
let s2sound = new Audio('sound/kingcobra.mp3')
let ladderup = new Audio('sound/ladderup.mp3')
let levelup = new Audio('sound/levelup.mp3')
let leveldown = new Audio('sound/leveldown.mp3')

tog = 0;
p1sum = 0;
p2sum = 0;
bite1_98 = 0;
bite1_95 = 0;
bite2_98 = 0;
bite2_95 = 0;

function play(player, psum, correction, num) {
    let sum
    if (psum == 'p1sum') {

        p1sum = p1sum + num

        if (p1sum > 100) {
            p1sum = p1sum - num
        }

        if (p1sum == 6) {
            p1sum = 25;
            ladderup.play();
        }
        else if (p1sum == 18) {
            p1sum = 38;
            ladderup.play();
        }
        else if (p1sum == 29) {
            p1sum = 50;
            ladderup.play();
        }
        else if (p1sum == 58) {
            p1sum = 82;
            ladderup.play();
        }
        else if (p1sum == 70) {
            p1sum = 91;
            ladderup.play();
        }/*****/
        else if (p1sum == 98) {

            if (bite1_98 == 0 || bite1_98 == 1) {
                bite1_98++;
                p1sum = 64
                s1sound.play()
                document.getElementById('myheader').innerText = "Snake species - Saw Scaled Viper";
                document.getElementById('mylabel').innerText = player1 + " - You have been biten by Saw Scaled Viper. This snake's head is distinctively larger than the neck with the top of the head showing a characteristic arrow-head mark, with brown, brick-red or grey zig-zag patterns on the ventral surface of the body. Mostly seen in dry, sandy or rocky terrain. Widely distributed across mainland India.";
                //textspeech(2,player1 + " - You have been biten by Saw Scaled Viper. This snake's head is distinctively larger than the neck with the top of the head showing a characteristic arrow-head mark, with brown, brick-red or grey zig-zag patterns on the ventral surface of the body. Mostly seen in dry, sandy or rocky terrain. Widely distributed across mainland India.");
                document.getElementById('mys1').src = "bg/snakes/98.jpg";
                document.getElementById('myd1').src = "bg/snakes/98n.jpg";
                document.getElementById('mys2').src = "";
                document.getElementById('myd2').src = "";
                openModal('myModal')
                currentDiv(1)
                questcnt = 1;
                document.getElementById('quesp').innerText = "You have slided down from 98 to 64 position, You have got a chance to climb up by giving right answer.";
            }
        }
        else if (p1sum == 95) {

            if (bite1_95 == 0 || bite1_95 == 1) {
                bite1_95++;
                p1sum = 37
                s1sound.play()
                document.getElementById('myheader').innerText = "Snake species - Russels viper";
                document.getElementById('mylabel').innerText = player1 + " - You have been biten by Russels viper. This snake is widely distributed through the Indian mainland and is arguably the major cause of incidence and mortality related to snakebite envenoming in India. They show patterns of three longitudinal rows of spots usually black or brown in colour along the length of the dorsal aspect. Fields, grassy areas, and forest edges are their preferred habitat.";
                //textspeech(2,player1 + " - You have been biten by Russels viper. This snake is widely distributed through the Indian mainland and is arguably the major cause of incidence and mortality related to snakebite envenoming in India. They show patterns of three longitudinal rows of spots usually black or brown in colour along the length of the dorsal aspect. Fields, grassy areas, and forest edges are their preferred habitat.");
                document.getElementById('mys1').src = "bg/snakes/95a.jpg";
                document.getElementById('myd1').src = "bg/snakes/95an.jpg";
                document.getElementById('mys2').src = "bg/snakes/95b.jpg";
                document.getElementById('myd2').src = "bg/snakes/95bn.jpg";
                openModal('myModal')
                currentDiv(1)
                questcnt = 2;
                document.getElementById('quesp').innerText = "You have slided down from 95-37, You have got a chance to climb up by giving right answer.";
            }
        }
        else if (p1sum == 88) {
            p1sum = 17
            s2sound.play()
            document.getElementById('myheader').innerText = "Snake species - King Cobra";
            document.getElementById('mylabel').innerText = player1 + " - You have been biten by King Cobra. Ophiophagus hannah, the King Cobra is the longest snake from among the venomous species. Adults could have a length of up to 4-5 metres (13-16 feet). King cobras are the only species of snakes that build nests to hatch their eggs.";
            //textspeech(2,player1 + " - You have been biten by King Cobra. Ophiophagus hannah, the King Cobra is the longest snake from among the venomous species. Adults could have a length of up to 4-5 metres (13-16 feet). King cobras are the only species of snakes that build nests to hatch their eggs.");
            document.getElementById('mys1').src = "bg/snakes/88.jpg";
            document.getElementById('myd1').src = "bg/snakes/88n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 3;
            document.getElementById('quesp').innerText = "You have slided down from 88-17, You have got a chance to climb up by giving right answer.";
        }
        else if (p1sum == 79) {
            p1sum = 36
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Common Indian Cobra";
            document.getElementById("mylabel").innerText = player1 + " - You have been biten by Indian Cobra. Cobras usually hood when threatened or agitated. The most commonly distributed species have the characteristic spectacle marking on the hood which allows for easy identification. Cobras are widely distributed throughout the Indian mainland.";
            //textspeech(2,player1 + " - You have been biten by Indian Cobra. Cobras usually hood when threatened or agitated. The most commonly distributed species have the characteristic spectacle marking on the hood which allows for easy identification. Cobras are widely distributed throughout the Indian mainland.");
            document.getElementById('mys1').src = "bg/snakes/79.jpg";
            document.getElementById('myd1').src = "bg/snakes/79n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 4;
            document.getElementById('quesp').innerText = "You have slided down from 79-36, You have got a chance to climb up by giving right answer.";
        }
        else if (p1sum == 68) {
            p1sum = 30
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Krait";
            document.getElementById("mylabel").innerText = player1 + " - You have been biten by Krait. There are many species of kraits distributed across the country. Kraits show characteristic thin striated twin markings white across its length. Kraits have the most potent venom from among the venomous species seen in India.";
            //textspeech(2,player1 + " - You have been biten by Krait. There are many species of kraits distributed across the country. Kraits show characteristic thin striated twin markings white across its length. Kraits have the most potent venom from among the venomous species seen in India.");
            document.getElementById('mys1').src = "bg/snakes/68.jpg";
            document.getElementById('myd1').src = "bg/snakes/68n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 5;
            document.getElementById('quesp').innerText = "You have slided down from 68-30, You have got a chance to climb up by giving right answer.";
        }
        else if (p1sum == 42) {
            p1sum = 21
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Hump Nosed Pit Viper";
            document.getElementById("mylabel").innerText = player1 + " - You have been biten by Hump Nosed Pit Viper. They are typically distributed in the Western Ghats in the states of Kerala and Karnataka. The hump-nose alludes to the snout of the snake giving it a distinct appearance. It is a common cause of envenoming with occasional mortality. The commonly seen variant is yellowish-red in colour with black or brown spots interspersed.";
            //textspeech(2,player1 + " - You have been biten by Hump Nosed Pit Viper. They are typically distributed in the Western Ghats in the states of Kerala and Karnataka. The hump-nose alludes to the snout of the snake giving it a distinct appearance. It is a common cause of envenoming with occasional mortality. The commonly seen variant is yellowish-red in colour with black or brown spots interspersed.");
            document.getElementById('mys1').src = "bg/snakes/42a.jpg";
            document.getElementById('myd1').src = "bg/snakes/42an.jpg";
            document.getElementById('mys2').src = "bg/snakes/42b.jpg";
            document.getElementById('myd2').src = "bg/snakes/42bn.jpg";
            openModal('myModal')
            currentDiv(1)
            questcnt = 6;
            document.getElementById('quesp').innerText = "You have slided down from 42-21, You have got a chance to climb up by giving right answer.";
        }
        else if (p1sum == 20) {
            p1sum = 5
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Malabar Pit Viper";
            document.getElementById("mylabel").innerText = player1 + " - You have been biten by Malabar Pit Viper. It is a small snake commonly seen in the Western Ghats of Kerala, Goa and Karnataka. The eponymous name comes from the pit seen in all pit viper species between the eyes and the nostril. Pits in pit viper species are heat sensitive organs which help identify both threat and prey. The species is seen in different morphs of green, yellow, brown, with scattered markings.";
            //textspeech(2,player1 + " - You have been biten by Malabar Pit Viper. It is a small snake commonly seen in the Western Ghats of Kerala, Goa and Karnataka. The eponymous name comes from the pit seen in all pit viper species between the eyes and the nostril. Pits in pit viper species are heat sensitive organs which help identify both threat and prey. The species is seen in different morphs of green, yellow, brown, with scattered markings.");
            document.getElementById('mys1').src = "bg/snakes/20a.jpg";
            document.getElementById('myd1').src = "bg/snakes/20an.jpg";
            document.getElementById('mys2').src = "bg/snakes/20b.jpg";
            document.getElementById('myd2').src = "bg/snakes/20bn.jpg";
            openModal('myModal')
            currentDiv(1)
            questcnt = 7;
            document.getElementById('quesp').innerText = "You have slided down from 20-5, You have got a chance to climb up by giving right answer.";
        }
        else if (p1sum == 15) {
            p1sum = 10
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Sea Snake";
            document.getElementById("mylabel").innerText = player1 + " - You have been biten by Sea Snake. All sea snakes are venomous and are identified from the characteristic paddle like flattened tails which helps the snake navigate and swim. Sea-snakes have very potent venom with a not very effective delivery mechanism.";
            //textspeech(2,player1 + " - You have been biten by Sea Snake. All sea snakes are venomous and are identified from the characteristic paddle like flattened tails which helps the snake navigate and swim. Sea-snakes have very potent venom with a not very effective delivery mechanism.");
            document.getElementById('mys1').src = "bg/snakes/15.jpg";
            document.getElementById('myd1').src = "bg/snakes/15n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 8;
            document.getElementById('quesp').innerText = "You have slided down from 15-10, You have got a chance to climb up by giving right answer.";
        }

        sum = p1sum
    }

    if (psum == 'p2sum') {

        p2sum = p2sum + num

        if (p2sum > 100) {
            p2sum = p2sum - num
        }

        if (p2sum == 6) {
            p2sum = 25;
            ladderup.play();
        }
        else if (p2sum == 18) {
            p2sum = 38;
            ladderup.play();
        }
        else if (p2sum == 29) {
            p2sum = 50;
            ladderup.play();
        }
        else if (p2sum == 58) {
            p2sum = 82;
            ladderup.play();
        }
        else if (p2sum == 70) {
            p2sum = 91;
            ladderup.play();
        }/*****/
        else if (p2sum == 98) {

            if (bite2_98 == 0 || bite2_98 == 1) {
                bite2_98++;
                p2sum = 64
                s1sound.play()
                document.getElementById('myheader').innerText = "Snake species - Saw Scaled Viper";
                document.getElementById('mylabel').innerText = player2 + " - You have been biten by Saw Scaled Viper. This snake's head is distinctively larger than the neck with the top of the head showing a characteristic arrow-head mark, with brown, brick-red or grey zig-zag patterns on the ventral surface of the body. Mostly seen in dry, sandy or rocky terrain. Widely distributed across mainland India.";
                //textspeech(2,player2 + " - You have been biten by Saw Scaled Viper. This snake's head is distinctively larger than the neck with the top of the head showing a characteristic arrow-head mark, with brown, brick-red or grey zig-zag patterns on the ventral surface of the body. Mostly seen in dry, sandy or rocky terrain. Widely distributed across mainland India.");
                document.getElementById('mys1').src = "bg/snakes/98.jpg";
                document.getElementById('myd1').src = "bg/snakes/98n.jpg";
                document.getElementById('mys2').src = "";
                document.getElementById('myd2').src = "";
                openModal('myModal')
                currentDiv(1)
                questcnt = 9;
                document.getElementById('quesp').innerText = "You have slided down from 98-64, You have got a chance to climb up by giving right answer.";
            }
        }
        else if (p2sum == 95) {

            if (bite2_95 == 0 || bite2_95 == 1) {
                bite2_95++;
                p2sum = 37
                s1sound.play()
                document.getElementById('myheader').innerText = "Snake species - Russels viper";
                document.getElementById('mylabel').innerText = player2 + " - You have been biten by Russels viper. This snake is widely distributed through the Indian mainland and is arguably the major cause of incidence and mortality related to snakebite envenoming in India. They show patterns of three longitudinal rows of spots usually black or brown in colour along the length of the dorsal aspect. Fields, grassy areas, and forest edges are their preferred habitat.";
                //textspeech(2,player2 + " - You have been biten by Russels viper. This snake is widely distributed through the Indian mainland and is arguably the major cause of incidence and mortality related to snakebite envenoming in India. They show patterns of three longitudinal rows of spots usually black or brown in colour along the length of the dorsal aspect. Fields, grassy areas, and forest edges are their preferred habitat.");
                document.getElementById('mys1').src = "bg/snakes/95a.jpg";
                document.getElementById('myd1').src = "bg/snakes/95an.jpg";
                document.getElementById('mys2').src = "bg/snakes/95b.jpg";
                document.getElementById('myd2').src = "bg/snakes/95bn.jpg";
                openModal('myModal')
                currentDiv(1)
                questcnt = 10;
                document.getElementById('quesp').innerText = "You have slided down from 95-37, You have got a chance to climb up by giving right answer.";
            }
        }
        else if (p2sum == 88) {
            p2sum = 17
            s2sound.play()
            document.getElementById('myheader').innerText = "Snake species - King Cobra";
            document.getElementById('mylabel').innerText = player2 + " - You have been biten by King Cobra. Ophiophagus hannah, the King Cobra is the longest snake from among the venomous species. Adults could have a length of up to 4-5 metres (13-16 feet). King cobras are the only species of snakes that build nests to hatch their eggs.";
            //textspeech(2,player2 + " - You have been biten by King Cobra. Ophiophagus hannah, the King Cobra is the longest snake from among the venomous species. Adults could have a length of up to 4-5 metres (13-16 feet). King cobras are the only species of snakes that build nests to hatch their eggs.");
            document.getElementById('mys1').src = "bg/snakes/88.jpg";
            document.getElementById('myd1').src = "bg/snakes/88n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 11;
            document.getElementById('quesp').innerText = "You have slided down from 88-17, You have got a chance to climb up by giving right answer.";
        }
        else if (p2sum == 79) {
            p2sum = 36
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Common Indian Cobra";
            document.getElementById("mylabel").innerText = player2 + " - You have been biten by Indian Cobra. Cobras usually hood when threatened or agitated. The most commonly distributed species have the characteristic spectacle marking on the hood which allows for easy identification. Cobras are widely distributed throughout the Indian mainland.";
            //textspeech(2,player2 + " - You have been biten by Indian Cobra. Cobras usually hood when threatened or agitated. The most commonly distributed species have the characteristic spectacle marking on the hood which allows for easy identification. Cobras are widely distributed throughout the Indian mainland.");
            document.getElementById('mys1').src = "bg/snakes/79.jpg";
            document.getElementById('myd1').src = "bg/snakes/79n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 12;
            document.getElementById('quesp').innerText = "You have slided down from 79-36, You have got a chance to climb up by giving right answer.";
        }
        else if (p2sum == 68) {
            p2sum = 30
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Krait";
            document.getElementById("mylabel").innerText = player2 + " - You have been biten by Krait. There are many species of kraits distributed across the country. Kraits show characteristic thin striated twin markings white across its length. Kraits have the most potent venom from among the venomous species seen in India.";
            //textspeech(2,player2 + " - You have been biten by Krait. There are many species of kraits distributed across the country. Kraits show characteristic thin striated twin markings white across its length. Kraits have the most potent venom from among the venomous species seen in India.");
            document.getElementById('mys1').src = "bg/snakes/68.jpg";
            document.getElementById('myd1').src = "bg/snakes/68n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 13;
            document.getElementById('quesp').innerText = "You have slided down from 68-30, You have got a chance to climb up by giving right answer.";
        }
        else if (p2sum == 42) {
            p2sum = 21
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Hump Nosed Pit Viper";
            document.getElementById("mylabel").innerText = player2 + " - You have been biten by Hump Nosed Pit Viper. They are typically distributed in the Western Ghats in the states of Kerala and Karnataka. The hump-nose alludes to the snout of the snake giving it a distinct appearance. It is a common cause of envenoming with occasional mortality. The commonly seen variant is yellowish-red in colour with black or brown spots interspersed.";
            //textspeech(2,player2 + " - You have been biten by Hump Nosed Pit Viper. They are typically distributed in the Western Ghats in the states of Kerala and Karnataka. The hump-nose alludes to the snout of the snake giving it a distinct appearance. It is a common cause of envenoming with occasional mortality. The commonly seen variant is yellowish-red in colour with black or brown spots interspersed.");
            document.getElementById('mys1').src = "bg/snakes/42a.jpg";
            document.getElementById('myd1').src = "bg/snakes/42an.jpg";
            document.getElementById('mys2').src = "bg/snakes/42b.jpg";
            document.getElementById('myd2').src = "bg/snakes/42bn.jpg";
            openModal('myModal')
            currentDiv(1)
            questcnt = 14;
            document.getElementById('quesp').innerText = "You have slided down from 42-21, You have got a chance to climb up by giving right answer.";
        }
        else if (p2sum == 20) {
            p2sum = 5
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Malabar Pit Viper";
            document.getElementById("mylabel").innerText = player2 + " - You have been biten by Malabar Pit Viper. It is a small snake commonly seen in the Western Ghats of Kerala, Goa and Karnataka. The eponymous name comes from the pit seen in all pit viper species between the eyes and the nostril. Pits in pit viper species are heat sensitive organs which help identify both threat and prey. The species is seen in different morphs of green, yellow, brown, with scattered markings.";
            //textspeech(2,player2 + " - You have been biten by Malabar Pit Viper. It is a small snake commonly seen in the Western Ghats of Kerala, Goa and Karnataka. The eponymous name comes from the pit seen in all pit viper species between the eyes and the nostril. Pits in pit viper species are heat sensitive organs which help identify both threat and prey. The species is seen in different morphs of green, yellow, brown, with scattered markings.");
            document.getElementById('mys1').src = "bg/snakes/20a.jpg";
            document.getElementById('myd1').src = "bg/snakes/20an.jpg";
            document.getElementById('mys2').src = "bg/snakes/20b.jpg";
            document.getElementById('myd2').src = "bg/snakes/20bn.jpg";
            openModal('myModal')
            currentDiv(1)
            questcnt = 15;
            document.getElementById('quesp').innerText = "You have slided down from 20-5, You have got a chance to climb up by giving right answer.";
        }
        else if (p2sum == 15) {
            p2sum = 10
            s1sound.play()
            document.getElementById('myheader').innerText = "Snake species - Sea Snake";
            document.getElementById("mylabel").innerText = player2 + " - You have been biten by Sea Snake. All sea snakes are venomous and are identified from the characteristic paddle like flattened tails which helps the snake navigate and swim. Sea-snakes have very potent venom with a not very effective delivery mechanism.";
            //textspeech(2,player2 + " - You have been biten by Sea Snake. All sea snakes are venomous and are identified from the characteristic paddle like flattened tails which helps the snake navigate and swim. Sea-snakes have very potent venom with a not very effective delivery mechanism.");
            document.getElementById('mys1').src = "bg/snakes/15.jpg";
            document.getElementById('myd1').src = "bg/snakes/15n.jpg";
            document.getElementById('mys2').src = "";
            document.getElementById('myd2').src = "";
            openModal('myModal')
            currentDiv(1)
            questcnt = 16;
            document.getElementById('quesp').innerText = "You have slided down from 15-10, You have got a chance to climb up by giving right answer.";
        }

        sum = p2sum
    }

    document.getElementById(`${player}`).style.transition = `linear all .5s`

    if (sum < 10) {

        document.getElementById(`${player}`).style.left = `${(sum - 1) * 80}px`
        document.getElementById(`${player}`).style.top = `${-0 * 73 - correction}px`
    }

    else if (sum == 100) {

        document.getElementById(`${player}`).style.left = `${(1 - 1) * 80}px`

        winSound.play()

        if (player == 'p1') {
            document.getElementById('tog1').innerText = 'WINNER !!!';
            //document.getElementById('play2').hidden = true;
            document.getElementById('tog2').hidden = true;
            //document.getElementById('dnum2').hidden = true;
            document.getElementById('dice2').hidden = true;
        }
        else if (player == 'p2') {
            document.getElementById('tog2').innerText = 'WINNER !!!';
            //document.getElementById('play1').hidden = true;
            document.getElementById('tog1').hidden = true;
            //document.getElementById('dnum1').hidden = true;
            document.getElementById('dice1').hidden = true;
        }

        setTimeout(function () {
            if (player == 'p1') {
                alert(player1 + " Won the game !!")
            }
            else if (player == 'p2') {
                alert(player2 + " Won the game !!")
            }
            location.reload()
        }, 1000);
    }
    else {

        numarr = Array.from(String(sum))
        n1 = eval(numarr.shift())
        n2 = eval(numarr.pop())
        // console.log(n1, n2)

        if (n1 % 2 != 0) {

            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 80}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 73 - correction}px`
            }
            else {
                document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 80}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 73 - correction}px`
            }

        }
        else if (n1 % 2 == 0) {
            if (n2 == 0) {

                document.getElementById(`${player}`).style.left = `${(0) * 80}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 73 - correction}px`
            }
            else {

                document.getElementById(`${player}`).style.left = `${(n2 - 1) * 80}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 73 - correction}px`
            }
        }
    }
}

var togle = 0;

document.getElementById('dice1').addEventListener("click", function () {
    if (togle == 0) {

        togle = 1;
        tog = 1;
        diceSound.play()
        num = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        document.getElementById("dice1").innerText = num;

        rollDice('dice1');

        if (num == 1) {
            document.getElementById("dice1").src = "bg/dice1.png";
        }
        else if (num == 2) {
            document.getElementById("dice1").src = "bg/dice2.png";
        }
        else if (num == 3) {
            document.getElementById("dice1").src = "bg/dice3.png";
        }
        else if (num == 4) {
            document.getElementById("dice1").src = "bg/dice4.png";
        }
        else if (num == 5) {
            document.getElementById("dice1").src = "bg/dice5.png";
        }
        else if (num == 6) {
            document.getElementById("dice1").src = "bg/dice6.png";
        }

        document.getElementById('tog1').innerText = player1 + "'s Turn";
        play('p1', 'p1sum', 0, num);

        // Wait for a short delay before displaying the result
        setTimeout(function () {

            document.getElementById("tog2").hidden = false;
            document.getElementById("tog2").innerText = player2 + "'s Turn";
            document.getElementById("tog1").hidden = true;
        }, 300); // Adjust the delay as needed
    }
})

document.getElementById("dice2").addEventListener("click", function () {
    if (togle == 1) {

        togle = 0;
        tog = 2;
        diceSound.play()
        num = Math.floor(Math.random() * (6 - 1 + 1) + 1)
        document.getElementById("dice2").innerText = num;

        rollDice('dice2');

        if (num == 1) {
            document.getElementById("dice2").src = "bg/dice1.png";
        }
        else if (num == 2) {
            document.getElementById("dice2").src = "bg/dice2.png";
        }
        else if (num == 3) {
            document.getElementById("dice2").src = "bg/dice3.png";
        }
        else if (num == 4) {
            document.getElementById("dice2").src = "bg/dice4.png";
        }
        else if (num == 5) {
            document.getElementById("dice2").src = "bg/dice5.png";
        }
        else if (num == 6) {
            document.getElementById("dice2").src = "bg/dice6.png";
        }

        document.getElementById('tog2').innerText = player2 + "'s Turn";
        play('p2', 'p2sum', 55, num);

        // Wait for a short delay before displaying the result
        setTimeout(function () {

            document.getElementById("tog1").hidden = false;
            document.getElementById("tog1").innerText = player1 + "'s Turn";
            document.getElementById("tog2").hidden = true;
        }, 300); // Adjust the delay as needed
    }
})

function rollDice(dice) {
    // Display the dice rolling animation
    var diceElement = document.getElementById(dice);
    diceElement.classList.add('rolling');

    // Wait for a short delay before displaying the result
    setTimeout(function () {
        // Move the player according to the dice result
        //movePlayer(diceResult);

        // Remove the rolling animation class
        diceElement.classList.remove('rolling');
    }, 200); // Adjust the delay as needed
}

function openModal(phase) {
    document.getElementById(phase).style.display = "block";
}

function closeModal(phase) {
    document.getElementById(phase).style.display = "none";

    if (questcnt == 1 || questcnt == 9) {
        displayQuestion(quizData_sawscaled);
        openModal('myModal2');
    }
    else if (questcnt == 2 || questcnt == 10) {
        displayQuestion(quizData_russells);
        openModal('myModal2');
    }
    else if (questcnt == 3 || questcnt == 11) {
        displayQuestion(quizData_kingcobra);
        openModal('myModal2');
    }
    else if (questcnt == 4 || questcnt == 12) {
        displayQuestion(quizData_cobra);
        openModal('myModal2');
    }
    else if (questcnt == 5 || questcnt == 13) {
        displayQuestion(quizData_krait);
        openModal('myModal2');
    }
    else if (questcnt == 6 || questcnt == 14) {
        displayQuestion(quizData_humpnosed);
        openModal('myModal2');
    }
    else if (questcnt == 7 || questcnt == 15) {
        displayQuestion(quizData_malabar);
        openModal('myModal2');
    }
    else if (questcnt == 8 || questcnt == 16) {
        displayQuestion(quizData_seasnake);
        openModal('myModal2');
    }
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}

const quizData_sawscaled = [
    {
        question: 'The name saw-scale alludes to the saw-edged shaped scales',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Saw-scaled vipers have elliptical pupils',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Envenoming results in significant neurotoxicity',
        options: ['True', 'False'],
        answer: 'True',
    },
];
const quizData_russells = [
    {
        question: 'Russells viper are exceedingly fast and agile movers?',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Russells viper bite leads to haematotoxic symptoms',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Russells vipers are ovoviviparous',
        options: ['True', 'False'],
        answer: 'True',
    },
];
const quizData_kingcobra = [
    {
        question: 'The King cobra is the most venomous species found in India',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'King Cobras are widely distributed throughout the country',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'King cobras thrive in dry arid areas',
        options: ['True', 'False'],
        answer: 'True',
    },
];
const quizData_cobra = [
    {
        question: 'All cobras have a spectacled mark',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Cobras bite leads to neurotoxicity',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Cobra bites are usually associated with significant signs of local inflammation and necrosis at the bite site',
        options: ['True', 'False'],
        answer: 'True',
    },
];
const quizData_krait = [
    {
        question: 'Most krait bites are nocturnal events',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Krait bite leads to significant local inflammation and necrosis',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Krait bite causes neurotoxiciy',
        options: ['True', 'False'],
        answer: 'True',
    },
];
const quizData_humpnosed = [
    {
        question: 'Hump nosed pit viper bites cause haemotoxicity',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Does it causes significant local reaction and necrosis at the Hump nosed pit viper bite site?',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'The ASV available in India is effective against hump nosed pit viper',
        options: ['True', 'False'],
        answer: 'True',
    },
];
const quizData_malabar = [
    {
        question: 'It is the commonest cause of death due to Malabar pit viper snakebite in Kerala',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Bites of Malabar pit viper usually leads to swelling and inflammation without any systemic symptoms',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Bites of Malabar pit viper leads to predominantly neurotoxic symptoms',
        options: ['True', 'False'],
        answer: 'True',
    },
];
const quizData_seasnake = [
    {
        question: 'Sea snakebite is a common cause of bite in Rajasthan',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'Myotoxicity is common with sea snakebite in humans',
        options: ['True', 'False'],
        answer: 'True',
    },
    {
        question: 'The ant-snake venom available in India is effective against sea snake venom',
        options: ['True', 'False'],
        answer: 'True',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');

var currentQuestion = 0;
var questcnt = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion(questioncode) {
    const questionData = questioncode[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

submitButton.addEventListener('click', checkAnswer);

var anscnt = 1;
function checkAnswer() {
    let questioncode;
    let anslevel;

    if (anscnt < 1)
        anscnt = 1;

    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {

        if (questcnt == 1 || questcnt == 9)
            questioncode = quizData_sawscaled;
        else if (questcnt == 2 || questcnt == 10)
            questioncode = quizData_russells;
        else if (questcnt == 3 || questcnt == 11)
            questioncode = quizData_kingcobra;
        else if (questcnt == 4 || questcnt == 12)
            questioncode = quizData_cobra;
        else if (questcnt == 5 || questcnt == 13)
            questioncode = quizData_krait;
        else if (questcnt == 6 || questcnt == 14)
            questioncode = quizData_humpnosed;
        else if (questcnt == 7 || questcnt == 15)
            questioncode = quizData_malabar;
        else if (questcnt == 8 || questcnt == 16)
            questioncode = quizData_seasnake;

        const answer = selectedOption.value;
        if (answer === questioncode[currentQuestion].answer) {

            if (questcnt == 1 || questcnt == 9) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 64-77';

                    if (tog == 1) {
                        p1sum = 77;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    else if (tog == 2) {
                        p2sum = 77;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 77-84';

                    if (tog == 1) {
                        p1sum = 84;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 84;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 84-98 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 98;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 98;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 2 || questcnt == 10) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 37-56';

                    if (tog == 1) {
                        p1sum = 56;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 56;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 56-75';

                    if (tog == 1) {
                        p1sum = 75;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 75;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 75-95 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 95;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 95;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 3 || questcnt == 11) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 17-34';

                    if (tog == 1) {
                        p1sum = 34;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 34;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 34-54';

                    if (tog == 1) {
                        p1sum = 54;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 54;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 54-88 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 88;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 88;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 4 || questcnt == 12) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 36-43';

                    if (tog == 1) {
                        p1sum = 43;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 43;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 43-60';

                    if (tog == 1) {
                        p1sum = 60;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 60;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 60-79 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 79;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 79;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 5 || questcnt == 13) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 30-48';

                    if (tog == 1) {
                        p1sum = 48;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 48;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 48-53';

                    if (tog == 1) {
                        p1sum = 53;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 53;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 53-68 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 68;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 68;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 6 || questcnt == 14) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 21-22';

                    if (tog == 1) {
                        p1sum = 22;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 22;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 22-39';

                    if (tog == 1) {
                        p1sum = 39;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 39;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 39-42 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 42;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 42;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 7 || questcnt == 15) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 5-18';

                    if (tog == 1) {
                        p1sum = 18;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 18;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 18-19';

                    if (tog == 1) {
                        p1sum = 19;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 19;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 19-20 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 20;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 20;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 8 || questcnt == 16) {
                if (anscnt == 1) {
                    anslevel = 'Right Answer... You have moved one level up from tail 10-12';

                    if (tog == 1) {
                        p1sum = 12;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 12;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Right Answer... You have moved one level up from 12-14';

                    if (tog == 1) {
                        p1sum = 14;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 14;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Right Answer... You have moved one level up from 14-15 the head of snake. Congrats !!!';

                    if (tog == 1) {
                        p1sum = 15;
                        levelup.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 15;
                        levelup.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            anscnt++;
            resultContainer.innerText = anslevel;
        }
        else {
            /*if (anscnt > 1)
                anscnt--;
            else
                anscnt = 0;*/

            //anscnt--;

            if (questcnt == 1 || questcnt == 9) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of Saw Scaled Snake at position - 64';

                    if (tog == 1) {
                        p1sum = 64;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    else if (tog == 2) {
                        p2sum = 64;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of Saw Scaled Snake at position 64 from position 77';

                    if (tog == 1) {
                        p1sum = 64;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 64;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 77 from position 84';

                    if (tog == 1) {
                        p1sum = 77;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 77;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 2 || questcnt == 10) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of Rusells Snake at position - 37';

                    if (tog == 1) {
                        p1sum = 37;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 37;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of Rusells Snake at position 37 from position 56';

                    if (tog == 1) {
                        p1sum = 37;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 37;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 56 from position 75';

                    if (tog == 1) {
                        p1sum = 56;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 56;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 3 || questcnt == 11) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of King Cobra Snake at position - 17';

                    if (tog == 1) {
                        p1sum = 17;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 17;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of King Cobra at position 17 from position 34';

                    if (tog == 1) {
                        p1sum = 17;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 17;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 34 from position 54';

                    if (tog == 1) {
                        p1sum = 34;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 34;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 4 || questcnt == 12) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of Indian Cobra Snake at position - 36';

                    if (tog == 1) {
                        p1sum = 36;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 36;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of Indian Cobra at position 36 from position 43';

                    if (tog == 1) {
                        p1sum = 36;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 36;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 43 from position 60';

                    if (tog == 1) {
                        p1sum = 43;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 43;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 5 || questcnt == 13) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of Krait Snake at position - 30';

                    if (tog == 1) {
                        p1sum = 30;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 30;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of Krait Snake at position 30 from position 48';

                    if (tog == 1) {
                        p1sum = 30;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 30;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 48 from position 53';

                    if (tog == 1) {
                        p1sum = 48;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 48;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 6 || questcnt == 14) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of Hump Nosed pit Viper at position - 21';

                    if (tog == 1) {
                        p1sum = 21;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 21;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of Hump Nosed pit Viper at position 21 from position 22';

                    if (tog == 1) {
                        p1sum = 21;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 21;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 22 from position 39';

                    if (tog == 1) {
                        p1sum = 22;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 22;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 7 || questcnt == 15) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of Malabar pit Viper at position - 5';

                    if (tog == 1) {
                        p1sum = 5;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 5;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of Malabar pit Viper at position 5 from position 18';

                    if (tog == 1) {
                        p1sum = 5;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 5;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 18 from position 19';

                    if (tog == 1) {
                        p1sum = 18;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 18;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            else if (questcnt == 8 || questcnt == 16) {
                if (anscnt == 1) {
                    anslevel = 'Incorrect Answer... You are at tail of Sea Snake at position - 10';

                    if (tog == 1) {
                        p1sum = 10;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 10;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 2) {
                    anslevel = 'Incorrect Answer... You have been moved one level down back to tail of Sea Snake at position 10 from position 12';

                    if (tog == 1) {
                        p1sum = 10;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 10;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                }
                else if (anscnt == 3) {
                    anslevel = 'Incorrect Answer... You have been moved one level down to position 12 from position 14';

                    if (tog == 1) {
                        p1sum = 12;
                        leveldown.play();
                        movePosition('p1', p1sum, 0);
                    }
                    if (tog == 2) {
                        p2sum = 12;
                        leveldown.play();
                        movePosition('p2', p2sum, 55);
                    }
                    anscnt = 0;
                    questcnt = 0;
                }
            }
            anscnt--;
            resultContainer.innerText = anslevel;
        }

        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < 3) {
            displayQuestion(questioncode);
        } else {
            displayResult();
        }
    }
}

function displayResult() {

    submitButton.style.display = 'none';
    setTimeout(function () {
        resultContainer.innerText = '';
        submitButton.style.display = 'block';
        currentQuestion = 0;
        questcnt = 0;
        anscnt = 0;
        closeModal('myModal2');
    }, 2500);
}

function movePosition(player, sum, correction) {

    document.getElementById(`${player}`).style.transition = `linear all .5s`
    if (sum < 10) {
        document.getElementById(`${player}`).style.left = `${(sum - 1) * 80}px`
        document.getElementById(`${player}`).style.top = `${-0 * 73 - correction}px`
    }
    else {
        numarr = Array.from(String(sum))
        n1 = eval(numarr.shift())
        n2 = eval(numarr.pop())

        if (n1 % 2 != 0) {
            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(9) * 80}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 73 - correction}px`
            }
            else {
                document.getElementById(`${player}`).style.left = `${(9 - (n2 - 1)) * 80}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 73 - correction}px`
            }
        }
        else if (n1 % 2 == 0) {
            if (n2 == 0) {
                document.getElementById(`${player}`).style.left = `${(0) * 80}px`
                document.getElementById(`${player}`).style.top = `${(-n1 + 1) * 73 - correction}px`
            }
            else {
                document.getElementById(`${player}`).style.left = `${(n2 - 1) * 80}px`
                document.getElementById(`${player}`).style.top = `${-n1 * 73 - correction}px`
            }
        }
    }
}