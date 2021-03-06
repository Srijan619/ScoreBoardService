var score_array=[];
var message;
var message_details;

// Function to add the score
function addScore() {
    var name=document.getElementById("name").value;
    var score=document.getElementById("score").value;

    // Get the names and score to add to the database
    var data={
        initials:name,
        score:score
    };
    console.log(name);
    if(name && score !==null){
        const firebaseRef= firebase.database().ref("scores");
        firebaseRef.push(data); //pushing data to firebase
    }
    else
    {
        alert("please fill all fields");
    }
    refreshData(); // refreshing the data after inputting the score
    loadScore();


}

function loadScore() {
    if(score_array !==null){score_array=[];}
    const firebaseRef=firebase.database().ref("scores");
    firebaseRef.on("value", function(snapshot) {
        var scores=snapshot.val();
        var keys=Object.keys(scores);
        for(var i=0;i<keys.length;i++){
            var k=keys[i];
            var initials=scores[k].initials;
            var score=scores[k].score;
            score_array.push([initials,score]);

        }

    }, function (errorObject) {
        message_details=errorObject.code;
    });

   window.setTimeout(createTable, 1000);

}

function createTable() {
    tableBody=document.getElementById("scoreTable");
    for (i = 0; i < score_array.length; i++) {
        var tr = document.createElement('TR');
        for (j = 0; j < score_array[i].length; j++) {
            var td = document.createElement('TD')
            td.appendChild(document.createTextNode(score_array[i][j]));
            tr.appendChild(td)
        }
        tableBody.appendChild(tr);
    }
    message_details="Score successfully added";

}
function notification()
{
    message=document.getElementById("message").innerHTML=message_details;

    setTimeout(function(){  message=document.getElementById("message").innerHTML=""; }, 1500);
}
function refreshData() {
    // Not a ideal way to referesh the data but this is also a possible way to delete the row items and again updating them
    for(var i =tableBody.rows.length - 1; i > 0; i--)
    {
       tableBody.deleteRow(i);
    }

}

