const data_csv_format = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const datadark = "https://docs.google.com/spreadsheets/d/1HsH40yVrlcWrSLXn0qEG06BR7X_YS4YUQyFbEzaEf7Y/export?format=csv";
const datapic = "https://docs.google.com/spreadsheets/d/1IYfYPLlBbq8Qw4Q7drtAH8stgHQpLqgfg_ZcWtK6U5M/export?format=csv";
const datamore = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";

fetch(data_csv_format).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){appenddata(csv);});
function appenddata(data){

    var i = 0;
    for(var j = 0; j < data.length; j++){

        if(data[j].Name == document.getElementById("nameget").innerText){
            console.log(data[j].Name);
            i = j;
        }

    }
    
    var info = document.getElementById("info");
    var chapter = document.getElementById("chapter");
    var pic = document.getElementById("picture");

    var one = document.createElement("div");
    var two = document.createElement("div");
    var three = document.createElement("div");
    var cover = document.createElement("img");

    cover.setAttribute('src', data[i].Cover);
    cover.setAttribute("id", "cover");
    var newtoki = data[data.length - 1].Newtoki;
    var domain = newtoki.substring(0, 31);
    var go = domain + data[i].Newtoki.substring(31);
    var raw;
    var newto;
    var eng;
    var other;
    if(data[i].Rawweb != "n"){raw = "<a href='"+ data[i].Rawweb + "'>RawM</a> |";}
    if(data[i].Newtoki != "n"){newto = "<a href='" + go + "'>RawL</a> |"}
    if(data[i].Translate != "n"){eng = "<a href='" + data[i].Translate + "'>English</a> |";}
    if(data[i].Otherweb != "n"){other = "<a href='" + data[i].Otherweb + "'>Other</a>";}
    one.innerHTML = raw + newto + eng + other;

    three.innerHTML = "Part: " + data[i].Part + " Number: " + data[i].Number + " Date: " + covertdate(data[i].Date);

    var each_upt = document.createElement('div');
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

    fetch(datamore).then(resultsi=>resultsi.text()).then(function (csvtextsi){return csv().fromString(csvtextsi);}).then(function(csvsi){
             
        if(csvsi[i].Spoil.includes("mark as mature")){

            var a = document.createElement('button');
            a.innerHTML = "Mature";
            a.onclick = () => { //NOT DYNAMICs
                window.location.assign("https://redjajappp2.pythonanywhere.com/manhtia/private/" + document.getElementById("nameget").innerText) + "/";
            };
            document.getElementById("tops").appendChild(a);
            
        }
        if(csvsi[i].Spoil.includes("uncensored")){

            var a = document.createElement('label');
            a.innerHTML = " (Uncensored)";
            document.getElementById("tops").appendChild(a);

        }
        
        var data = csvsi;
        var moreshow = two;
        var morelink = document.createElement("div");
        var anames = document.createElement("div");
        var type = document.createElement("div");
        var noti = document.createElement("div");
        var spoilt = document.createElement("div");
        var butspoil = document.createElement("button");
        var flagl;
        var rate;
        if(data[i].Nation == "kr"){flagl = "https://i.pinimg.com/564x/26/16/8c/26168cddf75348cc28299de4daddcb5b.jpg";}
        if(data[i].Nation == "cn"){flagl = "https://i.pinimg.com/564x/d0/96/c0/d096c0d511574bb41a18ed61deb5a06e.jpg";}
        if(data[i].Nation == "th"){flagl = "https://i.pinimg.com/564x/ca/bc/d3/cabcd397c3831d374df02e52d127b9f1.jpg";}
                
        if(data[i].Rate == "n"){rate = "";}
        if(data[i].Rate == "15"){rate = "R15 (15+)";}
        if(data[i].Rate == "18"){rate = "R18 (18+)";}

        var l1 = "";
        var l2 = "";
        var l3 = "";
        var spoil = "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+spoiler'>(Spoiler Link)</a>";
        if(data[i].Morelink1 != "n"){l1 = "<a href='" + data[i].Morelink1 + "'>MoreOther I</a>"}
        if(data[i].Morelink2 != "n"){l2 = "<a href='" + data[i].Morelink2 + "'>MoreOther II</a>"}
        if(data[i].Morelink3 != "n"){l3 = "<a href='" + data[i].Morelink3 + "'>MoreOther III</a>"}
        morelink.innerHTML = spoil + " " + l1 + " " + l2 + " " + l3;
                
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
        types = types.replaceAll("cv", "CakeVerse");
        types = types.replaceAll("gv", "GuideVerse");
        types = types.replaceAll("nv", "NameVerse");
        types = types.replaceAll("av", "AnimalVerse");
        types = types.replaceAll("ot", "OtherVerse");
        types = types.replaceAll("mp", "Male Pregnancy");
        types = types.trim();
        anames.innerHTML = "Alternative: " + data[i].AssName + "  <img src='" + flagl + "' style='width: 30px; border-radius: 2px;'>" + rate;
        type.innerHTML = "Type: " + types;

        if(data[i].Notificate != "n"){
            noti.innerHTML = "Notice: " + data[i].Notificate;
            noti.style.backgroundColor = "red";
            noti.style.borderRadius = "10px";
        }
        if(data[i].Notificate == "c"){
            noti.innerHTML = "Notice: Completely!";
            noti.style.backgroundColor = "red";
            noti.style.borderRadius = "10px";
        }
                
        moreshow.style.backgroundColor = "#f0a6a1";
        moreshow.style.padding = "5px";
        moreshow.style.borderRadius = "10px";
        moreshow.appendChild(morelink);
        moreshow.appendChild(anames);
        moreshow.appendChild(type);
        moreshow.appendChild(noti);
                
        butspoil.innerHTML = "More Detail";
        if(data[i].Spoil != "n"){
            moreshow.appendChild(butspoil);
            spoilt.innerHTML = data[i].Spoil;
            spoilt.style.backgroundColor = "#f0a6a1";
            moreshow.appendChild(spoilt);
        }
        spoilt.style.display = "none";
        spoilt.style.padding = "7px";
        spoilt.style.position = "absolute";
        butspoil.style.background = "none";
        butspoil.style.borderRadius = "10px";
        butspoil.onclick = () => {
            if(spoilt.style.display == "none"){
                spoilt.style.display = "block";
                butspoil.innerHTML = "Hide Detail"
            }else{
                spoilt.style.display = "none";
                butspoil.innerHTML = "More Detail"
            }
        };
        if(data[i].Website == "no"){
            chapter.innerHTML = "This manhwa has no chapter and will not update.";
        }
         
    });
    var k = 0;
    const each_data = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
    fetch(each_data).then(results=>results.text()).then(function (csvtexts){return csv().fromString(csvtexts);}).then(function(csvs){each(csvs);});
    function each(datae){
        var k = 0;
        var linkget;
        for(var j = 0; j < datae.length; j++){
            if(datae[j].Name == document.getElementById("nameget").innerText){
                console.log(datae[j].Name);
                k = j;
                var link = datae[j].DataStoreLocation;
                linkget = link.replace("edit?usp=sharing", "export?format=csv")
                fetch(linkget).then(resultt=>resultt.text()).then(function (csvtextt){return csv().fromString(csvtextt);}).then(function(csvt){getinfolink(csvt);});
            }
        }
    }
    function getinfolink(datai){

        var k = 0;
        var caption = document.createElement("div");

        caption.innerHTML = datai[5].Info1;
        caption.style.padding = "5px";
        info.appendChild(caption);

        var chapterpop = [];

        if(datai[5].Info2 == "n"){chapter.innerHTML = "<h3>Chapter</h3>"; chapter.style.height = "400px";}

        for(var j = 9; j < datai.length; j++){

            if(datai[5].Info2 == "n"){
                var chap = document.createElement("div");
                var chap2 = document.createElement("div");
                var stae = document.createElement("div");
                chap.innerHTML = "<a href='" + datai[j].Info1 + "'>"+ datai[j].Topic +"</a>";
                if(datai[j].Info2 != "n"){chap2.innerHTML = "<a href='" + datai[j].Info2 + "'>" + datai[j].Topic + " Part II</a>";}
                if(datai[j].Status != "n"){chap.innerHTML = "<a href='" + datai[j].Info1 + "'>"+ datai[j].Topic +"</a> " + datai[j].Status;}
                chapter.appendChild(chap);
                chapter.appendChild(chap2);
            }

            if(datai[5].Info2 == "yes"){


                if(datai[j].Topic.substring(datai[j].Topic.length - 1) == "."){

                    document.getElementById("chapter_name").innerHTML = datai[j].Topic;
                    document.getElementById("chapter_count").innerHTML = j;
                    if(!chapterpop.includes(datai[j].Topic)){

                        chapterpop.push(datai[j].Topic);
                        var datalist = document.getElementById("choose_chapter");
                        const option = document.createElement('option');
                        option.text = datai[j].Topic;
                        option.value = datai[j].Topic;
                        datalist.appendChild(option);
                        if(datai[j].Status == "n"){datai[j].Status = "";}
                        chapterpage(datai[j].Topic, " " + datai[j].Status);
                    }

                }

            }
            
            
        }
        
        document.getElementById("next").onclick = () => {
            const se = document.querySelector('#choose_chapter');
            se.value = document.getElementById("choose_chapter").options[document.getElementById("choose_chapter").selectedIndex + 1].text;
            display_chapter(datai[0].Info1, datai);
            document.getElementById("allchap").style.display = "none";
        }
        document.getElementById("prev").onclick = () => {
            const se = document.querySelector('#choose_chapter');
            se.value = document.getElementById("choose_chapter").options[document.getElementById("choose_chapter").selectedIndex - 1].text;
            display_chapter(datai[0].Info1, datai);
            document.getElementById("allchap").style.display = "none";
        }
        document.getElementById("choose_chapter").onchange = () => {
            const se = document.querySelector('#choose_chapter');
            se.value = document.getElementById("choose_chapter").options[document.getElementById("choose_chapter").selectedIndex].text;
            display_chapter(datai[0].Info1, datai);
            document.getElementById("allchap").style.display = "none";
        }      
        

        var cggdrive1 = document.createElement("div")
        var cggdrive2 = document.createElement("div")
        var cggdrive3 = document.createElement("div")
        var cggdrive4 = document.createElement("div")
        var cggdrive5 = document.createElement("div")
        var cggdrive6 = document.createElement("div")
        var piczip = document.createElement("div");
        var picRzip = document.createElement("div");
        var pdfRzip = document.createElement("div");
        info.appendChild(cggdrive1);
        cggdrive1.innerHTML = "<br><a href=" + datai[6].Info1 + ">Google Drive I</a><br><br>";
        if(datai[7].Info1 != "n"){
            cggdrive2.innerHTML = "<a href=" + datai[7].Info1 + ">Google Drive II</a><br><br>";
            info.appendChild(cggdrive2);
        }
        if(datai[8].Info1 != "n"){
            cggdrive3.innerHTML = "<a href=" + datai[8].Info1 + ">Google Drive III</a><br><br>";
            info.appendChild(cggdrive3);
        }
        if(datai[6].Info2 != "n"){
            cggdrive4.innerHTML = "<a href=" + datai[6].Info2 + ">Google Drive IV</a><br><br>";
            info.appendChild(cggdrive4);
        }
        if(datai[7].Info2 != "n"){
            cggdrive5.innerHTML = "<a href=" + datai[7].Info2 + ">Google Drive V</a><br><br>";
            info.appendChild(cggdrive5);
        }
        if(datai[8].Info2 != "n"){
            cggdrive6.innerHTML = "<a href=" + datai[8].Info2 + ">Google Drive VI</a><br><br>";
            info.appendChild(cggdrive6);
        }
        if(datai[0].Info2 != "n"){
            piczip.innerHTML = "<a href=" + datai[0].Info2 + ">Download All Chapter(.jpg in .zip file)</a><br><br>";
            info.appendChild(piczip);
        }
        if(datai[1].Info2 != "n"){
            picRzip.innerHTML = "<a href=" + datai[1].Info2 + ">Download R19 Moment(.jpg in .zip file)</a><br><br>";
            info.appendChild(picRzip);
        }
        if(datai[1].Status != "n"){
            pdfRzip.innerHTML = "<a href=" + datai[1].Status + ">Download R19 Moment(.pdf in .zip file)</a><br><br>";
            info.appendChild(pdfRzip);
        }
    }
    function chapterpage(data, status){

        document.getElementById("allchap").style.display = "block";
        var link = document.createElement("a");
        var linkText = document.createTextNode(data + status);
        link.style.fontWeight = "500";
        link.appendChild(linkText);
        link.title = data + status;
        link.href = data;
        link.style.width = "270px";

        document.getElementById("allchap").appendChild(link);

    }
    fetch(datapic).then(resultsr=>resultsr.text()).then(function (csvtextsr){return csv().fromString(csvtextsr);}).then(function(csvsr){potra(csvsr)});
    function potra(datap){
        
        for(var i = 0; i < datap.length; i++){
            if(datap[i].Name == document.getElementById("nameget").innerText){
                var pics = document.createElement("img");
                pics.setAttribute('src', datap[i].Link);
                pics.style.width = "300px";
                pics.style.border = "3px solid";
                pics.style.borderRadius = "5px";
                pic.appendChild(pics);
            }
        }
    }
    

    info.appendChild(each_upt)
    info.appendChild(cover);
    info.appendChild(three);
    info.appendChild(one);
    info.appendChild(two);

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
