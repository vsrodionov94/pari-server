const getStats = async () => {
  const url = 'https://apm.vsrodionov.ru/getStats';
  const headers = {
    'Content-type': 'application/json',
  };
  return fetch(url, {
    method: 'GET',
    headers: headers,
  }).then(data => data.json());
};

const setMainInfo = data => {
  const openedCount = document.querySelector('#opened');
  const uniqOpened = document.querySelector('#uniqopened');
  const gameEnd = document.querySelector('#gameend');

  openedCount.textContent = data.users.length;
  uniqOpened.textContent = data.stats.gamesCount;
  gameEnd.textContent = data.stats.endGamesCount;
};

const getElement = () => {
  const template = document.querySelector('#user-template').content;
  const element = template.cloneNode(true);
  return element;
};

const generateUser = ({ vkId, points }) => {
  const element = getElement();
  const id = element.querySelector('.user__id');
  const pointsElement = element.querySelector('.user__points');

  id.textContent = vkId;
  pointsElement.textContent = points;

  return element;
};

const createUsers = users => {
  const table = document.querySelector('.table');
  users.forEach(user => {
    table.append(generateUser(user));
  });
};

getStats().then(data => {
  setMainInfo(data);
  createUsers(data.users);
});
