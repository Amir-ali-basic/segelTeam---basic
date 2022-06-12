let page = 1;
let pagelimit = 5;
let total = 1;

//fetch data using ajax
function fetchData() {
  $.ajax({
    url: 'https://challenge-api.view.agentur-loop.com/api.php',
    type: 'GET',
    data: {
      page: page,
      pagelimit: pagelimit,
    },
    success: function (data) {
      if (data) {
        let team = data.data.data;
        let html = '';
        total = data.data.meta.pagination.total;
        for (let i = 0; i < team.length; i++) {
          html += `<div class='team-member'>
                        <div class='team-member-image'>
                            <img src='${team[i].image}' alt='${team[i].name}' />
                        </div>
                        <div class='team-member-info'>
                            <h2>${team[i].name}</h2>
                            <p>${team[i].duties}</p>
                        </div>
                    </div>`;
        }
        //apendTo jquery
        $(html).appendTo('.team-cont');
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
  $('.load-more').show();
}
$(function () {
  fetchData();
  $('.load-more').click(function (e) {
    e.stopImmediatePropagation();
    if (page * pagelimit < total) {
      page++;
      fetchData();
    }
    page === pagelimit ? $('.load-more').hide() : '';
  });
});
//more modern way
async function fetchallCategories() {
  const response = await fetch(
    `https://challenge-api.view.agentur-loop.com/api.php?page=${page}`
  );
  const data = await response.json();
  let team = data.data.data;
  let catBtn = document.querySelector('.team-cat').children;

  //All categories
  const categories = team.map((duty) => duty.duty_slugs);
  const allCategories = ['show all', ...new Set(categories.flat())];
  console.log(allCategories);
  let cat = '';
  for (let j = 0; j < allCategories.length; j++) {
    cat += `
        <button value='${allCategories[j]}'>${allCategories[j]}</button>
        `;
  }
  $(cat).appendTo('.team-cat');
  $('.team-cat > button:nth-child(1)').addClass('activeBtn');
  //Data for all pages
  let allMembers = [];
  for (let x = 1; x <= pagelimit; x++) {
    const newResponse = await fetch(
      `https://challenge-api.view.agentur-loop.com/api.php?page=${x}`
    );
    const newData = await newResponse.json();
    allMembers.push(...newData.data.data);
  }

  $(catBtn).on('click', function () {
    let catValue = this.value;
    $('.team-cont').empty();
    $('.load-more').hide();
    console.log(catValue);
    if (catValue === 'show all') {
      fetchData();
    }
    $(catBtn).removeClass('activeBtn');
    $(this).addClass('activeBtn');
    let filterTeam = allMembers.filter(function (person) {
      return person.duty_slugs.includes(catValue);
    });
    //i prefere .map() more than for
    const members = filterTeam
      .map((member) => {
        const { name, image, duties } = member;
        return `<div class='team-member'>
                <div class='team-member-image'>
                    <img src='${image}' alt='${name}' />
                </div>
                <div class='team-member-info'>
                    <h2>${name}</h2>
                    <p>${duties}</p>
                </div>
            </div>
            `;
      })
      .join(' ');
    document
      .querySelector('.team-cont')
      .insertAdjacentHTML('afterbegin', members);
  });
}
fetchallCategories();
$(window).on('load resize scroll', function (e) {
  lastCol();
  $('.team-cat button').on('click', function () {
    lastCol();
  });
});

function lastCol() {
  let col = getComputedStyle(
    document.querySelector('.team-cont')
  ).gridTemplateColumns.split(' ').length;
  let row = getComputedStyle(
    document.querySelector('.team-cont')
  ).gridTemplateRows.split(' ').length;
  let allElements = col * row;
  $('div.team-member > .team-member-info').removeClass('classname');

  for (let i = 1; i <= allElements; i++) {
    if (i % col === 0) {
      $('div.team-member:nth-child(' + i + ') > .team-member-info').addClass(
        'team-lastCol'
      );
    }
  }
}

//What can be better in this project?
//-Using more arrow functions
//-Not the best way to filter team
//-I was not sure should i filter and show only 5 persons and then to have btn to load more
//-Background image at landing page was cropped and i need to modify it a little bit to make it better look
//-More global classes for style so i can reuse one class not write code again
// should navbar be all the time at right or to stay center
