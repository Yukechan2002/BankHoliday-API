async function foo() {
  try {
    // Fetch the JSON data
    let response = await fetch("https://www.gov.uk/bank-holidays.json");

    // Parse the JSON data
    let data = await response.json();

    // Log the entire data
    console.log(data);

    // Extract holidays for different regions
    let englandHolidays = data["england-and-wales"].events;
    let irelandHolidays = data["northern-ireland"].events;
    let scotlandHolidays = data["scotland"].events;

    // Call the fun function

    var container = document.createElement("div");
    container.className = "container";

    var row = document.createElement("div");
    row.className = "row";

    var col = document.createElement("div");
    col.className = "col";

    var heading = document.createElement("div");
    heading.className = "head";

    var title = document.createElement("h1");
    title.innerHTML = "List of Bank Holidays";

    var country = document.createElement("div");
    country.className = "country";

    var input_label = document.createElement("label");
    input_label.setAttribute("for", "country_list");

    var input_break = document.createElement("br");

    var input_country = document.createElement("select");
    input_country.className = "custom-select selectdata";
    input_country.setAttribute("id", "country_list");
    input_country.setAttribute("name", "select-country");
    input_country.innerHTML = `
  <option value="region-select">---Select the Country---</option>
  <option value="England-and-Wales">England and Wales</option>
  <option value="Northern-Ireland">Northern Ireland</option>
  <option value="Scotland">Scotland</option>`;

    country.append(input_label, input_break, input_country);
    heading.append(title, country);
    col.append(heading);
    row.append(col);
    container.append(row);
    document.body.append(container);

    // Create table element
    var table = document.createElement("table");
    table.className = "table";
    var tbody = document.createElement("tbody");

    input_country.addEventListener("change", function () {
      const selectedValue = input_country.value;
      console.log(selectedValue);

      // Clear existing table rows
      tbody.innerHTML = "";

      // Add table rows for selected country
      let selectedHolidays;
      switch (selectedValue) {
        case "England-and-Wales":
          selectedHolidays = englandHolidays;
          break;
        case "Northern-Ireland":
          selectedHolidays = irelandHolidays;
          break;
        case "Scotland":
          selectedHolidays = scotlandHolidays;
          break;
        default:
          selectedHolidays = [];
      }

      selectedHolidays.forEach((holiday) => {
        var row = document.createElement("tr");
        var titleCell = document.createElement("td");
        titleCell.textContent = holiday.title;
        var dateCell = document.createElement("td");
        dateCell.textContent = holiday.date;

        row.append(titleCell, dateCell);
        tbody.append(row);
      });

      table.append(tbody);
      container.appendChild(table);
    });
  } catch (error) {
    console.log(error);
  }
}
foo();
