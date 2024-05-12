const data_link = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/edit?usp=sharing";
const data_csv_format = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const addnewpage = "https://script.google.com/macros/s/AKfycbzmeLhFbjrOHeLLl8sdnPjlRxjWe0bSPFQJou-kfamWYy_hc-g80z9ZpyDv4SPUznkO/exec";

//Search Zone
fetch(data_csv_format).then(result=>result.text()).then(function (csvtext){
    return csv().fromString(csvtext);
}).then(function(csv){
    //main.innerHTML = "<code>" + JSON.stringify(csv) + "</code>"
    appenddata(csv);
});
function appenddata(data){
    let index;

    var info_name = [];
    var info_number = [];
    var info_part = [];
    var info_firstchar = [];
    var info_status = [];
    var info_hasweb = [];
    var info_trans = [];
    var info_newtoki = [];
    var info_myweb = [];
    var info_rawweb = [];
    var info_otherweb = [];
    var info_date = [];
    var dic_name_part = {};
    var dic_name_status = {};
    var dic_name_hasweb = {};
    var dic_name_firstchar = {};
    var dic_name_date = {};

    const mainshow = document.getElementById("show");
    for(var i = 0; i < data.length; i++){
        info_name.push(data[i].Name);
        info_number.push(data[i].Number);
        info_part.push(data[i].Part);
        info_firstchar.push(data[i].Firstchar);
        info_status.push(data[i].Status);
        info_hasweb.push(data[i].Website);
        info_trans.push(data[i].Translate);
        info_newtoki.push(data[i].Newtoki);
        info_myweb.push(data[i].Myweb);
        info_rawweb.push(data[i].Rawweb);
        info_otherweb.push(data[i].Otherweb);
        info_date.push(data[i].Date);

        dic_name_part[data[i].Name] = data[i].Part;
        dic_name_status[data[i].Name] = data[i].Status;
        dic_name_hasweb[data[i].Name] = data[i].Website;
        dic_name_firstchar[data[i].Name] = data[i].Firstchar;
        dic_name_date[data[i].Name] = data[i].Date;
    }
    var datalist = document.getElementById("namesss");
    for (var namess of info_name) {
        var option = document.createElement('option');
        option.value = namess;
        datalist.appendChild(option);
    }
    document.getElementById("search").onclick = () => {

        let nameget = document.getElementById("names").value;
        let partget = document.getElementById("parts").value;
        let numberget = document.getElementById("numbers").value;
        let statusget = document.getElementById("statuss").value;
        let haswebget = document.getElementById("haswebs").value;
        let dateget = document.getElementById("dates").value;
        var count = document.getElementById("count");
        let co = 0;
    
        if(info_name.includes(nameget) && nameget != ""){
            clear();
            index = info_name.indexOf(nameget);
            var div = document.createElement("div");
            var nam = document.createElement("div");
            var par = document.createElement("div");
            var web = document.createElement("div");
            var sta = document.createElement("div");
            var dat = document.createElement("div");
            var a1 = document.createElement("a");
            var a2 = document.createElement("a");
            var a3 = document.createElement("a");
            var a4 = document.createElement("a");
            div.innerHTML = "NO. " + data[index].Number;
            nam.innerHTML = " NAME: " + data[index].Name;
            par.innerHTML = "Part: " + data[index].Part;
            dat.innerHTML = "Date: " + covertdate(data[index].Date);
            web.innerHTML = "Website: " + data[index].Website;
            sta.innerHTML = "Status: " + data[index].Status;
            a1.innerHTML = "<a href=" + data[index].Translate + ">Translate Website</a> :";
            a2.innerHTML = " <a href=" + data[index].Newtoki + ">Newtoki Website</a> :";
            a3.innerHTML = " <a href=" + data[index].Rawweb + ">Raw Website</a> :";
            a4.innerHTML = " <a href=" + data[index].Otherweb + ">Other Website</a>";
            mainshow.appendChild(div);
            mainshow.appendChild(nam);
            mainshow.appendChild(par);
            mainshow.appendChild(dat);
            mainshow.appendChild(web);
            mainshow.appendChild(sta);
            mainshow.appendChild(a1);
            mainshow.appendChild(a2);
            mainshow.appendChild(a3);
            mainshow.appendChild(a4);
            co++;
        }
        if(info_number.includes(numberget) && numberget != ""){
            clear();
            index = info_number.indexOf(numberget);
            var div = document.createElement("div");
            var nam = document.createElement("div");
            var par = document.createElement("div");
            var web = document.createElement("div");
            var sta = document.createElement("div");
            var dat = document.createElement("div");
            var a1 = document.createElement("a");
            var a2 = document.createElement("a");
            var a3 = document.createElement("a");
            var a4 = document.createElement("a");
            div.innerHTML = "NO. " + data[index].Number;
            nam.innerHTML = " NAME: " + data[index].Name;
            par.innerHTML = "Part: " + data[index].Part;
            dat.innerHTML = "Date: " + covertdate(data[index].Date);
            web.innerHTML = "Website: " + data[index].Website;
            sta.innerHTML = "Status: " + data[index].Status;
            a1.innerHTML = "<a href=" + data[index].Translate + ">Translate Website</a> :";
            a2.innerHTML = " <a href=" + data[index].Newtoki + ">Newtoki Website</a> :";
            a3.innerHTML = " <a href=" + data[index].Rawweb + ">Raw Website</a> :";
            a4.innerHTML = " <a href=" + data[index].Otherweb + ">Other Website</a>";
            mainshow.appendChild(div);
            mainshow.appendChild(nam);
            mainshow.appendChild(par);
            mainshow.appendChild(dat);
            mainshow.appendChild(web);
            mainshow.appendChild(sta);
            mainshow.appendChild(a1);
            mainshow.appendChild(a2);
            mainshow.appendChild(a3);
            mainshow.appendChild(a4);
            co++;
        }
        if(info_part.includes(partget) && partget != ""){
            clear();
            var matched = Object.keys(dic_name_part).filter(function(key) {
                return dic_name_part[key] === partget;
            });
            
            for(var i = 0; i < matched.length; i++){
                index = info_name.indexOf(matched[i]);
                var div = document.createElement("div");
                var nam = document.createElement("div");
                var par = document.createElement("div");
                var web = document.createElement("div");
                var sta = document.createElement("div");
                var dat = document.createElement("div");
                var a1 = document.createElement("a");
                var a2 = document.createElement("a");
                var a3 = document.createElement("a");
                var a4 = document.createElement("a");
                div.innerHTML = "NO. " + data[index].Number;
                nam.innerHTML = " NAME: " + data[index].Name;
                par.innerHTML = "Part: " + data[index].Part;
                dat.innerHTML = "Date: " + covertdate(data[index].Date);
                web.innerHTML = "Website: " + data[index].Website;
                sta.innerHTML = "Status: " + data[index].Status;
                a1.innerHTML = "<a href=" + data[index].Translate + ">Translate Website</a> :";
                a2.innerHTML = " <a href=" + data[index].Newtoki + ">Newtoki Website</a> :";
                a3.innerHTML = " <a href=" + data[index].Rawweb + ">Raw Website</a> :";
                a4.innerHTML = " <a href=" + data[index].Otherweb + ">Other Website</a>";
                mainshow.appendChild(div);
                mainshow.appendChild(nam);
                mainshow.appendChild(par);
                mainshow.appendChild(dat);
                mainshow.appendChild(web);
                mainshow.appendChild(sta);
                mainshow.appendChild(a1);
                mainshow.appendChild(a2);
                mainshow.appendChild(a3);
                mainshow.appendChild(a4);
                co++;
            }
        }
        if(info_status.includes(statusget) && statusget != ""){
            clear();
            var matched = Object.keys(dic_name_part).filter(function(key) {
                return dic_name_status[key] === statusget;
            });
            
            for(var i = 0; i < matched.length; i++){
                index = info_name.indexOf(matched[i]);
                var div = document.createElement("div");
                var nam = document.createElement("div");
                var par = document.createElement("div");
                var web = document.createElement("div");
                var sta = document.createElement("div");
                var dat = document.createElement("div");
                var a1 = document.createElement("a");
                var a2 = document.createElement("a");
                var a3 = document.createElement("a");
                var a4 = document.createElement("a");
                div.innerHTML = "NO. " + data[index].Number;
                nam.innerHTML = " NAME: " + data[index].Name;
                par.innerHTML = "Part: " + data[index].Part;
                dat.innerHTML = "Date: " + covertdate(data[index].Date);
                web.innerHTML = "Website: " + data[index].Website;
                sta.innerHTML = "Status: " + data[index].Status;
                a1.innerHTML = "<a href=" + data[index].Translate + ">Translate Website</a> :";
                a2.innerHTML = " <a href=" + data[index].Newtoki + ">Newtoki Website</a> :";
                a3.innerHTML = " <a href=" + data[index].Rawweb + ">Raw Website</a> :";
                a4.innerHTML = " <a href=" + data[index].Otherweb + ">Other Website</a>";
                mainshow.appendChild(div);
                mainshow.appendChild(nam);
                mainshow.appendChild(par);
                mainshow.appendChild(dat);
                mainshow.appendChild(web);
                mainshow.appendChild(sta);
                mainshow.appendChild(a1);
                mainshow.appendChild(a2);
                mainshow.appendChild(a3);
                mainshow.appendChild(a4);
                co++;
            }
        }
        if(info_hasweb.includes(haswebget) && haswebget != ""){
            clear();
            
            var matched = Object.keys(dic_name_part).filter(function(key) {
                return dic_name_hasweb[key] === haswebget;
            });
            
            for(var i = 0; i < matched.length; i++){
                index = info_name.indexOf(matched[i]);
                var div = document.createElement("div");
                var nam = document.createElement("div");
                var par = document.createElement("div");
                var web = document.createElement("div");
                var sta = document.createElement("div");
                var dat = document.createElement("div");
                var a1 = document.createElement("a");
                var a2 = document.createElement("a");
                var a3 = document.createElement("a");
                var a4 = document.createElement("a");
                div.innerHTML = "NO. " + data[index].Number;
                nam.innerHTML = " NAME: " + data[index].Name;
                par.innerHTML = "Part: " + data[index].Part;
                dat.innerHTML = "Date: " + covertdate(data[index].Date);
                web.innerHTML = "Website: " + data[index].Website;
                sta.innerHTML = "Status: " + data[index].Status;
                a1.innerHTML = "<a href=" + data[index].Translate + ">Translate Website</a> :";
                a2.innerHTML = " <a href=" + data[index].Newtoki + ">Newtoki Website</a> :";
                a3.innerHTML = " <a href=" + data[index].Rawweb + ">Raw Website</a> :";
                a4.innerHTML = " <a href=" + data[index].Otherweb + ">Other Website</a>";
                mainshow.appendChild(div);
                mainshow.appendChild(nam);
                mainshow.appendChild(par);
                mainshow.appendChild(dat);
                mainshow.appendChild(web);
                mainshow.appendChild(sta);
                mainshow.appendChild(a1);
                mainshow.appendChild(a2);
                mainshow.appendChild(a3);
                mainshow.appendChild(a4);
                co++;
            }            
        }
        if(info_date.includes(dateget) && dateget != ""){
            clear();
            var matched = Object.keys(dic_name_part).filter(function(key) {
                return dic_name_date[key] === dateget;
            });
            
            for(var i = 0; i < matched.length; i++){
                index = info_name.indexOf(matched[i]);
                var div = document.createElement("div");
                var nam = document.createElement("div");
                var par = document.createElement("div");
                var web = document.createElement("div");
                var sta = document.createElement("div");
                var dat = document.createElement("div");
                var a1 = document.createElement("a");
                var a2 = document.createElement("a");
                var a3 = document.createElement("a");
                var a4 = document.createElement("a");
                div.innerHTML = "NO. " + data[index].Number;
                nam.innerHTML = " NAME: " + data[index].Name;
                par.innerHTML = "Part: " + data[index].Part;
                dat.innerHTML = "Date: " + covertdate(data[index].Date);
                web.innerHTML = "Website: " + data[index].Website;
                sta.innerHTML = "Status: " + data[index].Status;
                a1.innerHTML = "<a href=" + data[index].Translate + ">Translate Website</a> :";
                a2.innerHTML = " <a href=" + data[index].Newtoki + ">Newtoki Website</a> :";
                a3.innerHTML = " <a href=" + data[index].Rawweb + ">Raw Website</a> :";
                a4.innerHTML = " <a href=" + data[index].Otherweb + ">Other Website</a>";
                mainshow.appendChild(div);
                mainshow.appendChild(nam);
                mainshow.appendChild(par);
                mainshow.appendChild(dat);
                mainshow.appendChild(web);
                mainshow.appendChild(sta);
                mainshow.appendChild(a1);
                mainshow.appendChild(a2);
                mainshow.appendChild(a3);
                mainshow.appendChild(a4);
                co++;
            }
        }
        
        count.innerHTML = "( Found: " + co + " )";
        console.log();
    }
    function getkeybyvalue(object, value){
        return Object.keys(object).find(key => object[key] === value);
    }
    function clear(){
        var e = document.getElementById("show");
        e.innerHTML = "";
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
        
        return datelast;
    }
    document.getElementById("cleartext1").onclick = function (){
        document.getElementById("names").value = "";
        document.getElementById("parts").value = "";
        document.getElementById("numbers").value = "";
        document.getElementById("statuss").value = "";
        document.getElementById("haswebs").value = "";
        co = 0;
    }
    document.getElementById("reload").onclick = () => {
        window.location.reload();
    }
}