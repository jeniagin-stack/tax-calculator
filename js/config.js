const TAX_CONFIG = {
  2020: {
    employee: {
      CREDIT_VALUE: 219,
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
        { min: 0, max: 6331, rate: 0.0035 },
        { min: 6332, max: Infinity, rate: 0.07 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6331, rate: 0.031 },
        { min: 6332, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    },
    freelance: {
      CREDIT_VALUE: 218,
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
        { min: 0, max: 6331, rate: 0.0525 },
        { min: 6332, max: Infinity, rate: 0.175 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6331, rate: 0.031 },
        { min: 6332, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    }
  },

  2021: {
    employee: {
      CREDIT_VALUE: 218,
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
        { min: 0, max: 6331, rate: 0.0035 },
        { min: 6332, max: Infinity, rate: 0.07 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6331, rate: 0.031 },
        { min: 6332, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    },
    freelance: {
      CREDIT_VALUE: 223,
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
        { min: 0, max: 6331, rate: 0.0525 },
        { min: 6332, max: Infinity, rate: 0.175 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6331, rate: 0.031 },
        { min: 6332, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    }
  },

  2022: {
    employee: {
      CREDIT_VALUE: 223,
      TAX_BRACKETS: [
        { min: 0, max: 6540, rate: 0.10 },
        { min: 6541, max: 9360, rate: 0.14 },
        { min: 9361, max: 15070, rate: 0.20 },
        { min: 15071, max: 20960, rate: 0.31 },
        { min: 20961, max: 43250, rate: 0.35 },
        { min: 43251, max: 55970, rate: 0.47 },
        { min: 55971, max: Infinity, rate: 0.50 }
      ],
      SOCIAL_BRACKETS: [
        { min: 0, max: 6450, rate: 0.0035 },
        { min: 6451, max: Infinity, rate: 0.07 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6450, rate: 0.031 },
        { min: 6451, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    },
    freelance: {
      CREDIT_VALUE: 231,
      TAX_BRACKETS: [
        { min: 0, max: 6540, rate: 0.10 },
        { min: 6541, max: 9360, rate: 0.14 },
        { min: 9361, max: 15070, rate: 0.20 },
        { min: 15071, max: 20960, rate: 0.31 },
        { min: 20961, max: 43250, rate: 0.35 },
        { min: 43251, max: 55970, rate: 0.47 },
        { min: 55971, max: Infinity, rate: 0.50 }
      ],
      SOCIAL_BRACKETS: [
        { min: 0, max: 6450, rate: 0.0525 },
        { min: 6451, max: Infinity, rate: 0.175 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6450, rate: 0.031 },
        { min: 6451, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    }
  },

  2023: {
    employee: {
      CREDIT_VALUE: 235,
      TAX_BRACKETS: [
        { min: 0, max: 6630, rate: 0.10 },
        { min: 6631, max: 9480, rate: 0.14 },
        { min: 9481, max: 15290, rate: 0.20 },
        { min: 15291, max: 21260, rate: 0.31 },
        { min: 21261, max: 44520, rate: 0.35 },
        { min: 44521, max: 57490, rate: 0.47 },
        { min: 57491, max: Infinity, rate: 0.50 }
      ],
      SOCIAL_BRACKETS: [
        { min: 0, max: 6710, rate: 0.0035 },
        { min: 6711, max: Infinity, rate: 0.07 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6710, rate: 0.031 },
        { min: 6711, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    },
    freelance: {
      CREDIT_VALUE: 235,
      TAX_BRACKETS: [
        { min: 0, max: 6630, rate: 0.10 },
        { min: 6631, max: 9480, rate: 0.14 },
        { min: 9481, max: 15290, rate: 0.20 },
        { min: 15291, max: 21260, rate: 0.31 },
        { min: 21261, max: 44520, rate: 0.35 },
        { min: 44521, max: 57490, rate: 0.47 },
        { min: 57491, max: Infinity, rate: 0.50 }
      ],
      SOCIAL_BRACKETS: [
        { min: 0, max: 6710, rate: 0.0525 },
        { min: 6711, max: Infinity, rate: 0.175 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6710, rate: 0.031 },
        { min: 6711, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    }
  },

  2024: {
    employee: {
      CREDIT_VALUE: 242,
      TAX_BRACKETS: [
        { min: 0, max: 6870, rate: 0.10 },
        { min: 6871, max: 9860, rate: 0.14 },
        { min: 9861, max: 15900, rate: 0.20 },
        { min: 15901, max: 22180, rate: 0.31 },
        { min: 22181, max: 46120, rate: 0.35 },
        { min: 46121, max: 59520, rate: 0.47 },
        { min: 59521, max: Infinity, rate: 0.50 }
      ],
      SOCIAL_BRACKETS: [
        { min: 0, max: 6950, rate: 0.0035 },
        { min: 6951, max: Infinity, rate: 0.07 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6950, rate: 0.031 },
        { min: 6951, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    },
    freelance: {
      CREDIT_VALUE: 235,
      TAX_BRACKETS: [
        { min: 0, max: 6870, rate: 0.10 },
        { min: 6871, max: 9860, rate: 0.14 },
        { min: 9861, max: 15900, rate: 0.20 },
        { min: 15901, max: 22180, rate: 0.31 },
        { min: 22181, max: 46120, rate: 0.35 },
        { min: 46121, max: 59520, rate: 0.47 },
        { min: 59521, max: Infinity, rate: 0.50 }
      ],
      SOCIAL_BRACKETS: [
        { min: 0, max: 6950, rate: 0.0525 },
        { min: 6951, max: Infinity, rate: 0.175 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 6950, rate: 0.031 },
        { min: 6951, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    }
  },

  2025: {
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
        { min: 0, max: 7030, rate: 0.0035 },
        { min: 7031, max: Infinity, rate: 0.07 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 7030, rate: 0.031 },
        { min: 7031, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    },
    freelance: {
      CREDIT_VALUE: 235,
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
        { min: 0, max: 7030, rate: 0.0525 },
        { min: 7031, max: Infinity, rate: 0.175 }
      ],
      HEALTH_BRACKETS: [
        { min: 0, max: 7030, rate: 0.031 },
        { min: 7031, max: Infinity, rate: 0.05 }
      ],
      PENSION_RATE: 0.06
    }
  }
};
