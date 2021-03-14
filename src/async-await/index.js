(async () => {
  const starshipsResponse = await fetch('https://swapi.dev/api/starships/')
  const starshipsData = await starshipsResponse.json()
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
  appearedInTDArray.forEach(async starshipTD => {
    const movieURLs = JSON.parse(starshipTD.dataset.movies)
    const movieNamePromises = movieURLs
      .map(movieURL => fetch(movieURL).then(res => res.json()).then(movieData => movieData.title))
    const movieNames = await Promise.all(movieNamePromises)
    starshipTD.innerHTML = movieNames.join()
  })
})()