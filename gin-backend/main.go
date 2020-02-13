package main

import (
	"flag"
	"log"
	"os"

	"path/filepath"
	"regexp"
	"strconv"

	"bufio"
	"encoding/base64"
	"errors"
)

type flags struct {
	start *string
}

func main() {
	// processing console arguments
	fs := flags{}
	fs.start = flag.String("start", "360", "start 360 service")
	flag.Parse()

	switch *fs.start {
	case "360":
		m := mongoDB{}
		m.setDefault()

		router(&m).Run(":" + os.Getenv("PORT"))
	case "init":
		err := initDB()
		if err != nil {
			log.Fatal(err)
		} else {
			log.Println("init db successful complete")
		}
	}
}

func fileToB64(file string) (b64str string, err error) {
	imgType := filepath.Ext(file)[1:]
	if len(imgType) < 1 {
		return b64str, errors.New("file does not have any ext")
	}

	img, err := os.Open(file)
	if err != nil {
		return b64str, err
	}
	defer img.Close()

	info, _ := img.Stat()
	size := info.Size()
	buf := make([]byte, size)

	reader := bufio.NewReader(img)
	reader.Read(buf)
	b64str = "data:image/" + imgType + ";base64,"
	return b64str + base64.StdEncoding.EncodeToString(buf), err
}

func getItemsFromDir(mongo *mongoDB) (err error) {

	dirs, err := filepath.Glob("../items/*")
	if err != nil {
		return err
	}

	item := itemRes{}
	img := imageRes{}

	re := regexp.MustCompile("\\.(png|jpg|jpeg)$")

	for _, dirName := range dirs {
		baseDirName := filepath.Base(dirName)

		dirsQuality, err := filepath.Glob("../items/" + baseDirName + "/*")
		if err != nil {
			return err
		}

		itemsSize := 0
		for _, itemName := range dirsQuality {
			items, err := filepath.Glob(itemName + "/*")
			if err != nil {
				return err
			}

			itemsSize = len(items)
			for i := range items {
				if !re.MatchString(items[i]) {
					continue
				}

				img.ItemName = filepath.Base(dirName)
				img.Quality = filepath.Base(itemName)
				img.Index = strconv.Itoa(i)
				img.Image, err = fileToB64(items[i])
				if err != nil {
					return err
				}

				err = mongo.insertImage(img)
				if err != nil {
					return err
				}
			}
		}

		item.Name = filepath.Base(dirName)
		item.Size = itemsSize
		item.QualitySize = len(dirsQuality)
		err = mongo.insertItem(item)
		if err != nil {
			return err
		}
	}

	return err
}

func initDB() (err error) {
	mongo := mongoDB{}
	mongo.setDefault()
	defer mongo.Session.Close()
	err = mongo.init()
	if err != nil {
		return err
	}
	err = getItemsFromDir(&mongo)
	return err
}
