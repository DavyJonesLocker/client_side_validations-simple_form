# ClientSideValidations-SimpleForm #

[![Gem Version](https://badge.fury.io/rb/client_side_validations-simple_form.svg)](http://badge.fury.io/rb/client_side_validations-simple_form)
[![Build Status](https://secure.travis-ci.org/DavyJonesLocker/client_side_validations-simple_form.svg?branch=master)](https://travis-ci.org/DavyJonesLocker/client_side_validations-simple_form)
[![Dependency Status](https://gemnasium.com/DavyJonesLocker/client_side_validations-simple_form.svg)](https://gemnasium.com/DavyJonesLocker/client_side_validations-simple_form)
[![Code Climate](https://codeclimate.com/github/DavyJonesLocker/client_side_validations-simple_form/badges/gpa.svg)](https://codeclimate.com/github/DavyJonesLocker/client_side_validations-simple_form)
[![Coverage Status](https://coveralls.io/repos/github/DavyJonesLocker/client_side_validations-simple_form/badge.svg?branch=master)](https://coveralls.io/github/DavyJonesLocker/client_side_validations-simple_form?branch=master)

[SimpleForm](https://github.com/plataformatec/simple_form) plugin for [ClientSideValidations](https://github.com/DavyJonesLocker/client_side_validations)

## Installation ##

In your Gemfile add the following:

```ruby
gem 'simple_form'
gem 'client_side_validations'
gem 'client_side_validations-simple_form'
```

Order matters here. `SimpleForm` and `ClientSideValidations` need to be
required **before** `ClientSideValidations-SimpleForm`.

[Follow the remaining installation instructions for ClientSideValidations](https://github.com/DavyJonesLocker/client_side_validations/blob/master/README.md)

Add the following line to `app/assets/javascripts/application.js`

```javascript
//= require rails.validations.simple_form
```

Again, order matters. You should add this line after the require for `rails.validations` as described in the `ClientSideValidations` installation instructions.

If the asset pipeline is disabled the asset file will be copied
into `public/javascripts` when the `ClientSideValidations` install generator is run.

At any time you can copy the asset file into your project by running:

```
rails g client_side_validations:copy_assets
```

If the asset pipeline is disabled the asset file will be copied
into `public/javascripts`. Otherwise the asset file will be copied into
`app/assets/javascripts` (or whatever asset directory you have
defined)

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

This gem follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/DavyJonesLocker/client_side_validations-simple_form/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](https://dockyard.com/), LLC &copy; 2012-2017

[@dockyard](https://twitter.com/dockyard)

[Licensed under the MIT license](http://opensource.org/licenses/mit-license.php)
