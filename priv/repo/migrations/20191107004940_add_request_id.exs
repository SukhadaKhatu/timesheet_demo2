defmodule TimesheetDemo2.Repo.Migrations.AddRequestId do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
      add :request_id, references(:requests, on_delete: :nothing)
    end
  end
end
