/** App Dependencies */
import $        from 'jquery';
import               'appear';
import Chart    from 'chart';

export class App {

    constructor(){

        this.chartData = [12, 19, 3, 5, 2, 3];

        $( () => {

            this.ctx = $("#chart");
            this.createChart();

            // apply appear to chart element
            $("#chart").appear();

            $(document.body).on('appear', "#chart", (event, $affected) => {

                // add real data at this point
                this.chart.data.datasets[0].data = this.chartData;
                this.chart.update();

                console.log('appeared', this.chart.data.datasets[0].data);
                $(document.body).off('appear', "#chart");

            });

        });

    }

    createChart(){

        this.chart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: this.createChartStartingData(this.chartData),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: this.findMax(this.chartData)
                        }
                    }]
                }
            }
        });

    }

    createChartStartingData(numArray){
        return numArray.map(() => { return 0; });
    }

    findMax(numArray){
        return Math.ceil(Math.max(...numArray) / 10) * 10;
    }
}