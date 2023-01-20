class Employee {
  constructor(firstName, lastName, job, skills, country, avatarUrl) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.job = job;
    this.skills = skills;
    this.country = country;
    this.avatarUrl = avatarUrl;
  }
  getFullName() {
    return this.firstName + this.lastName;
  }
}
function getAttributeDiv(property, value) {
  const div = document.createElement("div");
  div.classList.add("py-2");
  const propertyP = document.createElement("p");
  propertyP.innerHTML = property;
  const valueP = document.createElement("p");
  valueP.innerHTML = value;
  div.append(propertyP, valueP);
  return div;
}

function createEmployeeCard(employee) {
  const whiteBg = document.createElement("div");
  whiteBg.classList.add(
    "d-flex",
    "align-items-center",
    "col-md-7",
    "col-10",
    "m-1"
  );
  const profileCard = document.createElement("div");
  profileCard.classList.add("d-flex", "col-12");
  const leftDiv = document.createElement("div");
  leftDiv.classList.add("col-8", "py-3");

  const rightDiv = document.createElement("div");
  rightDiv.classList.add(
    "col-4",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
}
let employee1 = new Employee(
  "Kaiden",
  "Herman",
  "Software Engineer",
  "C++, C#, Java, PHP, JavaScript, Python",
  "United States",
  "https://pbs.twimg.com/profile_images/501759258665299968/3799Ffxy.jpeg"
);
let employee2 = new Employee(
  "Elizabeth",
  "Dunn",
  "Accountant",
  "Excel, Word, Quickbooks",
  "England",
  "https://randomuser.me/api/portraits/women/76.jpg"
);
let employee3 = new Employee(
  "Duan",
  "Moreno",
  "Teacher",
  "Working with children, History, Word",
  "Argentina",
  "https://randomuser.me/api/portraits/med/men/93.jpg"
);
employees = [employee1, employee2, employee3];
