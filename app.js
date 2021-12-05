function addfunction(){
    //GETTING INPUTS
    var titleinp = document.getElementById("titleinp")
    var descinp = document.getElementById("descinp")

 if(titleinp.value.length > 2 && descinp.value.length > 2){
        // CREATING ELEMENTS
    //div
    var thecard = document.createElement("div")
    thecard.classList.add("maincard")
    thecard.classList.add("col-lg-3")
    thecard.classList.add("col-md-4")
    thecard.classList.add("col-sm-6")
    thecard.classList.add("animate__animated")
    thecard.classList.add("animate__fadeInDown")
    
    
    //heading and p
    var cardheading = document.createElement("h2")
    var carddescription = document.createElement("p")

    //buttons
    var editbtn = document.createElement("button")
    editbtn.classList.add("btn")
    editbtn.classList.add("btn-warning")
    editbtn.classList.add("btn-sm")

    var delbtn = document.createElement("button")
    delbtn.classList.add("btn")
    delbtn.classList.add("btn-danger")
    delbtn.classList.add("btn-sm")

    var btnsdiv = document.createElement("div")
    btnsdiv.appendChild(editbtn)
    btnsdiv.appendChild(delbtn)

    editbtn.setAttribute("onclick" , "editfunc(this)")
    delbtn.setAttribute("onclick" , "delfunc(this)")


    //SETTING VALUES FOR INPUTS AND BUTTONS
    cardheading.innerHTML = titleinp.value
    carddescription.innerHTML = descinp.value
    editbtn.innerHTML = "EDIT"
    delbtn.innerHTML = "DELETE"

    //APPENDING THE CREATED ELEMENTS
    thecard.appendChild(cardheading)
    thecard.appendChild(carddescription)
    thecard.appendChild(btnsdiv)

    //SHOWING IN HTML
    var carddiv = document.getElementById("carddiv")
    carddiv.appendChild(thecard)

 }
 else{
     alert("Input too short for a Reminder")
 }
}

function deleteallfunction(){
    var carddiv = document.getElementById("carddiv")
    
    carddiv.innerHTML = ""
}

function editfunc(x){
    var asktitle = prompt("Edit title", x.parentNode.firstElementChild.innerHTML )
    var askdesc = prompt("Edit description" , x.parentNode.firstElementChild.nextElementSibling.innerHTML)
    x.parentNode.firstElementChild.innerHTML = asktitle
    x.parentNode.firstElementChild.nextElementSibling.innerHTML = askdesc
}

function delfunc(x){
    x.parentNode.parentNode.style.display = "none"  
}

