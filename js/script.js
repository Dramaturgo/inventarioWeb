function openBatanForm() {
  const modal = document.getElementById("batanFormModal");
  if (modal) {
    modal.style.display = "block";
  }
}

function closeBatanForm() {
  const modal = document.getElementById("batanFormModal");
  if (modal) {
    modal.style.display = "none";
  }
}

function addRow(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const tbody = table.querySelector("tbody");
  const tfoot = table.querySelector("tfoot");
  const newRow = tbody.insertRow(tbody.rows.length); // Insert before the total row

  let cellsHtml = "";
  if (tableId === "fibraSueloTable" || tableId === "fibraPreparacionTable") {
    cellsHtml = `
            <td><input type="number" value="0" onchange="calculateTotal('${tableId}')"></td>
            <td><input type="number" value="0" onchange="calculateTotal('${tableId}')"></td>
            <td><input type="text"></td>
            <td><input type="number" value="0" readonly></td>
        `;
  } else if (
    tableId === "fibraReservaTable" ||
    tableId === "fibraMezcladaTable" ||
    tableId === "rollosSueloTable" ||
    tableId === "rollosSueloOtroTable"
  ) {
    cellsHtml = `
            <td><input type="text"></td>
            <td><input type="number" value="0" onchange="calculateTotal('${tableId}')"></td>
            <td><input type="number" value="0" readonly></td>
        `;
  }
  newRow.innerHTML = cellsHtml;
  calculateTotal(tableId); // Recalculate total after adding a row
}

function calculateTotal(tableId) {
  const table = document.getElementById(tableId);
  if (!table) return;

  const tbody = table.querySelector("tbody");
  let totalKilos = 0;

  for (let i = 0; i < tbody.rows.length; i++) {
    const row = tbody.rows[i];
    let kilosInput;
    if (tableId === "fibraSueloTable" || tableId === "fibraPreparacionTable") {
      // For tables with N° Fardos, Peso Neto, Estado, Kilos
      const numFardos =
        parseFloat(row.cells[0].querySelector("input").value) || 0;
      const pesoNeto =
        parseFloat(row.cells[1].querySelector("input").value) || 0;
      const kilos = numFardos * pesoNeto; // Example calculation, adjust as needed
      row.cells[3].querySelector("input").value = kilos.toFixed(2);
      totalKilos += kilos;
    } else {
      // For tables with Ubicación/N° Rollos, Peso, Kilos
      const peso = parseFloat(row.cells[1].querySelector("input").value) || 0;
      row.cells[2].querySelector("input").value = peso.toFixed(2); // Assuming Kilos is same as Peso for now
      totalKilos += peso;
    }
  }

  const totalCell = table.querySelector("tfoot .total-kilos");
  if (totalCell) {
    totalCell.textContent = totalKilos.toFixed(2);
  }
}

// Initial row for each table on load
document.addEventListener("DOMContentLoaded", () => {
  addRow("fibraSueloTable");
  addRow("fibraPreparacionTable");
  addRow("fibraReservaTable");
  addRow("fibraMezcladaTable");
  addRow("rollosSueloTable");
  addRow("rollosSueloOtroTable");
});
