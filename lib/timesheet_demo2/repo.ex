defmodule TimesheetDemo2.Repo do
  use Ecto.Repo,
    otp_app: :timesheet_demo2,
    adapter: Ecto.Adapters.Postgres
end
