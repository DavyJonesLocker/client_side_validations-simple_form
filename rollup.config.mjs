import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'

import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const year = new Date().getFullYear()

const banner = (formBuilderName) => `/*!
 * Client Side Validations Simple Form JS (${formBuilderName}) - v${pkg.version} (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) ${year} Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */
`

const umdModuleConfig = (inputFileName, outputModuleFileName, outputVendorFileName, formBuilderName) => ({
  input: `src/${inputFileName}`,
  external: ['jquery', '@client-side-validations/client-side-validations'],
  output: [
    {
      file: outputModuleFileName,
      banner: banner(formBuilderName),
      format: 'umd',
      globals: {
        jquery: 'jQuery',
        '@client-side-validations/client-side-validations': 'ClientSideValidations'
      }
    }
  ],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    copy({
      targets: [
        { src: outputModuleFileName, dest: 'vendor/assets/javascripts/', rename: outputVendorFileName }
      ],
      hook: 'writeBundle',
      verbose: true
    })
  ]
})

const esModuleConfig = (inputFileName, outputModuleFileName, formBuilderName) => ({
  input: `src/${inputFileName}`,
  external: ['jquery', '@client-side-validations/client-side-validations'],
  output: [
    {
      file: outputModuleFileName,
      banner: banner(formBuilderName),
      format: 'es'
    }
  ],
  plugins: [
    babel({ babelHelpers: 'bundled' })
  ]
})

export default [
  umdModuleConfig('index.js', pkg.main, 'rails.validations.simple_form.js', 'Default'),
  umdModuleConfig('index.bootstrap4.js', 'dist/simple-form.bootstrap4.js', 'rails.validations.simple_form.bootstrap4.js', 'Bootstrap 4+'),
  esModuleConfig('index.js', pkg.module, 'Default'),
  esModuleConfig('index.bootstrap4.js', 'dist/simple-form.bootstrap4.esm.js', 'Default')
]
