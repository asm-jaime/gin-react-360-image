package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

// ========== items

func getItems(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		res, err := mongo.getItems(DEFAULT_SIZE_ITEMS)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get items complete", "body": res})
		}
	}
}

// ========== images

func getImage(mongo *mongoDB) gin.HandlerFunc {
	return func(c *gin.Context) {
		itemName := c.Param("itemName")
		if itemName == "" {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		quality := c.Param("quality")
		if quality == "" {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		index := c.Param("index")
		if index == "" {
			c.AbortWithStatus(http.StatusNotFound)
			return
		}
		var req imageRes
		req.ItemName = itemName
		req.Index = index
		req.Quality = quality
		res, err := mongo.getImage(req)
		if err != nil {
			c.JSON(http.StatusInternalServerError,
				gin.H{"msg": err.Error(), "body": nil})
		} else {
			c.JSON(http.StatusOK,
				gin.H{"msg": "get image complete", "body": res})
		}
	}
}
