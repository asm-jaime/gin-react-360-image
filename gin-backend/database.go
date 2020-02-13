package main

import (
	mgo "gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"os"
)

// ========== mongo config

type mongoDB struct {
	Host     string
	Port     string
	Addrs    string
	Database string
	Username string
	Password string
	Info     *mgo.DialInfo
	Session  *mgo.Session
}

func (mongo *mongoDB) setDefault() {
	mongo.Port = os.Getenv("MONGO_PORT")
	mongo.Host = os.Getenv("MONGO_HOST")
	mongo.Addrs = mongo.Host + ":" + mongo.Port
	mongo.Database = os.Getenv("MONGO_NAME")
	mongo.Username = os.Getenv("MONGO_USER")
	mongo.Password = os.Getenv("MONGO_PASSWORD")
	mongo.Info = &mgo.DialInfo{
		Addrs:    []string{mongo.Addrs},
		Timeout:  0,
		Database: mongo.Database,
		Username: mongo.Username,
		Password: mongo.Password,
	}
	err := mongo.setSession()
	if err != nil {
		panic("db connection does not exist")
	}
}

func (mongo *mongoDB) setSession() (err error) {
	mongo.Session, err = mgo.DialWithInfo(mongo.Info)
	if err != nil {
		mongo.Session, err = mgo.Dial(mongo.Host)
	}
	return err
}

func (mongo *mongoDB) drop() {
	session := mongo.Session.Clone()
	defer session.Close()
	session.DB(mongo.Database).C("images").DropCollection()
	session.DB(mongo.Database).C("items").DropCollection()
}

func (mongo *mongoDB) init() (err error) {
	mongo.drop()

	session := mongo.Session.Clone()
	defer session.Close()
	session.EnsureSafe(&mgo.Safe{})

	// ========== images
	collection := session.DB(mongo.Database).C("images")
	index := mgo.Index{
		Key:        []string{"itemname", "index", "quality"},
		Unique:     false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	index = mgo.Index{
		Key:    []string{"$text:img"},
		Unique: false,
	}
	err = collection.EnsureIndex(index)
	if err != nil {
		return err
	}

	// ========== items
	collection = session.DB(mongo.Database).C("items")

	index = mgo.Index{
		Key:        []string{"name", "size", "sizequality"},
		Unique:     false,
		Background: true,
		Sparse:     true,
	}
	err = collection.EnsureIndex(index)

	return err
}

// ========== item

func (mongo *mongoDB) insertItem(item itemRes) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("items").Insert(&item)
	return err
}

func (mongo *mongoDB) getItems(n int) (items []itemRes, err error) {
	session := mongo.Session.Clone()
	defer session.Close()
	if n > 0 {
		err = session.DB(mongo.Database).
			C("items").Find(bson.M{}).SetMaxScan(n).All(&items)
	} else {
		err = session.DB(mongo.Database).
			C("items").Find(bson.M{}).All(&items)
	}
	return items, err
}

// ========== image

func (mongo *mongoDB) insertImage(image imageRes) (err error) {
	session := mongo.Session.Clone()
	defer session.Close()

	err = session.DB(mongo.Database).C("images").Insert(&image)
	return err
}

func (mongo *mongoDB) getImage(image imageRes) (res imageRes, err error) {
	session := mongo.Session.Clone()
	defer session.Close()
	err = session.DB(mongo.Database).C("images").Find(bson.M{
		"itemname": image.ItemName,
		"index":    image.Index,
		"quality":  image.Quality,
	}).One(&res)

	return res, err
}
