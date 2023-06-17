const data_csv_main = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const data_csv_normal = "https://docs.google.com/spreadsheets/d/1Mn2FDBvSjufDqNNxBn1SHVHFaCF0EnXnFDuwiS-Nbpg/export?format=csv";
const data_csv_mature = "https://docs.google.com/spreadsheets/d/1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc/export?format=csv";
fetch(data_csv_normal).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){normal(csv);});
fetch(data_csv_mature).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){mature(csv);});
         
document.getElementById("logbut").onclick = () => {

    if(document.getElementById("check").value == "112523"){
        document.getElementById("login").innerHTML = "Access Successfully.";
        document.getElementById("login").style.display = "none";
        fetch(data_csv_main).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv);});

    }

};
var eachMature;

function mature(data){

    eachMature = data;

}

function main(data){

    document.getElementById("others").style.display = "block";

    var name = [];
    for(var i = 0; i < eachMature.length; i++){

        if(!name.includes(eachMature[i].Name)){

            name.push(eachMature[i].Name);
            
        }
        
    }
    for(var i = 0; i < data.length; i++){

        if(name.includes(data[i].Name)){

            create(data, eachMature, i, name);

        }

    }

}

function create(data, eachMature, i, name){

    var index = name.indexOf(data[i].Name);

    var main_div = document.createElement("div");
    var name_div = document.createElement("div");
    var data_div = document.createElement("div");
    var cove_div = document.createElement("div");
    var cove_img = document.createElement("img");

    main_div.style.width = "320px";
    name_div.innerHTML = data[i].Name;
    name_div.style.fontWeight = "700";
    name_div.setAttribute("id", "name");

    var status = "Ongoing";
    if(eachMature[index].Status == "Finish"){status = "Finish";}
    var link = "<a href='" + eachMature[index].Link + "'>DataBase</a>";
    var view = "<a href='" + data[i].Name + "'>Explore</a>";
    data_div.innerHTML = "View: " + view + "<br>Edit: " + link + "<br>Status: " + status;
    data_div.style.width = "120px";
    data_div.style.float = "left";

    cove_img.setAttribute("src", data[i].Cover);
    cove_img.style.width = "100px";
    cove_img.style.borderRadius = "5px";

    cove_div.appendChild(cove_img);
    cove_div.style.width = "120px";
    cove_div.style.float = "right";

    main_div.appendChild(name_div);
    main_div.appendChild(data_div);
    main_div.appendChild(cove_div);
    main_div.setAttribute("id", "each");
    document.getElementById("content").appendChild(main_div);

}

function normal(data){

    //Notificate
    if(data[0].Status == "yes"){document.getElementById("notificate").style.display = "block"; document.getElementById("notificate").innerHTML = "Notification: " + data[0].Info;}
    for(var i = 0; i < data.length; i++){

        if(data[i].Status == "yes"){

            var a = document.createElement("div");
            var app = document.getElementById("app");

            if(data[i].Group == "kr"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>" + data[i].Name;
                app.appendChild(a);

            }

            if(data[i].Group == "en"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a> " + data[i].Name;
                app.appendChild(a);

            }

            if(data[i].Group == "th"){

                a.innerHTML = "<a href='" + data[i].Info + "'><img id='slink' src='" + data[i].Piclink + "'></a>" + data[i].Name;
                app.appendChild(a);

            }

            a.style.width = " 300px";
            a.style.textAlign = "left";
            a.style.overflow = " hidden";
            a.style.marginRight = " auto";
            a.style.marginLeft = " auto";

            if(data[i].Name == "Newtoki"){

                domain_newtoki = data[i].Info;

            }

        }

    }

}
