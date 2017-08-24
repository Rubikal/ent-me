require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module EntMe
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1
    config.app_domain = "http://ent-me.herokuapp.com"

    config.autoload_paths += Dir["#{config.root}/lib/utilities/"]

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Skip assets, scaffolds.css, helpers
    config.generators do |g|
      g.assets false
      g.helper false
      g.stylesheets false
    end
  end
end
