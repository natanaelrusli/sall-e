package main

import (
	"dalle-server/pkg/common/config"
	"dalle-server/pkg/common/db"
	"dalle-server/pkg/common/handlers"
	"dalle-server/pkg/common/repositories"
	"dalle-server/pkg/common/usecases"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("dalle server")

	config := config.InitConfig()
	db := db.ConnectDB(config.Database.URI)

	dalleRepository := repositories.NewDalleRepository(&db)
	dalleUsecase := usecases.NewDalleUsecase(dalleRepository)
	dalleHandler := handlers.NewDalleHandler(dalleUsecase)

	r := gin.Default()

	dalleRoutes := r.Group("/api/v1/dalle")
	dalleRoutes.GET("/", dalleHandler.GetDalle)
	dalleRoutes.POST("/", dalleHandler.GenerateImage)

	r.Run(config.Application.Port)
}
