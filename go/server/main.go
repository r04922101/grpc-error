package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	"github.com/r04922101/go-grpc-error/pb"

	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 3000, "server port")
)

type server struct {
}

func (s *server) SayHello(ctx context.Context, req *pb.HelloRequest) (*pb.HelloResponse, error) {
	log.Printf("Received a hello message: %s", req.GetMessage())
	return &pb.HelloResponse{Message: "Hello, World"}, nil
}

func main() {
	flag.Parse()

	lis, err := net.Listen("tcp", fmt.Sprintf("localhost:%d", *port))
	if err != nil {
		log.Fatalf("failed to listen at port %d: %v", *port, err)
	}

	s := grpc.NewServer()
	pb.RegisterHelloWorldServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
