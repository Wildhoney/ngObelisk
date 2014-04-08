require "yaml"

config = YAML.load_file("capistrano.yml")

# config valid only for Capistrano 3.1
lock "3.1.0"

set :application, "ngObelisk"

set :scm, :git
set :repo_url, "git@github.com:Wildhoney/ngObelisk.git"
set :scm_passphrase, ""

set :stages, ["production"]
set :default_stage, "production"

namespace :deploy do

  desc "Install node modules non-globally"
  task :npm_install do
    on roles(:app) do
      execute "cd #{current_path} && mkdir node_modules && chmod 0777 node_modules && /usr/bin/npm install -q"
    end
  end

end

after "deploy", "deploy:npm_install"