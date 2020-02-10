package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func router(db *mongoDB) *gin.Engine {
	router := gin.Default()
	gin.SetMode(gin.DebugMode)
	router.Use(middlewareDB(db))

	router.Use(static.Serve("/", static.LocalFile(STATIC_FOLDER, false)))

	api := router.Group("api")
	api.Use(middlewareCORS())
	{
		v1 := api.Group("v1")
		{
			item := v1.Group("items")
			{
				item.GET("", getItems(db))
			}
			image := v1.Group("images")
			{
				image.GET("/:itemName/:quality/:index", getImage(db))
			}
		}
	}

	router.NoRoute(returnPublic())

	return router
}
