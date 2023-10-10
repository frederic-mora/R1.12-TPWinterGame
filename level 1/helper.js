Chart.defaults.color = '#fff';
 
const ctx = document.getElementById('myChart');

let bar = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: [],//'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Number of medals per country',
        data: [],//[12, 19, 3, 5, 2, 3],
        borderWidth: 1
    }]
    },
    options: {
        plugins: {  // 'legend' now within object 'plugins {}'
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
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let clearData= function()
{
    bar.data.labels = [];
    bar.data.datasets[0].data = [];
    bar.update();
}

function addData(label, data) {
    bar.data.labels.push(label);

    bar.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    bar.update();
}



let data;


let load = async function()
{
    let response = await fetch("../common/data.json");
    data = await response.json();
    data = data["1998"];

    let o = [];
    for(let sport in data){
       for(let record of data[sport] )
       {
            let item = o.find( elem => elem.pays==record.pays );
            if (item==undefined)
            {
                o.push( {pays: record.pays, medals: 1 })
            }
            else
            {
                item.medals++;
            }
       }
    }
    data = o;
}();
