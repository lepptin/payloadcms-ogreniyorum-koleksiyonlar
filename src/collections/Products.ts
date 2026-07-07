import { CollectionConfig } from 'payload'
import CustomRowLabel from '@/components/customRowLabel'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name', // liste görünümünde başlık olarak kullanılacak alan
    description: 'Ürün yönetimi için kapsamlı koleksiyon örneği',
    group: 'E-Ticaret',
    
  },
  versions: {
    drafts: true, // taslak modunu etkinleştir
  },
  fields: [
    // ----- TEMEL BİLGİLER -----
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true, // çok dilli destek
      validate: (value: any) => {
        if (!value) return 'Ürün adı zorunludur.'
        if (value.length < 3) return 'Ürün adı en az 3 karakter olmalı.'
        return true
      },
      admin: {
        description: 'Ürünün görünen adı',
        placeholder: 'Örn: Akıllı Telefon X',
        width: '50%',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'SEO dostu URL (benzersiz)',
        placeholder: 'akilli-telefon-x',
        width: '50%',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Detaylı ürün açıklaması',
      },
    },

    // ----- FİYAT & STOK -----
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Ürün fiyatı (TL)',
        step: 0.01,
        width: '33%',
      },
    },
    {
      name: 'compareAtPrice',
      type: 'number',
      min: 0,
      admin: {
        description: 'İndirimli fiyat (opsiyonel)',
        step: 0.01,
        width: '33%',
      },
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      min: 0,
      defaultValue: 0,
      admin: {
        description: 'Mevcut stok adedi',
        width: '33%',
      },
    },

    // ----- KATEGORİ & MARKA (İlişkisel) -----
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories', // varsayılan 'categories' koleksiyonu
      required: true,
      admin: {
        description: 'Ürünün bağlı olduğu kategori',
        width: '50%',
      },
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      admin: {
        description: 'Ürün markası',
        width: '50%',
      },
    },

    // ----- DURUM VE ÖZELLİKLER -----
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Taslak', value: 'draft' },
        { label: 'Yayında', value: 'published' },
        { label: 'Arşiv', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
        description: 'Ürün yayın durumu',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Öne çıkarılan ürün',
      },
    },

    // ----- RESİMLER (Upload) -----
    {
      name: 'images',
      type: 'array',
      label: 'Ürün Görselleri',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'altText',
          type: 'text',
          localized: true,
          admin: {
            description: 'SEO için alternatif metin',
          },
        },
        {
          name: 'isMain',
          type: 'checkbox',
          defaultValue: false,
          label: 'Ana görsel',
        },
      ],
      admin: {
        description: 'En fazla 5 görsel ekleyebilirsiniz',
        components: {
          RowLabel:'@/components/customRowLabel'
        },
      },
      validate: (value: any) => {
        if (value && value.length > 5) return 'En fazla 5 görsel eklenebilir.'
        return true
      },
    },

    // ----- ÖZELLİKLER (Group & Blocks) -----
    {
      name: 'specs',
      type: 'group',
      label: 'Teknik Özellikler',
      fields: [
        {
          name: 'weight',
          type: 'number',
          admin: {
            placeholder: 'gr cinsinden',
          },
        },
        {
          name: 'dimensions',
          type: 'group',
          fields: [
            { name: 'width', type: 'number' },
            { name: 'height', type: 'number' },
            { name: 'depth', type: 'number' },
          ],
        },
        {
          name: 'colorOptions',
          type: 'array',
          fields: [
            {
              name: 'color',
              type: 'text',
              required: true,
            },
            {
              name: 'hexCode',
              type: 'text',
            },
          ],
        },
      ],
    },

    // ----- DİNAMİK İÇERİK BLOKLARI (Blocks) -----
    {
      name: 'contentBlocks',
      type: 'blocks',
      label: 'Sayfa Blokları',
      blocks: [
        {
          slug: 'textBlock',
          admin:{
            //disableBlockName:true
          },
          fields: [
            { name: 'heading', type: 'text', localized: true },
            { name: 'content', type: 'richText', required: true, localized: true },
            { name: 'new', type: 'text', localized: true },
          ],
          
        },
        {
          slug: 'imageBlock',
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text', localized: true },
          ],
        },
        {
          slug: 'videoBlock',
          fields: [
            { name: 'videoUrl', type: 'text', required: true },
            { name: 'thumbnail', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },

    // ----- JSON VERİ (Esnek yapı) -----
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Ürün için ek meta veriler (JSON formatında)',
      },
    },

    // ----- TABS ile düzenli gruplama -----
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO Bilgileri',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              maxLength: 60,
              admin: {
                description: 'Başlık etiketi (60 karakter)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              maxLength: 160,
            },
            {
              name: 'keywords',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          label: 'Teslimat & Garanti',
          fields: [
            {
              name: 'deliveryInfo',
              type: 'richText',
              localized: true,
            },
            {
              name: 'warranty',
              type: 'group',
              fields: [
                { name: 'duration', type: 'number', label: 'Ay cinsinden' },
                { name: 'description', type: 'text', localized: true },
              ],
            },
          ],
        },
      ],
    },

    // ----- ROW ile yan yana alanlar -----
    {
      type: 'row',
      fields: [
        {
          name: 'sku',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            width: '50%',
            description: 'Benzersiz stok kodu',
          },
        },
        {
          name: 'barcode',
          type: 'text',
          admin: {
            width: '50%',
            description: 'Barkod numarası',
          },
        },
      ],
    },

    // ----- COLLAPSIBLE ile daraltılabilir bölüm -----
    {
      type: 'collapsible',
      label: ({ data }:{data:any}) => data?.name ? `Ek Bilgiler (${data.name})` : 'Ek Bilgiler',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'notes',
          type: 'textarea',
          admin: {
            description: 'İç notlar (sadece admin görür)',
          },
        },
        {
          name: 'internalTags',
          type: 'array',
          fields: [
            { name: 'tag', type: 'text' },
          ],
        },
      ],
    },

    // ----- TARİH ALANLARI (otomatik ve manuel) -----
    {
      name: 'availableFrom',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Ürünün satışa çıkacağı tarih',
        position: 'sidebar',
      },
    },
    {
      name: 'availableUntil',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Ürünün satıştan kalkacağı tarih',
        position: 'sidebar',
      },
    },
  ],

  // ----- HOOKS (Örnek amaçlı) -----
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        // Örneğin, stok 0 ise durumu 'archived' yapalım
        if (data.stock === 0 && data.status !== 'archived') {
          data.status = 'archived'
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc }) => {
        // Ürün değiştiğinde log atma veya harici servise bildirim
        console.log(`Ürün güncellendi: ${doc.name}`)
      },
    ],
  },
}