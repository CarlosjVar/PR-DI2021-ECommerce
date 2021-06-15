import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TopProductsChart = ({ products }) => {
  const chartLabels = products.map((product) => product.name);

  const chartData = products.map((product) => product.count);

  return (
    <>
      <Bar
        id={'1'}
        data={{
          labels: chartLabels,
          datasets: [
            {
              label: 'Cantidad de ventas',
              data: chartData,
              backgroundColor: [
                '#006969',
                '#006969',
                '#006969',
                '#006969',
                '#006969',
              ],
            },
          ],
        }}
      />
    </>
  );
};

TopProductsChart.propTypes = {
  products: PropTypes.array.isRequired,
};

export default TopProductsChart;
