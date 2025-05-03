import React from "react";
import { Check } from "lucide-react";

interface StepsIndicatorProps {
  currentStep: number;
}

const StepsIndicator = ({ currentStep }: StepsIndicatorProps) => {
  const steps = [
    { number: 1, label: "Authentication" },
    { number: 2, label: "Property Type" },
    { number: 3, label: "Basic Info" },
    { number: 4, label: "Features" },
    { number: 5, label: "Publish" }
  ];

  return (
    <div className="flex justify-between items-center max-w-3xl mx-auto">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className={`flex flex-col items-center ${currentStep >= step.number ? "text-teal-500" : "text-gray-400"}`}>
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                ${currentStep > step.number ? "bg-teal-500" : currentStep === step.number ? "bg-teal-500" : "bg-gray-200"}
                ${currentStep >= step.number ? "text-white" : ""}`}
            >
              {currentStep > step.number ? <Check className="h-6 w-6" /> : step.number}
            </div>
            <span className="text-sm hidden sm:block">{step.label}</span>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-1 h-1 mx-2 bg-gray-200">
              <div 
                className={`h-full transition-all duration-300 ${currentStep > step.number ? "bg-teal-500" : "bg-gray-200"}`} 
                style={{width: currentStep > step.number ? "100%" : "0%"}}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepsIndicator;