const parent = document.querySelector('.list');
const landenLijstButton = document.querySelector('.landenlijst');
const steenBokVrouwenButton = document.querySelector('.steenbokvrouwen');
const creditCardButton = document.querySelector('.creditcards');
const meesteMensenButton = document.querySelector('.meestemensen');
const gemiddeldeLeeftijdButton = document.querySelector('.gemiddeldeleeftijd');
const leeftijdButtons = document.querySelector('.leeftijd-buttons');
const romaniaButton = document.querySelector('.romania');
const greeceButton = document.querySelector('.greece');
const slovakiaButton = document.querySelector('.slovakia');
const matchMakingButton = document.querySelector('.matchmaking');
let clickLeeftijd = false;
let matchMakingSterrenbeeld = "";

// const example = {
//     name: "Marianna",
//     surname: "Markovič",
//     gender: "female",
//     region: "Slovakia",
//     age: 33,
//     title: "mrs",
//     phone: "(987) 323 6204",
//     birthday: { dmy: "29/08/1987", mdy: "08/29/1987", raw: 557253462 },
//     email: "marianna87@example.com",
//     password: "Markovič87*^",
//     credit_card: {
//         expiration: "1/22",
//         number: "9879-9658-8306-9662",
//         pin: 3776,
//         security: 828,
//     },
//     photo: "https://randomuser.me/api/portraits/med/women/13.jpg",
// };

const removeList = () => {
    const children = Array.from(parent.getElementsByTagName('li'));
    children.forEach((child) => {
        parent.removeChild(child);
    });

    if(clickLeeftijd) {
        leeftijdButtons.style.opacity = 0;
        clickLeeftijd = false;
    };
};

const renderList = (list) => {
    removeList();

    list.forEach((item) => {
        const listElement = document.createElement('li');
        listElement.innerHTML = item;
        parent.appendChild(listElement);
    });
};

const showLeeftijdButtons = () => {
    removeList();

    if(!clickLeeftijd) {
        leeftijdButtons.style.opacity = 1;
        clickLeeftijd = true;
    } else {
        leeftijdButtons.style.opacity = 0;
        clickLeeftijd = false;
    };
};

const getLandenLijst = () => {
    return [...new Set(
        randomPersonData.map((person) => {
            return person.region;
        })
    )].sort();
};

const getSteenBokVrouwen = () => {
    return randomPersonData.filter((person) => {
        const date = new Date(person.birthday.mdy);
        return (person.gender == "female" && date.getFullYear() >= 1990) 
        && ((date.getMonth() == 0 && date.getDate() <= 19) || (date.getMonth() == 11 && date.getDate() >= 22));    
    }).map((person) => {
        return `<p>${person.name} ${person.surname}</p> <img src="${person.photo}" width="200">`;
    });
};

const getCreditCards = () => {
    const currentDate = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    return randomPersonData.filter((person) => {
        const age = Math.floor((currentDate - new Date(person.birthday.mdy)) / 31557600000);
        const expirationDate = person.credit_card.expiration.split('/');
        const expirationDate2 = new Date("20" + expirationDate[1], expirationDate[0] -1);

        if(age >= 18 && expirationDate2.getTime() <= oneYearFromNow.getTime()) { 
            return person;
        };
    }).sort((a, b) => {
        let expirationDateA = a.credit_card.expiration.split('/');
        expirationDateA = new Date("20" + expirationDateA[1], expirationDateA[0] -1);

        let expirationDateB = b.credit_card.expiration.split('/');
        expirationDateB = new Date("20" + expirationDateB[1], expirationDateB[0] -1);

        return expirationDateA.getTime() - expirationDateB.getTime();
    }).map((person) => {
        return `<p>name: ${person.name} ${person.surname}<br>tel: ${person.phone}
        <br>creditcard: ${person.credit_card.number}<br>expiration date: ${person.credit_card.expiration}`;
    });
};

const getMeesteMensen = () => {
    const landen = [...new Set(
        randomPersonData.map((person) => {
            return person.region;
        })
    )];

    let meesteMensen = {}

    landen.forEach((land) => {
        meesteMensen[land] = 0;
    })

    randomPersonData.forEach((person) => {
        meesteMensen[person.region] = meesteMensen[person.region] + 1;
    });
    
    let array = [];

    for(p in meesteMensen) {
        array.push(`${p}: ${meesteMensen[p]}`);
    };

    return array;
};

const getGemiddeldeLeeftijd = (land) => {
    const filteredPeople = randomPersonData.filter((person) => {
        return person.region.toLowerCase() == land;
    });

    const peopleCount = filteredPeople.length;

    const totalYears = filteredPeople.reduce((prev, current) => {
        return current.age + prev;
    }, 0);

    const averageAge = Math.round(totalYears / peopleCount);

    return [`De gemiddelde persoon in ${land} is ${averageAge} jaar oud.`];
};

const getSterrenBeeld = (birthday) => {
    const date = new Date(birthday);

    if((date.getMonth() == 3 && date.getDate() <= 20) || (date.getMonth() == 2 && date.getDate() >= 21)) {
        return "Ram";
    };

    if((date.getMonth() == 4 && date.getDate() <= 20) || (date.getMonth() == 3 && date.getDate() >= 21)) {
        return "Stier";
    };

    if((date.getMonth() == 5 && date.getDate() <= 21) || (date.getMonth() == 4 && date.getDate() >= 21)) {
        return "Tweelingen";
    };

    if((date.getMonth() == 6 && date.getDate() <= 22) || (date.getMonth() == 5 && date.getDate() >= 22)) {
        return "Kreeft";
    };

    if((date.getMonth() == 7 && date.getDate() <= 23) || (date.getMonth() == 6 && date.getDate() >= 23)) {
        return "Leeuw";
    };

    if((date.getMonth() == 8 && date.getDate() <= 22) || (date.getMonth() == 7 && date.getDate() >= 24)) {
        return "Maagd";
    };

    if((date.getMonth() == 9 && date.getDate() <= 23) || (date.getMonth() == 8 && date.getDate() >= 23)) {
        return "Weegschaal";
    };

    if((date.getMonth() == 10 && date.getDate() <= 22) || (date.getMonth() == 9 && date.getDate() >= 24)) {
        return "Schorpioen";
    };

    if((date.getMonth() == 11 && date.getDate() <= 21) || (date.getMonth() == 10 && date.getDate() >= 23)) {
        return "Boogschutter";
    };

    if((date.getMonth() == 0 && date.getDate() <= 19) || (date.getMonth() == 11 && date.getDate() >= 22)) {
        return "Steenbok";
    };

    if((date.getMonth() == 1 && date.getDate() <= 19) || (date.getMonth() == 0 && date.getDate() >= 20)) {
        return "Waterman";
    };

    if((date.getMonth() == 2 && date.getDate() <= 20) || (date.getMonth() == 1 && date.getDate() >= 20)) {
        return "Vissen";
    };
};

const getMatchMakingList = () => {
    return randomPersonData.map((person) => {
        const currentDate = new Date();
        const age = Math.floor((currentDate - new Date(person.birthday.mdy)) / 31557600000);
        if(age >= 18) {
            const sterrenbeeld = getSterrenBeeld(person.birthday.mdy);
            return `<p>Naam: ${person.name} ${person.surname}<br><img src="${person.photo}" width="200"><br>
            Komt uit: ${person.region}<br>Leeftijd: ${person.age}<br>Sterrenbeeld: ${sterrenbeeld}<br>
            <button class="makematch" id="${person.name} ${person.surname}">Make a Match</button></p>`;
        };
    });
};

const showLandenLijst = () => {
    const list = getLandenLijst();
    renderList(list); 
};

const showSteenBokVrouwen = () => {
    const list = getSteenBokVrouwen();
    renderList(list);
};

const showCreditCards = () => {
    const list = getCreditCards();
    renderList(list);
};

const showMeesteMensen = () => {
    const list = getMeesteMensen();
    renderList(list);
};

const showGemiddeldeLeeftijd = (land) => {
    const list = getGemiddeldeLeeftijd(land);
    renderList(list);
};

const showMatchesList = (person, matches) => {
    removeList();

    const showPerson = `<h3>Dit was jouw selectie:</h3>
    <p>Naam: ${person.name} ${person.surname}<br><img src="${person.photo}" width="200"><br>
    Komt uit: ${person.region}<br>Leeftijd: ${person.age}<br>Sterrenbeeld: ${getSterrenBeeld(person.birthday.mdy)}<br></p>
    <h2>En dit zijn de matches:</h2>`;

    const listElement = document.createElement('li');
    listElement.innerHTML = showPerson;
    parent.appendChild(listElement);

    matches.forEach((match) => {
        const showMatch = `<p>Naam: ${match.name} ${match.surname}<br><img src="${match.photo}" width="200"><br>
        Komt uit: ${match.region}<br>Leeftijd: ${match.age}<br>Sterrenbeeld: ${getSterrenBeeld(match.birthday.mdy)}<br></p>`;

        const listElement = document.createElement('li');
        listElement.innerHTML = showMatch;
        parent.appendChild(listElement);
    });
};

const getMatchesList = (matchMaker) => {
    const person = randomPersonData.find((person) => {
        return person.name + ' ' + person.surname == matchMaker;
    });

    const sterrenbeeld = getSterrenBeeld(person.birthday.mdy);

    const matches = randomPersonData.filter((match) => {
        if(person.name + ' ' + person.surname !== match.name + ' ' + match.surname) {
            let matchSterrenbeeld = getSterrenBeeld(match.birthday.mdy);

            if(sterrenbeeld == matchSterrenbeeld) {
                return match;
            };
        };
    });
    
    showMatchesList(person, matches);
};

const showMatchMakingList = () => {
    const list = getMatchMakingList();
    renderList(list);

    const makeMatchButtons = Array.from(document.getElementsByClassName('makematch'));

    makeMatchButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            getMatchesList(e.target.id);
        });
    });
};

// Maak een lijst van alle landen, gesorteerd op naam van het land
landenLijstButton.addEventListener('click', showLandenLijst);

/*
    Maak een lijst van mensen:

    laat voor- en achternaam en hun foto zien
    sorteer de lijst op voornaam
    elke persoon op die lijst moet
    vrouw zijn
    ouder zijn dan 30 (1990 of ouder)
    een steenbok zijn (jarig van 22 december t/m 19 januari)
*/
steenBokVrouwenButton.addEventListener('click', showSteenBokVrouwen);

/*
    De creditcard van sommige mensen gaat verlopen, we gaan ze bellen om ze te waarschuwen.

    Maak een lijst van mensen:

    laat per persoon de volgende data zien
    voornaam, achternaam
    telefoonnummer
    creditcardnummer
    verloopdatum
    De lijst mag alleen volwassenen bevatten.

    De verloopdatum moet in de toekomst liggen (van dit jaar).

    De verloopdatum moet in het komende jaar liggen.

    Sorteer de lijst zodat de snelst verlopende creditcards bovenaan staan.

    Lees hier over hoe je de huidige datum kan krijgen. Je script moet over 2 maanden namelijk ook goed werken.
*/
creditCardButton.addEventListener('click', showCreditCards);

/*
    Maak een lijst van alle landen die voorkomen in de data.

    Achter elk land moet komen te staan hoeveel van de mensen in de lijst in dat land wonen.

    De lijst moet zo gesorteerd zijn dat de landen met de meeste mensen bovenaan staan.
*/
meesteMensenButton.addEventListener('click', showMeesteMensen);

/*
    OK, deze is een stukje complexer.

    Als we op de knop voor deze opdracht drukken komt er een lijst met knoppen te staan. De opdracht-knoppen blijven ook staan.

    Elk van de nieuwe knoppen heeft als naam een land ("Nederland" bijvoorbeeld).

    Als we dan op één van de landknoppen drukken zien we ergens in de pagina een zin verschijnen met de tekst "De gemiddelde persoon in {land} is {jaar} oud".

    Om die zin te kunnen laten zien moeten we de gemiddelde leeftijd voor dat land berekenen.

    Rond de gemiddelde leeftijd af naar hele cijfers ( 18.4999 → 18 en 18.5 → 19).
*/
gemiddeldeLeeftijdButton.addEventListener('click', showLeeftijdButtons);

romaniaButton.addEventListener('click', function() {
    showGemiddeldeLeeftijd('romania');
});

greeceButton.addEventListener('click', function() {
    showGemiddeldeLeeftijd('greece');
});

slovakiaButton.addEventListener('click', function() {
    showGemiddeldeLeeftijd('slovakia');
});

/*
    Deze opdracht is het moeilijkst.

    Als we op de knop voor deze opdracht drukken zien we een lijst van alle mensen.

    de lijst is gesorteerd op voornaam
    we willen alleen volwassenen zien
    van elke persoon zien we:
    voornaam, achternaam
    foto
    land
    leeftijd
    sterrenbeeld (Steenbok, Weegschaal etc)
    Bij elke persoon zien we een knop met als titel "vind matches".

    Als we op die knop drukken:

    verdwijnt de grote lijst met mensen
    zien we de aangeklikte persoon bovenaan staan
    daaronder zien we een lijst van "matches" van die persoon
    iemand mag niet met zichzelf matchen
    Hoe bepalen we een match? Dat doen we op basis van sterrenbeeld. Of mensen in een ander werelddeel wonen, 30 jaar in leeftijd 
    verschillen of niet elkaars taal spreken is niet belangrijk, liefde overwint alle grenzen ;-)

    Hoe bepalen we welk sterrenbeeld iemand is? Doe dat met deze informatie.

    En we gaan alleen voor de "Great Match".
*/
matchMakingButton.addEventListener('click', showMatchMakingList);