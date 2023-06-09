const datause = "https://docs.google.com/spreadsheets/d/1ccgb2RTmSqblYdbqCSP6kyByCfYkKy7fX56eqldgzaA/export?format=csv";
fetch(datause).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){appenddata(csv);});

function appenddata(data){
    var pop = [];
    for(var i = 0; i < data.length; i++){
        if(!pop.includes(data[i].Name)){
            if(data[i].Name.includes(document.getElementById("nameget").innerText)){
                pop.push(data[i].Name);
            }
            
        }
    }
var datalist = document.getElementById("names");
for(const names of pop){
    const option = document.createElement('option');
    option.value = names;
    datalist.appendChild(option);
}
    document.getElementById("picvdo").innerHTML = "Choose or All";
    document.getElementById("clearname").onclick = () => {document.getElementById("name").value = ""; document.getElementById("picvdo").innerHTML = "Choose or All";}
    document.getElementById("search").onclick = () => {
        document.getElementById("picvdo").innerHTML = "";
        for(var i = 0; i < data.length; i++){
            create2(document.getElementById("name").value);
        }
    }
    var pp = [];
    function create2(nameget){
        
        var div = document.createElement("div");
        var but = document.createElement("button");
        var br = document.createElement("br");

        const private = document.getElementById("picvdo");
        const privateshow = document.getElementById("picvdoshow");
        
        if(!pp.includes(nameget)){
            but.innerHTML = nameget;
            
            private.appendChild(div);
            but.addEventListener("click", function(){
                privateshow.innerHTML = "";
                for(var j = 0; j < data.length; j++){
                    if(data[j].Name == nameget){
                        var img = document.createElement("img");
                        img.setAttribute('src', data[j].Link);
                        img.setAttribute('width', 400);
                        privateshow.style.textAlign = "center";
                        privateshow.appendChild(img);
                            
                    }
                }
            });
            private.appendChild(but);
            private.appendChild(br);
            pp.push(nameget);

        }       

    }
    
}

