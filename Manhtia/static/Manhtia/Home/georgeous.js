const main_data = "https://docs.google.com/spreadsheets/d/12OgnnIYoeG3oa5prcZ5HgzjuECPCk4FmBhCf_ecV_TY/export?format=csv";
const each_data = "https://docs.google.com/spreadsheets/d/1R1e93BSQ-dVmHgZadcJmINP_qDJo65CZFBJ98hhzpvk/export?format=csv";

fetch(main_data).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){main(csv, "");});
fetch(each_data).then(result2=>result2.text()).then(function (csvtext2){return csv().fromString(csvtext2);}).then(function(csv2){
    var locate = [];
    for(var j = 0; j < csv2.length; j++){
        locate.push(csv2[j].DataStoreLocation);
    }
    main("", locate)
});
var c = 0;
function main(main_datas, each_datas){
    var loca = each_datas;
    if(main_datas != ""){
        
        var name = [];
        var part = [];
        var numb = [];
        var raws = [];
        var tran = [];
        var time = [];
        var date = [];
        var stat = [];
        var cove = [];
        
        for(var i = 0; i < main_datas.length; i++){
            name.push(main_datas[i].Name);
            part.push(main_datas[i].Part);
            numb.push(main_datas[i].Number);
            raws.push(main_datas[i].Rawweb);
            tran.push(main_datas[i].Translate);
            time.push(main_datas[i].Histotime);
            date.push(main_datas[i].Date);
            stat.push(main_datas[i].Status);
            cove.push(main_datas[i].Cover);
        }
    
        var text = "";
        var statue = document.createElement('img');
        var ff = document.createElement('br');
        statue.setAttribute('src', "https://i.pinimg.com/564x/ee/ad/e6/eeade6c5f72368dcd7404f6cdf9896ee.jpg");
        statue.setAttribute('width', 200);
        for(var names of name){
            var option = document.createElement('label');
            var br = document.createElement('br');
            option.innerHTML = "Type: " + name.indexOf(names) + " for " + names;
            option.style.fontFamily = "Brush Script MT";
            option.style.fontSize = "20px";
            document.getElementById("choose").appendChild(option);
            document.getElementById("choose").appendChild(br);
        }
        document.getElementById("anno").onclick = () => {
            document.getElementById("phase").style.display = "none";
            document.getElementById("an").style.display = "block";
            document.getElementById("choose").style.display = "none";
            document.getElementById("main").style.display = "none";
            document.getElementById("topic").innerHTML = "My Private Manhwa's Announcement"
            var bri = document.createElement('br');
            var olds = document.createElement('img');
            var news = document.createElement('img');
            
            olds.setAttribute('src', "https://drive.google.com/uc?id=1goc_sW5RgosnHbHsrBqE2SmYQ89E3-Yi");
            news.setAttribute('src', "https://drive.google.com/uc?id=1ZJ8Txf8cJvTUgR62Ge_HvUo1d97g2pmf");
            
            if(window.innerWidth < 600){
                olds.style.width = "310px";
                news.style.width = "310px";
            }
            else{
                olds.style.width = "600px";
                news.style.width = "600px";
            }
            document.getElementById("an").appendChild(olds);
            document.getElementById("an").appendChild(bri);
            document.getElementById("an").appendChild(news);
            
        }
        
        
        document.getElementById("chooses").onclick = () => {
            text = window.prompt("Type number of name on the list");
            document.getElementById("choose").innerHTML = "";
            document.getElementById("choose").style.display = "none";
            var main_pane = document.getElementById("main");

            var name_pane = document.createElement('div');
            var info_pane = document.createElement('div');
            var part_pane = document.createElement('div');
            var numb_pane = document.createElement('div');
            var date_pane = document.createElement('div');
            var status_pane = document.createElement('div');
            var veri_pane = document.createElement('div');
            var veri_pics = document.createElement('img');
            var cover_pane = document.createElement('img');
            var cut1_pane = document.createElement('img');
            var br1 = document.createElement('br');
            var cut2_pane = document.createElement('img');
            var br2 = document.createElement('br');
            var br3 = document.createElement('br');

            if(time[text] == "H"){document.getElementById("phase").innerHTML = "Les Erreurs du Passé Leur ont Fait voir La Vérité. Et ça Les a Fait se Revoir...";}
            if(time[text] == "M"){document.getElementById("phase").innerHTML = "Même Le Monde a changé, Mais La difficulté de Vivre Les a Forcés à s'Aimer.";}

            name_pane.innerHTML = name[text];
            cover_pane.setAttribute('src', cove[text]);
            cover_pane.setAttribute('width', 270);
            cut1_pane.setAttribute('src', "https://lh5.googleusercontent.com/d/1KbgQ1nlbKQESI4keqrmrGLNM52GB_-E8=s8000");
            cut1_pane.setAttribute('width', 320);
            cut2_pane.setAttribute('src', "https://lh5.googleusercontent.com/d/1KbgQ1nlbKQESI4keqrmrGLNM52GB_-E8=s8000");
            cut2_pane.setAttribute('width', 320);
            part_pane.innerHTML = "Part: " + part[text];
            numb_pane.innerHTML = "Number: " + numb[text];
            date_pane.innerHTML = "Date: " + covertdate(date[text]);
            status_pane.innerHTML = "Status: " + stat[text];

            var random = Math.floor(Math.random() * (main_datas.length + 1));
            veri_pane.style.textAlign = "right";
            if(random % 4 == 1){
                veri_pics.setAttribute('src', "https://i.pinimg.com/564x/98/24/9f/98249f304eb4f013ed30c55e4cf8ff13.jpg");
            }
            if(random % 4 == 2){
                veri_pics.setAttribute('src', "https://i.pinimg.com/564x/a7/1f/9f/a71f9fbf3ec60d3649faf7ee93954137.jpg");
            }
            if(random % 4 == 3){
                veri_pics.setAttribute('src', "https://i.pinimg.com/564x/75/81/ce/7581ce8198f6af7b1f2f7bac797c290d.jpg");
            }
            if(random % 4 == 0){
                veri_pics.setAttribute('src', "https://i.pinimg.com/564x/08/f0/e8/08f0e8168df9e445f73a89ca276dccd9.jpg");
            }
            veri_pics.setAttribute('width', 150);

            name_pane.style.fontSize = "24px";
            info_pane.style.fontSize = "18px";
            cover_pane.style.border = "double";

            if(window.innerWidth <= 500){
                cut1_pane.style.width = "200px";
                cut2_pane.style.width = "200px";
                cover_pane.style.width = "150px";
                veri_pane.style.textAlign = "center";
            }

            veri_pane.appendChild(veri_pics);

            info_pane.append(part_pane);
            info_pane.append(numb_pane);
            info_pane.append(date_pane);
            info_pane.append(status_pane);
            info_pane.append(veri_pane);

            main_pane.appendChild(statue);
            main_pane.appendChild(name_pane);
            main_pane.appendChild(cut1_pane);
            main_pane.appendChild(br1);
            main_pane.appendChild(cover_pane);
            main_pane.appendChild(br3);
            main_pane.appendChild(cut2_pane);
            main_pane.appendChild(br2);
            main_pane.appendChild(info_pane);
        }
        
        
    }
    
    c++;
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
}







