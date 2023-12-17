//Load data from API
const nameit = document.getElementById("namest").innerHTML.replaceAll(" ", "%20");
const data_csv_main = `https://script.google.com/macros/s/AKfycbwSEtn6YgAO9Hu4WPoEr8ZCUMxrVM94v_0U6iQyvOHtG6GOi7BF9Gn1jh4ULPZLi-YJ6Q/exec?q=1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M&name=${ nameit }&p=Sheet1`;

fetch(data_csv_main)
    .then(d => d.json())
    .then(d => {
        main(d);
    })

function main(data){
    
    //Set number of showing from window size.
    var win_width = window.innerWidth;
    if(win_width >= 1300){document.getElementById("content").style.columns = 4;}
    if(win_width < 1300 && win_width >= 1000){document.getElementById("content").style.columns = 3;}
    if(win_width < 1000 && win_width >= 700){document.getElementById("content").style.columns = 2;}
    if(win_width < 700){document.getElementById("content").style.columns = 1;}
    document.getElementById("content").innerHTML = "";

    //Get name from html
    var name = document.getElementById("namest").innerText;
    
    //First step create all images
    for(var i = 0; i < data.data.length; i++){

        if(name == data.data[i][0]){

            create(data, i, "*");

        }

    }


    //Create images by filter
    document.getElementById("filter").onchange = () => {
        document.getElementById("content").innerHTML = "";
        if(document.getElementById("filter").value == "a"){
            for(var i = 0; i < data.data.length; i++){

                if(name == data.data[i][0]){
        
                    create(data, i, "*");
                            
                }
        
            }
        }
        if(document.getElementById("filter").value !== "a"){
            for(var i = 0; i < data.data.length; i++){

                if(name == data.data[i][0]){
        
                    create(data, i, document.getElementById("filter").value);
                            
                }
        
            }
        }
    };
}

//Create image to show
function create(data, i, status){

    var img = document.createElement("img");

    img.setAttribute("src", data.data[i][1]);
    img.setAttribute("class", "eachpic");

    img.onclick = function (e) {
        var src = e.srcElement.src;
        document.getElementById("bigimage").src = src;
        document.getElementById("showbig").style.display = "block";
    };

    if(status === "*"){

    document.getElementById("content").appendChild(img);

    }
    if(status !== "*" && data.data[i][2] === document.getElementById("filter").value){

        document.getElementById("content").appendChild(img);

    }
    
}
function closebig(){
    document.getElementById("showbig").style.display = "none";
}