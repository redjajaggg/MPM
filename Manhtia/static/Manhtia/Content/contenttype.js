//favorite create
function favorite_normal(){

    clear_command();

    for(var i = 0; i < data_story.length; i++){
        if(data_more[i].Favorite == "y"){create_command(data_story, i);}
    }

}
function favorite_read(){

    clear_command();

    for(var i = 0; i < data_story.length; i++){
        if(data_more[i].Favorite == "y" && data_more[i].Read == "y"){create_command(data_story, i);}
    }

}