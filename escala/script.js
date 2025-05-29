const availablePeople = {
    "Riquelmy": ["Câmera", "DataShow", "Gimbal"],
    "Annaylle": ["Insta", "Gimbal"],
    "Isaque": ["Câmera", "DataShow"],
    "Talita": ["Insta"],
    // "Yasmim": ["DataShow", "Insta", "Gimbal"],
    "Sara": ["Insta", "Gimbal"],
    // "Ana Clara": ["Câmera", "DataShow"],
    "João Pedro": ["DataShow"],
    "Maria Luiza": ["Insta", "Gimbal"],
    "Leandra": ["Insta", "Câmera"],
    "Davi": ["Gimbal", "Câmera"],
    "Matheus H.": ["Câmera"],
    "Matheus O.": ["DataShow"],
    "Isabella": ["Insta", "Gimbal"]
};

const roles = ["Câmera", "DataShow", "Gimbal", "Insta"];

document.getElementById('scheduleForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const dayList = document.getElementById('dayList').value.split(',').map(d => d.trim());
    const scalesPerDay = parseInt(document.getElementById('scalesPerDay').value);
    // const restDaysInput = document.getElementById('restDays').value;

    // const restDays = restDaysInput ? parseRestDays(restDaysInput) : {};

    const output = generateSchedules(dayList, scalesPerDay);
    document.getElementById('output').innerHTML = output;
});

function parseRestDays(input) {
    const restDays = {};
    const pairs = input.split(';');

    pairs.forEach(pair => {
        const [day, people] = pair.split(':');
        restDays[day.trim()] = people.split(',').map(p => p.trim());
    });

    return restDays;
}

function generateSchedules(dayList, scalesPerDay, restDays) {
    let scheduleOutput = "";
    let participationCount = {};

    Object.keys(availablePeople).forEach(person => participationCount[person] = 0);

    for (const day of dayList) {
        scheduleOutput += `<h2>📅 Dia ${day}</h2>`;
        let usedPeopleToday = {};
        // let peopleToRest = restDays[day] || [];

        for (let scale = 1; scale <= scalesPerDay; scale++) {
            let scaleLabel;
            if (scalesPerDay === 2) {
                scaleLabel = scale === 1 ? "Escala Mídia - Manhã" : "Escala Mídia - Noite";
            } else {
                scaleLabel = `Escala ${scale}`;
            }

            scheduleOutput += `<h3>${scaleLabel}</h3>`;
            let assignedRoles = {};

            roles.forEach(role => {
                const candidates = Object.keys(availablePeople).filter(person =>
                    availablePeople[person].includes(role) &&
                    !usedPeopleToday[person] 
                    // &&
                    // !peopleToRest.includes(person)
                );

                candidates.sort((a, b) => participationCount[a] - participationCount[b]);

                if (candidates.length > 0) {
                    const topCandidates = candidates.filter(p => participationCount[p] === participationCount[candidates[0]]);
                    const selectedPerson = topCandidates[Math.floor(Math.random() * topCandidates.length)];
                    assignedRoles[role] = selectedPerson;
                    usedPeopleToday[selectedPerson] = true;
                    participationCount[selectedPerson]++;
                } else {
                    const fallback = Object.keys(availablePeople).filter(person =>
                        availablePeople[person].includes(role)
                        //  &&
                        // !peopleToRest.includes(person)
                    );

                    if (fallback.length > 0) {
                        fallback.sort((a, b) => participationCount[a] - participationCount[b]);
                        const selectedPerson = fallback[0];
                        assignedRoles[role] = selectedPerson;
                        usedPeopleToday[selectedPerson] = true;
                        participationCount[selectedPerson]++;
                    } else {
                        assignedRoles[role] = "N/A";
                    }
                }
            });

            scheduleOutput += generateScheduleHtml(assignedRoles);
        }

        // if (peopleToRest.length > 0) {
        //     scheduleOutput += `<p><strong>Descansando:</strong> ${peopleToRest.join(', ')}</p>`;
        // } else {
            const availableForRest = Object.keys(availablePeople).filter(person =>
                !usedPeopleToday[person]
            );
            if (availableForRest.length > 0) {
                scheduleOutput += `<p><strong>Descansando:</strong> ${availableForRest.join(', ')}</p>`;
            }
        // }
    }

    return scheduleOutput;
}

function generateScheduleHtml(assignedRoles) {
    return `
        <ul>
            <li>🎥 Câmera: ${assignedRoles["Câmera"]}</li>
            <li>💻 DataShow: ${assignedRoles["DataShow"]}</li>
            <li>📸 Insta: ${assignedRoles["Insta"]}</li>
            <li>🤳 Gimbal: ${assignedRoles["Gimbal"]}</li>
        </ul>
    `;
}
