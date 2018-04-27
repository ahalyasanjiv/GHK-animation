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
  leftBox.size(0.35 * windowWidth, windowHeight - 8);  // subtract stage 4px border from top and bottom to remove scrollbars in the parent iframe. (so, 8px total)

  // Create the div to actually contain the questions.
  questions = createDiv("");
  questions.id('questionsdiv');
  questions.parent('leftbar');
  questions.size(0.35 * windowWidth, windowHeight - 8);
  createElement("h3", "Goldman-Hodgkin-Katz").parent('questionsdiv');

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
  
  // math1 = createElement("math");
  // math1.attribute("xmlns", "http://www.w3.org/1998/Math/MathML");
  // math1.id('math1');
  // math1.parent('equationdiv');
  // mi34 = createElement("mi", "Goldman-Hodgkin-Katz");
  // mi34.parent("math1");

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

  // Na+
  msub1 = createElement("msub");
  msub1.id("msub1");
  msub1.parent("mrow4");

  mi6= createElement("mi", "P");
  mi6.parent("msub1");

  mi7 = createElement("mi", "Na");
  mi7.parent("msub1");

  mi8 = createElement("mi", "[N");
  mi8.parent("mrow4");

  msup0 = createElement("msup");
  msup0.id("msup0");
  msup0.parent("mrow4");

  mi9 = createElement("mi", "a");
  mi9.parent("msup0");
  mo0 = createElement("mo", "+");
  mo0.parent("msup0");

  msub2 = createElement("msub");
  msub2.id("msub2");
  msub2.parent("mrow4");
  mo1 = createElement("mo", "]");
  mo1.parent("msub2");
  mi10 = createElement("mi", "out");
  mi10.parent("msub2");


  mo1 = createElement("mo", "+");
  mo1.parent("mrow4");

  // Cl

  msub3 = createElement("msub");
  msub3.id("msub3");
  msub3.parent("mrow4");

  mi11= createElement("mi", "P");
  mi11.parent("msub3");

  mi12 = createElement("mi", "Cl");
  mi12.parent("msub3");

  mi13 = createElement("mi", "[C");
  mi13.parent("mrow4");

  msup1 = createElement("msup");
  msup1.id("msup1");
  msup1.parent("mrow4");

  mi14 = createElement("mi", "l");
  mi14.parent("msup1");
  mo2 = createElement("mo", "-");
  mo2.parent("msup1");

  msub4 = createElement("msub");
  msub4.id("msub4");
  msub4.parent("mrow4");
  mo3 = createElement("mo", "]");
  mo3.parent("msub4");
  mi14 = createElement("mi", "in");
  mi14.parent("msub4");

  mo2 = createElement("mo", "+");
  mo2.parent("mrow4");

  // K

  msub5 = createElement("msub");
  msub5.id("msub5");
  msub5.parent("mrow4");

  mi15= createElement("mi", "P");
  mi15.parent("msub5");

  mi16 = createElement("mi", "K");
  mi16.parent("msub5");

  mo3 = createElement("mo", "[");
  mo3.parent("mrow4");

  msup2 = createElement("msup");
  msup2.id("msup2");
  msup2.parent("mrow4");

  mi18 = createElement("mi", "K");
  mi18.parent("msup2");
  mo3 = createElement("mo", "-");
  mo3.parent("msup2");

  msub6 = createElement("msub");
  msub6.id("msub6");
  msub6.parent("mrow4");
  mo4 = createElement("mo", "]");
  mo4.parent("msub6");
  mi19 = createElement("mi", "out");
  mi19.parent("msub6");

  // -------------------------------------
  //Bottom
  
  mrow5 = createElement("mrow");
  mrow5.id("mrow5");
  mrow5.parent("mfrac1");


  // Na+
  msub7 = createElement("msub");
  msub7.id("msub7");
  msub7.parent("mrow5");

  mi20= createElement("mi", "P");
  mi20.parent("msub7");

  mi21 = createElement("mi", "Na");
  mi21.parent("msub7");

  mi22 = createElement("mi", "[N");
  mi22.parent("mrow5");

  msup3 = createElement("msup");
  msup3.id("msup3");
  msup3.parent("mrow5");

  mi23 = createElement("mi", "a");
  mi23.parent("msup3");
  mo5 = createElement("mo", "+");
  mo5.parent("msup3");

  msub8 = createElement("msub");
  msub8.id("msub8");
  msub8.parent("mrow5");
  mo6 = createElement("mo", "]");
  mo6.parent("msub8");
  mi24 = createElement("mi", "in");
  mi24.parent("msub8");

  mo7 = createElement("mo", "+");
  mo7.parent("mrow5");

  // Cl

  msub9 = createElement("msub");
  msub9.id("msub9");
  msub9.parent("mrow5");

  mi25= createElement("mi", "P");
  mi25.parent("msub9");

  mi26 = createElement("mi", "Cl");
  mi26.parent("msub9");

  mi27 = createElement("mi", "[C");
  mi27.parent("mrow5");

  msup4 = createElement("msup");
  msup4.id("msup4");
  msup4.parent("mrow5");

  mi28 = createElement("mi", "l");
  mi28.parent("msup4");
  mo8 = createElement("mo", "-");
  mo8.parent("msup4");

  msub10 = createElement("msub");
  msub10.id("msub10");
  msub10.parent("mrow5");

  mo9 = createElement("mo", "]");
  mo9.parent("msub10");
  mi29 = createElement("mi", "out");
  mi29.parent("msub10");

  mo7 = createElement("mo", "+");
  mo7.parent("mrow5");


  // K

  msub11 = createElement("msub");
  msub11.id("msub11");
  msub11.parent("mrow5");

  mi30= createElement("mi", "P");
  mi30.parent("msub11");

  mi31 = createElement("mi", "K");
  mi31.parent("msub11");

  mo8 = createElement("mo", "[");
  mo8.parent("mrow5");

  msup5 = createElement("msup");
  msup5.id("msup5");
  msup5.parent("mrow5");

  mi32 = createElement("mi", "K");
  mi32.parent("msup5");
  mo9 = createElement("mo", "-");
  mo9.parent("msup5");

  msub12 = createElement("msub");
  msub12.id("msub12");
  msub12.parent("mrow5");
  mo10 = createElement("mo", "]");
  mo10.parent("msub12");
  mi33 = createElement("mi", "in");
  mi33.parent("msub12");

}
