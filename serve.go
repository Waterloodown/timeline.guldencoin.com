package main

import "net/http"
import "log"

// file contains is a simpe go program that can be ran with `go run serve.go`
// to start an http server on localhost:8888 and serve the files in this directory.
func main() {
	http.Handle("/", http.FileServer(http.Dir("./")))
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		log.Fatalf("error serving: %v", err)
	}
}
