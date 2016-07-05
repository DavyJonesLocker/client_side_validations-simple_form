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
