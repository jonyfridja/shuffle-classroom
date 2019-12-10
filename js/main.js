let gStudentNames = ["Alina Boshkov", "Alon Tal", "Arkadi Zvalinov", "Ben Levi", "Ben Yager", "Coral Solomon", "Daniil Glezer", "Edgar", "Eyal Ganor", "Gilad Bergmann", "Igor", "Ilya Levin", "Lior BenHaim", "Mai Aloni", "Margad T", "Matt Gordon", "Mor Zeevi", "Nevo Kotlovsky", "Niv Leibovitch", "Ohad Avidar", "Paolo Groppi", "Roy Amar", "Shaked Katsir", "shay rosenthal", "Shmuel Elkis", "Tal Azenkot", "Tal Barak", "Tal Kabesa", "Tal Mashiah", "vlad", "Yael Fisher", "Yael Shenker", "Yanir Shaked", "Yoad Gantz"];
let gDesks = null;

function init() {
    shuffleCollection(gStudentNames);

    gStudentNames = studentNamesToDisplay();
    gDesks = createDesks();
    console.log('gDesks', gDesks);
    renderDesks();
}

function renderDesks() {
    const desksHTMLs = gDesks.map(desk => {
        return `
        <div class="desk">
            <div class="name-container">${desk.left}</div>
            <div class="name-container">${desk.right}</div>
        </div>`
    })

    document.querySelector('.desks-zone').innerHTML = desksHTMLs.join('');

}

function studentNamesToDisplay() {
    return gStudentNames.map(name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    })
}


function createDesks() {
    const desksCount = getDesksCount();
    let desks = [];
    for (let i = 0; i < desksCount; i++) {
        const leftName = gStudentNames[i * 2];
        const rightName = gStudentNames[i * 2 + 1];
        desks.push(createDesk(leftName, rightName));
    }
    return desks;
}

function getDesksCount() {
    return Math.ceil(gStudentNames.length / 2);
}

function createDesk(name1, name2) {
    return {
        left: name1, right: name2
    }
}
function shuffleCollection(collection) {
    collection.sort(() => Math.random() - 0.5);
}