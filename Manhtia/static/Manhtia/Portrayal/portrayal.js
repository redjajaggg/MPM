var is_logged_in = document.getElementById("usernamecheck").innerHTML;
if(is_logged_in === "True"){
    console.log("Logged in.");
}
else{
    document.body.innerHTML = "<h3>Not Logged in yet. Please login <a href='/manhtia/login'>here</a></h3>";
}
//portrayal database link
const portrayal_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M&p=Sheet1";
const data_csv_portrayal = "https://docs.google.com/spreadsheets/d/1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M/export?format=csv";

try{
    fetch(portrayal_database).then(data => data.json()).then(data => {main_portrayal(data);})
}catch(error){
    fetch(data_csv_portrayal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){main_portrayal(data);});
}

function main_portrayal(data){

    var namepop = [];
    for(var i = 0; i < data.length; i++){

        if(!namepop.includes(data[i].Name)){
            namepop.push(data[i].Name);
        }

    }
    var datalist = document.getElementById("namelist");
    var selection_list = document.getElementById("namest");
    for(const names of namepop){
        const option = document.createElement('option');
        option.value = names;
        datalist.appendChild(option);

        const option_select = document.createElement('option');
        option_select.text = names;
        option_select.value = names;
        selection_list.appendChild(option_select);
    }
    document.getElementById("namest").onchange = () => {
        
        getdatafromchange(data);

    };

    document.getElementById("searchs").onclick = () => {
        getdatafromchange(data);
    };

    document.getElementById("filter").onclick = () => {
        if(document.getElementById("filter").innerText == "Main"){
            document.getElementById("filter").innerText = "Sub";
        }else{
            document.getElementById("filter").innerText = "Main";
        }
        document.getElementById("searchs").click();
    };

}

function getdatafromchange(data){

    var win_width = window.innerWidth;
    if(win_width >= 1300){document.getElementById("content").style.columns = 4;}
    if(win_width < 1300 && win_width >= 1000){document.getElementById("content").style.columns = 3;}
    if(win_width < 1000 && win_width >= 700){document.getElementById("content").style.columns = 2;}
    if(win_width < 700){document.getElementById("content").style.columns = 1;}
    document.getElementById("content").innerHTML = "";
    var name = document.getElementById("namest").value;
    var filter = "";
    if(document.getElementById("filter").innerText == "Main"){filter = "n";}else{filter = "e";}
    for(var i = 0; i < data.length; i++){

        if(name == data[i].Name){

            create(data, i, filter);

        }

    }
    var ass = document.createElement('a');
    var moreText = document.createTextNode(name);
    ass.appendChild(moreText);
    ass.title = name;
    ass.href = name;
    document.getElementById("viewers").innerHTML = "Viewer: ";
    document.getElementById("viewers").appendChild(ass);

    document.getElementById("search_port_name").value = "";

}

function showportsearch(){
    if(document.getElementById("search_port_name").style.display == "none"){
        document.getElementById("search_port_name").style.display = "inline";
    }else{
        document.getElementById("search_port_name").style.display = "none";
    }
}

//type for search
function search_portrayal(){

    var name = document.getElementById("search_port_name").value;

    for(var i = 0; i < document.getElementById("namest").options.length; i++){

        if(document.getElementById("namest").options[i].value === name){

            document.getElementById("namest").value = document.getElementById("namest").options[i].value;
            
        }

    }

    document.getElementById("searchs").click();

}

function create(data, i, filter){

    var name = document.createElement("div");
    var img = document.createElement("img");

    name.innerHTML = document.getElementById("namest").value;
    img.setAttribute("src", data[i].Link);
    img.setAttribute("class", "eachpic");
    img.onclick = function (e) {
        var src = e.srcElement.src;
        document.getElementById("bigimage").src = src;
        document.getElementById("showbig").style.display = "block";
    };

    if(data[i].Status == filter){
        document.getElementById("content").appendChild(img);
    }
}

function closebig(){
    document.getElementById("showbig").style.display = "none";
}