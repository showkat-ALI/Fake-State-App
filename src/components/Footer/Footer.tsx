import React from "react";

export const Footer = () => {
  const watches = [
    { name: "rolex", price: 1000 },
    { name: "seiko", price: 500 },
  ];

  return (
    <div>
      <h1>Watches</h1>
      <ul>
        {watches.map((watch) => (
          <li key={watch.name}>
            {watch.name} - {watch.price}
          </li>
        ))}
        {watches.map((watch) => (
          <li key={watch.name}>
            {watch.name} - {watch.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
