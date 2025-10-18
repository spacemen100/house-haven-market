import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Wrapper } from "@googlemaps/react-wrapper";
import Autocomplete from '@/components/Autocomplete';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MovingServices: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    movingDate: '',
    volume: '',
    formula: '',
    currentAddress: '',
    departureFloor: '',
    departureElevator: false,
    departurePortage: '',
    departureFurnitureLift: false,
    departureParkingAuth: false,
    newAddress: '',
    arrivalFloor: '',
    arrivalElevator: false,
    arrivalPortage: '',
    arrivalFurnitureLift: false,
    arrivalParkingAuth: false,
    distance: '',
  });
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  const [costBreakdown, setCostBreakdown] = useState(null);
  const [currentAddressCoords, setCurrentAddressCoords] = useState(null);
  const [newAddressCoords, setNewAddressCoords] = useState(null);
  const [isDistanceLocked, setIsDistanceLocked] = useState(true);

  const handleInputChange = (id: string, value: string | google.maps.places.PlaceResult | boolean) => {
    if (typeof value === 'string' || typeof value === 'boolean') {
        setFormData(prev => ({ ...prev, [id]: value }));
    } else {
        setFormData(prev => ({ ...prev, [id]: value.formatted_address }));
        if (id === 'currentAddress') {
            setCurrentAddressCoords(value.geometry.location);
        } else {
            setNewAddressCoords(value.geometry.location);
        }
    }
  };

  const getHaversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;

    const lat1 = coords1.lat();
    const lon1 = coords1.lng();
    const lat2 = coords2.lat();
    const lon2 = coords2.lng();

    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  const calculateDistance = useCallback(() => {
    if (!currentAddressCoords || !newAddressCoords) {
      return;
    }
    const distance = getHaversineDistance(currentAddressCoords, newAddressCoords) * 1.4;
    setFormData(prev => ({ ...prev, distance: distance.toFixed(2) }));

  }, [currentAddressCoords, newAddressCoords]);

  useEffect(() => {
    if (isDistanceLocked) {
        calculateDistance();
    }
  }, [currentAddressCoords, newAddressCoords, calculateDistance, isDistanceLocked]);

  const calculateCost = () => {
    const { volume, distance, departureFloor, arrivalFloor, formula, departurePortage, arrivalPortage, departureFurnitureLift, arrivalFurnitureLift, departureParkingAuth, arrivalParkingAuth } = formData;
    if (!volume || !distance) {
      toast.error('Veuillez remplir les champs de volume et de distance.');
      return;
    }

    const baseCost = 200;
    const costPerCubicMeter = 20;
    const costPerKm = 1;
    
    const formulaMultipliers = {
        Economique: 1,
        Standard: 1.2,
        Confort: 1.5,
    };

    const portageCosts = {
        '0-10m': 0,
        '10-20m': 50,
        '20-50m': 100,
        '50m+': 150,
    };

    const floorCosts = {
        'Maison': 0,
        'Rez-de-chaussée': 0,
        '1': 50,
        '2': 100,
        '3': 150,
        '4': 200,
        '5+': 250,
    }

    const furnitureLiftCost = 200;
    const parkingAuthCost = 100;

    const formulaMultiplier = formulaMultipliers[formula] || 1;
    const departurePortageCost = portageCosts[departurePortage] || 0;
    const arrivalPortageCost = portageCosts[arrivalPortage] || 0;
    const departureFloorCost = formData.departureElevator ? 0 : (floorCosts[departureFloor] || 0);
    const arrivalFloorCost = formData.arrivalElevator ? 0 : (floorCosts[arrivalFloor] || 0);
    const departureFurnitureLiftCost = departureFurnitureLift ? furnitureLiftCost : 0;
    const arrivalFurnitureLiftCost = arrivalFurnitureLift ? furnitureLiftCost : 0;
    const departureParkingAuthCost = departureParkingAuth ? parkingAuthCost : 0;
    const arrivalParkingAuthCost = arrivalParkingAuth ? parkingAuthCost : 0;


    const volumeCost = parseFloat(volume) * costPerCubicMeter;
    const distanceCost = parseFloat(distance) * costPerKm;

    const totalCost = (baseCost + volumeCost + distanceCost + departureFloorCost + arrivalFloorCost + departurePortageCost + arrivalPortageCost + departureFurnitureLiftCost + arrivalFurnitureLiftCost + departureParkingAuthCost + arrivalParkingAuthCost) * formulaMultiplier;
    setEstimatedCost(totalCost);

    setCostBreakdown([
        { name: 'Coût de base', value: baseCost },
        { name: 'Coût du volume', value: volumeCost },
        { name: 'Coût de la distance', value: distanceCost },
        { name: 'Coût étage départ', value: departureFloorCost },
        { name: 'Coût étage arrivée', value: arrivalFloorCost },
        { name: 'Coût portage départ', value: departurePortageCost },
        { name: 'Coût portage arrivée', value: arrivalPortageCost },
        { name: 'Coût monte-meuble départ', value: departureFurnitureLiftCost },
        { name: 'Coût monte-meuble arrivée', value: arrivalFurnitureLiftCost },
        { name: 'Coût stationnement départ', value: departureParkingAuthCost },
        { name: 'Coût stationnement arrivée', value: arrivalParkingAuthCost },
    ]);
  };

  const handleRequestCallback = () => {
    if (!formData.phone && !formData.email) {
      toast.error('Veuillez entrer votre numéro de téléphone ou votre email.');
      return;
    }
    // Here you would typically send the data to a backend
    toast.success('Votre demande de rappel a été envoyée avec succès !');
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        movingDate: '',
        volume: '',
        formula: '',
        currentAddress: '',
        departureFloor: '',
        departureElevator: false,
        departurePortage: '',
        departureFurnitureLift: false,
        departureParkingAuth: false,
        newAddress: '',
        arrivalFloor: '',
        arrivalElevator: false,
        arrivalPortage: '',
        arrivalFurnitureLift: false,
        arrivalParkingAuth: false,
        distance: '',
    });
    setEstimatedCost(null);
    setCostBreakdown(null);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19AF', '#19AFFF', '#FFC119', '#C4FF19', '#19FFC4', '#1943FF'];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Services de déménagement</h1>
      <p className="mb-8">Obtenez une estimation gratuite pour votre déménagement. Remplissez le formulaire ci-dessous et nous vous contacterons dans les plus brefs délais.</p>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Demande de devis de déménagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Informations générales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="movingDate">Date du déménagement</Label>
                        <Input id="movingDate" type="date" value={formData.movingDate} onChange={(e) => handleInputChange('movingDate', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="volume">Volume (m³)</Label>
                        <Input id="volume" type="number" value={formData.volume} onChange={(e) => handleInputChange('volume', e.target.value)} placeholder="e.g., 20" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="formula">Formule</Label>
                        <Select onValueChange={(value) => handleInputChange('formula', value)} defaultValue={formData.formula}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une formule" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Economique">Economique</SelectItem>
                                <SelectItem value="Standard">Standard</SelectItem>
                                <SelectItem value="Confort">Confort</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Logement de départ</h2>
                    <div className="space-y-4">
                        <Autocomplete
                            label="Adresse de départ"
                            placeholder="Entrez votre adresse de départ"
                            onPlaceChanged={(place) => handleInputChange('currentAddress', place)}
                            value={formData.currentAddress}
                            onChange={(value) => handleInputChange('currentAddress', value)}
                        />
                        <div className="space-y-2">
                            <Label htmlFor="departureFloor">Etage</Label>
                            <Select onValueChange={(value) => handleInputChange('departureFloor', value)} defaultValue={formData.departureFloor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un étage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Maison">Maison</SelectItem>
                                    <SelectItem value="Rez-de-chaussée">Rez-de-chaussée</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5+">5+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="departureElevator" checked={formData.departureElevator} onCheckedChange={(checked) => handleInputChange('departureElevator', checked)} />
                            <Label htmlFor="departureElevator">Ascenseur</Label>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="departurePortage">Portage</Label>
                            <Select onValueChange={(value) => handleInputChange('departurePortage', value)} defaultValue={formData.departurePortage}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez la distance de portage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-10m">0-10m</SelectItem>
                                    <SelectItem value="10-20m">10-20m</SelectItem>
                                    <SelectItem value="20-50m">20-50m</SelectItem>
                                    <SelectItem value="50m+">50m+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="departureFurnitureLift" checked={formData.departureFurnitureLift} onCheckedChange={(checked) => handleInputChange('departureFurnitureLift', checked)} />
                            <Label htmlFor="departureFurnitureLift">Monte-meuble</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="departureParkingAuth" checked={formData.departureParkingAuth} onCheckedChange={(checked) => handleInputChange('departureParkingAuth', checked)} />
                            <Label htmlFor="departureParkingAuth">Autorisation de stationnement</Label>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4">Logement d'arrivée</h2>
                    <div className="space-y-4">
                        <Autocomplete
                            label="Adresse d'arrivée"
                            placeholder="Entrez votre adresse d'arrivée"
                            onPlaceChanged={(place) => handleInputChange('newAddress', place)}
                            value={formData.newAddress}
                            onChange={(value) => handleInputChange('newAddress', value)}
                        />
                        <div className="space-y-2">
                            <Label htmlFor="arrivalFloor">Etage</Label>
                            <Select onValueChange={(value) => handleInputChange('arrivalFloor', value)} defaultValue={formData.arrivalFloor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un étage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Maison">Maison</SelectItem>
                                    <SelectItem value="Rez-de-chaussée">Rez-de-chaussée</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5+">5+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="arrivalElevator" checked={formData.arrivalElevator} onCheckedChange={(checked) => handleInputChange('arrivalElevator', checked)} />
                            <Label htmlFor="arrivalElevator">Ascenseur</Label>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="arrivalPortage">Portage</Label>
                            <Select onValueChange={(value) => handleInputChange('arrivalPortage', value)} defaultValue={formData.arrivalPortage}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez la distance de portage" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-10m">0-10m</SelectItem>
                                    <SelectItem value="10-20m">10-20m</SelectItem>
                                    <SelectItem value="20-50m">20-50m</SelectItem>
                                    <SelectItem value="50m+">50m+</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="arrivalFurnitureLift" checked={formData.arrivalFurnitureLift} onCheckedChange={(checked) => handleInputChange('arrivalFurnitureLift', checked)} />
                            <Label htmlFor="arrivalFurnitureLift">Monte-meuble</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch id="arrivalParkingAuth" checked={formData.arrivalParkingAuth} onCheckedChange={(checked) => handleInputChange('arrivalParkingAuth', checked)} />
                            <Label htmlFor="arrivalParkingAuth">Autorisation de stationnement</Label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="distance">Distance estimée (km)</Label>
                <Input id="distance" type="number" value={formData.distance} onChange={(e) => handleInputChange('distance', e.target.value)} placeholder="e.g., 50" readOnly={isDistanceLocked} />
                <div className="flex items-center space-x-2">
                    <Switch id="distance-lock" checked={!isDistanceLocked} onCheckedChange={() => setIsDistanceLocked(!isDistanceLocked)} />
                    <Label htmlFor="distance-lock">Modifier la distance</Label>
                </div>
            </div>

            <Button onClick={calculateCost} className="w-full">Calculer le devis</Button>

            {estimatedCost !== null && costBreakdown && (
              <div className="text-center pt-4">
                <p className="font-bold text-lg">Coût estimé: {estimatedCost.toFixed(2)} €</p>
                <p className="text-sm text-gray-500 mb-4">Ce coût est une estimation et peut varier.</p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="flex-1 flex justify-center items-center">
                        <PieChart width={500} height={300}>
                            <Pie
                                data={costBreakdown}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {costBreakdown.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" align="right" verticalAlign="middle" />
                        </PieChart>
                    </div>
                </div>

                <div className="mt-6">
                    <Label>Entrez votre numéro pour être rappelé et/ou votre mail</Label>
                    <div className="flex flex-col gap-2 mt-2">
                        <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Votre numéro de téléphone" />
                        <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Votre email" />
                        <Button onClick={handleRequestCallback}>Demander un rappel</Button>
                    </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MovingServicesWrapper = () => {
    const apiKey = "AIzaSyAjAs9O5AqVbaCZth-QDJm4KJfoq2ZzgUI";
    return (
        <Wrapper apiKey={apiKey} libraries={["places"]}>
            <MovingServices />
        </Wrapper>
    )
}

export default MovingServicesWrapper;