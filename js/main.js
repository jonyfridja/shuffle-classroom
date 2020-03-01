let gStudentNames = ["Alina Boshkov", "Alon Tal", "Arkadi Zvalinov", "Ben Yager", "Coral Solomon",
    "Daniil Glezer", "Edgar", "Eyal Ganor", "Gilad Bergmann", "Igor", "Ilya Levin",
    "Lior BenHaim", "Mai Aloni", "Margad T", "Mor Zeevi", "Nevo Kotlovsky",
    "Ohad Avidar", "Paolo Groppi", "Roy Amar", "shay rosenthal", "Shmuel Elkis", "Tal Azenkot", "Tal Kabesa", "Tal Mashiah", "vlad", "Yael Fisher", "Yael Shenker", "Yanir Shaked", "Yoad Gantz"];
let gStudentNamesGalitz = ['tal', 'yoni', 'alon', 'elior', 'nevo', 'itay', 'yaron', 'meital', 'chen', 'asaf',
    'tal', 'yoni', 'alon', 'elior', 'nevo', 'itay', 'yaron', 'meital', 'chen'];

let gDesks = null;
let gDesksGalitz = null;

let gIsLoading = false;

let gMissingDesks = [];
let gMissingDesksGalitz = [];

// This constant fills the desks array to this limit
const DESKS_IN_CLASS_COUNT = 16;
const DESKS_IN_CLASS_COUNT_GALITZ = 6;

function init() {
    addEventListeners();
    handleAllState();
}

function handleAllState() {
    hideLoading();
    shuffleCollection(gStudentNames);
    shuffleCollection(gStudentNamesGalitz);
    gDesks = createDesks(gStudentNames, gMissingDesks);
    gDesksGalitz = createDesks(gStudentNamesGalitz, gMissingDesksGalitz);
    // shuffleCollection(gDesks);
    renderDesks(gDesks, '.desks-zone');
    renderDesks(gDesksGalitz, '.desks-zone2');
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
function renderDesks(desks, elSelector) {
    const desksHTMLs = desks.map(desk => {
        // const isEmptyDesk = checkIsEmptyDesk(desk)
        let classStr = 'desk ';
        // classStr += (isEmptyDesk) ? 'empty' : '';
        return `
        <div class="${classStr}">
            <div class="name-container">${desk.left}</div>
            <div class="name-container">${desk.right}</div>
        </div>`
    });
    document.querySelector(elSelector).innerHTML = desksHTMLs.join('');
}

function createDesks(studentNames) {
    const desksCount = getDesksCount(studentNames);
    let desks = [];
    for (let i = 0; i < desksCount; i++) {
        const leftName = studentNames[i * 2];
        const rightName = studentNames[i * 2 + 1];
        desks.push(createDesk(leftName, rightName));
    }
    // insertMissingDesks(desks);
    // completeDeskCount(desks);
    return desks;
}

function createGalitzDesks(studentNames) {
    const desksCount = getDesksCount(studentNames);
    let desks = [];
    for (let i = 0; i < desksCount; i++) {
        const leftName = studentNames[i * 3];
        const middleName = studentNames[i * 3 + 1];
        const rightName = studentNames[i * 3 + 2];
        desks.push(createDesk(leftName, middleName, rightName));
    }
    // insertMissingDesks(desks);
    // completeDeskCount(desks);
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

function getDesksCount(studentNames) {
    return Math.ceil(studentNames.length / 2);
}

function createDesk(name1 = 'empty', name2 = 'empty') {
    return {
        left: name1, right: name2
    }
}

function createGalitzDesk(name1 = 'empty', name2 = 'empty', name3 = 'empty') {
    return {
        left: name1, middle: name2, right: name3
    }
}
function shuffleCollection(collection) {
    collection.sort(() => Math.random() - 0.5);
}