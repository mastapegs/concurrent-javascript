fetch('https://swapi.dev/api/starships/')
  .then(res => res.json())
  .then(starshipsData => {
    const starshipsArray = starshipsData.results
    console.log(starshipsArray)
    const starshipsDiv = document.getElementById('starships')
    starshipsDiv.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Starship Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost in Credits</th>
            <th>Crew</th>
          </tr>
        </thead>
        <tbody>
          ${starshipsArray.map(starship => `
            <tr>
              <td>${starship.name}</td>
              <td>${starship.model}</td>
              <td>${starship.manufacturer}</td>
              <td>${starship.cost_in_credits}</td>
              <td>${starship.crew}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
  })