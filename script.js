function calculateGrade() {

    let name = document.getElementById("name").value;

    let maths = parseInt(document.getElementById("maths").value);
    let physics = parseInt(document.getElementById("physics").value);
    let chemistry = parseInt(document.getElementById("chemistry").value);
    let english = parseInt(document.getElementById("english").value);
    let hindi = parseInt(document.getElementById("hindi").value);
    let telugu = parseInt(document.getElementById("telugu").value);

    if (
        name === "" ||
        isNaN(maths) ||
        isNaN(physics) ||
        isNaN(chemistry) ||
        isNaN(english) ||
        isNaN(hindi) ||
        isNaN(telugu)
    ) {
        alert("Please enter all details");
        return;
    }

    if (
        maths < 0 || maths > 100 ||
        physics < 0 || physics > 100 ||
        chemistry < 0 || chemistry > 100 ||
        english < 0 || english > 100 ||
        hindi < 0 || hindi > 100 ||
        telugu < 0 || telugu > 100
    ) {
        alert("Marks should be between 0 and 100");
        return;
    }

    let total = maths + physics + chemistry + english + hindi + telugu;
    let average = total / 6;

    let grade = "";

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

    let status = average >= 50 ? "Pass" : "Fail";

    document.getElementById("result").innerHTML = `
        <h3>Student Result</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Total:</b> ${total}</p>
        <p><b>Average:</b> ${average.toFixed(2)}%</p>
        <p><b>Grade:</b> ${grade}</p>
        <p><b>Status:</b> ${status}</p>
    `;

    let table = document.querySelector("#studentTable tbody");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = total;
    row.insertCell(2).innerHTML = average.toFixed(2) + "%";
    row.insertCell(3).innerHTML = grade;
    row.insertCell(4).innerHTML = status;

    row.insertCell(5).innerHTML =
        '<button class="delete-btn" onclick="deleteRow(this)">Delete</button>';

    document.getElementById("name").value = "";
    document.getElementById("maths").value = "";
    document.getElementById("physics").value = "";
    document.getElementById("chemistry").value = "";
    document.getElementById("english").value = "";
    document.getElementById("hindi").value = "";
    document.getElementById("telugu").value = "";
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
}