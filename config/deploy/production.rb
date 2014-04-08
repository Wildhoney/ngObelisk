require "yaml"
config = YAML.load_file("capistrano.yml")

server config["ssh_connection"], roles: %w{web app db}, port: 22
set :deploy_to, config["deploy_to"]