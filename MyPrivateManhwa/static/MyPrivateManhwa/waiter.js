const data_csv_format = "https://docs.google.com/spreadsheets/d/1pbpK7MUUdhQ4H6mr5wbh7FjFnEsDnzmXeq9Gv9EcJys/export?format=csv";

fetch(data_csv_format).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){appenddata(csv);});
function appenddata(data){
    var allshow = document.getElementById("wait");
    var che = [];
    var namelist = [];
    var sepname = [];
    //All
    document.getElementById("wait").innerHTML = "";
    for(var i = 0; i < data.length; i++){
        create(i);
    }
    function create(i){
        
        var div1 = document.createElement('div');
        var div2 = document.createElement('div');
        var div3 = document.createElement('div');
        var show = document.createElement('button');
        if(data[i].Status == "n"){data[i].Status = "";}
        div1.innerHTML = data[i].Name;
        div2.innerHTML = "<a href=" + data[i].Novel + ">here I</a> | <a href=" + data[i].Link1 +">here II</a> | <a href=" + data[i].Link2 + ">here III</a>";
        show.innerHTML = "Picture";
        div3.innerHTML = "<img src='" + data[i].Pic1 + "'>" + "<img src='" + data[i].Pic2 + "'>" + "<img src='" + data[i].Pic3 + "'>" +"<img src='" + data[i].Pic4 + "'>" + "<img src='" + data[i].Pic5 + "'>";

        div3.style.display = "none";
        div1.style.backgroundColor = "#8cb8ff";
        div1.style.padding = "3px";
        div1.style.borderRadius = "5px";
        div2.style.padding = "5px";
        show.onclick = () => {
            if(div3.style.display === "none"){
                div3.style.display = "block";
            }
            else{
                div3.style.display = "none"
            }
        }
        
        allshow.appendChild(div1);
        allshow.appendChild(div2);
        allshow.appendChild(show);
        allshow.appendChild(div3);
    }

}