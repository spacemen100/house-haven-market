import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreatePropertyInput } from '@/lib/api/properties';

const propertyStep1Schema = z.object({
  phone_number: z.string().min(6, "Phone number too short").max(20, "Phone number too long"),
  contactEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  instagramHandle: z.string().optional(),
  facebookUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
  twitterHandle: z.string().optional(),
  reference_number: z.string().optional(),
});

interface AddPropertyStep1Props {
  onNext: (data: Partial<CreatePropertyInput>) => void;
  onBack?: () => void;
}

const AddPropertyStep1: React.FC<AddPropertyStep1Props> = ({ onNext, onBack }) => {
  const form = useForm<z.infer<typeof propertyStep1Schema>>({
    resolver: zodResolver(propertyStep1Schema),
    defaultValues: {
      phone_number: '',
      contactEmail: '',
      instagramHandle: '',
      facebookUrl: '',
      twitterHandle: '',
      reference_number: '',
    }
  });

  useEffect(() => {
    const generateReferenceNumber = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    form.setValue('reference_number', generateReferenceNumber());
  }, [form]);

  const onSubmit = (values: z.infer<typeof propertyStep1Schema>) => {
    const mappedData = {
      phone_number: values.phone_number,
      reference_number: values.reference_number,
      contactEmail: values.contactEmail,
      instagramHandle: values.instagramHandle,
      facebookUrl: values.facebookUrl,
      twitterHandle: values.twitterHandle,
    };
    onNext(mappedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold">Informations supplémentaires</h2>
          <p className="text-muted-foreground mt-2">
            Renseignez les informations supplémentaires de votre annonce
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de téléphone*</FormLabel>
                <FormControl>
                  <Input placeholder="Votre numéro de contact" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email de contact</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email pour les contacts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de référence</FormLabel>
                <FormControl>
                  <Input placeholder="Référence interne (généré automatiquement)" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-lg font-medium mt-6">Réseaux sociaux</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="instagramHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="@votrepseudo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="Lien vers votre profil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitterHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="@votrepseudo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-between mt-8">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
            >
              Retour
            </Button>
          )}
          <Button type="submit" className={onBack ? "" : "w-full"}>Suivant</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyStep1;
