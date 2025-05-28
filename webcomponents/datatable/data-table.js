class DataTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
   <style>
    table {
     width: 100%;
     border-collapse: collapse;
     font-family: sans-serif;
    }
    th, td {
     padding: 0.75rem;
     border: 1px solid #ccc;
     text-align: left;
    }
    th {
     background-color: #f4f4f4;
     font-weight: 600;
    }
   </style>
   <table>
    <thead></head>
    <tbody></tbody>
   </table>
  `;
    this.columns = [];
    this.rows = [];
  }
  set data({ columns, rows }) {
    this.columns = columns;
    this.rows = rows;
    this.render();
  }
  render() {
    const thead = this.shadowRoot.querySelector("thead");
    const tbody = this.shadowRoot.querySelector("tbody");
    // clear previous content
    thead.innerHTML = "";
    tbody.innerHTML = "";

    // render header
    const headerRow = document.createElement("tr");
    this.columns.forEach((col) => {
      const th = document.createElement("th");
      th.textContent = col.label;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // render rows
    this.rows.forEach((row) => {
      const tr = document.createElement("tr");
      this.columns.forEach((col) => {
        const td = document.createElement("td");
        td.textContent = row[col.key];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }
}
customElements.define("data-table", DataTable);
