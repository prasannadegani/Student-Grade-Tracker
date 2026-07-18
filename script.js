let students = [];

function calculateGrade() {
    let name = document.getElementById("name").value.trim();

    let maths = Number(document.getElementById("maths").value);
    let physics = Number(document.getElementById("physics").value);
    let chemistry = Number(document.getElementById("chemistry").value);
    let english = Number(document.getElementById("english").value);
    let hindi = Number(document.getElementById("hindi").value);
    let telugu = Number(document.getElementById("telugu").value);

    let inputs = [
        document.getElementById("maths").value,
        document.getElementById("physics").value,
        document.getElementById("chemistry").value,
        document.getElementById("english").value,
        document.getElementById("hindi").value,
        document.getElementById("telugu").value
    ];

    if (name === "" || inputs.some(value => value === "")) {
        alert("Please enter student name and all subject marks.");
        return;
    }

    let marks = [
        maths,
        physics,
        chemistry,
        english,
        hindi,
        telugu
    ];

    if (marks.some(mark => mark < 0 || mark > 100)) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    let total =
        maths +
        physics +
        chemistry +
        english +
        hindi +
        telugu;

    let average = total / 6;

    let grade;

    if (average >= 90) {
        grade = "A+";
    } else if (average >= 80) {
        grade = "A";
    } else if (average >= 70) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    // Student fails if any subject mark is below 35
    let status = marks.every(mark => mark >= 35)
        ? "Pass"
        : "Fail";

    let student = {
        name: name,
        total: total,
        average: average,
        grade: grade,
        status: status
    };

    students.push(student);

    displayResult(student);

    addStudentToTable(student);

    updateDashboard();

    clearForm();
}


function displayResult(student) {

    document.getElementById("result").innerHTML = `
        <h3>Student Result</h3>

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

        <p>
            <strong>Status:</strong>
            ${student.status}
        </p>
    `;
}


function addStudentToTable(student) {

    let tableBody =
        document.querySelector("#studentTable tbody");

    let row = tableBody.insertRow();

    row.innerHTML = `
        <td>${student.name}</td>

        <td>
            ${student.total}/600
        </td>

        <td>
            ${student.average.toFixed(2)}%
        </td>

        <td>
            <strong>${student.grade}</strong>
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

        <td>
            <button
                class="delete-btn"
                onclick="deleteRow(this)"
            >
                Delete
            </button>
        </td>
    `;
}


function deleteRow(button) {

    let row = button.closest("tr");

    let rowIndex = row.rowIndex - 1;

    students.splice(rowIndex, 1);

    row.remove();

    updateDashboard();
}


function clearAllRecords() {

    if (students.length === 0) {
        alert("No student records to clear.");
        return;
    }

    let confirmClear =
        confirm("Are you sure you want to clear all records?");

    if (!confirmClear) {
        return;
    }

    students = [];

    document.querySelector(
        "#studentTable tbody"
    ).innerHTML = "";

    document.getElementById("result").innerHTML =
        "<p>No result calculated yet.</p>";

    updateDashboard();
}


function updateDashboard() {

    let totalStudents = students.length;

    let passedStudents =
        students.filter(
            student => student.status === "Pass"
        ).length;

    let failedStudents =
        students.filter(
            student => student.status === "Fail"
        ).length;

    let classAverage = 0;

    if (students.length > 0) {

        let totalAverage =
            students.reduce(
                (sum, student) =>
                    sum + student.average,
                0
            );

        classAverage =
            totalAverage / students.length;
    }

    document.getElementById(
        "totalStudents"
    ).textContent = totalStudents;

    document.getElementById(
        "passedStudents"
    ).textContent = passedStudents;

    document.getElementById(
        "failedStudents"
    ).textContent = failedStudents;

    document.getElementById(
        "classAverage"
    ).textContent =
        classAverage.toFixed(2) + "%";
}


function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("maths").value = "";
    document.getElementById("physics").value = "";
    document.getElementById("chemistry").value = "";
    document.getElementById("english").value = "";
    document.getElementById("hindi").value = "";
    document.getElementById("telugu").value = "";
}