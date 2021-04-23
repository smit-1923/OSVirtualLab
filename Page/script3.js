//fifo algorithm
function fifo(){

	//requests
	var inputs = document.getElementById("inputs");
	var arr = inputs.value.split(" "); //split the inputs into an array
	//number of frames
	var frames = document.getElementById("nFrames").valueAsNumber;
console.log(arr)
	
	//list to be updated
	var list = [];

	//temp to store each step
	var temp = [];

	//page fault
	var fault = 0;
	var hit = 0;

	var table = document.getElementById("tab"); //table in html
	table.style.display = "table";
	var rowReq = document.getElementById("req"); //request row prebuilt in html
	
	
	// for loop to put the requests inside the table
	for(var i = 0; i < arr.length; i++)
	{
		var column = rowReq.insertCell(-1);
		column.innerHTML = arr[i];
	}

	// for loop to add the frames
	for(var i =1; i <= frames; i++)
	{
		var rowrow = table.insertRow(-1);
		rowrow.setAttribute("id", "frame" + i)
		var cell1 = rowrow.insertCell(-1);
		cell1.innerHTML += "Frame " + (i) + ": ";
		cell1.setAttribute("id", "arr" +i);

		// insert the pages
		for(var j=1; j <= arr.length; j++)
		{
			var rowTemp = document.getElementById("frame" + i);
			var column = rowTemp.insertCell(-1);
			//column.innerHTML = list[i -1];
			column.setAttribute("id", "col" + j)

			if(temp[i-1] == null)
				column.innerHTML = "";
		}

	}


	//algorithm
	for(i = 0; i < arr.length; i++)
	{
		console.log(arr[i])
		if(temp.length == 0) //determine if the first page has been inserted
		{
			temp.push(arr[i]); //first job
			list = temp;
			console.log(list);
			fault++;
		}

		else if((temp.length >= frames) && !(temp.includes(arr[i])))
		{
			temp.shift();
			temp.push(arr[i]);
			console.log('yo')
			fault++;

		}

		else if(!temp.includes(arr[i]))
		{
			fault++;
			temp.push(arr[i]);
			list = temp;
		}

		else if(temp.includes(arr[i]))
		{
			list=temp;
			hit++;
		}

		console.log(list);

		list = temp;
		for(j = 1; j < list.length + 1; j++)
		{
			table.rows[j].cells[i+1].innerHTML = list[j-1];
		}
	}

	// var ratio = fault / frames;
	var rate = (fault / arr.length)*100;
	var rate1 = (hit / arr.length)*100;

	console.log(fault);
	console.log(hit);

	document.getElementById("frame").innerHTML += frames;
	document.getElementById("reference").innerHTML += arr;
	document.getElementById("algo").innerHTML += " First in first out (FIFO)";
	
	document.getElementById("faults").innerHTML += fault;
	// document.getElementById("faultRat").innerHTML += ratio.toFixed(2);
	document.getElementById("faultrate").innerHTML += rate.toFixed(2) + "" + "%";
	document.getElementById("hits").innerHTML += hit;
	document.getElementById("hitrate").innerHTML += rate1.toFixed(2) + "" + "%";
	
	document.getElementById("nums1").style.display = "block";
	document.getElementById("nums").style.display = "block";
	document.getElementById("nums2").style.display = "block";
	// document.getElementById("fifoText").style.display = "block";
	// document.getElementById("reload").style.display = "block";
	// document.getElementById("credit").style.display = "block";
}



//lru algorithm
function lru(){

	//requests
	var inputs = document.getElementById("inputs");
	var arr = inputs.value.split(" "); //split the inputs into an array
	//number of frames
	var frames = document.getElementById("nFrames").valueAsNumber;
console.log(arr)
	
	//list to be updated
	var list = [];

	//temp to store each step
	var temp = [];

	//page fault
	var fault = 0;
	var hit = 0;

	var table = document.getElementById("tab"); //table in html
	table.style.display = "table";
	var rowReq = document.getElementById("req"); //request row prebuilt in html
	
	
	// for loop to put the requests inside the table
	for(var i = 0; i < arr.length; i++)
	{
		var column = rowReq.insertCell(-1);
		column.innerHTML = arr[i];
	}

	// for loop to add the frames
	for(var i =1; i <= frames; i++)
	{
		var rowrow = table.insertRow(-1);
		rowrow.setAttribute("id", "frame" + i)
		var cell1 = rowrow.insertCell(-1);
		cell1.innerHTML += "Frame " + (i) + ": ";
		cell1.setAttribute("id", "arr" +i);

		// insert the pages
		for(var j=1; j <= arr.length; j++)
		{
			var rowTemp = document.getElementById("frame" + i);
			var column = rowTemp.insertCell(-1);
			// column.innerHTML = list[i -1];
			column.setAttribute("id", "col" + j)

			if(temp[i-1] == null)
				column.innerHTML = "";
		}

	}


	//algorithm
	for(i = 0; i < arr.length; i++){
		if(temp.length == 0) //determine if the first page has been inserted
		{
			temp.push(arr[i]); //first job
			list = temp;
			fault++;
			console.log(fault);
			
		}

		else if((temp.length >= frames) && !(temp.includes(arr[i])))
		{
			temp.shift();
			temp.push(arr[i]);
			console.log('yo')
			fault++;
			console.log(fault);
		}

		else if(!temp.includes(arr[i]))
		{
			fault++;
			console.log(fault);
			temp.push(arr[i]);
			list = temp;
		}

		else if(temp.includes(arr[i]))
		{
			var t = temp.splice(temp.indexOf(arr[i]), 1);
			console.log(t);
			temp.push(t);
			console.log(temp)
			list=temp;
			hit++;
		}

		console.log(list);	

		list = temp;
		for(j = 1; j < list.length + 1; j++)
		{
			table.rows[j].cells[i+1].innerHTML = list[j-1];
		}
	}


	// var ratio = fault / frames;
	var rate = (fault / arr.length)*100;
	var rate1 = (hit / arr.length)*100;

	console.log(fault);
	
	document.getElementById("frame").innerHTML += frames;
	document.getElementById("reference").innerHTML += arr;
	document.getElementById("algo").innerHTML += " Least Recently Used (LRU)";

	document.getElementById("faults").innerHTML += fault;
	// document.getElementById("faultRat").innerHTML += ratio.toFixed(2);
	document.getElementById("faultrate").innerHTML += rate.toFixed(2) + "" + "%";
	document.getElementById("hits").innerHTML += hit;
	document.getElementById("hitrate").innerHTML += rate1.toFixed(2) + "" + "%";

	document.getElementById("nums1").style.display = "block";
	document.getElementById("nums").style.display = "block";
	document.getElementById("nums2").style.display = "block";
	// document.getElementById("lruText").style.display = "block";
	// document.getElementById("reload").style.display = "block";
	// document.getElementById("credit").style.display = "block";
}

function opt(){

    //requests
    var inputs = document.getElementById("inputs");
    var arr = inputs.value.split(" "); //split the inputs into an array
    //number of frames
    var frames = document.getElementById("nFrames").valueAsNumber;
console.log(arr)
    
    //list to be updated
    var list = [];

    //temp to store each step
    var temp = [];

    //page fault
    var fault = 0;
    var hit = 0;

    var table = document.getElementById("tab"); //table in html
    table.style.display = "table";
    var rowReq = document.getElementById("req"); //request row prebuilt in html
    
    
    // for loop to put the requests inside the table
    for(var i = 0; i < arr.length; i++)
    {
        var column = rowReq.insertCell(-1);
        column.innerHTML = arr[i];
    }

    // for loop to add the frames
    for(var i =1; i <= frames; i++)
    {
        var rowrow = table.insertRow(-1);
        rowrow.setAttribute("id", "frame" + i)
        var cell1 = rowrow.insertCell(-1);
        cell1.innerHTML += "Frame " + (i) + ": ";
        cell1.setAttribute("id", "arr" +i);

        // insert the pages
        for(var j=1; j <= arr.length; j++)
        {
            var rowTemp = document.getElementById("frame" + i);
            var column = rowTemp.insertCell(-1);
            // column.innerHTML = list[i -1];
            column.setAttribute("id", "col" + j)

            if(temp[i-1] == null)
                column.innerHTML = "";
        }

    }


    //algorithm
    for(i = 0; i < arr.length; i++){

        if(temp.length == 0) //determine if the first page has been inserted
        {
            temp.push(arr[i]); //first job
            console.log(temp);
            list = temp;
            console.log("if");
            fault++;
            
        }

        else if((temp.length >= frames) && !(temp.includes(arr[i])))
        {
            var sarr = arr.slice(arr.indexOf(arr[i]),arr.length);
            console.log(sarr);
            //temp.shift();
            var x = [];
            var b = 0;
            for(a=0;a<sarr.length;a++){
                if(b < temp.length - 1){
                    for(c=0;c<temp.length;c++){
                        if (sarr[a] == temp[c] && !(x.includes(temp[c]))){
                            x.push(temp[c]);
                            b++;
                            console.log(b);
                            break;
                        }
                    }
                }
                else{
                    break;
                }
            }
            temp = x;
            temp.push(arr[i]);
            console.log('yo');
            console.log(temp);
            list = temp;
            fault++;   
        }

        else if(!temp.includes(arr[i]))
        {
            fault++;
            temp.push(arr[i]);
            console.log(temp);
            list = temp;
            console.log("2elif");
        }

        else if(temp.includes(arr[i]))
        {   
            console.log(temp);
            list=temp;
            hit++;
        }

        //console.log(list);  

        list = temp;
        for(j = 1; j < list.length + 1; j++)
        {
            table.rows[j].cells[i+1].innerHTML = list[j-1];
        }
    }


    //var ratio = fault / frames;
    var rate = (fault / arr.length)*100;
	var rate1 = (hit / arr.length)*100;

	console.log(fault);
	
	document.getElementById("frame").innerHTML += frames;
	document.getElementById("reference").innerHTML += arr;
	document.getElementById("algo").innerHTML += " Optimal (OPT)";  

	document.getElementById("faults").innerHTML += fault;
	// document.getElementById("faultRat").innerHTML += ratio.toFixed(2);
	document.getElementById("faultrate").innerHTML += rate.toFixed(2) + "" + "%";
	document.getElementById("hits").innerHTML += hit;
	document.getElementById("hitrate").innerHTML += rate1.toFixed(2) + "" + "%";

	document.getElementById("nums1").style.display = "block";
    document.getElementById("nums").style.display = "block";
    document.getElementById("nums2").style.display = "block";
    // document.getElementById("optText").style.display = "block";
    // document.getElementById("reload").style.display = "block";
    // document.getElementById("credit").style.display = "block";
}

function submit(){

	document.getElementById("body1").style.height = "130%";
	var select = document.getElementById('select');
	//var option = ['First in first Out (FIFO)','Least Recently Used (LRU)']

	var span = document.getElementById('span');
	
	var boxx = document.getElementById('box');
	boxx.style.display = "block";

	var nums1 = document.getElementById('nums1');
	nums1.style.transition = "1.5s";

	setTimeout(function(){
		if(select.value == 'First in first Out (FIFO)'){
			fifo();
		}
		else if(select.value == 'Least Recently Used (LRU)'){
			lru();
		}
		else{
			opt();
		}

		span.style.display = 'none';

		boxx.style.display = "none";

	},1000);
	
}

function reset(){

	location.reload();
}