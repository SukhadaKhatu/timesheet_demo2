defmodule TimesheetDemo2.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :manager, :integer

      timestamps()
    end

  end
end
