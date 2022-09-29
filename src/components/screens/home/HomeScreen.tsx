import React from 'react';
import { HeaderLayout } from '../../../layouts/HeaderLayout';
import { FeatureSection } from './FeatureSection';
import { HeroSection } from './HeroSection';

export const HomeScreen = () => {
  return (
    <HeaderLayout useContainer={false}>
      <HeroSection />
      <FeatureSection />
    </HeaderLayout>
  );
};
