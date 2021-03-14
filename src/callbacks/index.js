const starshipsRequest = new XMLHttpRequest()
starshipsRequest.addEventListener('load', function () {
  const starshipsArray = JSON.parse(this.response).results
  const starshipsDiv = document.getElementById('starships')
  starshipsDiv.innerHTML = `
    <ul>
      ${starshipsArray.map(starship => `
        <li>${starship.name}</li>
      `).join('')}
    </ul>
  `
})
starshipsRequest.open('GET', 'https://swapi.dev/api/starships/')
starshipsRequest.send()