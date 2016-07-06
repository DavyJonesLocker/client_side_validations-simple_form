SimpleForm.setup do |config|
  config.wrappers :nested_wrappers,
                  tag: :tr,
                  class: :field,
                  error_class: :field_with_errors do |b|
    # Form extensions
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly

    # Form components
    b.use :label, wrap_with: { tag: :th }
    b.wrapper tag: :td, class: :input do |bd|
      bd.use :input
      bd.use :error, wrap_with: { tag: :span, class: :error }
    end
  end

  config.wrappers :error_parent_not_ancestor_of_input, tag: 'div', class: 'form-group row', error_class: 'has-error' do |b|
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly

    b.wrapper tag: 'div', class: 'col-md-6' do |bb|
      bb.use :label, class: 'col-sm-3 control-label'

      bb.wrapper tag: 'div', class: 'col-sm-9' do |bbb|
        bbb.use :input, class: 'form-control'
      end
    end

    b.wrapper tag: 'div', class: 'col-md-3' do |bc|
      bc.wrapper tag: 'div', class: 'progress' do |bbc|
      end
      bc.use :error, wrap_with: { tag: 'span', class: 'help-block' }
    end
  end

  config.wrappers :no_error,
                  tag: :div,
                  class: :field,
                  error_class: :field_with_errors do |b|
    # Form extensions
    b.use :html5
    b.use :placeholder
    b.optional :maxlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly

    # Form components
    b.use :label_input, wrap_with: { tag: :div, class: :input }
  end
end
