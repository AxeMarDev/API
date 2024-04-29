# SIMPLE HTTP API SERVER 

# Project background 
Not too long ago, I created a private web app for my family's construction company using Ruby on rails and React. The site is hosted on digital ocean and has been running very well.
This endevor has inspired me to explore how i can leverage the skills i picked up while creating this full stack app and develope a product that could be monetized and potentially sold. I have several ideas and am currently on the early stage of development. This repo is a open source and public project testing out Go by creating a very simple HTTP api. If you are looking for example of a simple api, i hope you find this helpful!!
# description

This API will interface with db of people objects. The server will use a postgress server. There is a REACT.ts project within the project files to visualize the API.

# Technologies

- Using Golang for the api backend server. 
- Using Gin package for routing and http. 
- React.ts vite for frontend
- Tailwinds for styling
- Postgress for storage

# How to run


# Migrations

using goose cli, under dir db/migrations
to install run 

```go install github.com/pressly/goose/v3/cmd/goose@latest ```

and add to path

```export PATH=$PATH:$(go env GOPATH)/bin```

To apply migration to database run

``` goose -dir db/migrations postgres "user=usernmae dbname=databaseame host=hostname port=portnum sslmode=disable" up```
