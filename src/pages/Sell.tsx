
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddPropertyStep1 from "@/components/property/add/AddPropertyStep1";
import AddPropertyStep2 from "@/components/property/add/AddPropertyStep2";
import AddPropertyStep3 from "@/components/property/add/AddPropertyStep3";
import AddPropertyStep4 from "@/components/property/add/AddPropertyStep4";
import StepsIndicator from "@/components/property/add/StepsIndicator";
import { CreatePropertyInput, createProperty } from "@/lib/api/properties";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Sell = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CreatePropertyInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Type assertion here since we know by step 4 we have all required fields
      await createProperty(formData as CreatePropertyInput);
      // Reset form
      setFormData({});
      setStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div><Navbar />
    <div className="min-h-screen bg-background">
      <section className="relative py-16 bg-estate-800">
        <div className="container text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4">
            Post Your Property Listing
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-200">
            Fill out the information below to create your property listing
          </p>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="container">
          <StepsIndicator currentStep={step} />
        </div>
      </section>

      <section className="py-12 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-md">
              <CardContent className="p-6 md:p-8">
                {step === 1 && (
                  <AddPropertyStep1 
                    onNext={(data) => {
                      setFormData({ ...formData, ...data });
                      setStep(2);
                    }}
                  />
                )}
                
                {step === 2 && (
                  <AddPropertyStep2
                    onBack={() => setStep(1)}
                    onNext={(data) => {
                      setFormData({ ...formData, ...data });
                      setStep(3);
                    }}
                  />
                )}
                
                {step === 3 && (
                  <AddPropertyStep3
                    onBack={() => setStep(2)}
                    onNext={(data) => {
                      setFormData({ ...formData, ...data });
                      setStep(4);
                    }}
                  />
                )}
                
                {step === 4 && (
                  <AddPropertyStep4
                    onBack={() => setStep(3)}
                    formData={formData}
                    isSubmitting={isSubmitting}
                    onSubmit={handleFinalSubmit}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </div>
  );
};

export default Sell;
