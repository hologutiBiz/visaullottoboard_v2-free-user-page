export function renderGameResults(gameKey, yearlyData, container) {
  const years = Object.keys(yearlyData).sort((a, b) => a - b);

  years.forEach(year => {
    const draws = yearlyData[year];

    const table = document.createElement('table');
    table.innerHTML = `
      <caption class="game-year">${year}</caption>
      <thead>
        <tr>
          <th class="serial-num">S/N</th>
          <th>WEEK</th>
          <th colspan="5">WINNING</th>
          <th colspan="5">MACHINE</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    draws.forEach(draw => {
      const winning = draw.winningNumbers
        .map(n => `<td class="winning">${n.number || '—'}</td>`)
        .join('');

      const machine = draw.machineNumbers
        .map((n, i) => {
          const extra = i === 0 ? 'fbm' : '';
          return `<td class="machine ${extra}">${n.number || '—'}</td>`;
        })
        .join('');

      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="serial-num">${draw.serialNumber || '—'}</td>
        <td class="days"><small>${draw.date || '—'}</small></td>
        ${winning}
        ${machine}
      `;

      tbody.appendChild(row);
    });

    container.appendChild(table);

    // const span = document.createElement("span");
    // span.textContent = `${gameKey[0]}`;
  });
}
