const starshipsRequest = new XMLHttpRequest()
starshipsRequest.addEventListener('load', function () {
  const starshipResponse = JSON.parse(this.response)
  const starshipsArray = starshipResponse.results
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
  const appearedInArray = document.querySelectorAll('.appearedIn')
  appearedInArray.forEach(starshipTD => {
    const movieURLs = JSON.parse(starshipTD.dataset.movies)
    const movieNames = []
    let movieNamesCompletedRequests = 0
    for (let i = 0; i < movieURLs.length; i++) {
      const movieNameRequest = new XMLHttpRequest()
      movieNameRequest.addEventListener('load', function() {
        const movieNameResponse = JSON.parse(this.response)
        movieNames.push(movieNameResponse.title)
        movieNamesCompletedRequests++
        if (movieNamesCompletedRequests === movieURLs.length) {
          starshipTD.innerHTML = movieNames.join()
        }
      })
      movieNameRequest.open('GET', movieURLs[i])
      movieNameRequest.send()
    }
  })
})
starshipsRequest.open('GET', 'https://swapi.dev/api/starships/')
starshipsRequest.send()