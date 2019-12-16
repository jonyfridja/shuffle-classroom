let gStudentNames = ["Alina Boshkov", "Alon Tal", "Arkadi Zvalinov", "Ben Yager", "Coral Solomon", "Daniil Glezer", "Edgar", "Eyal Ganor", "Gilad Bergmann", "Igor", "Ilya Levin", "Lior BenHaim", "Mai Aloni", "Margad T", "Mor Zeevi", "Nevo Kotlovsky", "Ohad Avidar", "Paolo Groppi", "Roy Amar", "shay rosenthal", "Shmuel Elkis", "Tal Azenkot", "Tal Kabesa", "Tal Mashiah", "vlad", "Yael Fisher", "Yael Shenker", "Yanir Shaked", "Yoad Gantz"];
let gDesks = null;
let gIsLoading = false;
let gMissingDesks = [];
// This constant fills the desks array to this limit
const DESKS_IN_CLASS_COUNT = 16;

function init() {
    addEventListeners();
    handleAllState();
}

function handleAllState() {
    hideLoading();
    shuffleCollection(gStudentNames);
    gStudentNames = studentNamesToDisplay();
    gDesks = createDesks();
    // shuffleCollection(gDesks);
    renderDesks();
}

function addEventListeners() {
    const formEl = document.querySelector('form');
    formEl.addEventListener('submit', formSubmitHandler);

    const elLoadingModal = document.querySelector('.loading-modal')
    elLoadingModal.addEventListener('transitionend', () => {
        if (gIsLoading) {
            elLoadingModal.classList.remove('d-flex');
            gIsLoading = false;
        }
    });

}
function formSubmitHandler(event) {
    gIsLoading = true;
    let missingIdxs = event.target[0].value.split(',');
    missingIdxs = missingIdxs.map(Number);
    gMissingDesks = missingIdxs;
    showLoading();
    setTimeout(handleAllState, 1000);
}

function showLoading() {
    document.querySelector('.loading-modal').classList.add('d-flex');
    document.querySelector('.loading-modal').classList.add('shown');
}

function hideLoading() {
    document.querySelector('.loading-modal').classList.remove('shown');
    // onanimationend is gonna remove d-flex!
}

function onUserInputSubmit() {
    const missingSpots = document.getElementById('#missing');
}

function checkIsEmptyDesk(desk) {
    return desk.left === 'empty' && desk.right === 'empty';
}
function renderDesks() {
    const desksHTMLs = gDesks.map(desk => {
        const isEmptyDesk = checkIsEmptyDesk(desk)
        let classStr = 'desk ';
        classStr += (isEmptyDesk) ? 'empty' : '';
        return `
        <div class="${classStr}">
            <div class="name-container">${desk.left}</div>
            <div class="name-container">${desk.right}</div>
        </div>`
    });
    document.querySelector('.desks-zone').innerHTML = desksHTMLs.join('');
}

function studentNamesToDisplay() {
    return gStudentNames.map(name => {
        return name.charAt(0).toUpperCase() + name.slice(1);
    });
}

function createDesks() {
    const desksCount = getDesksCount();
    let desks = [];
    for (let i = 0; i < desksCount; i++) {
        const leftName = gStudentNames[i * 2];
        const rightName = gStudentNames[i * 2 + 1];
        desks.push(createDesk(leftName, rightName));
    }
    insertMissingDesks(desks);
    completeDeskCount(desks);
    return desks;
}

function insertMissingDesks(desks) {
    gMissingDesks.forEach(missingDeskIdx => {
        desks.splice(missingDeskIdx, 0, createDesk('empty', 'empty'));
    });
}
function completeDeskCount(desks) {
    const desksCompleteCount = DESKS_IN_CLASS_COUNT - desks.length;
    for (let i = 0; i < desksCompleteCount; i++) {
        desks.push(createDesk('empty', 'empty'));
    }
}

function getDesksCount() {
    return Math.ceil(gStudentNames.length / 2);
}

function createDesk(name1 = 'empty', name2 = 'empty') {
    return {
        left: name1, right: name2
    }
}
function shuffleCollection(collection) {
    collection.sort(() => Math.random() - 0.5);
}