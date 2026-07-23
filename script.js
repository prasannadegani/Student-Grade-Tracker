let students =
    JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;
function calculateGrade() {

    const name =
        document.getElementById("name")
            .value
            .trim();

    const inputIds = [
        "maths",
        "physics",
        "chemistry",
        "english",
        "hindi",
        "telugu"
    ];
    const emptyField =
        inputIds.some(id =>
            document.getElementById(id).value === ""
        );


    if (name === "" || emptyField) {

        alert(
            "Please enter student name and all subject marks."
        );

        return;
    }

    const marks =
        inputIds.map(id =>
            Number(
                document.getElementById(id).value
            )
        );
    const invalidMarks =
        marks.some(mark =>
            isNaN(mark) ||
            mark < 0 ||
            mark > 100
        );


    if (invalidMarks) {

        alert(
            "Marks must be between 0 and 100."
        );

        return;
    }

    const duplicateIndex =
        students.findIndex(student =>
            student.name.toLowerCase() ===
            name.toLowerCase()
        );


    if (
        duplicateIndex !== -1 &&
        duplicateIndex !== editIndex
    ) {

        alert(
            "Student already exists!"
        );

        return;
    }

    const total =
        marks.reduce(
            (sum, mark) => sum + mark,
            0
        );

    const average =
        total / marks.length;
    let grade;


    if (average >= 90) {

        grade = "A+";

    }

    else if (average >= 80) {

        grade = "A";

    }

    else if (average >= 70) {

        grade = "B";

    }

    else if (average >= 60) {

        grade = "C";

    }

    else if (average >= 50) {

        grade = "D";

    }

    else {

        grade = "F";

    }

    const status =
        marks.every(mark => mark >= 35)
            ? "Pass"
            : "Fail";

    const student = {

        name: name,

        marks: marks,

        total: total,

        average: average,

        grade: grade,

        status: status
    };

    if (editIndex === -1) {

        students.push(student);

    }

    else {

        students[editIndex] = student;

        editIndex = -1;


        document.getElementById(
            "calculateBtn"
        ).textContent =
            "Calculate Grade";


        document.getElementById(
            "formTitle"
        ).textContent =
            "Add Student Marks";
    }
    saveStudents();

    displayResult(student);

    renderTable();

    updateDashboard();

    clearForm();
}

function displayResult(student) {

    const result =
        document.getElementById("result");


    const statusClass =
        student.status === "Pass"
            ? "result-pass"
            : "result-fail";


    result.innerHTML = `

        <div class="result-header">

            <h3>
                Student Result
            </h3>

            <span class="${statusClass}">
                ${student.status}
            </span>

        </div>

        <div class="result-details">

            <p>
                <strong>Name:</strong>
                ${student.name}
            </p>

            <p>
                <strong>Total:</strong>
                ${student.total} / 600
            </p>

            <p>
                <strong>Average:</strong>
                ${student.average.toFixed(2)}%
            </p>

            <p>
                <strong>Grade:</strong>
                ${student.grade}
            </p>

        </div>

    `;
}

function renderTable() {

    const tableBody =
        document.querySelector(
            "#studentTable tbody"
        );


    tableBody.innerHTML = "";

    const searchInput =
        document.getElementById(
            "searchStudent"
        );


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );


    const filterValue =
        statusFilter
            ? statusFilter.value
            : "All";

    const filteredStudents =
        students.filter(student => {

            const matchesSearch =
                student.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesStatus =
                filterValue === "All" ||
                student.status === filterValue;


            return (
                matchesSearch &&
                matchesStatus
            );

        });

    const emptyMessage =
        document.getElementById(
            "emptyMessage"
        );


    if (filteredStudents.length === 0) {

        if (emptyMessage) {

            emptyMessage.style.display =
                "flex";

        }

    }

    else {

        if (emptyMessage) {

            emptyMessage.style.display =
                "none";

        }

    }

    filteredStudents.forEach(student => {

        const originalIndex =
            students.indexOf(student);


        const row =
            tableBody.insertRow();


        row.innerHTML = `

            <td class="student-name">

                ${student.name}

            </td>


            <td>

                ${student.total}/600

            </td>


            <td>

                ${student.average.toFixed(2)}%

            </td>


            <td>

                <span class="grade-badge">

                    ${student.grade}

                </span>

            </td>


            <td>

                <span class="${
                    student.status === "Pass"
                        ? "pass-status"
                        : "fail-status"
                }">

                    ${student.status}

                </span>

            </td>


            <td class="action-buttons">

                <button
                    class="edit-btn"
                    onclick="editStudent(${originalIndex})"
                >

                    Edit

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteStudent(${originalIndex})"
                >

                    Delete

                </button>

            </td>

        `;

    });
}
function editStudent(index) {
    const student =
        students[index];
    if (!student) {
        return;
    }
    editIndex = index;
    document.getElementById(
        "name"
    ).value =
        student.name;
    const inputIds = [

        "maths",

        "physics",

        "chemistry",

        "english",

        "hindi",

        "telugu"

    ];
    inputIds.forEach(
        (id, i) => {

            document.getElementById(
                id
            ).value =
                student.marks[i];
        }
    );
    document.getElementById(
        "calculateBtn"
    ).textContent =
        "Update Student";
    document.getElementById(
        "formTitle"
    ).textContent =
        "Edit Student Marks";
    window.scrollTo({
        top: 200,
        behavior: "smooth"
    });
}
function deleteStudent(index) {
    const student =
        students[index];
    if (!student) {
        return;
    }
    const confirmDelete =
        confirm(
            "Are you sure you want to delete " +
            student.name +
            "?"
        );
    if (!confirmDelete) {
        return;
    }
    students.splice(
        index,
        1
    );
    if (editIndex === index) {
        editIndex = -1;
        clearForm();
        document.getElementById(
            "calculateBtn"
        ).textContent =
            "Calculate Grade";
        document.getElementById(
            "formTitle"
        ).textContent =
            "Add Student Marks";
    }
    saveStudents();
    renderTable();
    updateDashboard();
    document.getElementById(
        "result"
    ).innerHTML = `
        <p>
            No result calculated yet.
        </p>
    `;
}
function clearAllRecords() {
    if (students.length === 0) {
        alert(
            "No student records to clear."
        );
        return;
    }
    const confirmClear =
        confirm(
            "Are you sure you want to clear all student records?"
        );
    if (!confirmClear) {
        return;
    }
    students = [];
    editIndex = -1;
    saveStudents();
    renderTable();
    updateDashboard();
    clearForm();
    document.getElementById(
        "result"
    ).innerHTML = `
        <p>
            No result calculated yet.
        </p>
    `;
    document.getElementById(
        "calculateBtn"
    ).textContent =
        "Calculate Grade";
    document.getElementById(
        "formTitle"
    ).textContent =
        "Add Student Marks";
}
function updateDashboard() {
    const totalStudents =
        students.length;
    const passedStudents =
        students.filter(
            student =>
                student.status === "Pass"
        ).length;
    const failedStudents =
        students.filter(
            student =>
                student.status === "Fail"
        ).length;
    let classAverage = 0;
    if (students.length > 0) {
        const totalAverage =
            students.reduce(
                (sum, student) =>
                    sum + student.average,
                0
            );
        classAverage =
            totalAverage /
            students.length;
    }
    document.getElementById(
        "totalStudents"
    ).textContent =
        totalStudents;
    document.getElementById(
        "passedStudents"
    ).textContent =
        passedStudents;
    document.getElementById(
        "failedStudents"
    ).textContent =
        failedStudents;
    document.getElementById(
        "classAverage"
    ).textContent =
        classAverage.toFixed(2) + "%";
    const topPerformer =
        document.getElementById(
            "topPerformer"
        );
    if (topPerformer) {
        if (students.length === 0) {
            topPerformer.textContent =
                "--";
        }
        else {
            const topper =
                students.reduce(
                    (best, student) =>
                        student.average >
                        best.average
                            ? student
                            : best
                );
            topPerformer.innerHTML = `
                <span class="topper-name">
                    ${topper.name}
                </span>
                <small>
                    ${topper.average.toFixed(2)}%
                </small>
            `;
        }
    }
}
function filterRecords() {
    renderTable();
}
function downloadCSV() {
    if (students.length === 0) {
        alert(
            "No student records available to download."
        );
        return;
    }
    let csvContent =
        "Name,Maths,Physics,Chemistry,English,Hindi,Telugu,Total,Average,Grade,Status\n";
    students.forEach(student => {
        const safeName =
            student.name.replace(
                /"/g,
                '""'
            );
        csvContent +=
            `"${safeName}",` +
            student.marks.join(",") +
            "," +
            student.total +
            "," +
            student.average.toFixed(2) +
            "," +
            student.grade +
            "," +
            student.status +
            "\n";
    });
    const blob =
        new Blob(
            [csvContent],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );
    const url =
        URL.createObjectURL(blob);
    const link =
        document.createElement("a");
    link.href =
        url;
    link.download =
        "student_grade_records.csv";
    document.body.appendChild(
        link
    );
    link.click();
    document.body.removeChild(
        link
    );
    URL.revokeObjectURL(
        url
    );
}
function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}
function clearForm() {
    document.getElementById(
        "name"
    ).value = "";
    const inputIds = [
        "maths",
        "physics",
        "chemistry",
        "english",
        "hindi",
        "telugu"
    ];
    inputIds.forEach(id => {
        document.getElementById(
            id
        ).value = "";
    });
}
document.addEventListener(
    "DOMContentLoaded",
    function () {
        renderTable();
        updateDashboard();
    }
);
