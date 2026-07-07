'use client'
import React from 'react';
import { useRowLabel } from '@payloadcms/ui';

// Ürün görseli array satırı için tip
interface ImageRowData {
  image?: any; // upload alanı, detaylandırabilirsiniz
  altText?: string;
  isMain?: boolean;
}

const CustomRowLabel: React.FC = () => {
  const { data, rowNumber } = useRowLabel<ImageRowData>();
  if (data?.altText) {
    return (<span>{data.altText}</span>)  
  }else{
    return (<span>{`Görsel ${rowNumber && rowNumber + 1}`}</span>)
  }
};

export default CustomRowLabel;