package main

//https://pkg.go.dev/github.com/gin-gonic/gin#Context.BindJSON for documentation

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

// Person : upper case members can be seen outside the file
type Person struct {
	ID        string `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Team      int    `json:"team"`
}

var People = []Person{
	{ID: "1", Firstname: "Axell", Lastname: "Martinez", Team: 1},
	{ID: "2", Firstname: "Kaycee", Lastname: "Menchaca", Team: 1},
	{ID: "3", Firstname: "Andrik", Lastname: "Martinez", Team: 2},
}

// this is a function that will get routed too when a GET request to route /People
func getPeople(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, People)
}

func addPerson(c *gin.Context) {
	var newPerson Person
	if err := c.BindJSON(&newPerson); err != nil {
		fmt.Println(err)
		return
	}
	People = append(People, newPerson)
	c.IndentedJSON(http.StatusCreated, newPerson)
}

func main() {
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/people", getPeople)  // to request run 'curl http://localhost:8080/people' on termial
	router.POST("/people", addPerson) // to request run 'curl http://localhost:8080/people' on termial
	router.Run("localhost:8080")
}
