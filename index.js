const submitHandler = (event) => {
  event.preventDefault();
  //   const parkName = document.querySelector("#name-input").value;

  // The new FormData variable needs to have the form either by id
  // class or perhaps some other way to grab the form its self.
  // I created a varibale assinged to the form id selector and then
  // passed that varible to the new FormData() to make this work.
  const form = document.querySelector("#park-form");
  const formData = new FormData(form);

  const errors = validateForm(formData);

  const errorElements = document.querySelectorAll(".error");
  for (let element of errorElements) {
    element.style.display = "none";
  }

  Object.keys(errors).forEach((key) => {
    const errorElement = document.querySelector(`#${key}-form .error`);
    errorElement.innerHTML = errors[key];
    errorElement.style.display = "block";
  });

  if (!Object.keys(errors).length) {
    // Create a new element
    const parkSection = document.createElement("section");

    // Add the park class
    parkSection.classList.add("park-display");

    // Construct the HTML for this element
    const content = `
          <h2>${formData.get("name")}</h2>
          <div class="location-display">${formData.get("location")}</div>
          <div class="description-display">${formData.get("description")}</div>
          <button class="rate-button" title="Add to Favourites">&#9734;</button>
          <div class="stats">
            <div class="established-display stat">
              <h3>Established</h3>
              <div class="value">${moment(formData.get("established")).format(
                "MMMM D, YYYY"
              )}</div>
            </div>
            <div class="area-display stat">
              <h3>Area</h3>
              <div class="value">${formData.get("area")}</div>
            </div>
            <div class="rating-display stat">
              <h3>Rating</h3>
              <div class="value">${formData.get("rating")}</div>
            </div>
          </div>
          `;

    // Set the innerHTML
    parkSection.innerHTML = content;

    // Append to the main element
    document.querySelector("main").appendChild(parkSection);
  }
  // const name = formData.get("name");
  // const location = formData.get("location");
  console.log("The form was submitted");
};
// When this main function is called a variable
// is assinged a document.querySelector and then
// the variable is used in a .addEventListener for a
// click and the submit handler function is called
// apon click.
const main = () => {
  const form = document.querySelector("#add-button");

  form.addEventListener("click", submitHandler);
};
window.addEventListener("DOMContentLoaded", main);

function validateExists(value) {
  return value && value.trim();
}
function validateNumber(value) {
  return !isNaN(value);
}

function validateRange(value, min, max) {
  return value >= min && value <= max;
}

function validateForm(formData) {
  const errors = {};

  if (!validateExists(formData.get("name"))) {
    errors.name = "Please enter a name";
  }
  if (!validateExists(formData.get("rating"))) {
    errors.rating = "Please enter a rating";
  } else {
    // Check if the rating is a number
    if (!validateNumber(formData.get("rating"))) {
      errors.rating = "Rating must be a number";
    } else {
      // Because it is a number, convert it
      const rating = Number.parseFloat(formData.get("rating"));
      // Check that the rating is between 1 and 5, inclusive
      if (!validateRange(rating, 1, 5)) {
        errors.rating = "Rating must be between 1 and 5 inclusive";
      }
    }
  }
  if (!validateExists(formData.get("description"))) {
    errors.description = "Please enter a shot description";
  }
  if (!validateExists(formData.get("established"))) {
    errors.established = "Please enter date";
  }
  if (!validateExists(formData.get("area"))) {
    errors.area = "Please enter the area of the park";
  }
  if (!validateExists(formData.get("location"))) {
    errors.location = "Please enter the location of the park";
  }
  return errors;
}
