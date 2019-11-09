defmodule TimesheetDemo2.Repo.Migrations.CreateRequests do
  use Ecto.Migration

  def change do
    create table(:requests) do
      add :name, :string
      add :date, :date
      add :approval, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nothing)
      add :manager_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:requests, [:user_id])
    create index(:requests, [:manager_id])
  end
end
