const iconImportant = "iImportant fas fa-star";
const iconNonImportant = "iImportant far fa-star";
var important = false;
var panelVisible = true;
var total = 0;

function toggleImportance() {
  if (important) {
    // from imp to not imp
    $("#iImportant").removeClass(iconImportant).addClass(iconNonImportant);
    important = false;
  } else {
    // non imp to imp
    $("#iImportant").removeClass(iconNonImportant).addClass(iconImportant);
    important = true;
  }
}

function togglePanel() {
  if (panelVisible) {
    $("#form").hide();
    $("#btnTogglePanel").text("< Show");
    panelVisible = false;
  } else {
    $("#form").show();
    $("#btnTogglePanel").text("Hide >");
    panelVisible = true;
  }
}
function saveTask() {
  let title = $("#txtTitle").val();
  let description = $("#txtDescription").val();
  let dueDate = $("#txtDate").val();
  let location = $("#txtLocation").val();
  let invites = $("#txtInvites").val();
  let color = $("#selColor").val();
  let frequancy = $("#selFrequancy").val();
  let status = $("#selStatus").val();

  let task = new Task(
    important,
    title,
    description,
    dueDate,
    location,
    invites,
    color,
    frequancy,
    status
  );

  $.ajax({
    type: "post",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (res) {
      console.log("Task saved", res);
      displayTask(task);
      clearForm();
    },
    error: function (errorDetails) {
      console.error("Save failed", errorDetails);
    },
  });
}

function clearForm() {
  $("input").val("");
  $("textarea").val("");
  $("#selDate").val("");
  $("#txtLocation").val("");
  $("#txtInvites").val("");
  $("#selFrequancy").val("");
  $("#selStatus").val("");
  $("selColor").val("#ffffff");
}

function getStatusText(status) {
  switch (status) {
    case "1":
      return "Pending";
    case "2":
      return "In progress";
    case "3":
      return "Paused";
    case "4":
      return "Completed";
    case "5":
      return "Abandoned";
    default:
      return "Other";
  }
}

function getFrequencyText(val) {
  switch (val) {
    case "0":
      return "One Time";
    case "1":
      return "Daily";
    case "2":
      return "Weekly";
    case "3":
      return "Monthly";
    default:
      return " ";
  }
}

function displayTask(task) {
  let iconClass = iconNonImportant;
  if (task.important) {
    iconClass = iconImportant;
  }

  let syntax = `<div class = "task-item" style="border: 1px ${task.color};">
    <div class ="icon">
        <i class="${iconClass}"></i>
    </div>

        <div class= "info-1">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>;

        <div class="info-2">
            <label>${task.dueDate}</label>
            <label>${task.location}</label>
        </div>
    
        <div class="info-3">
            <label>${task.invites}</label>
        </div>

        <div class="info-2">
            <label>${getStatusText(task.status)}</label>
            <label>${getFrequancyText(task.frequancy)}</label>
        </div>

    </div>`;

  $("#tasks").append(syntax);
}

function fetchTasks() {
  $.ajax({
    type: "get",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (res) {
      console.log(res);
      let data = JSON.parse(res); // (decode) from string to obj
      console.log(data)

      // for loop over data
      total = 0;
      for (let i = 0; i < data.length; i++) {
        let task = data[i];

        // if the name attribute of task object is equal to your name,
        if (task.name == "Michael") {
          total+= 1;
          displayTask(task);
        }
      }
      $("#headCount").text("You have" + total + "tasks");
      // get every element inside the array
      // send the element to the display fn
    },
    error: function (err) {
      console.error("Error retrieving data", err);
    },
  });
}

function clearAllTasks(){
  $.ajax({
    type:"delete",
    url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Michael",
    success: function(){
      location.reload();
    },
    error: function(err){
      console.log("Error clearing tasks", err)
    },
  })
}

function init() {
  console.log("Task manager page");
  // assign events
  $("#iImportant").click(toggleImportance);
  $("#btnTogglePanel").click(togglePanel);
  $("#btnSave").click(saveTask);
  $("#btnClearAll").click(clearAllTasks);

  // load data
  fetchTasks();
}

window.onload = init;




