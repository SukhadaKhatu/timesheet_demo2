defmodule TimesheetDemo2Web.PageController do
  use TimesheetDemo2Web, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
