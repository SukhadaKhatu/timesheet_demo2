defmodule TimesheetDemo2Web.TaskView do
  use TimesheetDemo2Web, :view
  alias TimesheetDemo2Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    IO.puts("inside task")
    %{data: render_many(task, TaskView, "each.json")}
  end

  def render("each.json", %{task: task}) do
    IO.puts("inside each")
    %{id: task.id,
      job_code: task.job_code,
      time: task.time,
      desc: task.desc}
  end


  # def render("task.json", %{task: task}) do
  #   %{id: task.id,
  #     job_code: task.job_code,
  #     time: task.time}
  # end
end
