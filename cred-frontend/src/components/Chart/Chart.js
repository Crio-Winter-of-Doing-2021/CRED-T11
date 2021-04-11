import React from "react";
import { Doughnut } from "react-chartjs-2";
import classes from "./Chart.module.css";

export default function Chart({ statements }) {
  console.log(statements);
  const label = {}
  const label2 = statements.map((obj) => {
   return label[obj.category] += +obj.amount;
  });
  const labels = statements.map(obj=>obj.category)
  const amount = statements.map((obj) => obj.amount);
  console.log(label2);
  const data = {
    labels: [...labels],
    datasets: [
      {
        label: "Category",
        data: [...amount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(158, 102, 255, 0.2)",
          "rgba(252, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(158, 102, 255, 0.2)",
          "rgba(252, 159, 64, 0.2)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div>
      <h3 className={classes.title}> Barchart</h3>
      <Doughnut data={data} width={100} height={100} />
    </div>
  );
}
