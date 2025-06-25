export function renderGameResults(gameName, yearlyData, container) {
   const title = document.createElement('h2');
   title.textContent = `${gameName.toUpperCase()} Results`;
   container.appendChild(title);

   Object.entries(yearlyData).forEach(([year, draws]) => {
      const yearHeading = document.createElement('h3');
      yearHeading.textContent = year;
      container.appendChild(yearHeading);

      const table = document.createElement('table');
      table.className = 'results-table';

      table.innerHTML = `
         <thead>
            <tr>
               <th>S/N</th>
               <th>Week</th>
               <th colspan="5">Winning</th>
               <th colspan="5">Machine</th>
            </tr>
         </thead>
         <tbody>
         ${draws.map(draw => `
            <tr>
               <td>${draw.serialNumber}</td>
               <td><small>${draw.date}</small></td>
               ${draw.winningNumbers.map(n => `<td class="winning">${n.number}</td>`).join('')}
               ${draw.machineNumbers.map(n => `<td class="machine">${n.number}</td>`).join('')}
            </tr>
         `).join('')}
         </tbody>
      `;
      container.appendChild(table);
  });
}
