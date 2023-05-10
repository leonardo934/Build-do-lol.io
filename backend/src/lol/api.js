const db = require('../config/data');
const pgp = require('pg-promise')();
require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.LEAGUE_API_KEY;

// personagens do lol
async function getChampions() {
  const baseUrl = 'http://ddragon.leagueoflegends.com/cdn/13.6.1/data/pt_BR';
  const championsEndpoint = `${baseUrl}/champion.json`;
  const httpOptions = {
    headers: {
      'X-Riot-Token': apiKey
    }
  };


  try {
    const response = await axios.get(championsEndpoint, httpOptions);
    const champions = response.data.data;
    const hero = Object.keys(champions).map((c) => {
      return {
        name: c,
        image: `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${c}.png`
      }
    });

    const cs = new pgp.helpers.ColumnSet(['name', 'image'], { table: 'champions' });
    const query = pgp.helpers.insert(hero, cs);

    await db.none(query);
    console.log('Heroes have been inserted successfully!');

  } catch (error) {
    console.error(error);
  }
}

// itens do lol 

async function getItems() {
  const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/13.6.1/data/pt_BR';
  const itemsEndpoint = `${baseUrl}/item.json`;
  const httpOptions = {
    headers: {
      'X-Riot-Token': apiKey
    }
  };

  try {
    const response = await axios.get(itemsEndpoint, httpOptions);
    const items = response.data.data;
    const code = Object.keys(items).map((c) => {
      return c
    })
    const newItems = []
    code.forEach((item) => {
      const selected = items[item]
      if (selected.description && selected.gold.total) {
        newItems.push({
          name: selected.name,
          description: selected.description,
          image: `https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${selected.image.full}`,
          total: selected.gold.total,
          sell: selected.gold.sell
        })
      }
    })


    const cs = new pgp.helpers.ColumnSet(['name', 'description', 'image', 'total', 'sell'], { table: 'items' });
    const query = pgp.helpers.insert(newItems, cs);

    await db.none(query);
    console.log('Items have been inserted successfully!');


  } catch (error) {
    console.log(error)
  }
}


// runas do lol
async function getRunas() {
  const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/13.6.1/data/pt_BR';
  const runasEndpoint = `${baseUrl}/runesReforged.json`;
  const httpOptions = {
    headers: {
      'X-Riot-Token': apiKey
    }
  };

  try {
    const response = await axios.get(runasEndpoint, httpOptions);
    const data = response.data
    const slots = []
    const runas = []
    data.forEach((slot, i) => {
      slots.push({
        name: slot.name,
        image: `http://ddragon.leagueoflegends.com/cdn/img/${slot.icon}`,
        runas: slot.slots.map((rune) => {
          return rune.runes.map((a) => {
            runas.push({
              name: a.name,
              image: `http://ddragon.leagueoflegends.com/cdn/img/${a.icon}`,
              long_desc: a.longDesc,
              slot_id: slot.name
            })
          })
        })
      })
    })
    const csslots = new pgp.helpers.ColumnSet(['name', 'image'], { table: 'slots' });
    const queryslots = pgp.helpers.insert(slots, csslots);

    await db.none(queryslots);
    console.log('Slots have been inserted successfully!');


    const  csrunas= new pgp.helpers.ColumnSet(['name', 'image', 'long_desc', 'slot_id' ], { table: 'runas' });
    const queryrunas = pgp.helpers.insert(runas, csrunas);

    await db.none(queryrunas);
    console.log('Runas have been inserted successfully!');


  } catch (error) {
    console.log(error)
  }
}



// Chamando a função para obter as informações sobre os campeões e inseri-los no banco de dados
//getChampions();
getRunas()