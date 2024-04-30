import { Footer } from '../components/Footer';

export default {
  title: 'Footer',
  component: Footer,
  tags: ['autodocs'],
};

export const IndonesiaFooter = {
  args: {
    footerContent: 'dibuat oleh David Pinarto',
    type: 'whiteInBlack',
  },
};

export const EnglishFooter = {
  args: {
    footerContent: 'created by David Pinarto',
    type: 'blackInWhite',
  },
};
