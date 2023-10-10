Chart.defaults.color = '#fff';

 const ctx = document.getElementById('myChart');


 let config = {
    type: 'bar',
    data: {
        labels: [],//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'bronze',
                backgroundColor: '#cd7f32',
                data: [],//[12, 19, 3, 5, 2, 3],
                borderWidth: 1
            },
            {
                label: 'Silver',
                backgroundColor: 'silver',
                data: [],//[12, 19, 3, 5, 2, 3],
                borderWidth: 1
            },
            {
                label: 'Gold',
                backgroundColor: 'gold',
                data: [],//[12, 9, 3, 5, 2, 3],
                borderWidth: 1
            },
        ]
    },
    options: {
     
      plugins: {
        title: {
          display: true,
          text: 'Number of gold, silver and bronze medals per country'
        },
        legend: {
          labels: {
            color: "white",  // not 'fontColor:' anymore
            // fontSize: 18  // not 'fontSize:' anymore
            font: {
              size: 18 // 'size' now within object 'font {}'
            }
          }
        }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };

let bar = new Chart(ctx, config)
let clearData = function(){
  bar.data.labels = [];
  bar.data.datasets[0].data = [];
  bar.data.datasets[1].data = [];
  bar.data.datasets[2].data = [];
  bar.update();
}
let addMedal = function(country, medal)
{
  let type = ["bronze", "silver", "gold"];
  let i = type.indexOf(medal);
  let index = bar.data.labels.indexOf(country);
    if (index<0)
    {
        bar.data.labels.push(country);
        bar.data.datasets[0].data.push(0)
        bar.data.datasets[1].data.push(0)
        bar.data.datasets[2].data.push(0)
        bar.data.datasets[i].data[ bar.data.datasets[i].data.length-1]++;
    }
    else
    {
        bar.data.datasets[i].data[index]++;
    }
    bar.update();
}

let data;


let load = async function()
{
    let response = await fetch("../common/data.json");
    data = await response.json();
    data = data["1998"];

    let o = {};
    for(let sport in data){
       for(let record of data[sport] )
       {
          if (!o.hasOwnProperty(record.pays))
          {
            o[record.pays] = [];//{gold: 0, silver:0, bronze: 0};
          }
          o[record.pays].push( {sport: sport, medal: record.medal } );
       }
    }
    data = o;
}();
