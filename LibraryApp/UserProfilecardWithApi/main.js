function createEmployeeCard(user) {
  let innerFlex = document.createElement("div");
  innerFlex.classList.add(
    "d-flex",
    "align-items-center",
    "col-md-7",
    "col-10",
    "bg-white",
    "m-1"
  );

  let cardDiv = document.createElement("div");
  innerFlex.append(cardDiv);
  cardDiv.classList.add("d-flex", "col-12", "profile-card");

  //*** 左半分 ***
  let leftInfo = document.createElement("div");
  leftInfo.classList.add("col-8", "py-3");
  let div1 = document.createElement("div");
  div1.classList.add("py-2");

  let nameTitle = document.createElement("h4");
  nameTitle.innerHTML = user.firstName + " " + user.lastName;

  let siteP = document.createElement("p");
  let birthdayP = document.createElement("p");
  let occupationP = document.createElement("p");
  let bioP = document.createElement("p");
  let skillsP = document.createElement("p");
  siteP.innerHTML = `Site: ${user.site}`;
  birthdayP.innerHTML = `Birthday: ${user.birthday}`;
  occupationP.innerHTML = `Occupation: ${user.occupation}`;
  bioP.innerHTML = `Biography: ${user.bio}`;
  skillsP.innerHTML = `Skill set: ${user.skills.join(",")}`;
  div1.append(siteP, birthdayP, occupationP, bioP, skillsP);

  leftInfo.append(div1);
  //*** 左半分 ***

  //*** 右半分 ***
  let rightInfo = document.createElement("div");
  rightInfo.classList.add(
    "col-4",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  let avatarDiv = document.createElement("div");
  avatarDiv.classList.add(
    "col-12",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  let avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src =
    "https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png";
  avatarDiv.append(avatar);
  rightInfo.append(avatarDiv);

  //*** 右半分終了 ***

  cardDiv.append(leftInfo);
  cardDiv.append(rightInfo);

  return innerFlex;
}

const URL = "https://api.recursionist.io/random-user";
fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("target").append(createEmployeeCard(data));
  });

const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("target").append(createEmployeeCard(data));
    });
});
