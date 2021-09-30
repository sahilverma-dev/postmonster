// important functions
const grabEle = (e) => document.querySelector(e);
const grabAll = (e) => document.querySelectorAll(e);
const validateUrl = (URL) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    URL
  );
};
// show alert box
const alertBox = grabEle(".alert-box");
const showAlert = (msg) => {
  alertBox.classList.add("active");
  alertBox.innerText = msg;
  setTimeout((e) => {
    alertBox.classList.remove("active");
    alertBox.innerText = "";
  }, 5000);
};
// grabbing dom elements
const form = grabEle("form");
const url = grabEle(".url");
const preview = grabEle("#responsePrism");
const addParamBtn = grabEle(".add-params-btn");
const addHeaderBtn = grabEle(".add-header-btn");
const paramsContainer = grabEle(".key-params-container");
const headerContainer = grabEle(".header-params-container");
let paramIndex = 1;
let headerIndex = 1;
let removeParam = [];
let removeHeader = [];
let keyParam = [];
let valueParam = [];
let headerKey = [grabEle(`#header-key-1`)];
let headerValue = [grabEle(`#header-value-1`)];
let headerData = [];
// adding params
addParamBtn.onclick = (e) => {
  paramIndex++;
  const paramEle = `
    <div class="input-group mb-2">
        <input type="text" class="form-control rounded param-key" id="key-params-value-${paramIndex}" placeholder="Enter the Key ${paramIndex}">
        <input type="text" class="form-control rounded param-value" id="value-params-value-${paramIndex}" placeholder="Enter the Value ${paramIndex}">
        <button class="btn btn-danger remove-params-btn rounded" id="remove-params-btn-${paramIndex}">
            <i class="fa fa-trash"></i>
        </button>
    </div>
  `;
  const param = document.createElement("div");
  param.classList.add("key-params");
  param.innerHTML = paramEle;
  paramsContainer.appendChild(param);
  removeParam.push(grabEle(`#remove-params-btn-${paramIndex}`));
  keyParam.push(grabEle(`#key-params-value-${headerIndex}`));
  valueParam.push(grabEle(`#value-params-value-${headerIndex}`));
  removeParam.forEach(
    (btn) => (btn.onclick = (e) => e.target.parentElement.remove())
  );
};

// adding header
addHeaderBtn.onclick = (e) => {
  headerIndex++;
  const headerEle = `
        <div class="input-group mb-2">
            <input type="text" class="form-control rounded header-key" id="header-key-${headerIndex}" placeholder="Enter Header Key ${headerIndex}" />
            <input type="text" class="form-control rounded header-value" id="header-value-${headerIndex}" placeholder="Enter Header Value ${headerIndex}" />
            <button class="btn btn-danger remove-header-btn rounded" id="remove-params-btn-${headerIndex}">
                <i class="fa fa-trash"></i>
            </button>
        </div>
    </div>
  `;
  const header = document.createElement("div");
  header.classList.add("header-params");
  header.innerHTML = headerEle;
  headerContainer.appendChild(header);
  removeHeader.push(grabEle(`#remove-params-btn-${headerIndex}`));
  headerKey.push(grabEle(`#header-key-${headerIndex}`));
  headerValue.push(grabEle(`#header-value-${headerIndex}`));
  removeHeader.forEach(
    (btn) => (btn.onclick = (e) => e.target.parentElement.remove())
  );
};
// form on submit
form.onsubmit = (e) => {
  e.preventDefault();
  let contentType = grabEle(".nav-link.active");
  let contentTypeValue = contentType.innerText;
  if (contentTypeValue == "Headers") {
    grabAll(".header-key").forEach((item, i) => {
      if (headerKey[i].value != "" && headerValue[i].value != "") {
        headerData[i] = {
          key: headerKey[i].value,
          value: headerValue[i].value,
        };
      }
      // console.log(item.value);
    });
    console.log(headerData);
  }

  // if (validateUrl(url.value)) {
  //   preview.innerText = "Fetching your response....";
  //   let option = grabEle("option:checked");
  //   let method = option.value;
  //     if (method == "GET") {
  //       fetch(url.value)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           let res = JSON.stringify(data);
  //           console.log(contentTypeValue);
  //           preview.innerText = res;
  //           Prism.highlightAll();
  //         })
  //         .catch((err) => {});
  //     }
  //   } else {
  //     showAlert("Your link is not valid.");
  //     url.value = "";
  // }
};
