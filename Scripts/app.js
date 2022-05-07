const iconImportant="iImportant fas fa-star";
const iconNonImportant="iImportant far fa-star";
var important = false;
var panelVisible = true;

function toggleImportance(){
    if(important){
        // from imp to not imp
        $("#iImportant").removeClass(iconImportant).addClass(iconNonImportant);
        important= false;
    }
    else{
        // non imp to imp
        $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant);
        important= true;
    }
    
}

function togglePanel(){
    if(panelVisible){
        $("#form").hide();
        panelVisible = false;
    } else{
        $("#form").show();
        panelVisible = true;
    }
}
function saveTask(){
    let title = $("#txtTitle").val();
    let description = $("#txtDescription").val();
    let dueDate = $("txtDate").val();
    let frequancy = $("txtFrequancy").val();
    let status = $("txtStatus").val();



    console.log(title,description,dueDate,frequancy,status);
}


function init(){
    console.log("Task manager page");
    // assign events
   $("#iImportant").click(toggleImportance);
   $("#btnTogglePanel").click(togglePanel);
   $("#btnSave").click(saveTask);
    // load data
}

window.onload = init;