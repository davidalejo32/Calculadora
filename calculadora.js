let buttons = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", ".", "=", "/"];

function renderGUI() {
  // calc container
  const divCalc = document.createElement("div");
  divCalc.setAttribute("id", "calc-container");
  divCalc.setAttribute(
    "class",
    "text-center w-50 position-absolute top-50 start-50 translate-middle"
  );
  document.body.appendChild(divCalc);

  // calc display
  const calcDis = document.createElement("div");
  calcDis.setAttribute("id", "calcDis");
  divCalc.appendChild(calcDis);

  // calc display input

  const calcDisInput = document.createElement("input");
  calcDisInput.setAttribute("id", "calcDisInput");
  calcDisInput.setAttribute("type", "text");
  calcDisInput.setAttribute("value", "0");
  calcDisInput.setAttribute("disabled", "true");
  calcDisInput.setAttribute("class", "form-control text-end form-control-lg");
  calcDisInput.setAttribute(
    "style",
    "margin-bottom: 10px; height: 80px; font-size: 2rem;"
  );
  calcDis.appendChild(calcDisInput);

  // calc buttons container
  const calcButtons = document.createElement("div");
  calcButtons.setAttribute("id", "calcButtons");
  divCalc.appendChild(calcButtons);

  // buttons
  buttons.forEach((el, indx) => {
    // crear filas,
    if (indx % 4 === 0) {
      const divFila = document.createElement("div");
      divFila.setAttribute("class", "row");
      calcButtons.appendChild(divFila);
    }

    const button = document.createElement("button");
    button.setAttribute("id", `button-${el}`);
    button.setAttribute("class", "btn btn-dark col-3 border-white ");
    button.setAttribute(
      "style",
      "--bs-btn-padding-y: 1rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: 2rem"
    );
    button.innerHTML = el;
    divCalc.lastChild.appendChild(button);

    // eventos

    button.addEventListener("click", () => {
      procesarEvento(button);
    });
  });

  // button clear
  const buttonClear = document.createElement("button");
  buttonClear.setAttribute("id", "button-clear");
  buttonClear.setAttribute("class", "btn btn-dark col-12 border-white");
  buttonClear.setAttribute(
    "style",
    "--bs-btn-padding-y: .5rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: 2rem"
  );
  buttonClear.innerHTML = `C`;
  divCalc.appendChild(buttonClear);

  buttonClear.addEventListener("click", () => {
    calcDisInput.value = "0";
  });
}

function procesarEvento(button) {
  let display = document.getElementById("calcDisInput");

  if (display.value === "0") {
    display.value = "";
  }

  if (button.innerHTML != "=") {
    display.value += button.innerHTML;
  } else {
    // evaluar la expresion con math js  y mostrar el valor en pantalla

    try {
      let result = math.evaluate(display.value);

      if (result === undefined) {
        display.value = "Por favor Ingresa algo";
      } else {
        display.value = result;
      }
    } catch (error) {
      display.value = `¡Ops! Algo salió mal: por favor revise su operación`;
    }
  }
}

renderGUI();
