package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"os"
	"time"
)

type Person struct {
	ID        string `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Team      int    `json:"team"`
}

var db *sql.DB

func initDB() {
	//myuser
	//"user=axellmartinez dbname=mydb  host=localhost port=5432 sslmode=disable"
	err1 := godotenv.Load() // This will look for the .env file in the current directory
	if err1 != nil {
		log.Fatal("Error loading .env file")
	}

	dbpath := fmt.Sprintf("user=%s dbname=%s host=%s port=%s sslmode=%s",
		os.Getenv("DBUSER"),
		os.Getenv("DBNAME"),
		os.Getenv("DBHOST"),
		os.Getenv("DBPORT"),
		os.Getenv("DBSSL"))

	fmt.Println(dbpath)

	connStr := dbpath //"user=axellmartinez dbname=mydb  host=localhost port=5432 sslmode=disable"
	var err error
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	if err = db.Ping(); err != nil {
		log.Fatal(err)
	}
}

// addPerson adds a new person to the database from a JSON request
func addPerson(c *gin.Context) {
	var newPerson Person

	// Bind the received JSON to newPerson
	if err := c.ShouldBindJSON(&newPerson); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Insert newPerson into the database
	query := `INSERT INTO people (firstname, lastname, team) VALUES ($1, $2, $3) RETURNING id`
	var id int
	err := db.QueryRow(query, newPerson.Firstname, newPerson.Lastname, newPerson.Team).Scan(&id)

	if err != nil {
		log.Printf("Error while inserting new person: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add new person"})
		return
	}

	// Return the new person as JSON
	c.JSON(http.StatusCreated, newPerson)
}

func getPeople(c *gin.Context) {
	rows, err := db.Query("SELECT id, firstname, lastname, team FROM people")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to query people"})
		return
	}
	defer rows.Close()

	var people []Person
	for rows.Next() {
		var p Person
		if err := rows.Scan(&p.ID, &p.Firstname, &p.Lastname, &p.Team); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan person"})
			return
		}
		people = append(people, p)
	}

	c.IndentedJSON(http.StatusOK, people)
}

func main() {
	initDB()
	defer db.Close()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/people", getPeople)
	router.POST("/people", addPerson)
	router.Run("localhost:8080")
}
