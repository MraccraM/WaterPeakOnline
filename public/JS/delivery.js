var typeBool = 0
var typeVal = -1
function setType(){
  typeVal +=1
  if (typeVal == 3){typeBool = 0}
  else {typeBool = 1}
  decide("")
}


var statBool = 0
var statVal = -1
function setStat(){
  statVal +=1
  if (statVal == 3){ statBool = 0}
  else {statBool = 1}
  decide("")
  
}

var dateBool = 0
function setDate(input){
  if (input == ""){ dateBool = 0}
  else {dateBool = 1}
  decide(input)
}


/* Filters customer type*/
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn-type").addEventListener("click", setType);
});


/* Filters status type*/
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn-status").addEventListener("click", setStat);
});

/* Formats the date input to match the table date format*/
function formatDate() {
  var input = document.getElementById("date").value;
  setDate(input)
  
}


function decide (input){

  var typeOption = ["OFFICE W/ DISPENSER", "OFFICE W/O DISPENSER", "RESIDENTIAL", ""];
  var statOption = ["PENDING", "DELIVERED", "CANCELLED", ""];
  temp = 0;
  rev = 0;
  console.log (typeBool + "(" + typeVal +")" + "|" + statBool  + "(" + statVal +")" + "|" + dateBool  + "(" + input +")" )
  table = document.getElementById("t1");
  tr = table.getElementsByTagName("tr");
  if (typeBool==0 && statBool ==0 && dateBool==0){
 
    typeVal = typeVal % 4;
    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "";   
    }
    
    document.getElementById("filler2").setAttribute("hidden",true);
    document.getElementById("filler").removeAttribute("hidden");
    
    var revenue = document.getElementById("revenue");
    revenue.style.display="none";
    
    var php = document.getElementById("php");
    php.style.display="none";
  }
    //type filter
    else if (typeBool==1 && statBool ==0 && dateBool==0){
      
      typeVal = typeVal % 4;


      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        if (td) {
          txt = td.textContent || td.innerText;
          if (txt.toUpperCase().indexOf(typeOption[typeVal]) > -1) {
            tr[i].style.display = "";
          }
  
          else {
            tr[i].style.display = "none";
          }
        
        }
      }
      hideRev()

    }

    //stat filter
    else if (statBool==1 && typeBool == 0 && dateBool == 0){
   
      statVal = statVal % 4;
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[7];
        if (td) {
          txt = td.textContent || td.innerText;
          if (txt.toUpperCase().indexOf(statOption[statVal]) > -1) {
            tr[i].style.display = "";
          }
  
          else {
            tr[i].style.display = "none";
          }
  
        }
      }
      hideRev()
    }

    //date filter
    else if (dateBool==1 && typeBool == 0 && statBool == 0){
     
      if (input != ""){
        const items = input.split(/-\s*/);
        var date = items[0] + "-" + items[1] + "-" + items[2]
        
        //find Date
          for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
              txt = td.textContent || td.innerText;
              savedDate= txt
              if (txt == date) {
                tr[i].style.display = "";
                if(tr[i].getElementsByTagName("td")[7].textContent == "Delivered"){
                  temp = parseInt(tr[i].getElementsByTagName("td")[6].innerHTML);
                  rev += temp;
                }
              }
              else {
                tr[i].style.display = "none";
              }
        
              showRev(date);
               
            }
          }
        }

    }


    else if (statBool == 1 && typeBool == 1 && dateBool == 0){
    
      typeVal = typeVal % 4
      statVal = statVal % 4
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[3];
        td1 = tr[i].getElementsByTagName("td")[7];
        if (td) {
          txt = td.textContent || td.innerText;
          txt1 = td1.textContent || td1.innerText;
          if (txt.toUpperCase().indexOf(typeOption[typeVal]) > -1 && txt1.toUpperCase().indexOf(statOption[statVal]) > -1 ) {
            tr[i].style.display = "";
          }
  
          else {
            tr[i].style.display = "none";
          }
  
        }
      }

      hideRev()
    }

    else if (dateBool == 1 && typeBool == 1 && statBool == 0){
      input = document.getElementById("date").value;
      typeVal = typeVal % 4
        const items = input.split(/-\s*/);
        var date = items[0] + "-" + items[1] + "-" + items[2]
        
        //find Date
          for (i = 0; i < tr.length; i++) {
            td1 = tr[i].getElementsByTagName("td")[3];
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
              txt = td.textContent || td.innerText;
              txt1 = td1.textContent || td1.innerText;
              if (txt == date && txt1.toUpperCase().indexOf(typeOption[typeVal]) > -1 ) {
                tr[i].style.display = "";
                if(tr[i].getElementsByTagName("td")[7].textContent == "Delivered"){
                  temp = parseInt(tr[i].getElementsByTagName("td")[6].innerHTML);
                  rev += temp;
                }
              }
              else {
                tr[i].style.display = "none";
              }
        
              showRev(date);
            }
          }
        }

    else if (dateBool == 1 && typeBool == 0 && statBool == 1){
      input = document.getElementById("date").value;
      statVal = statVal % 4
        const items = input.split(/-\s*/);
        var date = items[0] + "-" + items[1] + "-" + items[2]
        
        //find Date
          for (i = 0; i < tr.length; i++) {
            td1 = tr[i].getElementsByTagName("td")[7];
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
              txt = td.textContent || td.innerText;
              txt1 = td1.textContent || td1.innerText;
          
              if (txt == date && txt1.toUpperCase().indexOf(statOption[statVal]) > -1 ) {
                tr[i].style.display = "";
                if(tr[i].getElementsByTagName("td")[7].textContent == "Delivered"){
                  temp = parseInt(tr[i].getElementsByTagName("td")[6].innerHTML);
                  rev += temp;
                }
              }
              else {
                tr[i].style.display = "none";
              }
        
              showRev(date);
            }
          }
}

else if (dateBool == 1 && typeBool == 1 && statBool == 1){
  input = document.getElementById("date").value;
  statVal = statVal % 4
    const items = input.split(/-\s*/);
    var date = items[0] + "-" + items[1] + "-" + items[2]
    
    //find Date
      for (i = 0; i < tr.length; i++) {
        td2 = tr[i].getElementsByTagName("td")[3];
        td1 = tr[i].getElementsByTagName("td")[7];
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          txt = td.textContent || td.innerText;
          txt1 = td1.textContent || td1.innerText;
          txt2 = td2.textContent || td2.innerText;
     
          if (txt == date && txt1.toUpperCase().indexOf(statOption[statVal]) > -1 && txt2.toUpperCase().indexOf(typeOption[typeVal]) > -1 ) {
            tr[i].style.display = "";
            if(tr[i].getElementsByTagName("td")[7].textContent == "Delivered"){
              temp = parseInt(tr[i].getElementsByTagName("td")[6].innerHTML);
              rev += temp;
            }
          }
          else {
            tr[i].style.display = "none";
          }
    
          showRev(date);
          
        }
      }
}

}

function sortDate() {
  var table, switching, rows, i, n = 2, ans, shouldSwitch, x, y, counter = 1;
  table = document.getElementById("t1");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("td")[n].innerHTML;
      y = rows[i + 1].getElementsByTagName("td")[n].innerHTML;
      ans = compareDate(x, y);

      if (ans > 0) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }

  }
}


function showRev(date){
  document.getElementById("filler").setAttribute("hidden", true);
              document.getElementById("filler2").removeAttribute("hidden");
              document.getElementById("revenue").removeAttribute("hidden");
              document.getElementById("php").removeAttribute("hidden");

              document.getElementById("revenue").innerHTML = "Revenue for " +  date + ":";
              var revenue = document.getElementById("revenue");
              revenue.style.fontSize="20px";
              revenue.style.fontWeight="bold";
              revenue.style.marginLeft="2.5%";
              revenue.style.display="inline";
              
              document.getElementById("php").innerHTML ="Php " + rev;
              var php = document.getElementById("php");
              php.style.fontSize="20px";
              php.style.fontWeight="bold";
              php.style.color="green";
              php.style.display="inline";
}

function hideRev(){
      document.getElementById("filler2").setAttribute("hidden",true);
      document.getElementById("filler").removeAttribute("hidden");
      
      var revenue = document.getElementById("revenue");
      revenue.style.display="none";
      
      var php = document.getElementById("php");
      php.style.display="none";
}