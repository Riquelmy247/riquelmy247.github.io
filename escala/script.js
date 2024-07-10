const availablePeople = {
    "Riquelmy": ["Câmera", "DataShow", "Gimbal"],
    "Annaylle": ["Insta", "Gimbal"],
    "Isaque": ["Câmera", "DataShow"],
    "Talita": ["DataShow", "Insta"],
    "Yasmim": ["DataShow", "Insta", "Gimbal"],
    "Sara": ["DataShow", "Insta", "Gimbal"],
    "Ana Clara": ["Câmera", "DataShow"],
    "João Pedro": ["DataShow"],
    "Maria Luiza": ["Insta", "Gimbal"]
};

const roles = ["Câmera", "DataShow", "Gimbal", "Insta"];

document.getElementById('scheduleForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const days = document.getElementById('days').value;
    const scalesPerDay = document.getElementById('scalesPerDay').value;
    const restDaysInput = document.getElementById('restDays').value;

    const restDays = restDaysInput ? parseRestDays(restDaysInput) : {};

    const output = generateSchedules(days, scalesPerDay, restDays);
    document.getElementById('output').innerHTML = output;
});

function parseRestDays(input) {
    const restDays = {};
    const pairs = input.split(';');

    pairs.forEach(pair => {
        const [day, people] = pair.split(':');
        restDays[day] = people.split(',');
    });

    return restDays;
}

function generateSchedules(days, scalesPerDay, restDays) {
    let scheduleOutput = "";
    let peopleResting = {};
    let restrictedPeople = {};

    for (let day = 1; day <= days; day++) {
        scheduleOutput += `<h2>Dia ${day}</h2>`;
        let usedPeopleToday = {};
        let peopleToRest = restDays[day] || [];

        for (let scale = 1; scale <= scalesPerDay; scale++) {
            scheduleOutput += `<h3>Escala ${scale}</h3>`;
            let assignedRoles = {};

            roles.forEach(role => {
                const availablePeopleForRole = Object.keys(availablePeople).filter(person =>
                    availablePeople[person].includes(role) &&
                    !usedPeopleToday[person] &&
                    !peopleToRest.includes(person) &&
                    (!restrictedPeople[person] || !restrictedPeople[person].includes(`${day}:${scale}`))
                );

                if (availablePeopleForRole.length > 0) {
                    const selectedPerson = availablePeopleForRole[Math.floor(Math.random() * availablePeopleForRole.length)];
                    assignedRoles[role] = selectedPerson;
                    usedPeopleToday[selectedPerson] = true;
                    if (!restrictedPeople[selectedPerson]) {
                        restrictedPeople[selectedPerson] = [];
                    }
                    restrictedPeople[selectedPerson].push(`${day}:${scale}`);
                } else {
                    const alreadyUsedPeople = Object.keys(usedPeopleToday).filter(person =>
                        availablePeople[person].includes(role)
                    );

                    if (alreadyUsedPeople.length > 0) {
                        const selectedPerson = alreadyUsedPeople[Math.floor(Math.random() * alreadyUsedPeople.length)];
                        assignedRoles[role] = selectedPerson;
                    } else {
                        assignedRoles[role] = "N/A";
                    }
                }
            });

            scheduleOutput += generateScheduleHtml(assignedRoles);
        }

        if (peopleToRest.length > 0) {
            scheduleOutput += `<p>Pessoas descansando: ${peopleToRest.join(', ')}</p>`;
            peopleToRest.forEach(person => {
                usedPeopleToday[person] = true;
            });
        } else {
            let availablePeopleForRest = Object.keys(availablePeople).filter(person =>
                !usedPeopleToday[person] &&
                (!restrictedPeople[person] || !restrictedPeople[person].includes(day))
            );

            if (availablePeopleForRest.length > 0) {
                const selectedPerson = availablePeopleForRest[Math.floor(Math.random() * availablePeopleForRest.length)];
                scheduleOutput += `<p>Pessoa descansando: ${selectedPerson}</p>`;
                if (!restrictedPeople[selectedPerson]) {
                    restrictedPeople[selectedPerson] = [];
                }
                restrictedPeople[selectedPerson].push(day);
            }
        }

        peopleResting[day + 1] = Object.keys(usedPeopleToday);
    }

    return scheduleOutput;
}

function generateScheduleHtml(assignedRoles) {
    return `
        <ul>
            <li>Câmera: ${assignedRoles["Câmera"]}</li>
            <li>DataShow: ${assignedRoles["DataShow"]}</li>
            <li>Gimbal: ${assignedRoles["Gimbal"]}</li>
            <li>Insta: ${assignedRoles["Insta"]}</li>
        </ul>
    `;
}
