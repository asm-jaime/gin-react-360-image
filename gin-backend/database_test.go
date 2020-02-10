package main

import (
	"os"
	"testing"
)

func dbTest() (mongo *mongoDB, err error) {
	os.Setenv("MONGO_NAME", "test")
	os.Setenv("MONGO_USER", "jaime")
	os.Setenv("MONGO_PASSWORD", "123456789")
	os.Setenv("MONGO_HOST", "localhost")
	os.Setenv("MONGO_PORT", "27017")
	mongo = &mongoDB{}
	mongo.setDefault()

	err = mongo.init()
	return mongo, err
}

func TestMongoDB(t *testing.T) {
	db, err := dbTest()
	if err != nil {
		t.Error("db err: ", err)
		return
	}
	getItemsFromDir(db)

	// items
	{
		items, err := db.getItems(2)
		if err != nil || len(items) == 0 {
			t.Error("error getItems: ", err)
		}
	}
	// images
	{
		tempImage := imageRes{}
		tempImage.ItemName = "ring"
		tempImage.Index = "0"
		tempImage.Quality = "0"
		img, err := db.getImage(tempImage)
		if err != nil || img.ID.Hex() == "" {
			t.Error("error getImage: ", err)
		}
	}
}
