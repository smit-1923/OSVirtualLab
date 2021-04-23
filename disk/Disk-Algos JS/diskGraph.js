//Random Number Generation from 1-199
function autoGenerate() {
    var x = document.querySelector("#inputNumbers");
    var i = Math.floor((Math.random() * 199) + 1);
    x.value += i + " ";
}

function Calculate() {
    let errorMessage = document.getElementById('errorMessage');
    hideError(errorMessage);

    var direction = document.getElementById("userInputDirection").value;
    if (direction === "null")
    {
        showError(errorMessage, "Please enter the Direction");
    }
    // Get data from inputs
    let inputNumbersString = document.getElementById('inputNumbers').value;
    inputNumbersString = inputNumbersString.trim();
    let inputNumbers = inputNumbersString.split(" ");
    let inputHeadPos = document.getElementById('inputHeadPos').value;

    //Remove header values from input
    for (let i = 0; i < inputNumbers.length; i++) {
        if (inputNumbers[i] == inputHeadPos) {
            inputNumbers.splice(i, 1);
        }
    }
    inputNumbers.unshift(inputHeadPos);

    //Remove duplicates
    inputNumbers = inputNumbers.filter(function (item, pos) {
        return inputNumbers.indexOf(item) == pos;
    });


    // Validation
    let isValidInput = true;

    if (inputHeadPos == "") {
        showError(errorMessage, "Please Enter Current Head Position");
        isValidInput = false;
    } else if (isNaN(inputHeadPos)) {
        showError(errorMessage, "Only Numeric Value Allowed for Current Head Position!!!");
        isValidInput = false;
    } else if (parseInt(inputHeadPos) < 0 || parseInt(inputHeadPos) > 199) {
        showError(errorMessage, "Current Head position Value Must be in Between 1-199");
        isValidInput = false;
    } else if (inputNumbersString == "") {
        showError(errorMessage, "Numeric value required for Queue");
        isValidInput = false;
    } else {
        inputNumbers.forEach(number => {
            if (isNaN(number)) {
                showError(errorMessage, "Number queue must be made of numbers");
                isValidInput = false;
            } else if (parseInt(number) < 0 || parseInt(number) > 199) {
                showError(errorMessage, "Number queue values must be in range 1..199");
                isValidInput = false;
            }
        });
    }

    console.log(direction);
    if (direction === "right")
    {
        var fcfsSeekTime = fcfs(inputNumbers, inputHeadPos);
        var sstfSeekTime = sstf(inputNumbers, inputHeadPos);
        var scanSeekTime = scanRight(inputNumbers, inputHeadPos);
        var lookSeekTime = lookRight(inputNumbers, inputHeadPos);
        var cscanSeekTime = cscanRight(inputNumbers, inputHeadPos);
        var clookSeekTime = clookRight(inputNumbers, inputHeadPos);

        // var graphType = document.getElementById("chartType").value;
        var ctx = document.getElementById('bar-chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['FCFS', 'SSTF', 'SCAN', 'C-SCAN', 'LOOK', 'C-LOOK'],
                datasets: [{
                    label: 'Comparison Graph Of All Six Algorithms',
                    data: [fcfsSeekTime, sstfSeekTime, scanSeekTime, cscanSeekTime, lookSeekTime, clookSeekTime],
                    backgroundColor: [
                        'rgba(0,178,255, 0.8)',
                        'rgba(0,255,230, 0.8)',
                        'rgba(0,229,255, 0.8)',
                        'rgba(0,178,255, 0.8)',
                        'rgba(0,127,255, 0.8)',
                        'rgba(0,76,255, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0,178,255, 1)',
                        'rgba(0,255,230, 1)',
                        'rgba(0,229,255, 1)',
                        'rgba(0,178,255, 1)',
                        'rgba(0,127,255, 1)',
                        'rgba(0,76,255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                tooltips: {
                    enabled: true
                },
                hover: {
                    animationDuration: 1
                },
                animation: {
                    duration: 1,
                    onComplete: function() {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.textAlign = 'center';
                        ctx.fillStyle = "#003b55";
                        ctx.textBaseline = 'bottom';
                        // Loop through each data in the datasets
                        this.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function(bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },

                scales: {
                    xAxes: [{
                        /* For changing color of x-axis coordinates */
                        ticks: {
                            fontSize: 18,
                            padding: 0,
                            fontColor: '#003b55'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 18,
                            padding: 0,
                            fontColor: '#003b55'
                        }
                    }]
                }
            }
        });
    }
    if(direction === "left")
    {
        var fcfsSeekTime = fcfs(inputNumbers, inputHeadPos);
        var sstfSeekTime = sstf(inputNumbers, inputHeadPos);
        var scanSeekTime = scanLeft(inputNumbers, inputHeadPos);
        var lookSeekTime = lookLeft(inputNumbers, inputHeadPos);
        var cscanSeekTime = cscanLeft(inputNumbers, inputHeadPos);
        var clookSeekTime = clookLeft(inputNumbers, inputHeadPos);

        // var graphType = document.getElementById("chartType").value;
        var ctx = document.getElementById('bar-chart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['FCFS', 'SSTF', 'SCAN', 'C-SCAN', 'LOOK', 'C-LOOK'],
                datasets: [{
                    label: 'Comparison Graph Of All Six Algorithms',
                    data: [fcfsSeekTime, sstfSeekTime, scanSeekTime, cscanSeekTime, lookSeekTime, clookSeekTime],
                    backgroundColor: [
                        'rgba(0,178,255, 0.8)',
                        'rgba(0,255,230, 0.8)',
                        'rgba(0,229,255, 0.8)',
                        'rgba(0,178,255, 0.8)',
                        'rgba(0,127,255, 0.8)',
                        'rgba(0,76,255, 0.8)'
                    ],
                    borderColor: [
                        'rgba(0,178,255, 1)',
                        'rgba(0,255,230, 1)',
                        'rgba(0,229,255, 1)',
                        'rgba(0,178,255, 1)',
                        'rgba(0,127,255, 1)',
                        'rgba(0,76,255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                tooltips: {
                    enabled: true
                },
                hover: {
                    animationDuration: 1
                },
                animation: {
                    duration: 1,
                    onComplete: function() {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.textAlign = 'center';
                        ctx.fillStyle = "#003b55";
                        ctx.textBaseline = 'bottom';
                        // Loop through each data in the datasets
                        this.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function(bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },

                scales: {
                    xAxes: [{
                        /* For changing color of x-axis coordinates */
                        ticks: {
                            fontSize: 18,
                            padding: 0,
                            fontColor: '#003b55'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 18,
                            padding: 0,
                            fontColor: '#003b55'
                        }
                    }]
                }
            }
        });
    }

    if (direction === "left" || direction === "right")
    {
        document.querySelector(".canvas button").classList.add("printChart");
        document.querySelector(".printChart").style.visibility = "initial";
        document.querySelector(".printChart").addEventListener("click", function () {
            printImage();
        });   
    }
}

function printImage()
{
    var canvas = document.querySelector("#bar-chart");
    var canvas_img = canvas.toDataURL("image/png",1.0);
    var pdf = new jsPDF('landscape','in', 'letter');
    pdf.addImage(canvas_img, 'png', .5, 1.75, 10, 5);
    pdf.save('All Algorithms Comparison Chart.pdf');
};

function showError(errorMessage, msg) {
    errorMessage.classList.add('alert');
    errorMessage.classList.add('alert-danger');
    errorMessage.innerHTML = msg;
}

function hideError(errorMessage) {
    errorMessage.classList.remove('alert');
    errorMessage.classList.remove('alert-danger');
    errorMessage.innerHTML = "";
}

// First Come First Serve Algorithm (FCFS)
function fcfs(Numbers, Head)
{
    var totalNumbersLength = Numbers.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = 0; i < totalNumbersLength; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbersLength; i++)
    {
        var currentTrack = Numbers[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    return totalHeadMovements;
}

//Shortest Seek Time First Algorithm (SSTF)
function sstf(Numbers, Head)
{
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
        visited[index] = 1;
        temp = Numbers[index];
    }
    return totalHeadMovements;
}

//Algorithms for RIGHT Direction (Towards Higher Values)

//SCAN or Elevator SCAN Algorithm
function scanRight(Numbers, Head)
{
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    rightArray.push(199);

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        else
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    for (var i = leftLength - 1; i >= 0; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    return totalHeadMovements;
}

//LOOK Algorithm
function lookRight(Numbers, Head)
{
    Numbers.shift();
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        else
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    for (var i = leftLength - 1; i >= 0; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    return totalHeadMovements;
}

//C-SCAN Algorithm
function cscanRight(Numbers, Head)
{
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    leftArray.push(0);
    rightArray.push(199);

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        else
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    if (leftLength != 0)
    {
        Head = 0;
        totalHeadMovements += 199;
        for (var i = 0; i < leftLength; i++)
        {
            var currentTrack = leftArray[i];
            distance = Math.abs(currentTrack - Head);
            totalHeadMovements += distance;
            Head = currentTrack;
        }
    }
    return totalHeadMovements;
}

//C-LOOK Algorithm
function clookRight(Numbers, Head)
{
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        else
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    if (leftLength != 0)
    {
        totalHeadMovements += Math.abs(Head - leftArray[0]);
        Head = leftArray[0];
        for (var i = 0; i < leftLength; i++)
        {
            var currentTrack = leftArray[i];
            distance = Math.abs(currentTrack - Head);
            totalHeadMovements += distance;
            Head = currentTrack;
        }
    }
    return totalHeadMovements;
}

//Algorithms for Left Direction (Towards Lower Values)

//SCAN or Elevator SCAN Algorithm
function scanLeft(Numbers, Head)
{
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    leftArray.push(0);

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        if(Numbers[i] > Head)
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = leftLength - 1; i >= 0; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    return totalHeadMovements;
}

//LOOK Algorithm
function lookLeft(Numbers, Head)
{
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        else
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = leftLength - 1; i >= 0; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    for (var i = 0; i < rightLength; i++)
    {
        var currentTrack = rightArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    return totalHeadMovements;
}

//C-SCAN Algorithm
function cscanLeft(Numbers, Head)
{
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    leftArray.push(0);
    rightArray.push(199);

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbers; i++)
    {
        if(Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        if(Numbers[i] > Head)
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = leftLength - 1; i >=0 ; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    Head = 199;
    totalHeadMovements += 199;
    if (rightLength != 0)
    {
        for (var i = rightLength - 1; i >=0 ; i--)
        {
            var currentTrack = rightArray[i];
            distance = Math.abs(currentTrack - Head);
            totalHeadMovements += distance;
            Head = currentTrack;
        }
    }
    return totalHeadMovements;
}

//C-LOOK Algorithm
function clookLeft(Numbers, Head)
{
    var leftArray = [];
    var rightArray = [];
    var totalNumbers = Numbers.length;

    for (var i = 0; i < totalNumbers; i++)
    {
        Numbers[i] = parseInt(Numbers[i]);
    }

    for (var i = 0; i < totalNumbers; i++)
    {
        if (Numbers[i] < Head)
        {
            leftArray.push(Numbers[i]);
        }
        if(Numbers[i] > Head)
        {
            rightArray.push(Numbers[i]);
        }
    }
    leftArray.sort(function (a, b)
    {
        return a - b;
    })

    rightArray.sort(function (a, b)
    {
        return a - b;
    })

    var leftLength = leftArray.length;
    var rightLength = rightArray.length;
    var totalHeadMovements = 0;
    var distance = 0;

    for (var i = leftLength - 1; i >=0 ; i--)
    {
        var currentTrack = leftArray[i];
        distance = Math.abs(currentTrack - Head);
        totalHeadMovements += distance;
        Head = currentTrack;
    }
    totalHeadMovements += Math.abs(Head - rightArray[rightLength - 1]);
    Head = rightArray[rightLength - 1];
    if (rightLength != 0)
    {
        for (var i = rightLength - 1; i >= 0; i--)
        {
            var currentTrack = rightArray[i];
            distance = Math.abs(currentTrack - Head);
            totalHeadMovements += distance;
            Head = currentTrack;
        }
    }
    return totalHeadMovements;
}