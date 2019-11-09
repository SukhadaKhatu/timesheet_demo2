use Mix.Config

# Configure your database
config :timesheet_demo2, TimesheetDemo2.Repo,
  username: "timesheet_demo2",
  password: "eiNahshoo9xi",
  database: "timesheet_demo2_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :timesheet_demo2, TimesheetDemo2Web.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
