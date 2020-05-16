import babel from '@rollup/plugin-babel'
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

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
        jquery: '$',
        '@client-side-validations/client-side-validations': 'ClientSideValidations'
      }
    }
  ],
  plugins: [
    resolve(),
    babel(),
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
    babel()
  ]
})

export default [
  umdModuleConfig('main.js', pkg.main, 'rails.validations.simple_form.js', 'Default'),
  umdModuleConfig('main.bootstrap4.js', 'dist/simple-form.bootstrap4.js', 'rails.validations.simple_form.bootstrap4.js', 'Bootstrap 4'),
  esModuleConfig('main.js', pkg.module, 'Default'),
  esModuleConfig('main.bootstrap4.js', 'dist/simple-form.bootstrap4.esm.js', 'Default')
]
