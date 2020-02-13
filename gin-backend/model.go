package main

import (
	"gopkg.in/mgo.v2/bson"
)

// itemRes is data for a item
type itemRes struct {
	ID          bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	Name        string        `json:"name" bson:"name"`
	QualitySize int           `json:"qualitysize" bson:"qualitysize"`
	Size        int           `json:"size" bson:"size"`
}

type imageRes struct {
	ID       bson.ObjectId `json:"_id" bson:"_id,omitempty"`
	ItemName string        `json:"itemname" bson:"itemname"`
	Quality  string        `json:"quality" bson:"quality"`
	Index    string        `json:"index" bson:"index"`
	Image    string        `json:"image,omitempty" bson:"image,omitempty"`
}
