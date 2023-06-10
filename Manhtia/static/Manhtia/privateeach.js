const data_csv_mature = "https://docs.google.com/spreadsheets/d/1LGJg6Jl3qV2IQfknt2xOvmvJuKtUaVWMSOcN1HrnHuc/export?format=csv";
fetch(data_csv_mature).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){mature(csv);});

function mature(data){

    var name = document.getElementById("name").innerText;
    document.getElementById("nameget").value = name;
    for(var i = 0; i < data.length; i++){

        if(data[i].Name == document.getElementById("nameget").value){

            var partPop = [];
            var data_get = data[i].Link;
            var read_link = data_get.replace("edit?usp=sharing", "export?format=csv");
            fetch(read_link).then(result=>result.text()).then(function (csvtext){return csv().fromString(csvtext);}).then(function(csv){
                for(var j = 0; j < csv.length; j++){
                    if(!partPop.includes(csv[j].Part)){
                        partPop.push(csv[j].Part);
                    }
                }
                var datalist = document.getElementById("parts");
                for(const names of partPop){
                    const option = document.createElement('option');
                    option.value = names;
                    datalist.appendChild(option);
                }
                document.getElementById("search").onclick = () => {
                    create_button(csv, partPop);
                };
                
            });

        }

    }

}

function create_button(data, partPop){


    for(var i = 0; i < partPop.length; i++){

        if(partPop[i] == document.getElementById("partget").value){

            var button = document.createElement("button");
            button.innerHTML = partPop[i];
            button.onclick = () => {
                document.getElementById("show").innerHTML = "";
                create(data, button.innerText);
            };
            document.getElementById("butshow").innerHTML = "";
            document.getElementById("butshow").appendChild(button);

        }

    }
    
}

function create(data, part){

    for(var i = 0; i < data.length; i++){

        if(data[i].Part == part){

            var img = document.createElement("img");
            if(document.querySelector('input[name = a]:checked').value == "one"){
                img.setAttribute("src", data[i].Link1);
            }
            if(document.querySelector('input[name = a]:checked').value == "two"){
                img.setAttribute("src", data[i].Link2);
            }
            if(document.querySelector('input[name = a]:checked').value == "three"){
                img.setAttribute("src", data[i].Link3);
            }
            img.style.width = "300px";
            document.getElementById("show").appendChild(img);

        }

    }

}
