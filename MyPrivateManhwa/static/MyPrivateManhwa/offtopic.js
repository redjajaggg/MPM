const data_csv_format = "https://docs.google.com/spreadsheets/d/1QSKNpJMKRRC88XWmtBL1POLiCaYI8c9CFNxNzQ1VOak/export?format=csv";

fetch(data_csv_format).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){appenddata(csv);});
function appenddata(data){
    var allshow = document.getElementById("showall");
    var che = [];
    var namelist = [];
    var sepname = [];
    //All
    document.getElementById("showall").innerHTML = "";
    for(var i = 0; i < data.length; i++){
        namelist.push(data[i].Name);
        sepname.push(data[i].Name + " : " + data[i].Subscript);
        create(i);
    }
    function create(i){
        
        const option = document.createElement('option');
        option.value = data[i].Name + " : " + data[i].Subscript;
        document.getElementById("namesss").appendChild(option);
        if(!che.includes(data[i].Name)){
            che.push(data[i].Name);
            const options = document.createElement('option');
            options.value = data[i].Name;
            document.getElementById("namess").appendChild(options);
        }
        
        
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        if(data[i].Status == "n"){data[i].Status = "";}
        div1.innerHTML = data[i].Name + " : " + data[i].Subscript + " " + data[i].Status;
        div2.innerHTML = "<a href=" + data[i].Link1 + ">here I</a> | <a href=" + data[i].Link2 +">here II</a> | <a href=" + data[i].Link3 + ">here III</a> | <a href=" + data[i].Link4 + ">here IV</a> | <a href=" + data[i].Link5 + ">here V</a>";

        div1.style.backgroundColor = "#8cb8ff";
        div1.style.padding = "3px";
        div1.style.borderRadius = "5px";
        div2.style.padding = "5px";
        allshow.appendChild(div1);
        allshow.appendChild(div2);
    }
    document.getElementById("search").onclick = () => {
        var count = 0;
        for(var i = 0; i < data.length; i++){
            if(document.getElementById('nameget').value == data[i].Name){
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                if(data[i].Status == "n"){data[i].Status = "";}
                div1.innerHTML = data[i].Name + " : " + data[i].Subscript + " " + data[i].Status;
                div2.innerHTML = "<a href=" + data[i].Link1 + ">here I</a> | <a href=" + data[i].Link2 +">here II</a> | <a href=" + data[i].Link3 + ">here III</a> | <a href=" + data[i].Link4 + ">here IV</a> | <a href=" + data[i].Link5 + ">here V</a>";
                document.getElementById("show").appendChild(div1);
                document.getElementById("show").appendChild(div2);
                count++;
            }
            if(document.getElementById('namesget').value == data[i].Name + " : " + data[i].Subscript){
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                if(data[i].Status == "n"){data[i].Status = "";}
                div1.innerHTML = data[i].Name + " : " + data[i].Subscript + " " + data[i].Status;
                div2.innerHTML = "<a href=" + data[i].Link1 + ">here I</a> | <a href=" + data[i].Link2 +">here II</a> | <a href=" + data[i].Link3 + ">here III</a> | <a href=" + data[i].Link4 + ">here IV</a> | <a href=" + data[i].Link5 + ">here V</a>";
                document.getElementById("show").appendChild(div1);
                document.getElementById("show").appendChild(div2);
                count++;
            }
                
        }
        document.getElementById("count").innerHTML = "( Found: " + count + " )";
        
    };
    document.getElementById("cleartext1").onclick = () => {
        document.getElementById("count").innerHTML = "( Found: null )";
        document.getElementById('namesget').value = "";
        document.getElementById('nameget').value = "";
        document.getElementById('show').innerHTML = "";
    };
    if(window.innerWidth > 1000){

        document.getElementById("all").style.float = "right";
        document.getElementById("website").style.float = "left";
    }
    if(window.innerWidth <= 1000){
        document.getElementById("website").style.display = "none";
    }

}