//Random Number Generation from 1-199
function autoGenerate()
{
    var x = document.querySelector("#inputNumbers");
    var i = Math.floor((Math.random() * 199) + 1);
    x.value += i + " ";
}

function Calculate() {
    let errorMessage = document.getElementById('errorMessage');  
    hideError(errorMessage);

    //Getting numbers(data)from user input
    let inputNumbersString = document.getElementById('inputNumbers').value;
    inputNumbersString = inputNumbersString.trim();
    let inputNumbers = inputNumbersString.split(" ");
    let inputHeadPos = document.getElementById('inputHeadPos').value;

    //Removing header values from user input
    for (let i = 0; i < inputNumbers.length; i++) {
        if (inputNumbers[i] == inputHeadPos) {
            inputNumbers.splice(i, 1);
        }
    }
    inputNumbers.unshift(inputHeadPos);

    //Removing the duplicate values
    inputNumbers = inputNumbers.filter(function(item, pos) {
        return inputNumbers.indexOf(item) == pos;
    });

    //Validation
    let isValidInput = true; 
 
    if (inputHeadPos == "") {
        showError(errorMessage, "Please enter current Head position");
        isValidInput = false;
    } else if (isNaN(inputHeadPos)) {
        showError(errorMessage, "Only Numeric value allowed for current Head position !!!");
        isValidInput = false; 
    } else if (parseInt(inputHeadPos) < 0 || parseInt(inputHeadPos) > 199) {
        showError(errorMessage, "Current Head position value must be in between 1-199");
        isValidInput = false;
    } else if (inputNumbersString == "") {
        showError(errorMessage, "Numeric values required for Queue");
        isValidInput = false; 
    }
    else {
        inputNumbers.forEach(number => {
            if (isNaN(number)) {
                showError(errorMessage, "Number queue must only contain numbers");
                isValidInput = false;
            } else if (parseInt(number) < 0 || parseInt(number) > 199) {
                showError(errorMessage, "Number queue values must be in the range of 1-199");
                isValidInput = false;
            }
        });
    }
    // var graphType = document.getElementById("chartType").value;
    var ctx = document.getElementById("line-chart").getContext('2d');
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sstf(inputNumbers, inputHeadPos),
            legend: {
                display: true
            },
            datasets: [
                {
                    label: "Shortest Seek Time First (SSTF) Algorithm",
                    data: seekAddressed,
                    lineTension: 0,
                    fill: false,
                    backgroundColor: "rgba(0,255,230, 0.8)",
                    borderColor: "rgba(0,255,230, 1)",
                    pointBackgroundColor: "rgba(0,255,230, 0.5)",
                    pointBorderColor: "#55bae7",
                    pointHoverBackgroundColor: "#55bae7",
                    pointHoverBorderColor: "#55bae7",
                }
            ]
        },
        options: {
            tooltips: {
                enabled: true
            },
            hover: {
                animationDuration: 1
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Seek Sequence"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Seek Count (upto Particular Point)",
                    }
                }]
            }
        }
    });

    document.querySelector(".canvas button").classList.add("printChart");
    document.querySelector(".printChart").style.visibility = "initial";
    document.querySelector(".printChart").addEventListener("click", function () {
        printImage();
    });
}

function printImage()
{
    var canvas = document.querySelector("#line-chart");
    var canvas_img = canvas.toDataURL("image/png",1.0);
    var pdf = new jsPDF('landscape','in', 'letter');
    pdf.addImage(canvas_img, 'png', .5, 1.75, 10, 5);
    pdf.save('SSTF Chart.pdf');
};

function showError(errorMessage, msg)
{
    errorMessage.classList.add('alert');
    errorMessage.classList.add('alert-danger');
    errorMessage.innerHTML = msg;
}

function hideError(errorMessage)
{
    errorMessage.classList.remove('alert');
    errorMessage.classList.remove('alert-danger');
    errorMessage.innerHTML = "";
}

function showResult(count, seekSequence)
{
    var div = document.getElementById('count-output');
    if (count == "") div.innerHTML = "";
    else div.innerHTML = "<br/>Seek Sequence: <b>[" + seekSequence + "]</b><br /><br/>Total Seek Count: <b>" + count + "<b>";
}

var seekCountSequence = [];
var seekAddressed = [];

function sstf(Numbers, Head)
{
    var tempArray = [];
    var visited = [];
    var totalNumbers = Numbers.length;
    var totalHeadMovements = 0;
    var distance = 0;
    var temp;

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }
    
    for (var i = 0; i < totalNumbers; i++)
    {
        visited.push(0);
    }
    temp = parseInt(Head);

    for (var i = 0; i < totalNumbers; i++)
    {
        var minValue = 1000000;
        var index;
        for (var j = 0; j < totalNumbers; j++)
        {
            if (Math.abs(temp - Numbers[j]) < minValue && (visited[j] === 0))
            {
                index = j;
                minValue = Math.abs(temp - Numbers[j]);
            }
        }
        totalHeadMovements += Math.abs(temp - Numbers[index]);
        seekCountSequence.push(totalHeadMovements);
        visited[index] = 1;
        temp = Numbers[index];
        seekAddressed.push(Numbers[index]);
    }
    for (var i = 1; i < totalNumbers; i++)
    {
        tempArray.push(seekAddressed[i]);
    }
    showResult(totalHeadMovements, tempArray);
    return seekCountSequence;
}
