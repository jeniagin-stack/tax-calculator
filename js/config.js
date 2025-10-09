document.addEventListener("DOMContentLoaded", () => {
  // TAX_CONFIG 2020–2025 — נתונים מעודכנים, אחידים לכל השנים
  const TAX_CONFIG = {
    "2020": {
      employee: {
        CREDIT_VALUE: 219,
        TAX_BRACKETS: [
          { min: 0, max: 6330, rate: 0.10 },
          { min: 6331, max: 9080, rate: 0.14 },
          { min: 9081, max: 14580, rate: 0.20 },
          { min: 14581, max: 20260, rate: 0.31 },
          { min: 20261, max: 42160, rate: 0.35 },
          { min: 42161, max: 54300, rate: 0.47 },
          { min: 54301, max: Infinity, rate: 0.50 }
        ],
        SOCIAL_BRACKETS: [
          { min: 0, max: 6330, rate: 0.004 },
          { min: 6331, max: 44020, rate: 0.07 }
        ],
        HEALTH_BRACKETS: [
          { min: 0, max: 6330, rate: 0.031 },
          { min: 6331, max: 44020, rate: 0.05 }
        ],
        PENSION_RATE: 0.06,
        PENSION_MAX_CREDIT_MONTHLY: 600
      }
    },
    "2021": {
      employee: {
        CREDIT_VALUE: 224,
        TAX_BRACKETS: [
          { min: 0, max: 6290, rate: 0.10 },
          { min: 6291, max: 9030, rate: 0.14 },
          { min: 9031, max: 14490, rate: 0.20 },
          { min: 14491, max: 20140, rate: 0.31 },
          { min: 20141, max: 41910, rate: 0.35 },
          { min: 41911, max: 53970, rate: 0.47 },
          { min: 53971, max: Infinity, rate: 0.50 }
        ],
        SOCIAL_BRACKETS: [
          { min: 0, max: 6330, rate: 0.004 },
          { min: 6331, max: 44020, rate: 0.07 }
        ],
        HEALTH_BRACKETS: [
          { min: 0, max: 6330, rate: 0.031 },
          { min: 6331, max: 44020, rate: 0.0517 }
        ],
        PENSION_RATE: 0.06,
        PENSION_MAX_CREDIT_MONTHLY: 650
      }
    },
    "2022": {
      employee: {
        CREDIT_VALUE: 232,
        TAX_BRACKETS: [
          { min: 0, max: 6450, rate: 0.10 },
          { min: 6451, max: 9240, rate: 0.14 },
          { min: 9241, max: 14840, rate: 0.20 },
          { min: 14841, max: 20620, rate: 0.31 },
          { min: 20621, max: 42910, rate: 0.35 },
          { min: 42911, max: 55270, rate: 0.47 },
          { min: 55271, max: Infinity, rate: 0.50 }
        ],
        SOCIAL_BRACKETS: [
          { min: 0, max: 7000, rate: 0.004 },
          { min: 7001, max: 50000, rate: 0.07 }
        ],
        HEALTH_BRACKETS: [
          { min: 0, max: 7000, rate: 0.031 },
          { min: 7001, max: 50000, rate: 0.0517 }
        ],
        PENSION_RATE: 0.06,
        PENSION_MAX_CREDIT_MONTHLY: 700
      }
    },
    "2023": {
      employee: {
        CREDIT_VALUE: 236,
        TAX_BRACKETS: [
          { min: 0, max: 6790, rate: 0.10 },
          { min: 6791, max: 9730, rate: 0.14 },
          { min: 9731, max: 15620, rate: 0.20 },
          { min: 15621, max: 21710, rate: 0.31 },
          { min: 21711, max: 45180, rate: 0.35 },
          { min: 45181, max: 58190, rate: 0.47 },
          { min: 58191, max: Infinity, rate: 0.50 }
        ],
        SOCIAL_BRACKETS: [
          { min: 0, max: 7350, rate: 0.004 },
          { min: 7351, max: 52000, rate: 0.07 }
        ],
        HEALTH_BRACKETS: [
          { min: 0, max: 7350, rate: 0.031 },
          { min: 7351, max: 52000, rate: 0.0517 }
        ],
        PENSION_RATE: 0.06,
        PENSION_MAX_CREDIT_MONTHLY: 730
      }
    },
    "2024": {
      employee: {
        CREDIT_VALUE: 242,
        TAX_BRACKETS: [
          { min: 0, max: 7010, rate: 0.10 },
          { min: 7011, max: 10060, rate: 0.14 },
          { min: 10061, max: 16150, rate: 0.20 },
          { min: 16151, max: 22440, rate: 0.31 },
          { min: 22441, max: 46690, rate: 0.35 },
          { min: 46691, max: 60130, rate: 0.47 },
          { min: 60131, max: Infinity, rate: 0.50 }
        ],
        SOCIAL_BRACKETS: [
          { min: 0, max: 7522, rate: 0.0427 },
          { min: 7523, max: 50695, rate: 0.1217 }
        ],
        HEALTH_BRACKETS: [
          { min: 0, max: 7522, rate: 0.0323 },
          { min: 7523, max: 50695, rate: 0.0517 }
        ],
        PENSION_RATE: 0.06,
        PENSION_MAX_CREDIT_MONTHLY: 764
      }
    },
  "2025": {
    employee: {
      CREDIT_VALUE: 242,
      TAX_BRACKETS: [
        { min: 0,     max: 7010,  rate: 0.10 },
        { min: 7010,  max: 10060, rate: 0.14 },
        { min: 10060, max: 16150, rate: 0.20 },
        { min: 16150, max: 22440, rate: 0.31 },
        { min: 22440, max: 46690, rate: 0.35 },
        { min: 46690, max: 60130, rate: 0.47 },
        { min: 60130, max: Infinity, rate: 0.50 }
      ],
      // === NOTA BENE: these are NATIONAL INSURANCE (employee only) rates ===
      SOCIAL_BRACKETS: [
        { min: 0,     max: 7522,  rate: 0.0104 },  // 1.04% (national only)
        { min: 7522,  max: 50695, rate: 0.07 }     // 7% (national only) for above
      ],
      HEALTH_BRACKETS: [
        { min: 0,     max: 7522,  rate: 0.0323 },  // 3.23% (health)
        { min: 7522,  max: 50695, rate: 0.0517 }   // 5.17% (health)
      ],
      PENSION_RATE: 0.06,
      PENSION_MAX_CREDIT_MONTHLY: 679
    }
  }
  };

});

