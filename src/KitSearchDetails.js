import React from "react";
import "./KitSearchDetails.css";

export default function KitSearchDetails({ kitData }) {
  const foo = Object.keys(kitData);

  function convertKabob(str) {
    return str.replace(/_/g, " ");
  }

  function makeTrackingLink(key) {
    const value = kitData[key];
    return key === "shipping_tracking_code" ? (
      <a
        href={`https://www.fedex.com/fedextrack/?trknbr=${value}`}
        target="_blank"
      >
        {value}
      </a>
    ) : (
      value
    );
  }
  if (kitData.id) {
    return (
      <div className="detail">
        <h1>Details:</h1>
        {foo.map((key) => (
          <div className="detail-row" key={key}>
            <span className="detail-property">{convertKabob(key)}:</span>
            <span className="detail-value">{makeTrackingLink(key)}</span>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="detail empty">
        Please enter a valid Biobot Kit ID of at least 3 characters.
      </div>
    );
  }
}
