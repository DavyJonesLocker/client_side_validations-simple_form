# ClientSideValidations-SimpleForm #

[![Build Status](http://travis-ci.org/dockyard/client_side_validations-simple_form.png)](http://travis-ci.org/dockyard/client_side_validations-simple_form)

[SimpleForm](https://github.com/plataformatec/simple_form) plugin for [ClientSideValidations](https://github.com/bcardarella/client_side_validations)

## Installation ##

In your Gemfile add the following:

```ruby
gem 'simple_form'
gem 'client_side_validations'
gem 'client_side_validations-simple_form'
```

Order matters here. `SimpleForm` and `ClientSideValidations` need to be
required **before** `ClientSideValidations-SimpleForm`.

[Follow the remaining installation instructions for ClientSideValidations](https://github.com/bcardarella/client_side_validations/README.markdown)

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

The usage is the same as `ClientSideValidations`, just pass `:validate => true` to the form builder

```ruby
<%= simple_form_for @book, :validate => true |book| do %>
  <%= book.input :name %>
<% end %>
```

Per-input options are done with `:validate`

```ruby
<%= book.input :name, :validate => { :presence => true, :uniqueness => false }
```

## Authors ##

[Brian Cardarella](http://twitter.com/bcardarella)

## Versioning ##

This gem follows [Semantic Versioning](http://semver.org)

Major and minor version numbers will follow `SimpleForm`'s major and
minor version numbers. For example,
`client_side_validations-simple_form-1.5.0` will be compatible with
`~> simple_form-1.5.0`

## Want to help? ##

Stable branches are created based upon each minor version. Please make
pull requests to specific branches rather than master.

Please make sure you include tests!

Unles Rails drops support for Ruby 1.8.7 we will continue to use the
hash-rocket syntax. Please respect this.

Don't use tabs to indent, two spaces are the standard.

## Legal ##

[DockYard](http://dockyard.com), LLC &copy; 2012

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
