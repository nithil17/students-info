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
}