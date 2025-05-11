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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
          <h2 className="text-2xl font-bold">{t("additionalInformation")}</h2>
          <p className="text-muted-foreground mt-2">
            {t("provideAdditionalInformation")}
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phoneNumber")}*</FormLabel>
                <FormControl>
                  <Input placeholder={t("yourContactNumber")} {...field} />
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
                <FormLabel>{t("contactEmail")}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t("emailForContacts")} {...field} />
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
                <FormLabel>{t("referenceNumber")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("internalReference")} {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className="text-lg font-medium mt-6">{t("socialMedia")}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="instagramHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("instagram")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("yourInstagramUsername")} {...field} />
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
                  <FormLabel>{t("facebook")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("linkToYourProfile")} {...field} />
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
                  <FormLabel>{t("twitter")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("yourTwitterUsername")} {...field} />
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
              {t("back")}
            </Button>
          )}
          <Button type="submit" className={onBack ? "" : "w-full"}>{t("next")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyStep1;
