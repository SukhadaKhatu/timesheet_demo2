defmodule TimesheetDemo2.Repo.Migrations.AddDesc do
  use Ecto.Migration

  def change do
    alter table(:tasks) do
      add :desc, :string
    end
  end
end
