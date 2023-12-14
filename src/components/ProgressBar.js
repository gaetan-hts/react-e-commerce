import React from "react";

const ProgressBar = ({ currentStep }) => {
  const steps = ["Panier", "Livraison", "Paiement"];

  return (
    <div className={`progress-bar-wrapper signup-${currentStep}`}>
      <ul className="progress-bar">
        {steps.map((step, index) => (
          <li
            key={index}
            className={
              index < currentStep - 1
                ? "completed"
                : index === currentStep - 1
                ? "active"
                : ""
            }
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressBar;
