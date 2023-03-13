/* Filters customer type*/
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn-type").addEventListener("click", filterType);

  x = -1;
  function filterType() {
    var table, tr, td, i, txt;
    var option = ["OFFICE W/ DISPENSER", "OFFICE W/O DISPENSER", "RESIDENTIAL", ""];
    table = document.getElementById("t1");
    tr = table.getElementsByTagName("tr");

    x = x + 1;
    /* Hides those that doesn't meet current filter  */
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3];
      if (td) {
        txt = td.textContent || td.innerText;
        if (txt.toUpperCase().indexOf(option[x]) > -1) {
          tr[i].style.display = "";
        }

        else {
          tr[i].style.display = "none";
        }

        x = x % 4;
      }
    }
  }
});

/* Filters status type*/
y = -1;
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn-status").addEventListener("click", filterStatus);

  function filterStatus() {
    var table, tr, td, i, txt;
    var options = ["PENDING", "DELIVERED", "CANCELLED", ""];
    table = document.getElementById("t1");
    tr = table.getElementsByTagName("tr");

    y = y + 1;

    /* Hides those that doesn't meet current filter  */
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[7];
      if (td) {
        txt = td.textContent || td.innerText;
        if (txt.toUpperCase().indexOf(options[y]) > -1) {
          tr[i].style.display = "";
        }

        else {
          tr[i].style.display = "none";
        }

        y = y % 4;

      }
    }
  }
});

function compareDate(d1, d2) {
  date1 = new Date(d1);
  date2 = new Date(d2);
  return date2 - date1;
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

/* Formats the date input to match the table date format*/
function formatDate() {
  var input = document.getElementById("date").value;
  if (input != ""){
  const items = input.split(/-\s*/);
  var date = items[0] + "-" + items[1] + "-" + items[2]
  findDate(date);
  }
  else{ 
    showAllDate(); 
  }  
}


/* Date filter*/
function findDate(date) {
  var table, tr, td, i, txt, rev, td1, temp;
  temp = 0;
  rev = 0;
  table = document.getElementById("t1");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txt = td.textContent || td.innerText;

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

      document.getElementById("revenue").removeAttribute("hidden");
      document.getElementById("revenue").innerHTML = "Revenue = " + rev;
    }
  }
}

/* Unfiltered dates*/
function showAllDate(){
  var table, tr, td, i, txt;
  table = document.getElementById("t1");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txt = td.textContent || td.innerText;
      tr[i].style.display = "";
    }
  }
  document.getElementById("revenue").setAttribute("hidden", true);
}


