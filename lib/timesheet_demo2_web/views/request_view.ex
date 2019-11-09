defmodule TimesheetDemo2Web.RequestView do
  use TimesheetDemo2Web, :view
  alias TimesheetDemo2Web.RequestView

  def render("index.json", %{requests: requests}) do
    %{data: render_many(requests, RequestView, "request.json")}
  end

  def render("show.json", %{request: request}) do
    %{data: render_one(request, RequestView, "request.json")}
  end

  def render("request.json", %{request: request}) do
    %{id: request.id,
      name: request.name,
      date: request.date,
      approval: request.approval,
      manager_id: request.manager_id,
      user_id: request.user_id}
  end
end
