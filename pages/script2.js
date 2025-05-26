document.getElementById("star").addEventListener("click", function() {
  this.classList.toggle("rotate");
});

function calculate() {
  let name1 = document.getElementById("fname").value;
  let name2 = document.getElementById("fname2").value;

  let ls = name1.replace(/[^l]/g, "").length + name2.replace(/[^l]/g, "").length;
  let os = name1.replace(/[^o]/g, "").length + name2.replace(/[^o]/g, "").length;
  let vs = name1.replace(/[^v]/g, "").length + name2.replace(/[^v]/g, "").length;
  let es = name1.replace(/[^e]/g, "").length + name2.replace(/[^e]/g, "").length;
  let ss = name1.replace(/[^s]/g, "").length + name2.replace(/[^s]/g, "").length;

  let los = ls + os;
  let ovs = os + vs;
  let ves = vs + es;
  let ess = es + ss;

  let loov = los + ovs;
  let ovve = ovs + ves;
  let vees = ves + ess;

  let pair1 = loov + ovve;
  let pair2 = ovve + vees;

  let number = pair1.toString() + pair2.toString();

  while (number.length > 2) {
    let number2 = 0;
    for (let i = 0; i < number.length; i++) {
      number2 += parseInt(number[i]); 
    }
    number = number2.toString();
  }

  document.getElementById("number").innerHTML = number;
}
