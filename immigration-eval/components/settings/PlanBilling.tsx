'use client';
/**
 * PlanBilling — Pricing cards for subscription tiers
 * All buttons disabled with "Coming Soon" state
 */
import { useAppStore } from '@/lib/store';
import { Crown, Check, Sparkles } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  popular: boolean;
  features: PlanFeature[];
}

const PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 49,
    period: 'month',
    description: 'For individual evaluators getting started',
    popular: false,
    features: [
      { text: '10 evaluations per month', included: true },
      { text: '1 evaluator seat', included: true },
      { text: 'Basic templates', included: true },
      { text: 'PDF & DOCX export', included: true },
      { text: 'Email support', included: true },
      { text: 'AI assistant', included: false },
      { text: 'Custom templates', included: false },
      { text: 'API access', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 99,
    period: 'month',
    description: 'For established clinical practices',
    popular: true,
    features: [
      { text: '30 evaluations per month', included: true },
      { text: '1 evaluator seat', included: true },
      { text: 'All templates', included: true },
      { text: 'PDF & DOCX export', included: true },
      { text: 'AI clinical assistant', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom snippets', included: true },
      { text: 'API access', included: false },
    ],
  },
  {
    id: 'practice',
    name: 'Practice',
    price: 199,
    period: 'month',
    description: 'For multi-evaluator clinical practices',
    popular: false,
    features: [
      { text: 'Unlimited evaluations', included: true },
      { text: '5 evaluator seats', included: true },
      { text: 'Custom templates', included: true },
      { text: 'PDF & DOCX export', included: true },
      { text: 'AI clinical assistant', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'White-label reports', included: true },
    ],
  },
];

export default function PlanBilling() {
  const { evaluations } = useAppStore();
  const evalsThisMonth = evaluations.filter(e => {
    const created = new Date(e.createdAt);
    const now = new Date();
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="card" style={{ padding: 28, marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <Crown size={18} color="var(--gold)" />
        <h2 className="heading-lg" style={{ fontSize: 20 }}>Current Plan</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <span
          className="status-pill"
          style={{
            color: 'var(--gold)',
            background: 'var(--gold-lighter)',
            fontSize: 12,
            fontWeight: 700,
            padding: '5px 14px',
          }}
        >
          Professional
        </span>
        <span className="text-secondary" style={{ fontSize: 13 }}>
          {evalsThisMonth} evaluation{evalsThisMonth !== 1 ? 's' : ''} this month
        </span>
      </div>

      {/* Pricing Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: 16,
      }}>
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className={plan.popular ? 'card-highlight' : ''}
            style={{
              padding: 24,
              borderRadius: 16,
              border: plan.popular
                ? '2px solid var(--forest-light)'
                : '1.5px solid var(--border-light)',
              background: plan.popular
                ? 'linear-gradient(135deg, rgba(45,90,69,0.03), rgba(168,196,180,0.06))'
                : 'var(--white)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: -1,
                right: 20,
                background: 'var(--forest)',
                color: 'var(--white)',
                fontSize: 10,
                fontWeight: 700,
                padding: '4px 12px',
                borderRadius: '0 0 8px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                <Sparkles size={10} /> Most Popular
              </div>
            )}

            {/* Plan Name & Price */}
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--charcoal)',
              marginBottom: 4,
              marginTop: plan.popular ? 12 : 0,
            }}>
              {plan.name}
            </h3>
            <p className="text-muted" style={{ marginBottom: 14, fontSize: 12 }}>
              {plan.description}
            </p>
            <div style={{ marginBottom: 16 }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 32,
                fontWeight: 700,
                color: 'var(--charcoal)',
              }}>
                ${plan.price}
              </span>
              <span className="text-muted" style={{ fontSize: 13 }}>
                /{plan.period}
              </span>
            </div>

            {/* Features */}
            <div style={{ flex: 1, marginBottom: 16 }}>
              {plan.features.map((feature, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '5px 0',
                    fontSize: 12,
                    color: feature.included ? 'var(--charcoal)' : 'var(--charcoal-muted)',
                  }}
                >
                  <Check
                    size={14}
                    color={feature.included ? 'var(--teal)' : 'var(--charcoal-muted)'}
                    style={{ opacity: feature.included ? 1 : 0.3, flexShrink: 0 }}
                  />
                  <span style={{
                    textDecoration: feature.included ? 'none' : 'line-through',
                    opacity: feature.included ? 1 : 0.5,
                  }}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              className={plan.popular ? 'btn-gold' : 'btn-secondary'}
              disabled
              style={{
                width: '100%',
                justifyContent: 'center',
                opacity: 0.6,
                cursor: 'not-allowed',
              }}
              aria-label={`${plan.name} plan - Coming soon`}
            >
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
