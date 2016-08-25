/**
 * Created by clindsey on 8/25/2016.
 */

import $            from 'jquery';
import                   'appear';
import Chart        from 'chart';

export class DemoChart {

    constructor(element){

        this.element = element;
        this.$element = $(element);
        this.chartData = [12, 19, 3, 5, 2, 3];

        $( () => {

            this.createChart();

            this.setAppearTopOffset(this.$element);


            // apply appear to chart element
            this.$element.appear();

            $(document.body).on('appear', '#'+this.element.id, (event, $affected) => {

                // add real data at this point
                this.chart.data.datasets[0].data = this.chartData;
                this.chart.update();

                console.log(this.element.id);
                $(document.body).off('appear', '#'+this.element.id);

            });

            $.force_appear();

        });

    }

    createChart(){

        this.chart = new Chart(this.$element, {
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
                responsive: true,
                responsiveAnimationDuration: 500,
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

    setAppearTopOffset($el){
        // set offset depending on element height
        var attr = $el.attr('data-appear-top-offset');

        // only add attribute if element doesnt already have it
        // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
        if (typeof attr === typeof undefined || attr === false) {
            $el.attr('data-appear-top-offset', -($el.height()) );
        }
    }

    createChartStartingData(numArray){
        return numArray.map(() => { return 0; });
    }

    findMax(numArray){
        return Math.ceil(Math.max(...numArray) / 10) * 10;
    }
}