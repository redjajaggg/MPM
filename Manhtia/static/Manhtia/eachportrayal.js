const data_csv_main = "https://docs.google.com/spreadsheets/d/1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M/export?format=csv";
fetch(data_csv_main).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv);});
function main(data){
    
    var win_width = window.innerWidth;
    if(win_width >= 1300){document.getElementById("content").style.columns = 4;}
    if(win_width < 1300 && win_width >= 1000){document.getElementById("content").style.columns = 3;}
    if(win_width < 1000 && win_width >= 700){document.getElementById("content").style.columns = 2;}
    if(win_width < 700){document.getElementById("content").style.columns = 1;}
    document.getElementById("content").innerHTML = "";
    var name = document.getElementById("namest").innerText;
    var filter = "";
    
    for(var i = 0; i < data.length; i++){

        if(name == data[i].Name){

            var img = document.createElement("img");

            img.setAttribute("src", data[i].Link);
            img.setAttribute("class", "eachpic");

            document.getElementById("content").appendChild(img);

        }

    }


    document.getElementById("filter").onchange = () => {
        document.getElementById("content").innerHTML = "";
        if(document.getElementById("filter").value == "a"){
            for(var i = 0; i < data.length; i++){

                if(data[i].Name == name){
        
                    var img = document.createElement("img");

                    img.setAttribute("src", data[i].Link);
                    img.setAttribute("class", "eachpic");

                    document.getElementById("content").appendChild(img);
                            
                }
        
            }
        }
        if(document.getElementById("filter").value == "n"){
            for(var i = 0; i < data.length; i++){

                if(data[i].Name == name){
        
                    var img = document.createElement("img");

                    img.setAttribute("src", data[i].Link);
                    img.setAttribute("class", "eachpic");

                    if(data[i].Status == "n"){
                        document.getElementById("content").appendChild(img);
                    }
                            
                }
        
            }
        }
        if(document.getElementById("filter").value == "e"){

            for(var i = 0; i < data.length; i++){

                if(data[i].Name == name){
        
                    var img = document.createElement("img");

                    img.setAttribute("src", data[i].Link);
                    img.setAttribute("class", "eachpic");

                    if(data[i].Status == "e"){
                        document.getElementById("content").appendChild(img);
                    }
                            
                }
        
            }
    
        }
    };
}