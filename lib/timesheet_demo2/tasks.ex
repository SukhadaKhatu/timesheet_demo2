defmodule TimesheetDemo2.Tasks do
  @moduledoc """
  The Tasks context.
  """

  import Ecto.Query, warn: false
  alias TimesheetDemo2.Repo

  alias TimesheetDemo2.Tasks.Task

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  # def list_tasks do

  #   Repo.all(Task)
  # end

  def list_tasks(request_id) do
    IO.puts("request id")
    IO.inspect(request_id)
    query = from(t in Task, where: t.request_id == ^request_id)
    Repo.all(query)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id) do
    IO.puts("hereee")
    query = from(t in Task, where: t.request_id == ^id)
    Repo.all(query)
    #  Repo.get!(Task, id)
  end

  def get_task(id) do
    IO.puts("hereeeahahah")
    query = from(t in Task, where: t.request_id == ^id)
    Repo.all(query)
    #  Repo.get(Task, id)
  end
  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def get_all(id) do
    Task |> where(request_id: ^id) |> Repo.all()
  end

  def get_count(id) do
    Task |> where(request_id: ^id) |> Repo.aggregate(:count, :time)
  end

  def create_task(attrs \\ %{}) do
    IO.puts("create")
    IO.inspect(attrs)
    %Task{}
    |> Task.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    task
    |> Task.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{source: %Task{}}

  """
  def change_task(%Task{} = task) do
    Task.changeset(task, %{})
  end
end
