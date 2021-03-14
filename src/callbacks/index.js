const starshipsRequest = new XMLHttpRequest()
starshipsRequest.addEventListener('load', function () {
  const starshipResponse = JSON.parse(this.response)
  console.log(starshipResponse)
  const starshipsArray = starshipResponse.results
  const starshipsDiv = document.getElementById('starships')
  starshipsDiv.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Starship Name</th>
          <th>Cost in Credits</th>
        </tr>
      </thead>
      <tbody>
        ${starshipsArray.map(starship => `
          <tr>
            <td>${starship.name}</td>
            <td>${starship.cost_in_credits}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
})
starshipsRequest.open('GET', 'https://swapi.dev/api/starships/')
starshipsRequest.send()