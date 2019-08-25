# ClientSideValidations-SimpleForm #

[![Gem Version](https://badge.fury.io/rb/client_side_validations-simple_form.svg)](https://badge.fury.io/rb/client_side_validations-simple_form)
[![npm version](https://badge.fury.io/js/%40client-side-validations%2Fsimple-form.svg)](https://badge.fury.io/js/%40client-side-validations%2Fsimple-form)
[![Build Status](https://secure.travis-ci.org/DavyJonesLocker/client_side_validations-simple_form.svg?branch=master)](https://travis-ci.org/DavyJonesLocker/client_side_validations-simple_form)
[![Code Climate](https://codeclimate.com/github/DavyJonesLocker/client_side_validations-simple_form/badges/gpa.svg)](https://codeclimate.com/github/DavyJonesLocker/client_side_validations-simple_form)
[![Coverage Status](https://coveralls.io/repos/github/DavyJonesLocker/client_side_validations-simple_form/badge.svg?branch=master)](https://coveralls.io/github/DavyJonesLocker/client_side_validations-simple_form?branch=master)

[Simple Form](https://github.com/plataformatec/simple_form) plugin for [ClientSideValidations](https://github.com/DavyJonesLocker/client_side_validations)

## Installation ##

In your Gemfile add the following:

```ruby
gem 'simple_form'
gem 'client_side_validations'
gem 'client_side_validations-simple_form'
```

Order matters here. `simple_form` and `client_side_validations` need to be
required **before** `client_side_validations-simple_form`.

[Follow the remaining installation instructions for ClientSideValidations](https://github.com/DavyJonesLocker/client_side_validations/blob/master/README.md)

### JavaScript file ###

Instructions depend on your technology stack.

####  When using Webpacker ####

Make sure that you are requiring jQuery and Client Side Validations.

Add the following package:

```sh
yarn add @client-side-validations/simple-form
```

Then, according to the CSS framework you are using, add **one** of the following
lines to your `app/javascript/packs/application.js` pack, **after**
`import '@client-side-validations/client-side-validations'`:

```js
// No framework / Generic frameworks / Bootstrap 3
import '@client-side-validations/simple-form'

// Bootstrap 4
import '@client-side-validations/simple-form/dist/simple-form.bootstrap4'
```

####  When using Sprockets ####

Make sure that you are requiring jQuery and Client Side Validations.

According to the web framework you are using, add **one** of the following
lines to your `app/assets/javascripts/application.js`, **after**
`//= require rails.validations`

```js
// No framework / Generic frameworks / Bootstrap 3
//= require rails.validations.simple_form

// Bootstrap 4
//= require rails.validations.simple_form.bootstrap4
```

If you need to copy the asset files from the gem into your project, run:

```
rails g client_side_validations:copy_assets
```

Note: If you run `copy_assets`, you will need to run it again each time you update this project.

## Usage ##

The usage is the same as `ClientSideValidations`, just pass `validate: true` to the form builder

```ruby
<%= simple_form_for @book, validate: true do |book| %>
  <%= book.input :name %>
<% end %>
```

Per-input options are done with `:validate`

```ruby
<%= book.input :name, validate: { presence: true, uniqueness: false } %>
```

## Authors ##

[Brian Cardarella](https://twitter.com/bcardarella)

[Geremia Taglialatela](https://twitter.com/gtagliala)

[We are very thankful for the many contributors](https://github.com/DavyJonesLocker/client_side_validations-simple_form/graphs/contributors)

## Versioning ##

This gem follows [Semantic Versioning](https://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/DavyJonesLocker/client_side_validations-simple_form/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](https://dockyard.com/), LLC &copy; 2012-2019

[@dockyard](https://twitter.com/dockyard)

[Licensed under the MIT license](https://opensource.org/licenses/mit-license.php)
