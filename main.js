const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");
const addUserForm = document.getElementById("add-user-form");
const userList = document.getElementById("user-list");

let allUsers = JSON.parse(localStorage.getItem("Users")) || [];

function renderUsers() {
  userList.innerHTML = "";

  //show all users
  allUsers.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
                    <p>Username: ${user.username}</p>
                    <p>Phone: ${user.phoneNumber}</p>
                    <p>Status: ${user.status}</p>
                    <button data-index="${allUsers.indexOf(user)}">${
      user.status === "active" ? "inactive" : "active"
    }</button>
                `;
    userDiv.classList.add("user");
    if (user.status === "inactive") userDiv.classList.add("inactive");
    //add the users to div
    userList.appendChild(userDiv);

    // add event to button
    const toggleButton = userDiv.querySelector("button");
    toggleButton.addEventListener("click", () => {
      if (user.status === "active") {
        user.status = "inactive";
      } else {
        user.status = "active";
      }
      localStorage.setItem("Users", JSON.stringify(allUsers));
      renderUsers();
    });
  });
}

renderUsers();

const formSubmitHandler = (e) => {
  e.preventDefault();

  // create user
  const newUser = {
    username: usernameInput.value,
    phoneNumber: phoneInput.value,
    status: "active",
  };

  //add it and show it again
  allUsers.push(newUser);
  localStorage.setItem("Users", JSON.stringify(allUsers));
  renderUsers();

  // clear up
  usernameInput.value = "";
  phoneInput.value = "";
};

addUserForm.addEventListener("submit", formSubmitHandler);
