module.exports = {
  root: true,

  parserOptions: {
    sourceType: 'script',
    parser: 'babel-eslint',
  },

  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? ["error", { allow: ["warn", "error"] }] : 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        ignores: [
          'component',
          'template',
          'transition',
          'transition-group',
          'keep-alive',
          'slot',
          'router-view',
          'router-link',
        ],
      },
    ],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    'vue/no-async-in-computed-properties': 'off',
    'vue/script-indent': ['off', null, {
      baseIndent: 0
    }],
    'vue/no-unused-components': ['off'],
    'vue/require-default-prop': ['off'],
    'vue/no-parsing-error': 0,
    semi: [2, 'always'],
    'no-unused-vars': 1,
    'no-undef': 0,
    'prefer-promise-reject-errors': 0,
    'no-multi-str': 0,
    'no-useless-escape': 0,
    'no-unreachable': 0,
    'no-return-await': 0,
    eqeqeq: 0,
    camelcase: 0,
    'comma-dangle': 0, // 对象字面量项尾有逗号
  },

  overrides: [{
    files: ['src/**/*', 'static/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
    excludedFiles: ['app.config.js', 'src/debug', 'static'],
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module',
    },
    env: {
      browser: true,
    },
  },
  {
    files: ['**/*.unit.js'],
    parserOptions: {
      parser: 'babel-eslint',
      sourceType: 'module',
    },
    env: {
      jest: true
    },
    globals: {
      mount: false,
      shallowMount: false,
      shallowMountView: false,
      createComponentMocks: false,
      createModuleStore: false,
    },
  },
  ],

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    'standard',
    'prettier',
    'prettier/standard',
    'prettier/vue',
    'plugin:vue/essential',
    '@vue/standard',
  ],
};
