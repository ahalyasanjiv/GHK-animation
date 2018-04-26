function makeLayout() {
  // Make the entire stage. This represents the entire, outer box containing the simulator, sidebar, and controls.
  stage = createDiv('');
  stage.id('stage');
  stage.class('flex-container');
  stage.size(windowWidth, windowHeight);
  // stage.style('background-color',color(0));

  // The right sidebar for displaying questions.
  leftBox = createDiv("");
  leftBox.id('leftbar');
  leftBox.parent('stage');
  leftBox.size(0.25 * windowWidth, windowHeight - 8);  // subtract stage 4px border from top and bottom to remove scrollbars in the parent iframe. (so, 8px total)

  // Create the div to actually contain the questions.
  questions = createDiv("");
  questions.id('questionsdiv');
  questions.parent('leftbar');
  questions.size(0.25 * windowWidth, windowHeight - 8);
  createElement("h3", "Questions").parent('questionsdiv');

  var questions
  function httpGet(theUrl){
    if (window.XMLHttpRequest) {
        xmlhttp=new XMLHttpRequest();
    } else {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            questions = xmlhttp.responseText.split("\n").slice(0, 10);
        }
    }
    xmlhttp.open("GET", theUrl, false);
    xmlhttp.send();
  }
  text_url = "https://raw.githubusercontent.com/alexmat2on/bioanimation/master/js/questions.txt?token=AIFGvR-d8l4EIi7O2kck0gS_llf5KrSLks5a42aZwA%3D%3D";
  httpGet(text_url);

    var qmax = questions.length - 1;
    var q = 0;
    var question = createElement("p",questions[q]).parent('questionsdiv');
    question.class("questions");
    question.id("q1");


    questionBotton = createDiv("");
    questionBotton.id('questionBotton');
    questionBotton.class('questionButton');
    questionBotton.parent('questionsdiv');

    questionNext = createButton('Previous');
    questionNext.id('questionPrev');
    questionNext.parent('questionBotton');
    questionNext.size(leftBox.size().width, 0.075 * leftBox.size().height);
    questionNext.mousePressed(quesPrev);
    document.getElementById("questionPrev").style.display= "none";

    questionPrev = createButton('Next');
    questionPrev.id('questionNext');
    questionPrev.parent('questionBotton');
    questionPrev.size(leftBox.size().width, 0.075 * leftBox.size().height);
    questionPrev.mousePressed(quesNext);


    function quesNext(evt) {
      if (q>=qmax-1) {
        //alert(q+" "+qmax)
        document.getElementById("questionNext").style.display= "none";
        q = qmax;
      } else {
      q = q+1;
          document.getElementById("questionPrev").style.display= "";
        }
          document.getElementById("q1").innerHTML = questions[q];
    }

    function quesPrev(evt) {
      if (q<=1) {
        document.getElementById("questionPrev").style.display= "none";
        q = 0;
      } else {
      q = q-1;
          document.getElementById("questionNext").style.display= "";
        }
          document.getElementById("q1").innerHTML = questions[q];
    }
  // for (var i=0; i<questions.length; i++){
  //   var q = questions[i];
  //   var question = createElement("p",q).parent('questionsdiv');
  //   question.class("questions");
  //   question.id("q" + (i+1));
  // }
  // single_question.id("q0");
  // single_question.parent('questionsdiv');


  // Div to contain the equation
  equation = createDiv("");
  equation.id('equationdiv');
  equation.parent('leftbar');
  equation.size(leftBox.size().width, 0.20 * leftBox.size().height);

  makeNeqMML();

  simulator = createDiv("");
  simulator.id('sim');
  simulator.parent('stage');
  simulator.size(0.75 * windowWidth, windowHeight - 8);

  // Define the global canWidth & canHeight variables~
  canWidth = simulator.size().width;
  canHeight = 0.75 * (simulator.size().height - 8);

  // Now to create the canvas!!
  canvas = createCanvas(canWidth, canHeight);
  canvas.class('can');
  canvas.parent('sim');

  simulatorInput = createDiv('');
  simulatorInput.id('simInput');
  simulatorInput.parent('sim');
  simulatorInput.size(canWidth, 0.25 * canHeight);

  //Control UI ----------------------------
  controlsLeft = createDiv('');
  controlsLeft.class('controls');
  controlsLeft.parent('simInput');
  controlsLeft.size(canWidth / 2, 0.25 * canHeight);

  controlsRight = createDiv('');
  controlsRight.class('controls');
  controlsRight.parent('simInput');
  controlsRight.size(canWidth / 2, 0.25 * canHeight);

  control0 = createDiv('');
  control0.class('control');
  control0.parent(controlsLeft);

  control1 = createDiv('');
  control1.class('control');
  control1.parent(controlsLeft);

  control2 = createDiv('');
  control2.class('control');
  control2.parent(controlsLeft);

  control3 = createDiv('');
  control3.class('control');
  control3.parent(controlsRight);

  control4 = createDiv('');
  control4.class('control');
  control4.parent(controlsRight);

  control5 = createDiv('');
  control5.class('control');
  control5.parent(controlsRight);

  particleControl = createDiv('');
  particleControl.id('particleControl');
  particleControl.parent('sim');
  particleControl.size(canWidth, 0.1 * canHeight);
}

function makeNeqMML() {
  math = createElement("math");
  math.attribute("xmlns", "http://www.w3.org/1998/Math/MathML");
  math.id('math');
  math.parent('equationdiv');

  msub0 = createElement("msub");
  msub0.id('msub0');
  msub0.parent('math');

  mi0 = createElement("mi", "V");
  mi0.parent("msub0");

  mi1 = createElement("mi", "rest");
  mi1.parent("msub0");

  eqSign = createElement("mo", "=");
  eqSign.parent("math");

  // -------------------------------------
  // RT/F
  mrow1 = createElement("mrow");
  mrow1.id("mrow1");
  mrow1.parent("math");

  mfrac0 = createElement("mfrac");
  mfrac0.id("mfrac0");
  mfrac0.parent("mrow1");

  mi2 = createElement("mi", "RT");
  mi2.parent("mfrac0");

  mrow2 = createElement("mrow");
  mrow2.id("mrow2");
  mrow2.parent("mfrac0");

  mi3 = createElement("mi", "F");
  mi3.parent("mrow2");

  // -------------------------------------
  mi4 = createElement("mi", "ln");
  mi4.parent("math");

    // -------------------------------------
  mrow3 = createElement("mrow");
  mrow3.id("mrow3");
  mrow3.parent("math");

  mfrac1 = createElement("mfrac");
  mfrac1.id("mfrac1");
  mfrac1.parent("mrow3");

  mrow4 = createElement("mrow");
  mrow4.id("mrow4");
  mrow4.parent("mfrac1");


  // -------------------------------------
  //Top

  msub1 = createElement("msub");
  msub1.id("msub1");
  msub1.parent("mrow4");

  mi6= createElement("mi", "P");
  mi6.parent("msub1");

  mi7 = createElement("mi", "K");
  mi7.parent("msub1");

  mi8 = createElement("mi", "[N");
  mi8.parent("mrow4");

  msup0 = createElement("msup");
  msup0.id("msup0");
  msup0.parent("mrow4");

  mi9 = createElement("mi", "a");
  mi9.parent("msup0");
  mo10 = createElement("mi", "+");
  mo10.parent("msup0");

  msub2 = createElement("msub");
  msub2.id("msub2");
  msub2.parent("mrow4");
  mo11 = createElement("mo", "]");
  mo11.parent("msub2");
  mi12 = createElement("mi", "out");
  mi12.parent("msub2");

  // -------------------------------------
  //Bottom
  mi5 = createElement("mi", "Bottom");
  mi5.parent("mfrac1");
}
