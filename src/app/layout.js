import './globals.css';
import Navbar from '@/components/Navbar';
import Body from '@/components/Body';
const APP_NAME = 'AnimePalooza';
const APP_DEFAULT_TITLE =
  'AnimePalooza-Your Ultimate Destination for Anime, Movies, TV Shows, Drama, Manga, and More';
const APP_TITLE_TEMPLATE = '%s - PWA App';
const APP_DESCRIPTION =
  'Welcome to AnimePalooza, your ultimate destination for streaming the latest and greatest anime, movies, TV shows, dramas, manga, and more. Dive into a world of endless entertainment with our vast collection of anime content. Join us and start your anime journey today!';
export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <Body>
      <Navbar />
      {children}
    </Body>
  );
}
