import { defineField, defineType } from 'sanity';
import { User } from 'lucide-react';

export default defineType({
  name: 'agent',
  title: 'Agent',
  type: 'document',
  icon: User,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, {
          name: 'Indonesian phone number',
          invert: false,
        }).warning('Should be a valid Indonesian phone number'),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, {
          name: 'Indonesian WhatsApp number',
          invert: false,
        }).warning('Should be a valid Indonesian WhatsApp number'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'office',
      title: 'Office/Company',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'licenseNumber',
      title: 'License Number',
      type: 'string',
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(50),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5).precision(1),
      readOnly: true,
    }),
    defineField({
      name: 'totalReviews',
      title: 'Total Reviews',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'verified',
      title: 'Verified',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'office',
      media: 'avatar',
      verified: 'verified',
    },
    prepare(selection) {
      const { title, subtitle, media, verified } = selection;
      return {
        title: verified ? `${title} ✓` : title,
        subtitle,
        media,
      };
    },
  },
});
