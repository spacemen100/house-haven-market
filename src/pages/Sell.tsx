
import { Building, DollarSign, HousePlus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-estate-800">
        <div className="container text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">
            Sell Your Property with Confidence
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-slate-200">
            Get started with HouseHaven and reach thousands of potential buyers. Our expert team will guide you through every step.
          </p>
          <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
            List Your Property
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-estate-800">
            Why Sell with HouseHaven?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-teal-500/10 rounded-full flex items-center justify-center mb-4">
                    <Tag className="h-6 w-6 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Competitive Pricing</h3>
                  <p className="text-muted-foreground">
                    Get a detailed market analysis and set the right price for your property.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-teal-500/10 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Maximum Exposure</h3>
                  <p className="text-muted-foreground">
                    Your property will be showcased to thousands of potential buyers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-teal-500/10 rounded-full flex items-center justify-center mb-4">
                    <DollarSign className="h-6 w-6 text-teal-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Better Returns</h3>
                  <p className="text-muted-foreground">
                    Our expert agents help you get the best value for your property.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-estate-800">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-estate-800 text-white flex items-center justify-center text-xl font-semibold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Property</h3>
              <p className="text-muted-foreground">
                Create your listing with photos, details, and pricing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-estate-800 text-white flex items-center justify-center text-xl font-semibold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Buyers</h3>
              <p className="text-muted-foreground">
                We'll match you with interested buyers and handle showings.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-estate-800 text-white flex items-center justify-center text-xl font-semibold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Close the Deal</h3>
              <p className="text-muted-foreground">
                Our team will guide you through negotiations and closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-estate-800">
              Ready to Sell Your Property?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Join thousands of satisfied sellers who have successfully sold their properties with HouseHaven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-teal-500 hover:bg-teal-600">
                List Your Property
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/properties">View Listed Properties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sell;
