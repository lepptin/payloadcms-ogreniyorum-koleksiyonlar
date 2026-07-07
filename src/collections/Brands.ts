import { CollectionConfig } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    description: 'Ürün markaları',
    group: 'E-Ticaret',
    defaultColumns: ['name', 'country', 'website'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    // ----- MARKA ADI -----
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      validate: (value: any) => {
        if (!value) return 'Marka adı zorunludur.'
        if (value.length < 2) return 'En az 2 karakter girmelisiniz.'
        return true
      },
      admin: {
        placeholder: 'Örn: Apple, Samsung, ...',
        width: '50%',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'apple',
        width: '50%',
      },
    },

    // ----- LOGO (Upload) -----
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Marka logosu (önerilen boyut: 200x200)',
      },
    },

    // ----- WEBSİTESİ -----
    {
      name: 'website',
      type: 'text',
      admin: {
        placeholder: 'https://www.apple.com',
        description: 'Resmî web sitesi',
      },
      validate: (value: any) => {
        if (value && !/^https?:\/\/.+/.test(value)) {
          return 'Geçerli bir URL giriniz (http:// veya https:// ile başlamalı).'
        }
        return true
      },
    },

    // ----- ÜLKE -----
    {
      name: 'country',
      type: 'text',
      localized: true,
      admin: {
        placeholder: 'ABD, Çin, ...',
        width: '50%',
        description: 'Merkez ülke',
      },
    },

    // ----- AÇIKLAMA -----
    {
      name: 'description',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Marka hakkında detaylı bilgi',
      },
    },

    // ----- DURUM -----
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Aktif', value: 'active' },
        { label: 'Pasif', value: 'inactive' },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
        description: 'Marka yayın durumu',
      },
    },

    // ----- DİĞER (JSON) -----
    {
      name: 'socialMedia',
      type: 'json',
      admin: {
        description: 'Sosyal medya hesapları (JSON formatında: { "instagram": "...", "twitter": "..." })',
      },
    },

    // ----- COLLAPSIBLE (örnek) -----
    {
      type: 'collapsible',
      label: 'İletişim Bilgileri',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'email',
          type: 'email',
          admin: { placeholder: 'info@marka.com' },
        },
        {
          name: 'phone',
          type: 'text',
          admin: { placeholder: '+90 555 555 55 55' },
        },
        {
          name: 'address',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],

  // ----- HOOK'lar -----
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Örnek: web sitesi otomatik olarak "https://" ile başlamıyorsa ekle
        if (data.website && !/^https?:\/\//.test(data.website)) {
          data.website = `https://${data.website}`
        }
        return data
      },
    ],
  },
}