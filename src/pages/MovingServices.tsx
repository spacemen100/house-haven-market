import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Wrapper } from "@googlemaps/react-wrapper";
import Autocomplete from '@/components/Autocomplete';

const MovingServices: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    currentAddress: '',
    newAddress: '',
    volume: '',
    distance: '',
    floors: '',
    phone: '',
  });
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const handleInputChange = (id: string, value: string | google.maps.places.PlaceResult) => {
    if (typeof value === 'string') {
        setFormData(prev => ({ ...prev, [id]: value }));
    } else {
        setFormData(prev => ({ ...prev, [id]: value.formatted_address }));
    }
  };

  const calculateCost = () => {
    const { volume, distance, floors } = formData;
    if (!volume || !distance) {
      toast.error(t('movingServices.errors.fillFields'));
      return;
    }

    const baseCost = 50;
    const costPerCubicMeter = 20;
    const costPerKm = 1;
    const costPerFloor = 50;

    const volumeCost = parseFloat(volume) * costPerCubicMeter;
    const distanceCost = parseFloat(distance) * costPerKm;
    const floorCost = formData.floors ? parseFloat(floors) * costPerFloor : 0;

    const totalCost = baseCost + volumeCost + distanceCost + floorCost;
    setEstimatedCost(totalCost);
  };

  const handleRequestCallback = () => {
    if (!formData.phone) {
      toast.error(t('movingServices.errors.enterPhone'));
      return;
    }
    // Here you would typically send the data to a backend
    toast.success(t('movingServices.callbackSuccess'));
    setFormData({
        currentAddress: '',
        newAddress: '',
        volume: '',
        distance: '',
        floors: '',
        phone: '',
    });
    setEstimatedCost(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{t('movingServices.title')}</h1>
      <p className="mb-8">{t('movingServices.description')}</p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('movingServices.formTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Autocomplete
                    label={t('movingServices.currentAddress')}
                    placeholder={t('movingServices.currentAddressPlaceholder')}
                    onPlaceChanged={(place) => handleInputChange('currentAddress', place)}
                    value={formData.currentAddress}
                    onChange={(value) => handleInputChange('currentAddress', value)}
                />
                <Autocomplete
                    label={t('movingServices.newAddress')}
                    placeholder={t('movingServices.newAddressPlaceholder')}
                    onPlaceChanged={(place) => handleInputChange('newAddress', place)}
                    value={formData.newAddress}
                    onChange={(value) => handleInputChange('newAddress', value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="volume">{t('movingServices.volume')}</Label>
                    <Input id="volume" type="number" value={formData.volume} onChange={(e) => handleInputChange('volume', e.target.value)} placeholder="e.g., 20" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="distance">{t('movingServices.distance')}</Label>
                    <Input id="distance" type="number" value={formData.distance} onChange={(e) => handleInputChange('distance', e.target.value)} placeholder="e.g., 50" />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="floors">{t('movingServices.floors')}</Label>
              <Input id="floors" type="number" value={formData.floors} onChange={(e) => handleInputChange('floors', e.target.value)} placeholder={t('movingServices.floorsPlaceholder')} />
            </div>

            <Button onClick={calculateCost} className="w-full">{t('movingServices.calculate')}</Button>

            {estimatedCost !== null && (
              <div className="text-center pt-4">
                <p className="font-bold text-lg">{t('movingServices.estimatedCost')}: {estimatedCost.toFixed(2)} €</p>
                <p className="text-sm text-gray-500">{t('movingServices.costDisclaimer')}</p>
                
                <div className="mt-6">
                    <Label htmlFor="phone">{t('movingServices.phoneLabel')}</Label>
                    <div className="flex gap-2 mt-2">
                        <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder={t('movingServices.phonePlaceholder')} className="flex-grow" />
                        <Button onClick={handleRequestCallback}>{t('movingServices.requestCallback')}</Button>
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