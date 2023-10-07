const sheetID = "1k1_UPZf0zyHEuFAEMogAkyXUEqqzFZNNPRnMfi_aTCI";
const sheetTitle = "NEET";
const sheetRange = "B3:L40";
const fullURL =
  "https://docs.google.com/spreadsheets/d/" +
  sheetID +
  "/gviz/tq?sheet=" +
  sheetTitle +
  "&range=" +
  sheetRange;

var subject = document.getElementById("subject");
var chapter = document.getElementById("chapter");
var question = document.getElementById("question");
var questionNo = document.getElementById("questionNo");
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");
var d = document.getElementById("d");
var correct = "o";
var comment = document.getElementById("comment");;
var i = -1;
var questionArray = [];

function next() {
    i++;
    fetch(fullURL)
    .then((res) => res.text())
    .then((rep) => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        if (data.table.rows[i].c[1]) {
          questionNo.innerHTML = `${i + 1}`;
          a.style.borderColor = "transparent";
          b.style.borderColor = "transparent";
          c.style.borderColor = "transparent";
          d.style.borderColor = "transparent";
          comment.style.transform = "scale(0)";
          question.textContent = data.table.rows[i].c[1].v;
          a.textContent = data.table.rows[i].c[2].v;
          b.textContent = data.table.rows[i].c[3].v;
          c.textContent = data.table.rows[i].c[4].v;
          d.textContent = data.table.rows[i].c[5].v;
          correct = data.table.rows[i].c[6].v;
          if (correct == "a") questionArray.push([data.table.rows[i].c[1].v, data.table.rows[i].c[2].v]);
          else if (correct == "b") questionArray.push([data.table.rows[i].c[1].v, data.table.rows[i].c[3].v]);
          else if (correct == "c") questionArray.push([data.table.rows[i].c[1].v, data.table.rows[i].c[4].v]);
          else if (correct == "d") questionArray.push([data.table.rows[i].c[1].v, data.table.rows[i].c[5].v]);
          
          comment.innerHTML = data.table.rows[i].c[8].v;
        }
        else {
          showAnswer();
        }
    });
}

function option(o) {
    if (correct == o) {
      document.getElementById(`${o}`).style.border =
        "solid 2px rgb(7, 167, 52)";
      comment.style.transform = "scale(1)";
    } else {
      document.getElementById(`${o}`).style.border = "solid 2px red";
      comment.style.transform = "scale(1)";
    }
}

window.onload = function () {
    fetch(fullURL)
      .then((res) => res.text())
      .then((rep) => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        subject.textContent = data.table.rows[0].c[9].v;
        chapter.innerHTML = data.table.rows[0].c[10].v;
      });
};

var answerDisplay = document.getElementById("answer-display");
function showAnswer() {
  answerDisplay.style.display = "block";
  document.getElementById("questionPanel").style.display = "none";
  for(var i = 0; i<questionArray.length; i++) {
      var quizdiv = document.createElement("div");
      quizdiv.className = "quiz";
      var questiondiv = document.createElement("div");
      questiondiv.className = "questions";
      questiondiv.textContent = questionArray[i][0];
      var optiondiv = document.createElement("div");
      optiondiv.className = "correctoptiondiv";
      optiondiv.textContent = questionArray[i][1];
      quizdiv.appendChild(questiondiv);
      quizdiv.appendChild(optiondiv);
      answerDisplay.appendChild(quizdiv);
  }
}
