import React from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { CreatePropertyInput } from '@/lib/api/properties';

const propertyStep1Schema = z.object({
  phone_number: z.string().min(6, "Phone number too short").max(20, "Phone number too long"),
  contactEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  instagramHandle: z.string().optional(),
  facebookUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
  twitterHandle: z.string().optional(),
  cadastral_code: z.string().optional(),
  reference_number: z.string().optional(),
  condition: z.enum(["new", "good", "needs_renovation", "old"]),
  status: z.enum(["available", "pending", "sold"]).default("available"),
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
      cadastral_code: '',
      reference_number: '',
      condition: "good",
      status: "available",
    }
  });

  const onSubmit = (values: z.infer<typeof propertyStep1Schema>) => {
    const mappedData = {
      phone_number: values.phone_number,
      contact_email: values.contactEmail,
      instagram_handle: values.instagramHandle,
      facebook_url: values.facebookUrl,
      twitter_handle: values.twitterHandle,
      cadastral_code: values.cadastral_code,
      reference_number: values.reference_number,
      condition: values.condition,
      status: values.status,
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cadastral_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code cadastral</FormLabel>
                  <FormControl>
                    <Input placeholder="Code cadastral (optionnel)" {...field} />
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
                    <Input placeholder="Référence interne (optionnel)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>État du bien</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="new">Neuf</option>
                      <option value="good">Bon état</option>
                      <option value="needs_renovation">À rénover</option>
                      <option value="old">Ancien</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="available">Disponible</option>
                      <option value="pending">En cours</option>
                      <option value="sold">Vendu/Loué</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
