window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    document.getElementById("menu").style.top = "0";
  } else {
    document.getElementById("menu").style.top = "-74px";
  }
}


/**
 * Author: Shervin Firouzdehghan
 */

//This method is called when the login button in the login form is clicked.
function login(){
  //Getting the variables that the user entered when they are trying to login, Username and password.
  var userEmail = document.getElementById("inputEmailAddress").value;
  var userPassword = document.getElementById("inputPassword").value;
  //Validation to make sure that the user filled out all the corresponding fields for the username and password.
  if(userEmail != null && userEmail != "" && userPassword != null && userPassword != ""){
      firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)//If the username and password fields are entered then they will be sent to their dashboard after being authenticated within Firestore.
      .then((user) => {
          // Signed in 
          window.location = 'dashboard.html';//Redirecting the user to the corresponding dashboard which is the index.html file.
          //intializeApplicationTables();
          window.alert("Signed in" + userEmail);
      })
      .catch((error) => {
          //If there is an error the error will be displayed and they will not be sent to the dashboard.
          var errorCode = error.code;
          var errorMessage = error.message;
          window.alert("Error: " + errorMessage);
      });
  }
  else{//Else statement incase that the user did not fill out all the fields.
      window.alert("Error please fill out all fields");
  }

}


//This method is called when the logout button is clicked which will remove the authentication from the corresponding user and log them out.
function logout(){
  firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location = 'login.html';//Redirecting the user back to the login page when they are succesfully logged out.
      window.alert("Sign out succesful");
    }).catch(function(error) {
      // An error happened.
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);

    });
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    intializeApplicationTables();
  } else {
    // No user is signed in.
  }
});

//This method will initilaized the generation which is know as the main chart.
function intializeApplicationTables(){
  //Calling the auth method from firebase to get the current user.
  var user = firebase.auth().currentUser;
  const db = firebase.firestore();
//  $('#applicationsTable tbody').empty();
  //Below is the query that will get all the generation dates from the all time and add it to an array for the main chart.
  db.collection("users").doc(user.uid).collection("applications").orderBy("companyName","asc")
  .get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
          $("#applicationsTable").append("<tr><td>"+doc.get("companyName")+"</td><td>"+doc.get("jobName")+"</td><td>"+doc.get("description")+"</td></tr>");
      });

  })
  .catch(function(error) {
      console.log("Error getting temperature documents: ", error);
  });  
}


function searchTable() {
  // Declare variables 
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("applicationsTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}


function onClick(element) {
  var modal = document.getElementById("myModal");
  var imageClicked = element.id;
  // When the user clicks the button, open the modal 
  if(imageClicked == "pImage1"){
    document.getElementById("modalImage1").src = "images/hemsDash.png";
    document.getElementById("modalImage2").src = "images/hemsLogin.png";
    document.getElementById("modalImage3").src = "images/hemsChart.png";
    document.getElementById("modalHeader").innerHTML = "HEMS Android"
    document.getElementById("modalText").innerHTML = "Android application designed to monitor and control microgrid in a smart house for energy efficiency. Journal Summary: Security in an IoT network and a mobile application for micro-grids control & monitoring to minimize the waste of energy. Results was presented in the CIESESE 2020 Technical forum and in the CCWC 2020 IEEE";
    document.getElementById("modalTextTech").innerHTML ="Tech used: Java, Firebase Firestore and Python";
  }else if(imageClicked == "pImage2"){
    document.getElementById("modalImage1").src = "images/webConsoleLogin.png";
    document.getElementById("modalImage2").src = "images/webConsoleDashboard.png";
    document.getElementById("modalImage3").src = "images/webConsoleDashboard2.png";
    document.getElementById("modalHeader").innerHTML = "HEMS Web Console"
    document.getElementById("modalText").innerHTML = "Web console version of HEMS for Android that is used to monitor and track your users and devices that are connected to pertaining users microgrid.";
    document.getElementById("modalTextTech").innerHTML ="Tech used: JavaScript, HTML, CSS and Firebase Firestore";
  }else if(imageClicked == "pImage3"){
    document.getElementById("modalImage1").src = "images/BBStrengthLogin.jpg";
    document.getElementById("modalImage2").src = "images/BBStrengthLift.jpg";
    document.getElementById("modalImage3").src = "images/BBStrengthInLift.jpg";
    document.getElementById("modalHeader").innerHTML = "BlackBook Strength"
    document.getElementById("modalText").innerHTML = "Android application designed mainly for people that train using the 5 3 1 powerlifting philosophy that need a place to track there progress and calculate their next lifts. BlackBook Strength, among other features, also gives the user the ability to add assistance exercises, input their daily goal for calories and weightins but also track them. Application is fully scalable and allows the user to create and register their own account, with added functionality to reset password.";
    document.getElementById("modalTextTech").innerHTML ="Tech used: Java and Firebase Firestore";
  }else if(imageClicked == "pImage4"){
    document.getElementById("modalImage1").src = "images/portfolioLandingPage.png";
    document.getElementById("modalImage2").src = "images/pLogin.png";
    document.getElementById("modalImage3").src = "images/pLanding2.png";
    document.getElementById("modalHeader").innerHTML = "Personal Website"
    document.getElementById("modalText").innerHTML = "This portfolio";
    document.getElementById("modalTextTech").innerHTML ="Tech used: HTML, CSS, JavaScript and Firebase Firestore";
  }

  modal.style.display = "block";


  
}

function spanClick(){
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}