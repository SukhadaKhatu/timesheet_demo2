defmodule TimesheetDemo2Web.RequestController do
  use TimesheetDemo2Web, :controller

  alias TimesheetDemo2.Requests
  alias TimesheetDemo2.Requests.Request

  action_fallback TimesheetDemo2Web.FallbackController

  def index(conn, _params) do 
    requests = Requests.list_requests()
    render(conn, "index.json", requests: requests)
  end

  def create(conn, %{"request" => request_params}) do
    with {:ok, %Request{} = request} <- Requests.create_request(request_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.request_path(conn, :show, request))
      |> render("show.json", request: request)
    end
  end

  def show(conn, %{"id" => id}) do
    request = Requests.get_request!(id)
    render(conn, "show.json", request: request)
  end

  def update(conn, %{"id" => id, "request" => request_params}) do
    IO.puts("in update")
    request = Requests.get_request!(id)

    with {:ok, %Request{} = request} <- Requests.update_request(request, request_params) do
      render(conn, "index.json", request: request)
    end
  end

  def delete(conn, %{"id" => id}) do
    request = Requests.get_request!(id)

    with {:ok, %Request{}} <- Requests.delete_request(request) do
      send_resp(conn, :no_content, "")
    end
  end
end
