//Manhtia's api
const data_csv_format_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY&p=Manhwa";
const datadark_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1HsH40yVrlcWrSLXn0qEG06BR7X_YS4YUQyFbEzaEf7Y&p=Sheet1";
const datamore_database = "https://script.google.com/macros/s/AKfycbwPyo50dXb4y5r4H2B0fLEVqpWKhWo58g_YmKna1cnlesJ96RhixlmQiwItAuLcuF0XbQ/exec?q=1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU&p=Sheet1";
//Third party's api
const data_csv_format = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const datadark = "https://docs.google.com/spreadsheets/d/1HsH40yVrlcWrSLXn0qEG06BR7X_YS4YUQyFbEzaEf7Y/export?format=csv";
const datamore = "https://docs.google.com/spreadsheets/d/1vAmEFn17c6kJMQwJ5JPYlvtWnRRweM8O-uk1mwn5xgU/export?format=csv";

var eachdata_tofilter;

try{
    
    fetch(data_csv_format_database).then(data => data.json()).then(data => {appenddata(data);})

    console.log("Fetch data from Manhtia's api");

}catch(error){
    //if normal fetch is error
    fetch(data_csv_format).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(data){appenddata(data);});
    
    console.log("Fetch data from Third party's api");

}

function appenddata(data){

    var i = 0;
    for(var j = 0; j < data.length; j++){

        if(data[j].Name == document.getElementById("nameget").innerText){
            i = j;
        }

    }
    //If website = no
    if(data[i].Website == "no"){
        document.getElementById("chapter").innerHTML = data[i].Name + ", This story has no chapter and will not update.";
    }
    if(document.getElementById("nameget").innerText.includes("[ES]") || document.getElementById("nameget").innerText.includes("[KR]") || document.getElementById("nameget").innerText.includes("[FR]") || document.getElementById("nameget").innerText.includes("[OTH]")){
        document.getElementById("info").style.display = "none";
        var show = document.createElement("button");
        show.innerHTML = "Convey data";
        show.onclick = () => {
            if(document.getElementById("info").style.display === "block"){
                show.innerHTML = "Convey data";
                document.getElementById("info").style.display = "none";
            }
            else{
                show.innerHTML = "Hide data";
                document.getElementById("info").style.display = "block";
            }
        };
        document.getElementById("top").appendChild(show);
    }
    
    var info = document.getElementById("info");
    var chapter = document.getElementById("chapter");
    var pic = document.getElementById("picture");

    var one = document.createElement("div");
    var two = document.createElement("div");
    var moreshowcover = document.createElement("div");
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

    three.innerHTML = "<label style='font-weight: bold;'>Part:</label> " + data[i].Part + " <label style='font-weight: bold;'>Number:</label> " + data[i].Number + " <label style='font-weight: bold;'>Date:</label> <label id='tendays'>" + covertdate(data[i].Date) + "</label>";

    var period = data[i].Year.split(":");
    const date = new Date();
    const release_dates = new Date(period[0]);
    const completed_dates = new Date(period[1]);
    active = (Math.floor((completed_dates.getTime() - release_dates.getTime()) / (1000 * 3600 * 24)));
    if(period[0] == "" || period[0] == "n" || period[0] == undefined){period[0] = "...";}
    if(period[1] == "" || period[1] == undefined){period[1] = "...";}
    if(isNaN(active) || active == undefined){active = "...";}
    document.getElementById("period").innerHTML = "Since " + period[0] + " Until " + period[1] + 
    " -"+ active + " day(s)-";

    var each_upt = document.createElement('div');
        const today = new Date();
        var getday = today.getDay();
        if(getday == 0){getday = 6;}
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

    fetch(datamore).then(resultsi=>resultsi.text()).then(function (csvtextsi){return csv().fromString(csvtextsi);}).then(function(csvsi){
             
        //GET data from spoil to do
        if(csvsi[i].Spoil.includes("mark as mature")){

            var a = document.createElement('a');
            a.innerHTML = "Mature";
            a.href = "/manhtia/private/" + document.getElementById("nameget").innerText + "/";
    
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
        var baka = "<a href='https://www.google.com/search?q=" + data[i].Name.replaceAll(" ", "+").replaceAll("'", "") + "+bakaupdates'>(Info Link)</a>";
        if(data[i].Morelink1 != "n"){l1 = "<a href='" + data[i].Morelink1 + "'>MoreOther I</a>"}
        if(data[i].Morelink2 != "n"){l2 = "<a href='" + data[i].Morelink2 + "'>MoreOther II</a>"}
        if(data[i].Morelink3 != "n"){l3 = "<a href='" + data[i].Morelink3 + "'>MoreOther III</a>"}
        morelink.innerHTML = baka + spoil + " " + l1 + " " + l2 + " " + l3;
                
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
        anames.innerHTML = "<label style='font-weight: bold;'>Associate:</label> " + data[i].AssName + "  <img src='" + flagl + "' style='width: 30px; border-radius: 2px;'>" + rate;
        type.innerHTML = "<label style='font-weight: bold;'>Genre:</label> " + types;

        if(data[i].Notificate == "c"){
            noti.innerHTML = "<label style='font-weight: bold;'>Overall:</label> Completed!";
            noti.style.backgroundColor = "red";
            noti.style.borderRadius = "10px";
            noti.style.padding = "3px";
        }
                
        moreshow.style.textAlign = "left";
        moreshow.style.width = "350px";
        moreshow.style.marginLeft = "auto";
        moreshow.style.marginRight = "auto";
        moreshow.appendChild(morelink);
        moreshow.appendChild(anames);
        moreshow.appendChild(type);
        moreshow.appendChild(noti);
        moreshowcover.style.borderBottom = "2px solid";
        moreshowcover.style.borderTop = "2px solid";
        moreshowcover.style.padding = "5px";
        moreshowcover.appendChild(moreshow);
                
        butspoil.innerHTML = "More Detail";
        if(data[i].Spoil != "n"){
            moreshow.appendChild(butspoil);
            spoilt.innerHTML = data[i].Spoil;
            spoilt.style.backgroundColor = "#f0a6a1";
            moreshow.appendChild(spoilt);
            spoilt.id = "spoilmoredetail";
            if(data[i].Spoil.includes("UpdateEvery:")){

                var gets = data[i].Spoil.split(" ");
                for(var t = 0; t < gets.length; t++){
                    if(gets[t].includes("UpdateEvery:")){  
                        document.getElementById("tendays").innerHTML = gets[t].substring(12);
                    }

                }

            }
        }
        spoilt.style.display = "none";
        spoilt.style.padding = "7px";
        spoilt.style.position = "absolute";
        butspoil.style.background = "red";
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
         
    });
    var k = 0;
    const each_data = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";
    fetch(each_data).then(results=>results.text()).then(function (csvtexts){return csv().fromString(csvtexts);}).then(function(csvs){each(csvs);});
    function each(datae){
        var k = 0;
        var linkget;
        for(var j = 0; j < datae.length; j++){
            //read exact name data
            if(datae[j].Name == document.getElementById("nameget").innerText){
                k = j;
                var link = datae[j].DataStoreLocation;
                linkget = link.replace("edit?usp=sharing", "export?format=csv")
                fetch(linkget).then(resultt=>resultt.text()).then(function (csvtextt){return csv().fromString(csvtextt);}).then(function(csvt){getinfolink(csvt);});
            }
            //find if there are others langs
            if(datae[j].Name.includes(document.getElementById("nameget").innerText)){
                if(datae[j].Name.includes("[KR]")){document.getElementById("krver").style.display = "block";}
                if(datae[j].Name.includes("[ES]")){document.getElementById("esver").style.display = "block";}
                if(datae[j].Name.includes("[FR]")){document.getElementById("frver").style.display = "block";}
                if(datae[j].Name.includes("[OTH]")){document.getElementById("othver").style.display = "block";}
            }
        }
    }
    function getinfolink(datai){

        var k = 0;
        var caption = document.createElement("p");

        caption.innerHTML = "<label style='font-weight: bold; border-bottom: 2px solid;'>Description</label><br>" + datai[5].Info1;
        caption.style.padding = "5px";
        caption.style.textAlign = "left";
        info.appendChild(caption);

        var chapterpop = [];

        if(datai[5].Info2 == "n"){chapter.innerHTML = "<h3>Chapter</h3>"; chapter.style.height = "400px";}

        var checkfilter = [];
        for(var j = 9; j < datai.length; j++){
            if(!checkfilter.includes(datai[j].Status)){
                checkfilter.push(datai[j].Status);
                var datalist = document.getElementById("choosecommonfilter");
                const option = document.createElement('option');
                option.text = datai[j].Status;
                option.value = datai[j].Status;
                datalist.appendChild(option);
            }
        }
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
                        var datalistbook = document.getElementById("book_it");
                        const option = document.createElement('option');
                        const optionbook = document.createElement('option');
                        option.text = datai[j].Topic;
                        option.value = datai[j].Topic;
                        if(datai[j].Status == "n"){datai[j].Status = "";}
                        optionbook.text = datai[j].Topic + datai[j].Status;
                        optionbook.value = datai[j].Topic;
                        datalist.appendChild(option);
                        datalistbook.appendChild(optionbook);
                        chapterpage(datai[j].Topic, " " + datai[j].Status, datai[0].Info2, datai[0].Status);
                                                
                    }

                }

            }
            
            
            //bookmark set
            document.getElementById("book_it").value = datai[0].Info2;
            document.getElementById("selfbook").innerHTML = datai[0].Info2;
            document.getElementById("autobook").innerHTML = datai[0].Status;
            document.getElementById("special_chapter").value = datai[5].Status;

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
    }
    
    //create link to go
    function chapterpage(data, status, book, recent){

        document.getElementById("allchap").style.display = "block";
        var link = document.createElement("a");
        var linkText = document.createTextNode(data + status);
        link.style.fontWeight = "500";
        link.appendChild(linkText);
        link.title = data + status;
        //link.href = data; //old
        link.href = `/manhtia/content.viewer/${document.getElementById("nameget").innerHTML}/?p=${data}&t=0&q=6000`;
        link.style.width = "270px";

        if(data == book){link.style.fontWeight = "bold";}
        if(data == recent){link.style.borderLeft = "10px solid black";}

        document.getElementById("allchap").appendChild(link);

    }    

    info.appendChild(each_upt)
    info.appendChild(cover);
    info.appendChild(three);
    info.appendChild(one);
    info.appendChild(moreshowcover);

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
        else if(date == "0"){
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
//filter
function process(){

    document.getElementById('process').style.display = "block";
    document.getElementById('process').style.zIndex = 10;
    
}
function closefilter(){
    document.getElementById('process').style.display = "none";
}
function setfilter(filter){
    //not dynamic
    document.getElementById('searchit').href = "filter?filter=" + filter;
}
function commonfilter(){
    document.getElementById('choosecommonfilter').value = "";
    setfilter(document.getElementById('choosefilter').value);
}
function storyfilter(){
    document.getElementById('choosefilter').value = "";
    setfilter(document.getElementById('choosecommonfilter').value);
}

//bookmark
function bookmark(){

    document.getElementById('bookmark_').style.display = "block";
    document.getElementById('bookmark_').style.zIndex = 10;

}
function closebook(){
    document.getElementById('bookmark_').style.display = "none";
}
function book_self(){
    fetch(`https://script.google.com/macros/s/AKfycbwcDe7zIvjY5p4rVQ-4mBIw3OCnI_ntnHhcKhmjGMGAgbB3ghnZ6MhVecVS1uHKWxD1Gw/exec?nm=${document.getElementById("nameget").innerText}&bm=${document.getElementById("book_it").value}&tp=self`).then()
}
function book_other(){
    fetch(`https://script.google.com/macros/s/AKfycbwcDe7zIvjY5p4rVQ-4mBIw3OCnI_ntnHhcKhmjGMGAgbB3ghnZ6MhVecVS1uHKWxD1Gw/exec?nm=${document.getElementById("nameget").innerText}&bm=${"Chapter " + document.getElementById("other_site").value + "."}&tp=self`).then()
}
function append_special(){
    var data = document.getElementById("special_chapter").value.replaceAll("/", "-");
    fetch(`https://script.google.com/macros/s/AKfycbxEumvDiRpV_2c2OWPsy5eKeRzu6RRGbNoSupU__1FG6tn_nXLAQq-kxZNruWNyjtSd/exec?nm=${document.getElementById("nameget").innerText}&bm=${data}`).then()
}