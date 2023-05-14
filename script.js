const bodyEl = document.querySelector('body');

// create element function
const createElement = (childElName) => {
  return document.createElement(childElName);
};

// Append child to parent element function
const appendChild = (parent, childEl) => {
  return parent.appendChild(childEl);
};

// For create Attribute
const createAttribute = (attrName) => {
  return document.createAttribute(attrName);
};

bodyEl.classList.add("bg-dark", "bg-opacity-50");

// create a main element
const mainEl = createElement("main");
const mailElClass = ["container", "p-4"];
mainEl.classList.add(...mailElClass);
appendChild(bodyEl, mainEl);

// create a section element
const sectionEl = createElement("section");
const sectionElClass = ["bg-success", "shadow", "d-flex", "flex-column", "align-items-center", "gap-2", "rounded-3", "p-5"];
sectionEl.classList.add(...sectionElClass);
appendChild(mainEl, sectionEl);

// create a heading tag
const headingEl = createElement("h1");
const headingElClass = ["text-dark", "text-opacity-75"];
headingEl.classList.add(...headingElClass);
headingEl.innerHTML = 'JS Nationalize';
appendChild(sectionEl, headingEl);

// create a paragraph tag
const headingInfoEl = createElement("p");
const headingInfoElClass = [];
headingInfoEl.classList.add(...headingInfoElClass);
headingInfoEl.innerHTML = 'Predict the nationality of a name';
appendChild(sectionEl, headingInfoEl);

// create a input container
const inputContainer = createElement("div");
const inputContainerClass = ["p-3", "row", "col", "col-lg-6", "col-md-10", "col-sm-12", "col-xs-12"];
inputContainer.classList.add(...inputContainerClass);
appendChild(sectionEl, inputContainer);

// create a input element
const inputEl = createElement("input");
const inputElClass = ["form-control"];
inputEl.classList.add(...inputElClass);
inputEl.placeholder = "Enter your name";
appendChild(inputContainer, inputEl);

// create a button
const buttonEl = createElement("button");
const buttonElClass = ["btn", "btn-primary"];
buttonEl.classList.add(...buttonElClass);
buttonEl.innerHTML = "Get Probability";
buttonEl.setAttribute("onclick", "getProbability()");
appendChild(sectionEl, buttonEl);

// Add data-* attribute to this button
const nodeMap = buttonEl.attributes;
const attrName = ['data-bs-toggle', 'data-bs-placement', 'data-bs-title', 'data-bs-content'];
// 1) Toggle node
const toggleNode = createAttribute(attrName[0]);
toggleNode.value = "popover";
nodeMap.setNamedItem(toggleNode);
// 2) Placement node
const placementNode = createAttribute(attrName[1]);
placementNode.value = "bottom";
nodeMap.setNamedItem(placementNode);
// 3) Title node
const titleNode = createAttribute(attrName[2]);
titleNode.value = "Type any name...";
nodeMap.setNamedItem(titleNode);
// 4) Content node
const contentNode = createAttribute(attrName[3]);
contentNode.value = "Without query you can't get any result";
nodeMap.setNamedItem(contentNode);

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));


const getProbability = async () => {
  const apiURI = `https://api.nationalize.io/?name=${inputEl.value}`;
  // console.log(apiURI);
  // console.log(inputEl.value);

  try {
    const res = await fetch(apiURI);
    const data = await res.json();
    // console.log(data);

    // Find the last object in an array of objects
    // console.log(data.country.splice(-1));
    const lastEl = data.country.slice(-1);
    // console.log(lastEl[0].country_id);

    let probability = [];

    data.country.forEach(country => {
      probability.push(country.probability);
    });
    // console.log(probability);

    // Find the largest value in an array of object
    const largest = probability.reduce((previousValue, currentValue) =>
      previousValue > currentValue ? previousValue : currentValue
    );

    // Find the smallest value in an array of object
    const smallest = probability.reduce((previousValue, currentValue) =>
      previousValue < currentValue ? previousValue : currentValue
    );
    // console.log(largest);
    // console.log(smallest);

    // Manipulate Popover items
    const popOver = document.querySelector('.popover');

    const popOverHeader = document.querySelector('.popover-header');
    popOverHeader.innerHTML = "Probability";
    popOverHeader.classList.add("text-center");

    const popOverBody = document.querySelector('.popover-body');
    popOverBody.innerHTML = `${data.country[0].country_id} ${largest} | ${lastEl[0].country_id} ${smallest}`;

    // Clear the input field
    inputEl.value = "";

    // Remove the popover after some delay
    setTimeout(() => {
      popOver.classList.remove('show');
    }, 1250);

  } catch (err) {
    console.log(err.message);
  }

};




// const getProbability = (e) => {
//   console.log(e);
//   console.log("Getting");
// };

// approach 1
// const array1 = [0.5, 0.12, 0.8, 1.30, 4.4];

// const found = array1.find(element => element > 1.0);

// console.log(found);
// Expected output: 12

// approach 2
// const inventory = [
//   { name: "apples", quantity: 2 },
//   { name: "bananas", quantity: 0 },
//   { name: "cherries", quantity: 5 },
// ];

// function isCherries(fruit) {
//   return fruit.name === "cherries";
// }

// console.log(inventory.find(isCherries));
// { name: 'cherries', quantity: 5 }

// function isHighProbability(el) {
    // console.log(el.probability);
  //   return el.probability < 0.040;
  // }

  // const result = data.country.find(isHighProbability);
  // console.log(result);

// function findBiggestFraction(a, b) {
//   var result;
//   a > b ? result = ["firstFraction", a] : result = ["secondFraction", b];
//   return result;
// }

// var firstFraction = 3 / 4;
// var secondFraction = 5 / 7;

// console.log(findBiggestFraction(firstFraction, secondFraction));

// //or the same but in variable:
// var fractionResult = findBiggestFraction(firstFraction, secondFraction);
// console.log(fractionResult);

// console.log("First fraction result: ", firstFraction);
// console.log("Second fraction result: ", secondFraction);

// console.log("Fraction " + fractionResult[0] + " with the value of " + fractionResult[1] + " is the biggest");
