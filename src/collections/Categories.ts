import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    description: 'Ürün kategorileri (hiyerarşik)',
    group: 'E-Ticaret',
    defaultColumns: ['name', 'parent', 'status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    // ----- TEMEL BİLGİLER -----
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      validate: (value: any) => {
        if (!value) return 'Kategori adı zorunludur.'
        if (value.length < 2) return 'En az 2 karakter girmelisiniz.'
        return true
      },
      admin: {
        placeholder: 'Örn: Elektronik, Giyim, ...',
        width: '50%',
        description: 'Kategori adı (çok dilli)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        placeholder: 'elektronik',
        width: '50%',
        description: 'SEO dostu URL (benzersiz)',
      },
    },

    // ----- HİYERARŞİ (Kendiyle ilişki) -----
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'categories',
      admin: {
        description: 'Üst kategori (boş bırakırsanız ana kategori olur)',
        width: '50%',
      },
    },

    // ----- GÖRSEL -----
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Kategori için temsilî görsel',
        width: '50%',
      },
    },

    // ----- AÇIKLAMA -----
    {
      name: 'description',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Kategori açıklaması (isteğe bağlı)',
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
        description: 'Kategori yayın durumu',
      },
    },

    // ----- SEO BİLGİLERİ (Tabs ile düzen) -----
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              maxLength: 60,
              admin: { description: 'Meta başlık (60 karakter)' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              maxLength: 160,
            },
          ],
        },
        {
          label: 'Ek Bilgiler',
          fields: [
            {
              name: 'displayOrder',
              type: 'number',
              defaultValue: 0,
              admin: { description: 'Sıralama (küçük sayı önce gösterilir)' },
            },
            {
              name: 'isFeatured',
              type: 'checkbox',
              defaultValue: false,
              label: 'Ana sayfada öne çıkar',
            },
          ],
        },
      ],
    },
  ],

  // ----- HOOK'lar -----
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        // Bir kategorinin kendi kendisinin alt kategorisi olmasını engelle
        if (data.parent && data.parent === data.id) {
          throw new Error('Bir kategori kendisinin alt kategorisi olamaz.')
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc }) => {
        // Örnek: Kategori değişince log at
        console.log(`Kategori güncellendi: ${doc.name}`)
      },
    ],
  },
}