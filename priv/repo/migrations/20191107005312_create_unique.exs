defmodule TimesheetDemo2.Repo.Migrations.CreateUnique do
  use Ecto.Migration

  def change do
    create unique_index(:users, [:email])
  end
end
