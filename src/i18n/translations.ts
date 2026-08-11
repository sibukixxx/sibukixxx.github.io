export const defaultLocale = 'ja' as const;
export const locales = ['ja', 'en', 'es', 'hi'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  es: 'Español',
  hi: 'हिन्दी',
};

export const translations: Record<Locale, Record<string, string>> = {
  ja: {
    // Nav
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    // Home page
    'home.recentPosts': '最新の記事',
    'home.viewAll': 'すべて見る →',
    'home.noPosts': 'まだ記事がありません。',
    'home.projects': 'プロジェクト',
    'home.noProjects': 'まだプロジェクトがありません。',

    // Blog page
    'blog.title': 'Blog',
    'blog.description': '技術的な学びや考えをまとめています',
    'blog.empty': 'まだ記事がありません。最初の記事を書いてみましょう！',

    // Projects page
    'projects.title': 'Projects',
    'projects.description': '個人プロジェクトやオープンソースへの貢献',
    'projects.empty': 'まだプロジェクトがありません。',

    // Table of Contents
    'toc.title': '目次',

    // Footer
    'footer.copyright': '© {year} sibukixxx. All Rights Reserved.',
    'footer.aiTraining':
      'このサイトのコンテンツは AI の学習に利用して構いません。',
    'footer.analytics':
      'このサイトは Google Analytics を使用しています。詳しくは',
    'footer.analyticsLink': 'Google のプライバシーポリシー',
    'footer.analyticsAfter': 'をご覧ください。',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.contact': 'Contact',

    'home.recentPosts': 'Recent Posts',
    'home.viewAll': 'View all →',
    'home.noPosts': 'No posts yet.',
    'home.projects': 'Projects',
    'home.noProjects': 'No projects yet.',

    'blog.title': 'Blog',
    'blog.description': 'Technical learnings and thoughts',
    'blog.empty': "No posts yet. Let's write the first one!",

    'projects.title': 'Projects',
    'projects.description': 'Personal projects and open source contributions',
    'projects.empty': 'No projects yet.',

    'toc.title': 'Table of Contents',

    'footer.copyright': '© {year} sibukixxx. All Rights Reserved.',
    'footer.aiTraining':
      'The content of this site may be used for AI training.',
    'footer.analytics': 'This site uses Google Analytics. See ',
    'footer.analyticsLink': "Google's Privacy Policy",
    'footer.analyticsAfter': ' for details.',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.blog': 'Blog',
    'nav.projects': 'Proyectos',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',

    'home.recentPosts': 'Publicaciones recientes',
    'home.viewAll': 'Ver todo →',
    'home.noPosts': 'Aún no hay publicaciones.',
    'home.projects': 'Proyectos',
    'home.noProjects': 'Aún no hay proyectos.',

    'blog.title': 'Blog',
    'blog.description': 'Aprendizajes técnicos y reflexiones',
    'blog.empty': '¡Aún no hay publicaciones. Escribe la primera!',

    'projects.title': 'Proyectos',
    'projects.description':
      'Proyectos personales y contribuciones de código abierto',
    'projects.empty': 'Aún no hay proyectos.',

    'toc.title': 'Tabla de contenidos',

    'footer.copyright': '© {year} sibukixxx. Todos los derechos reservados.',
    'footer.aiTraining':
      'El contenido de este sitio puede utilizarse para el entrenamiento de IA.',
    'footer.analytics': 'Este sitio utiliza Google Analytics. Consulte ',
    'footer.analyticsLink': 'la Política de Privacidad de Google',
    'footer.analyticsAfter': ' para más detalles.',
  },
  hi: {
    'nav.home': 'होम',
    'nav.blog': 'ब्लॉग',
    'nav.projects': 'प्रोजेक्ट्स',
    'nav.about': 'परिचय',
    'nav.contact': 'संपर्क',

    'home.recentPosts': 'हाल के लेख',
    'home.viewAll': 'सभी देखें →',
    'home.noPosts': 'अभी तक कोई लेख नहीं है।',
    'home.projects': 'प्रोजेक्ट्स',
    'home.noProjects': 'अभी तक कोई प्रोजेक्ट नहीं है।',

    'blog.title': 'ब्लॉग',
    'blog.description': 'तकनीकी सीख और विचार',
    'blog.empty': 'अभी तक कोई लेख नहीं है। पहला लिखें!',

    'projects.title': 'प्रोजेक्ट्स',
    'projects.description': 'व्यक्तिगत प्रोजेक्ट और ओपन सोर्स योगदान',
    'projects.empty': 'अभी तक कोई प्रोजेक्ट नहीं है।',

    'toc.title': 'विषय-सूची',

    'footer.copyright': '© {year} sibukixxx. सर्वाधिकार सुरक्षित।',
    'footer.aiTraining':
      'इस साइट की सामग्री का उपयोग AI प्रशिक्षण के लिए किया जा सकता है।',
    'footer.analytics': 'यह साइट Google Analytics का उपयोग करती है। ',
    'footer.analyticsLink': 'Google की गोपनीयता नीति',
    'footer.analyticsAfter': ' देखें।',
  },
};
