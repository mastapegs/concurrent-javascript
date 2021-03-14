fetch('https://swapi.dev/api/starships/')
  .then(starshipsResponse => starshipsResponse.json())
  .then(starshipsData => {
    const starshipsArray = starshipsData.results
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
            <th>Appeared In</th>
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
              <td data-movies=${JSON.stringify(starship.films)} class="appearedIn"></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `
    const appearedInTDArray = document.querySelectorAll('.appearedIn')
    appearedInTDArray.forEach(starshipTD => {
      const movieURLs = JSON.parse(starshipTD.dataset.movies)
      const movieNamePromises = movieURLs
        .map(movieURL => fetch(movieURL).then(res => res.json()).then(movieData => movieData.title))
      Promise.all(movieNamePromises)
        .then(movieNames => {
          starshipTD.innerHTML = movieNames.join()
        })
    })
  })