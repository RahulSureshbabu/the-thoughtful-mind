import type { Locale } from './posts';

type StringKey =
	| 'nav.home'
	| 'nav.tags'
	| 'nav.about'
	| 'meta.minRead'
	| 'related.heading'
	| 'footer.adDisclosure'
	| 'home.tagline'
	| 'home.empty'
	| 'tags.empty'
	| 'tag.empty'
	| 'notFound.title'
	| 'notFound.body'
	| 'notFound.returnHome'
	| 'about.title'
	| 'about.body1'
	| 'about.body2'
	| 'languageBanner.switch'
	| 'languageBanner.dismiss'
	| 'languageBanner.available'
	| 'themeToggle.aria';

const STRINGS: Record<Locale, Record<StringKey, string>> = {
	pt: {
		'nav.home': 'Início',
		'nav.tags': 'Etiquetas',
		'nav.about': 'Sobre',
		'meta.minRead': '{n} min de leitura',
		'related.heading': 'Leituras relacionadas',
		'footer.adDisclosure': 'Este site apresenta anúncios para ajudar a mantê-lo gratuito.',
		'home.tagline': 'Reflexões sobre psicologia, escritas para serem lidas com calma.',
		'home.empty': 'Novos artigos estão a caminho — volte em breve.',
		'tags.empty': 'Ainda não há etiquetas.',
		'tag.empty': 'Ainda não há artigos com esta etiqueta.',
		'notFound.title': 'Página não encontrada',
		'notFound.body': "A página que procura não existe.",
		'notFound.returnHome': 'Voltar ao início',
		'about.title': 'Sobre',
		'about.body1':
			'O The Thoughtful Mind é um espaço para escrita cuidada e sem pressa sobre psicologia — como a mente funciona, porque sentimos o que sentimos, e o que a investigação diz de facto quando se retiram os títulos sensacionalistas.',
		'about.body2': 'Os artigos são escritos em português e traduzidos automaticamente para leitores de todo o mundo.',
		'languageBanner.switch': 'Mudar',
		'languageBanner.dismiss': 'Dispensar',
		'languageBanner.available': 'Este artigo também está disponível em {lang}.',
		'themeToggle.aria': 'Alternar modo escuro',
	},
	en: {
		'nav.home': 'Home',
		'nav.tags': 'Tags',
		'nav.about': 'About',
		'meta.minRead': '{n} min read',
		'related.heading': 'Related reading',
		'footer.adDisclosure': 'This site runs ads to help keep it free.',
		'home.tagline': 'Reflections on psychology, written to be read slowly.',
		'home.empty': 'New posts are on their way — check back soon.',
		'tags.empty': 'No tags yet.',
		'tag.empty': 'No posts with this tag yet.',
		'notFound.title': 'Page not found',
		'notFound.body': "The page you're looking for doesn't exist.",
		'notFound.returnHome': 'Return home',
		'about.title': 'About',
		'about.body1':
			'The Thoughtful Mind is a home for slow, careful writing about psychology — how the mind works, why we feel what we feel, and what the research actually says once the headlines are stripped away.',
		'about.body2': 'Posts are written in Portuguese and translated automatically for readers around the world.',
		'languageBanner.switch': 'Switch',
		'languageBanner.dismiss': 'Dismiss',
		'languageBanner.available': 'This post is also available in {lang}.',
		'themeToggle.aria': 'Toggle dark mode',
	},
	es: {
		'nav.home': 'Inicio',
		'nav.tags': 'Etiquetas',
		'nav.about': 'Acerca de',
		'meta.minRead': '{n} min de lectura',
		'related.heading': 'Lecturas relacionadas',
		'footer.adDisclosure': 'Este sitio muestra anuncios para ayudar a mantenerlo gratuito.',
		'home.tagline': 'Reflexiones sobre psicología, escritas para ser leídas con calma.',
		'home.empty': 'Nuevos artículos están en camino — vuelve pronto.',
		'tags.empty': 'Aún no hay etiquetas.',
		'tag.empty': 'Aún no hay artículos con esta etiqueta.',
		'notFound.title': 'Página no encontrada',
		'notFound.body': 'La página que buscas no existe.',
		'notFound.returnHome': 'Volver al inicio',
		'about.title': 'Acerca de',
		'about.body1':
			'The Thoughtful Mind es un espacio para escritura pausada y cuidada sobre psicología — cómo funciona la mente, por qué sentimos lo que sentimos, y lo que realmente dice la investigación una vez despojada de los titulares.',
		'about.body2': 'Los artículos se escriben en portugués y se traducen automáticamente para lectores de todo el mundo.',
		'languageBanner.switch': 'Cambiar',
		'languageBanner.dismiss': 'Descartar',
		'languageBanner.available': 'Este artículo también está disponible en {lang}.',
		'themeToggle.aria': 'Alternar modo oscuro',
	},
	fr: {
		'nav.home': 'Accueil',
		'nav.tags': 'Mots-clés',
		'nav.about': 'À propos',
		'meta.minRead': '{n} min de lecture',
		'related.heading': 'Lectures connexes',
		'footer.adDisclosure': 'Ce site affiche des publicités pour rester gratuit.',
		'home.tagline': "Réflexions sur la psychologie, écrites pour être lues lentement.",
		'home.empty': 'De nouveaux articles arrivent bientôt — revenez plus tard.',
		'tags.empty': 'Aucun mot-clé pour le moment.',
		'tag.empty': 'Aucun article avec ce mot-clé pour le moment.',
		'notFound.title': 'Page introuvable',
		'notFound.body': "La page que vous recherchez n'existe pas.",
		'notFound.returnHome': "Retour à l'accueil",
		'about.title': 'À propos',
		'about.body1':
			"The Thoughtful Mind est un espace d'écriture lente et soignée sur la psychologie — comment fonctionne l'esprit, pourquoi nous ressentons ce que nous ressentons, et ce que dit vraiment la recherche une fois les gros titres écartés.",
		'about.body2': 'Les articles sont écrits en portugais et traduits automatiquement pour les lecteurs du monde entier.',
		'languageBanner.switch': 'Changer',
		'languageBanner.dismiss': 'Ignorer',
		'languageBanner.available': 'Cet article est également disponible en {lang}.',
		'themeToggle.aria': 'Basculer le mode sombre',
	},
	de: {
		'nav.home': 'Startseite',
		'nav.tags': 'Schlagwörter',
		'nav.about': 'Über',
		'meta.minRead': '{n} Min. Lesezeit',
		'related.heading': 'Weitere Artikel',
		'footer.adDisclosure': 'Diese Website zeigt Werbung, um kostenlos zu bleiben.',
		'home.tagline': 'Gedanken zur Psychologie, zum langsamen Lesen geschrieben.',
		'home.empty': 'Neue Beiträge sind unterwegs — schauen Sie bald wieder vorbei.',
		'tags.empty': 'Noch keine Schlagwörter.',
		'tag.empty': 'Noch keine Beiträge mit diesem Schlagwort.',
		'notFound.title': 'Seite nicht gefunden',
		'notFound.body': 'Die gesuchte Seite existiert nicht.',
		'notFound.returnHome': 'Zurück zur Startseite',
		'about.title': 'Über',
		'about.body1':
			'The Thoughtful Mind ist ein Ort für langsames, sorgfältiges Schreiben über Psychologie — wie der Geist funktioniert, warum wir fühlen, was wir fühlen, und was die Forschung tatsächlich sagt, wenn man die Schlagzeilen beiseitelässt.',
		'about.body2': 'Beiträge werden auf Portugiesisch geschrieben und automatisch für Leser auf der ganzen Welt übersetzt.',
		'languageBanner.switch': 'Wechseln',
		'languageBanner.dismiss': 'Schließen',
		'languageBanner.available': 'Dieser Beitrag ist auch auf {lang} verfügbar.',
		'themeToggle.aria': 'Dunkelmodus umschalten',
	},
	hi: {
		'nav.home': 'होम',
		'nav.tags': 'टैग',
		'nav.about': 'परिचय',
		'meta.minRead': '{n} मिनट पढ़ने का समय',
		'related.heading': 'संबंधित लेख',
		'footer.adDisclosure': 'यह साइट मुफ़्त बने रहने में मदद के लिए विज्ञापन दिखाती है।',
		'home.tagline': 'मनोविज्ञान पर विचार, धीरे-धीरे पढ़े जाने के लिए लिखे गए।',
		'home.empty': 'नए लेख जल्द ही आ रहे हैं — फिर से देखें।',
		'tags.empty': 'अभी तक कोई टैग नहीं है।',
		'tag.empty': 'इस टैग के साथ अभी तक कोई लेख नहीं है।',
		'notFound.title': 'पृष्ठ नहीं मिला',
		'notFound.body': 'आप जिस पृष्ठ की तलाश कर रहे हैं वह मौजूद नहीं है।',
		'notFound.returnHome': 'होम पर लौटें',
		'about.title': 'परिचय',
		'about.body1':
			'The Thoughtful Mind मनोविज्ञान पर धीमी, सावधानीपूर्वक लिखी गई सामग्री का घर है — मन कैसे काम करता है, हम वही क्यों महसूस करते हैं जो महसूस करते हैं, और सुर्खियों को हटाने के बाद शोध वास्तव में क्या कहता है।',
		'about.body2': 'लेख पुर्तगाली में लिखे जाते हैं और दुनिया भर के पाठकों के लिए स्वचालित रूप से अनुवादित किए जाते हैं।',
		'languageBanner.switch': 'बदलें',
		'languageBanner.dismiss': 'हटाएं',
		'languageBanner.available': 'यह लेख {lang} में भी उपलब्ध है।',
		'themeToggle.aria': 'डार्क मोड टॉगल करें',
	},
	ja: {
		'nav.home': 'ホーム',
		'nav.tags': 'タグ',
		'nav.about': '概要',
		'meta.minRead': '読了時間 {n} 分',
		'related.heading': '関連記事',
		'footer.adDisclosure': 'このサイトは無料で運営するために広告を表示しています。',
		'home.tagline': '心理学についての考察。ゆっくり読むために書かれています。',
		'home.empty': '新しい記事は近日公開予定です。また後でご確認ください。',
		'tags.empty': 'まだタグがありません。',
		'tag.empty': 'このタグの記事はまだありません。',
		'notFound.title': 'ページが見つかりません',
		'notFound.body': 'お探しのページは存在しません。',
		'notFound.returnHome': 'ホームに戻る',
		'about.title': '概要',
		'about.body1':
			'The Thoughtful Mindは、心理学についてじっくりと丁寧に書かれた文章のための場所です——心はどのように働くのか、なぜ私たちはそのように感じるのか、そして見出しを取り除いたときに研究が実際に何を語っているのか。',
		'about.body2': '記事はポルトガル語で書かれ、世界中の読者のために自動的に翻訳されます。',
		'languageBanner.switch': '切り替える',
		'languageBanner.dismiss': '閉じる',
		'languageBanner.available': 'この記事は{lang}でもご覧いただけます。',
		'themeToggle.aria': 'ダークモードを切り替える',
	},
	ar: {
		'nav.home': 'الرئيسية',
		'nav.tags': 'الوسوم',
		'nav.about': 'حول',
		'meta.minRead': '{n} دقيقة قراءة',
		'related.heading': 'مقالات ذات صلة',
		'footer.adDisclosure': 'يعرض هذا الموقع إعلانات للمساعدة في إبقائه مجانيًا.',
		'home.tagline': 'تأملات في علم النفس، كُتبت لتُقرأ بتأنٍّ.',
		'home.empty': 'مقالات جديدة في الطريق — تفقد الموقع قريبًا.',
		'tags.empty': 'لا توجد وسوم بعد.',
		'tag.empty': 'لا توجد مقالات بهذا الوسم بعد.',
		'notFound.title': 'الصفحة غير موجودة',
		'notFound.body': 'الصفحة التي تبحث عنها غير موجودة.',
		'notFound.returnHome': 'العودة إلى الرئيسية',
		'about.title': 'حول',
		'about.body1':
			'The Thoughtful Mind هو مكان للكتابة المتأنية والدقيقة عن علم النفس — كيف يعمل العقل، ولماذا نشعر بما نشعر به، وما الذي تقوله الأبحاث فعليًا بعد إزالة العناوين المثيرة.',
		'about.body2': 'تُكتب المقالات باللغة البرتغالية وتُترجم تلقائيًا لقراء حول العالم.',
		'languageBanner.switch': 'تبديل',
		'languageBanner.dismiss': 'إغلاق',
		'languageBanner.available': 'هذا المقال متوفر أيضًا باللغة {lang}.',
		'themeToggle.aria': 'تبديل الوضع الداكن',
	},
};

export function t(locale: Locale, key: StringKey, vars?: Record<string, string | number>): string {
	let str = STRINGS[locale]?.[key] ?? STRINGS.pt[key];
	if (vars) {
		for (const [k, v] of Object.entries(vars)) {
			str = str.replace(`{${k}}`, String(v));
		}
	}
	return str;
}
