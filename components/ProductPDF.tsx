// NOTE: This file is intentionally NOT a 'use client' module.
// It is imported lazily via dynamic import() inside ExportButton to avoid SSR.
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import type { Product, Channel } from '@/types/product';

// ─── Colours ──────────────────────────────────────────────────────────────────
const NAVY  = '#1C2B4A';
const AMBER = '#C4973A';
const LIGHT = '#F5F7FA';
const GRAY  = '#6B7280';
const RULE  = '#E5E7EB';

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    paddingBottom: 52,
  },

  // Header
  header: {
    backgroundColor: NAVY,
    paddingHorizontal: 32,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBrand: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.5,
  },
  headerSub: {
    color: '#A0B0CC',
    fontSize: 8,
    marginTop: 2,
  },
  headerBadge: {
    backgroundColor: AMBER,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.8,
  },

  // Photo
  photoContainer: {
    height: 220,
    backgroundColor: LIGHT,
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    color: '#D1D5DB',
    fontSize: 9,
    fontFamily: 'Helvetica',
  },

  // Body
  body: {
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  // Title section
  categoryLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  categoryText: {
    color: AMBER,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  categoryDot: {
    color: '#D1D5DB',
    fontSize: 8,
  },
  subCategoryText: {
    color: GRAY,
    fontSize: 8,
  },
  productName: {
    color: NAVY,
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.2,
    marginBottom: 10,
  },

  // Amber rule
  amberRule: {
    height: 3,
    backgroundColor: AMBER,
    width: 48,
    marginBottom: 14,
    borderRadius: 2,
  },

  // Channels
  channelRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 18,
    flexWrap: 'wrap',
  },
  channelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },

  // Specs table
  sectionLabel: {
    color: GRAY,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  specTable: {
    borderWidth: 1,
    borderColor: RULE,
    borderRadius: 4,
    marginBottom: 18,
    overflow: 'hidden',
  },
  specRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: RULE,
  },
  specRowLast: {
    flexDirection: 'row',
  },
  specRowAlt: {
    backgroundColor: LIGHT,
  },
  specLabel: {
    width: 110,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: GRAY,
    fontSize: 8,
    fontFamily: 'Helvetica',
    borderRightWidth: 1,
    borderRightColor: RULE,
  },
  specValue: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: NAVY,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
  },

  // Certs
  certRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  certBadge: {
    borderWidth: 1,
    borderColor: NAVY,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  certText: {
    color: NAVY,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },

  // Text sections
  descriptionText: {
    color: '#374151',
    fontSize: 8.5,
    lineHeight: 1.6,
    marginBottom: 16,
  },

  // Two-column layout for desc + applications
  twoCol: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  col: {
    flex: 1,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: RULE,
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: '#9CA3AF',
    fontSize: 7,
  },
  footerBrand: {
    color: NAVY,
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
  },
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
const CHANNEL_STYLES: Record<Channel, { bg: string; color: string }> = {
  'Retail':        { bg: '#DBEAFE', color: '#1E40AF' },
  'Export':        { bg: '#DCFCE7', color: '#166534' },
  'Foodservice':   { bg: '#FEF3C7', color: '#92400E' },
  'Food Industry': { bg: '#EDE9FE', color: '#5B21B6' },
};

// ─── Single product page ──────────────────────────────────────────────────────
function ProductLeaflet({ product, index, total }: { product: Product; index: number; total: number }) {
  const channels: Channel[] = [];
  if (product.retail)       channels.push('Retail');
  if (product.export)       channels.push('Export');
  if (product.foodservice)  channels.push('Foodservice');
  if (product.foodIndustry) channels.push('Food Industry');

  const photoUrl = product.photo?.[0]?.url;

  const specs: { label: string; value: string }[] = [
    { label: 'Brand',            value: product.brand },
    { label: 'Cheese Type',      value: product.cheeseType },
    { label: 'Age / Ripening',   value: product.ageRipening },
    { label: 'Formats / Weights',value: product.formatsWeights },
    { label: 'Packaging',        value: product.packagingType },
    { label: 'Shelf Life',       value: product.shelfLife },
  ].filter((s) => s.value);

  const hasDesc  = Boolean(product.descriptionEN);
  const hasApps  = Boolean(product.applications);
  const hasCerts = product.certifications.length > 0;

  return (
    <Page size="A4" style={s.page}>
      {/* Header */}
      <View style={s.header}>
        <View>
          <Text style={s.headerBrand}>Royal A-ware</Text>
          <Text style={s.headerSub}>Product Catalog</Text>
        </View>
        <View style={s.headerBadge}>
          <Text style={s.headerBadgeText}>DAIRY EXCELLENCE</Text>
        </View>
      </View>

      {/* Photo */}
      <View style={s.photoContainer}>
        {photoUrl ? (
          <Image src={photoUrl} style={s.photo} />
        ) : (
          <View style={s.photoPlaceholder}>
            <Text style={s.photoPlaceholderText}>No photo available</Text>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={s.body}>
        {/* Category breadcrumb */}
        <View style={s.categoryLine}>
          {product.productCategory ? (
            <Text style={s.categoryText}>{product.productCategory}</Text>
          ) : null}
          {product.productCategory && product.subCategory ? (
            <Text style={s.categoryDot}>·</Text>
          ) : null}
          {product.subCategory ? (
            <Text style={s.subCategoryText}>{product.subCategory}</Text>
          ) : null}
        </View>

        {/* Name */}
        <Text style={s.productName}>{product.name}</Text>
        <View style={s.amberRule} />

        {/* Channel badges */}
        {channels.length > 0 && (
          <View style={s.channelRow}>
            {channels.map((ch) => (
              <View key={ch} style={[s.channelBadge, { backgroundColor: CHANNEL_STYLES[ch].bg }]}>
                <Text style={{ color: CHANNEL_STYLES[ch].color, fontSize: 7, fontFamily: 'Helvetica-Bold' }}>
                  {ch}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Specs */}
        {specs.length > 0 && (
          <>
            <Text style={s.sectionLabel}>Specifications</Text>
            <View style={s.specTable}>
              {specs.map(({ label, value }, i) => (
                <View
                  key={label}
                  style={[
                    i === specs.length - 1 ? s.specRowLast : s.specRow,
                    i % 2 === 1 ? s.specRowAlt : {},
                  ]}
                >
                  <Text style={s.specLabel}>{label}</Text>
                  <Text style={s.specValue}>{value}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Certifications */}
        {hasCerts && (
          <>
            <Text style={s.sectionLabel}>Certifications</Text>
            <View style={s.certRow}>
              {product.certifications.map((cert) => (
                <View key={cert} style={s.certBadge}>
                  <Text style={s.certText}>{cert}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Description + Applications side-by-side if both exist */}
        {hasDesc && hasApps ? (
          <View style={s.twoCol}>
            <View style={s.col}>
              <Text style={s.sectionLabel}>Description</Text>
              <Text style={s.descriptionText}>{product.descriptionEN}</Text>
            </View>
            <View style={s.col}>
              <Text style={s.sectionLabel}>Applications</Text>
              <Text style={s.descriptionText}>{product.applications}</Text>
            </View>
          </View>
        ) : (
          <>
            {hasDesc && (
              <>
                <Text style={s.sectionLabel}>Description</Text>
                <Text style={s.descriptionText}>{product.descriptionEN}</Text>
              </>
            )}
            {hasApps && (
              <>
                <Text style={s.sectionLabel}>Applications</Text>
                <Text style={s.descriptionText}>{product.applications}</Text>
              </>
            )}
          </>
        )}
      </View>

      {/* Footer */}
      <View style={s.footer} fixed>
        <Text style={s.footerBrand}>Royal A-ware</Text>
        <Text style={s.footerText}>royalaware.com</Text>
        <Text style={s.footerText}>
          {index + 1} / {total}
        </Text>
      </View>
    </Page>
  );
}

// ─── Document ─────────────────────────────────────────────────────────────────
export function ProductCatalogPDF({ products }: { products: Product[] }) {
  return (
    <Document
      title="Royal A-ware Product Selection"
      author="Royal A-ware"
      subject="Product Catalog"
    >
      {products.map((product, i) => (
        <ProductLeaflet key={product.id} product={product} index={i} total={products.length} />
      ))}
    </Document>
  );
}
