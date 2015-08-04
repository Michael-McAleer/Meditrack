var Player = new Firebase("https://meditrack.firebaseio.com");

function saveToTable(event) {
    if (event.which == 13 || event.keyCode == 13) {
        var playerName = document.getElementById('playerName').value.trim();
        if (playerName.length > 0) {
          document.getElementById('playerNames').innerHTML += '<td>' + playerName + '</td>';
          saveToFB(playerName);
        }
        document.getElementById('playerName').value = '';
      return false;
    }
};

function saveToFB(playerName) {
    Player.push({
        name: playerName
    });
};

function refreshUI(table) {
    var tab = '';
    for (var i = 0; i < table.length; i++) {
        tab += '<td' + table[i].key + '">' + table[i].name + '</td>';
        document.getElementById('playerNames').innerHTML += '<td>' + '</td>';
        tab += '<td>' + '</td>'
    };

    document.getElementById('playerNames').innerHTML = tab;

};

// this will get fired on inital load as well as when ever there is a change in the data
Player.on("value", function(snapshot) {
    var data = snapshot.val();
    var table = [];
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            name = data[key].name ? data[key].name : '';
            if (name.trim().length > 0) {
                table.push({
                    name: name,
                    key: key
                })
            }
        }
    }
    // refresh the UI
    refreshUI(table);
});


function edit() {
      var pName;
      var key = prompt("Enter players name that you want to edit", key);
      var playerName = prompt("Update players name", pName);
      if (playerName && playerName.length > 0) {
        var updatePlayer = buildEndPoint(key);
        updatePlayer.update({
            name: playerName
        });
    }
}

function del(key, pName) {
    var response = confirm("Are certain about removing \"" + pName + "\"?");
    if (response == true) {
        var deletePlayer = buildEndPoint(key);
        deletePlayer.remove();
    }
}

function buildEndPoint (key) {
	return new Firebase('https://meditrack.firebaseio.com' + key);
}


function getPlayerByName() {
  var name = prompt("Enter players name that you want to edit", name);
  Player.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var doc = data.val();
      if (doc.name === name) {
      }
    });
  });
}

function getPlayerByTeam(name) {
  Player.orderByValue().on("value", function(snapshot) {
    snapshot.forEach(function(data) {
      var doc = data.val();
      if (doc.team === name) {
      }
    });
  });
}
