var is_logged_in = document.getElementById("usernamecheck").innerHTML;
if(is_logged_in === "True"){
    console.log("Logged in.");
}
else{
    document.body.innerHTML = "<h3>Not Logged in yet. Please login <a href='/manhtia/login'>here</a></h3>";
}

const meta = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=16WcmbU1GhKq1E0UvrQ7HsIPHwy5ZYxQxJlpZFG3sszM&p=Sheet1";

fetch(meta)
    .then(d => d.json())
    .then(d => {
        gets(d);
    })

var name = [];
var data;
const count_each_page = 100;

function gets(datas){

    data = datas;

    for(var i = 0; i < data.length; i++){

        const option = document.createElement('option');
        option.text = data[i].Name;
        option.value = data[i].Name;
        document.getElementById("names").appendChild(option);

    }
    document.getElementById("content").style.overflow = "hidden";
    document.getElementById("content").style.textAlign = "left";

    
    var num_page = Math.ceil(data.length / count_each_page);
    for(var i = 0; i < num_page; i++){

        var opt = document.createElement('option');
        opt.value = i + 1;
        opt.innerHTML = i + 1;
        document.getElementById("page").appendChild(opt);

    }

}

function nameit(){

    var name = document.getElementById("nameq").value;
    for(var i = 0; i < data.length; i++){

        if(data[i].Name == name){

            document.getElementById("content").innerHTML = `

                <div style='text-align: left;'>
                    <img src='${data[i].Cover}' style='width: 120px;'>
                    ${JSON.stringify(data[i])}
                </div>

            `;

        }

    }

}

function valueit(){

    var meta_value = document.getElementById("meta").value;
    var value_value = document.getElementById("value").value;
    document.getElementById("content").innerHTML = "";
    var page = document.getElementById("page").value;
    var min = (page - 1) * count_each_page;
    var max = page * count_each_page;

    if(meta_value != -1 && value_value != -1){

        for(var i = min; i < max; i++){

            var div = document.createElement("span");
            div.innerHTML = `
                <div style='text-align: left;'>
                    <img src='${data[i].Cover}' style='width: 100px;'>
                    ${JSON.stringify(data[i])}
                </div>
            `;
            document.getElementById("content").appendChild(div);
            
        }

    }

}