// utility classes
const validateUrl = (URL) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    URL
  );
};

const getElementFromString = (string) => {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
};

// show alert box
const alertBox = document.querySelector(".alert-box");
const showAlert = (msg) => {
  alertBox.classList.add("active");
  alertBox.innerText = msg;
  setTimeout((e) => {
    alertBox.classList.remove("active");
    alertBox.innerText = "";
  }, 5000);
};

// adding params
const paramsCont = document.querySelector(".key-params");
let paramsConter = 1;
const addParamBtn = document.querySelector(".add-params-btn");
addParamBtn.onclick = (e) => {
  let string = `
    <div class="input-group mb-2">
        <input type="text" class="form-control rounded" id="parameterKey${paramsConter}" placeholder="Enter the Key ${
    paramsConter + 1
  }">
        <input type="text" class="form-control rounded" id="parameterValue${paramsConter}" placeholder="Enter the Value ${
    paramsConter + 1
  }">
        <button type="button" class="btn btn-danger rounded delete-params-btn" title="Delete This param"><i class="fa fa-trash"></i></button>
    </div>
`;
  let div = getElementFromString(string);
  paramsCont.appendChild(div);
  paramsConter = paramsConter + 1;

  // deleting params
  let delParamBtn = document.querySelectorAll(".delete-params-btn");

  delParamBtn.forEach((btn, index) => {
    btn.onclick = (e) => {
      let test = document.getElementById(`key-params-${index}`);
      e.target.parentElement.remove();
    };
  });
};

// postmonter from
const postmonsterForm = document.querySelector(".postmonter-from");
let url = document.querySelector(".url");

let contentType;

document.querySelector("#params-tab").onclick = (e) => {
  contentType = "params";
};

document.querySelector("#json-tab").onclick = (e) => {
  contentType = "json";
};

postmonsterForm.onsubmit = (e) => {
  e.preventDefault();
  let value = url.value;
  // if (validateUrl(value) == false) showAlert("ERROR! Enter a valid URL.");
  // if (value == "") showAlert("This feild can't be empty.");

  let requestType;

  let options = document.querySelectorAll("option");
  options.forEach((option) => {
    if (option.selected == true) {
      requestType = option.value;
    }
  });

  if (contentType == "params") {
    let data = {};
    for (let i = 0; i < paramsConter + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }

  // if the request type is get, invoke fetch api to create a post request
  if (requestType == "GET" && validateUrl(value) == true && value != "") {
    responsePrism.innerText = "Fetching Data....";

    fetch(value, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        responsePrism.innerText = JSON.stringify(data);
        console.log(data);
        Prism.highlightAll();
      })
      .catch((err) => {
        showAlert(`Failed to fetch the ${value}`);
        responsePrism.innerText = `Failed to fetch the ${value}`;
        console.error(err);
      });
  } else {
    fetch(value, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        responsePrism.innerText = JSON.stringify(data);
        console.log(data);
        Prism.highlightAll();
      })
      .catch((err) => {
        showAlert(`Failed to fetch the ${value}`);
        responsePrism.innerText = `Failed to fetch the ${value}`;
        console.error(err);
      });
  }

  console.log(`Fetching ${value}`);
};
