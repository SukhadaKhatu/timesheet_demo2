# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :timesheet_demo2,
  ecto_repos: [TimesheetDemo2.Repo]

# Configures the endpoint
config :timesheet_demo2, TimesheetDemo2Web.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "wo+cJ20YriONbpUxFw41oj2mMSUhERPlou6bBjfmNzTlDafbcMMcP11/OGVrmZXx",
  render_errors: [view: TimesheetDemo2Web.ErrorView, accepts: ~w(html json)],
  pubsub: [name: TimesheetDemo2.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id] 

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
