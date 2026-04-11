import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_OPERATOR_NAME,
  LEGAL_POLICY_EFFECTIVE,
  LEGAL_SERVICE_NAME,
} from './metadata';
import type { LegalSection } from './types';

export const TERMS_DOCUMENT_TITLE = 'Terms of Service';

export function getTermsSections(): LegalSection[] {
  const op = LEGAL_OPERATOR_NAME;
  const svc = LEGAL_SERVICE_NAME;
  const contact = LEGAL_CONTACT_EMAIL;

  return [
    {
      heading: 'Agreement',
      paragraphs: [
        `These Terms of Service ("Terms") govern your access to and use of ${svc} (the "Service") provided by ${op} ("we," "us," or "our"). By creating an account, clicking to accept, or using the Service, you agree to these Terms and our Privacy Policy.`,
        `If you use the Service on behalf of an organization, you represent that you have authority to bind that organization, and "you" includes that organization.`,
        `These Terms are effective as of ${LEGAL_POLICY_EFFECTIVE}. We may modify them; continued use after changes become effective constitutes acceptance of the revised Terms.`,
      ],
    },
    {
      heading: 'Eligibility and accounts',
      bullets: [
        'You must be able to form a binding contract in your jurisdiction and meet any minimum age we require.',
        'You are responsible for safeguarding your credentials and for all activity under your account.',
        'Provide accurate information and keep it updated. We may suspend or terminate accounts that violate these Terms or pose risk to the Service or others.',
      ],
    },
    {
      heading: 'The Service',
      paragraphs: [
        `${svc} provides collaborative boards, lists, cards, tasks, notifications, and related productivity features, including optional tools that use artificial intelligence (including large language models) to help organize, summarize, prioritize, draft, or structure your work based on content and instructions you provide.`,
        'We may change, suspend, or discontinue features; we will try to give reasonable notice for material adverse changes where practicable.',
      ],
    },
    {
      heading: 'AI-assisted features',
      paragraphs: [
        'AI Features produce automated suggestions and outputs. They are not human-reviewed by default and may be wrong, biased, incomplete, or unsuitable for your situation.',
        'AI Features are not legal, medical, financial, or other professional advice. You are solely responsible for evaluating outputs before relying on them, especially for high-stakes decisions.',
        'You must not use AI Features to generate unlawful content, to harass others, to mislead, or to process personal data you are not permitted to submit.',
        'We may use vendors, models, and infrastructure to deliver AI Features. Processing is described in our Privacy Policy.',
      ],
    },
    {
      heading: 'Your content',
      paragraphs: [
        'You retain ownership of content you submit. You grant us a worldwide, non-exclusive license to host, store, reproduce, modify (e.g. format or display), distribute, and otherwise use your content solely to operate, improve, secure, and promote the Service—including running AI Features you invoke.',
        'You represent that you have all rights necessary to grant the above license and that your content does not violate law or third-party rights.',
        'We may remove content or accounts that violate these Terms or that we are required to remove.',
      ],
    },
    {
      heading: 'Acceptable use',
      bullets: [
        'No illegal activity, exploitation of minors, malware, or attempts to disrupt or gain unauthorized access to the Service or others’ data.',
        'No scraping, automated access, or bulk extraction except via documented APIs we provide and permit.',
        'No infringement of intellectual property, privacy, or publicity rights.',
        'No sending spam, phishing, or deceptive communications through the Service.',
        'No reverse engineering except where applicable law forbids this restriction.',
      ],
    },
    {
      heading: 'Third-party services',
      paragraphs: [
        'The Service may integrate with third parties (e.g. Google or Apple sign-in). Their terms and privacy policies govern those services. We are not responsible for third-party services.',
      ],
    },
    {
      heading: 'Fees',
      paragraphs: [
        'Some features may be free or paid in the future. If we charge fees, we will present terms before you incur charges.',
      ],
    },
    {
      heading: 'Disclaimer of warranties',
      paragraphs: [
        'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE OR AI OUTPUTS WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL WE OR OUR AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES, ARISING OUT OF OR RELATED TO THE SERVICE OR THESE TERMS, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.',
        'TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE OR THESE TERMS WILL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID US FOR THE SERVICE IN THE TWELVE (12) MONTHS BEFORE THE CLAIM OR (B) ONE HUNDRED U.S. DOLLARS (US$100).',
        'Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the fullest extent permitted by law.',
      ],
    },
    {
      heading: 'Indemnity',
      paragraphs: [
        'You will defend, indemnify, and hold harmless us and our affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys’ fees) arising out of your content, your use of the Service, or your violation of these Terms or law.',
      ],
    },
    {
      heading: 'Termination',
      paragraphs: [
        'You may stop using the Service at any time. We may suspend or terminate access for breach of these Terms, risk, or legal reasons. Provisions that by their nature should survive (including intellectual property, disclaimers, limitation of liability, indemnity, and dispute terms) will survive termination.',
      ],
    },
    {
      heading: 'Governing law and disputes',
      paragraphs: [
        'These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict-of-law rules. You and we consent to the exclusive jurisdiction and venue of the state and federal courts located in Delaware for disputes not subject to arbitration (if any), except that we may seek injunctive relief in any court of competent jurisdiction.',
        'If you are a consumer in a jurisdiction that gives you mandatory local rights, those rights apply to the extent required.',
      ],
    },
    {
      heading: 'General',
      bullets: [
        'These Terms, together with the Privacy Policy and any additional terms we present for specific features, are the entire agreement regarding the Service.',
        'If a provision is unenforceable, the remaining provisions remain in effect.',
        'Our failure to enforce a provision is not a waiver.',
        'You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition, or sale of assets.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `Questions about these Terms: ${contact}.`,
      ],
    },
  ];
}
