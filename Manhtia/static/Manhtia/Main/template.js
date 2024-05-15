//create for developer v1
function create(data, i){

    try {
        if(document.getElementById("developer").checked == true){
            document.getElementById("normalcontent").id = "content";
        } 
    } 
    catch (error) {}
    
    var main_div = document.createElement("div");
    var up_div = document.createElement("div");
    var name_div = document.createElement("div");
    var name_link = document.createElement("a");
    var web_check = document.createElement("div");
    var data_div = document.createElement("div");
    var cove_div = document.createElement("div");
    var cove_img = document.createElement("img");
    var more_div = document.createElement("div");
    var alte_div = document.createElement("div");
    var genr_div = document.createElement("div");
    var part_div = document.createElement("div");
    var more_but = document.createElement("button");

    var upd = "";

    var getday = getday_korea()[0];
    var getdate = getday_korea()[1];
    
    //every 7 days
    //up today
    if(getday == data[i].Date && data[i].Status !== "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/48/63/be/4863be978d4b93227aeb215e6bdf0739.jpg'>";}
    if(getday == 0){getday = 7;}
    //up yesterday
    if(getday - 1 == data[i].Date && data[i].Status != "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/22/04/cc/2204cc955737d2ec1d8250a5d10d248d.jpg'>";}
    
    up_div.style.borderRadius = "22px";
    up_div.style.fontSize = "20px";

    up_div.innerHTML = upd;
    web_check.innerHTML = "<img id='more_told' src='https://i.pinimg.com/564x/70/04/79/700479c6e38c5cdf852a6f8ae2a61aa5.jpg'>";
    web_check.style.float = "right";

    main_div.style.width = "320px";
    var linkText = document.createTextNode(data[i].Name);
    name_link.style.fontWeight = "700";
    name_link.appendChild(linkText);
    name_link.title = data[i].Name;
    name_link.href = "/manhtia/content/" + data[i].Name;
    name_link.style.width = "250px";
    name_div.setAttribute("id", "name");
    name_div.appendChild(name_link);
    name_div.style.padding = "10px";

    var newtokilink = data[i].Newtoki + "";
    var newnewtokilink = newtoki_domain + newtokilink.substring(23);
    
    var link1 = "";
    var link2 = "";
    var link3 = "";
    var link4 = "";
    var status = "";
    if(data[i].Status == "end"){status = "<br>Status: <img style='width: 17px;' id='more_told' src='https://i.pinimg.com/564x/f2/ef/15/f2ef15f64d2724857a6093175a72c8d8.jpg'>";}
    if(data[i].Rawweb != "n"){link1 = "<a class='modernlink' href='" + data[i].Rawweb + "'>RawM</a>"}
    if(data[i].Newtoki != "n"){link2 = "<a class='modernlink' href='" + newnewtokilink + "'>RawL</a>"}
    if(data[i].Translate != "n"){link3 = "<a class='modernlink' href='" + data[i].Translate + "'>English</a>"}
    if(data[i].Otherweb != "n"){link4 = "<a class='modernlink' href='" + data[i].Otherweb + "'>Other</a>"}
    data_div.innerHTML = "Part: " + data[i].Part + "<br>Date: <label id='date_check_it'>" + convert_date(data[i].Date) + "</label> " + status + "<br>Number: " + data[i].Number + "<br>" + link1 + link2 + link3 + link4;
    data_div.style.width = "150px";
    data_div.style.float = "left";
    data_div.style.textAlign = "left";

    cove_img.setAttribute("src", data[i].Cover);
    cove_img.style.width = "100px";
    cove_img.style.borderRadius = "5px";
    cove_img.setAttribute("class", "coverimg");
    
    cove_div.style.width = "101px";
    cove_div.style.float = "right";
    cove_div.appendChild(cove_img);

    more_but.innerHTML = "More...";
    more_but.onclick = () => {

        if(more_but.innerText == "More..."){
            more_but.innerText = "Hide";
            more_div.style.display = "block";
        }
        else{
            more_but.innerText = "More...";
            more_div.style.display = "none";
        }
    };


    try{

        alte_div.innerHTML = "";
        genr_div.innerHTML = "Genre: ";

        more_div.style.display = "none";
        data_div.appendChild(more_but);
        more_div.appendChild(alte_div);
        more_div.appendChild(genr_div);

        var types = data_more[i].Type;
        types = types.trim();
        types = types.replaceAll("rf", "RomanceFantacy");
        types = types.replaceAll("mt", "Adult");
        types = types.replaceAll("bl", "BL");
        types = types.replaceAll("rm", "Romance");
        types = types.replaceAll("ft", "Fantacy");
        types = types.replaceAll("dm", "Drama");
        types = types.replaceAll("ov", "OmegaVerse");
        types = types.replaceAll("cm", "Comedy");
        types = types.replaceAll("ir", "Isekai-Reverse time");
        types = types.replaceAll("sf", "Sci-Fi");
        types = types.replaceAll("at", "Action");
        types = types.replaceAll("fm", "Family");
        types = types.replaceAll("cv", "CakeVerse");
        types = types.replaceAll("gv", "GuideVerse");
        types = types.replaceAll("nv", "NameVerse");
        types = types.replaceAll("av", "AnimalVerse");
        types = types.replaceAll("ot", "OtherVerse");
        types = types.replaceAll("mp", "Male Pregnancy");
        genr_div.innerHTML += types;
        var rate;
        if(data_more[i].Rate == "n"){rate = "All age";}
        if(data_more[i].Rate == "15"){rate = "R15";}
        if(data_more[i].Rate == "18"){rate = "R18";}
        if(data_more[i].AssName == "n"){data_more[i].AssName = "Unknown";}
        var national;
        if(data_more[i].Nation == "kr"){national = "<img src='https://i.pinimg.com/564x/26/16/8c/26168cddf75348cc28299de4daddcb5b.jpg' style='width: 30px;'>";}
        if(data_more[i].Nation == "cn"){national = "<img src='https://i.pinimg.com/564x/d0/96/c0/d096c0d511574bb41a18ed61deb5a06e.jpg' style='width: 30px;'>";}
        if(data_more[i].Nation == "th"){national = "<img src='https://i.pinimg.com/564x/ca/bc/d3/cabcd397c3831d374df02e52d127b9f1.jpg' style='width: 30px;'>";}
        var overall;
        if(data_more[i].Notificate == "n"){overall = "Ongoing";}
        if(data_more[i].Notificate == "c"){overall = "Completed";}
        var morelink1 = "";
        var morelink2 = "";
        var morelink3 = "";
        if(data_more[i].Morelink1 != "n"){morelink1 = "<a href='" + data_more[i].Morelink1 + "'>(Other I)</a>";}
        if(data_more[i].Morelink2 != "n"){morelink2 = "<a href='" + data_more[i].Morelink2 + "'>(Other II)</a>";}
        if(data_more[i].Morelink3 != "n"){morelink3 = "<a href='" + data_more[i].Morelink3 + "'>(Other III)</a>";}

        var detail_it = data_more[i].Spoil.split(" ");
        for(var di = 0; di < detail_it.length; di++){
            if(detail_it[di].includes("UpdateEvery")){
                data_div.innerHTML = "Part: " + data[i].Part + "<br>Date: <label id='date_check_it'>" + detail_it[di].substring(12) + "</label> " + status + "<br>Number: " + data[i].Number + "<br>" + link1 + link2 + link3 + link4;
                data_div.appendChild(more_but);
                if((detail_it[di].includes(getdate) || detail_it[di].includes(getdate + 1) || detail_it[di].includes(getdate - 1)) && data[i].Status != "end"){
                    upd = "<img id='more_told' src='https://i.pinimg.com/564x/48/63/be/4863be978d4b93227aeb215e6bdf0739.jpg'>";
                    up_div.innerHTML = upd;
                }
            }
        }

        alte_div.innerHTML += morelink1 + morelink2 + morelink3 + "<label style='overflow: hidden'><br>Associate: " +  data_more[i].AssName + "</label> " + national + "<br>Rate: " + rate + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+spoiler'>(Spoiler)</a> " + "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+baka'>(Detail)</a>" + "<br>";
        alte_div.innerHTML += "Overall in Manhtia: " + overall;
        alte_div.style.textAlign = "left";

        if(i % 5 == 0){part_div.innerHTML = "Part " + data[i].Part; document.getElementById("content").appendChild(part_div); part_div.style.gridColumn = "1 / span 3"; part_div.style.marginLeft = "auto"; part_div.style.marginRight = "auto"; part_div.setAttribute("class", "moderndiv");}
        if(window.innerWidth < 900){part_div.style.marginLeft = "3px";}
        cove_img.onclick = () => {

            if(cove_img.offsetWidth == 100){
                cove_img.style.width = "320px";
                data_div.style.display = "none";
                more_div.style.display = "none";
                cove_div.style.float = "left";
            }else{
                cove_img.style.width = "100px";
                data_div.style.display = "block";
                cove_div.style.float = "right";
                more_but.innerText = "More...";
            }

        };

    }catch(error){}
    

    //Moredata for website = yes
    var each_data = document.createElement("button");
    each_data.innerHTML = "Other";
    if(data[i].Website == "yes"){more_div.appendChild(each_data);}
    each_data.onclick = () => {
        const data_csv_main_ = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
        fetch(data_csv_main_).then(resultw=>resultw.text()).then(function (csvtextw){return csv().fromString(csvtextw);}).then(function(data_each_main){
            for(var o = 0; o < data_each_main.length; o++){

                if(data_each_main[o].Name == data[i].Name){
                    var link = data_each_main[o].DataStoreLocation;
                    var read_link = link.replace("edit?usp=sharing", "export?format=csv");
                    fetch(read_link).then(resultwy=>resultwy.text()).then(function (csvtextwy){return csv().fromString(csvtextwy);}).then(function(data_each_sub){

                        var main_data_div = document.createElement("div");
                        var cove_manh_img = document.createElement("img");
                        var cove_nove_img = document.createElement("img");
                        var capt_data_div = document.createElement("div");
                        var chap_data_div = document.createElement("div");
                        var eachi = document.createElement("div");

                        if(data_each_sub[3].Info1 != "n"){
                            cove_manh_img.setAttribute("src", data_each_sub[3].Info1);
                            cove_manh_img.style.width = "150px";
                            cove_manh_img.style.borderRadius = "5px";
                            cove_manh_img.setAttribute("class", "coverimg");
                            main_data_div.appendChild(cove_manh_img);
                            main_data_div.style.borderTop = "solid 2px";
                        }
                        
                        cove_nove_img.setAttribute("src", data_each_sub[4].Info1);
                        cove_nove_img.style.width = "150px";
                        cove_nove_img.style.borderRadius = "5px";
                        cove_nove_img.setAttribute("class", "coverimg");
                        //capt_data_div.innerHTML = "<label style='font-weight: bold;'>Caption</label><br>" + "-Explore in detail-";
                        chap_data_div.innerHTML = "<label style='font-weight: bold;'>Chapter RoadMap</label><br>";
                        chap_data_div.style.borderTop = "solid 2px";

                        var cggdrive1 = document.createElement("div")
                        var cggdrive2 = document.createElement("div")
                        var cggdrive3 = document.createElement("div")
                        var cggdrive4 = document.createElement("div")
                        var cggdrive5 = document.createElement("div")
                        var cggdrive6 = document.createElement("div")
                        
                        eachi.appendChild(cggdrive1);
                        cggdrive1.innerHTML = "<br><a href=" + data_each_sub[6].Info1 + ">Google Drive I</a><br><br>";
                        if(data_each_sub[7].Info1 != "n"){
                            cggdrive2.innerHTML = "<a href=" + data_each_sub[7].Info1 + ">Google Drive II</a><br><br>";
                            eachi.appendChild(cggdrive2);
                        }
                        if(data_each_sub[8].Info1 != "n"){
                            cggdrive3.innerHTML = "<a href=" + data_each_sub[8].Info1 + ">Google Drive III</a><br><br>";
                            eachi.appendChild(cggdrive3);
                        }
                        if(data_each_sub[6].Info2 != "n"){
                            cggdrive4.innerHTML = "<a href=" + data_each_sub[6].Info2 + ">Google Drive IV</a><br><br>";
                            eachi.appendChild(cggdrive4);
                        }
                        if(data_each_sub[7].Info2 != "n"){
                            cggdrive5.innerHTML = "<a href=" + data_each_sub[7].Info2 + ">Google Drive V</a><br><br>";
                            eachi.appendChild(cggdrive5);
                        }
                        if(data_each_sub[8].Info2 != "n"){
                            cggdrive6.innerHTML = "<a href=" + data_each_subdata_each_sub[8].Info2 + ">Google Drive VI</a><br><br>";
                            eachi.appendChild(cggdrive6);
                        }

                        if(data_each_sub[5].Info2 == "n"){

                            for(var c = 9; c < data_each_sub.length; c++){
                                var cd = document.createElement("div");
                                var status_c = data_each_sub[c].Status;
                                if(status_c == "n"){status_c = "";}
                                if(data_each_sub[c].Info2 != "n"){cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> <a href='" + data_each_sub[c].Info2 + "'>" + data_each_sub[c].Topic + " Part II</a> " + status_c;}
                                else{cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> " + status_c;}
                                
                                chap_data_div.appendChild(cd);
                            }

                        }
                        var cdcheck = document.createElement("div");
                        for(var c = 9; c < data_each_sub.length; c++){

                            var add_status = document.createElement("div");
                            if(data_each_sub[c].Topic.substring(data_each_sub[c].Topic.length - 1) == "."){

                                if(data_each_sub[5].Info2 == "yes"){
                                    cdcheck.innerHTML = "Currently is <label style='font-weight: bold;'>" + data_each_sub[c].Topic + "</label> Count: " + c + "<br>Bookmark: " + data_each_sub[0].Info2 + "(Self)<br>Bookmark: " + data_each_sub[0].Status + "(Auto)";
                                    if(data_each_sub[c].Status != "n"){add_status.innerHTML = data_each_sub[c].Topic + data_each_sub[c].Status;}
                                    chap_data_div.appendChild(cdcheck);
                                    chap_data_div.appendChild(add_status);
                                }

                            }
                            if(data_each_sub[c].Topic.substring(data_each_sub[c].Topic.length - 1) != "." && data_each_sub[5].Info2 == "yes"){

                                var cd = document.createElement("div");
                                var status_c = data_each_sub[c].Status;
                                if(status_c == "n"){status_c = "";}
                                if(data_each_sub[c].Info2 != "n"){cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> <a href='" + data_each_sub[c].Info2 + "'>" + data_each_sub[c].Topic + " Part II</a> " + status_c;}
                                else{cd.innerHTML = "<a href='" + data_each_sub[c].Info1 + "'>" + data_each_sub[c].Topic + "</a> " + status_c;}
                                
                                chap_data_div.appendChild(cd);

                            }
                            
                        }
                        /*var esfr = document.createElement('label');
                        esfr.innerHTML = "*Some story has other language version.";*/                                        
                        main_data_div.appendChild(cove_nove_img);
                        //main_data_div.appendChild(capt_data_div);
                        main_data_div.appendChild(eachi);
                        main_data_div.appendChild(chap_data_div);
                        //main_data_div.appendChild(esfr);
                        more_div.appendChild(main_data_div);

                    });
                }

            }
        });
    };
    

    main_div.appendChild(up_div);
    main_div.appendChild(name_div);
    main_div.appendChild(data_div);
    main_div.appendChild(cove_div);
    main_div.appendChild(more_div);
    more_div.style.textAlign = "left";
    more_div.style.float = "left";
    main_div.setAttribute("class", "moderndiv");
    if(data[i].Website == "yes"){name_div.appendChild(web_check);}

    try{

        if(document.getElementById("normal_show_stories").style.display === "block"){
            document.getElementById("normal_each_content").appendChild(main_div);

        }else{
    
            document.getElementById("content").appendChild(main_div);

        }

    }catch(error){}

}

//normal create for ordinary
function normalcreate(data, i){

    try {
        document.getElementById("content").id = "normalcontent";
        var win_width = window.innerWidth;
    } 
    catch (error) {}

    if(document.getElementById("ordinary").checked == true){

        var main_link = document.createElement("a");
        var main_span = document.createElement("img");
        main_span.className = "normalspan";
    
        main_link.appendChild(main_span);
        main_link.href = "/manhtia/content/" + data[i].Name;
    
        main_span.setAttribute('src', data[i].Cover);
    
        document.getElementById("normalcontent").appendChild(main_link);

    }
    else{
        //normal create along with data and console display
        var console_all = document.createElement("div");
        console_all.style.borderBottom = "1px solid black";
        console_all.style.borderLeft = "10px solid black";
        console_all.style.textAlign = "left";
        console_all.style.padding = "5px";
        console_all.style.height = "fit-content";
        console_all.onmouseover = () => {
            console_all.style.borderLeft = "10px solid red";
            console_all.style.borderBottom = "1px solid red";
        }
        console_all.onmouseout = () => {
            console_all.style.borderLeft = "10px solid black";
            console_all.style.borderBottom = "1px solid black";
        }

        console_all.innerHTML = `

            <img src='${data[i].Cover}' style='width: 120px; height: 170px; border-radius: 5px;' onclick="open_cover('${data_story[i].Cover}')">
            <span style='vertical-align: top; float: right; border-left: 1px dashed; padding: 5px;'>
                <label>${update_of_story(i)}</label><br>
                <label><img src='${nation_of_story(data_more[i].Nation)}' id='more_told'</label><br>
                <label>${has_website_story(data_story[i].Website)}</label><br>
                <label>${rate_of_story(data_more[i].Rate)}</label><br>
            </span>
            <span style='vertical-align: top; display: inline-block;'>
                <a href="/manhtia/content/${data[i].Name}" style='font-weight: 700; font-size: 20px;'>${data[i].Name}</a><br>
                <label style='font-weight: 200; font-size: 11px;'>  (${n_to_unknown(data_more[i].AssName)})</label><br>
                <label style='font-weight: 700;'>  Part: </label>${data[i].Part} | 
                <label style='font-weight: 700;'>  Date: </label>${check_unknown(data[i].Date, i)} | 
                <label style='font-weight: 700;'>  Status: </label>${status_of_story(data[i].Status)} <br><br>
                <label style='font-weight: 700;'>  Source: </label> <a href='${data[i].Rawweb}'>Official</a> <a href='${data[i].Translate}'>Translation</a> <a href='${data[i].Otherweb}'>Other</a><br>
                <button onclick="open_meta_pane(${data[i].Number})">More</button>
                <label style='font-weight: 200; font-size: 11px; margin-right: 2px;'>Release: ${check_release(n_to_unknown(data[i].Year)).replace(":", " until ")}</label>
            </span>

        `;
        document.getElementById("normalcontent").appendChild(console_all);

    }

}

function open_meta_pane(number){
    var index = number - 1;
    document.getElementById("normal_show_stories").style.display = "block";
    create(data_story, index);
    
    for(var i = 0; i < data_chapter.length; i++){
        if(data_chapter[i].Name.includes(data_story[index].Name)){
            var span = document.createElement("span");
            span.style.backgroundColor = "white";
            span.style.borderRadius = "5px";
            span.innerHTML = `
                <a href="/manhtia/content/${data_chapter[i].Name}">${data_chapter[i].Name}</a>
            `;
            document.getElementById("normal_each_content").appendChild(span);
        }
    }
}

//change n to unknown
function n_to_unknown(data){
    if(data == 'n'){
        return "Unknown";
    }else{
        return data;
    }
}
function status_of_story(data){
    if(data == 'end'){
        return "<img src='https://i.pinimg.com/564x/f2/ef/15/f2ef15f64d2724857a6093175a72c8d8.jpg' style='width: 17px; border-radius: 50%;'>";
    }else{
        return data;
    }
}
function rate_of_story(data){
    if(data == 'n'){
        return "";
    }else{
        return "R" + data;
    }
}
function update_of_story(i){

    var upd = "";
    var getday = getday_korea()[0];
    var getdate = getday_korea()[1];
    
    //every 7 days
    if(data_story[i].Date !== "n" && data_story[i].Status !== "end"){upd = percent_to_up(getday, data_story[i].Date);}
    if(getday == data_story[i].Date && data_story[i].Status !== "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/48/63/be/4863be978d4b93227aeb215e6bdf0739.jpg'>";}
    if(getday == 0){getday = 7;}
    if(getday - 1 == data_story[i].Date && data_story[i].Status != "end"){upd = "<img id='more_told' src='https://i.pinimg.com/564x/22/04/cc/2204cc955737d2ec1d8250a5d10d248d.jpg'>";}
    
    if(data_more[i].Notificate === "c" && data_story[i].Status === "end"){upd = "<img id='more_told' src='https://i.pinimg.com/736x/b9/84/e2/b984e27c530a0efa40519e032390b591.jpg'>"}
    if(data_more[i].Notificate !== "c" && data_story[i].Status === "end"){upd = "<img id='more_told' src='https://i.pinimg.com/736x/cb/d6/71/cbd6711e4796946c3287f9171841e808.jpg'>"}
    
    return upd;
}
function has_website_story(data){
    if(data === "yes"){
        return "<img id='more_told' src='https://i.pinimg.com/564x/70/04/79/700479c6e38c5cdf852a6f8ae2a61aa5.jpg'>";
    }else{
        return "";
    }
}
function nation_of_story(nation){
    if(nation == "kr"){
        return "https://i.pinimg.com/564x/26/16/8c/26168cddf75348cc28299de4daddcb5b.jpg";
    }else if(nation == "cn"){
        return "https://i.pinimg.com/564x/d0/96/c0/d096c0d511574bb41a18ed61deb5a06e.jpg";
    }else if(nation == "th"){
        return "https://i.pinimg.com/564x/ca/bc/d3/cabcd397c3831d374df02e52d127b9f1.jpg";
    }else{
        return "https://i.pinimg.com/564x/6f/b1/fa/6fb1fa3c16a2aa37a4ab3d7e192b7c2d.jpg";
    }
}
function check_release(data){
    if(data.length < 12 && data != "Unknown"){
        return data + "xxx-xx-xx";
    }else{
        return data;
    }
}
//open cover
function open_cover(cover){

    var bigimages = document.getElementById("full_cover");
    bigimages.src = cover;
    document.getElementById("normal_show_stories").style.display = "block";
}

//Count down to percent days
function percent_to_up(today, date_up){

    var cal = Math.abs((100 / 7) * (date_up - today));
    //if(today > date_up){cal = 100 - cal;}
    return Math.round(cal) + "%";

}
function closestory(){
    document.getElementById("normal_show_stories").style.display = "none";
    document.getElementById("normal_each_content").innerHTML = "";
    var bigimages = document.getElementById("full_cover");
    bigimages.src = "https://i.pinimg.com/564x/6f/b1/fa/6fb1fa3c16a2aa37a4ab3d7e192b7c2d.jpg";
}
//Convert date
function check_unknown(date, i){

    if(date !== 'n'){
        return convert_date(date);
    }else{
        return check10day(date, i);
    }

}
function check10day(date, i){
    if(date === "n" && data_more[i].Spoil.includes("UpdateEvery")){

        var number_date = data_more[i].Spoil.split(" ");
        for(var o = 0; o < number_date.length; o++){

            if(number_date[o].includes("UpdateEvery")){
                return number_date[o].substring(12);
            }

        }

    }else{
        return convert_date(date);
    }
}
function convert_date(date){
    var day = "";
    switch(date){
        case 0: day = "Sun-Mon"; break;
        case 1: day = "Mon-Tue"; break;
        case 2: day = "Tue-Wed"; break;
        case 3: day = "Wed-Thu"; break;
        case 4: day = "Thu-Fri"; break;
        case 5: day = "Fri-Sat"; break;
        case 6: day = "Sat-Sun"; break;
        case "0": day = "Sun-Mon"; break;
        case "1": day = "Mon-Tue"; break;
        case "2": day = "Tue-Wed"; break;
        case "3": day = "Wed-Thu"; break;
        case "4": day = "Thu-Fri"; break;
        case "5": day = "Fri-Sat"; break;
        case "6": day = "Sat-Sun"; break;
        case "n": day = "Unknown"; break;
    }
    return day;
}