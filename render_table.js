const container = document.querySelector("#mlat-table");
//reset container first
container.innerHTML = "";

var open_bets = [];
var my_sites = [3, 5, 6, 7, 8, 9, 10, 11, 12];
var site_dic = {
  1: {
    site_id: 1,
    site_name: "Pinnacle",
    site_abbreviation: "PN",
    locations: ["US"],
    link: "https://www.pinnacle.com/en/",
  },
  2: {
    site_id: 2,
    site_name: "MyBookie",
    site_abbreviation: "MB",
    locations: ["Online"],
    link: "https://engine.mybookie.ag/sports/home",
  },
  3: {
    site_id: 3,
    site_name: "Bovada",
    site_abbreviation: "BV",
    locations: ["Online"],
    link: "https://www.bovada.lv/",
  },
  4: {
    site_id: 4,
    site_name: "BetOnline",
    site_abbreviation: "BO",
    locations: ["Online"],
    link: "https://www.betonline.ag/",
  },
  5: {
    site_id: 5,
    site_name: "EveryGame",
    site_abbreviation: "EG",
    locations: ["Online"],
    link: "https://sports.everygame.eu/en/Bets/Baseball/4",
  },
  6: {
    site_id: 6,
    site_name: "FanDuel",
    site_abbreviation: "FD",
    locations: ["US"],
    link: "https://sportsbook.fanduel.com/",
  },
  7: {
    site_id: 7,
    site_name: "DraftKings",
    site_abbreviation: "DK",
    locations: ["US"],
    link: "https://sportsbook.draftkings.com/featured",
  },
  8: {
    site_id: 8,
    site_name: "BetMGM",
    site_abbreviation: "BM",
    locations: ["US"],
    link: "https://casino.wv.betmgm.com/en/games?wm=&btag=&tdpeh=&pid=",
  },
  9: {
    site_id: 9,
    site_name: "Caesars",
    site_abbreviation: "CS",
    locations: ["US"],
    link: "https://www.williamhill.com/us/nj/bet/",
  },
  10: {
    site_id: 10,
    site_name: "Sugarhouse",
    site_abbreviation: "SH",
    locations: ["US"],
    link: "https://ct.playsugarhouse.com/?page=sportsbook&feed=featured#home",
  },
  11: {
    site_id: 11,
    site_name: "WynnBet",
    site_abbreviation: "WB",
    locations: ["US"],
    link: "https://co.wynnbet.com/sportsbook",
  },
  12: {
    site_id: 12,
    site_name: "BetFred",
    site_abbreviation: "BF",
    locations: ["US"],
    link: "https://co.betfredsports.com/sports/sport/4/baseball/matches",
  },
  13: {
    site_id: 13,
    site_name: "PlayUp",
    site_abbreviation: "PU",
    locations: ["US"],
    link: "https://co.playupusa.com/en-us/sports/baseball",
  },
  14: {
    site_id: 14,
    site_name: "SuperBook",
    site_abbreviation: "SB",
    locations: ["US"],
    link: "https://co.superbook.com/sports/navigation/1110.1/7627.1",
  },
  15: {
    site_id: 15,
    site_name: "PointsBet",
    site_abbreviation: "PB",
    locations: ["US"],
    link: "https://co.pointsbet.com/",
  },
  16: {
    site_id: 16,
    site_name: "Betway",
    site_abbreviation: "BW",
    locations: ["US"],
    link: "https://co.betway.com/",
  },
  17: {
    site_id: 17,
    site_name: "FoxBet",
    site_abbreviation: "FB",
    locations: ["US"],
    link: "https://co.foxbet.com/#/",
  },
  18: {
    site_id: 18,
    site_name: "Barstool",
    site_abbreviation: "BS",
    locations: ["US"],
    link: "https://www.barstoolsportsbook.com/sports/baseball",
  },
  19: {
    site_id: 19,
    site_name: "SIBook",
    site_abbreviation: "SI",
    locations: ["US"],
    link: "https://www.sisportsbook.com/baseball/",
  },
  20: {
    site_id: 20,
    site_name: "BallyBet",
    site_abbreviation: "BB",
    locations: ["US"],
    link: "https://co.ballybet.com/sports/home.sbk",
  },
};
var site_headers = "";

my_sites.forEach((site_id) => {
  site_headers += `<th>${site_dic[site_id]["site_name"]}</th>`;
});

createTable();

function createTable() {
  for (const [game_id, game_data] of Object.entries(response)) {
    game_date_time = Date.parse(game_data["game_time"]);
    let categories_html = "";
    let sport = game_data["sport_name"];

    for (const [category_id, cat_data] of Object.entries(
      game_data["categories"]
    ).sort(function (a, b) {
      return order(a, sport) - order(b, sport);
    })) {
      if (cat_data["is_prop"] == true) {
        // PROPS
        var players = ``;
        for (const [player, player_data] of Object.entries(
          cat_data["players"]
        ).sort()) {
          let rowsData = createRow(
            player_data["lines"][player_data["main_line"]],
            category_id,
            game_id,
            player
          );
          main_player_line = `<tr class="details-row">
              <td rowspan="${rowsData.rows.length}">
                ${player}
              </td>
              ${rowsData.line + rowsData.rows[0]}
            </tr>`;
          if (rowsData.rows.length > 1) {
            rowsData.rows.shift();
            main_player_line += rowsData.rows
              .map((row) => `<tr class="details-row">${row}</tr>`)
              .join("");
          }

          alt_player_lines = ``;

          for (const [line, line_data] of Object.entries(
            player_data["lines"]
          ).sort(function (a, b) {
            return parseFloat(a) - parseFloat(b);
          })) {
            if (line != player_data["main_line"]) {
              try {
                let rowsData = createRow(
                  line_data,
                  category_id,
                  game_id,
                  player
                );
                alt_player_lines = `<tr class="details-row more">
                    <td rowspan="${rowsData.rows.length}"></td>
                    ${rowsData.line + rowsData.rows[0]}
                  </tr>`;
                if (rowsData.rows.length > 1) {
                  rowsData.rows.shift();
                  alt_player_lines += rowsData.rows
                    .map((row) => `<tr class="details-row more">${row}</tr>`)
                    .join("");
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
          players += `<tbody class="table-row ${
            alt_player_lines && "more-rows"
          }" ${
            alt_player_lines &&
            `onclick="toggleMoreRows(this)" data-expanded="false"`
          }>
            ${
              (alt_player_lines
                ? main_player_line.replace(
                    /rowspan=\"\d+\">/,
                    "$&<span>&#9660;</span>&nbsp;"
                  )
                : main_player_line) + alt_player_lines
            }
          </tbody>`;
        }
        var players_table_html = `<table>
            <thead>
              <tr>
                <th>Player</th><th>Line</th><th>Outcome</th>${site_headers}
              </tr>
            </thead>
                  ${players}
          </table>`;
        categories_html += `<tr class="table-within expand-btn" onclick="toggleTable(this)">
            <td colspan="100%" class="legend" data-expand-icon="➕">
              <span>${cat_data["category_name"]}</span>
            </td>
          </tr>
          <tr class="table-within table-containing-row">
            <td colspan="100%">
              ${players_table_html}
            </td>
          </tr>`;
      } else {
        // MAIN LINES
        try {
          let rowsData = createRow(
            cat_data["lines"][cat_data["main_line"]],
            category_id,
            game_id
          );
          var main_row = `<tr class="details-row"><td rowspan="${
            rowsData.rows.length
          }">${cat_data["category_name"]}</td>${
            rowsData.line + rowsData.rows[0]
          }</tr>`;
          if (rowsData.rows.length > 1) {
            rowsData.rows.shift();
            main_row += rowsData.rows
              .map((row) => `<tr class="details-row">${row}</tr>`)
              .join("");
          }
        } catch (err) {
          var main_row = `<tr class="details-row"><td>${cat_data["category_name"]}</td></tr>`;
        }

        var alt_lines = ``;
        for (const [line, line_data] of Object.entries(cat_data["lines"]).sort(
          function (a, b) {
            return parseFloat(a) - parseFloat(b);
          }
        )) {
          if (line != cat_data["main_line"]) {
            try {
              let rowsData = createRow(line_data, category_id, game_id);
              alt_lines += `<tr class="details-row more"><td rowspan="${
                rowsData.rows.length
              }"></td>${rowsData.line + rowsData.rows[0]}</tr>`;
              if (rowsData.rows.length > 1) {
                rowsData.rows.shift();
                alt_lines += rowsData.rows
                  .map((row) => `<tr class="details-row more">${row}</tr>`)
                  .join("");
              }
            } catch (err) {
              console.log(err);
            }
          }
        }
        var main_line = `${main_row}`;
        categories_html += `<tbody class="table-row ${
          alt_lines && "more-rows"
        }" ${
          alt_lines &&
          `onclick="toggleMoreRows(this)"
        data-expanded="false"`
        }>${
          (alt_lines
            ? main_line.replace(
                /rowspan=\"\d+\">/,
                "$&<span>&#9660;</span>&nbsp;"
              )
            : main_line) + alt_lines
        }</tbody>`;
      }
    }
    if (Object.keys(game_data["categories"]).length != 0) {
      let mainTable = `<tr class="table-within expand-btn" onclick="toggleTable(this)">
      <td data-expand-icon="➕">${game_data["home_team_name"]}</td>
      <td>${game_data["away_team_name"]}</td>
      <td>${game_data["game_time"]}</td>
      <td>-</td>
    </tr>
    <tr class="table-within table-containing-row">
      <td colspan="100%">
        <table>
          <thead>
            <tr>
              <th>Bet Type</th><th>Line</th><th>Outcome</th>${site_headers}
            </tr>
          </thead>
          ${categories_html}
      </td>
    </tr>`;
      container.innerHTML += mainTable;
    }
  }
}

function createRow(row_data, category_id, game_id, player = null) {
  let rows = [];
  var outcomes = [];
  for (const [outcome_id, outcome_data] of Object.entries(
    row_data["outcomes"]
  )) {
    outcomes.push(outcome_data["outcome_name"]);
  }
  let line = `<td rowspan="${outcomes.length}">${
    row_data["line"] == "0" ? "" : row_data["line"]
  }</td>`;

  let i = 0;
  for (const [outcome_id, outcome_data] of Object.entries(
    row_data["outcomes"]
  )) {
    rows[i] = `<td>${outcome_data["outcome_name"]}</td>`;
    i++;
  }

  my_sites.forEach((site_id) => {
    var site_name = site_dic[site_id]["site_name"];
    let j = 0;
    for (const [outcome_id, outcome_data] of Object.entries(
      row_data["outcomes"]
    )) {
      if (outcome_data["sites"].hasOwnProperty(site_name)) {
        let number = outcome_data["sites"][site_name]["am_odds"];
        rows[
          j++
        ] += `<td id="${outcome_data["sites"][site_name]["full_hash"]}" data-number-status="${number.includes('+') ? "up" : number.includes('-') ? "down" : ""}">${number}</td>`;
      } else {
        if (player != null) {
          var player_hash = `^(${player})`;
        } else {
          var player_hash = "";
        }
        var make_hash = `${game_id}_${category_id}${player_hash}^${row_data["line"]}*${outcome_id}_${site_name}`;
        rows[j++] += `<td id="${make_hash}">-</td>`;
      }
    }
  });
  return { line: line, rows };
}

function order(id, sport) {
  var id_split = id[0].split("^");
  var period_dic = {
    Baseball: {
      // MAIN LINES
      0: 0,
      f3: 1000,
      f5: 2000,
      f7: 3000,
      1: 11000,
      2: 12000,
      3: 13000,
      4: 14000,
      5: 15000,
      6: 16000,
      7: 17000,
      8: 18000,
      9: 19000,
    },
    Soccer: {},
    Football: {},
  };
  var order_dic = {
    Baseball: {
      // MAIN LINES
      0: 0,
      1: 1,
      2: 2,
      "3H": 3,
      "3A": 3.5,
      "0x": 4,
      // PROPS
      PHR: 100100,
      PHI: 100101,
      PRS: 100102,
      PRBI: 100103,
      PHIRRBI: 100115,
      PB: 100110,
      P1: 100111,
      P2: 100112,
      P3: 100113,
      PSB: 100114,
      PSO: 100200,
      PER: 100201,
      PRW: 100202,
      PO: 100203,
      PHA: 100204,
      PW: 100205,
    },
    Soccer: {},
    Football: {},
  };
  var order_num = 0;
  if (order_dic[sport].hasOwnProperty(id_split[0])) {
    order_num = order_dic[sport][id_split[0]];
  } else {
    order_num = 10000000;
    console.log(id_split);
  }
  if (period_dic[sport].hasOwnProperty(id_split[1])) {
    order_num += period_dic[sport][id_split[1]];
  } else {
    order_num += 10000000;
    console.log(id_split);
  }
  return order_num;
}
