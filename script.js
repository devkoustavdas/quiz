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

function next() {
    i++;
    a.style.borderColor = "transparent";
    b.style.borderColor = "transparent";
    c.style.borderColor = "transparent";
    d.style.borderColor = "transparent";
    comment.style.transform = "scale(0)";

    questionNo.innerHTML = `${i+1}`;
    fetch(fullURL)
    .then((res) => res.text())
    .then((rep) => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        question.textContent = data.table.rows[i].c[1].v;
        a.textContent = data.table.rows[i].c[2].v;
        b.textContent = data.table.rows[i].c[3].v;
        c.textContent = data.table.rows[i].c[4].v;
        d.textContent = data.table.rows[i].c[5].v;
        correct = data.table.rows[i].c[6].v;
        comment.innerHTML = data.table.rows[i].c[8].v;
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

function screenSize() {
  var screenWidth = window.innerWidth;
  if (screenWidth > 1200) {
    
  }
}
screenSize();