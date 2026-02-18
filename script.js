const form = document.getElementById("inputForm");
const studentList = document.getElementById("studentList")

let students = JSON.parse(localStorage.getItem("students")||[]);

function renderStudents (){
    studentList.innerHTML ="";

    students.forEach((student, index) => {
        const row = `
             <tr>
                <td>${student.name}</td>
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

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const studentName = document.getElementById("studentName").value.trim;
    const id = document.getElementById("studentID").value.trim;
    const email = document.getElementById("email").value.trim;
    const contact = document.getElementById("contact").value.trim;

    const namePattern = /^[A-Za-z ]+$/;
    const idPattern = /^[0-9]+$/;
     const contactPattern = /^[0-9]{10,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!studentName || !id || !email || contact ){
        alert("All Fields are Required");
        return;
    }

    if (!namePattern.test(studentName)){
        alert("Name should only contain letters");
        return;
    }

    if (!idPattern.test(studentID)){
        alert("ID should only contain Numbers");
        return;
    }

    if (!contactPattern.test(contact)){
        alert("Contact should atleast be 10 digits");
        return;
    }

    if (!emailPattern.test(email)){
        alert("Should be a valid email address");
        return;
    }






    students.push({studentName, id, email, contact});
    form.reset();
    renderStudents();

});

function deleteStudent() {
    students.splice(index, 1);
    renderStudents();
}

function editStudent() {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    students.splice(index, 1);
    renderStudents();

}

renderStudents();