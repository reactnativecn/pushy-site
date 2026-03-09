import { useEffect, useState } from 'react';

const GEO_ENDPOINT = 'https://api.country.is/';
const DISMISS_KEY = 'pushy-global-service-notice-dismissed-v1';
const GLOBAL_SERVICE_URL = 'https://cresc.dev';

type SupportedLocale =
  | 'de'
  | 'en'
  | 'es'
  | 'fr'
  | 'ja'
  | 'ko'
  | 'pt'
  | 'ru'
  | 'zh-Hans'
  | 'zh-Hant';

type NoticeCopy = {
  title: string;
  description: string;
  action: string;
  dismiss: string;
};

const NOTICE_COPY: Record<SupportedLocale, NoticeCopy> = {
  de: {
    title: 'Greifen Sie außerhalb des chinesischen Festlands zu?',
    description:
      'Sie können zu cresc.dev wechseln und Cresc nutzen, den globalen Dienst, der getrennt von Pushy mit eigener Infrastruktur und eigenem Datenstandort betrieben wird.',
    action: 'Zu cresc.dev',
    dismiss: 'Bei Pushy bleiben',
  },
  en: {
    title: 'Outside mainland China?',
    description:
      'You can switch to cresc.dev for Cresc, the global service operated separately from Pushy with its own infrastructure and data location.',
    action: 'Go to cresc.dev',
    dismiss: 'Stay on Pushy',
  },
  es: {
    title: 'Estas fuera de China continental?',
    description:
      'Puedes ir a cresc.dev para usar Cresc, el servicio global operado por separado de Pushy con su propia infraestructura y ubicacion de datos.',
    action: 'Ir a cresc.dev',
    dismiss: 'Seguir en Pushy',
  },
  fr: {
    title: 'Vous etes en dehors de la Chine continentale ?',
    description:
      'Vous pouvez passer sur cresc.dev pour utiliser Cresc, le service mondial exploite separement de Pushy avec sa propre infrastructure et son propre stockage des donnees.',
    action: 'Aller sur cresc.dev',
    dismiss: 'Rester sur Pushy',
  },
  ja: {
    title: '中国本土以外からアクセスしていますか？',
    description:
      'cresc.dev に移動すると、Pushy とは別会社・別基盤で運営されるグローバル向けの Cresc サービスを利用できます。',
    action: 'cresc.dev へ移動',
    dismiss: 'Pushy を続ける',
  },
  ko: {
    title: '중국 본토 외 지역에서 접속 중이신가요?',
    description:
      'cresc.dev에서 Pushy와 별도 법인, 별도 인프라로 운영되는 글로벌 서비스 Cresc를 이용할 수 있습니다.',
    action: 'cresc.dev로 이동',
    dismiss: 'Pushy 계속 보기',
  },
  pt: {
    title: 'Voce esta fora da China continental?',
    description:
      'Voce pode ir para cresc.dev e usar o Cresc, o servico global operado separadamente do Pushy com sua propria infraestrutura e localizacao de dados.',
    action: 'Ir para cresc.dev',
    dismiss: 'Continuar no Pushy',
  },
  ru: {
    title: 'Вы находитесь за пределами материкового Китая?',
    description:
      'Вы можете перейти на cresc.dev и использовать Cresc, глобальный сервис с отдельной от Pushy компанией, инфраструктурой и размещением данных.',
    action: 'Перейти на cresc.dev',
    dismiss: 'Остаться на Pushy',
  },
  'zh-Hans': {
    title: '检测到你当前位于中国大陆以外地区',
    description:
      '你可以前往 cresc.dev，使用面向全球的 Cresc 服务。Cresc 与 Pushy 由不同公司实体独立运营，服务器与数据存放位置也彼此独立。',
    action: '前往 cresc.dev',
    dismiss: '继续浏览 Pushy',
  },
  'zh-Hant': {
    title: '檢測到你目前位於中國大陸以外地區',
    description:
      '你可以前往 cresc.dev，使用面向全球的 Cresc 服務。Cresc 與 Pushy 由不同公司實體獨立營運，伺服器與資料存放位置也彼此獨立。',
    action: '前往 cresc.dev',
    dismiss: '繼續瀏覽 Pushy',
  },
};

function resolveLocale(): SupportedLocale {
  const locales =
    typeof navigator !== 'undefined'
      ? navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
      : [];

  for (const rawLocale of locales) {
    const locale = rawLocale.toLowerCase();
    if (locale.startsWith('zh')) {
      if (
        locale.includes('hant') ||
        locale.includes('tw') ||
        locale.includes('hk') ||
        locale.includes('mo')
      ) {
        return 'zh-Hant';
      }
      return 'zh-Hans';
    }
    if (locale.startsWith('ja')) {
      return 'ja';
    }
    if (locale.startsWith('ko')) {
      return 'ko';
    }
    if (locale.startsWith('fr')) {
      return 'fr';
    }
    if (locale.startsWith('de')) {
      return 'de';
    }
    if (locale.startsWith('es')) {
      return 'es';
    }
    if (locale.startsWith('pt')) {
      return 'pt';
    }
    if (locale.startsWith('ru')) {
      return 'ru';
    }
  }

  return 'en';
}

function isDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_KEY) === '1';
  } catch {
    return false;
  }
}

function persistDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, '1');
  } catch {}
}

export default function GlobalServiceNotice() {
  const [copy, setCopy] = useState<NoticeCopy>(NOTICE_COPY.en);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setCopy(NOTICE_COPY[resolveLocale()]);

    if (isDismissed()) {
      return;
    }

    let active = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4000);

    const checkRegion = async () => {
      try {
        const response = await fetch(GEO_ENDPOINT, {
          cache: 'no-store',
          headers: {
            accept: 'application/json',
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { country?: string };
        if (active && data.country?.toUpperCase() && data.country.toUpperCase() !== 'CN') {
          setVisible(true);
        }
      } catch {
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    void checkRegion();

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!visible) {
    return null;
  }

  const handleDismiss = () => {
    persistDismissed();
    setVisible(false);
  };

  return (
    <aside
      aria-live="polite"
      className="pushy-global-service-notice"
      role="status"
    >
      <div className="pushy-global-service-notice__body">
        <p className="pushy-global-service-notice__title">{copy.title}</p>
        <p className="pushy-global-service-notice__description">{copy.description}</p>
      </div>
      <div className="pushy-global-service-notice__actions">
        <a
          className="pushy-global-service-notice__primary"
          href={GLOBAL_SERVICE_URL}
          onClick={handleDismiss}
        >
          {copy.action}
        </a>
        <button
          className="pushy-global-service-notice__secondary"
          onClick={handleDismiss}
          type="button"
        >
          {copy.dismiss}
        </button>
      </div>
    </aside>
  );
}
