module ApplicationHelper
  def controller?(*controller)
    controller.include?(params[:controller])
  end

  def action?(*action)
    action.include?(params[:action])
  end

  def bootstrap_class_for flash_type
    { success: "alert-success", error: "alert-danger", alert: "alert-warning", notice: "alert-info" }[flash_type] || flash_type.to_s
  end

  def flash_messages(opts = {})
    flash.each do |msg_type, message|
      concat(content_tag(:div, message, class: "alert #{bootstrap_class_for(msg_type.to_sym)} fade in") do
              concat content_tag(:button, 'x', class: "close", data: { dismiss: 'alert' })
              if message.is_a?(Array)
                message.each do |m|
                  concat content_tag(:div, m)
                end
              else
                concat message
              end
            end)
    end
    nil
  end

  def tinymce(config=:default, options={})
    javascript_tag { tinymce_javascript(config, options) }
  end

  # Returns the JavaScript code required to initialize TinyMCE.
  def tinymce_javascript(config=:default, options={})
    <<-JAVASCRIPT.strip_heredoc.html_safe
    (function() {
      function initTinyMCE() {
        if (typeof tinyMCE != 'undefined') {
          tinyMCE.init(#{to_javascript(tinymce_configuration(config, options)).gsub(/^/, ' ' * 12).sub(/\A\s+/, "")});
        } else {
          setTimeout(initTinyMCE, 50);
        }
      }
      initTinyMCE();
    })();
    JAVASCRIPT
  end

  # Returns the TinyMCE configuration object.
  # It should be converted to JavaScript (via #to_javascript) for use within JavaScript.
  def tinymce_configuration(config=:default, options={})
    {selector:'.tinymce', menubar: false, min_height: 170, max_height: 220, branding: false}.merge(options)
  end

  def to_javascript(options)
    pairs = options.inject([]) do |result, (k, v)|
      if v.respond_to?(:to_javascript)
        v = v.to_javascript
      elsif v.respond_to?(:to_json)
        v = v.to_json
      end

      result << [k, v].join(": ")
    end

    "{\n  #{pairs.join(",\n  ")}\n}"
  end
end
