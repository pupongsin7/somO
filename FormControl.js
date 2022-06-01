var pathAPI = "https://predict-gpa.herokuapp.com/"

// const url = 'https://192.168.1.8:3333/predict';

// // post body data 
// const user = {
//     "ans1": "female",
//     "ans2": "3",
//     "ans3": "Business Computer",
//     "ans4": "BAD",
//     "ans5": "less than 300",
//     "ans6": "3 to 5 year",
//     "ans7": "3 to 5 hour",
//     "ans8": "00.01 PM - 06.00 PM",
//     "ans9": "computer lab",
//     "ans10": "always",
//     "ans11": "always",
//     "ans12": "always",
//     "ans13": "always",
//     "ans14": "more than half of class time",
//     "ans15": "call",
//     "ans16": "presentation",
//     "ans17": "always",
//     "ans18": "sometimes",
//     "ans19": "?"
// };

// // request options
// const options = {
//     method: 'POST',
//     body: JSON.stringify(user),
//     headers: {
//         'Content-Type': 'application/json; charset=utf-8    '
//     }
// }

// // send POST request
// fetch(url, options)
//     .then(res => res.json())
//     .then(res => console.log(res));
// $(document).ready(function () {
//     $("#test").click(function () {
//         console.log("i'm click")
//         $.post("http://192.168.1.8:3333/predict",
//             {
//                 "ans1": "female",
//                 "ans2": "3",
//                 "ans3": "Business Computer",
//                 "ans4": "BAD",
//                 "ans5": "less than 300",
//                 "ans6": "3 to 5 year",
//                 "ans7": "3 to 5 hour",
//                 "ans8": "00.01 PM - 06.00 PM",
//                 "ans9": "computer lab",
//                 "ans10": "always",
//                 "ans11": "always",
//                 "ans12": "always",
//                 "ans13": "always",
//                 "ans14": "more than half of class time",
//                 "ans15": "call",
//                 "ans16": "presentation",
//                 "ans17": "always",
//                 "ans18": "sometimes",
//                 "ans19": "?"
//             },
//             function (data, status) {
//                 alert("Data: " + data + "\nStatus: " + status);
//             });
//     });

//     // document.getElementById("form").addEventListener("submit", serializeBeforeSend());
// });
$(document).ready(function () {
    var Token = sessionStorage.getItem("key");
    if (Token == null) document.getElementById("login").style.cssText += "display:inline-block !important;";
    else {
        document.getElementById("logout").style.cssText += "display:inline-block !important;";
        document.getElementById("AdminManage").style.cssText += "display:inline-block !important;";

    }
    setTimeout(function () {
        // var x = document.getElementById("Loading");
        $("#Loading").fadeOut(500, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
        // setTimeout(function () {
        //     console.log(document.getElementById("Loading").style.cssText += "display:none !important;")
        // }, 900);

        // document.getElementById("Loading").style.display = "none";
    }, 1000);


});


//Function Loading
function EnableLoading() {
    // var x = document.getElementById("Loading");
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
    var x = document.getElementById("Loading");
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}
function DisableLoading() {
    $("#Loading").fadeOut(500, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
}
function serializeBeforeSend() {
    let data = $('form').serialize()
    console.log(data)
    let aw = document.getElementById("form")
    console.log(aw.action)
    document.getElementById("form").action = "APIresult.html?" + data
    console.log(document.getElementById("form").action)
    return true
    //window.location.href = "/result.html/?"+ data;
}

//Control Form multi step
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
function showTab(n) {
    // This function will display the specified tab of the form...
    var x = document.getElementsByClassName("tab");
    // console.log(x);
    x[n].style.display = "block";
    //... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "ยืนยัน";
    } else {
        document.getElementById("nextBtn").innerHTML = "หน้าถัดไป";
    }
    //... and run a function that will display the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    //Scroll up to top
    window.scrollTo(0, 0);

    // if you have reached the end of the form...
    if (currentTab >= x.length) {
        EnableLoading()
        // ... the form gets submitted: //ถึงหน้า tab สุดท้ายแล้วจะเช็คละใส่ดาต้าผ่าน Get เพื่อไปหน้า result
        // if (serializeBeforeSend()) document.getElementById("form").submit();
        let data = $('form').serialize()
        const urlParams = new URLSearchParams(data);
        // console.log(data)
        // console.log(urlParams)
        // console.log(urlParams.get('stuId'))
        data = {
            "stuId": urlParams.get('stuId'),
            "studentName": urlParams.get('stuName') + " " + urlParams.get('stuLastname'),
            "ans1": urlParams.get('ans1'),
            "ans2": urlParams.get('ans2'),  
            "ans3": urlParams.get('ans3'),
            "ans4": urlParams.get('ans4') <= 2.5 ? "BAD" : "GOOD",
            "ans5": urlParams.get('ans5'),
            "ans6": urlParams.get('ans6'),
            "ans7": urlParams.get('ans7'),
            "ans8": urlParams.get('ans8'),
            "ans9": urlParams.get('ans9'),
            "ans10": urlParams.get('ans10'),
            "ans11": urlParams.get('ans11'),
            "ans12": urlParams.get('ans12'),
            "ans13": urlParams.get('ans13'),
            "ans14": urlParams.get('ans14'),
            "ans15": urlParams.get('ans15'),
            "ans16": urlParams.get('ans16'),
            "ans17": urlParams.get('ans17'),
            "ans18": urlParams.get('ans18'),
            "ans19": "?"
        }
        // console.log(data)

        // PieChart(10,20)

        // console.log(data)
        // $.post("http://192.168.1.8:3333/predict", data,
        $.post(pathAPI + "predict", data,
            function (data, status) {
                let str = ""
                console.log(data)
                // alert("Data: " + data.data.GPA + "\nStatus: " + status);
                if (data.data.GPA == "(2.5-inf)") {
                    // document.getElementById("icons").innerHTML = `<i class="fas fa-smile-beam fa-10x text-success"></i>`
                    // str = `ผลการเรียนออกไปในแนวทางที่ดี`
                    str = "1"
                }
                else if (data.data.GPA == "(-inf-2.5]") {
                    // document.getElementById("icons").innerHTML = `<i class="fas fa-sad-cry fa-10x text-danger"></i>`
                    // str = `มีแนวโน้วที่จะมีผลการเรียนที่ไม่ดีควรปรับปรุงพฤติกรรมการใช้สมาร์ทโฟน`
                    str = "2"
                }
                //set result and prob
                let resultBad = data.data.historyData[0].count
                let resultGood = data.data.historyData[1].count
                let HistoryCount = resultBad + resultGood
           
                // window.location.href = "result.html?res=" + str + "&prob=" + data.data.prob + "&resBad=" + resultBad + "&resGood=" + resultGood + "&History=" + HistoryCount;
                sessionStorage.setItem("Link","result.html?res=" + str + "&prob=" + data.data.prob + "&resBad=" + resultBad + "&resGood=" + resultGood + "&History=" + HistoryCount)
                sessionStorage.setItem("res", str);
                sessionStorage.setItem("prob", data.data.prob);
                sessionStorage.setItem("resBad", resultBad);
                sessionStorage.setItem("resGood", resultGood);
                sessionStorage.setItem("History", HistoryCount);
                window.location.href = "result.html";

                // document.getElementById("result").innerHTML = str
                // document.getElementById("prob").innerHTML = `ความน่าจะเป็นเท่ากับ ` + data.data.prob

                //set to create pie chart

                // console.log(resultBad)
                // console.log(resultGood)
                // PieChart(resultGood, resultBad)

            }).done(function () {
                // alert("second success");
                // $("#Loading").fadeOut(500, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })
            }).fail(function () {
                // alert("error");

                // $("#Loading").fadeOut(500, function () { document.getElementById("Loading").style.cssText += "display:none !important;"; })

            })
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);

}

function validateForm() {
    // This function deals with validation of the form fields
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // console.log(y)
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
        // If a field is empty...

        if (y[i].type == "radio") { //Validate Input Radio

            let ValidRadio = validateInputRadioByName(y[i].name)
            // console.log(ValidRadio)
            if (!ValidRadio) {
                if (y[i].className.search("invalid") == -1) y[i].className += " invalid";
                // and set the current valid status to false
                valid = false;
            }
            else {
                y[i].className = y[i].className.replace("invalid", "");
            }
        }
        else {
            if (y[i].name != "nonesend") { //เช็คการกรอกช่องอื่นๆใน radio button ให้ไม่ต้อง validate
                if (y[i].value == "") {
                    // add an "invalid" class to the field:
                    if (y[i].className.search("invalid") == -1) y[i].className += " invalid";
                    // and set the current valid status to false
                    valid = false;
                }
                else {
                    y[i].className = y[i].className.replace("invalid", "");
                    // console.log(y[i].className)
                }
            }

        }
    }
    //loop check Validate Select Option
    SelectOption = x[currentTab].getElementsByTagName("select");
    for (i = 0; i < SelectOption.length; i++) {
        // console.log(SelectOption[i])
        if (SelectOption[i].value == "") {
            // add an "invalid" class to the field:
            if (SelectOption[i].className.search("invalid") == -1) SelectOption[i].className += " invalid";
            // and set the current valid status to false
            valid = false;
        }
        else {
            SelectOption[i].className = SelectOption[i].className.replace("invalid", "");
            // console.log(y[i].className)
        }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}

function validateInputRadioByName(name) {
    var radios = document.getElementsByName(name);
    var formValid = false;

    var i = 0;
    while (!formValid && i < radios.length) {
        if (radios[i].checked) formValid = true;
        i++;
    }

    // if (!formValid) alert("Must check some option!");
    return formValid;
}