console.log("JS Loaded");

let editIndex = -1;

const form = document.getElementById("inputForm");
const studentList = document.getElementById("studentList")

// Load students from localStorage or initialize empty array

let students = JSON.parse(localStorage.getItem("students")) || [] ;

// Function to render all students in table
function renderStudents (){
    studentList.innerHTML ="";

    students.forEach((student, index) => {
        const row = `
             <tr>
                <td>${student.studentName}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        studentList.innerHTML += row;
    });
    localStorage.setItem("students", JSON.stringify(students));

    const displaySection = document.querySelector(".display-section");

    if (students.length > 5){
        displaySection.style.overflowY = "scroll";
    } else {
        displaySection.style.overflowY = "hidden";
    }

}

//function to add event listener for the form

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    // these lines check if the entered data is valid 

    const namePattern = /^[A-Za-z ]+$/;
    const idPattern = /^[0-9]+$/;
    const contactPattern = /^[0-9]{10,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //gives alerts iff data is wrong

    if (!studentName || !id || !email || !contact) {
        alert("All Fields are Required");
        return;
    }

    if (!namePattern.test(studentName)) {
        alert("Name should only contain letters");
        return;
    }

    if (!idPattern.test(id)) {
        alert("ID should only contain Numbers");
        return;
    }

    if (!contactPattern.test(contact)) {
        alert("Contact should atleast be 10 digits");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Should be a valid email address");
        return;
    }

    if (editIndex === -1) {
    students.push({ studentName, id, email, contact });
    } else {
    students[editIndex] = { studentName, id, email, contact };
    editIndex = -1;
}
    form.reset();
    renderStudents();
});

//function to delete student data


function deleteStudent(index) {
    students.splice(index, 1);
    renderStudents();

}


//functon to edit student data
function editStudent(index) {
    const student = students[index];

    document.getElementById("studentName").value = student.studentName;
    document.getElementById("studentID").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    editIndex = index;
}


renderStudents();