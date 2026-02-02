import { HeroSlider } from '../components/HeroSlider';
import { TrustFeatures } from '../components/TrustFeatures';
import { ShopByMenu } from '../components/ShopByMenu';
import { ValentineSection } from '../components/ValentineSection';
import { GiftFinder } from '../components/GiftFinder';
import { BestSellers } from '../components/BestSellers';
import { BrowseCategory } from '../components/BrowseCategory';
import { ShopByCelebration } from '../components/ShopByCelebration';

export const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <TrustFeatures />
      <ShopByMenu />
      <ValentineSection />
      <GiftFinder />
      <BestSellers />
      <BrowseCategory />
      <ShopByCelebration />
    </>
  );
};
