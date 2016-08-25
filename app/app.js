/** App Dependencies */
import $            from 'jquery';
import                   'appear';
import Chart        from 'chart';

/** app files */
import {DemoChart}    from 'demoChart';

$('.chartCanvas').each( (index, element) => {
    new DemoChart(element);
});