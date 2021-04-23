var loader = document.getElementById('loading-screen');

function line(){

	var inputs = document.getElementById("inputs");
    var arr = inputs.value.split(" "); //split the inputs into an array
  		
  	//number of frames
    var frames = document.getElementById("nFrames").valueAsNumber;
    
    console.log(arr);
    console.log(frames);

    var temp=[];
    var temp1=[];
    var temp2=[];
    var list = [];
    var list1 = [];
    var list2 = [];
    var l = [];
    var r = [];
    var o = [];
    var fault=0;
    var faultt = 0;
    var faulttt = 0;
    var d = [];

    for(var x=0;x<frames; x++)
    {
        d[x] = x+1;
    }

    // <--------------------------------------------------------------FIFO---------------------------------------------------->

    for(var i=1;i<=frames;)
    {
        for(var k=0;k<arr.length;k++)
        {
            if(temp.length === 0)
            {
               	temp.push(arr[k]);
               	console.log(temp);
               	list = temp;
               	console.log(list);
               	fault++;
               	console.log(fault);
            }

            else if((temp.length >= i) && !(temp.includes(arr[k])))
            {
                temp.shift();
                temp.push(arr[k]);
                list = temp;
                console.log(list);
                console.log("yo");
                fault++;
            }

            else if(!temp.includes(arr[k]))
            {
               	temp.push(arr[k]);
               	fault++;
               	list = temp;
               	console.log(list);
            }

            else if(temp.includes(arr[k]))
            {
                list = temp;
                console.log(list);
            }

            list = temp;
            console.log(fault);
        }

        l.push(fault);
        console.log(l);
       	//console.log(j);
        
        temp = [];
        list = [];
        fault = 0;           
            
        i++;
        console.log(i);
    }
    console.log(l);

    // <--------------------------------------------------------------LRU---------------------------------------------------->

    for(var i=1;i<=frames;)
    {
        for(var k=0;k<arr.length;k++)
        {
            if(temp1.length === 0)
            {
               	temp1.push(arr[k]);
               	console.log(temp1);
               	list1 = temp1;
               	console.log(list1);
               	faultt++;
               	console.log(faultt);
            }

            else if((temp1.length >= i) && !(temp1.includes(arr[k])))
            {
                temp1.shift();
                temp1.push(arr[k]);
                list1 = temp1;
                console.log(list1);
                console.log("yoo");
                faultt++;
            }

            else if(!temp1.includes(arr[k]))
            {
               	temp1.push(arr[k]);
               	faultt++;
               	list1 = temp1;
               	console.log(list1);
            }

            else if(temp1.includes(arr[k]))
            {	
            	var t = temp1.splice(temp1.indexOf(arr[k]), 1);
                console.log(t);
                temp1.push(t);
                list1 = temp1;
                console.log(list1);
            }

            list1 = temp1;
            console.log(faultt);
        }

        r.push(faultt);
        console.log(r);
       	//console.log(j);
        
        temp1 = [];
        list1 = [];
        faultt = 0;           
            
        i++;
        console.log(i);
    }
    console.log(r);

    // <--------------------------------------------------------------OPT---------------------------------------------------->

    for(var i=1;i<=frames;)
    {
        for(var k=0;k<arr.length;k++)
        {
            if(temp2.length === 0)
            {
               	temp2.push(arr[k]);
               	console.log(temp2);
               	list2 = temp2;
               	console.log(list2);
               	faulttt++;
               	console.log(faulttt);
            }

            else if((temp2.length >= i) && !(temp2.includes(arr[k])))
            {
                var sarr = arr.slice(arr.indexOf(arr[k]),arr.length);
                console.log(sarr);
                
                var y = [];
                var b = 0;
                  
                for(a=0;a<sarr.length;a++)
                {
                    if(b < temp2.length - 1)
                    {
                      	for(c=0;c<temp2.length;c++)
                      	{
                        	if (sarr[a] == temp2[c] && !(y.includes(temp2[c])))
                        	{
                            	y.push(temp2[c]);
                            	b++;
                            	console.log(b);
                            	break;
                        	}
                    	}
                	}
                	else
                	{
                    	break;
                	}
            	}

            	temp2 = y;
            	temp2.push(arr[k]);
            	console.log('yooo');
            	console.log(temp2);
            	list2 = temp2;
            	faulttt++;
            }

            else if(!temp2.includes(arr[k]))
            {
               	temp2.push(arr[k]);
               	faulttt++;
               	list2 = temp2;
               	console.log(list2);
            }

            else if(temp2.includes(arr[k]))
            {	
                list2 = temp2;
                console.log(list2);
            }

            list2 = temp2;
            console.log(faulttt);
        }

        o.push(faulttt);
        console.log(o);
       	//console.log(j);
        
        temp2 = [];
        list2 = [];
        faulttt = 0;           
            
        i++;
        console.log(i);
    }
    console.log(o);

    loader.style.display = "block";
    loader.style.top = "380px";

    // <-------------------------------------------------------------Graph plot ----------------------------------------------------->

    setTimeout(function(){
    	var trace1 = {
        x: d,
        y: l,
       	type: 'line',
       	name: 'First in first out (FIFO)'
    };

    var trace2 = {
    	x: d,
    	y: r,
    	type: 'line',
    	name: 'Least Recently Used (LRU)'
    };

    var trace3 = {
    	x: d,
    	y: o,
    	type: 'line',
    	name: 'Optimal (OPT)'
    };

    var data = [trace1,trace2,trace3];

    var layout = {
    	title: 'Page Replacement Algoritm',
    	xaxis: {
    		title: 'Number of Frames',
    	},
    	yaxis: {
    		title: 'Number of Page Faults',
    	},
    }

    Plotly.newPlot('myDiv',data,layout);
	
    loader.style.display = "none";

	},4000);
    

}

function bar(){

	var inputs = document.getElementById("inputs");
    var arr = inputs.value.split(" "); //split the inputs into an array
  		
  	//number of frames
    var frames = document.getElementById("nFrames").valueAsNumber;
    
    console.log(arr);
    console.log(frames);

    var temp=[];
    var temp1=[];
    var temp2=[];
    var list = [];
    var list1 = [];
    var list2 = [];
    var l = [];
    var r = [];
    var o = [];
    var fault=0;
    var faultt=0;
    var faulttt=0;
    var d = [];

    for(var x=0;x<frames; x++)
    {
        d[x] = x+1;
    }

    // <--------------------------------------------------------------FIFO---------------------------------------------------->

    for(var i=1;i<=frames;)
    {
        for(var k=0;k<arr.length;k++)
        {
            if(temp.length === 0)
            {
               	temp.push(arr[k]);
               	console.log(temp);
               	list = temp;
               	console.log(list);
               	fault++;
               	console.log(fault);
            }

            else if((temp.length >= i) && !(temp.includes(arr[k])))
            {
                temp.shift();
                temp.push(arr[k]);
                list = temp;
                console.log(list);
                console.log("yo");
                fault++;
            }

            else if(!temp.includes(arr[k]))
            {
               	temp.push(arr[k]);
               	fault++;
               	list = temp;
               	console.log(list);
            }

            else if(temp.includes(arr[k]))
            {
                list = temp;
                console.log(list);
            }

            list = temp;
            console.log(fault);
        }

        l.push(fault);
        console.log(l);
       	//console.log(j);
        
        temp = [];
        list = [];
        fault = 0;           
            
        i++;
        console.log(i);
    }
    console.log(l);

    // <--------------------------------------------------------------LRU---------------------------------------------------->

    for(var i=1;i<=frames;)
    {
        for(var k=0;k<arr.length;k++)
        {
            if(temp1.length === 0)
            {
               	temp1.push(arr[k]);
               	console.log(temp1);
               	list1 = temp1;
               	console.log(list1);
               	faultt++;
               	console.log(faultt);
            }

            else if((temp1.length >= i) && !(temp1.includes(arr[k])))
            {
                temp1.shift();
                temp1.push(arr[k]);
                list1 = temp1;
                console.log(list1);
                console.log("yoo");
                faultt++;
            }

            else if(!temp1.includes(arr[k]))
            {
               	temp1.push(arr[k]);
               	faultt++;
               	list1 = temp1;
               	console.log(list1);
            }

            else if(temp1.includes(arr[k]))
            {	
            	var t = temp1.splice(temp1.indexOf(arr[k]), 1);
                console.log(t);
                temp1.push(t);
                list1 = temp1;
                console.log(list1);
            }

            list1 = temp1;
            console.log(faultt);
        }

        r.push(faultt);
        console.log(r);
       	//console.log(j);
        
        temp1 = [];
        list1 = [];
        faultt = 0;           
            
        i++;
        console.log(i);
    }
    console.log(r);

    // <--------------------------------------------------------------OPT ---------------------------------------------------->

    for(var i=1;i<=frames;)
    {
        for(var k=0;k<arr.length;k++)
        {
            if(temp2.length === 0)
            {
               	temp2.push(arr[k]);
               	console.log(temp2);
               	list2 = temp2;
               	console.log(list2);
               	faulttt++;
               	console.log(faulttt);
            }

            else if((temp2.length >= i) && !(temp2.includes(arr[k])))
            {
                var sarr = arr.slice(arr.indexOf(arr[k]),arr.length);
                console.log(sarr);
                
                var y = [];
                var b = 0;
                  
                for(a=0;a<sarr.length;a++)
                {
                    if(b < temp2.length - 1)
                    {
                      	for(c=0;c<temp2.length;c++)
                      	{
                        	if (sarr[a] == temp2[c] && !(y.includes(temp2[c])))
                        	{
                            	y.push(temp2[c]);
                            	b++;
                            	console.log(b);
                            	break;
                        	}
                    	}
                	}
                	else
                	{
                    	break;
                	}
            	}

            	temp2 = y;
            	temp2.push(arr[k]);
            	console.log('yooo');
            	console.log(temp2);
            	list2 = temp2;
            	faulttt++;
            }

            else if(!temp2.includes(arr[k]))
            {
               	temp2.push(arr[k]);
               	faulttt++;
               	list2 = temp2;
               	console.log(list2);
            }

            else if(temp2.includes(arr[k]))
            {	
                list2 = temp2;
                console.log(list2);
            }

            list2 = temp2;
            console.log(faulttt);
        }

        o.push(faulttt);
        console.log(o);
       	//console.log(j);
        
        temp2 = [];
        list2 = [];
        faulttt = 0;           
            
        i++;
        console.log(i);
    }
    console.log(o);

    loader.style.display = "block";
    loader.style.top = "380px";

    // <-------------------------------------------------------------Graph Plot --------------------------------------------------------->

    setTimeout(function(){
    	var trace1 = {
        x: d,
        y: l,
       	type: 'bar',
       	name: 'First in first out (FIFO)'
    };

    var trace2 = {
        x: d,
        y: r,
       	type: 'bar',
       	name: 'Least Recently Used (LRU)'
    };

    var trace3 = {
        x: d,
        y: o,
       	type: 'bar',
       	name: 'Optimal (OPT)'
    };

    var data = [trace1,trace2,trace3];

    var layout = {
    	title: 'Page Replacement Algoritm',
    	xaxis: {
    		title: 'Number of Frames',
    	},
    	yaxis: {
    		title: 'Number of Page Faults',
    	},
    }

    Plotly.newPlot('myDiv',data,layout);

    loader.style.display = "none";

    },4000);
    

}