import axios from 'axios'
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get(`https://api.github.com/users/rkshockey`)
  .then(res => {
    const meCard = cardMaker(res.data);
    document.querySelector(`.cards`).appendChild(meCard);
    axios.get(`${res.data.followers_url}`)
      .then (res => {
        res.data.forEach(person => {
          axios.get(`https://api.github.com/users/${person.login}`)
          .then(res => {
            let card = cardMaker(res.data)
            document.querySelector(`.cards`).appendChild(card)
          })
          .catch(err => console.log(err));
        })
      })
      .catch(err => console.log(err))
  })
  .catch(err => console.log(err));

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [`tetondan`,
  `dustinmyers`,
  `justsml`,
  `luishrd`,
  `bigknell`
];

// followersArray.forEach(person => {
//   axios.get(`https://api.github.com/users/${person}`)
//   .then(res => {
//     let card = cardMaker(res.data)
//     document.querySelector(`.cards`).appendChild(card)
//   })
//   .catch(err => console.log(err));
// })

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardMaker ({ avatar_url, name, login, location, html_url, followers, following, bio }) {
  const card = document.createElement(`div`);
  const avatar = document.createElement(`img`);
  const cardInfo = document.createElement(`div`);
  const nameH3 = document.createElement(`h3`);
  const username = document.createElement(`p`);
  const locationP = document.createElement(`p`);
  const profile = document.createElement(`p`);
  const profileA = document.createElement(`a`);
  const followersP = document.createElement(`p`);
  const followingP = document.createElement(`p`);
  const bioP = document.createElement(`p`);

  card.appendChild(avatar);
  card.appendChild(cardInfo);
  cardInfo.appendChild(nameH3);
  cardInfo.appendChild(username);
  cardInfo.appendChild(locationP);
  cardInfo.appendChild(profile);
  
  cardInfo.appendChild(followersP);
  cardInfo.appendChild(followingP);
  cardInfo.appendChild(bioP);

  card.classList.add(`card`);
  cardInfo.classList.add(`class-list`);
  nameH3.classList.add(`name`);
  username.classList.add(`username`);

  avatar.src = avatar_url;
  avatar.alt = `Avatar image of ${name}`
  nameH3.textContent = name;
  username.textContent = login;
  locationP.textContent = location;
  profile.textContent= `Profile: `
  profileA.href = html_url;
  profileA.textContent = html_url;
  followersP.textContent = `Followers: ${followers}`;
  followingP.textContent = `Following: ${following}`;
  bioP.textContent = bio;

  profile.appendChild(profileA);

  return card
}


/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
