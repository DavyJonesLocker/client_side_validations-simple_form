import { defineConfig } from 'rolldown'
import { createRequire } from 'node:module'
import fs from 'node:fs'

const require = createRequire(import.meta.url)
const pkg = require('./package.json')

const year = new Date().getFullYear()

const banner = (formBuilderName) => `/*!
 * Client Side Validations Simple Form JS (${formBuilderName}) - v${pkg.version} (https://github.com/DavyJonesLocker/client_side_validations-simple_form)
 * Copyright (c) ${year} Geremia Taglialatela, Brian Cardarella
 * Licensed under MIT (https://opensource.org/licenses/mit-license.php)
 */
`

const fixBanner = (file) => {
  const content = fs.readFileSync(file, 'utf8')
  const fixed = content.replace(/^\/\*![\s\S]*?\*\/\n/, (match) =>
    match.replace(/\n(?! )\*/g, '\n *'),
  )
  fs.writeFileSync(file, fixed)
}

const bannerPlugin = {
  name: 'banner',
  writeBundle(options, _bundle) {
    fixBanner(options.file)
  },
}

const copyToVendor = (src, dest) => ({
  name: 'copy-to-vendor',
  writeBundle() {
    fs.cpSync(src, `vendor/assets/javascripts/${dest}`)
  },
})

export default [
  defineConfig({
    input: 'src/index.js',
    external: ['@client-side-validations/client-side-validations'],
    output: {
      file: pkg.main,
      banner: banner('Default'),
      format: 'umd',
      name: 'ClientSideValidations',
      globals: {
        '@client-side-validations/client-side-validations': 'ClientSideValidations',
      },
    },
    platform: 'browser',
    plugins: [bannerPlugin, copyToVendor(pkg.main, 'rails.validations.simple_form.js')],
  }),
  defineConfig({
    input: 'src/index.bootstrap4.js',
    external: ['@client-side-validations/client-side-validations'],
    output: {
      file: 'dist/simple-form.bootstrap4.js',
      banner: banner('Bootstrap 4+'),
      format: 'umd',
      name: 'ClientSideValidations',
      globals: {
        '@client-side-validations/client-side-validations': 'ClientSideValidations',
      },
    },
    platform: 'browser',
    plugins: [bannerPlugin, copyToVendor('dist/simple-form.bootstrap4.js', 'rails.validations.simple_form.bootstrap4.js')],
  }),
  defineConfig({
    input: 'src/index.js',
    external: ['@client-side-validations/client-side-validations'],
    output: {
      file: pkg.module,
      banner: banner('Default'),
      format: 'es',
    },
    platform: 'browser',
    plugins: [bannerPlugin],
  }),
  defineConfig({
    input: 'src/index.bootstrap4.js',
    external: ['@client-side-validations/client-side-validations'],
    output: {
      file: 'dist/simple-form.bootstrap4.esm.js',
      banner: banner('Bootstrap 4+'),
      format: 'es',
    },
    platform: 'browser',
    plugins: [bannerPlugin],
  }),
]
