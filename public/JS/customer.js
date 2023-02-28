/* Filters customer type*/
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("btn-type").addEventListener("click", filter);

  x = -1;
  function filter() {
    var table, tr, td, i, txt;
    var option = ["OFFICE W/DISPENSER","OFFICE W/O DISPENSER","RESIDENTIAL", ""];
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



/* Alphabetizes customer table list */
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("btn-name").addEventListener("click", alphabetize);

  function alphabetize() {
    var table, rows, i, x, y, shouldSwitch, switching, sortBy, n = 0;
    table = document.getElementById("t1");
    switching = true;
    sortBy = "asc";
    /* While there is something to switch*/
    while (switching) {
      switching = false;
      rows = table.rows;

      /* Compares current cell to next*/
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;

        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];

        if (sortBy == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      /* If it should be switched, swap it */
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
});

