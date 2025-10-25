import { defineField, defineType } from 'sanity';
import { Home } from 'lucide-react';

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (IDR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'type',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          { title: 'House', value: 'house' },
          { title: 'Apartment', value: 'apartment' },
          { title: 'Villa', value: 'villa' },
          { title: 'Land', value: 'land' },
          { title: 'Shophouse', value: 'shophouse' },
          { title: 'Office', value: 'office' },
          { title: 'Warehouse', value: 'warehouse' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'sale' },
          { title: 'For Rent', value: 'rent' },
          { title: 'Sold', value: 'sold' },
          { title: 'Rented', value: 'rented' },
        ],
      },
      initialValue: 'sale',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(20),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(20),
    }),
    defineField({
      name: 'buildingSize',
      title: 'Building Size (m²)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'landSize',
      title: 'Land Size (m²)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'certificate',
      title: 'Certificate Type',
      type: 'string',
      options: {
        list: [
          { title: 'SHM - Sertifikat Hak Milik', value: 'shm' },
          { title: 'HGB - Hak Guna Bangunan', value: 'hgb' },
          { title: 'SHGB - Sertifikat HGB', value: 'shgb' },
          { title: 'Girik', value: 'girik' },
          { title: 'AJB - Akta Jual Beli', value: 'ajb' },
          { title: 'PPJB - Perjanjian Pengikatan Jual Beli', value: 'ppjb' },
        ],
      },
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'province',
      title: 'Province',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'yearBuilt',
      title: 'Year Built',
      type: 'number',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'facing',
      title: 'Facing Direction',
      type: 'string',
      options: {
        list: [
          { title: 'North', value: 'north' },
          { title: 'Northeast', value: 'northeast' },
          { title: 'East', value: 'east' },
          { title: 'Southeast', value: 'southeast' },
          { title: 'South', value: 'south' },
          { title: 'Southwest', value: 'southwest' },
          { title: 'West', value: 'west' },
          { title: 'Northwest', value: 'northwest' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'agent',
      title: 'Agent',
      type: 'reference',
      to: [{ type: 'agent' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'listedAt',
      title: 'Listed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'photos.0',
      city: 'city',
      price: 'price',
      status: 'status',
    },
    prepare(selection) {
      const { title, media, city, price, status } = selection;
      return {
        title,
        subtitle: `${city} - Rp ${price?.toLocaleString('id-ID')} - ${status}`,
        media,
      };
    },
  },
});
