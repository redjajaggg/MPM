const data_csv_main = "https://docs.google.com/spreadsheets/d/1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M/export?format=csv";
fetch(data_csv_main).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv);});

function main(data){

    var namepop = [];
    for(var i = 0; i < data.length; i++){

        if(!namepop.includes(data[i].Name)){
            namepop.push(data[i].Name);
        }

    }
    var datalist = document.getElementById("namest");
    for(const names of namepop){
        const option = document.createElement('option');
        option.text = names;
        option.value = names;
        datalist.appendChild(option);
    }
    document.getElementById("namest").onchange = () => {
        
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
        ass.href = "https://redjajappp2.pythonanywhere.com/manhtia/portrayal/" + name;
        document.getElementById("viewers").innerHTML = "Viewer: ";
        document.getElementById("viewers").appendChild(ass);

    };

    document.getElementById("searchs").onclick = () => {
        document.getElementById("content").innerHTML = "";
        var name = document.getElementById("namest").value;
        var filter = "";
        if(document.getElementById("filter").innerText == "Main"){filter = "n";}else{filter = "e";}

        for(var i = 0; i < data.length; i++){

            if(name == data[i].Name){

                create(data, i, filter);

            }

        }
        document.getElementById("viewers").innerHTML = "Viewer: <a href='" + name +"'>" + name + "</a>";
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

function create(data, i, filter){

    var name = document.createElement("div");
    var img = document.createElement("img");

    name.innerHTML = document.getElementById("namest").value;
    img.setAttribute("src", data[i].Link);
    img.setAttribute("class", "eachpic");

    if(data[i].Status == filter){
        document.getElementById("content").appendChild(img);
    }
}