package main

import (
	"context"
	"flag"
	"log"
	"time"

	"github.com/r04922101/go-grpc-error/pb"

	"google.golang.org/grpc"
)

const (
	defaultName = "world"
)

var (
	serverAddress = flag.String("addr", "localhost:3000", "the server address to connect to")
)

func main() {
	flag.Parse()

	conn, err := grpc.Dial(*serverAddress, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("failed to connect to the gRPC server at %s: %v", *serverAddress, err)
	}
	defer conn.Close()

	c := pb.NewHelloWorldClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.SayHello(ctx, &pb.HelloRequest{Message: "Hi there"})
	if err != nil {
		log.Fatalf("failed to say hello to the server: %v", err)
	}

	log.Printf("Received server response message: %s", r.GetMessage())
}
