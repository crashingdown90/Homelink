import { defineField, defineType } from 'sanity';
import { Settings } from 'lucide-react';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Homelink',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 2,
      initialValue: 'Platform properti digital terhubung di Indonesia. Temukan hunian masa depanmu dengan mudah, aman, dan tepercaya.',
    }),
    defineField({
      name: 'siteKeywords',
      title: 'Site Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Default OG Image',
      type: 'image',
      description: 'Default image for social media sharing',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'phone',
          type: 'string',
          title: 'Phone',
        },
        {
          name: 'whatsapp',
          type: 'string',
          title: 'WhatsApp',
        },
        {
          name: 'email',
          type: 'string',
          title: 'Email',
        },
        {
          name: 'address',
          type: 'text',
          title: 'Address',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook',
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter',
        },
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram',
        },
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
        },
        {
          name: 'youtube',
          type: 'url',
          title: 'YouTube',
        },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics',
      type: 'object',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'string',
          title: 'Google Analytics ID',
        },
        {
          name: 'facebookPixelId',
          type: 'string',
          title: 'Facebook Pixel ID',
        },
      ],
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement Bar',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Announcement',
          initialValue: false,
        },
        {
          name: 'text',
          type: 'string',
          title: 'Announcement Text',
        },
        {
          name: 'link',
          type: 'url',
          title: 'Announcement Link',
        },
      ],
    }),
    defineField({
      name: 'maintenance',
      title: 'Maintenance Mode',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          type: 'boolean',
          title: 'Enable Maintenance Mode',
          initialValue: false,
        },
        {
          name: 'message',
          type: 'text',
          title: 'Maintenance Message',
          rows: 2,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
