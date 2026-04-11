import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_OPERATOR_NAME,
  LEGAL_POLICY_EFFECTIVE,
  LEGAL_SERVICE_NAME,
} from './metadata';
import type { LegalSection } from './types';

export const PRIVACY_DOCUMENT_TITLE = 'Privacy Policy';

export function getPrivacySections(): LegalSection[] {
  const op = LEGAL_OPERATOR_NAME;
  const svc = LEGAL_SERVICE_NAME;
  const contact = LEGAL_CONTACT_EMAIL;

  return [
    {
      heading: 'Introduction',
      paragraphs: [
        `This Privacy Policy describes how ${op} ("we," "us," or "our") collects, uses, discloses, and protects information in connection with ${svc} (the "Service"). By using the Service, you agree to this policy. If you do not agree, do not use the Service.`,
        `This policy is effective as of ${LEGAL_POLICY_EFFECTIVE}. We may update it from time to time; the "effective" date above will change when we do, and we will take reasonable steps to notify you of material changes.`,
      ],
    },
    {
      heading: 'Information we collect',
      paragraphs: [
        'We collect information that you provide directly, information generated when you use the Service, and information from third parties as described below.',
      ],
      bullets: [
        'Account and profile data: name, email address, username, password (stored using secure hashing on our systems), profile photo, and preferences you set in the app.',
        'Content you create: boards, lists, cards, tasks, comments, attachments, messages, notifications, and other materials you submit or upload.',
        'Usage and device data: log and diagnostic data, approximate location derived from IP where applicable, device type, operating system, app version, crash reports, and interaction events.',
        'Communications: messages you send to us (e.g. support requests) and metadata associated with email or in-app notices.',
        'Authentication data: when you sign in with Google, Apple, or similar providers, we receive identifiers and profile information according to that provider’s disclosures and your settings.',
      ],
    },
    {
      heading: 'Artificial intelligence and automated processing',
      paragraphs: [
        `The Service includes features that use machine learning, large language models, and related automated systems (collectively, "AI Features") to help organize tasks, suggest titles or summaries, group or prioritize items, draft text from your instructions, and similar productivity functions.`,
        'To provide AI Features, we and our subprocessors may process content you submit or that appears in workspaces you access—including task titles, descriptions, comments, board structure, and related context you choose to include. Do not submit information you are not allowed to share or that you consider highly sensitive unless you accept the risks described here.',
        'Outputs from AI Features are generated automatically and may be inaccurate, incomplete, or unsuitable for your purpose. You remain responsible for reviewing and using outputs appropriately.',
        'Unless we tell you otherwise in writing for a specific product, we do not use your content to train or improve third-party foundation models for their general models. We may use aggregated or de-identified data, or data subject to your consent where required, to maintain, secure, debug, and improve our own Service (including fine-tuning or evaluating models we operate solely for the Service).',
        'We may engage vendors (e.g. cloud and AI infrastructure providers) to process data under contractual terms that restrict use to providing the Service.',
      ],
    },
    {
      heading: 'How we use information',
      bullets: [
        'To provide, operate, maintain, and improve the Service, including collaboration, sync, search, notifications, and AI Features.',
        'To authenticate you, prevent fraud and abuse, enforce our Terms of Service, and protect rights and safety.',
        'To communicate with you about the Service, security, and policy changes, and (where permitted) marketing.',
        'To comply with law, respond to lawful requests, and establish or defend legal claims.',
        'To analyze usage in aggregate or de-identified form to understand product performance.',
      ],
    },
    {
      heading: 'Legal bases (where applicable)',
      paragraphs: [
        'If the GDPR or similar laws apply, we rely on: performance of a contract (providing the Service); legitimate interests (security, improvement, and communications that are not overridden by your rights); consent where required (e.g. certain cookies or marketing); and legal obligation.',
      ],
    },
    {
      heading: 'Sharing and disclosure',
      paragraphs: [
        'We do not sell your personal information for money. We may share information as follows:',
      ],
      bullets: [
        'Service providers and subprocessors who assist us (hosting, databases, email delivery, analytics, AI inference, customer support) under confidentiality and processing terms.',
        'Other users and collaborators when you choose to share workspaces, boards, or content with them.',
        'In connection with a merger, acquisition, financing, or sale of assets, subject to appropriate safeguards.',
        'When required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of us, our users, or the public.',
        'With your direction or consent.',
      ],
    },
    {
      heading: 'Cookies and similar technologies (web)',
      paragraphs: [
        'On web, we and our partners may use cookies, local storage, and similar technologies for session management, preferences, security, and analytics. You can control some of these through browser settings; blocking required cookies may limit functionality.',
      ],
    },
    {
      heading: 'Retention',
      paragraphs: [
        'We retain information for as long as your account is active and as needed to provide the Service. We may retain certain records longer where required by law, for legitimate business purposes (e.g. backups, security logs), or until disputes are resolved. You may request deletion subject to exceptions described below.',
      ],
    },
    {
      heading: 'Security',
      paragraphs: [
        'We implement technical and organizational measures designed to protect information. No method of transmission or storage is completely secure; we cannot guarantee absolute security.',
      ],
    },
    {
      heading: 'Your rights and choices',
      paragraphs: [
        'Depending on your location, you may have rights to access, correct, delete, or export personal information; object to or restrict certain processing; withdraw consent where processing is consent-based; and lodge a complaint with a supervisory authority.',
        `To exercise rights, contact us at ${contact}. We may verify your request and may decline requests where permitted by law.`,
        'California residents may have additional rights under the CCPA/CPRA (e.g. to know, delete, and opt out of certain “sharing” for cross-context behavioral advertising, where applicable). We do not “sell” personal information as defined by those laws in the traditional sense; see “Sharing” above.',
      ],
    },
    {
      heading: 'International transfers',
      paragraphs: [
        'We may process and store information in the United States and other countries where we or our vendors operate. Those countries may have different data protection laws. Where required, we use appropriate safeguards (such as standard contractual clauses) for transfers.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'The Service is not directed to children under 13 (or the minimum age in your jurisdiction), and we do not knowingly collect personal information from them. If you believe we have, contact us and we will take steps to delete it.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `Questions about this Privacy Policy: ${contact}.`,
      ],
    },
  ];
}
