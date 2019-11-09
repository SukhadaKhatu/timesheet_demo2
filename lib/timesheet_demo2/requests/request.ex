defmodule TimesheetDemo2.Requests.Request do
  use Ecto.Schema
  import Ecto.Changeset

  schema "requests" do
    field :approval, :boolean, default: false
    field :date, :date
    field :name, :string
    belongs_to :user, TimesheetDemo2.Users.User
    belongs_to :manager, TimesheetDemo2.Users.User

    timestamps()
  end

  @doc false
  def changeset(request, attrs) do
    request
    |> cast(attrs, [:name, :date, :approval, :user_id, :manager_id])
    |> validate_required([:name, :date, :approval, :user_id, :manager_id])
  end
end
