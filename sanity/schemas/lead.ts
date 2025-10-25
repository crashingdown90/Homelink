import { defineField, defineType } from 'sanity';
import { Mail } from 'lucide-react';

export default defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  icon: Mail,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      options: {
        list: [
          { title: 'General Inquiry', value: 'general' },
          { title: 'Property Inquiry', value: 'property' },
          { title: 'Developer/Agent Inquiry', value: 'developer' },
          { title: 'Partnership', value: 'partnership' },
          { title: 'Support', value: 'support' },
          { title: 'Other', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'listingSlug',
      title: 'Listing Reference',
      type: 'string',
      description: 'Property slug if inquiry is about a specific listing',
    }),
    defineField({
      name: 'propertyRef',
      title: 'Property Reference',
      type: 'reference',
      to: [{ type: 'property' }],
      description: 'Link to property if applicable',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Contact Form', value: 'contact_form' },
          { title: 'Property Inquiry', value: 'property_inquiry' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Newsletter', value: 'newsletter' },
          { title: 'Developer Form', value: 'developer_form' },
        ],
      },
      initialValue: 'contact_form',
    }),
    defineField({
      name: 'consent',
      title: 'Consent',
      type: 'boolean',
      description: 'User has agreed to terms and privacy policy',
      validation: (Rule) => Rule.required().custom((value) => value === true || 'Consent is required'),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Converted', value: 'converted' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'Low', value: 'low' },
          { title: 'Medium', value: 'medium' },
          { title: 'High', value: 'high' },
          { title: 'Urgent', value: 'urgent' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{ type: 'agent' }],
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes about this lead',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        {
          name: 'ipAddress',
          type: 'string',
          title: 'IP Address',
        },
        {
          name: 'userAgent',
          type: 'string',
          title: 'User Agent',
        },
        {
          name: 'referrer',
          type: 'string',
          title: 'Referrer',
        },
        {
          name: 'utm',
          type: 'object',
          title: 'UTM Parameters',
          fields: [
            { name: 'source', type: 'string', title: 'Source' },
            { name: 'medium', type: 'string', title: 'Medium' },
            { name: 'campaign', type: 'string', title: 'Campaign' },
            { name: 'term', type: 'string', title: 'Term' },
            { name: 'content', type: 'string', title: 'Content' },
          ],
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Created Date, New',
      name: 'createdDateDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Priority, High',
      name: 'priorityDesc',
      by: [
        { field: 'priority', direction: 'desc' },
        { field: 'createdAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      status: 'status',
      priority: 'priority',
      createdAt: 'createdAt',
    },
    prepare(selection) {
      const { title, subtitle, status, priority, createdAt } = selection;
      const date = new Date(createdAt).toLocaleDateString('id-ID');
      const priorityIcon = priority === 'urgent' ? '🔴' : priority === 'high' ? '🟡' : '';
      return {
        title: `${priorityIcon} ${title}`,
        subtitle: `${subtitle || 'No email'} • ${status} • ${date}`,
      };
    },
  },
});
