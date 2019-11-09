defmodule TimesheetDemo2Web.Router do
  use TimesheetDemo2Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", TimesheetDemo2Web do
    pipe_through :ajax

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController
    resources "/requests", RequestController
    post "/requests/update/:id", RequestController, :update
    resources "/sessions", SessionController, only: [:new, :create, :delete], singleton: true
  end

  # pipeline :api do
  #   plug :accepts, ["json"]
  # end

  scope "/", TimesheetDemo2Web do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TimesheetDemo2Web do
  #   pipe_through :api
  # end
end
