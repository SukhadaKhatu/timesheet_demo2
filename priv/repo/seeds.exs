# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TimesheetDemo2.Repo.insert!(%TimesheetDemo2.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
import Ecto.Query
alias TimesheetDemo2.Repo
alias TimesheetDemo2.Users.User
# alias TimesheetDemo.Tasks.Task
# alias TimesheetDemo.Requests.Request

password = Argon2.add_hash("password")[:password_hash]
Repo.insert!(%User{name: "Alice", email: "alice@example.com", password_hash: password})
Repo.insert!(%User{name: "Bob", email: "bob.example.com", password_hash: password, manager: 1})
Repo.insert!(%User{name: "Faith", email: "faith@example.com", password_hash: password})
Repo.insert!(%User{name: "Mark", email: "mark@example.com", password_hash: password, manager: 3})