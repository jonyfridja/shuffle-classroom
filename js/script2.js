let gStudentNames = ['Alina Boshkov', 'Alon Tal', 'Arkadi Zvalinov', 'Ben Yager', 'Coral Solomon',
    'Daniil Glezer', 'Edgar', 'Eyal Ganor', 'Gilad Bergmann', 'Igor', 'Ilya Levin',
    'Lior BenHaim', 'Mai Aloni', 'Margad T', 'Mor Zeevi', 'Nevo Kotlovsky',
    'Ohad Avidar', 'Paolo Groppi', 'Roy Amar', 'shay rosenthal', 'Shmuel Elkis', 'Tal Azenkot', 'Tal Kabesa', 'Tal Mashiah', 'vlad', 'Yael Fisher', 'Yael Shenker', 'Yanir Shaked', 'Yoad Gantz'];

let gStudentNamesGalitz = ['tal', 'yoni', 'alon', 'elior', 'nevo', 'itay', 'yaron', 'meital', 'chen', 'asaf',
    'tal', 'yoni', 'alon', 'elior', 'nevo', 'itay', 'yaron', 'meital'];

let gElAvailableF2Seats = [];
let gElAvailableGalitzSeats = [];

function init() {
    getAvailableSeats();
    shuffleSeats();
    shuffleStudents();
    renderStudentsSeats();
}

function getAvailableSeats() {
    gElAvailableF2Seats = document.querySelectorAll('.f2-classroom .seat');
    gElAvailableGalitzSeats = document.querySelectorAll('.galitz-classroom .seat');
}

function shuffleStudents() {
    shuffleCollection(gStudentNames);
    shuffleCollection(gStudentNamesGalitz);
}

function shuffleSeats() {
    gElAvailableF2Seats = shuffleCollection(Array.from(gElAvailableF2Seats));
    gElAvailableGalitzSeats = shuffleCollection(Array.from(gElAvailableGalitzSeats));
}

function renderStudentsSeats() {
    gStudentNames.forEach(student => gElAvailableF2Seats.shift().innerText = student);
    gStudentNamesGalitz.forEach(student => gElAvailableGalitzSeats.shift().innerText = student);
}

function shuffleCollection(collection) {
    collection.sort(() => Math.random() - 0.5);
    return collection;
}