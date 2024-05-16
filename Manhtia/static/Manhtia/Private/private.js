//accept an agreement
document.getElementById("check").value = "If Yes. Click Access.";
document.getElementById("logbut").onclick = () => {
    if(document.getElementById("check").value == "If Yes. Click Access."){
        document.getElementById("login").innerHTML = "Access Successfully.";
        document.getElementById("login").style.display = "none";
        main_mature(data_mature);

    }

};
//starting page
function main_mature(data){

    document.getElementById("others").style.display = "block";
    
    var numcontPerpage = 50;
    var num_page = data.length / numcontPerpage;
    var page = 1;
    for (var a = 1; a <= num_page + 1; a++){
        var opt = document.createElement('option');
        opt.value = a;
        opt.innerHTML = a;
        document.getElementById("page").appendChild(opt);
    }

    var name = [];
    for(var i = 0; i < data.length; i++){

        if(!name.includes(data[i].Name)){

            name.push(data[i].Name);
            
        }
        
    }
    var datalist = document.getElementById("list");

    for(var o = 0; o < data.length; o++){
        if(name.includes(data[o].Name)){
            const option = document.createElement('option');
            option.text = data[o].Name;
            option.value = data[o].Name;
            datalist.appendChild(option);
        }
        
    }
    document.getElementById("namesg").oninput = () => {

        document.getElementById("content").innerHTML = "";
        for(var o = 0; o < data.length; o++){
            if(data[o].Name.toLowerCase().includes(document.getElementById("namesg").value.toLowerCase())){
                create(data, data, o, name);
            }
        }

    };
    document.getElementById("go").onclick = () => {
        document.getElementById("content").innerHTML = "";
        num_page = document.getElementById("page").options[document.getElementById("page").selectedIndex].text;
        max = (num_page * numcontPerpage);
        min = max - numcontPerpage;
        for(var i = min; i < max; i++){

            if(name.includes(data[i].Name)){
    
                create(data, i, name);
    
            }
        }
    }
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex + 1].value;
        document.getElementById("go").click();
    }
    document.getElementById("prev").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex - 1].value;
        document.getElementById("go").click();
    }
    onc();

}

function onc(){
    document.getElementById("content").innerHTML = "";
    document.getElementById("go").click();
}

function opensearch(){
    if(document.getElementById("data").style.display == "none"){
        document.getElementById("data").style.display = "block";
    }else{document.getElementById("data").style.display = "none";}
}

function search(num){

    document.getElementById("data_show_search").innerHTML = "";
        
    if(num == 0){

        var namest = [];
        
        fetch(data_csv_mature).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(rt){
            for(var i = 0; i < rt.length; i++){

                namest.push(rt[i].Name);

            }
            var millisecondsToWait = 500;
            setTimeout(function() {
                fetch("https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv").then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){
                

                    if(document.getElementById("markasmature").value == "uncensored"){
                        document.getElementById("content").innerHTML = "";
                    }
                    for(var i = 0; i < csv.length; i++){

                        if(csv[i].Spoil.includes("mark as mature") && !(namest.includes(csv[i].Name)) && document.getElementById("markasmature").value == "mark as mature"){
    
                            var datas = document.createElement("label");
                            var br = document.createElement("br");
                            datas.innerHTML = "Name: >>" + csv[i].Name + " (Part: " + (Math.floor(i / 5) + 1) + " Number: " + (i + 1) + ")";
                            document.getElementById("data_show_search").appendChild(datas);
                            document.getElementById("data_show_search").appendChild(br);
    
                        }
                        if(csv[i].Spoil.includes("uncensored") && namest.includes(csv[i].Name) && document.getElementById("markasmature").value == "uncensored"){
    
                            create(undata, data, i, csv[i].Name);
                            
                        }
    
                    }
                });

            }, millisecondsToWait);
        
        });

    }

    if(num == 1){

        fetch(data_csv_mature).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){
            for(var i = 0; i < csv.length; i++){

                if(csv[i].Status == "Finish"){

                    var datas = document.createElement("label");
                    var br = document.createElement("br");
                    datas.innerHTML = "Name: >>" + csv[i].Name;
                    document.getElementById("data_show_search").appendChild(datas);
                    document.getElementById("data_show_search").appendChild(br);

                }

            }
        });

    }

}

//create mature showing pane
function create(data, i, name){

    var index = name.indexOf(data[i].Name);

    var main_div = document.createElement("div");
    var name_div = document.createElement("div");
    var data_div = document.createElement("div");
    var cove_div = document.createElement("div");
    var each_div = document.createElement("div");
    var each_button = document.createElement("button");
    var cove_img = document.createElement("img");
    var views = document.createElement("label");
    var statuss = document.createElement("label");
    var more_data = document.createElement("label");
    var br = document.createElement("br");
    var br2 = document.createElement("br");
    var br3 = document.createElement("br");

    main_div.style.width = "320px";
    name_div.innerHTML = data[i].Name;
    name_div.style.fontWeight = "700";
    name_div.setAttribute("id", "name");

    var status = "Ongoing";
    if(data[index].Status == "Finish"){status = "<img style='width: 20px; border-radius: 7px;' src='https://i.pinimg.com/564x/f2/ef/15/f2ef15f64d2724857a6093175a72c8d8.jpg'>";}
    
    var name_link = document.createElement('a');
    var linkText = document.createTextNode("(All)");
    name_link.appendChild(linkText);
    name_link.title = data[i].Name;
    name_link.href = data[i].Name;
    name_link.style.width = "120px";

    //18+ filter
    var filter_link = document.createElement('a');
    var filterlinkText = document.createTextNode("(18+)");
    filter_link.appendChild(filterlinkText);
    filter_link.href = "/manhtia/content/" + data[i].Name + "/filter?filter=18";
    filter_link.style.width = "40px";
    //15+ filter
    var filter_link15 = document.createElement('a');
    var filterlinkText15 = document.createTextNode("(15+)");
    filter_link15.appendChild(filterlinkText15);
    filter_link15.href = "/manhtia/content/" + data[i].Name + "/filter?filter=15";
    filter_link15.style.width = "40px";
    //abs filter
    var filter_linkab = document.createElement('a');
    var filterlinkTextab = document.createTextNode("(Abs)");
    filter_linkab.appendChild(filterlinkTextab);
    filter_linkab.href = "/manhtia/content/" + data[i].Name + "/filter?filter=abs";
    filter_linkab.style.width = "40px";

    views.innerHTML = "View: ";
    data_div.appendChild(views);
    data_div.appendChild(name_link);
    data_div.appendChild(filter_link);
    data_div.appendChild(filter_link15);
    data_div.appendChild(filter_linkab);
    statuss.innerHTML = "Status: " + status;
    data_div.appendChild(statuss);
    more_data.innerHTML = "Detail: ";
    var more_link = document.createElement('a');
    var moreText = document.createTextNode("More...");
    more_link.appendChild(moreText);
    more_link.title = data[i].Name;
    more_link.href = "/manhtia/content/" + data[i].Name;
    more_link.style.width = "60px";
    data_div.appendChild(br);
    data_div.appendChild(each_button);
    data_div.appendChild(each_div);
    data_div.appendChild(br2);
    data_div.appendChild(br3);
    data_div.appendChild(more_data);
    data_div.appendChild(more_link);
    each_div.style.display = "none";

    each_button.innerHTML = "Explore";
    each_button.onclick = () => {
        if(each_button.innerText == "Hide"){

            each_button.innerText = "Explore";
            each_div.style.display = "none";

        }
        else{

            each_button.innerText = "Hide";
            each_div.style.display = "block";
            each_div.innerHTML = "Part Viewer";

            for(var ind = 0; ind < data.length; ind++){

                if(data[ind].Name == data[i].Name){

                    var link = data[ind].Link;
                    var linkget = link.replaceAll("edit?usp=sharing", "export?format=csv")
                    fetch(linkget).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(link){
                        var partpop = [];
                        for(var j = 0; j < link.length; j++){
                            if(!partpop.includes(link[j].Part)){

                                partpop.push(link[j].Part);
                                var linkl = document.createElement("a");
                                var linkText = document.createTextNode(link[j].Part);
                                linkl.style.fontWeight = "500";
                                linkl.appendChild(linkText);
                                linkl.title = link[j].Part;
                                linkl.href = data[i].Name + "/" + link[j].Part;
                                linkl.style.width = "170px";
                                each_div.appendChild(linkl);
                    
                            }
                        }
                    });

                    break;

                }

            }

        }
    }

    data_div.style.width = "170px";
    data_div.style.float = "left";

    
    for(var j = 0; j < data_story.length; j++){

        if(data_story[j].Name == data[i].Name){
            cove_img.setAttribute("src", data_story[j].Cover);
            break;
        }

    }

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

//reset search
function reset(){
    document.getElementById("namesg").value = "";
    document.getElementById("markasmature").value = "none";
    document.getElementById("finish").value = "none";
    document.getElementById("data_show_search").innerHTML = "";
    onc();
}
