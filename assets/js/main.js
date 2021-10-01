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
let paramData = {};
let headerData = {};

// adding params
addParamBtn.onclick = (e) => {
  paramIndex++;
  const paramEle = `
      <input type="text" class="form-control rounded param-key" id="key-params-value-${paramIndex}" placeholder="Enter the Key ${paramIndex}">
      <input type="text" class="form-control rounded param-value" id="value-params-value-${paramIndex}" placeholder="Enter the Value ${paramIndex}">
      <button class="btn btn-danger remove-params-btn rounded" id="remove-params-btn-${paramIndex}">
          <i class="fa fa-trash"></i>
      </button>
  `;
  const param = document.createElement("div");
  param.setAttribute("class", "key-params input-group mb-2");
  param.innerHTML = paramEle;
  paramsContainer.appendChild(param);
  removeParam.push(grabEle(`#remove-params-btn-${paramIndex}`));
  removeParam.forEach(
    (btn) => (btn.onclick = (e) => e.target.parentElement.remove())
  );
};

// adding header
addHeaderBtn.onclick = (e) => {
  headerIndex++;
  const headerEle = `
      <input type="text" class="form-control rounded header-key" id="header-key-${headerIndex}" placeholder="Enter Header Key ${headerIndex}" />
      <input type="text" class="form-control rounded header-value" id="header-value-${headerIndex}" placeholder="Enter Header Value ${headerIndex}" />
      <button class="btn btn-danger remove-header-btn rounded" id="remove-params-btn-${headerIndex}">
          <i class="fa fa-trash"></i>
      </button>
  `;
  const header = document.createElement("div");
  header.setAttribute("class", "header-params input-group mb-2");
  header.innerHTML = headerEle;
  headerContainer.appendChild(header);
  removeHeader.push(grabEle(`#remove-params-btn-${headerIndex}`));
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
    headerData = [...grabAll(".header-params")].reduce((data, item) => {
      const key = item.querySelector(".header-key").value;
      const value = item.querySelector(".header-value").value;
      if (key === "") return data;
      return { ...data, [key]: value };
    }, {});
  }
  if (contentTypeValue == "Params") {
    paramData = [...grabAll(".key-params")].reduce((data, item) => {
      const key = item.querySelector(".param-key").value;
      const value = item.querySelector(".param-value").value;
      if (key === "") return data;
      return { ...data, [key]: value };
    }, {});
  }

  if (validateUrl(url.value)) {
    preview.innerText = "Fetching your response....";
    let option = grabEle("option:checked");
    let method = option.value;
    let json = grabEle("#requestJsonText");
    let jsonData = json.value;
    console.log(`Fetching ${url.value} wit ${method} method.`);
    console.log({
      url: url.value,
      method,
      params: paramData,
      headers: headerData,
      data: jsonData,
    });
    axios({
      url: url.value,
      method,
      params: paramData,
      headers: headerData,
      data: jsonData,
    })
      .then((data) => {
        let res = JSON.stringify(data);
        console.log(data);
        preview.innerText = res;
        Prism.highlightAll();
      })
      .catch((e) => {
        preview.innerText = `Can't fetch ${url.value}. Check console for more information.`;
        showAlert(
          `Can't fetch ${url.value}. Check console for more information.`
        );
        console.log(e);
      });
  } else {
    showAlert("Your link is not valid.");
    url.value = "";
  }
};
