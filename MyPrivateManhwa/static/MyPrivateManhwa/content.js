if(window.innerWidth <= 400){ //phone
    document.getElementById("check_head1").style.display = "none";
    document.getElementById("pages").style.display = "none";
    
    document.getElementById("searchpane").style.display = "none";
    document.getElementById("updates").style.display = "block";
    function myFunction(){
        if(document.getElementById("myDropdown").style.display == "block"){
            document.getElementById("myDropdown").style.display = "none";
        }
        else{
            document.getElementById("myDropdown").style.display = "block";
        }
    };
}
else{ //desktop
    document.getElementById("check_head2").style.display = "none";
    document.getElementById("update").style.float = "right";
}
function minisearchopen(){

    if(document.getElementById("searchpane").style.display === "none"){
        document.getElementById("searchpane").style.display = "block";
    }
    else{
        document.getElementById("searchpane").style.display = "none"
    }
    if(document.getElementById("updates").style.display === "none"){
        document.getElementById("updates").style.display = "block";
    }
    else{
        document.getElementById("updates").style.display = "none"
    }
}

//create content
const data_csv_format = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const datadark = "https://docs.google.com/spreadsheets/d/1HsH40yVrlcWrSLXn0qEG06BR7X_YS4YUQyFbEzaEf7Y/export?format=csv";
const datapic = "https://docs.google.com/spreadsheets/d/1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M/export?format=csv";
const datamore = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";

fetch(data_csv_format).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){appenddata(csv);});
function appenddata(data){

    //top pane
    var main = document.getElementById("main");
    var eachs = document.getElementById("each");
    var eachi = document.getElementById("eachin");
    main.innerHTML = "";
    var index = 0;

    var num_each;
    if(window.innerWidth >= 1200){num_each = 50}else{num_each = 25}
    var num_page = data.length / num_each;
    var max = (num_page * num_each);
    var min = max - num_each;
    for (var a = 1; a <= num_page + 1; a++){
        var opt = document.createElement('option');
        opt.value = a;
        opt.innerHTML = a;
        document.getElementById("page").appendChild(opt);
    }
    for(var i = 0; i < num_each; i++){
        index = 0;
        create(i);
        document.getElementById("allnum").innerHTML = index + 1;
        index++;
    }

    document.getElementById("alls").onclick = () => {
        index = 0;
        main.innerHTML = "";
        for(var i = 0; i < data.length; i++){
            create(i);
            document.getElementById("allnum").innerHTML = index + 1;
            index++;
        }
    }
    document.getElementById("gos").onclick = () => {
        index = 0;
        main.innerHTML = "";
        num_page = document.getElementById("page").options[document.getElementById("page").selectedIndex].text;
        max = (num_page * num_each);
        min = max - num_each;
        for(var i = min; i < max; i++){
            create(i);
            document.getElementById("allnum").innerHTML = index + 1;
            index++;
        }
    }
    
    document.getElementById("next").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex + 1].text;
        document.getElementById("gos").click();
    }
    document.getElementById("prev").onclick = () => {
        const se = document.querySelector('#page');
        se.value = document.getElementById("page").options[document.getElementById("page").selectedIndex - 1].text;
        document.getElementById("gos").click();
    }
    //Right pane
    var datalist = document.getElementById("names");
    var datalistpart = document.getElementById("parts");
    const todayw = new Date();
    var getdayw = todayw.getDay();
    let no = 1;
    for (var i = 0; i < data.length; i++) {
        var namess = data[i].Name;
        const option = document.createElement('option');
        option.value = namess;
        datalist.appendChild(option);
    };
    for(var k = 0; k < data.length; k++){
        if(getdayw == 0){getdayw = 7;}
        if(getdayw == data[k].Date && data[k].Status !== "end"){
            ok(k);
        }
      }
      function ok(k){
        
        var uppane = document.createElement("div");
        var uppart = document.createElement("div");
        var search = document.createElement("button");
        var add = document.getElementById("nameg");
        var sea = document.getElementById("search");
        uppane.innerHTML = no.toString() + ". " + data[k].Name;
        uppart.innerHTML = "Part: " + data[k].Part + " : ";
        search.innerHTML = "explore";
        search.style.fontFamily = "Brush Script MT";
        search.addEventListener("click", function(){
            add.value = data[k].Name;
            sea.click();
        });
        search.style.backgroundColor = "#49eb34";
        search.style.borderRadius = "10px";
        document.getElementById("updates").appendChild(uppane);
        document.getElementById("updates").appendChild(uppart);
        document.getElementById("updates").appendChild(search);
        no++;
      }
    for (var partss = 1; partss <= data.length / 5 + 1; partss++) {
        const option = document.createElement('option');
        option.value = partss;
        datalistpart.appendChild(option);
    };   
    document.getElementById("search").onclick = () => {
        let namegets = document.getElementById("nameg").value;
        let partgets = document.getElementById("partg").value;
        let websgets = document.getElementById("haswebg").value;
        let statgets = document.getElementById("statug").value;
        let dategets = document.getElementById("datedg").value;
        //name
        if(namegets != ""){
            main.innerHTML = "";
            for(var i = 0; i < data.length; i++){
                if(data[i].Name == namegets){create(i);}
            }
        }
        //part
        else if(partgets != "" && namegets == ""){
            partt = partgets;
            main.innerHTML = "";
            for(var i = 0; i < data.length; i++){
                if(data[i].Part == partgets){create(i);}
            }
        
        }
        //web
        else if(websgets != "" && namegets == ""){
            main.innerHTML = "";
            for(var i = 0; i < data.length; i++){
                if(data[i].Website == websgets){create(i);}
            }
        }
        //status
        else if(statgets != "" && namegets == ""){
            partt = 0;
            main.innerHTML = "";
            for(var i = 0; i < data.length; i++){
                if(data[i].Status == statgets){create(i);}
            }
        }
        //date
        else if(!dategets == "" && namegets == ""){
            partt = 0;
            main.innerHTML = "";
            for(var i = 0; i < data.length; i++){
                if(data[i].Date.substring(0, 1) == dategets){create(i);}
            }
        }
    };
    document.getElementById("cleartext1").onclick = () => {
        location.reload();
    };
    document.getElementById("spoil").onclick = () => {
        var namespoil = document.getElementById("nameg").value;
        namespoil = namespoil.replaceAll(" ", "+");
        window.location.href = "https://www.google.com/search?q=" + namespoil + "+spoil";
    };
    

    //main pane
    function create(i){
        
        var par = document.createElement("div");
        var each_big = document.createElement("div");
        var each_upt = document.createElement("div");
        var each_name = document.createElement("div");
        var each_info = document.createElement("div");
        var each_cov = document.createElement("div");
        var each_link = document.createElement("div");
        var each_pic = document.createElement("img");

        var each_exp = document.createElement("button");

        par.innerHTML = "Part " + data[i].Part;
        par.style.backgroundColor = "#ff7c6b";
        par.style.padding = "5px";
        par.style.borderRadius = "7px";
        if(i % 5 == 0){main.appendChild(par);}

        each_pic.setAttribute('src', data[i].Cover);
        each_pic.onclick = () => {
            if(each_pic.offsetWidth == 100){
                each_pic.style.width = "300px";
                each_info.style.display = "none";
                each_exp.style.display = "none";
            }else{
                each_pic.style.width = "100px";
                each_info.style.display = "block";
                each_exp.style.display = "block";
                
            }
        };
        const today = new Date();
        var getday = today.getDay();
        if(getday == 0){getday = 7;}
        if(getday == data[i].Date && data[i].Status !== "end"){
            each_upt.innerHTML = "Update!";
            each_upt.style.backgroundColor = "red";
            each_upt.style.textAlign = "center";
            each_upt.style.fontSize = "30px";
            each_upt.style.borderRadius = "20px";
        }
        if(getday - 1 == data[i].Date && data[i].Status != "end"){
            each_upt.innerHTML = "Check Translate";
            each_upt.style.backgroundColor = "blue";
            each_upt.style.textAlign = "center";
            each_upt.style.fontSize = "30px";
            each_upt.style.borderRadius = "20px";
        }
        if(data[i].Date.substring(0, 1) == "n"&& data[i].Status != "end"){
            var random = Math.floor(Math.random() * (data.length + 1));
            if(data[i].Date == "n"){
                if(random % 2 == 0){
                    each_upt.innerHTML = "Might Update...";
                    each_upt.style.backgroundColor = "lightgreen";
                    each_upt.style.textAlign = "center";
                    each_upt.style.fontSize = "30px";
                    each_upt.style.borderRadius = "20px";
                }
            }
            
            var date_pinn = new Date(data[i].Date.substring(1, 11));
            var date_today = new Date();
            var date_every = data[i].Date.substring(11);
            var time_dif = date_today.getTime() - date_pinn.getTime();
            var count_day = Math.round(time_dif / (1000 * 60 * 60 * 24));
            if(count_day % date_every == 0){
                each_upt.innerHTML = "Update!";
                each_upt.style.backgroundColor = "lightgreen";
                each_upt.style.textAlign = "center";
                each_upt.style.fontSize = "30px";
                each_upt.style.borderRadius = "20px";
            }
            if(count_day % date_every == 1){
                each_upt.innerHTML = "Check Translate";
                each_upt.style.backgroundColor = "lightgreen";
                each_upt.style.textAlign = "center";
                each_upt.style.fontSize = "30px";
                each_upt.style.borderRadius = "20px";
            }
        }
        var newtoki = data[data.length - 1].Newtoki;
        var domain = newtoki.substring(0, 31);
        var go = domain + data[i].Newtoki.substring(31);
        var raw = "";
        var newto = "";
        var eng = "";
        var other = "";
        if(data[i].Rawweb != "n"){raw = "<a href='"+ data[i].Rawweb + "'>RawM</a> |";}
        if(data[i].Newtoki != "n"){newto = "<a href='" + go + "'>RawL</a> |"}
        if(data[i].Translate != "n"){eng = "<a href='" + data[i].Translate + "'>English</a> |";}
        if(data[i].Otherweb != "n"){other = "<a href='" + data[i].Otherweb + "'>Other</a>";}
        each_name.innerHTML = data[i].Name;
        each_cov.appendChild(each_pic);
        if(data[i].Status == "end"){each_info.innerHTML = "Part: " + data[i].Part + "<br>" + "Date: " + covertdate(data[i].Date) + " {END}<br>" + "Number: " + data[i].Number;}
        if(data[i].Status != "end"){each_info.innerHTML = "Part: " + data[i].Part + "<br>" + "Date: " + covertdate(data[i].Date) + "<br>" + "Number: " + data[i].Number;}
        each_exp.innerHTML = "More..."
        each_exp.onclick = () => {
            window.scrollTo(0, 0);
            eachs.innerHTML = "";
            main.style.display = "none";
            eachs.style.display = "block";
            
            eachi.style.display = "block";
            const main_data = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
            fetch(main_data).then(results=>results.text()).then(function (csvtexts){return csv().fromString(csvtexts);}).then(function(csvs){each(data[i].Name, csvs);});
            
            /*else{
                window.scrollTo(0, 0);
                eachs.innerHTML = data[i].Name;
                fetch(datapic).then(results=>results.text()).then(function (csvtexts){return csv().fromString(csvtexts);}).then(function(csvs){potra(data[i].Name, csvs);});
            }*/
            
        };
        each_link.innerHTML = raw + newto + eng + other;
        
        main.className = "parent";
        main.style.textAlign = "center";
        main.style.overflow = "hidden";
        each_big.className = "child";
        each_big.style.width = "300px";
        each_big.style.textAlign = "left";
        each_big.style.backgroundColor = "#cfd7ff";
        if(data[i].Website == "yes"){each_big.style.backgroundColor = "#e896ff";}
        each_big.style.padding = "7px";
        each_big.style.borderRadius = "7px";

        each_name.style.fontWeight = "900";
        each_name.style.fontSize = "20px";
        each_name.style.backgroundColor = "yellow";
        each_name.style.padding = "5px";
        each_name.style.borderRadius = "7px";
        each_info.style.width = "150px";
        each_info.style.float = "left";

        each_pic.style.width = "100px";
        each_pic.style.float = "right";
        each_pic.style.borderRadius = "7px";
        each_exp.className = "contentbut";
        each_exp.style.width = "70px";
        each_exp.style.fontSize = "16px";

        if(window.innerWidth >= 1200){ // desktop version
            main.style.padding = "10px";
            par.style.gridColumn = "1 / span 3"
            main.style.display = "grid";
            main.style.setProperty('grid-template-columns', 'repeat(3, 1fr)');
            main.style.gap = "20px";
            main.style.gridAutoFlow = "row";
            main.style.gridAutoRows.minmax = "0, auto";
        }
        if(window.innerWidth > 400 && window.innerWidth < 1200){
            main.style.padding = "10px"
            par.style.gridColumn = "1 / span 2"
            main.style.display = "grid";
            main.style.setProperty('grid-template-columns', 'repeat(2, 1fr)');
            main.style.gap = "20px";
            main.style.gridAutoFlow = "row";
            main.style.gridAutoRows.minmax = "0, auto";
        }else{main.style.marginBottom = "10px";}

        each_big.appendChild(each_upt);
        each_big.appendChild(each_name);
        each_big.appendChild(each_info);
        each_info.appendChild(each_link);
        each_big.appendChild(each_cov);
        each_big.appendChild(each_exp);

        main.appendChild(each_big);
    }
    function each(name, datae){
        //if(window.innerWidth >= 300){eachi.style.width = "500px";}
        eachs.innerHTML = "";
        eachi.innerHTML = "";
        var names = document.createElement("div");
        var namel = document.createElement("div");
        var moreshow = document.createElement("div");
        var back = document.createElement("button")
        var potr = document.createElement("button")

        back.innerHTML = "Back";
        potr.innerHTML = "Potrayal";
        back.className = "contentbut";
        potr.className = "contentbut";
        back.onclick = () => {
            main.style.display = "block";
            eachs.style.display = "none";
            eachi.style.display = "none";
            document.getElementById("gos").click();
            window.scrollTo(0, 0);
        };
        potr.onclick = () => {
            eachs.innerHTML = name;
            eachi.style.display = "none";
            fetch(datapic).then(results=>results.text()).then(function (csvtexts){return csv().fromString(csvtexts);}).then(function(csvs){potra(name, csvs);});
            window.scrollTo(0, 0);
        };
        eachi.appendChild(back);
        eachi.appendChild(potr);

        names.innerHTML = name;
        namel.innerHTML = name + "'s Chapter";

        names.style.fontSize = "22px";
        names.style.border = "3px solid";
        names.style.borderRadius = "7px";
        namel.style.fontSize = "18px";

        eachi.appendChild(names);
        eachi.appendChild(moreshow);
        eachs.appendChild(namel);

        fetch(datamore).then(resultsi=>resultsi.text()).then(function (csvtextsi){return csv().fromString(csvtextsi);}).then(function(csvsi){
            var data = csvsi;
            for(var i = 0; i < data.length; i++){
                if(data[i].Name == name){
                    var anames = document.createElement("div");
                    var type = document.createElement("div");
                    var noti = document.createElement("div");
                    var spoil = document.createElement("div");
                    var butspoil = document.createElement("button");
                    var flagl;
                    var rate;
                    if(data[i].Nation == "kr"){flagl = "https://i.pinimg.com/564x/26/16/8c/26168cddf75348cc28299de4daddcb5b.jpg";}
                    if(data[i].Nation == "cn"){flagl = "https://i.pinimg.com/564x/d0/96/c0/d096c0d511574bb41a18ed61deb5a06e.jpg";}
                    if(data[i].Nation == "th"){flagl = "https://i.pinimg.com/564x/ca/bc/d3/cabcd397c3831d374df02e52d127b9f1.jpg";}
                    
                    if(data[i].Rate == "n"){rate = "";}
                    if(data[i].Rate == "15"){rate = "R15 (15+)";}
                    if(data[i].Rate == "18"){rate = "R18 (18+)";}
                    
                    var types = data[i].Type;
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
                    types = types.trim();
                    anames.innerHTML = "Alternative: " + data[i].AssName + "  <img src='" + flagl + "' style='width: 30px; border-radius: 2px;'>" + rate;
                    type.innerHTML = "Type: " + types;

                    if(data[i].Notificate != "n"){
                        noti.innerHTML = "Notice: " + data[i].Notificate;
                        noti.style.backgroundColor = "yellow";
                    }
                    if(data[i].Notificate == "c"){
                        noti.innerHTML = "Notice: Completely!";
                        noti.style.backgroundColor = "yellow";
                    }
                    
                    moreshow.style.backgroundColor = "#a8eb34";
                    moreshow.style.padding = "5px";
                    moreshow.appendChild(anames);
                    moreshow.appendChild(type);
                    moreshow.appendChild(noti);
                    
                    butspoil.innerHTML = "Spoil";
                    if(data[i].Spoil != "n"){
                        moreshow.appendChild(butspoil);
                        spoil.innerHTML = data[i].Spoil;
                        spoil.style.backgroundColor = "#b0d9ff";
                        moreshow.appendChild(spoil);
                    }
                    spoil.style.display = "none";
                    spoil.style.padding = "7px";
                    spoil.style.position = "absolute";
                    
                    butspoil.style.background = "none";
                    butspoil.style.borderRadius = "10px";
                    butspoil.onclick = () => {
                        if(spoil.style.display == "none"){
                            spoil.style.display = "block";
                            butspoil.innerHTML = "HideSpoil"
                        }else{
                            spoil.style.display = "none";
                            butspoil.innerHTML = "Spoil"
                        }
                    };
                    

                }
            }
        });

        for(var i = 0; i < datae.length; i++){
            if(datae[i].Name == name){
                var link = datae[i].DataStoreLocation;
                var linkget = link.replace("edit?usp=sharing", "export?format=csv")
                fetch(linkget).then(resultt=>resultt.text()).then(function (csvtextt){return csv().fromString(csvtextt);}).then(function(csvt){getinfolink(csvt);});
                function getinfolink(datai){
                    var mancov = document.createElement("img");
                    var novcov = document.createElement("img");
                    var caption = document.createElement("div");
                                        
                    mancov.setAttribute('src', datai[4].Info1);
                    if(datai[3].Info1 != "n"){novcov.setAttribute('src', datai[3].Info1);}
                    caption.innerHTML = datai[5].Info1;

                    for(var j = 9; j < datai.length; j++){
                        var chap = document.createElement("div");
                        var chap2 = document.createElement("div");
                        var stae = document.createElement("div");
                        
                        chap.innerHTML = "<a href='" + datai[j].Info1 + "'>"+ datai[j].Topic +"</a>";
                        if(datai[j].Info2 != "n"){chap2.innerHTML = "<a href='" + datai[j].Info2 + "'>" + datai[j].Topic + " Part II</a>";}
                        if(datai[j].Status != "n"){chap.innerHTML = "<a href='" + datai[j].Info1 + "'>"+ datai[j].Topic +"</a> " + datai[j].Status;}
                        eachs.appendChild(chap);
                        eachs.appendChild(chap2);
                    }


                    mancov.style.width = "300px";
                    mancov.style.borderRadius = "10px";
                    caption.style.backgroundColor = "#caf8fa";
                    caption.style.padding = "5px";
                    caption.style.borderRadius = "7px";

                    eachi.appendChild(mancov);
                    if(datai[3].Info1 != "n"){novcov.style.width = "300px"; novcov.style.borderRadius = "10px"; eachi.appendChild(novcov);}
                    eachi.appendChild(caption);
                    
                    var cggdrive1 = document.createElement("div")
                    var cggdrive2 = document.createElement("div")
                    var cggdrive3 = document.createElement("div")
                    var cggdrive4 = document.createElement("div")
                    var cggdrive5 = document.createElement("div")
                    var cggdrive6 = document.createElement("div")
                    var piczip = document.createElement("div");
                    var picRzip = document.createElement("div");
                    var pdfRzip = document.createElement("div");
                    eachi.appendChild(cggdrive1);
                    cggdrive1.innerHTML = "<br><a href=" + datai[6].Info1 + ">Google Drive I</a><br><br>";
                    if(datai[7].Info1 != "n"){
                        cggdrive2.innerHTML = "<a href=" + datai[7].Info1 + ">Google Drive II</a><br><br>";
                        eachi.appendChild(cggdrive2);
                    }
                    if(datai[8].Info1 != "n"){
                        cggdrive3.innerHTML = "<a href=" + datai[8].Info1 + ">Google Drive III</a><br><br>";
                        eachi.appendChild(cggdrive3);
                    }
                    if(datai[6].Info2 != "n"){
                        cggdrive4.innerHTML = "<a href=" + datai[6].Info2 + ">Google Drive IV</a><br><br>";
                        eachi.appendChild(cggdrive4);
                    }
                    if(datai[7].Info2 != "n"){
                        cggdrive5.innerHTML = "<a href=" + datai[7].Info2 + ">Google Drive V</a><br><br>";
                        eachi.appendChild(cggdrive5);
                    }
                    if(datai[8].Info2 != "n"){
                        cggdrive6.innerHTML = "<a href=" + datai[8].Info2 + ">Google Drive VI</a><br><br>";
                        eachi.appendChild(cggdrive6);
                    }
                    if(datai[0].Info2 != "n"){
                        piczip.innerHTML = "<a href=" + datai[0].Info2 + ">Download All Chapter(.jpg in .zip file)</a><br><br>";
                        eachi.appendChild(piczip);
                    }
                    if(datai[1].Info2 != "n"){
                        picRzip.innerHTML = "<a href=" + datai[1].Info2 + ">Download R19 Moment(.jpg in .zip file)</a><br><br>";
                        eachi.appendChild(picRzip);
                    }
                    if(datai[1].Status != "n"){
                        pdfRzip.innerHTML = "<a href=" + datai[1].Status + ">Download R19 Moment(.pdf in .zip file)</a><br><br>";
                        eachi.appendChild(pdfRzip);
                    }
                }
            }
        }
    }
    function potra(name, datap){
        fetch(datadark).then(resultsr=>resultsr.text()).then(function (csvtextsr){return csv().fromString(csvtextsr);}).then(function(csvsr){darks(csvsr, name)});
        var back = document.createElement("button");
        back.innerHTML = "Back";
        back.className = "contentbut";
        back.onclick = () => {
            main.style.display = "block";
            eachs.style.display = "none";
            eachi.style.display = "none";
            document.getElementById("gos").click();
            window.scrollTo(0, 0);
        };
        eachs.appendChild(back);
        for(var i = 0; i < datap.length; i++){
            if(datap[i].Name == name){
                var pic = document.createElement("img");
                pic.setAttribute('src', datap[i].Link);
                pic.style.width = "295px";
                pic.style.border = "3px solid";
                pic.style.borderRadius = "5px";
                eachs.appendChild(pic);
            }
        }
    }
    function darks(datad, name){
        var told = document.createElement("div");
        for(var i = 0; i < datad.length; i++){
            if((datad[i].Name).includes(name)){
                told.innerHTML = "Adult content is in Private page.";
                eachs.appendChild(told);
                
            }
        }
    }
    
    function covertdate(date){

        var datelast = "";
        if(date == "1"){
            datelast = "Mon-Tue";
        }
        else if(date == "2"){
            datelast = "Tue-Wed";
        }
        else if(date == "3"){
            datelast = "Wed-Thu";
        }
        else if(date == "4"){
            datelast = "Thu-Fri";
        }
        else if(date == "5"){
            datelast = "Fri-Sat";
        }
        else if(date == "6"){
            datelast = "Sat-Sun";
        }
        else if(date == "7"){
            datelast = "Sun-Mon";
        }
        else if(date == "n"){
            datelast = "Unknown";
        }
        else if(date.substring(0, 1) == "n"){
            datelast = "Every " + date.substring(11) + " days";
        }
        
        return datelast;
    }
}

