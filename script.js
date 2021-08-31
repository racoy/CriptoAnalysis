var samplealf = [];

function fcompare(a, b)	{
	if ((a[0] > b[0]) || (b[0] == undefined)) return -1;
	else if ((b[0] > a[0]) || (a[0] == undefined)) return 1; 
		else if (a[1] >= b[1]) return 1;
			else if (a[1] < b[1]) return -1;
}

function Analysis(text)	{
	var n = text.length;
	var ind;
	var a = [];
	a[0] = [];
	a[0][0] = n;
	//a[0][1] = n;
	for (i = 0; i < n; i++) {
		ind = text.charCodeAt(i);
		if (ind == 32) continue;
		if (a[ind] != undefined) a[ind][0]++;
		else {
			a[ind] = [];
			a[ind][0] = 1;
			a[ind][1] = ind;
		}
	}
	a.sort(fcompare);
	
	i = 1;	
	while (i < n) {
		if ((a[i] != undefined) && (a[i][1] == a[i-1][1])) {
			a.splice(i, 1);
			i--;
		}
		i++;
	}
	
	return a;
}


function getAnalysis()	{
	
	var t = document.getElementById('t1').children[0];
	var t4 = document.getElementById('t4').children[0];
	var t5 = document.getElementById('t5').children[0];
	var inText="" + document.Analysis.InputText.value;
		
	var n2 = inText.length;
	var alf = Analysis(inText);
	var n = alf.length;
	var first;
	
	if (t.summary != undefined){
		for (i = t.summary - 1; i >= 0; i--) {
			first = t.children[0];
			t.removeChild(first);
			first = t4.children[0];
			t4.removeChild(first);
			first = t5.children[0];
			t5.removeChild(first);
		}
	}
			
	var newtr;
	var newtd; 
	var j = 0;
	
	for (i = 1; i < n; i++) {
		if (alf[i] != undefined) {
			newtr = document.createElement('tr');
			t.appendChild(newtr);
			newtd = document.createElement('td');
			newtd.setAttribute('class', "td1");
			newtd.height = "30px";
			newtd.width = "10px";
			newtd.innerHTML = '<span>' + String.fromCharCode(alf[i][1]) + '</span>';
			t.children[i - 1].appendChild(newtd);
			
			newtr = document.createElement('tr');
			t4.appendChild(newtr);
			newtd = document.createElement('td');
			newtd.height = "30px";
			newtd.innerHTML = '→';
			t4.children[i - 1].appendChild(newtd);
			
			newtr = document.createElement('tr');
			t5.appendChild(newtr);
			newtd = document.createElement('td');
			newtd.height = "30px";
			newtd.innerHTML = alf[i][0] + ' ' + '(' + (alf[i][0]*100/alf[0][0]).toFixed(2) + '%)';
			t5.children[i - 1].appendChild(newtd);
			j++;
		}
	}
	t.summary = j;
}

function upfunction(i){
	var t = document.getElementById('t2');
	var val1, val2;
	if (i == 0) return;
	val1 = t.children[0].children[i-1].children[0].children[0].innerHTML;
	val2 = t.children[0].children[i].children[0].children[0].innerHTML;
	var c = val1;
	val1 = val2;
	val2 = c;
	t.children[0].children[i-1].children[0].children[0].innerHTML = val1;
	t.children[0].children[i].children[0].children[0].innerHTML = val2;
}

function downfunction(i){
	var t = document.getElementById('t2');
	var val1, val2;
	if (t.children[0].children[i+1] == undefined) return;
	val1 = t.children[0].children[i+1].children[0].children[0].innerHTML;
	val2 = t.children[0].children[i].children[0].children[0].innerHTML;
	var c = val1;
	val1 = val2;
	val2 = c;
	t.children[0].children[i+1].children[0].children[0].innerHTML = val1;
	t.children[0].children[i].children[0].children[0].innerHTML = val2;
}

function getAnalysisGen()	{
	
	var t = document.getElementById('t2');
	var tb3 = document.getElementById('t3').children[0];
	var inText="" + document.Sample.SampleText.value;
		
	var n2 = inText.length;
	var alf = Analysis(inText);
	var n = alf.length;
	var first;
	
	if (t.summary != undefined){
		for (i = t.summary - 1; i >= 0; i--) {
			first = t.children[0].children[0];
			t.children[0].removeChild(first);
			first = tb3.children[0];
			tb3.removeChild(first);			
		}
	}
			
	var newtr;
	var newtd; 
	var j = 0;
	
	for (i = 1; i < n; i++) {
		if (alf[i] != undefined)  {
			newtr = document.createElement('tr');
			t.children[0].appendChild(newtr);
			newtd = document.createElement('td');
			newtd.setAttribute('class', "td2");
			newtd.height = "30px";
			newtd.width = "10px";
			var part1,val,part2,part3;
			val = String.fromCharCode(alf[i][1]);
			part1 = '<span>' + val + '</span>';
			val = i-1;
			newtd.innerHTML = part1;// + part2 + part3;
			t.children[0].children[i - 1].appendChild(newtd);
			
			newtr = document.createElement('tr');
			tb3.appendChild(newtr);
			newtd = document.createElement('td');
			//newtd.setAttribute('class', "tdbutt");
			newtd.height = "30px";
			part2 = '<INPUT TYPE="button" VALUE="↑" onClick="upfunction(' + val + ')">';
			part3 = '<INPUT TYPE="button" VALUE="↓" onClick="downfunction(' + val + ')">';
			newtd.innerHTML = part2 + part3;
			tb3.children[i - 1].appendChild(newtd);
			j++;
		}
	}
	t.summary = j;
}
	/*var nowtr = t.children[0].children[i];
	newtr = document.createElement('tr');
	t.children[0].insertBefore(newtr, nowtr);
	<INPUT TYPE="button" VALUE="вверх" onClick="upfunction(0)"><INPUT TYPE="button" VALUE="вниз" onClick="downfunction(0)">
	var nowtd = t.children[0].children[i].children[0];
	newtd = document.createElement('td');	
	
	val = '<span>' + val + '</span>' + '<INPUT TYPE="button" VALUE="вверх" onClick="upfunction(' + i + ')"><INPUT TYPE="button" VALUE="вниз">';
	newtd.innerHTML = val;	
	t.children[0].children[i].appendChild(newtd);
	getResult()*/


function getResult(){
	var t1 = document.getElementById('t1');
	var t2 = document.getElementById('t2');
	var inText="" + document.Analysis.InputText.value;
	var n = inText.length;
	var f = [];
	var n1 = t1.children[0].summary;
		n1 = Number(n1);
	var n2 = Number(t2.summary);
	if (n1 > n2) {
		document.Final.OutputText.value = "ERROR: НЕВОЗМОЖНО ОДНОЗНАЧНО ЗАМЕНИТЬ";
		return;
	}
	var i;
	var a,b;
	var out = "";
	for (i = 0; i < n1; i++){
		a = t1.children[0].children[i].children[0].children[0].innerHTML;
		b = t2.children[0].children[i].children[0].children[0].innerHTML;
		f[a] = b;
	}
	for (i = 0; i < n; i++){
		a = inText.charAt(i);
		if ((a != ' ') && (a != '\n')) {
			b = f[a];
			out+=b;
		}
	}
	
	document.Final.OutputText.value = out;
	
}




































